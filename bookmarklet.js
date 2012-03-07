(function (window) {

	// Regulars
	var urlEscapedExp = /(\b(http|https):(\\\/\\\/|\/\/)[-A-Z0-9+&@#\\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\\/%=~_|])/ig;
	var escapeExp = /\\/g;

	var parse = function() {

		// Every message LI
		$("li.event .message").each(
			function(index, elem) {
				var e = $(elem);

				// Do not process again
				if (jQuery.data(elem, "paperTrailLinkificatorProcessed")) {
					return true;
				}

				// Match and process
				var matches=e.html().match(urlEscapedExp);
				if (matches) {
					for(i=0; i < matches.length; i++) {
						var match = matches[i];
						var clearMatch = match.replace(escapeExp, "");
						e.html(e.html().replace(match,'<a href="' + clearMatch + '" target="_blank">' + clearMatch + '</a>'));
					}
				}

				// Mark as processed
				jQuery.data(elem, "paperTrailLinkificatorProcessed", true);
			}
		);
	};

	// Invoke immediatey
	parse();

	// Run periodically every 5 seconds, if not running
	if (!window.paperTrailLinkificatorBookmarkletRunning) {
		window.paperTrailLinkificatorBookmarkletRunning = true;
		window.setInterval(function(){
			parse();
		}, 5000);
	}
}(window));