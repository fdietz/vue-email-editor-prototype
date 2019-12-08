<template>
  <div class="email-editor">
    <ContentBrowser @add-column="addColumn" />
    <ContentEditor :content="content" @selection-changed="handleSelectionChanged" />
    <ContextProperties :selected-object="selectedObject" />
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
      content: {
        blocks: [
          {
            id: 1,
            columns: [
              {
                id: 1
              },
              {
                id: 2
              }, 
              {
                id: 3
              }
            ]
          },
          {
            id: 2,
            columns: [
              {
                id: 1
              }
            ]
          },
          {
            id: 3,
            columns: [
              {
                id: 1
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    nextBlockId() {
      return this.content.blocks[this.content.blocks.length-1].id + 1;
    }
  },
  methods: {
    addColumn({ count }) {
      let columns = []
      for (var i = 0; i < count; i++) {
        columns.push({
          id: i + 1
        });
      }

      this.content.blocks.push({
        id: this.nextBlockId, 
        columns
      }) 
    },
    handleSelectionChanged(obj) {
      this.selectedObject = obj;
    }
  }
}
</script>

<style lang="scss" scoped>
.email-editor {
  display: grid;
  grid-template-columns: 25% auto 25%;
  grid-template-rows: auto;
}
</style>