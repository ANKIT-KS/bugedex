var app = angular.module("myApp");

app.service("GithubService", ["FirebaseService", function (firebaseService) {

	var _that = this;
	_that.github = null;

	_that.initGithub = function	(token)	{
		_that.github = new Github({
			token: firebaseService.user.accessToken,
			auth: "oauth"
		});
	};

}]);