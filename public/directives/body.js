'use strict';

app.directive('body', ['apiService', function(api) {
	return {
		controller: 'socksController',
		link: function(scope, element, attrs) {
			console.log("test");
			api.getAthleteData(1433112).then(function(result) {
				scope.data = result.data;
			});
			scope.test = 'test~!';
		}
	}
}]);