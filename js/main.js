var app = angular.module("myApp", ["firebase"]);

app.controller("myController", ["$scope", "FirebaseService", "GithubService", function ($scope, firebaseService, githubService) {

	$scope.login = function ()	{
		loginQuery();
	};

	var loginQuery = function () {
		var loginPromise = firebaseService.login();

		loginPromise.then(function() {
			updateView();
		});
	};

	var updateView = function() {
		$scope.user = firebaseService.user;
		$scope.thirdPartyUserData = firebaseService.thirdPartyUserData;
		$scope.error = firebaseService.error;

		githubService.initGithub();
	};

	$scope.logout = function ()	{
		firebaseService.logout();
		$scope.user = null;
	};

	$scope.saveData = function()	{
		firebaseService.saveData();
	};

	loginQuery();
}]);