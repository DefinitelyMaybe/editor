<script>
  import { getContext } from "svelte";
  import { RemoveObjectCommand } from "../../../Editor/commands/RemoveObjectCommand.js";

  export let active;
  const editor = getContext("editor");
  const config = editor.config;
  const signals = editor.signals;
  const history = editor.history;

  const test = getContext("test");
  const test2 = getContext("test2");

  // language

  let language = config.getKey("language");
  const options = [
    {
      language: "English",
      value: "en",
    },
    {
      language: "Français",
      value: "fr",
    },
    {
      language: "中文",
      value: "zh",
    },
  ];
  let showGrid = true;
  let showHelpers = true;

  const IS_MAC = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const shortcuts = [
    {
      name: "Translate",
      value: "w",
    },
    {
      name: "Rotate",
      value: "r",
    },
    {
      name: "Scale",
      value: "s",
    },
    {
      name: "Undo",
      value: "z",
    },
    {
      name: "Focus",
      value: "f",
    },
  ];

  for (let i = 0; i < shortcuts.length; i++) {
    const shortcut = shortcuts[i];
    const configName = `settings/shortcuts/${shortcut.name.toLowerCase()}`;
    const shortcutKey = config.getKey(configName);
    if (shortcutKey !== undefined) {
      shortcut.value = shortcutKey;
    }
  }

  let persistent = config.getKey("settings/history");
  let ignoreObjectSelectedSignal = false;

  // events

  // signals.editorCleared.add(refreshUI);

  // signals.historyChanged.add(refreshUI);
  // signals.historyChanged.add(function (cmd) {
  //   if (ignoreObjectSelectedSignal === true) return;

  //   outliner.setValue(cmd !== undefined ? cmd.id : null);
  // });

  function isValidKeyBinding(key) {
    return key.match(/^[A-Za-z0-9]$/i); // Can't use z currently due to undo/redo
  }

  function handleKeyDown(event) {
    switch (event.key.toLowerCase()) {
      case "backspace":
        event.preventDefault(); // prevent browser back

      // fall-through

      case "delete":
        const object = editor.selected;

        if (object === null) return;

        const parent = object.parent;
        if (parent !== null)
          editor.execute(new RemoveObjectCommand(editor, object));

        break;

      case config.getKey("settings/shortcuts/translate"):
        signals.transformModeChanged.dispatch("translate");

        break;

      case config.getKey("settings/shortcuts/rotate"):
        signals.transformModeChanged.dispatch("rotate");

        break;

      case config.getKey("settings/shortcuts/scale"):
        signals.transformModeChanged.dispatch("scale");

        break;

      case config.getKey("settings/shortcuts/undo"):
        if (IS_MAC ? event.metaKey : event.ctrlKey) {
          event.preventDefault(); // Prevent browser specific hotkeys

          if (event.shiftKey) {
            editor.redo();
          } else {
            editor.undo();
          }
        }

        break;

      case config.getKey("settings/shortcuts/focus"):
        if (editor.selected !== null) {
          editor.focus(editor.selected);
        }

        break;
    }
  }

  // TODO-DefinitelyMaybe: Finish history
  // const outliner = new UIOutliner(editor);
  // outliner.onChange(function () {
  //   ignoreObjectSelectedSignal = true;

  //   editor.history.goToState(parseInt(outliner.getValue()));

  //   ignoreObjectSelectedSignal = false;
  // });

  // const refreshUI = function () {
  //   const options = [];

  //   function buildOption(object) {
  //     const option = document.createElement("div");
  //     option.value = object.id;

  //     return option;
  //   }

  //   (function addObjects(objects) {
  //     for (let i = 0, l = objects.length; i < l; i++) {
  //       const object = objects[i];

  //       const option = buildOption(object);
  //       option.innerHTML = "&nbsp;" + object.name;

  //       options.push(option);
  //     }
  //   })(history.undos);

  //   (function addObjects(objects) {
  //     for (let i = objects.length - 1; i >= 0; i--) {
  //       const object = objects[i];

  //       const option = buildOption(object);
  //       option.innerHTML = "&nbsp;" + object.name;
  //       option.style.opacity = 0.3;

  //       options.push(option);
  //     }
  //   })(history.redos);

  //   outliner.setOptions(options);
  // };

  // refreshUI();
