'use strict';

app.directive('raceBar', ['apiService', function(api) {
	return {
		scope: {
			race: '=',
		},
		link: function(scope, element, attrs) {
			
		},
		templateUrl: '../templates/raceBar.html'
	}
}]);