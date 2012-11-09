<pre>
----------------------------------------------------
Loader.js : 0.4.2 : 2012/11/09
----------------------------------------------------
https://github.com/mudcube/Loader.js
----------------------------------------------------
/// Simple setup.
var loader = new widgets.Loader;

/// More complex setup.
var loader = new widgets.Loader({
	id: "loader",
	bars: 12,
	radius: 0,
	lineWidth: 20,
	lineHeight: 70,
	timeout: 30, // maximum timeout in seconds.
	background: "rgba(0,0,0,0.5)",
	container: document.body,
	oncomplete: function() {
		// call function once loader has completed
	},
	onstart: function() {
		// call function once loader has started	
	}
});

/// Add a new message to the queue.
var loaderId = loader.add({
	message: "test",
	getProgress: function() { // sends progress to loader.js
		return progress; // value between 1-100
	}
});

/// Remove a specific loader message.
loader.remove(loaderId); 

/// Recenter the loader within container (run onresize)
loader.center(); 

/// Stop all loader instances.
loader.stop(); 
</pre>