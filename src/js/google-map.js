;
function initialize() {
  var mapCanvas   = document.getElementById('map');
  var mapOptions  = {
    center: new google.maps.LatLng(50.024816, 36.331628),
    zoom: 17,
   zoomControl: true,
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            scaleControl: false,
            scrollwheel: false,
            panControl: true,
            streetViewControl: true,
            draggable : true,
            overviewMapControl: false,
            overviewMapControlOptions: {
            opened: false,
            },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map     = new google.maps.Map(mapCanvas, mapOptions);
  var markers   = [],
      myPlaces  = [];
      myPlaces.push(new Place('Харьков', 50.024816, 36.331628, 'ул. Героев труда 18'));
      for (var i = 0, n = myPlaces.length; i < n; i++) {
      var marker  = new google.maps.Marker({
          position: new google.maps.LatLng(myPlaces[i].latitude,
          myPlaces[i].longitude),
          map       : map,
          title     : myPlaces[i].name,
          icon      : "img/icons/marker.png",
          animation : google.maps.Animation.DROP
        });
      var infowindow = new google.maps.InfoWindow({
        content: '<div class="info-wrp"><p>' + myPlaces[i].name + '</p><span>' + myPlaces[i].description
      });
      makeInfoWindowEvent(map, infowindow, marker);
      markers.push(marker);
    }
  }
  function makeInfoWindowEvent(map, infowindow, marker) {
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });
  }
  function Place(name, latitude, longitude, description){
    this.name         = name;
    this.latitude     = latitude;
    this.longitude    = longitude;
    this.description  = description;
  }
google.maps.event.addDomListener(window, 'load', initialize);