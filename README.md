<pre>
Loader.js : 0.3 : 2012/04/12
----------------------------------------------------
https://github.com/mudcube/Loader.js
----------------------------------------------------
var loader = new widgets.Loader({ message: "loading: New loading message..." });
----------------------------------------------------
var loader = new widgets.Loader({
	id: "loader",
	bars: 12,
	radius: 0,
	lineWidth: 20,
	lineHeight: 70,
	background: "rgba(0,0,0,0.5)",
	message: "loading...",
	callback: function() {
		// call function once loader has started	
	}
});
loader.stop();	
----------------------------------------------------
loader.message("loading: New loading message...", function() {
	// call function once loader has started	
});
</pre>