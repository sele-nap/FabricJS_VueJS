<template>
  <div class="containers mt-3 p-3 rounded">
    <h3 class="title"><i class="bi bi-image-fill"></i> Image</h3>
    <input
      id="myImage"
      type="file"
      accept="image/"
      @change="$emit('add-image')"
    />
  </div>
</template>
<script>
export default {
  name: "ImageImport",
};
</script>