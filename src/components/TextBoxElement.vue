<template>
  <div class="containers mt-3 p-3 rounded">
    <h3 class="title">Text</h3>
    <b-button
      pill
      variant="info"
      class="text-light me-2"
      @click="$emit('add-text')"
      ><b-icon icon="textarea-t"></b-icon
    ></b-button>
    <b-button
      pill
      variant="info"
      class="text-light me-2"
      @click="$emit('bolder')"
      ><b-icon icon="type-bold"></b-icon
    ></b-button>
    <b-button
      pill
      variant="info"
      class="text-light me-2"
      @click="$emit('italic')"
      ><b-icon icon="type-italic"></b-icon
    ></b-button>
    <b-form-select
      v-model="selectedSize"
      :options="sizeOptions"
      class="my-2 me-2"
      @change="$emit('change-size', $event)"
    ></b-form-select>
    <b-form-select
      v-model="selectedFont"
      :options="fontOptions"
      class="my-2"
      @change="$emit('change-font', $event)"
    ></b-form-select>
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
        { value: "Bellota", text: "Bellota" },
        { value: "Verdana", text: "Verdana" },
        { value: "Cambria", text: "Cambria" },
        { value: "Courier", text: "Courier" },
      ],
    };
  },
};
</script>