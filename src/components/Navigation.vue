<template>
  <div class="navigation">
    Email Editor

    <b-button @click="generatePreview" variant="primary" class="ml-auto">Preview</b-button>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus";

export default {
  methods: {
    generatePreview(){
      EventBus.$emit("generate:preview");
    }
  }
};
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
