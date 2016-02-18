$( document ).ready(function() {
	// adapted from http://seiyria.com/bootstrap-slider/
	jQuery.noConflict();
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
            	values['user_id'] = USER; // this will be replaced by UserID when we get one (TODO)
            	values['permission'] = 2; // this will be based on the UserID when we get one (TODO)
            	values['departments'] = []; // this will be coded in later (TODO)
            	values['status'] = 0; // all incidents start as unresolved
            	values['severity'] = parseInt(values['severity'])
            	$.ajax({
				  method: "POST",
				  url: URL + '/incidents/new',
				  data: values
				})
				.done(function(msg) {
				  console.log(msg);
				});
	        } else {
	        	values[this.name] = $(this).val();
	        }
	    });
	});
	document.getElementById('submitbutton').disabled = true;
});

var descriptionedit = function() {
	var desc = document.getElementById('description');
	if (desc.value == "") {
		document.getElementById('submitbutton').disabled = true;
	} else {
		document.getElementById('submitbutton').disabled = false;
	}
}

google.maps.event.addDomListener(window, "load", init);
