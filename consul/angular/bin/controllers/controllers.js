app.controller("mainController",['$scope','$log', '$filter', '$resource',function($scope, $log, $filter, $resource){
    $scope.description = "Consul Wrapper UI"
}]);


app.controller("consulController",['$scope','$log', '$filter', '$resource', '$auth','$http','consulsrv',function($scope, $log, $filter, $resource, $auth,$http, consulsrv){
    
    $scope.nodesTitle = "Consul Nodes"
    $scope.serviceTitle = "Consul Services"
    $scope.consulGetNodes = function(){
      consulsrv.getNodes().then(function(data){
        $scope.consulNodes =  data;
      },function(response) {
        $scope.consulNodes = data.state;
      }); 
   };
$scope.consulServices = []
    $scope.consulGetServices = function(){
       consulsrv.getServices().then(function(data){
            for(d in data){
               consulsrv.getService(d).then(function(dataTwo){
                   $scope.consulServices.push(dataTwo[0]);
               }),
                function(response){
                   $scope.consulServices = response;
               };
            };
          },function(response) {
            $scope.consulServices = response;
        });
    };
        
  $scope.consulGetNodes();
  $scope.consulGetServices();
    
}]);
