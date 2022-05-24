<template>
  <div class="containers mt-3 p-3 rounded">
    <button
      pill
      variant="info"
      class="
        relative
        group
        overflow-hidden
        px-8
        h-12
        rounded-md
        bg-lime-500
        before:absolute
        before:inset-0
        before:bg-lime-600
        before:scale-y-[0.1]
        before:origin-bottom
        before:transition
        before:duration-300
        hover:before:scale-y-100
      "
      @click="$emit('export-canvas')"
    >
      <span class="relative uppercase text-base text-white">Export canvas</span>
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