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

    setCanvasPattern(url) {
      if (url.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/)) {
        this.canvas.setBackgroundColor(url, () => {
          this.canvas.renderAll();
        });
      } else {
        this.canvas.setBackgroundColor(
          { source: url, repeat: "repeat" },
          () => {
            this.canvas.renderAll();
          }
        );
      }
    },

    setCrossPosition(x, y) {
      this.yCross = this.canvas.height - y * this.canvas.height;
      this.xCross = x * this.canvas.width;
      this.getIntersects();
    },
    getIntersects() {
      const MARGE = 10;
      this.canvas.getObjects().forEach((object) => {
        if (
          this.isInRect(
            this.xCross,
            this.yCross,
            [
              object.aCoords.tl,
              object.aCoords.tr,
              object.aCoords.br,
              object.aCoords.bl,
            ],
            MARGE
          )
        ) {
          this.canvas.setActiveObject(object);
        }
      });
    },
    isInRect(x, y, pol, px) {
      var nb = 0;
      var force = false;
      var prevA = pol[pol.length - 1];
      pol.forEach((a) => {
        var alpha = (a.y - prevA.y) / (a.x - prevA.x);
        if (alpha !== 0 && alpha) {
          var xCalc =
            Math.abs(alpha) === Infinity
              ? a.x
              : (y - prevA.y + alpha * prevA.x) / alpha;
          if (xCalc >= x) {
            if ((prevA.y > y && a.y <= y) || (prevA.y < y && a.y >= y)) {
              nb += 1;
            }
          }
          if (Math.abs(xCalc - x) < px || Math.abs(a.y - y) < px) {
            if (
              (prevA.y + px > y && a.y - px < y) ||
              (prevA.y - px < y && a.y + px > y)
            ) {
              force = true;
            }
          }
        }
        prevA = a;
      });
      console.log(nb);
      return nb % 2 === 1 || force;
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
        circle.set("fill", "LimeGreen");
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

    clearCanvas(canvas) {
      canvas.getObjects().forEach((object) => {
        if (object !== canvas.backgroundImage) {
          canvas.remove(object);
        }
      });
    },
    group() {
      const objects = this.canvas.getObjects();
      const group = new fabric.Group(objects, { cornerColor: "white" });
      this.clearCanvas(this.canvas);
      this.canvas.add(group);
      this.canvas.requestRenderAll();
    },
    ungroup() {
      const objects = this.canvas.getObjects();
      objects.filter((o) => {
        if (o.get("type") === "group") {
          o.destroy();
          const oldGroup = o.getObjects();
          this.clearCanvas(this.canvas);
          this.canvas.add(...oldGroup);
        } else {
          this.canvas.add(o);
        }
      });
      this.canvas.requestRenderAll();
    },

    exportCanvas() {
      this.canvas.toCanvasElement().toBlob(function (blob) {
        saveAs(blob, "beautifulImage.png");
      });
    },

    toggleMode(mode) {
      const canvas = CanvasInit("canvas");
      let color = "#000000";
      let currentMode;
      const modes = {
        pan: "pan",
        drawing: "drawing",
      };
      if (mode === modes.pan) {
        if (currentMode === modes.pan) {
          currentMode = "";
        } else {
          currentMode = modes.pan;
          canvas.isDrawingMode = false;
          canvas.renderAll();
        }
      } else if (mode === modes.drawing) {
        if (currentMode === modes.drawing) {
          currentMode = "";
          canvas.isDrawingMode = false;
          canvas.renderAll();
        } else {
          currentMode = modes.drawing;
          canvas.freeDrawingBrush.color = color;
          canvas.isDrawingMode = true;
          canvas.renderAll();
        }
      }
    },
  },

  mounted() {
    this.init();
  },
};
</script>