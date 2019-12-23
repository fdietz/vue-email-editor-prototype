<template>
  <div class="content-editor">
    Content Editor
    <div
      v-for="block in content.blocks"
      :key="block.id"
      @click="$emit('selection-changed', block)"
      class="block"
    >
      Block {{ block.id }}
      <div
        v-for="column in block.columns"
        :key="column.id"
        @click.stop="$emit('selection-changed', column)"
        class="column"
      >
        Column {{ column.id }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object
    }
  },
  data() {
    return {};
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

  .column {
    border: 1px solid violet;
    padding: 1rem;
  }
}
</style>
