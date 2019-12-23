<template>
  <div class="context-properties">
    Context Properties
    {{ selectedObject }}

    <button @click="remove">Remove</button>
  </div>
</template>

<script>
export default {
  props: {
    selectedObject: {
      type: Object
    }
  },
  methods: {
    remove() {
      this.$emit("remove");
    }
  }
};
</script>

<style>
.context-properties {
  border: 1px solid pink;
}
</style>
