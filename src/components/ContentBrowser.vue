<template>
  <div class="content-browser">
    Content Browser

    <h3>Layouts</h3>
    <ul>
      <li>
        <a href="#" @click="addColumn(1)">1 Column</a>
      </li>
      <li>
        <a href="#" @click="addColumn(2)">2 Column</a>
      </li>
      <li>
        <a href="#" @click="addColumn(3)">3 Column</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    addColumn(count) {
      this.$emit("add-column", { count });
    }
  }
};
</script>

<style>
.content-browser {
  border: 1px solid red;
}
</style>
