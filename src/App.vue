<template>
  <div id="app" class="container flex justify-center space-x-9">
    <div></div>
    <div class="flex flex-col justify-center items-center space-y-4 mt-5 pl-2">
      <WorldCat ref="canvas" />
      <CanvasModel
        class="mt-5"
        :canvas="canvas"
        :canvasComponent="canvasComponent"
        ref="editor"
      />
    </div>
    <div class="d-flex gap-3 mt-5">
      <ButtonsExport @export-canvas="exportCanvas()" />
      <ButtonsList
        @add-buttons="createButton($event)"
        :buttons="buttons"
        class="border-l-4 border-pink-300/100"
      />
      <PatternList
        @change-bg="changeBg($event)"
        :patternsUrl="patternsUrl"
        class="border-l-4 border-pink-300/100"
      />
      <ImageImport
        @add-image="addImage"
        class="border-l-4 border-pink-300/100"
      />
      <TextBoxElement
        @add-text="addText"
        @bolder="bolder"
        @italic="italic"
        @change-font="changeFont($event)"
        @change-size="changeSize($event)"
        class="border-l-4 border-pink-300/100"
      />
      <ButtonsComponent
        @group="group"
        @ungroup="ungroup"
        class="border-l-4 border-pink-300/100"
      />
      <ButtonsDraw
        @drawing="toggleMode(modes.drawing)"
        @paw="toggleMode(modes.paw)"
        class="border-l-4 border-pink-300/100"
      />
      <ColorsPicker @update-color="changeBg($event)" ref="colorPicker" />
    </div>
  </div>
</template>

<script>
import WorldCat from "./components/WorldCat.vue";
import PatternList from "./components/PatternList.vue";
import ButtonsExport from "./components/ButtonsExport.vue";
import ButtonsList from "./components/ButtonsList.vue";
import ImageImport from "./components/ImageImport.vue";
import TextBoxElement from "./components/TextBoxElement.vue";
import ButtonsComponent from "./components/ButtonsComponent.vue";
import ColorsPicker from "./components/ColorsPicker.vue";
import CanvasModel from "./components/CanvasModel.vue";
import ButtonsDraw from "./components/ButtonsDraw.vue";

export default {
  name: "App",
  components: {
    WorldCat,
    PatternList,
    ButtonsExport,
    ButtonsList,
    ImageImport,
    TextBoxElement,
    ButtonsComponent,
    ColorsPicker,
    CanvasModel,
    ButtonsDraw,
  },
  data() {
    return {
      patternsUrl: [
        {
          url: "https://cdn.pixabay.com/photo/2021/10/10/09/39/art-6696173_960_720.png",
          alt: "cats-pattern",
        },

        {
          url: "https://cdn.pixabay.com/photo/2016/06/24/15/48/pattern-1477380_960_720.png",
          alt: "cat-pattern",
        },
      ],
      buttons: [
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
          fill: "yellow",
          originX: "center",
          originY: "center",
          height: 100,
          width: 100,
          selectedFill: "gold",
        },
      ],
      canvasComponent: undefined,
      canvas: undefined,
    };
  },
  methods: {
    changeBg(event) {
      if (event.target) {
        const pattern = event.target.dataset.key;
        this.canvasComponent.setCanvasPattern(pattern);
      } else {
        this.canvasComponent.setCanvasPattern(event.hex8);
      }
    },
    createButton(event) {
      if (event.target.dataset.key === "Circle") {
        this.canvasComponent.createCir(this.canvas);
      } else if (event.target.dataset.key === "Rectangle") {
        this.canvasComponent.createRec(this.canvas);
      }
    },
    exportCanvas() {
      this.canvasComponent.exportCanvas();
    },
    addImage() {
      this.canvasComponent.addImageCanvas();
    },
    addText() {
      this.canvasComponent.addText();
    },
    bolder() {
      this.canvasComponent.bolder();
    },
    italic() {
      this.canvasComponent.italic();
    },
    changeFont(event) {
      this.canvasComponent.changeFont(event);
      console.log("meow");
    },
    changeSize(event) {
      this.canvasComponent.changeSize(event);
      console.log("miaou");
    },
    group() {
      this.canvasComponent.group();
    },
    ungroup() {
      this.canvasComponent.ungroup();
    },
    updateColor(event) {
      console.log(event.hsl);
    },
    getPosition() {},
  },
  mounted() {
    this.canvasComponent = this.$refs.canvas;
    this.canvas = this.$refs.canvas._data.canvas;
    this.colorPicked = this.$refs.canvas._data.colors;
  },
};
</script>

<style>
body {
  margin: 0;
  box-sizing: border-box;
  font-style: Noto;
  background-color: lightgrey;
}
.containers {
  background-color: rgb(230, 230, 250);
  width: fit-content;
}

h3 {
  text-align: left;
}
</style>
