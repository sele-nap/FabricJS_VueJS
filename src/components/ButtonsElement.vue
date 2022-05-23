<template>
  <button
    pill
    variant="info"
    class="text-zinc-900"
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