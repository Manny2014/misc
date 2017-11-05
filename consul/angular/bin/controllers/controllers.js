app.controller("mainController",['$scope','$log', '$filter', '$resource',function($scope, $log, $filter, $resource){
    $scope.description = "Consul Test"
}]);


app.controller("consulController",['$scope','$log', '$filter', '$resource', '$auth','$http','consulsrv',function($scope, $log, $filter, $resource, $auth,$http, consulsrv){

    $scope.consulGetNodes = function(){
      consulsrv.getNodes().then(function(data){
        $scope.consulNodes =  data;
      },function(response) {
        $scope.consulNodes = data.state;
      }); 
   };
  
    $scope.consulGetServices = function(){
      consulsrv.getServices().then(function(data){
        $scope.consulServices =  data;
      },function(response) {
        $scope.consulServices = data.state;
      }); 
    };
    
  $scope.consulGetNodes()
  $scope.consulGetServices()
    
}]);
