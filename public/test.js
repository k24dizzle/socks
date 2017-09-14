var ctx = document.getElementById("myChart").getContext('2d');

var mock_json = {"_id":"59928f65791e4b49fd00a249","name":"Nick Strach","schoolname":"Skyline","5ktimes":[{"grade":"10","races":[{"date":"2012-09-06","name":"Kingco League 4A Preview","time":"18:20.0"},{"date":"2012-09-15","name":"Festival of Champions","time":"18:20.0"},{"date":"2012-09-29","name":"6th Annual Twilight XC Invitational","time":"17:55.0"},{"date":"2012-10-03","name":"Skyline-Rooselvelt @Woodinville","time":"17:13.0"},{"date":"2012-10-18","name":"Kingco 4A League Championships","time":"17:25.0"},{"date":"2012-10-27","name":"District 1 2A/3A/4A XC Championships","time":"17:57.9"}],"year":"2012"},{"grade":"9","races":[{"date":"2011-10-12","name":"Ballard, Skyline, Garfield @ Roosevelt","time":"20:05.0"},{"date":"2011-10-20","name":"Kingco 4A League Championships","time":"19:26.0"}],"year":"2011"}],"sid":499,"aid":"3584341"};
function getChartFromData(data) {
    var result = {};
    result.name = data.name;
    result.school = data.schoolname;
    var dataset = data["5ktimes"];
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
}

var result = getChartFromData(mock_json);

var x = new Chart(ctx, {
   type: 'scatter',
   data: {
      datasets: [{
         label: "Test",
         data: result.times,
      }]
   },
   options: {
        responsive: true,
        scales: {
               yAxes: [{
                 ticks: {
                   userCallback: function(v) { return seconds_to_format(v) }
                 }
               }]
             },
        title: {
            display: true,
            text: result.school + ": " + result.name
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, chartData) {
                    var race = chartData.datasets[0].data[tooltipItem['index']];
                    return race.date + " " + race.name + " " + race.time;
                }
            }
        } 
    }
});

function seconds_to_format(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = (seconds % 60).toString();
    if (seconds.length === 1) {
        seconds = "0" + seconds
    }
    return minutes + ":" + seconds;
}

