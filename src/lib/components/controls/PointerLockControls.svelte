<script>
  // import * as THREE from "three";
  import { setup } from "../../utils/context.js";
  import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
  // import { createEventDispatcher } from "svelte";
  // import { onFrame } from "../../utils/lifecycle.js";

  export let maxPolarAngle = Math.PI;
  export let minPolarAngle = 0;

  const { root } = setup();
  // const dispatch = createEventDispatcher();

  /** @type {PointerLockControls} */
  let controls;

  root.controls.set((camera, canvas) => {
    controls = new PointerLockControls(camera, canvas);

    canvas.addEventListener("click", () => {
      controls.lock();
    });

    // controls.addEventListener("start", (e) => {
    //   dispatch("start", e);
    // });

    // controls.addEventListener("change", (e) => {
    //   dispatch("change", e);

    //   root.invalidate();
    // });

    // TODO do we need to remove these listeners?

    return controls;
  });

  // onFrame(() => {

  // });

  $: if (controls) {
    controls.maxPolarAngle = maxPolarAngle;
    controls.minPolarAngle = minPolarAngle;
  }
</script>
