var app = angular.module("bugedex", [
	"firebase",
	"ngRoute",
	"appControllers",
	"appServices"
]);

var appControllers = angular.module("appControllers", []);
var appServices = angular.module("appServices", []);