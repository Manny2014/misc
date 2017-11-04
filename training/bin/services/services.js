// Custome service
myApp.service('hexafy', function() {
    this.myFunc = function (x) {
        return x.toString(16);
    }
});

myApp.factory('githubsrv',['$http','$log', function($http,$log) {
    var githubsrv = {};
    
    baseurl = 'https://api.github.com';
    githubsrv.getById = function(userId){
        getUrl = baseurl + "/user/" + userId;
        var data = {}
        return $http.get(getUrl)
            .then(function(response) {
                return response.data;
            }, function(response) {
                return response;
            });
    };
    return githubsrv;
}]);