<template>
  <div class="email-editor">
    <ContentBrowser @add-column="addColumn" />
    <ContentEditor
      :content="content"
      :current-block="selectedBlock"
      :current-column="selectedColumn"
      :current-element="selectedElement"
      @selection-changed="handleSelectionChanged"
      @remove-block="handleRemoveBlock"
      @remove-element="handleRemoveElement"
    />
    <ContextProperties :selected-object="selectedObject" />
  </div>
</template>

<script>
import ContentBrowser from "./ContentBrowser.vue";
import ContentEditor from "./ContentEditor.vue";
import ContextProperties from "./ContextProperties.vue";

import { createDefaultContent, buildBlock } from "@/store";

export default {
  components: {
    ContentBrowser,
    ContentEditor,
    ContextProperties
  },
  data() {
    return {
      selectedBlock: null,
      selectedColumn: null,
      selectedElement: null,
      selectedObject: null,
      selectedPath: [],
      content: createDefaultContent()
    };
  },
  methods: {
    addColumn({ count }) {
      this.content.children.push(buildBlock(count));
    },
    handleSelectionChanged({ block, column, element }) {
      this.selectedBlock = block;
      this.selectedColumn = column;
      this.selectedElement = element;

      if (element) {
        this.selectedObject = element;
      } else if (column) {
        this.selectedObject = column;
      } else if (block) {
        this.selectedObject = block;
      }
    },
    handleRemoveElement({ block, column, element }) {
      console.log("remove element", block, column, element);
      const index = column.children.findIndex(child => child.id === element.id);
      if (index !== -1) {
        column.children.splice(index, 1);
      }
    },
    handleRemoveBlock({ block }) {
      console.log("remove block", block);
      const index = this.content.children.findIndex(
        child => child.id === block.id
      );
      if (index !== -1) {
        this.content.children.splice(index, 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.email-editor {
  display: grid;
  grid-template-columns: 25% auto 25%;
  grid-template-rows: auto;
  height: 100vh;
  padding-top: 65px;
}
</style>
