import * as THREE from "/third_party/three.module.js";
import * as dat from "/third_party/dat.gui.module.js";

import ColorMapLayer from "./layers/color-map.js";
import DifferenceLayer from "./layers/difference.js";
import ImageLayer from "./layers/image.js";
import ReactionDiffusionLayer from "./layers/reaction-diffusion.js";
import ReactionDiffusionTexLayer from "./layers/reaction-diffusion-tex.js";
import ReactionDiffusionCrulLayer from "./layers/reaction-diffusion-crul.js";
import WebcamLayer from "./layers/webcam.js";
import MirrorLayer from "./layers/mirror.js";

let canvas, camera, renderer, mesh, material, scenes, activeSceneIndex;

async function createScene1(width, height) {
  const colorMapLayer = new ColorMapLayer("./img/afb6-1.png");
  const reactionDiffusionLayer = new ReactionDiffusionLayer({
    dA: 1.0,
    dB: 0.47,
    feed: 0.0256,
    kill: 0.06,
    influence: 0.2,
  });

  const webcamLayer = new WebcamLayer();
  const differenceLayer = new DifferenceLayer();
  const mirrorLayer = new MirrorLayer();

  const layers = [webcamLayer, mirrorLayer, differenceLayer, reactionDiffusionLayer, colorMapLayer];

  for (const layer of layers) {
    await layer.setup(width, height);
  }
  return {
    name: "scene1",
    layers,
  };
}

async function createScene2(width, height) {
  const colorMapLayer = new ColorMapLayer("./img/gr-ge.png");
  const reactionDiffusionLayer = new ReactionDiffusionLayer({
    dA: 1.0,
    dB: 0.16,
    feed: 0.0345,
    kill: 0.0681,
    influence: 0.3,
  });
  const webcamLayer = new WebcamLayer();
  const differenceLayer = new DifferenceLayer();
  const mirrorLayer = new MirrorLayer();

  const layers = [webcamLayer, differenceLayer, reactionDiffusionLayer, colorMapLayer];

  for (const layer of layers) {
    await layer.setup(width, height);
  }
  return {
    name: "scene2",
    layers,
  };
}

async function createScene3(width, height) {
  const colorMapLayer = new ColorMapLayer("./img/z-b-g-w.png");
  const reactionDiffusionLayer = new ReactionDiffusionLayer({
    dA: 0.88,
    dB: 0.46,
    feed: 0.028,
    kill: 0.0581,
    influence: 0.18,
  });
  const webcamLayer = new WebcamLayer();
  const differenceLayer = new DifferenceLayer();
  const mirrorLayer = new MirrorLayer();

  const layers = [webcamLayer, differenceLayer, reactionDiffusionLayer, colorMapLayer];

  for (const layer of layers) {
    await layer.setup(width, height);
  }
  return {
    name: "scene3",
    layers,
  };
}

async function createScene4(width, height) {
  const colorMapLayer = new ColorMapLayer("./img/zw-wit.png");
  const reactionDiffusionTexLayer = new ReactionDiffusionTexLayer({
    dA: 0.87,
    dB: 0.45,
    feed: 0.0171,
    kill: 0.0778,
    influence: 0.18,
  });
  const webcamLayer = new WebcamLayer();
  const differenceLayer = new DifferenceLayer();
  const mirrorLayer = new MirrorLayer();

  const layers = [webcamLayer, differenceLayer, reactionDiffusionTexLayer, colorMapLayer];

  for (const layer of layers) {
    await layer.setup(width, height);
  }
  return {
    name: "scene4",
    layers,
  };
}

async function createScene5(width, height) {
  const colorMapLayer = new ColorMapLayer("./img/test.png");
  const reactionDiffusionLayer = new ReactionDiffusionLayer({
    dA: 1.0,
    dB: 0.47,
    feed: 0.0236,
    kill: 0.0616,
    influence: 0.2,
  });
  const webcamLayer = new WebcamLayer();
  const differenceLayer = new DifferenceLayer();
  const mirrorLayer = new MirrorLayer();

  const layers = [webcamLayer, differenceLayer, reactionDiffusionLayer, colorMapLayer];

  for (const layer of layers) {
    await layer.setup(width, height);
  }
  return {
    name: "scene5",
    layers,
  };
}

