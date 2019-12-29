<template>
  <div class="content-editor">
    <div
      v-for="block in content.children"
      :key="block.id"
      @click="handleSelectionChanged(block)"
      class="block"
      :class="{
        selected: !currentColumn && currentBlock && currentBlock.id === block.id
      }"
    >
      <div class="border-wrapper block-border-wrapper">
        <div class="border-label">Block {{ block.id }}</div>
        <div class="border-action">
          <b-button variant="naked" size="sm" @click.stop="removeBlock(block)"
            ><font-awesome-icon icon="times"
          /></b-button>
        </div>
      </div>
      <div class="block-children" :style="blockStyles(block)">
        <div v-for="column in block.children" :key="column.id" class="column">
          <div v-if="column.children.length > 0" class="column-children">
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
              <div class="border-wrapper element-border-wrapper">
                <div class="border-action">
                  <b-button
                    variant="naked"
                    size="sm"
                    @click.stop="removeElement(block, column, element)"
                    ><font-awesome-icon icon="times"
                  /></b-button>
                </div>
              </div>
              <div
                v-if="element.type == 'text'"
                v-html="element.attrs.textContent"
                class="element-text"
                :style="elementStyles(element)"
              ></div>
              <div
                v-if="element.type == 'button'"
                class="element-button"
                :style="elementStyles(element)"
              >
                <b-button variant="primary">{{
                  element.attrs.buttonText
                }}</b-button>
              </div>
            </div>
          </div>
          <div v-else class="column-children">
            <div class="element">
              <div class="element-placeholder">
                Placeholder
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
    removeElement(block, column, element) {
      this.$emit("remove-element", { block, column, element });
    },
    removeBlock(block) {
      this.$emit("remove-block", { block });
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
        backgroundColor: `${attrs.backgroundColor}`
      };
    },
    elementStyles({ attrs = {} }) {
      return {
        padding: `${attrs.padding}px`,
        color: `${attrs.color}`,
        backgroundColor: `${attrs.backgroundColor}`,
        textAlign: `${attrs.textAlign}`
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
  padding-top: 2rem;
  background-color: #f3f3f3;
}

.block {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover,
  &.selected {
    > .border-wrapper {
      display: flex;
    }
  }

  .block-children {
    display: flex;
    width: 600px;
    margin: 0px auto;
  }
}

.border-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: none;

  border: 2px solid transparent;
  border-color: inherit;
  border-radius: 2px;

  .border-label {
    position: absolute;
    top: -1rem;
    left: 0;

    font-size: 80%;
  }

  .border-action {
    position: absolute;
    top: 0px;
    right: 0px;

    z-index: 2;
  }
}

.block-border-wrapper {
  border-color: $block-border-color;
}

.element-border-wrapper {
  border-color: $column-border-color;
}

.column {
  display: flex;
  flex: 1 1;

  min-height: 50px;

  .column-children {
    display: flex;
    flex-direction: column;
    flex: 1 1;
  }
}

.element {
  position: relative;

  display: flex;
  flex: 1 1;

  cursor: pointer;

  &:hover,
  &.selected {
    > .border-wrapper {
      display: flex;
    }
  }
}

.element-text,
.element-button {
  display: block;
  width: 100%;
}

.element-text {
  word-break: break-word;
}

.element-placeholder {
  text-align: center;
}
</style>
