<template>
  <div class="email-editor">
    <ContentBrowser @add-column="addColumn" />
    <ContentEditor
      :content="content"
      :current-block="selectedBlock"
      :current-column="selectedColumn"
      :current-element="selectedElement"
      @selection-changed="handleSelectionChanged"
      @remove-element="handleRemoveElement"
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
const DEFAULT_COLOR = "#555";
const DEFAULT_BACKGROUND_COLOR = "#f5f5f5";
const DEFAULT_ELEMENT_BACKGROUND_COLOR = "#f5f5f5";

const buildDefaultBlockAttrs = () => ({
  padding: 20,
  backgroundColor: DEFAULT_BACKGROUND_COLOR
});

const buildDefaultColumnAttrs = () => ({
  padding: 0,
  alignSelf: "center"
});

// const buildDefaultElementAttrs = () => ({
//   padding: DEFAULT_PADDING
// });

const buildDefaultElementTextAttrs = () => ({
  padding: DEFAULT_PADDING,
  textAlign: "center",
  color: DEFAULT_COLOR,
  backgroundColor: DEFAULT_ELEMENT_BACKGROUND_COLOR,
  textContent: "Lorem ipsum"
});

const buildDefaultElementButtonAttrs = () => ({
  padding: DEFAULT_PADDING,
  textAlign: "center",
  color: DEFAULT_COLOR,
  backgroundColor: DEFAULT_ELEMENT_BACKGROUND_COLOR,
  buttonText: "Lorem ipsum"
});

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
      content: {
        children: [
          {
            id: 1,
            name: "block",
            attrs: buildDefaultBlockAttrs(),
            children: [
              {
                id: 1,
                name: "column",
                attrs: buildDefaultColumnAttrs(),
                children: [
                  {
                    id: 1,
                    name: "element",
                    type: "text",
                    attrs: buildDefaultElementTextAttrs()
                  }
                ]
              },
              {
                id: 2,
                name: "column",
                attrs: buildDefaultColumnAttrs(),
                children: [
                  {
                    id: 1,
                    name: "element",
                    type: "text",
                    attrs: buildDefaultElementTextAttrs()
                  },
                  {
                    id: 2,
                    name: "element",
                    type: "text",
                    attrs: buildDefaultElementTextAttrs()
                  }
                ]
              },
              {
                id: 3,
                name: "column",
                attrs: buildDefaultColumnAttrs(),
                children: [
                  {
                    id: 1,
                    name: "element",
                    type: "text",
                    attrs: buildDefaultElementTextAttrs()
                  },
                  {
                    id: 2,
                    name: "element",
                    type: "text",
                    attrs: buildDefaultElementTextAttrs()
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            name: "block",
            attrs: buildDefaultBlockAttrs(),
            children: [
              {
                id: 4,
                name: "column",
                attrs: buildDefaultColumnAttrs(),
                children: [
                  {
                    id: 1,
                    name: "element",
                    type: "text",
                    attrs: buildDefaultElementTextAttrs()
                  }
                ]
              },
              {
                id: 5,
                name: "column",
                attrs: buildDefaultColumnAttrs(),
                children: [
                  {
                    id: 1,
                    name: "element",
                    type: "button",
                    attrs: buildDefaultElementButtonAttrs()
                  }
                ]
              }
            ]
          },
          {
            id: 3,
            name: "block",
            attrs: buildDefaultBlockAttrs(),
            children: [
              {
                id: 6,
                name: "column",
                attrs: buildDefaultColumnAttrs(),
                children: [
                  {
                    id: 1,
                    name: "element",
                    type: "text",
                    attrs: buildDefaultElementTextAttrs()
                  },
                  {
                    id: 2,
                    name: "element",
                    type: "text",
                    attrs: buildDefaultElementTextAttrs()
                  },
                  {
                    id: 3,
                    name: "element",
                    type: "text",
                    attrs: buildDefaultElementTextAttrs()
                  }
                ]
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
          attrs: buildDefaultColumnAttrs(),
          children: [
            {
              id: 1,
              name: "element",
              type: "text",
              attrs: buildDefaultElementTextAttrs()
            }
          ]
        });
      }

      this.content.children.push({
        id: this.nextBlockId,
        name: "block",
        attrs: buildDefaultBlockAttrs(),
        children: columns
      });
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
