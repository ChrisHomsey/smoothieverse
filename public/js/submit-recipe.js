// This code explains what happens when a user submits a smoothie

// When user clicks on submit button
$("#submit-recipe").on("click", function(event){
	event.preventDefault();

	// a new smoothie recipe object is created from all inputs
	var newSmoothieRecipe = {
		name: $("#smoothie-name-input").val().trim(),
		description: $("#description-input").val().trim(),
		ingredients: $("#ingredient-input").val().trim(),
		instructions: $("#instructions").val().trim()
	};

	// Send an AJAX post request with Jquery
	$.post("/api/smoothie", newSmoothieRecipe)
		// if successful, run this callback
		.then(function(data){
			// log the data
			console.log(data);
			// alert the user that their smoothie is being added
			alert("Adding Smoothie Recipe...");
		});

	// Clear all input fields
	$("#smoothie-name-input").val("");
	$("#description-input").val("");
	$("#ingredient-input").val("");
	$("#instructions").val("");
});