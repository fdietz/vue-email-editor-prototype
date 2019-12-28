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
      <div class="border-wrapper">
        <div class="border-label">
          Block {{ block.id }}
        </div>
        <div class="block-children"  :style="blockStyles(block)">
          <div
            v-for="column in block.children"
            :key="column.id"
            @click.stop="handleSelectionChanged(block, column)"
            class="column"
          >
            <div class="border-wrapper">
              <div class="border-label">
                Column {{ column.id }}
              </div>
              <div class="column-children" :style="columnStyles(column)">
                abc
              </div>
            </div>
          </div>
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
      console.log(">", block, column)
      this.$emit("selection-changed", { block, column });
    },
    columnStyles({ attrs = {} }) {
      return {
        padding: `${attrs.padding}px`,
        margin: `${attrs.margin}px`
      };
    },
    blockStyles({ attrs = {} }) {
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
  z-index: 1;

  &:hover {
    > .border-wrapper {
      border-color: red;

      > .border-label {
        display: flex;
      }
    }
  }

  .block-children {
    display: flex;
  }
}

.column {
  z-index: 2;

  display: flex;
  flex: 1 1;
  border: 1px solid violet;

  min-height: 50px;

  &:hover {
    > .border-wrapper {
      border-color: red;

      > .border-label {
        display: flex;
      }
    }
  }
}

.border-wrapper {
  position: relative;
  display: flex;
  flex: 1 1;
  flex-direction: column;

  border-color: transparent;

  z-index: 1;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    border: 2px solid transparent;
    border-color: inherit;
  }

}
.border-label {
  display: none;
  position: absolute;
  top: -1rem;
  left: 0;

  font-size: 80%;
}
</style>
