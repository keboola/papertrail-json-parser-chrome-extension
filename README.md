# PaperTrail Linkificator Bookmarklet

This boormarklet helps you to create link from URLs in PaperTrail logs and to display formatted JSON data in logs.

The bookmarklet is bound to the PaperTrail events, so if you scroll up / down the log, the links would linkify automatically. If you do not want to wait 5 seconds, run the bookmarklet again.

## Linkification

The URLs can be escaped - eg.

	http:\/\/bit.ly\/123456
	http://bit.ly/123456

and bookmarklet creates a link like this:

	<a href="http://bit.ly/123456" target="_blank">http://bit.ly/123456</a>

## JSON formatting


JSON strings are parsed and formatted recursively into UL/LI combinations. JSON data can contain URLs.

	{key: "value", key2: "value2"}

is transformed to

	{
		key: value
		key2: value2
	}


# Installation

Copy and paste the bookmarklet.min.js content to the bookmark's URL. You can also drag'n'drop this link to your bookmark bar:

<a href="javascript:var script=document.createElement("script");script.src="https://raw.github.com/keboola/PaperTrail-Linkificator-Bookmarklet/master/linkificator.min.js?rand="+Math.random();document.getElementsByTagName("head")[0].appendChild(script);">Make PT log nicer</a>

# Browser Support

Tested in

  * Chrome 17
  * Firefox 7
  * IE 9

# Chrome Extension

This bookmarklet can be used also as a Chrome Extension in Developer mode. You do not need to run the script, the logs are formatted automatically. This extension as an PT icon, so that you can deactivate it in case it is doing something wrong.

Installation instructions:

http://code.google.com/chrome/extensions/getstarted.html#load