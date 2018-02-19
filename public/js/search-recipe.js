// This code handles the queries for specific events 

// Once user presses the submit button
$("#add-submit").on("click", function(event){
	event.preventDefault();

	// save the recipe they typed into the search form
	var searchedRecipe = $(".form-control").val().trim();

	// Use Regex to remove spaces from searchedRecipe
	searchedRecipe = searchedRecipe.replace(/\s+/g, "").toLowerCase();

	// run an AJAX call for our server's API, including the smoothie in the URL
	$.get("/api/" + searchedRecipe, function(data){
		// log the data to the console
		console.log(data);
		// empty the well section before adding new content
		$("#display-search").empty();
		// Return an error message if there isn't any data
		if(!data) {
			$("#display-search").append("<h2> I'm sorry, but no smoothies match your search. Please search again. </h2>");
		} else {
			// otherwise, append the display-search with all of the results
			$("#display-search").append("<h2>" + data.name + "</h2>");
			$("#display-search").append("<h3>" + data.ingredients + "</h3>");
			$("#display-search").append("<h3>" + data.instructions + "</h3>");
		}
	});
});