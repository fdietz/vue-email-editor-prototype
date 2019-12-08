<template>
  <div class="context-properties">
    Context Properties
    {{selectedObject}}
  </div>
</template>

<script>
export default {
  props: {
    selectedObject: {
      type: Object
    }
  }
}
</script>

<style>
.context-properties {
  border: 1px solid pink;
}
</style>