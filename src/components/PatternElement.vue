<template>
  <img
    :src="pattern.url"
    class="pattern"
    :alt="pattern.alt"
    @click="$emit('pattern-click', $event)"
  />
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

<style scoped>
.pattern {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>