$( document ).ready(function() {
	$.ajax({
		url: 'https://api.myjson.com/bins/ms44n',
		dataType: 'json',
		type: 'get',
		cache: false,
		success: function(jsonData){
			console.log(jsonData); //success check

			var chartLabel = []; //declaring variable to store chart labels
			var chartValue = []; //declaring variable to store chart values
			var chartColour = []; //declaring variable to store chart colours

			for (i = 0; i < jsonData.slices.length; i++){
				chartLabel.push(jsonData.slices[i].label); //load chartLabel array with label values
				chartValue.push(jsonData.slices[i].value); //load chartValue array with value values
				chartColour.push(jsonData.slices[i].colour); //load chartColour array with colour values
			}
			
			console.log(chartLabel); //console-display array of chart labels (!FOR TESTING!)
			console.log(chartValue); //console-display array of chart values (!FOR TESTING!)
			console.log(chartColour); //console-display array of chart colours (!FOR TESTING!)

			$(chartLabel).each(function(index, value){ //console-display each value of chartLabel array (!FOR TESTING!)
				console.log(value);
			})

			$(chartValue).each(function(index, value){ //console-display each value of chartValue array (!FOR TESTING!)
				console.log(value);
			})

			$(chartColour).each(function(index, value){ //console-display each value of chartColour array (!FOR TESTING!)
				console.log(value);
			})


			//--------------------------------------BUILDING THE PIE CHART------------------------------------------------------------------------------


			var ctx = document.getElementById("pieChart").getContext('2d'); //declaring variable 'ctx' (context) for div to display pie chart
			var selectedIndex = null; //declaring variable to represent index selected for separation animation

			var pieChart = new Chart(ctx, { //creating chart with the below attributes
				type: 'pie',
				data: {
					labels: chartLabel,
					datasets: [{
						backgroundColor: chartColour,
						data: chartValue,
						borderWidth: 2,
					}]
				},

				options: { //options is an object of objects of objects of attributes... very meta
					tooltips: {
						callbacks: { //invoked after you hover over a slice
							label: function(tooltipItem, data){
								var allData = data.datasets[tooltipItem.datasetIndex].data; //variable stores array of data (chartValue?)
								var tooltipLabel = data.labels[tooltipItem.index];
								var tooltipData = allData[tooltipItem.index];
								var total = 0;
								for (var i in allData) {
									total += allData[i];
								}
								var tooltipPercentage = Math.round((tooltipData/total) * 100);
								return tooltipPercentage + "%";

							}

						}
					}
					
				}

			})



		}
	})
});