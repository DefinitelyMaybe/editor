<script>
  import * as THREE from "three";
  import * as SC from "../../index.js";
  import { getContext } from "svelte";
  import RayCaster from "../RayCaster.svelte";

  export let rayPoint = [0, 0, 0];
  export let intersects = false;

  let object = getContext("test");
  let obj;
  let castRay;
  let pos = [0, 1.5, 0];

  object.subscribe((value) => {
    obj = value;
  });

  function handleKeyPress(event) {
    switch (event.key) {
      case "w":
        pos[2] += -1;
        break;
      case "a":
        pos[0] += -1;
        break;
      case "s":
        pos[2] += 1;
        break;
      case "d":
        pos[0] += 1;
        break;
      default:
        break;
    }
  }
</script>

<svelte:body
  on:mousemove={async () => {
    const intersection = castRay();
    if (intersection.length > 0) {
      intersects = true;
      rayPoint = intersection[0].point.toArray();
    } else {
      intersects = false;
    }
  }}
  on:keypress={handleKeyPress} />

<SC.PerspectiveCamera
  fov={90}
  far={1000}
  near={0.01}
  position={[0, 5, 10]}/>
<SC.OrbitControls enableZoom={true} enablePan={true} maxPolarAngle={Math.PI * 0.51} />
<SC.Mesh
  geometry={new THREE.CapsuleGeometry()}
  material={new THREE.MeshStandardMaterial({ color: "#aaaaaa" })}
  position={pos} />
<RayCaster bind:object={obj} bind:castRay />
{#if intersects}
  <SC.Mesh
    geometry={new THREE.BoxGeometry(0.2, 0.2, 0.2)}
    position={rayPoint}
    material={new THREE.MeshStandardMaterial({ color: "#bbbbbb" })} />
{/if}
