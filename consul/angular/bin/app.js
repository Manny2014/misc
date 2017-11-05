/*global angular */

var app = angular.module("myApp", ["ngRoute", "ngMessages", "ngResource","satellizer"]);


app.config(function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'views/main.htm', controller: 'mainController'
   }).
    when('/nodes', {
      templateUrl: 'views/nodes.htm', controller: 'consulController'
   }).
   otherwise({
      redirectTo: '/'
   });
   
});
