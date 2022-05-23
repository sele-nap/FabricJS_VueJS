<template>
  <div id="app" class="container flex justify-center space-x-9">
    <div class="d-flex flex-row gap-2 mt-5 ml-5">
      <WorldCat ref="canvas" />
    </div>
    <div class="d-flex gap-3 mt-5">
      <ButtonsExport
        @export-canvas="exportCanvas()"
        class="justify-items-center border-l-4 border-pink-300/100"
      />
      <ButtonsList
        @add-buttons="createButton($event)"
        :buttons="buttons"
        class="justify-items-center border-l-4 border-pink-300/100"
      />
      <PatternList
        @change-bg="changeBg($event)"
        :patternsUrl="patternsUrl"
        class="justify-items-center border-l-4 border-pink-300/100"
      />
      <ImageImport
        @add-image="addImage"
        class="justify-items-center border-l-4 border-pink-300/100"
      />
      <TextBoxElement
        @add-text="addText"
        @bolder="bolder"
        @italic="italic"
        @change-font="changeFont($event)"
        @change-size="changeSize($event)"
        class="justify-items-center border-l-4 border-pink-300/100"
      />
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

export default {
  name: "App",
  components: {
    WorldCat,
    PatternList,
    ButtonsExport,
    ButtonsList,
    ImageImport,
    TextBoxElement,
  },
  data() {
    return {
      patternsUrl: [
        {
          url: "https://i.pinimg.com/originals/8d/21/02/8d21029edf1e80eaef5da189529b7b95.jpg",
          alt: "cats-pattern",
        },

        {
          url: "https://wallpapercave.com/wp/wp5439093.jpg",
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
        {},
      ],
      canvasComponent: undefined,
      canvas: undefined,
    };
  },
  methods: {
    changeBg(event) {
      const pattern = event.target.dataset.key;
      this.canvasComponent.setCanvasColor(pattern, this.canvas);
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
  },
  mounted() {
    this.canvasComponent = this.$refs.canvas;
    this.canvas = this.$refs.canvas._data.canvas;
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
