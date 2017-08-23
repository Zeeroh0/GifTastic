//GifTastic javascript code

//************GLOBAL VARIABLES************//

var cryBabies = ["Steve Carell", "Tina Fey", "Jim Carrey", 
				 "Johnny Depp", "Natalie Portman", "Nicole Kidman" ];





// ************FUNCTIONS************//

// Function for displaying new buttons
	function renderButtons() {
        // Deleting the buttons prior to adding new buttons
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttonDisplay").empty();
        // Looping through the array of movies
        for (var i = 0; i < cryBabies.length; i++) {
        	// Then dynamicaly generating buttons for each celebrity in the array
        	// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        	var a = $("<button>");
        	// Adding a class of celebrity to our button
        	a.addClass("celebrity");
        	// Adding a data-attribute
        	a.attr("data-name", cryBabies[i]);
        	// Providing the initial button text
        	a.text(cryBabies[i]);
        	// Adding the button to the buttons-view div
        	$("#buttonDisplay").append(a);
    	}
	}


//This click event handles when the user clicks on a celebrity button
//and displays the relavent gifs
	function displayCelebGif () {
    	// Grabbing and storing the data-name property value from the button
    	var celeb = $(this).attr("data-name");
    	// Constructing a queryURL using the celebrity's name
    	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    		celeb + "+CRYING+&api_key=b680088444274bf396529f0180b02ee8&limit=10";

    	// Performing an AJAX request with the queryURL
    	$.ajax({
        	url: queryURL,
        	method: "GET"
        })

        // After data comes back from the request
        .done(function(response) {

        	// console.log(queryURL);
        	// console.log(response);

        	// storing the data from the AJAX request in the results variable
        	var results = response.data;
        	
        	// Looping through each result item
        	for (var i = 0; i < results.length; i++) {
        	
	        	if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

		        	// Creating and storing a div tag
		        	var celebDiv = $("<div>");
		           
		            // Creating a paragraph tag with the result item's rating
		            var p = $("<p>").text("Rating: " + results[i].rating);
		            
		            // Creating and storing an image tag
		            var celebImage = $("<img>");
		            // Give the img a class to grab for clicking later 
		            celebImage.addClass("peanut");
		            // Setting the src attribute of the image to a property pulled off the result item
		            // This will begin as a still image.
		            celebImage.attr("src", results[i].images.fixed_height_still.url);
		            // Giving the img 3 new attributes:
			            // data-still (this is still image)
			            celebImage.attr("data-still", results[i].images.fixed_height_still.url);
			            // data-animate (normal gif in motion)
						celebImage.attr("data-animate", results[i].images.fixed_height.url);
			            // data-state (this is what we'll toggle with an if/else statement to freeze/animate)
			            celebImage.attr("data-state", "still");


		            // Appending the paragraph and image tag to the celebDiv
		            celebDiv.append(p);
		            celebDiv.append(celebImage);

		            // Prependng the celebDiv to the HTML page in the "#gifs-appear-here" div
		            $("#gifs-view").prepend(celebDiv);
		        }
        	}
        })
    }; 


//Function to freeze/animate gifs
    function itsAlive () {
    	// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    	var state = $(this).attr("data-state");
    	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
    	if (state === "still") {
    		$(this).attr("src", $(this).attr("data-animate"));
    		// Then, set the image's data-state to animate
    		$(this).attr("data-state", "animate");
    	} 
    	// Else set src to the data-still value
    	else {
    		$(this).attr("src", $(this).attr("data-still"));
    		$(this).attr("data-state", "still");
    	}
    };





// ************MAIN PROCESS************//

// Calling the renderButtons function to display the intial buttons
	renderButtons();


// This click event handles when the user clicks to submit a new celebrity
    $("#add-celebrity").on("click", function(event) {
    	event.preventDefault();
	    // This line grabs the input from the textbox
	    var celebrity = $("#celebrity-input").val().trim()
	    // Adding movie from the textbox to our array
	    cryBabies.push(celebrity)
	    // Calling renderButtons which handles the processing of our movie array
	    renderButtons();
	    //Clear the data entry field
    });


//This click event handles when the user clicks on a celebrity button
	$(document).on("click", ".celebrity", displayCelebGif);


//This click event will animate/freeze a gif on click
    $(document).on("click", ".peanut", itsAlive);













// ************* PSUEDO CODE ***************** // 
	//Begin w a handful of button already at the top
	// User has 2 choices:
	// 	1. user clicks on a button:
	// 		This will call and display 10 new gifs related to the button name
	// 			These gifs will not yet be animated 
	// 			When clicked upon, the user can toggle between animation and still mode
	// 	2. user can type in a new button name to add it as a button
	// 		this will append the button list to now include whatever was typed
	// 		this button will function the same as above. 
	// minimal html...the vast majority of this will be created dynamically 

	// It would be cool to create a few topics (eg Animals, Celebrities, Crazy Stunts, PotG, etc)
	//Clicking on one of these buttons would clear the current button div 
	//and create buttons within that topic.  So at any point the user 
	//could switch from looking for animal gifs to PotG gifs



