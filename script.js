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

	var replaceUrls = function(str) {
		// Match and process
		if (typeof str == 'string') {
			var matches = str.match(urlEscapedExp);
			if (matches) {
				for(i=0; i < matches.length; i++) {
					var match = matches[i];
					var clearMatch = match.replace(escapeExp, "");
					str = str.replace(match, '<a href="' + clearMatch + '" target="_blank">' + clearMatch + '</a>');
				}
			}		
		}
		return str;
	};

	var json2Html = function(json) {
		var html = "{<ul>";
		jQuery.each(json, function(key, value) {
			if (typeof value == "object" && value != null) {
				value = json2Html(value);
			} else {
				value = replaceUrls(value)
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
		container = $("body")
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
				if (jQuery.data(elem, "paperTrailJSONParserProcessed")) {
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

				// Mark as processed
				jQuery.data(elem, "paperTrailJSONParserProcessed", true);

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

	// Setup autoupdates
	if (!window.paperTrailJSONParserRunning) {
		window.paperTrailJSONParserRunning = true;
		$("#event_list").bind("papertrail:eventsLoaded", function(){
			parse();
		});
	}

}(window));

