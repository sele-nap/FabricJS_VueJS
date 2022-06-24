<template>
  <div id="myThreeJsCanvas"></div>
</template>


<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default {
  name: "CanvasModel",
  data() {
    return {
      scene: undefined,
      camera: undefined,
      renderer: undefined,
      controls: undefined,
      groundMaterial: undefined,
      object: undefined,
      canvas2: undefined,
      raycaster: undefined,
      position: undefined,
      pointer: undefined,
      container: undefined,
      currentIntersection: null,
      canvasComponent2: undefined,
      fcanvas: undefined,
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
        this.object.children[0].material.map.needsUpdate = true;
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
      this.renderer.domElement.id = "canvas2";
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
      // const groundGeometry = new THREE.CylinderGeometry(5, 5, 20, 32);

      //Create Canvas Texture
      const fabricCanvas = document.getElementById("mycanvas");
      const canvasTexture = new THREE.CanvasTexture(fabricCanvas);
      this.loader = new OBJLoader();
      this.material = new THREE.MeshPhysicalMaterial({
        color: 16777215,
        roughness: 0.07,
        emissive: 0,
        clearcoat: 0.27,
        clearcoatRoughness: 0.06,
        refractionRatio: 0.98,
        opacity: 0.99,
        transparent: true,
        transmission: 1,
        map: canvasTexture,
      });
      this.loader.load("/Cabernet.obj", (obj) => {
        this.object = obj;
        this.object.scale.set(0.1, 0.1, 0.1);
        this.object.position.set(0, -10, 0);
        this.object.children[0].material = this.material;
        console.log(JSON.stringify(obj.children[0].material));
        this.scene.add(this.object);
      });
      // const canvasTexture = new THREE.Texture(fabricCanvas);
      // this.groundMesh = new THREE.Mesh(
      //   groundGeometry,
      //   new THREE.MeshStandardMaterial({
      //     map: canvasTexture,
      //     metalness: 0.25,
      //     roughness: 0.25,
      //     transparent: true,
      //     side: THREE.DoubleSide,
      //   })
      // );
      // this.scene.add(this.groundMesh);
      this.animate();
      this.fcanvas = document.getElementById("canvas2");
      this.fcanvas.addEventListener("mousemove", this.onMouseMove);
      this.fcanvas.addEventListener("mousedown", this.onClick);
      this.fcanvas.addEventListener("mouseup", this.onMouseUp);
    },
    onClick(event) {
      const array = this.getMousePosition(
        this.fcanvas,
        event.clientX,
        event.clientY
      );
      this.position.fromArray(array);

      const intersects = this.getIntersects(this.position, this.scene.children);
      this.canvas2.discardActiveObject();
      if (intersects.length > 0 && intersects[0].uv) {
        const uv = intersects[0].uv;
        this.canvasComponent2.setCrossPosition(uv.x, uv.y);
        this.saveX = event.clientX;
        this.saveY = event.clientY;
        if (this.canvasComponent2.clickedObject) {
          this.controls.enableRotate = false;
          this.centerX =
            (event.clientX * this.canvasComponent2.clickedObject.left) /
            this.canvasComponent2.xCross;
          this.centerY =
            (event.clientY * this.canvasComponent2.clickedObject.top) /
            this.canvasComponent2.yCross;
          this.savedScaleX = this.canvasComponent2.clickedObject.scaleX;
          this.savedScaleY = this.canvasComponent2.clickedObject.scaleY;

          let modX =
            20 *
            Math.sin(
              ((this.canvasComponent2.clickedObject.angle - 180) * Math.PI) /
                -180
            );
          let modY =
            20 *
            Math.cos(
              ((this.canvasComponent2.clickedObject.angle - 180) * Math.PI) /
                -180
            );
          let corneto = JSON.parse(
            JSON.stringify(
              this.canvasComponent2.clickedObject.oCoords.mt.corner
            )
          );
          console.log(
            JSON.stringify(
              this.canvasComponent2.clickedObject.oCoords.mt.corner
            )
          );
          console.log("corner", corneto);
          console.log(modX);
          console.log(modY);
          corneto.tl.x += modX;
          corneto.tl.y += modY;
          corneto.tr.x += modX;
          corneto.tr.y += modY;
          corneto.br.x += modX;
          corneto.br.y += modY;
          corneto.bl.x += modX;
          corneto.bl.y += modY;

          console.log(
            "object",
            this.canvasComponent2.clickedObject.oCoords.mt.corner,
            "position x",
            this.canvasComponent2.clickedObject.oCoords.mt.x,
            "position y",
            this.canvasComponent2.clickedObject.oCoords.mt.y
          );
          console.log("corner after", corneto);
          this.canvasComponent2.clickedObject.angle += 10;
        }
      } else {
        this.controls.enableRotate = true;
        this.controls.update();
      }
    },
    onMouseUp() {
      this.canvasComponent2.clickedObject = null;
      this.controls.enableRotate = true;
      this.controls.update();
      document.body.style.cursor = "default";
    },
    onMouseMove(event) {
      event.preventDefault();
      if (
        this.canvasComponent2.clickedObject &&
        (event.buttons === 1 || event.touches) &&
        this.canvasComponent2.clickedObject.selectable &&
        this.canvasComponent2.clickedObject.evented
      ) {
        const coef = 30;
        let clientX = event.clientX;
        let clientY = event.clientY;
        const dist = Math.sqrt(
          Math.pow(Math.abs(this.camera.position.x), 2) +
            Math.pow(Math.abs(this.camera.position.y), 2) +
            Math.pow(Math.abs(this.camera.position.z), 2)
        );
        if (this.canvasComponent2.scalingPoint) {
          let scaleX =
            this.canvasComponent2.clickedObject.scaleX / this.savedScaleX;
          let scaleY =
            this.canvasComponent2.clickedObject.scaleY / this.savedScaleY;
          switch (this.canvasComponent2.scalingPoint) {
            case "tl":
            case "br":
              scaleX = (clientX - this.centerX) / (this.saveX - this.centerX);
              scaleY = (clientY - this.centerY) / (this.saveY - this.centerY);
              document.body.style.cursor = "nwse-resize";
              if (scaleX < scaleY) {
                scaleY = scaleX;
              }
              scaleX = scaleY;
              break;
            case "tr":
            case "bl":
              scaleX = (clientX - this.centerX) / (this.saveX - this.centerX);
              scaleY = (clientY - this.centerY) / (this.saveY - this.centerY);
              document.body.style.cursor = "nesw-resize";
              if (scaleX < scaleY) {
                scaleY = scaleX;
              }
              scaleX = scaleY;
              break;
            case "ml":
            case "mr":
              scaleX = (clientX - this.centerX) / (this.saveX - this.centerX);
              document.body.style.cursor = "ew-resize";
              break;
            case "mt":
            case "mb":
              scaleY = (clientY - this.centerY) / (this.saveY - this.centerY);
              document.body.style.cursor = "ns-resize";
              break;
            case "mtr":
              document.body.style.cursor = "grabbing";
              var angle =
                ((Math.atan2(clientX - this.centerX, clientY - this.centerY) *
                  -180) /
                  Math.PI +
                  180) %
                360;
              for (var i = 0; i < 380; i += 45) {
                if (Math.abs(angle - i) < 5) {
                  angle = i;
                }
              }
              this.canvasComponent2.clickedObject.angle = angle;
              break;
          }
          this.canvasComponent2.clickedObject.scaleX =
            this.savedScaleX * scaleX;
          this.canvasComponent2.clickedObject.scaleY =
            this.savedScaleY * scaleY;
          this.canvas2.renderAll();
        } else {
          document.body.style.cursor = "move";
          this.canvasComponent2.clickedObject.left +=
            ((clientX - this.saveX) * dist) / coef;
          this.canvasComponent2.clickedObject.top +=
            ((clientY - this.saveY) * dist) / coef;
          this.canvas2.renderAll();
          this.saveX = clientX;
          this.saveY = clientY;
        }
      }
    },
    getMousePosition(dom, x, y) {
      let rect = dom.getBoundingClientRect();
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