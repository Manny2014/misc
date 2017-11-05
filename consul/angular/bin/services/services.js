app.factory('consulsrv',['$http','$log', function($http,$log) {
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
    
    consulsrv.getServices = function(){
        getUrl = baseurl + "/catalog/services";
        var data = {}
        return $http.get(getUrl)
            .then(function(response) {
                return response.data;
            }, function(response) {
                return response;
            });
    };
    
    consulsrv.getService = function(serviceName){
        getUrl = baseurl + "/catalog/services/" + serviceName;
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