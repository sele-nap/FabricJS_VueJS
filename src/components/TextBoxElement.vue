<template>
  <div class="containers mt-3 p-3 rounded">
    <h3 class="underline underline-offset-2 pb-3">Text</h3>
    <button
      pill
      variant="info"
      class="text-light me-2"
      @click="$emit('add-text')"
    >
      <button icon="textarea-t"></button>
    </button>
    <button
      pill
      variant="info"
      class="text-light me-2"
      @click="$emit('bolder')"
    >
      <button icon="type-bold"></button>
    </button>
    <button
      pill
      variant="info"
      class="text-light me-2"
      @click="$emit('italic')"
    >
      <button icon="type-italic"></button>
    </button>
    <select
      v-model="selectedSize"
      :options="sizeOptions"
      class="my-2 me-2"
      @change="$emit('change-size', $event)"
    >
      Size
    </select>
    <select
      v-model="selectedFont"
      :options="fontOptions"
      class="my-2"
      @change="$emit('change-font', $event)"
    >
      Font
    </select>
  </div>
</template>
<script>
export default {
  name: "TextElement",
  data() {
    return {
      selectedFont: null,
      selectedSize: null,
      sizeOptions: [
        { value: null, text: "Size" },
        { value: "16", text: "Extra small" },
        { value: "24", text: "Small" },
        { value: "32", text: "Medium" },
        { value: "40", text: "Large" },
        { value: "48", text: "Extra large" },
      ],

      fontOptions: [
        { value: null, text: "Font" },
        { value: "Noto", text: "Noto" },
        { value: "Verdana", text: "Verdana" },
        { value: "Cambria", text: "Cambria" },
        { value: "Courier", text: "Courier" },
      ],
    };
  },
};
</script>