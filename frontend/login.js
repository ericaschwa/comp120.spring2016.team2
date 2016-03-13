
URL = 'http://api.dirt.frontfish.net';

$( document ).ready(function() {
	// from http://stackoverflow.com/questions/169506/obtain-form-input-fields-using-jquery
	$( "#form" ).on( "submit", function( event ) {
	 	event.preventDefault();
	    var $inputs = $('#form :input');
	    var values = {};
	    $inputs.each(function() {
	        if (this.name != "") {
	        	
            	values['User_name'] = login-username; // this will be replaced by UserID when we get one (TODO)
            	values['password'] = ; // this will be based on the UserID when we get one (TODO)
            	
    			
            	/*$.ajax({
				  method: "POST",
				  url: URL + '/users/new',
				  data: values
				})*/

				$.done(function(msg) {
				  console.log(msg);
				  window.location = 'issuedisplay3.html'
				});
	        } else {

	        	values[this.name] = escapeHtml($(this).val());
	        }
	    });
	});
	
	document.getElementById('submitbutton').disabled = false;
});

// from http://shebang.brandonmintern.com/foolproof-html-escaping-in-javascript/
function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};



