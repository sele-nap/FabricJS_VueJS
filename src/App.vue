<template>
  <div id="app">
    <CatWorld msg="Meow" />
    <p class="text-pink-500 text-center">Hello i'm a super cat</p>
    <div>
      <PatternList @change-bg="changeBg($event)" :patternsUrl="patternsUrl" />
    </div>
  </div>
</template>

<script>
import CatWorld from "./components/CatWorld.vue";
import PatternList from "./components/PatternList.vue";

export default {
  name: "App",
  components: {
    CatWorld,
    PatternList,
  },
};
</script>

<style>
</style>
