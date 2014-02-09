var app = angular.module("myApp", ["firebase"]);

function myController($scope, $firebase)	{

	var dataRef = new Firebase("https://bugodex.firebaseio.com/");

	var auth = new FirebaseSimpleLogin(dataRef, function(error, user) {
		if (error)	{
			//error occurs while trying login
			$scope.errorMessage = error.message;
		} else if (user)	{
			//user authentication with firebase successfull
			$scope.user = user;
			formatUserData(user.thirdPartyUserData);
		} else	{
			//user is logged out
		}
	});

	$scope.login = function ()	{
		auth.login('github');
	};

	$scope.logout = function ()	{
		auth.logout();
		$scope.user = false;
	};

	$scope.thirdPartyUserData =[];

	var formatUserData = function (userDataJson)	{
		for (var key in userDataJson)	{
			if (userDataJson.hasOwnProperty(key))	{
				var formattedJson = {
					"key": key,
					"value": userDataJson[key]
				};
				$scope.thirdPartyUserData.push(formattedJson);
			}
		}
	};



	$scope.saveData = function(user)	{

		var userRef = new Firebase("https://bugodex.firebaseio.com/users/" + user.id);

		userRef.set({
			"username": user.username,
			"name": user.displayName,
		});
	};

}