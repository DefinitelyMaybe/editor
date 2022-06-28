<script>
  import * as THREE from "three";
  import { getContext, onMount } from "svelte";
  import Explorer from "./Explorer.svelte";
  import Object3D from "./ObjectDetails.svelte";

  export let active;
  const editor = getContext("editor");
  const signals = editor.signals;
  const strings = editor.strings;

  // TODO-DefinitelyMaybe: Init these variables from the scene
  let background;
  let bgColor;
  let bgTexture;
  let bgEquirect;

  let environment;
  let environmentEquirectangular;

  let fog;
  let fogColor = "#aaaaaa";
  let fogNear = 0.1;
  let fogFar = 50;
  let fogDensity = 0.05;

  // signals

  signals.editorCleared.add(refreshUI);

  signals.sceneGraphChanged.add(refreshUI);

  // functions

  function onBackgroundChanged() {
    signals.sceneBackgroundChanged.dispatch([
      background,
      bgColor,
      bgTexture,
      bgEquirect,
    ]);
  }

  function onEnvironmentChanged() {
    signals.sceneEnvironmentChanged.dispatch([
      environment,
      environmentEquirectangular,
    ]);
  }

  function onFogChanged() {
    signals.sceneFogChanged.dispatch([
      fog,
      fogColor,
      fogNear,
      fogFar,
      fogDensity,
    ]);
  }

  function onFogSettingsChanged() {
    signals.sceneFogSettingsChanged.dispatch([
      fog,
      fogColor,
      fogNear,
      fogFar,
      fogDensity,
    ]);
  }

  function refreshUI() {
    const scene = editor.scene;

    if (scene.background) {
      if (scene.background.isColor) {
        background = "Color";
        bgColor = `#${scene.background.getHexString()}`
      } else if (scene.background.isTexture) {
        if (
          scene.background.mapping === THREE.EquirectangularReflectionMapping
        ) {
          background = "Equirectangular";
          bgEquirect = scene.background;
        } else {
          background = "Texture";
          bgTexture = scene.background;
        }
      }
    } else {
      background = "None";
    }

    if (scene.environment) {
      if (
        scene.environment.mapping === THREE.EquirectangularReflectionMapping
      ) {
        environment = "Equirectangular";
        environmentEquirectangularTexture = scene.environment;
      }
    } else {
      environment = "None";
    }

    if (scene.fog) {
      fogColor = `#${scene.fog.color.getHexString()}`

      if (scene.fog.isFog) {
        fog = "Fog";
        fogNear = scene.fog.near;
        fogFar = scene.fog.far;
      } else if (scene.fog.isFogExp2) {
        fog = "FogExp2";
        fogDensity = scene.fog.density;
      }
    } else {
      fog = "None";
    }
  }

  onMount(() => {
    refreshUI();
  });
</script>

<div class="flex h-full w-full flex-col {active ? '' : 'hidden'}">
  <Explorer />
  <div class="flex flex-col">
    <div class="flex items-center">
      <label for="Background" class="shrink-0 p-2">Background</label>
      <select
        name="Background"
        class="select select-bordered m-2 w-28"
        bind:value={background}
        on:change={onBackgroundChanged}>
        <option value="None">None</option>
        <option value="Color">Color</option>
        <option value="Texture">Texture</option>
        <option value="Equirectangular">Equirectangular</option>
      </select>
    </div>
    <input
      type="color"
      name="Color"
      class="input input-bordered {background === 'Color' ? '' : 'hidden'}"
      bind:value={bgColor}
      on:change={onBackgroundChanged} />
    <input
      type="file"
      name="Texture"
      class="input input-bordered {background === 'Texture' ? '' : 'hidden'}"
      bind:value={bgTexture}
      on:change={onBackgroundChanged} />
    <input
      type="file"
      name="Equirectangular"
      class="input input-bordered {background === 'Equirectangular'
        ? ''
        : 'hidden'}"
      bind:value={bgEquirect}
      on:change={onBackgroundChanged} />
  </div>
  <div class="flex flex-col">
    <div class="flex items-center">
      <label for="Environment" class="shrink-0 p-2">Environment</label>
      <select
        name="Environment"
        class="select select-bordered m-2"
        bind:value={environment}
        on:change={onEnvironmentChanged}>
        <option value="None">None</option>
        <option value="Equirectangular">Equirectangular</option>
        <option value="ModelViewer">ModelViewer</option>
      </select>
    </div>
    <input
      type="file"
      name="Equirectangular"
      class="input input-bordered {environment === 'Equirectangular'
        ? ''
        : 'hidden'}"
      bind:value={environmentEquirectangular}
      on:change={onEnvironmentChanged} />
  </div>
  <div class="flex flex-col">
    <div class="flex items-center">
      <label for="Fog" class="shrink-0 p-2">Fog</label>
      <select
        name="Fog"
        class="select select-bordered m-2 w-28"
        bind:value={fog}
        on:change={onFogChanged}>
        <option value="None">None</option>
        <option value="Fog">Linear</option>
        <option value="FogExp2">Exponential</option>
      </select>
    </div>
    <div class="flex">
      <input
        type="color"
        class="input input-bordered {fog === 'Fog' || fog === 'FogExp2'
          ? ''
          : 'hidden'}"
        bind:value={fogColor}
        on:change={onFogSettingsChanged} />
      <input
        type="number"
        class="input input-bordered w-24 {fog === 'Fog' ? '' : 'hidden'}"
        bind:value={fogNear}
        on:change={onFogSettingsChanged} />
      <input
        type="number"
        class="input input-bordered w-24 {fog === 'Fog' ? '' : 'hidden'}"
        bind:value={fogFar}
        on:change={onFogSettingsChanged} />
      <input
        type="number"
        class="input input-bordered w-24 {fog === 'FogExp2' ? '' : 'hidden'}"
        bind:value={fogDensity}
        on:change={onFogSettingsChanged} />
    </div>
  </div>
  <Object3D/>
</div>
