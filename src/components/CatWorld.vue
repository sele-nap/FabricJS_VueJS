<template>
  <div class="container lg m-auto flex justify-center">
    <div class="canvas">
      <canvas v-bind:id="idCanvas"></canvas>
      <button class="rounded-full outline outline-offset-0 outline-pink-500">
        <ButtonsList @add-shape="createShape($event)" :shapes="shapes" />
      </button>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";
import ButtonsList from "./ButtonsList.vue";

export default {
  name: "CatWorld",
  components: {
    ButtonsList,
  },
  data() {
    return {
      idCanvas: "idCanvas",

      shapes: [
        {
          type: "Circle",
          icon: "circle-fill",
          fill: "Purple",
          originX: "center",
          originY: "center",
          radius: 50,
          selectedFill: "gold",
        },
        {
          type: "Rectangle",
          icon: "square-fill",
          fill: "Yellow",
          originX: "center",
          originY: "center",
          height: 100,
          width: 100,
          selectedFill: "gold",
        },
      ],
    };
  },

  methods: {
    init() {
      return new fabric.Canvas(this.idCanvas, {
        width: 500,
        height: 500,
        selection: false,
        backgroundColor: "MediumPurple",
      });
    },
    setCanvasColor(url, canvas) {
      canvas.setBackgroundColor({ source: url, repeat: "repeat" }, function () {
        canvas.renderAll();
      });
    },
    createCir(canvas) {
      const canvasCenter = canvas.getCenter();
      const circle = new fabric.Circle({
        radius: 50,
        fill: "orange",
        left: canvasCenter.left,
        top: -50,
        originX: "center",
        originY: "center",
        cornerColor: "white",
        objectCaching: false,
      });
      canvas.add(circle);
      canvas.renderAll();
      circle.animate("top", canvas.height - 50, {
        onChange: canvas.renderAll.bind(canvas),
        onComplete: () => {
          circle.animate("top", canvasCenter.top, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 200,
            easing: fabric.util.ease.easeOutBounce,
          });
        },
      });
      circle.on("selected", () => {
        circle.set("fill", "gold");
        canvas.requestRenderAll();
      });
      circle.on("deselected", () => {
        circle.set("fill", "orange");
        canvas.requestRenderAll();
      });
    },
    createRec(canvas) {
      const canvasCenter = canvas.getCenter();
      const rect = new fabric.Rect({
        height: 100,
        width: 100,
        fill: "green",
        left: canvasCenter.left,
        top: -50,
        originX: "center",
        originY: "center",
        cornerColor: "white",
        objectCaching: false,
      });
      canvas.add(rect);
      canvas.renderAll();
      rect.animate("top", canvasCenter.top, {
        onChange: canvas.renderAll.bind(canvas),
      });
      rect.on("selected", () => {
        rect.set("fill", "lightgreen");
        canvas.renderAll();
      });
      rect.on("deselected", () => {
        rect.set("fill", "green");
        canvas.renderAll();
      });
    },
    changeBg(event) {
      const child = this.$refs.canvas;
      const canvas = child._data.canvas;
      const pattern = event.target.dataset.key;
      child.setCanvasColor(pattern, canvas);
    },
    createShape(event) {
      const child = this.$refs.canvas;
      const canvas = child._data.canvas;
      if (event.target.dataset.key === "Circle") {
        child.createCir(canvas);
      } else if (event.target.dataset.key === "Rectangle") {
        console.log("hi");
        child.createRec(canvas);
      }
    },
    exportCanvas() {
      const child = this.$refs.canvas;
      child.exportCanvas();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>