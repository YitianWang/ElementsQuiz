
$.getJSON("https://api.myjson.com/bins/gfwb7", function(json) {
	

	// ------------------------------------------------------------------------------------------------------------------------------------------------------
	// declare global variables 

	//https://api.myjson.com/bins/1ghy67

	// ------------------------------------------------------------------------------------------------------------------------------------------------------
	// declare global variables 
	var numOfSlides = json.length; // get the amount of slides in the quiz 
								   // (containing coverSlide, questionSlide and resultsSlide)
	$("#queue").width(numOfSlides*800); // set the length of slide queue		
											 // each slide has width 800px (set as requirement)
											 // have to be decided after getting the amount of slides 
	var arr = [];
	for (var i = 0; i < numOfSlides; i++) { // create an array to store inputs (radio button inputs on questionSlide)
											// the length of array is same as number of all slides 
											// the index of slide is same as the index of item in array 
		arr.push(0);
	}

	var sum; // create sum to store the sum of items in array 

	var all_slides = document.getElementById("queue"); // get the div of slide queue (have created in html)
 	var footer = document.getElementById("footer"); // get the div of footer (have created in html)


 	// variables used in report form 
	var clientName, address1, address2, address3, advisorName, firmName, phone, date, userSelectedClass, userOption;
	// ---------------------------------------------------------------------------------------------------------------------------------------------------------------

	function createCoverPageSlide (slide, i, last_slide_index, footer){ // create coverSlide 

		// create slide title
		var title = document.createElement("h2");
		title.appendChild(document.createTextNode(json[i].title));
		title.className = "remove";	// to be removed  								 
		slide.appendChild(title);
 
		// create intro para 
		var supaginationitle = document.createElement("p");
		supaginationitle.appendChild(document.createTextNode(json[i].intro));
		supaginationitle.id = "cover-slide-para";
		supaginationitle.className = "remove"; // to be removed 
		slide.appendChild(supaginationitle);

		// create button to go to next slide 
		var nextButton = document.createElement("button");
		nextButton.appendChild(document.createTextNode("Take the questionnaire >>"));
		nextButton.className = "next";
		nextButton.className += " remove"; // to be removed  
		slide.appendChild(nextButton);

		// add portfolio drop-down 
		var numOfOptions = json[i].dropDown.length; // get amount of options 
		var dropDown = document.createElement("select");
		dropDown.id = "move-dropDown"; 
		dropDown.className = "drop-down";
		slide.appendChild(dropDown);

		// add options to drop-down 
		for (var j = 0; j < numOfOptions; j++) {
			var option = document.createElement("option");

			if (j == 0) {	// set the first option as default
				option.disabled = "true";
				option.selected = "true";
			}
			option.appendChild(document.createTextNode(json[i].dropDown[j].name));
			option.value = json[i].dropDown[j].value;
			dropDown.appendChild(option);
		}


	
		// replace elements 
     	var flag = false; 
		$("#slide" + i + " .drop-down").change(function(){

			$("#move-dropDown").addClass("move-dropDown"); // reposition the dropDown to the bottom of the slide
			$(".pagination").hide(); // hide pagination
			$("#report").show(); // display REPORT button 
		
			if (flag == false) { // remove old elements once 
								 // create new elements once 
				flag=true;

				$(".remove").remove(); // remove elements from cover page


				// create new elements 
				//
				var title = document.createElement("h4"); // create title 
				title.id = "results-slide-title";
				slide.appendChild(title);

				var row = document.createElement("div"); // create one row for two columns 
				row.className = "results-row";
				slide.appendChild(row);

				var leftColumn = document.createElement("div"); // left column 
				leftColumn.className = "results-column";
				leftColumn.id = "leftColumn";
				row.appendChild(leftColumn);

				var rightColumn = document.createElement("div"); // right column 
				rightColumn.className = "results-column";
				rightColumn.id = "rightColumn";
				row.appendChild(rightColumn);

				var pieChart = document.createElement("div"); // add pieChart div to right column 
				pieChart.id = "canvas-holder";
				rightColumn.appendChild(pieChart);

				var fundBox = document.createElement("div"); // add text box for pieChart labels 
				fundBox.id = "fundBox"; 
				rightColumn.appendChild(fundBox);
				var funds = document.createElement("p");
				funds.id = "funds";
				fundBox.appendChild(funds);

				var refreshButton = document.createElement("button"); // add REFRESH button for returning back to quiz 
				refreshButton.appendChild(document.createTextNode("Go back to quiz"));
				refreshButton.id = "refresh";
				footer.appendChild(refreshButton);
				$("#refresh").click(function(){
					window.location.reload();	
				}); 
			}


			// get piechart info from the last slide (Results slide)
			i = last_slide_index;
			$(this).find("option:selected").each(function(){

        	    var optionValue = $(this).attr("value"); // get value from dropDown option then create pieChart 
        	    userOption = optionValue;

            	var arg = eval("json[i]."+ optionValue); // get the type of portfolio 

            	// remove exitsing pieChart and iframe to avoid duplication
				$("iframe").remove();
				$("canvas").remove();  
  	
            	createPieChart(slide, i, arg); // call function to create pie-chart
            	
        	});
			
		});

	}


  	function createSectionSlide(slide, i){ // create section slide 

  		// create section header 
		var title = document.createElement("h2"); 
		title.appendChild(document.createTextNode(json[i].title))
		slide.appendChild(title);

		// create section intro paragraph 
		var intro = document.createElement("p");
		intro.appendChild(document.createTextNode(json[i].intro));
		intro.className = "section-intro";
		slide.appendChild(intro);

		// create two buttons to control sliding 
		// 
		var previouButton = document.createElement("button");
		previouButton.appendChild(document.createTextNode("PREVIOUS"));
		previouButton.className = "previous";
		slide.appendChild(previouButton);

		var nextButton = document.createElement("button");
		nextButton.appendChild(document.createTextNode("NEXT"));
		nextButton.className = "next";
		slide.appendChild(nextButton);
	}


  	function createQuestionSlide(slide, i){ // create question slides 

		// create question 
		var question = document.createElement("h4");
		question.appendChild(document.createTextNode(json[i].question));
		question.id = "question";
		slide.appendChild(question);

		// create one row for two columns 
		var row = document.createElement("div"); 
		row.className = "row";
		slide.appendChild(row);

		// create left column for answer list 
		var leftColumn = document.createElement("div"); 
		leftColumn.className = "question-column";
		leftColumn.className += " question-left";
		row.appendChild(leftColumn);

		// create right column for img 
		var rightColumn = document.createElement("div"); 
		rightColumn.className = "question-column";
		rightColumn.className += " question-right";
		row.appendChild(rightColumn);

		// create Form for answer list 
		var formElement = document.createElement("form"); 
		formElement.id = "form" + i;
		leftColumn.appendChild(formElement);

		// add Answers to the slide 
		var numOfAnswers = json[i].answers.length;
		for (var j = 0; j < numOfAnswers; j++) {

			function addRadioButton(text, value){

				var label = document.createElement("label");
				var radio = document.createElement("input");

				radio.className = "radio-button";
				radio.setAttribute("type", "radio");
				radio.setAttribute("name", "radioButton");
				radio.setAttribute("value", value);
				radio.id = i;

				label.appendChild(radio);
				label.appendChild(document.createTextNode(text)); // add text to radio buttons 

				formElement.appendChild(label);
			}

			addRadioButton(json[i].answers[j].text, json[i].answers[j].value); // add value to radio buttons 
		}


    	// add img to right column 
		if (json[i].img != null) {
    		var img = document.createElement("IMG");
    		img.className = "img";
    		img.setAttribute("src", json[i].img);
			img.setAttribute("alt", "chart display error");
    		rightColumn.appendChild(img);
		} 

		// add disclaimer 
		if (json[i].disclaimer != null){
			var disclaimer = document.createElement("p");
			disclaimer.className = "disclaimer";
   			slide.appendChild(disclaimer);
    		disclaimer.appendChild(document.createTextNode(json[i].disclaimer));
		}

		// create two buttons to control sliding 
		//
		var previouButton = document.createElement("button");
		previouButton.appendChild(document.createTextNode("PREVIOUS"));
		previouButton.className = "previous";
		slide.appendChild(previouButton);

		var nextButton = document.createElement("button");
		nextButton.appendChild(document.createTextNode("NEXT"));
		nextButton.className = "next";
		nextButton.id = ("next" + i);
		nextButton.disabled = true;
		slide.appendChild(nextButton);

	}


	function createPieChart(slide, i, portfolio) { // create pie chart to results slide 

		// create canvas to hold pie chart 
		var canvas = document.createElement("canvas");
		canvas.id = "pieChart";
		var pieChart = document.getElementById("canvas-holder");
		pieChart.appendChild(canvas);


		document.getElementById("results-slide-title").innerHTML = portfolio.title; // add text to title 
		document.getElementById("leftColumn").innerHTML = portfolio.left_column.intro; // add text to intro paragraph 

		var pie_Chart = portfolio.right_column.pieChart;
		var length = pie_Chart.length;
	
		var chartLabel = []; //declaring variable to store chart labels
		var chartValue = []; //declaring variable to store chart valuese
		var chartColour = []; //declaring variable to store chart colours
		var chartTitle = []; //declaring variable to store chart title
		var fundNames = []; //declaring variable to store each label's fund name(s)
		var objHeading = []; //declaring variable to store the objective heading
		var objDescription = []; //declaring variable to store the objective description 

	
		chartTitle.push(portfolio.right_column.subtitle); //load chartTitle "array" with chart title
		

		for (j = 0; j < length; j++){
			chartLabel.push(pie_Chart[j].label); //load chartLabel array with label values
			chartValue.push(pie_Chart[j].value); //load chartValue array with value values
			chartColour.push(pie_Chart[j].colour); //load chartColour array with colour values
			fundNames.push(pie_Chart[j].funds); //load fundNames array with ARRAYS of each label's fund name(s); an array of arrays
		}

			//--------------------------------------BUILDING THE PIE CHART------------------------------------------------------------------------------

		var ctx = document.getElementById("pieChart").getContext('2d'); //declaring variable 'ctx' (context) for div to display pie chart
		var selectedIndex = null; //declaring variable to represent index selected for separation animation
		var selectedIndexFunds = null;

		var pieChart = new Chart(ctx, { //creating chart with the below attributes 'var'
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
							for (var j in allData) {
								total += allData[j];
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
						fontColor: 'black',
						fontFamily: 'Segoe UI',
						fontSize: 11,
						padding: 0,
						boxWidth: 50,
						fontStyle: 'normal'
					},
					onClick: function(event, legendItem) { //disables the default results of the legend clicking
					}
				},
				cutoutPercentage: 0, //set radius of circle to cut out to create donut chart
				title: {
					display: true,
					padding: 5,
					text: chartTitle, //title of the graph
					// fontColor: '#333',
					fontSize: 13,
					fontFamily: 'Segoe UI'
				},
				layout: {
					padding: 5//padding necessary so that the exploded slice fits within the canvas div
				},
				onClick: function (evt, elements) { //function to create exploded slice upon click
					if (elements && elements.length) {
						var segment = elements[0];
						pieChart.update();

						if (selectedIndex !== segment["_index"]) {
							selectedIndex = segment["_index"];
							segment._model.outerRadius += 6;
							console.log(selectedIndex); //console output the index of selected piece. use this to decide which funds to show!

							if (fundNames[selectedIndex].length > 1) {
								var fundString = "";
								for (j = 0; j < fundNames[selectedIndex].length; j++){
									fundString = fundString + fundNames[selectedIndex][j] + "<br>";
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
	}

	function createResultsSlide(slide, i, arr, sum){ // create results slide 

		// slide title
		var title = document.createElement("h4");
		title.id = "results-slide-title";
		slide.appendChild(title);

		var row = document.createElement("div");
		row.className = "results-row";
		slide.appendChild(row);

		var leftColumn = document.createElement("div");
		leftColumn.className = "results-column";
		leftColumn.id = "leftColumn";
		row.appendChild(leftColumn);

		var rightColumn = document.createElement("div");
		rightColumn.className = "results-column";
		rightColumn.id = "rightColumn";
		row.appendChild(rightColumn);
	
		var pieChart = document.createElement("div");
		pieChart.id = "canvas-holder";
		rightColumn.appendChild(pieChart);

		var fundBox = document.createElement("div");
		fundBox.id = "fundBox"; 
		rightColumn.appendChild(fundBox);
		var funds = document.createElement("p");
		funds.id = "funds";
		fundBox.appendChild(funds);

		// add portfolio drop-down 
		var numOfOptions = json[i].dropDown.length; // get amount of options 
		var dropDown = document.createElement("select");
		dropDown.className = "drop-down";

		// add options to drop-down 
		for (var j = 0; j < numOfOptions; j++) {
			var option = document.createElement("option");
			if (j == 0) {
				option.disabled = "true";
				option.selected = "true";
			}
			option.appendChild(document.createTextNode(json[i].dropDown[j].name));
			option.value = json[i].dropDown[j].value;
			dropDown.appendChild(option);
		}
		slide.appendChild(dropDown);

		// create only previous button 
    	var previouButton = document.createElement("button");
		previouButton.appendChild(document.createTextNode("PREVIOUS"));
		previouButton.className = "previous";
		slide.appendChild(previouButton);

		// create pop-up window for report form 
		var modal = document.createElement("div");
		modal.id = "myModal";
		slide.appendChild(modal);

		// append the pre-build report window (from html file) to pop-up window 
		var reportContent = document.getElementById("report-window");
		modal.appendChild(reportContent);


	
		$("#next" + (i - 1)).click(function(){ // when user process to last slide (results slide)

			sum = 0;
			for (var j = 0; j < arr.length; j++) { // calculate the sum getting from user
				sum = sum + parseInt(arr[j]);
			}

			// remove exitsing pieChart and iframe to avoid duplication
			$("iframe").remove();
			$("canvas").remove();

			if (sum < 18) {
				createPieChart(slide, i, json[i].yield);
				userOption = "yield";
			} else if (sum >= 18 && sum <= 30) {
				createPieChart(slide, i, json[i].conservative);
				userOption = "conservative";
			} else if (sum >= 31 && sum <= 43) {
				createPieChart(slide, i, json[i].balanced);
				userOption = "balanced";
			} else if (sum >= 44 && sum <= 55) {
				createPieChart(slide, i, json[i].growth);
				userOption = "growth";
			} else if (sum > 55) {
				createPieChart(slide, i, json[i].global);
				userOption = "global";
			}	
			
			$("#report").show(); // display REPORT button 

		});


		// change content on RESULTS slide by changing dropdown options 
		$("#slide" + i +" .drop-down").change(function(){

			$(this).find("option:selected").each(function(){

        		var optionValue = $(this).attr("value");
        		userOption = optionValue;
            	
        		var arg = eval("json[i]."+ optionValue);

        		// remove exitsing pieChart and iframe to avoid duplication
        		$("iframe").remove();
				$("canvas").remove(); 

        		createPieChart(slide, i, arg);
       		});
		});

 		
	}

	// ----------------------------------------------------------------------------------------------------------------------------------
	// create all slides 
	for (var i = 0; i < numOfSlides; i++) {

 	 	// create all slides                                                                
 	 	var slide = document.createElement("li"); 
		slide.id = "slide" + i;
		all_slides.appendChild(slide);


 	 	if (json[i].type == "coverPage") { 
 	 		createCoverPageSlide(slide, i, (numOfSlides - 1), footer); // the index of last slide 
 	 	} else if (json[i].type == "section") {
 	 		createSectionSlide(slide, i);
 	 	} else if (json[i].type == "question"){
 	 		createQuestionSlide(slide, i);
 	 	} else if (json[i].type == "results"){
 	 		createResultsSlide(slide, i, arr, sum);
 	 	}
	}


 	// add pagination 
	for (var i = 1; i <= (numOfSlides); i++) {

		var pagination = document.createElement("button");
			
		pagination.id = "pagination" + i;
		footer.appendChild(pagination);


		if (i < (numOfSlides - 1)) {
			pagination.appendChild(document.createTextNode(i)); // coverSlide and questionSlide pagination 
		} else if (i == (numOfSlides - 1)) {
			pagination.appendChild(document.createTextNode("RESULTS")); // resultsSlide pagination 
		} else if (i == (numOfSlides)) {
			pagination.appendChild(document.createTextNode("REPORT")); // add a report button for resultsSlide 
			pagination.id = "report";
			$("#report").hide();
			break;
		}

		pagination.className = "pagination";
		pagination.value = i;
		pagination.disabled = true; 	
	} // pagination 


	
	$("input").on('change', function(){

    	var value = this.getAttribute("value"); // get value from selected answer 
        var id = this.getAttribute("id");
        arr[id] = value; // store the value into array 
        $("#next" + id).removeAttr("disabled"); // enable next button when question answered 
    });



	// sliding for next and previou button 
	// 
    var currSlide = 0; // starting from the first slide 

	$(".next").click(function(){ // move to next slide 
	    $("#queue").animate({marginLeft: "-=800px"}, 500); // mover the margin to left for 800px (the width of one slide)
	    currSlide++;
	    $("#pagination" + currSlide).removeAttr("disabled"); // enable the pagination of current slide 
	});

    $(".previous").click(function(){ // move to previous slide 
        $("#queue").animate({marginLeft: "+=800px"}, 500);
        currSlide--;
    });




    // pagination sliding between all enabled slides 
    //
    var diff;
    $(".pagination").click(function(){

        var desirSlide = this.getAttribute("value"); // get the index of desired slide 
        diff = currSlide - desirSlide; // calculate the difference between current slide and desired slide 

        if (diff > 0) {
            diff = currSlide - desirSlide;
            for (var i = 0; i < diff; i++) {
                $("#queue").animate({marginLeft: "+=800px"}, 300);
                currSlide = desirSlide;
            }
        }
        if (diff < 0) {
            diff = desirSlide - currSlide;
            for (var i = 0; i < diff; i++) {
                $("#queue").animate({marginLeft: "-=800px"}, 300);
                currSlide = desirSlide;
            }
        }
        
    });

    // display or hide report form window 
    // 
	$("#report").click(function(){
		$("#report-window").css("display", "block");
        $("#myModal").css("display", "block");
    });
  
    $(".close").click(function(){
        console.log("close button is clicked");
        $("#myModal").css("display", "none");
	});



    // get values from report form and process data to report 
    $("#print").click(function(){
    	'use strict';
    	clientName = document.getElementById("client-name").value;
    	address1 = document.getElementById("address1").value;
    	address2 = document.getElementById("address2").value;
    	address3 = document.getElementById("address3").value;
    	advisorName = document.getElementById("advisor-name").value;
    	firmName = document.getElementById("firm-name").value;
    	phone = document.getElementById("phone").value;
    	date = document.getElementById("date").value;
    	userSelectedClass = document.querySelector('input[name="className"]:checked').value;

    	var queryString ="?form/client-name="  + clientName +
					 	"&form/address1=" + address1 +
					 	"&form/address2=" + address2 +
					 	"&form/address3=" + address3 +
					 	"&form/advisor-name=" + advisorName +
					 	"&form/firm-name=" + firmName +
					 	"&form/phone=" + phone +
					 	"&form/date=" + date + 
					 	"&form/class-name=" + userSelectedClass;
	
		if (userOption === "yield") {
			window.open("../report-page-yield/report-yield.html" + queryString);
		} else if (userOption === "conservative") {
			window.open("../report-page-conservative/report-conservative.html" + queryString);
		} else if (userOption === "balanced") {
		  window.open("../report-page-balanced/report-balanced.html" + queryString);
		} else if (userOption === "growth") {
			window.open("../report-page-growth/report-growth.html" + queryString);
		} else if (userOption === "global") {
			window.open("../report-page-global/report-global.html" + queryString);
		}
   });
});