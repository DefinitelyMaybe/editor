<script>
  import {
    XIcon,
    CubeIcon
  } from "@rgossiaux/svelte-heroicons/outline";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let active = 0;
  const actions = {
    1:{
      test: false
    }
  }

  function handleKeyPress(event) {
    // console.log(event);
    switch (event.key) {
      case "1":
        dispatch("action1");
        active = 1;
        break;
      case "2":
        dispatch("action2");
        active = 2;
        break;
      case "3":
        dispatch("action3");
        active = 3;
        break;
      case "4":
        dispatch("action4");
        active = 4;
        break;
      case "5":
        dispatch("action5");
        active = 5;
        break;
      default:
        active = 0;
        break;
    }
  }
</script>

<svelte:body on:keypress={handleKeyPress} />

<div class="pointer-events-auto flex">
  <button
    class="btn m-1 h-20 w-20 {active === 1 ? 'btn-primary' : ''}"
    on:dragover|preventDefault
    on:drop="{(event)=>{
      const data = JSON.parse(event.dataTransfer.getData("test"))
      console.log(data);
      actions[1].test = true
    }}"
    on:click={() => {
      active = 1;
    }}>
    <XIcon class="{actions[1].test? "hidden":""}"/>
    <CubeIcon class="{actions[1].test? "":"hidden"}"/>
    <p>1</p>
  </button>
  <button
    class="btn m-1 h-20 w-20 {active === 2 ? 'btn-primary' : ''}"
    on:click={() => {
      active = 2;
    }}
    >
    <XIcon />
    <p>2</p>
  </button>
  <button
    class="btn m-1 h-20 w-20 {active === 3 ? 'btn-primary' : ''}"
    on:click={() => {
      active = 3;
    }}
    >
    <XIcon />
    <p>3</p>
  </button>
  <button
    class="btn m-1 h-20 w-20 {active === 4 ? 'btn-primary' : ''}"
    on:click={() => {
      active = 4;
    }}
    >
    <XIcon />
    <p>4</p>
  </button>
  <button
    class="btn m-1 h-20 w-20 {active === 5 ? 'btn-primary' : ''}"
    on:click={() => {
      active = 5;
    }}
    >
    <XIcon />
    <p>5</p>
  </button>
</div>
