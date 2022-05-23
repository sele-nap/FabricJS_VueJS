<template>
  <div class="containers mt-3 p-3 rounded">
    <button
      pill
      variant="info"
      class="text-zinc-900 exportBtn self-end"
      @click="$emit('export-canvas')"
    >
      Export canvas
    </button>
  </div>
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