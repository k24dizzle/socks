'use strict';

app.directive('chart', ['apiService', function(api) {
	return {
		link: function(scope, element, attrs) {
			console.log("chart scope");
			console.log(scope);


			
		}
	}
}]);