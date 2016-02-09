var southWest = L.latLng(34.9816, -85.4719);
var northEast = L.latLng(35.217, -85.0462);
var center = L.latLng(35.0657, -85.241);
var bounds = L.latLngBounds(southWest, northEast);
var tiles = '//otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png';
var geocoder = 'http://maps.hamiltontn.gov/ArcGIS/rest/services/Addressing_Locator/GeocodeServer/findAddressCandidates';
var card_template = $('#card_template').html();
var zone_name_template = $('#zone_name_template').html();
var map_attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Zone data &copy; City of Chattanooga'; 
var marker;
var zones;

function score_compare(i,j) {
  if (i.score < j.score)
    return -1;
  if (i.score > j.score)
    return 1;
  return 0;
}

function render_template(tmpl, v) {
  var output = Mustache.render(tmpl, v);
  $('.zone-results').append(output);
}

function flash_message(type, msg) {
  return "<div class='flash-" + type + "'><span>" + msg + "</span></div>";
}

function build_query(address) {
  return {
    'Single Line Input': address,
    'f': 'json',
    'outSR': 4326};
}

L.Icon.Default.imagePath = 'images/leaflet-img';

var map = L.map('map', {
  maxZoom: 18,
  minZoom: 11,
  maxBounds: bounds,
  center: center,
  zoom: 12
});

L.tileLayer(tiles, {attribution: map_attribution}).addTo(map);

omnivore.topojson('data/CPDZones.topojson')
  .on('ready', function(layer) {
    zones = this;
    this.eachLayer(function(l){
      l.setStyle(l.feature.properties);
    });

    $('#input_form').submit(function(e) {
      e.preventDefault();

      if (marker !== undefined) {
        map.removeLayer(marker);
      }

      var input = $('#query').val();

      // Clear result div
      $('.zone-results').html('');
      // Clear flash
      $('#flash').html('');

      $.ajax({
        url: geocoder,
        jsonp: 'callback',
        dataType: 'jsonp',
        timeout: 5000,
        data: build_query(input),
        success: function(results) {
          if (results.candidates.length > 0) {
            var result_location = 
              results.candidates.sort(score_compare)[results.candidates.length - 1].location;
            var result = L.latLng(result_location.y, result_location.x);
            var inpolygon_results = leafletPip.pointInLayer(result, zones);

            if (inpolygon_results.length > 0) {
              var inpolygon_result = inpolygon_results[0];
              var inpolygon_props = inpolygon_result.feature.properties;

              marker = new L.Marker(result);
              map.addLayer(marker);
              map.setView(result);
              render_template(zone_name_template, {
                zone: inpolygon_props.CPD_Zone.toLowerCase(),
                zone_upper: inpolygon_props.CPD_Zone});
              render_template(card_template, {
                image: inpolygon_props.CAPT_IMG,
                name: inpolygon_props.CAPT,
                email: inpolygon_props.CAPT_EMAIL});
              render_template(card_template, {
                image: inpolygon_props.LT_IMG,
                name: inpolygon_props.LT,
                email: inpolygon_props.LT_EMAIL});
            } else {
              $('#flash').html(flash_message('error', "Your address wasn't found in a region. Try another address."));
            }
          } else {
            $('#flash').html(flash_message('error', 'No results found for your address.'));
          }
        
        },
        error: function(xhr, ajax_options, thrown_error) {
          $('#flash').html(flash_message('error', 'There was an issue finding where you live. Please try again.'));
        }
      });
    });
  })
  .addTo(map);
