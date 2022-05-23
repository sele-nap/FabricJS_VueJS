<template>
  <div class="containers mt-3 p-3 rounded">
    <h3 class="underline underline-offset-2 pb-3">
      <i class="bi bi-image-fill"></i> Image
    </h3>
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