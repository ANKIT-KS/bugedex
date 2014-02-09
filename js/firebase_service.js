var app = angular.module("myApp");

app.service("FirebaseService", ["$firebase", "$q", function ($firebase, $q) {

	var _that = this;
	_that.error = _that.user = null;

	var deferred = $q.defer();

	var dataRef = new Firebase("https://bugodex.firebaseio.com/");
	var auth = null;


	_that.initAuth = function () {
		auth = new FirebaseSimpleLogin(dataRef, function(error, user) {
			deferred.resolve();
			if (error)	{
				//error occurs while trying login
				_that.error = error.message;
			} else if (user)	{
				//user authentication with firebase successfull
				_that.user = user;
			} else	{
				//user is logged out
			}
		});
	};


	_that.login = function()	{
		deferred = $q.defer();
		_that.initAuth();

		auth.login('github', {
			scope: 'user,gist,repo'
		});

		return deferred.promise;
	};


	_that.logout = function ()	{
		auth.logout();
	};


	_that.saveData = function (user) {
		var userRef = new Firebase("https://bugodex.firebaseio.com/users/" + user.id);

		userRef.set({
			"username": _that.user.username,
			"name": _that.user.displayName,
		});

	};

}]);