async function createScene6(width, height) {
  const colorMapLayer = new ColorMapLayer("./img/afb2.png");
  const reactionDiffusionCrulLayer = new ReactionDiffusionCrulLayer({
    dA: 1.0,
    dB: 1.0,
    feed: 0.02,
    kill: 0.0581,
    influence: 0.2,
  });
  const webcamLayer = new WebcamLayer();
  const differenceLayer = new DifferenceLayer();
  const mirrorLayer = new MirrorLayer();

  const layers = [webcamLayer, differenceLayer, reactionDiffusionCrulLayer, colorMapLayer];

  for (const layer of layers) {
    await layer.setup(width, height);
  }
  return {
    name: "scene6",
    layers,
  };
}

async function createScene7(width, height) {
  const colorMapLayer = new ColorMapLayer("./img/afb4.png");
  const reactionDiffusionLayer = new ReactionDiffusionLayer({
    dA: 0.7,
    dB: 0.3,
    feed: 0.0204,
    kill: 0.0583,
    influence: 0.2,
  });
  const webcamLayer = new WebcamLayer();
  const differenceLayer = new DifferenceLayer();
  const mirrorLayer = new MirrorLayer();

  const layers = [webcamLayer, mirrorLayer, differenceLayer, reactionDiffusionLayer, colorMapLayer];

  for (const layer of layers) {
    await layer.setup(width, height);
  }
  return {
    name: "scene7",
    layers,
  };
}

async function createScene8(width, height) {
  const colorMapLayer = new ColorMapLayer("./img/afb5-1.png");
  const reactionDiffusionLayer = new ReactionDiffusionLayer({
    dA: 1.0,
    dB: 0.3,
    feed: 0.02,
    kill: 0.0581,
    influence: 0.18,
  });
  const webcamLayer = new WebcamLayer();
  const differenceLayer = new DifferenceLayer();
  const mirrorLayer = new MirrorLayer();

  const layers = [webcamLayer, differenceLayer, reactionDiffusionLayer, colorMapLayer];

  for (const layer of layers) {
    await layer.setup(width, height);
  }
  return {
    name: "scene8",
    layers,
  };
}

async function main() {
  canvas = document.getElementById("c");
  let width = canvas.width;
  let height = canvas.height;

  const gui = new dat.GUI();
  window.gui = gui;

  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  renderer = new THREE.WebGLRenderer({
    canvas,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance",
    depth: false,
    stencil: false,
  });
  renderer.autoClear = false;
  renderer.setSize(width, height);

  const geometry = new THREE.PlaneGeometry(2, 2);
  material = new THREE.MeshBasicMaterial({ color: "white" });
  mesh = new THREE.Mesh(geometry, material);

  // Scenes
  scenes = [];
  scenes.push(await createScene4(width, height));
  scenes.push(await createScene8(width, height));
  scenes.push(await createScene6(width, height));
  scenes.push(await createScene1(width, height));
  scenes.push(await createScene3(width, height));
  scenes.push(await createScene5(width, height));
  scenes.push(await createScene2(width, height));
  scenes.push(await createScene7(width, height));

  activeSceneIndex = 0;

  requestAnimationFrame(animate);
}

function animate(elapsedTime) {
  const activeScene = scenes[activeSceneIndex];
  const layers = activeScene.layers;
  for (let i = 0; i < layers.length; i++) {
    layers[i].draw(renderer, camera, elapsedTime, layers[i - 1]);
  }

  let lastLayer = layers[layers.length - 1];
  material.map = lastLayer.target.texture;

  renderer.setRenderTarget(null);
  renderer.render(mesh, camera);

  requestAnimationFrame(animate);
}

function switchScene() {
  const oldScene = scenes[activeSceneIndex];
  const oldLayers = oldScene.layers;
  const oldColorMapLayer = oldLayers[oldLayers.length - 1];

  let newSceneIndex = activeSceneIndex + 1;
  if (newSceneIndex >= scenes.length) {
    newSceneIndex = 0;
  }

  const newScene = scenes[newSceneIndex];
  const newLayers = newScene.layers;
  const newColorMapLayer = newLayers[newLayers.length - 1];

  const timeline = gsap.timeline();
  timeline.to(oldColorMapLayer.material.uniforms.uOpacity, { value: 0, duration: 3 });
  timeline.add(() => {
    console.log("switch");
    activeSceneIndex = newSceneIndex;
  });
  timeline.set(newColorMapLayer.material.uniforms.uOpacity, { value: 0 });
  timeline.to(newColorMapLayer.material.uniforms.uOpacity, { value: 1, duration: 3 });
}

main();
window.addEventListener("dblclick", switchScene);
window.addEventListener("keydown", (e) => {
  if (e.key === "E") {
    switchScene();
  }
});
//(e switchScene);
// window.setInterval(switchScene,  5 * 60 * 1000);
