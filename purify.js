var purify = require('purify-css');

var content = ['/frontend/issueController3.js', '/issuedisplay3.html'];
var css = ['/frontend/display3.css'];

var options = {
  minify: true
};

purify(content, css, options, function (purifiedAndMinifiedResult) {
  console.log(purifiedAndMinifiedResult);
});