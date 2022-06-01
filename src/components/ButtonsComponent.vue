
<template>
  <div class="containers mt-3 p-3 rounded flex justify-center space-x-9">
    <h3 class="underline underline-offset-2 pb-3">Tools</h3>
    <button
      pill
      variant="info"
      class="
        bg-indigo-500
        hover:bg-indigo-700
        text-white
        py-2
        px-4
        rounded-tr-lg
      "
      @click="$emit('group')"
    >
      <button>Group</button>
    </button>
    <button
      pill
      variant="info"
      class="
        bg-indigo-500
        hover:bg-indigo-700
        text-white
        py-2
        px-2
        rounded-tr-lg
      "
      @click="$emit('ungroup')"
    >
      <button>Ungroup</button>
    </button>
  </div>
</template>
<script>
export default {
  name: "ButtonsComponent",
};
</script>