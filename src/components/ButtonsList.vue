<template>
  <div class="containers mt-3 p-3 rounded flex justify-center space-x-9">
    <h3 class="underline underline-offset-2 pb-3">Objects</h3>
    <div class="flex gap-2">
      <div :key="button.url" v-for="button in buttons">
        <ButtonsElement
          :data-key="button.type"
          :button="button"
          @add-buttons="$emit('add-buttons', $event)"
          class="
            bg-indigo-500
            hover:bg-indigo-700
            text-white
            py-2
            px-4
            rounded-tr-lg
          "
        />
      </div>
    </div>
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