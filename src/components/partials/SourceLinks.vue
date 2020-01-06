<template>
  <b-card>
    <b-input-group v-for="link in links" :key="link.key">
      <b-input-group-prepend>
        <b-form-select :options="source_icons" value="wiki_red"></b-form-select>
      </b-input-group-prepend>

      <b-form-input type="url"></b-form-input>

      <b-input-group-append v-if="link.key == links.length - 1">
        <b-button
          variant="outline-danger"
          :disabled="links.length <= 1"
          @click="removeLink(link.key)"
          ><v-icon name="minus"
        /></b-button>
        <b-button variant="outline-primary" @click="addLink()"
          ><v-icon name="plus"
        /></b-button>
      </b-input-group-append>
    </b-input-group>
  </b-card>
</template>

<script>
export default {
  name: "SourceLinks",
  data() {
    return {
      links: [{ key: 0 }],
      source_icons: [
        { value: "wiki_red", text: "Chinese Wikipedia" },
        { value: "wiki_black", text: "English Wikipedia" },
        { value: "baidu", text: "Baidu" }
      ]
    };
  },
  methods: {
    addLink() {
      this.links.push({ key: this.links.length });
    },
    removeLink() {
      if (this.links.length > 1) {
        this.links.pop();
      }
    },
    updateSources() {
      this.$emit("source-links-updated", { source_links: links });
    }
  }
};
</script>

<style scoped></style>
