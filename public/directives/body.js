'use strict';

app.directive('tester', ['apiService', function(api) {
	return {
		link: function(scope, element, attrs) {
			console.log("test");
			api.getStuff(1433112).then(function(result) {
				console.log(result);
			});
			scope.test = 'test~!';
		}
	}
}]);