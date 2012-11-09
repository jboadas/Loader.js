/* 
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
*/

if (typeof (widgets) === "undefined") var widgets = {};

(function() { "use strict";

var PI = Math.PI;
var noCanvas = !document.createElement("canvas").getContext;
var defaultConfig = {
	id: "loader",
	bars: 12,
	radius: 0,
	lineWidth: 20,
	lineHeight: 70,
	timeout: 0,
	display: true
};

var getWindowSize = function (element) {
	if (window.innerWidth && window.innerHeight) {
		var width = window.innerWidth;
		var height = window.innerHeight;
	} else if (document.compatMode === "CSS1Compat" && document.documentElement && document.documentElement.offsetWidth) {
		var width = document.documentElement.offsetWidth;
		var height = document.documentElement.offsetHeight;
	} else if (document.body && document.body.offsetWidth) {
		var width = document.body.offsetWidth;
		var height = document.body.offsetHeight;
	}
	if (element) {
		var width = element.offsetWidth;
	}
	return {
		width: width,
		height: height
	};
};

widgets.Loader = function (configure) {
	if (noCanvas) return;
	var that = this;
	if (typeof (configure) === "string") configure = { message: configure };
	if (typeof (configure) === "boolean") configure = { display: false };
	if (typeof (configure) === "undefined") configure = {};
	configure.container = configure.container || document.body;
	if (!configure.container) return;

	/// Mixin the default configurations.
	for (var key in defaultConfig) {
		if (typeof (configure[key]) === "undefined") {
			configure[key] = defaultConfig[key];
		}
	}

	/// Setup element
	var canvas = document.getElementById(configure.id);
	var timeout = 1;
	if (!canvas) {
		var div = document.createElement("div");
		var span = document.createElement("span");
		span.className = "message";
		div.appendChild(span);
		div.className = defaultConfig.id;
		that.span = span;
		that.div = div;
		var canvas = document.createElement("canvas");
		document.body.appendChild(canvas);
		canvas.id = configure.id;
		canvas.style.cssText = "opacity: 1; position: absolute; z-index: 10000;";
		div.appendChild(canvas);
		configure.container.appendChild(div);
	} else {
		that.span = canvas.parentNode.getElementsByTagName("span")[0];
	}

	/// Configure
	var delay = configure.delay;
	var bars = configure.bars;
	var radius = configure.radius;
	var max = configure.lineHeight + 20;
	var size = max * 2 + configure.radius * 2;
	var windowSize = getWindowSize(configure.container);
	var width = windowSize.width - size;
	var height = windowSize.height - size;
	///
	canvas.width = size;
	canvas.height = size;
	///
	var iteration = 0;
	var ctx = canvas.getContext("2d");
	ctx.globalCompositeOperation = "lighter";
	ctx.shadowOffsetX = 1;
	ctx.shadowOffsetY = 1;
	ctx.shadowBlur = 1;
	ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

	/// Public functions.
	this.messages = [];
	this.message = function (message, onstart) {
		if (!this.interval) return this.start(onstart, message);
		return this.add({
			message: message, 
			onstart: onstart
		});
	};
	this.add = function (conf) {
		var background = configure.background ? configure.background : "rgba(0,0,0,0.65)";
		this.span.style.cssText = "background: " + background + ";";
		this.div.style.cssText = "-webkit-transition-duration: " + timeout + "s;";
		if (this.stopPropagation) {
			this.div.style.cssText += "background: rgba(0,0,0,0.25);";
		} else {
			this.div.style.cssText += "pointer-events: none;";
		}
		///
		var windowSize = getWindowSize(configure.container);
		var width = windowSize.width - size;
		var height = windowSize.height - size;
		canvas.parentNode.style.opacity = 1;
		canvas.parentNode.style.display = "block";
		if (configure.background) this.div.style.background = configure.backgrond;
		canvas.style.left = (width / 2) + "px";
		canvas.style.top = (height / 2) + "px";
		///
		var timestamp = (new Date()).getTime();
		var seed = timestamp * Math.random() >> 0;
		var message = conf.message;
		///
		var container = document.createElement("div");
		container.style.cssText = "-webkit-transition-duration: 650ms";
		var span = document.createElement("span");
		span.style.cssText = "float: right";
		var node = document.createElement("span");
		node.innerHTML = message;
		///
		container.appendChild(node);
		container.appendChild(span);
		///
		var item = {
			id: this.messages.length,
			seed: seed,
			container: container,
			element: node,
			span: span,
			message: message,
			timeout: (conf.timeout || configure.timeout) * 1000,
			timestamp: timestamp,
			getProgress: conf.getProgress
		};
		this.messages.push(item);
		this.span.appendChild(container);
		this.span.style.display = "block";
		///
		if (message.substr(-3) === "...") { // animated dots
			item._message = message.substr(0, message.length - 3);
			item.messageAnimate = [".&nbsp;&nbsp;", "..&nbsp;", "..."].reverse();
		} else { // normal
			item._message = message;
			item.messageAnimate = false;
		}
		if (conf.onstart) {
			window.setTimeout(conf.onstart, 50);
		}
		///
		if (!conf.delay) renderAnimation();
		window.clearInterval(this.interval);
		this.interval = window.setInterval(renderAnimation, 30);
		///
		return seed;
	};
	
	this.remove = function (seed) {
		if (typeof(seed) === "object") seed = seed.join(":");
		if (seed) seed = ":" + seed + ":";
		var messages = [];
		/// Remove element.
		for (var n = 0, length = this.messages.length; n < length; n ++) {
			var item = this.messages[n];
			if (!seed || seed.indexOf(":" + item.seed + ":") !== -1) {
				delete this.messages[item.id];
				item.container.style.opacity = 0;
				item.container.style.color = "#99ff88";
				window.setTimeout(removeChild(item), 650)
				if (item.getProgress) item.span.innerHTML = "100%";
			} else {
				messages.push(item);
			}
		}
		/// Update the array indexes.
		this.messages = messages;
	};
	this.start = function (onstart, message) {
		if (!(message || configure.message)) return;
		return this.add({
			message: message || configure.message, 
			onstart: onstart
		});
	};
	this.stop = function () {
		this.remove();
		window.clearInterval(this.interval);
		delete this.interval;
		if (configure.oncomplete) configure.oncomplete();
		if (canvas && canvas.style) {
			div.style.cssText += "pointer-events: none;";
			canvas.parentNode.style.opacity = 0;
			window.setTimeout(function () {
				if (that.interval) return;
				that.stopPropagation = false;
				canvas.parentNode.style.display = "none";
				ctx.clearRect(0, 0, size, size);
			}, timeout * 1000);
		}
	};

	var style = document.createElement("style");
	style.innerHTML = '\
.loader { color: #fff; -webkit-transition-property: opacity; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 100000; opacity: 0; display: none; }\
.loader span.message { font-family: monospace; font-size: 14px; opacity: 1; display: none; border-radius: 10px; padding: 0px; width: 200px; text-align: center; position: absolute; z-index: 10000; }\
.loader span.message div { border-bottom: 1px solid #555; padding: 10px 10px; clear: both; text-align: left; opacity: 1; -webkit-transition-property: opacity; }\
.loader span.message div:last-child { border-bottom: none; }\
';
	document.head.appendChild(style);
	/// Private functions.
	var removeChild = function(item) {
		return function() {
			item.container.parentNode.removeChild(item.container);
		};
	};
	var renderAnimation = function () {
		var windowSize = getWindowSize(configure.container);
		var width = windowSize.width - size;
		var height = windowSize.height - size;
		/// Center the animation within the content.
		canvas.style.left = (width / 2) + "px";
		canvas.style.top = (height / 2) + "px";
		/// Center the message within the content.
		var timestamp = (new Date()).getTime();
		var windowSize = getWindowSize(configure.container);
		var width = windowSize.width - size;
		var height = windowSize.height - size;
		that.span.style.left = ((width + size) / 2 - that.span.offsetWidth / 2) + "px";
		that.span.style.top = (height / 2 + size - 10) + "px";
		if (that.messages.length) {
			for (var n = 0; n < that.messages.length; n ++) {
				var item = that.messages[n];
				var nid = iteration / 0.07 >> 0;
				if (item.timestamp && timestamp - item.timestamp > item.timeout) {
					return that.remove(item.seed);
				}
				if (item.getProgress) {
					var progress = item.getProgress();
					if (progress >= 100) return that.remove(item.seed);
					item.span.innerHTML = progress + "%";
				}
				if (nid % 10 === 0) {
					if (item.messageAnimate) {
							var length = item.messageAnimate.length;
							var n = nid / 10 % length;
							var text = item._message + item.messageAnimate[n];
							item.element.innerHTML = text;
					}
				}
			}
		} else {
			that.stop();
		}
		//
		ctx.save();
		ctx.clearRect(0, 0, size, size);
		ctx.translate(size / 2, size / 2);
		var hues = 360 - 360 / bars;
		for (var i = 0; i < bars; i++) {
			var angle = (i / bars * 2 * PI) + iteration;
			ctx.save();
			ctx.translate(radius * Math.sin(-angle), radius * Math.cos(-angle));
			ctx.rotate(angle);
			// round-rect properties
			var x = -configure.lineWidth / 2;
			var y = 0;
			var width = configure.lineWidth;
			var height = configure.lineHeight;
			var curve = width / 2;
			// round-rect path
			ctx.beginPath();
			ctx.moveTo(x + curve, y);
			ctx.lineTo(x + width - curve, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + curve);
			ctx.lineTo(x + width, y + height - curve);
			ctx.quadraticCurveTo(x + width, y + height, x + width - curve, y + height);
			ctx.lineTo(x + curve, y + height);
			ctx.quadraticCurveTo(x, y + height, x, y + height - curve);
			ctx.lineTo(x, y + curve);
			ctx.quadraticCurveTo(x, y, x + curve, y);
			// round-rect fill
			var hue = ((i / (bars - 1)) * hues);
			ctx.fillStyle = "hsla(" + hue + ", 100%, 50%, 0.85)";
			ctx.fill();
			ctx.restore();
		}
		ctx.restore();
		iteration += 0.07;
	};
	//
	if (configure.display === false) return this;
	//
	this.start();
	//
	return this;
};

})();