<template>
  <div class="context-properties">
    <h2>Context Properties</h2>

    <div v-if="selectedObject">
      {{ selectedObject.id }} {{ selectedObject.name }}
    </div>

    <div>
      <Button @click="remove">Remove</Button>
    </div>

    <div v-if="selectedObject.name == 'block'">
      <b-form-group label="Padding">
        <b-form-input type="number" v-model="selectedObject.attrs.padding" />
      </b-form-group>
    </div>

    <div v-if="selectedObject.name == 'column'">
      <b-form-group label="Padding">
        <b-form-input type="number" v-model="selectedObject.attrs.padding" />
      </b-form-group>
      <b-form-group label="Alignment">
        <b-form-select
          v-model="selectedObject.attrs.alignSelf"
          :options="alignSelfOptions"
        ></b-form-select>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";

export default {
  components: {
    Button
  },
  props: {
    selectedObject: {
      type: Object
    }
  },
  data() {
    return {
      alignSelfOptions: [
        { value: "flex-start", text: "Left" },
        { value: "center", text: "Center" },
        { value: "flex-end", text: "Right" }
      ]
    };
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
  border-left: 1px solid #e8e8ef;
  margin-left: 1rem;
  padding: 1rem;
}
</style>
