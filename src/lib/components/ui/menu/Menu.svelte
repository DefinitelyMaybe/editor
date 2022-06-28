<script>
  import File from "./File.svelte";
  // import Avatar from "./Avatar.svelte";
  import Edit from "./Edit.svelte";
  import Add from "./Add.svelte";
  import Play from "./Play.svelte";
  import Examples from "./Examples.svelte";
  import View from "./View.svelte";
  import Help from "./Help.svelte";
  import Status from "./Status.svelte";

  export let editor;
</script>

<div class="navbar h-8 bg-[#111]">
  <div class="navbar-start">
    <File {editor} />
    <Edit {editor} />
    <Add {editor} />
    <Play {editor} />
    <Examples {editor} />
    <View {editor} />
    <Help />
  </div>
  <div class="navbar-end">
    <Status />
    <!-- <button class="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
    <Avatar/> -->
  </div>
</div>
