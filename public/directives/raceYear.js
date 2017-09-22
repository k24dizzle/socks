'use strict';
// representing one year's worth of races
app.directive('raceYear', ['apiService', function(api) {
	return {
		scope: {
			year: '=',
		},
		link: function(scope, element, attrs) {
			let races = scope.year.races;
			races.sort(function(a, b) {
				return (a.time).localeCompare(b.time);
			})

			scope.slowest = races[races.length - 1].time;
			scope.fastest = races[0].time;
			
			for (var i = 0; i < races.length; i++) {
				races[i].rank = i;
			}

			races.sort(function(a, b) {
				return (a.date).localeCompare(b.date)
			})

		},
		templateUrl: '../templates/raceyear.html'
	}
}]);