# PaperTrail Linkificator Bookmarklet

PLB helps you to linkify URLs in PaperTrail logs.

The URLs can be escaped - eg.

	http:\/\/bit.ly\/123456
	http://bit.ly/123456

and bookmarklet creates a link like this:

	<a href="http://bit.ly/123456" target="_blank">http://bit.ly/123456</a>

The bookmarklet runs in a 5 second loop, so if you scroll up / down the log, the links would linkify automatically. If you do not want to wait 5 seconds, run the bookmarklet again.

# Installation

Copy and paste the bookmarklet.min.js content to the bookmarks URL.

# Requirements

Required jQuery, but PaperTrail has it.

# Browser Support

Tested in

  * Chrome 17
  * Firefox 7
  * IE 9