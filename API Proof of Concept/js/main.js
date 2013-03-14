
window.onload = function() {
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    		var bLat = 42.3583;
    		var bLong = -71.0603;
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var coords = new google.maps.LatLng(latitude, longitude);
            var mapOptions = {
            	zoom: 15,
            	center: coords,
            	mapTypeControl: true,
            	navigationControlOptions: {
        			style: google.maps.NavigationControlStyle.SMALL
        		},
        		 mapTypeId: google.maps.MapTypeId.ROADMAP
    			};
    			map = new google.maps.Map(
    				document.getElementById("mapContainer"), mapOptions
    				);
    			var marker = new google.maps.Marker({
                		position: coords,
               			map: map,
                		title: "Your current location!"
                });
            navigator.geolocation.watchPosition(function(position) {
            document.getElementById("distance").innerHTML =
              getDistance(bLat, bLong, latitude, longitude) + " mi";
          });
        });
        	
} else {
    alert("Geolocation API is not supported in your browser.");
}

};
function getDistance(lat1, lon1, lat2, lon2) {
  var R = 3963; 
  var dLat = (lat2 - lat1).toRad();
  var dLon = (lon2 - lon1).toRad(); 
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  var d = R * c;
  return Math.round(d);
}
Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}