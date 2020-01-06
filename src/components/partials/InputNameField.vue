<template>
  <b-input-group>
    <b-input-group-prepend>
      <b-form-select
        :options="language_categories"
        v-model="name_language_category"
        @change="updateName"
      ></b-form-select>
    </b-input-group-prepend>
    <b-form-input
      v-model="name_value"
      @change="updateName"
    ></b-form-input>
  </b-input-group>
</template>

<script>
export default {
  name: "InputNameField",
  props: {
    name_index: Number,
    language_categories: Array
  },
  data() {
    return {
      name_value: "",
      name_language_category: "py",
    };
  },
  methods: {
    updateName() {
      console.log(this.name_index);
      console.log(this.name_value);
      console.log(this.name_language_category);
      this.$emit("update-name-field", {
        name_index: this.name_index,
        name_value: this.name_value,
        name_language_category: this.name_language_category
      });
    }
  }
};
</script>

<style scoped></style>