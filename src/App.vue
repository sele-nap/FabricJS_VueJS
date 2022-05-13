<template>
  <div id="app" class="container">
    <div class="d-flex flex-column gap-2">
      <WorldCat ref="canvas" />
    </div>
    <div class="d-flex gap-3">
      <PatternList @change-bg="changeBg($event)" :patternsUrl="patternsUrl" />
      <ButtonsList @add-shape="createShape($event)" :shapes="shapes" />
      <ClearCanvas @clear-canvas="clearCanvas($event)" />
    </div>
  </div>
</template>

<script>
import WorldCat from "./components/WorldCat.vue";
import PatternList from "./components/PatternList.vue";
import ButtonsList from "./components/ButtonsList.vue";
import ClearCanvas from "./components/ClearCanvas.vue";

export default {
  name: "App",
  components: {
    WorldCat,
    PatternList,
    ButtonsList,
    ClearCanvas,
  },
  data() {
    return {
      patternsUrl: [
        {
          url: "https://i.pinimg.com/originals/8d/21/02/8d21029edf1e80eaef5da189529b7b95.jpg",
          alt: "cats-pattern",
        },
      ],
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
          fill: "yellow",
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

    addImage() {
      const child = this.$refs.canvas;
      child.addImageCanvas();
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
}
.containers {
  background-color: rgb(230, 230, 250);
  width: fit-content;
}

h3 {
  text-align: left;
}
</style>
