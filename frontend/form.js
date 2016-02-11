
$( document ).ready(function() {
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