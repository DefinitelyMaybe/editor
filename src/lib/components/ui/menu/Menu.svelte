<script>
  // import File from "./Menu/File.svelte";
  // import Avatar from "./Menu/Avatar.svelte";
  // import Edit from "./Menu/Edit.svelte";
  // import Add from "./Menu/Add.svelte";
  // import Play from "./Menu/Play.svelte";
  // import Examples from "./Menu/Examples.svelte";
  // import View from "./Menu/View.svelte";
  import Help from "./Help.svelte";
  import Status from "./Status.svelte";
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <!-- <File />
    <Edit />
    <Add />
    <Play />
    <Examples />
    <View /> -->
    <Help />
  </div>
  <!-- <div class="navbar-center">
    <a href="https://threejs.org/" class="btn btn-ghost normal-case text-xl">Three.js Editor</a>
  </div> -->
  <div class="navbar-end">
    <Status />
    <!-- <button class="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
    <Avatar/> -->
  </div>
</div>
