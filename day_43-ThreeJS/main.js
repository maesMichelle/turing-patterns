import * as THREE from "https://unpkg.com/three/build/three.module.js";
import * as dat from "https://unpkg.com/dat.gui@0.7.7/build/dat.gui.module.js";

const gui = new dat.GUI();
const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(
//  75,
//  window.innerWidth / window.innerHeight,
//  0.1,
//  1000
//);

const camera = new THREE.OrthographicCamera(-400, 400, 300, -300, 1, 100);

const canvas = document.getElementById("c");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(800, 600);

const textureLoader = new THREE.TextureLoader();
const imgTexture = textureLoader.load("./img/vleugel.png");

const vertexShader = `
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;


void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    vUv = uv;
}
`;
const fragmentShader = `
precision mediump float;

uniform float uTime;
uniform sampler2D uTexture;
uniform float udA;
uniform float udB;
uniform float uFeed;
uniform float uKill;


varying vec2 vUv;

vec4 laplace(vec2 uv) {
  vec4 sum = vec4(1.0);
  //center point
  sum += texture2D(uTexture, uv) * -1.0;

  //cross
  sum += texture2D(uTexture, uv - vec2(-1.0,  0.0)) * 0.2;
  sum += texture2D(uTexture, uv - vec2( 1.0,  0.0)) * 0.2;
  sum += texture2D(uTexture, uv - vec2( 0.0, -1.0)) * 0.2;
  sum += texture2D(uTexture, uv - vec2( 0.0,  1.0)) * 0.2;

  //corner
  sum += texture2D(uTexture, uv - vec2(-1.0, -1.0)) * 0.05;
  sum += texture2D(uTexture, uv - vec2( 1.0, -1.0)) * 0.05;
  sum += texture2D(uTexture, uv - vec2( 1.0,  1.0)) * 0.05;
  sum += texture2D(uTexture, uv - vec2(-1.0,  1.0)) * 0.05;

  return sum;

}

vec4 react(vec4 pixel, vec4 neighbors) {
  float a = pixel.r;
  float b = pixel.g;

  float reactionRate = a * b * b;
  

  a = a * udA * neighbors.r - reactionRate + uFeed * (1.0 -a);
  b = b * udB * neighbors.g + reactionRate - (uKill + uFeed) * b;
        

  //
  return vec4(a, b, 1.0, 1.0);

}

void main() {
    vec2 uv = vUv;
    vec4 pixel = texture2D(uTexture, uv);
    vec4 neighbors = laplace(uv);
    vec4 result = react(pixel, neighbors);

    gl_FragColor = result;

}
`;

const geometry = new THREE.PlaneGeometry(800, 600);
const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uBrightness: { value: 1.0 },
    uTime: { value: 0.0 },
    uTexture: { value: imgTexture },
    udA: { value: 1.0 },
    udB: { value: 0.6 },
    uFeed: { value: 1.0 },
    uKill: { value: 0.2 },
  },
  //wireframe: true,
});

gui.add(material.uniforms.udA, "value").min(0).max(1).step(0.01).name("dA");
gui.add(material.uniforms.udB, "value").min(0).max(1).step(0.01).name("dB");
gui.add(material.uniforms.uFeed, "value").min(0).max(1).step(0.01).name("Feed");
gui.add(material.uniforms.uKill, "value").min(0).max(1).step(0.01).name("Kill");

//const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 1;

function animate(elapsedTime) {
  //material.uniforms.uBrightness.value += 0.01;
  material.uniforms.uTime.value = elapsedTime;
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
