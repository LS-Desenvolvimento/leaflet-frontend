<script lang="ts">
import L from "leaflet"
import "leaflet-routing-machine"
import "leaflet/dist/leaflet.css";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      center: [-15.792088, -47.889919] as L.LatLngExpression
    }
  },
  methods: {
    setupLeafletMap: function () {
      const mapDiv = L.map("map").setView(this.center, 13);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          accessToken: 'pk.eyJ1IjoibXNsZWUiLCJhIjoiclpiTWV5SSJ9.P_h8r37vD8jpIH1A6i1VRg',
        }
      ).addTo(mapDiv);
      L.routing.control({
        waypoints: [
          L.latLng(-15.792088, -47.889919),
          L.latLng(-15.782200, -47.889600)
        ],
        
      }
      ).addTo(mapDiv)
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
})
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
