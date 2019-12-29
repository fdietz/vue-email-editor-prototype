<template>
  <div class="content-editor">
    <h2>Content Editor</h2>

    <div class="breadcrumb">
      Breadcrumb:
      <span v-if="currentBlock"> Block {{ currentBlock.id }} </span>
      <span v-if="currentColumn"> / Column {{ currentColumn.id }} </span>
      <span v-if="currentElement"> / Element {{ currentElement.id }} </span>
    </div>

    <div
      v-for="block in content.children"
      :key="block.id"
      @click="handleSelectionChanged(block)"
      class="block"
      :class="{
        selected: !currentColumn && currentBlock && currentBlock.id === block.id
      }"
    >
      <div class="block-border-wrapper">
        <div class="border-label">Block {{ block.id }}</div>
        <div class="block-children" :style="blockStyles(block)">
          <div
            v-for="column in block.children"
            :key="column.id"
            @click.stop="handleSelectionChanged(block, column)"
            class="column"
            :class="{
              selected:
                !currentElement &&
                currentColumn &&
                currentBlock &&
                currentColumn.id === column.id &&
                currentBlock.id === block.id
            }"
          >
            <div class="column-border-wrapper">
              <div class="border-label">Column {{ column.id }}</div>
              <div class="column-children" :style="columnStyles(column)">
                <div
                  v-for="element in column.children"
                  :key="element.id"
                  @click.stop="handleSelectionChanged(block, column, element)"
                  class="element"
                  :class="{
                    selected:
                      currentElement &&
                      currentColumn &&
                      currentBlock &&
                      currentElement.id == element.id &&
                      currentColumn.id === column.id &&
                      currentBlock.id === block.id
                  }"
                >
                  <div class="element-border-wrapper">
                    <div class="border-label">Element {{ element.id }}</div>
                    <div
                      v-if="element.type == 'text'"
                      v-html="element.attrs.content"
                    ></div>
                  </div>
                </div>
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
    currentBlock: {
      type: Object
    },
    currentColumn: {
      type: Object
    },
    currentElement: {
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
    handleSelectionChanged(block, column, element) {
      this.$emit("selection-changed", { block, column, element });
    },
    columnStyles({ attrs = {} }) {
      return {
        padding: `${attrs.padding}px`,
        alignSelf: `${attrs.alignSelf || "center"}`
      };
    },
    blockStyles({ attrs = {} }) {
      return {
        padding: `${attrs.padding}px`,
        backgroundColor: `${attrs.backgroundColor || "#f5f5f5"}`
      };
    },
    elementStyles({ attrs = {} }) {
      return {
        padding: `${attrs.padding}px`
      };
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

$block-border-color: $primary;
$column-border-color: $secondary;

.content-editor {
  padding: 1rem;
}

.block {
  display: flex;
  flex-direction: column;
  z-index: 1;
  cursor: pointer;

  &:hover,
  &.selected {
    .block-border-wrapper {
      border-color: $block-border-color;

      > .border-label {
        display: flex;
      }
    }
  }

  .block-children {
    display: flex;
    width: 600px;
    margin: 0px auto;

    align-self: center;
  }
}

.block-border-wrapper {
  position: relative;
  display: flex;
  flex: 1 1;
  flex-direction: column;
  justify-content: center;

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
    border-radius: 2px;
  }
}

.column {
  z-index: 2;

  display: flex;
  flex: 1 1;
  // border: 1px solid $column-border-color;

  min-height: 50px;

  cursor: pointer;

  &:hover,
  &.selected {
    .column-border-wrapper {
      border-color: $column-border-color;

      > .border-label {
        display: flex;
      }
    }
  }

  .column-children {
  }
}

.element {
  z-index: 3;

  display: flex;
  flex: 1 1;
  // border: 1px solid $column-border-color;

  min-height: 50px;

  cursor: pointer;

  &:hover,
  &.selected {
    .element-border-wrapper {
      border-color: $column-border-color;

      > .border-label {
        display: flex;
      }
    }
  }

  .element-children {
  }
}

.column-border-wrapper {
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
    border-radius: 2px;
  }
}

.element-border-wrapper {
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
    border-radius: 2px;
  }
}

.border-label {
  display: none;
  position: absolute;
  top: -1rem;
  left: 0;

  font-size: 80%;
}

.breadcrumb {
  margin-bottom: 2rem;
}
</style>
