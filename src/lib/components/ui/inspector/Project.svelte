<script>
  import { getContext } from "svelte";
  import Renderer from "./Renderer.svelte";
  // import { SidebarProjectVideo } from "./Sidebar.Project.Video.js";

  export let active;
  const editor = getContext("editor");
  const config = editor.config;
  const signals = editor.signals;
  // const strings = editor.strings;

  let title = config.getKey("project/title");
  let editable = config.getKey("project/editable");
  let vr = config.getKey("project/vr");

  // Signals

  signals.editorCleared.add(function () {
    title = ""
    config.setKey("project/title", title);
  });

  // container.add(new SidebarProjectRenderer(editor));

  // if ("SharedArrayBuffer" in window) {
  //   container.add(new SidebarProjectVideo(editor));
  // }
</script>

<div
  class="flex h-full w-full flex-col items-start p-2 {active ? '' : 'hidden'}">
  <div class="flex items-center">
    <label for="title" class="p-2">Title</label>
    <input
      type="text"
      name="title"
      class="input input-bordered"
      bind:value={title}
      on:change={() => {
        config.setKey("project/title", title);
      }} />
  </div>
  <div class="flex items-center">
    <label for="editable" class="p-2">Editable</label>
    <input
      type="checkbox"
      name="editable"
      class="checkbox"
      bind:checked={editable}
      on:change={() => {
        config.setKey("project/editable", editable);
      }} />
  </div>
  <div class="flex items-center">
    <label for="VR" class="p-2">VR</label>
    <input
      type="checkbox"
      name="VR"
      class="checkbox"
      bind:checked={vr}
      on:change={() => {
        config.setKey("project/vr", vr);
      }} />
  </div>
  <Renderer/>
</div>
