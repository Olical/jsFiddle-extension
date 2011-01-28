Spark.ready(function() {
	// Check if they need to configure the extension
	if(localStorage['username'] === undefined) {
		// Show the 'You need to configure' message
		Spark('div#configure').transition('fadein');
	}
	// Otherwise, load their fiddles
	else {
		// Make the asynchronous AJAX call
		Spark.ajax('GET', 'http://jsfiddle.net/api/user/' + localStorage['username'] + '/demo/list.json', 'limit=100', function(json) {
			// Set up the variables
			var built = '';
			var revision = '';
			
			// Decode the JSON retrieved by the API
			var list = Spark.json('decode', json);
			
			// Loop through all of the fiddles in the list
			for(var l in list) {
				// If there is a history show the latest one (this needs tweeking)
				if(list[l].version >= 1) {
					revision = ' (<a href="' + list[l].url + list[l].version + '/" target="_blank">Revision ' + list[l].version + '</a>)'
				}
				else {
					revision = '';
				}
				
				// Build the HTML string
				built += '<li><a href="' + list[l].url + '" target="_blank"><strong>' + list[l].title + revision + '</strong></a> - ' + list[l].description + '</li>';
			}
			
			// Drop the built HTML into the UL
			Spark('ul').content(built);
			
			// Fade the fiddles in
			Spark('div#viewFiddle').transition('fadein', 300);
		});
	}
	
	// Set up the transitions between editing and viewing fiddles
	Spark('a#openCreateFiddle').event('click', function() {
		Spark('div#viewFiddle').transition('fadeout', 300, function() {
			Spark('div#createFiddle').transition('fadein', 300);
		});
	});
	
	Spark('a#openViewFiddle').event('click', function() {
		Spark('div#createFiddle').transition('fadeout', 300, function() {
			Spark('div#viewFiddle').transition('fadein', 300);
		});
	});
});

// This function is run when the framework or dependencies are changed, it appends the forms action
function changeAction(framework, dependencies) {
	// So here we are appending the selected framework
	// If dependencies is not empty we append that too
	Spark('form').attribute({action: 'http://jsfiddle.net/api/post/' + framework + '/' + ((dependencies == '') ? '' : 'dependencies/' + dependencies + '/')});
}