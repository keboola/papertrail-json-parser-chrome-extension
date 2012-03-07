// Viewport detection
// Taken from http://remysharp.com/2009/01/26/element-in-view-event-plugin/
// Source in http://remysharp.com/downloads/jquery.inview.js
$.extend($.expr[':'],{
    inView: function(a) {
        var st = (document.documentElement.scrollTop || document.body.scrollTop),
            ot = $(a).offset().top,
            wh = (window.innerHeight && window.innerHeight < $(window).height()) ? window.innerHeight : $(window).height();
        return ot > st && ($(a).height() + ot) < (st + wh);
    }
});
(function (window) {

	// Regulars
	var urlEscapedExp = /(\b(http|https):(\\\/\\\/|\/\/)[-A-Z0-9+&@#\\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\\/%=~_|])/ig;
	var escapeExp = /\\/g;

	var json2Html = function(json) {
		var html = "{<ul>";
		jQuery.each(json, function(key, value) {
			if (typeof value == "object") {
				value = json2Html(value);
			}
			html += "<li><strong>" + key + "</strong>: " + value + "</li>";
		});
		html += "</ul>}";
		return html;
	};

	var parse = function() {
		// Detect position
		var position = "bottom";
		var container;
		if ($.browser.webkit) {
			container = $("body")
		} else {
			container = $("html")
		}
		if (Math.abs(container.scrollTop() + $(window).height() - $("body").height()) > 1) {
			position = "middle";
		}

		// Get first element in viewport
		var scrollTo = $(".message:inView:first").parent();
		var changed = false;

		// Every message LI
		$("li.event .message").each(
			function(index, elem) {
				var e = $(elem);

				// Do not process again
				if (jQuery.data(elem, "paperTrailLinkificatorProcessed")) {
					return true;
				}

				// parse JSON
				try {
					var json = jQuery.parseJSON(e.html());
				} catch (err) {
					// No JSON
					// Do nothing, really
				}

				// JSON detected
				if (json) {
					changed = true;
					var message = json2Html(json);
					e.html(message);
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

		// If changed, scroll to desired position, 53px offset for top bar
		if (changed) {
			if (position == "bottom") {
				container.scrollTop($("body").height());
			} else {
				container.scrollTop(scrollTo.offset().top - 53);
			}
		}

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