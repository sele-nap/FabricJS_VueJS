<template>
  <div class="containers mt-3 p-3 rounded">
    <h3>Patterns</h3>
    <div class="d-flex gap-2">
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