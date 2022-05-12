<template>
  <b-button pill variant="info" @click="$emit('add-shape', $event)"
    ><b-icon :icon="shape.icon"></b-icon> {{ shape.type }}</b-button
  >
</template>
<script>
export default {
  name: "ButtonsEverywhere",
  props: {
    shape: Object,
  },
};
</script>
<style scoped>
b-button {
  color: "white";
}
</style>