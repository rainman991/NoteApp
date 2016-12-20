	var myApp = angular.module('NoteApp', ["firebase"]);

	myApp.controller('NoteCtrl', ['$scope','$firebaseArray' , function($scope, $firebaseArray) {
	    var myNoteLists = new Firebase('https://notes-f7ca1.firebaseio.com/');
	    $scope.NoteLists = $firebaseArray(myNoteLists);
	    
	    $scope.addNoteSubmit = function (){
	        $scope.NoteLists.$add({
	            memo: $scope.memo,
	        })
	        $scope.memo='';
	    };

	    $scope.NoteEdit = function (NoteList){
	        var id = NoteList.$id;
	        var record = $scope.NoteLists.$getRecord(id);
	        $scope.memo= NoteList.memo;
	        $scope.NoteEdit= disable;
        	NoteList.memo = $scope.memo;
        	record.memo = NoteList.memo;
	    };

	    $scope.NoteDel = function (NoteList){
	        $scope.NoteLists.$remove(NoteList);
	    };
		
	    $scope.NoteSave = function (NoteList){
	        var id = NoteList.$id;
	        var record = $scope.NoteLists.$getRecord(id);
	        record.memo = NoteList.memo;
	        $scope.NoteLists.$save(record);        
	    }


	}]);

	