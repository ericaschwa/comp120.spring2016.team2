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


/*var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}*/
