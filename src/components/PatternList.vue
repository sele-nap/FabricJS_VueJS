<template>
  <img
    :src="pattern.url"
    :alt="pattern.alt"
    @click="$emit('pattern-click', $event)"
  />
</template>
<script>
export default {
  name: "PatternList",
  methods: {},
  props: {
    pattern: Object,
  },
};
</script>