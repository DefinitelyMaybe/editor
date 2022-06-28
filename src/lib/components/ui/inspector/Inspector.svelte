<script>
  import { createEventDispatcher } from "svelte";
  // import Scene from "./Inspector/Scene.svelte";
  // import Project from "./Inspector/Project.svelte";
  // import Settings from "./Inspector/Settings.svelte";

  const dispatch = createEventDispatcher();
  let activeTab = 0;
  const tabs = [
    {
      title: "Scene",
      value: 0,
      // component: Scene
    },
    {
      title: "Project",
      value: 1,
      // component: Project
    },
    {
      title: "Settings",
      value: 2,
      // component: Settings
    },
  ];
</script>

<div class="w-80 overflow-y-auto bg-base-100 p-4 text-base-content">
  <div class="flex h-full flex-col">
    <div class="flex justify-between">
      <button
        class="btn btn-square btn-sm bg-base-200"
        on:click={() => {
          dispatch("closeInspector");
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <div class="tabs justify-center">
        {#each tabs as item}
          <span
            class="tab tab-lifted {activeTab === item.value
              ? 'tab-active'
              : 'bg-base-200'}"
            on:click={() => {
              activeTab = item.value;
            }}>{item.title}</span>
        {/each}
      </div>
    </div>
    <!-- <div class="flex flex-col h-full overflow-y-auto overflow-x-clip">
      {#each tabs as item}
      <svelte:component this={item.component} active={activeTab === item.value}/>
      {/each}
    </div> -->
  </div>
</div>
