<template>
  <div id="myThreeJsCanvas"></div>
</template>


<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "CanvasModel",
  data() {
    return {
      scene: undefined,
      camera: undefined,
      renderer: undefined,
      controls: undefined,
      groundMaterial: undefined,
      groundMesh: undefined,
      canvas2: undefined,
      raycaster: undefined,
      position: undefined,
      pointer: undefined,
      container: undefined,
      currentIntersection: null,
      canvasComponent2: undefined,
    };
  },
  props: {
    canvas: Object,
    canvasComponent: Object,
  },
  watch: {
    canvas: function () {
      this.canvas2 = this.canvas;
      this.canvas2.on("after:render", () => {
        this.groundMesh.material.map.needsUpdate = true;
      });
    },
    canvasComponent: function () {
      this.canvasComponent2 = this.canvasComponent;
    },
  },
  methods: {
    init() {
      // START: initialize scene and background
      const BACKGROUND_COLOR = "thistle";
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(BACKGROUND_COLOR);
      this.container = document.getElementById("myThreeJsCanvas");
      // END : Scene and background

      // START: initialize renderer
      this.renderer = new THREE.WebGLRenderer({
        container: this.container,
        antialias: true,
        alpha: true,
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.domElement.id = "fCanvas";
      // END: Renderer

      // START: Raycast event
      this.pointer = new THREE.Vector2();
      this.position = new THREE.Vector2();
      this.raycaster = new THREE.Raycaster();
      // END: Raycast event

      // START: Get container
      this.container = document.getElementById("myThreeJsCanvas");
      this.renderer.setSize(500, 500);
      this.renderer.shadowMap.enabled = true;
      this.container.appendChild(this.renderer.domElement);
      // END: Get container

      this.container.addEventListener("mousemove", this.onPointerMove);
      this.container.addEventListener("mousedown", this.onClick);

      // START: Adding camera
      this.camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
      this.camera.position.set(0, 3, 50);
      // END: Adding camera

      // START: Adding controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.autoRotate = false;
      this.controls.enablePan = false;
      this.controls.enableDamping = true;
      this.controls.target.set(0, 0, 0);
      this.controls.addEventListener("change", this.renderScene);
      window.addEventListener("resize", () => this.onWindowResize(), false);
      // END: Adding controls

      // START: Adding light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(3, 3, 0);
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.2);
      hemiLight.position.set(0, 50, 0);
      this.scene.add(hemiLight);
      // END: Adding light

      //Add an object
      const groundGeometry = new THREE.CylinderGeometry(5, 5, 20, 32);

      //Create Canvas Texture
      const fabricCanvas = document.getElementById("mycanvas");
      const canvasTexture = new THREE.Texture(fabricCanvas);
      this.groundMesh = new THREE.Mesh(
        groundGeometry,
        new THREE.MeshStandardMaterial({
          map: canvasTexture,
          //color: "#ffffff",
          metalness: 0.25,
          roughness: 0.25,
          transparent: true,
          side: THREE.DoubleSide,
        })
      );
      this.scene.add(this.groundMesh);
      this.animate();
    },

    onPointerMove(event) {
      const array = this.getMousePosition(
        this.container,
        event.clientX,
        event.clientY
      );
      this.position.fromArray(array);
      let intersects = this.getIntersects(this.position, this.scene.children);
      if (intersects.length > 0) {
        this.currentIntersection = intersects[0].object;
        this.currentIntersection.material.color.set("#D2F1FA");
      } else {
        if (this.currentIntersection !== null) {
          this.currentIntersection.material.color.set(0xffffff);
          this.currentIntersection = null;
        }
      }
    },

    onClick(event) {
      const array = this.getMousePosition(
        this.container,
        event.clientX,
        event.clientY
      );
      this.position.fromArray(array);
      const intersects = this.getIntersects(this.position, this.scene.children);
      this.canvas2.discardActiveObject();
      if (intersects.length > 0 && intersects[0].uv) {
        const uv = intersects[0].uv;
        this.canvasComponent2.setCrossPosition(uv.x, uv.y);
      }
    },

    getMousePosition(dom, x, y) {
      var rect = dom.getBoundingClientRect();
      return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
    },

    getIntersects(point, objects) {
      this.pointer.set(point.x * 2 - 1, -(point.y * 2) + 1);
      this.raycaster.setFromCamera(this.pointer, this.camera);
      return this.raycaster.intersectObjects(objects);
    },

    // render scene
    renderScene() {
      this.renderer.render(this.scene, this.camera);
    },

    //loop animation
    animate() {
      window.requestAnimationFrame(this.animate.bind(this));
      this.renderScene();
      this.controls.update();
    },
  },
  mounted() {
    this.init();
  },
};
</script>