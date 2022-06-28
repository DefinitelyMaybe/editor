<script context="module">
  import * as SC from "svelte-cubed";
  import * as THREE from "three";
</script>

<script>
  export let geoOpt = {};
  export let matOpt = {};
  export let geometry = new THREE.BoxGeometry(geoOpt);
  export let material = new THREE.MeshBasicMaterial(matOpt);

  export let cameraPos = [1, 1, 3];
  export let enableZoom = true;
  export let maxPolarAngle = Math.PI * 0.51;

  export let ambientIntensity = 0.6;
  export let directionalIntensity = 0.6;
  /** @type {import('src/lib/types/common').Position} */
  export let directionalPos = [-2, 3, 2];
</script>

<SC.Canvas antialias>
  <SC.PerspectiveCamera position={cameraPos} />
  <SC.OrbitControls {enableZoom} {maxPolarAngle} />
  <SC.Mesh {geometry} {material} />
  <SC.AmbientLight intensity={ambientIntensity} />
  <SC.DirectionalLight
    intensity={directionalIntensity}
    position={directionalPos} />
</SC.Canvas>
