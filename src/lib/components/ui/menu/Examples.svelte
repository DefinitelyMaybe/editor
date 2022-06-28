<script>
  import * as THREE from "three";
  import ArkanoidURL from "../../examples/arkanoid.json?url";
  import CameraURL from "../../examples/camera.json?url";
  import ParticlesURL from "../../examples/particles.json?url";
  import PongURL from "../../examples/pong.json?url";
  import ShadersURL from "../../examples/shaders.json?url";

  export let editor;
  const loader = new THREE.FileLoader();

  function switchExample(url) {
    if (confirm("Any unsaved data will be lost. Are you sure?")) {
      loader.load(url, (text) => {
        editor.clear();
        editor.fromJSON(JSON.parse(text));
      });
    }
  }
</script>

<div class="dropdown ">
  <label tabindex="0" class="btn btn-ghost">Examples</label>
  <ul
    tabindex="0"
    class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
    <li
      on:click={() => {
        switchExample(ArkanoidURL);
      }}>
      <a>Arkanoid</a>
    </li>
    <li
      on:click={() => {
        switchExample(CameraURL);
      }}>
      <a>Camera</a>
    </li>
    <li
      on:click={() => {
        switchExample(ParticlesURL);
      }}>
      <a>Particles</a>
    </li>
    <li
      on:click={() => {
        switchExample(PongURL);
      }}>
      <a>Pong</a>
    </li>
    <li
      on:click={() => {
        switchExample(ShadersURL);
      }}>
      <a>Shaders</a>
    </li>
  </ul>
</div>
