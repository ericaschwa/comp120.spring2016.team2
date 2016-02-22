/*
 * issuedisplayController.js
 * used to control the table on the issues display page
 * comp120-s16-team2
 */

// used to sort arrays of structs that the server returns by severity
var compareseverity = function(a,b) {
  var aval = parseInt(a.severity);
  var bval = parseInt(b.severity);
  console.log(aval,bval);
  if (aval >= bval) {
    return 0;
  } else {
    return 1;
  }
};

// used to sort arrays of structs that the server returns by status
var comparestatus = function(a,b) {
  var aval = parseInt(a.status);
  var bval = parseInt(b.status);
  console.log(aval,bval);
  if (bval >= aval) {
    return 0;
  } else {
    return 1;
  }
};
// used to sort arrays of structs that the server returns by time
var comparetime = function(a,b) {
  var aval = new Date(a.created_at);
  var bval = new Date(b.created_at);
  console.log(aval,bval);
  if (aval >= bval) {
    return 0;
  } else {
    return 1;
  }
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


// following 5 functions from http://en.literateprograms.org/Merge_sort_%28JavaScript%29
function msort(array, begin, end, comp)
{
  var size=end-begin;
  if(size<2) return;

  var begin_right=begin+Math.floor(size/2);

  msort(array, begin, begin_right, comp);
  msort(array, begin_right, end, comp);
  merge(array, begin, begin_right, end, comp);
}
function merge_sort(array, comp)
{
  msort(array, 0, array.length, comp);
}
function merge(array, begin, begin_right, end, comp)
{
  for(;begin<begin_right; ++begin) {
    if(comp(array[begin],array[begin_right])) {
      var v=array[begin];
      array[begin]=array[begin_right];
      insert(array, begin_right, end, v, comp);
    }
  }
}
Array.prototype.swap=function(a, b)
{
  var tmp=this[a];
  this[a]=this[b];
  this[b]=tmp;
}
function insert(array, begin, end, v, comp)
{
  while(begin+1<end && comp(v, array[begin+1])) {
    array.swap(begin, begin+1);
    ++begin;
  }
  array[begin]=v;
}


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
      }
    }
    http.send();
  }

  // make post request to edit a given incident
  $scope.make_api_post = function(value) {
    var j = jQuery.noConflict();
    j.ajax({
          method: "POST",
          url: URL + 'incidents/' + value['id'],
          data: value
    })
    .done(function(msg) {
          console.log(msg);
          $scope.replaceat(value['id'], msg);
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
    var str = document.getElementById('filterby').value;
    $scope.filterincidentdata(str.toLowerCase());
    $scope.maketable();
  };

  $scope.filterincidentdata = function(str) {
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
      var incident = {
        "submitter": fromServer[i]['submitterln'] + ", " + fromServer[i]['submitterfn'],
        "severity": parseInt(fromServer[i]['severity']) + 1,
        "description": fromServer[i]['description'],
        "departments": "", // TODO: make departments
        "location": fromServer[i]['location'],
        "time": convertsortable(datetime),
        "edit": edit,
        "status": status,
        "id": fromServer[i]['id']
      };
      if (searchsubstr(incident, str)) {
        incidentData.push(incident);
      }
    }
  }

  function searchsubstr(incident,str) {
      if (incident['submitter']) {
        if (incident['submitter'].toLowerCase().includes(str)) {
          return true;
        }
      }
      if (incident['description']) {
        if (incident['description'].toLowerCase().includes(str)) {
          return true;
        }
      }
      if (incident['departments']) {
        if (incident['departments'].toLowerCase().includes(str)) {
          return true;
        }
      }
      if (incident['location']) {
        if (incident['location'].toLowerCase().includes(str)) {
          return true;
        }
      }
      if (incident['time']) {
        if (incident['time'].toLowerCase().includes(str)) {
          return true;
        }
      }
      if (incident['id']) {
        if (String(incident['id']).includes(str)) {
          return true;
        }
      }
    return false;
  }

  $scope.maketable = function() {
    document.getElementById('chart').innerHTML = '<div class="row">'
    document.getElementById('chart').innerHTML += '<ul>';
    for (var i = 0; i < incidentData.length; i++) {
        var status = $scope.getstatus(i);
        var location = $scope.getlocation(i);
        var bordercolor = $scope.getbordercolor(i);
        var photo="incident.JPG"
        var text = '<li><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'
                 + '<div class="panel panel-default ' + bordercolor +'border" onclick="setmodal(' + incidentData[i]['id'] + ')">'
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
      var location = incidentData[i]['location'];
      if (location === null || location === "") {
        return "";
      } else {
        return location;
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

  // sorts by various values
  $scope.sort = function() {
    var e = document.getElementById("sortby");
    var sort = e.options[e.selectedIndex].value;
    if (sort === "status") {
        merge_sort(fromServer,comparestatus);
    } else if (sort === "time") {
        merge_sort(fromServer,comparetime);
    } else {
        merge_sort(fromServer,compareseverity);
    }
    $scope.setupData();
  };
  sort = $scope.sort;

  // show resolved incidents
  $scope.showResolved = function() {
      show_resolved_incidents = true;
      $scope.sort();
      document.getElementById('showresolved').disabled = true;
      document.getElementById('hideresolved').disabled = false;
  };

    // show resolved incidents
  $scope.hideResolved = function() {
      show_resolved_incidents = false;
      $scope.sort();
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
    body.innerHTML = $scope.writemodal(data);
    var j =jQuery.noConflict(); 
    j('#myModal').modal('show'); 
    document.getElementById('severity').value = data.severity;
    setTimeout(init, 1000); // needs slight delay
  };

  // writes body html of modal
  $scope.writemodal = function(data) {
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
      'severity': parseInt(document.getElementById('severity').value) - 1,
      'status': parseInt(document.getElementById('status').value) - 1,
      'time': new Date(document.getElementById('time').value),
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





