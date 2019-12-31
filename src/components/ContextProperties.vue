<template>
  <div class="context-properties">
    <div v-if="selectedObject && selectedObject.name == 'block'">
      <b-form-group label="Padding">
        <b-form-input type="number" v-model="selectedObject.attrs.padding" />
      </b-form-group>
      <b-form-group label="Background Color">
        <b-form-input v-model="selectedObject.attrs.containerBackgroundColor" />
      </b-form-group>
    </div>

    <div v-if="selectedObject && selectedObject.name == 'element'">
      <template v-if="selectedObject.type == 'text'">
        <b-form-group label="Text Content">
          <RichTextEditor v-model="selectedObject.content" />
          <vue-editor
            v-model="selectedObject.content"
            :editorToolbar="customToolbar"
          ></vue-editor>
        </b-form-group>
      </template>

      <template v-if="selectedObject.type == 'button'">
        <b-form-group label="Button Text">
          <b-form-input v-model="selectedObject.content" />
        </b-form-group>
        <b-form-group label="Button Href">
          <b-form-input v-model="selectedObject.attrs.href" />
        </b-form-group>
        <b-form-group label="Button Background Color">
          <b-form-input v-model="selectedObject.attrs.backgroundColor" />
        </b-form-group>
        <b-form-group label="Width">
          <b-form-input type="number" v-model="selectedObject.attrs.width" />
        </b-form-group>
      </template>

      <template v-if="selectedObject.type == 'image'">
        <b-form-group label="Image Src">
          <b-form-input v-model="selectedObject.attrs.src" />
        </b-form-group>
        <b-form-group label="Image Href">
          <b-form-input v-model="selectedObject.attrs.href" />
        </b-form-group>
        <b-form-group label="Width">
          <b-form-input type="number" v-model="selectedObject.attrs.width" />
        </b-form-group>
        <b-form-group label="Height">
          <b-form-input type="number" v-model="selectedObject.attrs.height" />
        </b-form-group>
      </template>

      <hr />

      <h5 class="text-uppercase text-secondary">
        <font-awesome-icon icon="caret-down" />
        Column
      </h5>

      <b-form-group label="Padding">
        <b-form-input type="number" v-model="selectedObject.attrs.padding" />
      </b-form-group>

      <b-form-group label="Alignment">
        <b-form-select
          v-model="selectedObject.attrs.textAlign"
          :options="textAlignOptions"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Color">
        <b-form-input v-model="selectedObject.attrs.color" />
      </b-form-group>

      <b-form-group label="Background Color">
        <b-form-input v-model="selectedObject.attrs.containerBackgroundColor" />
      </b-form-group>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import RichTextEditor from "./RichTextEditor.vue";

export default {
  components: {
    RichTextEditor,
    VueEditor
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
      ],
      customToolbar: [
        [{ header: [1, 2, 3] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
        ["link"]
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
