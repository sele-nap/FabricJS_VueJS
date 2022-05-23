<template>
  <b-button
    pill
    variant="info"
    class="text-light"
    @click="$emit('add-button', $event)"
    ><b-icon :icon="button.icon"></b-icon> {{ button.type }}</b-button
  >
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
b-button {
  color: "purple";
}
</style>