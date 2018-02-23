// This code handles the queries for specific events 
$(document).ready(function(){
	$("#add-submit").on("click", function(event){
		event.preventDefault();

		// save the recipe they typed into the search form
		var searchedRecipe = $("#smoothie-search").val().trim();

		// Use Regex to remove spaces from searchedRecipe
		searchedRecipe = searchedRecipe.replace(/\s+/g, "").toLowerCase();

		// run an AJAX call for our server's API, including the smoothie in the URL
		$.get("/api/smoothie/" + searchedRecipe, function(data){
			// log the data to the console
			console.log(data);
			// empty the well section before adding new content
			$("#display-search").empty();
			// Return an error message if there isn't any data
			if(!data) {
				$("#display-search").append("<h2> I'm sorry, but no smoothies match your search. Please search again. </h2>");
			} else {
				// otherwise, append the display-search with all of the results
				for (var i = 0; i < data.length; i++) {
					$("#display-search").append("<h2>" + data[i].name + "</h2>");
					$("#display-search").append("<h3>" + data[i].description + "</h3>");
					$("#display-search").append("<h3>" + data[i].ingredients + "</h3>");
					$("#display-search").append("<h3>" + data[i].instructions + "</h3>");
				}
			}
			$("#smoothie-search").empty();
		});
	});

	$("#add-view").on("click", function() {
		event.preventDefault();
		$.get("/api/smoothie", function(data){
			console.log(data);
			if(!data) {
				$("#display-search").append("<h2> I'm sorry, but there are no smoothies available. </h2>");
			} else {
				for (var i = 0; i < data.length; i++) {
					$("#display-search").append("<h2>" + data[i].name + "</h2>");
					$("#display-search").append("<h3>" + data[i].description + "</h3>");
					$("#display-search").append("<h3>" + data[i].ingredients + "</h3>");
					$("#display-search").append("<h3>" + data[i].instructions + "</h3>");
				}
			}
		});
	});

	// When the reset button is pressed, clear everything
	$("#add-reset").on("click", function() {
		event.preventDefault();
		$("#smoothie-search").empty();
		$("#display-search").empty();
	});
});
