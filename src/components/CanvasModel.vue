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
    };
  },
  props: {
    canvas: Object,
  },
  watch: {
    canvas: function () {
      this.canvas2 = this.canvas;
      this.canvas2.on("after:render", () => {
        this.groundMesh.material.map.needsUpdate = true;
      });
    },
  },
  methods: {
    init() {
      //initialize scene and background
      const BACKGROUND_COLOR = "pink";
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(BACKGROUND_COLOR);

      //initialize renderer
      this.renderer = new THREE.WebGLRenderer({
        container,
        antialias: true,
        alpha: true,
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.outputEncoding = THREE.sRGBEncoding;

      //get container
      const container = document.getElementById("myThreeJsCanvas");
      this.renderer.setSize(500, 500);
      this.renderer.shadowMap.enabled = true;
      container.appendChild(this.renderer.domElement);

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
      // END

      //Add an object
      const groundGeometry = new THREE.CylinderGeometry(5, 5, 20, 32);

      //Create Canvas Texture
      const fabricCanvas = document.getElementById("mycanvas");
      const canvasTexture = new THREE.Texture(fabricCanvas);
      this.groundMesh = new THREE.Mesh(
        groundGeometry,
        new THREE.MeshStandardMaterial({
          map: canvasTexture,
          metalness: 0.25,
          roughness: 0.25,
          transparent: true,
          side: THREE.DoubleSide,
        })
      );
      this.scene.add(this.groundMesh);
      this.animate();
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