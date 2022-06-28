<script context="module">
  import * as THREE from "three";
  import { zipSync, strToU8 } from "three/examples/jsm/libs/fflate.module.js";
</script>

<script>
  export let editor;

  const config = editor.config;

  let form, filesInput, link;

  function save(blob, filename) {
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }

    link.href = URL.createObjectURL(blob);
    link.download = filename || "data.json";
    link.dispatchEvent(new MouseEvent("click"));
  }

  function saveArrayBuffer(buffer, filename) {
    save(new Blob([buffer], { type: "application/octet-stream" }), filename);
  }

  function saveString(text, filename) {
    save(new Blob([text], { type: "text/plain" }), filename);
  }

  function getAnimations(scene) {
    const animations = [];

    scene.traverse(function (object) {
      animations.push(...object.animations);
    });

    return animations;
  }

  function exportTHREE(opt) {
    const object = editor.selected;

    if (object === null) {
      alert("No object selected");
      return;
    }

    let output;
    if (opt === "obj") {
      output = object.toJSON();
    } else if (opt === "geo") {
      const geometry = object.geometry;

      if (geometry === undefined) {
        alert("The selected object doesn't have geometry.");
        return;
      }

      output = geometry.toJSON();
    } else {
      output = editor.scene.toJSON();
    }

    try {
      output = JSON.stringify(output, null, "\t");
      output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");
    } catch (e) {
      output = JSON.stringify(output);
    }

    saveString(output, "model.json");
  }

  async function exportDAE() {
    const { ColladaExporter } = await import(
      "three/examples/jsm/exporters/ColladaExporter.js"
    );

    const exporter = new ColladaExporter();

    exporter.parse(editor.scene, function (result) {
      saveString(result.data, "scene.dae");
    });
  }

  async function exportDRC() {
    const object = editor.selected;

    if (object === null || object.isMesh === undefined) {
      alert("No mesh selected");
      return;
    }

    const { DRACOExporter } = await import(
      "three/examples/jsm/exporters/DRACOExporter.js"
    );

    const exporter = new DRACOExporter();

    const options = {
      decodeSpeed: 5,
      encodeSpeed: 5,
      encoderMethod: DRACOExporter.MESH_EDGEBREAKER_ENCODING,
      quantization: [16, 8, 8, 8, 8],
      exportUvs: true,
      exportNormals: true,
      exportColor: object.geometry.hasAttribute("color"),
    };

    // TODO: Change to DRACOExporter's parse( geometry, onParse )?
    const result = exporter.parse(object, options);
    saveArrayBuffer(result, "model.drc");
  }

  async function exportGLTF(bin) {
    const scene = editor.scene;
    const animations = getAnimations(scene);

    const { GLTFExporter } = await import(
      "three/examples/jsm/exporters/GLTFExporter.js"
    );

    const exporter = new GLTFExporter();

    if (bin) {
      exporter.parse(
        scene,
        function (result) {
          saveArrayBuffer(result, "scene.glb");
        },
        undefined,
        { binary: true, animations: animations }
      );
    } else {
      exporter.parse(
        scene,
        function (result) {
          saveString(JSON.stringify(result, null, 2), "scene.gltf");
        },
        undefined,
        { animations: animations }
      );
    }
  }

  async function exportOBJ() {
    const object = editor.selected;

    if (object === null) {
      alert("No object selected.");
      return;
    }

    const { OBJExporter } = await import(
      "three/examples/jsm/exporters/OBJExporter.js"
    );

    const exporter = new OBJExporter();

    saveString(exporter.parse(object), "model.obj");
  }

  async function exportPLY() {
    const { PLYExporter } = await import(
      "three/examples/jsm/exporters/PLYExporter.js"
    );

    const exporter = new PLYExporter();

    exporter.parse(editor.scene, function (result) {
      saveArrayBuffer(result, "model.ply");
    });
  }

  async function exportSTL(bin) {
    const { STLExporter } = await import(
      "three/examples/jsm/exporters/STLExporter.js"
    );

    const exporter = new STLExporter();
    if (bin) {
      saveArrayBuffer(
        exporter.parse(editor.scene, { binary: true }),
        "model-binary.stl"
      );
    } else {
      saveString(exporter.parse(editor.scene), "model.stl");
    }
  }

  async function exportUSDZ() {
    const { USDZExporter } = await import(
      "three/examples/jsm/exporters/USDZExporter.js"
    );

    const exporter = new USDZExporter();

    saveArrayBuffer(
      await exporter.parse(editor.scene, { binary: true }),
      "model.usdz"
    );
  }

  function publish() {
    const toZip = {};

    let output = editor.toJSON();
    output.metadata.type = "App";
    delete output.history;

    output = JSON.stringify(output, null, "\t");
    output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");

    toZip["app.json"] = strToU8(output);

    //

    const title = config.getKey("project/title");

    const manager = new THREE.LoadingManager(function () {
      const zipped = zipSync(toZip, { level: 9 });

      const blob = new Blob([zipped.buffer], { type: "application/zip" });

      save(blob, (title !== "" ? title : "untitled") + ".zip");
    });

    const loader = new THREE.FileLoader(manager);
    loader.load("js/libs/app/index.html", function (content) {
      content = content.replace("<!-- title -->", title);

      const includes = [];

      content = content.replace("<!-- includes -->", includes.join("\n\t\t"));

      let editButton = "";

      if (config.getKey("project/editable")) {
        editButton = [
          "			let button = document.createElement( 'a' );",
          "			button.href = 'https://threejs.org/editor/#file=' + location.href.split( '/' ).slice( 0, - 1 ).join( '/' ) + '/app.json';",
          "			button.style.cssText = 'position: absolute; bottom: 20px; right: 20px; padding: 10px 16px; color: #fff; border: 1px solid #fff; border-radius: 20px; text-decoration: none;';",
          "			button.target = '_blank';",
          "			button.textContent = 'EDIT';",
          "			document.body.appendChild( button );",
        ].join("\n");
      }

      content = content.replace("\t\t\t/* edit button */", editButton);

      toZip["index.html"] = strToU8(content);
    });
    loader.load("js/libs/app.js", function (content) {
      toZip["js/app.js"] = strToU8(content);
    });
    loader.load("../build/three.module.js", function (content) {
      toZip["js/three.module.js"] = strToU8(content);
    });
    loader.load("../examples/jsm/webxr/VRButton.js", function (content) {
      toZip["js/VRButton.js"] = strToU8(content);
    });
  }
