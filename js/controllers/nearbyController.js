angular.module('fsf.NearbyController', ['fsf.NearbyMapService'])
.controller('NearbyController', 
	function($scope, $state, $stateParams, $http, $q){
       	var mapStyles = $http.get("js/map.json"),
		    data = $http.get("js/data.json");
		
		$q.all([mapStyles, data]).then(function(res) { 
      		this.mapStyles = res[0].data;
      		this.data = res[1].data;
      		init();   
		});

		function init() {
            var mapOptions = {
                zoom: 14,
                center: new google.maps.LatLng(40.700066, -73.912039),
                // center: new google.maps.LatLng(userLat, userLng),
                styles: this.mapStyles
            };
            var mapElement = document.getElementById('activity-map');
            var map = new google.maps.Map(mapElement, mapOptions);
            
            var data = this.data;

            var addPoints = function(from, to, img) {
                var transactionCoordinates = [
                    new google.maps.LatLng(from.lat, from.lng),
                    new google.maps.LatLng(to.lat, to.lng)
                	];

                var path = new google.maps.Polyline({
                    path: transactionCoordinates,
                    geodesic: true,
                    strokeColor: '#FF0453',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                path.setMap(map);

                var fromMarker = new google.maps.Marker({
                    position:  new google.maps.LatLng(from.lat, from.lng),
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      strokeColor: '#FF0453',
                      strokeOpacity: 1,
                      strokeWeight: 2,
                      fillColor: '#ffffff',
                      fillOpacity: 1,
                      scale: 10
                    },
                    draggable: false,
                    map: map
                });

                var toMarker = new google.maps.Marker({
                    position:  new google.maps.LatLng(to.lat, to.lng),
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      strokeColor: '#FF0453',
                      strokeOpacity: 1,
                      strokeWeight: 2,
                      fillColor: '#FF0453',
                      fillOpacity: 1,
                      scale: 10
                    },
                    draggable: false,
                    map: map,
                    title: 'Received'
                });

                var infowindow = new google.maps.InfoWindow({
                    content: '<img src="'+img+'">'
                });

                google.maps.event.addListener(toMarker, 'click', function() {
                  infowindow.open(map,toMarker);
                });
            }
            
            for (var i = 0; i < data.length; i++) {
                addPoints(data[i].from, data[i].to, data[i].thumb)
            }

            if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(function (position) {
                   initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                   map.setCenter(initialLocation);
               });
            }
        };
})