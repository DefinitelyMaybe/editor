<script>
  import { GridHelper } from "three";
  import { setup } from "../../utils/context.js";

  export let size = 10;
  export let divisons = 10;
  export let color = "#444444";

  const { root } = setup(new GridHelper(size, divisons, color, color));

  root.invalidate();
</script>
