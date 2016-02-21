/*
 * issuedisplayController.js
 * used to control the table on the issues display page
 * comp120-s16-team2
 */



// used to sort arrays of structs that the server returns by severity
var compareseverity = function(a,b) {
  var aval = parseInt(a.severity);
  var bval = parseInt(b.severity);
  if (aval < bval)
     return 1;
  else if (bval < aval)
     return -1;
  else 
     return 0;
};
// used to sort arrays of structs that the server returns by status
var comparestatus = function(a,b) {
  var aval = parseInt(a.status);
  var bval = parseInt(b.status);
  if (aval < bval)
     return 1;
  else if (bval < aval)
     return -1;
  else 
     return 0;
};
// used to sort arrays of structs that the server returns by time
var comparetime = function(a,b) {
  var aval = new Date(a.time);
  var bval = new Date(b.time);
  if (aval < bval)
     return 1;
  else if (bval < aval)
     return -1;
  else 
     return 0;
};

// from http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
// converts date object to yyyy-mm-dd hh:min:sec (sortable) time format
var convertsortable = function(datetime) { 
      var yyyy = datetime.getFullYear().toString();
      var mm = (datetime.getMonth()+1).toString(); // getMonth() is zero-based
      var dd  = datetime.getDate().toString();
      var hh = datetime.getHours().toString();
      var min = datetime.getMinutes().toString();
      var sec = datetime.getSeconds().toString();
      return yyyy + "/" + (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0]) + " " + (hh[1]?hh:"0"+hh[0]) + ":" + (min[1]?min:"0"+min[0]) + ":" + (sec[1]?sec:"0"+sec[0]);
};

// from http://shebang.brandonmintern.com/foolproof-html-escaping-in-javascript/
function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

var setmodal;
var edit;
var sort;

