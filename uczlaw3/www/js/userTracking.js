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
}