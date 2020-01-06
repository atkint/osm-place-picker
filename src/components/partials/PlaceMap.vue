<template>
  <div style="height: 100%; width: 100%">
    <l-map
      style="height: 100%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
      @click="mapClick"
    >
    <l-marker
      :key="index"
      v-for="(m, index) in markers"
      :lat-lng="m.pos"
    ></l-marker>
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>
<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
export default {
  name: "PlaceMap",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 4,
      center: [37.439974, 106.735094],
      bounds: null,
      markers: [],
      selected_position: [null,null]
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    mapClick(event) {
      const pos = [event.latlng.lat, event.latlng.lng];
      this.markers = [];
      this.selected_position = pos;
      this.markers.push({ pos: pos });
      this.$emit('map-updated', pos)
    }
  }
};
</script>
