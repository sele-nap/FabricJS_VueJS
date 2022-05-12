<template>
  <div id="app">
    <CatWorld msg="Meow" />
    <p class="text-pink-500 text-center">Hello i'm a super cat</p>
  </div>
</template>

<script>
import CatWorld from "./components/CatWorld.vue";

export default {
  name: "App",
  components: {
    CatWorld,
  },
};
</script>

<style>
</style>
