<template>
  <div></div>
</template>

<script>
export default {
  name: "ClearCanvas",
  methods: {
    clearCanvas(canvas) {
      canvas.getObjects().forEach((o) => {
        if (o !== canvas.backgroundImage) {
          canvas.remove(o);
        }
      });
    },
  },
};
</script>