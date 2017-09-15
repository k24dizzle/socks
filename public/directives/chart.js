'use strict';

app.directive('chart', ['apiService', function(api) {
	return {
		scope: {
			athlete: '='
		},
		link: function(scope, element, attrs) {
			console.log("chart scope");
			console.log(scope);

			scope.$watch('athlete.name', function(newValue, oldValue) {
                if (newValue) {
                    // Update the chart to be the new one
                }
            });

		}
	}
}]);