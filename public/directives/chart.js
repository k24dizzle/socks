'use strict';

app.directive('chart', ['apiService', function(api) {
	return {
		scope: {
			athlete: '='
		},
		link: function(scope, element, attrs) {

			let seconds_to_format = function(seconds) {
			    var minutes = Math.floor(seconds / 60);
			    var seconds = (seconds % 60).toString();
			    if (seconds.length === 1) {
			        seconds = "0" + seconds
			    }
			    return minutes + ":" + seconds;
			}

			let getChartData = function() {
				let data = scope.athlete;
				console.log(data);
			    var result = {};
			    result.name = data.name;
			    result.school = data.school;
			    var dataset = data.times;
			    result.times = [];
			    var raceCount = 0;
			    for (var i = dataset.length - 1; i >= 0; i--) {
			        var races = dataset[i].races;
			        for (var j = 0; j < races.length; j++) {
			            var race = races[j];
			            // y-coordinate
			            var time = race.time;
			            // x-coordinate
			            var date = race.date;
			            var splitTime = time.split(":");
			            // y - coordinate
			            var timeSeconds = 0.0;
			            try {
			                timeSeconds += 60 * parseInt(splitTime[0]);
			                timeSeconds += parseInt(splitTime[1].split(".")[0]);
			                var newPoint = {
			                    x: raceCount,
			                    y: timeSeconds,
			                    name: race.name,
			                    time: race.time,
			                    date: race.date
			                }            
			                result.times.push(newPoint);
			                raceCount++;
			            } catch(err) {
			                console.log(err);
			            }
			        }
			    }
			    return result;
			};

			let updateChart = function() {
				let result = getChartData();
				var chart = angular.element( document.querySelector( '#myChart' ) )[0].getContext('2d');
				chart.height = 1000;
				var newChart = new Chart(chart, {
				   type: 'scatter',
				   data: {
				      datasets: [{
				         data: result.times,
				      }]
				   },
				   options: {
				        responsive: true,
				        maintainAspectRatio: false,
				        scales: {
				               yAxes: [{
				                 ticks: {
				                   userCallback: function(v) { return seconds_to_format(v) }
				                 }
				               }]
				             },
				        title: {
				            display: true,
				            text: result.school + ": " + result.name,
				            fontSize: 40,
				            fontFamily: 'Open Sans',
				        },
				        tooltips: {
				            callbacks: {
				                label: function(tooltipItem, chartData) {
				                    var race = chartData.datasets[0].data[tooltipItem['index']];
				                    return race.date + " " + race.name + " " + race.time;
				                }
				            }
				        },
				        legend: {
				            display: false,
				        }
				    }
				});
			}

			scope.$watch('athlete.name', updateChart);

		}
	}
}]);