</script>

<svelte:body on:keydown={handleKeyDown} />

<div class="flex h-full w-full flex-col {active ? '' : 'hidden'}">
  <div class="flex items-center">
    <label for="Language" class="p-2">Language</label>
    <select
      name="Language"
      class="select select-bordered m-2"
      bind:value={language}
      on:change={() => {
        editor.config.setKey("language", language);
      }}>
      {#each options as item}
        <option value={item.value} default>{item.language}</option>
      {/each}
    </select>
  </div>
  <div class="flex w-full flex-col">
    <div class="divider" />
    <h1 class="text-lg">Viewport</h1>
  </div>
  <div class="flex items-center">
    <label for="showGrid" class="p-2">Show Grid</label>
    <input
      type="checkbox"
      name="showGrid"
      class="checkbox"
      bind:checked={showGrid}
      on:change={() => {
        console.log("check change");
        test.set(showGrid);
        // signals.showGridChanged.dispatch(showGrid);
      }} />
    <input
      type="color"
      class="input"
      bind:value={$test2}
      on:change={() => {
        console.log("color change");
        test.set(showGrid);
        // signals.showGridChanged.dispatch(showGrid);
      }} />
  </div>
  <div class="flex items-center">
    <label for="showHelpers" class="p-2">Show Helpers</label>
    <input
      type="checkbox"
      name="showHelpers"
      class="checkbox"
      bind:checked={showHelpers}
      on:change={() => {
        signals.showHelpersChanged.dispatch(showHelpers);
      }} />
  </div>
  <div class="flex w-full flex-col">
    <div class="divider" />
    <h1 class="text-lg">Shortcuts</h1>
  </div>
  {#each shortcuts as option}
    <div class="flex items-center">
      <label for={option.name} class="p-2">{option.name}</label>
      <input
        type="text"
        name={option.name}
        class="input input-bordered h-8 w-12"
        maxlength="1"
        bind:value={option.value}
        on:keyup={(event) => {
          if (isValidKeyBinding(event.key)) {
            event.target.blur();
          }
        }}
        on:blur={() => {
          if (!isValidKeyBinding(option.value)) {
            option.value = config.getKey(
              `settings/shortcuts/${option.name.toLowerCase()}`
            );
          }
        }}
        on:click={(event) => {
          event.target.select();
        }}
        on:change={() => {
          const value = option.value.toLowerCase();

          if (isValidKeyBinding(value)) {
            option.value = value;
            config.setKey(
              `settings/shortcuts/${option.name.toLowerCase()}`,
              option.value
            );
          }
        }} />
    </div>
  {/each}
  <div class="flex w-full flex-col">
    <div class="divider" />
    <h1 class="text-lg">History</h1>
  </div>
  <div class="flex items-center">
    <label for="Persistent" class="p-2">Persistent</label>
    <input
      type="checkbox"
      name="Persistent"
      class="checkbox"
      bind:checked={persistent}
      on:change={() => {
        config.setKey("settings/history", persistent);

        if (persistent) {
          alert(
            "The history will be preserved across sessions.\nThis can have an impact on performance when working with textures."
          );

          const lastUndoCmd = history.undos[history.undos.length - 1];
          const lastUndoId = lastUndoCmd !== undefined ? lastUndoCmd.id : 0;
          editor.history.enableSerialization(lastUndoId);
        } else {
          signals.historyChanged.dispatch();
        }
      }} />
  </div>
  <div class="overflow-y-auto bg-base-200">
    <ul class="w-full list-inside list-disc">
      {#each history.undos as item}
        <li>{item}</li>
      {/each}
      {#if history.undos.length === 0 && history.redos.length === 0}
        <li />
      {/if}
    </ul>
  </div>
</div>
