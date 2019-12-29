<template>
  <div id="app">
    <Navigation></Navigation>
    <EmailEditor />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import EmailEditor from "./components/EmailEditor.vue";

export default {
  name: "app",
  components: {
    EmailEditor,
    Navigation
  }
};
</script>

<style lang="scss"></style>
