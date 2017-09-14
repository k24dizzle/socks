'use strict';

app.service('apiService', ['$http', function($http) {
    this.getStuff = function(aid) {
        return $http.get('api/athlete/' + aid);
    }
}]);