var app = angular.module("myApp");

app.service("FirebaseService", ["$firebase", "$q", function ($firebase, $q) {

	var _that = this;
	_that.error = _that.user = null;
	_that.thirdPartyUserData = [];

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
				formatUserData(user.thirdPartyUserData);
			} else	{
				//user is logged out
			}
		});
	};

	var formatUserData = function (userDataJson)	{
		for (var key in userDataJson)	{
			if (userDataJson.hasOwnProperty(key))	{
				var formattedObject = {
					"key": key,
					"value": userDataJson[key]
				};
				_that.thirdPartyUserData.push(formattedObject);
			}
		}
	};

	_that.login = function()	{
		deferred = $q.defer();
		_that.initAuth();
		auth.login('github');
		return deferred.promise;
	};

	_that.logout = function ()	{
		auth.logout();
	};

}]);