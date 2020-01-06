<template>
  <b-card>
    <b-input-group>
      <b-button
        variant="outline-danger"
        :disabled="name_fields.length <= 1"
        @click="removeLink()"
        ><v-icon name="minus"
      /></b-button>
      <b-button variant="outline-primary" @click="addLink()"
        ><v-icon name="plus"
      /></b-button>
    </b-input-group>
    <InputNameField
      v-for="name_field in name_fields"
      :key="name_field.key"
      :name_index="name_field.key"
      v-on:update-name-field="updateNameField"
      :language_categories="language_categories"
    />
  </b-card>
</template>

<script>
import InputNameField from "./InputNameField";

export default {
  name: "NameFields",
  components: { InputNameField },
  data() {
    return {
      name_fields: [{ key: 0, value: "", language_category: "py" }],
      language_categories: [
        { value: "py", text: "Pinyin" },
        { value: "zh", text: "Chinese" },
        { value: "wg", text: "Wade-Giles" }
      ]
    };
  },
  methods: {
    addLink() {
      this.name_fields.push({
        key: this.name_fields.length,
        value: "",
        language_category: "py"
      });
    },
    removeLink() {
      if (this.name_fields.length > 1) {
        this.name_fields.pop();
      }
    },
    updateNameField(args) {
      console.log(JSON.stringify(args));
      console.log(JSON.stringify(this.name_fields[args.name_index]));
      this.name_fields[args.name_index].value = args.name_value;
      this.name_fields[args.name_index].language_category =
        args.name_language_category;
      this.$emit("name-fields-updated", { name_fields: this.name_fields });
    }
  }
};
</script>

<style scoped></style>
