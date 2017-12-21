var jsonSource = "https://api.myjson.com/bins/11zc4n";

function buildIncomeDiv (divToBeAppend, incomeObject) {
	
	//build the outer section
	var incomeDiv = document.createElement("table");
	incomeDiv.classList.add("income-div");

	//build the income title section, will displayed in different color
	var incomeTitle = document.createElement("tr");
	incomeTitle.classList.add("income-title");
	incomeTitle.style.backgroundColor = incomeObject.colour;
	incomeTitle.style.borderRight = "10px solid " +  incomeObject.colour;

	//build the sub-div of income-title: percentage
	var incomePercentage = document.createElement("td");
	incomePercentage.classList.add("income-percentage");
	incomePercentage.style.borderRight = "10px solid " +  incomeObject.colour;
	incomePercentage.appendChild(document.createTextNode(incomeObject.percentage + "%"));

	//build the sub-div of income-title: income name
	var incomeName = document.createElement("td");
	incomeName.classList.add("income-name");
	if ("geographic" !== incomeObject.type) {
		incomeName.appendChild(document.createTextNode(incomeObject.type));
	}

	incomeTitle.appendChild(incomePercentage);
	incomeTitle.appendChild(incomeName);
	incomeDiv.appendChild(incomeTitle);

	//build the fund section
	//var fundDiv = document.createElement("div");
	//fundDiv.classList.add("fund-div");

	var fundTypeLength = incomeObject.subType.length;

	if (incomeObject.type !== "geographic") {
		for (var i = 0; i < fundTypeLength; ++i) {
			var incomeFund = document.createElement("tr");
			incomeFund.classList.add("income-fund");

			var fundPercentage = document.createElement("td");
			fundPercentage.classList.add("fund-percentage");
			fundPercentage.appendChild(document.createTextNode(incomeObject.subType[i].percentage + "%"));

			var fundName = document.createElement("td");
			fundName.classList.add("fund-name");
			fundName.appendChild(document.createTextNode(incomeObject.subType[i].name));

			//check if the fund has superscript. If has, add it to the end of its fund name
			if ("undefined" !== typeof(incomeObject.subType[i]["superscript"])) {
				var superNumber = document.createElement("sup");
				superNumber.appendChild(document.createTextNode(incomeObject.subType[i].superscript));
				fundName.appendChild(superNumber);
			}

			incomeFund.appendChild(fundPercentage);
			incomeFund.appendChild(fundName);
			incomeDiv.appendChild(incomeFund);
		}
	}
	else {

		var colorSet = ["#ED5A36", "#F47E20", "#7C4496", "#D02259", "#FFB819", 
		"rgb(247, 164, 145)", "rgb(241, 183, 137)", "rgb(191, 138, 216)", "rgb(224, 108, 145)", "rgb(255, 225, 158)"];

		for (var i = 0; i < fundTypeLength; ++i) {
			var country = document.createElement("tr");
			country.classList.add("country");

			var colorBox = document.createElement("div");
			colorBox.style.border = "1px solid white";
			colorBox.style.backgroundColor = colorSet[i];
			colorBox.classList.add("color-box");

			var countryPercentage = document.createElement("td");
			countryPercentage.classList.add("country-percentage");
			countryPercentage.appendChild(document.createTextNode(incomeObject.subType[i].percentage + "%"));

			var countryName = document.createElement("td");
			countryName.classList.add("country-name");
			countryName.appendChild(document.createTextNode(incomeObject.subType[i].name));

			countryPercentage.appendChild(colorBox);
			country.appendChild(countryPercentage);
			country.appendChild(countryName);
			incomeDiv.appendChild(country);
		}

	}

	divToBeAppend.appendChild(incomeDiv);
};

function buildPieChart (positionID, dataArray) {
	var chartValue = []; //declaring variable to store chart valuese
	var chartColour = []; //declaring variable to store chart colours

	for (i = 0; i < dataArray.length; ++i){
		chartValue.push(dataArray[i].percentage); //load chartValue array with value values
		chartColour.push(dataArray[i].colour); //load chartColour array with colour values
	}
	var ctx = document.getElementById(positionID).getContext('2d'); //declaring variable 'ctx' (context) for div to display pie chart
	var selectedIndex = null; //declaring variable to represent index selected for separation animation
	var selectedIndexFunds = null;

	var pieChart = new Chart(ctx, { //creating chart with the below attributes
		type: 'pie',
		data: {
			datasets: [{
				backgroundColor: chartColour, //setting background colour of each slice with chartColour array
				data: chartValue, //setting values of each slice with chartValue array
				borderWidth: 2, //setting value of the border around each slice
			}]
		},
		options: { //options is an object of objects of objects of attributes... very meta
			tooltips: {enabled: false},
    		hover: {mode: null},
    		//maintainAspectRatio: false
		}
	});
};

function buildPieChartForGeo (positionID, dataArray) {
	var chartValue = []; //declaring variable to store chart valuese
	var chartColour = ["#ED5A36", "#F47E20", "#7C4496", "#D02259", "#FFB819", 
		"rgb(247, 164, 145)", "rgb(241, 183, 137)", "rgb(191, 138, 216)", "rgb(224, 108, 145)", "rgb(255, 225, 158)"]; //declaring variable to store chart colours
	
	for (i = 0; i < dataArray.length; ++i){
		chartValue.push(dataArray[i].percentage); //load chartValue array with value values
	}

	var ctx = document.getElementById(positionID).getContext('2d'); //declaring variable 'ctx' (context) for div to display pie chart
	var selectedIndex = null; //declaring variable to represent index selected for separation animation
	var selectedIndexFunds = null;

	var pieChart = new Chart(ctx, { //creating chart with the below attributes
		type: 'pie',
		data: {
			datasets: [{
				backgroundColor: chartColour, //setting background colour of each slice with chartColour array
				data: chartValue, //setting values of each slice with chartValue array
				borderWidth: 2, //setting value of the border around each slice
			}]
		},
		options: { //options is an object of objects of objects of attributes... very meta
			tooltips: {enabled: false},
    		hover: {mode: null},
    		//maintainAspectRatio: false
		}
	});
};

