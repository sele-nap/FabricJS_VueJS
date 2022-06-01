<template>
  <div></div>
</template>

<script>
import CanvasInit from "../../public/js/CanvasInit";

export default {
  name: "ToggleMode",
  methods: {
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

    mounted() {
      this.toggleMode();
    },
  },
};
</script>