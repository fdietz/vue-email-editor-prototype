<template>
  <div
    class="content-editor"
    :class="{
      'dragging-block': draggableBlockInProgress,
      'dragging-element': draggableElementInProgress
    }"
  >
    <draggable
      class="dragArea"
      :list="content.children"
      :group="{ name: 'blocks' }"
      draggable=".block"
      :forceFallback="false"
      @start="handleDraggableBlockStart"
      @end="handleDraggableBlockEnd"
      @add="handleDraggableBlockAdd"
    >
      <div
        v-for="block in content.children"
        :key="block.id"
        @click="handleSelectionChanged(block)"
        class="block"
        :class="{
          selected:
            !currentColumn && currentBlock && currentBlock.id === block.id
        }"
      >
        <div class="border-wrapper block-border-wrapper">
          <div class="border-label">Block {{ block.id }}</div>
          <div class="border-action">
            <b-button
              variant="naked"
              class="text-primary"
              @click.stop="removeBlock(block)"
              ><font-awesome-icon icon="times"
            /></b-button>
          </div>
        </div>
        <div class="draggable-wrapper block-border-wrapper"></div>
        <div class="block-children" :style="blockStyles(block)">
          <div v-for="column in block.children" :key="column.id" class="column">
            <draggable
              v-if="column.children.length > 0"
              class="column-children"
              draggable=".element"
              :list="column.children"
              :group="{ name: 'elements', pull: true, put: ['elements'] }"
              @start="handleDraggableElementStart"
              @end="handleDraggableElementEnd"
              @add="handleDraggableElementAdd"
              :class="{ dragging: draggableElementInProgress }"
            >
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
                      class="text-secondary"
                      @click.stop="removeElement(block, column, element)"
                      ><font-awesome-icon icon="times"
                    /></b-button>
                  </div>
                </div>
                <div class="draggable-wrapper element-border-wrapper"></div>
                <div
                  v-if="element.type == 'image'"
                  class="element-image"
                  :style="elementContainerStyles(element)"
                >
                  <img
                    :src="element.attrs.src"
                    :style="imageElementStyles(element)"
                  />
                </div>
                <div
                  v-if="element.type == 'text'"
                  v-html="element.content"
                  class="element-text"
                  :style="elementContainerStyles(element)"
                ></div>
                <div
                  v-if="element.type == 'button'"
                  class="element-button"
                  :style="elementContainerStyles(element)"
                >
                  <b-button
                    variant="primary"
                    :style="buttonElementStyles(element)"
                    >{{ element.content }}</b-button
                  >
                </div>
              </div>
            </draggable>
            <draggable
              v-else
              class="dragArea column-children element-placeholder"
              draggable=".element"
              :list="column.children"
              :group="{ name: 'elements', pull: false, put: ['elements'] }"
              @start="handleDraggableElementStart"
              @end="handleDraggableElementEnd"
              @add="handleDraggableElementAdd"
              :class="{ dragging: draggableElementInProgress }"
              :style="{ minHeight: '100px' }"
            >
            </draggable>
          </div>
        </div>
      </div>
    </draggable>

    <b-modal id="modal-preview" size="xl" title="Preview">
      <iframe ref="iframe" frameborder="0"></iframe>
    </b-modal>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { debounce, throttle } from "lodash";
import { EventBus } from "@/EventBus";
import { generateMjmlPreview } from "@/mjml";

export default {
  components: {
    draggable
  },
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
  mounted() {
    EventBus.$on("generate:preview", () => {
      this.generatePreview();
    });
  },
  data() {
    return {
      draggableBlockInProgress: false,
      draggableElementInProgress: false,
      htmlContent: null,
      iFrameSrc: null
    };
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
    blockStyles({ attrs = {} }) {
      return {
        padding: `${attrs.padding}px`,
        backgroundColor: `${attrs.backgroundColor}`
      };
    },
    elementContainerStyles({ attrs = {} }) {
      return {
        padding: `${attrs.padding}px`,
        color: attrs.color,
        backgroundColor: attrs.containerBackgroundColor,
        textAlign: attrs.textAlign
      };
    },
    buttonElementStyles({ attrs = {} }) {
      return {
        color: attrs.color,
        backgroundColor: attrs.backgroundColor,
        width: `${attrs.width}px`
      };
    },
    imageElementStyles({ attrs = {} }) {
      return {
        width: `${attrs.width}px`,
        height: `${attrs.height}px`
      };
    },
    handleDraggableBlockStart() {
      this.draggableBlockInProgress = true;
    },
    handleDraggableBlockEnd() {
      this.draggableBlockInProgress = false;
    },
    handleDraggableBlockAdd() {
      this.draggableBlockInProgress = false;
    },
    handleDraggableElementStart() {
      this.draggableElementInProgress = true;
    },
    handleDraggableElementEnd() {
      this.draggableElementInProgress = false;
    },
    handleDraggableElementAdd() {
      this.draggableElementInProgress = false;
    },
    generatePreview() {
      this.htmlContent = generateMjmlPreview(this.content);
      var win = window.open();
      win.document.body.innerHTML = this.htmlContent;
    }
  }
};
</script>

<style lang="scss" scoped>
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

  overflow: hidden;

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

  &[draggable="true"] {
    > .border-wrapper {
      display: flex !important;
    }
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
    margin-left: auto;
    margin-right: 0.5rem;
  }

  .border-handle {
    cursor: move;
    position: absolute;
    top: 50%;
    right: 0;
    background-color: $block-border-color;
  }
}

.draggable-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: none;

  border: 2px solid $block-border-color;
  border-radius: 2px;
  border-style: dashed;
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
  overflow: hidden;

  .column-children {
    display: flex;
    flex-direction: column;
    flex: 1 1;

    overflow: hidden;
  }
}

.element {
  position: relative;

  display: flex;
  align-items: flex-start;

  // cursor: pointer;

  overflow: hidden;

  &:hover,
  &.selected {
    > .border-wrapper {
      display: flex;
    }
  }

  &[draggable="true"] {
    > .border-wrapper {
      display: flex !important;
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

.element-image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1;
}

.element-placeholder {
  display: flex;
  flex-direction: column;
  width: 100%;

  text-align: center;
  border: 2px dashed #efefef;

  border-radius: 3px;
}

.sortable-drag {
  opacity: 0;
}

.dragging-block {
  .block {
    &:hover,
    &.selected {
      > .border-wrapper {
        display: none;
      }
    }
  }
}

.dragging-element {
  .block {
    > .border-wrapper {
      display: flex;
    }
  }
}
</style>
