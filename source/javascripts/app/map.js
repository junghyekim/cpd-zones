var southWest = L.latLng(34.9816, -85.4719);
var northEast = L.latLng(35.217, -85.0462);
var center = L.latLng(35.0657, -85.241);
var bounds = L.latLngBounds(southWest, northEast);
var tiles = '//otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png';
var card_template = $('#card_template').html();
var marker;
var zones;

function render_template(v) {
  var output = Mustache.render(card_template, v);
  $('.zone-results').append(output);
}

function flash_message(type, msg) {
  return "<div class='flash-" + type + "'><span>" + msg + "</span></div>";
}

L.Icon.Default.imagePath = 'images/leaflet-img';

var map = L.map('map', {
  maxZoom: 18,
  minZoom: 11,
  maxBounds: bounds,
  center: center,
  zoom: 12
});

L.tileLayer(tiles, {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Zone data &copy; City of Chattanooga'
}).addTo(map);

omnivore.topojson('data/CPDZones.topojson')
  .on('ready', function(layer) {
    zones = this;
    this.eachLayer(function(l){
      l.setStyle(l.feature.properties);
    });

    $('input[value="Locate"]').click(function() {

      if (marker !== undefined) {
        map.removeLayer(marker);
      }

      var input = $('#query').val();

      // Clear result div
      $('.zone-results').html('');
      // Clear flash
      $('#flash').html('');

      L.esri.Geocoding.Tasks.geocode().text(input).run(function(err, results, response){
        if (err) {
          $('#flash').html(flash_message('error', 'There was an issue finding where you live.'));
        } else {
          if (results.results.length > 0) {
            var result = results.results[0];
            var inpolygon_results = leafletPip.pointInLayer(result.latlng, zones);

            if (inpolygon_results.length > 0) {
              var inpolygon_result = inpolygon_results[0];
              var inpolygon_props = inpolygon_result.feature.properties;

              marker = new L.Marker(result.latlng);
              map.addLayer(marker);
              map.setView(result.latlng);
              console.log(inpolygon_result.feature.properties);
              render_template({
                image: inpolygon_props.CAPT_IMG,
                name: inpolygon_props.CAPT,
                email: inpolygon_props.CAPT_EMAIL});
              render_template({
                image: inpolygon_props.LT_IMG,
                name: inpolygon_props.LT,
                email: inpolygon_props.LT_EMAIL});
            } else {
              $('#flash').html(flash_message('error', "Your address wasn't found in a region. Try another address."));
            }
          } else {
            $('#flash').html(flash_message('error', 'No results found for your address.'));
          }
        }
      });
    });
  })
  .addTo(map);
