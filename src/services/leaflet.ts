import L from 'leaflet'
import "leaflet-routing-machine"
import "leaflet/dist/leaflet.css";
import config from "../config/mapConfig"
import builder from './itineraryBuilder';
class LeafletMaps {
  private map: L.Map;
  private tileLayer: L.TileLayer;
  private route: L.Routing.Control;
  private router: L.Routing.OSRMv1;
  constructor(center: L.LatLngExpression, zoom: number, divId: string) {
    this.map = L.map(divId).setView(center, zoom);
    this.tileLayer = L.tileLayer(
      config.tileUrl,
      {
        attribution:
          '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        accessToken: config.mapboxToken,
      }
    )
    this.router = L.routing.osrmv1({
      serviceUrl: config.osrmUrl,
      language: 'en',
      
    });

    const build = new builder()
    this.route = L.routing.control({
      router: this.router,
      showAlternatives: false,
      itineraryBuilder: build,
      summaryTemplate: "<h2>{time}, {distance}</h2>",
      containerClassName: "info"
    })
    this.tileLayer.addTo(this.map);
  }

  public Route(Waypoints: L.LatLngTuple[]) {
    const route = Waypoints.map(res => {
      return new L.LatLng(res[0], res[1])
    })
    this.route.setWaypoints(route).addTo(this.map).hide()
  }

  public ChangeMapView(tileId: string) {
    this.tileLayer.options.id = tileId
  }

  public setCenter(waypoint: L.LatLngExpression) {
    this.map.setView(waypoint)
  }
}
export default LeafletMaps