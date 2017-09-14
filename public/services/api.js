'use strict';

app.service('apiService', ['$http', function($http) {
    this.getAthleteData = function(aid) {
    	// TODO: Add error handling here...
        return $http.get('api/athlete/' + aid);
    }
}]);