<template>
  <div class="navigation">
    Email Editor

    <b-button variant="primary" class="ml-auto">Preview</b-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  top: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  width: 100%;
  height: 65px;

  padding: 1rem;

  color: #fff;
  background-color: #2c2c2c;

  border-bottom: 1px solid #e8e8ef;

  font-size: 1.4rem;
}
</style>
