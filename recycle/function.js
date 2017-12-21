 $.getJSON("data.json", function(json) {

 	 var numOfQuestions = json.length; // get the amount of questions 

 	 // set the width of all-slides
 	 $("#all-slides").width(numOfQuestions*8940);

 	 for (var i = 1; i <= numOfQuestions; i++) {

 	 	var all_slides = document.getElementById("all-slides");
 	 	var footer = document.getElementById("footer");
                
        // create the slide                                                                      
 	 	var slide = document.createElement("li"); 
		slide.id = "slide" + i;
		all_slides.appendChild(slide);


 	 	if (json[i - 1].type == "coverPage") {

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

 	 	} // conver page 

 	 	else if (json[i - 1].type == "section") {
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

 	 	}// section slide

 	 	else if (json[i - 1].type == "question"){
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

				function addRadioButton(text){

					var label = document.createElement("label");
					var radio = document.createElement("input");

					radio.setAttribute("type", "radio");
					radio.setAttribute("name", "radioButton");
					radio.setAttribute("value", j);

					label.appendChild(radio);
					label.appendChild(document.createTextNode(text));

					formElement.appendChild(label);
				}

				addRadioButton(json[i - 1].answers[j - 1]);
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
			slide.appendChild(nextButton);
   
 	 	}// question slides 

 	 	else if (json[i - 1].type == "report"){
 	 		// Previous and Next button 
	        var previouButton = document.createElement("button");
			previouButton.appendChild(document.createTextNode("PREVIOUS"));
			previouButton.className = "previous";
			slide.appendChild(previouButton);

 	 		/*var reportButtonElement = document.createElement("button");
			reportButtonElement.appendChild(document.createTextNode("report"));
			reportButtonElement.className = "report";
			reportButtonElement.className = "bt";
			footer.appendChild(reportButtonElement);*/

 	 	}// report slide 

 	
 	 	
	}// all slides 

	/*var testButton = document.createElement("button");
	testButton.appendChild(document.createTextNode("test butoon"));
	footer.appendChild(testButton);
	testButton.className = "testButton";

	var testButton = document.createElement("button");
	testButton.appendChild(document.createTextNode("test butoon"));
	footer.appendChild(testButton);
	testButton.className = "testButton";*/

	

	// add pagination when Questionnaire button is clicked
	
	for (var i = 1; i < numOfQuestions; i++) {

 		var pagination = document.createElement("button");

 		if (i == numOfQuestions-1) {
 			pagination.appendChild(document.createTextNode("RESULTS"));
 		} else {
 			pagination.appendChild(document.createTextNode(i));
 		}

		pagination.className = "bt";
		pagination.id = i;
		footer.appendChild(pagination);
		
	 }

	// functions of PREVIOUS and NEXT button 
	var currSlide = 0; // starts from the coverPage with id 0
	$(".next").click(function(){ 
	    $("#all-slides").animate({marginLeft: "-=745px"}, 500);
	    currSlide++;
	});

    $(".previous").click(function(){ 
        $("#all-slides").animate({marginLeft: "+=745px"}, 500);
         currSlide--;
    });

	
    // sliding by pagination 
    var diff;
    $(".bt").click(function(){

        var desirSlide = this.getAttribute("id");
        diff = currSlide - desirSlide;

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

