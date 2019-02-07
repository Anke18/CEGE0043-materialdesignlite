var userMarker;

function trackLocation() {
	if(navigator.geolocation){
		navigator.geolocation.watchPosition(showPosition);
		alert("Loading Current Location");
	}
	else {
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";}
}

function showPosition(position){
	if (userMarker){
		mymap.removeLayer(userMarker);
	}
    userMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup("You are here!").openPopup();
    mymap.locate({setView: true, maxZoom: 16});
	getDistance();
}

function getDistance() {
	//alert('getting distance');
	navigator.geolocation.getCurrentPosition(getDistanceFromPoint);
}

function getDistanceFromPoint(position) {
	var lat = 51.524479;
	var lng = -0.133894;
	var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat,lng, 'K');
	//document.getElementById('showDistance').innerHTML = "Distance: " + distance;
	if (distance < 0.1) {alert('You are close to UCL!');}
}

// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
	subAngle = subAngle * 180/Math.PI; // degrees - radians
	dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
	// radius of the earth - 3956 miles
	if (unit=="K") { dist = dist * 1.609344 ;} // miles to km
	if (unit=="N") { dist = dist * 0.8684 ;} // miles to nautical miles
	return dist;
}
