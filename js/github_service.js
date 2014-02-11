var app = angular.module("myApp");

app.service("GithubService", ["$http", "$q", "FirebaseService", function ($http, $q, firebaseService) {

	var _that = this;
	_that.issueList = _that.hasIssues = null;
	var deferred = $q.defer();

	_that.getIssues = function ()	{
		$http.get('https://api.github.com/issues' + '?access_token=' + firebaseService.user.accessToken).success(function (data) {
			_that.hasIssues = true;
			_that.issueList = data;
			deferred.resolve();
		});
		return deferred.promise;
	};

}]);