<template>
  <canvas :id="canvasId"></canvas>
</template>

<script>
import CanvasInit from "../../public/js/CanvasInit";
import { fabric } from "fabric";
import { saveAs } from "file-saver";

export default {
  name: "WorldCat",
  data() {
    return { canvasId: "mycanvas", canvas: undefined };
  },

  methods: {
    init() {
      let newCanvas = new CanvasInit(this.canvasId);
      this.canvas = newCanvas.initialiaze();
    },

    setCanvasColor(url, canvas) {
      canvas.setBackgroundColor({ source: url, repeat: "repeat" }, function () {
        canvas.renderAll();
      });
    },

    createCir(canvas) {
      const canvCenter = canvas.getCenter();
      const circle = new fabric.Circle({
        radius: 50,
        fill: "MediumPurple",
        left: canvCenter.left,
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
          circle.animate("top", canvCenter.top, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 200,
            easing: fabric.util.ease.easeOutBounce,
          });
        },
      });
      circle.on("selected", () => {
        circle.set("fill", "LightGoldenRodYellow");
        canvas.requestRenderAll();
      });
      circle.on("deselected", () => {
        circle.set("fill", "MediumAquaMarine");
        canvas.requestRenderAll();
      });
    },

    createRec(canvas) {
      const canvCenter = canvas.getCenter();
      const rect = new fabric.Rect({
        height: 100,
        width: 100,
        fill: "PowderBlue",
        left: canvCenter.left,
        top: -50,
        originX: "center",
        originY: "center",
        cornerColor: "white",
        objectCaching: false,
      });
      canvas.add(rect);
      canvas.renderAll();
      rect.animate("top", canvCenter.top, {
        onChange: canvas.renderAll.bind(canvas),
      });
      rect.on("selected", () => {
        rect.set("fill", "lightgreen");
        canvas.renderAll();
      });
      rect.on("deselected", () => {
        rect.set("fill", "LightCoral");
        canvas.renderAll();
      });
    },

    addImageCanvas() {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        fabric.Image.fromURL(
          reader.result,
          (img) => {
            const canvCenter = this.canvas.getCenter();
            img.left = canvCenter.left;
            (img.originX = "center"), (img.scaleX = 0.5);
            img.scaleY = 0.5;
            this.canvas.add(img);
            this.canvas.requestRenderAll();
            img.animate("top", 100, {
              onChange: this.canvas.renderAll.bind(this.canvas),
              duration: 1000,
              easing: fabric.util.ease.easeOutBounce,
            });
          },
          { crossOrigin: "Anonymous" }
        );
      });

      const inputImage = document.getElementById("myImage");
      const file = inputImage.files[0];
      reader.readAsDataURL(file);
    },

    addText() {
      const textBox = new fabric.Textbox("Text here", {
        editable: true,
        fontSize: 24,
      });
      console.log("meow");
      this.canvas.add(textBox);
      this.canvas.requestRenderAll();
    },
    bolder() {
      this.canvas.getActiveObjects().filter(function (o) {
        if (o.get("type") === "textbox") {
          if (o.fontWeight === "bold") {
            o.fontWeight = "normal";
          } else if (o.fontWeight === "normal") {
            o.fontWeight = "bold";
          }
        }
      });
      this.canvas.requestRenderAll();
    },
    italic() {
      this.canvas.getActiveObjects().filter(function (o) {
        if (o.get("type") === "textbox") {
          if (o.fontStyle === "normal") {
            o.fontStyle = "italic";
          } else if (o.fontStyle === "italic") {
            o.fontStyle = "normal";
          }
        }
      });
      this.canvas.renderAll();
    },
    changeFont(event) {
      this.canvas.getActiveObjects().filter(function (o) {
        if (o.get("type") === "textbox") {
          o.fontFamily = event;
        }
      });
      this.canvas.renderAll();
    },
    changeSize(event) {
      this.canvas.getActiveObjects().filter(function (o) {
        if (o.get("type") === "textbox") {
          o.fontSize = event;
        }
      });
      this.canvas.renderAll();
    },
    exportCanvas() {
      this.canvas.toCanvasElement().toBlob(function (blob) {
        saveAs(blob, "myimg.png");
      });
    },
  },

  mounted() {
    this.init();
  },
};
</script>