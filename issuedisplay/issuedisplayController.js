function compare(a,b) {
	if (parseInt(a.severity) < parseInt(b.severity))
	   return 1;
	else if (a.severity > b.severity)
	   return -1;
	else 
	   return 0;
}

var departments = ['Dining, Energy & Facilities',
                   'Environmental Health & Safety',
                   'Housing, Mail & Print', 
                   'Sustainability',
                   'Events Management',
                   'Sustainability',
                   'Transportation',
                   'Buildings and Facilities',
                   'Construction Support',
                   'Environmental Management',
                   'Laboratories',
                   'Training'];

var app = angular.module('incidentApp', ['ui.grid', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.grid.moveColumns']);

app.controller('incidentCtrl', function($scope, $http, uiGridConstants) {
	// commented out from first object: things I don't think I'll need but might
	var fromServer = [
		{
		 //"submitterid": 1,
		 "submitterfn": "Erica",
		 "submitterln": "Schwartz",
		 //"incidentid": 100,
		 "severity": 10, // change back from varchar
		 "description": "THERE ARE MOTHER FUCKING SNAKES ON THIS MOTHER FUCKING PLANE",
		 "departments": [0,5],
		 "incident types": [8,9],
		 "location": "Logan Airport", // later this will be more than one field for coords, google location id, etc.
		 "timestamp": "Tue Feb 09 2016 16:04:19 GMT-0500 (EST)",
		 "status": 1,
		 "permission": 1
		},
		{
		 //"submitterid": 2,
		 "submitterfn": "Norman",
		 "submitterln": "Young",
		 //"incidentid": 200,
		 "severity": 3,
		 "description": "My nose itches.",
		 "departments": [2,3],
		 "incident types": [1,7],
		 "location": "175 College Avenue",
		 "timestamp": "Tue Feb 09 2016 16:04:19 GMT-0500 (EST)",
		 "status": 1,
		 "permission": 1
		}
    ];

    // just to make the data look full, for now
    for (var i = 0; i < 40; i++) {
        fromServer.push({
         //"submitterid": 2,
         "submitterfn": "Norman",
         "submitterln": "Young",
         //"incidentid": 200,
         "severity": i / 4,
         "description": "My nose itches.",
         "departments": [1,4],
         "incident types": [6,2],
         "location": "175 College Avenue", // will this be coordinates? In what format?
         "timestamp": "Tue Feb 09 2016 16:04:19 GMT-0500 (EST)",
         "status": 2,
         "permission": 2
        });
    }

	fromServer.sort(compare);
    incidentData = []; 
    for (var i = 0; i < fromServer.length; i++) {
    	var status = fromServer[i]['status'];
    	var edit;
    	if (fromServer[i]['permission'] === 0) {
    		continue;
    	} else {
    		edit = fromServer[i]['permission'];
    	}
        var incidentdepts = "";
        var serverdepts = fromServer[i]['departments'];
        for (var j = 0; j < departments.length; j++) {
            for (var k = 0; k < serverdepts.length; k++) {
                if (j == serverdepts[k]) {
                    if (incidentdepts != "") {
                        incidentdepts += ", "
                    }
                    incidentdepts += departments[j];
                }
            }
        }
        var time = new Date(fromServer[i]['timestamp'])
    	incidentData.push({
    		"submitter": fromServer[i]['submitterln'] + ", " + fromServer[i]['submitterfn'],
    		"severity": parseInt(fromServer[i]['severity']),
    		"description": fromServer[i]['description'],
    		"departments": incidentdepts,
    		"location": fromServer[i]['location'],
            "time": parseInt(time.getTime()),
    		"edit": edit,
    		"status": status
    	});
    }

    $scope.gridOptions = { 
	  	enableRowSelection: true,
	  	enableRowHeaderSelection: false,
	  	rowHeight: 35,
        enableFiltering: true
	 };

    $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
        if( col.filters[0].term ){
            return 'header-filtered';
        } else {
            return '';
        }
    };
 
	$scope.gridOptions.columnDefs = [
	  { name: 'submitter', displayName:"Submitted By", headerCellClass: $scope.highlightFilteredHeader},
	  { name: 'severity', displayName:"Severity",
	  	cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
	  		var severity = grid.getCellValue(row,col);
	        	if (severity > 8) {
	          	return 'red';
	        	} else if (severity > 6) {
	        		return 'orange';
	        	}
	      }, headerCellClass: $scope.highlightFilteredHeader,
          filters: [
                {
                  condition: uiGridConstants.filter.GREATER_THAN,
                  placeholder: 'greater than'
                }
          ]
	   },
	  { name: 'description', displayName: "Description", headerCellClass: $scope.highlightFilteredHeader},
	  { name: 'departments', displayName: "Departments", headerCellClass: $scope.highlightFilteredHeader},
	  { name: 'location', displayName: "Location", headerCellClass: $scope.highlightFilteredHeader},
      { name: 'time', displayName: "Date and Time", headerCellClass: $scope.highlightFilteredHeader
      },
	  { name: 'edit', displayName: "View / Edit", headerCellClass: $scope.highlightFilteredHeader,
        filter: {
            type: uiGridConstants.filter.SELECT,
            selectOptions: [{ value: '1', label: 'View Only' }, { value: '2', label: 'View and Edit' }]
        },
        cellFilter: 'mapEdit'
      },
	  { name: 'status', displayName: "Status", headerCellClass: $scope.highlightFilteredHeader,
        filter: {
            type: uiGridConstants.filter.SELECT,
            selectOptions: [{ value: '1', label: 'Unresolved' }, { value: '2', label: 'In Progress' }, { value: '3', label: 'Resolved'}]
        },
        cellFilter: 'mapStatus'
      }
	];
	
	$scope.gridOptions.multiSelect = false;
	$scope.gridOptions.modifierKeysToMultiSelect = false;
	$scope.gridOptions.noUnselect = false;
    $scope.gridOptions.data = incidentData;


})

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



