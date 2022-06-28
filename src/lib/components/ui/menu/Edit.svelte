<script context="module">
  import { Box3, Vector3 } from "three";
  import { AddObjectCommand } from "../../../js/commands/AddObjectCommand.js";
  import { RemoveObjectCommand } from "../../../js/commands/RemoveObjectCommand.js";
  import { SetPositionCommand } from "../../../js/commands/SetPositionCommand.js";
</script>

<script>
  export let editor;

  const history = editor.history;
  const colorMaps = ["map", "envMap", "emissiveMap"];
  let undo = false;
  let redo = false;

  editor.signals.historyChanged.add(() => {
    if (history.undos.length == 0) {
      undo = false; //.classList.toggle("inactive");
    } else {
      undo = true;
    }

    if (history.redos.length == 0) {
      redo = false; //.classList.toggle("inactive");
    } else {
      redo = true;
    }
  });

  function clearHistory() {
    if (confirm("The Undo/Redo History will be cleared. Are you sure?")) {
      editor.history.clear();
    }
  }

  function center() {
    const object = editor.selected;

    if (object === null || object.parent === null) return; // avoid centering the camera or scene

    const aabb = new Box3().setFromObject(object);
    const center = aabb.getCenter(new Vector3());
    const newPosition = new Vector3();

    newPosition.x = object.position.x + (object.position.x - center.x);
    newPosition.y = object.position.y + (object.position.y - center.y);
    newPosition.z = object.position.z + (object.position.z - center.z);

    editor.execute(new SetPositionCommand(editor, object, newPosition));
  }

  function clone() {
    let object = editor.selected;

    if (object === null || object.parent === null) return; // avoid cloning the camera or scene

    object = object.clone();

    editor.execute(new AddObjectCommand(editor, object));
  }

  function del() {
    const object = editor.selected;

    if (object !== null && object.parent !== null) {
      editor.execute(new RemoveObjectCommand(editor, object));
    }
  }

  function fixColorMap(obj) {
    const material = obj.material;

    if (material !== undefined) {
      if (Array.isArray(material) === true) {
        for (let i = 0; i < material.length; i++) {
          fixMaterial(material[i]);
        }
      } else {
        fixMaterial(material);
      }

      editor.signals.sceneGraphChanged.dispatch();
    }
  }

  function fixMaterial(material) {
    let needsUpdate = material.needsUpdate;

    for (let i = 0; i < colorMaps.length; i++) {
      const map = material[colorMaps[i]];

      if (map) {
        map.encoding = THREE.sRGBEncoding;
        needsUpdate = true;
      }
    }

    material.needsUpdate = needsUpdate;
  }
</script>

<div class="dropdown ">
  <label tabindex="0" class="btn btn-ghost">Edit</label>
  <ul
    tabindex="0"
    class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
    <li
      on:click={() => {
        editor.undo();
      }}
      class={undo ? "" : "inactive"}>
      <a>Undo</a>
    </li>
    <li
      on:click={() => {
        editor.redo();
      }}
      class={redo ? "" : "inactive"}>
      <a>Redo</a>
    </li>
    <li on:click={clearHistory}><a>Clear History</a></li>
    <li on:click={center}><a>Center</a></li>
    <li on:click={clone}><a>Clone</a></li>
    <li on:click={del}><a>Delete</a></li>
    <li
      on:click={() => {
        editor.scene.traverse(fixColorMap);
      }}>
      <a>Fix Color Maps</a>
    </li>
  </ul>
</div>
