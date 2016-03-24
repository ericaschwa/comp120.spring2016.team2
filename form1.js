  

  //var AWS = require('aws-sdk');

  //var bucket = new AWS.S3({params: {Bucket: 'myBucket'}});

  var fileChooser = document.getElementById('file-chooser');
  var button = document.getElementById('submitbutton');
  var results = document.getElementById('results');
  button.addEventListener('click', function() {
    var file = fileChooser.files[0];
    console.log(file);
    if (file) {
      results.innerHTML = '';

      var params = {Key: file.name, ContentType: file.type, Body: file};
      bucket.upload(params, function (err, data) {

        results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
      });
    } else {
      results.innerHTML = 'Nothing to upload.';
    }
  }, false);
