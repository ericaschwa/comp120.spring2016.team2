$( document ).ready(function() {
/*	$(function() {
		$("#map_canvas").googleMap();
	});*/
	// adapted from http://seiyria.com/bootstrap-slider/
	$("#severity").slider({
	    formatter: function(value) {
	        return 'Current value: ' + value;
	    }
	});
	// from http://stackoverflow.com/questions/169506/obtain-form-input-fields-using-jquery
	$( "#form" ).on( "submit", function( event ) {
	 	event.preventDefault();
	    var $inputs = $('#form :input');
	    var values = {};
	    $inputs.each(function() {
	        if (this.name === "") {
	        	console.log(values);
	        } else {
	        	values[this.name] = $(this).val();
	        }
	    });
	});

});

(function() {
   window.onload = function(){
   var latlng = new google.maps.LatLng(35.9886, -78.9072);
   var options = {
      zoom: 13,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
        }; 
  var map = new google.maps.Map(document.getElementById('map'), options);
        }
    })();

//Google Maps JavaScript

/*var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}*/

/*
var myName = "AnitaHolleman";
var currLat;
var currLng;
var request = new XMLHttpRequest;
var params;
var data;
var current;
var map;
var mymarker;
var infowindow = new google.maps.InfoWindow();
var mapOptions = {
	center: current,
	zoom: 15,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

function init() {
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	render();
}

function render() {
	//find location
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			currLat = position.coords.latitude;
			currLng = position.coords.longitude;
			manageData();
			render();
		});
	}
	else {
		alert("ERROR: Geolocation not supported");
	}
	//manage data
	params = "login=" + myName + "&lat=" + currLat + "&lng=" + currLng;
					request.open("POST", "https://sleepy-reaches-1354.herokuapp.com/sendLocation", true);
					request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					request.onreadystatechange = parseData;
					request.send(params);	
	//render
	current = new google.maps.LatLng(currLat, currLng);
	map.panTo(current);
	myMarker = new google.maps.Marker({
		position: current,
		animation: google.maps.Animation.DROP,
	});
	myMarker.setMap(map);
	google.maps.event.addListener(myMarker, "click", function() {
		infowindow.close();
		infowindow.setContent("<div id='login'>" + myMarker.title + "</div>");
		infowindow.open(map, this);
	});
}

function parseData()
			{
				// request is ready and status code is successful
				if (request.readyState == 4 && request.status == 200) {
					data = JSON.parse(request.responseText);
					for (i = 0; i < data.length; i++) {
						if (data[i].login == myName) continue;
						person.name = data[i].login;
						person.Lat = data[i].lat;
						person.Lng = data[i].lng;
						createMarker(person);
					}
				}
			} */
