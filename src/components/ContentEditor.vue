<template>
  <div class="content-editor">
    <div>
      Breadcrumb:
      <span v-if="block"> Block {{ block.id }} </span>
      <span v-if="column"> / Column {{ column.id }} </span>
    </div>

    Content Editor
    <div
      v-for="block in content.children"
      :key="block.id"
      @click="handleSelectionChanged(block)"
      class="block"
    >
      Block {{ block.id }}
      <div class="block-children">
        <div
          v-for="column in block.children"
          :key="column.id"
          @click.stop="handleSelectionChanged(block, column)"
          class="column"
          :style="columnStyles(column)"
        >
          Column {{ column.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object
    },
    column: {
      type: Object
    },
    content: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    handleSelectionChanged(block, column) {
      this.$emit("selection-changed", { block, column });
    },
    columnStyles({ attrs = {} }) {
      return {
        padding: `${attrs.padding}px`,
        margin: `${attrs.margin}px`
      };
    }
  }
};
</script>

<style lang="scss">
.content-editor {
  border: 1px solid green;
}

.block {
  border: 1px solid red;
  padding: 2rem;

  .block-children {
    display: flex;
  }
}

.column {
  display: flex;
  flex: 1 1;
  border: 1px solid violet;
  padding: 1rem;
}
</style>
