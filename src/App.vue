<template>
  <div id="app" class="container">
    <div class="d-flex flex-column gap-2">
      <CatWorld ref="canvas" />
    </div>
    <div class="d-flex gap-3">
      <PatternList @change-bg="changeBg($event)" :patternsUrl="patternsUrl" />
      <ButtonsList @add-shape="createShape($event)" :shapes="shapes" />
    </div>
  </div>
</template>

<script>
import CatWorld from "./components/CatWorld.vue";
import PatternList from "./components/PatternList.vue";
import ButtonsList from "./components/ButtonsList.vue";

export default {
  name: "App",
  components: {
    CatWorld,
    PatternList,
    ButtonsList,
  },
  data() {
    return {
      patternsUrl: [
        {
          url: "https://cdn.pixabay.com/photo/2020/12/06/16/16/cosmos-5809271_960_720.png",
          alt: "cosmos-pattern",
        },
        {
          url: "https://cdn.pixabay.com/photo/2020/12/12/17/49/roses-5826128_960_720.jpg",
          alt: "roses-pattern",
        },
        {
          url: "https://cdn.pixabay.com/photo/2021/01/25/22/45/leaves-5949884__340.png",
          alt: "leaf-pattern",
        },
        {
          url: "https://cdn.pixabay.com/photo/2018/04/06/15/17/pattern-3296033__340.png",
          alt: "pattern-fish",
        },
      ],
      shapes: [
        {
          type: "Circle",
          icon: "circle-fill",
          fill: "Orange",
          originX: "center",
          originY: "center",
          radius: 50,
          selectedFill: "gold",
        },
        {
          type: "Rectangle",
          icon: "square-fill",
          fill: "green",
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
    exportCanvas() {
      const child = this.$refs.canvas;
      child.exportCanvas();
    },
    addImage() {
      const child = this.$refs.canvas;
      child.addImageCanvas();
    },
  },
};
</script>

<style>
body {
  margin: 0;
  box-sizing: border-box;
}
.containers {
  background-color: rgb(144, 206, 185);
  width: fit-content;
}

h3 {
  text-align: left;
}
</style>
