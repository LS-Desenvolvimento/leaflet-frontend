<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import LeafletMaps from '../services/leaflet'
import type L from 'leaflet'
import { isArray } from "@vue/shared";
export default defineComponent({
  data() {
    return {
      center: [-15.792088, -47.889919] as L.LatLngExpression,
      map: {} as LeafletMaps
    }
  },
  mounted() {
    this.map = new LeafletMaps(this.center, 18, "map");
    let route = this.$route.query.loc as string[] | string
    if (route && isArray(route)) {
      let routeFixed = route.map(res => {
        let cords = res.split(',')
        return [parseFloat(cords[0]), parseFloat(cords[1])]
      }) as L.LatLngTuple[];
      this.map.Route(routeFixed);
      return;
    }
    if (route) {
      let cord = route.split(',')
      this.map.setCenter([parseFloat(cord[0]), parseFloat(cord[1])])
    }
  },
})
</script>

<style>
#map {
  width: 100vw;
  height: 100vh;
}
.info {
  background-color: rgba(255, 255, 255, 0.5);
  padding-left: 10px;
  padding-right: 10px;
}
</style>
