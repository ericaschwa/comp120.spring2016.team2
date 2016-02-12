
$( document ).ready(function() {
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
