import * as THREE from "three";
import arkanoidURL from "$lib/examples/arkanoid.app.json?url";
import cameraURL from "$lib/examples/camera.app.json?url";
import particlesURL from "$lib/examples/particles.app.json?url";
import pongURL from "$lib/examples/pong.app.json?url";
import shadersURL from "$lib/examples/shaders.app.json?url";

import { UIPanel, UIRow } from "./libs/ui.js";

function MenubarExamples(editor) {
  const strings = editor.strings;

  const container = new UIPanel();
  container.setClass("menu");

  const title = new UIPanel();
  title.setClass("title");
  title.setTextContent(strings.getKey("menubar/examples"));
  container.add(title);

  const options = new UIPanel();
  options.setClass("options");
  container.add(options);

  // Examples

  const items = [
    { title: "menubar/examples/Arkanoid", url: arkanoidURL },
    { title: "menubar/examples/Camera", url: cameraURL },
    { title: "menubar/examples/Particles", url: particlesURL },
    { title: "menubar/examples/Pong", url: pongURL },
    { title: "menubar/examples/Shaders", url: shadersURL },
  ];

  const loader = new THREE.FileLoader();

  for (let i = 0; i < items.length; i++) {
    (function (i) {
      const item = items[i];

      const option = new UIRow();
      option.setClass("option");
      option.setTextContent(strings.getKey(item.title));
      option.onClick(function () {
        if (confirm("Any unsaved data will be lost. Are you sure?")) {
          loader.load(item.url, function (text) {
            editor.clear();
            editor.fromJSON(JSON.parse(text));
          });
        }
      });
      options.add(option);
    })(i);
  }

  return container;
}

export { MenubarExamples };
