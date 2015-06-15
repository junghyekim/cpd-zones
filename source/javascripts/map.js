var southWest = L.latLng(34.9816, -85.4719);
var northEast = L.latLng(35.217, -85.0462);
var center = L.latLng(35.0657, -85.241);
var bounds = L.latLngBounds(southWest, northEast);
var tiles = '//otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png'

var map = L.map('map', {
  maxZoom: 18,
  minZoom: 11,
  maxBounds: bounds,
  center: center,
  zoom: 12
});

L.tileLayer(tiles, {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Zone data &copy; City of Chattanooga, Imagery © <a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);

omnivore.topojson('data/CPDZones.topojson')
  .on('ready', function(layer) {
    this.eachLayer(function(l){
      l.setStyle(l.feature.properties);
    });
  })
  .addTo(map);
