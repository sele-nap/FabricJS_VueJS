<template>
  <div>
    <img
      :src="pattern.url"
      class="pattern"
      :alt="pattern.alt"
      @click="$emit('pattern-click', $event)"
    />
  </div>
</template>
<script>
export default {
  name: "PatternElement",
  methods: {},
  props: {
    pattern: Object,
  },
};
</script>