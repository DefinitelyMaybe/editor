import * as THREE from "three";

import { Config } from "./Config.js";
import { Loader } from "./Loader.js";
import { History as _History } from "./History.js";
import { Strings } from "./Strings.js";
import { Storage as _Storage } from "./Storage.js";

var _DEFAULT_CAMERA = new THREE.PerspectiveCamera(50, 1, 0.01, 1000);
_DEFAULT_CAMERA.name = "Camera";
_DEFAULT_CAMERA.position.set(0, 5, 10);
_DEFAULT_CAMERA.lookAt(new THREE.Vector3());

// was: 	var Signal = signals.Signal;
class Signal {
  funcs = [];
  constructor(name) {
    this.name = name;
  }
  add(fn) {
    // console.info(`${this.name} signal adding new function:`);
    // console.info(fn);
    this.funcs.push(fn);
  }
  dispatch(args) {
    // console.info(`${this.name} signal dispatching`);
    this.funcs.forEach((fn) => {
      fn(args);
    });
  }
}

export class Editor {
  signals = {
    // script

    editScript: new Signal("editScript"),

    // player

    startPlayer: new Signal("startPlayer"),
    stopPlayer: new Signal("stopPlayer"),

    // vr

    toggleVR: new Signal("toggleVR"),
    exitedVR: new Signal("exitedVR"),

    // notifications

    editorCleared: new Signal("editorCleared"),

    savingStarted: new Signal("savingStarted"),
    savingFinished: new Signal("savingFinished"),

    transformModeChanged: new Signal("transformModeChanged"),
    snapChanged: new Signal("snapChanged"),
    spaceChanged: new Signal("spaceChanged"),
    rendererCreated: new Signal("rendererCreated"),
    rendererUpdated: new Signal("rendererUpdated"),

    sceneBackgroundChanged: new Signal("sceneBackgroundChanged"),
    sceneEnvironmentChanged: new Signal("sceneEnvironmentChanged"),
    sceneFogChanged: new Signal("sceneFogChanged"),
    sceneFogSettingsChanged: new Signal("sceneFogSettingsChanged"),
    sceneGraphChanged: new Signal("sceneGraphChanged"),
    sceneRendered: new Signal("sceneRendered"),

    cameraChanged: new Signal("cameraChanged"),
    cameraResetted: new Signal("cameraResetted"),

    geometryChanged: new Signal("geometryChanged"),

    objectSelected: new Signal("objectSelected"),
    objectFocused: new Signal("objectFocused"),

    objectAdded: new Signal("objectAdded"),
    objectChanged: new Signal("objectChanged"),
    objectRemoved: new Signal("objectRemoved"),

    cameraAdded: new Signal("cameraAdded"),
    cameraRemoved: new Signal("cameraRemoved"),

    helperAdded: new Signal("helperAdded"),
    helperRemoved: new Signal("helperRemoved"),

    materialAdded: new Signal("materialAdded"),
    materialChanged: new Signal("materialChanged"),
    materialRemoved: new Signal("materialRemoved"),

    scriptAdded: new Signal("scriptAdded"),
    scriptChanged: new Signal("scriptChanged"),
    scriptRemoved: new Signal("scriptRemoved"),

    windowResize: new Signal("windowResize"),

    showGridChanged: new Signal("showGridChanged"),
    showHelpersChanged: new Signal("showHelpersChanged"),
    refreshSidebarObject3D: new Signal("refreshSidebarObject3D"),
    historyChanged: new Signal("historyChanged"),

    viewportCameraChanged: new Signal("viewportCameraChanged"),
  };

  config = new Config();
  history = new _History(this);
  storage = new _Storage();
  strings = new Strings(this.config);

  loader = new Loader(this);

  camera = _DEFAULT_CAMERA.clone();

  scene = new THREE.Scene();

  sceneHelpers = new THREE.Scene();

  object = {};
  geometries = {};
  materials = {};
  textures = {};
  scripts = {};

  materialsRefCounter = new Map(); // tracks how often is a material used by a 3D object

  mixer = new THREE.AnimationMixer(this.scene);

  selected = null;
  helpers = {};

  cameras = {};
  viewportCamera = this.camera;

  constructor() {
    this.scene.name = "Scene";
    this.addCamera(this.camera);
  }

  setScene(scene) {
    this.scene.uuid = scene.uuid;
    this.scene.name = scene.name;

    this.scene.background = scene.background;
    this.scene.environment = scene.environment;
    this.scene.fog = scene.fog;

    this.scene.userData = JSON.parse(JSON.stringify(scene.userData));

    // avoid render per object

    this.signals.sceneGraphChanged.active = false;

    while (scene.children.length > 0) {
      this.addObject(scene.children[0]);
    }

    this.signals.sceneGraphChanged.active = true;
    this.signals.sceneGraphChanged.dispatch();
  }

