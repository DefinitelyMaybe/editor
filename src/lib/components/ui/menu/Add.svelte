<script>
  export let editor;
  import * as THREE from "three";
  import { AddObjectCommand } from "../../../js/commands/AddObjectCommand.js";

  function addGroup() {
    const mesh = new THREE.Group();
    mesh.name = "Group";
    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addBox() {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = "Box";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addCapsule() {
    const geometry = new THREE.CapsuleGeometry(1, 1, 4, 8);
    const material = new THREE.MeshStandardMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "Capsule";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addCircle() {
    const geometry = new THREE.CircleGeometry(1, 8, 0, Math.PI * 2);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = "Circle";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addCylinder() {
    const geometry = new THREE.CylinderGeometry(
      1,
      1,
      1,
      8,
      1,
      false,
      0,
      Math.PI * 2
    );
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = "Cylinder";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addDodecahedron() {
    const geometry = new THREE.DodecahedronGeometry(1, 0);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = "Dodecahedron";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addIcosahedron() {
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = "Icosahedron";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addLathe() {
    const geometry = new THREE.LatheGeometry();
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ side: THREE.DoubleSide })
    );
    mesh.name = "Lathe";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addOctahedron() {
    const geometry = new THREE.OctahedronGeometry(1, 0);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = "Octahedron";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addPlane() {
    const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    const material = new THREE.MeshStandardMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "Plane";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addRing() {
    const geometry = new THREE.RingGeometry(0.5, 1, 8, 1, 0, Math.PI * 2);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = "Ring";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addSphere() {
    const geometry = new THREE.SphereGeometry(
      1,
      32,
      16,
      0,
      Math.PI * 2,
      0,
      Math.PI
    );
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = "Sphere";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addSprite() {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial());
    sprite.name = "Sprite";

    editor.execute(new AddObjectCommand(editor, sprite));
  }

  function addTetrahedron() {
    const geometry = new THREE.TetrahedronGeometry(1, 0);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = "Tetrahedron";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addTorus() {
    const geometry = new THREE.TorusGeometry(1, 0.4, 8, 6, Math.PI * 2);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = "Torus";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addTorusKnot() {
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 64, 8, 2, 3);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = "TorusKnot";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addTube() {
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2, 2, -2),
      new THREE.Vector3(2, -2, -0.6666666666666667),
      new THREE.Vector3(-2, -2, 0.6666666666666667),
      new THREE.Vector3(-2, 2, 2),
    ]);

    const geometry = new THREE.TubeGeometry(path, 64, 1, 8, false);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = "Tube";

    editor.execute(new AddObjectCommand(editor, mesh));
  }

  function addAmbientLight() {
    const color = 0x222222;

    const light = new THREE.AmbientLight(color);
    light.name = "AmbientLight";

    editor.execute(new AddObjectCommand(editor, light));
  }

  function addDirectionalLight() {
    const color = 0xffffff;
    const intensity = 1;

    const light = new THREE.DirectionalLight(color, intensity);
    light.name = "DirectionalLight";
    light.target.name = "DirectionalLight Target";

    light.position.set(5, 10, 7.5);

    editor.execute(new AddObjectCommand(editor, light));
  }

  function addHemishpereLight() {
    const skyColor = 0x00aaff;
    const groundColor = 0xffaa00;
    const intensity = 1;

    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    light.name = "HemisphereLight";

    light.position.set(0, 10, 0);

    editor.execute(new AddObjectCommand(editor, light));
  }

  function addPointLight() {
    const color = 0xffffff;
    const intensity = 1;
    const distance = 0;

    const light = new THREE.PointLight(color, intensity, distance);
    light.name = "PointLight";

    editor.execute(new AddObjectCommand(editor, light));
  }

  function addSpotLight() {
    const color = 0xffffff;
    const intensity = 1;
    const distance = 0;
    const angle = Math.PI * 0.1;
    const penumbra = 0;

    const light = new THREE.SpotLight(
      color,
      intensity,
      distance,
      angle,
      penumbra
    );
    light.name = "SpotLight";
    light.target.name = "SpotLight Target";

    light.position.set(5, 10, 7.5);

    editor.execute(new AddObjectCommand(editor, light));
  }

  function addOrthographicCamera() {
    const aspect = editor.camera.aspect;
    const camera = new THREE.OrthographicCamera(-aspect, aspect);
    camera.name = "OrthographicCamera";

    editor.execute(new AddObjectCommand(editor, camera));
  }

  function addPerspectiveCamera() {
    const camera = new THREE.PerspectiveCamera();
    camera.name = "PerspectiveCamera";

    editor.execute(new AddObjectCommand(editor, camera));
  }
</script>

<div class="dropdown ">
  <label tabindex="0" class="btn btn-ghost"> Add </label>
  <ul
    tabindex="0"
    class="dropdown-content menu rounded-box menu-compact mt-3 h-96 w-52 overflow-y-auto bg-base-100 p-2 shadow">
    <li on:click={addGroup}><a>Group</a></li>
    <li on:click={addBox}><a>Box</a></li>
    <li on:click={addCapsule}><a>Capsule</a></li>
    <li on:click={addCircle}><a>Circle</a></li>
    <li on:click={addCylinder}><a>Cylinder</a></li>
    <li on:click={addDodecahedron}><a>Dodecahedron</a></li>
    <li on:click={addIcosahedron}><a>Icosahedron</a></li>
    <li on:click={addLathe}><a>Lathe</a></li>
    <li on:click={addOctahedron}><a>Octahedron</a></li>
    <li on:click={addPlane}><a>Plane</a></li>
    <li on:click={addRing}><a>Ring</a></li>
    <li on:click={addSphere}><a>Sphere</a></li>
    <li on:click={addSprite}><a>Sprite</a></li>
    <li on:click={addTetrahedron}><a>Tetrahedron</a></li>
    <li on:click={addTorus}><a>Torus</a></li>
    <li on:click={addTorusKnot}><a>TorusKnot</a></li>
    <li on:click={addTube}><a>Tube</a></li>
    <li on:click={addAmbientLight}><a>Ambient Light</a></li>
    <li on:click={addDirectionalLight}><a>Directional Light</a></li>
    <li on:click={addHemishpereLight}><a>Hemishpere Light</a></li>
    <li on:click={addPointLight}><a>Point Light</a></li>
    <li on:click={addSpotLight}><a>Spot Light</a></li>
    <li on:click={addOrthographicCamera}><a>Othrographic Camera</a></li>
    <li on:click={addPerspectiveCamera}><a>Perspective Camera</a></li>
  </ul>
</div>
