<script>
  import { setup } from "$lib/utils/context.js";
  import * as THREE from "three";

  export let far = Infinity;
  export let near = 0;
  export let object = null;

  const { root } = setup();

  const rayCaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  $: {
    rayCaster.far = far;
    rayCaster.near = near;
  }

  async function pointerMove(event) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
    // TODO: normalize on the particular canvas's width and height
    // root.canvas.width
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  export function castRay() {
    rayCaster.setFromCamera(pointer, root.camera.object);
    if (object) {
      return rayCaster.intersectObjects([object]);
    } else {
      return rayCaster.intersectObjects([root.scene]);
    }
  }
</script>

<svelte:window on:pointermove={pointerMove} />
