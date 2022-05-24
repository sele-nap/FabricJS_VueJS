<template>
  <button pill variant="info" @click="$emit('add-buttons', $event)">
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
<style>
</style>