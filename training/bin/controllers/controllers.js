myApp.controller("mainController",['$scope','hexafy','$log', '$filter', '$resource', '$auth',function($scope,hexafy,$log, $filter, $resource, $auth){
    $scope.runner = function(){
        return "boobs";
    };
    
    $scope.description = " Welcome to manny's food";
    $scope.twatter = '';
    
    $scope.lowecasetwatter = function()
    {
        return $filter('lowercase')($scope.twatter);
    };
    
    $scope.characters = 5;
    $scope.keyword = 'pennis'
    $scope.rules =[
        {rulename: "Must be 5 characters"},
        {rulename: "Must be cool"},
        {rulename: "Must be sexy"}
    ]
    
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          toastr.success('You have successfully signed in!');
          $location.path('/');
        })
        .catch(function(error) {
          toastr.error(error.data.message, error.status);
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/');
        })
        .catch(function(error) {
          if (error.message) {
            // Satellizer promise reject error.
            toastr.error(error.message);
          } else if (error.data) {
            // HTTP response error from server
            toastr.error(error.data.message, error.status);
          } else {
            toastr.error(error);
          }
        });
    };

}]);

myApp.controller("tacosController",['$scope','hexafy','$log', '$filter', '$resource', '$http','githubsrv', function($scope,hexafy,$log, $filter, $resource, $http, githubsrv ){
    
    
    $scope.runner = function(){
        return "boobs"
    }

    $scope.tacotypes = [
        {type: "carne",des:"Juicey steak"},
        {type: "chicken",des:"Freshly killed"}
    ]
        
    $scope.alertCLick = function(){
        $log.info("I was just clicked");
        $scope.somearray = ["Chilli", "billy", "dilly"]
    };
    

   $scope.githubdatafunc = function(){
      githubsrv.getById($scope.userId).then(function(data){
        $scope.githubdata =  data;
      },function(response) {
        $scope.githubdata = data.state;
      }); 
   };
    
   $scope.userId = '1';
    
   $scope.$watch('userId', function(newValue, oldValue, scope){
       $scope.userId = newValue;
       if ($scope.userId != ''){ 
           $scope.githubdatafunc()
       }
   })
   
  
    
}]);

myApp.controller("searchController",['$scope','$log', '$filter', '$http','githubsrv', '$routeParams',function($scope,$log, $filter, $http, githubsrv, $routeParams ){
    
   $scope.userId = $routeParams.num;
   $scope.other = $routeParams.other;
   $scope.githubdatafunc = function(){
      githubsrv.getById($scope.userId).then(function(data){
        $scope.githubdata =  data;
      },function(response) {
        $scope.githubdata = data.state;
      }); 
   };
    
  $scope.githubdatafunc()
        
}]);