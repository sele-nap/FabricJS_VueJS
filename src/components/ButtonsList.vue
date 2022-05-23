<template>
  <div class="containers mt-3 p-3 rounded flex justify-center space-x-9">
    <h3 class="underline underline-offset-2 pb-3">Objects</h3>
    <div class="d-flex gap-2">
      <div :key="button.url" v-for="button in buttons">
        <ButtonsElement
          :data-key="button.type"
          :button="button"
          @add-buttons="$emit('add-button', $event)"
        />
      </div>
    </div>
    <div class="d-flex gap-2"></div>
  </div>
</template>
<script>
import ButtonsElement from "./ButtonsElement.vue";
export default {
  name: "ButtonsList",
  components: {
    ButtonsElement,
  },
  props: {
    buttons: Array,
  },
};
</script>
<style scoped></style>