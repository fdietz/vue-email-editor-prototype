<template>
  <div class="context-properties">
    <h2>Context Properties</h2>

    <div v-if="selectedObject">{{ selectedObject.id }} {{ selectedObject.name }}</div>

    <div>
      <button @click="remove">Remove</button>
    </div>

    <div v-if="selectedObject">
      <div v-for="(value, name) in selectedObject.attrs" :key="name">
        <label>{{ name }}</label>
        <input type="text" v-model="selectedObject.attrs[name]" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedObject: {
      type: Object
    }
  },
  computed: {
    attrs() {
      return this.selectedObject.attrs;
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
