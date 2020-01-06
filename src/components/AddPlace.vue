<template>
  <b-container>
    <NominatimDataFields v-if="map_marker" :map_marker="map_marker" />
    <!-- basic 
    <v-icon name="baidu" color="blue" />
    <v-icon name="brands/wikipedia-w" color="black" />
    <v-icon name="brands/wikipedia-w" color="red" />
    -->
    <b-form @submit="onSubmit" @reset="onReset">
      <NameFields />
      <SourceLinks />
      <b-card>
        <b-row>
          <b-col cols="4">
            <PlaceMap style="height:300px" v-on:map-updated="mapUpdated" />
          </b-col>
          <b-col>
            <b-input-group prepend="Lat" class="mb-2">
              <b-form-input
                type="number"
                v-bind:value="lat"
                disabled
              ></b-form-input>
            </b-input-group>
            <b-input-group prepend="Lng" class="mb-2"
              ><b-form-input
                type="number"
                v-bind:value="lng"
                disabled
              ></b-form-input
            ></b-input-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card>
        <b-row>
          <b-col cols="8">
            <b-button block type="submit" variant="primary">Submit</b-button>
          </b-col>
          <b-col>
            <b-button block type="reset" variant="danger">Reset</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-form>
  </b-container>
</template>

<script>
import PlaceMap from "./partials/PlaceMap";
import SourceLinks from "./partials/SourceLinks";
import NameFields from "./partials/NameFields";
import axios from "axios";
import NominatimDataFields from "./partials/NominatimDataFields";
export default {
  name: "AddPlace",
  components: { PlaceMap, SourceLinks, NameFields, NominatimDataFields },
  data() {
    return {
      names: [],
      sources: [],
      lat: null,
      lng: null,
      zoom_level: 12,
      loading: true,
      map_marker: null
    };
  },
  mounted() {
    //this.queryMapData(null);
  },
  methods: {
    onSubmit() {},
    onReset() {
      this.lat = null;
      this.lng = null;
    },
    mapUpdated(marker) {
      this.lat = marker[0];
      this.lng = marker[1];
      this.map_info = null;
      this.map_marker = { lat: marker[0], lng: marker[1] };
    },
    addLink() {
      this.links.push({ key: this.links.length });
    },
    removeLink() {
      if (this.links.length > 1) {
        this.links.pop();
      }
    },
    updateNames(args) {
      this.names = [];
      args.name_fields.forEach(element => {
        this.names.push({
          value: element.value,
          language_category: element.language_category
        });
      });
    },
    updateSources(args) {
      this.sources = [];
      args.name_fields.forEach(element => {
        this.sources.push({
          value: element.value,
          icon: element.icon
        });
      });
    }
  }
};
</script>

<style scoped></style>
