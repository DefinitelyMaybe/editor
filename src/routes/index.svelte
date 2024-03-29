<script context="module">
  export const prerender = true;
</script>

<script>
  import "../app.css";
  import { onMount } from "svelte";
  import * as THREE from "three";

  import Menu from "$lib/components/ui/menu/Menu.svelte";
  import Inventory from "$lib/components/ui/Inventory.svelte";
  import ActionBar from "$lib/components/ui/actionbar/ActionBar.svelte";

  import { Editor } from "$lib/js/Editor.js";
  import { Viewport } from "$lib/js/Viewport.js";
  import { Toolbar } from "$lib/js/Toolbar.js";
  // import { Script } from "$lib/js/Script.js";
  import { Player } from "$lib/js/Player.js";
  import { Sidebar } from "$lib/js/Sidebar.js";
  import { Menubar } from "$lib/js/Menubar.js";
  import { Resizer } from "$lib/js/Resizer.js";

  let editor;

  onMount(() => {
    window.URL = window.URL || window.webkitURL;
    window.BlobBuilder =
      window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

    Number.prototype.format = function () {
      return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    //

    editor = new Editor();

    window.editor = editor; // Expose editor to Console
    window.THREE = THREE; // Expose THREE to APP Scripts and Console

    const viewport = Viewport(editor);
    // viewport.addClass("hidden")
    document.body.appendChild(viewport.dom);

    // const toolbar = Toolbar(editor);
    // document.body.appendChild(toolbar.dom);

    // const script = Script(editor);
    // document.body.appendChild(script.dom);

    // const player = Player(editor);
    // document.body.appendChild(player.dom);

    const sidebar = Sidebar(editor);
    document.body.appendChild(sidebar.dom);

    // const menubar = Menubar(editor);
    // document.body.appendChild(menubar.dom);
    new Menu({
      target: document.body,
      props: {
        editor,
        dev: {
          viewport
        }
      },
    });

    new Inventory({
      target: document.body,
      props: {
        editor,
      },
    });

    new ActionBar({
      target: document.body,
      props: {
        editor,
      },
    });

    // const resizer = Resizer(editor);
    // document.body.appendChild(resizer.dom);

    let isLoadingFromHash = false;
    const hash = window.location.hash;

    //

    editor.storage.init(function () {
      editor.storage.get(function (state) {
        if (isLoadingFromHash) return;

        if (state !== undefined) {
          editor.fromJSON(state);
        }

        const selected = editor.config.getKey("selected");

        if (selected !== undefined) {
          editor.selectByUuid(selected);
        }
      });

      //

      let timeout;

      function saveState() {
        if (editor.config.getKey("autosave") === false) {
          return;
        }

        clearTimeout(timeout);

        timeout = setTimeout(function () {
          editor.signals.savingStarted.dispatch();

          timeout = setTimeout(function () {
            editor.storage.set(editor.toJSON());

            editor.signals.savingFinished.dispatch();
          }, 100);
        }, 1000);
      }

      const signals = editor.signals;

      signals.geometryChanged.add(saveState);
      signals.objectAdded.add(saveState);
      signals.objectChanged.add(saveState);
      signals.objectRemoved.add(saveState);
      signals.materialChanged.add(saveState);
      signals.sceneBackgroundChanged.add(saveState);
      signals.sceneEnvironmentChanged.add(saveState);
      signals.sceneFogChanged.add(saveState);
      signals.sceneGraphChanged.add(saveState);
      signals.scriptChanged.add(saveState);
      signals.historyChanged.add(saveState);
    });

    // resize onmount
    editor.signals.windowResize.dispatch();

    //

    if (hash.slice(1, 6) === "file=") {
      const file = hash.slice(6);

      if (confirm("Any unsaved data will be lost. Are you sure?")) {
        const loader = new THREE.FileLoader();
        loader.crossOrigin = "";
        loader.load(file, function (text) {
          editor.clear();
          editor.fromJSON(JSON.parse(text));
        });

        isLoadingFromHash = true;
      }
    }

    // ServiceWorker

    // if (browser) {
    //   if ("serviceWorker" in navigator) {
    //     try {
    //       navigator.serviceWorker.register(swURL, { type: "module" });
    //     } catch (error) {}
    //   }
    // }
  });
</script>

<svelte:head>
  <title>three.js editor | remake</title>
  <meta name="description" content="A SvelteKit app" />
</svelte:head>

<svelte:window
  on:resize={() => {
    editor.signals.windowResize.dispatch();
  }} />

<svelte:body
  on:dragover|preventDefault={(event) => {
    event.dataTransfer.dropEffect = "copy";
  }}
  on:drop|preventDefault={(event) => {
    if (event.dataTransfer.types[0] === "text/plain") return; // Outliner drop

    if (event.dataTransfer.items) {
      // DataTransferItemList supports folders

      editor.loader.loadItemList(event.dataTransfer.items);
    } else {
      editor.loader.loadFiles(event.dataTransfer.files);
    }
  }} />
