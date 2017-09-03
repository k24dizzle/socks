var ctx = document.getElementById("myChart").getContext('2d');

var mock_json = {
    "_id": {
        "$oid": "59928f2b791e4b49fd00a21c"
    },
    "name": "Keegan Symmes",
    "schoolname": "Skyline",
    "5ktimes": [
        {
            "grade": "12",
            "races": [
                {
                    "date": "2012-09-06",
                    "name": "Kingco League 4A Preview",
                    "time": "16:04.0"
                },
                {
                    "date": "2012-09-15",
                    "name": "Festival of Champions",
                    "time": "16:17.0"
                },
                {
                    "date": "2012-09-19",
                    "name": "Eastlake, Skyline @ Ballard",
                    "time": "16:08.0"
                },
                {
                    "date": "2012-09-29",
                    "name": "6th Annual Twilight XC Invitational",
                    "time": "15:24.0"
                },
                {
                    "date": "2012-10-03",
                    "name": "Skyline-Rooselvelt @Woodinville",
                    "time": "15:16.0"
                },
                {
                    "date": "2012-10-06",
                    "name": "HOLE IN THE WALL INVITATIONAL",
                    "time": "16:11.0"
                },
                {
                    "date": "2012-10-18",
                    "name": "Kingco 4A League Championships",
                    "time": "15:32.3"
                },
                {
                    "date": "2012-10-27",
                    "name": "District 1 2A/3A/4A XC Championships",
                    "time": "15:51.9"
                },
                {
                    "date": "2012-11-03",
                    "name": "WIAA 4A State Championships",
                    "time": "15:46.1"
                }
            ],
            "year": "2012"
        },
        {
            "grade": "11",
            "races": [
                {
                    "date": "2011-09-08",
                    "name": "Kingco 4A Preview",
                    "time": "16:22.0"
                },
                {
                    "date": "2011-09-24",
                    "name": "Nike Pre-Nationals",
                    "time": "15:51.2"
                },
                {
                    "date": "2011-10-01",
                    "name": "5th Annual Twilight XC Invitational",
                    "time": "15:54.0"
                },
                {
                    "date": "2011-10-05",
                    "name": "Woodinville, Skyline @ Redmond",
                    "time": "16:39.0"
                },
                {
                    "date": "2011-10-12",
                    "name": "Ballard, Skyline, Garfield @ Roosevelt",
                    "time": "15:44.0"
                },
                {
                    "date": "2011-10-20",
                    "name": "Kingco 4A League Championships",
                    "time": "15:33.0"
                },
                {
                    "date": "2011-10-29",
                    "name": "4A NW Regional Championships",
                    "time": "15:46.0"
                },
                {
                    "date": "2011-11-05",
                    "name": "WIAA 4A State Championships",
                    "time": "15:37.5"
                }
            ],
            "year": "2011"
        },
        {
            "grade": "10",
            "races": [
                {
                    "date": "2010-09-09",
                    "name": "Kingco 4A Preview",
                    "time": "16:11.0"
                },
                {
                    "date": "2010-09-15",
                    "name": "Issaquah vs. Skyline vs. Bothell League Meet",
                    "time": ""
                },
                {
                    "date": "2010-09-25",
                    "name": "Nike Pre-Nationals ",
                    "time": "16:04.4"
                },
                {
                    "date": "2010-10-02",
                    "name": "4th Annual Twilight XC Invitational",
                    "time": "16:08.5"
                },
                {
                    "date": "2010-10-13",
                    "name": "Skyline, Garfield, Roosevelt @ Ballard",
                    "time": "16:05.0"
                },
                {
                    "date": "2010-10-21",
                    "name": "4A KingCo Championships",
                    "time": "15:45.0"
                },
                {
                    "date": "2010-10-30",
                    "name": "District 1 2A, 3A and District 1/2 4A Championships",
                    "time": "16:22.9"
                },
                {
                    "date": "2010-11-06",
                    "name": "WIAA 4A State Championships",
                    "time": "16:06.5"
                }
            ],
            "year": "2010"
        },
        {
            "grade": "9",
            "races": [
                {
                    "date": "2009-09-16",
                    "name": "Sammamish, Liberty, Skyline @ Redmond",
                    "time": "17:34.0"
                },
                {
                    "date": "2009-09-26",
                    "name": "Nike Pre-Nationals",
                    "time": "17:03.1"
                },
                {
                    "date": "2009-10-07",
                    "name": "Newport, Skyline, Issaquah, Roosevelt @ Eastlake",
                    "time": "16:50.0"
                },
                {
                    "date": "2009-10-22",
                    "name": "4A & 3A/2A KINGCO CHAMPIONSHIP MEET",
                    "time": "16:39.0"
                }
            ],
            "year": "2009"
        }
    ],
    "sid": 499,
    "aid": "1433112"
};

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

