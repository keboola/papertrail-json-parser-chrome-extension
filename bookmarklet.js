javascript: (function () {
var hrefExp = /(\bhttp:\\\/\\\/[-A-Z0-9+&@#\\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\\/%=~_|])/ig;
var escapeExp = /\\/g;
$("li.event .message").each(
	function(index, elem) {
	    var e = $(elem);
	    var matches=e.html().match(hrefExp);
	    if (matches) {
			for(i=0; i < matches.length; i++) {
			    var match = matches[i];
			    var clearMatch = match.replace(escapeExp, "");
			    e.html(e.html().replace(match,'<a href="' + clearMatch + '" target="_blank">' + clearMatch + '</a>'));
			}
		}
	}
)}());