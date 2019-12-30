<template>
  <div class="content-browser">
    <h5 class="text-uppercase text-secondary">
      <font-awesome-icon icon="caret-down" /> Layouts
    </h5>

    <draggable
      class="dragArea draggable-list"
      draggable=".block-item"
      :sort="false"
      :list="layouts"
      :group="{ name: 'blocks', pull: 'clone', put: false }"
      :clone="cloneBlock"
      @change="log"
    >
      <div v-for="layout in layouts" :key="layout.name" class="block-item">
        {{ layout.name }}
      </div>
    </draggable>

    <hr />

    <h5 class="text-uppercase text-secondary">
      <font-awesome-icon icon="caret-down" />
      Elements
    </h5>

    <draggable
      class="dragArea draggable-list"
      draggable=".element-item"
      :sort="false"
      :list="elements"
      :group="{ name: 'elements', pull: 'clone', put: false }"
      :clone="cloneElement"
      @change="log"
    >
      <div v-for="element in elements" :key="element.name" class="element-item">
        {{ element.name }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

import { buildBlock, buildElement } from "@/store";

export default {
  components: {
    draggable
  },
  data() {
    return {
      layouts: [
        {
          name: "1 Column",
          columnCount: 1
        },
        {
          name: "2 Columns",
          columnCount: 2
        },
        {
          name: "3 Columns",
          columnCount: 3
        }
      ],
      elements: [
        {
          name: "Text",
          type: "text"
        },
        {
          name: "Button",
          type: "button"
        },
        {
          name: "Image",
          type: "image"
        }
      ]
    };
  },
  methods: {
    addColumn(count) {
      this.$emit("add-column", { count });
    },
    cloneBlock({ columnCount }) {
      return buildBlock(columnCount);
    },
    cloneElement({ type }) {
      return buildElement(type);
    },
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

$block-border-color: $primary;

.content-browser {
  border-right: 1px solid #e8e8ef;
  padding: 1rem;
}

.draggable-list {
  list-style-type: none;
  margin: 0;
  padding-left: 1rem;
}

.block-item {
  display: flex;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 0.5rem;

  cursor: pointer;

  &.sortable-ghost {
    align-items: center;
    justify-content: center;
    margin: 0.5rem auto;

    border: 2px solid $block-border-color;
    border-style: dashed;
  }
}

.element-item {
  display: flex;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 0.5rem;

  cursor: pointer;

  &.sortable-ghost {
    align-items: center;
    justify-content: center;
    margin: 0.5rem auto;

    border: 2px solid $block-border-color;
    border-style: dashed;
  }
}
</style>
