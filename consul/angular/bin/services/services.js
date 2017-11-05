app.factory('consulsrv',['$http','$log','$q', function($http,$log,$q) {
    var consulsrv = {};
    
    baseurl = 'http://localhost:8500/v1';
    consulsrv.getNodes = function(){
        getUrl = baseurl + "/catalog/nodes";
        var data = {}
        return $http.get(getUrl)
            .then(function(response) {
                return response.data;
            }, function(response) {
                return response;
            });
    };
    
    // Get single service with details
    consulsrv.getService = function(serviceName){
        $log.info("Executing getService");
        getUrl = baseurl + "/health/checks/" + serviceName;
        var data = {}
        return $http.get(getUrl)
            .then(function(response) {
                return response.data;
            }, function(response) {
                return response;
            });
    };
    
    consulsrv.getServices = function(){
        $log.info("Executing getServices");
        getUrl = baseurl + "/catalog/services";
        var data = {}
        return $http.get(getUrl)
            .then(function(response) {
                return response.data;
            }, function(response) {
                return response;
            });
    };
    
    
    return consulsrv;
}]);