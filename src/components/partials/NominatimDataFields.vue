<template>
  <div>
    <b-container v-if="api_result">
      <b-row>
        <b-col cols="4">
          <b-form-select name="zoom" v-model="zoom_level">
            <option value="0">0 Continent / Sea</option>
            <option value="1">1 </option>
            <option value="2">2 </option>
            <option value="3">3 Country</option>
            <option value="4">4 </option>
            <option value="5">5 State</option>
            <option value="6">6 Region</option>
            <option value="7">7 </option>
            <option value="8">8 County</option>
            <option value="9">9 </option>
            <option value="10">10 City</option>
            <option value="11">11 </option>
            <option value="12">12 Town / Village</option>
            <option value="13">13 </option>
            <option value="14">14 Suburb</option>
            <option value="15">15 </option>
            <option value="16">16 Street</option>
            <option value="17">17 </option>
            <option value="18">18 Building</option>
            <option value="19">19 </option>
            <option value="20">20 </option>
            <option value="21">21 </option>
          </b-form-select>
          {{ map_marker }}
          <a :href="wikidata" target="_blank">Wikidata</a>
        </b-col>
        <b-col cols="8">
          <b-form-textarea
            style="height:300px; font-size:10px"
            v-model="clean_result"
          ></b-form-textarea>
        </b-col>
      </b-row>
      <div v-if="wikipedia[0]">
        <a :href="wikipedia[0]" target="_blank">Wikipedia</a>
      </div>
      <b-row>
        <b-col>
          <b-input-group prepend="name">
            <b-form-input :value="feature_props.name"></b-form-input>
          </b-input-group>
          <b-input-group prepend="display_name">
            <b-form-input :value="feature_props.display_name"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-input-group v-for="val in table_values" :key="val.key">
        <b-input-group-prepend is-text>
          <b-form-checkbox switch class="mr-n2" v-model="val.enabled">
            <span class="sr-only">Switch for following text input</span>
          </b-form-checkbox>
        </b-input-group-prepend>
        <b-form-input :disabled="!val.enabled" :value="val.key"></b-form-input>
        <b-form-input :disabled="!val.enabled" :value="val.value"></b-form-input>
      </b-input-group>
      <!--<b-table
        striped
        hover
        :items="table_values"
        :fields="table_fields"
      ></b-table>-->
    </b-container>
    <v-icon v-else name="sync" spin></v-icon>
  </div>
</template>

<script>
/*
"suburb": "Saragozza-Porto",
"city": "Bologna",
"county": "BO",
"state": "Emilia-Romagna",
"postcode": "40122",
"country": "Italy",
"country_code": "it"
*/

import axios from "axios";

export default {
  props: {
    map_marker: {}
  },
  data() {
    return {
      api_result: null,
      clean_result: "",
      query_string: "",
      feature_props: null,
      table_fields: [],
      zoom_level: 12,
      table_values: [],
      wikipedia: [],
      wikidata: ""
    };
  },
  watch: {
    map_marker: function(newMarker) {
      this.api_result = null;
      this.queryMapData(newMarker);
    }
  },
  methods: {
    updateTableFields() {
      this.table_fields = [
        {
          key: "key"
          //label: "Person age",
          //sortable: true,
          // Variant applies to the whole column, including the header and footer
          //variant: "danger"
        },
        { key: "value" }
      ];
      this.table_values = [];
      let data = this.feature_props.address;
      //console.log(data)
      for (var key in data) {
        //console.log(key)
        if (data.hasOwnProperty(key)) {
          var value = data[key];
          var addressField = { key: key, value: value, enabled: true };
          //console.log(value)
          if (key == "country_code") {
            addressField.enabled = false;
          }
          this.table_values.push(addressField);
        }
      }
      console.log(this.feature_props.extratags);
      if (this.feature_props.extratags.wikipedia != null) {
        let wikiLanguage = this.feature_props.extratags.wikipedia.split(":")[0];
        let wikiName = this.feature_props.extratags.wikipedia.split(":")[1];
        let wikiLink =
          "https://" + wikiLanguage + ".wikipedia.org/wiki/" + wikiName;

        this.wikipedia.push(wikiLink);
      }
      if (this.feature_props.extratags.wikidata != null) {
        this.wikidata =
          "https://www.wikidata.org/wiki/Special:EntityData/" +
          this.feature_props.extratags.wikidata +
          ".json";
      }
    },
    queryMapData(marker) {
      this.wikipedia = [];
      let config = {
        headers: {
          "accept-language": "en,zh"
        }
      };
      // for just a node:
      //&osm_type=N
      this.query_string =
        "https://nominatim.openstreetmap.org/reverse?format=geojson&lat=" +
        marker.lat +
        "&lon=" +
        marker.lng +
        "&zoom=" +
        this.zoom_level +
        "&addressdetails=1&name_details=1&extratags=1";
      console.log(this.query_string);
      axios.get(this.query_string, config).then(response => {
        this.api_result = response;
        this.clean_result = JSON.stringify(response.data.features[0], null, 2);
        this.feature_props = response.data.features[0].properties;
        this.updateTableFields();
      });
    }
  }
};
</script>
