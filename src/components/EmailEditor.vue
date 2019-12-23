<template>
  <div class="email-editor">
    <ContentBrowser @add-column="addColumn" />
    <ContentEditor
      :content="content"
      @selection-changed="handleSelectionChanged"
    />
    <ContextProperties
      :selected-object="selectedObject"
      @remove="handleRemoveSelectedObject"
    />
  </div>
</template>

<script>
import ContentBrowser from "./ContentBrowser.vue";
import ContentEditor from "./ContentEditor.vue";
import ContextProperties from "./ContextProperties.vue";
export default {
  components: {
    ContentBrowser,
    ContentEditor,
    ContextProperties
  },
  data() {
    return {
      selectedObject: null,
      selectedPath: [],
      content: {
        blocks: [
          {
            id: 1,
            name: "block",
            columns: [
              {
                id: 1,
                name: "column"
              },
              {
                id: 2,
                name: "column"
              },
              {
                id: 3,
                name: "column"
              }
            ]
          },
          {
            id: 2,
            name: "block",
            columns: [
              {
                id: 4,
                name: "column"
              }
            ]
          },
          {
            id: 3,
            name: "block",
            columns: [
              {
                id: 5,
                name: "column"
              }
            ]
          }
        ]
      }
    };
  },
  computed: {
    nextBlockId() {
      return this.content.blocks[this.content.blocks.length - 1].id + 1;
    }
  },
  methods: {
    addColumn({ count }) {
      let columns = [];
      for (var i = 0; i < count; i++) {
        columns.push({
          id: i + 1
        });
      }

      this.content.blocks.push({
        id: this.nextBlockId,
        columns
      });
    },
    handleSelectionChanged(obj) {
      this.selectedObject = obj;
    },
    handleRemoveSelectedObject() {
      // this.selectedObject = null;
      console.log("remove", this.selectedObject);
      // find selected element and remove from parent
      if (this.selectedObject.name === "block") {
        const index = this.content.blocks.findIndex(
          block => block.id === this.selectedObject.id
        );
        this.content.blocks.splice(index, 1);
      } else if (this.selectedObject.name === "column") {
        // this next
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
}
</style>
