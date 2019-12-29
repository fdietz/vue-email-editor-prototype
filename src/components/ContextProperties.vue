<template>
  <div class="context-properties">
    <h2>Context Properties</h2>

    <div v-if="selectedObject">
      {{ selectedObject.id }} {{ selectedObject.name }}
    </div>

    <div v-if="selectedObject.name == 'block'">
      <b-form-group label="Padding">
        <b-form-input type="number" v-model="selectedObject.attrs.padding" />
      </b-form-group>
      <b-form-group label="Background Color">
        <b-form-input v-model="selectedObject.attrs.backgroundColor" />
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

    <div v-if="selectedObject.name == 'element'">
      <b-form-group label="Padding">
        <b-form-input type="number" v-model="selectedObject.attrs.padding" />
      </b-form-group>

      <b-form-group label="Alignment">
        <b-form-select
          v-model="selectedObject.attrs.textAlign"
          :options="textAlignOptions"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Color">
        <b-form-input v-model="selectedObject.attrs.color" />
      </b-form-group>

      <b-form-group label="Background Color">
        <b-form-input v-model="selectedObject.attrs.backgroundColor" />
      </b-form-group>

      <b-form-group v-if="selectedObject.type == 'text'" label="Text Content">
        <b-form-textarea v-model="selectedObject.attrs.textContent" />
      </b-form-group>

      <b-form-group v-if="selectedObject.type == 'button'" label="Button Text">
        <b-form-textarea v-model="selectedObject.attrs.buttonText" />
      </b-form-group>
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
  data() {
    return {
      alignSelfOptions: [
        { value: "flex-start", text: "Left" },
        { value: "center", text: "Center" },
        { value: "flex-end", text: "Right" }
      ],
      textAlignOptions: [
        { value: "left", text: "Left" },
        { value: "center", text: "Center" },
        { value: "right", text: "Right" }
      ]
    };
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
