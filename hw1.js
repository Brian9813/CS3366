// JavaScript source code
'use strict';
//module
var app = angular.module("myApp", []);


//controllers
app.controller('ctrl1', function($scope)
{
	//create floor list
	mkFlrLst();

	//scope vars
	$scope.selectedFloors = [];
	$scope.disableScreen = false;
	$scope.hideUp = false;
	$scope.hideLow = false;


	//scope functions 
	$scope.makeFloorList = mkFlrLst;
	$scope.addFloor = addFloor;
	$scope.removeFloor = removeFloor;
	$scope.addLobby = addLobby;
	$scope.remLobby = remLobby;
	$scope.emergency = emergency;
	$scope.resetElevator = resetElevator;
	$scope.lowerFloor = lowerFloor;
	$scope.upperFloor = upperFloor;


	//local functions
	function updateChecked()
	{
		$scope.selectedFloors = [];
		var currRay = [];
		for(var j = 0; j < $scope.allFloors.length; j++)
		{
			currRay = $scope.allFloors[j];
			for(var i = 0; i < currRay.length; i++)
			{
				if(currRay[i].left.checked == true)
				{
					$scope.selectedFloors.push(currRay[i].left.floor);
				}
				if(currRay[i].right.checked == true)
				{
					$scope.selectedFloors.push(currRay[i].right.floor);
				}
			}
			currRay = [];
		}
		if($scope.lobbySelected)
		{
			addLobby();
		}
	}

	//scope functions
	function mkFlrLst()
	{
		$scope.topRange = 25;
		$scope.floorLst = [];
		$scope.allFloors = [];
		var row = 0;
		var ranges = [[-1, -23], [25, 2], [48, 26]];
		for(var x = 0; x < 3; x++)
		{
			for (var i = ranges[x][1]; i < ranges[x][0]; i+=2)
			{
				$scope.floorLst.push({left:{row: row,floor:i, checked:false}, right:{row: row,floor:i+1, checked:false}});
				row++;
			}
			if (ranges[x][0] % 2 != 1)
			{
				$scope.floorLst.push({left:{row: row,floor:i, checked:false}, right:{row: null,floor:null, checked:null}});
			}
			if ($scope.floorLst[$scope.floorLst.length-1].left.floor == 0)
			{
				$scope.floorLst.pop();
			}
			$scope.allFloors.push($scope.floorLst);
			$scope.floorLst = [];
		}
		$scope.currentFloor = 1;
		$scope.floorLst = $scope.allFloors[$scope.currentFloor];
		return;
	}

	function upperFloor()
	{
		$scope.currentFloor += 1;
		$scope.floorLst = $scope.allFloors[$scope.currentFloor];
		if($scope.currentFloor == $scope.allFloors.length-1)
		{
			$scope.hideUp = true;
		}
		if($scope.currentFloor > 0)
		{
			$scope.hideLow = false;
		}
	}
	function lowerFloor()
	{
		$scope.currentFloor -= 1;
		$scope.floorLst = $scope.allFloors[$scope.currentFloor];
		if($scope.currentFloor == 0)
		{
			$scope.hideLow = true;
		}
		if($scope.currentFloor < $scope.allFloors.length-1)
		{
			$scope.hideUp = false;
		}
	}
	function addFloor(row, floor)
	{
		for(var i = 0; i < $scope.floorLst.length; i ++)
		{
			if($scope.floorLst[i].left.row == row)
			{
				if($scope.floorLst[i].left.floor == floor)
				{
					$scope.floorLst[i].left.checked = true;
					updateChecked();
					return;
				}
				else
				{
					$scope.floorLst[i].right.checked = true;
					updateChecked();
					return;
				}
			}
		}
	}
	function removeFloor(row, floor)
	{
		for(var i = 0; i < $scope.floorLst.length; i ++)
		{
			if($scope.floorLst[i].left.row == row)
			{
				if($scope.floorLst[i].left.floor == floor)
				{
					$scope.floorLst[i].left.checked = false;
					updateChecked();
					return;
				}
				else
				{
					$scope.floorLst[i].right.checked = false;
					updateChecked();
					return;
				}
			}
		}
	}
	function addLobby()
	{
		var i = 0;
		while($scope.selectedFloors[i] < 0)
		{
			//do nothing
			i++;
		}
		$scope.selectedFloors.splice(i, 0, "Lobby");
		$scope.lobbySelected = true;
	}
	function remLobby()
	{
		var i = 0;
		while($scope.selectedFloors[i] != "Lobby")
		{
			//do nothing
			i++;
		}
		$scope.selectedFloors.splice(i, 1);
		$scope.lobbySelected = false;
	}
	function emergency()
	{
		window.alert("Emergency!!\nAuthorities have been alerted");
		$scope.disableScreen = true;
	}
	function resetElevator()
	{
		if($scope.resetCode === "1234")
		{
			$scope.disableScreen = false;
			$scope.resetCode = '';
		}
	}
});








//filters

app.filter('selectedFloors', function()
{
	return function(x)
	{
		
		if(x.length == 0)
		{
			return "No Floors Selected";
		}
		else
		{
			var out = '';
			for(var i = 0; i < x.length; i++)
			{
				out += x[i] + ', ';
			}
			return out.substring(0, out.length-2);
		}
	}
});