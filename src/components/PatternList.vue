<template>
  <div class="containers mt-3 p-3 rounded flex justify-center space-x-9">
    <h3 class="underline underline-offset-2 pb-3">Patterns</h3>
    <div class="flex justify-center space-x-2">
      <div :key="pattern.url" v-for="pattern in patternsUrl">
        <PatternElement
          :data-key="pattern.url"
          :pattern="pattern"
          @pattern-click="$emit('change-bg', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PatternElement from "./PatternElement.vue";
export default {
  name: "PatternList",
  components: {
    PatternElement,
  },
  props: {
    patternsUrl: Array,
  },
};
</script>
<style>
</style>