Spark.ready(function() {
	// Get their one they already entered if they have one
	if(localStorage['username'] !== undefined) {
		Spark('input').attribute({value: localStorage['username']});
	}
	
	// Listen for the keypress event in the input
	Spark('input').event('keypress', function(e) {
		// If it was enter
		if(e.keyCode == 13) {
			// Set their name
			localStorage['username'] = e.target.value;
			
			// Show that it was set
			Spark('h1#status').content('Username set to ' + e.target.value);
		}
	});
});