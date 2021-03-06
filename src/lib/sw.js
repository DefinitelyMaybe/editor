// r140
import manifestURL from "$lib/manifest.json";

const cacheName = "threejs-editor";

const assets = [
  "./",

  "./manifest.json",
  manifestURL,
  "./images/icon.png",

  "../files/favicon.ico",

  "../build/three.module.js",

  "three/examples/jsm/controls/TransformControls.js",

  "three/examples/jsm/libs/chevrotain.module.min.js",
  "three/examples/jsm/libs/fflate.module.js",

  "three/examples/js/libs/draco/draco_decoder.js",
  "three/examples/js/libs/draco/draco_decoder.wasm",
  "three/examples/js/libs/draco/draco_encoder.js",
  "three/examples/js/libs/draco/draco_wasm_wrapper.js",

  "three/examples/js/libs/draco/gltf/draco_decoder.js",
  "three/examples/js/libs/draco/gltf/draco_decoder.wasm",
  "three/examples/js/libs/draco/gltf/draco_wasm_wrapper.js",

  "three/examples/jsm/libs/motion-controllers.module.js",

  "three/examples/jsm/libs/rhino3dm/rhino3dm.wasm",
  "three/examples/jsm/libs/rhino3dm/rhino3dm.js",

  "three/examples/jsm/loaders/3DMLoader.js",
  "three/examples/jsm/loaders/3MFLoader.js",
  "three/examples/jsm/loaders/AMFLoader.js",
  "three/examples/jsm/loaders/ColladaLoader.js",
  "three/examples/jsm/loaders/DRACOLoader.js",
  "three/examples/jsm/loaders/FBXLoader.js",
  "three/examples/jsm/loaders/GLTFLoader.js",
  "three/examples/jsm/loaders/KMZLoader.js",
  "three/examples/jsm/loaders/IFCLoader.js",
  "three/examples/jsm/loaders/ifc/web-ifc-api.js",
  "three/examples/jsm/loaders/ifc/web-ifc.wasm",
  "three/examples/jsm/loaders/MD2Loader.js",
  "three/examples/jsm/loaders/OBJLoader.js",
  "three/examples/jsm/loaders/MTLLoader.js",
  "three/examples/jsm/loaders/PCDLoader.js",
  "three/examples/jsm/loaders/PLYLoader.js",
  "three/examples/jsm/loaders/RGBELoader.js",
  "three/examples/jsm/loaders/STLLoader.js",
  "three/examples/jsm/loaders/SVGLoader.js",
  "three/examples/jsm/loaders/TGALoader.js",
  "three/examples/jsm/loaders/TDSLoader.js",
  "three/examples/jsm/loaders/VOXLoader.js",
  "three/examples/jsm/loaders/VRMLLoader.js",
  "three/examples/jsm/loaders/VTKLoader.js",
  "three/examples/jsm/loaders/XYZLoader.js",

  "three/examples/jsm/curves/NURBSCurve.js",
  "three/examples/jsm/curves/NURBSUtils.js",

  "three/examples/jsm/interactive/HTMLMesh.js",
  "three/examples/jsm/interactive/InteractiveGroup.js",

  "three/examples/jsm/environments/RoomEnvironment.js",

  "three/examples/jsm/exporters/ColladaExporter.js",
  "three/examples/jsm/exporters/DRACOExporter.js",
  "three/examples/jsm/exporters/GLTFExporter.js",
  "three/examples/jsm/exporters/OBJExporter.js",
  "three/examples/jsm/exporters/PLYExporter.js",
  "three/examples/jsm/exporters/STLExporter.js",
  "three/examples/jsm/exporters/USDZExporter.js",

  "three/examples/jsm/helpers/VertexNormalsHelper.js",

  "three/examples/jsm/geometries/TeapotGeometry.js",

  "three/examples/jsm/webxr/VRButton.js",
  "three/examples/jsm/webxr/XRControllerModelFactory.js",

  "./images/rotate.svg",
  "./images/scale.svg",
  "./images/translate.svg",

  "./js/libs/codemirror/codemirror.css",
  "./js/libs/codemirror/theme/monokai.css",

  "./js/libs/codemirror/codemirror.js",
  "./js/libs/codemirror/mode/javascript.js",
  "./js/libs/codemirror/mode/glsl.js",

  "./js/libs/esprima.js",
  "./js/libs/jsonlint.js",

  "./js/libs/codemirror/addon/dialog.css",
  "./js/libs/codemirror/addon/show-hint.css",
  "./js/libs/codemirror/addon/tern.css",

  "./js/libs/codemirror/addon/dialog.js",
  "./js/libs/codemirror/addon/show-hint.js",
  "./js/libs/codemirror/addon/tern.js",
  "./js/libs/acorn/acorn.js",
  "./js/libs/acorn/acorn_loose.js",
  "./js/libs/acorn/walk.js",
  "./js/libs/ternjs/polyfill.js",
  "./js/libs/ternjs/signal.js",
  "./js/libs/ternjs/tern.js",
  "./js/libs/ternjs/def.js",
  "./js/libs/ternjs/comment.js",
  "./js/libs/ternjs/infer.js",
  "./js/libs/ternjs/doc_comment.js",
  "./js/libs/tern-threejs/threejs.js",

  "./js/libs/signals.min.js",
  "./js/libs/ui.js",
  "./js/libs/ui.three.js",

  "./js/libs/app.js",
  "./js/Player.js",
  "./js/Script.js",

  //

  "./css/main.css",

  "./js/EditorControls.js",
  "./js/Storage.js",

  "./js/Editor.js",
  "./js/Config.js",
  "./js/History.js",
  "./js/Loader.js",
  "./js/LoaderUtils.js",
  "./js/Menubar.js",
  "./js/Menubar.File.js",
  "./js/Menubar.Edit.js",
  "./js/Menubar.Add.js",
  "./js/Menubar.Play.js",
  "./js/Menubar.Examples.js",
  "./js/Menubar.Help.js",
  "./js/Menubar.View.js",
  "./js/Menubar.Status.js",
  "./js/Resizer.js",
  "./js/Sidebar.js",
  "./js/Sidebar.Scene.js",
  "./js/Sidebar.Project.js",
  "./js/Sidebar.Project.Materials.js",
  "./js/Sidebar.Project.Renderer.js",
  "./js/Sidebar.Project.Video.js",
  "./js/Sidebar.Settings.js",
  "./js/Sidebar.Settings.History.js",
  "./js/Sidebar.Settings.Shortcuts.js",
  "./js/Sidebar.Settings.Viewport.js",
  "./js/Sidebar.Properties.js",
  "./js/Sidebar.Object.js",
  "./js/Sidebar.Geometry.js",
  "./js/Sidebar.Geometry.BufferGeometry.js",
  "./js/Sidebar.Geometry.Modifiers.js",
  "./js/Sidebar.Geometry.BoxGeometry.js",
  "./js/Sidebar.Geometry.CapsuleGeometry.js",
  "./js/Sidebar.Geometry.CircleGeometry.js",
  "./js/Sidebar.Geometry.CylinderGeometry.js",
  "./js/Sidebar.Geometry.DodecahedronGeometry.js",
  "./js/Sidebar.Geometry.ExtrudeGeometry.js",
  "./js/Sidebar.Geometry.IcosahedronGeometry.js",
  "./js/Sidebar.Geometry.LatheGeometry.js",
  "./js/Sidebar.Geometry.OctahedronGeometry.js",
  "./js/Sidebar.Geometry.PlaneGeometry.js",
  "./js/Sidebar.Geometry.RingGeometry.js",
  "./js/Sidebar.Geometry.SphereGeometry.js",
  "./js/Sidebar.Geometry.ShapeGeometry.js",
  "./js/Sidebar.Geometry.TetrahedronGeometry.js",
  "./js/Sidebar.Geometry.TorusGeometry.js",
  "./js/Sidebar.Geometry.TorusKnotGeometry.js",
  "./js/Sidebar.Geometry.TubeGeometry.js",
  "./js/Sidebar.Geometry.TeapotGeometry.js",
  "./js/Sidebar.Material.js",
  "./js/Sidebar.Material.BooleanProperty.js",
  "./js/Sidebar.Material.ColorProperty.js",
  "./js/Sidebar.Material.ConstantProperty.js",
  "./js/Sidebar.Material.MapProperty.js",
  "./js/Sidebar.Material.NumberProperty.js",
  "./js/Sidebar.Material.Program.js",
  "./js/Sidebar.Animation.js",
  "./js/Sidebar.Script.js",
  "./js/Strings.js",
  "./js/Toolbar.js",
  "./js/Viewport.js",
  "./js/Viewport.Camera.js",
  "./js/Viewport.Info.js",
  "./js/Viewport.ViewHelper.js",
  "./js/Viewport.VR.js",

  "./js/Command.js",
  "./js/commands/AddObjectCommand.js",
  "./js/commands/RemoveObjectCommand.js",
  "./js/commands/MoveObjectCommand.js",
  "./js/commands/SetPositionCommand.js",
  "./js/commands/SetRotationCommand.js",
  "./js/commands/SetScaleCommand.js",
  "./js/commands/SetValueCommand.js",
  "./js/commands/SetUuidCommand.js",
  "./js/commands/SetColorCommand.js",
  "./js/commands/SetGeometryCommand.js",
  "./js/commands/SetGeometryValueCommand.js",
  "./js/commands/MultiCmdsCommand.js",
  "./js/commands/AddScriptCommand.js",
  "./js/commands/RemoveScriptCommand.js",
  "./js/commands/SetScriptValueCommand.js",
  "./js/commands/SetMaterialCommand.js",
  "./js/commands/SetMaterialColorCommand.js",
  "./js/commands/SetMaterialMapCommand.js",
  "./js/commands/SetMaterialValueCommand.js",
  "./js/commands/SetMaterialVectorCommand.js",
  "./js/commands/SetSceneCommand.js",
  "./js/commands/Commands.js",

  //

  "./examples/arkanoid.app.json",
  "./examples/camera.app.json",
  "./examples/particles.app.json",
  "./examples/pong.app.json",
  "./examples/shaders.app.json",
];

self.addEventListener("install", async function () {
  const cache = await caches.open(cacheName);

  assets.forEach(function (asset) {
    cache.add(asset).catch(function () {
      console.warn("[SW] Cound't cache:", asset);
    });
  });
});

self.addEventListener("fetch", async function (event) {
  const request = event.request;
  event.respondWith(networkFirst(request));
});

async function networkFirst(request) {
  return fetch(request)
    .then(async function (response) {
      const cache = await caches.open(cacheName);

      cache.put(request, response.clone());

      return response;
    })
    .catch(async function () {
      const cachedResponse = await caches.match(request);

      if (cachedResponse === undefined) {
        console.warn("[SW] Not cached:", request.url);
      }

      return cachedResponse;
    });
}
