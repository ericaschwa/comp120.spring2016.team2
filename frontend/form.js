/*
 * form.js
 * used to control the form page
 * comp120-s16-team2
 */


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
	document.getElementById('datetimepicker').defaultValue = new Date();
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


