var rawLogText = "";
getLogText();
window.onload = function() {
	update(1);
	showText();
}
setTimeout(function() {
	displayChart();
}, 1000);

google.load('visualization', '1.0', {'packages':['corechart'], callback: drawChart});

function showText() {
	console.log("Here");
	$('#linechart').hide();
	$('#textDiv').show();
}

function showGraph() {
	$('#linechart').show();
	$('#textDiv').hide();
}

function update(timeout) {
	setTimeout(function() {
		$.ajax({
			type: "GET",
			url: "./log.txt",
			dataType: 'text',
			success: function(text) {
				var textarea = document.getElementById("textarea");
				textarea.textContent = text;
			},
			error: function() {
				alert("Could not find log file");
			}
		});
	}, timeout);
}

function deleteLogs() {
}

function getLogText() {
	$.ajax({
		type: "GET",
		url: "./rawLog.txt",
		dataType: 'text',
		success: function(text) {
			rawLogText = text;
		},
		error: function() {
			alert("Could not find raw log file");
		}
	});
}

function drawChart() {
	console.log(rawLogText);

	logs = rawLogText.split("\n\n")
	console.log(logs);

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Time');
	data.addColumn('number', 'Temp');
	data.addColumn('number', 'Target Temp');
	var chartData = [];
	var startTime = Number(logs[0].split("\n")[0]);
	for (i = 0; i < logs.length; i++) {
		var diffTime = Number(logs[i].split("\n")[0]) - startTime;
		diffTime /= 1000;
		var temp = parseInt(logs[i].split("\n")[1]);
		var targetTemp = parseInt(logs[i].split("\n")[2]);
		chartData.push([diffTime, temp, targetTemp]);
	}
	console.log("Chart data: " + chartData)
	data.addRows(chartData);

	// Set chart options
	var options = {
		title: 'Temperature',
		hAxis: {
			title: 'Time'
		},
		vAxis: {
			title: 'Temperature'
		}
	};

        // Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.LineChart(document.getElementById('linechart'));
		chart.draw(data, options);
	}

function reload() { location = "monitor.html"; }

function home() { location = "index.html"; }
