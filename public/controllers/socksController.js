'use strict';

app.controller('socksController', ['apiService', '$scope', function(api, $scope) {
	$scope.athlete = {};
	$scope.aid = null;
	$scope.athleteLoading = true;

	$scope.updateAthlete = function(aid) {
		$scope.athleteLoading = true;
		api.getAthleteData(aid).then(function(result) {
			let data = result.data;
			$scope.athlete.name = data.name;
			$scope.athlete.times = data['5ktimes'];
			$scope.athlete.school = data.schoolname;
			$scope.athleteLoading = false;
		}).catch(function(err) {
			return;
		});
	}
}]);