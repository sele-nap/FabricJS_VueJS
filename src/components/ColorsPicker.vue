<template>
  <div class="containers mt-3 p-3 rounded">
    <sketch :value="colors" @input="$emit('update-color', $event)" />
  </div>
</template>
<script>
import { Sketch } from "vue-color";
export default {
  name: "ColorsPicker",
  components: { Sketch },
  data() {
    return {
      colors: "#194d33",
    };
  },
};
</script>