$(document).ready(function() {
	$.ajax({
		url: jsonSource,
		type: 'get',
		cache: false,
		success: function (json) {

			//----------------------------------------------------- Title Section ----------------------------------------------------------
			//Get the profolio type and feed into title area.
			var reportTitleSection = document.getElementById("report-protofolio-type");
			reportTitleSection.appendChild(document.createTextNode(json.reportProfolioTitle));

			//----------------------------------------------------- Benefit Section --------------------------------------------------------
			//Get the benefit array from json (json.benefits),use for loop to add <li> one by one.
			var benefitSection = document.getElementById("benefit-list");

			var benefitsLength = json.benefits.length;

			for (var i = 0; i < benefitsLength; ++i) {
				//appendChild won't work if the object is null, have to create an element.
				var benefitItem = document.createElement("li");
				benefitItem.appendChild(document.createTextNode(json.benefits[i]));
				benefitSection.appendChild(benefitItem);
			}

			//----------------------------------------------- Income/Fund Table Section ----------------------------------------------------

			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Fund and Portfolio page ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			//build the income and fund table
			var incomeTableSection = document.getElementById("table-section-0");
			var fundsChartLength = json.fundsChart.length;

			for (var i = 0; i < fundsChartLength; ++i) {
				buildIncomeDiv(incomeTableSection, json.fundsChart[i]);
			}

			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Equity and Fixed Income  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

			var equityTableSection = document.getElementById("table-section-1");
			var equityChartLength = json.equityChart.length;

			for (var i = 0; i < equityChartLength; ++i) {
				buildIncomeDiv(equityTableSection, json.equityChart[i]);
			}
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Geographic  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

			var geographicTableSection = document.getElementById("table-section-2");
			var geographicChartLength = json.geographicChart.length;

			for (var i = 0; i < geographicChartLength; ++i) {
				buildIncomeDiv(geographicTableSection, json.geographicChart[i]);
			}
			//----------------------------------------------------- Pie Chart Section -------------------------------------------------------- 
			
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Fund and Portfolio page ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			//Pie chart date
			var pieChartDate = document.getElementById("pie-chart-date-0");
			pieChartDate.appendChild(document.createTextNode("CURRENT ASSET MIX AS OF " + json.date));

			//pie chart
			buildPieChart ("pie-chart-0", json.fundsChart);

			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Equity and Fixed Income  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

			buildPieChart ("pie-chart-1", json.equityChart);

			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Geographic  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

			buildPieChartForGeo ("pie-chart-2", json.geographicChart[0].subType);

			//------------------------------------------------------- Foot Note Section -------------------------------------------------------
			//Get the foot-note array from json (json.footNote),use for loop to add <li> one by one.
			var footNoteSection = document.getElementById("foot-note");

			var footNoteLength = json.footNote.length;

			for (var i = 0; i < footNoteLength; ++i) {
				//appendChild won't work if the object is null, have to create an element.
				var footNoteItem = document.createElement("li");
				footNoteItem.appendChild(document.createTextNode(json.footNote[i]));
				footNoteSection.appendChild(footNoteItem);
			}
		}
	})

	//---------------------------------------------------------------- Feed User Input Section -------------------------------------------------------
	//get the user input from query string, and feed into correct location
	var GET = {};
    var queryString = window.location.search.replace(/^\?/, '');
    queryString.split(/\&/).forEach(function(keyValuePair) {
    	var paramName = keyValuePair.replace(/=.*$/, ""); // some decoding is probably necessary
    	var paramValue = keyValuePair.replace(/^[^=]*\=/, ""); // some decoding is probably necessary
    	GET[paramName] = paramValue;
    });
    var clientName = decodeURIComponent(GET["form/client-name"]);
    var address1 = decodeURIComponent(GET["form/address1"]);
    var address2 = decodeURIComponent(GET["form/address2"]);
    var address3 = decodeURIComponent(GET["form/address3"]);
    var advisorName = decodeURIComponent(GET["form/advisor-name"]);
    var firmName = decodeURIComponent(GET["form/firm-name"]);
    var phone = decodeURIComponent(GET["form/phone"]);
    var date = decodeURIComponent(GET["form/date"]);
    var userSelectedClass = decodeURIComponent(GET["form/class-name"]);

    document.getElementById("user-name").appendChild(document.createTextNode(clientName));
    document.getElementById("address1").appendChild(document.createTextNode(address1));
    document.getElementById("address2").appendChild(document.createTextNode(address2));
    document.getElementById("address3").appendChild(document.createTextNode(address3));


    document.getElementById("advisor-name").appendChild(document.createTextNode(advisorName));
	document.getElementById("firmName").appendChild(document.createTextNode(firmName));
	document.getElementById("phone").appendChild(document.createTextNode(phone));

	document.getElementById("user-name-signature").appendChild(document.createTextNode(clientName));
    document.getElementById("advisor-name-signature").appendChild(document.createTextNode(advisorName));

    document.getElementById("date-0").appendChild(document.createTextNode(date));
    document.getElementById("date-1").appendChild(document.createTextNode(date));

	if (userSelectedClass === "Non-Corporate") {
		document.getElementById("type-portfolio").appendChild(document.createTextNode("X"));
	}
	else {
		document.getElementById("type-class").appendChild(document.createTextNode("X"));
	}
    
});


