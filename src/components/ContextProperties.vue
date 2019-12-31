<template>
  <div class="context-properties">
    <div v-if="selectedObject && selectedObject.name == 'block'">
      <b-form-group label="Padding">
        <b-form-input type="number" v-model="selectedObject.attrs.padding" />
      </b-form-group>
      <b-form-group label="Background Color">
        <b-form-input v-model="selectedObject.attrs.backgroundColor" />
      </b-form-group>
    </div>

    <div v-if="selectedObject && selectedObject.name == 'element'">
      <b-form-group v-if="selectedObject.type == 'text'" label="Text Content">
        <RichTextEditor v-model="selectedObject.attrs.textContent" />
      </b-form-group>

      <b-form-group v-if="selectedObject.type == 'button'" label="Button Text">
        <b-form-input v-model="selectedObject.attrs.buttonText" />
      </b-form-group>

      <b-form-group v-if="selectedObject.type == 'image'" label="Image Src">
        <b-form-input v-model="selectedObject.attrs.imageSrc" />
      </b-form-group>

      <hr />

      <b-form-group label="Padding">
        <b-form-input type="number" v-model="selectedObject.attrs.padding" />
      </b-form-group>

      <b-form-group label="Alignment">
        <b-form-select
          v-model="selectedObject.attrs.textAlign"
          :options="textAlignOptions"
        ></b-form-select>
      </b-form-group>

      <hr />

      <b-form-group label="Color">
        <b-form-input v-model="selectedObject.attrs.color" />
      </b-form-group>

      <b-form-group label="Background Color">
        <b-form-input v-model="selectedObject.attrs.backgroundColor" />
      </b-form-group>
    </div>
  </div>
</template>

<script>
import RichTextEditor from "./RichTextEditor.vue";

export default {
  components: {
    RichTextEditor
  },
  props: {
    selectedObject: {
      type: Object
    }
  },

  data() {
    return {
      alignSelfOptions: [
        { value: "flex-start", text: "Left" },
        { value: "center", text: "Center" },
        { value: "flex-end", text: "Right" }
      ],
      textAlignOptions: [
        { value: "left", text: "Left" },
        { value: "center", text: "Center" },
        { value: "right", text: "Right" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.context-properties {
  border-left: 1px solid $border-color;
  padding: 1rem;
}
</style>
