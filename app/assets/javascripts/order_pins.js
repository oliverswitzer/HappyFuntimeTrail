var pins;
var latlngs = [];
var markers = [];
var infowindow = new google.maps.InfoWindow();
var trailPath;
var map;

$(document).ready(function(){
  initialize();
});

function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {mapTypeId: google.maps.MapTypeId.HYBRID});

  setPins();

  var latlngBounds = new google.maps.LatLngBounds();
  latlngs.forEach(function (n) {
    latlngBounds.extend(n);
  });
  map.setCenter(latlngBounds.getCenter());
  map.fitBounds(latlngBounds); 

  setTrail();
}

function clickMarker(marker, pin) {
  google.maps.event.addListener(marker,'click',function(e) {
    infowindow.setContent(
      '<p>' + pin.address + '</p>' +
      '<p>' + pin.name + '</p>'
      );
    infowindow.open(map, marker);
  });
}

function setPins() {
  pins = $('.pin-data').data('pins');
  latlngs = [];
  for (var i = 0, pin; pin = pins[i]; i++) {
    var latlng = new google.maps.LatLng(pin.latitude, pin.longitude);
    latlngs.push(latlng);

    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: "/assets/number_" + pin.stepnumber + ".png",
      title: 'Treasure Hunt!'
    });

    markers.push(marker);
    clickMarker(marker, pin);
  }
}

function clearPins() {
  for (var i = 0, marker; marker = markers[i]; i++) {
    marker.setMap(null);
  }
}

function setTrail() {
  resetTrail(); 

  trailPath = new google.maps.Polyline({
    path: latlngs,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  trailPath.setMap(map);
}

function resetTrail() {
  if (trailPath) {
    trailPath.setMap(null);
    trailPath = null;
  }
}

$('#pins').sortable({
    update: function() {
      $.post($(this).data('update-url'), $(this).sortable('serialize'));
      $.get($('.dynamic').data('update-url'), function( data ) {
        $(".dynamic").html(data);
        clearPins();
        markers = [];
        setPins();
        setTrail();
      });
    }
  }
);