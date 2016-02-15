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
	        	values['time'] = new Date();
            values['submitter'] = 'Anonymous'; // this will be replaced by UserID when we get one (TODO)
            values['permission'] = 2; // this will be based on the UserID when we get one (TODO)
            values['departments'] = []; // this will be coded in later (TODO)
            values['status'] = 1; // all incidents start as unresolved
            console.log(values); // right here is where the server call would happen (TODO)
	        } else {
	        	values[this.name] = $(this).val();
	        }
	    });
	});

});

google.maps.event.addDomListener(window, "load", init);
