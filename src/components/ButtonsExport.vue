<template>
  <b-button
    pill
    variant="info"
    class="text-light exportBtn align-self-end"
    @click="$emit('export-canvas')"
    >Export canvas</b-button
  >
</template>

<script>
export default {
  name: "ButtonsExport",
};
</script>
<style scoped>
.exportBtn {
  width: fit-content;
}
</style>