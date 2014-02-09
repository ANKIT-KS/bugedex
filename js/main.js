var app = angular.module("myApp", ["firebase"]);

app.controller("myController", ["$scope", "FirebaseService", function ($scope, firebaseService) {

	$scope.login = function ()	{
		loginQuery();
	};

	var loginQuery = function () {
		var loginPromise = firebaseService.login();

		loginPromise.then(function() {
			updateView();
		});
	}

	var updateView = function() {
		$scope.user = firebaseService.user;
		$scope.thirdPartyUserData = firebaseService.thirdPartyUserData;
		$scope.error = firebaseService.error;
	};

	$scope.logout = function ()	{
		firebaseService.logout();
		$scope.user = false;
	};

	$scope.saveData = function(user)	{

		var userRef = new Firebase("https://bugodex.firebaseio.com/users/" + user.id);

		userRef.set({
			"username": user.username,
			"name": user.displayName,
		});
	};

	loginQuery();

}]);