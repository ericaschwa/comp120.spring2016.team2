/*
 * form.js
 * used to control the form page
 * comp120-s16-team2
 */


/**************************   constants.js   ***********************************/

URL = 'http://api.dirt.frontfish.net';
USER = 1;

/****************************   maps.js   **************************************/


 //Google Maps JavaScript
function init() {
  var initialLocation = new google.maps.LatLng(35.9886, -78.9072);
  var options = {
    zoom: 13,
    center: initialLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }; 
  var map = new google.maps.Map(document.getElementById('map'), options);

  
  //searchbox: code adapted from https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  

  //Geolocation attempt
  var browserSupportFlag = new Boolean;
  if (navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position)
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(initialLocation);
    });
  }

  var marker = new google.maps.Marker({
    position: initialLocation,
    map: map,
  });

  // //Geolocation not supported by browser
  // else {
  //   browserSupportFlag = false;
  //   handleNoGeolocation(browserSupportFlag);
  // }

  // function handleNoGeolocation(errorFlag) {
  //   if (errorFlag == true) {
  //     alert("Geolocation service failed.");
  //   } else {
  //     alert("Your browser doesn't support geolocation.")
  //   }
  //   map.setCenter(initialLocation);
  // }
}


/**************************   form.js   ***********************************/


$( document ).ready(function() {
	// from http://stackoverflow.com/questions/169506/obtain-form-input-fields-using-jquery
	$( "#form" ).on( "submit", function( event ) {
	 	event.preventDefault();
	    var $inputs = $('#form :input');
	    var values = {};
	    $inputs.each(function() {
	        if (this.name === "") {
	        	values['time'] = new Date();
            	values['user_id'] = USER; // this will be replaced by UserID when we get one (TODO)
            	values['permission'] = 2; // this will be based on the UserID when we get one (TODO)
            	values['departments'] = []; // this will be coded in later (TODO)
            	values['status'] = 0; // all incidents start as unresolved
            	var e = document.getElementById("severity");
    			var severity = e.options[e.selectedIndex].value;
            	values['severity'] = parseInt(severity) - 1;
            	console.log(values);
            	$.ajax({
				  method: "POST",
				  url: URL + '/incidents/new',
				  data: values
				})
				.done(function(msg) {
				  console.log(msg);
				  window.location = 'issuedisplay.html'
				});
	        } else {
	        	values[this.name] = escapeHtml($(this).val());
	        }
	    });
	});
	$( "#datetimepicker" ).datetimepicker({value: new Date()});
	document.getElementById('submitbutton').disabled = true;
});

// from http://shebang.brandonmintern.com/foolproof-html-escaping-in-javascript/
function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

// activates "submit" button only when description contains text
var descriptionedit = function() {
	var desc = document.getElementById('description');
	if (desc.value == "") {
		document.getElementById('submitbutton').disabled = true;
	} else {
		document.getElementById('submitbutton').disabled = false;
	}
}

// load map on page init
google.maps.event.addDomListener(window, "load", init);

function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
  }


