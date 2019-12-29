<template>
  <div class="email-editor">
    <ContentBrowser @add-column="addColumn" />
    <ContentEditor
      :content="content"
      :current-block="selectedBlock"
      :current-column="selectedColumn"
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

const DEFAULT_PADDING = 20;

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
      selectedObject: null,
      selectedPath: [],
      content: {
        children: [
          {
            id: 1,
            name: "block",
            attrs: {
              padding: DEFAULT_PADDING
            },
            children: [
              {
                id: 1,
                name: "column",
                attrs: {
                  padding: DEFAULT_PADDING
                }
              },
              {
                id: 2,
                name: "column",
                attrs: {
                  padding: DEFAULT_PADDING
                }
              },
              {
                id: 3,
                name: "column",
                attrs: {
                  padding: DEFAULT_PADDING
                }
              }
            ]
          },
          {
            id: 2,
            name: "block",
            attrs: {
              padding: DEFAULT_PADDING
            },
            children: [
              {
                id: 4,
                name: "column",
                attrs: {
                  padding: DEFAULT_PADDING
                }
              },
              {
                id: 5,
                name: "column",
                attrs: {
                  padding: DEFAULT_PADDING
                }
              }
            ]
          },
          {
            id: 3,
            name: "block",
            attrs: {
              padding: DEFAULT_PADDING
            },
            children: [
              {
                id: 6,
                name: "column",
                attrs: {
                  padding: DEFAULT_PADDING
                }
              }
            ]
          }
        ]
      }
    };
  },
  computed: {
    nextBlockId() {
      return this.content.children[this.content.children.length - 1].id + 1;
    }
  },
  methods: {
    addColumn({ count }) {
      let columns = [];
      for (var i = 0; i < count; i++) {
        columns.push({
          id: i + 1,
          name: "column",
          attrs: {
            padding: DEFAULT_PADDING
          }
        });
      }

      this.content.children.push({
        id: this.nextBlockId,
        name: "block",
        attrs: {
          padding: DEFAULT_PADDING
        },
        children: columns
      });
    },
    handleSelectionChanged({ block, column }) {
      this.selectedBlock = block;
      this.selectedColumn = column;

      if (column) {
        this.selectedObject = column;
      } else if (block) {
        this.selectedObject = block;
      }
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
  padding-top: 65px;
}
</style>
