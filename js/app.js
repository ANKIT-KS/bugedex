var app = angular.module('bugedex', [
	'firebase',
	'ngRoute',
	'appControllers',
	'appServices'
]);

var appControllers = angular.module('appControllers', []);
var appServices = angular.module('appServices', []);

app.config(['$routeProvider',

	function($routeProvider)	{

		$routeProvider.
			when('/', {
				templateUrl: 'partials/home.html',
				controller : 'homeController'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);