var app = angular.module('incidentApp2', ['ui.grid', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.grid.moveColumns']);

app.controller('incidentCtrl2', function($scope, $http, $filter, uiGridConstants) {

  // make get request to access all incidents
  $scope.make_api_get = function() {
    var success = false;
    var http = new XMLHttpRequest();
    var url = URL + '/incidents';
    http.open("GET", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function(request, response) {
      if (http.readyState == 4 && http.status == 200) { // OK, got response from server
        success = true;
        fromServer = JSON.parse(http.responseText);
        show_resolved_incidents = false;
        document.getElementById('hideresolved').disabled = true;
        document.getElementById('showresolved').disabled = false;
        $scope.sort();
        $scope.setupData();
      }
    }
    http.send();
  }

  // make post request to edit a given incident
  $scope.make_api_post = function(value) {
    console.log(value);
    var j = jQuery.noConflict();
    j.ajax({
          method: "POST",
          url: URL + 'incidents/' + value['id'],
          data: value
    })
    .done(function(msg) {
          var newIncident = JSON.parse(msg);
          $scope.replaceat(value['id'], newIncident);
    });
  };

  // called when incident edited- replaces that incident with new, edited one
  $scope.replaceat = function(id, newIncident) {
    for (var i = 0; i < fromServer.length; i++) {
      if (fromServer[i]['id'] === id) {
        fromServer[i] = newIncident;
        $scope.sort();
        return;
      }
    }
  };

  // create array, incidentData, that will become the input to our table
  $scope.setupData = function() {
    $scope.makeincidentdata();
    $scope.data = incidentData;
    console.log(incidentData);
    $scope.maketable();
  };

  $scope.makeincidentdata = function() {
    incidentData = [];
    for (var i = 0; i < fromServer.length; i++) {
      // don't show incidents the user doesn't have permission to see
      var edit;
      if (fromServer[i]['permission'] === 0) {
        continue;
      } else if (fromServer[i]['permission'] === 1) {
        edit = "View Only";
      } else {
        edit = "View and Edit";
      }
      //don't show incidents that have been resolved
      var status = parseInt(fromServer[i]['status']) + 1;
      if (!show_resolved_incidents && status == 3) {
        continue;
      }
      // match department ID array to string list of departments
      var datetime = new Date(fromServer[i]['created_at']);
      incidentData.push({
        "submitter": fromServer[i]['submitterln'] + ", " + fromServer[i]['submitterfn'],
        "severity": parseInt(fromServer[i]['severity']) + 1,
        "description": fromServer[i]['description'],
        "departments": "", // TODO: make departments
        "location": fromServer[i]['location'],
        "time": convertsortable(datetime),
        "edit": edit,
        "status": status,
        "id": fromServer[i]['id']
      });
    }
  };

  $scope.maketable = function() {
    document.getElementById('chart').innerHTML = '<div class="row">'
    document.getElementById('chart').innerHTML += '<ul>';
    for (var i = 0; i < incidentData.length; i++) {
        var status = $scope.getstatus(i);
        var location = $scope.getlocation(i);
        var bordercolor = $scope.getbordercolor(i);
        var photo="incident.JPG"
        var text = '<li><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'
                 + '<div class="panel panel-default ' + bordercolor +'" onclick="setmodal(' + incidentData[i]['id'] + ')">'
                 + '<div class="row padall">'
                 + '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'
                 + '<div class="clearfix">';
        var j;
        for (j = 0; j < incidentData[i]['severity']; j++) {
           text += '<i class="black fa fa-exclamation-circle">&nbsp;</i>';
        }
        for (; j < 4; j++) {
           text += '<i class="gray fa fa-exclamation-circle">&nbsp;</i>';
        }
        text += '<br><span class="' + status + '">' + status + '</span> | ' + incidentData[i]['time'] + ' | ' + incidentData[i]['submitter']
              + '<div>Location: ' + location + '<br> Description: ' + incidentData[i]['description'] + '</div>'
              + '</div></div></div></div></div></li>';
        document.getElementById('chart').innerHTML += text;
    }
    document.getElementById('chart').innerHTML += '</ul></div>';
  };

  $scope.getstatus = function(i) {
      if (incidentData[i]['status'] === 1) {
        return 'Unresolved';
      } else if (incidentData[i]['status'] === 2) {
        return 'In Progress';
      } else {
        return 'Resolved';
      }
  };

  $scope.getlocation = function(i) {
      incidentData[i]['location'];
      if (location === null || location === "") {
        location = "";
      }
  }

  $scope.getbordercolor = function(i) {
      if (incidentData[i]['severity'] === 1) {
        return 'black';
      } else if (incidentData[i]['severity'] === 2) {
        return 'yellow';
      } else if (incidentData[i]['severity'] === 3) {
        return 'orange';
      } else {
        return 'red';
      }
  }

  $scope.sort = function() {
    var e = document.getElementById("sortby");
    var sort = e.options[e.selectedIndex].value;
    if (sort === "status") {
        fromServer.sort(comparestatus);
        $scope.setupData();
    } else if (sort === "time") {
        fromServer.sort(comparetime);
        $scope.setupData();
    } else {
        fromServer.sort(compareseverity);
        $scope.setupData();
    }
  };
  sort = $scope.sort;

  // show resolved incidents
  $scope.showResolved = function() {
      show_resolved_incidents = true;
      $scope.setupData();
      document.getElementById('showresolved').disabled = true;
      document.getElementById('hideresolved').disabled = false;
  };

    // show resolved incidents
  $scope.hideResolved = function() {
      show_resolved_incidents = false;
      $scope.setupData();
      document.getElementById('hideresolved').disabled = true;
      document.getElementById('showresolved').disabled = false;
  };

  // set data for modal
  setmodal = function(id) {
    var body = document.getElementById('modal-body');
    var data = "";
    for (var i = 0; i < incidentData.length; i++) {
      if (id === incidentData[i]['id']) {
        data = incidentData[i];
        break;
      }
    }
    if (data === "") {
      return;
    }
    modalid = id;
    permission = data['edit'];
    body.innerHTML = $scope.writemodal();
    var j =jQuery.noConflict(); 
    j('#myModal').modal('show'); 
    setTimeout(init, 1000); // needs slight delay
  };

  // writes body html of modal
  $scope.writemodal = function() {
    var str = "";
    str += "<span class='title'>Severity</span> (1 = Minor Incident, 4 = Emergency)</span>: " +
           '<select id="severity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select>' +
           '<br>'
    str += "<span class='title'>Status</span>: " +
           '<select id="status"><option value="1">Unresolved</option><option value="2">In Progress</option><option value="3">Resolved</option></select>' +
           '<br></div><br>';
    str += "<input class='formedit controls' name='location' id='pac-input' type='text' value='" + data.location + "' />" +
           "<div id='map'></div><br>";
    str += "<span class='title'>Description</span>: " + "<input class='formedit' name='description' id='description' type='text' value='" + data.description + "' />" + "<br>";
    var status;
    if (data.status == 0) {
      status = "Unresolved";
    } else if (data.status == 1) {
      status = "In Progress";
    } else {
      status = "Resolved";
    }
    str += "<span class='title'>Time</span>: " + "<input class='formedit' id='time' name='time' type='text' value='" + data.time + "' />" + "<br>";
    str += "<span class='title'>Submitter</span>: " + "<input class='formedit' id='submitter' name='submitter' type='text' value='" + data.submitter + "' />" + "<br>";
    str += "<span class='title'>Departments</span>: " + "<input class='formedit' id='departments' name='departments' type='text' value='" + data.departments + "' />" + "<br>";
    str += "<button type='button' class='btn btn-primary' onclick='edit()' data-dismiss='modal'>Save</button>";
    return str;
  }

  // edit an incident
  $scope.edit = function() {
    var obj = {
      'description': escapeHtml(document.getElementById('description').value),
      'location': escapeHtml(document.getElementById('pac-input').value),
      'severity': escapeHtml(document.getElementById('severity').value),
      'status': escapeHtml(document.getElementById('status').value),
      'time': escapeHtml(new Date(document.getElementById('time').value)),
      'submitter': escapeHtml(document.getElementById('submitter').value),
      'departments': escapeHtml(document.getElementById('departments').value),
      'permission': permission,
      'id': modalid
    };
    $scope.make_api_post(obj);
  };

  edit = $scope.edit;
  $scope.make_api_get();
});





