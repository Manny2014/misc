/*global angular */

var myApp = angular.module("myApp", ["ngRoute", "ngMessages", "ngResource","satellizer"]);


myApp.config(function($routeProvider, $authProvider) {
    $routeProvider.
   
    when('/', {
      templateUrl: 'views/main.htm', controller: 'mainController'
   }).
   when('/login', {
      templateUrl: 'views/login.htm', controller: 'mainController'
   }).
    when('/tacos', {
      templateUrl: 'views/tacos.htm', controller: 'tacosController'
   }).
   when('/search/:num/:other', {
      templateUrl: 'views/search.htm', controller: 'searchController'
   }).
   otherwise({
      redirectTo: '/'
   });
   
    $authProvider.github({
      clientId: '95ec147ae57756b1b136'
    });
});

myApp.directive("coolTemplate", function() {
    return {
        restrict: "AE",
        templateUrl : "templates/template.html",
        replace: true
    };
});

myApp.directive("gitHubUserSearch", function() {
    return {
        restrict: "AE",
        templateUrl : "templates/search.htm",
        replace: true
    };
});
