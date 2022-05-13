<template>
  <div class="flex justify-center space-x-9 mt-9">
    <div id="app" class="container">
      <div class="d-flex flex-column gap-2">
        <WorldCat ref="canvas" />
      </div>
      <div class="d-flex gap-3">
        <ButtonsList
          @add-="createShape($event)"
          :shapes="shapes"
          class="justify-items-center border-l-4 border-pink-300/100"
        />
        <PatternList
          @change-bg="changeBg($event)"
          :patternsUrl="patternsUrl"
          class="justify-items-center border-l-4 border-pink-300/100"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WorldCat from "./components/WorldCat.vue";
import PatternList from "./components/PatternList.vue";
import ButtonsList from "./components/ButtonsList.vue";

export default {
  name: "App",
  components: {
    WorldCat,
    PatternList,
    ButtonsList,
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
        {
          type: "Clear",
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

    // clearCanvas(event) {
    //   const child = this.$refs.canvas;
    //   const canvas = child._data.canvas;
    //   const pattern = event.target.dataset.key;
    //   child.clearCanvas(pattern, canvas);
    // },

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
  font-style: Noto;
}
.containers {
  background-color: rgb(230, 230, 250);
  width: fit-content;
}

h3 {
  text-align: left;
}
</style>
