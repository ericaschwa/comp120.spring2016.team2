
$( "form" ).submit(function( event ) {
	event.preventDefault();
	console.log("I am here"); 
    var e = document.getElementById("login-username").value;
   	
   	window.location.replace("issuedisplay3.html");
});



 


