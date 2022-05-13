<template>
  <div class="containers mt-3 p-3 rounded flex justify-center space-x-9">
    <h3 class="underline underline-offset-2 pb-3">Objects</h3>
    <div>
      <div :key="shape.url" v-for="shape in shapes">
        <ButtonsEverywhere
          :data-key="shape.type"
          :shape="shape"
          @add-shape="$emit('add-shape', $event)"
        />
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import ButtonsEverywhere from "./ButtonsEverywhere.vue";
export default {
  name: "ButtonsList",
  components: {
    ButtonsEverywhere,
  },
  props: {
    shapes: Array,
  },
};
</script>
<style>
body {
  font-style: Noto;
}
</style>