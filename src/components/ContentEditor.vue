<template>
  <div class="content-editor" :class="{ dragging: draggableInProgress }">
    <draggable
      class="dragArea"
      :list="content.children"
      group="blocks"
      draggable=".block"
      @change="log"
      @start="handleDraggableStart"
      @end="handleDraggableEnd"
      @add="handleDraggableAdd"
    >
      <div
        v-for="block in content.children"
        :key="block.id"
        @click="handleSelectionChanged(block)"
        @dragover="handleDragOverForBlock(block)"
        @dragleave="handleDragLeaveForBlock(block)"
        @mouseover="handleMouseOverForBlock(block)"
        @mouseleave="handleMouseLeaveForBlock(block)"
        class="block"
        :class="{
          'drag-over': isDragOverForBlock(block),
          'hover-over':
            mouseOverForBlock &&
            mouseOverForBlock.id === block.id &&
            !mouseOverForElement,
          selected:
            !currentColumn && currentBlock && currentBlock.id === block.id
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
        <div class="draggable-wrapper block-border-wrapper"></div>
        <div class="block-children" :style="blockStyles(block)">
          <div v-for="column in block.children" :key="column.id" class="column">
            <draggable
              v-if="column.children.length > 0"
              class="column-children"
              draggable=".element"
              :list="column.children"
              :group="{ name: 'elements', pull: true, put: ['elements'] }"
              @change="log"
              @start="handleDraggableStart"
              @end="handleDraggableEnd"
              @add="handleDraggableAdd"
              :class="{ dragging: draggableInProgress }"
            >
              <div
                v-for="element in column.children"
                :key="element.id"
                @click.stop="handleSelectionChanged(block, column, element)"
                @mouseover="handleMouseOverForElement(element)"
                @mouseleave="handleMouseLeaveForElement(element)"
                class="element"
                :class="{
                  'hover-over':
                    mouseOverForElement &&
                    mouseOverForElement.id === element.id,
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
            <div v-else class="column-children">
              <div class="element">
                <draggable
                  class="dragArea element-placeholder"
                  draggable=".element"
                  :list="column.children"
                  :group="{ name: 'elements', pull: false, put: ['elements'] }"
                  @change="log"
                  @start="handleDraggableStart"
                  @end="handleDraggableEnd"
                  @add="handleDraggableAdd"
                  :class="{ dragging: draggableInProgress }"
                >
                </draggable>
              </div>
            </div>
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
      draggableInProgress: false,
      dragOverForBlock: null,
      mouseOverForBlock: null,
      mouseOverForElement: null,
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
    log: function(evt) {
      window.console.log(evt);
    },
    handleDraggableStart() {
      this.draggableInProgress = true;
    },
    handleDraggableEnd() {
      this.draggableInProgress = false;
      this.dragOverForBlock = null;
    },
    handleDraggableAdd() {
      this.draggableInProgress = false;
      this.dragOverForBlock = null;
    },
    handleDragOverForBlock: debounce(function handle(block) {
      this.dragOverForBlock = block;
    }, 100),
    handleDragLeaveForBlock() {
      this.dragOverForBlock = null;
    },
    isDragOverForBlock(block) {
      return this.dragOverForBlock && this.dragOverForBlock.id === block.id;
    },
    handleMouseOverForBlock: throttle(function handle(block) {
      this.mouseOverForBlock = block;
    }, 100),
    handleMouseLeaveForBlock(block) {
      this.mouseOverForBlock = null;
    },
    handleMouseOverForElement: throttle(function handle(element) {
      this.mouseOverForElement = element;
    }, 100),
    handleMouseLeaveForElement(element) {
      this.mouseOverForElement = null;
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
  cursor: pointer;

  &.hover-over,
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

  &.sortable-ghost {
    > .draggable-wrapper {
      display: flex;
    }
    > .border-wrapper {
      display: none;
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
    position: absolute;
    top: 0px;
    right: 0px;

    z-index: 2;
  }
}

.draggable-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: none;

  border: 2px solid red;
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

  cursor: pointer;

  overflow: hidden;

  &.hover-over,
  &.selected {
    > .border-wrapper {
      display: flex;
    }
  }

  &.sortable-ghost {
    > .draggable-wrapper {
      display: flex;
    }
    > .border-wrapper {
      display: none;
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
  align-items: center;
  justify-content: center;
  flex: 1 1;
  text-align: center;
  background-color: #efefef;

  font-style: italic;
  border-radius: 3px;
}

.dragging {
  .border-wrapper {
    display: none !important;
  }
}

.dragging {
  .block {
    &.drag-over {
      > .border-wrapper {
        display: flex !important;
      }
    }
  }
}
</style>
