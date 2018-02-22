// This code explains what happens when a user submits a smoothie
$(document).ready(function(){
		$("#add-ingredient").click(function(event){ 
		event.preventDefault();
		var ingredient = $("#ingredient-input").val().trim();
		console.log(ingredient);
		if (ingredient) {
			$("#add-list").append($("<h2>").text(ingredient));
			$("#ingredient-input").val("");
		}
	});


	// When user clicks on submit button
	$("#submit-recipe").on("click", function(event){
		event.preventDefault();
		var apiName = $("#smoothie-name-input").val().trim().replace(/\s+/g, "").toLowerCase();
		console.log("apiName", apiName);
		var ingredientArray = [];
		var ingredientList = $("#add-list h2");
		console.log(ingredientList);

		if (ingredientList !== null) {
			for (var i = 0; i < ingredientList.length; i++) {
				ingredientArray.push(ingredientList[i].innerText);
				console.log(ingredientArray);
			}
		}

		// a new smoothie recipe object is created from all inputs
		var newSmoothieRecipe = {
			name: $("#smoothie-name-input").val().trim(),
			apiName: apiName,
			description: $("#description-input").val().trim(),
			ingredients: JSON.stringify(ingredientArray),
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
		$("#add-list").empty();
		$("#instructions").val("");
	});
});