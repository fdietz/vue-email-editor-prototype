<template>
  <div class="content-browser">
    <h5 class="text-uppercase">Layouts</h5>
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

    <hr />

    <h5 class="text-uppercase">Elements</h5>

    <ul>
      <li>
        <a href="#" @click="addTextElement">Text</a>
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
  border-right: 1px solid #e8e8ef;
  padding: 1rem;
}
</style>
