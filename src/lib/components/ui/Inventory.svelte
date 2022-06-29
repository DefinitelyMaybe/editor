<script>
  import * as SC from "$lib/index.js";
  import * as THREE from "three";
  import { FolderAddIcon } from "@rgossiaux/svelte-heroicons/outline";
  import { AddObjectCommand } from "../../js/commands/AddObjectCommand.js";

  export let editor
  const signals = editor.signals

  let colour = "#735f59";
  let open = false;

  const createData = (param) => {
    return JSON.stringify({
      component: "mesh",
      props: {
        geometry: { type: param },
        material: {
          type: "standard",
        },
      },
    });
  };

  function handleDragStart(event, params) {
    event.dataTransfer.setData("test", createData(params));
  }
</script>

<svelte:body
  on:keypress={(event) => {
    switch (event.key) {
      case "e":
        open = !open;
        break;
      default:
        break;
    }
  }} />

<h1>Inventory</h1>
<div class="dropdown dropdown-right {open ? 'dropdown-open' : ''}">
  <label tabindex="0" class="btn btn-ghost m-1 h-16 w-16 p-0">
    <FolderAddIcon />
  </label>
  <div
    tabindex="0"
    class="dropdown-content rounded-box flex h-64 w-64 flex-col bg-base-100 p-2 shadow">
    <h1>Inventory</h1>
    <ul class="grid h-full w-full grid-cols-3">
      <li
        class="btn btn-ghost relative h-full w-full"
        draggable="true"
        on:dragstart={(event) => {
          handleDragStart(event, "box");
        }}>
        <SC.Canvas antialias alpha on:click="{()=> {
          const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
          const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
          mesh.name = "Box";

          editor.execute(new AddObjectCommand(editor, mesh));
        }}">
          <SC.PerspectiveCamera position={[2, 2, 4]} />
          <!-- <SC.OrbitControls enableZoom={true} maxPolarAngle={Math.PI * 0.51} /> -->
          <SC.Mesh
            geometry={new THREE.BoxGeometry()}
            material={new THREE.MeshStandardMaterial({ color: colour })} />
          <SC.AmbientLight intensity={0.6} />
          <SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} />
        </SC.Canvas>
      </li>
      <li class="btn btn-ghost relative h-full w-full">
        <SC.Canvas antialias alpha>
          <SC.PerspectiveCamera position={[1, 1, 5]} />
          <!-- <SC.OrbitControls enableZoom={true} maxPolarAngle={Math.PI * 0.51} /> -->
          <SC.Mesh
            geometry={new THREE.SphereGeometry()}
            material={new THREE.MeshStandardMaterial({ color: colour })} />
          <SC.AmbientLight intensity={0.6} />
          <SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} />
        </SC.Canvas>
      </li>
      <li class="btn btn-ghost relative h-full w-full">
        <SC.Canvas antialias alpha>
          <SC.PerspectiveCamera position={[1, 1, 4]} />
          <!-- <SC.OrbitControls enableZoom={true} maxPolarAngle={Math.PI * 0.51} /> -->
          <SC.Mesh
            geometry={new THREE.ConeGeometry()}
            material={new THREE.MeshStandardMaterial({ color: colour })} />
          <SC.AmbientLight intensity={0.6} />
          <SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} />
        </SC.Canvas>
      </li>
      <li class="btn btn-ghost relative h-full w-full">
        <SC.Canvas antialias alpha>
          <SC.PerspectiveCamera position={[1, 1, 5]} />
          <!-- <SC.OrbitControls enableZoom={true} maxPolarAngle={Math.PI * 0.51} /> -->
          <SC.Mesh
            geometry={new THREE.TorusGeometry()}
            material={new THREE.MeshStandardMaterial({ color: colour })} />
          <SC.AmbientLight intensity={0.6} />
          <SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} />
        </SC.Canvas>
      </li>
      <li class="btn btn-ghost relative h-full w-full">
        <SC.Canvas antialias alpha>
          <SC.PerspectiveCamera position={[1, 2, 4]} />
          <!-- <SC.OrbitControls enableZoom={true} maxPolarAngle={Math.PI * 0.51} /> -->
          <SC.Mesh
            geometry={new THREE.CylinderGeometry()}
            material={new THREE.MeshStandardMaterial({ color: colour })} />
          <SC.AmbientLight intensity={0.6} />
          <SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} />
        </SC.Canvas>
      </li>
    </ul>
  </div>
</div>
