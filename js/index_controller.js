appControllers.controller("indexController", ["$scope", "FirebaseService", "GithubService",

	function ($scope, firebaseService, githubService) {

		$scope.user = null;

		$scope.login = function ()	{
			loginQuery();
		};

		var loginQuery = function () {
			var loginPromise = firebaseService.login();

			loginPromise.then(function() {
				updateView();
				getIssues();
			});
		};

		var updateView = function() {
			$scope.user = firebaseService.user;
			$scope.thirdPartyUserData = firebaseService.thirdPartyUserData;
			$scope.error = firebaseService.error;
		};

		$scope.logout = function ()	{
			firebaseService.logout();
			$scope.user = null;
		};

		$scope.saveData = function()	{
			firebaseService.saveData();
		};

		var getIssues = function()	{
			var githubQueryPromise = githubService.getIssues();

			githubQueryPromise.then(function()	{
				$scope.issueList = githubService.issueList;
				$scope.hasIssues = githubService.hasIssues;
			});
		};

		loginQuery();

	}]);