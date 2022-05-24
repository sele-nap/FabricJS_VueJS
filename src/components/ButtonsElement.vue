<template>
  <button
    pill
    variant="info"
    class="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-tr-lg"
    @click="$emit('add-buttons', $event)"
  >
    <button :icon="button.icon"></button> {{ button.type }}
  </button>
</template>
<script>
export default {
  name: "ButtonsElement",
  props: {
    button: Object,
  },
};
</script>
<style scoped>
button {
  color: "purple";
}
</style>