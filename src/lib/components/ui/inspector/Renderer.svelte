<script>
  import * as THREE from "three";
  import { getContext, onMount } from "svelte";

  const editor = getContext("editor");
  const config = editor.config;
  const signals = editor.signals;
  // const strings = editor.strings;

  let currentRenderer = null;

  let antialias = config.getKey("project/renderer/antialias");
  let physicallyCorrectLights = config.getKey(
    "project/renderer/physicallyCorrectLights"
  );
  let shadows = config.getKey("project/renderer/shadows");
  let shadowType = config.getKey("project/renderer/shadowType");
  let toneMapping = config.getKey("project/renderer/toneMapping");
  let toneMappingExposure = config.getKey(
    "project/renderer/toneMappingExposure"
  );

  // Signals

  signals.editorCleared.add(function () {
    currentRenderer.physicallyCorrectLights = false;
    currentRenderer.shadowMap.enabled = true;
    currentRenderer.shadowMap.type = THREE.PCFShadowMap;
    currentRenderer.toneMapping = THREE.NoToneMapping;
    currentRenderer.toneMappingExposure = 1;

    physicallyCorrectLightsBoolean.setValue(
      currentRenderer.physicallyCorrectLights
    );
    shadowsBoolean.setValue(currentRenderer.shadowMap.enabled);
    shadowTypeSelect.setValue(currentRenderer.shadowMap.type);
    toneMappingSelect.setValue(currentRenderer.toneMapping);
    toneMappingExposure.setValue(currentRenderer.toneMappingExposure);
    toneMappingExposure.setDisplay(
      currentRenderer.toneMapping === 0 ? "none" : ""
    );

    signals.rendererUpdated.dispatch();
  });

  signals.rendererUpdated.add(function () {
    config.setKey(
      "project/renderer/antialias",
      antialias,
      "project/renderer/physicallyCorrectLights",
      physicallyCorrectLights,
      "project/renderer/shadows",
      shadows,
      "project/renderer/shadowType",
      shadowType,
      "project/renderer/toneMapping",
      toneMapping,
      "project/renderer/toneMappingExposure",
      toneMappingExposure
    );
  });

  // Functions

  function createRenderer() {
    currentRenderer = new THREE.WebGLRenderer({
      antialias: antialias,
    });
    currentRenderer.outputEncoding = THREE.sRGBEncoding;
    currentRenderer.physicallyCorrectLights = physicallyCorrectLights;
    currentRenderer.shadowMap.enabled = shadows;
    currentRenderer.shadowMap.type = shadowType;
    currentRenderer.toneMapping = toneMapping;
    currentRenderer.toneMappingExposure = toneMappingExposure;

    signals.rendererCreated.dispatch(currentRenderer);
    signals.rendererUpdated.dispatch();
  }

  function updateShadows() {
    currentRenderer.shadowMap.enabled = shadows;
    currentRenderer.shadowMap.type = shadowType;

    signals.rendererUpdated.dispatch();
  }

  function updateToneMapping() {
    currentRenderer.toneMapping = toneMapping;
    currentRenderer.toneMappingExposure = toneMappingExposure;
    signals.rendererUpdated.dispatch();
  }

  // onMount(() => {
  //   createRenderer();
  // });
</script>

<div class="flex w-full flex-col">
  <div class="divider"/>
  <h1 class="text-lg">Renderer</h1>
</div>
<div class="flex items-center">
  <label for="antialias" class="p-2">Antialias</label>
  <input
    type="checkbox"
    name="antialias"
    class="checkbox"
    bind:checked={antialias}
    on:change={createRenderer} />
</div>
<div class="flex items-center">
  <label for="physicallyCorrectLights" class="p-2">Physical lights</label>
  <input
    type="checkbox"
    name="physicallyCorrectLights"
    class="checkbox"
    bind:checked={physicallyCorrectLights}
    on:change={() => {
      currentRenderer.physicallyCorrectLights = physicallyCorrectLights;
      signals.rendererUpdated.dispatch();
    }} />
</div>
<div class="flex items-center">
  <label for="shadows" class="p-2">Shadows</label>
  <input
    type="checkbox"
    name="shadows"
    class="checkbox m-2"
    bind:checked={shadows}
    on:change={updateShadows} />
  <select
    name="shadowType"
    class="select select-bordered m-2"
    disabled={shadows === false}
    bind:value={shadowType}
    on:change={updateShadows}>
    <option value={0} default>Basic</option>
    <option value={1}>PCF</option>
    <option value={2}>PCF Soft</option>
  </select>
</div>
<div class="flex">
  <label for="toneMapping" class="shrink-0 p-2">Tone Mapping</label>
  <div>
    <select
      name="toneMapping"
      class="select select-bordered m-2"
      bind:value={toneMapping}
      on:change={updateToneMapping}>
      <option value={0}>None</option>
      <option value={1}>Linear</option>
      <option value={2}>Reinhard</option>
      <option value={3}>Cineon</option>
      <option value={4}>ACESFilmic</option>
    </select>
    <input
      type="number"
      class="input input-bordered items-end {toneMapping === 0? "hidden":""}"
      disabled={toneMapping == 0}
      min={0}
      max={10}
      bind:value={toneMappingExposure}
      on:change={updateToneMapping} />
  </div>
</div>