  //

  addObject(object, parent, index) {
    var scope = this;

    object.traverse(function (child) {
      if (child.geometry !== undefined) scope.addGeometry(child.geometry);
      if (child.material !== undefined) scope.addMaterial(child.material);

      scope.addCamera(child);
      scope.addHelper(child);
    });

    if (parent === undefined) {
      this.scene.add(object);
    } else {
      parent.children.splice(index, 0, object);
      object.parent = parent;
    }

    this.signals.objectAdded.dispatch(object);
    this.signals.sceneGraphChanged.dispatch();
  }

  moveObject(object, parent, before) {
    if (parent === undefined) {
      parent = this.scene;
    }

    parent.add(object);

    // sort children array

    if (before !== undefined) {
      var index = parent.children.indexOf(before);
      parent.children.splice(index, 0, object);
      parent.children.pop();
    }

    this.signals.sceneGraphChanged.dispatch();
  }

  nameObject(object, name) {
    object.name = name;
    this.signals.sceneGraphChanged.dispatch();
  }

  removeObject(object) {
    if (object.parent === null) return; // avoid deleting the camera or scene

    var scope = this;

    object.traverse(function (child) {
      scope.removeCamera(child);
      scope.removeHelper(child);

      if (child.material !== undefined) scope.removeMaterial(child.material);
    });

    object.parent.remove(object);

    this.signals.objectRemoved.dispatch(object);
    this.signals.sceneGraphChanged.dispatch();
  }

  addGeometry(geometry) {
    this.geometries[geometry.uuid] = geometry;
  }

  setGeometryName(geometry, name) {
    geometry.name = name;
    this.signals.sceneGraphChanged.dispatch();
  }

  addMaterial(material) {
    if (Array.isArray(material)) {
      for (var i = 0, l = material.length; i < l; i++) {
        this.addMaterialToRefCounter(material[i]);
      }
    } else {
      this.addMaterialToRefCounter(material);
    }

    this.signals.materialAdded.dispatch();
  }

  addMaterialToRefCounter(material) {
    var materialsRefCounter = this.materialsRefCounter;

    var count = materialsRefCounter.get(material);

    if (count === undefined) {
      materialsRefCounter.set(material, 1);
      this.materials[material.uuid] = material;
    } else {
      count++;
      materialsRefCounter.set(material, count);
    }
  }

  removeMaterial(material) {
    if (Array.isArray(material)) {
      for (var i = 0, l = material.length; i < l; i++) {
        this.removeMaterialFromRefCounter(material[i]);
      }
    } else {
      this.removeMaterialFromRefCounter(material);
    }

    this.signals.materialRemoved.dispatch();
  }

  removeMaterialFromRefCounter(material) {
    var materialsRefCounter = this.materialsRefCounter;

    var count = materialsRefCounter.get(material);
    count--;

    if (count === 0) {
      materialsRefCounter.delete(material);
      delete this.materials[material.uuid];
    } else {
      materialsRefCounter.set(material, count);
    }
  }

  getMaterialById(id) {
    var material;
    var materials = Object.values(this.materials);

    for (var i = 0; i < materials.length; i++) {
      if (materials[i].id === id) {
        material = materials[i];
        break;
      }
    }

    return material;
  }

  setMaterialName(material, name) {
    material.name = name;
    this.signals.sceneGraphChanged.dispatch();
  }

  addTexture(texture) {
    this.textures[texture.uuid] = texture;
  }

  //

  addCamera(camera) {
    if (camera.isCamera) {
      this.cameras[camera.uuid] = camera;

      this.signals.cameraAdded.dispatch(camera);
    }
  }

  removeCamera(camera) {
    if (this.cameras[camera.uuid] !== undefined) {
      delete this.cameras[camera.uuid];

      this.signals.cameraRemoved.dispatch(camera);
    }
  }

  //

