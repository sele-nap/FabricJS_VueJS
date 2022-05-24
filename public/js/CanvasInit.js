import { fabric } from "fabric";
export default class CanvasInit {
  constructor(canvasId) {
    this.canvasId = canvasId;
  }
  initialiaze() {
    return new fabric.Canvas(this.canvasId, {
      width: 1100,
      height: 500,
      backgroundColor: "Lavender",
    });
  }
}
