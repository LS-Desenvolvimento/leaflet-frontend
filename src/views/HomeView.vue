<template>
  <div id="map"></div>
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
      this.map.onRouteChange(this.changeUrltoNewWaypoints)
      return;
    }
    if (route) {
      let cord = route.split(',')
      this.map.setCenter([parseFloat(cord[0]), parseFloat(cord[1])])
    }
    this.map.onRouteChange(this.changeUrltoNewWaypoints)
  },

  methods: {
    changeUrltoNewWaypoints() {
      const waypoints = this.map.getAllWaypoints()
      let url = this.$router.currentRoute.value.fullPath;
      waypoints.forEach((res, index) => {
        let point = 'loc=' + res.latLng.lat.toFixed(6) + ',' + res.latLng.lng.toFixed(6)
        
        if(index == 0) {
          url= '/'
          point = '?' + point;
        } else {
          point = '&' + point;
        }
        url = url + point
      })
      this.$router.push(url)
    }
  }
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

.steps {
  overflow: auto;
  max-height: 70vh;
}
</style>
