<pre>
----------------------------------------------------
Loader.js : 0.4.2 : 2012/11/09
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
	timeout: 30, // maximum timeout in seconds.
	background: "rgba(0,0,0,0.5)",
	container: document.body,
	message: "loading...",
	oncomplete: function() {
		// call function once loader has completed
	},
	onstart: function() {
		// call function once loader has started	
	}
});
loader.remove();
----------------------------------------------------
loader.message("loading: New loading message...", function() {
	// call function once loader has started	
});
</pre>