</script>

<div class="dropdown ">
  <label tabindex="0" class="btn btn-ghost"> File </label>
  <ul
    tabindex="0"
    class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
    <li
      on:click={() => {
        if (confirm("Any unsaved data will be lost. Are you sure?")) {
          editor.clear();
        }
      }}>
      <a>New</a>
    </li>
    <li
      on:click={() => {
        filesInput.click();
      }}>
      <a>Import</a>
    </li>
    <li
      on:click={() => {
        exportTHREE("geo");
      }}>
      <a>Export Geometry</a>
    </li>
    <li
      on:click={() => {
        exportTHREE("obj");
      }}>
      <a>Export Object</a>
    </li>
    <li on:click={exportTHREE}>
      <a>Export Scene</a>
    </li>
    <li on:click={exportDAE}>
      <a>Export DAE</a>
    </li>
    <li on:click={exportDRC}>
      <a>Export DRC</a>
    </li>
    <li
      on:click={async () => {
        exportGLTF(true);
      }}>
      <a>Export GLB</a>
    </li>
    <li on:click={exportGLTF}>
      <a>Export GLTF</a>
    </li>
    <li on:click={exportOBJ}>
      <a>Export OBJ</a>
    </li>
    <li on:click={exportPLY}>
      <a>Export PLY</a>
    </li>
    <li on:click={exportSTL}><a>Export STL</a></li>
    <li
      on:click={() => {
        exportSTL(true);
      }}>
      <a>Export STL (.bin)</a>
    </li>
    <li on:click={exportUSDZ}><a>Export USDZ</a></li>
    <li on:click={publish}><a>Publish</a></li>
  </ul>
</div>

<div class="hidden">
  <form action="" bind:this={form}>
    <input
      type="file"
      multiple
      name=""
      id=""
      bind:this={filesInput}
      on:change={() => {
        editor.loader.loadFiles(filesInput.files);
        form.reset();
      }} />
  </form>

  <a href="/" bind:this={link}>saving</a>
</div>
