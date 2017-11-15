$.getJSON("data.json", function(json) {

function createCoverPageSlide(slide, i){

	var title = document.createElement("h1");
	title.appendChild(document.createTextNode(json[i - 1].H1));
	slide.appendChild(title);

	var subTitle = document.createElement("p");
	subTitle.appendChild(document.createTextNode(json[i - 1].H2));
	slide.appendChild(subTitle);

	var intro = document.createElement("p");
	intro.appendChild(document.createTextNode(json[i - 1].H3));
	slide.appendChild(intro);

	var nextButton = document.createElement("button");
	nextButton.appendChild(document.createTextNode("Take the questionnaire >>"));
	nextButton.className = "next";
	nextButton.id = "questionnaire";
	slide.appendChild(nextButton);

	var numOfOptions = json[i - 1].dropDown.length;
	var dropDown = document.createElement("select");
	dropDown.className = "drop-down";

	for (var j = 1; j <= numOfOptions; j++) {
	var option = document.createElement("option");
	option.appendChild(document.createTextNode(json[i - 1].dropDown[j - 1]));
	dropDown.appendChild(option);
	}
	slide.appendChild(dropDown);
}


function createSectionSlide(slide, i){

	var intro = document.createElement("p");
	intro.appendChild(document.createTextNode(json[i - 1].intro));
	slide.appendChild(intro);

	var previouButton = document.createElement("button");
	previouButton.appendChild(document.createTextNode("PREVIOUS"));
	previouButton.className = "previous";
	slide.appendChild(previouButton);

	var nextButton = document.createElement("button");
	nextButton.appendChild(document.createTextNode("NEXT"));
	nextButton.className = "next";
	slide.appendChild(nextButton);
}


function createQuestionSlide(slide, i){

	// Question 
	var question = document.createElement("h4");
	question.appendChild(document.createTextNode(json[i - 1].question));
	slide.appendChild(question);

	// Form 
	var formElement = document.createElement("form"); 
	slide.appendChild(formElement); 
	formElement.id = "form" + i;

	// add Answers to the slide 
	var count = json[i - 1].answers.length;
	for (var j = 1; j <= count; j++) {

		function addRadioButton(text, value){

			var label = document.createElement("label");
			var radio = document.createElement("input");

			radio.setAttribute("type", "radio");
			radio.setAttribute("name", "radioButton");
			radio.setAttribute("value", value);
			radio.id = i;

			label.appendChild(radio);
			label.appendChild(document.createTextNode(text));

			formElement.appendChild(label);
		}

		addRadioButton(json[i - 1].answers[j - 1].text, json[i - 1].answers[j - 1].value);
    }

    // add chart to the question 
    if (json[i - 1].img != null) {
    	// add img the slide 
        var img = document.createElement("IMG");
        img.setAttribute("src", json[i - 1].img);
    	img.setAttribute("width", "100");
    	img.setAttribute("height", "100");
   		img.setAttribute("alt", "chart display error");
        slide.appendChild(img);
    }

    if (json[i - 1].disclaimer != null){
    	// add disclaimer
        var disclaimer = document.createElement("p");
        disclaimer.appendChild(document.createTextNode(json[i - 1].disclaimer));
        disclaimer.className = "disclaimer";
        slide.appendChild(disclaimer);
    }

    // Previous and Next button 
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


function createResultsSlide(slide, i){

	var numOfOptions = json[i - 1].dropDown.length;
	var dropDown = document.createElement("select");
	dropDown.className = "drop-down";

	for (var j = 1; j <= numOfOptions; j++) {
		var option = document.createElement("option");
		option.appendChild(document.createTextNode(json[i - 1].dropDown[j - 1]));
		dropDown.appendChild(option);
	}
	slide.appendChild(dropDown);


 	// Previous and Next button 
    var previouButton = document.createElement("button");
	previouButton.appendChild(document.createTextNode("PREVIOUS"));
	previouButton.className = "previous";
	slide.appendChild(previouButton);

 	var reportButton = document.createElement("button");
	reportButton.appendChild(document.createTextNode("report"));
	reportButton.id = "report";
	slide.appendChild(reportButton);

	var modal = document.createElement("div");
	modal.id = "myModal";
	slide.appendChild(modal);

	var closeButton = document.createElement("button");
	closeButton.appendChild(document.createTextNode("X"));
	closeButton.className = "close";
	modal.appendChild(closeButton);
}


function createModal(){

	var modal = document.getElementById('myModal');
    var btn_report = document.getElementById("report");
    var btn_close = document.getElementsByClassName("close")[0];

    btn_report.onclick = function() {
        console.log("report button is clicked");
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    btn_close.onclick = function() {
        console.log("close button is clicked");
        modal.style.display = "none";
    }

}


function enableNextButton(){

	var arr = [];
    $("input").on('change', function(){
        var value = this.getAttribute("value");
        var id = this.getAttribute("id");
        // console.log("slide NO: " + id);
        arr.push(value);
        $("#next" + id).removeAttr("disabled");
        // console.log("the value is: " + value);
    });
}


function createPagination(numOfPagination, i){

	for (var i = 1; i <= (numOfPagination - 1); i++) {
			var pagination = document.createElement("button");

	if (i == (numOfPagination - 1)) {
		pagination.appendChild(document.createTextNode("RESULTS"));
	} else {
		pagination.appendChild(document.createTextNode(i));
	}

		pagination.className = "bt";
		pagination.id = "pagination" + i;
		pagination.value = i;
		pagination.disabled = true;
		footer.appendChild(pagination);
	}
}

/*
function slideAnimation(currSlide){

	$(".next").click(function(){ 
	    $("#all-slides").animate({marginLeft: "-=745px"}, 500);
	    currSlide++;
	    console.log("-------------------------");
        console.log("Current page is: " + currSlide);
	    return currSlide;
	});

    $(".previous").click(function(){ 
        $("#all-slides").animate({marginLeft: "+=745px"}, 500);
        currSlide--;
        console.log("-------------------------");
            console.log("Current page is: " + currSlide);
        return currSlide;
    });
   
}*/

/*
function paginationAnimation(currSlide){

    var diff;
    $(".bt").click(function(){

        var desirSlide = this.getAttribute("value");
        diff = currSlide - desirSlide;
        console.log("Current slide is: " + currSlide + " Desired page is: " + desirSlide + " Difference is: " + diff);


        if (diff > 0) {
            diff = currSlide - desirSlide;
            for (var i = 0; i < diff; i++) {
                $("#all-slides").animate({marginLeft: "+=745px"}, 300);
                currSlide = desirSlide;
            }
        }
        if (diff < 0) {
            diff = desirSlide - currSlide;
            for (var i = 0; i < diff; i++) {
                $("#all-slides").animate({marginLeft: "-=745px"}, 300);
                currSlide = desirSlide;
            }
        }
        
    });

}
*/

/*

// 

*/

	var numOfSlides = json.length; // get the amount of questions 
 	// set the width of all-slides
 	$("#all-slides").width(numOfSlides*8940);

 	var all_slides = document.getElementById("all-slides");
 	var footer = document.getElementById("footer");


 	for (var i = 1; i <= numOfSlides; i++) {

 	 	// create the slide                                                                      
 	 	var slide = document.createElement("li"); 
		slide.id = "slide" + i;
		all_slides.appendChild(slide);


 	 	if (json[i - 1].type == "coverPage") { 
 	 		createCoverPageSlide(slide, i);
 	 	} else if (json[i - 1].type == "section") {
 	 		createSectionSlide(slide, i);
 	 	} else if (json[i - 1].type == "question"){
 	 		createQuestionSlide(slide, i);
 	 	} else if (json[i - 1].type == "results"){
 	 		createResultsSlide(slide, i);
 	 	}
	}


	// create elements 
	createModal();
	enableNextButton();
	createPagination(numOfSlides, i);
	// set pagination to visibale when click "questionnaire" button 
	$("#questionnaire").click(function(){
		$(".bt").css("color", "#ffffff");
	});



	var currSlide = 0;

	$(".next").click(function(){ 
	    $("#all-slides").animate({marginLeft: "-=745px"}, 500);
	    currSlide++;
	    // console.log("-------------------------");
        // console.log("Current page is: " + currSlide);
	    $("#pagination" + currSlide).removeAttr("disabled");
	});

    $(".previous").click(function(){ 
        $("#all-slides").animate({marginLeft: "+=745px"}, 500);
        currSlide--;
        // console.log("-------------------------");
        // console.log("Current page is: " + currSlide); 
    });


    var diff;
    $(".bt").click(function(){

        var desirSlide = this.getAttribute("value");
        diff = currSlide - desirSlide;
        console.log("Current slide is: " + currSlide + " Desired page is: " + desirSlide + " Difference is: " + diff);


        if (diff > 0) {
            diff = currSlide - desirSlide;
            for (var i = 0; i < diff; i++) {
                $("#all-slides").animate({marginLeft: "+=745px"}, 300);
                currSlide = desirSlide;
            }
        }
        if (diff < 0) {
            diff = desirSlide - currSlide;
            for (var i = 0; i < diff; i++) {
                $("#all-slides").animate({marginLeft: "-=745px"}, 300);
                currSlide = desirSlide;
            }
        }
        
    });

 });