  addHelper() {
    var geometry = new THREE.SphereGeometry(2, 4, 2);
    var material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      visible: false,
    });

    return function (object, helper) {
      if (helper === undefined) {
        if (object.isCamera) {
          helper = new THREE.CameraHelper(object);
        } else if (object.isPointLight) {
          helper = new THREE.PointLightHelper(object, 1);
        } else if (object.isDirectionalLight) {
          helper = new THREE.DirectionalLightHelper(object, 1);
        } else if (object.isSpotLight) {
          helper = new THREE.SpotLightHelper(object);
        } else if (object.isHemisphereLight) {
          helper = new THREE.HemisphereLightHelper(object, 1);
        } else if (object.isSkinnedMesh) {
          helper = new THREE.SkeletonHelper(object.skeleton.bones[0]);
        } else if (object.isBone === true && object.parent?.isBone !== true) {
          helper = new THREE.SkeletonHelper(object);
        } else {
          // no helper for this object type
          return;
        }

        const picker = new THREE.Mesh(geometry, material);
        picker.name = "picker";
        picker.userData.object = object;
        helper.add(picker);
      }

      this.sceneHelpers.add(helper);
      this.helpers[object.id] = helper;

      this.signals.helperAdded.dispatch(helper);
    };
  }

  removeHelper(object) {
    if (this.helpers[object.id] !== undefined) {
      var helper = this.helpers[object.id];
      helper.parent.remove(helper);

      delete this.helpers[object.id];

      this.signals.helperRemoved.dispatch(helper);
    }
  }

  //

  addScript(object, script) {
    if (this.scripts[object.uuid] === undefined) {
      this.scripts[object.uuid] = [];
    }

    this.scripts[object.uuid].push(script);

    this.signals.scriptAdded.dispatch(script);
  }

  removeScript(object, script) {
    if (this.scripts[object.uuid] === undefined) return;

    var index = this.scripts[object.uuid].indexOf(script);

    if (index !== -1) {
      this.scripts[object.uuid].splice(index, 1);
    }

    this.signals.scriptRemoved.dispatch(script);
  }

  getObjectMaterial(object, slot) {
    var material = object.material;

    if (Array.isArray(material) && slot !== undefined) {
      material = material[slot];
    }

    return material;
  }

  setObjectMaterial(object, slot, newMaterial) {
    if (Array.isArray(object.material) && slot !== undefined) {
      object.material[slot] = newMaterial;
    } else {
      object.material = newMaterial;
    }
  }

  setViewportCamera(uuid) {
    this.viewportCamera = this.cameras[uuid];
    this.signals.viewportCameraChanged.dispatch();
  }

  //

  select(object) {
    if (this.selected === object) return;

    var uuid = null;

    if (object !== null) {
      uuid = object.uuid;
    }

    this.selected = object;

    this.config.setKey("selected", uuid);
    this.signals.objectSelected.dispatch(object);
  }

  selectById(id) {
    if (id === this.camera.id) {
      this.select(this.camera);
      return;
    }

    this.select(this.scene.getObjectById(id));
  }

  selectByUuid(uuid) {
    var scope = this;

    this.scene.traverse(function (child) {
      if (child.uuid === uuid) {
        scope.select(child);
      }
    });
  }

  deselect() {
    this.select(null);
  }

  focus(object) {
    if (object !== undefined) {
      this.signals.objectFocused.dispatch(object);
    }
  }

  focusById(id) {
    this.focus(this.scene.getObjectById(id));
  }

  clear() {
    this.history.clear();
    this.storage.clear();

    this.camera.copy(_DEFAULT_CAMERA);
    this.signals.cameraResetted.dispatch();

    this.scene.name = "Scene";
    this.scene.userData = {};
    this.scene.background = null;
    this.scene.environment = null;
    this.scene.fog = null;

    var objects = this.scene.children;

    while (objects.length > 0) {
      this.removeObject(objects[0]);
    }

    this.geometries = {};
    this.materials = {};
    this.textures = {};
    this.scripts = {};

    this.materialsRefCounter.clear();

    this.animations = {};
    this.mixer.stopAllAction();

    this.deselect();

    this.signals.editorCleared.dispatch();
  }

  //

  async fromJSON(json) {
    var loader = new THREE.ObjectLoader();
    var camera = await loader.parseAsync(json.camera);

    this.camera.copy(camera);
    this.signals.cameraResetted.dispatch();

    this.history.fromJSON(json.history);
    this.scripts = json.scripts;

    this.setScene(await loader.parseAsync(json.scene));
  }

  toJSON() {
    // scripts clean up

    var scene = this.scene;
    var scripts = this.scripts;

    for (var key in scripts) {
      var script = scripts[key];

      if (
        script.length === 0 ||
        scene.getObjectByProperty("uuid", key) === undefined
      ) {
        delete scripts[key];
      }
    }

    //

    return {
      metadata: {},
      project: {
        shadows: this.config.getKey("project/renderer/shadows"),
        shadowType: this.config.getKey("project/renderer/shadowType"),
        vr: this.config.getKey("project/vr"),
        physicallyCorrectLights: this.config.getKey(
          "project/renderer/physicallyCorrectLights"
        ),
        toneMapping: this.config.getKey("project/renderer/toneMapping"),
        toneMappingExposure: this.config.getKey(
          "project/renderer/toneMappingExposure"
        ),
      },
      camera: this.camera.toJSON(),
      scene: this.scene.toJSON(),
      scripts: this.scripts,
      history: this.history.toJSON(),
    };
  }

  objectByUuid(uuid) {
    return this.scene.getObjectByProperty("uuid", uuid, true);
  }

  execute(cmd, optionalName) {
    this.history.execute(cmd, optionalName);
  }

  undo() {
    this.history.undo();
  }

  redo() {
    this.history.redo();
  }
}
