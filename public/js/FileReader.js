import { fabric } from "fabric";
export default class FileRdr {
  init() {
    return new FileReader();
  }
  initialiaze(canvas) {
    this.addEventListener("load", () => {
      fabric.Image.fromURL(
        this.filerdr.result,
        (img) => {
          const canvCenter = canvas.getCenter();
          img.left = canvCenter.left;
          (img.originX = "center"), (img.scaleX = 0.5);
          img.scaleY = 0.5;
          canvas.add(img);
          canvas.requestRenderAll();
          img.animate("top", 100, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce,
          });
        },
        { crossOrigin: "Anonymous" }
      );
    });
  }
}
