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
            values['user'] = USER; // this will be replaced by UserID when we get one (TODO)
            values['permission'] = 2; // this will be based on the UserID when we get one (TODO)
            values['departments'] = []; // this will be coded in later (TODO)
            values['status'] = 1; // all incidents start as unresolved
            console.log(values); // right here is where the server call would happen (TODO)
            make_api_post(values);
	        } else {
	        	values[this.name] = $(this).val();
	        }
	    });
	});

});

function make_api_post(values) {
	var success = false;
	var http = new XMLHttpRequest();
  var url = URL + '/incidents/new';
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function(request, response) {
    if (http.readyState == 4 && http.status == 200) { // OK, got response from server
     	success = true;
    }
  }
  http.send(values);
}

google.maps.event.addDomListener(window, "load", init);
