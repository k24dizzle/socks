'use strict';

app.controller('socksController', ['apiService', '$scope', function(api, $scope) {
	$scope.count = 0;
	$scope.athlete = {};
	$scope.aid = 0;

	$scope.updateAthlete = function(aid) {
		console.log("Update athlete: " + aid);
		$scope.loadingAthlete = true;
		api.getAthleteData(aid).then(function(result) {
			let data = result.data;
			$scope.athlete.name = data.name;
			$scope.athlete.times = data['5ktimes'];
			$scope.athlete.school = data.schoolname;
			$scope.loadingAthlete = false;
		}).catch(function(err) {
			return;
		});
	}
}]);