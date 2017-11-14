// Dynamic pie chart 

$( document ).ready(function() {
	$.ajax({
		url: 'https://api.myjson.com/bins/1f8pxj', //currently sourced from yield.json that is hosted on an http server
		dataType: 'json',
		type: 'get',
		cache: false,
		success: function(jsonData){
			console.log(jsonData); //success check

			var chartLabel = []; //declaring variable to store chart labels
			var chartValue = []; //declaring variable to store chart valuese
			var chartColour = []; //declaring variable to store chart colours
			var chartTitle = []; //declaring variable to store chart title
			var fundNames = []; //declaring variable to store each label's fund name(s)

			chartTitle.push(jsonData.title); //load chartTitle array with chart title

			for (i = 0; i < jsonData.yield.length; i++){
				chartLabel.push(jsonData.yield[i].label); //load chartLabel array with label values
				chartValue.push(jsonData.yield[i].value); //load chartValue array with value values
				chartColour.push(jsonData.yield[i].colour); //load chartColour array with colour values
				fundNames.push(jsonData.yield[i].funds); //load fundNames array with ARRAYS of each label's fund name(s); an array of arrays
			}
			
			console.log(chartTitle); //console-display chart title (!FOR TESTING!)
			console.log(chartLabel); //console-display array of chart labels (!FOR TESTING!)
			console.log(chartValue); //console-display array of chart values (!FOR TESTING!)
			console.log(chartColour); //console-display array of chart colours (!FOR TESTING!)
			console.log(fundNames); //console-display array of array of fund names (!FOR TESTING!)

			$(chartTitle).each(function(index, value){ //console-display chart title (!FOR TESTING!)
				console.log(value);
			})

			$(chartLabel).each(function(index, value){ //console-display each value of chartLabel array (!FOR TESTING!)
				console.log(value);
			})

			$(chartValue).each(function(index, value){ //console-display each value of chartValue array (!FOR TESTING!)
				console.log(value);
			})

			$(chartColour).each(function(index, value){ //console-display each value of chartColour array (!FOR TESTING!)
				console.log(value);
			})

			for (i = 0; i < jsonData.yield.length; i++){ //console-display each value of from each index of fundName (go through each array index within each array index)
				$(fundNames[i]).each(function(index, value){ 
					console.log(value);
				})
			}


			//--------------------------------------BUILDING THE PIE CHART------------------------------------------------------------------------------


			var ctx = document.getElementById("pieChart").getContext('2d'); //declaring variable 'ctx' (context) for div to display pie chart
			var selectedIndex = null; //declaring variable to represent index selected for separation animation
			var selectedIndexFunds = null;

			var pieChart = new Chart(ctx, { //creating chart with the below attributes
				type: 'pie',
				data: {
					labels: chartLabel, //setting labels for the legend 
					datasets: [{
						backgroundColor: chartColour, //setting background colour of each slice with chartColour array
						data: chartValue, //setting values of each slice with chartValue array
						borderWidth: 2, //setting value of the border around each slice
					}]
				},
				options: { //options is an object of objects of objects of attributes... very meta
					tooltips: {
						callbacks: { //invoked after you hover over a slice
							label: function(tooltipItem, data){ //function alters the tooltip so that it displays label + percentage of slice instead of value
								var allData = data.datasets[tooltipItem.datasetIndex].data;
								var tooltipLabel = data.labels[tooltipItem.index];
								var tooltipData = allData[tooltipItem.index];
								var total = 0;
								for (var i in allData) {
									total += allData[i];
								}
								var tooltipPercentage = Math.round((tooltipData/total) * 100); //calculate the percentage of each slice
								return tooltipLabel + ' (' + tooltipPercentage + '%)';
							}
						}
					},
					legend: { //settings for the legend within the canvas
						display: true, //show or hide the library's default legend
						position: 'right',
						labels: {
							fontColor: '#666',
							fontFamily: 'Segoe UI',
							fontSize: 16,
							padding: 0,
							boxWidth: 75,
							fontStyle: 'normal'
						}
					},
					cutoutPercentage: 0, //set radius of circle to cut out to create donut chart
					title: {
						display: true,
						text: chartTitle, //title of the graph
						// fontColor: '#333',
						fontSize: 24,
						fontFamily: 'Segoe UI'
					},
					layout: {
						padding: 15 //padding necessary so that the exploded slice fits within the canvas div
					},
					onClick: function (evt, elements) { //function to create exploded slice upon click
						if (elements && elements.length) {
							var segment = elements[0];
							pieChart.update();

							if (selectedIndex !== segment["_index"]) {
								selectedIndex = segment["_index"];
								segment._model.outerRadius += 10;
								console.log(selectedIndex); //console output the index of selected piece. use this to decide which funds to show!

								if (fundNames[selectedIndex].length > 1) {
									var fundString = "";
									for (i = 0; i < fundNames[selectedIndex].length; i++){
									fundString = fundString + fundNames[selectedIndex][i] + "<br>";
									} 
									document.getElementById("funds").innerHTML = "<b><u>" + chartLabel[selectedIndex] + "</u></b><p>" + fundString;
								}
								else {
									var funds = fundNames[selectedIndex][0];
									console.log(funds);
									document.getElementById("funds").innerHTML = "<b><u>" + chartLabel[selectedIndex] + "</u></b><p>" + funds;
								} 
							}
							else {
								selectedIndex = null;
							}
						}
					},

				}
			})	
			// document.getElementById('legend').innerHTML = pieChart.generateLegend(); //legend outside of canvas
		}
	})
});