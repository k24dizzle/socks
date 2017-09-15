'use strict';
// representing one year's worth of races
app.directive('raceYear', ['apiService', function(api) {
	return {
		scope: {
			year: '=',
		},
		link: function(scope, element, attrs) {
			
		},
		templateUrl: '../templates/raceyear.html'
	}
}]);