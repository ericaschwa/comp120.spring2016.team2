/*
 * issuedisplayController.js
 * used to control the table on the issues display page
 * comp120-s16-team2
 */

// used to sort arrays of structs that the server returns by severity
function compare(a,b) {
	if (parseInt(a.severity) < parseInt(b.severity))
	   return 1;
	else if (a.severity > b.severity)
	   return -1;
	else 
	   return 0;
}

// from http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
// converts date object to yyyy-mm-dd hh:min:sec (sortable) time format
var convertsortable = function(datetime) { 
      var yyyy = datetime.getFullYear().toString();
      var mm = (datetime.getMonth()+1).toString(); // getMonth() is zero-based
      var dd  = datetime.getDate().toString();
      var hh = datetime.getHours().toString();
      var min = datetime.getMinutes().toString();
      var sec = datetime.getSeconds().toString();
      return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]) + " " + (hh[1]?hh:"0"+hh[0]) + ":" + (min[1]?min:"0"+min[0]) + ":" + (sec[1]?sec:"0"+sec[0]);
};

var setmodal;
var edit;
var fromServer;

var app = angular.module('incidentApp', ['ui.grid', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.grid.moveColumns']);

app.controller('incidentCtrl', function($scope, $http, uiGridConstants) {

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
        $scope.setupData();
      }
    }
    http.send();
  }

  $scope.make_api_post = function(values) {
    var success = false;
    var http = new XMLHttpRequest();
    var url = URL + '/incidents/new';
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) { // OK, got response from server
        success = true;
      }
    }
    http.send(values);
  }

  // create array, incidentData, that will become the input to our table
  $scope.setupData = function() {
    fromServer.sort(compare);

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
      var status = fromServer[i]['status'] + 1;
      if (!show_resolved_incidents && status == 3) {
        continue;
      }
      // match department ID array to string list of departments
      var incidentdepts = "";
      var datetime = new Date(fromServer[i]['created_at']);
      incidentData.push({
        "submitter": fromServer[i]['submitterln'] + ", " + fromServer[i]['submitterfn'],
        "severity": parseInt(fromServer[i]['severity']),
        "description": fromServer[i]['description'],
        "departments": incidentdepts,
        "location": fromServer[i]['location'],
        "time": convertsortable(datetime),
        "edit": edit,
        "status": status
      });
    }
    $scope.gridOptions.data = incidentData;
  }

  // optional features that we add to this table
  $scope.gridOptions = { 
	  	enableRowSelection: true,
	  	enableRowHeaderSelection: false,
	  	rowHeight: 60,
      enableFiltering: true,
      multiSelect: false,
      modifierKeysToMultiSelect: false,
      noUnselect: false
	};

  // highlights headers of columns by which we have filtered
  $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
      if( col.filters[0].term ){
          return 'header-filtered';
      } else {
          return '';
      }
  };

  // show resolved incidents
  $scope.showResolved = function() {
      show_resolved_incidents = true;
      $scope.make_api_get();
      document.getElementById('showresolved').disabled = true;
      document.getElementById('hideresolved').disabled = false;
  }

    // show resolved incidents
  $scope.hideResolved = function() {
      show_resolved_incidents = false;
      $scope.make_api_get();
      document.getElementById('hideresolved').disabled = true;
      document.getElementById('showresolved').disabled = false;
  }

  $scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope
      $scope.gridApi = gridApi;
  };

  // set data for modal
  setmodal = function(arg) {
    var data = JSON.parse(arg.id);
    var heading = document.getElementById('modal-title');
    var body = document.getElementById('modal-body');
    if(data.edit === "View Only") {
      setmodalVIEW(heading,body,data);
    } else {
      setmodalEDIT(heading,body,data);
    }
  }

  setmodalVIEW = function(heading, body, data) {
    heading.innerHTML = "View Incident";
    body.innerHTML = "";
    body.innerHTML += "<p><span class='title'>Incident Description</span>: " + data.description + "</p>";
    body.innerHTML += "<p><span class='title'>Incident Location</span>: " + data.location + "</p>";
    body.innerHTML += "<p><span class='title'>Incident Severity</span>: " + data.severity + "</p>";
    var status;
    if (data.status == 0) {
      status = "Unresolved";
    } else if (data.status == 1) {
      status = "In Progress";
    } else {
      status = "Resolved";
    }
    body.innerHTML += "<p><span class='title'>Incident Status</span>: " + status + "</p>";
    body.innerHTML += "<p><span class='title'>Incident Time</span>: " + data.time + "</p>";
    body.innerHTML += "<p><span class='title'>Incident Submitter</span>: " + data.submitter + "</p>";
    body.innerHTML += "<p><span class='title'>Relevant Departments</span>: " + data.departments + "</p>";
  }

  setmodalEDIT = function(heading, body, data) {
    permission = data.edit;
    heading.innerHTML = "Edit Incident";
    body.innerHTML = "";
    body.innerHTML += "<span class='title'>Severity</span> (1 = Minor Incident, 4 = Emergency)</span>: " +
                      '<select id="severity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select>' +
                      '<br>'
    body.innerHTML += "<span class='title'>Status</span>: " +
                      '<select id="status"><option value="1">Unresolved</option><option value="2">In Progress</option><option value="3">Resolved</option></select>' +
                      '<br>'+
                    '</div><br>';
    body.innerHTML += "<input class='formedit controls' name='location' id='pac-input' type='text' value='" + data.location + "' />" +
                      "<div id='map'></div>" +
                      "<br>";
    body.innerHTML += "<span class='title'>Description</span>: " + "<input class='formedit' name='description' id='description' type='text' value='" + data.description + "' />" + "<br>";
        var status;
    if (data.status == 0) {
      status = "Unresolved";
    } else if (data.status == 1) {
      status = "In Progress";
    } else {
      status = "Resolved";
    }
    body.innerHTML += "<span class='title'>Time</span>: " + "<input class='formedit' id='time' name='time' type='text' value='" + data.time + "' />" + "<br>";
    body.innerHTML += "<span class='title'>Submitter</span>: " + "<input class='formedit' id='submitter' name='submitter' type='text' value='" + data.submitter + "' />" + "<br>";
    body.innerHTML += "<span class='title'>Departments</span>: " + "<input class='formedit' id='departments' name='departments' type='text' value='" + data.departments + "' />" + "<br>";
    body.innerHTML += "<button type='button' class='btn btn-primary' onclick='edit()' data-dismiss='modal'>Save</button>";
    setTimeout(init, 1000); // needs slight delay
  };

  // edit an incident
  $scope.edit = function() {
    var obj = {
      'description': document.getElementById('description').value,
      'location': document.getElementById('pac-input').value,
      'severity': document.getElementById('severity').value,
      'status': document.getElementById('status').value,
      'time': new Date(document.getElementById('time').value),
      'submitter': document.getElementById('submitter').value,
      'departments': document.getElementById('departments').value,
      'permission': permission
    };
    $scope.make_api_post(obj);
  };

  edit = $scope.edit;
 
  // defining the formatting etc. for each column in the table
  $scope.gridOptions.columnDefs = [
    { name: 'submitter', displayName:"Submitted By", headerCellClass: $scope.highlightFilteredHeader},
    { name: 'severity', displayName:"Severity", headerCellClass: $scope.highlightFilteredHeader,
      cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) { // color-codes severity column
        var severity = grid.getCellValue(row,col);
        if (severity > 3) {
          return 'red';
        } else if (severity > 2) {
          return 'orange';
        }
      }, filters: [{condition: uiGridConstants.filter.GREATER_THAN, placeholder: 'greater than'}]
    },
    { name: 'description', displayName: "Description", headerCellClass: $scope.highlightFilteredHeader},
    //{ name: 'departments', displayName: "Departments", headerCellClass: $scope.highlightFilteredHeader},
    { name: 'location', displayName: "Location", headerCellClass: $scope.highlightFilteredHeader},
    { name: 'time', displayName: "Date and Time", headerCellClass: $scope.highlightFilteredHeader,
      filters: [{placeholder: 'yyyy-mm-dd hh:min:sec'}]
    },
    { name: 'edit', displayName: "View / Edit", headerCellClass: $scope.highlightFilteredHeader,
      filter: {type: uiGridConstants.filter.SELECT, selectOptions: [{ value: 'View Only', label: 'View Only' }, { value: 'View and Edit', label: 'View and Edit' }]},
      cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a data-toggle="modal" data-target="#myModal" onmousedown="setmodal(this)" id="{{row.entity}}">{{COL_FIELD}}</a></div>'
    },
    { name: 'status', displayName: "Status", headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'mapStatus',
      filter: {type: uiGridConstants.filter.SELECT, selectOptions: [{ value: '1', label: 'Unresolved' }, { value: '2', label: 'In Progress' }, { value: '3', label: 'Resolved'}]}
    }
  ];
  
  $scope.hideResolved();
})

// for table's view/edit dropdown filter
.filter('mapEdit', function() {
      var editHash = {
        1: 'View Only',
        2: 'View and Edit'
      };
     
      return function(input) {
        if (!input){
          return '';
        } else {
          return editHash[input];
        }
    };
})

// for table's status dropdown filter
.filter('mapStatus', function() {
      var statusHash = {
        1: 'Unresolved',
        2: 'In Progress',
        3: 'Resolved'
      };
     
      return function(input) {
        if (!input){
          return '';
        } else {
          return statusHash[input];
        }
    };
});





