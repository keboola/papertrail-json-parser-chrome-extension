# Papertrail JSON Parser

This Chrome Extension helps you to show JSON data in Papertrail in a nicer way.

The extension is bound to the Papertrail events, so if you scroll up / down the log, the JSON will be parsed automatically. 

## Installation

Grab the extension from [Chrome Web Store](https://chrome.google.com/webstore/detail/papertrail-json-parser/bccgamaeidlhnfodhdpkpekmbkoniofo).

## JSON formatting


JSON strings are parsed and formatted recursively into UL/LI combinations. JSON data can contain URLs.

	{key: "value", key2: "value2"}

is transformed to

	{
		key: value
		key2: value2
	}

## Linkification

The URLs can be escaped - eg.

	http:\/\/bit.ly\/123456
	http://bit.ly/123456

and bookmarklet creates a link like this:

	<a href="http://bit.ly/123456" target="_blank">http://bit.ly/123456</a>

## HTML Stripping

A Papertrail update in December 2016 started injecting HTML links into the logs. Before trying do parse JSON all HTML links are removed.
