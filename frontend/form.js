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

//Google Maps JavaScript
function init() {
   	var latlng = new google.maps.LatLng(35.9886, -78.9072);
   	var options = {
      	zoom: 13,
      	center: latlng,
      	mapTypeId: google.maps.MapTypeId.ROADMAP
    }; 
  	var map = new google.maps.Map(document.getElementById('map'), options);

  	//searchbox
  	var input = document.getElementById('pac-input');
  	var searchBox = new google.maps.places.SearchBox(input);
  	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
}
google.maps.event.addDomListener(window, "load", init);
