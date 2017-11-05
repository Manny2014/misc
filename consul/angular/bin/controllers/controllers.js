app.controller("mainController",['$scope','$log', '$filter', '$resource',function($scope, $log, $filter, $resource){
    $scope.description = "Consul Test"
}]);


app.controller("consulController",['$scope','$log', '$filter', '$resource', '$auth','$http','consulsrv',function($scope, $log, $filter, $resource, $auth,$http, consulsrv){
    $scope.description = "Consul Test"
    $scope.consulGetNodes = function(){
      consulsrv.getNodes().then(function(data){
        $scope.consulNodes =  data;
      },function(response) {
        $scope.consulNodes = data.state;
      }); 
   };
    
  $scope.consulGetNodes()
    $log.info("LOADED");
    $scope.test = "TESST"
    
}]);
