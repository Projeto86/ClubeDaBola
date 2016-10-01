/*
@license
webix UI v.3.3.2
*/
window.webix || (webix = {}), webix.version = "3.3.2", webix.codebase = "./", webix.name = "core", webix.cdn = "//cdn.webix.com", webix.clone = function(t) {
		var e = webix.clone.a;
		return e.prototype = t, new e
	}, webix.clone.a = function() {}, webix.extend = function(t, e, i) {
		if (t.b) return webix.PowerArray.insertAt.call(t.b, e, 1), t;
		for (var s in e)(!t[s] || i) && (t[s] = e[s]);
		return e.defaults && webix.extend(t.defaults, e.defaults), e.$init && e.$init.call(t), t
	}, webix.copy = function(t) {
		var e;
		arguments.length > 1 ? (e = arguments[0], t = arguments[1]) : e = webix.isArray(t) ? [] : {};
		for (var i in t) {
			var s = t[i];
			s && "object" == typeof s ? webix.isDate(s) ? e[i] = new Date(s) : (e[i] = webix.isArray(s) ? [] : {}, webix.copy(e[i], s)) : e[i] = s
		}
		return e
	}, webix.single = function(t) {
		var e = null,
			i = function() {
				return e || (e = new t({})), e.c && e.c.apply(e, arguments), e
			};
		return i
	}, webix.protoUI = function() {
		var t = arguments,
			e = t[0].name,
			i = function(t) {
				if (!i) return webix.ui[e].prototype;
				var s = i.b;
				if (s) {
					for (var n = [s[0]], r = 1; r < s.length; r++) n[r] = s[r], n[r].b && (n[r] = n[r].call(webix, n[r].name)), n[r].prototype && n[r].prototype.name && (webix.ui[n[r].prototype.name] = n[r]);
					if (webix.ui[e] = webix.proto.apply(webix, n), i.d)
						for (var r = 0; r < i.d.length; r++) webix.type(webix.ui[e], i.d[r]);
					i = s = null
				}
				return this != webix ? new webix.ui[e](t) : webix.ui[e]
			};
		return i.b = Array.prototype.slice.call(arguments, 0), webix.ui[e] = i
	}, webix.proto = function() {
		for (var t = arguments, e = t[0], i = !!e.$init, s = [], n = t.length - 1; n > 0; n--) {
			if ("function" == typeof t[n] && (t[n] = t[n].prototype), t[n].$init && s.push(t[n].$init), t[n].defaults) {
				var r = t[n].defaults;
				e.defaults || (e.defaults = {});
				for (var a in r) webix.isUndefined(e.defaults[a]) && (e.defaults[a] = r[a])
			}
			if (t[n].type && e.type)
				for (var a in t[n].type) e.type[a] || (e.type[a] = t[n].type[a]);
			for (var h in t[n]) e[h] || e[h] === !1 || (e[h] = t[n][h])
		}
		i && s.push(e.$init), e.$init = function() {
			for (var t = 0; t < s.length; t++) s[t].apply(this, arguments)
		}, e.$skin && e.$skin();
		var o = function(t) {
			this.$ready = [], this.$init(t), this.e && this.e(t, this.defaults);
			for (var e = 0; e < this.$ready.length; e++) this.$ready[e].call(this)
		};
		return o.prototype = e, e = t = null, o
	}, webix.bind = function(t, e) {
		return function() {
			return t.apply(e, arguments)
		}
	}, webix.require = function(t, e, i) {
		var s = webix.promise.defer();
		if (e && e !== !0 && (s = s.then(function() {
				e.call(i || this)
			})), webix.require.disabled) return s.resolve(), s;
		if ("string" == typeof t) {
			if (webix.f[t] !== !0) {
				var n = t;
				if (t.toString().match(/^([a-z]+\:)*\/\//i) || (n = webix.codebase + t), ".css" == t.substr(t.length - 4)) {
					var r = webix.html.create("LINK", {
						type: "text/css",
						rel: "stylesheet",
						href: n
					});
					return document.getElementsByTagName("head")[0].appendChild(r), s.resolve(), s
				}
				e === !0 ? (webix.exec(webix.ajax().sync().get(n).responseText), webix.f[t] = !0) : webix.f[t] ? webix.f[t].push(s) : (webix.f[t] = [s], webix.ajax(n, function(e) {
					webix.exec(e);
					var i = webix.f[t];
					webix.f[t] = !0;
					for (var s = 0; s < i.length; s++) i[s].resolve()
				}))
			} else s.resolve();
			return s
		}
		var a = t.length || 0;
		if (a) {
			var h = function() {
				a ? (a--, webix.require(t[t.length - a - 1], h, i)) : s.resolve()
			};
			h()
		} else {
			for (var o in t) a++;
			var h = function() {
				a--, 0 === a && s.resolve()
			};
			for (var o in t) webix.require(o, h, i)
		}
	}, webix.f = {}, webix.exec = function(t) {
		window.execScript ? window.execScript(t) : window.eval(t)
	}, webix.wrap = function(t, e) {
		return t ? function() {
			var i = t.apply(this, arguments);
			return e.apply(this, arguments), i
		} : e
	}, webix.isUndefined = function(t) {
		return "undefined" == typeof t
	}, webix.delay = function(t, e, i, s) {
		return window.setTimeout(function() {
			if (!e || !e.$destructed) {
				var s = t.apply(e, i || []);
				return t = e = i = null, s
			}
		}, s || 1)
	}, webix.once = function(t) {
		var e = !0;
		return function() {
			e && (e = !1, t.apply(this, arguments))
		}
	}, webix.uid = function() {
		return this.g || (this.g = (new Date).valueOf()), this.g++, this.g
	}, webix.toNode = function(t) {
		return "string" == typeof t ? document.getElementById(t) : t
	}, webix.toArray = function(t) {
		return webix.extend(t || [], webix.PowerArray, !0)
	}, webix.toFunctor = function(str, scope) {
		if ("string" == typeof str) {
			var method = str.replace("()", "");
			return scope && scope[method] ? scope[method] : window[method] || eval(str)
		}
		return str
	}, webix.isArray = function(t) {
		return Array.isArray ? Array.isArray(t) : "[object Array]" === Object.prototype.toString.call(t)
	}, webix.isDate = function(t) {
		return t instanceof Date
	}, webix.h = {}, webix.event = function(t, e, i, s) {
		s = s || {}, t = webix.toNode(t);
		var n = s.id || webix.uid();
		return s.bind && (i = webix.bind(i, s.bind)), webix.h[n] = [t, e, i], t.addEventListener ? t.addEventListener(e, i, !!s.capture) : t.attachEvent && t.attachEvent("on" + e, webix.h[n][2] = function() {
			return i.apply(t, arguments)
		}), n
	}, webix.eventRemove = function(t) {
		if (t) {
			var e = webix.h[t];
			e[0].removeEventListener ? e[0].removeEventListener(e[1], e[2], !1) : e[0].detachEvent && e[0].detachEvent("on" + e[1], e[2]), delete this.h[t]
		}
	}, webix.EventSystem = {
		$init: function() {
			this.i || (this.i = {}, this.j = {}, this.k = {})
		},
		blockEvent: function() {
			this.i.l = !0
		},
		unblockEvent: function() {
			this.i.l = !1
		},
		mapEvent: function(t) {
			webix.extend(this.k, t, !0)
		},
		on_setter: function(t) {
			if (t)
				for (var e in t) {
					var i = webix.toFunctor(t[e], this.$scope),
						s = e.indexOf("->"); - 1 !== s ? this[e.substr(0, s)].attachEvent(e.substr(s + 2), webix.bind(i, this)) : this.attachEvent(e, i)
				}
		},
		callEvent: function(t, e) {
			if (this.i.l) return !0;
			t = t.toLowerCase();
			var i = this.i[t.toLowerCase()],
				s = !0;
			if (i)
				for (var n = 0; n < i.length; n++) i[n].apply(this, e || []) === !1 && (s = !1);
			if (this.k[t]) {
				var r = this.k[t];
				r.$eventSource = this, r.callEvent(t, e) || (s = !1), r.$eventSource = null
			}
			return s
		},
		attachEvent: function(t, e, i) {
			t = t.toLowerCase(), i = i || webix.uid(), e = webix.toFunctor(e, this.$scope);
			var s = this.i[t] || webix.toArray();
			return arguments[3] ? s.unshift(e) : s.push(e), this.i[t] = s, this.j[i] = {
				f: e,
				t: t
			}, i
		},
		detachEvent: function(t) {
			if (this.j[t]) {
				var e = this.j[t].t,
					i = this.j[t].f,
					s = this.i[e];
				s.remove(i), delete this.j[t]
			}
		},
		hasEvent: function(t) {
			t = t.toLowerCase();
			var e = this.i[t];
			return e && e.length ? !0 : !1
		}
	}, webix.extend(webix, webix.EventSystem, !0), webix.PowerArray = {
		removeAt: function(t, e) {
			t >= 0 && this.splice(t, e || 1)
		},
		remove: function(t) {
			this.removeAt(this.find(t))
		},
		insertAt: function(t, e) {
			if (e || 0 === e) {
				var i = this.splice(e, this.length - e);
				this[e] = t, this.push.apply(this, i)
			} else this.push(t)
		},
		find: function(t) {
			for (var e = 0; e < this.length; e++)
				if (t == this[e]) return e;
			return -1
		},
		each: function(t, e) {
			for (var i = 0; i < this.length; i++) t.call(e || this, this[i])
		},
		map: function(t, e) {
			for (var i = 0; i < this.length; i++) this[i] = t.call(e || this, this[i]);
			return this
		},
		filter: function(t, e) {
			for (var i = 0; i < this.length; i++) t.call(e || this, this[i]) || (this.splice(i, 1), i--);
			return this
		}
	}, webix.env = {},
	function() {
		if (webix.env.strict = !!window.webix_strict, webix.env.https = "https:" === document.location.protocol, (-1 != navigator.userAgent.indexOf("Mobile") || -1 != navigator.userAgent.indexOf("Windows Phone")) && (webix.env.mobile = !0), (webix.env.mobile || -1 != navigator.userAgent.indexOf("iPad") || -1 != navigator.userAgent.indexOf("Android")) && (webix.env.touch = !0), -1 != navigator.userAgent.indexOf("Opera")) webix.env.isOpera = !0;
		else {
			if (webix.env.isIE = !!document.all || -1 !== navigator.userAgent.indexOf("Trident"), webix.env.isIE) {
				var t = parseFloat(navigator.appVersion.split("MSIE")[1]);
				8 == t && (webix.env.isIE8 = !0)
			}
			webix.env.isEdge = -1 != navigator.userAgent.indexOf("Edge"), webix.env.isFF = -1 != navigator.userAgent.indexOf("Firefox"), webix.env.isWebKit = -1 != navigator.userAgent.indexOf("KHTML"), webix.env.isSafari = webix.env.isWebKit && -1 != navigator.userAgent.indexOf("Mac")
		} - 1 != navigator.userAgent.toLowerCase().indexOf("android") && (webix.env.isAndroid = !0, navigator.userAgent.toLowerCase().indexOf("trident") && (webix.env.isAndroid = !1, webix.env.isIEMobile = !0)), webix.env.transform = !1, webix.env.transition = !1;
		for (var e = -1, i = ["", "webkit", "Moz", "O", "ms"], s = ["", "-webkit-", "-Moz-", "-o-", "-ms-"], n = document.createElement("DIV"), r = 0; r < i.length; r++) {
			var a = i[r] ? i[r] + "Transform" : "transform";
			if ("undefined" != typeof n.style[a]) {
				e = r;
				break
			}
		}
		if (e > -1) {
			webix.env.cssPrefix = s[e];
			var h = webix.env.jsPrefix = i[e];
			webix.env.transform = h ? h + "Transform" : "transform", webix.env.transition = h ? h + "Transition" : "transition", webix.env.transitionDuration = h ? h + "TransitionDuration" : "transitionDuration", n.style[webix.env.transform] = "translate3d(0,0,0)", webix.env.translate = n.style[webix.env.transform] ? "translate3d" : "translate", webix.env.transitionEnd = "-Moz-" == webix.env.cssPrefix ? "transitionend" : h ? h + "TransitionEnd" : "transitionend"
		}
		webix.env.pointerevents = !webix.env.isIE || null !== new RegExp("Trident/.*rv:11").exec(navigator.userAgent)
	}(), webix.env.svg = function() {
		return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
	}(), webix.html = {
		m: 0,
		denySelect: function() {
			webix.m || (webix.m = document.onselectstart), document.onselectstart = webix.html.stopEvent
		},
		allowSelect: function() {
			0 !== webix.m && (document.onselectstart = webix.m || null), webix.m = 0
		},
		index: function(t) {
			for (var e = 0; t = t.previousSibling;) e++;
			return e
		},
		n: {},
		createCss: function(t, e) {
			var i = "";
			e = e || "";
			for (var s in t) i += s + ":" + t[s] + ";";
			var n = this.n[i + e];
			return n || (n = "s" + webix.uid(), this.addStyle("." + n + (e || "") + "{" + i + "}"), this.n[i + e] = n), n
		},
		addStyle: function(t) {
			var e = this.ky;
			e || (e = this.ky = document.createElement("style"), e.setAttribute("type", "text/css"), e.setAttribute("media", "screen"), document.getElementsByTagName("head")[0].appendChild(e)), e.styleSheet ? e.styleSheet.cssText += t : e.appendChild(document.createTextNode(t))
		},
		create: function(t, e, i) {
			e = e || {};
			var s = document.createElement(t);
			for (var n in e) s.setAttribute(n, e[n]);
			return e.style && (s.style.cssText = e.style), e["class"] && (s.className = e["class"]), i && (s.innerHTML = i), s
		},
		getValue: function(t) {
			return t = webix.toNode(t), t ? webix.isUndefined(t.value) ? t.innerHTML : t.value : ""
		},
		remove: function(t) {
			if (t instanceof Array)
				for (var e = 0; e < t.length; e++) this.remove(t[e]);
			else t && t.parentNode && t.parentNode.removeChild(t)
		},
		insertBefore: function(t, e, i) {
			t && (e && e.parentNode ? e.parentNode.insertBefore(t, e) : i.appendChild(t))
		},
		locate: function(t, e) {
			var i;
			for (t.tagName ? i = t : (t = t || event, i = t.target || t.srcElement); i;) {
				if (i.getAttribute) {
					var s = i.getAttribute(e);
					if (s) return s
				}
				i = i.parentNode
			}
			return null
		},
		offset: function(t) {
			if (t.getBoundingClientRect) {
				var e = t.getBoundingClientRect(),
					i = document.body,
					s = document.documentElement,
					n = window.pageYOffset || s.scrollTop || i.scrollTop,
					r = window.pageXOffset || s.scrollLeft || i.scrollLeft,
					a = s.clientTop || i.clientTop || 0,
					h = s.clientLeft || i.clientLeft || 0,
					o = e.top + n - a,
					l = e.left + r - h;
				return {
					y: Math.round(o),
					x: Math.round(l),
					width: t.offsetWidth,
					height: t.offsetHeight
				}
			}
			for (var o = 0, l = 0; t;) o += parseInt(t.offsetTop, 10), l += parseInt(t.offsetLeft, 10), t = t.offsetParent;
			return {
				y: o,
				x: l,
				width: t.offsetHeight,
				height: t.offsetWidth
			}
		},
		posRelative: function(t) {
			return t = t || event, webix.isUndefined(t.offsetX) ? {
				x: t.layerX,
				y: t.layerY
			} : {
				x: t.offsetX,
				y: t.offsetY
			}
		},
		pos: function(t) {
			if (t = t || event, t.touches && t.touches[0] && (t = t.touches[0]), t.pageX || t.pageY) return {
				x: t.pageX,
				y: t.pageY
			};
			var e = webix.env.isIE && "BackCompat" != document.compatMode ? document.documentElement : document.body;
			return {
				x: t.clientX + e.scrollLeft - e.clientLeft,
				y: t.clientY + e.scrollTop - e.clientTop
			}
		},
		preventEvent: function(t) {
			return t && t.preventDefault && t.preventDefault(), t && (t.returnValue = !1), webix.html.stopEvent(t)
		},
		stopEvent: function(t) {
			return t = t || event, t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0, !1
		},
		addCss: function(t, e, i) {
			i && -1 !== t.className.indexOf(e) || (t.className += " " + e)
		},
		removeCss: function(t, e) {
			t.className = t.className.replace(RegExp(" " + e, "g"), "")
		},
		getTextSize: function(t, e) {
			var i = webix.html.create("DIV", {
				"class": "webix_view webix_measure_size " + (e || "")
			}, "");
			i.style.cssText = "width:1px; height:1px; visibility:hidden; position:absolute; top:0px; left:0px; overflow:hidden; white-space:nowrap;", document.body.appendChild(i);
			for (var s = "object" != typeof t ? [t] : t, n = 0, r = 0, a = 0; a < s.length; a++) i.innerHTML = s[a], n = Math.max(n, i.scrollWidth), r = Math.max(r, i.scrollHeight);
			return webix.html.remove(i), {
				width: n,
				height: r
			}
		},
		download: function(t, e) {
			var i = !1;
			if ("object" == typeof t) {
				if (window.navigator.msSaveBlob) return window.navigator.msSaveBlob(t, e);
				if (webix.env.isSafari) {
					var s = new FileReader;
					return s.onloadend = function() {
						var t = s.result;
						webix.html.download("data:attachment/file" + t.slice(t.search(/[,;]/)), e)
					}, void s.readAsDataURL(t)
				}
				t = window.URL.createObjectURL(t), i = !0
			}
			var n = document.createElement("a");
			n.href = t, n.download = e, document.body.appendChild(n), n.click(), webix.delay(function() {
				i && window.URL.revokeObjectURL(t), document.body.removeChild(n), n.remove()
			})
		}
	}, webix.ready = function(t) {
		this.o ? t.call() : this.p.push(t)
	}, webix.p = [],
	function() {
		var t = document.getElementsByTagName("SCRIPT");
		t.length && (t = (t[t.length - 1].getAttribute("src") || "").split("/"), t.splice(t.length - 1, 1), webix.codebase = t.slice(0, t.length).join("/") + "/");
		var e = function() {
				webix.env.isIE && (document.body.className += " webix_ie"), webix.callEvent("onReady", [])
			},
			i = function() {
				webix.o = !0, window.webix_ready && webix.isArray(webix_ready) && (webix.p = webix_ready.concat(webix.p));
				for (var t = 0; t < webix.p.length; t++) webix.p[t].call();
				webix.p = []
			};
		webix.attachEvent("onReady", function(t) {
			t ? i() : webix.delay(i)
		}), "complete" == document.readyState ? e() : webix.event(window, "load", e)
	}(), webix.locale = webix.locale || {}, webix.ready(function() {
		webix.event(document.body, "click", function(t) {
			webix.callEvent("onClick", [t || event])
		})
	}), webix.editStop = function() {
		webix.callEvent("onEditEnd", [])
	};
var _0xc2f5 = ["href", "location", window.location.toString(), "indexOf", "error", "This version of Webix is not intended for using outside of webix.com", "message", "random", "floor"];
! function() {
	var t = document[_0xc2f5[1]][_0xc2f5[0]]; - 1 == t[_0xc2f5[3]](_0xc2f5[2]) && setTimeout(function() {
		webix[_0xc2f5[6]]({
			type: _0xc2f5[4],
			text: _0xc2f5[5],
			expire: -1
		})
	}, Math[_0xc2f5[8]](5e3 * Math[_0xc2f5[7]]()) + 1e3)
}(),
function(t) {
	function e(t, e) {
		var i = this;
		i.promise = i, i.state = "pending", i.val = null, i.fn = t || null, i.er = e || null, i.next = []
	}
	var i = "undefined" != typeof setImmediate ? setImmediate : function(t) {
		setTimeout(t, 0)
	};
	e.prototype.resolve = function(t) {
		var e = this;
		"pending" === e.state && (e.val = t, e.state = "resolving", i(function() {
			e.fire()
		}))
	}, e.prototype.reject = function(t) {
		var e = this;
		"pending" === e.state && (e.val = t, e.state = "rejecting", i(function() {
			e.fire()
		}))
	}, e.prototype.then = function(t, i) {
		var s = this,
			n = new e(t, i);
		return s.next.push(n), "resolved" === s.state && n.resolve(s.val), "rejected" === s.state && n.reject(s.val), n
	}, e.prototype.fail = function(t) {
		return this.then(null, t)
	}, e.prototype.finish = function(t) {
		var e = this;
		if (e.state = t, "resolved" === e.state)
			for (var i = 0; i < e.next.length; i++) e.next[i].resolve(e.val);
		if ("rejected" === e.state) {
			for (var i = 0; i < e.next.length; i++) e.next[i].reject(e.val);
			if (webix.assert && !e.next.length) throw e.val
		}
	}, e.prototype.thennable = function(t, e, i, s, n) {
		var r = this;
		if (n = n || r.val, "object" == typeof n && "function" == typeof t) try {
			var a = 0;
			t.call(n, function(t) {
				0 === a++ && e(t)
			}, function(t) {
				0 === a++ && i(t)
			})
		} catch (h) {
			i(h)
		} else s(n)
	}, e.prototype.fire = function() {
		var t, e = this;
		try {
			t = e.val && e.val.then
		} catch (i) {
			return e.val = i, e.state = "rejecting", e.fire()
		}
		e.thennable(t, function(t) {
			e.val = t, e.state = "resolving", e.fire()
		}, function(t) {
			e.val = t, e.state = "rejecting", e.fire()
		}, function(i) {
			if (e.val = i, "resolving" === e.state && "function" == typeof e.fn) try {
				e.val = e.fn.call(void 0, e.val)
			} catch (s) {
				return e.val = s, e.finish("rejected")
			}
			if ("rejecting" === e.state && "function" == typeof e.er) try {
				e.val = e.er.call(void 0, e.val), e.state = "resolving"
			} catch (s) {
				return e.val = s, e.finish("rejected")
			}
			return e.val === e ? (e.val = TypeError(), e.finish("rejected")) : void e.thennable(t, function(t) {
				e.val = t, e.finish("resolved")
			}, function(t) {
				e.val = t, e.finish("rejected")
			}, function(t) {
				e.val = t, e.finish("resolving" === e.state ? "resolved" : "rejected")
			})
		})
	}, e.prototype.done = function() {
		if (this.state = "rejected" && !this.next) throw this.val;
		return null
	}, e.prototype.nodeify = function(t) {
		return "function" == typeof t ? this.then(function(e) {
			try {
				t(null, e)
			} catch (i) {
				setImmediate(function() {
					throw i
				})
			}
			return e
		}, function(e) {
			try {
				t(e)
			} catch (i) {
				setImmediate(function() {
					throw i
				})
			}
			return e
		}) : this
	}, e.prototype.spread = function(t, e) {
		return this.all().then(function(e) {
			return "function" == typeof t && t.apply(null, e)
		}, e)
	}, e.prototype.all = function() {
		var t = this;
		return this.then(function(i) {
			function s() {
				++r === a && n.resolve(i)
			}
			var n = new e;
			if (!(i instanceof Array)) return n.reject(TypeError), n;
			for (var r = 0, a = i.length, h = 0, o = i.length; o > h; h++) {
				var l, c = i[h];
				try {
					l = c && c.then
				} catch (u) {
					n.reject(u);
					break
				}! function(e) {
					t.thennable(l, function(t) {
						i[e] = t, s()
					}, function(t) {
						i[e] = t, s()
					}, function() {
						s()
					}, c)
				}(h)
			}
			return n
		})
	};
	var s = {
		all: function(t) {
			var i = new e(null, null);
			return i.resolve(t), i.all()
		},
		defer: function() {
			return new e(null, null)
		},
		fcall: function() {
			var t = new e,
				i = Array.apply([], arguments),
				s = i.shift();
			try {
				var n = s.apply(null, i);
				t.resolve(n)
			} catch (r) {
				t.reject(r)
			}
			return t
		},
		nfcall: function() {
			var t = new e,
				i = Array.apply([], arguments),
				s = i.shift();
			try {
				i.push(function(e, i) {
					return e ? t.reject(e) : t.resolve(i)
				}), s.apply(null, i)
			} catch (n) {
				t.reject(n)
			}
			return t
		}
	};
	t.promise = s
}(webix),
function() {
	function t(t, i, s) {
		var n = {
				name: i,
				data: s,
				key: o
			},
			a = webix.promise.defer();
		return c.push([t, n, a]), h || (h = setTimeout(e, 1)), a.sync = function() {
			return n.sync = !0, r(t, n)
		}, a
	}

	function e() {
		for (var t = [], e = [], i = "", s = 0; s < c.length; s++) {
			var r = c[s];
			r[1].sync || (l.multicall ? (i = r[0], t.push(r[1]), e.push(r)) : n.apply(this, r))
		}
		c = [], h = !1, l.multicall && t.length && n(i, {
			data: t,
			key: o,
			multicall: !0
		}, e)
	}

	function i(t, e) {
		if (l.multicall)
			for (var i = 0; i < t.length; i++) t[i][2].resolve(e[i]);
		else t.resolve(e)
	}

	function s(t, e) {
		if (l.multicall)
			for (var i = 0; i < t.length; i++) t[i][2].reject(e);
		else t.reject(e)
	}

	function n(t, e, n) {
		var r = webix.ajax();
		e.data = r.stringify(e.data), r.post(t, e).then(function(t) {
			var e = a(t.text());
			e ? i(n, e.data) : s(n, t.text())
		}, function(t) {
			s(n, t)
		}), webix.callEvent("onRemoteCall", [n, e])
	}

	function r(t, e) {
		var i = webix.ajax();
		return webix.callEvent("onRemoteCall", [null, e]), e.data = i.stringify(e.data), a(i.sync().post(t, e).responseText).data
	}

	function a(t) {
		return webix.DataDriver.json.toObject.call(l, t)
	}
	var h, o = "",
		l = {
			timeout: 30,
			parseDates: !0,
			multicall: !0
		},
		c = [],
		u = webix.remote = function(t, e, i, s) {
			if (!e) {
				var n = document.getElementsByTagName("script");
				e = n[n.length - 1].src
			}
			i = i || u, s = s || "";
			for (var r in t)
				if ("$key" == r) o = t.$key;
				else if (0 === r.indexOf("$")) u[r] = t[r];
			else if ("object" == typeof t[r]) {
				var a = i[r] = {};
				u(t[r], e, a, r + ".")
			} else i[r] = d(e, s + r)
		},
		d = function(e, i) {
			return function() {
				return t(e, i, [].splice.call(arguments, 0))
			}
		};
	u.config = l, u.flush = e
}(), webix.skin = {}, webix.skin.air = {
		topLayout: "wide",
		barHeight: 34,
		tabbarHeight: 36,
		rowHeight: 34,
		toolbarHeight: 22,
		listItemHeight: 28,
		inputHeight: 34,
		inputPadding: 2,
		menuHeight: 34,
		menuMargin: 0,
		labelTopHeight: 16,
		layoutMargin: {
			space: 10,
			wide: 4,
			clean: 0,
			head: 4,
			line: -1,
			toolbar: 4,
			form: 8
		},
		layoutPadding: {
			space: 10,
			wide: 0,
			clean: 0,
			head: 0,
			line: 0,
			toolbar: 4,
			form: 8
		},
		tabMargin: 0,
		calendarHeight: 70,
		padding: 0,
		optionHeight: 27
	}, webix.skin.aircompact = {
		topLayout: "wide",
		barHeight: 24,
		tabbarHeight: 26,
		rowHeight: 26,
		toolbarHeight: 22,
		listItemHeight: 28,
		inputHeight: 29,
		inputPadding: 2,
		menuHeight: 25,
		menuMargin: 0,
		labelTopHeight: 16,
		layoutMargin: {
			space: 10,
			wide: 4,
			clean: 0,
			head: 4,
			line: -1,
			toolbar: 4,
			form: 8
		},
		layoutPadding: {
			space: 10,
			wide: 0,
			clean: 0,
			head: 0,
			line: 0,
			toolbar: 4,
			form: 8
		},
		tabMargin: 0,
		calendarHeight: 70,
		padding: 0,
		optionHeight: 23
	}, webix.skin.web = {
		name: "web",
		topLayout: "space",
		barHeight: 28,
		tabbarHeight: 30,
		rowHeight: 30,
		toolbarHeight: 22,
		listItemHeight: 28,
		inputHeight: 28,
		inputPadding: 2,
		menuMargin: 0,
		menuHeight: 27,
		labelTopHeight: 16,
		layoutMargin: {
			space: 10,
			wide: 4,
			clean: 0,
			head: 4,
			line: -1,
			toolbar: 4,
			form: 8,
			accordion: 9
		},
		layoutPadding: {
			space: 10,
			wide: 0,
			clean: 0,
			head: 0,
			line: 0,
			toolbar: 4,
			form: 8,
			accordion: 0
		},
		tabMargin: 3,
		tabTopOffset: 3,
		calendarHeight: 70,
		padding: 0,
		optionHeight: 22
	}, webix.skin.clouds = {
		topLayout: "wide",
		barHeight: 36,
		tabbarHeight: 46,
		rowHeight: 34,
		toolbarHeight: 22,
		listItemHeight: 32,
		inputHeight: 30,
		inputPadding: 2,
		menuHeight: 34,
		labelTopHeight: 16,
		layoutMargin: {
			space: 10,
			wide: 4,
			clean: 0,
			head: 4,
			line: -1,
			toolbar: 4,
			form: 8
		},
		layoutPadding: {
			space: 10,
			wide: 0,
			clean: 0,
			head: 0,
			line: 0,
			toolbar: 4,
			form: 8
		},
		tabMargin: 2,
		tabOffset: 0,
		tabBottomOffset: 10,
		calendarHeight: 70,
		padding: 0
	}, webix.skin.terrace = {
		topLayout: "space",
		barHeight: 37,
		tabbarHeight: 39,
		rowHeight: 38,
		toolbarHeight: 22,
		listItemHeight: 28,
		inputHeight: 30,
		inputPadding: 2,
		menuMargin: 0,
		menuHeight: 32,
		labelTopHeight: 16,
		layoutMargin: {
			space: 20,
			wide: 20,
			clean: 0,
			head: 4,
			line: -1,
			toolbar: 4,
			form: 8
		},
		layoutPadding: {
			space: 20,
			wide: 0,
			clean: 0,
			head: 0,
			line: 0,
			toolbar: 4,
			form: 8
		},
		tabMargin: 2,
		tabOffset: 0,
		calendarHeight: 70,
		padding: 17,
		optionHeight: 24
	}, webix.skin.metro = {
		topLayout: "space",
		barHeight: 36,
		tabbarHeight: 46,
		rowHeight: 34,
		toolbarHeight: 36,
		listItemHeight: 32,
		inputHeight: 30,
		buttonHeight: 45,
		inputPadding: 2,
		menuHeight: 36,
		labelTopHeight: 16,
		layoutMargin: {
			space: 10,
			wide: 4,
			clean: 0,
			head: 4,
			line: -1,
			toolbar: 4,
			form: 8,
			accordion: 9
		},
		layoutPadding: {
			space: 10,
			wide: 0,
			clean: 0,
			head: 0,
			line: 0,
			toolbar: 0,
			form: 8,
			accordion: 0
		},
		tabMargin: 2,
		tabOffset: 0,
		tabBottomOffset: 10,
		calendarHeight: 70,
		padding: 0,
		optionHeight: 23
	}, webix.skin.light = {
		topLayout: "space",
		barHeight: 36,
		tabbarHeight: 46,
		rowHeight: 32,
		toolbarHeight: 36,
		listItemHeight: 32,
		inputHeight: 34,
		buttonHeight: 45,
		inputPadding: 3,
		menuHeight: 36,
		labelTopHeight: 16,
		layoutMargin: {
			space: 15,
			wide: 15,
			clean: 0,
			head: 4,
			line: -1,
			toolbar: 4,
			form: 8,
			accordion: 10
		},
		layoutPadding: {
			space: 15,
			wide: 0,
			clean: 0,
			head: 0,
			line: 0,
			toolbar: 0,
			form: 8,
			accordion: 0
		},
		tabMargin: 2,
		tabOffset: 0,
		tabBottomOffset: 10,
		calendarHeight: 70,
		padding: 0,
		optionHeight: 27
	}, webix.skin.glamour = {
		topLayout: "space",
		barHeight: 39,
		tabbarHeight: 39,
		rowHeight: 32,
		toolbarHeight: 39,
		listItemHeight: 32,
		inputHeight: 34,
		buttonHeight: 34,
		inputPadding: 3,
		menuHeight: 36,
		labelTopHeight: 16,
		layoutMargin: {
			space: 15,
			wide: 15,
			clean: 0,
			head: 4,
			line: -1,
			toolbar: 4,
			form: 8,
			accordion: 10
		},
		layoutPadding: {
			space: 15,
			wide: 0,
			clean: 0,
			head: 0,
			line: 0,
			toolbar: 3,
			form: 8,
			accordion: 0
		},
		tabMargin: 1,
		tabOffset: 0,
		tabBottomOffset: 1,
		calendarHeight: 70,
		padding: 0,
		optionHeight: 27
	}, webix.skin.touch = {
		topLayout: "space",
		barHeight: 42,
		tabbarHeight: 50,
		rowHeight: 42,
		toolbarHeight: 42,
		listItemHeight: 42,
		inputHeight: 42,
		inputPadding: 4,
		menuHeight: 42,
		labelTopHeight: 24,
		unitHeaderHeight: 34,
		layoutMargin: {
			space: 10,
			wide: 4,
			clean: 0,
			head: 4,
			line: -1,
			toolbar: 0,
			form: 0,
			accordion: 9
		},
		layoutPadding: {
			space: 10,
			wide: 0,
			clean: 0,
			head: 0,
			line: 0,
			toolbar: 4,
			form: 8,
			accordion: 0
		},
		tabMargin: 2,
		tabOffset: 0,
		tabBottomOffset: 10,
		calendar: {
			headerHeight: 70,
			timepickerHeight: 35,
			height: 310,
			width: 300
		},
		padding: 0,
		customCheckbox: !0,
		customRadio: !0,
		optionHeight: 32
	}, webix.skin.flat = {
		topLayout: "space",
		barHeight: 46,
		tabbarHeight: 46,
		rowHeight: 34,
		toolbarHeight: 46,
		listItemHeight: 34,
		inputHeight: 38,
		buttonHeight: 38,
		inputPadding: 3,
		menuHeight: 34,
		labelTopHeight: 22,
		propertyItemHeight: 28,
		layoutMargin: {
			space: 10,
			wide: 10,
			clean: 0,
			head: 4,
			line: -1,
			toolbar: 4,
			form: 8,
			accordion: 10
		},
		layoutPadding: {
			space: 10,
			wide: 0,
			clean: 0,
			head: 0,
			line: 0,
			toolbar: 4,
			form: 17,
			accordion: 0
		},
		tabMargin: 4,
		tabOffset: 0,
		tabBottomOffset: 6,
		tabTopOffset: 1,
		customCheckbox: !0,
		customRadio: !0,
		calendarHeight: 70,
		padding: 0,
		accordionType: "accordion",
		optionHeight: 32
	}, webix.skin.compact = {
		topLayout: "space",
		barHeight: 34,
		tabbarHeight: 34,
		rowHeight: 24,
		toolbarHeight: 34,
		listItemHeight: 28,
		inputHeight: 30,
		buttonHeight: 30,
		inputPadding: 3,
		menuHeight: 28,
		labelTopHeight: 16,
		layoutMargin: {
			space: 5,
			wide: 5,
			clean: 0,
			head: 4,
			line: -1,
			toolbar: 4,
			form: 4,
			accordion: 5
		},
		layoutPadding: {
			space: 5,
			wide: 0,
			clean: 0,
			head: 0,
			line: 0,
			toolbar: 2,
			form: 12,
			accordion: 0
		},
		tabMargin: 3,
		tabOffset: 0,
		tabBottomOffset: 3,
		tabTopOffset: 1,
		customCheckbox: !0,
		customRadio: !0,
		calendarHeight: 70,
		padding: 0,
		accordionType: "accordion",
		optionHeight: 23
	}, webix.skin.material = {
		topLayout: "space",
		barHeight: 45,
		tabbarHeight: 47,
		rowHeight: 38,
		toolbarHeight: 22,
		listItemHeight: 34,
		inputHeight: 38,
		buttonHeight: 38,
		inputPadding: 2,
		menuMargin: 0,
		menuHeight: 34,
		labelTopHeight: 16,
		propertyItemHeight: 34,
		layoutMargin: {
			material: 10,
			space: 10,
			wide: 10,
			clean: 0,
			head: 4,
			line: -1,
			toolbar: 4,
			form: 16,
			accordion: 0
		},
		layoutPadding: {
			material: 10,
			space: 10,
			wide: 0,
			clean: 0,
			head: 0,
			line: 0,
			toolbar: 4,
			form: 16,
			accordion: 0
		},
		tabMargin: 0,
		tabOffset: 0,
		tabBottomOffset: 0,
		tabTopOffset: 0,
		customCheckbox: !0,
		customRadio: !0,
		calendarHeight: 70,
		padding: 0,
		accordionType: "accordion"
	}, webix.skin.set = function(t) {
		if (webix.skin.$active = webix.skin[t], webix.skin.$name = t, webix.ui)
			for (var e in webix.ui) {
				var i = webix.ui[e];
				i && i.prototype && i.prototype.$skin && i.prototype.$skin(i.prototype)
			}
	}, webix.skin.set(window.webix_skin || "flat"), webix.Destruction = {
		$init: function() {
			webix.destructors.push(this)
		},
		destructor: function() {
			var t = this.s;
			if (this.di && this.editCancel(), this.callEvent && this.callEvent("onDestruct", []), this.destructor = function() {}, this.getChildViews) {
				var e = this.getChildViews();
				if (e)
					for (var i = 0; i < e.length; i++) e[i].destructor();
				if (this.Ns)
					for (var i = 0; i < this.Ns.length; i++) this.Ns[i].destructor()
			}
			if (delete webix.ui.views[t.id], t.$id) {
				var s = this.getTopParentView();
				s && s.oC && s.oC(t.$id)
			}
			this.t = null, this.u = null, this.v = null, this.w && (this.w.innerHTML = "", this.w.t = null), this.x && this.x.parentNode && this.x.parentNode.removeChild(this.x), this.data && this.data.destructor && this.data.destructor(), this.unbind && this.unbind(), this.data = null, this.x = this.$view = this.w = this.y = null, this.i = this.j = {}, webix.UIManager.A == this && (webix.UIManager.A = null);
			var n = t.url;
			n && n.$proxy && n.release && n.release(), this.$scope = null, this.$destructed = !0
		}
	}, webix.destructors = [], webix.event(window, "unload", function() {
		webix.callEvent("unload", []), webix.B = !0;
		for (var t = 0; t < webix.destructors.length; t++) webix.destructors[t].destructor();
		webix.destructors = [], webix.ui.et = webix.toArray();
		for (var e in webix.h) {
			var i = webix.h[e];
			i[0].removeEventListener ? i[0].removeEventListener(i[1], i[2], !1) : i[0].detachEvent && i[0].detachEvent("on" + i[1], i[2]), delete webix.h[e]
		}
	}),
	function() {
		var t = {},
			e = {},
			i = new RegExp("(\\r\\n|\\n)", "g"),
			s = new RegExp('(\\")', "g"),
			n = new RegExp("(\\\\)", "g"),
			r = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#x27;",
				"`": "&#x60;"
			},
			a = /[&<>"'`]/g,
			h = function(t) {
				return r[t] || "&amp;"
			};
		webix.template = function(r) {
			if ("function" == typeof r) return r;
			if (t[r]) return t[r];
			if (r = (r || "").toString(), -1 != r.indexOf("->")) {
				var a = r.split("->");
				switch (a[0]) {
					case "html":
						r = webix.html.getValue(a[1]);
						break;
					case "http":
						r = (new webix.ajax).sync().get(a[1], {
							uid: webix.uid()
						}).responseText
				}
			}
			if (r = (r || "").toString(), webix.env.strict) {
				if (!e[r]) {
					e[r] = [];
					var h = [];
					if (r.replace(/\{obj\.([^}?]+)\?([^:]*):([^}]*)\}/g, function(t, e, i, s, n) {
							h.push({
								pos: n,
								str: t,
								fn: function(t) {
									return t[e] ? i : s
								}
							})
						}), r.replace(/\{common\.([^}\(]*)\}/g, function(t, e, i) {
							h.push({
								pos: i,
								str: t,
								fn: function(t, i) {
									return i[e] || ""
								}
							})
						}), r.replace(/\{common\.([^\}\(]*)\(\)\}/g, function(t, e, i) {
							h.push({
								pos: i,
								str: t,
								fn: function(t, i) {
									return i[e] ? i[e].apply(this, arguments) : ""
								}
							})
						}), r.replace(/\{obj\.([^:}]*)\}/g, function(t, e, i) {
							h.push({
								pos: i,
								str: t,
								fn: function(t) {
									return t[e]
								}
							})
						}), r.replace("{obj}", function(t, e, i) {
							h.push({
								pos: i,
								str: t,
								fn: function(t) {
									return t
								}
							})
						}), r.replace(/#([^#'";, ]+)#/gi, function(t, e, i) {
							h.push("!" == e.charAt(0) ? {
								pos: i,
								str: t,
								fn: function(t) {
									return e = e.substr(1), -1 != e.indexOf(".") && (t = webix.CodeParser.collapseNames(t)), webix.template.escape(t[e.substr(1)])
								}
							} : {
								pos: i,
								str: t,
								fn: function(t) {
									return -1 != e.indexOf(".") && (t = webix.CodeParser.collapseNames(t)), t[e]
								}
							})
						}), h.sort(function(t, e) {
							return t.pos > e.pos ? 1 : -1
						}), h.length) {
						for (var o = 0, l = function(t, i, s) {
								e[t].push(function() {
									return t.slice(i, s)
								})
							}, c = 0; c < h.length; c++) {
							var u = h[c].pos;
							l(r, o, u), e[r].push(h[c].fn), o = u + h[c].str.length
						}
						l(r, o, r.length)
					} else e[r].push(function() {
						return r
					})
				}
				return function() {
					for (var t = "", i = 0; i < e[r].length; i++) t += e[r][i].apply(this, arguments);
					return t
				}
			}
			r = r.replace(n, "\\\\"), r = r.replace(i, "\\n"), r = r.replace(s, '\\"'), r = r.replace(/\{obj\.([^}?]+)\?([^:]*):([^}]*)\}/g, '"+(obj.$1?"$2":"$3")+"'), r = r.replace(/\{common\.([^}\(]*)\}/g, "\"+(common.$1||'')+\""), r = r.replace(/\{common\.([^\}\(]*)\(\)\}/g, '"+(common.$1?common.$1.apply(this, arguments):"")+"'), r = r.replace(/\{obj\.([^}]*)\}/g, '"+(obj.$1)+"'), r = r.replace("{obj}", '"+obj+"'), r = r.replace(/#([^#'";, ]+)#/gi, function(t, e) {
				return "!" == e.charAt(0) ? '"+webix.template.escape(obj.' + e.substr(1) + ')+"' : '"+(obj.' + e + ')+"'
			});
			try {
				t[r] = Function("obj", "common", 'return "' + r + '";')
			} catch (d) {}
			return t[r]
		}, webix.template.escape = function(t) {
			return t === webix.undefined || null === t ? "" : (t.toString() || "").replace(a, h)
		}, webix.template.empty = function() {
			return ""
		}, webix.template.bind = function(t) {
			return webix.bind(webix.template(t), this)
		}, webix.type = function(t, e) {
			if (t.b) return t.d || (t.d = []), void t.d.push(e);
			"function" == typeof t && (t = t.prototype), t.types || (t.types = {
				"default": t.type
			}, t.type.name = "default");
			var i = e.name,
				s = t.type;
			i && (s = t.types[i] = webix.clone(e.baseType ? t.types[e.baseType] : t.type));
			for (var n in e) s[n] = 0 === n.indexOf("template") ? webix.template(e[n]) : e[n];
			return i
		}
	}(), webix.Settings = {
		$init: function() {
			this.s = this.config = {}
		},
		define: function(t, e) {
			return "object" == typeof t ? this.C(t) : this.D(t, e)
		},
		D: function(t, e) {
			var i = this[t + "_setter"];
			return this.s[t] = i ? i.call(this, e, t) : e
		},
		C: function(t) {
			if (t)
				for (var e in t) this.D(e, t[e])
		},
		e: function(t, e) {
			var i = {};
			e && (i = webix.extend(i, e)), "object" != typeof t || t.tagName || webix.extend(i, t, !0), this.C(i)
		},
		E: function(t, e) {
			for (var i in e) switch (typeof t[i]) {
				case "object":
					t[i] = this.E(t[i] || {}, e[i]);
					break;
				case "undefined":
					t[i] = e[i]
			}
			return t
		}
	}, webix.proxy = function(t, e, i) {
		var s = webix.copy(webix.proxy[t]);
		return s.source = e, i && webix.extend(s, i, !0), s.init && s.init(), s
	}, webix.proxy.$parse = function(t) {
		if ("string" == typeof t && -1 != t.indexOf("->")) {
			var e = t.split("->");
			return webix.proxy(e[0], e[1])
		}
		return t
	}, webix.proxy.post = {
		$proxy: !0,
		load: function(t, e, i) {
			i = webix.extend(i || {}, this.params || {}, !0), webix.ajax().bind(t).post(this.source, i, e)
		}
	}, webix.proxy.sync = {
		$proxy: !0,
		load: function(t, e) {
			webix.ajax().sync().bind(t).get(this.source, null, e)
		}
	}, webix.proxy.connector = {
		$proxy: !0,
		connectorName: "!nativeeditor_status",
		load: function(t, e) {
			webix.ajax(this.source, e, t)
		},
		saveAll: function(t, e, i, s) {
			for (var n = this.source, r = {}, a = [], h = 0; h < e.length; h++) {
				var o = e[h];
				a.push(o.id);
				for (var l in o.data) 0 !== l.indexOf("$") && (r[o.id + "_" + l] = o.data[l]);
				r[o.id + "_" + this.connectorName] = o.operation
			}
			r.ids = a.join(","), r.webix_security = webix.securityKey, n += -1 == n.indexOf("?") ? "?" : "&", n += "editing=true", webix.ajax().post(n, r, s)
		},
		result: function(t, e, i, s, n, r) {
			if (n = n.xml(), !n) return i.yr(null, s, n, r);
			var a = n.data.action;
			a.length || (a = [a]);
			for (var h = [], o = 0; o < a.length; o++) {
				var l = a[o];
				h.push(l), l.status = l.type, l.id = l.sid, l.newid = l.tid, i.processResult(l, l, {
					text: s,
					data: n,
					loader: r
				})
			}
			return h
		}
	}, webix.proxy.rest = {
		$proxy: !0,
		load: function(t, e) {
			webix.ajax(this.source, e, t)
		},
		save: function(t, e, i, s) {
			return webix.proxy.rest.dC.call(this, t, e, i, s, webix.ajax())
		},
		dC: function(t, e, i, s, n) {
			var r = this.source;
			r += "/" == r.charAt(r.length - 1) ? "" : "/";
			var a = e.operation,
				h = e.data;
			"insert" == a && delete h.id, "update" == a ? n.put(r + h.id, h, s) : "delete" == a ? n.del(r + h.id, h, s) : n.post(r, h, s)
		}
	}, webix.proxy.json = {
		$proxy: !0,
		load: function(t, e) {
			webix.ajax(this.source, e, t)
		},
		save: function(t, e, i, s) {
			var n = webix.ajax().headers({
				"Content-Type": "application/json"
			});
			return webix.proxy.rest.dC.call(this, t, e, i, s, n)
		}
	}, webix.proxy.faye = {
		$proxy: !0,
		init: function() {
			this.clientId = this.clientId || webix.uid()
		},
		load: function(t) {
			var e = this.clientId;
			this.client.subscribe(this.source, function(i) {
				i.clientId != e && webix.dp(t).ignore(function() {
					if ("delete" == i.operation) t.remove(i.data.id);
					else if ("insert" == i.operation) t.add(i.data);
					else if ("update" == i.operation) {
						var e = t.getItem(i.data.id);
						e && (webix.extend(e, i.data, !0), t.refresh(e.id))
					}
				})
			})
		},
		save: function(t, e) {
			e.clientId = this.clientId, this.client.publish(this.source, e)
		}
	}, webix.proxy.indexdb = {
		$proxy: !0,
		create: function(t, e, i, s) {
			this.source = t + "/", this.F(s, i, function(t) {
				var i = t.target.result;
				for (var s in e)
					for (var n = e[s], r = i.createObjectStore(s, {
							keyPath: "id",
							autoIncrement: !0
						}), a = 0; a < n.length; a++) r.put(n[a])
			})
		},
		F: function(t, e, i) {
			if (-1 != this.source.indexOf("/")) {
				var s = this.source.split("/");
				this.source = s[1], e = e || s[2];
				var n, r = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
				n = e ? r.open(s[0], e) : r.open(s[0]), i && (n.onupgradeneeded = i), n.onerror = function() {}, n.onblocked = function() {}, n.onsuccess = webix.bind(function(e) {
					this.db = e.target.result, t && t.call(this)
				}, this)
			} else this.db ? t.call(this) : webix.delay(this.F, this, [t], 50)
		},
		load: function(t, e) {
			this.F(function() {
				var i = this.db.transaction(this.source).objectStore(this.source),
					s = [];
				i.openCursor().onsuccess = function(i) {
					var n = i.target.result;
					n ? (s.push(n.value), n["continue"]()) : (t.parse(s), webix.ajax.$callback(t, e, "[]", s))
				}
			})
		},
		save: function(t, e, i) {
			this.F(function() {
				var t, s = e.operation,
					n = e.data,
					r = e.id,
					a = this.db.transaction([this.source], "readwrite").objectStore(this.source);
				"delete" == s ? t = a["delete"](r) : "update" == s ? t = a.put(n) : "insert" == s && (delete n.id, t = a.add(n)), t.onsuccess = function(t) {
					var n = {
						status: s,
						id: e.id
					};
					"insert" == s && (n.newid = t.target.result), i.processResult(n, n)
				}
			})
		}
	}, webix.proxy.binary = {
		$proxy: !0,
		load: function(t, e) {
			var i = this.source.split("@"),
				s = i[0].split(".").pop();
			return webix.ajax().response("arraybuffer").get(i[0]).then(function(n) {
				var r = {
					ext: s,
					dataurl: i[1]
				};
				webix.ajax.$callback(t, e, "", {
					data: n,
					options: r
				}, -1)
			})
		}
	}, webix.ajax = function(t, e, i) {
		return 0 !== arguments.length ? (new webix.ajax).get(t, e, i) : this.getXHR ? this : new webix.ajax
	}, webix.ajax.count = 0, webix.ajax.prototype = {
		master: null,
		getXHR: function() {
			return new XMLHttpRequest
		},
		stringify: function(t) {
			var e = Date.prototype.toJSON;
			Date.prototype.toJSON = function() {
				return webix.i18n.parseFormatStr(this)
			};
			var i;
			return i = t instanceof Date ? t.toJSON() : JSON.stringify(t), Date.prototype.toJSON = e, i
		},
		G: function(t, e, i, s) {
			var n;
			e && (webix.isArray(e) || "function" == typeof(e.success || e.error || e)) && (n = i, i = e, e = null);
			var r = webix.promise.defer(),
				a = this.getXHR();
			webix.isArray(i) || (i = [i]), i.push({
				success: function(t, e) {
					r.resolve(e)
				},
				error: function() {
					r.reject(a)
				}
			});
			var h = this.I || {};
			if (webix.callEvent("onBeforeAjax", [s, t, e, a, h, null, r])) {
				var o = !1;
				if ("GET" !== s) {
					var l = !1;
					for (var c in h) "content-type" == c.toString().toLowerCase() && (l = !0, "application/json" == h[c] && (o = !0));
					l || (h["Content-Type"] = "application/x-www-form-urlencoded")
				}
				if ("object" == typeof e)
					if (o) e = this.stringify(e);
					else {
						var u = [];
						for (var d in e) {
							var f = e[d];
							(null === f || f === webix.undefined) && (f = ""), "object" == typeof f && (f = this.stringify(f)), u.push(d + "=" + encodeURIComponent(f))
						}
						e = u.join("&")
					}
				e && "GET" === s && (t = t + (-1 != t.indexOf("?") ? "&" : "?") + e, e = null), a.open(s, t, !this.H);
				var b = this.Tw;
				b && (a.responseType = b);
				for (var c in h) a.setRequestHeader(c, h[c]);
				var x = this;
				return this.master = this.master || n, a.onreadystatechange = function() {
					if (!a.readyState || 4 == a.readyState) {
						if (webix.ajax.count++, i && x && !a.aborted) {
							if (-1 != webix.ly.find(a)) return webix.ly.remove(a);
							var t, e, s = x.master || x,
								r = a.status >= 400 || 0 === a.status;
							"blob" == a.responseType || "arraybuffer" == a.responseType ? (t = "", e = a.response) : (t = a.responseText || "", e = x.J(a)), webix.ajax.$callback(s, i, t, e, a, r)
						}
						x && (x.master = null), i = x = n = null
					}
				}, this.qh && (a.timeout = this.qh), this.H ? a.send(e || null) : setTimeout(function() {
					a.aborted || (-1 != webix.ly.find(a) ? webix.ly.remove(a) : a.send(e || null))
				}, 1), this.master && this.master.Ve && this.master.Ve.push(a), this.H ? a : r
			}
		},
		J: function(t) {
			return {
				xml: function() {
					try {
						return webix.DataDriver.xml.tagToObject(webix.DataDriver.xml.toObject(t.responseText, this))
					} catch (e) {}
				},
				rawxml: function() {
					return window.XPathResult ? t.responseXML : webix.DataDriver.xml.fromString(t.responseText)
				},
				text: function() {
					return t.responseText
				},
				json: function() {
					try {
						return JSON.parse(t.responseText)
					} catch (e) {}
				}
			}
		},
		get: function(t, e, i) {
			return this.G(t, e, i, "GET")
		},
		post: function(t, e, i) {
			return this.G(t, e, i, "POST")
		},
		put: function(t, e, i) {
			return this.G(t, e, i, "PUT")
		},
		del: function(t, e, i) {
			return this.G(t, e, i, "DELETE")
		},
		patch: function(t, e, i) {
			return this.G(t, e, i, "PATCH")
		},
		sync: function() {
			return this.H = !0, this
		},
		timeout: function(t) {
			return this.qh = t, this
		},
		response: function(t) {
			return this.Tw = t, this
		},
		header: function(t) {
			return this.I = t, this
		},
		headers: function(t) {
			return this.I = webix.extend(this.I || {}, t), this
		},
		bind: function(t) {
			return this.master = t, this
		}
	}, webix.ajax.$callback = function(t, e, i, s, n, r) {
		if (!t.$destructed) {
			if (-1 === n && s && "function" == typeof s.json && (s = s.json()), r && webix.callEvent("onAjaxError", [n]), webix.isArray(e) || (e = [e]), !r)
				for (var a = 0; a < e.length; a++)
					if (e[a]) {
						var h = e[a].before;
						h && h.call(t, i, s, n)
					}
			for (var a = 0; a < e.length; a++)
				if (e[a]) {
					var o = e[a].success || e[a];
					r && (o = e[a].error), o && o.call && o.call(t, i, s, n)
				}
		}
	}, webix.send = function(t, e, i, s) {
		var n = webix.html.create("FORM", {
			target: s || "_self",
			action: t,
			method: i || "POST"
		}, "");
		for (var r in e) {
			var a = webix.html.create("INPUT", {
				type: "hidden",
				name: r,
				value: e[r]
			}, "");
			n.appendChild(a)
		}
		n.style.display = "none", document.body.appendChild(n), n.submit(), document.body.removeChild(n)
	}, webix.AtomDataLoader = {
		$init: function(t) {
			this.data = {}, this.waitData = webix.promise.defer(), t && (this.s.datatype = t.datatype || "json"), this.$ready.push(this.K)
		},
		K: function() {
			this.L = !0, this.s.url && this.url_setter(this.s.url), this.s.data && this.data_setter(this.s.data)
		},
		url_setter: function(t) {
			return t = webix.proxy.$parse(t), this.L ? (this.load(t, this.s.datatype), t) : t
		},
		data_setter: function(t) {
			return this.L ? (this.parse(t, this.s.datatype), !0) : t
		},
		load: function(t, e) {
			var i = arguments[2] || null;
			this.callEvent("onBeforeLoad", []), "string" == typeof e ? (this.data.driver = webix.DataDriver[e], e = arguments[2]) : this.data.driver || (this.data.driver = webix.DataDriver.json);
			var s = [{
				success: this.M,
				error: this.N
			}];
			return e && (webix.isArray(e) ? s.push.apply(s, e) : s.push(e)), t = webix.proxy.$parse(t), t.$proxy && t.load ? t.load(this, s, i) : "function" == typeof t ? t(i).then(webix.bind(function(t) {
				webix.ajax.$callback(this, s, "", t, -1)
			}, this), webix.bind(function(t) {
				webix.ajax.$callback(this, s, "", null, t, !0)
			}, this)) : webix.ajax(t, s, this)
		},
		parse: function(t, e) {
			return t && t.then && "function" == typeof t.then ? t.then(webix.bind(function(t) {
				t && "function" == typeof t.json && (t = t.json()), this.parse(t, e)
			}, this)) : t && t.sync && this.sync ? this.sync(t) : (this.callEvent("onBeforeLoad", []), this.data.driver = webix.DataDriver[e || "json"], void this.M(t, null))
		},
		df: function(t) {
			var e = this.data.driver,
				i = e.getDetails(e.getRecords(t)[0]);
			this.setValues ? this.setValues(i) : this.data = i
		},
		tB: function(t, e, i, s) {
			t ? this.$onLoad && this.$onLoad(t, this.data.driver) || (this.data && this.data.df ? this.data.df(t) : this.df(t)) : this.N(e, i, s), this.ef && this.ef(), this.callEvent("onAfterLoad", []), this.waitData.resolve()
		},
		M: function(t, e, i) {
			var s, n = this.data.driver; - 1 === i ? s = n.toObject(e) : (this.Ve && this.Ve.remove(i), s = n.toObject(t, e)), s && s.then ? s.then && "function" == typeof s.then && s.then(webix.bind(this.tB, this)) : this.tB(s)
		},
		N: function(t, e, i) {
			this.callEvent("onAfterLoad", []), this.callEvent("onLoadError", arguments), webix.callEvent("onLoadError", [t, e, i, this])
		},
		O: function(t) {
			if (!this.s.dataFeed || this.P || !t) return !0;
			var e = this.s.dataFeed;
			return "function" == typeof e ? e.call(this, t.id || t, t) : (e = e + (-1 == e.indexOf("?") ? "?" : "&") + "action=get&id=" + encodeURIComponent(t.id || t), this.callEvent("onBeforeLoad", []), webix.ajax(e, function(t, e, i) {
				this.P = !0;
				var s = webix.DataDriver.json,
					n = s.toObject(t, e);
				n ? this.setValues(s.getDetails(s.getRecords(n)[0])) : this.N(t, e, i), this.P = !1, this.callEvent("onAfterLoad", [])
			}, this), !1)
		}
	}, webix.DataDriver = {}, webix.DataDriver.json = {
		toObject: function(t) {
			if (!t) return null;
			if ("string" == typeof t) try {
				if (this.parseDates) {
					var e = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?Z/;
					t = JSON.parse(t, function(t, i) {
						return "string" == typeof i && e.test(i) ? new Date(i) : i
					})
				} else t = JSON.parse(t)
			} catch (i) {
				return null
			}
			return t
		},
		getRecords: function(t) {
			return t && t.data && (t = t.data), t && !webix.isArray(t) ? [t] : t
		},
		getDetails: function(t) {
			return "string" == typeof t ? {
				id: t || webix.uid(),
				value: t
			} : t
		},
		getOptions: function(t) {
			return t.collections
		},
		getInfo: function(t) {
			return {
				Q: t.total_count || 0,
				R: t.pos || 0,
				S: t.parent || 0,
				T: t.config,
				U: t.webix_security
			}
		},
		child: "data",
		parseDates: !1
	}, webix.DataDriver.html = {
		toObject: function(t) {
			if ("string" == typeof t) {
				var e = null;
				return -1 == t.indexOf("<") && (e = webix.toNode(t)), e || (e = document.createElement("DIV"), e.innerHTML = t), e.firstChild
			}
			return t
		},
		getRecords: function(t) {
			return t.getElementsByTagName(this.tag)
		},
		getDetails: function(t) {
			return webix.DataDriver.xml.tagToObject(t)
		},
		getOptions: function() {
			return !1
		},
		getInfo: function() {
			return {
				Q: 0,
				R: 0
			}
		},
		tag: "LI"
	}, webix.DataDriver.jsarray = {
		toObject: function(t) {
			return "string" == typeof t ? JSON.parse(t) : t
		},
		getRecords: function(t) {
			return t && t.data && (t = t.data), t
		},
		getDetails: function(t) {
			for (var e = {}, i = 0; i < t.length; i++) e["data" + i] = t[i];
			return null !== this.idColumn && (e.id = t[this.idColumn]), e
		},
		getOptions: function() {
			return !1
		},
		getInfo: function() {
			return {
				Q: 0,
				R: 0
			}
		},
		idColumn: null
	}, webix.DataDriver.csv = {
		toObject: function(t) {
			return t
		},
		getRecords: function(t) {
			return t.split(this.row)
		},
		getDetails: function(t) {
			t = this.stringToArray(t);
			for (var e = {}, i = 0; i < t.length; i++) e["data" + i] = t[i];
			return null !== this.idColumn && (e.id = t[this.idColumn]), e
		},
		getOptions: function() {
			return !1
		},
		getInfo: function() {
			return {
				Q: 0,
				R: 0
			}
		},
		stringToArray: function(t) {
			t = t.split(this.cell);
			for (var e = 0; e < t.length; e++) t[e] = t[e].replace(/^[ \t\n\r]*(\"|)/g, "").replace(/(\"|)[ \t\n\r]*$/g, "");
			return t
		},
		idColumn: null,
		row: "\n",
		cell: ","
	}, webix.DataDriver.xml = {
		V: function(t) {
			return t && t.documentElement ? t.getElementsByTagName("parsererror").length ? null : t : null
		},
		toObject: function(t, e) {
			var i = e ? e.rawxml ? e.rawxml() : e : null;
			return this.V(i) ? i : (i = "string" == typeof t ? this.fromString(t.replace(/^[\s]+/, "")) : t, this.V(i) ? i : null)
		},
		getRecords: function(t) {
			return this.xpath(t, this.records)
		},
		records: "/*/item",
		child: "item",
		config: "/*/config",
		getDetails: function(t) {
			return this.tagToObject(t, {})
		},
		getOptions: function() {
			return !1
		},
		getInfo: function(t) {
			var e = this.xpath(t, this.config);
			return e = e.length ? this.assignTypes(this.tagToObject(e[0], {})) : null, {
				Q: t.documentElement.getAttribute("total_count") || 0,
				R: t.documentElement.getAttribute("pos") || 0,
				S: t.documentElement.getAttribute("parent") || 0,
				T: e,
				U: t.documentElement.getAttribute("webix_security") || null
			}
		},
		xpath: function(t, e) {
			if (window.XPathResult) {
				var i = t; - 1 == t.nodeName.indexOf("document") && (t = t.ownerDocument);
				for (var s = [], n = t.evaluate(e, i, null, XPathResult.ANY_TYPE, null), r = n.iterateNext(); r;) s.push(r), r = n.iterateNext();
				return s
			}
			var a = !0;
			try {
				"undefined" == typeof t.selectNodes && (a = !1)
			} catch (h) {}
			if (a) return t.selectNodes(e);
			var o = e.split("/").pop();
			return t.getElementsByTagName(o)
		},
		assignTypes: function(t) {
			for (var e in t) {
				var i = t[e];
				if ("object" == typeof i) this.assignTypes(i);
				else if ("string" == typeof i) {
					if ("" === i) continue;
					"true" == i ? t[e] = !0 : "false" == i ? t[e] = !1 : i == 1 * i && (t[e] = 1 * t[e])
				}
			}
			return t
		},
		tagToObject: function(t, e) {
			var i = 1 == t.nodeType && t.getAttribute("stack"),
				s = 0;
			if (i) {
				e = [];
				for (var n = t.childNodes, r = 0; r < n.length; r++) 1 == n[r].nodeType && e.push(this.tagToObject(n[r], {}))
			} else {
				e = e || {};
				var a = t.attributes;
				if (a && a.length)
					for (var r = 0; r < a.length; r++) e[a[r].name] = a[r].value, s = 1;
				for (var n = t.childNodes, r = 0; r < n.length; r++)
					if (1 == n[r].nodeType) {
						var h = n[r].tagName;
						e[h] ? ("function" != typeof e[h].push && (e[h] = [e[h]]), e[h].push(this.tagToObject(n[r], {}))) : e[h] = this.tagToObject(n[r], {}), s = 2
					}
				if (!s) return this.nodeValue(t);
				2 > s && (e.value = e.value || this.nodeValue(t))
			}
			return e
		},
		nodeValue: function(t) {
			return t.firstChild ? t.firstChild.wholeText || t.firstChild.data : ""
		},
		fromString: function(t) {
			try {
				if (window.DOMParser) return (new DOMParser).parseFromString(t, "text/xml");
				if (window.ActiveXObject) {
					var e = new ActiveXObject("Microsoft.xmlDOM");
					return e.loadXML(t), e
				}
			} catch (i) {
				return null
			}
		}
	}, webix.BaseBind = {
		bind: function(t, e, i) {
			this.attachEvent || webix.extend(this, webix.EventSystem), "string" == typeof t && (t = webix.$$(t)), t.W && t.W(), this.W && this.W(), t.getBindData || webix.extend(t, webix.BindSource), this.X(), t.addBind(this.s.id, e, i), this.Os = t.s.id;
			var s = this.s.id;
			this.Ps = this.attachEvent(this.touchable ? "onAfterRender" : "onBindRequest", function() {
				return t.getBindData(s)
			}), this.refresh && this.isVisible(this.s.id) && this.refresh()
		},
		unbind: function() {
			if (this.Os) {
				var t = webix.$$(this.Os);
				t && t.removeBind(this.s.id), this.detachEvent(this.Ps), this.Os = null
			}
		},
		X: function() {
			var t = this.s;
			if (this.filter) {
				var e = t.id;
				this.data.Y = webix.bind(function() {
					webix.$$(this.Os).Z[e] = !1
				}, this)
			}
			var i = this.render;
			this.render = function() {
				if (!this.$) {
					this.$ = !0;
					var t = this.callEvent("onBindRequest");
					return this.$ = !1, i.apply(this, t === !1 ? arguments : [])
				}
			}, (this.getValue || this.getValues) && (this.save = function() {
				return this.validate && !this.validate() ? !1 : (webix.$$(this.Os).setBindData(this.getValue ? this.getValue : this.getValues(), this.s.id), void(this.setDirty && this.setDirty(!1)))
			}), !t.dataFeed && this.loadNext && this.data.attachEvent("onStoreLoad", webix.bind(function() {
				this.Os && (webix.$$(this.Os).Z[this.s.id] = !1)
			}, this)), this.X = function() {}
		}
	}, webix.BindSource = {
		$init: function() {
			this.bb = {}, this.Z = {}, this.cb = {}, this.db(this)
		},
		saveBatch: function(t) {
			this.eb = !0, t.call(this), this.eb = !1, this.fb()
		},
		setBindData: function(t, e) {
			if (e && (this.cb[e] = !0), this.setValue) this.setValue(t);
			else if (this.setValues) this.setValues(t);
			else {
				var i = this.getCursor();
				i ? this.updateItem(i, t) : this.add(t)
			}
			this.callEvent("onBindUpdate", [t, e]), this.save && this.save(), e && (this.cb[e] = !1)
		},
		getBindData: function(t, e) {
			if (this.Z[t]) return !1;
			var i = webix.$$(t);
			i.isVisible(i.s.id) && (this.Z[t] = !0, this.gb(i, this.bb[t][0], this.bb[t][1]), e && i.filter && i.refresh())
		},
		addBind: function(t, e, i) {
			this.bb[t] = [e, i]
		},
		removeBind: function(t) {
			delete this.bb[t], delete this.Z[t], delete this.cb[t]
		},
		db: function(t) {
			t.filter ? webix.extend(this, webix.CollectionBind) : t.setValue ? webix.extend(this, webix.ValueBind) : webix.extend(this, webix.RecordBind)
		},
		fb: function() {
			if (!this.eb)
				for (var t in this.bb) this.cb[t] || (this.Z[t] = !1, this.getBindData(t, !0))
		},
		hb: function(t, e, i) {
			t.setValue ? t.setValue(i && e ? i[e] : i) : t.filter ? t.data.silent(function() {
				this.filter(e, i)
			}) : !i && t.clear ? t.clear() : t.O(i) && t.setValues(webix.clone(i)), t.callEvent("onBindApply", [i, e, this])
		}
	}, webix.DataValue = webix.proto({
		name: "DataValue",
		isVisible: function() {
			return !0
		},
		$init: function(t) {
			(!t || webix.isUndefined(t.value)) && (this.data = t || "");
			var e = t && t.id ? t.id : webix.uid();
			this.s = {
				id: e
			}, webix.ui.views[e] = this
		},
		setValue: function(t) {
			this.data = t, this.callEvent("onChange", [t])
		},
		getValue: function() {
			return this.data
		},
		refresh: function() {
			this.callEvent("onBindRequest")
		}
	}, webix.EventSystem, webix.BaseBind), webix.DataRecord = webix.proto({
		name: "DataRecord",
		isVisible: function() {
			return !0
		},
		$init: function(t) {
			this.data = t || {};
			var e = t && t.id ? t.id : webix.uid();
			this.s = {
				id: e
			}, webix.ui.views[e] = this
		},
		getValues: function() {
			return this.data
		},
		setValues: function(t, e) {
			this.data = e ? webix.extend(this.data, t, !0) : t, this.callEvent("onChange", [t])
		},
		refresh: function() {
			this.callEvent("onBindRequest")
		}
	}, webix.EventSystem, webix.BaseBind, webix.AtomDataLoader, webix.Settings), webix.ValueBind = {
		$init: function() {
			this.attachEvent("onChange", this.fb)
		},
		gb: function(t, e, i) {
			e = e || "value";
			var s = this.getValue() || "";
			if (i && (s = i(s)), t.setValue) t.setValue(s);
			else if (t.filter) t.data.silent(function() {
				this.filter(e, s)
			});
			else {
				var n = {};
				n[e] = s, t.O(s) && t.setValues(n)
			}
			t.callEvent("onBindApply", [s, e, this])
		}
	}, webix.RecordBind = {
		$init: function() {
			this.attachEvent("onChange", this.fb)
		},
		gb: function(t, e, i) {
			var s = this.getValues() || null;
			i && (s = i(s)), this.hb(t, e, s)
		}
	}, webix.CollectionBind = {
		$init: function() {
			this.ib = null, this.attachEvent("onSelectChange", function() {
				var t = this.getSelectedId();
				this.setCursor(t ? t.id || t : null)
			}), this.attachEvent("onAfterCursorChange", this.fb), this.attachEvent("onAfterDelete", function(t) {
				t == this.getCursor() && this.setCursor(null)
			}), this.data.attachEvent("onStoreUpdated", webix.bind(function(t, e, i) {
				t && t == this.getCursor() && "paint" != i && "delete" != i && this.fb()
			}, this)), this.data.attachEvent("onClearAll", webix.bind(function() {
				this.ib = null
			}, this)), this.data.attachEvent("onIdChange", webix.bind(function(t, e) {
				this.ib == t && (this.ib = e, this.fb())
			}, this))
		},
		refreshCursor: function() {
			this.ib && this.callEvent("onAfterCursorChange", [this.ib])
		},
		setCursor: function(t) {
			t == this.ib || null !== t && !this.getItem(t) || (this.callEvent("onBeforeCursorChange", [this.ib]), this.ib = t, this.callEvent("onAfterCursorChange", [t]))
		},
		getCursor: function() {
			return this.ib
		},
		gb: function(t, e, i) {
			if ("$level" == e && this.data.getBranch) return (t.data || t).importData(this.data.getBranch(this.getCursor()));
			var s = this.getItem(this.getCursor()) || this.s.defaultData || null;
			return "$data" == e ? "function" == typeof i ? i.call(t, s, this) : t.data.importData(s ? s[i] : []) : (i && (s = i(s)), void this.hb(t, e, s))
		}
	}, webix.AtomRender = {
		jb: function(t) {
			return t.$empty ? "" : this.s.template(t, this)
		},
		render: function() {
			var t = this.s;
			try { return this.isVisible(t.id) ? ((!this.callEvent || this.callEvent("onBeforeRender", [this.data])) && (this.data && !t.content && (this.y.innerHTML = "", this.y.innerHTML = this.jb(this.data)), this.callEvent && this.callEvent("onAfterRender", [])), !0) : !1 } catch(err){}
		},
		sync: function(t) {
			this.kb = !1, "DataStore" != t.name && (t.data && "DataStore" == t.name ? t = t.data : this.kb = !0), this.kb ? t.bind("change", webix.bind(function(t) {
				t.id == this.data.id && (this.data = t.attributes, this.refresh())
			}, this)) : t.attachEvent("onStoreUpdated", webix.bind(function(e) {
				e && e != this.data.id || (this.data = t.pull[e], this.refresh())
			}, this))
		},
		template_setter: webix.template
	}, webix.SingleRender = webix.proto({
		template_setter: function(t) {
			this.type.template = webix.template(t)
		},
		jb: function(t) {
			var e = this.type;
			return (e.templateStart ? e.templateStart(t, e) : "") + e.template(t, e) + (e.templateEnd ? e.templateEnd(t, e) : "")
		},
		customize: function(t) {
			webix.type(this, t)
		}
	}, webix.AtomRender), webix.UIManager = {
		A: null,
		lb: {},
		mb: 0,
		nb: {
			enter: 13,
			tab: 9,
			esc: 27,
			escape: 27,
			up: 38,
			down: 40,
			left: 37,
			right: 39,
			pgdown: 34,
			pagedown: 34,
			pgup: 33,
			pageup: 33,
			end: 35,
			home: 36,
			insert: 45,
			"delete": 46,
			backspace: 8,
			space: 32,
			meta: 91,
			win: 91,
			mac: 91,
			multiply: 106,
			add: 107,
			subtract: 109,
			decimal: 110,
			divide: 111
		},
		ob: function() {
			webix.event(document.body, "click", webix.bind(this.pb, this)), webix.event(document, "keydown", webix.bind(this.qb, this)), document.body.addEventListener && document.body.addEventListener("focus", webix.bind(this.rb, this), !0), webix.destructors.push(this)
		},
		destructor: function() {
			webix.UIManager.A = null
		},
		getFocus: function() {
			return this.A
		},
		sb: function(t) {
			this.tb = this.tb || t.s.id
		},
		setFocus: function(t, e) {
			return t = webix.$$(t), t && !t.$view && (t = null), this.mb = webix.mb = new Date, this.A === t ? !0 : (this.A && this.A.callEvent && this.A.callEvent("onBlur", [this.A]), t && t.callEvent && t.callEvent("onFocus", [t, this.A]), webix.callEvent("onFocusChange", [t, this.A]), this.A && this.A.blur && !e && this.A.blur(), this.A = t, t && t.focus && !e && t.focus(), !0)
		},
		applyChanges: function(t) {
			var e = this.getFocus();
			e && e != t && e.Xy && e.Xy(t)
		},
		hasFocus: function(t) {
			return t === this.A ? !0 : !1
		},
		ub: function(t, e) {
			var i = webix.html.locate(t, "view_id") || this.tb;
			return i = webix.$$(i), this.tb = null, i != this.A ? (e || (this.tb = null), i ? (i = webix.$$(i), this.canFocus(i) && this.setFocus(i)) : e || this.setFocus(null), !0) : void 0
		},
		pb: function(t) {
			return new Date - this.mb < 100 ? (this.tb = null, !1) : this.ub(t)
		},
		rb: function(t) {
			return this.ub(t, !0)
		},
		canFocus: function(t) {
			return t.isVisible() && t.isEnabled()
		},
		vb: function(t) {
			var e = this.getFocus();
			return t && !this.wb(t, e) ? !1 : void(this.xb("getPrev", t) ? this.A = null : this.setFocus(this.getPrev(t)))
		},
		Xz: {
			190: 46
		},
		wb: function(t, e) {
			if (!t) return !1;
			if (!e) return !1;
			for (; e;) {
				if (e === t) return !0;
				e = e.getParentView()
			}
			return !1
		},
		yb: function() {
			this && this.callEvent && this.callEvent("onTimedKeyPress", [])
		},
		BA: function(t) {
			return 112 > t && t > 105
		},
		qb: function(t) {
			var e = t.which || t.keyCode;
			e > 95 && 106 > e && (e -= 48), e = this.Xz[e] || e;
			var i = t.ctrlKey,
				s = t.shiftKey,
				n = t.altKey,
				r = t.metaKey,
				a = this.zb(e, i, s, n, r),
				h = this.getFocus();
			h && h.callEvent && (h.callEvent("onKeyPress", [e, t]) === !1 && webix.html.preventEvent(t), h.hasEvent("onTimedKeyPress") && (clearTimeout(h.Ab), h.Ab = webix.delay(this.yb, h, [], h.s.keyPressTimeout || 250))), this.tabControl && (9 !== e || i || n || r || (this.xb(s ? "getPrev" : "getNext"), webix.html.preventEvent(t))), this.BA(e) || (a = this.zb(String.fromCharCode(e), i, s, n, r));
			var o = !i && !n && !r && 9 != e && 27 != e && 13 != e;
			return this.Bb(a, o, t) === !1 ? (webix.html.preventEvent(t), !1) : void 0
		},
		xb: function(t) {
			if (!this.getFocus()) return null;
			t = t || "getNext";
			for (var e = this.getFocus(), i = e, s = webix.uid();;) {
				if (e = this[t](e), e && e.s.tabFocus && this.canFocus(e)) return this.setFocus(e);
				if (e === i || e.$fmarker == s) return null;
				e.$fmarker = s
			}
		},
		getTop: function(t) {
			for (var e, i = webix.$$(t); i && (e = i.getParentView());) i = e;
			return i
		},
		getNext: function(t, e) {
			var i = t.getChildViews();
			if (i.length && !e) return i[0];
			var s = t.getParentView();
			if (!s) return t;
			var n = s.getChildViews();
			if (n.length)
				for (var r = webix.PowerArray.find.call(n, t) + 1; r < n.length;) {
					if (this.canFocus(n[r])) return n[r];
					r++
				}
			return this.getNext(s, !0)
		},
		getPrev: function(t, e) {
			var i = t.getChildViews();
			if (i.length && e) return this.getPrev(i[i.length - 1], !0);
			if (e) return t;
			var s = t.getParentView();
			if (!s) return this.getPrev(t, !0);
			var n = s.getChildViews();
			if (n)
				for (var r = webix.PowerArray.find.call(n, t) - 1; r >= 0;) {
					if (this.canFocus(n[r])) return this.getPrev(n[r], !0);
					r--
				}
			return s
		},
		addHotKey: function(t, e, i) {
			var s = this.Cb(t);
			i || (i = null), s.handler = e, s.view = i;
			var n = this.zb(s.letter, s.ctrl, s.shift, s.alt, s.meta);
			return this.lb[n] || (this.lb[n] = []), this.lb[n].push(s), t
		},
		removeHotKey: function(t, e, i) {
			var s = this.Cb(t),
				n = this.zb(s.letter, s.ctrl, s.shift, s.alt, s.meta);
			if (e || i) {
				var r = this.lb[n];
				if (r) {
					for (var a = r.length - 1; a >= 0; a--) i && r[a].view !== i || e && r[a].handler !== e || r.splice(a, 1);
					r.length || delete this.lb[n]
				}
			} else delete this.lb[n]
		},
		zb: function(t, e, i, s, n) {
			return t + "_" + ["", e ? "1" : "0", i ? "1" : "0", s ? "1" : "0", n ? "1" : "0"].join("")
		},
		Bb: function(t, e, i) {
			var s = this.getFocus();
			return this.lb[t] ? this.Db(this.lb[t], s, i) : e && this.lb.ANY_0000 ? this.Db(this.lb.ANY_0000, s, i) : !0
		},
		Db: function(t, e, i) {
			for (var s = 0; s < t.length; s++) {
				var n = t[s];
				if (null === n.view || e === n.view || "string" == typeof n.view && e && e.name === n.view) {
					var r = n.handler(e, i);
					if (!!r === r) return r
				}
			}
			return !0
		},
		Cb: function(t) {
			var e, i, s, n, r = this.nb,
				a = t.toLowerCase().split(/[\+\-_]/);
			e = i = s = n = 0;
			for (var h = "", o = 0; o < a.length; o++)
				if ("ctrl" === a[o]) e = 1;
				else if ("shift" === a[o]) i = 1;
			else if ("alt" === a[o]) s = 1;
			else if ("command" === a[o]) n = 1;
			else if (r[a[o]]) {
				var l = r[a[o]];
				h = this.BA(l) ? l.toString() : String.fromCharCode(l)
			} else h = a[o];
			return {
				letter: h.toUpperCase(),
				ctrl: e,
				shift: i,
				alt: s,
				meta: n
			}
		}
	}, webix.ready(function() {
		webix.UIManager.ob(), webix.UIManager.addHotKey("enter", function(t, e) {
			if (t && t.editStop && t.Eb) return t.editStop(), !0;
			if (t && t.touchable) {
				var i = t.getFormView();
				i && !t.Dt && i.callEvent("onSubmit", [t, e])
			}
		}), webix.UIManager.addHotKey("esc", function(t) {
			if (t) {
				if (t.editCancel && t.Eb) return t.editCancel(), !0;
				var e = t.getTopParentView();
				e && e.setPosition && e.Fb()
			}
		}), webix.UIManager.addHotKey("shift+tab", function(t, e) {
			if (t && t.Gb && !t.Gb(!1, e)) return !1;
			if (t && t.Eb) {
				if (t.editNext) return t.editNext(!1);
				if (t.editStop) return t.editStop(), !0
			}
		}), webix.UIManager.addHotKey("tab", function(t, e) {
			if (t && t.Gb && !t.Gb(!0, e)) return !1;
			if (t && t.Eb) {
				if (t.editNext) return t.editNext(!0);
				if (t.editStop) return t.editStop(), !0
			} else webix.delay(function() {
				webix.UIManager.tabControl || webix.UIManager.setFocus(webix.$$(document.activeElement), !0)
			}, 1)
		})
	}), webix.IdSpace = {
		$init: function() {
			this.Hb = {}, this.Ib = {}, this.getTopParentView = webix.bind(function() {
				return this
			}, this), this.Jb(), this.$ready.push(this.Kb)
		},
		$$: function(t) {
			return this.Hb[t]
		},
		innerId: function(t) {
			return this.Ib[t]
		},
		Jb: function() {
			this.Lb = webix.Mb, webix.Mb = this
		},
		Kb: function() {
			for (var t in this.Hb) {
				var e = this.Hb[t];
				this.callEvent && e.mapEvent && !e.k.onitemclick && e.mapEvent({
					onitemclick: this
				}), e.getTopParentView = this.getTopParentView
			}
			webix.Mb = this.Lb, this.Lb = 0
		},
		oC: function(t) {
			delete this.Hb[t]
		},
		ui: function() {
			this.Jb();
			var t = webix.ui.apply(webix, arguments);
			return this.Kb(), t
		}
	},
	function() {
		var t = [],
			e = webix.ui;
		if (!webix.ui) {
			e = webix.ui = function(t, n, r) {
				webix.Nb = !0;
				var a = webix.isArray(t),
					h = webix.toNode(t.container || n || document.body);
				h.s && (r = s(h, a, r));
				var o, l = h == document.body;
				if (t.s || h && a ? o = t : (h && l && (t.$topView = !0), t.Ob || (t.Ob = {}), o = e.A(t)), !l || o.setPosition || o.$apiOnly || webix.ui.Pb(), o.s && o.s.ft && !h.$view) o.s.gt = h;
				else if (!o.$apiOnly)
					if (h.appendChild) i(h, o, t);
					else if (h.destructor) {
					var c = h;
					if (r || 0 === r || webix.isArray(o) || (r = h, h = h.getParentView()), h && h.Qb) o.getParentView && o.getParentView() && o.getParentView().Rb(o), h.Qb(o, r);
					else {
						var n = c.$view.parentNode;
						c.destructor(), i(n, o, t)
					}
				}
				return webix.Nb = !1, o
			};
			var i = function(e, i, s) {
					e.appendChild(i.x), ((!i.setPosition || i.s.fullscreen) && e == document.body || i.s.position) && t.push(i), s.skipResize || i.adjust()
				},
				s = function(t, e, i) {
					var s = [t];
					if (e) s = t.getChildViews();
					else if (t.gd) s = [t.gd];
					else {
						if ("number" == typeof i) return i;
						if (i) return s = [webix.$$(i)], n(s), s[0].config.id
					}
					return n(s), i
				},
				n = function(t) {
					for (var e = t.length - 1; e >= 0; e--) delete webix.ui.views[t[e].config.id], t[e].config.id = "x" + webix.uid(), webix.ui.views[t[e].config.id] = t[e], n(t[e].getChildViews())
				}
		}
		webix.ui.animate = function(t, e, i) {
			var s = webix.$$(e);
			if (s) {
				var n = i || {
						type: "slide",
						direction: "left"
					},
					r = s.x.cloneNode(!0),
					a = webix.ui(t, e);
				a.x.parentNode.appendChild(r);
				var h = webix.animate.formLine(a.x, r, n);
				return n.callback = function() {
					webix.animate.breakLine(h)
				}, webix.animate(h, n), a
			}
		}, webix.ui.animateView = function(t, e, i) {
			if (t = webix.$$(t)) {
				i = i || {
					type: "slide",
					direction: "left"
				};
				for (var s = function(t) {
						var e = t.x,
							i = e.className,
							s = e.innerHTML;
						return "<div class='" + i + "' style='width:" + e.offsetWidth + "px;height:" + e.offsetHeight + "px;'>" + s + "</div>"
					}, n = [], r = 0; r < t.x.childNodes.length; r++) {
					var a = t.x.childNodes[r],
						h = a.currentStyle ? a.currentStyle.display : getComputedStyle(a, null).display;
					n.push(h || "")
				}
				var o = s(t);
				"function" == typeof e && e.call(this);
				for (var l = s(t), c = t.x.insertBefore(webix.html.create("DIV", {
						"class": "webix_view_animate",
						style: "width:" + t.x.offsetWidth + "px;height:" + t.x.offsetHeight + "px;"
					}, l + o), t.x.firstChild), r = 1; r < t.x.childNodes.length; r++) t.x.childNodes[r].style.display = "none";
				var u = webix.animate.formLine(c.childNodes[0], c.childNodes[1], i);
				return i.callback = function() {
					if (c) {
						t.x.removeChild(c), c = null;
						for (var e = 0; e < t.x.childNodes.length; e++) t.x.childNodes[e].style.display = n[e]
					}
				}, webix.animate(u, i), t
			}
		}, webix.ui.Sb = function() {
			var t = webix.html.create("div");
			t.className = "webix_skin_mark", t.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(t);
			var e = t.offsetWidth - t.clientWidth,
				i = {
					110: "air",
					120: "aircompact",
					130: "clouds",
					140: "web",
					150: "terrace",
					160: "metro",
					170: "light",
					180: "glamour",
					190: "touch",
					200: "flat",
					210: "compact",
					220: "material"
				}[10 * Math.floor(t.offsetHeight / 10)];
			if (document.body.removeChild(t), i) {
				var s = webix.skin[i];
				s && s != webix.skin.$active && webix.skin.set(i)
			}
			return webix.env.$customScroll ? 0 : e
		}, webix.ui.scrollSize = webix.env.touch || webix.env.$customScroll ? 0 : 17, webix.ready(function() {
			var t = webix.ui.Sb();
			webix.ui.scrollSize = webix.env.touch ? 0 : t
		}), webix.ui.Tb = function(t) {
			return "$" + t + (this.Ub[t] = (this.Ub[t] || 0) + 1)
		}, webix.ui.Ub = {}, webix.ui.Pb = function() {
			webix.html.addStyle("html, body{ height:100%; }"), document.body.className += " webix_full_screen", webix.ui.Pb = function() {}, webix.Touch.limit(!1)
		}, webix.ui.resize = function() {
			if (!(webix.env.touch && (webix.edit_open_time && new Date - webix.edit_open_time < 500 || webix.mb && new Date - webix.mb < 500) || (webix.UIManager.applyChanges(), webix.callEvent("onClick", []), webix.ui.$freeze)))
				for (var e = t.length - 1; e >= 0; e--) t[e].$destructed ? t.splice(e, 1) : t[e].adjust()
		}, webix.ui.each = function(t, e, i, s) {
			if (t)
				for (var n = s ? [t] : t.getChildViews(), r = 0; r < n.length; r++) e.call(i || webix, n[r]) !== !1 && webix.ui.each(n[r], e, i)
		}, webix.event(window, "resize", webix.ui.resize), e.Wb = {}, e.delay = function(t) {
			webix.ui.Wb[t.id] = t
		}, e.hasMethod = function(t, e) {
			var i = webix.ui[t];
			return i ? (i.b && (i = i.call(webix)), !!webix.ui[t].prototype[e]) : !1
		}, webix.ui.zIndex = function() {
			return webix.ui.zIndexBase++
		}, webix.ui.zIndexBase = 100, e.A = function(t) {
			if (t.view) {
				var i = t.view;
				return new e[i](t)
			}
			if (t.rows || t.cols) {
				for (var s = t.rows || t.cols, n = !1, r = 0; r < s.length; r++) s[r].body && !s[r].view && (n = !0);
				return n ? new e.headerlayout(t) : new e.layout(t)
			}
			return t.cells ? new e.multiview(t) : t.template || t.content ? new e.template(t) : new e.spacer(t)
		}, e.views = {}, webix.$$ = function(t) {
			if (!t) return null;
			if (e.views[t]) return e.views[t];
			if (e.Wb[t]) return webix.ui(e.Wb[t]);
			var i = t;
			if ("object" == typeof t) {
				if (t.s) return t;
				i = t.target || t.srcElement || t
			}
			return e.views[webix.html.locate({
				target: webix.toNode(i)
			}, "view_id")]
		}, webix.isUndefined(window.$$) && (window.$$ = webix.$$), webix.UIExtension = window.webix_view || {}, webix.protoUI({
			name: "baseview",
			$init: function(t) {
				t.id || (t.id = webix.ui.Tb(this.name)), this.Xb = webix.Xb, webix.Xb = null, this.$scope = t.$scope || (this.Xb ? this.Xb.$scope : null), this.x || (this.w = this.x = webix.html.create("DIV", {
					"class": "webix_view"
				}), this.$view = this.x)
			},
			$skin: !1,
			defaults: {
				width: 0,
				height: 0,
				gravity: 1
			},
			getNode: function() {
				return this.x
			},
			getParentView: function() {
				return this.Xb || null
			},
			getTopParentView: function() {
				var t = this.getParentView();
				return t ? t.getTopParentView() : this
			},
			getFormView: function() {
				var t = this.getParentView();
				return !t || t.setValues ? t : t.getFormView()
			},
			getChildViews: function() {
				return []
			},
			isVisible: function(t) {
				if (this.s.hidden) return t && (this.Yb || (this.Yb = [], this.Zb = {}), this.Zb[t] || (this.Zb[t] = !0, this.Yb.push(t))), !1;
				var e = this.getParentView();
				return e ? e.isVisible(t, this.s.id) : !0
			},
			isEnabled: function() {
				if (this.$b) return !1;
				var t = this.getParentView();
				return t ? t.isEnabled() : !0
			},
			disable: function() {
				webix.html.remove(this.$b), this.s.disabled = !0, this.$b = webix.html.create("div", {
					"class": "webix_disabled"
				}), window.getComputedStyle && (this._b = window.getComputedStyle(this.x, null).getPropertyValue("position")), "absolute" != this._b && (this.x.style.position = "relative"), this.x.appendChild(this.$b), webix.html.addCss(this.x, "webix_disabled_view", !0), webix.UIManager.vb(this)
			},
			enable: function() {
				this.s.disabled = !1, this.$b && (webix.html.remove(this.$b), webix.html.removeCss(this.x, "webix_disabled_view"), this.$b = null, this._b && (this.x.style.position = this._b))
			},
			disabled_setter: function(t) {
				return t ? this.disable() : this.enable(), t
			},
			container_setter: function(t) {
				return !0
			},
			css_setter: function(t) {
				return "object" == typeof t && (t = webix.html.createCss(t)), this.x.className += " " + t, t
			},
			id_setter: function(t) {
				if (webix.Mb && (webix.Mb != this || this.Lb)) {
					var e = this.config.$id = t;
					(this.Lb || webix.Mb).Hb[t] = this, t = webix.ui.Tb(this.name), (this.Lb || webix.Mb).Ib[t] = e
				}
				return webix.ui.views[t] = this, this.x.setAttribute("view_id", t), t
			},
			$setSize: function(t, e) {
				var i = this.ac;
				if (i && i[0] == t && i[1] == e) return !1;
				if (this.ac = [t, e], this.$width = this.bc = t - (this.cc ? webix.ui.scrollSize : 0), this.$height = this.dc = e - (this.ec ? webix.ui.scrollSize : 0), this.x.style.width = t + "px", this.x.style.height = e + "px", webix.env.isWebKit) {
					this.x.offsetWidth, this.x.offsetHeight
				}
				return !0
			},
			$getSize: function(t, e) {
				var i = this.s,
					s = [i.width || i.minWidth || 0, i.width || i.maxWidth || 1e5, i.height || i.minHeight || 0, i.height || i.maxHeight || 1e5, i.gravity];
				return s[0] += t, s[1] += t, s[2] += e, s[3] += e, s
			},
			show: function(t, e) {
				var i = this.getParentView(),
					s = !arguments[2];
				if (i) !e && e !== !1 && this.s.animate && i.s.animate && (e = webix.extend(i.s.animate ? webix.extend({}, i.s.animate) : {}, this.s.animate, !0)), (s ? i.fc : i.Fb) && (s ? i.fc : i.Fb).call(i, this, e), s && this.Qd(), t && s && i.show(t);
				else if (this.s.hidden) {
					if (s) {
						var n = webix.toNode(this.s.gt || document.body);
						n.appendChild(this.x), this.s.hidden = !1, this.adjust(), this.Qd()
					}
				} else s || (this.s.hidden = this.s.ft = !0, this.x && (this.s.gt = this.x.parentNode, webix.html.remove(this.x)))
			},
			Qd: function() {
				if (this.Yb) {
					for (var t = 0; t < this.Yb.length; t++) {
						var e = webix.$$(this.Yb[t]);
						e && e.render()
					}
					this.Yb = [], this.Zb = {}
				}
			},
			hidden_setter: function(t) {
				return t && this.hide(), this.s.hidden
			},
			hide: function() {
				this.show(null, null, !0), webix.UIManager.vb(this)
			},
			adjust: function() {
				if (!this.x.parentNode) return !1;
				var t = this.x.parentNode.offsetWidth || 0,
					e = this.x.parentNode.offsetHeight || 0,
					i = this.$getSize(0, 0);
				i[0] > t && (t = i[0]), i[2] > e && (e = i[2]), t > i[1] && (t = i[1]), e > i[3] && (e = i[3]), this.$setSize(t, e)
			},
			resize: function() {
				if (!webix.gc && !webix.ui.$freeze) {
					var t = this.getParentView();
					t ? t.resizeChildren ? t.resizeChildren() : t.resize() : (this.adjust(), webix.callEvent("onResize", []))
				}
			}
		}, webix.Settings, webix.Destruction, webix.BaseBind, webix.UIExtension), webix.protoUI({
			name: "view",
			$init: function(t) {
				this.hc(t)
			},
			hc: function(t) {
				var e = webix.isUndefined(t.borderless);
				e && !this.setPosition && t.$topView && (t.borderless = !0, e = !1), e && this.defaults.borderless || t.borderless ? t.Ob = {
					top: !0,
					left: !0,
					bottom: !0,
					right: !0
				} : (t.Ob || (t.Ob = {}), this.w.style.borderWidth = "1px")
			},
			$getSize: function(t, e) {
				var i = this.s.Ob;
				i && (t += (i.left ? 0 : 1) + (i.right ? 0 : 1), e += (i.top ? 0 : 1) + (i.bottom ? 0 : 1));
				var s = webix.ui.baseview.prototype.$getSize.call(this, t, e);
				return s
			},
			$setSize: function(t, e) {
				var i = this.s.Ob;
				return i && (t -= (i.left ? 0 : 1) + (i.right ? 0 : 1), e -= (i.top ? 0 : 1) + (i.bottom ? 0 : 1)), webix.ui.baseview.prototype.$setSize.call(this, t, e)
			}
		}, webix.ui.baseview)
	}(), webix.ui.view.call(webix), webix.protoUI({
		name: "spacer",
		defaults: {
			borderless: !0
		},
		$init: function() {
			this.x.className += " webix_spacer"
		}
	}, webix.ui.view), webix.protoUI({
		name: "baselayout",
		$init: function(t) {
			this.$ready.push(this.kc), this.y = this.w, this.lc = [], this.ht = [], t.$topView && (t.borderless = !0, t.Ob = {
				top: !0,
				left: !0,
				bottom: !0,
				right: !0
			}), t.isolate && webix.extend(this, webix.IdSpace)
		},
		rows_setter: function(t) {
			this.mc = 1, this.nc = t
		},
		cols_setter: function(t) {
			this.mc = 0, this.$view.style.whiteSpace = "nowrap", this.nc = t
		},
		Rb: function(t) {
			webix.PowerArray.removeAt.call(this.q, webix.PowerArray.find.call(this.q, t)), this.resizeChildren(!0)
		},
		Qb: function(t, e) {
			if (webix.isUndefined(e)) {
				for (var i = 0; i < this.q.length; i++) this.q[i].destructor();
				this.nc = t, this.kc()
			} else {
				var s;
				if ("number" == typeof e) {
					(0 > e || e > this.q.length) && (e = this.q.length);
					var n = (this.q[e] || {}).x;
					webix.PowerArray.insertAt.call(this.q, t, e), t.s.hidden || webix.html.insertBefore(t.x, n, this.y)
				} else {
					s = webix.$$(e), e = webix.PowerArray.find.call(this.q, s);
					var r = s.x.parentNode;
					r && !t.s.hidden && r.insertBefore(t.x, s.x), s.destructor(), this.q[e] = t
				}
				this.mc || this.oc(t), this.q[e].Xb = this
			}
			this.resizeChildren(!0);
			var a = this.elements ? this : this.getFormView();
			a && a.Qs(), webix.callEvent("onReconstruct", [this])
		},
		oc: function(t) {
			t.x.style.display = "inline-block", t.x.style.verticalAlign = "top"
		},
		addView: function(t, e) {
			webix.isUndefined(e) && (e = this.q.length);
			var i = this.getTopParentView();
			return i = i && i.ui ? i : webix, i.ui(t, this, e).s.id
		},
		removeView: function(t) {
			var e;
			e = "object" != typeof t ? webix.$$(t) : t;
			var i = webix.PowerArray.find.call(this.q, e);
			if (i >= 0) {
				this.Vx && this.Vx(i, e);
				var s = this.elements ? this : this.getFormView();
				this.q.splice(i, 1), s && webix.ui.each(e, function(t) {
					t.name && delete s.getCleanValues()[t.config.name]
				}, s, !0), e.destructor(), this.resizeChildren(!0), s && s.Qs()
			}
			webix.callEvent("onReconstruct", [this])
		},
		reconstruct: function() {
			this.qc = 0, this.Qb(this.nc)
		},
		Fb: function(t, e, i) {
			t.s.hidden || (t.s.hidden = !0, webix.html.remove(t.x), this.qc++, i || webix.Nb || this.resizeChildren(!0))
		},
		Lw: function(t) {
			t.callEvent && t.callEvent("onViewShow", [])
		},
		resizeChildren: function() {
			if (!webix.ui.$freeze && this.lc) {
				var t = this.getParentView();
				if (t) return t.resizeChildren ? t.resizeChildren() : t.resize();
				var e, i, s, n, r = this.$getSize(0, 0);
				s = e = this.lc[0] || 0, n = i = this.lc[1] || 0, t ? this.rc(e, i) : (r[0] > e && (s = r[0]), r[2] > i && (n = r[2]), e > r[1] && (s = r[1]), i > r[3] && (n = r[3]), this.$setSize(s, n)), webix.callEvent("onResize", [])
			}
		},
		getChildViews: function() {
			return this.q
		},
		index: function(t) {
			t.s && (t = t.s.id);
			for (var e = 0; e < this.q.length; e++)
				if (this.q[e].s.id == t) return e;
			return -1
		},
		fc: function(t, e, i) {
			if (t.s.hidden) {
				t.s.hidden = !1;
				for (var s = this.index(t) + 1; this.q[s] && this.q[s].s.hidden;) s++;
				var n = this.q[s] ? this.q[s].x : null;
				webix.html.insertBefore(t.x, n, this.y || this.x), this.qc--, i || (this.resizeChildren(!0), t.refresh && t.refresh()), t.callEvent && (t.callEvent("onViewShow", []), webix.ui.each(t, this.Lw))
			}
		},
		showBatch: function(t, e) {
			var i = "undefined" != typeof e;
			if (e = e !== !1, i) this.s.visibleBatch = "";
			else {
				if (this.s.visibleBatch == t) return;
				this.s.visibleBatch = t
			}
			for (var s = [], n = 0; n < this.q.length; n++) this.q[n].s.batch ? this.q[n].s.batch == t ? e ? s.push(this.q[n]) : this.Fb(this.q[n], null, !0) : i || this.Fb(this.q[n], null, !0) : s.push(this.q[n]);
			for (var n = 0; n < s.length; n++) this.fc(s[n], null, !0), s[n].Qd();
			this.resizeChildren(!0)
		},
		kc: function(t) {
			this.q = [];
			for (var e = 0; e < t.length; e++) webix.Xb = this, t[e].Ob || (t[e].borderless = !0), this.q[e] = webix.ui.A(t[e], this), this.mc || this.oc(this.q[e]), this.s.visibleBatch && this.s.visibleBatch != this.q[e].s.batch && this.q[e].s.batch && (this.q[e].s.hidden = !0, this.qc++), this.q[e].s.hidden || ((this.y || this.w).appendChild(this.q[e].x), this.q[e].$nospace && this.qc++);
			this.sc && this.sc(t)
		},
		tc: function(t, e, i) {
			if (this.mc != i)
				for (var s = 0; s < this.q.length; s++) this.q[s].s[t] = e, this.q[s].tc && this.q[s].tc(t, e, i)
		},
		$getSize: function(t, e) {
			var i = 0,
				s = 1e5,
				n = 1e5,
				r = 0;
			this.mc ? n = 0 : s = 0;
			var a = 0,
				h = 0,
				o = 0;
			this.uc = [];
			for (var l = 0; l < this.q.length; l++)
				if (!this.q[l].s.hidden) {
					var c = this.uc[l] = this.q[l].$getSize(0, 0);
					this.q[l].$nospace ? h++ : this.mc ? (c[0] > i && (i = c[0]), c[1] < s && (s = c[1]), r += c[2], n += c[3], c[2] == c[3] && -1 != c[2] ? (a += c[2], h++) : o += c[4]) : (c[2] > r && (r = c[2]), c[3] < n && (n = c[3]), i += c[0], s += c[1], c[0] == c[1] && -1 != c[0] ? (a += c[0], h++) : o += c[4])
				}
			r > n && (n = r), i > s && (s = i), this.vc = [a, this.q.length - h, o], this.ng = [i + t, r + e];
			var u = webix.ui.baseview.prototype.$getSize.call(this, 0, 0);
			return u[1] >= 1e5 && (u[1] = 0), u[3] >= 1e5 && (u[3] = 0), u[0] = (u[0] || i) + t, u[1] = Math.max(u[0], (u[1] || s) + t), u[2] = (u[2] || r) + e, u[3] = Math.max(u[2], (u[3] || n) + e), this.s.responsive && (u[0] = 0), u
		},
		$setSize: function(t, e) {
			this.lc = [t, e], webix.ui.baseview.prototype.$setSize.call(this, t, e), this.rc(t, e)
		},
		wc: function(t, e, i) {
			e = t[e], i = t[i];
			var s = e;
			if (e != i) {
				var n = this.xc * t[4] / this.yc;
				if (e > n) s = e, this.yc -= t[4], this.xc -= s;
				else {
					if (!(n > i)) return -1;
					s = i, this.yc -= t[4], this.xc -= s
				}
			}
			return s
		},
		it: function(t, e) {
			var i = webix.$$(e);
			"hide" !== i && i ? (i || (i = webix.ui({
				view: "popup",
				body: [{}]
			})), t.jt = t.s.width, t.kt = t.s.height, t.lt = i.s.id, t.s.width = 0, t.s.height || (t.s.autoheight = !0), webix.ui(t, i, this.ht.length)) : (t.hide(), webix.delay(this.resize, this), t.lt = "hide"), this.ht.push(t)
		},
		mt: function(t) {
			var e = t.lt;
			t.lt = 0, "hide" !== e && e ? (t.s.width = t.jt, t.s.height = t.kt, delete t.s.autoheight, webix.ui(t, this, 0)) : (t.show(), webix.delay(this.resize, this)), this.ht.pop()
		},
		nt: function(t) {
			if (!this.ot) {
				if (this.ot = !0, t < this.ng[0])
					for (var e = 0; e < this.q.length - 1; e++) {
						var i = this.q[e];
						if (!i.lt) {
							this.it(i, this.s.responsive);
							break
						}
					} else if (this.ht.length) {
						var i = this.ht[this.ht.length - 1],
							s = "hide" == i.lt ? 0 : i.jt,
							n = i.$getSize(s, 0);
						n[0] + this.ng[0] + this.Dc + 20 <= t && this.mt(i)
					}
				this.ot = !1
			}
		},
		rc: function(t, e) {
			webix.gc = (webix.gc || 0) + 1, this.s.responsive && this.nt(t, e), this.xc = (this.mc ? e : t) - this.vc[0], this.yc = this.vc[2];
			for (var i = t, s = e, n = [], r = 0; r < this.q.length; r++)
				if (!this.q[r].s.hidden) {
					var a = this.uc[r];
					if (this.mc) {
						var s = this.wc(a, 2, 3);
						if (0 > s) {
							n.push(r);
							continue
						}
					} else {
						var i = this.wc(a, 0, 1);
						if (0 > i) {
							n.push(r);
							continue
						}
					}
					this.q[r].$setSize(i, s)
				}
			for (var r = 0; r < n.length; r++) {
				var h = n[r],
					a = this.uc[h],
					o = Math.round(this.xc * a[4] / this.yc);
				this.xc -= o, this.yc -= a[4], this.mc ? s = o : i = o, this.q[h].$setSize(i, s)
			}
			webix.gc -= 1
		},
		zc: function(t, e) {
			var i = this.index(t);
			return -1 == i ? null : this.q[i + e]
		},
		Ac: function() {
			return this.q[0]
		}
	}, webix.EventSystem, webix.ui.baseview), webix.protoUI({
		name: "layout",
		$init: function() {
			this.qc = 0
		},
		defaults: {
			type: "line"
		},
		kc: function() {
			this.Bc && (t = this.Bc(t)), this.Uw || (this.x.className += " webix_layout_" + (this.s.type || ""), this.Uw = 1), this.s.margin !== webix.undefined && (this.Cc = this.s.margin), this.s.padding != webix.undefined && (this.Dc = this.Ec = this.s.padding), this.s.paddingX !== webix.undefined && (this.Dc = this.s.paddingX), this.s.paddingY !== webix.undefined && (this.Ec = this.s.paddingY), (this.Ec || this.Dc) && (this.Fc = !0), this.Wx() && !this.s.borderless && (this.w.style.borderWidth = "1px", this.Gc = !0);
			var t = this.nc;
			this.s.borderless && (this.s.Ob = {
				top: !0,
				left: !0,
				right: !0,
				bottom: !0
			}), this.Hc(t), webix.ui.baselayout.prototype.kc.call(this, t), this.Ic(t)
		},
		$getSize: function(t, e) {
			t = t || 0, e = e || 0;
			var i = this.Cc * (this.q.length - this.qc - 1);
			if (this.Gc || this.Wx()) {
				var s = this.s.Ob;
				s && (t += (s.left ? 0 : 1) + (s.right ? 0 : 1), e += (s.top ? 0 : 1) + (s.bottom ? 0 : 1))
			}
			return this.s.height || (e += 2 * (this.Ec || 0) + (this.mc ? i : 0)), this.s.width || (t += 2 * (this.Dc || 0) + (this.mc ? 0 : i)), webix.ui.baselayout.prototype.$getSize.call(this, t, e)
		},
		$setSize: function(t, e) {
			this.lc = [t, e];
			var i;
			i = this.Wx() || this.Gc ? webix.ui.view.prototype.$setSize.call(this, t, e) : webix.ui.baseview.prototype.$setSize.call(this, t, e), e = this.dc, t = this.bc;
			var s = this.s;
			s.scroll && (e = Math.max(e, this.ng[1]), t = Math.max(t, this.ng[0])), this.rc(t, e)
		},
		rc: function(t, e) {
			var i = this.Cc * (this.q.length - this.qc - 1);
			return this.mc ? (e -= i + 2 * this.Ec, t -= 2 * this.Dc) : (t -= i + 2 * this.Dc, e -= 2 * this.Ec), webix.ui.baselayout.prototype.rc.call(this, t, e)
		},
		resizeChildren: function(t) {
			if (t) {
				this.ac = null;
				for (var e = [], i = 0; i < this.q.length; i++) {
					var s = this.q[i];
					e[i] = s.s;
					var n = s.lc && !s.Gc || s.s.borderless ? "0px" : "1px";
					s.x.style.borderTopWidth = s.x.style.borderBottomWidth = s.x.style.borderLeftWidth = s.x.style.borderRightWidth = n
				}
				this.Hc(e);
				for (var i = 0; i < e.length; i++) e[i].borderless && this.q[i].hc && this.q[i].hc(e[i]);
				this.Ic(this.q)
			}
			webix.ui.baselayout.prototype.resizeChildren.call(this)
		},
		Wx: function() {
			return this.Fc && this.Cc > 0 && !this.Xx
		},
		Hc: function(t) {
			if (!this.Wx() || this.s.borderless && "space" != this.s.type) {
				for (var e = 0; e < t.length; e++) t[e].Ob = webix.clone(this.s.Ob);
				var i = !1;
				this.Xx && (i = !0);
				var s = t.length;
				if (this.mc) {
					for (var e = 1; s - 1 > e; e++) t[e].Ob.top = t[e].Ob.bottom = i;
					if (s > 1) {
						for ("head" != this.s.type && (t[0].Ob.bottom = i); t[s - 1].hidden && s > 1;) s--;
						s > 0 && (t[s - 1].Ob.top = i)
					}
				} else {
					for (var e = 1; s - 1 > e; e++) t[e].Ob.left = t[e].Ob.right = i;
					if (s > 1) {
						for ("head" != this.s.type && (t[0].Ob.right = i), t[s - 1].Ob.left = i; s > 1 && t[s - 1].hidden;) s--;
						s > 0 && (t[s - 1].Ob.left = i)
					}
				}
			} else
				for (var e = 0; e < t.length; e++) t[e].Ob && t[e].borderless || (t[e].Ob = {
					top: !1,
					left: !1,
					right: !1,
					bottom: !1
				})
		},
		Jc: function(t, e) {
			e.top && (t.borderTopWidth = "0px"), e.left && (t.borderLeftWidth = "0px"), e.right && (t.borderRightWidth = "0px"), e.bottom && (t.borderBottomWidth = "0px")
		},
		Ic: function(t) {
			for (var e = 0, i = 0; i < t.length; i++) {
				var s = this.q[i],
					n = s.s.Ob;
				if (s.s.hidden && this.q[i + 1]) {
					var r = this.q[i + 1].s.Ob;
					n.top || (r.top = !1), n.left || (r.left = !1), i == e && e++
				}
				this.Jc(s.x.style, s.s.Ob)
			}
			for (var a = this.mc ? "marginLeft" : "marginTop", h = this.mc ? "marginTop" : "marginLeft", o = this.mc ? this.Dc : this.Ec, l = this.mc ? this.Ec : this.Dc, i = 0; i < t.length; i++) this.q[i].x.style[a] = (o || 0) + "px";
			this.q.length && (this.q[e].x.style[h] = (l || 0) + "px");
			for (var c = e + 1; c < t.length; c++) this.q[c].x.style[h] = this.Cc + "px"
		},
		type_setter: function(t) {
			return this.Cc = "undefined" != typeof this.Kc[t] ? this.Kc[t] : this.Kc.line, this.Dc = this.Ec = "undefined" != typeof this.Kc[t] ? this.Lc[t] : this.Lc.line, this.Xx = "material" == t || "clean" == t, "material" == t && (this.s.borderless = !0), t
		},
		$skin: function() {
			var t = webix.skin.$active;
			this.Kc = t.layoutMargin, this.Lc = t.layoutPadding
		}
	}, webix.ui.baselayout), webix.ui.layout.call(webix), webix.animate = function(t, e) {
		var i = e;
		if (webix.isArray(t))
			for (var s = 0; s < t.length; s++) {
				if (webix.isArray(e) && (i = e[s]), "slide" == i.type) {
					if ("out" == i.subtype && 0 === s) continue;
					if ("in" == i.subtype && 1 == s) continue
				}
				if ("flip" != i.type) webix.animate(t[s], i);
				else {
					var n = webix.clone(i);
					0 === s && (n.type = "flipback"), 1 == s && (n.callback = null), webix.animate(t[s], n)
				}
			} else {
				var r = webix.toNode(t);
				r.Mc ? webix.animate.end(r, i) : webix.animate.start(r, i)
			}
	}, webix.animate.end = function(t, e) {
		t.style[webix.env.transitionDuration] = "1ms", t.Mc = null, webix.Nc && window.clearTimeout(webix.Nc), webix.Nc = webix.delay(webix.animate, webix, [t, e], 10)
	}, webix.animate.isSupported = function() {
		return !webix.$testmode && !webix.noanimate && webix.env.transform && webix.env.transition && !webix.env.isOpera
	}, webix.animate.formLine = function(t, e, i) {
		var s = i.direction;
		e.parentNode.style.position = "relative", e.style.position = "absolute", t.style.position = "absolute";
		var n = webix.env.isFF ? "top" == s || "left" == s ? -1 : 1 : 0;
		return "top" == s || "bottom" == s ? (t.style.left = "0px", t.style.top = (i.top || n) + ("top" == s ? 1 : -1) * e.offsetHeight + "px") : (t.style.top = (i.top || 0) + "px", t.style.left = n + ("left" == s ? 1 : -1) * e.offsetWidth + "px"), e.parentNode == t.parentNode && i.keepViews ? t.style.display = "" : webix.html.insertBefore(t, e.nextSibling, e.parentNode), "slide" == i.type && "out" == i.subtype && (t.style.left = "0px", t.style.top = (i.top || 0) + "px", e.parentNode.removeChild(e), webix.html.insertBefore(e, t.nextSibling, t.parentNode)), [t, e]
	}, webix.animate.breakLine = function(t) {
		arguments[1] ? t[1].style.display = "none" : webix.html.remove(t[1]), webix.animate.clear(t[0]), webix.animate.clear(t[1]), t[0].style.position = ""
	}, webix.animate.clear = function(t) {
		t.style[webix.env.transform] = "none", t.style[webix.env.transition] = "none", t.style.top = t.style.left = ""
	}, webix.animate.defaults = {
		type: "slide",
		delay: "0",
		duration: "500",
		timing: "ease-in-out",
		x: 0,
		y: 0
	}, webix.animate.start = function(t, e) {
		"string" == typeof e && (e = {
			type: e
		}), e = webix.Settings.E(e, webix.animate.defaults);
		var i, s, n = webix.env.cssPrefix,
			r = t.Mc = e;
		switch ("slide" == r.type && r.direction) {
			case "right":
				r.x = t.offsetWidth;
				break;
			case "left":
				r.x = -t.offsetWidth;
				break;
			case "top":
				r.y = -t.offsetHeight;
				break;
			case "bottom":
			default:
				r.y = r.y || t.offsetHeight
		}("flip" == r.type || "flipback" == r.type) && (i = [0, 0], s = "scaleX", "vertical" == r.subtype ? (i[0] = 20, s = "scaleY") : i[1] = 20, ("right" == r.direction || "bottom" == r.direction) && (i[0] *= -1, i[1] *= -1));
		var a = r.duration + "ms " + r.timing + " " + r.delay + "ms",
			h = n + "TransformStyle: preserve-3d;",
			o = "",
			l = "";
		switch (r.type) {
			case "fade":
				o = "opacity " + a, h = "opacity: 0;";
				break;
			case "show":
				o = "opacity " + a, h = "opacity: 1;";
				break;
			case "flip":
				a = r.duration / 2 + "ms " + r.timing + " " + r.delay + "ms", l = "skew(" + i[0] + "deg, " + i[1] + "deg) " + s + "(0.00001)", o = "all " + a;
				break;
			case "flipback":
				r.delay += r.duration / 2, a = r.duration / 2 + "ms " + r.timing + " " + r.delay + "ms", t.style[webix.env.transform] = "skew(" + -1 * i[0] + "deg, " + -1 * i[1] + "deg) " + s + "(0.00001)", t.style.left = "0", l = "skew(0deg, 0deg) " + s + "(1)", o = "all " + a;
				break;
			case "slide":
				var c = r.x + "px",
					u = r.y + "px";
				l = webix.env.translate + "(" + c + ", " + u + ("translate3d" == webix.env.translate ? ", 0" : "") + ")", o = n + "transform " + a
		}
		webix.delay(function() {
			t.style[webix.env.transition] = o, webix.delay(function() {
				h && (t.style.cssText += h), l && (t.style[webix.env.transform] = l);
				var e = !1,
					i = webix.event(t, webix.env.transitionEnd, function(s) {
						t.Mc = null, r.callback && r.callback.call(r.master || window, t, r, s), e = !0, webix.eventRemove(i)
					});
				window.setTimeout(function() {
					e || (t.Mc = null, r.callback && r.callback.call(r.master || window, t, r), e = !0, webix.eventRemove(i))
				}, 1.3 * (1 * r.duration + 1 * r.delay))
			})
		})
	}, webix.MouseEvents = {
		$init: function(t) {
			t = t || {}, this.Oc = 0, this.Pc = 300, this.Qc = null, this.Rc(t.onClick, "on_click"), this.Rc(t.onContext, "on_context"), this.Rc(t.onDblClick, "on_dblclick"), this.Rc(t.onMouseMove, "on_mouse_move"), this.on_click && (webix.event(this.w, "click", this.Sc, {
				bind: this
			}), webix.env.isIE8 && this.on_dblclick && webix.event(this.w, "dblclick", this.Tc, {
				bind: this
			})), this.on_context && webix.event(this.w, "contextmenu", this.Uc, {
				bind: this
			}), this.on_mouse_move && this.Vc()
		},
		Vc: function() {
			this.Wc || (this.on_mouse_move = this.on_mouse_move || {}, webix.event(this.w, "mousemove", this.Xc, {
				bind: this
			}), webix.event(this.w, webix.env.isIE ? "mouseleave" : "mouseout", this.Xc, {
				bind: this
			}), this.Wc = 1)
		},
		Rc: function(t, e) {
			if (t) {
				var i = this[e],
					s = i ? webix.extend({}, i) : {};
				this[e] = webix.extend(s, t)
			}
		},
		Sc: function(t) {
			if (!this.isEnabled()) return !1;
			if (webix.UIManager.sb(this), this.on_dblclick) {
				var e = (new Date).valueOf();
				if (e - this.Oc <= this.Pc && this.locate) {
					var i = this.locate(t);
					if ("" + i == "" + this.Qc) return this.Oc = 0, this.Tc(t)
				}
				this.Oc = e
			}
			var s = this.Yc(t, this.on_click, "ItemClick");
			return s
		},
		Tc: function(t) {
			return this.Yc(t, this.on_dblclick, "ItemDblClick")
		},
		Uc: function(t) {
			this.Yc(t, this.on_context, "BeforeContextMenu", "AfterContextMenu")
		},
		Xc: function(t) {
			if (document.createEventObject) t = document.createEventObject(event);
			else if (!(webix.$testmode || webix.isUndefined(t.movementY) || t.movementY || t.movementX)) return;
			this.Zc && window.clearTimeout(this.Zc), this.callEvent("onMouseMoving", [t]), this.Zc = window.setTimeout(webix.bind(function() {
				"mousemove" == t.type ? this.$c(t) : this._c(t)
			}, this), this.s.mouseEventDelay || 500)
		},
		$c: function(t) {
			this.Yc(t, this.on_mouse_move, "MouseMove") || this.callEvent("onMouseOut", [t || event])
		},
		_c: function(t) {
			this.callEvent("onMouseOut", [t || event])
		},
		Yc: function(t, e, i, s) {
			if (t = t || event, !t.processed && this.x) {
				t.processed = !0;
				var n = t.target || t.srcElement;
				if (webix.env.isIE8) {
					var r = this.s.id,
						a = n.w_view;
					if (a) {
						if (a !== r) return
					} else n.w_view = r
				}
				for (var h = "", o = null, l = !1; n && n.parentNode && n != this.x.parentNode;) {
					if (!l && n.getAttribute && (o = n.getAttribute(this.ad))) {
						if (this.Qc = o, this.callEvent) {
							if (!this.callEvent("on" + i, [o, t, n])) return;
							s && this.callEvent("on" + s, [o, t, n])
						}
						l = !0
					}
					if (h = n.className) {
						h = h.toString().split(" ");
						for (var c = 0; c < h.length; c++)
							if (e[h[c]]) {
								var u = webix.toFunctor(e[h[c]], this.$scope),
									d = u.call(this, t, o || webix.html.locate(t, this.ad), n);
								if (d === !1) return l
							}
					}
					n = n.parentNode
				}
				return l
			}
		}
	}, webix.protoUI({
		name: "accordionitem",
		$init: function(t) {
			this.x.innerHTML = "<div webix_ai_id='" + t.id + "'  class='webix_accordionitem_header'><div class='webix_accordionitem_button' ></div><div class='webix_accordionitem_label' ></div></div><div class='webix_accordionitem_body'></div>", this.w = this.x, this.bd = this.w.childNodes[0], t.header || (this.bd.style.display = "none"), this.cd = this.w.childNodes[0].childNodes[1], this.dd = this.w.childNodes[0].childNodes[0], this.ed = this.w.childNodes[1], this.x.className += " webix_accordionitem", this.fd = this.gd = null, this.q = !0
		},
		Rb: function() {
			this.gd = {
				destructor: function() {}
			}
		},
		Qb: function(t) {
			this.gd.destructor(), this.gd = t, this.gd.Xb = this, this.ed.appendChild(this.gd.x), this.resize()
		},
		ad: "webix_ai_id",
		getChildViews: function() {
			return [this.gd]
		},
		body_setter: function(t) {
			return "object" != typeof t && (t = {
				template: t
			}), t.Ob = {
				top: !0,
				left: !0,
				right: !0,
				bottom: !0
			}, this.gd = webix.ui.A(t), this.gd.$view.style.border = "0px solid red", this.gd.Xb = this, this.ed.appendChild(this.gd.x), t
		},
		header_setter: function(t) {
			return t && (t = webix.template(t)), t
		},
		headerAlt_setter: function(t) {
			return t && (t = webix.template(t)), t
		},
		$getSize: function(t, e) {
			var i = this.gd.$getSize(0, 0),
				s = this.s.Ob;
			s && (t += (s.left ? 0 : 1) + (s.right ? 0 : 1), e += (s.top ? 0 : 1) + (s.bottom ? 0 : 1));
			var n = 0,
				r = webix.ui.baseview.prototype.$getSize.call(this, 0, 0);
			r[0] = (r[0] || i[0]) + t, r[1] >= 1e5 && (r[1] = i[1]), r[1] += t, r[2] = (r[2] || i[2]) + e;
			var a = r[3] < 1e5;
			return a || (r[3] = i[3]), r[3] += e, this.getParentView().mc ? this.s.collapsed ? r[2] = r[3] = this.hd() : this.s.header && (n = this.s.headerHeight) : (this.s.collapsed && (r[0] = r[1] = this.hd()), this.s.header && (n = this.s.headerHeight)), a || (r[2] += n, r[3] += n), r
		},
		on_click: {
			webix_accordionitem_header: function(t) {
				return this.id(t), !1
			},
			webix_accordionitem_header_v: function(t) {
				return this.id(t), !1
			}
		},
		id: function() {
			this.define("collapsed", !this.s.collapsed)
		},
		collapsed_setter: function(t) {
			if (this.s.header !== !1) {
				var e = this.getParentView();
				if (e) {
					if (t)
						if (e.jd(this)) this.kd();
						else {
							var i = 0;
							if (e.q.length > 1)
								for (var s = 0; s < e.q.length; s++) {
									var n = e.q[s];
									if (this != n && n.isVisible()) {
										n.expand(), this.kd(), i = 1;
										break
									}
								}
							if (!i) return
						}
					else this.ld();
					this.s.collapsed = t, t || e.md(this), this.refresh(), webix.Nb || this.resize(), e.callEvent("onAfter" + (t ? "Collapse" : "Expand"), [this.s.id]), this.s.$noresize = t
				}
				return t
			}
		},
		collapse: function() {
			this.define("collapsed", !0), webix.UIManager.vb(this)
		},
		expand: function() {
			this.define("collapsed", !1)
		},
		fc: function() {
			this.show()
		},
		Fb: function() {
			this.hide()
		},
		ld: function() {
			this.ed.style.display = "", webix.html.removeCss(this.$view, "collapsed"), webix.html.removeCss(this.bd, "collapsed")
		},
		kd: function() {
			this.getParentView().mc;
			this.s.headerAlt && (this.cd.innerHTML = this.s.headerAlt()), this.ed.style.display = "none", webix.html.addCss(this.$view, "collapsed"), webix.html.addCss(this.bd, "collapsed")
		},
		refresh: function() {
			var t = this.s[this.s.collapsed ? "headerAlt" : "header"] || this.s.header;
			t && (this.cd.innerHTML = t());
			var e = this.getParentView().mc ? "vertical" : "horizontal";
			this.x.className.indexOf(" " + e) < 0 && webix.html.addCss(this.x, e), webix.env.transform || webix.html.addCss(this.x, "webix_ie", !0)
		},
		hd: function() {
			return this.s.collapsed ? this.s.headerAltHeight : this.s.headerHeight
		},
		$setSize: function(t, e) {
			if (webix.ui.view.prototype.$setSize.call(this, t, e) || this.hd() != this.CA) {
				t = this.bc, e = this.dc;
				var i = this.CA = this.hd();
				if (this.s.header)
					if (this.bd.style.height = i + "px", this.bd.style.width = "auto", this.bd.style[webix.env.transform] = "", this.bd.style.borderBottomWidth = (this.s.collapsed ? 0 : 1) + "px", this.getParentView().mc || !this.s.collapsed) e -= this.hd();
					else if (this.s.collapsed)
					if (webix.animate.isSupported()) {
						this.bd.style.width = e + "px", this.bd.style.height = t + 3 + "px";
						var s = Math.floor(e / 2 - t / 2) + (t - this.s.headerAltHeight) / 2;
						this.bd.style[webix.env.transform] = "rotate(90deg) translate(" + s + "px, " + (s + 1) + "px)"
					} else this.bd.style.width = t + "px", this.bd.style.height = e + 3 + "px";
				this.s.collapsed || (this.gd.$setSize(t, e), this.ct = e)
			} else if (!this.s.collapsed) {
				var n = this.gd;
				this.ct && n.$setSize(this.bc, this.ct)
			}
		},
		$skin: function() {
			var t = this.defaults;
			t.headerAltHeight = t.headerHeight = webix.skin.$active.barHeight, webix.skin.$active.borderlessAccordion && (t.borderless = !0)
		},
		defaults: {
			header: !1,
			headerAlt: !1,
			body: ""
		}
	}, webix.MouseEvents, webix.EventSystem, webix.ui.view), webix.protoUI({
		name: "accordion",
		defaults: {
			panelClass: "accordionitem",
			multi: !1,
			collapsed: !1
		},
		addView: function() {
			var t = webix.ui.layout.prototype.addView.apply(this, arguments),
				e = webix.$$(t);
			return e.collapsed_setter && e.refresh && e.refresh(), t
		},
		kc: function() {
			for (var t = this.s.panelClass, e = this.nc, i = 0; i < e.length; i++) !e[i].body && !e[i].header || e[i].view || (e[i].view = t), webix.isUndefined(e[i].collapsed) && (e[i].collapsed = this.s.collapsed);
			this.nd = !0, webix.ui.layout.prototype.kc.call(this), this.nd = !1;
			for (var i = 0; i < this.q.length; i++) this.q[i].name == t && this.q[i].refresh(), this.q[i].od = !1;
			for (var s = !1, i = this.q.length - 1; i >= 0 && !s; i--) this.q[i].s.hidden || (this.q[i].od = !0, s = !0)
		},
		md: function(t) {
			if (this.s.multi === !1 && this.nd !== !0)
				for (var e = 0; e < this.q.length; e++) t != this.q[e] && !this.q[e].s.collapsed && this.q[e].collapse && this.q[e].collapse()
		},
		jd: function(t) {
			if (this.s.multi === !0 || this.nd) return !0;
			for (var e = 0; e < this.q.length; e++)
				if (t != this.q[e] && !this.q[e].s.collapsed && this.q[e].isVisible()) return !0;
			return !1
		},
		$skin: function() {
			var t = this.defaults;
			webix.skin.$active.accordionType && (t.type = webix.skin.$active.accordionType)
		}
	}, webix.ui.layout), webix.protoUI({
		name: "headerlayout",
		defaults: {
			type: "accordion",
			multi: "mixed",
			collapsed: !1
		}
	}, webix.ui.accordion), webix.DragControl = {
		pd: webix.toArray(["dummy"]),
		addDrop: function(t, e, i) {
			t = webix.toNode(t), t.webix_drop = this.qd(e), i && (t.webix_master = !0)
		},
		qd: function(t) {
			t = t || webix.DragControl;
			var e = this.pd.find(t);
			return 0 > e && (e = this.pd.length, this.pd.push(t)), e
		},
		UB: function(t) {
			var e = webix.DragControl,
				i = this.VB();
			if (i && i.WB) {
				e.v || e.createDrag(t);
				var s = e.Gd;
				e.v.style.left = t.x + e.left + (s.x_offset || 0) + "px", e.v.style.top = t.y + e.top + (s.y_offset || 0) + "px"
			}
		},
		addDrag: function(t, e) {
			t = webix.toNode(t), t.webix_drag = this.qd(e), webix.event(t, webix.env.mouse.down, this.rd, {
				bind: t
			}), webix.event(t, "dragstart", webix.html.preventEvent)
		},
		rd: function(t) {
			if (webix.DragControl.sd) {
				if (webix.DragControl.td == t) return;
				webix.DragControl.ud(), webix.DragControl.destroyDrag(t)
			}
			webix.DragControl.sd = this;
			var e = webix.env.mouse.context(t);
			webix.DragControl.vd = e, webix.DragControl.td = t, webix.DragControl.wd = webix.event(document.body, webix.env.mouse.move, webix.DragControl.xd), webix.DragControl.yd = webix.event(document.body, webix.env.mouse.up, webix.DragControl.ud), webix.html.addCss(document.body, "webix_noselect", 1)
		},
		ud: function() {
			webix.DragControl.zd()
		},
		xd: function(t) {
			var e = webix.env.mouse.context(t),
				i = webix.DragControl.VB(),
				s = i && webix.env.touch && i.WB && !webix.Touch.qm;
			return s || Math.abs(e.x - webix.DragControl.vd.x) < 5 && Math.abs(e.y - webix.DragControl.vd.y) < 5 || (webix.DragControl.zd(!0), !webix.DragControl.v && !webix.DragControl.createDrag(webix.DragControl.td)) ? void 0 : (webix.DragControl.sendSignal("start"), webix.DragControl.wd = webix.event(document.body, webix.env.mouse.move, webix.DragControl.Ad), webix.DragControl.yd = webix.event(document.body, webix.env.mouse.up, webix.DragControl.Bd), webix.DragControl.Ad(t), webix.env.touch ? webix.html.preventEvent(t) : void 0)
		},
		Bd: function(t) {
			webix.DragControl.zd(), webix.DragControl.td = null, webix.DragControl.Cd && (webix.DragControl.$drop(webix.DragControl.sd, webix.DragControl.Cd, t), webix.DragControl.$dragOut(webix.DragControl.sd, webix.DragControl.Cd, null, t)), webix.DragControl.destroyDrag(t), webix.DragControl.sendSignal("stop")
		},
		zd: function(t) {
			this.wd = webix.eventRemove(this.wd), this.yd = webix.eventRemove(this.yd), t || webix.html.removeCss(document.body, "webix_noselect")
		},
		Ad: function(t) {
			var e = webix.DragControl,
				i = webix.html.pos(t),
				s = webix.env.mouse.context(t),
				n = e.$dragPos(i, t),
				r = e.Gd;
			if (e.v.style.top = i.y + e.top + (n || !r.y_offset ? 0 : r.y_offset) + "px", e.v.style.left = i.x + e.left + (n || !r.x_offset ? 0 : r.x_offset) + "px", e.Ed) e.Ed = !1;
			else {
				var a = s.target = webix.env.touch ? document.elementFromPoint(s.x, s.y) : s.target,
					h = webix.env.touch ? s : t;
				e.Fd(a, h)
			}
			return webix.html.preventEvent(t)
		},
		Fd: function(t, e) {
			for (; t && "BODY" != t.tagName;) {
				if (t.webix_drop) {
					if (this.Cd && (this.Cd != t || t.webix_master) && this.$dragOut(this.sd, this.Cd, t, e), !this.Cd || this.Cd != t || t.webix_master) return this.Cd = null, this.Dd = this.$dragIn(webix.DragControl.sd, t, e), void(this.Dd && (this.Cd = t));
					return
				}
				t = t.parentNode
			}
			this.Cd && (this.Cd = this.Dd = this.$dragOut(this.sd, this.Cd, null, e))
		},
		sendSignal: function(t) {
			webix.DragControl.active = "start" == t
		},
		getMaster: function(t) {
			return this.pd[t.webix_drag || t.webix_drop]
		},
		getContext: function() {
			return this.Gd
		},
		getNode: function() {
			return this.v
		},
		createDrag: function(t) {
			var e = webix.DragControl,
				i = e.sd;
			e.Gd = {};
			var s, n = this.pd[i.webix_drag];
			if (n.$dragCreate) {
				if (s = n.$dragCreate(i, t), !s) return !1;
				this.ZB(t), s.style.position = "absolute"
			} else {
				var r = e.$drag(i, t);
				if (e.ZB(t), !r) return !1;
				s = document.createElement("DIV"), s.innerHTML = r, s.className = "webix_drag_zone", document.body.appendChild(s);
				var a = e.Gd;
				a.html && webix.env.pointerevents && (a.x_offset = -Math.round(.5 * s.offsetWidth), a.y_offset = -Math.round(.75 * s.offsetHeight))
			}
			return s.style.zIndex = Math.max(s.style.zIndex, webix.ui.zIndex()), webix.DragControl.Hd = webix.event(s, webix.env.mouse.move, webix.DragControl.Id), webix.DragControl.Gd.from || (webix.DragControl.Gd = {
				source: i,
				from: i
			}), webix.DragControl.v = s, !0
		},
		Id: function() {
			webix.DragControl.Ed = !0
		},
		destroyDrag: function(t) {
			var e = webix.DragControl.sd,
				i = this.pd[e.webix_drag];
			i && i.$dragDestroy ? (webix.DragControl.Hd = webix.eventRemove(webix.DragControl.Hd), webix.DragControl.v && i.$dragDestroy(e, webix.DragControl.v, t)) : webix.html.remove(webix.DragControl.v), webix.DragControl.Dd = webix.DragControl.sd = webix.DragControl.Cd = webix.DragControl.v = null
		},
		VB: function() {
			return webix.DragControl.pd[webix.DragControl.sd.webix_drag]
		},
		top: 5,
		left: 5,
		ZB: function(t) {
			var e = webix.DragControl,
				i = e.vd,
				s = e.Gd;
			if ("undefined" != typeof s.x_offset && "undefined" != typeof s.y_offset) return null;
			if (s.x_offset = s.y_offset = 0, webix.env.pointerevents) {
				var n = webix.DragControl.VB();
				if (n.WB && n !== this) {
					var r = n.WB(i, t);
					r && (s.x_offset = r.x - i.x, s.y_offset = r.y - i.y)
				}
			}
		},
		$dragPos: function(t, e) {
			var i = this.pd[webix.DragControl.sd.webix_drag];
			return i.$dragPos && i != this ? (i.$dragPos(t, e, webix.DragControl.v), !0) : void 0
		},
		$dragIn: function(t, e, i) {
			var s = this.pd[e.webix_drop];
			return s.$dragIn && s != this ? s.$dragIn(t, e, i) : (e.className = e.className + " webix_drop_zone", e)
		},
		$dragOut: function(t, e, i, s) {
			var n = this.pd[e.webix_drop];
			return n.$dragOut && n != this ? n.$dragOut(t, e, i, s) : (e.className = e.className.replace("webix_drop_zone", ""), null)
		},
		$drop: function(t, e, i) {
			var s = this.pd[e.webix_drop];
			return webix.DragControl.Gd.from = webix.DragControl.getMaster(t), s.$drop && s != this ? s.$drop(t, e, i) : void e.appendChild(t)
		},
		$drag: function(t, e) {
			var i = this.pd[t.webix_drag];
			return i.$drag && i != this ? i.$drag(t, e) : "<div style='" + t.style.cssText + "'>" + t.innerHTML + "</div>"
		}
	}, webix.attachEvent("onLongTouch", function(t) {
		webix.DragControl.sd && webix.DragControl.UB(t)
	}), webix.DataMove = {
		copy: function(t, e, i, s) {
			s = s || {};
			var n = s.newId || t;
			i = i || this;
			var r = this.getItem(t);
			return i && (r = i.Jd(r)), i.data.add(i.Jd(r, n), e, s.parent || 0)
		},
		Kd: function(t, e, i) {
			if (e && t) {
				var s = this.getIndexById(t);
				return s + (i == this && i.getIndexById(e) < s ? 0 : 1)
			}
		},
		move: function(t, e, i, s) {
			s = s || {};
			var n = s.newId || t;
			if (i = i || this, i.data) {
				if (webix.isArray(t)) {
					t.length > 3 && (this.$blockRender = i.$blockRender = !0);
					for (var r = 0; r < t.length; r++) {
						var a = this.move(t[r], e, i, s);
						e = i.Kd(a, t[r + 1], this)
					}
					return this.$blockRender = i.$blockRender = !1, void(t.length > 3 && (this.refresh(), i != this && i.refresh()))
				}
				var a = t,
					h = this.getItem(t);
				return i && i != this ? (a = i.data.add(i.Jd(h, n), e, s.parent || 0), this.data.remove(t)) : (0 > e && (e = this.data.order.length - 1), this.data.move(this.getIndexById(t), e), this.data.callEvent("onDataMove", [t, e, null, this.data.order[e + 1]])), a
			}
		},
		moveUp: function(t, e) {
			return this.move(t, this.getIndexById(t) - (e || 1))
		},
		moveDown: function(t, e) {
			return this.moveUp(t, -1 * (e || 1))
		},
		moveTop: function(t) {
			return this.move(t, 0)
		},
		moveBottom: function(t) {
			return this.move(t, this.data.count() - 1)
		},
		Jd: function(t, e) {
			var i = webix.extend({}, t);
			return i.id = !e || this.data.pull[e] ? webix.uid() : e, i.$template = null, this.s.externalData && (i = this.s.externalData.call(this, i, e)), i
		}
	}, webix.Movable = {
		move_setter: function(t) {
			return t && (this.Ld = webix.clone(this.Ld), this.Ld.master = this, webix.DragControl.addDrag(this.bd, this.Ld)), t
		},
		Ld: {
			$dragCreate: function(t, e) {
				if (this.master.config.move) {
					var i = webix.html.offset(t),
						s = webix.html.pos(e);
					return webix.DragControl.top = i.y - s.y, webix.DragControl.left = i.x - s.x, webix.toNode(this.master.x)
				}
			},
			$dragDestroy: function(t, e) {
				var i = this.master;
				i.s && (i.s.top = parseInt(e.style.top, 10), i.s.left = parseInt(e.style.left, 10)), webix.DragControl.top = webix.DragControl.left = 5, this.master.callEvent("onViewMoveEnd", [])
			},
			$dragPos: function(t, e) {
				this.master.callEvent("onViewMove", [t, e])
			}
		}
	}, webix.Modality = {
		Md: function(t) {
			if (t) {
				if (!this.Nd) {
					this.Nd = webix.html.create("div", {
						"class": "webix_modal"
					});
					var e = this.s.zIndex || webix.ui.zIndex();
					this.Od = webix.Pd, webix.Pd = e, this.Nd.style.zIndex = e - 1, this.x.style.zIndex = e, document.body.appendChild(this.Nd), webix.event(this.Nd, "click", webix.bind(this.Vw, this))
				}
			} else if (this.Nd) {
				webix.html.remove(this.Nd);
				var i = this.Od;
				setTimeout(function() {
					webix.Pd = i
				}, 1), this.Nd = null
			}
			return t
		}
	}, webix.protoUI({
		name: "window",
		$init: function(t) {
			this.x.innerHTML = "<div class='webix_win_content'><div class='webix_win_head'></div><div class='webix_win_body'></div></div>", this.w = this.x.firstChild, this.bd = this.w.childNodes[0], this.y = this.ed = this.w.childNodes[1], this.x.className += " webix_window", this.fd = this.gd = null, this.s.Ob = {
				top: !1,
				left: !1,
				right: !1,
				bottom: !1
			}, t.id || (t.id = webix.uid()), webix.event(this.w, "click", webix.bind(this.Vw, this)), this.w.addEventListener && webix.event(this.w, "click", function() {
				!this.s.zIndex && this.s.toFront && (this.x.style.zIndex = webix.ui.zIndex())
			}, {
				bind: this,
				capture: !0
			}), t.modal && (this.my = !0)
		},
		Vw: function(t) {
			var e = webix.ui.et,
				i = e.find(this); - 1 == i && (i = e.length - 1), t.click_view = i, webix.env.isIE8 && (t.srcElement.click_view = i)
		},
		getChildViews: function() {
			return this.fd ? [this.fd, this.gd] : [this.gd]
		},
		zIndex_setter: function(t) {
			return this.x.style.zIndex = t, t
		},
		Rb: function() {
			this.gd = {
				destructor: function() {}
			}
		},
		Qb: function(t) {
			this.gd.destructor(), this.gd = t, this.gd.Xb = this, this.ed.appendChild(this.gd.x);
			var e = this.gd.x.style;
			e.borderTopWidth = e.borderBottomWidth = e.borderLeftWidth = e.borderRightWidth = "1px", this.gd.s.Ob = webix.clone(this.s.Ob), this.resize(!0)
		},
		show: function(t, e, i) {
			if (!this.callEvent("onBeforeShow", arguments)) return !1;
            setTimeout(function(){ $('button').blur(); }, 30);
			this.s.hidden = !1, this.x.style.zIndex = this.s.zIndex || webix.ui.zIndex(), (this.s.modal || this.my) && (this.Md(!0), this.my = null);
			var s, n, r;
			if (e = e || {}, e.pos || (e.pos = this.s.relative), t) {
				"object" != typeof t || t.tagName ? (t = webix.toNode(t), s = webix.html.offset(t)) : t.target || t.srcElement ? (s = webix.html.pos(t), n = 20, r = 5) : s = t;
				var a = Math.max(window.innerWidth || 0, document.body.offsetWidth),
					h = Math.max(window.innerHeight || 0, document.body.offsetHeight);
				n = n || t.offsetWidth || 0, r = r || t.offsetHeight || 0;
				var o = this.ac,
					l = s.x,
					c = s.y,
					u = 0,
					d = 0;
				if (this.s.autofit) {
					var f = 6,
						b = 6,
						x = 6;
					i = "top", c = 0, l = 0, a - s.x - n < o[0] && "right" == e.pos && (e.pos = "left"), "right" == e.pos ? (l = s.x + f + n, b = -r, i = "left", u = Math.round(s.y + r / 2), d = l - x) : "left" == e.pos ? (l = s.x - f - o[0] - 1, b = -r, i = "right", u = Math.round(s.y + r / 2), d = l + o[0] + 1) : (l = s.x < 0 ? 0 : a - s.x > o[0] ? s.x : a - f - o[0], d = Math.round(s.x + n / 2), d > l + o[0] && (d = l + o[0] / 2));
					var p = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
					(!o[1] || h + p - r - s.y - b > o[1]) && "top" != e.pos ? (c = r + s.y + b - 4, u || (i = "top", u = c - x)) : (c = s.y - b - o[1], 0 > c ? (c = 0, "top" == i && (i = !1)) : u || (i = "bottom", c--, u = c + o[1] + 1))
				}
				var w = e.x || 0,
					v = e.y || 0;
				this.setPosition(l + w, c + v), this.Rd && (i ? this.Rd(i, d + w, u + v) : this.Sd())
			} else this.s.position && this.Td();
			this.x.style.display = "block", this.Ww = 1, webix.delay(function() {
				this.Ww = 0
			}, this, [], webix.env.touch ? 400 : 100), this.Qd(), this.config.autofocus && (this.Vd = webix.UIManager.getFocus(), webix.UIManager.setFocus(this)), -1 == webix.ui.et.find(this) && webix.ui.et.push(this), this.callEvent("onShow", [])
		},
		Fb: function(t) {
			if (!(this.s.hidden || this.s.modal || this.Ww || t && t.showpopup || webix.Pd && this.s.zIndex <= webix.Pd)) {
				if (t) {
					var e = webix.env.isIE8 ? t.srcElement.click_view : t.click_view;
					e || 0 === e || (e = -1);
					var i = webix.ui.et.find(this);
					if (e >= i) return
				}
				this.hide()
			}
		},
		hidden_setter: function(t) {
			return t ? this.hide() : this.show(), !!t
		},
		hide: function(t) {
			if (!this.$destructed && (t || !this.s.hidden)) {
				if (this.s.modal && this.Md(!1), "top" == this.s.position ? webix.animate(this.x, {
						type: "slide",
						x: 0,
						y: -(this.dc + 20),
						duration: 300,
						callback: this.Wd,
						bind: this
					}) : this.Wd(), this.s.autofocus) {
					var e = document.activeElement;
					e && this.x && (this.x.contains(e) || e === document.body) && (webix.UIManager.setFocus(this.Vd), this.Vd = null)
				}
				this.ny()
			}
		},
		ny: function() {
			var t = webix.ui.et,
				e = t.find(this),
				i = t.length - 1;
			if (e > -1)
				for (var s = i; s > e; s--) t[s].Sd && t[s].hide();
			t.removeAt(e)
		},
		destructor: function() {
			this.Md(!1), webix.html.remove(this.x), this.s.autofocus && (webix.B || webix.UIManager.setFocus(this.Vd), this.Vd = null), this.ny(), this.Sd && this.Sd(), webix.Destruction.destructor.apply(this, [])
		},
		Wd: function() {
			this.$destructed || (this.x.style.display = "none", this.s.hidden = !0, this.callEvent("onHide", []))
		},
		/*close: function() {
			this.destructor()
		},*/
        close: function(ignoreConfirm) {
			var t = this;
			var dig = function(childs){
				for(var x in childs){
					switch(childs[x].config.view){
						case "combo": if(childs[x].getPopup()){ childs[x].getPopup().hide(); } break;
						case "richselect": if(childs[x].getPopup()){ childs[x].getPopup().hide(); } break;
						case "text": if(childs[x].config.suggest){ $$(childs[x].config.suggest).hide(); } break;
						case "suggest": childs[x].hide(); break;
						case "popup": childs[x].hide(); break;
					}
					dig(childs[x].getChildViews());
				}
			}

			if(t.config.confirmBeforeClose&&!ignoreConfirm){
				webix.confirm({
					type :"confirm-warning",
					text:webix.locale.confirmWindowClose.text,
					ok:webix.locale.confirmWindowClose.keep,
					cancel:webix.locale.confirmWindowClose.close,
					callback:function(close){
						if(close){
							t.config.confirmBeforeClose = false;
							dig($$(t.config.id).getChildViews());
							webix.UIManager.removeHotKey("enter");
							t.destructor();
						}
					}
				});
			} else {
				t.config.confirmBeforeClose = false;
				dig($$(t.config.id).getChildViews());
				webix.UIManager.removeHotKey("enter");
				t.destructor();
			}
			setTimeout(function(){ $('button').blur(); }, 30);
		},
		Xd: function(t) {
			t.borderless = !0
		},
		body_setter: function(t) {
			return "object" != typeof t && (t = {
				template: t
			}), this.Xd(t), webix.Xb = this, this.gd = webix.ui.A(t), this.gd.Xb = this, this.ed.appendChild(this.gd.x), t
		},
		head_setter: function(t) {
			return t === !1 ? t : ("object" != typeof t && (t = {
				template: t,
				padding: 0
			}), t.borderless = !0, webix.Xb = this, this.fd = webix.ui.A(t), this.fd.Xb = this, this.bd.appendChild(this.fd.x), t)
		},
		getBody: function() {
			return this.gd
		},
		getHead: function() {
			return this.fd
		},
		adjust: function() {
			return this.resize()
		},
		resizeChildren: function() {
			this.gd && this.resize()
		},
		resize: function() {
			webix.ui.baseview.prototype.adjust.call(this), this.Td(this.s.left, this.s.top)
		},
		Td: function(t, e) {
			if (this.s.position) {
				this.$view.style.position = "fixed";
				var i = this.bc,
					s = this.dc,
					n = window.innerWidth || document.documentElement.offsetWidth,
					r = window.innerHeight || document.documentElement.offsetHeight,
					a = Math.round((n - i) / 2),
					h = Math.round((r - s) / 2);
				if ("function" == typeof this.s.position) {
					var o = {
						left: a,
						top: h,
						width: i,
						height: s,
						maxWidth: n,
						maxHeight: r
					};
					this.s.position.call(this, o), (o.width != i || o.height != s) && this.$setSize(o.width, o.height), this.setPosition(o.left, o.top)
				} else "top" == this.s.position && (h = webix.animate.isSupported() ? -1 * s : 10), this.setPosition(a, h);
				"top" == this.s.position && webix.animate(this.x, {
					type: "slide",
					x: 0,
					y: s - 2 * (this.s.padding || 0),
					duration: 300,
					callback: this.Yd,
					bind: this
				})
			} else this.setPosition(t, e)
		},
		Yd: function(t) {
			webix.animate.clear(t), this.s.top = -(2 * (this.s.padding || 0)), this.setPosition(this.s.left, this.s.top)
		},
		setPosition: function(t, e) {
			this.x.style.top = e + "px", this.x.style.left = t + "px", this.s.left = t, this.s.top = e
		},
		$getSize: function(t, e) {
			var i = this.s.Ob;
			i && (t += (i.left ? 0 : 1) + (i.right ? 0 : 1), e += (i.top ? 0 : 1) + (i.bottom ? 0 : 1)), this.s.head && (e += 1);
			var s = this.gd.$getSize(0, 0);
			if (this.fd) {
				var n = this.fd.$getSize(0, 0);
				n[3] == n[2] && (this.s.headHeight = n[3]), e += this.s.headHeight
			}
			if (this.s.fullscreen) {
				var r = window.innerWidth || document.body.clientWidth,
					a = window.innerHeight || document.body.clientHeight;
				return [r, r, a, a]
			}
			var h = webix.ui.view.prototype.$getSize.call(this, 0, 0);
			return h[1] = Math.min(h[1], (s[1] >= 1e5 && h[1] >= 1e5 ? Math.max(s[0], 300) : s[1]) + t), h[3] = Math.min(h[3], (s[3] >= 1e5 && h[3] >= 1e5 ? Math.max(s[2], 200) : s[3]) + e), h[0] = Math.min(Math.max(h[0], s[0] + t), h[1]), h[2] = Math.min(Math.max(h[2], s[2] + e), h[3]), h
		},
		$setSize: function(t, e) {
			webix.ui.view.prototype.$setSize.call(this, t, e), t = this.bc, e = this.dc, this.s.head === !1 ? (this.bd.style.display = "none", this.gd.$setSize(t, e)) : (this.fd.$setSize(t, this.s.headHeight), this.gd.$setSize(t, e - this.s.headHeight))
		},
		$skin: function() {
			this.defaults.headHeight = webix.skin.$active.barHeight
		},
		defaults: {
			top: 0,
			left: 0,
			autofit: !0,
			relative: "bottom",
			body: "",
			head: "",
			hidden: !0,
			autofocus: !0,
			confirmBeforeClose : !!0
		}
	}, webix.ui.view, webix.Movable, webix.Modality, webix.EventSystem), webix.protoUI({
		name: "popup",
		$init: function() {
			this.s.head = !1, this.$view.className += " webix_popup", webix.attachEvent("onClick", webix.bind(this.Fb, this)), this.attachEvent("onHide", this.Sd)
		},
		close: function() {
			webix.html.remove(this.$d), webix.ui.window.prototype.close.call(this)
		},
		$getSize: function(t, e) {
			return webix.ui.window.prototype.$getSize.call(this, t + 2 * this.s.padding, e + 2 * this.s.padding)
		},
		$setSize: function(t, e) {
			webix.ui.view.prototype.$setSize.call(this, t, e), t = this.bc - 2 * this.s.padding, e = this.dc - 2 * this.s.padding, this.w.style.padding = this.s.padding + "px", this.bd.style.display = "none", this.gd.$setSize(t, e)
		},
		Xd: function() {},
		defaults: {
			padding: 8
		},
		head_setter: function() {},
		Rd: function(t, e, i) {
			this.Sd(), document.body.appendChild(this.$d = webix.html.create("DIV", {
				"class": "webix_point_" + t
			}, "")), this.$d.style.zIndex = webix.ui.zIndex(), this.$d.style.top = i + "px", this.$d.style.left = e + "px"
		},
		Sd: function() {
			this.$d = webix.html.remove(this.$d)
		}
	}, webix.ui.window), webix.ui.et = webix.toArray(), webix.extend(webix.ui.window, {
		resize_setter: function(t) {
			return t && !this.Yz && this.Zz(), t
		},
		Zz: function() {
			this.$z || (this.x.firstChild.style.position = "relative", this.$z = webix.html.create("DIV", {
				"class": "webix_resize_handle"
			}), this.x.firstChild.appendChild(this.$z), webix.event(this.$z, webix.env.mouse.down, this._z, {
				bind: this
			}))
		},
		aA: function(t, e) {
			if (!this.bA) {
				this.bA = webix.html.create("div", {
					"class": "webix_resize_frame"
				}, ""), document.body.appendChild(this.bA);
				var i = webix.html.offset(this.x);
				this.bA.style.left = i.x + "px", this.bA.style.top = i.y + "px", this.bA.style.zIndex = webix.ui.zIndex()
			}
			this.bA.style.width = t + "px", this.bA.style.height = e + "px"
		},
		_z: function() {
			this.config.resize && (webix.html.addCss(document.body, "webix_noselect webix_resize_cursor"), this.cA = webix.html.offset(this.x), this.dA = webix.event(document.body, webix.env.mouse.move, this.eA, {
				bind: this
			}), this.fA = webix.event(document.body, webix.env.mouse.up, this.gA, {
				bind: this
			}))
		},
		eA: function(t) {
			if (this.cA !== !1) {
				var e = webix.html.pos(t),
					i = {
						x: e.x - this.cA.x + 10,
						y: e.y - this.cA.y + 10
					};
				if (Math.abs(this.cA.x - e.x) < (this.config.minWidth || 100) || Math.abs(this.cA.y - e.y) < (this.config.maxHeight || 100)) return;
				this.hA = i, this.aA(i.x, i.y)
			}
		},
		gA: function() {
			this.bA && (this.bA = webix.html.remove(this.bA)), webix.html.removeCss(document.body, "webix_resize_cursor"), webix.html.removeCss(document.body, "webix_noselect"), webix.eventRemove(this.dA), webix.eventRemove(this.fA), this.hA && (this.config.width = this.hA.x, this.config.height = this.hA.y, this.resize()), this.cA = this.hA = !1, this.callEvent("onViewResize", [])
		}
	}), webix.protoUI({
		name: "suggest",
		defaults: {
			autofocus: !1,
			type: "list",
			keyPressTimeout: 1,
			body: {
				yCount: 10,
				autoheight: !0,
				body: !0,
				select: !0,
				borderless: !0,
				navigation: !0
			},
			filter: function(t, e) {
				return 0 === t.value.toString().toLowerCase().indexOf(e.toLowerCase()) ? !0 : !1
			}
		},
		template_setter: webix.template,
		filter_setter: function(t) {
			return webix.toFunctor(t, this.$scope)
		},
		$init: function(t) {
			var e = {};
			webix.extend(e, webix.copy(this.defaults.body)), e.view = t.type || this.defaults.type;
			var i = this.Jt(e);
			t.body && webix.extend(i, t.body, !0), t.data && (i.data = t.data), t.url && (i.url = t.url), t.datatype && (i.datatype = t.datatype), t.id && (e.id = e.id || t.id + "_" + e.view), t.body = e, this.$ready.push(this._d), this.attachEvent("onShow", this.ke), this.oy = {}
		},
		Jt: function(t) {
			return t
		},
		Rs: function(t) {
			if (t) {
				var e, i, s;
				this.s.master && (e = webix.$$(this.s.master), e.options_setter && (i = e.getInputNode()) && (s = this.getItemText(t.id), webix.isUndefined(i.value) ? i.innerHTML = s : i.value = s.replace(/<[^>]*>/g, "")))
			}
		},
		setMasterValue: function(t, e) {
			var i = t.id ? this.getItemText(t.id) : t.text || t.value;
			if (this.s.master) {
				var s = webix.$$(this.s.master);
				e && t.id ? s.refresh() : s.options_setter ? s.setValue(t.$empty ? "" : t.id) : s.setValueHere ? s.setValueHere(i) : s.setValue(i)
			} else this.ae && (this.ae.value = i);
			e || (this.hide(!0), this.ae && this.ae.focus()), this.callEvent("onValueSuggest", [t, i]), webix.delay(function() {
				webix.callEvent("onEditEnd", [])
			})
		},
		getMasterValue: function() {
			return this.s.master ? webix.$$(this.s.master).getValue() : null
		},
		getItemText: function(t) {
			var e = this.getList().getItem(t);
			if (!e) return this.oy[t] || "";
			if (this.s.template) return this.s.template.call(this, e, this.type);
			if (this.s.textValue) return e[this.s.textValue];
			var i = this.getList().type,
				s = i.template.call(i, e, i);
			return this.oy[t] = s
		},
		getSuggestion: function() {
			var t, e = this.getList(),
				i = e.data.order;
			return e.getSelectedId && (t = e.getSelectedId()), i.length && (!t || i.find(t) < 0) && (t = i[0]), t && "object" == typeof t && (t += ""), t
		},
		getList: function() {
			return this.gd
		},
		_d: function() {
			var t = this.getList(),
				e = this.s.type;
			t.count ? (t.attachEvent("onItemClick", webix.bind(function(e) {
				this.setMasterValue(t.getItem(e))
			}, this)), t.data.attachEvent("onstoreupdated", webix.bind(function(t, e, i) {
				"delete" == i && t == this.getMasterValue() ? this.setMasterValue({
					id: "",
					text: ""
				}, 1) : "update" == i && t == this.getMasterValue() && this.setMasterValue(e, 1)
			}, this)), t.data.attachEvent("onAfterFilter", webix.bind(this.be, this)), t.data.attachEvent("onStoreLoad", webix.bind(this.be, this)), webix.isUndefined(this.s.fitMaster) && (this.s.fitMaster = !0)) : "calendar" == e ? (t.attachEvent("onDateSelect", function(t) {
				this.getParentView().setMasterValue({
					value: t
				})
			}), t.attachEvent("onTodaySet", function(t) {
				this.getParentView().setMasterValue({
					value: t
				})
			}), t.attachEvent("onDateClear", function(t) {
				this.getParentView().setMasterValue({
					value: t
				})
			})) : "colorboard" == e && t.attachEvent("onSelect", function(t) {
				this.getParentView().setMasterValue({
					value: t
				})
			})
		},
		input_setter: function(t) {
			return this.linkInput(t), 0
		},
		linkInput: function(t) {
			var e;
			t.getInputNode ? (e = t.getInputNode(), e.webix_master_id = t.s.id) : e = webix.toNode(t), webix.event(e, "keydown", function(t) {
				(e != document.body || this.isVisible()) && this.ce(t)
			}, {
				bind: this,
				id: "webix_suggest_keydown_" + e.webix_master_id
			}), this.pt = !0
		},
		ce: function(t) {
			t = t || event;
			var e = this.getList(),
				i = t.target || t.srcElement;
			this.ae = i, this.s.master = i.webix_master_id, window.clearTimeout(this.de);
			var s = t.keyCode;
			return 16 != s && 17 != s ? 9 == s ? this.ee(this, e) : 27 == s ? this.fe(this, e) : 13 == s ? this.ge(this, e) : this.he(t) ? (webix.html.preventEvent(t), !1) : void(webix.isUndefined(i.value) || (clearTimeout(this.dt), this.dt = webix.delay(function() {
				if (this.pt || webix.UIManager.getFocus() == webix.$$(this.s.master)) {
					this.ie = !0;
					var t = i.value;
					e.config.dataFeed ? e.filter("value", t) : e.filter && e.filter(webix.bind(function(e) {
						return this.s.filter.call(this, e, t)
					}, this))
				}
			}, this, [], this.s.keyPressTimeout))) : void 0
		},
		be: function() {
			if (!this.ie) return !0;
			this.ie = !1;
			var t = this.getList();
			t.count() > 0 ? (this.adjust(), this.isVisible() || (this.je = !0), this.show(this.ae, null, !0), this.je = !1) : (this.hide(!0), this.ae = null)
		},
		show: function(t) {
			if (!this.isVisible()) {
				var e = this.getList();
				e.filter && !this.je && (e.filter(""), this.ke(e)), this.$customWidth && this.$customWidth(t), t.tagName && this.s.fitMaster && (this.s.width = t.offsetWidth - 2), e.Np && e.render(), this.adjust()
			}
			webix.ui.popup.prototype.show.apply(this, arguments)
		},
		ke: function(t) {
			if (t = t || this.getList(), t.select && t.showItem) {
				var e = this.getMasterValue();
				e && t.exists && t.exists(e) ? (t.select(e), t.showItem(e)) : (t.unselect(), t.showItem(t.getFirstId()))
			}
		},
		ge: function(t, e) {
			if (e.count && e.count())
				if (t.isVisible()) {
					var i = e.getSelectedId(!1, !0);
					1 == e.count() && e.getFirstId() != i && (i = e.getFirstId()), i && this.setMasterValue(e.getItem(i)), t.hide(!0)
				} else t.show(this.ae);
			else t.isVisible() && t.hide(!0)
		},
		fe: function(t) {
			return t.hide(!0)
		},
		ee: function(t) {
			return t.hide(!0)
		},
		he: function(t) {
			var e = this.getList(),
				i = t.keyCode;
			if (e.count && e.moveSelection) {
				if (!(38 !== i || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) return e.moveSelection("up"), this.Rs(e.getSelectedItem()), !0;
				if (!(40 !== i || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) {
					var s = this.isVisible();
					if (!s) {
						if (!e.count()) return !1;
						this.show(this.ae)
					}
					var n = e.getSelectedId();
					return !n && e.count ? e.select(e.getFirstId()) : s && e.moveSelection("down"), this.Rs(e.getSelectedItem()), !0
				}
			}
			return !1
		},
		getValue: function() {
			var t = this.getList().getSelectedId() || "";
			return t.id || t
		},
		setValue: function(t) {
			var e = this.getList();
			t ? e.exists(t) && (e.select(t), e.showItem(t)) : (e.unselect(), e.showItem(e.getFirstId()))
		}
	}, webix.ui.popup), webix.attachEvent("onClick", function(t) {
		var e = webix.$$(t);
		if (e && e.touchable) {
			webix.UIManager.applyChanges(e), e.getNode(t);
			var i = t.target || t.srcElement;
			if ("webix_disabled" == i.className) return;
			var s = "";
			if (i.className && 0 === i.className.toString().indexOf("webix_view")) return;
			for (e && webix.UIManager.sb(e); i && i.parentNode;) {
				if (i.getAttribute) {
					if (i.getAttribute("view_id")) break;
					if (s = i.className) {
						s = s.toString().split(" ");
						for (var n = 0; n < s.length; n++)
							if (e.on_click[s[n]]) {
								var r = e.on_click[s[n]].call(e, t, e.s.id, i);
								if (r === !1) return
							}
					}
				}
				i = i.parentNode
			}
			if (e.s.click) {
				var a = webix.toFunctor(e.s.click, e.$scope);
				a && a.call && a.call(e, e.s.id, t)
			}
			var h = e.s.popup;
			if (e.s.popup && !e.s.readonly) {
				"object" != typeof h || h.name || (h = e.s.popup = webix.ui(h).s.id);
				var h = webix.$$(h);
				h.isVisible() || (h.s.master = e.s.id, h.show(e.getInputNode() || e.getNode(), null, !0))
			}
			e.callEvent("onItemClick", [e.s.id, t])
		}
	}), webix.protoUI({
		name: "button",
		touchable: !0,
		$skin: function() {
			this.defaults.height = webix.skin.$active.buttonHeight || webix.skin.$active.inputHeight, this.le = webix.skin.$active.labelTopHeight || 15
		},
		defaults: {
			template: function(t, e) {
				var i = e.$renderInput(t, e);
				return t.badge && (i = i.replace("</button>", "<span class='webix_badge'>" + t.badge + "</span></button>")), "<div class='webix_el_box' style='width:" + t.awidth + "px; height:" + t.aheight + "px'>" + i + "</div>"
			},
			label: "",
			tabFocus: !0,
			borderless: !0
		},
		$renderInput: function(t) {
			var e = "class='webixtype_" + (t.type || "base") + "' ";
			return "<button type='button' " + e + ">" + webix.template.escape(t.label || t.value) + "</button>"
		},
		$init: function(t) {
			this.x.className += " webix_control webix_el_" + (this.$cssName || this.name), this.data = this.s, this.y = this.x, this.$B(t)
		},
		hotkey_setter: function(t) {
			var e = this;
			this.Bt(t, function(t, i) {
				var s = e.$view.firstChild;
				if (s.dispatchEvent) {
					var n = document.createEvent("MouseEvents");
					n.initEvent("click", !0, !0), i.preventDefault(), s.dispatchEvent(n)
				}
			})
		},
		Bt: function(t, e, i) {
			var s = webix.UIManager.addHotKey(t, e, i);
			this.attachEvent("onDestruct", function() {
				webix.UIManager.removeHotKey(s, e, i)
			})
		},
		tooltip_setter: function(t) {
			var e = this.re() || this.$view.firstChild;
			return e && (e.title = t), t
		},
		type_setter: function(t) {
			return this.ne[t] && (this.$renderInput = webix.template(this.ne[t])), this.oe = "prev" == t || "next" == t ? this.pe : !1, t
		},
		ne: {
			htmlbutton: "<button type='button' class='webix_el_htmlbutton webixtype_base'>#label#</button>",
			prev: "<input type='button' class='webixtype_prev' value='#label#' /><div class='webix_el_arrow webixtype_prev_arrow'></div>",
			next: "<input type='button' class='webixtype_next' value='#label#' /><div class='webix_el_arrow webixtype_next_arrow'></div>",
			imageButton: "<button type='button' class='webix_img_btn_abs webixtype_base' style='width:100%; line-height:#cheight#px'><div class='webix_image' style='width:#dheight#px;height:#dheight#px;background-image:url(#image#);'> </div> #label#</button>",
			imageButtonTop: "<button type='button' class='webix_img_btn_abs webix_img_btn_abs_top webixtype_base'><div class='webix_image' style='width:100%;height:100%;background-image:url(#image#);'> </div> <div class='webix_img_btn_text'>#label#</div></button>",
			image: "<button type='button' class='webix_img_btn' style='line-height:#cheight#px;'><div class='webix_image' style='width:#cheight#px;height:#cheight#px;background-image:url(#image#);'> </div> #label#</button>",
			imageTop: "<button type='button' class='webix_img_btn_top' style='background-image:url(#image#);'><div class='webix_img_btn_text'>#label#</div></button>",
			icon: "<button type='button' class='webix_img_btn' style='line-height:#cheight#px;'><span class='webix_icon_btn fa-#icon#' style='max-width:#cheight#px;'></span>#label#</button>",
			iconButton: "<button type='button' class='webix_img_btn_abs webixtype_base' style='width:100%;'><span class='webix_icon fa-#icon#'></span> #label#</button>",
			iconTop: "<button type='button' class='webix_img_btn_top' style='width:100%;top:4px;text-align:center;'><span class='webix_icon fa-#icon#'></span><div class='webix_img_btn_text'>#label#</div></button>",
			iconButtonTop: "<button type='button' class='webix_img_btn_abs webix_img_btn_abs_top webixtype_base' style='width:100%;top:0px;text-align:center;'><span class='webix_icon fa-#icon#'></span><div class='webix_img_btn_text'>#label#</div></button>"
		},
		qe: function() {
			for (var t = [], e = ["input", "select", "textarea", "button"], i = 0; i < e.length; i++)
				for (var s = this.$view.getElementsByTagName(e[i]), n = 0; n < s.length; n++) t.push(s[n]);
			return t
		},
		disable: function() {
			var t, e = this.re();
			if (webix.ui.baseview.prototype.disable.apply(this, arguments), e && -1 == e.className.indexOf(" webix_disabled_box")) {
				e.className += " webix_disabled_box";
				var i = this.qe();
				for (t = 0; t < i.length; t++) i[t].setAttribute("disabled", !0);
				if ("top" == this.s.labelPosition) {
					var s = this.y.firstChild;
					s && (s.className += " webix_disabled_top_label")
				}
			}
		},
		enable: function() {
			webix.ui.baseview.prototype.enable.apply(this, arguments);
			var t = this.re();
			if (t) {
				t.className = t.className.replace(" webix_disabled_box", "");
				for (var e = this.qe(), i = 0; i < e.length; i++) e[i].removeAttribute("disabled");
				if ("top" == this.s.labelPosition) {
					var s = this.y.firstChild;
					s && (s.className = s.className.replace(" webix_disabled_top_label", ""))
				}
			}
		},
		$setSize: function(t, e) {
			webix.ui.view.prototype.$setSize.call(this, t, e) && this.render()
		},
		setValue: function(t) {
			var e = this.s.value;
			return e == t ? !1 : (this.s.value = t, this.se && this.$setValue(t), void this.callEvent("onChange", [t, e]))
		},
		$setValue: function(t) {
			(this.getInputNode() || {}).value = t
		},
		getValue: function() {
			var t = this.se ? this.$getValue() : this.s.value;
			return "undefined" == typeof t ? "" : t
		},
		$getValue: function() {
			return this.s.value || ""
		},
		focus: function() {
			var t = this.getInputNode();
			t && t.focus && t.focus()
		},
		blur: function() {
			var t = this.getInputNode();
			t && t.blur && t.blur()
		},
		getInputNode: function() {
			return this.y.getElementsByTagName("input")[0] || this.y.getElementsByTagName("button")[0]
		},
		re: function() {
			for (var t = 0; t < this.y.childNodes.length; t++)
				if (this.y.childNodes[t].className.indexOf("webix_el_box") >= 0) return this.y.childNodes[t];
			return null
		},
		ue: Math.sqrt(2),
		pe: function() {
			var t = this.s,
				e = this.re().childNodes[1],
				i = e.previousSibling,
				s = "next" == t.type ? "right" : "left",
				n = t.aheight - 2 * webix.skin.$active.inputPadding - 2,
				r = n * this.ue / 2;
			e.style.width = r + "px", e.style.height = r + "px", e.style.top = (n - r) / 2 + webix.skin.$active.inputPadding + "px", e.style[s] = (n - r) / 2 + this.ue / 2 + "px", i.style.width = t.awidth - n / 2 - 2 + "px", i.style.height = n + 2 + "px", i.style[s] = n / 2 + 2 + "px", i.style.top = webix.skin.$active.inputPadding + "px"
		},
		$B: function(t) {
			t = t || this.s, t.autowidth && (t.width = webix.html.getTextSize(t.value || t.label, "webixbutton").width + (t.badge ? 15 : 0) + ("iconButton" === t.type ? 30 : 0) + ("icon" === t.type ? 20 : 0))
		},
		ve: function() {
			this.we = this.s.inputWidth || (this.bc - this.s.width > 2 ? this.s.width : 0) || this.bc, this.xe = this.s.inputHeight || this.zy || 0
		},
		resize: function() {
			return this.$B(), webix.ui.view.prototype.resize.apply(this, arguments)
		},
		render: function() {
			if (this.ve(), this.s.awidth = this.we || this.bc, this.s.aheight = this.xe || this.dc, this.s.bheight = this.s.aheight + 2, this.s.cheight = this.s.aheight - 2 * webix.skin.$active.inputPadding, this.s.dheight = this.s.cheight - 2, webix.AtomRender.render.call(this)) {
				if (this.se = !0, this.oe && this.oe(), this.s.align) {
					var t = this.y.firstChild;
					switch ("top" == this.s.labelPosition && t.nextSibling && (t = t.nextSibling), this.s.align) {
						case "right":
							t.style.cssFloat = "right";
							break;
						case "center":
							t.style.display = "inline-block", t.parentNode.style.textAlign = "center";
							break;
						case "middle":
							t.style.marginTop = Math.round((this.dc - this.xe) / 2) + "px";
							break;
						case "bottom":
							t.style.marginTop = this.dc - this.xe + "px";
							break;
						case "left":
							t.style.cssFloat = "left"
					}
				}
				this.$render && this.$render(this.data), this.s.disabled && this.disable(), this.s.tooltip && this.define("tooltip", this.s.tooltip), this.ze && (this.ze(this.data), this.ze = 0)
			}
		},
		refresh: function() {
			this.render()
		},
		on_click: {
			Ae: function(t) {
				var e = webix.html.locate(t, "button_id");
				e && this.callEvent("onBeforeTabClick", [e, t]) && (this.setValue(e), this.callEvent("onAfterTabClick", [e, t]))
			},
			webix_all_segments: function(t, e) {
				this.on_click.Ae.call(this, t, e)
			},
			webix_all_tabs: function(t, e) {
				this.on_click.Ae.call(this, t, e)
			},
			webix_inp_counter_next: function() {
				this.next()
			},
			webix_inp_counter_prev: function() {
				this.prev()
			},
			webix_inp_combo: function(t, e, i) {
				i.focus()
			},
			webix_inp_checkbox_border: function(t) {
				this.s.disabled || "DIV" == (t.target || t.srcElement).tagName || this.s.readonly || this.toggle()
			},
			webix_inp_checkbox_label: function() {
				this.s.readonly || this.toggle()
			},
			webix_inp_radio_border: function(t) {
				var e = webix.html.locate(t, "radio_id");
				this.setValue(e)
			},
			webix_inp_radio_label: function(t, e, i) {
				return i = i.parentNode.getElementsByTagName("input")[0], this.on_click.webix_inp_radio_border.call(this, i, e, i)
			},
			webix_tab_more_icon: function(t, e, i) {
				this.getPopup().resize(), this.getPopup().show(i, null, !0)
			},
			webix_tab_close: function(t) {
				var e = webix.html.locate(t, "button_id");
				e && this.callEvent("onBeforeTabClose", [e, t]) && this.removeOption(e)
			}
		},
		Be: function(t) {
			for (var e = 0; e < t.length; e++) "string" == typeof t[e] ? t[e] = {
				id: t[e],
				value: t[e]
			} : (webix.isUndefined(t[e].id) && (t[e].id = t[e].value), webix.isUndefined(t[e].value) && (t[e].value = t[e].id));
			return t
		},
		Yx: function(t) {
			var e = t ? t.placeholder : this.s.placeholder;
			return e ? "<span class='webix_placeholder'>" + e + "</span>" : ""
		},
		eC: function(t) {
			return "webix_" + t + "_" + this.s.id
		}
	}, webix.ui.view, webix.AtomRender, webix.Settings, webix.EventSystem), webix.protoUI({
		name: "label",
		defaults: {
			template: "<div style='height:100%;line-height:#cheight#px'>#label#</div>"
		},
		$skin: function() {
			this.defaults.height = webix.skin.$active.inputHeight
		},
		focus: function() {
			return !1
		},
		re: function() {
			return this.y.firstChild
		},
		setHTML: function(t) {
			this.s.template = function() {
				return t
			}, this.refresh()
		},
		setValue: function(t) {
			this.s.label = t, webix.ui.button.prototype.setValue.apply(this, arguments)
		},
		$setValue: function(t) {
			this.y.firstChild.innerHTML = t
		},
		oe: function() {}
	}, webix.ui.button), webix.protoUI({
		name: "icon",
		$skin: function() {
			this.defaults.height = webix.skin.$active.inputHeight
		},
		defaults: {
			template: function(t) {
				return "<button type='button' " + (t.tabFocus ? "" : "tabindex='-1'") + " style='height:100%;width:100%;' class='webix_icon_button'><span class='webix_icon fa-" + t.icon + " '></span>" + (t.badge ? "<span class='webix_badge'>" + t.badge + "</span>" : "") + "</button>"
			},
			width: 33
		},
		oe: function() {}
	}, webix.ui.button), webix.protoUI({
		name: "text",
		Ce: !0,
		De: function() {
			this.Ce && (webix.event(this.getInputNode(), "change", this.Xy, {
				bind: this
			}), this.s.suggest && webix.$$(this.s.suggest).linkInput(this))
		},
		Xy: function() {
			var t = this.getValue();
			t != this.s.value && this.setValue(t, !0)
		},
		$skin: function() {
			this.defaults.height = webix.skin.$active.inputHeight, this.defaults.inputPadding = webix.skin.$active.inputPadding
		},
		$init: function(t) {
			"top" == t.labelPosition && webix.isUndefined(t.height) && this.defaults.height && (t.height = this.defaults.height + this.le), this.Ns = [], this.attachEvent("onAfterRender", this.De)
		},
		$renderIcon: function() {
			var t = this.s;
			if (t.icon) {
				var e = t.aheight - 2 * t.inputPadding,
					i = (e - 18) / 2 - 1;
				return "<span style='height:" + (e - i) + "px;padding-top:" + i + "px;' class='webix_input_icon fa-" + t.icon + "'></span>"
			}
			return ""
		},
		relatedView_setter: function(t) {
			return this.attachEvent("onChange", function() {
				var t = this.getValue(),
					e = this.s.relatedAction,
					i = this.s.relatedView,
					s = webix.$$(i);
				if (!s) {
					var n = this.getTopParentView();
					n && n.$$ && (s = n.$$(i))
				}
				"enable" == e ? t ? s.enable() : s.disable() : t ? s.show() : s.hide()
			}), t
		},
		validateEvent_setter: function(t) {
			return "blur" == t && this.attachEvent("onBlur", this.validate), "key" == t && this.attachEvent("onTimedKeyPress", this.validate), t
		},
		validate: function() {
			var t = this.s.validate;
			!t && this.s.required && (t = webix.rules.isNotEmpty);
			var e = (this.getFormView(), this.s.name),
				i = this.getValue(),
				s = {};
			return s[e] = i, t && !this.getFormView().Se(t, i, s, e) ? !1 : !0
		},
		bottomLabel_setter: function(t) {
			return this.s.bottomPadding || (this.s.bottomPadding = 18), t
		},
		py: function() {
			var t = this.s.invalidMessage;
			return "function" == typeof t && t.call(this), t
		},
		setBottomText: function(t, e) {
			var i = this.s;
			if ("undefined" != typeof t) {
				if (i.bottomLabel == t) return;
				i.bottomLabel = t
			}
			var s = (i.invalid ? i.invalidMessage : "") || i.bottomLabel;
			s || i.bottomPadding || (i.inputHeight = 0), s && !i.bottomPadding ? (this.ry = 1, i.bottomPadding = i.bottomPadding || e || 18, i.height || this.render(), this.resize()) : !s && this.ry ? (i.bottomPadding = this.ry = 0, i.height || this.render(), this.resize()) : this.render()
		},
		$getSize: function() {
			var t = webix.ui.view.prototype.$getSize.apply(this, arguments),
				e = this.config.bottomPadding;
			return e && (t[2] += e, t[3] += e), t
		},
		$setSize: function(t, e) {
			var i = this.s;
			if (webix.ui.view.prototype.$setSize.call(this, t, e)) {
				if (!t || !e) return;
				"top" == i.labelPosition ? (i.inputHeight || (this.zy = this.dc - this.le - (this.config.bottomPadding || 0)), i.labelWidth = 0) : i.bottomPadding && (i.inputHeight = this.dc - this.config.bottomPadding), this.render()
			}
		},
		Ee: function(t) {
			var e = (this.we || 0) - (t.label ? this.s.labelWidth : 0) - 4 - (t.iconWidth || 0);
			return 0 > e ? 0 : e
		},
		Fe: function(t, e) {
			var i = "x" + webix.uid(),
				s = e.Ee(t),
				n = t.inputAlign || "left",
				r = (this.$renderIcon ? this.$renderIcon(t) : "", this.s.aheight - 2 * webix.skin.$active.inputPadding - 2),
				a = t.text || t.value || this.Yx(t),
				h = "<div class='webix_inp_static' tabindex='0' onclick='' style='line-height:" + r + "px;width: " + s + "px; text-align: " + n + ";' >" + a + "</div>";
			return e.$renderInput(t, h, i)
		},
		qt: function(t) {
			var e = "<" + t + (this.s.placeholder ? " placeholder='" + this.s.placeholder + "' " : " ");
			this.s.readonly && (e += "readonly='true' ");
			var i = this.s.attributes;
			if (i)
				for (var s in i) e += s + "='" + i[s] + "' ";
			return e
		},
		$renderLabel: function(t, e) {
			var i = t.labelAlign || "left",
				s = "top" == this.s.labelPosition,
				n = s ? "display:block;" : "width: " + this.s.labelWidth + "px;",
				r = "",
				a = s ? this.le - 2 : this.s.aheight - 2 * this.s.inputPadding;
			return t.label && (r = "<label style='" + n + "text-align: " + i + ";line-height:" + a + "px;' onclick='' for='" + e + "' class='webix_inp_" + (s ? "top_" : "") + "label " + (t.required ? "webix_required" : "") + "'>" + (t.label || "") + "</label>"), r
		},
		$renderInput: function(t, e, i) {
			var s = t.inputAlign || "left",
				n = "top" == t.labelPosition,
				r = this.Ee(t);
			i = i || webix.uid();
			var a = this.$renderLabel(t, i),
				h = "";
			if (e) h += e;
			else {
				h += this.qt("input") + "id='" + i + "' type='" + (t.type || this.name) + "' value='" + webix.template.escape(t.value || "") + "' style='width: " + r + "px; text-align: " + s + ";'";
				var o = t.attributes;
				if (o)
					for (var l in o) h += " " + l + "='" + o[l] + "'";
				h += " />"
			}
			var c = this.$renderIcon ? this.$renderIcon(t) : "";
			h += c;
			var u = "";
			u = n ? a + "<div class='webix_el_box' style='width:" + t.awidth + "px; height:" + t.aheight + "px'>" + h + "</div>" : "<div class='webix_el_box' style='width:" + t.awidth + "px; height:" + t.aheight + "px'>" + a + h + "</div>";
			var d = t.awidth - r - 2 * webix.skin.$active.inputPadding,
				f = (t.invalid ? t.invalidMessage : "") || t.bottomLabel;
			return f && (u += "<div class='webix_inp_bottom_label' style='width:" + (r || t.awidth) + "px;margin-left:" + Math.max(d, webix.skin.$active.inputPadding) + "px;'>" + f + "</div>"), u
		},
		defaults: {
			template: function(t, e) {
				return e.$renderInput(t)
			},
			label: "",
			labelWidth: 80
		},
		type_setter: function(t) {
			return t
		},
		oe: !1,
		$setValue: function(t) {
			this.getInputNode().value = t
		},
		$getValue: function() {
			return this.getInputNode().value
		},
		suggest_setter: function(t) {
			if (t) {
				if ("string" == typeof t) {
					var e = webix.$$(t);
					if (e) return webix.$$(t).s.id;
					t = {
						body: {
							url: t,
							dataFeed: t
						}
					}
				} else webix.isArray(t) ? t = {
					body: {
						data: this.Be(t)
					}
				} : t.body || (t.body = {});
				webix.extend(t, {
					view: "suggest"
				});
				var i = webix.ui(t);
				return this.Ns.push(i), i.s.id
			}
			return !1
		}
	}, webix.ui.button), webix.protoUI({
		name: "segmented",
		Ce: !1,
		$init: function() {
			this.attachEvent("onChange", function(t) {
				if (this.s.multiview) {
					var e = this.getTopParentView(),
						i = null;
					e && e.$$ && (i = e.$$(t)), i || (i = webix.$$(t)), i && i.show && i.show()
				}
			})
		},
		defaults: {
			template: function(t, e) {
				!t.options;
				var i = t.options;
				e.Be(i);
				var s = e.Ee(t),
					n = webix.uid(),
					r = "<div style='width:" + s + "px' class='webix_all_segments'>",
					a = t.optionWidth || Math.floor(s / i.length);
				t.value || (t.value = i[0].id);
				for (var h = 0; h < i.length; h++) r += "<button type='button' style='width:" + (i[h].width || a) + "px' ", r += "class='" + (t.value == i[h].id ? "webix_selected " : "") + "webix_segment_" + (h == i.length - 1 ? "N" : h > 0 ? 1 : 0) + "' button_id='" + i[h].id + "' >", r += i[h].value + "</button>";
				return e.$renderInput(t, r + "</div>", n)
			}
		},
		$setValue: function() {
			this.refresh()
		},
		getValue: function() {
			return this.s.value
		},
		getInputNode: function() {
			return null
		},
		optionIndex: function(t) {
			for (var e = this.s.options, i = 0; i < e.length; i++)
				if (e[i].id == t) return i;
			return -1
		},
		addOption: function(t, e, i, s) {
			var n = t;
			"object" != typeof t ? (e = e || t, n = {
				id: t,
				value: e
			}) : (t = n.id, s = i, i = e), this.optionIndex(t) < 0 && webix.PowerArray.insertAt.call(this.s.options, n, s), i && this.setValue(t)
		},
		removeOption: function(t) {
			var e = this.optionIndex(t),
				i = this.s.options;
			if (e >= 0 && webix.PowerArray.removeAt.call(i, e), this.s.value == t) {
				var s = Math.min(e, i.length - 1);
				s >= 0 ? this.setValue(i[s].id) : this.s.value = -1
			}
			this.callEvent("onOptionRemove", [t, this.s.value]), this.refresh()
		},
		oe: !1
	}, webix.ui.text), webix.protoUI({
		name: "search",
		$skin: function() {
			this.defaults.inputPadding = webix.skin.$active.inputPadding
		},
		on_click: {
			webix_input_icon: function(t) {
				return this.callEvent("onSearchIconClick", [t])
			}
		},
		defaults: {
			type: "text",
			icon: "search"
		}
	}, webix.ui.text), webix.protoUI({
		name: "toggle",
		Ce: !0,
		$init: function() {
			this.attachEvent("onItemClick", function() {
				this.toggle()
			})
		},
		$setValue: function() {
			this.render()
		},
		toggle: function() {
			this.setValue(!this.getValue())
		},
		getValue: function() {
			var t = this.s.value;
			return t && "0" != t ? 1 : 0
		},
		defaults: {
			template: function(t, e) {
				var i = t.value ? " webix_pressed" : "";
				return t.label = (t.value ? t.onLabel : t.offLabel) || t.label, t.icon = (t.value ? t.onIcon : t.offIcon) || t.icon, "<div class='webix_el_box" + i + "' style='width:" + t.awidth + "px; height:" + t.aheight + "px'>" + e.$renderInput(t, e) + "</div>"
			}
		},
		oe: !1
	}, webix.ui.button), webix.protoUI({
		name: "select",
		defaults: {
			template: function(t, e) {
				var i = e.Be(t.options),
					s = "x" + webix.uid(),
					n = e.qt("select") + "id='" + s + "' style='width:" + e.Ee(t) + "px;'>",
					r = webix.$$(i);
				if (r && r.data && r.data.each) r.data.each(function(e) {
					n += "<option" + (e.id == t.value ? " selected='true'" : "") + " value='" + e.id + "'>" + e.value + "</option>"
				});
				else
					for (var a = 0; a < i.length; a++) n += "<option" + (i[a].id == t.value ? " selected='true'" : "") + " value='" + i[a].id + "'>" + i[a].value + "</option>";
				return n += "</select>", e.$renderInput(t, n, s)
			}
		},
		options_setter: function(t) {
			if (t) {
				if ("string" == typeof t) {
					var e = new webix.DataCollection({
						url: t
					});
					return e.data.attachEvent("onStoreLoad", webix.bind(this.refresh, this)), e
				}
				return t
			}
		},
		getInputNode: function() {
			return this.y.getElementsByTagName("select")[0]
		}
	}, webix.ui.text), webix.protoUI({
		name: "textarea",
		$skin: function() {},
		defaults: {
			template: function(t, e) {
				var i = t.name || t.id,
					s = "x" + webix.uid(),
					n = e.qt("textarea") + "style='width:" + e.Ee(t) + "px;'";
				return n += " id='" + s + "' name='" + i + "' class='webix_inp_textarea'>" + (t.value || "") + "</textarea>", e.$renderInput(t, n, s)
			},
			height: 0,
			minHeight: 60
		},
		Dt: !0,
		$renderLabel: function(t, e) {
			{
				var i = t.labelAlign || "left",
					s = "top" == this.s.labelPosition,
					n = s ? "display:block;" : "width: " + this.s.labelWidth + "px;",
					r = "";
				s ? this.le - 2 : (webix.skin.$active.inputHeight || this.s.aheight) - 2 * this.s.inputPadding
			}
			return t.label && (r = "<label style='" + n + "text-align: " + i + ";' onclick='' for='" + e + "' class='webix_inp_" + (s ? "top_" : "") + "label " + (t.required ? "webix_required" : "") + "'>" + (t.label || "") + "</label>"), r
		},
		getInputNode: function() {
			return this.y.getElementsByTagName("textarea")[0]
		}
	}, webix.ui.text), webix.protoUI({
		name: "counter",
		defaults: {
			template: function(t, e) {
				var i = t.value || 0,
					s = "x" + webix.uid(),
					n = "<div class='webix_el_group' style='width:" + e.Ee(t) + "px'>";
				return n += "<button type='button' class='webix_inp_counter_prev'>-</button>", n += e.qt("input") + " id='" + s + "' type='text' class='webix_inp_counter_value' value='" + i + "'></input>", n += "<button type='button' class='webix_inp_counter_next'>+</button></div>", e.$renderInput(t, n, s)
			},
			min: 0,
			max: 1 / 0,
			step: 1
		},
		$setValue: function(t) {
			this.getInputNode().value = t
		},
		getInputNode: function() {
			return this.y.getElementsByTagName("input")[0]
		},
		getValue: function() {
			return 1 * webix.ui.button.prototype.getValue.apply(this, arguments)
		},
		next: function(t) {
			t = this.s.step, this.shift(t)
		},
		prev: function(t) {
			t = -1 * this.s.step, this.shift(t)
		},
		shift: function(t) {
			var e = this.s.min,
				i = this.s.max,
				s = this.getValue() + t;
			s >= e && i >= s && this.setValue(s)
		}
	}, webix.ui.text), webix.protoUI({
		name: "checkbox",
		defaults: {
			checkValue: 1,
			uncheckValue: 0,
			template: function(t, e) {
				var i = "x" + webix.uid(),
					s = "";
				t.labelRight && (s = "<label class='webix_label_right'>" + t.labelRight + "</label>", t.labelWidth && (t.label = t.label || "&nbsp;"));
				var n = t.checkValue == t.value,
					r = Math.floor((e.s.aheight - 16) / 2),
					a = e.qt("input") + "style='margin-top:" + r + "px;" + (t.customCheckbox ? "display:none" : "") + "' id='" + i + "' type='checkbox' " + (n ? "checked='1'" : "") + "/>",
					h = "webix_inp_checkbox_border webix_el_group webix_checkbox_" + (n ? "1" : "0"),
					o = "<div style='line-height:" + e.s.cheight + "px' class='" + h + "'>" + a + (t.customCheckbox || "") + s + "</div>";
				return e.$renderInput(t, o, i)
			}
		},
		customCheckbox_setter: function(t) {
			return t === !0 && webix.skin.$active.customCheckbox && (t = "<a onclick='javascript:void(0)'><button type='button' class='webix_custom_checkbox'></button></a>"), t
		},
		focus: function() {
			var t = this.$view.getElementsByTagName(this.s.customCheckbox ? "button" : "input")[0];
			t && t.focus()
		},
		blur: function() {
			var t = this.$view.getElementsByTagName(this.s.customCheckbox ? "button" : "input")[0];
			t && t.blur()
		},
		De: function() {},
		$setValue: function(t) {
			var e = t == this.s.checkValue,
				i = this.getInputNode() ? this.getInputNode().parentNode : null;
			i && (i.className = i.className.replace(/(webix_checkbox_)\d/, "$1" + (e ? 1 : 0))), this.getInputNode().checked = e
		},
		toggle: function() {
			var t = this.getValue() != this.s.checkValue ? this.s.checkValue : this.s.uncheckValue;
			this.setValue(t)
		},
		getValue: function() {
			var t = this.s.value;
			return t == this.s.checkValue ? this.s.checkValue : this.s.uncheckValue
		},
		$skin: function() {
			webix.skin.$active.customCheckbox && (this.defaults.customCheckbox = !0)
		}
	}, webix.ui.text), webix.protoUI({
		name: "radio",
		defaults: {
			template: function(t, e) {
				for (var i, s = e.Be(t.options), n = [], r = 0; r < s.length; r++) {
					var a = "x" + webix.uid();
					i = i || a, r && (s[r].newline || t.vertical) && n.push("<div class='webix_line_break'></div>");
					var h = s[r].id == t.value,
						o = e.qt("input") + " name='" + t.name + "' type='radio' " + (h ? "checked='1'" : "") + " value='" + s[r].id + "' id='" + a + "' style='" + (t.customRadio ? "display:none" : "") + "' />",
						l = "<div radio_id='" + s[r].id + "' class='webix_inp_radio_border webix_radio_" + (h ? "1" : "0") + "'>" + o + (t.customRadio || "") + "</div>",
						c = s[r].value || "";
					c && (c = "<label for='" + a + "' class='webix_label_right'>" + c + "</label>"), n.push("<div class='webix_radio_option'>" + l + c + "</div>")
				}
				return n = "<div class='webix_el_group' style='margin-left:" + (t.label ? t.labelWidth : 0) + "px;'>" + n.join("") + "</div>", e.$renderInput(t, n, i)
			}
		},
		refresh: function() {
			this.render(), this.ac && this.$getSize(0, 0)[2] != this.ac[1] && this.resize()
		},
		$getSize: function(t, e) {
			var i = webix.ui.button.prototype.$getSize.call(this, t, e);
			if (this.s.options) {
				for (var s = 0, n = 0; n < this.s.options.length; n++)(this.s.vertical || this.s.options[n].newline) && s++;
				i[3] = i[2] = Math.max(i[2], (this.s.optionHeight || 25) * s + 2 * this.s.inputPadding)
			}
			var r = this.config.bottomPadding;
			return r && (i[2] += r, i[3] += r), i
		},
		Ie: function() {
			return this.y.getElementsByTagName("input")
		},
		$setValue: function(t) {
			for (var e = this.Ie(), i = 0; i < e.length; i++) {
				e[i].parentNode.getAttribute("radio_id") == t ? (e[i].className = "webix_inp_radio_on", e[i].checked = !0) : (e[i].className = "webix_inp_radio_on webix_hidden", e[i].checked = !1);
				var s = e[i] ? e[i].parentNode : null;
				s && (s.className = s.className.replace(/(webix_radio_)\d/, "$1" + (e[i].checked ? 1 : 0)))
			}
		},
		getValue: function() {
			return this.s.value
		},
		focus: function() {
			var t = this.$view.getElementsByTagName(this.s.customRadio ? "button" : "input")[0];
			t && t.focus()
		},
		blur: function() {
			var t = this.$view.getElementsByTagName(this.s.customRadio ? "button" : "input")[0];
			t && t.blur()
		},
		customRadio_setter: function(t) {
			return t === !0 && webix.skin.$active.customRadio && (t = "<a onclick='javascript:void(0)'><button type='button'  class='webix_custom_radio'></button></a>"), t
		},
		$skin: function() {
			webix.skin.$active.customRadio && (this.defaults.customRadio = !0), webix.skin.$active.optionHeight && (this.defaults.optionHeight = webix.skin.$active.optionHeight)
		}
	}, webix.ui.text), webix.protoUI({
		name: "richselect",
		defaults: {
			template: function(t, e) {
				return e.Fe(t, e)
			},
			popupWidth: 200,
			icon: "angle-down"
		},
		suggest_setter: function(t) {
			return this.options_setter(t)
		},
		options_setter: function(t) {
			t = this.Kt ? this.Kt(t) : t;
			var e = this.s.popup = this.s.suggest = webix.ui.text.prototype.suggest_setter.call(this, t),
				i = webix.$$(e).getList();
			return i && i.attachEvent("onAfterLoad", webix.bind(this.Ss, this)), e
		},
		getList: function() {
			var t = webix.$$(this.s.suggest);
			return t.getList()
		},
		Ss: function() {
			var t = this.s.value;
			webix.isUndefined(t) || this.getPopup().isVisible() || this.s.text || this.$setValue(t)
		},
		$skin: function() {
			this.defaults.inputPadding = webix.skin.$active.inputPadding
		},
		$render: function(t) {
			webix.isUndefined(t.value) || this.$setValue(t.value)
		},
		getInputNode: function() {
			return this.y.getElementsByTagName("DIV")[1]
		},
		getPopup: function() {
			return webix.$$(this.s.popup)
		},
		getText: function() {
			var t = this.getInputNode();
			return "undefined" == typeof t.value ? t.innerHTML : t.value
		},
		$setValue: function(t) {
			if (this.se) {
				var e = t,
					i = this.getPopup();
				if (i) var e = this.getPopup().getItemText(t);
				!e && t && t.id && (this.getPopup().getList().add(t), e = this.getPopup().getItemText(t.id), this.s.value = t.id), this.s.text = e;
				var s = this.getInputNode();
				webix.isUndefined(s.value) ? s.innerHTML = e || this.Yx() : s.value = e.replace(/<[^>]*>/g, "")
			}
		},
		getValue: function() {
			return this.s.value || ""
		}
	}, webix.ui.text), webix.protoUI({
		name: "combo",
		$init: function() {
			this.attachEvent("onBlur", webix.bind(function() {
				if (this.s.text != this.getText()) {
					var t = this.getPopup().getSuggestion();
					if (!t || "" === this.getInputNode().value && "" !== webix.$$(this.s.suggest).getItemText(t)) {
						if (!this.s.editable) {
							var e = this.getValue();
							this.$setValue(webix.isUndefined(e) ? "" : e)
						}
					} else this.setValue(t)
				}
			}, this))
		},
		getInputNode: function() {
			return this.y.getElementsByTagName("input")[0]
		},
		$render: function(t) {
			webix.isUndefined(t.value) || this.$setValue(t.value)
		},
		Xy: function() {
			var t = this.getInputNode(),
				e = "";
			t.value && (e = webix.$$(this.s.suggest).getSuggestion() || this.s.value), e != this.s.value ? this.setValue(e, !0) : this.$setValue(e)
		},
		defaults: {
			template: function(t, e) {
				return e.$renderInput(t)
			},
			icon: "angle-down"
		}
	}, webix.ui.richselect), webix.protoUI({
		name: "datepicker",
		$init: function() {
			this.$ready.push(this.Je)
		},
		defaults: {
			template: function(t, e) {
				return "time" == e.s.type && (e.s.icon = e.s.timeIcon), t.editable ? e.$renderInput(t) : e.Fe(t, e)
			},
			stringResult: !1,
			timepicker: !1,
			icon: "calendar",
			icons: !0,
			timeIcon: "clock-o"
		},
		$skin: function() {
			this.defaults.inputPadding = webix.skin.$active.inputPadding
		},
		getPopup: function() {
			return webix.$$(this.s.popup)
		},
		Je: function() {
			var t = this.s;
			if (t.suggest) t.popup = t.suggest;
			else if (!t.popup) {
				var e = this.s.timepicker;
				t.popup = t.suggest = this.suggest_setter({
					type: "calendar",
					height: 240 + (e ? 30 : 0),
					width: 250,
					padding: 0,
					body: {
						timepicker: e,
						type: this.s.type,
						icons: this.s.icons
					}
				})
			}
			this.ze = function() {}
		},
		$render: function(t) {
			webix.isUndefined(t.value) || this.$setValue(t.value)
		},
		Tx: function(t) {
			var e = "time" == this.s.type;
			if ("string" == typeof t && t) {
				var i = e ? webix.i18n.parseTimeFormatDate : webix.i18n.parseFormatDate;
				t = i(t)
			}
			if (t) {
				if (e && webix.isArray(t)) {
					var s = new Date;
					s.setHours(t[0]), s.setMinutes(t[1]), t = s
				}
				isNaN(t.getTime()) && (t = "")
			}
			return t
		},
		$setValue: function(t) {
			var e = webix.$$(this.s.popup.toString()),
				i = e.gd;
			t = this.Tx(t), i.selectDate(t, !0), this.s.value = t ? i.config.date : "";
			var s = "time" == this.s.type,
				n = this.config.timepicker,
				r = this.Hx || (s ? webix.i18n.timeFormatStr : n ? webix.i18n.fullDateFormatStr : webix.i18n.dateFormatStr);
			this.s.text = t ? r(this.s.value) : "";
			var a = this.getInputNode();
			a.value == webix.undefined ? a.innerHTML = this.s.text || this.Yx() : a.value = this.s.text || ""
		},
		format_setter: function(t) {
			return "function" == typeof t ? this.Hx = t : (this.Hx = webix.Date.dateToStr(t), this.Gx = webix.Date.strToDate(t)), t
		},
		getInputNode: function() {
			return this.s.editable ? this.y.getElementsByTagName("input")[0] : this.y.getElementsByTagName("DIV")[1]
		},
		getValue: function() {
			var t = "time" == this.s.type,
				e = this.config.timepicker,
				i = this.s.value;
			if (this.se) {
				if (this.s.editable) {
					var s = this.Gx || (t ? webix.i18n.timeFormatDate : e ? webix.i18n.fullDateFormatDate : webix.i18n.dateFormatDate);
					i = s(this.getInputNode().value)
				}
			} else i = this.Tx(i) || null;
			if (this.s.stringResult) {
				var n = t ? webix.i18n.parseTimeFormatStr : webix.i18n.parseFormatStr;
				return i ? n(i) : ""
			}
			return i || null
		},
		getText: function() {
			var t = this.getInputNode();
			return t ? "undefined" == typeof t.value ? t.innerHTML : t.value : ""
		}
	}, webix.ui.text), webix.protoUI({
		name: "colorpicker",
		$init: function() {
			this.$ready.push(this.Je)
		},
		defaults: {
			icon: !0
		},
		Je: function() {
			var t = this.s;
			t.suggest ? t.popup = t.suggest : t.popup || (t.popup = t.suggest = this.suggest_setter({
				type: "colorboard",
				height: 200
			})), this.ze = function() {}
		},
		$render: function(t) {
			webix.isUndefined(t.value) || this.$setValue(t.value)
		},
		getValue: function() {
			return this.se && this.s.editable ? this.getInputNode().value : this.s.value
		},
		pz: function() {
			return this.$view.getElementsByTagName("DIV")[this.s.editable ? 1 : 2]
		},
		$setValue: function(t) {
			var e = webix.$$(this.config.popup.toString()),
				i = e.getBody();
			i.setValue(t), this.config.value = t, this.pz().style.backgroundColor = t;
			var s = this.getInputNode();
			s.value == webix.undefined ? s.innerHTML = t : s.value = t
		},
		$renderIcon: function() {
			var t = this.config;
			return '<div class="webix_input_icon" style="background-color:' + t.value + ';"> </div>'
		}
	}, webix.ui.datepicker), webix.RenderStack = {
		$init: function() {
			this.v = document.createElement("DIV"), this.data.attachEvent("onIdChange", webix.bind(this.Ke, this)), this.attachEvent("onItemClick", this.Le), this.types || (this.types = {
				"default": this.type
			}, this.type.name = "default"), this.type = webix.clone(this.type)
		},
		customize: function(t) {
			webix.type(this, t)
		},
		type_setter: function(t) {
			return this.types[t] ? (this.type = webix.clone(this.types[t]), this.type.css && (this.w.className += " " + this.type.css)) : this.customize(t), this.type.on_click && webix.extend(this.on_click, this.type.on_click), t
		},
		template_setter: function(t) {
			this.type.template = webix.template(t)
		},
		jb: function(t) {
			var e = this.data.Me[t.id];
			return this.callEvent("onItemRender", [t]), this.type.templateStart(t, this.type, e) + (t.$template ? this.type["template" + t.$template] : this.type.template)(t, this.type, e) + this.type.templateEnd(t, this.type, e)
		},
		Ne: function(t) {
			return this.v.innerHTML = this.jb(t), this.v.firstChild
		},
		Ke: function(t, e) {
			var i = this.getItemNode(t);
			i && (i.setAttribute(this.ad, e), this.t[e] = this.t[t], delete this.t[t])
		},
		Le: function() {
			if (this.s.click) {
				var t = webix.toFunctor(this.s.click, this.$scope);
				t && t.call && t.apply(this, arguments)
			}
		},
		getItemNode: function(t) {
			if (this.t) return this.t[t];
			this.t = {};
			for (var e = this.y.childNodes, i = 0; i < e.length; i++) {
				var s = e[i].getAttribute(this.ad);
				s && (this.t[s] = e[i])
			}
			return this.getItemNode(t)
		},
		locate: function(t) {
			return webix.html.locate(t, this.ad)
		},
		showItem: function(t) {
			var e = this.getItemNode(t);
			if (e && this.scrollTo) {
				var i = Math.abs(this.w.offsetLeft - e.offsetLeft),
					s = i + e.offsetWidth,
					n = Math.abs(this.w.offsetTop - e.offsetTop),
					r = n + e.offsetHeight,
					a = this.getScrollState(),
					h = a.x;
				(h > i || h + this.bc < s) && (h = i);
				var o = a.y;
				(o > n || o + this.dc < r) && (o = n - 5), this.scrollTo(h, o), this.Oe && this.Oe(t)
			}
		},
		render: function(t, e, i) {
			if (this.isVisible(this.s.id) && !this.$blockRender)
				if (t) {
					var s = this.getItemNode(t);
					switch (i) {
						case "paint":
						case "update":
							if (!s) return;
							var n = this.t[t] = this.Ne(e);
							webix.html.insertBefore(n, s), webix.html.remove(s);
							break;
						case "delete":
							if (!s) return;
							webix.html.remove(s), delete this.t[t];
							break;
						case "add":
							var n = this.t[t] = this.Ne(e);
							webix.html.insertBefore(n, this.getItemNode(this.data.getNextId(t)), this.y);
							break;
						case "move":
							webix.html.insertBefore(this.getItemNode(t), this.getItemNode(this.data.getNextId(t)), this.y)
					}
				} else if (this.callEvent("onBeforeRender", [this.data])) {
				(this.Pe || this.y).innerHTML = this.data.getRange().map(this.jb, this).join(""), this.t = null, this.callEvent("onAfterRender", []);
				var n = this.y.offsetHeight
			}
		}
	}, webix.ValidateData = {
		$init: function() {
			this.h && this.attachEvent("onChange", this.clearValidation)
		},
		clearValidation: function() {
			if (this.elements)
				for (var t in this.elements) this.Qe(t)
		},
		validate: function(t, e) {
			this.callEvent("onBeforeValidate", []);
			var i = this.Re = {},
				s = !0,
				n = this.s.rules,
				r = this.isVisible && !this.isVisible(),
				a = t && t.hidden,
				h = t && t.disabled,
				o = {},
				l = {};
			for (var c in this.elements) {
				var u = this.elements[c].config.name;
				(r || this.elements[c].isVisible() || a) && (this.elements[c].isEnabled() || h) ? o[u] = this.elements[c]: l[u] = !0
			}
			if ((n || o) && !e && this.getValues && (e = this.getValues()), n) {
				n.$obj && (s = this.Se(n.$obj, e, e, "") && s);
				var d = n.$all;
				if (d)
					for (var f in e)
						if (!l[f]) {
							var b = this.Se(d, e[f], e, f);
							b || (i[f] = !0), s = b && s
						}
				for (var f in n)
					if (!l[f] && 0 !== f.indexOf("$") && !i[f]) {
						var b = this.Se(n[f], e[f], e, f);
						b || (i[f] = !0), s = b && s
					}
			}
			if (o)
				for (var f in o)
					if (!i[f]) {
						var x = o[f];
						if (x.validate) {
							var b = x.validate();
							s = b && s, b || (i[f] = !0)
						} else {
							var p = x.s;
							if (p) {
								var w = p.validate;
								if (!w && p.required && (w = webix.rules.isNotEmpty), w) {
									var b = this.Se(w, e[f], e, f);
									b || (i[f] = !0), s = b && s
								}
							}
						}
					}
			return this.callEvent("onAfterValidation", [s, this.Re]), s
		},
		Se: function(t, e, i, s) {
			return "string" == typeof t && (t = webix.rules[t]), t.call(this, e, i, s) ? (this.callEvent("onValidationSuccess", [s, i]) && this.Qe && this.Qe(s), !0) : (this.callEvent("onValidationError", [s, i]) && this.Te && this.Te(s), !1)
		}
	}, webix.ValidateCollection = {
		Ue: function() {
			this.data.attachEvent("onStoreUpdated", webix.bind(function(t, e, i) {
				!t || "add" != i && "update" != i || this.validate(t)
			}, this)), this.data.attachEvent("onClearAll", webix.bind(this.clearValidation, this)), this.Ue = function() {}
		},
		rules_setter: function(t) {
			return t && this.Ue(), t
		},
		clearValidation: function() {
			this.data.clearMark("webix_invalid", !0)
		},
		validate: function(t) {
			var e = !0;
			if (t) {
				this.Re = {};
				var i = this.getItem(t);
				e = webix.ValidateData.validate.call(this, null, i), e ? this.callEvent("onValidationSuccess", [t, i]) && this.Qe(t) : this.callEvent("onValidationError", [t, i, this.Re]) && this.Te(t, this.Re)
			} else
				for (var s in this.data.pull) var e = this.validate(s) && e;
			return e
		},
		Se: function(t, e, i, s) {
			"string" == typeof t && (t = webix.rules[t]);
			var n = t.call(this, e, i, s);
			return n || (this.Re[s] = !0), n
		},
		Qe: function(t) {
			this.data.removeMark(t, "webix_invalid", !0)
		},
		Te: function(t) {
			this.data.addMark(t, "webix_invalid", !0)
		}
	}, webix.rules = {
		isEmail: function(t) {
			return /^[^@]+@[^@]+\.[^@]+$/.test((t || "").toString())
		},
		isNumber: function(t) {
			return parseFloat(t) == t
		},
		isChecked: function(t) {
			return !!t || "0" === t
		},
		isNotEmpty: function(t) {
			return 0 === t || t
		}
	}, webix.MapCollection = {
		$init: function() {
			this.$ready.push(this.cz), this.attachEvent("onStructureUpdate", this.cz)
		},
		cz: function(t) {
			var t = this.dz = [],
				e = this.s;
			if (e.columns && this.zj(e.columns), this.s.map && this.ez(e.map), this.dz.length) try {
				this.data.qf = Function("obj", t.join("\n"))
			} catch (i) {}
		},
		ez: function(t) {
			for (var e in t) this.dz.push(this.fz(e, t[e]))
		},
		fz: function(t, e, i) {
			var s = "",
				n = "";
			return 0 === e.indexOf("(date)") ? (s = "webix.i18n.parseFormatDate(", n = ")", i && !i.format && (i.format = webix.i18n.dateFormatStr), e = e.replace("(date)", "")) : 0 === e.indexOf("(number)") && (s = "(", n = ")*1", e = e.replace("(number)", "")), "" !== e ? (e = e.replace(/\{obj\.([^}]*)\}/g, "\"+(obj.$1||'')+\""), e = e.replace(/#([^#'";, ]+)#/gi, "\"+(obj.$1||'')+\"")) : e = '"+(obj.' + t + "||'')+\"", "obj." + t + " = " + s + '"' + e + '"' + n + ";"
		},
		zj: function(t) {
			for (var e = 0; e < t.length; e++) {
				var i = t[e].map,
					s = t[e].id;
				s || (s = t[e].id = "i" + webix.uid(), t[e].header || (t[e].header = "")), i && this.dz.push(this.fz(s, i, t[e])), this.Et(t[e])
			}
		},
		Et: function(t) {
			var e = t.options || t.collection;
			if (e)
				if ("string" == typeof e) {
					var i = webix.$$(e);
					i || (i = new webix.DataCollection({
						url: e
					}), this.Ns.push(i)), i.getBody && (i = i.getBody()), this.Bj(i, t)
				} else if (e.loadNext) this.Bj(e, t);
			else if (e[0] && "object" == typeof e[0]) e = new webix.DataCollection({
				data: e
			}), this.Bj(e, t), this.Ns.push(e);
			else {
				if (webix.isArray(e)) {
					for (var s = {}, n = 0; n < e.length; n++) s[e[n]] = e[n];
					t.options = e = s
				}
				t.template = t.template || this.Ej(e, t.id, t.optionslist)
			}
		},
		Bj: function(t, e) {
			if (e) {
				delete e.options, e.collection = t, e.template = e.template || this.Dj(t, e.id, e.optionslist);
				var i = t.data.attachEvent("onStoreUpdated", webix.bind(function() {
					this.refresh(), this.refreshFilter(e.id)
				}, this));
				this.attachEvent("onDestruct", function() {
					t.$destructed || t.data.detachEvent(i)
				})
			}
		},
		Ej: function(t, e, i) {
			if (i) {
				var s = "string" == typeof i ? i : ",";
				return function(i) {
					var n = i[e] || i.value;
					if (!n) return "";
					for (var r = n.split(s), a = 0; a < r.length; a++) r[a] = t[r[a]] || "";
					return r.join(", ")
				}
			}
			return function(i) {
				return t[i[e]] || i.value || ""
			}
		},
		Dj: function(t, e, i) {
			if (i) {
				var s = "string" == typeof i ? i : ",";
				return function(i) {
					var n = i[e] || i.value;
					if (!n) return "";
					for (var r = n.split(s), a = 0; a < r.length; a++) {
						var h = t.data.pull[r[a]];
						r[a] = h ? h.value || "" : ""
					}
					return r.join(", ")
				}
			}
			return function(i) {
				var s = i[e] || i.value,
					n = t.data.pull[s];
				return n && (n.value || 0 === n.value) ? n.value : ""
			}
		}
	}, webix.DataLoader = webix.proto({
		$init: function(t) {
			t = t || "", this.Ve = webix.toArray(), this.data = new webix.DataStore, this.data.attachEvent("onClearAll", webix.bind(this.We, this)), this.data.attachEvent("onServerConfig", webix.bind(this.Xe, this)), this.data.feed = this.Ye, this.data.owner = t.id
		},
		Ye: function(t, e, i) {
			return this.Ze ? this.Ze = [t, e, i] : (this.Ze = !0, this.$e = [t, e], void this._e.call(this, t, e, i))
		},
		_e: function(t, e, i, s, n) {
			var r = null,
				s = s || this.data.url,
				a = [{
					success: this.af,
					error: this.af
				}, i];
			if (0 > t && (t = 0), n || (n = {
					start: t,
					count: e
				}), this.count() && (n["continue"] = "true"), this.getState && (r = this.getState()), s && "string" != typeof s) r && (r.sort && (n.sort = r.sort), r.filter && (n.filter = r.filter)), this.load(s, a, n);
			else {
				s += -1 == s.indexOf("?") ? "?" : "&";
				var h = [];
				for (var o in n) h.push(o + "=" + n[o]);
				if (r && (r.sort && h.push("sort[" + r.sort.id + "]=" + encodeURIComponent(r.sort.dir)), r.filter))
					for (var l in r.filter) h.push("filter[" + l + "]=" + encodeURIComponent(r.filter[l]));
				s += h.join("&"), this.load(s, a)
			}
		},
		af: function() {
			var t = this.Ze,
				e = this.$e;
			this.Ze = !1, "object" != typeof t || t[0] == e[0] && t[1] == e[1] || this.data.feed.apply(this, t)
		},
		load: function(t) {
			var t = webix.proxy.$parse(t),
				e = webix.AtomDataLoader.load.apply(this, arguments);
			return this.data.url || (this.data.url = t), e
		},
		loadNext: function(t, e, i, s, n) {
			var r = this.s;
			return r.datathrottle && !n ? (this.bf && window.clearTimeout(this.bf), void(this.bf = webix.delay(function() {
				this.loadNext(t, e, i, s, !0)
			}, this, 0, r.datathrottle))) : (e || 0 === e || (e = this.count()), t || (t = r.datafetch || this.count()), this.data.url = this.data.url || s, void(this.callEvent("onDataRequest", [e, t, i, s]) && this.data.url && this.data.feed.call(this, e, t, i)))
		},
		cf: function(t, e) {
			var i = this.$e;
			return this.Ze && i && i[0] <= e && i[1] + i[0] >= t + e ? !0 : !1
		},
		removeMissed_setter: function(t) {
			return this.data.ff = t
		},
		gf: function() {
			var t = this.s.save;
			t === !0 && (t = this.s.save = this.s.url);
			var e = {
				master: this
			};
			t && t.url ? webix.extend(e, t) : e.url = t, webix.dp(e)
		},
		save_setter: function(t) {
			return t && this.$ready.push(this.gf), t
		},
		scheme_setter: function(t) {
			this.data.scheme(t)
		},
		dataFeed_setter: function(t) {
			return t = webix.proxy.$parse(t), this.data.attachEvent("onBeforeFilter", webix.bind(function(t, e) {
				if ("function" == typeof t) return !0;
				if (this.s.dataFeed && (t || e)) {
					t = t || "id", e && "object" == typeof e && (e = e.id), this.clearAll();
					var i = this.s.dataFeed;
					if ("function" == typeof i) {
						var s = {};
						s[t] = e, i.call(this, e, s)
					} else if (i.$proxy) {
						if (i.load) {
							var n = {};
							n[t] = e, i.load(this, {
								success: this.M,
								error: this.N
							}, {
								filter: n
							})
						}
					} else {
						var r = "filter[" + t + "]=" + encodeURIComponent(e);
						this.load(i + (i.indexOf("?") < 0 ? "?" : "&") + r, this.s.datatype)
					}
					return !1
				}
			}, this)), t
		},
		ef: function() {
			if (this.s.ready && !this.hf) {
				var t = webix.toFunctor(this.s.ready, this.$scope);
				t && webix.delay(t, this, arguments), this.hf = !0
			}
		},
		We: function() {
			for (var t = 0; t < this.Ve.length; t++) {
				var e = this.Ve[t];
				try {
					e.aborted = !0
				} catch (i) {
					webix.ly.push(e)
				}
				e.abort()
			}
			this.Ve = webix.toArray(), this.waitData = webix.promise.defer()
		},
		Xe: function(t) {
			this.C(t)
		}
	}, webix.AtomDataLoader), webix.ly = webix.toArray(), webix.DataMarks = {
		addCss: function(t, e, i) {
			if (!this.addRowCss && !i && !this.hasCss(t, e)) {
				var s = this.getItemNode(t);
				s && (s.className += " " + e, i = !0)
			}
			return this.data.addMark(t, e, 1, 1, i)
		},
		removeCss: function(t, e, i) {
			if (!this.addRowCss && !i && this.hasCss(t, e)) {
				var s = this.getItemNode(t);
				s && (s.className = s.className.replace(e, "").replace("  ", " "), i = !0)
			}
			return this.data.removeMark(t, e, 1, i)
		},
		hasCss: function(t, e) {
			return this.data.getMark(t, e)
		},
		clearCss: function(t, e) {
			return this.data.clearMark(t, 1, e)
		}
	}, webix.DataStore = function() {
		this.name = "DataStore", webix.extend(this, webix.EventSystem), this.setDriver("json"), this.pull = {}, this.order = webix.toArray(), this.Me = {}
	}, webix.DataStore.prototype = {
		setDriver: function(t) {
			this.driver = webix.DataDriver[t]
		},
		df: function(t) {
			this.callEvent("onParse", [this.driver, t]), this.jf && this.filter();
			var e = this.driver.getInfo(t);
			e.U && (webix.securityKey = e.U), e.T && this.callEvent("onServerConfig", [e.T]);
			var i = this.driver.getOptions(t);
			i && this.callEvent("onServerOptions", [i]);
			var s = this.driver.getRecords(t);
			this.kf(e, s), this.lf && this.mf && !this.nf && this.mf(this.lf), this.of && (this.blockEvent(), this.sort(this.of), this.unblockEvent()), this.callEvent("onStoreLoad", [this.driver, t]), this.refresh()
		},
		kf: function(t, e) {
			var i = 1 * (t.R || 0),
				s = !0,
				n = !1;
			if (0 === i && this.order[0] && this.order[this.order.length - 1]) {
				if (this.ff) {
					n = {};
					for (var r = 0; r < this.order.length; r++) n[this.order[r]] = !0
				}
				s = !1, i = this.order.length
			}
			for (var a = 0, r = 0; r < e.length; r++) {
				var h = this.driver.getDetails(e[r]),
					o = this.id(h);
				this.pull[o] ? s && this.order[a + i] && a++ : (this.order[a + i] = o, a++), this.pull[o] ? (webix.extend(this.pull[o], h, !0), this.pf && this.pf(this.pull[o]), n && delete n[o]) : (this.pull[o] = h, this.qf && this.qf(h))
			}
			if (n) {
				this.blockEvent();
				for (var l in n) this.remove(l);
				this.unblockEvent()
			}
			this.order[t.Q - 1] || (this.order[t.Q - 1] = webix.undefined)
		},
		id: function(t) {
			return t.id || (t.id = webix.uid())
		},
		changeId: function(t, e) {
			this.pull[t] && (this.pull[e] = this.pull[t]), this.pull[e].id = e, this.order[this.order.find(t)] = e, this.jf && (this.jf[this.jf.find(t)] = e), this.Me[t] && (this.Me[e] = this.Me[t], delete this.Me[t]), this.callEvent("onIdChange", [t, e]), this.Ke && this.Ke(t, e), delete this.pull[t]
		},
		getItem: function(t) {
			return this.pull[t]
		},
		updateItem: function(t, e) {
			var i = this.getItem(t);
			webix.isUndefined(e) || i === e || (webix.extend(i, e, !0), i.id = t), this.pf && this.pf(i), this.callEvent("onStoreUpdated", [t, i, "update"]), this.callEvent("onDataUpdate", [t, i])
		},
		refresh: function(t) {
			this.rf || (t ? this.exists(t) && this.callEvent("onStoreUpdated", [t, this.pull[t], "paint"]) : this.callEvent("onStoreUpdated", [null, null, null]))
		},
		silent: function(t, e) {
			this.rf = !0, t.call(e || this), this.rf = !1
		},
		getRange: function(t, e) {
			if (t = t ? this.getIndexById(t) : this.$min || this.startOffset || 0, e ? e = this.getIndexById(e) : (e = 0 === this.$max ? 0 : Math.min(this.$max ? this.$max - 1 : this.endOffset || 1 / 0, this.count() - 1), 0 > e && (e = 0)), t > e) {
				var i = e;
				e = t, t = i
			}
			return this.getIndexRange(t, e)
		},
		getIndexRange: function(t, e) {
			e = Math.min(0 === e ? 0 : e || 1 / 0, this.count() - 1);
			for (var i = webix.toArray(), s = t || 0; e >= s; s++) i.push(this.getItem(this.order[s]));
			return i
		},
		count: function() {
			return this.order.length
		},
		exists: function(t) {
			return !!this.pull[t]
		},
		move: function(t, e) {
			if (t != e) {
				var i = this.getIdByIndex(t),
					s = this.getItem(i);
				this.jf && this.sf(this.jf, 0, 0, this.getIdByIndex(t), this.getIdByIndex(e)), this.sf(this.order, t, e), this.callEvent("onStoreUpdated", [i, s, "move"])
			}
		},
		sf: function(t, e, i, s, n) {
			if (s || n) {
				e = i = -1;
				for (var r = 0; r < t.length; r++) t[r] == s && 0 > e && (e = r), t[r] == n && 0 > i && (i = r)
			}
			var a = t[e];
			t.removeAt(e), t.insertAt(a, Math.min(t.length, i))
		},
		scheme: function(t) {
			this.tf = {}, this.uf = t.$save, this.qf = t.$init || t.$change, this.pf = t.$update || t.$change, this.vf = t.$serialize, this.lf = t.$group, this.of = t.$sort;
			for (var e in t) "$" != e.substr(0, 1) && (this.tf[e] = t[e])
		},
		importData: function(t, e) {
			var i = t ? t.data || t : [];
			if (this.jf = null, "function" == typeof i.serialize) this.order = webix.toArray([].concat(i.order)), this.pull = i.pull, i.branch && this.branch && (this.branch = webix.copy(i.branch), this.Mg = null);
			else {
				this.order = webix.toArray(), this.pull = {};
				var s, n;
				if (webix.isArray(t))
					for (var r = 0; r < t.length; r++) n = s = t[r], "object" == typeof n ? s = n.id || webix.uid() : n = {
						id: s,
						value: s
					}, this.order.push(n.id), this.qf && this.qf(n), this.pull[n.id] = n;
				else
					for (var r in i) this.order.push(r), this.pull[r] = {
						id: r,
						value: i[r]
					}
			}
			if (this.Pg && !i.branch) {
				this.branch = {
					0: []
				}, this.Og || this.Lg("data");
				for (var a = 0; a < this.order.length; a++) {
					var r = this.order[a];
					this.Pg(this.pull[r], 0, 0, !1)
				}
			}
			this.callEvent("onStoreLoad", []), e || this.callEvent("onStoreUpdated", [])
		},
		sync: function(t, e, i) {
			var s = typeof t;
			if ("string" == s && (t = webix.$$("source")), "function" != s && "object" != s && (i = e, e = null), "DataStore" != t.name) {
				if (!t.data || "DataStore" !== t.data.name && "TreeStore" !== t.data.name) return this.Ts = t, webix.callEvent("onSyncUnknown", [this, t, e]);
				t = t.data
			}
			var n = webix.bind(function() {
				this.wf || (this.importData(t, !0), e && this.silent(e), this.Y && this.Y(), this.callEvent("onSyncApply", []), i ? i = !1 : this.refresh())
			}, this);
			this.ab = [t.attachEvent("onStoreUpdated", n), t.attachEvent("onIdChange", webix.bind(function(t, e) {
				this.changeId(t, e), this.refresh(e)
			}, this))], this.Ts = t, this.Us = this.attachEvent("onStoreUpdated", function(e, i, s) {
				("update" == s || "save" == s) && (this.wf = 1, t.updateItem(e, i), this.wf = 0)
			}), n()
		},
		unsync: function() {
			if (this.Ts) {
				var t = this.Ts;
				if ("DataStore" == t.name || t.data && "DataStore" == t.data.name) {
					for (var e = 0; e < this.ab.length; e++) t.detachEvent(this.ab[e]);
					this.detachEvent(this.Us)
				} else webix.callEvent("onUnSyncUnknown", [this, t]);
				this.Ts = null
			}
		},
		destructor: function() {
			this.unsync(), this.pull = this.order = this.Me = null, this.i = this.j = {}
		},
		add: function(t, e) {
			if (this.tf)
				for (var i in this.tf) webix.isUndefined(t[i]) && (t[i] = this.tf[i]);
			this.qf && this.qf(t);
			var s = this.id(t),
				n = arguments[2] || this.order,
				r = n.length;
			if ((webix.isUndefined(e) || 0 > e) && (e = r), e > r && (e = Math.min(n.length, e)), this.callEvent("onBeforeAdd", [s, t, e]) === !1) return !1;
			if (this.pull[s] = t, n.insertAt(s, e), this.jf) {
				var a = this.jf.length;
				this.order.length && (a = Math.min(e || 0, a)), this.jf.insertAt(s, a)
			}
			return this.callEvent("onStoreUpdated", [s, t, "add"]), this.callEvent("onAfterAdd", [s, e]), t.id
		},
		remove: function(t) {
			if (webix.isArray(t))
				for (var e = 0; e < t.length; e++) this.remove(t[e]);
			else {
				if (this.callEvent("onBeforeDelete", [t]) === !1) return !1;
				var i = this.getItem(t);
				this.order.remove(t), this.jf && this.jf.remove(t), delete this.pull[t], this.Me[t] && delete this.Me[t], this.callEvent("onStoreUpdated", [t, i, "delete"]), this.callEvent("onAfterDelete", [t])
			}
		},
		clearAll: function() {
			this.pull = {}, this.Me = {}, this.order = webix.toArray(), this.jf = this.url = null, this.callEvent("onClearAll", []), this.refresh()
		},
		getIdByIndex: function(t) {
			return this.order[t]
		},
		getIndexById: function(t) {
			var e = this.order.find(t);
			return this.pull[t] ? e : -1
		},
		getNextId: function(t, e) {
			return this.order[this.getIndexById(t) + (e || 1)]
		},
		getFirstId: function() {
			return this.order[0]
		},
		getLastId: function() {
			return this.order[this.order.length - 1]
		},
		getPrevId: function(t, e) {
			return this.order[this.getIndexById(t) - (e || 1)]
		},
		sort: function(t, e, i) {
			var s = t;
			"function" == typeof t ? s = {
				as: t,
				dir: e
			} : "string" == typeof t && (s = {
				by: t.replace(/#/g, ""),
				dir: e,
				as: i
			});
			var n = [s.by, s.dir, s.as, s];
			this.callEvent("onBeforeSort", n) && (this.order = this.xf(s, this.order), this.jf && this.jf.length != this.order.length && (this.jf = this.xf(s, this.jf)), this.refresh(), this.callEvent("onAfterSort", n))
		},
		xf: function(t, e) {
			var i = this.zf.yf(t);
			if (this.order.length) {
				for (var s = webix.toArray(), n = e.length - 1; n >= 0; n--) s[n] = this.pull[e[n]];
				return s.sort(i), webix.toArray(s.map(function(t) {
					return this.id(t)
				}, this))
			}
			return e
		},
		Af: function(t) {
			this.jf && !t && (this.order = this.jf, delete this.jf)
		},
		Bf: function(t, e, i) {
			for (var s = webix.toArray(), n = 0; n < this.order.length; n++) {
				var r = this.order[n];
				t(this.getItem(r), e) && s.push(r)
			}
			i && this.jf || (this.jf = this.order), this.order = s
		},
		find: function(t, e) {
			var i = [];
			for (var s in this.pull) {
				var n = this.pull[s],
					r = !0;
				if ("object" == typeof t) {
					for (var a in t)
						if (n[a] != t[a]) {
							r = !1;
							break
						}
				} else t(n) || (r = !1);
				if (r && i.push(n), e && i.length) return i[0]
			}
			return i
		},
		filter: function(t, e, i) {
			if ((t || this.jf || this.Mg) && this.callEvent("onBeforeFilter", [t, e]) && (this.Af(i), this.order.length)) {
				if (t) {
					var s = t;
					e = e || "", "string" == typeof t && (t = t.replace(/#/g, ""), "function" == typeof e ? s = function(i) {
						return e(i[t])
					} : (e = e.toString().toLowerCase(), s = function(e, i) {
						return -1 != (e[t] || "").toString().toLowerCase().indexOf(i)
					})), this.Bf(s, e, i, this.Cf)
				}
				this.refresh(), this.callEvent("onAfterFilter", [])
			}
		},
		Df: function() {
			for (var t = [], e = this.order.length - 1; e >= 0; e--) t[e] = this.pull[this.order[e]];
			return t
		},
		each: function(t, e, i) {
			var s = this.order;
			i && (s = this.jf || s);
			for (var n = 0; n < s.length; n++) t.call(e || this, this.getItem(s[n]), n)
		},
		Ef: function(t, e) {
			return function() {
				return t[e].apply(t, arguments)
			}
		},
		provideApi: function(t, e) {
			e && this.mapEvent({
				onbeforesort: t,
				onaftersort: t,
				onbeforeadd: t,
				onafteradd: t,
				onbeforedelete: t,
				onafterdelete: t,
				ondataupdate: t
			});
			for (var i = ["sort", "add", "remove", "exists", "getIdByIndex", "getIndexById", "getItem", "updateItem", "refresh", "count", "filter", "find", "getNextId", "getPrevId", "clearAll", "getFirstId", "getLastId", "serialize", "sync"], s = 0; s < i.length; s++) t[i[s]] = this.Ef(this, i[s])
		},
		addMark: function(t, e, i, s, n) {
			var r = this.Me[t] || {};
			if (this.Me[t] = r, !r[e]) {
				if (r[e] = s || !0, i) {
					var a = r.$css || "";
					r.$css = a + " " + e
				}
				n || this.refresh(t)
			}
			return r[e]
		},
		removeMark: function(t, e, i, s) {
			var n = this.Me[t];
			if (n) {
				if (n[e] && delete n[e], i) {
					var r = n.$css;
					r && (n.$css = r.replace(e, "").replace("  ", " "))
				}
				s || this.refresh(t)
			}
		},
		getMark: function(t, e) {
			var i = this.Me[t];
			return i ? i[e] : !1
		},
		clearMark: function(t, e, i) {
			for (var s in this.Me) {
				var n = this.Me[s];
				n[t] && (delete n[t], e && n.$css && (n.$css = n.$css.replace(t, "").replace("  ", " ")), i || this.refresh(s))
			}
		},
		serialize: function(t) {
			var e = this.order;
			t && this.jf && (e = this.jf);
			for (var i = [], s = 0; s < e.length; s++) {
				var n = this.pull[e[s]];
				this.vf && (n = this.vf(n), n === !1) || i.push(n)
			}
			return i
		},
		zf: {
			yf: function(t) {
				return this.Ff(t.dir, this.Gf(t.by, t.as))
			},
			Hf: {
				server: function() {
					return !1
				},
				date: function(t, e) {
					return t -= 0, e -= 0, t > e ? 1 : e > t ? -1 : 0
				},
				"int": function(t, e) {
					return t = 1 * t, e = 1 * e, t > e ? 1 : e > t ? -1 : 0
				},
				string_strict: function(t, e) {
					return t = t.toString(), e = e.toString(), t > e ? 1 : e > t ? -1 : 0
				},
				string: function(t, e) {
					return e ? t ? (t = t.toString().toLowerCase(), e = e.toString().toLowerCase(), t > e ? 1 : e > t ? -1 : 0) : -1 : 1
				}
			},
			Gf: function(t, e) {
				return t ? ("function" != typeof e && (e = this.Hf[e || "string"]), function(i, s) {
					return e(i[t], s[t])
				}) : e
			},
			Ff: function(t, e) {
				return "asc" != t && t ? function(t, i) {
					return -1 * e(t, i)
				} : e
			}
		}
	}, webix.DataCollection = webix.proto({
		name: "DataCollection",
		isVisible: function() {
			return this.data.order.length || this.data.jf || this.s.dataFeed ? !0 : !1
		},
		$init: function(t) {
			this.data.provideApi(this, !0);
			var e = t && t.id ? t.id : webix.uid();
			this.s.id = e, webix.ui.views[e] = this, this.data.attachEvent("onStoreLoad", webix.bind(function() {
				this.callEvent("onBindRequest", [])
			}, this))
		},
		refresh: function() {
			this.callEvent("onBindRequest", [])
		}
	}, webix.DataMove, webix.CollectionBind, webix.BindSource, webix.ValidateCollection, webix.DataLoader, webix.MapCollection, webix.EventSystem, webix.BaseBind, webix.Destruction, webix.Settings), webix.Scrollable = {
		$init: function(t) {
			return t && !t.scroll && this.If ? this.y = this.y || this.w : ((this.y || this.w).appendChild(webix.html.create("DIV", {
				"class": "webix_scroll_cont"
			}, "")), this.y = (this.y || this.w).firstChild, void(webix.env.touch || webix.event(this.x, "scroll", webix.bind(function() {
				this.callEvent && webix.delay(function() {
					this.callEvent("onAfterScroll", [])
				}, this)
			}, this))))
		},
		scroll_setter: function(t) {
			if (!t) return !1;
			var e = "x" == t ? "x" : "xy" == t ? "xy" : "a" == t ? "xy" : "y";
			if (webix.Touch && webix.Touch.$active) this.y.setAttribute("touch_scroll", e), this.attachEvent && this.attachEvent("onAfterRender", webix.bind(this.Jf, this)), this.Kf = !0;
			else if (webix.env.$customScroll) webix.CustomScroll.enable(this, e);
			else {
				var i = this.y.parentNode.style; - 1 != t.toString().indexOf("a") ? i.overflowX = i.overflowY = "auto" : (-1 != e.indexOf("x") && (this.ec = !0, i.overflowX = "scroll"), -1 != e.indexOf("y") && (this.cc = !0, i.overflowY = "scroll"))
			}
			return e
		},
		Lf: function(t) {
			if (!!this.s.scroll != !!t) {
				if (!webix.env.$customScroll) {
					var e = this.y.parentNode.style;
					e.overflowX = e.overflowY = t ? "auto" : "hidden"
				}
				this.ec = this.cc = !!t, this.s.scroll = !!t
			}
		},
		getScrollState: function() {
			if (webix.Touch && webix.Touch.$active) {
				var t = webix.Touch.Mf(this.y);
				return {
					x: -t.e,
					y: -t.f
				}
			}
			return {
				x: this.y.parentNode.scrollLeft,
				y: this.y.parentNode.scrollTop
			}
		},
		scrollTo: function(t, e) {
			webix.Touch && webix.Touch.$active ? (e = Math.max(0, Math.min(e, this.y.offsetHeight - this.dc)), t = Math.max(0, Math.min(t, this.y.offsetWidth - this.bc)), webix.Touch.Nf(this.y, -t, -e, this.s.scrollSpeed || "100ms")) : (this.y.parentNode.scrollLeft = t, this.y.parentNode.scrollTop = e)
		},
		Jf: function() {
			if (-1 != this.s.scroll.toString().indexOf("x")) {
				var t = this.y.scrollWidth;
				t && (this.y.style.width = "100%", this.y.style.width = t + "px")
			}
			if (webix.Touch && webix.Touch.$active && this.Kf) {
				webix.Touch.Of(), webix.Touch.Pf();
				var e = this.getScrollState(),
					i = this.y.offsetWidth - this.$width - e.x,
					s = this.y.offsetHeight - this.$height - e.y;
				if (0 > i || 0 > s) {
					var t = 0 > i ? Math.min(-i - e.x, 0) : -e.x,
						n = 0 > s ? Math.min(-s - e.y, 0) : -e.y;
					webix.Touch.Nf(this.y, t, n, 0)
				}
			}
		}
	}, webix.protoUI({
		defaults: {
			size: 10,
			page: 0,
			group: 5,
			template: "{common.pages()}",
			maxWidth: 1e5,
			height: 30,
			borderless: !0
		},
		name: "pager",
		on_click: {
			webix_pager_item: function(t, e) {
				this.select(e)
			}
		},
		$init: function(t) {
			this.data = this.s, this.y = this.x, this.x.className += " webix_pager", (t.master === !1 || 0 === t.master) && this.$ready.push(this.wt)
		},
		wt: function() {
			this.refresh(), this.$master = {
				refresh: function() {},
				select: function() {}
			}
		},
		select: function(t) {
			if (this.$master && "pager" == this.$master.name) return this.$master.select(t);
			switch (t) {
				case "next":
					t = this.s.page + 1;
					break;
				case "prev":
					t = this.s.page - 1;
					break;
				case "first":
					t = 0;
					break;
				case "last":
					t = this.s.limit - 1
			}
			0 > t && (t = 0), t >= this.data.limit && (t = this.data.limit - 1);
			var e = this.data.page;
			this.data.page = 1 * t, this.refresh() && (this.s.animate && this.Qf(e, 1 * t, this.s.animate) || this.$master.refresh())
		},
		ad: "webix_p_id",
		template_setter: webix.template,
		type: {
			template: function(t, e) {
				return t.template.call(this, t, e)
			},
			pages: function(t) {
				var e = "";
				if (-1 == t.page) return "";
				t.$min = t.page - Math.round((t.group - 1) / 2), t.$max = t.$min + 1 * t.group - 1, t.$min < 0 && (t.$max += -1 * t.$min, t.$min = 0), t.$max >= t.limit && (t.$min -= Math.min(t.$min, t.$max - t.limit + 1), t.$max = t.limit - 1);
				for (var i = t.$min || 0; i <= t.$max; i++) e += this.button({
					id: i,
					index: i + 1,
					selected: i == t.page ? "_selected" : ""
				});
				return e
			},
			page: function(t) {
				return t.page + 1
			},
			first: function() {
				return this.button({
					id: "first",
					index: webix.locale.pager.first,
					selected: ""
				})
			},
			last: function() {
				return this.button({
					id: "last",
					index: webix.locale.pager.last,
					selected: ""
				})
			},
			prev: function() {
				return this.button({
					id: "prev",
					index: webix.locale.pager.prev,
					selected: ""
				})
			},
			next: function() {
				return this.button({
					id: "next",
					index: webix.locale.pager.next,
					selected: ""
				})
			},
			button: webix.template("<button type='button' webix_p_id='{obj.id}' class='webix_pager_item{obj.selected}'>{obj.index}</button>")
		},
		clone: function(t) {
			t.$view || (t.view = "pager", t = webix.ui(t)), this.Rf = t, t.$master = this, this.Sf()
		},
		refresh: function() {
			var t = this.s;
			if (t.count) {
				t.limit = Math.ceil(t.count / t.size);
				var e = Math.min(t.limit - 1, t.page);
				return e != t.page ? this.$master.setPage(e) : (t.page = e, e >= 0 && e != t.old_page || t.limit != t.old_limit || t.old_count != t.count ? (this.render(), this.Sf(), t.old_limit = t.limit, t.old_page = t.page, t.old_count = t.count, !0) : void 0)
			}
		},
		apiOnly_setter: function(t) {
			return this.$apiOnly = t
		},
		Sf: function() {
			this.Rf && (this.Rf.s.count = this.s.count, this.Rf.s.page = this.s.page, this.Rf.refresh())
		},
		Qf: function(t, e, i) {
			if (t == e) return !1;
			if (this.Tf) return this.Uf && window.clearTimeout(this.Uf), this.Uf = webix.delay(this.Qf, this, [t, e, i], 100);
			var s = e > t ? "left" : "right";
			("top" == i.direction || "bottom" == i.direction) && (s = e > t ? "top" : "bottom"), i.flip && (s = "");
			var n = 0,
				r = this.$master.y;
			this.$master.Vf && (r = this.$master.Vf, n = r.offsetTop, webix.html.addCss(this.$master.$view, "webix_animation"));
			var a = r.cloneNode(!0);
			a.style.width = r.style.width = "100%", a.style.backgroundColor = r.style.backgroundColor = "white", this.$master.refresh(), webix.html.insertBefore(a, r.nextSibling, r.parentNode);
			var h, o = i !== !0 ? i : {},
				l = webix.extend({
					direction: s,
					callback: webix.bind(function() {
						l.callback = null, webix.animate.breakLine(h), this.Tf = !1, this.$master.Vf && webix.html.removeCss(this.$master.$view, "webix_animation")
					}, this),
					top: n
				}, o);
			h = webix.animate.formLine(r, a, l), webix.animate([r, a], l), this.Tf = !0
		}
	}, webix.MouseEvents, webix.SingleRender, webix.ui.view, webix.EventSystem), webix.locale.pager = {
		first: " &lt;&lt; ",
		last: " &gt;&gt; ",
		next: " &gt; ",
		prev: " &lt; "
	}, webix.locale.confirmWindowClose = {
		text: "You make some information changes on this window.<br><br>If you close it, you will lose all those changes.<br><br>Do you really want to close it?",
		keep: "Close window",
		close: "No"
	}, webix.PagingAbility = {
		pager_setter: function(t) {
			function e(i) {
				if (t.config.autosize && this.getVisibleCount) {
					var s = this.getVisibleCount();
					isNaN(s) ? (t.config.size = 1, webix.delay(e, this, [!0])) : s != t.config.size && (t.config.size = s, t.refresh(), i === !0 && this.refresh())
				}
				var n = this.s.pager;
				return -1 == n.page ? !1 : (this.data.$min = this.sy(0, n.page * n.size), this.data.$max = this.sy(this.data.$min, n.size), this.data.$pagesize = this.data.$max - this.data.$min, !0)
			}
			if ("string" == typeof t) {
				var i = webix.$$(t);
				if (!i) return this.$blockRender = !0, webix.delay(function() {
					var e = webix.$$(t);
					this.s.pager = this.pager_setter(e);
					var i = e.s;
					i.count = this.data.ty(i.level), e.refresh(), this.$blockRender = !1, this.render()
				}, this), null;
				t = i
			}
			return this.attachEvent("onBeforeRender", e), t.$view || (t.view = "pager", t = webix.ui(t)), this.Wf = t, t.$master = this, this.data.attachEvent("onStoreUpdated", function() {
				var e = t.s;
				e.count = this.ty(e.level), t.refresh()
			}), this.data.ty = this.ty, t.s
		},
		ty: function(t) {
			if (t && 0 !== t) {
				var e = 0;
				return this.each(function(i) {
					i.$level == t && e++
				}), e
			}
			return this.count()
		},
		sy: function(t, e) {
			var i = this.s.pager;
			if (i.level && 0 !== i.level) {
				var s = t,
					n = this.data.order.length;
				if (e)
					for (; n > s;) {
						if (this.data.getItem(this.data.order[s]).$level == i.level) {
							if (0 === e) break;
							e--
						}
						s++
					}
				return s
			}
			return t + e
		},
		setPage: function(t) {
			this.Wf && this.Wf.select(t)
		},
		getPage: function() {
			return this.Wf.s.page
		},
		getPager: function() {
			return this.Wf
		}
	}, webix.protoUI({
		name: "tooltip",
		defaults: {
			dy: 0,
			dx: 20
		},
		$init: function(t) {
			"string" == typeof t && (t = {
				template: t
			}), this.type = webix.extend({}, this.type), this.x = this.w = this.y = document.createElement("DIV"), this.w.className = "webix_tooltip", webix.html.insertBefore(this.w, document.body.firstChild, document.body), webix.attachEvent("onClick", webix.bind(function(t) {
				this.gz && webix.$$(t) != this && this.hide()
			}, this))
		},
		adjust: function() {},
		isVisible: function() {
			return !0
		},
		show: function(t, e) {
			this.Xf || (this.data != t && (this.data = webix.extend({}, t), this.render(t)), this.y.firstChild && (this.w.style.top = e.y + this.s.dy + "px", this.w.style.left = e.x + this.s.dx + "px", this.w.style.display = "block"), this.gz = !0)
		},
		hide: function() {
			this.data = null, this.w.style.display = "none", this.gz = !1
		},
		disable: function() {
			this.Xf = !0
		},
		enable: function() {
			this.Xf = !1
		},
		type: {
			template: webix.template("{obj.id}"),
			templateStart: webix.template.empty,
			templateEnd: webix.template.empty
		}
	}, webix.SingleRender, webix.Settings, webix.EventSystem, webix.ui.view), webix.AutoTooltip = {
		tooltip_setter: function(t) {
			if (t) {
				"function" == typeof t && (t = {
					template: t
				});
				var e = !t.template,
					i = new webix.ui.tooltip(t);
				this.Vc();
				var s = this.attachEvent("onMouseMove", function(t, s) {
						if (this.DA = s.clientX, this.EA = s.clientY, this.getColumnConfig) {
							var n = i.type.column = this.getColumnConfig(t.column);
							if (e) {
								if (!n.tooltip && n.tooltip != webix.undefined) return;
								if (n.tooltip) i.type.template = n.tooltip = webix.template(n.tooltip);
								else {
									var r = this.getText(t.row, t.column);
									i.type.template = function() {
										return r
									}
								}
							}
						}
						webix.DragControl.active || i.show(this.getItem(t), webix.html.pos(s))
					}),
					n = webix.event(document.body, "mousemove", webix.bind(function(t) {
						t = t || event, (this.DA != t.clientX || this.EA != t.clientY) && i.hide()
					}, this));
				return this.attachEvent("onDestruct", function() {
					this.config.tooltip && this.config.tooltip.destructor()
				}), this.attachEvent("onAfterScroll", function() {
					i.hide()
				}), i.attachEvent("onDestruct", webix.bind(function() {
					this.detachEvent(s), webix.eventRemove(n)
				}, this)), i
			}
		}
	}, webix.protoUI({
		name: "proto",
		$init: function() {
			this.data.provideApi(this, !0), this.y = this.y || this.w, this.data.attachEvent("onStoreUpdated", webix.bind(function() {
				this.render.apply(this, arguments)
			}, this))
		},
		$setSize: function() {
			webix.ui.view.prototype.$setSize.apply(this, arguments) && this.render()
		},
		ad: "webix_item",
		on_mouse_move: {},
		type: {}
	}, webix.PagingAbility, webix.DataMarks, webix.AutoTooltip, webix.ValidateCollection, webix.RenderStack, webix.DataLoader, webix.ui.view, webix.EventSystem, webix.Settings), webix.CodeParser = {
		collapseNames: function(t, e, i) {
			if (i = i || {}, e = e || "", !t || "object" != typeof t) return null;
			for (var s in t) !t[s] || "object" != typeof t[s] || webix.isDate(t[s]) || webix.isArray(t[s]) ? i[e + s] = t[s] : webix.CodeParser.collapseNames(t[s], e + s + ".", i);
			return i
		},
		expandNames: function(t) {
			var e, i, s, n, r, a = {};
			for (r in t) {
				for (s = r.split("."), i = s.length - 1, n = a, e = 0; i > e; e++) n[s[e]] || (n[s[e]] = {}), n = n[s[e]];
				n[s[i]] = t[r]
			}
			return a
		}
	}, webix.Values = {
		$init: function() {
			this.elements = {}
		},
		focus: function(t) {
			if (t) this.ub(this.elements[t]);
			else
				for (var e in this.elements)
					if (this.ub(this.elements[e])) return !0
		},
		ub: function(t) {
			return t && t.focus ? (t.focus(), !0) : void 0
		},
		setValues: function(t, e) {
			this.s.complexData && (t = webix.CodeParser.collapseNames(t)), this.Zf(t, e)
		},
		Zf: function(t, e) {
			this.Yf = e, this.blockEvent(), e && this.$f || (this.$f = {});
			for (var i in t) this.elements[i] || (this.$f[i] = t[i]);
			for (var i in this.elements) {
				var s = this.elements[i];
				s && (webix.isUndefined(t[i]) ? !e && s.Ce && s.setValue("") : s.setValue(t[i]), this.$f[i] = s.getValue())
			}
			this.unblockEvent(), this.callEvent("onValues", [])
		},
		isDirty: function() {
			return this.Yf ? !0 : 1 === this.getDirtyValues(1) ? !0 : !1
		},
		setDirty: function(t) {
			this.Yf = t, t || (this.$f = this.hz())
		},
		getDirtyValues: function() {
			var t = {};
			if (this.$f)
				for (var e in this.elements) {
					var i = this.elements[e].getValue();
					if (this.$f[e] != i && (t[e] = i, arguments[0])) return 1
				}
			return t
		},
		getCleanValues: function() {
			return this.$f
		},
		getValues: function(t) {
			var e = this.hz(t);
			return this.s.complexData && (e = webix.CodeParser.expandNames(e)), e
		},
		hz: function(t) {
			var e, i = null,
				s = this.$f ? webix.copy(this.$f) : {};
			for (var n in this.elements) i = this.elements[n], e = !0, t && ("object" == typeof t ? (t.hidden === !1 && (e = i.isVisible()), e && t.disabled === !1 && (e = i.isEnabled())) : e = t.call(this, i)), e ? s[n] = i.getValue() : delete s[n];
			return s
		},
		clear: function() {
			this.Yf = !1;
			var t = {};
			for (var e in this.elements) this.elements[e].Ce && (t[e] = this.elements[e].s.defaultValue || "");
			this.Zf(t)
		},
		markInvalid: function(t, e) {
			if (e === !1) this.Qe(t);
			else {
				if ("string" == typeof e) {
					var i = this.elements[t];
					i && (i.s.invalidMessage = e)
				}
				this.Te(t)
			}
		},
		Te: function(t) {
			var e = this.elements[t];
			if (t && e) {
				this.Qe(t, !0), webix.html.addCss(e.x, "webix_invalid"), e.s.invalid = !0;
				var i = e.s.invalidMessage;
				"string" == typeof i && e.setBottomText && e.setBottomText()
			}
		},
		Qe: function(t, e) {
			var i = this.elements[t];
			if (t && i && i.$view && i.s.invalid) {
				webix.html.removeCss(i.x, "webix_invalid"), i.s.invalid = !1;
				var s = i.s.invalidMessage;
				"string" == typeof s && !e && i.setBottomText && i.setBottomText()
			}
		}
	}, webix.protoUI({
		name: "toolbar",
		defaults: {
			type: "toolbar"
		},
		Gc: !0,
		_f: "webix_toolbar",
		ag: !1,
		$init: function(t) {
			t.borderless || (this.w.style.borderWidth = "1px"), this.w.className += " " + this._f
		},
		Qs: function() {
			var t = this;
			t.elements = {}, webix.ui.each(this, function(e) {
				return e.s.name && e.getValue && e.setValue && (t.elements[e.s.name] = e, e.mapEvent && e.mapEvent({
					onbeforetabclick: t,
					onaftertabclick: t,
					onitemclick: t,
					onchange: t
				})), e.setValues ? !1 : void 0
			}), this.setDirty(!1)
		},
		sc: function() {
			this.Qs()
		},
		Bc: function(t) {
			var e = this.s;
			return e.elements && !t && (this.nc = t = e.elements, this.mc = this.ag, delete e.elements), this.s.elementsConfig && this.eg(this.nc, e.elementsConfig), t
		},
		eg: function(t, e) {
			for (var i = 0; i < t.length; i++) {
				var s = t[i];
				webix.extend(s, e);
				var n = e;
				s.elementsConfig && (n = webix.extend(webix.extend({}, s.elementsConfig), e));
				var r;
				r = s.body ? [s.body] : s.rows || s.cols || s.cells || s.body, r && this.eg(r, n)
			}
		},
		$getSize: function(t, e) {
			var i = webix.ui.layout.prototype.$getSize.call(this, t, e),
				s = this.getParentView(),
				n = this.mc ? 3 : 1;
			return s && this.mc != s.mc && (i[n] += 1e5), i
		},
		render: function() {},
		refresh: function() {
			this.render()
		}
	}, webix.Scrollable, webix.AtomDataLoader, webix.Values, webix.ui.layout, webix.ValidateData), webix.protoUI({
		name: "template",
		$init: function(t) {
			var e = this.fg[t.type];
			e && (webix.extend(t, e), t.borderless && (delete t.Ob, this.hc(t))), this.y == this.x ? (this.y = webix.html.create("DIV"), this.y.className = " webix_template", this.x.appendChild(this.y)) : this.y.className += " webix_template", this.attachEvent("onAfterRender", this.hg)
		},
		setValues: function(t, e) {
			this.data = e ? webix.extend(this.data, t, !0) : t, this.render()
		},
		getValues: function() {
			return this.data
		},
		$skin: function() {
			this.fg.header.height = this.fg.section.height = webix.skin.$active.barHeight
		},
		fg: {
			header: {
				css: "webix_header"
			},
			section: {
				css: "webix_section",
				borderless: !0
			},
			clean: {
				css: "webix_clean",
				borderless: !0
			}
		},
		onClick_setter: function(t) {
			return this.on_click = webix.extend(this.on_click || {}, t, !0), this.Sc || webix.extend(this, webix.MouseEvents), t
		},
		defaults: {
			template: webix.template.empty
		},
		gg: function() {
			this.ig = !1, this.jg(), this.resize()
		},
		jg: function() {
			this.ig || (this.ig = !0, this.render())
		},
		src_setter: function(t) {
			return this.ig = !0, this.callEvent("onBeforeLoad", []), webix.ajax(t, webix.bind(function(t) {
				this.s.template = webix.template(t), this.gg(), this.callEvent("onAfterLoad", [])
			}, this)), t
		},
		hg: function() {
			this.s.autoheight && (this.ac = null, this.resize()), this.s.scroll && -1 != this.s.scroll.indexOf("x") && (this.y.style.width = this.y.scrollWidth + "px")
		},
		content_setter: function(t) {
			t && (this.ig = !0, this.render = function() {}, this.y.appendChild(webix.toNode(t)))
		},
		refresh: function() {
			this.render()
		},
		setHTML: function(t) {
			this.s.template = function() {
				return t
			}, this.refresh()
		},
		setContent: function(t) {
			this.y.innerHTML = "", this.content_setter(t)
		},
		$setSize: function(t, e) {
			if (webix.ui.view.prototype.$setSize.call(this, t, e)) {
				if (this.jg(), this.s.autoheight) {
					var i = this.getTopParentView();
					clearTimeout(i.kg), i.kg = webix.delay(this.resize, this)
				}
				return !0
			}
		},
		$getSize: function(t, e) {
			return this.s.autoheight && !this.s.type && (this.s.height = this.lg()), webix.ui.view.prototype.$getSize.call(this, t, e)
		},
		lg: function() {
			var t;
			this.jg();
			webix.skin.$active.layoutPadding.space;
			return this.y.style.height = "auto", t = this.y.scrollHeight, this.y.style.height = "", t
		},
		If: !0
	}, webix.Scrollable, webix.AtomDataLoader, webix.AtomRender, webix.EventSystem, webix.ui.view), webix.protoUI({
		name: "iframe",
		$init: function(t) {
			this.y = this.w, this.w.innerHTML = "<iframe style='width:100%; height:100%' frameborder='0' onload='var t= $$(\"" + t.id + "\"); if (t) t.callEvent(\"onAfterLoad\",[]);' src='about:blank'></iframe>"
		},
		load: function(t) {
			this.src_setter(t)
		},
		src_setter: function(t) {
			return this.getIframe().src = t, this.callEvent("onBeforeLoad", []), t
		},
		getIframe: function() {
			return this.w.getElementsByTagName("iframe")[0]
		},
		getWindow: function() {
			return this.getIframe().contentWindow
		}
	}, webix.ui.view, webix.EventSystem), webix.OverlayBox = {
		showOverlay: function(t) {
			this.mg ? this.mg.innerHTML = t : (this.mg = webix.html.create("DIV", {
				"class": "webix_overlay"
			}, t || ""), webix.html.insertBefore(this.mg, this.x.firstChild, this.x), this.x.style.position = "relative")
		},
		hideOverlay: function() {
			this.mg && (webix.html.remove(this.mg), this.mg = null)
		}
	}, webix.protoUI({
		name: "scrollview",
		defaults: {
			scroll: "y",
			scrollSpeed: "0ms"
		},
		$init: function() {
			this.x.className += " webix_scrollview"
		},
		body_setter: function(t) {
			t.borderless = !0, this.gd = webix.ui.A(t), this.gd.Xb = this, this.y.appendChild(this.gd.x)
		},
		getChildViews: function() {
			return [this.gd]
		},
		getBody: function() {
			return this.gd
		},
		resizeChildren: function() {
			this.ng = this.gd.$getSize(0, 0), this.og(), webix.callEvent("onResize", [])
		},
		og: function() {
			var t = (this.Mw || webix.ui.scrollSize, Math.max(this.bc, this.ng[0])),
				e = Math.max(this.dc, this.ng[2]);
			if (this.gd.$setSize(t, e), this.y.style.width = this.gd.bc + "px", this.y.style.height = this.gd.dc + "px", webix.env.touch) {
				var i = this.getScrollState(),
					s = this.gd.dc - this.dc;
				s < i.y && this.scrollTo(null, s)
			}
		},
		$getSize: function(t, e) {
			var i = this.ng = this.gd.$getSize(0, 0),
				s = webix.ui.view.prototype.$getSize.call(this, t, e),
				n = this.Mw || webix.ui.scrollSize;
			return "x" == this.s.scroll ? (s[2] = Math.max(s[2], i[2]) + n, s[3] = Math.min(s[3], i[3]) + n) : "y" == this.s.scroll && (s[0] = Math.max(s[0], i[0]) + n, s[1] = Math.min(s[1], i[1]) + n), s
		},
		$setSize: function(t, e) {
			var i = webix.ui.scrollSize;
			webix.ui.scrollSize = this.Mw || i, webix.ui.view.prototype.$setSize.call(this, t, e) && this.og(), webix.ui.scrollSize = i
		},
		scroll_setter: function(t) {
			var e = webix.env.$customScroll;
			return "string" == typeof t && 0 === t.indexOf("native-") && (this.Mw = 17, t = t.replace("native-"), webix.env.$customScroll = !1), t = webix.Scrollable.scroll_setter.call(this, t), webix.env.$customScroll = e, t
		},
		Qb: function(t) {
			this.gd.destructor(), this.gd = t, this.gd.Xb = this, this.ed.appendChild(this.gd.x), this.resize()
		},
		showView: function(t) {
			var e = webix.$$(t).$view.offsetTop - webix.$$(t).$view.parentNode.offsetTop;
			this.scrollTo(0, e)
		}
	}, webix.Scrollable, webix.EventSystem, webix.ui.view), webix.TreeRenderStack = {
		$init: function() {},
		pg: function(t) {
			var e = this.data.Me[t.id];
			return this.callEvent("onItemRender", [t]), this.type.templateStart(t, this.type, e) + (t.$template ? this.type["template" + t.$template](t, this.type, e) : this.type.template(t, this.type, e)) + this.type.templateEnd()
		},
		qg: function(t) {
			return this.v.innerHTML = this.pg(t), this.v.firstChild
		},
		jb: function(t) {
			var e = "<div class='webix_tree_branch_" + t.$level + "'>" + this.pg(t);
			return t.open && (e += this.rg(t.id)), e += "</div>"
		},
		rg: function(t) {
			var e = "",
				i = this.data.branch[t];
			if (i) {
				e += "<div class='webix_tree_leaves'>";
				for (var s = i.length - 1, n = 0; s >= n; n++) {
					var r = this.getItem(i[n]);
					this.type.sg[r.$level] = n == s, e += this.jb(r)
				}
				e += "</div>"
			}
			return e
		},
		render: function(t, e, i) {
			if (webix.TreeRenderStack.tg = this, this.isVisible(this.s.id) && !this.$blockRender) {
				if (t) {
					var s, n = this.getItem(t);
					if ("add" != i && (s = this.getItemNode(t), !s)) return;
					switch (i) {
						case "branch":
							var r = s.parentNode,
								a = this.Ne(n);
							webix.html.insertBefore(a, r), webix.html.remove(r), this.t = null;
							break;
						case "paint":
						case "update":
							var a = this.t[t] = this.qg(n);
							webix.html.insertBefore(a, s), webix.html.remove(s);
							break;
						case "delete":
							webix.html.remove(s.parentNode);
							break;
						case "add":
							var h;
							if (0 == n.$parent ? h = this.y.firstChild : (h = this.getItemNode(n.$parent), h && (h = h.nextSibling)), h) {
								var o = this.data.getNextSiblingId(t);
								o = this.getItemNode(o), o && (o = o.parentNode);
								var a = this.Ne(n);
								this.t[t] = a.firstChild, webix.html.insertBefore(a, o, h)
							}
							break;
						default:
							return !1
					}
					this.callEvent("onPartialRender", [t, e, i])
				} else this.callEvent("onBeforeRender", [this.data]) && (this.type.sg = [], this.y.innerHTML = this.rg(0), this.t = null, this.callEvent("onAfterRender", []));
				return this.type.sg = 0, webix.TreeRenderStack.tg = null, !0
			}
		},
		getItemNode: function(t) {
			if (this.t) return this.t[t];
			this.t = {};
			for (var e = this.y.getElementsByTagName("DIV"), i = 0; i < e.length; i++) {
				var s = e[i].getAttribute(this.ad);
				s && (this.t[s] = e[i])
			}
			return this.getItemNode(t)
		},
		vg: 1
	}, webix.SelectionModel = {
		$init: function() {
			this.wg = webix.toArray(), this.data.attachEvent("onStoreUpdated", webix.bind(this.xg, this)), this.data.attachEvent("onStoreLoad", webix.bind(this.yg, this)), this.data.attachEvent("onAfterFilter", webix.bind(this.zg, this)), this.data.attachEvent("onIdChange", webix.bind(this.Ag, this)), this.$ready.push(this.uy)
		},
		uy: function() {
			("multiselect" == this.s.select || this.s.multiselect) && webix.event(this.$view, "mousedown", function(t) {
				var e = (t || event).shiftKey;
				e && (webix.vy = this, webix.html.addCss(this, "webix_noselect", 1))
			})
		},
		Ag: function(t, e) {
			for (var i = this.wg.length - 1; i >= 0; i--) this.wg[i] == t && (this.wg[i] = e)
		},
		zg: function() {
			for (var t = this.wg.length - 1; t >= 0; t--)
				if (this.data.getIndexById(this.wg[t]) < 0) {
					var e = this.wg[t];
					this.removeCss(e, "webix_selected", !0), this.wg.splice(t, 1), this.callEvent("onSelectChange", [e])
				}
		},
		xg: function(t, e, i) {
			if ("delete" == i)
				if (this.loadBranch)
					for (var s = this.wg.length - 1; s >= 0; s--) this.exists(this.wg[s]) || this.wg.splice(s, 1);
				else this.wg.remove(t);
			else t || this.data.count() || this.data.jf || (this.wg = webix.toArray())
		},
		yg: function() {
			this.s.select && this.data.each(function(t) {
				t && t.$selected && this.select(t.id)
			}, this)
		},
		Bg: function(t, e, i, s) {
			var n = e ? "onBeforeSelect" : "onBeforeUnSelect";
			if (!this.callEvent(n, [t, e])) return !1;
			s && (this.Dg = !0, this.unselectAll(), this.Dg = !1), e ? this.addCss(t, "webix_selected", !0) : this.removeCss(t, "webix_selected", !0), i ? i.push(t) : (e ? this.wg.push(t) : this.wg.remove(t), this.Cg(t));
			var n = e ? "onAfterSelect" : "onAfterUnSelect";
			return this.callEvent(n, [t]), !0
		},
		select: function(t, e) {
			var i = arguments[2],
				s = arguments[3];
			if (!t) return this.selectAll();
			if (!webix.isArray(t)) {
				if (s && this.wg.length) return this.selectAll(this.wg[this.wg.length - 1], t);
				var n = !1;
				return i || e || 1 == this.wg.length && this.wg[0] == t || (n = !0), !n && this.isSelected(t) ? void(i && this.unselect(t)) : void this.Bg(t, !0, null, n)
			}
			for (var r = 0; r < t.length; r++) this.select(t[r], r ? 1 : e, i, s)
		},
		unselect: function(t) {
			return t ? void(this.isSelected(t) && this.Bg(t, !1)) : this.unselectAll()
		},
		selectAll: function(t, e) {
			var i, s = [];
			i = t || e ? this.data.getRange(t || null, e || null) : this.data.getRange(), i.each(function(t) {
				this.data.getMark(t.id, "webix_selected") || (this.wg.push(t.id), this.Bg(t.id, !0, s))
			}, this), this.Cg(s)
		},
		unselectAll: function() {
			var t = [];
			this.wg.each(function(e) {
				this.Bg(e, !1, t)
			}, this), this.wg = webix.toArray(), this.Cg(t)
		},
		isSelected: function(t) {
			return -1 != this.wg.find(t)
		},
		getSelectedId: function(t) {
			switch (this.wg.length) {
				case 0:
					return t ? [] : "";
				case 1:
					return t ? [this.wg[0]] : this.wg[0];
				default:
					return [].concat(this.wg)
			}
		},
		getSelectedItem: function(t) {
			var e = this.getSelectedId(!0);
			if (e.length > 1 || t) {
				for (var i = e.length - 1; i >= 0; i--) e[i] = this.getItem(e[i]);
				return e
			}
			return e.length ? this.getItem(e[0]) : void 0
		},
		Eg: function(t) {
			return t.length > 100 || t.length > this.data.count / 2
		},
		Cg: function(t) {
			if ("object" != typeof t && (t = [t]), t.length) {
				if (this.Eg(t)) this.data.refresh();
				else
					for (var e = 0; e < t.length; e++) this.render(t[e], this.data.getItem(t[e]), "update");
				this.Dg || this.callEvent("onSelectChange", [t])
			}
		}
	}, webix.ready(function() {
		webix.event(document.body, "mouseup", function() {
			webix.vy && (webix.html.removeCss(webix.vy, "webix_noselect"), webix.vy = null)
		})
	}), webix.TreeDataMove = {
		$init: function() {},
		copy: function(t, e, i, s) {
			return s = s || {}, s.copy = !0, this.move(t, e, i, s)
		},
		Kd: function(t, e, i) {
			if (e && t) {
				var s = this.getBranchIndex(t);
				return s + (i == this && i.getBranchIndex(e) < s ? 0 : 1)
			}
		},
		Lt: function(t, e) {
			var i = this.data.branch[t];
			if (i && i.length)
				for (var s = 0; s < i.length; s++) {
					if (i[s] == e) return !0;
					if (this.Lt(i[s], e)) return !0
				}
			return !1
		},
		move: function(t, e, i, s) {
			s = s || {}, e = e || 0;
			var n = s.newId || t,
				r = s.parent || 0;
			if (i = i || this, i.data) {
				if (!webix.isArray(t)) {
					if (this != i || s.copy) {
						if (n = i.data.add(i.Jd(this.getItem(t), n), e, r || 0), this.data.branch[t] && i.getBranchIndex) {
							var a = this.data.vf;
							this.data.vf = function(t) {
								var e = webix.copy(t);
								return delete e.$parent, delete e.$level, delete e.$child, i.data.pull[e.id] && (e.id = webix.uid()), e
							};
							var h = {
								data: this.serialize(t, !0),
								parent: n
							};
							this.data.vf = a, i.parse(h)
						}
						s.copy || this.data.remove(t)
					} else {
						if (t == r || this.Lt(t, r)) return;
						var o = this.getItem(t),
							l = this.data.branch[r];
						l || (l = this.data.branch[r] = []);
						var c = this.data.branch[o.$parent],
							u = webix.PowerArray.find.call(c, t);
						if (0 > e && (e = Math.max(l.length - 1, 0)), c === l && e === u) return;
						if (webix.PowerArray.removeAt.call(c, u), webix.PowerArray.insertAt.call(l, t, Math.min(l.length, e)), c.length || delete this.data.branch[o.$parent], o.$parent && "0" != o.$parent && this.getItem(o.$parent).$count--, r && "0" != r) {
							var d = i.getItem(r);
							d.$count++, this.Fg(o, d.$level + 1)
						} else this.Fg(o, 1);
						o.$parent = r, i.data.callEvent("onDataMove", [t, e, r, l[e + 1]])
					}
					return this.refresh(), n
				}
				for (var f = 0; f < t.length; f++) {
					var b = this.move(t[f], e, i, s);
					e = i.Kd(b, t[f + 1], this)
				}
			}
		},
		Fg: function(t, e) {
			t.$level = e;
			var i = this.data.branch[t.id];
			if (i)
				for (var s = 0; s < i.length; s++) this.Fg(this.getItem(i[s]), e + 1)
		},
		Gg: function(t) {
			t && !t.header && this.open(t)
		},
		$dropAllow: function(t) {
			if (t.from != t.to) return !0;
			for (var e = 0; e < t.source.length; e++)
				if (t.source == t.target || this.Lt(t.source, t.target)) return !1;
			return !0
		},
		Jd: function(t, e) {
			var i = webix.DataMove.Jd.call(this, t, e);
			return delete i.open, i
		}
	}, webix.TreeDataLoader = {
		$init: function() {
			this.data.attachEvent("onStoreUpdated", webix.bind(this.Hg, this), null, !0), this._e = this.Ig
		},
		Ig: function(t, e, i, s) {
			var n = 0 === e ? {
				parent: encodeURIComponent(t)
			} : null;
			webix.DataLoader.prototype._e.call(this, t, e, i, s, n)
		},
		loadBranch: function(t, e, i) {
			t = t || 0, this.data.url = this.data.url || i, this.callEvent("onDataRequest", [t, e, this.data.url]) && this.data.url && this.data.feed.call(this, t, 0, e, i)
		},
		Hg: function(t, e, i) {
			i && "add" != i && "delete" != i && "branch" != i || this.data.Kg(this)
		}
	}, webix.TreeStore = {
		name: "TreeStore",
		$init: function() {
			this.Cf = {
				showSubItems: !0
			}, this.branch = {
				0: []
			}, this.attachEvent("onParse", function(t, e) {
				this.Lg(t.child);
				t.getInfo(e).S
			}), this.attachEvent("onClearAll", webix.bind(function() {
				this.Mg = null
			}, this))
		},
		filterMode_setter: function(t) {
			return webix.extend(this.Cf, t, !0)
		},
		Af: function(t) {
			if (this.Mg && !t) {
				this.branch = this.Mg, this.order = webix.toArray(webix.copy(this.branch[0]));
				for (var e in this.branch) "0" != e && (this.getItem(e).$count = this.branch[e].length);
				delete this.Mg
			}
		},
		Bf: function(t, e, i, s) {
			i && this.Mg || (this.Mg = this.branch, this.branch = webix.clone(this.branch)), this.branch[0] = this.Ng(t, e, this.branch[0], 1, s || {})
		},
		Ng: function(t, e, i, s, n) {
			for (var r = [], a = n.level && n.level != s, h = 0; h < i.length; h++) {
				var o = i[h],
					l = this.getItem(o),
					c = !1,
					u = this.branch[o];
				if (a) c = !0;
				else if (t(this.getItem(o), e)) {
					if (r.push(o), n.openParents !== !1)
						for (var d = this.getParentId(o); d && "0" != d;) this.getItem(d).open = 1, d = this.getParentId(d);
					if (n.level || n.showSubItems) continue
				} else c = !0;
				if ((a || !n.level) && u) {
					var f = this.branch[o] = this.Ng(t, e, u, s + 1, n);
					l.$count = f.length, c && f.length && r.push(o)
				}
			}
			return r
		},
		count: function() {
			if (this.order.length) return this.order.length;
			var t = 0;
			return this.eachOpen(function() {
				t++
			}), t
		},
		changeId: function(t, e) {
			if (this.branch[t]) {
				for (var i = this.branch[e] = this.branch[t], s = 0; s < i.length; s++) this.getItem(i[s]).$parent = e;
				delete this.branch[t]
			}
			var n = this.getItem(t).$parent;
			if ("0" !== n) {
				var r = webix.PowerArray.find.call(this.branch[n], t);
				this.branch[n][r] = e
			}
			return webix.DataStore.prototype.changeId.call(this, t, e)
		},
		clearAll: function() {
			this.branch = {
				0: []
			}, webix.DataStore.prototype.clearAll.call(this)
		},
		getPrevSiblingId: function(t) {
			var e = this.branch[this.getItem(t).$parent],
				i = webix.PowerArray.find.call(e, t) - 1;
			return i >= 0 ? e[i] : null
		},
		getNextSiblingId: function(t) {
			var e = this.branch[this.getItem(t).$parent],
				i = webix.PowerArray.find.call(e, t) + 1;
			return i < e.length ? e[i] : null
		},
		getParentId: function(t) {
			return this.getItem(t).$parent
		},
		getFirstChildId: function(t) {
			var e = this.branch[t];
			return e && e.length ? e[0] : null
		},
		isBranch: function(t) {
			return !!this.branch[t]
		},
		getBranchIndex: function(t) {
			var e = this.branch[this.pull[t].$parent];
			return webix.PowerArray.find.call(e, t)
		},
		Lg: function(t) {
			this.Og = "string" == typeof t ? function(e) {
				var i = e[t];
				return i && delete e[t], i
			} : t
		},
		kf: function(t, e) {
			for (var i = t.S || 0, s = 0; s < e.length; s++) {
				var n = this.driver.getDetails(e[s]),
					r = this.id(n),
					a = !!this.pull[r];
				a ? (n = webix.extend(this.pull[r], n, !0), this.pf && this.pf(n)) : (this.qf && this.qf(n), this.pull[r] = n), this.Pg(n, i, 0, a, 1 * t.R + s)
			}
			var h = this.pull[i] || {},
				o = this.branch[i] || [];
			h.$count = o.length, delete h.webix_kids, t.Q && t.Q != o.length && (o[t.Q] = null)
		},
		Pg: function(t, e, i, s, n) {
			t.$count = 0, t.$parent = e || 0, t.$level = i || ("0" != e ? this.pull[e].$level + 1 : 1);
			var r = this.branch[t.$parent];
			if (r || (r = this.branch[t.$parent] = []), this.Mg && (this.Mg[t.$parent] = r), !s) {
				var a = n || r.length;
				r[a] = t.id
			}
			var h = this.Og(t);
			if (t.webix_kids) return t.$count = -1;
			if (!h) return t.$count = 0;
			webix.isArray(h) || (h = [h]);
			for (var o = 0; o < h.length; o++) {
				var l = webix.DataDriver.json.getDetails(h[o]),
					c = this.id(l);
				s = !!this.pull[c], s ? (l = webix.extend(this.pull[c], l, !0), this.pf && this.pf(l)) : (this.qf && this.qf(l), this.pull[c] = l), this.Pg(l, t.id, t.$level + 1, s)
			}
			var u = this.branch[t.id];
			u && (t.$count = u.length)
		},
		Kg: function(t) {
			this.order = webix.toArray(), this.Qg(0, t)
		},
		Qg: function(t, e) {
			for (var i = this.branch[t], s = 0; s < i.length; s++) {
				var n = i[s];
				this.order.push(n);
				var r = this.pull[n];
				r && r.open && (-1 == r.$count ? e.loadBranch(n) : r.$count && this.Qg(n, e))
			}
		},
		provideApi: function(t, e) {
			for (var i = ["getPrevSiblingId", "getNextSiblingId", "getParentId", "getFirstChildId", "isBranch", "getBranchIndex", "filterMode_setter"], s = 0; s < i.length; s++) t[i[s]] = this.Ef(this, i[s]);
			t.getIndexById || webix.DataStore.prototype.provideApi.call(this, t, e)
		},
		getTopRange: function() {
			return webix.toArray([].concat(this.branch[0])).map(function(t) {
				return this.getItem(t)
			}, this)
		},
		eachChild: function(t, e, i, s) {
			var n = this.branch;
			s && this.Mg && (n = this.Mg);
			var r = n[t];
			if (r)
				for (var a = 0; a < r.length; a++) e.call(i || this, this.getItem(r[a]))
		},
		each: function(t, e, i, s) {
			this.eachChild(s || 0, function(s) {
				var n = this.branch;
				t.call(e || this, s), i && this.Mg && (n = this.Mg), n[s.id] && this.each(t, e, i, s.id)
			}, this, i)
		},
		eachOpen: function(t, e, i) {
			this.eachChild(i || 0, function(i) {
				t.call(e || this, i), this.branch[i.id] && i.open && this.eachOpen(t, e, i.id)
			})
		},
		eachSubItem: function(t, e) {
			var i = this.branch[t || 0];
			if (i)
				for (var s = 0; s < i.length; s++) {
					var n = i[s];
					this.branch[n] ? (e.call(this, this.getItem(n), !0), this.eachSubItem(n, e)) : e.call(this, this.getItem(n), !1)
				}
		},
		eachLeaf: function(t, e) {
			var i = this.branch[t || 0];
			if (i)
				for (var s = 0; s < i.length; s++) {
					var n = i[s];
					this.branch[n] ? this.eachLeaf(n, e) : e.call(this, this.getItem(n), !1)
				}
		},
		xf: function(t, e) {
			var i = this.zf.yf(t);
			for (var s in this.branch) {
				for (var n = this.branch[s], r = [], a = 0; a < n.length; a++) r.push(this.pull[n[a]]);
				r.sort(i);
				for (var a = 0; a < n.length; a++) r[a] = r[a].id;
				this.branch[s] = r
			}
			return e
		},
		add: function(t, e, i) {
			var s = !1,
				n = this.getItem(i || 0);
			if (n && (this.branch[n.id] || (s = !0), n.$count++), this.branch[i || 0] = this.order = webix.toArray(this.branch[i || 0]), t.$count = 0, t.$level = n ? n.$level + 1 : 1, t.$parent = n ? n.id : 0, this.Mg) {
				var r = this.Mg[i || 0];
				if (r || (r = this.Mg[i] = this.order), this.order !== r) {
					var a = r.length;
					!e && this.branch[i || 0].length && (a = 0), r = webix.toArray(r), r.insertAt(t.id, a)
				}
			}
			var h = webix.DataStore.prototype.add.call(this, t, e);
			return s && this.refresh(i), h
		},
		Rg: function(t) {
			var e = this.pull[t];
			if (this.branch[e.id] && this.branch[e.id].length > 0)
				for (var i = this.branch[t], s = 0; s < i.length; s++) this.Rg(i[s], !0);
			delete this.branch[t], this.Mg && delete this.Mg[t], delete this.pull[t], this.Me[t] && delete this.Me[t]
		},
		Wy: function(t, e, i) {
			var s = t[e];
			1 == s.length && s[0] == i && e ? delete t[e] : webix.toArray(s).remove(i)
		},
		remove: function(t) {
			var e = this.pull[t],
				i = e.$parent || 0;
			if (this.callEvent("onBeforeDelete", [t]) === !1) return !1;
			this.Rg(t), this.callEvent("onAfterDelete", [t]);
			var s = this.pull[i];
			this.Wy(this.branch, i, t), this.Mg && this.Wy(this.Mg, i, t);
			var n = 0;
			s && (s.$count--, s.$count <= 0 && (s.$count = 0, s.open = 0, n = 1)), this.callEvent("onStoreUpdated", [t, e, "delete"]), n && this.refresh(s.id)
		},
		getBranch: function(t) {
			var e = [],
				i = (this.Mg || this.branch)[t];
			if (i)
				for (var s = 0; s < i.length; s++) e[s] = this.pull[i[s]];
			return e
		},
		serialize: function(t, e) {
			var i = this.branch;
			e && this.Mg && (i = this.Mg);
			for (var s = this.branch[t || 0], n = [], r = 0; r < s.length; r++) {
				var a, h = this.pull[s[r]];
				if (this.vf) {
					if (a = this.vf(h), a === !1) continue
				} else a = webix.copy(h);
				this.branch[h.id] && (a.data = this.serialize(h.id, e)), n.push(a)
			}
			return n
		}
	}, webix.TreeType = {
		space: function(t) {
			for (var e = "", i = 1; i < t.$level; i++) e += "<div class='webix_tree_none'></div>";
			return e
		},
		icon: function(t) {
			return t.$count ? t.open ? "<div class='webix_tree_open'></div>" : "<div class='webix_tree_close'></div>" : "<div class='webix_tree_none'></div>"
		},
		checkbox: function(t) {
			return t.nocheckbox ? "" : "<input type='checkbox' class='webix_tree_checkbox' " + (t.checked ? "checked" : "") + (t.disabled ? " disabled" : "") + ">"
		},
		folder: function(t) {
			return t.icon ? "<div class='webix_tree_file webix_tree_" + t.icon + "'></div>" : t.$count ? t.open ? "<div class='webix_tree_folder_open'></div>" : "<div class='webix_tree_folder'></div>" : "<div class='webix_tree_file'></div>"
		}
	}, webix.TreeAPI = {
		open: function(t, e) {
			if (t) {
				var i = this.getItem(t);
				i.$count && !i.open && (this.callEvent("onBeforeOpen", [t]) && (i.open = !0, this.data.callEvent("onStoreUpdated", [t, 0, "branch"]), this.callEvent("onAfterOpen", [t])), e && "0" != t && this.open(this.getParentId(t), e))
			}
		},
		close: function(t) {
			if (t) {
				var e = this.getItem(t);
				e.open && this.callEvent("onBeforeClose", [t]) && (e.open = !1, this.data.callEvent("onStoreUpdated", [t, 0, "branch"]), this.callEvent("onAfterClose", [t]))
			}
		},
		openAll: function(t) {
			this.data.eachSubItem(t || 0, function(t, e) {
				e && (t.open = !0)
			}), this.data.refresh()
		},
		closeAll: function(t) {
			this.data.eachSubItem(t || 0, function(t, e) {
				e && (t.open = !1)
			}), this.data.refresh()
		},
		Sg: function(t, e, i) {
			if (this.s.threeState) return this.Tg(t, null !== e ? e : "");
			var s, n = this.getItem(t),
				r = i ? i.target || i.srcElement : null;
			s = r && "checkbox" == r.type ? r.checked ? !0 : !1 : null !== e ? e : !n.checked, n.checked = s, this.callEvent("onItemCheck", [t, n.checked, i])
		},
		isBranchOpen: function(t) {
			if ("0" == t) return !0;
			var e = this.getItem(t);
			return e.open ? this.isBranchOpen(e.$parent) : !1
		},
		getOpenItems: function() {
			var t = [];
			for (var e in this.data.branch) this.exists(e) && this.getItem(e).open && t.push(e);
			return t
		},
		getState: function() {
			return {
				open: this.getOpenItems(),
				select: this.getSelectedId(!0)
			}
		},
		Ug: function(t, e) {
			var i = this.data.attachEvent("onStoreLoad", function() {
				t.setState.call(t, e), t.data.detachEvent(i), t = null
			})
		},
		setState: function(t) {
			if (t.open) {
				this.closeAll();
				for (var e = t.open, i = 0; i < e.length; i++) {
					var s = this.getItem(e[i]);
					if (s && s.$count && (s.open = !0, -1 == s.$count)) return this.Ug(this, t), this.refresh(), 0
				}
				this.refresh()
			}
			if (t.select && this.select) {
				var n = t.select;
				this.unselect();
				for (var i = 0; i < n.length; i++) this.exists(n[i]) && this.select(n[i], !0)
			}
			return 1
		}
	}, webix.TreeClick = {
		webix_tree_open: function(t, e) {
			return this.close(e), !1
		},
		webix_tree_close: function(t, e) {
			return this.open(e), !1
		},
		webix_tree_checkbox: function(t, e) {
			return this.Sg(e, null, t), !1
		}
	}, webix.TreeCollection = webix.proto({
		name: "TreeCollection",
		$init: function() {
			webix.extend(this.data, webix.TreeStore, !0), this.data.provideApi(this, !0), webix.extend(this, webix.TreeDataMove, !0)
		}
	}, webix.TreeDataLoader, webix.DataCollection), webix.DragOrder = {
		Vg: !0,
		$drag: function(t, e) {
			var i = webix.DragItem.$drag.call(this, t, e);
			if (i) {
				var s = webix.DragControl.getContext();
				this.getBranchIndex && (this.Wg = this.Xg ? 16 * this.getItem(s.start).$level : 0), s.fragile || this.addCss(s.start, "webix_transparent")
			}
			return i
		},
		WB: function(t, e) {
			return webix.DragItem.WB(t, e)
		},
		$dragPos: function(t, e, i) {
			var s = webix.html.offset(this.$view),
				n = s.x + (this.Xg ? +s.width - webix.ui.scrollSize - 1 : 1),
				r = t.y,
				a = "x" == this.s.layout;
			a && (r = s.y + (this.Xg ? +s.height - webix.ui.scrollSize - 1 : 1), n = t.x), i.style.display = "none";
			var h = document.elementFromPoint(n, r);
			if (h != this.Yg) {
				var o = webix.$$(h);
				if (o && o == this) {
					var l = this.locate(h, !0),
						c = webix.DragControl.getContext().start;
					if (l) {
						if (l != this.Yg) {
							if (l != c) {
								var u, d;
								this.getBranchIndex ? (u = {
									parent: this.getParentId(l)
								}, d = this.getBranchIndex(l)) : (u = {}, d = this.getIndexById(l)), this.callEvent("onBeforeDropOrder", [c, d, e, u]) && (this.move(c, d, this, u), this.Yg = l)
							}
							webix.DragControl.Cd = this.w
						}
					} else if (l = "$webix-last", this.Yg != l) {
						if (!this.callEvent("onBeforeDropOrder", [c, -1, e, {
								parent: 0
							}])) return;
						this.Yg = l
					}
				}
			}
			if (i.style.display = "block", a)
				if (t.y = s.y, t.x = t.x - 18, t.x < s.x) t.x = s.x;
				else {
					var f = s.x + this.$view.offsetWidth - 60;
					t.x > f && (t.x = f)
				}
			else if (s.y += this.$g, t.x = this.Wg || s.x, t.y = t.y - 18, t.y < s.y) t.y = s.y;
			else {
				var f = s.y + this.$view.offsetHeight - 60;
				t.y > f && (t.y = f)
			}
			webix.DragControl.Ed = !0
		},
		$dragIn: function() {
			return !1
		},
		$drop: function(t, e, i) {
			var s = webix.DragControl.getContext(),
				n = s.start;
			this.removeCss(n, "webix_transparent");
			var r = this.getIndexById(n);
			this.callEvent("onAfterDropOrder", [n, r, i]), s.fragile && this.refresh()
		}
	}, webix.DragItem = {
		_g: function(t, e, i) {
			e || webix.DragControl.addDrop(t.w, t, !0), i || webix.DragControl.addDrag(t.w, t), this.attachEvent("onDragOut", function(t, e) {
				this.$dragMark(t, e)
			})
		},
		drag_setter: function(t) {
			return t && ("order" == t && webix.extend(this, webix.DragOrder, !0), "inner" == t && (this.ah = !0), this._g(this, "source" == t, "target" == t), delete this.drag_setter), t
		},
		$dragIn: function(t, e, i) {
			var s = this.locate(i) || null,
				n = webix.DragControl.Gd;
			if ((this.ah || n.from.ah) && n.from !== this) return !1;
			var r = webix.DragControl.getMaster(e),
				a = this.getItemNode(s, i) || this.y;
			return a == webix.DragControl.Dd ? a : (n.target = s, n.to = r, this.bh && (this.bh = window.clearTimeout(this.bh)), this.bh = webix.delay(this.ch, this, [webix.html.pos(i), s], 250), this.$dropAllow(n, i) && this.callEvent("onBeforeDragIn", [n, i]) ? (this.$dragMark(n, i), a) : (n.to = n.target = null, null))
		},
		$dropAllow: function() {
			return !0
		},
		Gg: function() {},
		ch: function(t, e) {
			var i = 1,
				s = 0,
				n = this.s.dragscroll;
			"string" == typeof n && (s = -1 != n.indexOf("x"), i = -1 != n.indexOf("y"));
			var r = this.Vf || this.$view,
				a = webix.html.offset(r),
				h = a.y,
				o = h + r.offsetHeight,
				l = a.x,
				c = l + r.offsetWidth,
				n = this.getScrollState(),
				u = !1,
				d = 40,
				f = webix.DragControl.getContext();
			this.Gg(e), i && (t.y < h + d ? (this.scrollTo(n.x, n.y - 2 * d), u = !0) : t.y > o - d && (this.scrollTo(n.x, n.y + 2 * d), u = !0)), s && (t.x < l + d ? (this.scrollTo(n.x - 2 * d, n.y), u = !0) : t.x > c - d && (this.scrollTo(n.x + 2 * d, n.y), u = !0)), u && webix.DragControl.sd && f && f.to === this && (this.bh = webix.delay(this.ch, this, [t], 100))
		},
		_B: function(t) {
			return t && "object" == typeof t ? t.toString() : t
		},
		$dragOut: function(t, e, i, s) {
			var n = (this.x.contains(i) ? this.locate(s) : null) || null,
				r = webix.DragControl.Gd;
			return (r.target || "").toString() == (n || "").toString() ? null : (this.bh && (this.bh = window.clearTimeout(this.bh)), r.target = r.to = null, this.callEvent("onDragOut", [r, s]), null)
		},
		$drop: function(t, e, i) {
			this.bh && (this.bh = window.clearTimeout(this.bh));
			var s = webix.DragControl.Gd;
			s.to = this;
			var n = this._B(s.target);
			this.getBranchIndex ? n && (s.parent = this.getParentId(n), s.index = this.getBranchIndex(n)) : s.index = n ? this.getIndexById(n) : this.count(), this.$dragMark({}, i), s.from && s.from != s.to && s.from.callEvent && s.from.callEvent("onBeforeDropOut", [s, i]), this.callEvent("onBeforeDrop", [s, i]) && (this.dh(s, i), this.callEvent("onAfterDrop", [s, i]))
		},
		dh: function(t) {
			if (t.from) {
				var e = {
					parent: t.parent,
					mode: t.pos
				};
				t.from.move(t.source, t.index, t.to, e)
			}
		},
		WB: function(t, e) {
			if (this.getItemNode) {
				var i = this.locate(e, !0);
				return i ? webix.html.offset(this.getItemNode(i)) : null
			}
		},
		$drag: function(t, e) {
			var i = this.locate(e, !0);
			if (i) {
				var s = [i];
				if (this.getSelectedId && !this.Vg) {
					var n = this.getSelectedId(!0, !0);
					if (n && n.length > 1 && -1 != webix.PowerArray.find.call(n, i)) {
						for (var r = {}, s = [], a = 0; a < n.length; a++) r[n[a]] = !0;
						for (var a = 0; a < this.data.order.length; a++) {
							var h = this.data.order[a];
							r[h] && s.push(h)
						}
					}
				}
				var o = webix.DragControl.Gd = {
					source: s,
					start: i
				};
				if (o.fragile = this.addRowCss && webix.env.touch && (webix.env.isWebKit || webix.env.isFF), o.from = this, this.callEvent("onBeforeDrag", [o, e])) return webix.Touch && (webix.Touch.km = null), o.html || this.$dragHTML(this.getItem(i), e)
			}
			return null
		},
		$dragHTML: function(t) {
			return this.jb(t)
		},
		$dragMark: function(t) {
			var e = null;
			return t.target && (e = this._B(t.target)), this.eh && this.eh != e && (t.fragile || this.removeCss(this.eh, "webix_drag_over"), this.eh = null), !this.eh && e ? (this.eh = e, t.fragile || this.addCss(e, "webix_drag_over"), e) : t.to ? !0 : !1
		}
	}, webix.Group = {
		$init: function() {
			webix.extend(this.data, webix.GroupStore), this.data.attachEvent("onClearAll", webix.bind(function() {
				this.data.nf = this.data.fh = null, this.gh = 0
			}, this))
		},
		group: function(t) {
			this.data.ungroup(!0), this.data.group(t)
		},
		ungroup: function(t) {
			this.data.ungroup(t)
		}
	}, webix.GroupMethods = {
		sum: function(t, e) {
			e = e || this;
			for (var i = 0, s = 0; s < e.length; s++) i += 1 * t(e[s]);
			return i
		},
		min: function(t, e) {
			e = e || this;
			for (var i = 1 / 0, s = 0; s < e.length; s++) 1 * t(e[s]) < i && (i = 1 * t(e[s]));
			return 1 * i
		},
		max: function(t, e) {
			e = e || this;
			for (var i = -1 / 0, s = 0; s < e.length; s++) 1 * t(e[s]) > i && (i = 1 * t(e[s]));
			return 1 * i
		},
		count: function(t, e) {
			return e.length
		},
		any: function(t, e) {
			return t(e[0])
		},
		string: function(t) {
			return t.$name
		}
	}, webix.GroupStore = {
		$init: function() {
			this.attachEvent("onClearAll", this.oz)
		},
		oz: function() {
			this.nf = this.fh = null, this.gh = 0
		},
		ungroup: function(t) {
			return this.getBranchIndex ? this.hh.apply(this, arguments) : void(this.nf && (this.order = this.nf, this.pull = this.fh, this.fh = this.nf = null, t || this.callEvent("onStoreUpdated", [])))
		},
		mf: function(t) {
			this.blockEvent(), this.group(t), this.unblockEvent()
		},
		ih: function(t) {
			if ("function" == typeof t) return t;
			var e = function(e) {
				return e[t]
			};
			return e.$name = t, e
		},
		group: function(t) {
			if (this.getBranchIndex) return this.jh.apply(this, arguments);
			var e = this.ih(t.by);
			t.map[e] || (t.map[e] = [e, this.kh]);
			var i = {},
				s = [];
			this.each(function(n) {
				var r = e(n);
				i[r] || (s.push({
					id: r,
					$group: !0,
					$row: t.row
				}), i[r] = webix.toArray()), i[r].push(n)
			});
			for (var n in t.map) {
				var r = t.map[n][1] || "any",
					a = this.ih(t.map[n][0]);
				"function" != typeof r && (r = webix.GroupMethods[r]);
				for (var h = 0; h < s.length; h++) s[h][n] = r.call(this, a, i[s[h].id])
			}
			this.nf = this.order, this.fh = this.pull, this.order = webix.toArray(), this.pull = {};
			for (var h = 0; h < s.length; h++) {
				var o = this.id(s[h]);
				this.pull[o] = s[h], this.order.push(o)
			}
			this.callEvent("onStoreUpdated", [])
		},
		jh: function(t, e) {
			this.gh = (this.gh || 0) + 1;
			var i;
			"string" == typeof t ? (i = {
				by: this.ih(t),
				map: {}
			}, i.map[t] = [t]) : i = "function" == typeof t ? {
				by: t,
				map: {}
			} : t;
			var s;
			e ? s = this.getItem(e).$level : (e = 0, s = 0);
			for (var n = this.branch[e], r = this.ih(i.by), a = [], h = [], o = 0; o < n.length; o++) {
				var l = this.getItem(n[o]),
					c = r(l),
					u = s + "$" + c,
					d = this.branch[u];
				if (!d) {
					var f = this.pull[u] = {
						id: u,
						value: c,
						$group: !0,
						$row: i.row
					};
					h.push(f), d = this.branch[u] = [], d.lh = [], a.push(u)
				}
				d.push(l.id), d.lh.push(l)
			}
			this.branch[e] = a;
			for (var b in i.map) {
				var x = i.map[b][1] || "any",
					p = this.ih(i.map[b][0]);
				"function" != typeof x && (x = webix.GroupMethods[x]);
				for (var o = 0; o < h.length; o++) h[o][b] = x.call(this, p, this.branch[h[o].id].lh)
			}
			for (var o = 0; o < h.length; o++) {
				var w = h[o];
				if (this.hasEvent("onGroupCreated") && this.callEvent("onGroupCreated", [w.id, w.value, this.branch[w.id].lh]), i.footer) {
					var v = "footer$" + w.id,
						g = this.pull[v] = {
							id: v,
							$footer: !0,
							value: w.value,
							$level: s,
							$count: 0,
							$parent: w.id,
							$row: i.footer.row
						};
					for (var b in i.footer) {
						var x = i.footer[b][1] || "any",
							p = this.ih(i.footer[b][0]);
						"function" != typeof x && (x = webix.GroupMethods[x]), g[b] = x.call(this, p, this.branch[h[o].id].lh)
					}
					this.branch[w.id].push(g.id), this.callEvent("onGroupFooter", [g.id, g.value, this.branch[w.id].lh])
				}
				delete this.branch[w.id].lh
			}
			this.mh(a, e, s + 1), this.callEvent("onStoreUpdated", [])
		},
		hh: function(t, e, i) {
			if (i || this.gh) {
				this.gh = Math.max(0, this.gh - 1), e = e || 0;
				for (var s = [], n = this.branch[e], r = 0; r < n.length; r++) {
					var a = n[r],
						h = this.branch[a];
					h && (s = s.concat(h)), delete this.pull[a], delete this.branch[a]
				}
				this.branch[e] = s;
				for (var r = s.length - 1; r >= 0; r--) this.pull[s[r]].$footer && s.splice(r, 1);
				this.mh(s, 0, 1), t || this.callEvent("onStoreUpdated", [])
			}
		},
		mh: function(t, e, i) {
			e && (this.getItem(e).$count = t.length);
			for (var s = 0; s < t.length; s++) {
				var n = this.pull[t[s]];
				n.$level = i, n.$parent = e;
				var r = this.branch[n.id];
				r && this.mh(r, n.id, i + 1)
			}
		}
	}, webix.clipbuffer = {
		nh: null,
		oh: null,
		ph: 0,
		init: function() {
			return null !== this.nh ? this.nh : (webix.destructors.push(this), this.nh = document.createElement("textarea"), this.nh.className = "webix_clipbuffer", this.nh.setAttribute("webixignore", 1), document.body.appendChild(this.nh), webix.event(document.body, "keydown", webix.bind(function(t) {
				var e = t.keyCode,
					i = !(!t.ctrlKey && !t.metaKey);
				86 === e && i && webix.delay(this.rh, this, [t], 100)
			}, this)), this.nh)
		},
		destructor: function() {
			this.nh = null
		},
		set: function(t) {
			this.init(), this.nh.value = t, this.focus()
		},
		focus: function() {
			this.UA() || (this.init(), this.nh.focus(), this.nh.select())
		},
		UA: function() {
			var t = "";
			return "undefined" != typeof window.getSelection ? t = window.getSelection().toString() : "undefined" != typeof document.selection && "Text" == document.selection.type && (t = document.selection.createRange().text), !!t
		},
		rh: function(t) {
			var e = t.target || t.srcElement;
			if (e === this.nh) {
				var i = this.nh.value,
					s = webix.UIManager.getFocus();
				!s || s.getEditor && s.getEditor() || (s.callEvent("onPaste", [i]), this.nh.select())
			}
		}
	}, webix.CopyPaste = {
		clipboard_setter: function(t) {
			return (t === !0 || 1 === t) && (t = "modify"), this.attachEvent("onAfterSelect", function(t) {
				if (!this.getEditor || !this.getEditor()) {
					var e = this.getItem(t),
						i = this.type.templateCopy(e);
					webix.clipbuffer.set(i, this), webix.clipbuffer.focus()
				}
			}), this.attachEvent("onPaste", function(t) {
				webix.isUndefined(this.rh[this.s.clipboard]) || this.rh[this.s.clipboard].call(this, t)
			}), this.attachEvent("onFocus", function() {
				webix.clipbuffer.focus()
			}), this.attachEvent("onItemClick", function() {
				document.activeElement && this.$view.contains(document.activeElement) || (webix.clipbuffer.focus(), webix.UIManager.setFocus(this))
			}), t
		},
		rh: {
			insert: function(t) {
				this.add({
					value: t
				})
			},
			modify: function(t) {
				for (var e = this.getSelectedId(!0), i = 0; i < e.length; i++) this.getItem(e[i]).value = t, this.refresh(e[i])
			},
			custom: function() {}
		},
		templateCopy_setter: function(t) {
			this.type.templateCopy = webix.template(t)
		},
		type: {
			templateCopy: function(t) {
				return this.template(t)
			}
		}
	}, webix.KeysNavigation = {
		sh: function(t) {
			return function(e, i) {
				var s = i.srcElement || i.target;
				if (!s.getAttribute("webixignore")) {
					var n = s.tagName;
					if ("INPUT" == n || "TEXTAREA" == n || "SELECT" == n) return !0
				}
				return e && e.moveSelection && e.config.navigation && !e.Eb ? e.moveSelection(t, i.shiftKey) : !0
			}
		},
		moveSelection: function(t) {
			var e = this.getSelectedId(!0);
			if (!e.length) {
				if ("down" == t) t = "top";
				else {
					if ("up" != t) return;
					t = "bottom"
				}
				e = [1]
			}
			if (1 == e.length) {
				if (e = e[0], "left" == t && this.close) return this.close(e);
				if ("right" == t && this.open) return this.open(e);
				if ("top" == t) e = this.getFirstId();
				else if ("bottom" == t) e = this.getLastId();
				else if ("up" == t || "left" == t || "pgup" == t) {
					var i = this.getIndexById(e),
						s = "pgup" == t ? 10 : 1;
					e = this.getIdByIndex(Math.max(0, i - s))
				} else {
					if ("down" != t && "right" != t && "pgdown" != t) return;
					var i = this.getIndexById(e),
						s = "pgdown" == t ? 10 : 1;
					e = this.getIdByIndex(Math.min(this.count() - 1, i + s))
				}
				this.showItem(e), this.select(e)
			}
			return !1
		},
		navigation_setter: function(t) {
			return t && !webix.UIManager.th && (webix.UIManager.th = !0, webix.UIManager.addHotKey("up", this.sh("up")), webix.UIManager.addHotKey("down", this.sh("down")), webix.UIManager.addHotKey("shift+up", this.sh("up")), webix.UIManager.addHotKey("shift+down", this.sh("down")), webix.UIManager.addHotKey("shift+right", this.sh("right")), webix.UIManager.addHotKey("shift+left", this.sh("left")), webix.UIManager.addHotKey("pageup", this.sh("pgup")), webix.UIManager.addHotKey("pagedown", this.sh("pgdown")), webix.UIManager.addHotKey("home", this.sh("top")), webix.UIManager.addHotKey("end", this.sh("bottom")), webix.UIManager.addHotKey("right", this.sh("right")), webix.UIManager.addHotKey("left", this.sh("left"))), t
		}
	}, webix.protoUI({
		name: "tree",
		defaults: {
			scroll: "a"
		},
		$init: function() {
			this.x.className += " webix_tree", webix.extend(this.data, webix.TreeStore, !0), webix.extend(this.on_click, webix.TreeClick), this.attachEvent("onAfterRender", this.Jf), this.attachEvent("onPartialRender", this.Jf), this.data.provideApi(this, !0)
		},
		ad: "webix_tm_id",
		on_context: {},
		on_dblclick: {
			webix_tree_checkbox: function() {
				return this.on_click.webix_tree_checkbox ? this.on_click.webix_tree_checkbox.apply(this, arguments) : void 0
			}
		},
		on_click: {
			webix_tree_item: function(t, e) {
				if (this.s.activeTitle) {
					var i = this.getItem(e);
					i.open ? this.close(e) : this.open(e)
				}
				if (this.s.select)
					if ("multiselect" == this.s.select || this.s.multiselect) {
						if ("level" == this.s.multiselect) {
							var s = this.getSelectedId(!0)[0];
							if (s && this.getParentId(e) != this.getParentId(s)) return
						}
						this.select(e, !1, t.ctrlKey || t.metaKey || "touch" == this.s.multiselect, t.shiftKey)
					} else this.select(e)
			}
		},
		rh: {
			insert: function(t) {
				var e = this.getSelectedId() || "0";
				this.add({
					value: t
				}, null, e)
			},
			modify: function(t) {
				for (var e = this.getSelectedId(!0), i = 0; i < e.length; i++) this.getItem(e[i]).value = t, this.refresh(e[i])
			},
			custom: function() {}
		},
		Xg: !0,
		$dragHTML: function(t) {
			return "<div class='borderless'>" + this.type.template(t, this.type) + "</div>"
		},
		type: webix.extend({
			template: function(t, e) {
				var i = e["template" + t.level] || e.templateCommon;
				return i.apply(this, arguments)
			},
			classname: function(t, e, i) {
				var s = "webix_tree_item";
				return t.$css && ("object" == typeof t.$css && (t.$css = webix.html.createCss(t.$css)), s += " " + t.$css), i && i.$css && (s += " " + i.$css), s
			},
			templateCommon: webix.template("{common.icon()} {common.folder()} <span>#value#</span>"),
			templateStart: webix.template('<div webix_tm_id="#id#" class="{common.classname()}">'),
			templateEnd: webix.template("</div>"),
			templateCopy: webix.template("#value#")
		}, webix.TreeType)
	}, webix.AutoTooltip, webix.Group, webix.TreeAPI, webix.DragItem, webix.TreeDataMove, webix.SelectionModel, webix.KeysNavigation, webix.MouseEvents, webix.Scrollable, webix.TreeDataLoader, webix.ui.proto, webix.TreeRenderStack, webix.CopyPaste, webix.EventSystem), webix.TreeStateCheckbox = {
		uh: function() {
			if (this.vg) {
				var t = this.render;
				this.render = function(e, i) {
					var s = t.apply(this, arguments);
					this.s.threeState && s && "checkbox" != i && this.vh.apply(this, arguments)
				}, this.uh = function() {}
			}
		},
		threeState_setter: function(t) {
			return t && this.uh(), t
		},
		vh: function(t) {
			var e, i, s, n, r;
			if (s = [], r = this, t && !r.data.pull[t] && (t = 0), !t || r.data.pull[t].$count)
				for (i = this.wh(t), i.sort(function(t, e) {
						return r.data.pull[e].$level - r.data.pull[t].$level
					}), e = 0; e < i.length; e++) e && r.data.pull[i[e]].$parent == r.data.pull[i[e - 1]].$parent || (s = s.concat(r.xh(i[e])));
			else s = s.concat(r.xh(t));
			for (n = {}, e = 0; e < s.length; e++) n[s[e]] || (n[s[e]] = 1, this.yh(s[e]));
			r = null
		},
		yh: function(t) {
			var e, i;
			i = this.getItemNode(t), i && (this.render(t, "checkbox", "update"), this.getItem(t).indeterminate && (i = this.getItemNode(t), e = i.getElementsByTagName("input")[0], e && (e.indeterminate = this.getItem(t).indeterminate)))
		},
		xh: function(t) {
			var e, i, s, n, r, a, h, o;
			for (n = this.getParentId(t), a = this, r = []; n && "0" != n;) {
				h = 0, i = 0, this.data.eachChild(n, function(t) {
					t.indeterminate ? h++ : t.checked && i++
				}), e = s = o = !1;
				var l = this.getItem(n);
				i == l.$count ? e = !0 : (i > 0 || h > 0) && (s = !0), (s || s != l.indeterminate) && (o = !0), l.indeterminate = s, l.checked != e && (o = !0), l.checked = e, o ? (r.push(n), n = this.getParentId(n)) : n = 0
			}
			return r
		},
		getChecked: function() {
			var t = [],
				e = this;
			return this.data.eachSubItem(0, function(i) {
				e.isChecked(i.id) && t.push(i.id)
			}), t
		},
		Tg: function(t, e) {
			var i = this.getItem(t);
			if (i && ("" === e && (e = !i.checked), i.checked != e || i.indeterminate)) {
				i.checked = e, this.zh(t);
				var s = this.xh(t);
				if (this.vg && s.length < 5)
					for (var n = 0; n < s.length; n++) this.yh(s[n]);
				else this.refresh();
				this.callEvent("onItemCheck", [t, e])
			}
		},
		checkItem: function(t) {
			this.Sg(t, !0), this.updateItem(t)
		},
		uncheckItem: function(t) {
			this.Sg(t, !1), this.updateItem(t)
		},
		Ah: function(t, e, i) {
			var s = e ? "checkItem" : "uncheckItem";
			t ? this[s](t) : t = 0, this.s.threeState ? t || this.data.eachChild(0, function(t) {
				this[s](t.id)
			}, this, i) : this.data.each(function(t) {
				this[s](t.id)
			}, this, i, t)
		},
		checkAll: function(t, e) {
			this.Ah(t, !0, e)
		},
		uncheckAll: function(t, e) {
			this.Ah(t, !1, e)
		},
		zh: function(t) {
			var e, i = this.getItem(t);
			i.indeterminate = !1, e = i.checked, this.data.eachSubItem(t, function(t) {
				t.indeterminate = !1, t.checked = e
			}), this.vg && this.isBranchOpen(i.$parent) && this.render(t, 0, "branch")
		},
		isChecked: function(t) {
			return this.getItem(t).checked
		},
		wh: function(t) {
			var e = [];
			return this.data.eachSubItem(t, function(t, i) {
				i || e.push(t.id)
			}), e
		}
	}, webix.ui.tree && webix.extend(webix.ui.tree, webix.TreeStateCheckbox, !0), webix.type(webix.ui.tree, {
		name: "lineTree",
		css: "webixLineTree",
		icon: function(t, e) {
			for (var i = "", s = "", n = 1; n <= t.$level; n++) {
				if (n == t.$level) var s = t.$count ? t.open ? "webix_tree_open " : "webix_tree_close " : "webix_tree_none ";
				var r = this.Bh(t, e, n);
				r && (i += "<div class='" + s + " webix_tree_img webix_tree_" + r + "'></div>")
			}
			return i
		},
		Bh: function(t, e, i) {
			var s = e.sg,
				n = webix.TreeRenderStack.tg;
			if (0 === s && n) {
				var r = t.$level,
					a = t.id;
				for (s = []; r;) {
					var h = n.getParentId(a),
						o = n.data.branch[h];
					o[o.length - 1] == a && (s[r] = !0), a = h, r--
				}
				e.sg = s
			}
			if (!s) return 0;
			if (i == t.$level) {
				var l = 3;
				return t.$parent || 0 === t.$index && (l = 4), s[t.$level] && (l = 2), t.$count ? t.open ? "minus" + l : "plus" + l : "line" + l
			}
			return s[i] ? "blank" : "line1"
		}
	}), webix.NavigationButtons = {
		Ch: function() {
			webix.html.remove(this.Dh), this.Dh = webix.html.create("DIV", {
				"class": "webix_nav_panel webix_nav_panel_" + this.s.navigation.type
			}, ""), this.x.appendChild(this.Dh), this.Eh(), this.Fh(), this.Gh()
		},
		Gh: function() {
			var t = [];
			this.Dh && (t[0] = webix.event(this.Dh, "click", webix.bind(function(t) {
				for (var e = t.srcElement || t.target, i = !1; e != this.Dh && !i;) {
					var s = e.getAttribute(this.Hh);
					s && (i = !0, this.Ih(s)), e = e.parentNode
				}
			}, this))), this.Jh && (t[1] = webix.event(this.Jh, "click", webix.bind(function() {
				this.Kh(-1)
			}, this))), this.Lh && (t[1] = webix.event(this.Lh, "click", webix.bind(function() {
				this.Kh(1)
			}, this))), this.attachEvent("onDestruct", function() {
				for (var e = 0; e < t.length; e++) this.detachEvent(t[e]);
				t = null
			})
		},
		Kh: function(t) {
			if (this.q) {
				var e = this.Mh + t;
				(e >= this.q.length || 0 > e) && (e = 0 > e ? this.q.length - 1 : 0), this.setActiveIndex(e)
			}
		},
		Ih: function(t) {
			this.q && webix.$$(t).show()
		},
		Eh: function() {
			var t, e;
			if (e = this.s.navigation, e.items) {
				this.Hh = e.linkAttr || "bind_id", this.Dh ? this.Nh() : this.Ch();
				var i = this.q ? this.q : this.data.order;
				if (i.length > 1)
					for (var s = 0; s < i.length; s++) {
						t = webix.html.create("DIV", {
							"class": "webix_nav_item webix_nav_" + (s == this.Mh ? "active" : "inactive")
						}, "<div></div>");
						var n = this.q ? this.q[s].s.id : i[s];
						n && t.setAttribute(this.Hh, n), this.Dh.appendChild(t)
					}
			}
		},
		Nh: function() {
			if (this.Dh)
				for (var t = this.Dh.childNodes, e = t.length - 1; e >= 0; e--) webix.html.remove(t[e])
		},
		Fh: function() {
			var t;
			t = this.s.navigation, t.buttons && (this.Jh && webix.html.remove(this.Jh), this.Jh && webix.html.remove(this.Lh), this.Jh = webix.html.create("DIV", {
				"class": "webix_nav_button_" + t.type + " webix_nav_button_prev "
			}, '<div class="webix_nav_button_inner"></div>'), this.x.appendChild(this.Jh), this.Lh = webix.html.create("DIV", {
				"class": "webix_nav_button_" + t.type + " webix_nav_button_next "
			}, '<div class="webix_nav_button_inner"></div>'), this.x.appendChild(this.Lh))
		}
	}, webix.protoUI({
		name: "list",
		Oh: "webix_list",
		$init: function(t) {
			webix.html.addCss(this.x, this.Oh + ("x" == (t.layout || this.defaults.layout) ? "-x" : "")), this.data.provideApi(this, !0), this.Ph = webix.bind(this.Ph, this), this.data.attachEvent("onStoreUpdated", this.Ph), this.data.attachEvent("onSyncApply", this.Ph), this.attachEvent("onAfterRender", this.hg)
		},
		$dragHTML: function(t) {
			if ("y" == this.s.layout && "auto" == this.type.width) {
				this.type.width = this.bc;
				var e = this.jb(t);
				return this.type.width = "auto", e
			}
			return this.jb(t)
		},
		defaults: {
			select: !1,
			scroll: !0,
			layout: "y"
		},
		ad: "webix_l_id",
		on_click: {
			webix_list_item: function(t, e) {
				this.s.select && (this.Qh = !0, "multiselect" == this.s.select || this.s.multiselect ? this.select(e, !1, t.ctrlKey || t.metaKey || "touch" == this.s.multiselect, t.shiftKey) : this.select(e), this.Qh = !1)
			}
		},
		on_dblclick: {},
		getVisibleCount: function() {
			return Math.floor(this.dc / this.type.height)
		},
        getList : function(){
			var r = [];
			for(var index=0;index<this.count();index++){ r.push(this.getItem(this.getIdByIndex(index))); }
			return r;
		},
		Ph: function() {
			(this.s.autoheight || this.s.autowidth) && this.resize()
		},
		Rh: function(t) {
			var e = this.data.$pagesize || this.count();
			return this.Lf(t && e > t), this.s.autoheight && (t || 1 / 0) > e && (t = e), Math.max(this.type.height * t, this.s.minHeight || 0)
		},
		Sh: function(t) {
			var e = this.data.$pagesize || this.count();
			return this.Lf(t && e > t), this.s.autowidth && (t || 1 / 0) > e && (t = e), this.type.width * t
		},
		hg: function() {
			"x" == this.s.layout && (this.y.style.width = "auto" != this.type.width ? this.type.width * this.count() + "px" : "auto")
		},
		$getSize: function(t, e) {
			return "y" == this.s.layout ? ("auto" != this.type.width && (this.s.width = this.type.width + (this.cc ? webix.ui.scrollSize : 0)), (this.s.yCount || this.s.autoheight) && (this.s.height = this.Rh(this.s.yCount) || 1)) : ("auto" != this.type.height && (this.s.height = this.type.height + (this.ec ? webix.ui.scrollSize : 0)), (this.s.xCount || this.s.autowidth) && (this.s.width = this.Sh(this.s.xCount) || 1)), webix.ui.view.prototype.$getSize.call(this, t, e)
		},
		$setSize: function() {
			webix.ui.view.prototype.$setSize.apply(this, arguments)
		},
		type: {
			css: "",
			widthSize: function(t, e) {
				return e.width + (e.width > -1 ? "px" : "")
			},
			heightSize: function(t, e) {
				return e.height + (e.height > -1 ? "px" : "")
			},
			classname: function(t, e, i) {
				var s = "webix_list_item";
				return t.$css && ("object" == typeof t.$css && (t.$css = webix.html.createCss(t.$css)), s += " " + t.$css), i && i.$css && (s += " " + i.$css), s
			},
			template: function(t) {
				return (t.icon ? "<span class='webix_icon fa-" + t.icon + "'></span> " : "") + t.value + (t.badge ? "<div class='webix_badge'>" + t.badge + "</div>" : "")
			},
			width: "auto",
			templateStart: webix.template('<div webix_l_id="#id#" class="{common.classname()}" style="width:{common.widthSize()}; height:{common.heightSize()}; overflow:hidden;">'),
			templateEnd: webix.template("</div>")
		},
		$skin: function() {
			this.type.height = webix.skin.$active.listItemHeight
		}
	}, webix.KeysNavigation, webix.DataMove, webix.DragItem, webix.MouseEvents, webix.SelectionModel, webix.Scrollable, webix.ui.proto, webix.CopyPaste), webix.protoUI({
		name: "grouplist",
		defaults: {
			animate: {}
		},
		Oh: "webix_grouplist",
		$init: function() {
			webix.extend(this.data, webix.TreeStore, !0), this.data.count = function() {
				return this.order.length
			}, this.data.provideApi(this, !0), this.data.attachEvent("onClearAll", webix.bind(this.Th, this)), this.Th()
		},
		Th: function() {
			this.Uh = [], this.Vh = []
		},
		$setSize: function() {
			webix.ui.view.prototype.$setSize.apply(this, arguments) && (this.y.style.width = this.bc)
		},
		on_click: {
			webix_list_item: function(t, e) {
				if (this.Wh) return !1;
				for (var i = 0; i < this.Vh.length; i++)
					if (this.Vh[i] == e) {
						for (var s = i; s < this.Vh.length; s++) this.data.getItem(this.Vh[s]).$template = "";
						return i ? (this.Uh = this.data.branch[this.Vh[i - 1]], this.Vh.splice(i)) : (this.Uh = this.data.branch[0], this.Vh = []), this.Xh = !1, this.render()
					}
				var n = this.getItem(e);
				return n.$count ? (this.Xh = !0, this.Vh.push(e), n.$template = "Back", this.Uh = this.data.branch[n.id], this.render()) : void(this.s.select && (this.Qh = !0, "multiselect" == this.s.select || this.s.multiselect ? this.select(e, !1, "touch" == this.s.multiselect || t.ctrlKey || t.metaKey, t.shiftKey) : this.select(e), this.Qh = !1))
			}
		},
		getOpenState: function() {
			return {
				parents: this.Vh,
				branch: this.Uh
			}
		},
		render: function() {
			var t, e;
			if (this.Vh = webix.copy(this.Vh), this.Uh = webix.copy(this.Uh), this.Vh.length)
				for (t = 0; t < this.Vh.length; t++) this.data.branch[this.Vh[t]] || (this.Vh.splice(t, 1), t--);
			if (e = this.Vh.length ? this.Vh[this.Vh.length - 1] : 0, this.Uh = webix.copy(this.data.branch[e]), !this.Uh.length && this.Vh.length && (this.Uh = [e], this.Vh.pop()), this.Wh) return webix.delay(this.render, this, arguments, 100);
			for (t = 0; t < this.Uh.length; t++) this.data.getItem(this.Uh[t]).$template = "";
			if (this.Uh.length || (this.Uh = this.data.branch[0]), this.data.order = webix.toArray([].concat(this.Vh).concat(this.Uh)), this.callEvent("onBeforeRender", [this.data])) {
				if (!this.Qh && this.y.innerHTML && webix.animate.isSupported() && this.s.animate && this.Yh != this.Vh.length) {
					if (this.callEvent("onBeforeRender", [this.data])) {
						this.Zh || (this.Zh = []);
						var i = this.y.cloneNode(!1);
						i.innerHTML = this.data.getRange().map(this.jb, this).join("");
						var s = webix.extend({}, this.s.animate);
						s.direction = this.Xh ? "left" : "right";
						var n = [webix.clone(s), webix.clone(s)];
						if (this.Xh) this.Zh.push(this.getScrollState()), webix.Touch && webix.Touch.$active && (n[0].y = 0, n[1].y = -this.getScrollState().y);
						else {
							var r = this.Zh.pop();
							webix.Touch && webix.Touch.$active && (n[0].y = -r.y, n[1].y = -this.getScrollState().y)
						}
						var a = webix.animate.formLine(i, this.y, s);
						webix.Touch && webix.Touch.$active && webix.Touch.Nf(i, 0, this.Xh ? 0 : n[0].y, "0ms"), s.master = this, s.callback = function() {
							this.y = i, this.Xh ? webix.Touch && webix.Touch.$active || this.scrollTo(0, 0) : webix.Touch && webix.Touch.$active ? webix.delay(function() {
								webix.Touch.Nf(i, 0, n[0].y, "0ms")
							}, this) : r && this.scrollTo(0, r.y), webix.animate.breakLine(a), s.master = s.callback = null, this.t = null, this.Wh = !1, this.callEvent("onAfterRender", [])
						}, this.Wh = !0, webix.animate(a, n)
					}
				} else webix.RenderStack.render.apply(this, arguments);
				this.Yh = this.Vh.length
			}
		},
		templateBack_setter: function(t) {
			this.type.templateBack = webix.template(t)
		},
		templateItem_setter: function(t) {
			this.type.templateItem = webix.template(t)
		},
		templateGroup_setter: function(t) {
			this.type.templateGroup = webix.template(t)
		},
		type: {
			template: function(t, e) {
				return t.$count ? e.templateGroup(t, e) : e.templateItem(t, e)
			},
			css: "group",
			classname: function(t, e, i) {
				return "webix_list_item webix_" + (t.$count ? "group" : "item") + (t.$template ? "_back" : "") + (i && i.webix_selected ? " webix_selected " : "") + (t.$css ? t.$css : "")
			},
			templateStart: webix.template('<div webix_l_id="#id#" class="{common.classname()}" style="width:{common.widthSize()}; height:{common.heightSize()};  overflow:hidden;">'),
			templateBack: webix.template("#value#"),
			templateItem: webix.template("#value#"),
			templateGroup: webix.template("#value#"),
			templateEnd: function(t) {
				var e = "";
				return t.$count && (e += "<div class='webix_arrow_icon'></div>"), e += "</div>"
			}
		},
		showItem: function(t) {
			var e, i;
			for (t && (e = this.getItem(t), i = e.$parent, e.$count && (i = e.id)), this.Uh = this.data.branch[i || 0], this.Vh = []; i;) this.getItem(i).$template = "Back", this.Vh.unshift(i), i = this.getItem(i).$parent;
			this.Qh = !0, this.render(), this.Qh = !1, webix.RenderStack.showItem.call(this, t)
		}
	}, webix.Group, webix.ui.list), webix.type(webix.ui.grouplist, {}), webix.protoUI({
		name: "unitlist",
		ad: "webix_item_id",
		uniteBy_setter: webix.template,
		sort_setter: function(t) {
			return "object" != typeof t && (t = {}), this.E(t, {
				dir: "asc",
				as: "string"
			}), t
		},
		render: function(t, e, i) {
			var s = this.s;
			if (this.isVisible(s.id)) {
				if (!s.uniteBy) return !1;
				if (t) {
					var n = this.getItemNode(t);
					if (n && "update" == i && this.s.uniteBy.call(this, e) == this.getItem(t).$unitValue) {
						var r = this.t[t] = this.Ne(e);
						return webix.html.insertBefore(r, n), void webix.html.remove(n)
					}
				}
				this.callEvent("onBeforeRender", [this.data]) && (this.units = null, this.$h(), this.units && (this.y.innerHTML = this._h().map(this.jb, this).join(""), this.t = null), this.callEvent("onAfterRender", []))
			}
		},
		getUnits: function() {
			var t = [];
			if (this.units)
				for (var e in this.units) t.push(e);
			return t
		},
		getUnitList: function(t) {
			return this.units ? this.units[t] : null
		},
		jb: function(t) {
			var e = this.data.Me[t.id];
			return this.callEvent("onItemRender", [t]), t.$unit ? this.type.templateStartHeader(t, this.type) + this.type.templateHeader.call(this, t.$unit) + this.type.templateEnd(t, this.type) : this.type.templateStart(t, this.type, e) + (t.$template ? this.type["template" + t.$template] : this.type.template)(t, this.type) + this.type.templateEnd(t, this.type)
		},
		_h: function() {
			var t, e, i, s;
			t = [];
			var n = this.data.$min || 0,
				r = this.data.$max || 1 / 0,
				a = 0;
			for (i in this.units)
				for (t.push({
						$unit: i
					}), s = this.units[i], e = 0; e < s.length; e++) {
					if (a == n && (t = [{
							$unit: i
						}]), t.push(this.getItem(s[e])), a == r) return webix.toArray(t);
					a++
				}
			return webix.toArray(t)
		},
		$h: function() {
			var t = this;
			this.units = {}, this.data.each(function(e) {
				var i = t.s.uniteBy.call(this, e);
				e.$unitValue = i, t.units[i] || (t.units[i] = []), t.units[i].push(e.id)
			})
		},
		type: {
			headerHeight: 20,
			templateHeader: function(t) {
				return "<span class='webix_unit_header_inner'>" + t + "</span>"
			},
			templateStart: function(t, e, i) {
				if (t.$unit) return e.templateStartHeader.apply(this, arguments);
				var s = "webix_list_item webix_list_" + e.css + "_item" + (i && i.webix_selected ? " webix_selected" : "") + e.classname(t, e, i),
					n = "width:" + e.widthSize(t, e, i) + "; height:" + e.heightSize(t, e, i) + "; overflow:hidden;" + (e.layout && "x" == e.layout ? "float:left;" : "");
				return '<div webix_item_id="' + t.id + '" class="' + s + '" style="' + n + '">'
			},
			templateStartHeader: function(t, e, i) {
				var s = "webix_unit_header webix_unit_" + e.css + "_header" + (t.$selected ? "_selected" : ""),
					n = "width:" + e.widthSize(t, e, i) + "; height:" + e.headerHeight + "px; overflow:hidden;";
				return '<div webix_unit_id="' + t.$unit + '" class="' + s + '" style="' + n + '">'
			}
		},
		$skin: function() {
			this.type.headerHeight = webix.skin.$active.unitHeaderHeight || 20
		}
	}, webix.ui.list), webix.EditAbility = {
		defaults: {
			editaction: "click"
		},
		$init: function(t) {
			this.ai = {}, this.Eb = 0, this.bi = 0, this.w.style.position = "relative", t && (t.onDblClick = t.onDblClick || {}), this.attachEvent("onAfterRender", this.$s), this.s.editable && this.ci(), webix.extend(this, webix.Undo)
		},
		Ux: function(t) {
			try {
				if ("number" == typeof t.selectionStart) t.selectionStart = t.selectionEnd = t.value.length;
				else if ("undefined" != typeof t.createTextRange) {
					var e = t.createTextRange();
					e.collapse(!1), e.select()
				}
			} catch (i) {}
		},
		$s: function() {
			var t = this.getEditor();
			if (t && t.$inline && !t.getPopup) {
				var e = this.mi(t);
				if (e && e != t.node) {
					var i = t.node.value;
					t.node = e, e.value = i, e.focus(), this.Ux(e)
				} else this.editStop()
			}
		},
		editable_setter: function(t) {
			return t && this.ci(), t
		},
		ci: function() {
			webix.attachEvent("onEditEnd", webix.bind(function() {
				this.Eb && this.editStop()
			}, this)), webix.attachEvent("onClick", webix.bind(function(t) {
				this.Eb && new Date - this.bi > 200 && (this.di && !this.di.popupType && t && this.di.node && this.di.node.contains(t.target || t.srcElement) || this.editStop())
			}, this)), this.data.attachEvent && this.data.attachEvent("onIdChange", webix.bind(function(t, e) {
				this.ei(t, e)
			}, this)), this.attachEvent("onItemClick", function(t) {
				this.s.editable && "click" == this.s.editaction && this.edit(t)
			}), this.attachEvent("onItemDblClick", function(t) {
				this.s.editable && "dblclick" == this.s.editaction && this.edit(t)
			}), this.fi = webix.bind(function() {
				this.bi = new Date
			}, this), this.ci = function() {}, this.gi && this.gi()
		},
		Vs: function() {
			webix.delay(function() {
				var t = this.getEditor();
				if (t && t.config.liveEdit) {
					var e = {
						value: t.getValue(),
						old: t.value
					};
					if (e.value == e.old) return;
					t.value = e.value, this.ti(t, e.value), this.callEvent("onLiveEdit", [e, t])
				}
			}, this)
		},
		hi: function(t) {
			var e = this.s.form;
			"string" != typeof e && (this.s.form = e = webix.ui(e).config.id);
			var e = webix.$$(e),
				i = e.setValues ? e : e.getChildViews()[0];
			i.setValues(this.getItem(t.row || t)), e.config.master = this.config.id, e.show(this.getItemNode(t));
			var s = i.getChildViews()[0];
			s.focus && s.focus()
		},
		edit: function(t, e, i) {
			if (this.callEvent("onBeforeEditStart", [t])) {
				if (this.s.form) return this.hi(t);
				var s = this.ii(t);
				if (s) {
					if (this.getEditor(t)) return;
					e || this.editStop();
					var n = webix.extend({}, webix.editors[s]),
						r = this.ji(t, n, i);
					n.config.liveEdit && (this.Ws = this.attachEvent("onKeyPress", this.Vs));
					var a = n.getPopup ? n.getPopup(r).x : r;
					return a && webix.event(a, "click", this.fi), r && webix.event(r, "change", this.ki, {
						bind: {
							view: this,
							id: t
						}
					}), i !== !1 && n.focus(), this.bi = webix.edit_open_time = new Date, webix.UIManager.setFocus(this, !0), this.callEvent("onAfterEditStart", [t]), n
				}
				return null
			}
		},
		getEditor: function(t) {
			return t ? this.ai[t] : this.di
		},
		ei: function(t, e) {
			var i = this.ai[t];
			i && (this.ai[e] = i, i.id = e, delete this.ai[t])
		},
		ki: function() {
			this.view.hasEvent("onEditorChange") && this.view.callEvent("onEditorChange", [this.id, this.view.getEditorValue(this.id)])
		},
		li: function() {
			return this.s
		},
		ji: function(t, e, i) {
			var s = (e.config = this.li(t), e.render());
			e.$inline && (s = this.mi(t)), e.node = s;
			var n = this.getItem(t),
				r = n[this.s.editValue || "value"];
			return webix.isUndefined(r) && (r = ""), e.setValue(r, n), e.value = r, this.ni(t, e), i !== !1 && this.showItem(t), e.$inline || this.oi(t, s, !0), e.afterRender && e.afterRender(), s
		},
		pi: function(t) {
			return this.getItemNode(t)
		},
		mi: function(t) {
			var e = this.pi(t);
			return e && (e = e.getElementsByTagName("input")[0] || e), e
		},
		ii: function() {
			return this.s.editor
		},
		ni: function(t, e) {
			e.id = t, this.ai[t] = this.di = e, this.Eb++
		},
		qi: function(t) {
			this.di == t && (this.di = 0), t.destroy && t.destroy(), delete t.popup, delete t.node, delete this.ai[t.id], this.Eb--
		},
		focusEditor: function() {
			var t = this.getEditor.apply(this, arguments);
			t && t.focus && t.focus()
		},
		editCancel: function() {
			this.editStop(null, null, !0)
		},
		Xy: function(t) {
			if (t) {
				var e = this.getEditor();
				if (e && e.getPopup && e.getPopup() == t.getTopParentView()) return
			}
			this.editStop()
		},
		editStop: function(t) {
			if (!this.Zx) {
				this.Zx = 1;
				var e = arguments[2],
					i = 1;
				return t ? i = this.ri(this.ai[t], e) : this.si(function(t) {
					i *= this.ri(t, e)
				}), this.Zx = 0, i
			}
		},
		ug: function(t) {
			var e = this.getItemNode(t);
			return {
				left: e.offsetLeft,
				top: e.offsetTop,
				height: e.offsetHeight,
				width: e.offsetWidth,
				parent: this.w
			}
		},
		oi: function(t, e, i) {
			if (e.style) {
				var s = this.ug(t);
				e.style.top = s.top + "px", e.style.left = s.left + "px", e.style.width = s.width - 1 + "px", e.style.height = s.height - 1 + "px", e.top = s.top, i && s.parent.appendChild(e)
			}
		},
		si: function(t) {
			for (var e in this.ai) t.call(this, this.ai[e])
		},
		ri: function(t, e) {
			if (t) {
				var i = {
					value: t.getValue(),
					old: t.value
				};
				if (this.callEvent("onBeforeEditStop", [i, t, e])) {
					if (!e) {
						var s = i.old;
						"string" == typeof i.value && (s += ""), (s != i.value || t.config.liveEdit) && this.updateItem(this.ti(t, i.value))
					}
					t.$inline ? t.node = null : webix.html.remove(t.node);
					var n = t.config.suggest;
					return n && "string" == typeof n && webix.$$(n).hide(), this.qi(t), this.Ws && this.detachEvent(this.Ws), this.callEvent("onAfterEditStop", [i, t, e]), 1
				}
				return 0
			}
		},
		validateEditor: function(t) {
			var e = !0;
			if (this.s.rules) {
				var i = this.getEditor(t),
					s = i.column || this.s.editValue || "value",
					n = this.s.rules[s],
					r = this.s.rules.$all;
				if (n || r) {
					var a = this.data.getItem(i.row || i.id),
						h = i.getValue(),
						o = i.getInputNode();
					n && (e = n.call(this, h, a, s)), r && (e = r.call(this, h, a, s) && e), e ? webix.html.removeCss(o, "webix_invalid") : webix.html.addCss(o, "webix_invalid"), webix.callEvent("onLiveValidation", [i, e, a, h])
				}
			}
			return e
		},
		getEditorValue: function(t) {
			var e;
			return e = 0 === arguments.length ? this.di : this.getEditor(t), e ? e.getValue() : void 0
		},
		getEditState: function() {
			return this.di || !1
		},
		editNext: function(t, e) {
			if (t = t !== !1, 1 == this.Eb || e) {
				var i = this.ui(this.di || e, function(t) {
					return this.ii(t) ? !0 : !1
				}, t);
				if (this.editStop()) return i && (this.edit(i), this.vi(i)), !1
			}
		},
		vi: function() {},
		ui: function(t, e, i) {
			var s = this.getIndexById(t.id),
				n = this.data.order;
			if (i) {
				for (var r = s + 1; r < n.length; r++)
					if (e.call(this, n[r])) return n[r]
			} else
				for (var r = s - 1; r >= 0; r--)
					if (e.call(this, n[r])) return n[r]; return null
		},
		ti: function(t, e) {
			return this.getItem(t.id)[this.s.editValue || "value"] = e, t.id
		}
	},
	function() {
		function t(t, i) {
			var s = t.config.suggest;
			if (s) {
				var n = t.config.suggest = e(s),
					r = webix.$$(n);
				r && i && r.linkInput(i)
			}
		}

		function e(t) {
			if ("string" == typeof t) return t;
			if (t.linkInput) return t.s.id;
			"object" == typeof t ? (webix.isArray(t) && (t = {
				data: t
			}), t.view = t.view || "suggest") : t === !0 && (t = {
				view: "suggest"
			});
			var e = webix.ui(t);
			return e.config.id
		}
		webix.editors = {
			text: {
				focus: function() {
					this.getInputNode(this.node).focus(), this.getInputNode(this.node).select()
				},
				getValue: function() {
					return this.getInputNode(this.node).value
				},
				setValue: function(e) {
					var i = this.getInputNode(this.node);
					i.value = e, t(this, i)
				},
				getInputNode: function() {
					return this.node.firstChild
				},
				render: function() {
					return webix.html.create("div", {
						"class": "webix_dt_editor"
					}, "<input type='text'>")
				}
			},
			"inline-checkbox": {
				render: function() {
					return {}
				},
				getValue: function() {
					return this.node.checked
				},
				setValue: function() {},
				focus: function() {
					this.node.focus()
				},
				getInputNode: function() {},
				$inline: !0
			},
			"inline-text": {
				render: function() {
					return {}
				},
				getValue: function() {
					return this.node.value
				},
				setValue: function() {},
				focus: function() {
					try {
						this.node.select(), this.node.focus()
					} catch (t) {}
				},
				getInputNode: function() {},
				$inline: !0
			},
			checkbox: {
				focus: function() {
					this.getInputNode().focus()
				},
				getValue: function() {
					return this.getInputNode().checked
				},
				setValue: function(t) {
					this.getInputNode().checked = !!t
				},
				getInputNode: function() {
					return this.node.firstChild.firstChild
				},
				render: function() {
					return webix.html.create("div", {
						"class": "webix_dt_editor"
					}, "<div><input type='checkbox'></div>")
				}
			},
			select: {
				focus: function() {
					this.getInputNode().focus()
				},
				getValue: function() {
					return this.getInputNode().value
				},
				setValue: function(t) {
					this.getInputNode().value = t
				},
				getInputNode: function() {
					return this.node.firstChild
				},
				render: function() {
					var t = "",
						e = this.config.options || this.config.collection;
					if (e.data && e.data.each) e.data.each(function(e) {
						t += "<option value='" + e.id + "'>" + e.value + "</option>"
					});
					else if (webix.isArray(e))
						for (var i = 0; i < e.length; i++) {
							var s = e[i],
								n = webix.isUndefined(s.id),
								r = n ? s : s.id,
								a = n ? s : s.value;
							t += "<option value='" + r + "'>" + a + "</option>"
						} else
							for (var h in e) t += "<option value='" + h + "'>" + e[h] + "</option>";
					return webix.html.create("div", {
						"class": "webix_dt_editor"
					}, "<select>" + t + "</select>")
				}
			},
			popup: {
				focus: function() {
					this.getInputNode().focus()
				},
				destroy: function() {
					this.getPopup().hide()
				},
				getValue: function() {
					return this.getInputNode().getValue() || ""
				},
				setValue: function(t) {
					this.getPopup().show(this.node), this.getInputNode().setValue(t)
				},
				getInputNode: function() {
					return this.getPopup().getChildViews()[0]
				},
				getPopup: function() {
					return this.config.popup || (this.config.popup = this.createPopup()), webix.$$(this.config.popup)
				},
				createPopup: function() {
					var t = this.config.popup || this.config.suggest;
					if (t) {
						var e;
						return "object" != typeof t || t.name ? e = webix.$$(t) : (t.view = t.view || "suggest", e = webix.ui(t)), e.linkInput && e.linkInput(document.body), e
					}
					var i = webix.editors.$popup[this.popupType];
					return "string" != typeof i && (i = webix.editors.$popup[this.popupType] = webix.ui(i), this.popupInit(i)), i.s.id
				},
				popupInit: function() {},
				popupType: "text",
				render: function() {
					return {}
				},
				$inline: !0
			}
		}, webix.editors.color = webix.extend({
			focus: function() {},
			popupType: "color",
			popupInit: function(t) {
				t.getChildViews()[0].attachEvent("onSelect", function(t) {
					webix.callEvent("onEditEnd", [t])
				})
			}
		}, webix.editors.popup), webix.editors.date = webix.extend({
			focus: function() {},
			popupType: "date",
			setValue: function(t) {
				this.wi = this.config.stringResult || t && "string" == typeof t, webix.editors.popup.setValue.call(this, t)
			},
			getValue: function() {
				return this.getInputNode().getValue(this.wi ? webix.i18n.parseFormatStr : "") || ""
			},
			popupInit: function(t) {
				t.getChildViews()[0].attachEvent("onDateSelect", function(t) {
					webix.callEvent("onEditEnd", [t])
				})
			}
		}, webix.editors.popup), webix.editors.combo = webix.extend({
			xi: function(t) {
				return this.config.popup ? this.config.popup.config.id : t ? e(t) : this.rt(t)
			},
			rt: function() {
				var t = webix.editors.combo;
				return t.st = t.st || this.xi(!0)
			},
			render: function() {
				var t = webix.html.create("div", {
						"class": "webix_dt_editor"
					}, "<input type='text'>"),
					e = this.config.suggest = this.xi(this.config.suggest);
				return e && (webix.$$(e).linkInput(t.firstChild, !0), webix.event(t.firstChild, "click", webix.bind(this.showPopup, this))), t
			},
			getPopup: function() {
				return webix.$$(this.config.suggest)
			},
			showPopup: function() {
				var t = this.getPopup(),
					e = t.getList(),
					i = this.getInputNode(),
					s = this.getValue();
				t.show(i), s ? e.exists(s) && (e.select(s), e.showItem(s)) : (e.unselect(), e.showItem(e.getFirstId())), t.ae = i
			},
			afterRender: function() {
				this.showPopup()
			},
			setValue: function(t) {
				if (this.yi = t, this.config.suggest) {
					var e = webix.$$(this.config.suggest),
						i = this.config.collection || this.config.options;
					i && e.getList().data.importData(i), this.zi = this.getInputNode(this.node).value = e.getItemText(t)
				}
			},
			getValue: function() {
				var t = this.getInputNode().value;
				return this.config.suggest ? t == this.zi ? this.yi : webix.$$(this.config.suggest).getSuggestion() : t
			}
		}, webix.editors.text), webix.editors.richselect = webix.extend({
			focus: function() {},
			getValue: function() {
				return this.getPopup().getValue()
			},
			setValue: function(t) {
				{
					var e = this.config.collection || this.config.options;
					this.getInputNode()
				}
				e && this.getPopup().getList().data.importData(e), this.getPopup().show(this.node), this.getPopup().setValue(t)
			},
			getInputNode: function() {
				return this.getPopup().getList()
			},
			popupInit: function(t) {
				t.linkInput(document.body)
			},
			popupType: "richselect"
		}, webix.editors.popup), webix.editors.password = webix.extend({
			render: function() {
				return webix.html.create("div", {
					"class": "webix_dt_editor"
				}, "<input type='password'>")
			}
		}, webix.editors.text), webix.editors.$popup = {
			text: {
				view: "popup",
				width: 250,
				height: 150,
				body: {
					view: "textarea"
				}
			},
			color: {
				view: "popup",
				body: {
					view: "colorboard"
				}
			},
			date: {
				view: "popup",
				width: 250,
				height: 250,
				padding: 0,
				body: {
					view: "calendar",
					icons: !0,
					borderless: !0
				}
			},
			richselect: {
				view: "suggest",
				body: {
					view: "list",
					select: !0
				}
			}
		}
	}(), webix.VirtualRenderStack = {
		$init: function() {
			this.t = {}, webix.event(this.x, "scroll", webix.bind(this.Ai, this)), webix.env.touch && this.attachEvent("onAfterScroll", webix.bind(this.Ai, this)), this.Bi = []
		},
		getItemNode: function(t) {
			return this.t[t]
		},
		showItem: function(t) {
			var e = this.Ci(),
				i = this.data.getIndexById(t),
				s = Math.floor(i / e.Di) * e.Ei,
				n = this.getScrollState();
			(s < n.y || s + this.s.height >= n.y + this.dc) && this.scrollTo(0, s)
		},
		render: function(t, e, i) {
			if (this.isVisible(this.s.id) && !this.$blockRender)
				if (t) {
					var s = this.getItemNode(t);
					switch (i) {
						case "update":
							if (!s) return;
							var n = this.t[t] = this.Ne(e);
							webix.html.insertBefore(n, s), webix.html.remove(s);
							break;
						default:
							this.Fi()
					}
				} else this.callEvent("onBeforeRender", [this.data]) && (this.t = {}, this.Ai(null, !0), this.Gi = !1, this.callEvent("onAfterRender", []))
		},
		Fi: function() {
			this.Gi || (this.Gi = !0, window.setTimeout(webix.bind(function() {
				this.render()
			}, this), 1))
		},
		Hi: function(t) {
			var e = document.createElement("DIV");
			return e.style.cssText = "height:" + t + "px; width:100%; overflow:hidden;", e
		},
		Ai: function(t, e) {
			this.Bi = [];
			var i = this.Ci();
			(!this.y.firstChild || e) && (this.y.innerHTML = "", this.y.appendChild(this.Hi(i.Ii)), this.u = [this.y.firstChild]);
			for (var s = i.R; s <= i.Ji;) {
				for (; this.u[s] && this.u[s].Ki && s <= i.Ji;) s++;
				if (s > i.Ji) break;
				for (var n = s; !this.u[n];) n--;
				var r = this.u[n],
					a = s * i.Di + (this.data.$min || 0);
				if (a > (this.data.$max || 1 / 0)) break;
				var h = Math.min(a + i.Di - 1, this.data.$max ? this.data.$max - 1 : 1 / 0),
					o = this.Hi(i.Ei),
					l = this.data.getIndexRange(a, h);
				if (!l.length) break;
				for (var c = {
						$template: "Loading"
					}, u = 0; u < l.length; u++) l[u] || this.Bi.push(a + u), l[u] = this.jb(l[u] || c);
				o.innerHTML = l.join("");
				for (var u = 0; u < l.length; u++) this.t[this.data.getIdByIndex(a + u)] = o.childNodes[u];
				var d = parseInt(r.style.height, 10),
					f = (s - n) * i.Ei,
					b = d - f - i.Ei;
				if (webix.html.insertBefore(o, f ? r.nextSibling : r, this.y), this.u[s] = o, o.Ki = !0, 0 >= f && b > 0) r.style.height = b + "px", this.u[s + 1] = r;
				else if (0 > f ? webix.html.remove(r) : r.style.height = f + "px", b > 0) {
					var x = this.u[s + 1] = this.Hi(b);
					webix.html.insertBefore(x, o.nextSibling, this.y)
				}
				s++
			}
			if (this.Bi.length) {
				var p = this.Bi[0],
					w = this.Bi.pop() + 1;
				if (w > p) {
					var v = w - p;
					if (this.cf(v, p)) return;
					v = Math.max(v, this.s.datafetch || this.s.loadahead || 0), this.loadNext(v, p)
				}
			}
		},
		Ci: function() {
			var t = this.getScrollState(),
				e = t.y,
				i = this.bc,
				s = this.dc,
				n = this.type,
				r = Math.floor(i / n.width) || 1,
				a = Math.floor(e / n.height),
				h = Math.ceil((s + e) / n.height) - 1,
				o = this.data.$max ? this.data.$max - this.data.$min - 1 : this.data.count(),
				l = Math.ceil(o / r) * n.height;
			return {
				R: a,
				Ji: h,
				Li: e,
				Ii: l,
				Ei: n.height,
				Di: r
			}
		},
		ug: function(t) {
			var e = this.getItemNode(t);
			return e || (this.showItem(t), this.Ai(), e = this.getItemNode(t)), {
				left: e.offsetLeft,
				top: e.offsetTop,
				height: e.offsetHeight,
				width: e.offsetWidth,
				parent: this.w
			}
		}
	}, webix.protoUI({
		name: "dataview",
		$init: function(t) {
			t.sizeToContent && this.$ready.unshift(this.Mi);
			var e = t.prerender || this.defaults.prerender;
			(e === !1 || e !== !0 && "auto" !== t.height && !t.autoheight) && webix.extend(this, webix.VirtualRenderStack, !0), t.autoheight && (t.scroll = !1), this.attachEvent("onBeforeRender", function() {
				this.iz()
			}), this.w.className += " webix_dataview"
		},
		Mi: function() {
			var t = webix.html.create("DIV", 0, this.type.template({}));
			t.style.position = "absolute", document.body.appendChild(t), this.type.width = t.offsetWidth, this.type.height = t.offsetHeight, webix.html.remove(t)
		},
		defaults: {
			scroll: !0,
			datafetch: 50
		},
		ad: "webix_f_id",
		on_click: {
			webix_dataview_item: function(t, e) {
				this.s.select && ("multiselect" == this.s.select || this.s.multiselect ? this.select(e, !1, "touch" == this.s.multiselect || t.ctrlKey || t.metaKey, t.shiftKey) : this.select(e))
			}
		},
		on_dblclick: {},
		on_mouse_move: {},
		type: {
			template: webix.template("#value#"),
			templateLoading: webix.template("Loading..."),
			width: 160,
			height: 50,
			classname: function(t, e, i) {
				var s = "webix_dataview_item ";
				return e.css && (s += e.css + " "), t.$css && ("object" == typeof t.$css && (t.$css = webix.html.createCss(t.$css)), s += t.$css + " "), i && i.$css && (s += i.$css + " "), s
			},
			templateStart: webix.template('<div webix_f_id="#id#" class="{common.classname()}" style="width:{common.width}px; height:{common.height}px; float:left; overflow:hidden;">'),
			templateEnd: webix.template("</div>")
		},
		Ni: function(t) {
			return this.s.height = this.type.height * Math.ceil(this.data.count() / Math.floor(t / this.type.width))
		},
		autoheight_setter: function(t) {
			return t && (this.data.attachEvent("onStoreLoad", webix.bind(this.resize, this)), this.w.style.overflowY = "hidden"), t
		},
		$getSize: function(t, e) {
			this.s.xCount > 0 && "auto" != this.type.width && !this.Nw && (this.s.width = this.type.width * this.s.xCount + (this.cc ? webix.ui.scrollSize : 0)), this.s.yCount && "auto" != this.type.height && (this.s.height = this.type.height * this.s.yCount);
			var i = this.s.width || this.bc;
			return this.s.autoheight && i && (this.Ni(i), this.scroll_setter(!1)), webix.ui.view.prototype.$getSize.call(this, t, e)
		},
		iz: function() {
			var t = !1;
			return this.s.yCount && "auto" == this.type.height && (this.type.height = Math.floor(this.dc / this.s.yCount), t = !0), this.s.xCount && ("auto" == this.type.width || this.Nw) ? (this.Nw = !0, this.type.width = Math.floor(this.bc / this.s.xCount), t = !0) : this.Nw = !1, t
		},
		$setSize: function(t, e) {
			if (webix.ui.view.prototype.$setSize.call(this, t, e)) {
				if (this.s.autoheight && this.Ni() != this.dc) return webix.delay(this.resize, this);
				(this.iz() || this.Ai) && this.render()
			}
		}
	}, webix.DataMove, webix.DragItem, webix.MouseEvents, webix.KeysNavigation, webix.SelectionModel, webix.Scrollable, webix.ui.proto), webix.DataDriver.htmltable = {
		toObject: function(t) {
			t = webix.toNode(t);
			var e = t.rows;
			return webix.html.remove(t), e
		},
		getRecords: function(t) {
			for (var e = [], i = t[0] && t[0].Oi ? 1 : 0; i < t.length; i++) e.push(t[i]);
			return e
		},
		getDetails: function(t) {
			var e = t.getElementsByTagName("td");
			t = {};
			for (var i = 0; i < e.length; i++) t["data" + i] = e[i].innerHTML;
			return t
		},
		getInfo: function() {
			return {
				Q: 0,
				R: 0
			}
		},
		getOptions: function() {},
		getConfig: function(t) {
			var e = [],
				i = t[0].getElementsByTagName("th");
			i.length && (t[0].Oi = !0);
			for (var s = 0; s < i.length; s++) {
				var n = {
						id: "data" + s,
						header: this.Pi(i[s].innerHTML)
					},
					r = this.Qi(i[s]);
				n = webix.extend(n, r), e.push(n)
			}
			return e
		},
		Pi: function(t) {
			var e = t.indexOf("json://");
			return -1 != e && (t = JSON.parse(t.substr(e + 7))), t
		},
		Qi: function(t) {
			for (var e = t.attributes, i = {}, s = 0; s < e.length; s++) i[e[s].nodeName] = this.Pi(e[s].nodeValue);
			return i.width = parseInt(i.width, 10), i
		}
	}, webix.protoUI({
		name: "vscroll",
		defaults: {
			scroll: "x",
			scrollStep: 40,
			scrollPos: 0,
			scrollSize: 18,
			scrollVisible: 1,
			zoom: 1
		},
		$init: function(t) {
			var e = t.scroll || "x",
				i = this.x = webix.toNode(t.container);
			i.className += " webix_vscroll_" + e, i.innerHTML = "<div class='webix_vscroll_body'></div>", webix.event(i, "scroll", this.Ri, {
				bind: this
			}), this.Si = 0, this.Wi = 0
		},
		Ti: function(t) {
			return t > 15e5 ? (this.s.zoom = Math.floor(t / 15e5) + 1, this.Ui = t - this.Si, t = Math.floor(t / this.s.zoom) + this.Si) : (this.s.zoom = 1, this.Ui = 1 / 0), t
		},
		scrollWidth_setter: function(t) {
			return t = this.Ti(t), this.x.firstChild.style.width = t + "px", t
		},
		scrollHeight_setter: function(t) {
			return t = this.Ti(t), this.x.firstChild.style.height = t + "px", t
		},
		sizeTo: function(t, e, i) {
			t = t - (e || 0) - (i || 0);
			var s = this.s.scrollSize;
			webix.env.isIE && s && (s += 1), s || !this.s.scrollVisible || webix.env.$customScroll || (this.x.style.pointerEvents = "none", s = 14), s ? (this.x.style.display = "block", e && (this.x.style.marginTop = e + "px"), this.x.style["x" == this.s.scroll ? "width" : "height"] = Math.max(0, t) + "px", this.x.style["x" == this.s.scroll ? "height" : "width"] = s + "px") : this.x.style.display = "none", this.Si = t
		},
		getScroll: function() {
			return this.s.scrollPos * this.s.zoom
		},
		getSize: function() {
			return (this.s.scrollWidth || this.s.scrollHeight) * this.s.zoom
		},
		scrollTo: function(t) {
			0 > t && (t = 0);
			var e = this.s;
			t = Math.min(((e.scrollWidth || e.scrollHeight) - this.Si) * e.zoom, t), 0 > t && (t = 0);
			var i = t / e.zoom;
			return this.Wi != i ? (this.x["x" == e.scroll ? "scrollLeft" : "scrollTop"] = i, this.Vi(i), !0) : void 0
		},
		Ri: function() {
			var t = this.x["x" == this.s.scroll ? "scrollLeft" : "scrollTop"];
			t != this.Wi && this.Vi(t)
		},
		Vi: function(t) {
			this.Wi = t, this.s.scrollPos = Math.min(this.Ui, t * this.s.zoom) || 0, this.callEvent("onScroll", [this.s.scrollPos])
		},
		activeArea: function(t, e) {
			this.Xi = e, webix.event(t, "mousewheel", this.Yi, {
				bind: this
			}), webix.event(t, "DOMMouseScroll", this.Yi, {
				bind: this
			}), this.uB(t)
		},
		uB: function(t) {
			!webix.env.touch && window.navigator.pointerEnabled && (webix.html.addCss(t, "webix_scroll_touch_ie", !0), webix.event(t, "pointerdown", function(t) {
				("touch" == t.pointerType || "pen" == t.pointerType) && (this.km = webix.Touch.hm(t), this.vB = this.s.scrollPos)
			}, {
				bind: this
			}), webix.event(document.body, "pointermove", function(t) {
				var e;
				this.km && (this.lm = webix.Touch.hm(t), "x" == this.s.scroll ? e = this.lm.x - this.km.x : "y" == this.s.scroll && (e = this.lm.y - this.km.y), e && Math.abs(e) > 5 && this.scrollTo(this.vB - e))
			}, {
				bind: this
			}), webix.event(window, "pointerup", function() {
				this.km && (this.km = this.lm = null)
			}, {
				bind: this
			}))
		},
		Yi: function(t) {
			var e = 0;
			return t.wheelDeltaX && Math.abs(t.wheelDeltaX) > Math.abs(t.wheelDeltaY) ? this.Xi && this.s.scrollVisible && (e = t.wheelDeltaX / -40) : !this.Xi && this.s.scrollVisible && (e = webix.isUndefined(t.wheelDelta) ? t.detail : t.wheelDelta / -40), webix.env.isSafari && (this.Yy = t.target || t.srcElement), e && this.scrollTo(this.s.scrollPos + e * this.s.scrollStep) ? webix.html.preventEvent(t) : void 0
		}
	}, webix.EventSystem, webix.Settings), webix.Number = {
		format: function(t, e) {
			if ("" === t || "undefined" == typeof t) return t;
			e = e || webix.i18n, t = parseFloat(t);
			var i = 0 > t ? "-" : "";
			t = Math.abs(t);
			var s = t.toFixed(e.decimalSize).toString();
			s = s.split(".");
			var n = "";
			if (e.groupSize) {
				var r = e.groupSize,
					a = s[0].length;
				do {
					a -= r;
					var h = a > 0 ? s[0].substr(a, r) : s[0].substr(0, r + a);
					n = h + (n ? e.groupDelimiter + n : "")
				} while (a > 0)
			} else n = s[0];
			return e.decimalSize ? i + n + e.decimalDelimiter + s[1] : i + n
		},
		numToStr: function(t) {
			return function(e) {
				return webix.Number.format(e, t)
			}
		}
	}, webix.Date = {
		startOnMonday: !1,
		toFixed: function(t) {
			return 10 > t ? "0" + t : t
		},
		weekStart: function(t) {
			t = this.copy(t);
			var e = t.getDay();
			return this.startOnMonday && (0 === e ? e = 6 : e--), this.datePart(this.add(t, -1 * e, "day"))
		},
		monthStart: function(t) {
			return t = this.copy(t), t.setDate(1), this.datePart(t)
		},
		yearStart: function(t) {
			return t = this.copy(t), t.setMonth(0), this.monthStart(t)
		},
		dayStart: function(t) {
			return this.datePart(t, !0)
		},
		dateToStr: function(t, e) {
			return "function" == typeof t ? t : webix.env.strict ? function(e) {
				var i = "",
					s = 0;
				return t.replace(/%[a-zA-Z]/g, function(n, r) {
					i += t.slice(s, r);
					var a = function(t) {
						if ("%d" == n) return webix.Date.toFixed(t.getDate());
						if ("%m" == n) return webix.Date.toFixed(t.getMonth() + 1);
						if ("%j" == n) return t.getDate();
						if ("%n" == n) return t.getMonth() + 1;
						if ("%y" == n) return webix.Date.toFixed(t.getFullYear() % 100);
						if ("%Y" == n) return t.getFullYear();
						if ("%D" == n) return webix.i18n.calendar.dayShort[t.getDay()];
						if ("%l" == n) return webix.i18n.calendar.dayFull[t.getDay()];
						if ("%M" == n) return webix.i18n.calendar.monthShort[t.getMonth()];
						if ("%F" == n) return webix.i18n.calendar.monthFull[t.getMonth()];
						if ("%h" == n) return webix.Date.toFixed((t.getHours() + 11) % 12 + 1);
						if ("%g" == n) return (t.getHours() + 11) % 12 + 1;
						if ("%G" == n) return t.getHours();
						if ("%H" == n) return webix.Date.toFixed(t.getHours());
						if ("%i" == n) return webix.Date.toFixed(t.getMinutes());
						if ("%a" == n) return t.getHours() > 11 ? "pm" : "am";
						if ("%A" == n) return t.getHours() > 11 ? "PM" : "AM";
						if ("%s" == n) return webix.Date.toFixed(t.getSeconds());
						if ("%W" == n) return webix.Date.toFixed(webix.Date.getISOWeek(t));
						if ("%c" == n) {
							var e = t.getFullYear();
							return e += "-" + webix.Date.toFixed(t.getMonth() + 1), e += "-" + webix.Date.toFixed(t.getDate()), e += "T", e += webix.Date.toFixed(t.getHours()), e += ":" + webix.Date.toFixed(t.getMinutes()), e += ":" + webix.Date.toFixed(t.getSeconds())
						}
						return n
					};
					i += a(e), s = r + 2
				}), i += t.slice(s, t.length)
			} : (t = t.replace(/%[a-zA-Z]/g, function(t) {
				switch (t) {
					case "%d":
						return '"+webix.Date.toFixed(date.getDate())+"';
					case "%m":
						return '"+webix.Date.toFixed((date.getMonth()+1))+"';
					case "%j":
						return '"+date.getDate()+"';
					case "%n":
						return '"+(date.getMonth()+1)+"';
					case "%y":
						return '"+webix.Date.toFixed(date.getFullYear()%100)+"';
					case "%Y":
						return '"+date.getFullYear()+"';
					case "%D":
						return '"+webix.i18n.calendar.dayShort[date.getDay()]+"';
					case "%l":
						return '"+webix.i18n.calendar.dayFull[date.getDay()]+"';
					case "%M":
						return '"+webix.i18n.calendar.monthShort[date.getMonth()]+"';
					case "%F":
						return '"+webix.i18n.calendar.monthFull[date.getMonth()]+"';
					case "%h":
						return '"+webix.Date.toFixed((date.getHours()+11)%12+1)+"';
					case "%g":
						return '"+((date.getHours()+11)%12+1)+"';
					case "%G":
						return '"+date.getHours()+"';
					case "%H":
						return '"+webix.Date.toFixed(date.getHours())+"';
					case "%i":
						return '"+webix.Date.toFixed(date.getMinutes())+"';
					case "%a":
						return '"+(date.getHours()>11?"pm":"am")+"';
					case "%A":
						return '"+(date.getHours()>11?"PM":"AM")+"';
					case "%s":
						return '"+webix.Date.toFixed(date.getSeconds())+"';
					case "%W":
						return '"+webix.Date.toFixed(webix.Date.getISOWeek(date))+"';
					case "%c":
						var i = '"+date.getFullYear()+"';
						return i += '-"+webix.Date.toFixed((date.getMonth()+1))+"', i += '-"+webix.Date.toFixed(date.getDate())+"', i += "T", i += '"+webix.Date.toFixed(date.getHours())+"', i += ':"+webix.Date.toFixed(date.getMinutes())+"', i += ':"+webix.Date.toFixed(date.getSeconds())+"', e === !0 && (i += "Z"), i;
					default:
						return t
				}
			}), e === !0 && (t = t.replace(/date\.get/g, "date.getUTC")), new Function("date", "if (!date) return ''; if (!date.getMonth) date=webix.i18n.parseFormatDate(date);  return \"" + t + '";'))
		},
		strToDate: function(t, e) {
			if ("function" == typeof t) return t;
			var i, s, n, r = t.match(/%[a-zA-Z]/g),
				a = "var temp=date.split(/[^0-9a-zA-Z]+/g);";
			if (!webix.i18n.calendar.monthShort_hash) {
				for (n = webix.i18n.calendar.monthShort, s = webix.i18n.calendar.monthShort_hash = {}, i = 0; i < n.length; i++) s[n[i]] = i;
				for (n = webix.i18n.calendar.monthFull, s = webix.i18n.calendar.monthFull_hash = {}, i = 0; i < n.length; i++) s[n[i]] = i
			}
			if (webix.env.strict) return function(t) {
				if (!t) return "";
				if ("object" == typeof t) return t;
				var s = t.split(/[^0-9a-zA-Z]+/g),
					n = [0, 0, 1, 0, 0, 0];
				for (i = 0; i < r.length; i++) {
					var a = r[i];
					if ("%y" == a) n[0] = 1 * s[i] + (s[i] > 30 ? 1900 : 2e3);
					else if ("%Y" == a) n[0] = 1 * (s[i] || 0), n[0] < 30 && (n[0] += 2e3);
					else if ("%n" == a || "%m" == a) n[1] = (s[i] || 1) - 1;
					else if ("%M" == a) n[1] = webix.i18n.calendar.monthShort_hash[s[i]] || 0;
					else if ("%F" == a) n[1] = webix.i18n.calendar.monthFull_hash[s[i]] || 0;
					else if ("%j" == a || "%d" == a) n[2] = s[i] || 1;
					else if ("%g" == a || "%G" == a || "%h" == a || "%H" == a) n[3] = s[i] || 0;
					else if ("%a" == a || "%A" == a) n[3] = n[3] % 12 + ("am" == (s[i] || "").toLowerCase() ? 0 : 12);
					else if ("%i" == a) n[4] = s[i] || 0;
					else if ("%s" == a) n[5] = s[i] || 0;
					else if ("%c" == a) {
						var h = /(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)/g,
							o = h.exec(t);
						n[0] = 1 * (o[1] || 0), n[0] < 30 && (n[0] += 2e3), n[1] = (o[2] || 1) - 1, n[2] = o[3] || 1, n[3] = o[4] || 0, n[4] = o[5] || 0, n[5] = o[6] || 0
					}
				}
				return e ? new Date(Date.UTC(n[0], n[1], n[2], n[3], n[4], n[5])) : new Date(n[0], n[1], n[2], n[3], n[4], n[5])
			};
			for (i = 0; i < r.length; i++) switch (r[i]) {
				case "%j":
				case "%d":
					a += "set[2]=temp[" + i + "]||1;";
					break;
				case "%n":
				case "%m":
					a += "set[1]=(temp[" + i + "]||1)-1;";
					break;
				case "%y":
					a += "set[0]=temp[" + i + "]*1+(temp[" + i + "]>30?1900:2000);";
					break;
				case "%g":
				case "%G":
				case "%h":
				case "%H":
					a += "set[3]=temp[" + i + "]||0;";
					break;
				case "%i":
					a += "set[4]=temp[" + i + "]||0;";
					break;
				case "%Y":
					a += "set[0]=(temp[" + i + "]||0)*1; if (set[0]<30) set[0]+=2000;";
					break;
				case "%a":
				case "%A":
					a += "set[3]=set[3]%12+((temp[" + i + "]||'').toLowerCase()=='am'?0:12);";
					break;
				case "%s":
					a += "set[5]=temp[" + i + "]||0;";
					break;
				case "%M":
					a += "set[1]=webix.i18n.calendar.monthShort_hash[temp[" + i + "]]||0;";
					break;
				case "%F":
					a += "set[1]=webix.i18n.calendar.monthFull_hash[temp[" + i + "]]||0;";
					break;
				case "%c":
					a += "var res = date.split('T');", a += "if(res[0]){ var d = res[0].split('-');", a += "set[0]= (d[0]||0)*1; if (set[0]<30) set[0]+=2000;", a += "set[1]= (d[1]||1)-1;", a += "set[2]= d[2]||1;}", a += "if(res[1]){ var t = res[1].split(':');", a += "set[3]= t[0]||0;", a += "set[4]= t[1]||0;", a += "set[5]= t[2]||0;}"
			}
			var h = "set[0],set[1],set[2],set[3],set[4],set[5]";
			return e && (h = " Date.UTC(" + h + ")"), new Function("date", "if (!date) return ''; if (typeof date == 'object') return date; var set=[0,0,1,0,0,0]; " + a + " return new Date(" + h + ");")
		},
		getISOWeek: function(t) {
			if (!t) return !1;
			var e = t.getDay();
			0 === e && (e = 7);
			var i = new Date(t.valueOf());
			i.setDate(t.getDate() + (4 - e));
			var s = i.getFullYear(),
				n = Math.floor((i.getTime() - new Date(s, 0, 1).getTime()) / 864e5),
				r = 1 + Math.floor(n / 7);
			return r
		},
		getUTCISOWeek: function(t) {
			return this.getISOWeek(t)
		},
		Jv: function(t, e, i, s) {
			if (i) {
				var n = s(t, e);
				if (n)
					for (var r = i > 0 ? 1 : -1; n;) t.setHours(t.getHours() + r), n = s(t, e), r += i > 0 ? 1 : -1
			}
		},
		add: function(t, e, i, s) {
			s && (t = this.copy(t));
			var n = webix.Date.copy(t);
			switch (i) {
				case "day":
					t.setDate(t.getDate() + e), this.Jv(t, n, e, function(t, e) {
						return webix.Date.datePart(e, !0).valueOf() == webix.Date.datePart(t, !0).valueOf()
					});
					break;
				case "week":
					t.setDate(t.getDate() + 7 * e), this.Jv(t, n, 7 * e, function(t, e) {
						return webix.Date.datePart(e, !0).valueOf() == webix.Date.datePart(t, !0).valueOf()
					});
					break;
				case "month":
					t.setMonth(t.getMonth() + e), this.Jv(t, n, e, function(t, e) {
						return e.getMonth() == t.getMonth() && e.getYear() == t.getYear()
					});
					break;
				case "year":
					t.setYear(t.getFullYear() + e), this.Jv(t, n, e, function(t, e) {
						return e.getFullYear() == t.getFullYear()
					});
					break;
				case "hour":
					t.setHours(t.getHours() + e), this.Jv(t, n, e, function(t, e) {
						return e.getHours() == t.getHours() && webix.Date.datePart(e, !0) == webix.Date.datePart(t, !0)
					});
					break;
				case "minute":
					t.setMinutes(t.getMinutes() + e);
					break;
				default:
					webix.Date.add[i](t, e, i)
			}
			return t
		},
		datePart: function(t, e) {
			e && (t = this.copy(t));
			var i = this.copy(t);
			return i.setHours(0), t.setHours(i.getDate() != t.getDate() ? 1 : 0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), t
		},
		timePart: function(t, e) {
			return e && (t = this.copy(t)), (t.valueOf() / 1e3 - 60 * t.getTimezoneOffset()) % 86400
		},
		copy: function(t) {
			return new Date(t.valueOf())
		},
		equal: function(t, e) {
			return t && e ? t.valueOf() === e.valueOf() : !1
		},
		isHoliday: function(t) {
			return t = t.getDay(), 0 === t || 6 == t ? "webix_cal_event" : void 0
		}
	}, webix.i18n = {
		Zi: ["fullDateFormat", "timeFormat", "dateFormat", "longDateFormat", "parseFormat", "parseTimeFormat"],
		parseFormat: "%Y-%m-%d %H:%i",
		parseTimeFormat: "%H:%i",
		numberFormat: webix.Number.format,
		priceFormat: function(t) {
			return webix.i18n.$i(webix.i18n.numberFormat(t, webix.i18n._i))
		},
		setLocale: function(t) {
			var e = function(t, i) {
				for (var s in i) "object" != typeof i[s] || webix.isArray(i[s]) ? t[s] = i[s] : (t[s] || (t[s] = {}), e(t[s], i[s]))
			};
			"string" == typeof t && (t = this.locales[t]), t && e(this, t);
			for (var i = webix.i18n.Zi, s = 0; s < i.length; s++) {
				var n = i[s],
					r = webix.i18n[n + "UTC"];
				webix.i18n[n + "Str"] = webix.Date.dateToStr(webix.i18n[n], r), webix.i18n[n + "Date"] = webix.Date.strToDate(webix.i18n[n], r)
			}
			this.$i = webix.template(this.price), this._i = this.priceSettings || this, this.intFormat = webix.Number.numToStr({
				groupSize: this.groupSize,
				groupDelimiter: this.groupDelimiter,
				decimalSize: 0
			})
		}
	}, webix.i18n.locales = {}, webix.i18n.locales["en-US"] = {
		groupDelimiter: ",",
		groupSize: 3,
		decimalDelimiter: ".",
		decimalSize: 2,
		dateFormat: "%m/%d/%Y",
		timeFormat: "%h:%i %A",
		longDateFormat: "%d %F %Y",
		fullDateFormat: "%m/%d/%Y %h:%i %A",
		price: "${obj}",
		priceSettings: {
			groupDelimiter: ",",
			groupSize: 3,
			decimalDelimiter: ".",
			decimalSize: 2
		},
		fileSize: ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb"],
		calendar: {
			monthFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			hours: "Hours",
			minutes: "Minutes",
			done: "Done",
			clear: "Clear",
			today: "Today"
		},
		controls: {
			select: "Select"
		},
		dataExport: {
			page: "Page",
			of: "of"
		}
	}, webix.i18n.setLocale("en-US"), webix.Undo = {
		$init: function() {
			this.VA = webix.extend([], webix.PowerArray, !0), this.WA = -1
		},
		undo_setter: function(t) {
			return t && (this.XA(), this.XA = function() {}), t
		},
		XA: function() {
			var t = this;
			this.attachEvent("onBeforeDrop", function(e) {
				if (e.from == e.to) {
					var i = t.YA = webix.copy(this.getItem(e.start));
					i.$index = this.data.branch ? this.getBranchIndex(i.id) : this.getIndexById(i.id)
				}
			}), this.data.attachEvent("onDataMove", function(e) {
				if (t.YA && t.YA.id == e) {
					var i = t.YA;
					t.YA = null, t.ZA(e, i, "move")
				}
			}), this.attachEvent("onBeforeEditStop", function(t, e) {
				this.$A = webix.copy(this.getItem(e.id || e.row))
			}), this.data.attachEvent("onBeforeDelete", function(e) {
				if (this.getItem(e)) {
					var i = t._A = webix.copy(this.getItem(e));
					this.branch ? (i.$index = this.getBranchIndex(e), this.branch[e] && (i.$branch = webix.copy(this.serialize(e)))) : i.$index = this.getIndexById(e)
				}
			}), this.data.attachEvent("onStoreUpdated", function(e, i, s) {
				var n = null;
				e && ("add" == s ? n = webix.copy(i) : "delete" == s ? n = t._A : "update" == s && t.$A && t.$A.id == e && (n = t.$A, t.$A = null), n && t.ZA(e, n, s))
			}), this.data.attachEvent("onIdChange", function(e, i) {
				"object" == typeof e && (e = e.row);
				for (var s = 0; s < t.VA.length; s++) t.VA[s].id == e && (t.VA[s].id = i)
			})
		},
		ZA: function(t, e, i) {
			!this.aB && this.s.undo && (this.VA.push({
				id: t,
				action: i,
				data: e
			}), 20 == this.VA.length && this.VA.splice(0, 1), this.bB || (this.WA = this.VA.length - 1))
		},
		ignoreUndo: function(t, e) {
			this.aB = !0, t.call(e || this), this.aB = !1
		},
		removeUndo: function(t) {
			for (var e = this.VA.length - 1; e >= 0; e--) this.VA[e].id == t && ("id" == this.VA[e].action && (t = this.VA[e].data), this.VA.removeAt(e));
			this.WA = this.VA.length - 1
		},
		undo: function(t) {
			if (t) this.ignoreUndo(function() {
				var e, i;
				for (i = this.VA.length - 1; !e && i >= 0; i--) this.VA[i].id == t && (e = this.VA[i]);
				e && (this.cB(e), this.VA.removeAt(i + 1), this.WA = this.VA.length - 1)
			});
			else {
				var e = this.VA[this.WA];
				e && (this.ignoreUndo(function() {
					this.cB(e), this.VA.removeAt(this.WA)
				}), this.WA--)
			}
		},
		cB: function(t) {
			if ("delete" == t.action) {
				var e = null,
					i = t.data.$parent;
				t.data.$branch && (e = {
					parent: t.id,
					data: webix.copy(t.data.$branch)
				}, delete t.data.$branch, i && !this.data.branch[i] && (i = 0)), this.add(t.data, t.data.$index, i), e && this.parse(e)
			} else "add" == t.action ? this.remove(t.id) : "update" == t.action ? this.updateItem(t.id, t.data) : "move" == t.action && (t.data.$parent ? this.getItem(t.data.$parent) && this.move(t.id, t.data.$index, null, {
				parent: t.data.$parent
			}) : this.move(t.id, t.data.$index))
		}
	}, webix.protoUI({
		name: "datatable",
		defaults: {
			leftSplit: 0,
			rightSplit: 0,
			columnWidth: 100,
			minColumnWidth: 20,
			minColumnHeight: 26,
			prerender: !1,
			autoheight: !1,
			autowidth: !1,
			header: !0,
			fixedRowHeight: !0,
			scrollAlignY: !0,
			scrollX: !0,
			scrollY: !0,
			datafetch: 50
		},
		$skin: function() {
			var t = webix.skin.$active.rowHeight,
				e = this.defaults;
			e.rowHeight = t, e.headerRowHeight = webix.skin.$active.barHeight
		},
		on_click: {
			webix_richfilter: function() {
				return !1
			},
			webix_table_checkbox: function(t, e) {
				e = this.locate(t);
				var i = this.getItem(e.row),
					s = this.getColumnConfig(e.column),
					n = t.target || t.srcElement,
					r = "checkbox" == n.type ? n.checked : i[e.column] != s.checkValue,
					a = r ? s.checkValue : s.uncheckValue;
				return i[e.column] = a, this.callEvent("onCheck", [e.row, e.column, a]), this.data.callEvent("onDataUpdate", [e, i]), this.data.callEvent("onStoreUpdated", [e.row, i, this.s.checkboxRefresh ? "update" : "save"]), !1
			},
			webix_table_radio: function(t) {
				var e = this.locate(t),
					i = this.getItem(e.row),
					s = this.getColumnConfig(e.column);
				return this.eachRow(function(t) {
					var i = this.data.pull[t];
					i && i[e.column] == s.checkValue && (i[e.column] = s.uncheckValue)
				}), i[e.column] = s.checkValue, this.callEvent("onCheck", [e.row, e.column, !0]), this.refresh(), !1
			}
		},
		on_dblclick: {
			webix_table_checkbox: function() {
				return this.on_click.webix_table_checkbox.apply(this, arguments)
			}
		},
		on_context: {},
		$init: function(t) {
			this.on_click = webix.extend({}, this.on_click);
			var e = "<div class='webix_ss_header'><div class='webix_hs_left'></div><div class='webix_hs_center'></div><div class='webix_hs_right'></div></div><div class='webix_ss_body'><div class='webix_ss_left'><div class='webix_ss_center_scroll'></div></div>";
			e += "<div class='webix_ss_center'><div class='webix_ss_center_scroll'></div></div>", e += "<div class='webix_ss_right' ><div class='webix_ss_center_scroll'></div></div></div>", e += "<div class='webix_ss_hscroll'></div><div class='webix_ss_footer'><div class='webix_hs_left'></div><div class='webix_hs_center'></div><div class='webix_hs_right'></div></div><div class='webix_ss_vscroll_header'></div><div class='webix_ss_vscroll'></div><div class='webix_ss_vscroll_footer'></div>", this.w.innerHTML = e, this.bj = this.w.id = this.name + webix.uid(), this.w.className += " webix_dtable", this.y = this.w, this.I = this.w.firstChild, this.Vf = this.I.nextSibling, this.cj = this.Vf.nextSibling.nextSibling, this.data.provideApi(this, !0), this.data.attachEvent("onParse", webix.bind(this.dj, this)), this.$ready.push(this.ej), this.fj = [], this.Mt = [], this.Nt = [], this.gj = [], this.hj = {}, this.ij = {}, this.$g = this.jj = 0, this.Ns = [], this.data.attachEvent("onServerConfig", webix.bind(this.kj, this)), this.data.attachEvent("onServerOptions", webix.bind(this.lj, this)), this.attachEvent("onViewShow", this.Ow), webix.callEvent("onDataTable", [this, t])
		},
		mj: function() {
			this.nj = this.oj = webix.ui.scrollSize, webix.html.addStyle("#" + this.bj + " .webix_cell { height:" + this.s.rowHeight + "px; line-height:" + (this.s.rowLineHeight || this.s.rowHeight) + "px;" + (this.s.fixedRowHeight ? "" : "white-space:normal;") + " }"), webix.html.addStyle("#" + this.bj + " .webix_hcell { height:" + this.s.headerRowHeight + "px; line-height:" + this.s.headerRowHeight + "px;}"), this.mj = function() {}
		},
		ej: function() {
			this.data.attachEvent("onStoreLoad", webix.bind(this.nz, this)), this.data.attachEvent("onSyncApply", webix.bind(this.nz, this)), this.data.attachEvent("onStoreUpdated", webix.bind(function() {
				return this.render.apply(this, arguments)
			}, this)), this.data.attachEvent("onStoreUpdated", webix.bind(this.pj, this)), this.render()
		},
		refresh: function() {
			this.render()
		},
		render: function(t, e, i) {
			if ("save" != i) {
				if ("move" == i) {
					var s = webix.DragControl.getContext();
					if (s && s.fragile) return
				}
				if (!this.fj.length) {
					var n = this.s.columns;
					if (!n || !n.length) {
						if (!this.s.autoConfig || !this.data.order.length) return;
						this.tj = 0, this.qj()
					}
					this.rj()
				}
				return !this.isVisible(this.s.id) || this.$blockRender ? this.mj() : !t || -1 == e || "paint" != i && "update" != i ? (this.sj && (clearTimeout(this.sj), this.sj = 0), this.callEvent("onBeforeRender", [this.data]) ? (this.mj(), this.tj || this.uj(), this.bc && (this.s.experimental && ("paint" == i || "update" == i) && t ? this.Kv(t) : this.vj(!0, !0)), t && "update" == i || (this.wj = this.xj(), this.yj()), this.callEvent("onAfterRender", [this.data]), !0) : void 0) : (this.sj && clearTimeout(this.sj), void(this.sj && this.Lv != t ? (this.Lv = null, this.sj = webix.delay(function() {
					this.render()
				}, this)) : (this.Lv = t, this.sj = webix.delay(function() {
					this.render(t, -1, i)
				}, this))))
			}
		},
		getColumnConfig: function(t) {
			return this.Aj[t] || this.am[t]
		},
		lj: function(t) {
			for (var e in t) {
				var i = this.getColumnConfig(e),
					s = new webix.DataCollection({
						data: t[e]
					});
				this.Ns.push(s), this.Bj(s, i)
			}
		},
		kj: function(t) {
			t.columns && this.tj && this.refreshColumns(null, !0)
		},
		rj: function() {
			if (this.s.columns) {
				this.fj = this.s.columns, this.Aj = {};
				for (var t = 0; t < this.fj.length; t++) {
					var e = this.fj[t];
					this.Aj[e.id] = e;
					var i = e.cssFormat;
					i && (e.cssFormat = webix.toFunctor(i, this.$scope)), e.width = e.width || this.s.columnWidth, "string" == typeof e.format && (e.format = webix.i18n[e.format] || window[e.format]), webix.isUndefined(e.checkValue) && (e.checkValue = 1), webix.isUndefined(e.uncheckValue) && (e.uncheckValue = 0), e.css && "object" == typeof e.css && (e.css = webix.html.createCss(e.css));
					var s = e.template;
					s && ("string" == typeof s && (s = s.replace(/#\$value#/g, "#" + e.id + "#")), e.template = webix.template(s))
				}
				this.Mj("header", this.Mt), this.Mj("footer", this.Nt), this.callEvent("onStructureLoad", [])
			}
		},
		Cj: function() {
			this.uj()
		},
		uj: function() {
			this.Fj = this.fj.length - this.s.rightSplit, this.Gj = 0;
			for (var t = 0; t < this.fj.length; t++) {
				if (!this.fj[t].node) {
					var e = webix.html.create("DIV");
					e.style.width = this.fj[t].width + "px", this.fj[t].node = e
				}
				t >= this.s.leftSplit && t < this.Fj && (this.Gj += this.fj[t].width)
			}
			var i = [];
			if (this.s.rightSplit) {
				var s = this.fj.length - this.s.rightSplit;
				i[s] = " webix_first", i[s - 1] = " webix_last"
			}
			if (this.s.leftSplit) {
				var n = this.s.leftSplit;
				i[n] = " webix_first", i[n - 1] = " webix_last"
			}
			i[0] = (i[0] || "") + " webix_first";
			var r = this.fj.length - 1;
			i[r] = (i[r] || "") + " webix_last";
			for (var t = 0; t < this.fj.length; t++) {
				var a = this.fj[t].node;
				a.setAttribute("column", t), a.className = "webix_column " + (this.fj[t].css || "") + (i[t] || "")
			}
			this.Hj(), this.Ij(), this.Jj(), this.Kj(), this.tj = !0
		},
		Ij: function() {
			for (var t = 0, e = 0; e < this.fj.length; e++) {
				var i = this.fj[e];
				(e == this.s.leftSplit || e == this.Fj) && (t = 0), i.node && (i.node.style.left = t + "px", (this.s.leftSplit || this.s.rightSplit) && (webix.html.remove(i.node), i.attached = !1)), t += i.width
			}
		},
		Kj: function() {
			this.Lj || (this.Lj = 0), this.s.header && (this.fk(this.I, 0, 1), this.Mj("header", this.Mt), this.$g = this.Mt.Ot, this.Nj(this.I, "header", this.Mt)), this.s.footer && (this.fk(this.cj, 0, 1), this.Mj("footer", this.Nt), this.jj = this.Nt.Ot, this.Nj(this.cj, "footer", this.Nt)), this.refreshHeaderContent(!1, !1), this.Oj(), this.Nk && this.markSorting(this.Nk, this.Ok)
		},
		Mj: function(t, e) {
			for (var i = 0, s = 0; s < this.fj.length; s++) {
				var n = this.fj[s][t];
				n && "object" == typeof n && n.length || (webix.isUndefined(n) && (n = "header" == t ? this.fj[s].id : ""), n = [n]);
				for (var r = 0; r < n.length; r++) "object" != typeof n[r] && (n[r] = {
					text: n[r]
				}), n[r] && n[r].height && (e[r] = n[r].height);
				i = Math.max(i, n.length), this.fj[s][t] = n
			}
			e.Ot = i;
			for (var s = i - 1; s >= 0; s--) e[s] = e[s] || this.s.headerRowHeight, e.Ot += 1 * e[s];
			for (var s = 0; s < this.fj.length; s++)
				for (var a = this.fj[s][t], r = 0; r < a.length; r++) {
					if (a[r] && a[r].rowspan)
						for (var h = 1; h < a[r].rowspan; h++) a[r + h] = null;
					if (a[r] && a[r].colspan)
						for (var h = 1; h < a[r].colspan; h++) this.fj[s + h][t][r] = null
				}
			for (var s = 0; s < this.fj.length; s++) {
				var n = this.fj[s][t];
				if (n.length < i) {
					var o = n.length - 1;
					n[o].rowspan = i - n.length + 1;
					for (var r = o + 1; i > r; r++) n[r] = null
				}
			}
			return i
		},
		Pj: function(t, e) {
			for (var i = t.getElementsByTagName("TD"), s = 0; s < i.length; s++)
				if (i[s].getAttribute("active_id") == e) return i[s]
		},
		getHeaderContent: function(t) {
			var e = this.Pj(this.I, t);
			if (e || (e = this.Pj(this.cj, t)), e) {
				var i = this.hj[t],
					s = webix.ui.datafilter[i.content];
				return s.getHelper ? s.getHelper(e, i) : {
					type: s,
					getValue: function() {
						return s.getValue(e)
					},
					setValue: function(t) {
						return s.setValue(e, t)
					}
				}
			}
		},
		Pt: function(t, e, i) {
			var s = i ? -1 : 0;
			for (i += e, e; i > e; e++) s += t[e] + 1;
			return s
		},
		Qj: function(t, e, i, s, n) {
			if (t == e) return "";
			for (var r = "<table style='width:" + i + "px' cellspacing='0' cellpadding='0'>", a = t; e > a; a++) {
				r += "<tr>";
				for (var a = t; e > a; a++) r += "<th  style='width:" + this.fj[a].width + "px'></th>";
				r += "</tr>"
			}
			for (var h = this.fj[0][s].length, o = 0; h > o; o++) {
				r += "<tr section='" + s + "'>";
				for (var a = t; e > a; a++) {
					var l = this.fj[a][s][o];
					if (null !== l) {
						l.content && (l.contentId = l.contentId || webix.uid(), l.columnId = this.fj[a].id, l.format = this.fj[a].format, l.text = webix.ui.datafilter[l.content].render(this, l), this.hj[l.contentId] = l, this.Rj = !0), r += "<td column='" + (l.colspan ? l.colspan - 1 + a : a) + "'";
						var c = "";
						a == t && (c += "webix_first");
						var u = a + (l.colspan ? l.colspan - 1 : 0);
						u >= e - 1 && (c += " webix_last"), c && (r += ' class="' + c + '"');
						var d = n[o],
							f = "";
						l.contentId && (r += " active_id='" + l.contentId + "'"), l.colspan && (r += " colspan='" + l.colspan + "'"), l.rowspan && (r += " rowspan='" + l.rowspan + "'", d = this.Pt(this.Mt, o, l.rowspan)), d != this.s.headerRowHeight && (f = " style='line-height:" + d + "px; height:" + d + "px;'");
						var b = "webix_hcell",
							x = l.css;
						x && ("object" == typeof x && (l.css = x = webix.html.createCss(x)), b += " " + x), this.fj[a].$selected && (b += " webix_sel_hcell"), r += "><div class='" + b + "'" + f + ">";
						var p = "" === l.text ? "&nbsp;" : l.text;
						l.rotate && (p = "<div class='webix_rotate' style='width:" + (d - 10) + "px; transform-origin:center " + (d - 15) / 2 + "px;-webkit-transform-origin:center " + (d - 15) / 2 + "px;'>" + p + "</div>"), r += p + "</div></td>"
					}
				}
				r += "</tr>"
			}
			return r += "</tr></table>"
		},
		showItemByIndex: function(t, e) {
			var i = this.s.pager;
			if (i) {
				var s = Math.floor(t / i.size);
				s != i.page && webix.$$(i.id).select(s)
			}
			if (-1 != t) {
				var n = this.Sj();
				if (t < n[0] + 1 || t >= n[1] - 1) {
					var r = this.Tj(i ? this.data.$min : 0, t);
					t < n[0] + 1 ? r = Math.max(0, r - 1) : (r += this.Uj(t) - this.Vj, t > 0 && (r += this.Uj(t - 1) - 1)), this.Wj.scrollTo(r)
				}
			}
			if (-1 != e) {
				if (e < this.s.leftSplit) return;
				if (e >= this.Fj) return;
				var n = this.Xj();
				if (e < n[0] + 1 || e >= n[1] - 1) {
					for (var r = 0, a = this.s.leftSplit; e > a; a++) r += this.fj[a].width;
					e < n[0] + 1 || (r += this.fj[e].width - this.Yj), this.Zj.scrollTo(r)
				}
			}
		},
		showCell: function(t, e) {
			if (!e || !t) {
				var i = this.getSelectedId(!0);
				1 == i.length && (e = e || i[0].column, t = t || i[0].row)
			}
			e = e ? this.getColumnIndex(e) : -1, t = t ? this.getIndexById(t) : -1, this.showItemByIndex(t, e)
		},
		scrollTo: function(t, e) {
			if (this.Zj) {
				if (this.$j) return this.$j(t, e);
				null !== t && this.Zj.scrollTo(t), null !== e && this.Wj.scrollTo(e)
			}
		},
		getScrollState: function() {
			if (this._j) return this._j();
			var t = this.ck ? 0 : this.aC || 0;
			return {
				x: this.bk || 0,
				y: this.jk + t
			}
		},
		showItem: function(t) {
			this.showItemByIndex(this.getIndexById(t), -1)
		},
		Nj: function(t, e, i) {
			t.childNodes[0].innerHTML = this.Qj(0, this.s.leftSplit, this.dk, e, i), t.childNodes[1].innerHTML = this.Qj(this.s.leftSplit, this.Fj, this.Gj, e, i), t.childNodes[1].onscroll = webix.bind(this._s, this), t.childNodes[2].innerHTML = this.Qj(this.Fj, this.fj.length, this.ek, e, i)
		},
		_s: function() {
			var t = this.getScrollState().x,
				e = this.I.childNodes[1].scrollLeft;
			e != t && this.scrollTo(e, null)
		},
		pj: function() {
			this.refreshHeaderContent(!0, !0)
		},
		nz: function() {
			this.refreshHeaderContent(!1, !0)
		},
		refreshHeaderContent: function(t, e, i) {
			this.s.header && (e && this.fk(this.I, t, 1, i), this.fk(this.I, t, 0, i)), this.s.footer && (e && this.fk(this.cj, t, 1, i), this.fk(this.cj, t, 0, i))
		},
		refreshFilter: function(t) {
			(!t || this.hj[t]) && this.refreshHeaderContent(!1, !0, t)
		},
		fk: function(t, e, i, s) {
			if (this.Rj && t)
				for (var n = t.getElementsByTagName("TD"), r = 0; r < n.length; r++)
					if (n[r].getAttribute("active_id")) {
						var a = this.hj[n[r].getAttribute("active_id")];
						if (s && s != a.columnId) continue;
						var h = webix.ui.datafilter[a.content];
						i ? h.getValue && (a.value = h.getValue(n[r])) : (!e || h.trackCells) && h.refresh(this, n[r], a)
					}
		},
		headerContent: [],
		gk: function(t, e, i) {
			if (this.oj) {
				if (t.style.height = Math.max(e, 1) - 1 + "px", t.style.width = (this.Fj ? 0 : i) + this.oj - 1 + "px", webix.env.isWebKit) {
					t.offsetWidth
				}
			} else t.style.display = "none"
		},
		Oj: function() {
			this.s.header && this.gk(this.hk, this.$g, this.Lj), this.s.footer && this.gk(this.ik, this.jj, this.Lj)
		},
		sk: function() {
			var t = !(this.s.autowidth || this.s.scrollX === !1);
			this.nj = t ? webix.ui.scrollSize : 0;
			var e = !(this.s.autoheight || this.s.scrollY === !1);
			this.oj = e ? webix.ui.scrollSize : 0, this.Zj && (this.Zj.s.scrollSize = this.nj, this.Zj.s.scrollVisible = t), this.Wj && (this.Wj.s.scrollSize = this.oj, this.Wj.s.scrollVisible = e)
		},
		Hj: function() {
			this.jk = 0, this.bk = 0;
			var t, e;
			if (t = e = 1, (this.s.autoheight || this.s.scrollY === !1) && (e = this.oj = 0), (this.s.autowidth || this.s.scrollX === !1) && (t = this.nj = 0), webix.env.touch && (t = e = 0), this.Zj || (this.Zj = new webix.ui.vscroll({
					container: this.cj.previousSibling,
					scrollWidth: this.Gj,
					scrollSize: this.nj,
					scrollVisible: t
				}), !t || this.nj || webix.env.$customScroll || (this.Zj.x.style.position = "absolute"), this.Zj.attachEvent("onScroll", webix.bind(this.kk, this))), !this.Wj) {
				this.hk = this.cj.nextSibling;
				var i = this.hk.nextSibling;
				this.ik = i.nextSibling, this.Wj = new webix.ui.vscroll({
					container: i,
					scrollHeight: 100,
					scroll: "y",
					scrollSize: this.oj,
					scrollVisible: e
				}), this.Wj.activeArea(this.Vf), this.Zj.activeArea(this.Vf, !0), this.Wj.attachEvent("onScroll", webix.bind(this.lk, this))
			}
			this.bc && this.callEvent("onResize", [this.bc, this.dc]), webix.env.$customScroll && webix.CustomScroll.enable(this), this.Hj = function() {}
		},
		columnId: function(t) {
			return this.fj[t].id
		},
		getColumnIndex: function(t) {
			for (var e = 0; e < this.fj.length; e++)
				if (this.fj[e].id == t) return e;
			return -1
		},
		nk: function(t, e) {
			var i, s = 0,
				n = 0,
				r = 0,
				a = 0,
				h = 0;
			for (i = 0; i < this.fj.length && ((this.Fj == i || this.s.leftSplit == i) && (s = 0, h++), this.fj[i].id != e); i++) s += this.fj[i].width;
			for (n += this.fj[i].width, i = 0; i < this.data.order.length && this.data.order[i] != t; i++) a += this.Uj(i);
			return r += this.Uj(i), [s, n, a - this.jk, r, this.Vf.childNodes[h]]
		},
		ok: function() {
			return this.row
		},
		locate: function(t, e) {
			if (this.s.subview && this != webix.$$(t)) return null;
			for (t = t.target || t.srcElement || t; t && t.getAttribute && !t.getAttribute("view_id");) {
				var i = t.className.toString(),
					s = null;
				if (-1 != i.indexOf("webix_cell") && (s = this.pk(t), s && (s.row = this.data.order[s.rind])), -1 != i.indexOf("webix_hcell") && (s = this.pk(t), s && (s.header = !0)), s) return e ? s.header ? null : s.row : (s.column = this.fj[s.cind].id, s.toString = this.ok, s);
				t = t.parentNode
			}
			return null
		},
		pk: function(t) {
			var e = t.parentNode;
			if (!e) return null;
			var i = 1 * (t.getAttribute("column") || e.getAttribute("column")),
				s = t.getAttribute("row") || 0;
			if (!s)
				for (var n = 0; n < e.childNodes.length; n++) e.childNodes[n] == t && (s = n + this.fj[i].qk);
			return {
				rind: s,
				cind: i
			}
		},
		rk: function(t) {
			this.tj && (this.Ij(), this.Jj(), this.Kj(), t || this.vj(!1, !1))
		},
		setColumnWidth: function(t, e, i) {
			return this.Xs(this.getColumnIndex(t), e, i)
		},
		Xs: function(t, e, i, s) {
			if (!isNaN(e)) {
				var n = this.fj[t];
				n.minWidth && e < n.minWidth ? e = n.minWidth : e < this.s.minColumnWidth && (e = this.s.minColumnWidth);
				var r = n.width;
				return r != e ? (t >= this.s.leftSplit && t < this.Fj && (this.Gj += e - r), n.width = e, n.node ? (n.node.style.width = e + "px", i || this.rk(), this.callEvent("onColumnResize", [n.id, e, r, !!s]), !0) : !1) : !1
			}
		},
		FA: function(t) {
            if(!t){ t={}; }
			return (t.$height || this.s.rowHeight) + (t.$subopen ? t.$subHeight : 0)
		},
		Uj: function(t) {
			var e = this.data.order[t];
			return e ? this.FA(this.data.pull[e]) : this.s.rowHeight
		},
		Tj: function(t, e) {
			if (this.s.fixedRowHeight) return (e - t) * this.s.rowHeight;
			for (var i = 0; e > t; t++) i += this.Uj(t);
			return i
		},
		ug: function(t, e) {
			1 == arguments.length && (e = t.column, t = t.row);
			for (var i = this.getItem(t), s = this.getColumnConfig(e), n = 0, r = 0, a = 0; a < this.fj.length; a++) {
				(a == this.s.leftSplit || a == this.Fj) && (n = 0);
				var h = this.fj[a];
				if (h.id == e) {
					var o = a < this.s.leftSplit ? 0 : a >= this.Fj ? 2 : 1;
					r = this.Vf.childNodes[o].firstChild;
					break
				}
				n += h.width
			}
			var l = (this.data.order.length, this.Tj(this.ak || 0, this.getIndexById(t)));
			return {
				parent: r,
				top: l + (this.ck || 0),
				left: n,
				width: s.width,
				height: i.$height || this.s.rowHeight
			}
		},
		xj: function() {
			var t = this.s.pager,
				e = 0,
				i = this.data.order.length;
			return t && (e = t.size * t.page, i = Math.min(i, e + t.size), t.level && (e = this.data.$min, i = this.data.$max)), this.Tj(e, i)
		},
		setRowHeight: function(t, e) {
			if (!isNaN(e)) {
				e < this.s.minColumnHeight && (e = this.s.minColumnHeight);
				var i = this.getItem(t),
					s = i.$height || this.s.rowHeight;
				s != e && (i.$height = e, this.config.fixedRowHeight = !1, this.render(), this.callEvent("onRowResize", [t, e, s]))
			}
		},
		lk: function(t) {
			if (this.jk = t, this.s.prerender)
				for (var e = this.Vf.childNodes, i = 0; i < e.length; i++) e[i].scrollTop = t;
			else this.vj();
			webix.env.$customScroll && webix.CustomScroll.sk(this.Vf), this.callEvent("onScrollY", []), this.callEvent("onAfterScroll", [])
		},
		kk: function(t) {
			this.Vf.childNodes[1].scrollLeft = this.bk = t, this.s.header && (this.I.childNodes[1].scrollLeft = t), this.s.footer && (this.cj.childNodes[1].scrollLeft = t), this.s.prerender === !1 && this.vj(this.tk ? !1 : !0), webix.env.$customScroll && webix.CustomScroll.sk(this.Vf), this.callEvent("onScrollX", []), this.callEvent("onAfterScroll", [])
		},
		Xj: function(t) {
			if (t) return [0, this.fj.length];
			for (var e = this.bk, i = this.s.leftSplit; e > 0;) e -= this.fj[i].width, i++;
			var s = i;
			for (e && i--, e += this.Yj; e > 0 && s < this.Fj;) e -= this.fj[s].width, s++;
			return [i, s]
		},
		getVisibleCount: function() {
			return Math.floor(this.Vj / this.config.rowHeight)
		},
		Sj: function(t) {
			var e = this.jk,
				i = 0,
				s = this.count(),
				n = this.s.pager;
			if (n) {
				var i = n.page * n.size,
					s = Math.min(s, i + n.size);
				n.level && (i = this.data.$min, s = this.data.$max)
			}
			if (this.s.autoheight) return [i, s, 0];
			if (t) return [i, s, 0];
			var r = i,
				a = this.s.fixedRowHeight ? this.s.rowHeight : 0;
			if (a) {
				var h = Math.ceil(e / a);
				e -= h * a, r += h
			} else
				for (; e > 0;) e -= this.Uj(r), r++;
			var o = r > 0 && e ? -(this.Uj(r - 1) + e) : 0,
				l = r;
			if (e && r--, e += this.Vj || this.dc, a) {
				var h = Math.ceil(e / a);
				e -= h * a, l += h, l > s && (l = s)
			} else
				for (; e > 0 && s > l;) e -= this.Uj(l), l++;
			return [r, l, o]
		},
		Kv: function(t) {
			var e = this.getItem(t),
				i = this.getIndexById(t),
				s = this.Sj();
			if (!(i < s[0] || i >= s[1]))
				for (var n = this.Xj(), r = 0; r < this.fj.length; r++) {
					var a = this.fj[r];
					if (r < this.Fj && r >= this.s.leftSplit && (r < n[0] || r > n[1]) && (a.qk = -999), a.attached && a.node) {
						var h = a.node.childNodes[i - s[0]],
							o = this.Ek(e, this.fj[r], 0);
						h.innerHTML = o, h.className = this.Mv(this.fj[r], o, e, t)
					}
				}
		},
		vj: function(t, e) {
			if (this.fj.length) {
				e && this.uk();
				var i = this.Xj(this.s.prerender),
					s = this.Sj(this.s.prerender === !0);
				if (t) {
					for (var n = this.s.leftSplit; n < i[0]; n++) this.vk(n, e);
					for (var n = i[1]; n < this.Fj; n++) this.vk(n, e)
				}
				this.wk = [];
				for (var r = 0, n = 0; n < this.s.leftSplit; n++) r += this.xk(n, s, e);
				for (var n = i[0]; n < i[1]; n++) r += this.xk(n, s, e, n == i[0]);
				for (var n = this.Fj; n < this.fj.length; n++) r += this.xk(n, s, e);
				this.yk(s[0], s[1], e), this.zk(s)
			}
		},
		Ak: function(t, e) {
			this.Bk = t, this.Ck = e, webix.html.remove(this.gj), this.gj = []
		},
		yk: function(t, e, i) {
			if (this.GA && (this.GA.style.top = this.ck + "px"), (i || t != this.Bk || e != this.Ck) && (this.Ak(t, e), this.Dk)) {
				this.Dk = !1;
				for (var s = 0; s < this.wk.length; s++) {
					var n, r = this.wk[s],
						a = this.getItem(r.id);
					n = "function" == typeof a.$row ? a.$row.call(this, a, this.type) : this.Ek(a, this.getColumnConfig(a.$row), s);
					var h = this.gj[s] = webix.html.create("DIV", null, n);
					h.className = "webix_cell " + (a.$sub ? "webix_dtable_sub" + (this.s.subview ? "view" : "row") : "webix_dtable_colrow"), h.setAttribute("column", 0), h.setAttribute("row", r.index);
					var o = a.$height || this.s.rowHeight;
					h.style.height = a.$subopen ? a.$subHeight + "px" : o + "px", h.style.paddingRight = webix.ui.scrollSize + "px", h.style.top = r.top + (a.$subopen ? o - 1 : -1) + "px", this.GA || (this.GA = webix.html.create("DIV"), this.GA.style.position = "relative", this.GA.style.top = this.ck + "px", this.Vf.appendChild(this.GA)), this.GA.appendChild(h), this.attachEvent("onSyncScroll", function(t, e, i) {
						webix.Touch.Nf(this.GA, 0, e, i)
					}), this.s.subview && this.callEvent("onSubViewRender", [a, h])
				}
			}
		},
		zk: function(t) {
			var e = this.s.pager,
				i = this.s.datafetch,
				s = !this.Fk || t[0] >= this.Fk;
			if (this.Fk = t[0], this.Gk) {
				if (e && (!i || i >= e.size) && this.Hk([0, e.size * e.page], Math.max(i, e.size), !0)) return this.Gk = null;
				this.Ik(this.Gk, s), this.Gk = null
			} else if (this.s.loadahead) {
				this.Hk(t, this.s.loadahead, s)
			}
		},
		Hk: function(t, e, i) {
			var s = t[1],
				n = s + e;
			i || (s = t[0] - e, n = t[0]), 0 > s && (s = 0), n = Math.min(n, this.data.order.length - 1);
			for (var r = !1, a = s; n > a; a++) this.data.order[a] || (r ? (r.last = a, r.count = a - s) : r = {
				start: a,
				count: n - s
			});
			return r ? (this.Ik(r, i), !0) : void 0
		},
		Ik: function(t, e) {
			var i = Math.max(t.count, this.s.datafetch || this.s.loadahead || 0),
				s = e ? t.start : t.last - i + 1;
			this.cf(t.count, t.start) || this.loadNext(i, s)
		},
		Zy: function(t) {
			if (webix.env.isSafari) {
				var e, i, s, n, r = ["x", "y"];
				for (e = 0; 2 > e; e++) n = this["_" + r[e] + "_scroll"], n && n.Yy && n.Yy.parentNode == t && (i = n.Yy);
				i && (this.$y && webix.html.remove(this.$y), this.$y = i, s = i.cloneNode(!0), i.parentNode.insertBefore(s, i), this.$y.style.display = "none", this.Vf.appendChild(this.$y))
			}
		},
		vk: function(t) {
			var e = this.fj[t];
			this.Zy(e.node), webix.html.remove(e.node), e.attached = !1
		},
		uk: function() {
			for (var t = 0; t < this.fj.length; t++) this.fj[t].qk = -1;
			this.gj.length && (webix.html.remove(this.gj), this.gj = [])
		},
		getText: function(t, e) {
			return this.Ek(this.getItem(t), this.getColumnConfig(e), 0)
		},
        getData : function(){
			var r = [];
			for(var index=0;index<this.count();index++){ r.push(this.getItem(this.getIdByIndex(index))); }
			return r;
		},
		Mv: function(t, e, i, s) {
			var n = "webix_cell";
			if (t.cssFormat) {
				var r = t.cssFormat(e, i, s, t.id);
				r && (n += "object" == typeof r ? " " + webix.html.createCss(r) : " " + r)
			}
			var a = i.$css;
			a && ("object" == typeof a && (i.$css = a = webix.html.createCss(a)), n += " " + a);
			var h = this.data.Me[s];
			if (h && (h.$css && (n += " " + h.$css), h.$cellCss)) {
				var o = h.$cellCss[t.id];
				o && (n += " " + o)
			}
			if (i.$cellCss) {
				var l = i.$cellCss[t.id];
				l && ("object" == typeof l && (l = webix.html.createCss(l)), n += " " + l)
			}
			var c = this.data.getMark(i.id, "webix_selected");
			return (c && (c.$row || c[t.id]) || t.$selected) && (n += this.Lk), n
		},
		Ek: function(t, e, i) {
			if (!t) return "";
			var s;
			return s = t[e.id], s === webix.undefined || null === s ? s = "" : e.format && (s = e.format(s)), e.template && (s = e.template(t, this.type, s, e, i)), s
		},
		type: {
			checkbox: function(t, e, i, s) {
				var n = i == s.checkValue ? 'checked="true"' : "";
				return "<input class='webix_table_checkbox' type='checkbox' " + n + ">"
			},
			radio: function(t, e, i, s) {
				var n = i == s.checkValue ? 'checked="true"' : "";
				return "<input class='webix_table_radio' type='radio' " + n + ">"
			},
			editIcon: function() {
				return "<span class='webix_icon fa-pencil'></span>"
			},
			trashIcon: function() {
				return "<span class='webix_icon fa-trash'></span>"
			}
		},
		type_setter: function(t) {
			return this.types && this.types[t] ? (this.type = webix.clone(this.types[t]), this.type.css && (this.w.className += " " + this.type.css)) : webix.type(this, t), this.type.on_click && webix.extend(this.on_click, this.type.on_click), t
		},
		xk: function(t, e, i, s) {
			var n = this.fj[t];
			if (!n.attached) {
				var r = t < this.s.leftSplit ? 0 : t >= this.Fj ? 2 : 1;
				this.Vf.childNodes[r].firstChild.appendChild(n.node), n.attached = !0, n.split = r
			}
			this.ak = e[0], this.ck = 0, this.aC = e[2];
			var a = 0;
			if (this.s.scrollAlignY ? e[1] == this.data.order.length || this.data.$pagesize && e[1] % this.data.$pagesize === 0 ? n.node.style.top = (this.ck = e[2]) + "px" : n.Jk && (n.node.style.top = "0px") : (this.ck = e[2], e[2] != n.Jk && (n.node.style.top = e[2] + "px")), !i && n.qk == e[0] && n.Kk == e[1]) return 0;
			for (var h = "", o = this.s.columns[t], l = this.s.rowHeight, c = e[0]; c < e[1]; c++) {
				var u, d = this.data.order[c],
					f = this.data.getItem(d);
				if (f) {
					if (s && f.$row && (this.Dk = !0, this.wk.push({
							top: a,
							id: f.id,
							index: c
						}), !f.$sub)) {
						h += "<div class='webix_cell'></div>", a += l;
						continue
					}
					var u = this.Ek(f, o, c),
						b = this.Mv(o, u, f, d),
						x = f.$subopen ? "margin-bottom:" + f.$subHeight + "px;" : "";
					f.$height ? (h += "<div class='" + b + "' style='height:" + f.$height + "px;" + x + "'>" + u + "</div>", a += f.$height - l) : h += "<div class='" + b + "'" + (x ? " style='" + x + "'" : "") + ">" + u + "</div>", x && (a += f.$subHeight)
				} else h += "<div class='webix_cell'></div>", this.Gk ? this.Gk.last = c : this.Gk = {
					start: c,
					count: e[1] - c
				};
				a += l
			}
			return this.Zy(n.node), n.node.innerHTML = h, n.qk = e[0], n.Kk = e[1], n.Jk = e[2], 1
		},
		yj: function() {
			if (this.fj.length && !isNaN(1 * this.dc)) {
				var t = this.wj + (this.nj ? this.nj : 0);
				if (!this.s.autoheight && !this.s.yCount || !this.resize()) {
					this.Wj.sizeTo(this.dc, this.$g, this.jj), this.Wj.define("scrollHeight", t), this.Vj = Math.max(0, this.dc - this.nj - this.$g - this.jj);
					for (var e = 0; 3 > e; e++) this.Vf.childNodes[e].style.height = this.Vj + "px", this.Vf.childNodes[e].firstChild.style.height = this.s.prerender ? this.wj + "px" : this.Vj + "px";
					this.I.style.height = this.$g + "px"
				}
			}
		},
		Jj: function() {
			if (this.fj.length) {
				var t = 0;
				for (this.dk = 0, this.ek = 0, this.Yj = 0; t < this.s.leftSplit;) this.dk += this.fj[t].width, t++;
				for (t = this.fj.length - 1; t >= this.Fj;) this.ek += this.fj[t].width, t--;
				if (this.bc && (!this.s.autowidth || !this.resize())) {
					this.Yj = this.bc - this.ek - this.dk - this.oj, this.Vf.childNodes[1].firstChild.style.width = this.Gj + "px", this.Vf.childNodes[0].style.width = this.dk + "px", this.Vf.childNodes[1].style.width = this.Yj + "px", this.Vf.childNodes[2].style.width = this.ek + "px", this.I.childNodes[0].style.width = this.dk + "px", this.I.childNodes[1].style.width = this.Yj + "px", this.I.childNodes[2].style.width = this.ek + "px", this.cj.childNodes[0].style.width = this.dk + "px", this.cj.childNodes[1].style.width = this.Yj + "px", this.cj.childNodes[2].style.width = this.ek + "px";
					var e = this.Yj - this.Gj;
					if (0 > e && (e = 0), e != this.Lj && (this.Lj = e, this.Oj()), webix.env.isWebKit) {
						var i = this.Vf.childNodes[0].offsetWidth;
						i = this.Vf.childNodes[1].offsetWidth, i = this.Vf.childNodes[1].firstChild.offsetWidth, i = this.Vf.childNodes[2].offsetWidth
					}
					this.Zj.sizeTo(this.bc - this.oj), this.Zj.define("scrollWidth", this.Gj + this.dk + this.ek)
				}
			}
		},
		$getSize: function(t, e) {
			if ((this.s.autoheight || this.s.yCount) && this.s.columns) {
				var i = (this.s.yCount || 0) * this.s.rowHeight;
				i || (i = this.isVisible() ? this.wj : this.count() * this.s.rowHeight), this.s.height = Math.max(i + (this.nj ? this.nj : 0) - 1, this.s.minHeight || 0) + this.$g + this.jj
			}
			this.s.autowidth && this.s.columns && (this.s.width = Math.max(this.Gj + this.dk + this.ek + this.oj, this.s.minWidth || 0));
			var s = this.dk + this.ek + this.oj,
				n = webix.ui.view.prototype.$getSize.call(this, t, e);
			return n[0] = Math.max(n[0] || s), n
		},
		Ow: function() {
			if (this.Zj) {
				var t = this.getScrollState();
				this.Zj.Wi = this.Wj.Wi = -1, this.scrollTo(t.x, t.y)
			}
		},
		$setSize: function() {
			var t = this.bc,
				e = this.dc;
			webix.ui.view.prototype.$setSize.apply(this, arguments) && (this.tj && (this.callEvent("onResize", [this.bc, this.dc, t, e]), this.Jj(), this.yj()), this.render())
		},
		Mk: function(t) {
			var e = this.getColumnConfig(t);
			if (e.sort) {
				var i = "asc";
				e.id == this.Nk && (i = "asc" == this.Ok ? "desc" : "asc"), this.zf(e.id, i, e.sort)
			}
		},
		markSorting: function(t, e) {
			if (this.Pk || (this.Pk = webix.html.create("DIV")), webix.html.remove(this.Pk), e) {
				var i = this.Qk(this.getColumnIndex(t));
				i && (this.Pk.className = "webix_ss_sort_" + e, i.style.position = "relative", i.appendChild(this.Pk)), this.Nk = t, this.Ok = e
			} else this.Nk = this.Ok = null
		},
		scroll_setter: function(t) {
			return "string" == typeof t ? (this.s.scrollX = -1 != t.indexOf("x"), this.s.scrollY = -1 != t.indexOf("y"), t) : this.s.scrollX = this.s.scrollY = t
		},
		Qk: function(t) {
			for (var e = this.I.getElementsByTagName("TD"), i = null, s = 0; s < e.length; s++)
				if (e[s].getAttribute("column") == t && !e[s].getAttribute("active_id") && (i = e[s].firstChild, (e[s].colSpan || 0) < 2)) return i;
			return i
		},
		zf: function(t, e, i) {
			e = e || "asc", this.markSorting(t, e), "server" == i ? this.loadNext(0, 0, {
				before: function() {
					var t = this.data.url;
					this.clearAll(), this.data.url = t
				}
			}, 0, 1) : ("text" == i && (this.data.each(function(e) {
				e.$text = this.getText(e.id, t)
			}, this), i = "string", t = "$text"), "function" == typeof i ? this.data.sort(i, e) : this.data.sort(t, e, i || "string"))
		},
		iA: function(t, e, i, s) {
			var n, r, a;
			if (t.length)
				for (r = 0; r < t.length; r++)
					if (n = webix.toFunctor(t[r], this.$scope), a = n.call(this, e, i, s), a === !1) return !1
		},
		Yc: function(t, e, i, s) {
			t = t || event;
			var n = t.target || t.srcElement;
			if (!this.s.subview || this == webix.$$(n)) {
				for (var r, a = "", h = [], o = !1, l = null, n = t.target || t.srcElement; n && n.parentNode && n != this.x.parentNode;) {
					if (a = n.className) {
						a = a.toString().split(" ");
						for (var c = a.length - 1; c >= 0; c--) e[a[c]] && h.push(e[a[c]])
					}
					if (n.parentNode.getAttribute && !l) {
						var u = n.parentNode.getAttribute("column") || n.getAttribute("column");
						if (u) {
							var d = "DIV" == n.parentNode.tagName;
							if (o = !0, d) {
								var f = n.parentNode.getAttribute("row") || n.getAttribute("row") || webix.html.index(n) + this.fj[u].qk;
								this.Qc = l = {
									row: this.data.order[f],
									column: this.fj[u].id
								}, l.toString = this.ok
							} else this.Qc = l = {
								column: this.fj[u].id
							};
							if (r = this.iA(h, t, l, n), r === !1) return;
							if (d) this.callEvent("on" + i, [l, t, n]) && s && this.callEvent("on" + s, [l, t, n]);
							else if ("ItemClick" == i) {
								var b = "header" == n.parentNode.parentNode.getAttribute("section");
								b && this.callEvent("onHeaderClick", [l, t, n]) && this.Mk(l.column)
							}
							h = []
						}
					}
					n = n.parentNode
				}
				return this.iA(h, t, l, this.$view), o
			}
		},
		showOverlay: function(t) {
			if (!this.Rk) {
				var e = webix.html.create("DIV", {
					"class": "webix_overlay"
				}, "");
				this.Vf.appendChild(e), this.Rk = e
			}
			this.Rk.innerHTML = t
		},
		hideOverlay: function() {
			this.Rk && (webix.html.remove(this.Rk), this.Rk = null)
		},
		mapCells: function(t, e, i, s, n, r) {
			if (null === t && this.data.order.length > 0 && (t = this.data.order[0]), null === e && (e = this.columnId(0)), null === i && (i = this.data.order.length), null === s && (s = this.s.columns.length), this.exists(t) && (t = this.getIndexById(t), e = this.getColumnIndex(e), null !== e))
				for (var a = 0; i > a && t + a < this.data.order.length; a++)
					for (var h = t + a, o = this.data.order[h], l = this.getItem(o), c = 0; s > c && e + c < this.s.columns.length; c++) {
						var u = e + c,
							d = this.columnId(u),
							f = n(l[d], o, d, a, c);
						r || (l[d] = f)
					}
		},
		dj: function(t, e) {
			!this.s.columns && t.getConfig && this.define("columns", t.getConfig(e))
		},
		qj: function() {
			var t = this.getItem(this.getFirstId()),
				e = this.s.columns = [];
			for (var i in t) "id" != i && e.push({
				id: i,
				header: i[0].toUpperCase() + i.substr(1),
				sort: "string",
				editor: "text"
			});
			e.length && (e[0].fillspace = !0), "undefined" == typeof this.s.select && this.define("select", "row")
		}
	}, webix.AutoTooltip, webix.Group, webix.DataMarks, webix.DataLoader, webix.MouseEvents, webix.MapCollection, webix.ui.view, webix.EventSystem, webix.Settings), webix.ui.datafilter = {
		textWaitDelay: 500,
		summColumn: {
			getValue: function(t) {
				return t.firstChild.innerHTML
			},
			setValue: function() {},
			refresh: function(t, e, i) {
				var s = 0;
				t.mapCells(null, i.columnId, null, 1, function(t) {
					t = 1 * t, isNaN(t) || (s += t)
				}, !0), i.format && (s = i.format(s)), i.template && (s = i.template({
					value: s
				})), e.firstChild.innerHTML = s
			},
			trackCells: !0,
			render: function(t, e) {
				return e.template && (e.template = webix.template(e.template)), ""
			}
		},
		masterCheckbox: {
			getValue: function() {},
			setValue: function() {},
			getHelper: function(t, e) {
				return {
					check: function() {
						e.checked = !1, t.onclick()
					},
					uncheck: function() {
						e.checked = !0, t.onclick()
					},
					isChecked: function() {
						return e.checked
					}
				}
			},
			refresh: function(t, e, i) {
				e.onclick = function() {
					this.getElementsByTagName("input")[0].checked = i.checked = !i.checked;
					var e = t.getColumnConfig(i.columnId),
						s = i.checked ? e.checkValue : e.uncheckValue;
					t.data.each(function(e) {
						e && (e[i.columnId] = s, t.callEvent("onCheck", [e.id, i.columnId, s]), this.callEvent("onStoreUpdated", [e.id, e, "save"]))
					}), t.refresh()
				}
			},
			render: function(t, e) {
				return "<input type='checkbox' " + (e.checked ? "checked='1'" : "") + ">"
			}
		},
		textFilter: {
			getInputNode: function(t) {
				return t.firstChild.firstChild
			},
			getValue: function(t) {
				return this.getInputNode(t).value
			},
			setValue: function(t, e) {
				this.getInputNode(t).value = e
			},
			refresh: function(t, e, i) {
				e.component = t.s.id, t.registerFilter(e, i, this), e.Sk = t.s.id, i.value && this.getValue(e) != i.value && this.setValue(e, i.value), e.onclick = webix.html.preventEvent;
				var s = "webix_keydown_filter_" + t.s.id + "_" + i.columnId;
				webix.event(e, "keydown", this.Tk, {
					id: s
				})
			},
			render: function(t, e) {
				return this.init && this.init(e), e.css = "webix_ss_filter", "<input " + (e.placeholder ? 'placeholder="' + e.placeholder + '" ' : "") + "type='text'>"
			},
			Tk: function(t) {
				var e = this.Sk;
				9 != (t.which || t.keyCode) && (this.Uk && window.clearTimeout(this.Uk), this.Uk = window.setTimeout(function() {
					webix.$$(e).filterByAll()
				}, webix.ui.datafilter.textWaitDelay))
			}
		},
		selectFilter: {
			getInputNode: function(t) {
				return t.firstChild.firstChild
			},
			getValue: function(t) {
				return this.getInputNode(t).value
			},
			setValue: function(t, e) {
				this.getInputNode(t).value = e
			},
			refresh: function(t, e, i) {
				i.compare = i.compare || function(t, e) {
					return t == e
				}, e.component = t.s.id, t.registerFilter(e, i, this);
				var s, n = i.options;
				n ? "string" == typeof n ? (s = i.options = [], webix.ajax(n).then(webix.bind(function(s) {
					i.options = s.json(), this.refresh(t, e, i)
				}, this))) : s = n : (s = t.collectValues(i.columnId), s.unshift({
					id: "",
					value: ""
				}));
				var r = webix.$$(n);
				r && r.data && r.data.getRange && (s = r.data.getRange());
				for (var a = document.createElement("select"), h = 0; h < s.length; h++) {
					var o = document.createElement("option");
					o.value = s[h].id, o.text = s[h].value, a.add(o)
				}
				e.firstChild.innerHTML = "", e.firstChild.appendChild(a), i.value && this.setValue(e, i.value), e.onclick = webix.html.preventEvent, a.Sk = t.s.id;
				var l = "webix_change_filter_" + t.s.id + "_" + i.columnId;
				webix.event(a, "change", this.Vk, {
					id: l
				})
			},
			render: function(t, e) {
				return this.init && this.$init(e), e.css = "webix_ss_filter", ""
			},
			Vk: function() {
				webix.$$(this.Sk).filterByAll()
			}
		}
	}, webix.ui.datafilter.serverFilter = webix.extend({
		$server: !0,
		Tk: function(t, e) {
			var i = this.Sk,
				s = t.which || t.keyCode;
			e = t.target || t.srcElement, 9 == s || s >= 33 && 40 >= s || (this.Uk && window.clearTimeout(this.Uk), this.Uk = window.setTimeout(function() {
				webix.$$(i).filterByAll()
			}, webix.ui.datafilter.textWaitDelay))
		}
	}, webix.ui.datafilter.textFilter), webix.ui.datafilter.serverSelectFilter = webix.extend({
		$server: !0,
		Vk: function() {
			var t = this.Sk;
			webix.$$(t).filterByAll()
		}
	}, webix.ui.datafilter.selectFilter), webix.ui.datafilter.numberFilter = webix.extend({
		init: function(t) {
			t.prepare = function(e) {
				var i = -1 != e.indexOf("=") ? 1 : 0,
					s = this.format(e);
				return "" === s ? "" : (-1 != e.indexOf(">") ? t.compare = this.Wk : -1 != e.indexOf("<") ? (t.compare = this.Xk, i *= -1) : (t.compare = this.Yk, i = 0), s - i)
			}
		},
		format: function(t) {
			return t.replace(/[^\-\.0-9]/g, "")
		},
		Wk: function(t, e) {
			return 1 * t > e
		},
		Xk: function(t, e) {
			return "" !== t && e > 1 * t
		},
		Yk: function(t, e) {
			return 1 * t == e
		}
	}, webix.ui.datafilter.textFilter), webix.ui.datafilter.dateFilter = webix.extend({
		format: function(t) {
			if ("" === t) return "";
			var e = new Date;
			if (-1 != t.indexOf("today")) e = webix.Date.dayStart(e);
			else if (-1 == t.indexOf("now")) {
				var i = t.match(/[0-9]+/g);
				if (!i || !i.length) return "";
				i.length < 3 ? (i.reverse(), e = new Date(i[0], (i[1] || 1) - 1, 1)) : e = webix.i18n.dateFormatDate(t.replace(/^[>< =]+/, ""))
			}
			return e.valueOf()
		}
	}, webix.ui.datafilter.numberFilter), webix.extend(webix.ui.datatable, {
		filterByAll: function() {
			var t = !1;
			this.data.silent(function() {
				this.filter();
				var e = !1;
				for (var i in this.ij) {
					var s = this.ij[i],
						n = s[2].getValue(s[0]),
						r = n;
					s[1].prepare && (r = s[1].prepare.call(s[2], r, s[1], this)), s[1].value = n;
					var a = s[1].compare;
					if (this.callEvent("onBeforeFilter", [i, r, s[1]])) {
						if (s[2].$server) return t = !0, this.jA();
						"" !== r && (a ? (a = this.fC(i, a), this.filter(webix.bind(function(t, e) {
							return t ? a(t[i], e, t) : !1
						}, this), r, e)) : this.filter(i, r, e), e = !0)
					}
				}
			}, this), t || (this.refresh(), this.callEvent("onAfterFilter", []))
		},
		fC: function(t, e) {
			var i = this.getColumnConfig(t).optionslist;
			return i ? ("string" != typeof i && (i = ","), function(t, s, n) {
				if (!t) return !0;
				for (var r = t.split(i), a = 0; a < r.length; a++)
					if (e(r[a], s, n)) return !0
			}) : e
		},
		filterMode_setter: function(t) {
			return webix.extend(this.data.Cf, t, !0)
		},
		getFilter: function(t) {
			var e = this.ij[t];
			return e && e[2].getInputNode ? e[2].getInputNode(e[0]) : null
		},
		registerFilter: function(t, e, i) {
			this.ij[e.columnId] = [t, e, i]
		},
		collectValues: function(t) {
			var e = [],
				i = {
					"": !0
				},
				s = this.getColumnConfig(t),
				n = s.options || s.collection;
			if (n) {
				if ("object" == typeof n && !n.loadNext) {
					if (webix.isArray(n))
						for (var r = 0; r < n.length; r++) e.push({
							id: n[r],
							value: n[r]
						});
					else
						for (var a in n) e.push({
							id: a,
							value: n[a]
						});
					return e
				}
				"string" == typeof n && (n = webix.$$(n)), n.getBody && (n = n.getBody()), this.Zk.call(n, "id", "value", e, i)
			} else this.Zk(s.id, s.id, e, i);
			var s = {
				values: e
			};
			return this.callEvent("onCollectValues", [t, s]), s.values
		},
		Zk: function(t, e, i, s) {
			this.data.each(function(n) {
				var r = n ? n[e] : "";
				r === webix.undefined || s[r] || (s[r] = !0, i.push({
					id: n[t],
					value: r
				}))
			}, this, !0), i.sort(function(t, e) {
				return t.value > e.value ? 1 : -1
			})
		},
		jA: function() {
			this.loadNext(0, 0, {
				before: function() {
					var t = this.data.url;
					this.editStop && this.editStop(), this.clearAll(), this.data.url = t
				},
				success: function() {
					this.callEvent("onAfterFilter", [])
				}
			}, 0, 1)
		}
	}), webix.extend(webix.ui.datatable, {
		hover_setter: function(t) {
			return t && !this.Yw && (this.Vc(), this.config.experimental = !0, this.attachEvent("onMouseMoving", function() {
				var t = this.locate(arguments[0]);
				t = t ? t.row : null, this.Zw != t && (this.Zw && this.removeRowCss(this.Zw, this.s.hover), this.$w(), this.Zw = t)
			}), this.attachEvent("onMouseOut", function() {
				this.Zw && (this.removeRowCss(this.Zw, this.s.hover), this.Zw = null)
			}), this.Yw = 1), t
		},
		$w: function() {
			webix.delay(function() {
				this.Zw && this.addRowCss(this.Zw, this.s.hover)
			}, this, [], 5)
		},
		select_setter: function(t) {
			return !this.select && t && (webix.extend(this, this._k.$k, !0), t === !0 ? t = "row" : "multiselect" == t && (t = "row", this.s.multiselect = !0), webix.extend(this, this._k[t], !0)), t
		},
		getSelectedId: function(t) {
			return t ? [] : ""
		},
		getSelectedItem: function(t) {
			return webix.SelectionModel.getSelectedItem.call(this, t)
		},
		_k: {
			$k: {
				Lk: " webix_cell_select",
				$init: function() {
					this.al(), this.on_click.webix_cell = webix.bind(this.bl, this), this.cl = this.zg = function() {
						this.unselect()
					}, this.data.attachEvent("onStoreUpdated", webix.bind(this.xg, this)), this.data.attachEvent("onClearAll", webix.bind(this.cl, this)), this.data.attachEvent("onAfterFilter", webix.bind(this.zg, this)), this.data.attachEvent("onIdChange", webix.bind(this.Ag, this)), this.$ready.push(webix.SelectionModel.uy)
				},
				Ag: function(t, e) {
					for (var i = 0; i < this.dl.length; i++) this.dl[i] == t && (this.dl[i] = e);
					for (var i = 0; i < this.el.length; i++) {
						var s = this.el[i];
						s.row == t && (t = this.fl(s), s.row = e, e = this.fl(s), s.id = e, delete this.gl[t], this.gl[e] = !0)
					}
				},
				xg: function(t, e, i) {
					"delete" == i && this.unselect(t)
				},
				al: function() {
					this.el = [], this.gl = {}, this.dl = []
				},
				isSelected: function(t, e) {
					var i;
					return i = webix.isUndefined(e) ? "object" == typeof t ? this.fl(t) : t : this.fl({
						row: t,
						column: e
					}), this.gl[i]
				},
				getSelectedId: function(t, e) {
					var i;
					if (this.el.length > 1 || t) {
						if (i = [].concat(this.el), e)
							for (var s = 0; s < i.length; s++) i[s] = i[s].id
					} else if (i = this.el[0], e && i) return i.id;
					return i
				},
				ok: function() {
					return this.row
				},
				hl: function(t, e) {
					var i = this.fl(t);
					if (null !== i) {
						if (-1 === e) return this.ll(t);
						if (t.id = i, t.toString = this.ok, !this.callEvent("onBeforeSelect", [t, e])) return !1;
						if (!this.gl[i] || !e && 1 != this.el.length) return e || this.il(), this.el.push(t), this.gl[i] = !0, this.callEvent("onAfterSelect", [t, e]), this.jl(this.kl(t)), !0
					}
				},
				il: function() {
					if (!this.el.length) return !1;
					for (var t = 0; t < this.dl.length; t++) {
						var e = this.getItem(this.dl[t]);
						e && this.data.removeMark(e.id, "webix_selected", 0, 1)
					}
					var i = this.s.columns;
					if (i)
						for (var t = 0; t < i.length; t++) i[t].$selected = null;
					return this.al(), !0
				},
				unselectAll: function() {
					this.clearSelection()
				},
				selectAll: function() {
					this.selectRange()
				},
				clearSelection: function() {
					this.il() && (this.callEvent("onSelectChange", []), this.render())
				},
				ll: function(t) {
					var e = this.fl(t);
					if (!e && this.el.length && (this.clearSelection(), this.callEvent("onSelectChange", [])), this.gl[e]) {
						if (!this.callEvent("onBeforeUnSelect", [t])) return !1;
						for (var i = 0; i < this.el.length; i++)
							if (this.el[i].id == e) {
								this.el.splice(i, 1);
								break
							}
						delete this.gl[e], this.callEvent("onAfterUnSelect", [t]), this.jl(0, this.ml(t))
					}
				},
				nl: function(t) {
					var e = this.getItem(t);
					return this.data.addMark(e.id, "webix_selected", 0, {
						$count: 0
					}, !0)
				},
				jl: function(t) {
					t && this.dl.push(t), this.Dg || (this.render(), this.callEvent("onSelectChange", []))
				},
				bl: function(t, e) {
					var i = t.ctrlKey || t.metaKey || "touch" == this.s.multiselect,
						s = t.shiftKey;
					if (this.s.multiselect || "multiselect" == this.s.select || (i = s = !1), s && this.el.length) {
						var n = this.el[this.el.length - 1];
						this.ol(e, n)
					} else i && this.gl[this.fl(e)] ? this.ll(e) : this.hl({
						row: e.row,
						column: e.column
					}, i)
				},
				pl: function(t, e, i) {
					var s = this.s.columns;
					if (e) {
						for (var n = [], r = 0; r < s.length; r++) s[r].$selected && n.push(s[r]);
						s = n
					}
					for (var a = this.data.order, h = 0, r = 0; r < a.length; r++) {
						var o = this.getItem(a[r]);
						if (o) {
							var l = this.data.getMark(o.id, "webix_selected");
							if (l || e) {
								for (var c = 0, u = 0; u < s.length; u++) {
									var d = s[u].id;
									if (i || e || l[d]) {
										if (!t) return {
											row: a[r],
											column: d
										};
										o[d] = t(o[d], a[r], d, h, c), c++
									}
								}
								h++
							}
						}
					}
				}
			},
			row: {
				Lk: " webix_row_select",
				fl: function(t) {
					return t.row
				},
				select: function(t, e) {
					t && (t = t.toString()), this.hl({
						row: t
					}, e)
				},
				kl: function(t) {
					return this.nl(t.row).$row = !0, t.row
				},
				unselect: function(t) {
					this.ll({
						row: t
					})
				},
				ml: function(t) {
					return this.data.removeMark(t.row, "webix_selected", 0, 1), t.row
				},
				mapSelection: function(t) {
					return this.pl(t, !1, !0)
				},
				ol: function(t, e) {
					return this.selectRange(t.row, e.row)
				},
				selectRange: function(t, e, i) {
					webix.isUndefined(i) && (i = !0);
					var s = t ? this.getIndexById(t) : 0,
						n = e ? this.getIndexById(e) : this.data.order.length - 1;
					if (s > n) {
						var r = s;
						s = n, n = r
					}
					this.Dg = !0;
					for (var a = s; n >= a; a++) this.select(this.getIdByIndex(a), i);
					this.Dg = !1, this.jl()
				}
			},
			cell: {
				fl: function(t) {
					return t.column ? t.row + "_" + t.column : null
				},
				select: function(t, e, i) {
					this.hl({
						row: t,
						column: e
					}, i)
				},
				kl: function(t) {
					var e = this.nl(t.row);
					return e.$count++, e[t.column] = !0, t.row
				},
				unselect: function(t, e) {
					this.ll({
						row: t,
						column: e
					})
				},
				ml: function(t) {
					var e = this.nl(t.row);
					return e.$count--, e[t.column] = !1, e.$count <= 0 && this.data.removeMark(t.row, "webix_selected"), t.row
				},
				mapSelection: function(t) {
					return this.pl(t, !1, !1)
				},
				ol: function(t, e) {
					return this.selectRange(t.row, t.column, e.row, e.column)
				},
				selectRange: function(t, e, i, s, n) {
					webix.isUndefined(n) && (n = !0);
					var r = t ? this.getIndexById(t) : 0,
						a = i ? this.getIndexById(i) : this.data.order.length - 1,
						h = e ? this.getColumnIndex(e) : 0,
						o = s ? this.getColumnIndex(s) : this.fj.length - 1;
					if (r > a) {
						var l = r;
						r = a, a = l
					}
					if (h > o) {
						var l = h;
						h = o, o = l
					}
					this.Dg = !0;
					for (var c = r; a >= c; c++)
						for (var u = h; o >= u; u++) this.select(this.getIdByIndex(c), this.columnId(u), n);
					this.Dg = !1, this.jl()
				}
			},
			column: {
				Lk: " webix_column_select",
				fl: function(t) {
					return t.column
				},
				ok: function() {
					return this.column
				},
				select: function(t, e) {
					this.hl({
						column: t
					}, e)
				},
				kl: function(t) {
					this.s.columns[this.getColumnIndex(t.column)].$selected = !0, this.Dg || this.Kj()
				},
				unselect: function(t) {
					this.ll({
						column: t
					})
				},
				ml: function(t) {
					this.s.columns[this.getColumnIndex(t.column)].$selected = null, this.Kj()
				},
				mapSelection: function(t) {
					return this.pl(t, !0, !1)
				},
				ol: function(t, e) {
					return this.selectRange(t.column, e.column)
				},
				selectRange: function(t, e, i) {
					webix.isUndefined(i) && (i = !0);
					var s = t ? this.getColumnIndex(t) : 0,
						n = e ? this.getColumnIndex(e) : this.fj.length - 1;
					if (s > n) {
						var r = s;
						s = n, n = r
					}
					this.Dg = !0;
					for (var a = s; n >= a; a++) this.select(this.columnId(a), i);
					this.Dg = !1, this.Kj(), this.jl()
				}
			},
			area: {
				fl: function(t) {
					return t.row + "_" + t.column
				},
				getSelectedId: function(t) {
					var e = this.getSelectArea(),
						i = [];
					if (e)
						if (!t || e.start.row == e.end.row && e.start.column == e.end.column) i.push(e.end);
						else
							for (var s = this.getIndexById(e.start.row), n = this.getIndexById(e.end.row), r = this.getColumnIndex(e.start.column), a = this.getColumnIndex(e.end.column), h = s; n >= h; h++)
								for (var o = r; a >= o; o++) i.push({
									row: this.getIdByIndex(h),
									column: this.columnId(o)
								});
					return t ? i : i[0]
				},
				unselect: function() {
					this.removeSelectArea()
				},
				ll: function() {
					this.removeSelectArea()
				},
				mapSelection: function(t) {
					var e = this.getSelectArea();
					if (e)
						for (var i = this.getColumnIndex(e.start.column), s = this.getColumnIndex(e.end.column), n = this.getIndexById(e.start.row), r = this.getIndexById(e.end.row), a = n; r >= a; a++)
							for (var h = this.data.order[a], o = this.getItem(h), l = i; s >= l; l++) {
								var c = this.fj[l].id;
								if (!t) return {
									row: h,
									column: c
								};
								t(o[c] || "", h, c, a - n, l - i)
							}
				},
				ol: function(t, e) {
					this.gC(t, e)
				},
				hl: function(t) {
					return this.addSelectArea(t, t, !1), !0
				}
			}
		}
	}), webix.extend(webix.ui.datatable, {
		blockselect_setter: function(t) {
			return t && this.ql && (webix.event(this.x, webix.env.mouse.move, this.rl, {
				bind: this
			}), webix.event(this.x, webix.env.mouse.down, this.sl, {
				bind: this
			}), webix.event(document.body, webix.env.mouse.up, this.tl, {
				bind: this
			}), this.ql = this.ul = this.vl = !1), t
		},
		ql: !0,
		wl: function(t, e) {
			for (var i = t.target || t.srcElement; i;) {
				if (i.getAttribute && i.getAttribute("webixignore")) return !1;
				if (i == e) return !0;
				i = i.parentNode
			}
			return !1
		},
		sl: function(t) {
			if (this.wl(t, this.Vf)) {
				if (t.target && "INPUT" == t.target.tagName || this.Pl) return;
				webix.html.addCss(document.body, "webix_noselect"), this.xl = webix.html.offset(this.Vf);
				var e = webix.html.pos(t);
				this.ul = [e.x - this.xl.x, e.y - this.xl.y]
			}
		},
		tl: function(t) {
			this.yl && (this.jz("select", !0, t), this.yl = webix.html.remove(this.yl)), webix.html.removeCss(document.body, "webix_noselect"), this.ul = this.vl = !1
		},
		jz: function(t, e, i) {
			var s = this.zl.apply(this, this.ul),
				n = this.zl.apply(this, this.vl);
			if (this.callEvent("onBeforeBlockSelect", [s, n, e, i])) {
				if ((!this.wB || this.wB(s, n, e, i) !== !1) && s.row && n.row)
					if ("select" === t) this.il(), this.ol(s, n);
					else {
						{
							var r, a, h, o;
							this.ul
						}
						if ("box" === t) r = Math.min(this.ul[0], this.vl[0]), h = Math.max(this.ul[0], this.vl[0]), a = Math.min(this.ul[1], this.vl[1]), o = Math.max(this.ul[1], this.vl[1]);
						else {
							var l = this.ug(s.row, s.column),
								c = this.ug(n.row, n.column),
								u = this.getScrollState(),
								d = l.width,
								f = c.width;
							this.ek && this.ul[0] > this.dk + this.Yj ? l.left += this.dk + this.Yj : this.dk ? this.ul[0] > this.dk && (l.left < u.x ? (d -= u.x - l.left, l.left = this.dk) : l.left += this.dk - u.x) : l.left -= u.x, this.ek && this.vl[0] > this.dk + this.Yj ? c.left += this.dk + this.Yj : this.dk ? this.vl[0] > this.dk && (c.left < u.x ? (f -= u.x - c.left, c.left = this.dk) : c.left += this.dk - u.x) : c.left -= u.x, this.s.prerender && (l.top -= this.jk, c.top -= this.jk), r = Math.min(l.left, c.left), h = Math.max(l.left + d, c.left + f), a = Math.min(l.top, c.top), o = Math.max(l.top + l.height, c.top + c.height)
						}
						var b = this.yl.style;
						b.left = r + "px", b.top = a + "px", b.width = h - r + "px", b.height = o - a + "px"
					}
				e && this.callEvent("onAfterBlockSelect", [s, n])
			}
		},
		Al: function() {
			this.yl = webix.html.create("div", {
				"class": "webix_block_selection"
			}, ""), this.Vf.appendChild(this.yl)
		},
		rl: function(t) {
			if (this.ul !== !1) {
				var e = webix.html.pos(t),
					i = [e.x - this.xl.x, e.y - this.xl.y];
				if (Math.abs(this.ul[0] - i[0]) < 5 && Math.abs(this.ul[1] - i[1]) < 5) return;
				this.vl === !1 && this.Al(t), this.vl = i, this.jz(this.config.blockselect, !1, t)
			}
		},
		zl: function(t, e) {
			this.ek && t > this.dk + this.Yj ? t += this.Zj.getSize() - this.Yj - this.dk - this.ek : (!this.dk || t > this.dk) && (t += this.Zj.getScroll()), e += this.getScrollState().y;
			var i = null,
				s = null;
			0 > t && (t = 0), 0 > e && (e = 0);
			for (var n = this.s.columns, r = this.data.order, a = 0, h = 0; h < n.length; h++)
				if (a += n[h].width, a >= t) {
					s = n[h].id;
					break
				}
			if (s || (s = n[n.length - 1].id), a = 0, this.s.fixedRowHeight) i = r[Math.floor(e / this.s.rowHeight)];
			else
				for (var h = 0; h < r.length; h++)
					if (a += this.Uj(h), a >= e) {
						i = r[h];
						break
					} return i || (i = r[r.length - 1]), {
				row: i,
				column: s
			}
		}
	}), webix.protoUI({
		name: "resizearea",
		defaults: {
			dir: "x"
		},
		$init: function(t) {
			var e = t.dir || "x",
				i = webix.toNode(t.container),
				s = "x" == e ? "width" : "height",
				n = t.margin ? t.margin + "px" : 0;
			this.Cl = "x" == e ? "left" : "top", this.x = webix.html.create("DIV", {
				"class": "webix_resize_area webix_dir_" + e
			}), webix.event(this.x, webix.env.mouse.down, webix.html.stopEvent), n && (n = "x" == e ? n + " 0 " + n : "0 " + n + " 0 " + n), this.Dl = webix.html.create("DIV", {
				"class": "webix_resize_handle_" + e,
				style: n ? "padding:" + n : ""
			}, "<div class='webix_handle_content'></div>"), this.El = webix.html.create("DIV", {
				"class": "webix_resize_origin_" + e
			}), t[s] && (this.El.style[s] = t[s] + (t.border ? 1 : 0) + "px", this.Dl.style[s] = t[s] + "px"), t.cursor && (this.Dl.style.cursor = this.El.style.cursor = this.x.style.cursor = t.cursor), this.Fl = webix.event(i, webix.env.mouse.move, this.Gl, {
				bind: this
			}), this.Hl = webix.event(document.body, webix.env.mouse.up, this.Il, {
				bind: this
			}), this.Dl.style[this.Cl] = this.El.style[this.Cl] = t.start + "px", i.appendChild(this.x), i.appendChild(this.Dl), i.appendChild(this.El)
		},
		Il: function() {
			this.callEvent("onResizeEnd", [this.Jl]), webix.eventRemove(this.Fl), webix.eventRemove(this.Hl), webix.html.remove(this.x), webix.html.remove(this.Dl), webix.html.remove(this.El), this.x = this.Dl = this.El = null
		},
		Gl: function(t) {
			var e = webix.html.pos(t);
			this.Jl = ("x" == this.s.dir ? e.x : e.y) + this.s.start - this.s.eventPos, this.Dl.style[this.Cl] = this.Jl + "px", this.callEvent("onResize", [this.Jl])
		}
	}, webix.EventSystem, webix.Settings), webix.extend(webix.ui.datatable, {
		resizeRow_setter: function(t) {
			return this.s.scrollAlignY = !1, this.s.fixedRowHeight = !1, this.resizeColumn_setter(t)
		},
		resizeColumn_setter: function(t) {
			return t && this.Kl && (webix.event(this.x, "mousemove", this.Ll, {
				bind: this
			}), webix.event(this.x, "mousedown", this.Ml, {
				bind: this
			}), webix.event(this.x, "mouseup", this.Nl, {
				bind: this
			}), this.Kl = !1), t
		},
		Kl: !0,
		Ml: function(t) {
			this.Ol && (this.Pl = [webix.html.pos(t), this.Ol[2]], webix.html.addCss(document.body, "webix_noselect"), webix.html.denySelect())
		},
		Nl: function() {
			this.Pl = !1, webix.html.removeCss(document.body, "webix_noselect"), webix.html.allowSelect()
		},
		Ql: function(t) {
			if (t = t || event, !this.Rl) {
				var e = this.Ol[0],
					i = this.Pl[1],
					s = this.pk(i);
				if (s) {
					var n, r = this.Pl[0];
					if ("x" == e ? (n = webix.html.offset(i).x + this.Ol[1] - webix.html.offset(this.Vf).x, r = r.x, this.Ol[1] || (s.cind -= i.parentNode.colSpan || 1)) : (n = webix.html.offset(i).y + this.Ol[1] - webix.html.offset(this.Vf).y + this.$g, r = r.y, this.Ol[1] || s.rind--), s.cind >= 0 && s.rind >= 0) {
						this.Rl = [e, s, n];
						var a = new webix.ui.resizearea({
							container: this.x,
							dir: e,
							eventPos: r,
							start: n,
							cursor: ("x" == e ? "e" : "n") + "-resize"
						});
						a.attachEvent("onResizeEnd", webix.bind(this.Sl, this))
					}
					this.Ml = this.Ol = !1
				}
			}
		},
		Sl: function(t) {
			if (this.Rl) {
				var e = this.Rl[0],
					i = this.Rl[1],
					s = t - this.Rl[2];
				if ("x" == e) {
					this.s.rightSplit && i.cind + 1 >= this.Fj && i.cind !== this.fj.length - 1 && (i.cind++, s *= -1);
					var n = this.fj[i.cind],
						r = n.width;
					delete n.fillspace, this.Xs(i.cind, r + s, !0, !0), this.rk()
				} else {
					var a = this.getIdByIndex(i.rind),
						h = this.FA(this.getItem(a));
					this.setRowHeight(a, h + s)
				}
				this.Nl()
			}
			this.Rl = null
		},
		Ll: function(t) {
			if (this.Ol && this.Pl) return this.Ql(t);
			t = t || event;
			var e = t.target || t.srcElement,
				i = !1;
			if ("TD" != e.tagName && "TABLE" != e.tagName) {
				var s = e.className || "",
					n = -1 != s.indexOf("webix_cell");
				if (!n || !this.config.drag) {
					var r = -1 != s.indexOf("webix_hcell");
					if (this.Ol = !1, n || r) {
						var a = e.offsetWidth,
							h = e.offsetHeight,
							o = webix.html.posRelative(t);
						n && this.s.resizeRow && (o.y < 3 ? (this.Ol = ["y", 0, e], i = "n-resize") : h - o.y < 4 && (this.Ol = ["y", h, e], i = "n-resize")), this.s.resizeColumn && (o.x < 3 ? (this.Ol = ["x", 0, e], i = "e-resize") : a - o.x < 4 && (this.Ol = ["x", a, e], i = "e-resize"))
					}
					this.Tl && window.clearTimeout(this.Tl), this.Tl = webix.delay(this.Ul, this, [i], i ? 100 : 0)
				}
			}
		},
		Ul: function(t) {
			this.Vl != t && (this.Vl = t, this.x.style.cursor = t || "default")
		}
	}), webix.extend(webix.ui.datatable, webix.PagingAbility), webix.csv = {
		escape: !0,
		delimiter: {
			rows: "\n",
			cols: "	"
		},
		parse: function(t, e) {
			if (e = e || this.delimiter, !this.escape) return this.Wl(t, e);
			for (var i = t.replace(/\n$/, "").split(e.rows), s = 0; s < i.length - 1;) this.Xl(i[s], '"') % 2 === 1 && (i[s] += e.rows + i[s + 1], delete i[s + 1], s++), s++;
			var n = [];
			for (s = 0; s < i.length; s++)
				if ("undefined" != typeof i[s]) {
					for (var r = i[s].split(e.cols), a = 0; a < r.length; a++) 0 === r[a].indexOf('"') && (r[a] = r[a].substr(1, r[a].length - 2)), r[a] = r[a].replace('""', '"');
					n.push(r)
				}
			return n
		},
		Wl: function(t, e) {
			for (var i = t.split(e.rows), s = 0; s < i.length; s++) i[s] = i[s].split(e.cols);
			return i
		},
		Xl: function(t, e) {
			var i = t.split(e);
			return i.length - 1
		},
		stringify: function(t, e) {
			if (e = e || this.delimiter, !this.escape) {
				for (var i = 0; i < t.length; i++) t[i] = t[i].join(e.cols);
				return t.join(e.rows)
			}
			for (var s = /\n|\"|;|,/, i = 0; i < t.length; i++) {
				for (var n = 0; n < t[i].length; n++) s.test(t[i][n]) && (t[i][n] = t[i][n].replace(/"/g, '""'), t[i][n] = '"' + t[i][n] + '"');
				t[i] = t[i].join(e.cols)
			}
			return t = t.join(e.rows)
		}
	}, webix.TablePaste = {
		clipboard_setter: function(t) {
			return (t === !0 || 1 === t) && (this.s.clipboard = "block"), webix.clipbuffer.init(), this.attachEvent("onSelectChange", this.Yl), this.attachEvent("onItemClick", function() {
				document.activeElement && this.$view.contains(document.activeElement) || (webix.clipbuffer.focus(), webix.UIManager.setFocus(this))
			}), this.attachEvent("onPaste", this.Zl), t
		},
		Yl: function() {
			if (!this.getEditor || !this.getEditor()) {
				var t = this.$l();
				webix.clipbuffer.set(t), webix.UIManager.setFocus(this)
			}
		},
		$l: function() {
			var t = [];
			return this.mapSelection(function(e, i, s, n) {
				return t[n] || (t[n] = []), t[n].push(e), e
			}), webix.csv.stringify(t, this.s.delimiter)
		},
		Zl: function(t) {
			if (!webix.isUndefined(this.rh[this.s.clipboard])) {
				var e = webix.csv.parse(t, this.s.delimiter);
				this.rh[this.s.clipboard].call(this, e)
			}
		},
		rh: {
			block: function(t) {
				var e = this.mapSelection(null);
				e && (this.mapCells(e.row, e.column, t.length, null, function(e, i, s, n, r) {
					return t[n] && t[n].length > r ? t[n][r] : e
				}), this.render())
			},
			selection: function(t) {
				this.mapSelection(function(e, i, s, n, r) {
					return t[n] && t[n].length > r ? t[n][r] : e
				}), this.render()
			},
			repeat: function(t) {
				this.mapSelection(function(e, i, s, n, r) {
					return i = t[n % t.length], e = i[r % i.length]
				}), this.render()
			},
			custom: function() {}
		}
	}, webix.extend(webix.ui.datatable, webix.TablePaste), webix.storage || (webix.storage = {}), webix.storage.local = {
		put: function(t, e) {
			t && window.JSON && window.localStorage && window.localStorage.setItem(t, window.JSON.stringify(e))
		},
		get: function(t) {
			if (t && window.JSON && window.localStorage) {
				var e = window.localStorage.getItem(t);
				return e ? webix.DataDriver.json.toObject(e) : null
			}
			return null
		},
		remove: function(t) {
			t && window.JSON && window.localStorage && window.localStorage.removeItem(t)
		},
		clear: function() {
			window.localStorage.clear()
		}
	}, webix.storage.session = {
		put: function(t, e) {
			t && window.JSON && window.sessionStorage && window.sessionStorage.setItem(t, window.JSON.stringify(e))
		},
		get: function(t) {
			if (t && window.JSON && window.sessionStorage) {
				var e = window.sessionStorage.getItem(t);
				return e ? webix.DataDriver.json.toObject(e) : null
			}
			return null
		},
		remove: function(t) {
			t && window.JSON && window.sessionStorage && window.sessionStorage.removeItem(t)
		},
		clear: function() {
			window.sessionStorage.clear()
		}
	}, webix.storage.cookie = {
		put: function(t, e, i, s) {
			t && window.JSON && (document.cookie = t + "=" + escape(window.JSON.stringify(e)) + (s && s instanceof Date ? ";expires=" + s.toUTCString() : "") + (i ? ";domain=" + i : "") + (webix.env.https ? ";secure" : ""))
		},
		_l: function(t) {
			for (var e = document.cookie.split(";"), i = "", s = "", n = "", r = !1, a = 0; a < e.length; a++) {
				if (i = e[a].split("="), s = i[0].replace(/^\s+|\s+$/g, ""), s == t) return r = !0, i.length > 1 && (n = unescape(i[1].replace(/^\s+|\s+$/g, ""))), n;
				i = null, s = ""
			}
			return null
		},
		get: function(t) {
			if (t && window.JSON) {
				var e = this._l(t);
				return e ? webix.DataDriver.json.toObject(unescape(e)) : null
			}
			return null
		},
		remove: function(t, e) {
			t && this._l(t) && (document.cookie = t + "=" + (e ? ";domain=" + e : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT")
		},
		clear: function(t) {
			for (var e = document.cookie.split(";"), i = 0; i < e.length; i++) document.cookie = /^[^=]+/.exec(e[i])[0] + "=" + (t ? ";domain=" + t : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT"
		}
	}, webix.DataState = {
		getState: function() {
			for (var t = this.config.columns.length, e = this.config.columns, i = {
					ids: [],
					size: [],
					select: this.getSelectedId(!0),
					scroll: this.getScrollState()
				}, s = 0; t > s; s++) i.ids.push(e[s].id), i.size.push(e[s].width);
			if (this.Nk && (i.sort = {
					id: this.Nk,
					dir: this.Ok
				}), this.ij) {
				var n = {},
					r = 0;
				for (var a in this.ij)
					if (!this.am[a]) {
						var h = this.ij[a];
						h[1].value = n[a] = h[2].getValue(h[0]), r = 1
					}
				r && (i.filter = n)
			}
			i.hidden = [];
			for (var a in this.am) i.hidden.push(a);
			return i
		},
		setState: function(t) {
			var e = this.config.columns;
			if (t) {
				if (this.Nk = null, this.blockEvent(), t.hidden) {
					for (var i = {}, s = 0; s < t.hidden.length; s++) i[t.hidden[s]] = !0, this.bm.length || this.hideColumn(t.hidden[s]);
					if (this.bm.length)
						for (var s = 0; s < this.bm.length; s++) {
							var n = this.bm[s];
							!!i[n] == !this.am[n] && this.hideColumn(n, !!i[n])
						}
				}
				if (t.ids) {
					for (var r = !1, a = this.config.columns, s = 0; s < a.length; s++) a[s].id != t.ids[s] && (r = !0);
					if (r) {
						for (var s = 0; s < t.ids.length; s++) a[s] = this.getColumnConfig(t.ids[s]) || a[s];
						this.refreshColumns()
					}
				}
				if (t.size)
					for (var h = Math.min(t.size.length, e.length), s = 0; h > s; s++) e[s] && e[s].width != t.size[s] && this.Xs(s, t.size[s], !0);
				if (t.filter)
					for (var o in this.ij) {
						var l = this.ij[o];
						l[2].setValue(l[0], "")
					}
				if (this.unblockEvent(), this.rk(!0), this.callEvent("onStructureUpdate", []), t.sort) {
					var c = e[this.getColumnIndex(t.sort.id)];
					c && this.zf(t.sort.id, t.sort.dir, c.sort)
				}
				if (t.filter) {
					for (var o in t.filter) {
						var u = t.filter[o];
						if (u && this.ij[o]) {
							var l = this.ij[o];
							l[2].setValue(l[0], u);
							var d = l[1].contentId;
							d && (this.hj[d].value = u)
						}
					}
					this.filterByAll()
				}
				if (t.select && this.select) {
					var f = t.select;
					this.unselect();
					for (var s = 0; s < f.length; s++)(!f[s].row || this.exists(f[s].row)) && this.hl(f[s], !0)
				}
				t.scroll && this.scrollTo(t.scroll.x, t.scroll.y)
			}
		}
	}, webix.extend(webix.ui.datatable, webix.DataState),
	function() {
		var t = webix.Touch = {
			config: {
				longTouchDelay: 1e3,
				scrollDelay: 150,
				gravity: 500,
				deltaStep: 30,
				speed: "0ms",
				finish: 1500,
				ellastic: !0
			},
			limit: function(e) {
				t.cm = e !== !1
			},
			disable: function() {
				t.Xf = !0
			},
			enable: function() {
				t.Xf = !1
			},
			$init: function() {
				t.$init = function() {}, webix.event(document.body, e.down, t.dm), webix.event(document.body, e.move, t.em), webix.event(document.body, e.up, t.fm), webix.event(document.body, "dragstart", function(t) {
					return webix.html.preventEvent(t)
				}), webix.event(document.body, "touchstart", function(e) {
					if (!t.Xf && !t.cm && webix.env.isSafari) {
						var i = e.srcElement.tagName.toLowerCase();
						return "input" == i || "textarea" == i || "select" == i || "label" == i ? !0 : (t.im = !0, webix.html.preventEvent(e))
					}
				}), t.Of(), t.jm = [null, null], t.$active = !0
			},
			Of: function() {
				t.km = t.lm = t.mm = t.bC = null, t.nm = t.om = t.pm = this.qm = null, t.rm = {
					sm: 0,
					tm: 0,
					um: 0
				}, t.vm && (webix.html.removeCss(t.vm, "webix_touch"), t.vm = null), window.clearTimeout(t.wm), t.xm = !0, t.ym = !0, t.zm = !0, t.Am || t.Pf()
			},
			fm: function(e) {
				if (t.km) {
					if (t.nm) {
						var i = t.Mf(t.om),
							s = i.e,
							n = i.f,
							r = t.config.finish,
							a = t.Bm(e, !0),
							h = webix.$$(t.om),
							o = h && h.$scroll ? h.$scroll.gravity : t.config.gravity;
						if (a.um) {
							var l = s + o * a.sm / a.um,
								c = n + o * a.tm / a.um,
								u = t.jm[0] ? t.Cm(l, !1, !1, t.pm.dx, t.pm.px) : s,
								d = t.jm[1] ? t.Cm(c, !1, !1, t.pm.dy, t.pm.py) : n,
								f = Math.max(Math.abs(u - s), Math.abs(d - n));
							150 > f && (r = r * f / 150), (u != s || d != n) && (r = Math.round(r * Math.max((u - s) / (l - s), (d - n) / (c - n))));
							var b = {
									e: u,
									f: d
								},
								h = webix.$$(t.om);
							h && h.adjustScroll && h.adjustScroll(b), r = Math.max(100, r), s != b.e || n != b.f ? (t.Nf(t.om, b.e, b.f, r + "ms"), t.Dm && t.Dm.Em(b.e, b.f, r + "ms"), t.Fm(b.e, b.f, r + "ms")) : t.Pf()
						} else t.Pf()
					} else if (!this.qm)
						if (t.zm && !t.ym) t.Gm("onSwipeX");
						else if (t.ym && !t.zm) t.Gm("onSwipeY");
					else if (webix.env.isSafari && t.im) {
						t.im = !1;
						var x = t.km.target;
						webix.delay(function() {
							var t = document.createEvent("MouseEvents");
							t.initEvent("click", !0, !0), x.dispatchEvent(t)
						})
					}
					t.Gm("onTouchEnd"), t.Of()
				}
			},
			em: function(e) {
				if (t.bC && t.km) {
					var i = t.Bm(e);
					if (t.Gm("onTouchMove"), t.nm) t.Hm(i);
					else if (t.ym = t.Im(i.Jm, "x", t.ym), t.zm = t.Im(i.Ei, "y", t.zm), t.nm) {
						var s = t.Km("onBeforeScroll", !0);
						if (s) {
							var n = {};
							s.callEvent("onBeforeScroll", [n]), n.update && (t.config.speed = n.speed, t.config.scale = n.scale)
						}
						t.Lm(i)
					}
					return webix.html.preventEvent(e)
				}
			},
			Hm: function() {
				if (t.om) {
					var e = t.Mf(t.om),
						i = (e.e, e.f, t.mm || t.km),
						s = webix.$$(t.om),
						n = s && s.$scroll ? s.$scroll.ellastic : t.config.ellastic;
					t.jm[0] && (e.e = t.Cm(e.e - i.x + t.lm.x, n, e.e, t.pm.dx, t.pm.px)), t.jm[1] && (e.f = t.Cm(e.f - i.y + t.lm.y, n, e.f, t.pm.dy, t.pm.py)), t.Nf(t.om, e.e, e.f, "0ms"), t.Dm && t.Dm.Em(e.e, e.f, "0ms"), t.Fm(e.e, e.f, "0ms")
				}
			},
			Fm: function(e, i, s) {
				var n = t.pm.px / t.pm.dx * -e,
					r = t.pm.py / t.pm.dy * -i;
				t.jm[0] && t.Nf(t.jm[0], n, 0, s), t.jm[1] && t.Nf(t.jm[1], 0, r, s)
			},
			scrollTo: function(e, i, s, n) {
				t.Nf(e, i, s, n)
			},
			Nf: function(e, i, s, n) {
				if (!t.tt && window.setAnimationFrame && window.setAnimationFrame(function() {
						return t.tt = !0, t.Nf(e, i, s, n)
					}), t.tt = null, t.Am = !0, e) {
					var r = t.config.translate || webix.env.translate;
					e.style[webix.env.transform] = r + "(" + Math.round(i) + "px, " + Math.round(s) + "px" + ("translate3d" == r ? ", 0" : "") + ")", e.style[webix.env.transitionDuration] = n
				}
			},
			Mf: function(e) {
				var i, s = window.getComputedStyle(e)[webix.env.transform];
				if ("none" == s) i = {
					e: 0,
					f: 0
				};
				else if (window.WebKitCSSMatrix) i = new WebKitCSSMatrix(s);
				else if (window.MSCSSMatrix) i = new MSCSSMatrix(s);
				else {
					var n = s.replace(/(matrix\()(.*)(\))/gi, "$2");
					n = n.replace(/\s/gi, ""), n = n.split(",");
					for (var i = {}, r = ["a", "b", "c", "d", "e", "f"], a = 0; a < r.length; a++) i[r[a]] = parseInt(n[a], 10)
				}
				return t.Dm && t.Dm.Mm(i), i
			},
			Cm: function(t, e, i, s, n) {
				if (t === i) return t;
				var r = Math.abs(t - i),
					a = r / (t - i);
				if (t > 0) return e ? i + a * Math.sqrt(r) : 0;
				var h = s - n;
				return 0 > h + t ? e ? i - Math.sqrt(-(t - i)) : -h : t
			},
			Nm: function(e) {
				if (!e.scroll_enabled) {
					e.scroll_enabled = !0, e.parentNode.style.position = "relative";
					var i = webix.env.cssPrefix;
					e.style.cssText += i + "transition: " + i + "transform; " + i + "user-select:none; " + i + "transform-style:flat;", e.addEventListener(webix.env.transitionEnd, t.Pf, !1)
				}
			},
			Lm: function() {
				-1 != t.nm.indexOf("x") && (t.jm[0] = t.Om("x", t.pm.dx, t.pm.px, "width")), -1 != t.nm.indexOf("y") && (t.jm[1] = t.Om("y", t.pm.dy, t.pm.py, "height")), t.Nm(t.om), window.setTimeout(t.Hm, 1)
			},
			Om: function(e, i, s, n) {
				if (2 > i - s) {
					var r = t.Mf(t.om),
						a = "y" == e ? r.e : 0,
						h = "y" == e ? 0 : r.f;
					return t.Dm || t.Nf(t.om, a, h, "0ms"), t.nm = t.nm.replace(e, ""), ""
				}
				var o = webix.html.create("DIV", {
					"class": "webix_scroll_" + e
				}, "");
				return o.style[n] = Math.max(s * s / i - 7, 10) + "px", t.om.parentNode.appendChild(o), o
			},
			Im: function(e, i, s) {
				return e > t.config.deltaStep ? (t.xm && (t.Pm(i), t.pk(i), -1 == (t.nm || "").indexOf(i) && (t.nm = "")), !1) : s
			},
			Pf: function() {
				var e, i, s;
				s = webix.$$(t.om || this), s && (t.om ? e = t.Mf(t.om) : s.getScrollState && (i = s.getScrollState(), e = {
					e: i.x,
					f: i.y
				}), webix.callEvent("onAfterScroll", [e]), s.callEvent && s.callEvent("onAfterScroll", [e])), t.nm || (webix.html.remove(t.jm), t.jm = [null, null]), t.Am = !1
			},
			Pm: function() {
				window.clearTimeout(t.wm), t.xm = !1
			},
			Qm: function(e) {
				return t.jm[0] || t.jm[1] ? void t.Rm(e, t.jm[0] ? "x" : "y") : !0
			},
			dm: function(i) {
				var s = i.target || event.srcElement;
				if (!(t.Xf || s.tagName && "textarea" == s.tagName.toLowerCase() && s.offsetHeight < s.scrollHeight)) {
					t.qm = null, t.bC = t.km = e.context(i);
					var n = webix.$$(i);
					!t.cm || t.Sm() || n && n.$touchCapture || (t.bC = null), t.Gm("onTouchStart"), t.Qm(i) && (t.wm = window.setTimeout(t.Tm, t.config.longTouchDelay)), !n || !n.touchable || s.className && 0 === s.className.indexOf("webix_view") || (t.vm = n.getNode(i), webix.html.addCss(t.vm, "webix_touch"))
				}
			},
			Tm: function() {
				t.km && (t.Gm("onLongTouch"), webix.callEvent("onClick", [t.km]), t.qm = !0)
			},
			Rm: function(i, s) {
				t.pk(s);
				var n = t.jm[0] || t.jm[1];
				if (n) {
					var r = t.Km("onBeforeScroll", !0);
					r && r.callEvent("onBeforeScroll", [t.km, t.lm])
				}!n || t.om && n.parentNode == t.om.parentNode || (t.Of(), t.Pf(), t.km = e.context(i)), t.em(i)
			},
			Bm: function(i) {
				return t.mm = t.lm, t.lm = e.context(i), t.rm.Jm = Math.abs(t.km.x - t.lm.x), t.rm.Ei = Math.abs(t.km.y - t.lm.y), t.mm && (t.lm.time - t.mm.time < t.config.scrollDelay ? (t.rm.sm = t.rm.sm / 1.3 + t.lm.x - t.mm.x, t.rm.tm = t.rm.tm / 1.3 + t.lm.y - t.mm.y) : t.rm.tm = t.rm.sm = 0, t.rm.um = t.rm.um / 1.3 + (t.lm.time - t.mm.time)), t.rm
			},
			Um: function(e) {
				t.pm = {
					dx: e.offsetWidth,
					dy: e.offsetHeight,
					px: e.parentNode.offsetWidth,
					py: e.parentNode.offsetHeight
				}
			},
			Sm: function(e) {
				var i = t.km.target;
				if (!webix.env.touch && !webix.env.transition && !webix.env.transform) return null;
				for (; i && "BODY" != i.tagName;) {
					if (i.getAttribute) {
						var s = i.getAttribute("touch_scroll");
						if (s && (!e || -1 != s.indexOf(e))) return [i, s]
					}
					i = i.parentNode
				}
				return null
			},
			pk: function(e) {
				var i = this.Sm(e);
				return i && (t.nm = i[1], t.om = i[0], t.Um(i[0])), i
			},
			Gm: function(e) {
				webix.callEvent(e, [t.km, t.lm]);
				var i = t.Km(e);
				i && i.callEvent(e, [t.km, t.lm])
			},
			Km: function(e, i) {
				var s = webix.$$(i ? t.om : t.km);
				if (!s) return null;
				for (; s;) {
					if (s.hasEvent && s.hasEvent(e)) return s;
					s = s.getParentView()
				}
				return null
			},
			gm: function(e) {
				if (!e.touches[0]) {
					var i = t.lm;
					return i.time = new Date, i
				}
				return {
					target: e.target,
					x: e.touches[0].pageX,
					y: e.touches[0].pageY,
					time: new Date
				}
			},
			hm: function(t) {
				return {
					target: t.target || t.srcElement,
					x: t.pageX,
					y: t.pageY,
					time: new Date
				}
			}
		};
		webix.ready(function() {
			webix.env.touch && (t.$init(), -1 == document.body.className.indexOf("webix_full_screen") && t.limit(!0), window.MSCSSMatrix && webix.html.addStyle(".webix_view{ -ms-touch-action: none; }"))
		});
		var e = webix.env.mouse = {
			down: "mousedown",
			up: "mouseup",
			move: "mousemove",
			context: t.hm
		};
		window.navigator.pointerEnabled ? (e.down = "pointerdown", e.move = "pointermove", e.up = "pointerup") : window.navigator.msPointerEnabled ? (e.down = "MSPointerDown", e.move = "MSPointerMove", e.up = "MSPointerUp") : webix.env.touch && (e.down = "touchstart", e.move = "touchmove", e.up = "touchend", e.context = t.gm)
	}(), webix.attachEvent("onDataTable", function(t, e) {
		webix.env.touch && (webix.Touch.$init(), e.scrollSize = 0, webix.extend(t, e.prerender === !0 ? t.Vm : t.Wm), webix.Touch.Xf && webix.Touch.limit(), t.defaults.scrollAlignY = !1, t.Vf.setAttribute("touch_scroll", "xy"), t.$ready.push(function() {
			var t = "",
				e = this.s;
			e.autowidth || e.scrollX === !1 || (t += "x"), e.autoheight || e.scrollY === !1 || (t += "y"), this.Vf.setAttribute("touch_scroll", t)
		}), webix.Touch.Nm(t.Vf.childNodes[1].firstChild), webix.Touch.Nf(t.Vf.childNodes[1].firstChild, 0, 0, "0ms"), t.Em(0, 0, "0ms"))
	}), webix.extend(webix.ui.datatable, {
		Vm: {
			$j: function(t, e) {
				webix.Touch.Nf(this.Vf.childNodes[1].firstChild, 0, 0, "0ms"), this.Em(t, e, "0ms")
			},
			_j: function() {
				var t = webix.Touch.Mf(this.Vf.childNodes[1].firstChild);
				return {
					x: -t.e,
					y: -t.f
				}
			},
			$init: function() {
				this.attachEvent("onBeforeScroll", function() {
					webix.Touch.om = this.Vf.childNodes[1].firstChild, webix.Touch.Um(webix.Touch.om), webix.Touch.Dm = this
				}), this.attachEvent("onTouchEnd", function() {
					webix.Touch.Dm = null
				})
			},
			Em: function(t, e, i) {
				this.s.leftSplit && webix.Touch.Nf(this.Vf.childNodes[0].firstChild, 0, e, i), this.s.rightSplit && webix.Touch.Nf(this.Vf.childNodes[2].firstChild, 0, e, i), this.s.header && webix.Touch.Nf(this.I.childNodes[1].firstChild, t, 0, i), this.s.footer && webix.Touch.Nf(this.cj.childNodes[1].firstChild, t, 0, i), this.callEvent("onSyncScroll", [t, e, i])
			},
			Mm: function() {}
		},
		Wm: {
			$j: function(t, e) {
				webix.delay(function() {
					this.callEvent("onAfterScroll", [{
						e: -t,
						f: -e
					}])
				}, this)
			},
			$scroll: {
				gravity: 0,
				elastic: !1
			},
			$init: function() {
				this.attachEvent("onBeforeScroll", function() {
					var t = webix.Touch;
					t.om = this.Vf.childNodes[1].firstChild, t.Um(t.om), t.pm.dy = this.wj, t.Dm = this
				}), this.attachEvent("onAfterScroll", function(t) {
					if (t) {
						var e = this.bk != -t.e,
							i = this.jk != -t.f;
						webix.Touch.Dm = null, webix.Touch.$m = null, this.jk = 0;
						var s = webix.Touch.config.translate;
						return webix.Touch.config.translate = "translate", this.Em(t.e, 0, "0ms"), webix.Touch.config.translate = s, this.bk = -t.e, this.jk = -t.f, this.render(), e && this.callEvent("onScrollX", []), i && this.callEvent("onScrollY", []), !1
					}
				})
			},
			Em: function(t, e, i) {
				e += this.jk, webix.Touch.Nf(this.Vf.childNodes[1].firstChild, t, e, i), this.s.leftSplit && webix.Touch.Nf(this.Vf.childNodes[0].firstChild, 0, e, i), this.s.rightSplit && webix.Touch.Nf(this.Vf.childNodes[2].firstChild, 0, e, i), this.s.header && webix.Touch.Nf(this.I.childNodes[1].firstChild, t, 0, i), this.s.footer && webix.Touch.Nf(this.cj.childNodes[1].firstChild, t, 0, i), this.callEvent("onSyncScroll", [t, e, i])
			},
			Mm: function(t) {
				t.f -= this.jk
			}
		}
	}), webix.extend(webix.ui.datatable, {
		$init: function() {
			this.data.attachEvent("onStoreUpdated", webix.bind(function(t) {
				t || this._m()
			}, this)), this.attachEvent("onStructureLoad", this._m), this.attachEvent("onStructureUpdate", this.an), this.attachEvent("onColumnResize", function(t, e, i, s) {
				s && this.an()
			}), this.attachEvent("onResize", this.an)
		},
		_m: function() {
			if (this.count()) {
				for (var t = !1, e = this.fj, i = 0; i < e.length; i++) e[i].adjust && (t = this.bn(i, e[i].adjust, !0) || t);
				t && this.rk(!0)
			}
		},
		an: function() {
			var t = this.s.columns,
				e = [],
				i = 0;
			if (t && !this.s.autowidth)
				for (var s = 0; s < t.length; s++) {
					var n = t[s].fillspace;
					n && (e[s] = n, i += 1 * n || 1)
				}
			i && this.cn(e, i)
		},
		cn: function(t, e) {
			var i = this.s.columns;
			if (i) {
				var s = this.bc - this.oj,
					n = !1;
				if (s > 0) {
					for (var r = 0; r < i.length; r++) t[r] || (s -= i[r].width || this.config.columnWidth);
					for (var r = 0; r < t.length; r++)
						if (t[r]) {
							var a = Math.min(s, Math.round(s * t[r] / e));
							n = this.Xs(r, a, !0) || n, s -= i[r].width, e -= t[r]
						}
					n && this.rk(!0)
				}
			}
		},
		dn: function(t, e) {
			var i = webix.html.create("DIV", {
				"class": "webix_view webix_table_cell webix_measure_size webix_cell"
			}, "");
			i.style.cssText = "width:1px; visibility:hidden; position:absolute; top:0px; left:0px; overflow:hidden;", document.body.appendChild(i);
			var s = this.s.columns[t],
				n = -1 / 0;
			if ("header" != e && this.data.each(function(t) {
					if (t) {
						var e = this.Ek(t, s, 0);
						i.innerHTML = e, n = Math.max(i.scrollWidth, n)
					}
				}, this), e && "data" != e)
				for (var r = 0; r < s.header.length; r++) {
					var a = s.header[r];
					a && (i.innerHTML = a.text, n = Math.max(i.scrollWidth, n))
				}
			return i = webix.html.remove(i), n + 1 + (webix.env.isIE ? webix.skin.$active.layoutPadding.space : 0)
		},
		bn: function(t, e, i) {
			if (t >= 0) {
				var s = this.dn(t, e);
				return this.Xs(t, s, i)
			}
		},
		adjustColumn: function(t, e) {
			this.bn(this.getColumnIndex(t), e)
		},
		adjustRowHeight: function(t, e) {
			var i, s = this.getColumnConfig(t),
				n = (this.data.count(), webix.html.create("DIV", {
					"class": "webix_table_cell webix_measure_size webix_cell"
				}, ""));
			n.style.cssText = "width:" + s.width + "px; height:1px; visibility:hidden; position:absolute; top:0px; left:0px; overflow:hidden;", this.$view.appendChild(n), n.offsetHeight < 1 && (i = this.$view.cloneNode(!0), document.body.appendChild(i), i.appendChild(n)), this.data.each(function(t) {
				t && (n.innerHTML = this.Ek(t, s, 0), t.$height = Math.max(n.scrollHeight, this.s.rowHeight))
			}, this), n = webix.html.remove(n), i && webix.html.remove(i), e || this.refresh()
		}
	}), webix.extend(webix.ui.datatable, {
		math_setter: function(t) {
			return t && this.en(), t
		},
		fn: "$",
		en: function() {
			webix.env.strict || (this.data.attachEvent("onStoreUpdated", webix.bind(this.gn, this)), this.data.attachEvent("onStoreLoad", webix.bind(this.hn, this)), this.attachEvent("onStructureLoad", this.hn))
		},
		gn: function(t, e, i) {
			if (t && "delete" != i && "paint" != i) {
				"add" == i && this.pn(e);
				for (var s = 0; s < this.fj.length; s++) this.jn(t, this.fj[s].id, "add" !== i);
				this.kn = {}
			}
		},
		jn: function(t, e, i) {
			var s, n = this.getItem(t);
			if (i === !0 ? s = n[this.fn + e] || n[e] : (s = n[e], this.kn = {}), "undefined" != typeof s && null !== s && (s.length > 0 && "=" === s.substr(0, 1) ? (("undefined" == typeof n[this.fn + e] || i !== !0) && (n[this.fn + e] = n[e]), n[e] = this.ln(s, t, e)) : ("undefined" != typeof n[this.fn + e] && delete n[this.fn + e], this.mn(t, e)), "undefined" != typeof n.depends && "undefined" != typeof n.depends[e]))
				for (var r in n.depends[e]) {
					var a = n.depends[e][r][0] + "__" + n.depends[e][r][1];
					"undefined" == typeof this.kn[a] && (this.kn[a] = !0, this.jn(n.depends[e][r][0], n.depends[e][r][1], !0))
				}
		},
		nn: function(t, e) {
			var i = this.getItem(t);
			"undefined" != typeof i[this.fn + e] && (i[e] = i[this.fn + e])
		},
		hn: function() {
			if (this.fj && this.count()) {
				this.pn();
				for (var t = 0; t < this.fj.length; t++) {
					var e = this.columnId(t);
					this.data.each(function(t) {
						this.jn(t.id, e)
					}, this)
				}
				this.kn = {}
			}
		},
		pn: function(t) {
			for (var e = 0; e < this.fj.length; e++)
				if (this.fj[e].math) {
					var i = this.columnId(e),
						s = "=" + this.fj[e].math;
					s = s.replace(/\$r/g, "#$r#"), s = s.replace(/\$c/g, "#$c#"), t ? t[i] = this.qn(s, t.id, i) : this.data.each(function(t) {
						t[i] = this.qn(s, t.id, i)
					}, this)
				}
		},
		qn: function(t, e, i) {
			return webix.template(t)({
				$r: e,
				$c: i
			})
		},
		rn: function(t, e) {
			var i;
			if (!this.exists(t)) return "#out_of_range";
			i = this.getItem(t);
			var s = i[this.fn + e] || i[e] || 0;
			return s = s.toString(), "=" !== s.substring(0, 1) ? s : ("undefined" == typeof i[this.fn + e] && (i[this.fn + e] = i[e]), i[e] = this.ln(s, t, e, !0), i[e])
		},
		ln: function(t, e, i, s) {
			if (s === !0) {
				if (this.sn(e, i)) return "#selfreference"
			} else this.tn();
			this.un(e, i);
			this.getItem(e);
			t = t.substring(1);
			var n = this.vn(t),
				r = this.wn(t);
			n ? (t = this.xn(t, r), t = this.yn(t, n)) : t = this.xn(t, r, !0);
			var a = this.zn(t);
			if (a !== !1) return a;
			this.An(e, i), this.mn(e, i);
			for (var h = 0; h < r.length; h++) this.Bn([e, i], r[h]);
			var a = this.zn(t);
			if (a !== !1) return a;
			if (!t) return t;
			t = this.Cn(t);
			var a = this.zn(t);
			return a !== !1 ? a : t
		},
		vn: function(t) {
			var e = /(\+|\-|\*|\/)/g,
				i = t.replace(/\[[^)]*?\]/g, "").match(e);
			return i
		},
		wn: function(t) {
			var e = /\[([^\]]+),([^\]]+)\]/g,
				i = t.match(e);
			null === i && (i = []);
			for (var s = 0; s < i.length; s++) {
				var n = i[s],
					r = n;
				n = n.substr(1, n.length - 2), n = n.split(","), n[0] = this.Dn(n[0]), n[1] = this.Dn(n[1]), ":" === n[0].substr(0, 1) && (n[0] = this.getIdByIndex(n[0].substr(1))), ":" === n[1].substr(0, 1) && (n[1] = this.columnId(n[1].substr(1))), n[2] = r, i[s] = n
			}
			return i
		},
		xn: function(t, e, i) {
			var s = "(",
				n = ")";
			i && (s = n = "");
			for (var r = 0; r < e.length; r++) {
				var a = e[r],
					h = this.rn(a[0], a[1]);
				isNaN(h) && (h = '"' + h + '"'), t = t.replace(a[2], s + h + n)
			}
			return t
		},
		yn: function(t, e) {
			for (var i = [], s = 0; s < e.length; s++) {
				var n = e[s],
					r = this.En(t, n);
				i.push(r[0]), t = r[1]
			}
			i.push(t);
			for (var s = 0; s < i.length; s++) {
				var a = this.Dn(i[s]);
				i[s] = a
			}
			for (var h = "", s = 0; s < i.length - 1; s++) h += i[s] + e[s];
			return h += i[i.length - 1]
		},
		Cn: function(expr) {
			try {
				webix.temp_value = "", expr = "webix.temp_value = " + expr, eval(expr)
			} catch (ex) {
				webix.temp_value = ""
			}
			var result = webix.temp_value;
			return webix.temp_value = null, result.toString()
		},
		En: function(t, e) {
			var i = t.indexOf(e),
				s = t.substr(0, i),
				n = t.substr(i + 1);
			return [s, n]
		},
		Dn: function(t) {
			return t = t.replace(/^ */g, ""), t = t.replace(/ *$/g, "")
		},
		tn: function() {
			this.Fn = []
		},
		un: function(t, e) {
			this.Fn[t + "__" + e] = !0
		},
		An: function(t, e) {
			"undefined" != typeof this.Fn[t + "__" + e] && delete this.Fn[t + "__" + e]
		},
		sn: function(t, e) {
			return "undefined" != typeof this.Fn[t + "__" + e] ? !0 : !1
		},
		Bn: function(t, e) {
			var i = this.getItem(e[0]);
			"undefined" == typeof i.depends && (i.depends = {}), "undefined" == typeof i.depends[e[1]] && (i.depends[e[1]] = {}), i.depends[e[1]][t[0] + "__" + t[1]] = t, i = this.getItem(t[0]), "undefined" == typeof i.triggers && (i.triggers = {}), "undefined" == typeof i.triggers[t[1]] && (i.triggers[t[1]] = {}), i.triggers[t[1]][e[0] + "__" + e[1]] = e
		},
		mn: function(t, e) {
			if (this.exists(t, e)) {
				var i = this.getItem(t, e);
				if ("undefined" != typeof i.triggers)
					for (var s in i.triggers[e]) {
						var n = i.triggers[e][s];
						delete this.getItem(n[0]).depends[n[1]][t + "__" + e]
					}
			}
		},
		zn: function(t) {
			var e = /#\w+/,
				i = t.match(e);
			return null !== i && i.length > 0 ? i[0] : !1
		}
	}), webix.extend(webix.ui.datatable, {
		ii: function(t) {
			return this.getColumnConfig(t.column).editor
		},
		getEditor: function(t, e) {
			return t ? (1 == arguments.length && (e = t.column, t = t.row), (this.ai[t] || {})[e]) : this.di
		},
		si: function(t) {
			for (var e in this.ai) {
				var i = this.ai[e];
				for (var s in i) "$count" != s && t.call(this, i[s])
			}
		},
		ji: function(t, e, i) {
			var s = t.row,
				n = t.column,
				r = e.config = this.getColumnConfig(n);
			i !== !1 && this.showCell(s, n);
			var a = e.render();
			e.$inline && (a = this.mi(t)), e.node = a;
			var h, o = this.getItem(s),
				l = r.editFormat;
			if (this.s.editMath && (h = o["$" + n]), h = h || o[n], webix.isUndefined(h) && (h = ""), e.setValue(l ? l(h) : h, o), e.value = o[n], this.ni(t, e), e.$inline || this.oi(t, a, !0), e.afterRender && e.afterRender(), this.s.liveValidation) {
				var c = "webix_keyup_edit_" + this.s.id + "_" + s + "_" + n;
				webix.event(e.node, "keyup", this.Gn(t, this), {
					id: c
				}), this.validateEditor(t)
			}
			return a
		},
		Gn: function(t, e) {
			return function() {
				e.validateEditor(t)
			}
		},
		ti: function(t, e) {
			var i = this.getColumnConfig(t.column).editParse,
				s = this.getItem(t.row);
			return s[t.column] = i ? i(e) : e, this.s.editMath && delete s["$" + t.column], t.row
		},
		ni: function(t, e) {
			var i = this.ai[t.row] = this.ai[t.row] || {};
			i.$count = (i.$count || 0) + 1, e.row = t.row, e.column = t.column, this.di = i[t.column] = e, this.Eb++, this.Hn = this.getScrollState()
		},
		qi: function(t) {
			this.di == t && (this.di = 0), t.destroy && t.destroy();
			var e = this.ai[t.row];
			delete e[t.column], e.$count--, e.$count || delete this.ai[t.row], this.Eb--
		},
		ei: function(t, e) {
			var i = this.ai[t];
			if (i) {
				this.ai[e] = i, delete this.ai[t];
				for (var s in i) i[s].row = e
			}
		},
		pi: function(t) {
			var e = this.getColumnConfig(t.column);
			if (e && e.node && e.attached) {
				var i = this.getIndexById(t.row);
				if (i >= e.qk && i < e.Kk) return e.node.childNodes[i - e.qk]
			}
			return 0
		},
		editCell: function(t, e, i, s) {
			return e = e || this.s.columns[0].id, webix.EditAbility.edit.call(this, {
				row: t,
				column: e
			}, i, s)
		},
		editRow: function(t) {
			t && t.row && (t = t.row);
			var e = !1;
			this.eachColumn(function(i) {
				this.edit({
					row: t,
					column: i
				}, e, !e), e = !0
			})
		},
		editColumn: function(t) {
			t && t.column && (t = t.column);
			var e = !1;
			this.eachRow(function(i) {
				this.edit({
					row: i,
					column: t
				}, e, !e), e = !0
			})
		},
		eachRow: function(t, e) {
			var i = this.data.order;
			e && (i = this.data.jf || i);
			for (var s = 0; s < i.length; s++) t.call(this, i[s])
		},
		eachColumn: function(t, e) {
			for (var i in this.Aj) {
				var s = this.Aj[i];
				t.call(this, s.id, s)
			}
			if (e)
				for (var i in this.am) {
					var s = this.am[i];
					t.call(this, s.id, s)
				}
		},
		vi: function(t) {
			if (this.getSelectedId) {
				var e = this.getSelectedId(!0);
				if (1 == e.length) return this.hl(t), !1
			}
		},
		Gb: function(t, e) {
			if (this.s.editable && !this.Eb) {
				if (e.target && "INPUT" == e.target.tagName) return !0;
				var i = this.getSelectedId(!0);
				if (1 == i.length) return this.editNext(t, i[0]), !1
			}
			return !0
		},
		ui: function(t, e, i) {
			var s = this.getIndexById(t.row),
				n = this.getColumnIndex(t.column),
				r = this.data.order,
				a = this.fj;
			if (i)
				for (var h = s; h < r.length; h++) {
					for (var o = n + 1; o < a.length; o++) {
						var l = {
							row: r[h],
							column: a[o].id
						};
						if (e.call(this, l)) return l
					}
					n = -1
				} else
					for (var h = s; h >= 0; h--) {
						for (var o = n - 1; o >= 0; o--) {
							var l = {
								row: r[h],
								column: a[o].id
							};
							if (e.call(this, l)) return l
						}
						n = a.length
					}
			return null
		},
		In: function() {
			this.Eb && (this.Jn ? this.Jn = !1 : (this.Wj.scrollTo(this.getScrollState().y + this.Vf.childNodes[1].firstChild.scrollTop), this.Vf.childNodes[1].firstChild.scrollTop = 0, this.Jn = !0))
		},
		Kn: function() {
			this.Eb && this.Zj.scrollTo(this.Vf.childNodes[1].scrollLeft)
		},
		gi: function() {
			this.attachEvent("onScrollY", this.Ln), this.attachEvent("onScrollX", this.Ln), this.attachEvent("onScrollY", this.$s), this.attachEvent("onColumnResize", function() {
				this.editStop()
			}), this.attachEvent("onAfterFilter", function() {
				this.editStop()
			}), this.attachEvent("onRowResize", function() {
				this.editStop()
			}), this.Vf.childNodes[1].firstChild.onscroll = webix.bind(this.In, this), this.Vf.childNodes[1].onscroll = webix.bind(this.Kn, this)
		},
		Ln: function() {
			if (this.Eb) {
				var t = this.Hn;
				this.Hn = this.getScrollState();
				var e = this.Hn.y - t.y;
				this.si(function(t) {
					if (t.getPopup) {
						var i = this.getItemNode(t);
						t.getPopup().show(i ? i : {
							x: -1e4,
							y: -1e4
						})
					} else t.$inline || (t.node.top -= e, t.node.style.top = t.node.top + "px")
				})
			}
		}
	}), webix.extend(webix.ui.datatable, webix.EditAbility), webix.extend(webix.ui.datatable, {
		$init: function() {
			this.kz(), this.attachEvent("onStructureLoad", this.Nn)
		},
		kz: function() {
			this.am = {}, this.bm = webix.toArray(), this.Mn = [0, 0]
		},
		Nn: function() {
			var t = this.fj;
			this.xB(t);
			for (var e = t.length - 1; e >= 0; e--) t[e].hidden ? this.hideColumn(t[e].id, !0, !0) : t[e].batch && this.config.visibleBatch && t[e].batch != this.config.visibleBatch && this.hideColumn(t[e].id, !0, !0)
		},
		xB: function(t) {
			for (var e = 0; e < t.length; e++)
				for (var i = 0; i < t[e].header.length; i++) {
					var s = t[e].header[i];
					s && s.colspan && (s.$colspan = s.colspan)
				}
		},
		moveColumn: function(t, e) {
			var i = this.getColumnIndex(t);
			if (i != e) {
				var s = this.s.columns,
					n = s.splice(i, 1),
					r = e - (e > i ? 1 : 0);
				webix.PowerArray.insertAt.call(s, n[0], r), this.On()
			}
		},
		rz: function() {
			var t = this.bm,
				e = this.s.columns;
			if (!t.length) {
				for (var i = 0; i < e.length; i++) t[i] = e[i].id;
				this.Mn = [this.s.leftSplit, this.Fj]
			}
		},
		isColumnVisible: function(t) {
			return !this.am[t]
		},
		hideColumn: function(t, e, i) {
			var s, n = this.s.columns,
				r = this.bm,
				a = this.am;
			if (e !== !1) {
				var h = this.getColumnIndex(t);
				if (-1 === h || !this.callEvent("onBeforeColumnHide", [t])) return;
				if (-1 == h) return;
				this.rz(), h < this.s.leftSplit && this.s.leftSplit--, h >= this.Fj ? this.s.rightSplit-- : this.Fj--, this.vk(h), s = a[t] = n.splice(h, 1)[0], s.qk = -1, delete this.Aj[t], this.callEvent("onAfterColumnHide", [t])
			} else {
				if (s = a[t], !s || !this.callEvent("onBeforeColumnShow", [t])) return;
				for (var o = null, l = 0; l < r.length && r[l] != t; l++) a[r[l]] || (o = r[l]);
				var h = o ? this.getColumnIndex(o) + 1 : 0;
				webix.PowerArray.insertAt.call(n, s, h), delete s.hidden, l < this.Mn[0] && this.s.leftSplit++, l >= this.Mn[1] ? this.s.rightSplit++ : this.Fj++, delete a[t], this.Aj[t] = s, this.callEvent("onAfterColumnShow", [t])
			}
			this.xt(s, e !== !1 ? 0 : 1), i || this.On()
		},
		xt: function(t) {
			for (var e = t.header.length - 1; e >= 0; e--)
				for (var i, s = this.bm, n = !1, r = 0, a = 0; a < s.length; a++) {
					var t = this.getColumnConfig(s[a]),
						h = t.header[e];
					this.isColumnVisible(s[a]) ? (n && r > 0 && i && i.colspan > 0 ? (h = t.header[e] = i, i = h) : h && h.$colspan && 0 >= r && (r = h.colspan = h.$colspan, i = h), n = null) : (h && h.$colspan && 0 >= r && (r = h.colspan = h.$colspan, n = i = h), i && r > 0 && i.colspan--), r--
				}
		},
		refreshColumns: function(t, e) {
			(t && t != this.config.columns || e) && (this.kz(), this.ij = [], t && (this.Fj = t.length - (this.config.rightSplit || 0))), this.Aj = {};
			for (var i = 0; i < this.fj.length; i++) {
				var s = this.fj[i];
				this.Aj[s.id] = s, s.attached = s.node = null
			}
			for (var i = 0; 3 > i; i++) this.I.childNodes[i].innerHTML = "", this.Vf.childNodes[i].firstChild.innerHTML = "";
			this.fj = this.config.columns = t || this.config.columns, this.Fj = this.fj.length - this.s.rightSplit, this.tj = 0, this.rj(), this.callEvent("onStructureUpdate"), this.sk(), this.render()
		},
		On: function() {
			this.tj = 0, this.callEvent("onStructureUpdate"), this.uj(), this.render()
		},
		showColumn: function(t) {
			return this.hideColumn(t, !1)
		},
		showColumnBatch: function(t, e) {
			var i = "undefined" != typeof e;
			e = e !== !1, this.eachColumn(function(s, n) {
				if (n.batch) {
					var r = this.am[n.id];
					e || (r = !r), n.batch == t && r ? this.hideColumn(n.id, !e, !0) : i || n.batch == t || r || this.hideColumn(n.id, e, !0)
				}
			}, !0), this.On()
		}
	}), webix.extend(webix.ui.datatable, {
		moveSelection: function(t, e) {
			var i = this.getSelectedId(!0),
				s = i.length - 1;
			if (0 > s) {
				if ("down" == t || "right" == t) t = "top";
				else {
					if ("up" != t && "left" != t) return;
					t = "bottom"
				}
				s = 0, i = [{
					row: 1,
					column: 1
				}]
			}
			if (s >= 0) {
				var n = i[s].row,
					r = i[s].column,
					a = this.s.multiselect ? e : !1;
				if ("top" == t || "bottom" == t) {
					if (n && ("top" == t ? n = this.data.getFirstId() : "bottom" == t && (n = this.data.getLastId())), r) {
						var s = 0;
						"bottom" == t && (s = this.config.columns.length - 1), r = this.columnId(s)
					}
				} else if ("up" == t || "down" == t || "pgup" == t || "pgdown" == t) {
					if (n) {
						var s = this.getIndexById(n),
							h = "pgup" == t || "pgdown" == t ? Math.round(this.Vj / this.s.rowHeight) : 1;
						"up" == t || "pgup" == t ? s -= h : ("down" == t || "pgdown" == t) && (s += h), 0 > s && (s = 0), s >= this.data.order.length && (s = this.data.order.length - 1), n = this.getIdByIndex(s), !n && this.s.pager && this.showItemByIndex(s)
					}
				} else {
					if ("right" != t && "left" != t) return;
					if (r && "row" != this.config.select) {
						var s = this.getColumnIndex(r);
						if ("right" == t ? s++ : "left" == t && s--, 0 > s || s >= this.config.columns.length) return;
						r = this.columnId(s)
					} else {
						if (this.open && "right" == t) return this.open(n);
						if (this.close && "left" == t) return this.close(n)
					}
				}
				n && (this.showCell(n, r), this.hl({
					row: n,
					column: r
				}, a))
			}
			return !1
		}
	}), webix.extend(webix.ui.datatable, webix.KeysNavigation), webix.extend(webix.ui.datatable, webix.DataMove), webix.extend(webix.ui.datatable, {
		$dragHTML: function(t) {
			for (var e = this.bc - this.oj, i = "<div class='webix_dd_drag' style='width:" + (e - 2) + "px;'>", s = this.s.columns, n = 0; n < s.length; n++) {
				var r = this.Ek(t, s[n]);
				i += "<div style='width:" + s[n].width + "px;'>" + r + "</div>"
			}
			return i + "</div>"
		},
		getHeaderNode: function(t, e) {
			var i = this.getColumnIndex(t);
			e = e || 0;
			for (var s = this.I.childNodes[1].getElementsByTagName("TR")[e + 1].childNodes, n = 0; n < s.length; n++)
				if (s[n].getAttribute("column") == i) return s[n].firstChild;
			return null
		},
		getItemNode: function(t) {
			if (t && !t.header) {
				var e = t.row || t,
					i = this.getIndexById(e),
					s = this.Sj();
				if (i < s[0] && i > s[1]) return;
				var n = this.Xj(),
					r = this.s.leftSplit ? 0 : n[0];
				if (t.column && (r = this.getColumnIndex(t.column), r < this.Fj && r >= this.s.leftSplit && (r < n[0] || r > n[1]))) return;
				var a = this.s.columns[r];
				if (a.attached && a.node) return a.node.childNodes[i - s[0]]
			}
		},
		dragColumn_setter: function(t) {
			var e;
			"order" == t ? e = {
				$drag: webix.bind(function(t, i) {
					var s = this.locate(i);
					if (!s || !this.callEvent("onBeforeColumnDrag", [s.column, i])) return !1;
					webix.DragControl.Gd = {
						from: e,
						start: s,
						custom: "column_dnd"
					};
					var n = this.getColumnConfig(s.column);
					return this.Qn = webix.html.posRelative(i), this.Rn = n.width, "<div class='webix_dd_drag_column' style='width:" + n.width + "px'>" + (n.header[0].text || "&nbsp;") + "</div>"
				}, this),
				$dragPos: webix.bind(function(t, e, i) {
					var s = webix.DragControl.getContext(),
						n = webix.html.offset(this.$view);
					i.style.display = "none";
					var r = document.elementFromPoint(t.x, n.y + 1),
						a = r ? this.locate(r) : null,
						h = webix.DragControl.getContext().start.column;
					if (a && a.column != h && (!this.Sn || a.column != this.Yg) && "column_dnd" == s.custom && webix.$$(r) == this) {
						if (!this.callEvent("onBeforeColumnDropOrder", [h, a.column, e])) return;
						var o = this.getColumnIndex(h),
							l = this.getColumnIndex(a.column);
						e.touches && (this.wy = e.target, this.wy.style.display = "none", this.$view.parentNode.appendChild(this.wy)), this.moveColumn(h, l + (l > o ? 1 : 0)), this.Yg = a.column, this.Sn = !0
					}
					if (a && a.column == h && (this.Sn = !1), i.style.display = "block", t.x = t.x - this.Qn.x, t.y = n.y, t.x < n.x) t.x = n.x;
					else {
						var c = n.x + this.$view.offsetWidth - this.oj - this.Rn;
						t.x > c && (t.x = c)
					}
					webix.DragControl.Ed = !0
				}, this),
				$dragDestroy: webix.bind(function(t, e) {
					webix.html.remove(e), this.wy && webix.html.remove(this.wy);
					var i = webix.DragControl.getContext().start;
					this.callEvent("onAfterColumnDropOrder", [i.column, this.Yg, t])
				}, this)
			} : t && (e = {
				ah: !0,
				$drag: webix.bind(function(t, i) {
					var s = this.locate(i);
					if (!s || !this.callEvent("onBeforeColumnDrag", [s.column, i])) return !1;
					webix.DragControl.Gd = {
						from: e,
						start: s,
						custom: "column_dnd"
					};
					for (var n = this.getColumnConfig(s.column).header, r = "&nbsp;", a = 0; a < n.length; a++)
						if (n[a]) {
							r = n[a].text;
							break
						}
					return "<div class='webix_dd_drag_column'>" + r + "</div>"
				}, this),
				$drop: webix.bind(function(t, e, i) {
					var s = i;
					i.touches && this.Tn && (s = this.Tn);
					var n = this.locate(s);
					if (!n) return !1;
					var r = webix.DragControl.getContext().start.column;
					if (r != n.column) {
						if (!this.callEvent("onBeforeColumnDrop", [r, n.column, i])) return;
						var a = this.getColumnIndex(r),
							h = this.getColumnIndex(n.column);
						this.moveColumn(r, h + (h > a ? 1 : 0)), this.callEvent("onAfterColumnDrop", [r, n.column, i])
					}
				}, this),
				$dragIn: webix.bind(function(t, i, s) {
					var n = webix.DragControl.getContext();
					if ("column_dnd" != n.custom || n.from != e) return !1;
					for (var r = s.target || s.srcElement; - 1 == (r.className || "").indexOf("webix_hcell");)
						if (r = r.parentNode, !r) return;
					return r != this.Tn && (this.Tn && webix.html.removeCss(this.Tn, "webix_dd_over_column"), webix.html.addCss(r, "webix_dd_over_column")), this.Tn = r
				}, this),
				$dragDestroy: webix.bind(function(t, e) {
					this.Tn && webix.html.removeCss(this.Tn, "webix_dd_over_column"), webix.html.remove(e)
				}, this)
			}), t && (webix.DragControl.addDrag(this.I, e), webix.DragControl.addDrop(this.I, e, !0))
		}
	}), webix.extend(webix.ui.datatable, webix.DragItem), webix.extend(webix.ui.datatable, {
		Te: function(t, e) {
			this.Un(t);
			for (var i in e) this.addCellCss(t, i, "webix_invalid_cell");
			this.addCss(t, "webix_invalid")
		},
		Qe: function(t) {
			this.Un(t), this.removeCss(t, "webix_invalid")
		},
		Un: function(t) {
			var e = (this.getItem(t), this.data.getMark(t, "$cellCss"));
			if (e)
				for (var i in e) e[i] = e[i].replace("webix_invalid_cell", "").replace("  ", " ")
		},
		addRowCss: function(t, e, i) {
			this.addCss(t, e, i)
		},
		removeRowCss: function(t, e, i) {
			this.removeCss(t, e, i)
		},
		addCellCss: function(t, e, i, s) {
			var n = this.data.getMark(t, "$cellCss"),
				r = n || {},
				a = r[e] || "";
			r[e] = a.replace(i, "").replace("  ", " ") + " " + i, n || this.data.addMark(t, "$cellCss", !1, r, !0), s || this.refresh(t)
		},
		removeCellCss: function(t, e, i, s) {
			var n = this.data.getMark(t, "$cellCss");
			if (n) {
				var r = n[e] || "";
				r && (n[e] = r.replace(i, "").replace("  ", " ")), s || this.refresh(t)
			}
		}
	}), webix.extend(webix.ui.datatable, webix.ValidateCollection),
	function() {
		var t = webix.Sparklines = {
			paddingX: 6,
			radius: 2,
			paddingY: 6,
			template: function(e, i, s, n) {
				var r = webix.$$(n.node),
					a = n.width,
					h = r.config.rowHeight;
				return t.hC(s), t.iC(s, a, h)
			},
			hC: function(t) {
				for (var e = [], i = t.length - 1; i >= 0; i--) {
					var s = t[i];
					e[i] = "object" == typeof s ? s.value : s
				}
				return e
			},
			iC: function(e, i, s) {
				var n = t.jC.line(e, i, s),
					r = "<g>" + t.kC(n) + "</g>";
				return r += "<g>" + t.lC(n).join("") + "</g>", t.mC(r, i, s)
			},
			mC: function(t, e, i) {
				var s = '<div style="width:100%;height:100%" class="webix_sparklines">';
				return s += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="0 0 ' + e + " " + i + '">', s += t, s += "</svg></div>"
			},
			kC: function(e) {
				var i = t.nC(e);
				return '<path class="webix_sparklines_line" vector-effect="non-scaling-stroke" d="' + i + '"/>'
			},
			lC: function(e) {
				for (var i = [], s = "webix_sparklines_item", n = t.radius, r = 0; r < e.length; r++) i.push('<circle class="' + s + '" cx="' + e[r].x + '" cy="' + e[r].y + '" r="' + n + '"/>');
				return i
			},
			jC: {
				line: function(e, i, s) {
					var n = Math.min.apply(null, e),
						r = Math.max.apply(null, e),
						a = [],
						h = t.paddingX,
						o = t.paddingY;
					if (i = (i || 100) - 2 * h, s = (s || 100) - 2 * o, e.length)
						if (1 == e.length) a.push({
							x: i / 2 + h,
							y: s / 2 + h
						});
						else {
							var l = i / (e.length - 1),
								c = r - n,
								u = s / (c ? c : 1);
							c || (s /= 2);
							for (var d = 0; d < e.length; d++) a.push({
								x: Math.ceil(l * d) + h,
								y: s - Math.ceil(u * (e[d] - n)) + o
							})
						}
					return a
				}
			},
			nC: function(t, e) {
				for (var i = [], s = 0; s < t.length; s++) i.push(t[s].x + " " + t[s].y);
				return "M" + i.join(" L ") + (e ? " Z" : "")
			}
		}
	}(), webix.attachEvent("onDataTable", function(t) {
		t.type.sparklines = webix.template(webix.Sparklines.template)
	}), webix.TreeTableClick = {}, webix.TreeTablePaste = {
		insert: function(t) {
			for (var e = this.getSelectedId(!0, !0), i = 0; i < t.length; i++) {
				for (var s = {}, n = 0; n < this.s.columns.length; n++) s[this.s.columns[n].id] = t[i][n] || "";
				!webix.isUndefined(s.id) && this.exists(s.id) && (s.id = webix.uid()), this.add(s, null, e[0])
			}
		}
	}, webix.protoUI({
		name: "treetable",
		$init: function() {
			webix.extend(this.data, webix.TreeStore, !0), webix.extend(this.type, webix.TreeType), webix.extend(this, webix.TreeDataMove, !0);
			for (var t in webix.TreeClick) this.on_click[t] || (this.on_click[t] = this.Vn(webix.TreeClick[t]));
			this.type.treetable = webix.template("{common.space()}{common.icon()} {common.folder()}"), this.type.treecheckbox = function(t) {
				return t.indeterminate && !t.nocheckbox ? "<div class='webix_tree_checkbox webix_indeterminate'></div>" : webix.TreeType.checkbox.apply(this, arguments)
			}, this.data.provideApi(this, !0)
		},
		$exportView: function(t) {
			return webix.extend(t, {
				filterHTML: !0
			}), this
		},
		Xg: !1,
		Vn: function(t) {
			return function(e, i) {
				return i = i.row, t.call(this, e, i)
			}
		},
		getState: function() {
			var t = webix.DataState.getState.call(this);
			return webix.extend(t, webix.TreeAPI.getState.call(this)), t
		},
		setState: function(t) {
			webix.TreeAPI.setState.call(this, t) && webix.DataState.setState.call(this, t)
		},
		clipboard_setter: function(t) {
			return webix.extend(this.rh, webix.TreeTablePaste), webix.TablePaste.clipboard_setter.call(this, t)
		},
		Ik: function(t, e) {
			for (var i = 0; i < t.start; i++) {
				var s = this.data.order[i];
				s && 1 != this.getItem(s).$level && t.start--
			}
			return webix.ui.datatable.prototype.Ik.call(this, t, e)
		}
	}, webix.TreeAPI, webix.TreeStateCheckbox, webix.TreeDataLoader, webix.ui.datatable), webix.extend(webix.ui.datatable, {
		spans_setter: function(t) {
			return t && !this.Rt && this.Qt(), t
		},
		Qt: function() {
			this.Rt = {}, this.St = [], this.data.attachEvent("onStoreLoad", webix.bind(function(t, e) {
				e && e.spans && this.addSpan(e.spans)
			}, this)), this.data.attachEvent("onClearAll", webix.bind(function() {
				this.Rt = {}
			}, this)), this.attachEvent("onScrollY", this.Tt), this.attachEvent("onScrollX", this.Tt), this.data.attachEvent("onStoreUpdated", webix.bind(function(t, e, i) {
				"paint" != i && this.fj.length && this.Ut()
			}, this)), this.attachEvent("onStructureLoad", this.Ut), this.attachEvent("onStructureUpdate", this.Ut), this.attachEvent("onColumnResize", this.Ut), this.attachEvent("onRowResize", this.Ut), this.attachEvent("onSelectChange", this.Vt)
		},
		addSpan: function(t, e, i, s, n, r) {
			if ("object" != typeof t) s = s || 1, i = i || 1, this.Rt[t] || (this.Rt[t] = {}), this.Rt[t][e] = [i, s, n, r];
			else
				for (var a = 0; a < t.length; a++) this.addSpan.apply(this, t[a])
		},
		removeSpan: function(t, e) {
			arguments.length || (this.Rt = {});
			var i = this.Rt[t];
			i && delete i[e]
		},
		getSpan: function(t, e) {
			if (!t) return this.Rt;
			var i, s, n, r, a, e, t, h = this.Rt;
			i = this.getIndexById(t), n = this.getColumnIndex(e);
			for (t in h)
				for (e in h[t])
					if (a = h[t][e], s = this.getIndexById(t), r = this.getColumnIndex(e), !(i > s + a[1] - 1 || s > i || n > r + a[0] - 1 || r > n)) return [t, e].concat(a);
			return null
		},
		Ut: function() {
			webix.html.remove(this.St);
			for (var t = 0; 3 > t; t++) {
				var e = this.St[t] = webix.html.create("DIV", {
					"class": "webix_span_layer"
				});
				this.Vf.childNodes[t].appendChild(e)
			}
			this.attachEvent("onSyncScroll", function(t, e, i) {
				for (var s = 0; 3 > s; s++) webix.Touch.Nf(this.St[s], t, e, i)
			}), this.Tt(), this.s.leftSplit && this.Wt(this.St[0], 0, this.s.leftSplit), this.s.rightSplit && this.Wt(this.St[2], this.Fj, this.fj.length), this.Wt(this.St[1], this.s.leftSplit, this.Fj || this.fj.length)
		},
		Wt: function(t, e, i) {
			for (var s = 0, n = this.data.order.length, r = 0; n > r; r++) {
				var a = this.data.order[r],
					h = this.Rt[a];
				if (h)
					for (var o = e; i > o; o++) {
						var l = this.fj[o].id;
						h[l] && this.Xt(t, r, o, h, s, e, a, l)
					}
				s += this.FA(this.getItem(a))
			}
		},
		Vt: function() {
			for (var t = this.config.select, e = "cell" == t || "column" == t, i = this.getSelectedId(!0), s = [], n = this.Yt || [], r = webix.uid() + "", a = !1, h = 0; h < i.length; h++) {
				var o = this.Rt[i[h]];
				!o || e && !o[i[h].column] || (o.$selected && o.$selected.id == i[h].id || (a = !0), o.$selected = i[h], o.$time = r, s.push(i[h].id))
			}
			for (var h = 0; h < n.length; h++) {
				var o = this.Rt[n[h]];
				o && o.$time !== r && (delete o.$selected, a = !0)
			}
			this.Yt = [].concat(i), a && this.Ut()
		},
		Zt: function(t, e) {
			for (var i = 0, s = t; e > s; s++) {
				var n = this.fj[s];
				i += n ? n.width : 0
			}
			return i
		},
		$t: function(t, e) {
			for (var i = 0, s = t; e > s; s++) {
				var n = this.getItem(this.data.order[s]);
				i += n ? this.FA(n) : this.s.rowHeight
			}
			return i
		},
		Xt: function(t, e, i, s, n, r, a, h) {
			var o = s[h],
				l = o[2] || this.getText(a, h),
				c = "";
			!s.$selected || "row" !== this.s.select && s.$selected.column !== h || (c = "webix_selected ");
			var u = webix.html.create("DIV", {
				column: i,
				row: e,
				"class": c + "webix_cell webix_table_cell webix_dtable_span " + (o[3] || "")
			}, "" + l);
			u.style.top = n + "px", u.style.left = this.Zt(r, i) + "px", u.style.width = this.Zt(i, i + o[0]) + "px", u.style.height = this.$t(e, e + o[1]) + "px", t.appendChild(u)
		},
		Tt: function() {
			if (!this.s.prerender)
				for (var t = this.getScrollState(), e = 0; 3 > e; e++) this.St[e].style.top = "-" + (t.y || 0) + "px"
		}
	}), webix.extend(webix.ui.datatable, {
		subrow_setter: function(t) {
			return t ? (this.s.fixedRowHeight = !1, this.kA(), webix.template(t)) : !1
		},
		subview_setter: function(t) {
			return t && (this.s.subrow = this.subrow_setter("<div></div>")), t
		},
		defaults: {
			subRowHeight: 35
		},
		lA: function() {
			this.data.each(function(t) {
				t && (t.$sub = this.s.subrow(t, this.type))
			}, this), this.pC()
		},
		pC: function(t) {
			if ("auto" === this.s.subRowHeight && this.bc && this.mA(), t && this.s.subview)
				for (var e in this.oA) {
					var i = webix.$$(this.oA[e]);
					i.s.hidden || i.adjust()
				}
		},
		nA: function(t) {
			var e = this.getItem(t);
			e.$sub = this.s.subrow(e, this.type), "auto" === this.s.subRowHeight && this.mA(e.id, e.$sub)
		},
		$init: function() {
			this.kA = webix.once(function() {
				this.oA = {}, this.attachEvent("onSubViewRender", this.pA), this.data.attachEvent("onStoreUpdated", webix.bind(function(t, e, i) {
					t ? ("update" == i || "add" == i) && this.nA(t) : this.lA()
				}, this)), this.attachEvent("onResize", function(t, e, i) {
					i != t && this.pC(!0)
				})
			}), this.type.subrow = function(t) {
				return t.$sub ? t.$subopen ? "<div class='webix_tree_open webix_sub_open'></div>" : "<div class='webix_tree_close webix_sub_close'></div>" : "<div class='webix_tree_none'></div>"
			}, this.on_click.webix_sub_open = function(t, e) {
				return this.closeSub(e), !1
			}, this.on_click.webix_sub_close = function(t, e) {
				return this.openSub(e), !1
			}
		},
		openSub: function(t) {
			var e = this.getItem(t);
			if (!e.$subopen) {
				e.$row = this.s.subrow, e.$subHeight = e.$subHeight || this.s.subRowHeight, e.$subopen = !0;
				var i = this.oA[e.$subContent];
				i && (i.repaintMe = !0), this.refresh(t), this.callEvent("onSubViewOpen", [t])
			}
		},
		getSubView: function(t) {
			var e = this.getItem(t);
			if (e) {
				var i = this.oA[e.$subContent];
				if (i) return webix.$$(i)
			}
			return null
		},
		resizeSubView: function(t) {
			var e = this.getSubView(t);
			e && this.qA(this.getItem(t), e)
		},
		qA: function(t, e) {
			var i = e.$getSize(0, 0)[2],
				s = t.$subHeight || this.s.subRowHeight,
				n = Math.abs(i - (s || 0));
			n > 2 && (t.$subHeight = i, this.refresh(t.id))
		},
		wC: function(t) {
			var e = t.$width;
			if (t.lc) {
				var i = t.q.length - t.qc;
				e -= t.mc ? 2 * t.Dc + 2 : t.Cc * (i - 1) + 2 * t.Dc + 2 * i
			}
			return e > 0
		},
		pA: function(t, e) {
			var i, s = this.oA[t.$subContent];
			s ? (e.firstChild.appendChild(s), i = webix.$$(t.$subContent), this.wC(i) || i.adjust(), s.repaintMe && (delete s.repaintMe, i.config.hidden = !1, i.Qd())) : (i = webix.ui(webix.copy(this.s.subview), e.firstChild), i.getMasterView = webix.bind(function() {
				return this
			}, this), t.$subContent = i.config.id, this.oA[t.$subContent] = i.$view, this.callEvent("onSubViewCreate", [i, t])), this.qA(t, i || webix.$$(s))
		},
		rA: function(t) {
			var e = this.getItem(t),
				i = this.oA[e.$subContent];
			if (i) {
				delete e.$subContent;
				var s = webix.$$(i);
				s && s != this && s.destructor()
			}
		},
		mA: function(t, e) {
			var i = webix.html.create("DIV", {
				"class": "webix_measure_size webix_cell webix_dtable_subrow"
			}, "");
			i.style.cssText = "width:" + this.bc + "px; height:1px; visibility:hidden; position:absolute; top:0px; left:0px; overflow:hidden;", this.$view.appendChild(i), this.data.each(function(s) {
				(s && !t || s.id == t && s.$sub) && (i.innerHTML = e || this.s.subrow(s, this.type), s.$subHeight = i.scrollHeight)
			}, this), i = webix.html.remove(i)
		},
		closeSub: function(t) {
			var e = this.getItem(t);
			if (e.$subopen) {
				e.$row = !1, e.$subopen = !1;
				var i = this.oA[e.$subContent];
				i && (webix.$$(i).config.hidden = !0), this.refresh(t), this.callEvent("onSubViewClose", [t])
			}
		}
	}), webix.extend(webix.ui.datatable, {
		headermenu_setter: function(t) {
			return t && (t.data && (this.Xw = !0), t = this._t(t)), t
		},
		_t: function(t) {
			var e = {
				view: "contextmenu",
				template: "<span class='webix_icon {common.hidden()}'></span> &nbsp; #value#",
				type: {
					hidden: function(t) {
						return t.hidden ? "fa-empty" : "fa-eye"
					}
				},
				on: {
					onMenuItemClick: webix.bind(function(t) {
						var e = webix.$$(this.s.headermenu),
							i = e.getItem(t).hidden;
						return e.getItem(t).hidden = !i, e.refresh(t), e.$blockRender = !0, i ? this.showColumn(t) : this.hideColumn(t), e.$blockRender = !1, !1
					}, this)
				},
				data: []
			};
			"object" == typeof t && webix.extend(e, t, !0);
			var i = webix.ui(e);
			return i.attachTo(this.I), this.Ns.push(i), this.attachEvent("onStructureLoad", this.au), this.attachEvent("onStructureUpdate", this.au), this._t = function(t) {
				return t
			}, i.s.id
		},
		au: function() {
			var t, e, i, s, n = webix.$$(this.s.headermenu);
			if (!n.$blockRender && !this.Xw) {
				for (e = [], s = 0; s < this.fj.length; s++) {
					t = this.fj[s];
					var r = t.header[0];
					t.headermenu !== !1 && r && e.push({
						id: t.id,
						value: r.text
					})
				}
				for (i = this.getState().hidden, s = i.length - 1; s >= 0; s--) {
					t = this.getColumnConfig(i[s]);
					var r = t.header[0];
					t.headermenu !== !1 && r && e.push({
						id: i[s],
						value: r.text,
						hidden: 1
					})
				}
				e.length && n.data.importData(e)
			}
		}
	}), webix.ui.datafilter.headerMenu = {
		getValue: function() {},
		setValue: function() {},
		refresh: function(t, e) {
			t.s.headermenu || (t.define("headermenu", !0), t.au()), e.onclick = function() {
				webix.$$(t.config.headermenu).show(e)
			}
		},
		render: function() {
			return "<span class='webix_icon fa-columns'>"
		}
	}, webix.ui.datafilter.richSelectFilter = {
		getInputNode: function(t) {
			return webix.$$(t.$webix)
		},
		getValue: function(t) {
			return webix.$$(t.$webix).getValue()
		},
		setValue: function(t, e) {
			webix.$$(t.$webix).setValue(e)
		},
		compare: function(t, e) {
			return t == e
		},
		refresh: function(t, e, i) {
			var s = webix.$$(i.richselect);
			if (!s.$view.parentNode) {
				var n = webix.html.create("div", {
					"class": "webix_richfilter"
				});
				n.appendChild(s.$view)
			}
			e.$webix = i.richselect, e.style.marginLeft = "-10px", i.compare = i.compare || this.compare, i.prepare = i.prepare || this.prepare, t.registerFilter(e, i, this);
			var r, a = i.options;
			a ? "string" == typeof a ? (r = i.options = [], webix.ajax(a).then(webix.bind(function(s) {
				i.options = s.json(), this.refresh(t, e, i)
			}, this))) : r = a : r = t.collectValues(i.columnId);
			var h = s.getPopup().getList(),
				o = webix.$$(a);
			o && o.data && o.data.getRange && (r = o.data.getRange()), h.parse && (h.clearAll(), h.parse(r)), i.value && this.setValue(e, i.value), e.firstChild.appendChild(s.$view.parentNode), s.render(), webix.delay(s.resize, s)
		},
		render: function(t, e) {
			if (!e.richselect) {
				var i = webix.html.create("div", {
						"class": "webix_richfilter"
					}),
					s = {
						container: i,
						view: this.inputtype,
						options: e.suggest || []
					},
					n = webix.extend(this.inputConfig || {}, e.inputConfig || {}, !0);
				webix.extend(s, n), e.separator && (s.separator = e.separator);
				var r = webix.ui(s);
				r.attachEvent("onChange", function() {
					t.filterByAll()
				}), e.richselect = r.s.id, t.Ns.push(r)
			}
			return e.css = "webix_div_filter", " "
		},
		inputtype: "richselect"
	}, webix.ui.datafilter.multiSelectFilter = webix.extend({
		inputtype: "multiselect",
		prepare: function(t, e) {
			if (!t) return t;
			for (var i = {}, s = t.toString().split(e.separator || ","), n = 0; n < s.length; n++) i[s[n]] = 1;
			return i
		},
		compare: function(t, e) {
			return !e || e[t]
		}
	}, webix.ui.datafilter.richSelectFilter), webix.ui.datafilter.serverMultiSelectFilter = webix.extend({
		$server: !0,
		Vk: function() {
			var t = this.Sk;
			webix.$$(t).filterByAll()
		}
	}, webix.ui.datafilter.multiSelectFilter), webix.ui.datafilter.multiComboFilter = webix.extend({
		inputtype: "multicombo",
		inputConfig: {
			tagMode: !1
		}
	}, webix.ui.datafilter.multiSelectFilter), webix.ui.datafilter.datepickerFilter = webix.extend({
		prepare: function(t) {
			return t || ""
		},
		compare: function(t, e) {
			return 1 * t == 1 * e
		},
		inputtype: "datepicker"
	}, webix.ui.datafilter.richSelectFilter), webix.ui.datafilter.columnGroup = {
		getValue: function() {},
		setValue: function() {},
		getHelper: function(t, e) {
			return {
				open: function() {
					e.closed = !1, t.onclick()
				},
				close: function() {
					e.closed = !0, t.onclick()
				},
				isOpened: function() {
					return e.closed
				}
			}
		},
		refresh: function(t, e, i) {
			e.onclick = function() {
				var e = this.firstChild.firstChild;
				i.closed ? (i.closed = !1, e.className = "webix_tree_open") : (i.closed = !0, e.className = "webix_tree_close"), webix.delay(function() {
					t.callEvent("onColumnGroupCollapse", [i.columnId, i.batch, !i.closed]), t.showColumnBatch(i.batch, !i.closed)
				})
			}, i.firstRun || (i.firstRun = 1, i.closed && t.showColumnBatch(i.batch, !1))
		},
		render: function(t, e) {
			return "<div class='" + (e.closed ? "webix_tree_close" : "webix_tree_open") + "'></div>&nbsp;" + (e.groupText || "")
		}
	}, webix.editors.$popup.multiselect = {
		view: "multisuggest",
		suggest: {
			button: !0
		}
	}, webix.Canvas = webix.proto({
		$init: function(t) {
			this.Wn = [], this.Xn = t.name, this.tg = webix.toNode(t.container || t);
			var e = t.width * (window.devicePixelRatio || 1),
				i = t.height * (window.devicePixelRatio || 1),
				s = t.style || "";
			s += ";width:" + t.width + "px;height:" + t.height + "px;", this.Yn(t.name, s, e, i)
		},
		Yn: function(t, e, i, s) {
			return this.Zn = webix.html.create("canvas", {
				width: i,
				height: s,
				canvas_id: t,
				style: e || ""
			}), this.tg.appendChild(this.Zn), this.Zn.getContext || webix.env.isIE && (webix.require("legacy/excanvas/excanvas.js", !0), G_vmlCanvasManager.init_(document), G_vmlCanvasManager.initElement(this.Zn)), this.Zn
		},
		getCanvas: function(t) {
			var e = (this.Zn || this.Yn(this.w)).getContext(t || "2d");
			return this.$n || (this.$n = !0, e.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)), e
		},
		_n: function(t, e) {
			this.Zn && (this.Zn.setAttribute("width", t * (window.devicePixelRatio || 1)), this.Zn.setAttribute("height", e * (window.devicePixelRatio || 1)), this.Zn.style.width = t + "px", this.Zn.style.height = e + "px", this.$n = !1)
		},
		renderText: function(t, e, i, s, n) {
			if (i) {
				n && (n = Math.max(n, 0)), e && (e = Math.max(e, 0));
				var r = webix.html.create("DIV", {
					"class": "webix_canvas_text" + (s ? " " + s : ""),
					style: "left:" + t + "px; top:" + e + "px;"
				}, i);
				return this.tg.appendChild(r), this.Wn.push(r), n && (r.style.width = n + "px"), r
			}
		},
		renderTextAt: function(t, e, i, s, n, r, a) {
			var h = this.renderText.call(this, i, s, n, r, a);
			return h && (t && (h.style.top = "middle" == t ? parseInt(s - h.offsetHeight / 2, 10) + "px" : s - h.offsetHeight + "px"), e && (h.style.left = "left" == e ? i - h.offsetWidth + "px" : parseInt(i - h.offsetWidth / 2, 10) + "px")), h
		},
		clearCanvas: function(t) {
			var e, i = [];
			for (e = 0; e < this.Wn.length; e++) this.tg.removeChild(this.Wn[e]);
			if (this.Wn = [], !t && this.tg.t) {
				for (i = this.ao(); i.length;) i[0].parentNode.removeChild(i[0]), i.splice(0, 1);
				i = null, this.tg.t.getElementsByTagName("AREA").length || (this.tg.t.parentNode.removeChild(this.tg.t), this.tg.t = null)
			}
			this.getCanvas().clearRect(0, 0, this.Zn.offsetWidth, this.Zn.offsetHeight)
		},
		toggleCanvas: function() {
			this.bo("none" == this.Zn.style.display)
		},
		showCanvas: function() {
			this.bo(!0)
		},
		hideCanvas: function() {
			this.bo(!1)
		},
		bo: function(t) {
			var e, i;
			for (i = 0; i < this.Wn.length; i++) this.Wn[i].style.display = t ? "" : "none";
			if (this.tg.t)
				for (e = this.ao(), i = 0; i < e.length; i++) t ? e[i].removeAttribute("disabled") : e[i].setAttribute("disabled", "true");
			this.Zn.style.display = t ? "" : "none"
		},
		ao: function() {
			var t, e, i = [];
			for (t = this.tg.t.getElementsByTagName("AREA"), e = 0; e < t.length; e++) t[e].getAttribute("userdata") == this.Xn && i.push(t[e]);
			return i
		}
	}), webix.color = {
		co: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
		toHex: function(t, e) {
			t = parseInt(t, 10);
			for (var i = ""; t > 0;) i = this.co[t % 16] + i, t = Math.floor(t / 16);
			for (; i.length < e;) i = "0" + i;
			return i
		},
		hexToDec: function(t) {
			return parseInt(t, 16)
		},
		toRgb: function(t) {
			var e, i, s, n;
			return "string" != typeof t ? (e = t[0], i = t[1], s = t[2]) : -1 != t.indexOf("rgb") ? (n = t.substr(t.indexOf("(") + 1, t.lastIndexOf(")") - t.indexOf("(") - 1).split(","), e = n[0], i = n[1], s = n[2]) : ("#" == t.substr(0, 1) && (t = t.substr(1)), e = this.hexToDec(t.substr(0, 2)), i = this.hexToDec(t.substr(2, 2)), s = this.hexToDec(t.substr(4, 2))), e = parseInt(e, 10) || 0, i = parseInt(i, 10) || 0, s = parseInt(s, 10) || 0, (0 > e || e > 255) && (e = 0), (0 > i || i > 255) && (i = 0), (0 > s || s > 255) && (s = 0), [e, i, s]
		},
		hsvToRgb: function(t, e, i) {
			var s, n, r, a, h, o, l, c;
			switch (s = Math.floor(t / 60) % 6, n = t / 60 - s, r = i * (1 - e), a = i * (1 - n * e), h = i * (1 - (1 - n) * e), o = 0, l = 0, c = 0, s) {
				case 0:
					o = i, l = h, c = r;
					break;
				case 1:
					o = a, l = i, c = r;
					break;
				case 2:
					o = r, l = i, c = h;
					break;
				case 3:
					o = r, l = a, c = i;
					break;
				case 4:
					o = h, l = r, c = i;
					break;
				case 5:
					o = i, l = r, c = a
			}
			return o = Math.floor(255 * o), l = Math.floor(255 * l), c = Math.floor(255 * c), [o, l, c]
		},
		rgbToHsv: function(t, e, i) {
			var s, n, r, a, h, o, l, c;
			return s = t / 255, n = e / 255, r = i / 255, a = Math.min(s, n, r), h = Math.max(s, n, r), l = 0, o = 0 === h ? 0 : 1 - a / h, c = h, h == a ? l = 0 : h == s && n >= r ? l = 60 * (n - r) / (h - a) + 0 : h == s && r > n ? l = 60 * (n - r) / (h - a) + 360 : h == n ? l = 60 * (r - s) / (h - a) + 120 : h == r && (l = 60 * (s - n) / (h - a) + 240), [l, o, c]
		}
	}, webix.HtmlMap = webix.proto({
		$init: function(t) {
			this.ad = "map_" + webix.uid(), this.U = t, this.eo = [], this.sA = []
		},
		addRect: function(t, e, i) {
			this.fo(t, "RECT", e, i)
		},
		addPoly: function(t, e, i) {
			this.fo(t, "POLY", e, i)
		},
		fo: function(t, e, i, s) {
			var n = "";
			4 == arguments.length && (n = "userdata='" + s + "'"), this.eo.push("<area " + this.U + "='" + t + "' shape='" + e + "' coords='" + i.join() + "' " + n + "></area>"), this.sA.push({
				index: s,
				points: i
			})
		},
		addSector: function(t, e, i, s, n, r, a, h) {
			var o = [];
			o.push(s), o.push(Math.floor(n * a));
			for (var l = e; i > l; l += Math.PI / 18) o.push(Math.floor(s + r * Math.cos(l))), o.push(Math.floor((n + r * Math.sin(l)) * a));
			return o.push(Math.floor(s + r * Math.cos(i))), o.push(Math.floor((n + r * Math.sin(i)) * a)), o.push(s), o.push(Math.floor(n * a)), this.addPoly(t, o, h)
		},
		render: function(t) {
			var e = webix.html.create("DIV");
			e.style.cssText = "position:absolute; width:100%; height:100%; top:0px; left:0px;", t.appendChild(e);
			var i = webix.env.isIE ? "" : "src='data:image/gif;base64,R0lGODlhEgASAIAAAP///////yH5BAUUAAEALAAAAAASABIAAAIPjI+py+0Po5y02ouz3pwXADs='";
			e.innerHTML = "<map id='" + this.ad + "' name='" + this.ad + "'>" + this.eo.join("\n") + "</map><img " + i + " class='webix_map_img' usemap='#" + this.ad + "'>", t.t = e, this.eo = []
		}
	}), webix.protoUI({
		name: "chart",
		$init: function(t) {
			if (this.go = [this.s], this.ho = [], this.w.className += " webix_chart", this.$ready.push(this.Mi), t.preset && this.io(t), t.series) {
				var e = t.series;
				delete t.series, t.series = e
			}
			this.attachEvent("onMouseMove", this.tA), this.data.provideApi(this, !0)
		},
		Mi: function() {
			this.data.attachEvent("onStoreUpdated", webix.bind(function() {
				this.render()
			}, this))
		},
		defaults: {
			color: "default",
			alpha: "1",
			label: !1,
			value: "{obj.value}",
			padding: {},
			type: "pie",
			lineColor: "#ffffff",
			cant: .5,
			barWidth: 30,
			line: {
				width: 2,
				color: "#1293f8"
			},
			item: {
				radius: 3,
				borderColor: "#636363",
				borderWidth: 1,
				color: "#ffffff",
				alpha: 1,
				type: "r",
				shadow: !1
			},
			shadow: !0,
			gradient: !1,
			border: !0,
			labelOffset: 20,
			origin: "auto",
			scale: "linear"
		},
		ad: "webix_area_id",
		on_click: {
			webix_chart_legend_item: function(t, e, i) {
				var s = i.getAttribute("series_id");
				if (this.callEvent("onLegendClick", [t, s, i])) {
					var n = this.s,
						r = n.legend.values,
						a = r && r[s].toggle || n.legend.toggle;
					"undefined" != typeof s && this.go.length > 1 && a && (-1 != i.className.indexOf("hidden") ? this.showSeries(s) : this.hideSeries(s))
				}
			}
		},
		on_dblclick: {},
		on_mouse_move: {},
		locate: function(t) {
			return webix.html.locate(t, this.ad)
		},
		$setSize: function(t, e) {
			if (webix.ui.view.prototype.$setSize.call(this, t, e)) {
				for (var i in this.canvases) this.canvases[i]._n(this.bc, this.dc);
				this.render()
			}
		},
		type_setter: function(t) {
			return "undefined" == typeof this.s.offset && (this.s.offset = !("area" == t || "stackedArea" == t)), "radar" != t || this.s.yAxis || this.define("yAxis", {}), "scatter" == t && (this.s.yAxis || this.define("yAxis", {}), this.s.xAxis || this.define("xAxis", {})), t
		},
		destructor: function() {
			this.removeAllSeries(), webix.Destruction.destructor.apply(this, arguments)
		},
		removeAllSeries: function() {
			this.clearCanvas(), this.ko && (this.ko.innerHTML = "", this.ko.parentNode.removeChild(this.ko), this.ko = null), this.canvases && (this.canvases = {}), this.w.innerHTML = "";
			for (var t = 0; t < this.go.length; t++) this.go[t].tooltip && this.go[t].tooltip.destructor();
			this.go = []
		},
		clearCanvas: function() {
			if (this.canvases && "object" == typeof this.canvases)
				for (var t in this.canvases) this.canvases[t].clearCanvas()
		},
		render: function() {
			var t, e, i, s, n;
			if (this.isVisible(this.s.id) && this.callEvent("onBeforeRender", [this.data])) {
				if (this.canvases && "object" == typeof this.canvases)
					for (e in this.canvases) this.canvases[e].clearCanvas();
				else this.canvases = {};
				if (this.s.legend && (this.canvases.legend || (this.canvases.legend = this.lo("legend")), this.mo(this.data.getRange(), this.bc, this.dc)), t = this.no(this.bc, this.dc), this.eo = s = new webix.HtmlMap(this.ad), n = this.s, this.go)
					for (i = this.oo(), e = 0; e < this.go.length; e++) this.s = this.go[e], this.canvases[e] || (this.canvases[e] = this.lo(e, "z-index:" + (2 + e))), this["$render_" + this.s.type](this.canvases[e].getCanvas(), i, t.start, t.end, e, s);
				s.render(this.w), this.w.lastChild.style.zIndex = 100, this.po(this.w.lastChild, t), this.callEvent("onAfterRender", []), this.s = n
			}
		},
		po: function(t, e) {
			var i = {};
			i.left = e.start.x, i.top = e.start.y, i.width = e.end.x - e.start.x, i.height = e.end.y - e.start.y;
			for (var s in i) t.style[s] = i[s] + "px"
		},
		oo: function() {
			var t, e, i, s, n, r, a, h, o, l;
			if (s = this.data.getRange(), t = -1 != this.s.type.toLowerCase().indexOf("barh") ? "yAxis" : "xAxis", e = this.s[t], e && e.units && "object" == typeof e.units) {
				if (i = e.units, h = [], "undefined" != typeof i.start && "undefined" != typeof i.end && "undefined" != typeof i.next)
					for (a = i.start; a <= i.end;) h.push(a), a = i.next.call(this, a);
				else "[object Array]" === Object.prototype.toString.call(i) && (h = i);
				if (r = [], h.length) {
					for (o = e.value, l = {}, n = 0; n < s.length; n++) l[o(s[n])] = n;
					for (n = 0; n < h.length; n++) "undefined" != typeof l[h[n]] ? (s[l[h[n]]].$unit = h[n], r.push(s[l[h[n]]])) : r.push({
						$unit: h[n]
					})
				}
				return r
			}
			return s
		},
		series_setter: function(t) {
			if ("object" != typeof t);
			else {
				this.e(t.length ? t[0] : t), this.go = [this.s];
				for (var e = 1; e < t.length; e++) this.addSeries(t[e])
			}
			return t
		},
		value_setter: webix.template,
		xValue_setter: webix.template,
		yValue_setter: function(t) {
			this.define("value", t)
		},
		alpha_setter: webix.template,
		label_setter: webix.template,
		lineColor_setter: webix.template,
		borderColor_setter: webix.template,
		pieInnerText_setter: webix.template,
		gradient_setter: function(t) {
			return "function" != typeof t && t && t === !0 && (t = "light"), t
		},
		colormap: {
			RAINBOW: function(t) {
				var e = Math.floor(this.getIndexById(t.id) / this.count() * 1536);
				return 1536 == e && (e -= 1), this.qo[Math.floor(e / 256)](e % 256)
			},
			"default": function(t) {
				var e = this.count(),
					i = this.qC.length,
					s = this.getIndexById(t.id);
				return i > e ? (s && (s = i - e > s ? this.rC + 2 : this.rC + 1), this.rC = s) : s %= i, this.qC[s]
			}
		},
		color_setter: function(t) {
			return this.colormap[t] || webix.template(t)
		},
		fill_setter: function(t) {
			return t && "0" != t ? webix.template(t) : !1
		},
		io: function(t) {
			this.define("preset", t.preset), delete t.preset
		},
		preset_setter: function(t) {
			var e, i, s;
			if (this.defaults = webix.extend({}, this.defaults), s = this.presets[t], "object" == typeof s) {
				for (e in s)
					if ("object" == typeof s[e])
						if (this.defaults[e] && "object" == typeof this.defaults[e]) {
							this.defaults[e] = webix.extend({}, this.defaults[e]);
							for (i in s[e]) this.defaults[e][i] = s[e][i]
						} else this.defaults[e] = webix.extend({}, s[e]);
				else this.defaults[e] = s[e];
				return t
			}
			return !1
		},
		legend_setter: function(t) {
			return t ? ("object" != typeof t && (t = {
				template: t
			}), this.E(t, {
				width: 150,
				height: 18,
				layout: "y",
				align: "left",
				valign: "bottom",
				template: "",
				toggle: -1 != this.s.type.toLowerCase().indexOf("stacked") ? "" : "hide",
				marker: {
					type: "square",
					width: 15,
					height: 15,
					radius: 3
				},
				margin: 4,
				padding: 3
			}), t.template = webix.template(t.template), t) : (this.legendObj && (this.legendObj.innerHTML = "", this.legendObj = null), !1)
		},
		item_setter: function(t) {
			"object" != typeof t && (t = {
				color: t,
				borderColor: t
			}), this.E(t, webix.extend({}, this.defaults.item));
			var e = ["alpha", "borderColor", "color", "radius"];
			return this.ro(e, t), t
		},
		line_setter: function(t) {
			return "object" != typeof t && (t = {
				color: t
			}), t = webix.extend(t, this.defaults.line), t.color = webix.template(t.color), t
		},
		padding_setter: function(t) {
			return "object" != typeof t && (t = {
				left: t,
				right: t,
				top: t,
				bottom: t
			}), this.E(t, {
				left: 50,
				right: 20,
				top: 35,
				bottom: 40
			}), t
		},
		xAxis_setter: function(t) {
			if (!t) return !1;
			"object" != typeof t && (t = {
				template: t
			}), this.E(t, {
				title: "",
				color: "#000000",
				lineColor: "#cfcfcf",
				template: "{obj}",
				lines: !0
			});
			var e = ["lineColor", "template", "lines"];
			return this.ro(e, t), this.so = webix.extend({}, t), t
		},
		yAxis_setter: function(t) {
			this.E(t, {
				title: "",
				color: "#000000",
				lineColor: "#cfcfcf",
				template: "{obj}",
				lines: !0,
				bg: "#ffffff"
			});
			var e = ["lineColor", "template", "lines", "bg"];
			return this.ro(e, t), this.to = webix.extend({}, t), t
		},
		ro: function(t, e) {
			for (var i = 0; i < t.length; i++) e[t[i]] = webix.template(e[t[i]])
		},
		lo: function(t, e, i) {
			return new webix.Canvas({
				container: i || this.w,
				name: t,
				style: e || "",
				width: this.bc,
				height: this.dc
			})
		},
		uo: function(t, e, i, s, n, r) {
			var a = 0;
			return this.s.yAxis && (this.canvases.y || (this.canvases.y = this.lo("axis_y")), a = this.vo(this.canvases.y.getCanvas(), t, e, i, s, n)), this.s.xAxis && (this.canvases.x || (this.canvases.x = this.lo("axis_x")), this.wo(this.canvases.x.getCanvas(), t, e, i, r, a)), a
		},
		wo: function(t, e, i, s, n, r) {
			for (var a, h = i.x - .5, o = parseInt(r ? r : s.y, 10) + .5, l = s.x, c = !0, u = "stackedBar" == this.s.type ? s.y + .5 : o, d = 0; d < e.length; d++) {
				this.s.offset === !0 ? a = h + n / 2 + d * n : (a = d == e.length - 1 ? s.x : h + d * n, c = !!d), a = Math.ceil(a) - .5;
				var f = "auto" != this.s.origin && "bar" == this.s.type && parseFloat(this.s.value(e[d])) < this.s.origin;
				this.xo(a, u, e[d], c, f), (this.s.offset || d) && this.s.xAxis.lines.call(this, e[d]) && this.yo(t, a, s.y, i.y, e[d])
			}
			this.canvases.x.renderTextAt(!0, !1, h, s.y + this.s.padding.bottom - 3, this.s.xAxis.title, "webix_axis_title_x", s.x - i.x), this.zo(t, h, o, l, o, this.s.xAxis.color, 1), this.s.xAxis.lines.call(this, {}) && this.s.offset && this.zo(t, l + .5, s.y, l + .5, i.y + .5, this.s.xAxis.color, .2)
		},
		vo: function(t, e, i, s, n, r) {
			var a, h = {};
			if (this.s.yAxis) {
				var o = i.x - .5,
					l = s.y,
					c = i.y,
					u = s.y + .5;
				if (this.s.yAxis.step && (a = parseFloat(this.s.yAxis.step)), "undefined" == typeof this.to.step || "undefined" == typeof this.to.start || "undefined" == typeof this.to.end ? (h = this.Ao(n, r), n = h.start, r = h.end, a = h.step, this.s.yAxis.end = r, this.s.yAxis.start = n) : "logarithmic" == this.config.scale && (this.Bo = !0), this.Co(i, s), 0 !== a) {
					if (r == n) return l;
					for (var d = (l - c) * a / (r - n), f = 0, b = n; r >= b; b += a) {
						var x = this.Bo ? Math.pow(10, b) : b;
						h.fixNum && (x = parseFloat(x).toFixed(h.fixNum));
						var p = Math.floor(l - f * d) + .5;
						if (b == n && "auto" == this.s.origin || !this.s.yAxis.lines.call(this, b) || this.zo(t, o, p, s.x, p, this.s.yAxis.lineColor.call(this, b), 1), b == this.s.origin && (u = p), 1 > a && !this.Bo) {
							var w = Math.min(Math.floor(this.Do(a)), 0 >= n ? 0 : Math.floor(this.Do(n))),
								v = Math.pow(10, -w);
							x = Math.round(x * v) / v, b = x
						}
						this.canvases.y.renderText(0, p - 5, this.s.yAxis.template(x.toString()), "webix_axis_item_y", i.x - 5), f++
					}
					return this.zo(t, o, l + 1, o, c, this.s.yAxis.color, 1), u
				}
			}
		},
		Co: function(t, e) {
			var i = "webix_axis_title_y" + (webix.Eo && 9 != webix.Eo ? " webix_ie_filter" : ""),
				s = this.canvases.y.renderTextAt("middle", !1, 0, parseInt((e.y - t.y) / 2 + t.y, 10), this.s.yAxis.title, i);
			s && (s.style.left = (webix.env.transform ? (s.offsetHeight - s.offsetWidth) / 2 : 0) + "px")
		},
		Fo: function(t, e) {
			var i = Math.floor(this.Do(t)),
				s = Math.ceil(this.Do(e));
			return {
				start: i,
				step: 1,
				end: s
			}
		},
		Ao: function(t, e) {
			if (this.Bo = !1, "logarithmic" == this.s.scale) {
				var i = Math.floor(this.Do(t)),
					s = Math.ceil(this.Do(e));
				if (t > 0 && e > 0 && s - i > 1) return this.Bo = !0, this.Fo(t, e)
			}
			"auto" != this.s.origin && this.s.origin < t && (t = this.s.origin);
			var n, r, a;
			n = (e - t) / 8 || 1;
			var h = Math.floor(this.Do(n)),
				o = Math.pow(10, h),
				l = n / o;
			if (l = l > 5 ? 10 : 5, n = parseInt(l, 10) * o, n > Math.abs(t)) r = 0 > t ? -n : 0;
			else {
				var c = Math.abs(t),
					u = Math.floor(this.Do(c)),
					d = c / Math.pow(10, u);
				for (r = Math.ceil(10 * d) / 10 * Math.pow(10, u) - n, c > 1 && n > .1 && (r = Math.ceil(r)); 0 > t ? t >= r : r >= t;) r -= n;
				0 > t && (r = -r - 2 * n)
			}
			for (a = r; e > a;) a += n, a = parseFloat((1 * a).toFixed(Math.abs(h)));
			return {
				start: r,
				end: a,
				step: n,
				fixNum: 0 > h ? Math.abs(h) : 0
			}
		},
		Go: function(t, e) {
			var i, s, n = this.data.Df(),
				r = arguments.length && "h" == t ? this.so : this.to;
			if (e = e || "value", r && "undefined" != typeof r.end && "undefined" != typeof r.start && r.step) i = parseFloat(r.end), s = parseFloat(r.start);
			else if (i = webix.GroupMethods.max(this.go[0][e], n), s = r && "undefined" != typeof r.start ? parseFloat(r.start) : webix.GroupMethods.min(this.go[0][e], n), this.go.length > 1)
				for (var a = 1; a < this.go.length; a++) {
					var h = webix.GroupMethods.max(this.go[a][e], n),
						o = webix.GroupMethods.min(this.go[a][e], n);
					h > i && (i = h), s > o && (s = o)
				}
			return {
				max: i,
				min: s
			}
		},
		Do: function(t) {
			var e = "log";
			return Math[e](t) / Math.LN10
		},
		xo: function(t, e, i, s, n) {
			if (this.s.xAxis) {
				var r = this.canvases.x.renderTextAt(n, s, t, e - (n ? 2 : 0), this.s.xAxis.template(i));
				r && (r.className += " webix_axis_item_x")
			}
		},
		yo: function(t, e, i, s, n) {
			this.s.xAxis && this.s.xAxis.lines && this.zo(t, e, i, e, s, this.s.xAxis.lineColor.call(this, n), 1)
		},
		zo: function(t, e, i, s, n, r, a) {
			t.strokeStyle = r, t.lineWidth = a, t.beginPath(), t.moveTo(e, i), t.lineTo(s, n), t.stroke(), t.lineWidth = 1
		},
		Ho: function(t, e) {
			var i, s = 1;
			return i = e != t ? e - t : t, [i, s]
		},
		qo: [function(t) {
			return "#FF" + webix.color.toHex(t / 2, 2) + "00"
		}, function(t) {
			return "#FF" + webix.color.toHex(t / 2 + 128, 2) + "00"
		}, function(t) {
			return "#" + webix.color.toHex(255 - t, 2) + "FF00"
		}, function(t) {
			return "#00FF" + webix.color.toHex(t, 2)
		}, function(t) {
			return "#00" + webix.color.toHex(255 - t, 2) + "FF"
		}, function(t) {
			return "#" + webix.color.toHex(t, 2) + "00FF"
		}],
		qC: ["#f55b50", "#ff6d3f", "#ffa521", "#ffc927", "#ffee54", "#d3e153", "#9acb61", "#63b967", "#21a497", "#21c5da", "#3ea4f5", "#5868bf", "#7b53c0", "#a943ba", "#ec3b77", "#9eb0b8"],
		rC: 0,
		addSeries: function(t) {
			var e = webix.extend({}, this.s);
			this.s = webix.extend({}, e), this.e(t, {}), this.go.push(this.s), this.s = e
		},
		tA: function(t, e, i) {
			var s;
			if (i.getAttribute("userdata") && (this.Io = 1 == this.go.length ? i.getAttribute("userdata") : this.uA(e), this.go[this.Io])) {
				for (var n = 0; n < this.go.length; n++) s = this.go[n].tooltip, s && s.disable();
				i.getAttribute("disabled") || (s = this.go[this.Io].tooltip, s && s.enable())
			}
		},
		uA: function(t) {
			var e, i, s, n, r, a, h, o;
			for (i = this.eo.sA, n = webix.html.offset(this.w.t), r = webix.html.pos(t), h = r.x - n.x, o = r.y - n.y, s = 0; s < i.length; s++) e = i[s].points, h <= e[2] && h >= e[0] && o <= e[3] && o >= e[1] && (a ? i[s].index > a.index && (a = i[s]) : a = i[s]);
			return a ? a.index : 0
		},
		hideSeries: function(t) {
			this.canvases[t].hideCanvas();
			var e = this.s.legend;
			e && e.values && e.values[t] && (e.values[t].$hidden = !0, this.mo())
		},
		showSeries: function(t) {
			this.canvases[t].showCanvas();
			var e = this.s.legend;
			e && e.values && e.values[t] && (delete e.values[t].$hidden, this.mo())
		},
		mo: function(t, e) {
			var i, s, n, r, a, h, o, l, c, u, d, f = 0,
				b = 0;
			if (t = t || [], e = e || this.bc, l = this.canvases.legend.getCanvas(), s = this.s.legend, o = "x" != this.s.legend.layout ? "width:" + s.width + "px" : "", this.ko && (this.ko.innerHTML = "", this.ko.parentNode.removeChild(this.ko)), this.canvases.legend.clearCanvas(!0), n = webix.html.create("DIV", {
					"class": "webix_chart_legend",
					style: "left:" + f + "px; top:" + b + "px;" + o
				}, ""), s.padding && (n.style.padding = s.padding + "px"), this.ko = n, this.w.appendChild(n), a = [], s.values)
				for (i = 0; i < s.values.length; i++) a.push(this.Jo(n, s.values[i].text, "undefined" != typeof s.values[i].id ? typeof s.values[i].id : i, s.values[i].$hidden));
			else
				for (i = 0; i < t.length; i++) a.push(this.Jo(n, s.template(t[i])));
			for (0 === n.offsetWidth && (n.style.width = "auto"), h = n.offsetWidth, r = n.offsetHeight, e > h && ("x" == s.layout && "center" == s.align && (f = (e - h) / 2), "right" == s.align && (f = e - h), s.margin && "center" != s.align && (f += ("left" == s.align ? 1 : -1) * s.margin)), r < this.dc && ("middle" == s.valign && "center" != s.align && "x" != s.layout ? b = (this.dc - r) / 2 : "bottom" == s.valign && (b = this.dc - r), s.margin && "middle" != s.valign && (b += ("top" == s.valign ? 1 : -1) * s.margin)), n.style.left = f + "px", n.style.top = b + "px", l.save(), i = 0; i < a.length; i++) d = a[i], s.values && s.values[i].$hidden ? (u = !0, c = s.values[i].disableColor ? s.values[i].disableColor : "#d9d9d9") : (u = !1, c = s.values ? s.values[i].color : this.s.color.call(this, t[i])), this.Ko(l, d.offsetLeft + f, d.offsetTop + b, c, d.offsetHeight, u, i);
			l.restore(), a = null
		},
		Jo: function(t, e, i, s) {
			var n = "";
			"x" == this.s.legend.layout && (n = "float:left;");
			var r = webix.html.create("DIV", {
				style: n + "padding-left:" + (10 + this.s.legend.marker.width) + "px",
				"class": "webix_chart_legend_item" + (s ? " hidden" : "")
			}, e);
			return arguments.length > 2 && r.setAttribute("series_id", i), t.appendChild(r), r
		},
		Ko: function(t, e, i, s, n, r, a) {
			var h = [],
				o = this.s.legend.marker,
				l = this.s.legend.values,
				c = l && l[a].markerType ? l[a].markerType : o.type;
			if (s && (t.strokeStyle = t.fillStyle = s), "round" != c && o.radius)
				if ("item" == c) {
					if (this.s.line && "scatter" != this.s.type && !this.s.disableLines) {
						t.beginPath(), t.lineWidth = this.go[a].line.width, t.strokeStyle = r ? s : this.go[a].line.color.call(this, {});
						var u = e + 5,
							d = i + n / 2;
						t.moveTo(u, d);
						var f = u + o.width;
						t.lineTo(f, d), t.stroke()
					}
					var b = this.go[a].item,
						x = parseInt(b.radius.call(this, {}), 10) || 0;
					x && (t.beginPath(), r ? (t.lineWidth = b.borderWidth, t.strokeStyle = s, t.fillStyle = s) : (t.lineWidth = b.borderWidth, t.fillStyle = b.color.call(this, {}), t.strokeStyle = b.borderColor.call(this, {}), t.globalAlpha = b.alpha.call(this, {})), t.beginPath(), e += o.width / 2 + 5, i += n / 2, this.Lo(t, e, i, x + 1, b.type), t.fill(), t.stroke()), t.globalAlpha = 1
				} else t.beginPath(), t.lineWidth = 1, e += 5, i += n / 2 - o.height / 2, h = [
					[e + o.radius, i + o.radius, o.radius, Math.PI, 3 * Math.PI / 2, !1],
					[e + o.width - o.radius, i],
					[e + o.width - o.radius, i + o.radius, o.radius, -Math.PI / 2, 0, !1],
					[e + o.width, i + o.height - o.radius],
					[e + o.width - o.radius, i + o.height - o.radius, o.radius, 0, Math.PI / 2, !1],
					[e + o.radius, i + o.height],
					[e + o.radius, i + o.height - o.radius, o.radius, Math.PI / 2, Math.PI, !1],
					[e, i + o.radius]
				], this.Mo(t, h), t.stroke(), t.fill();
			else {
				t.beginPath(), t.lineWidth = o.height, t.lineCap = o.type, e += t.lineWidth / 2 + 5, i += n / 2, t.moveTo(e, i);
				var f = e + o.width - o.height + 1;
				t.lineTo(f, i), t.stroke(), t.fill()
			}
		},
		no: function(t, e) {
			var i, s, n, r;
			if (i = this.s.padding.left, s = this.s.padding.top, n = t - this.s.padding.right, r = e - this.s.padding.bottom, this.s.legend) {
				var a = this.s.legend,
					h = this.s.legend.width,
					o = this.s.legend.height;
				"x" == a.layout ? "center" == a.valign ? "right" == a.align ? n -= h : "left" == a.align && (i += h) : "bottom" == a.valign ? r -= o : s += o : "right" == a.align ? n -= h : "left" == a.align && (i += h)
			}
			return {
				start: {
					x: i,
					y: s
				},
				end: {
					x: n,
					y: r
				}
			}
		},
		No: function(t) {
			var e, i, s, n, r;
			if (this.s.yAxis && "undefined" != typeof this.s.yAxis.end && "undefined" != typeof this.s.yAxis.start && this.s.yAxis.step) s = parseFloat(this.s.yAxis.end), n = parseFloat(this.s.yAxis.start);
			else {
				for (e = 0; e < t.length; e++)
					for (t[e].$sum = 0, t[e].$min = 1 / 0, i = 0; i < this.go.length; i++) r = parseFloat(this.go[i].value(t[e]) || 0), isNaN(r) || (-1 != this.go[i].type.toLowerCase().indexOf("stacked") && (t[e].$sum += r), r < t[e].$min && (t[e].$min = r));
				for (s = -1 / 0, n = 1 / 0, e = 0; e < t.length; e++) t[e].$sum > s && (s = t[e].$sum), t[e].$min < n && (n = t[e].$min);
				n > 0 && (n = 0)
			}
			return {
				max: s,
				min: n
			}
		},
		Oo: function(t, e, i, s, n, r, a, h) {
			var o, l, c, u, d, f;
			return "light" == r ? (o = "x" == h ? t.createLinearGradient(e, i, s, i) : t.createLinearGradient(e, i, e, n), f = [
				[0, "#FFFFFF"],
				[.9, a],
				[1, a]
			], l = 2) : "falling" == r || "rising" == r ? (o = "x" == h ? t.createLinearGradient(e, i, s, i) : t.createLinearGradient(e, i, e, n), c = webix.color.toRgb(a), u = webix.color.rgbToHsv(c[0], c[1], c[2]), u[1] *= .5, d = "rgb(" + webix.color.hsvToRgb(u[0], u[1], u[2]) + ")", "falling" == r ? f = [
				[0, d],
				[.7, a],
				[1, a]
			] : "rising" == r && (f = [
				[0, a],
				[.3, a],
				[1, d]
			]), l = 0) : (t.globalAlpha = .37, l = 0, o = "x" == h ? t.createLinearGradient(e, n, e, i) : t.createLinearGradient(e, i, s, i), f = [
				[0, "#9d9d9d"],
				[.3, "#e8e8e8"],
				[.45, "#ffffff"],
				[.55, "#ffffff"],
				[.7, "#e8e8e8"],
				[1, "#9d9d9d"]
			]), this.Po(o, f), {
				gradient: o,
				offset: l
			}
		},
		Qo: function(t, e, i, s) {
			return t *= -1, e += Math.cos(t) * s, i -= Math.sin(t) * s, {
				x: e,
				y: i
			}
		},
		Po: function(t, e) {
			for (var i = 0; i < e.length; i++) t.addColorStop(e[i][0], e[i][1])
		},
		Mo: function(t, e) {
			var i, s;
			for (i = 0; i < e.length; i++) s = i ? "lineTo" : "moveTo", e[i].length > 2 && (s = "arc"), t[s].apply(t, e[i])
		},
		Ro: function(t, e, i, s, n) {
			t.addRect(e, [i[0].x - s.x, i[0].y - s.y, i[1].x - s.x, i[1].y - s.y], n)
		}
	}, webix.Group, webix.AutoTooltip, webix.DataLoader, webix.MouseEvents, webix.EventSystem, webix.ui.view), webix.extend(webix.ui.chart, {
		$render_pie: function(t, e, i, s, n, r) {
			this.So(t, e, i, s, 1, r, n)
		},
		So: function(t, e, i, s, n, r, a) {
			if (e.length) {
				var h = this.To(i, s),
					o = this.s.radius ? this.s.radius : h.radius;
				if (!(0 > o)) {
					var l = this.Uo(e),
						c = this.Vo(l),
						u = this.Wo(l, c),
						d = this.s.x ? this.s.x : h.x,
						f = this.s.y ? this.s.y : h.y;
					1 == n && this.s.shadow && this.Xo(t, d, f, o), f /= n;
					var b = -Math.PI / 2,
						x = [];
					if (t.scale(1, n), this.s.gradient) {
						var p = 1 != n ? d + o / 3 : d,
							w = 1 != n ? f + o / 3 : f;
						this.Yo(t, d, f, o, p, w)
					}
					for (var v = 0; v < e.length; v++)
						if (l[v]) {
							t.strokeStyle = this.s.lineColor.call(this, e[v]), t.beginPath(), t.moveTo(d, f), x.push(b);
							var g = -Math.PI / 2 + u[v] - 1e-4;
							t.arc(d, f, o, b, g, !1), t.lineTo(d, f);
							var m = this.s.color.call(this, e[v]);
							t.fillStyle = m, t.fill(), this.s.pieInnerText && this.Zo(d, f, 5 * o / 6, b, g, n, this.s.pieInnerText(e[v], c), !0), this.s.label && this.Zo(d, f, o + this.s.labelOffset, b, g, n, this.s.label(e[v])), 1 != n && (this.$o(t, d, f, b, g, o, !0), t.fillStyle = "#000000", t.globalAlpha = .2, this.$o(t, d, f, b, g, o, !1), t.globalAlpha = 1, t.fillStyle = m), r.addSector(e[v].id, b, g, d - i.x, f - i.y / n, o, n, a), b = g
						}
					t.globalAlpha = .8;
					var y;
					for (v = 0; v < x.length; v++) y = this.Qo(x[v], d, f, o), this.zo(t, d, f, y.x, y.y, this.s.lineColor.call(this, e[v]), 2);
					1 == n && (t.lineWidth = 2, t.strokeStyle = "#ffffff", t.beginPath(), t.arc(d, f, o + 1, 0, 2 * Math.PI, !1), t.stroke()), t.globalAlpha = 1, t.scale(1, 1 / n)
				}
			}
		},
		Uo: function(t) {
			for (var e = [], i = 0; i < t.length; i++) e.push(parseFloat(this.s.value(t[i]) || 0));
			return e
		},
		Vo: function(t) {
			for (var e = 0, i = 0; i < t.length; i++) e += t[i];
			return e
		},
		Wo: function(t, e) {
			var i, s = [],
				n = 0;
			e = e || this.Vo(t);
			for (var r = 0; r < t.length; r++) i = t[r], s[r] = 2 * Math.PI * (e ? (i + n) / e : 1 / t.length), n += i;
			return s
		},
		To: function(t, e) {
			var i = e.x - t.x,
				s = e.y - t.y,
				n = t.x + i / 2,
				r = t.y + s / 2,
				a = Math.min(i / 2, s / 2);
			return {
				x: n,
				y: r,
				radius: a
			}
		},
		$o: function(t, e, i, s, n, r, a) {
			if (t.lineWidth = 1, 0 >= s && n >= 0 || s >= 0 && n <= Math.PI || Math.abs(s - Math.PI) > .003 && s <= Math.PI && n >= Math.PI) {
				0 >= s && n >= 0 && (s = 0, a = !1, this._o(t, e, i, r, s, n)), s <= Math.PI && n >= Math.PI && (n = Math.PI, a = !1, this._o(t, e, i, r, s, n));
				var h = (this.s.pieHeight || Math.floor(r / 4)) / this.s.cant;
				t.beginPath(), t.arc(e, i, r, s, n, !1), t.lineTo(e + r * Math.cos(n), i + r * Math.sin(n) + h), t.arc(e, i + h, r, n, s, !0), t.lineTo(e + r * Math.cos(s), i + r * Math.sin(s)), t.fill(), a && t.stroke()
			}
		},
		_o: function(t, e, i, s, n, r) {
			t.beginPath(), t.arc(e, i, s, n, r, !1), t.stroke()
		},
		Xo: function(t, e, i, s) {
			t.globalAlpha = .5;
			for (var n = ["#c4c4c4", "#c6c6c6", "#cacaca", "#dcdcdc", "#dddddd", "#e0e0e0", "#eeeeee", "#f5f5f5", "#f8f8f8"], r = n.length - 1; r > -1; r--) t.beginPath(), t.fillStyle = n[r], t.arc(e + 1, i + 1, s + r, 0, 2 * Math.PI, !0), t.fill();
			t.globalAlpha = 1
		},
		ap: function(t) {
			return t.addColorStop(0, "#ffffff"), t.addColorStop(.7, "#7a7a7a"), t.addColorStop(1, "#000000"), t
		},
		Yo: function(t, e, i, s, n, r) {
			t.beginPath();
			var a;
			"function" != typeof this.s.gradient ? (a = t.createRadialGradient(n, r, s / 4, e, i, s), a = this.ap(a)) : a = this.s.gradient(a), t.fillStyle = a, t.arc(e, i, s, 0, 2 * Math.PI, !0), t.fill(), t.globalAlpha = .7
		},
		Zo: function(t, e, i, s, n, r, a, h) {
			var o = this.canvases[0].renderText(0, 0, a, 0, 1);
			if (o) {
				var l = o.scrollWidth;
				o.style.width = l + "px", l > t && (l = t);
				var c = .2 > n - s ? 4 : 8;
				h && (c = l / 1.8);
				var u = s + (n - s) / 2;
				i -= (c - 8) / 2;
				var d = -c,
					f = -8,
					b = "right";
				(u >= Math.PI / 2 && u < Math.PI || u <= 3 * Math.PI / 2 && u >= Math.PI) && (d = -l - d + 1, b = "left");
				var x = 0;
				!h && 1 > r && u > 0 && u < Math.PI && (x = (this.s.height || Math.floor(i / 4)) / r);
				var p = (e + Math.floor((i + x) * Math.sin(u))) * r + f,
					w = t + Math.floor((i + c / 2) * Math.cos(u)) + d,
					v = n < Math.PI / 2 + .01,
					g = s < Math.PI / 2;
				g && v ? w = Math.max(w, t + 3) : g || v ? !h && (u >= Math.PI / 2 && u < Math.PI || u <= 3 * Math.PI / 2 && u >= Math.PI) && (w += l / 3) : w = Math.min(w, t - l), o.style.top = p + "px", o.style.left = w + "px", o.style.width = l + "px", o.style.textAlign = b, o.style.whiteSpace = "nowrap"
			}
		},
		$render_pie3D: function(t, e, i, s, n, r) {
			this.So(t, e, i, s, this.s.cant, r)
		},
		$render_donut: function(t, e, i, s, n, r) {
			if (e.length) {
				this.So(t, e, i, s, 1, r, n);
				var a = this.s,
					h = this.To(i, s),
					o = a.radius ? a.radius : h.radius,
					l = a.innerRadius && a.innerRadius < o ? a.innerRadius : o / 3,
					c = a.x ? a.x : h.x,
					u = a.y ? a.y : h.y;
				t.fillStyle = "#ffffff", t.beginPath(), t.arc(c, u, l, 0, 2 * Math.PI, !0), t.fill()
			}
		}
	}), webix.extend(webix.ui.chart, {
		$render_bar: function(t, e, i, s, n, r) {
			var a, h, o, l, c, u, d, f, b, x, p, w, v, g = s.y - i.y;
			v = !!this.s.yAxis, w = !!this.s.xAxis, l = this.Go(), c = l.max, u = l.min, h = (s.x - i.x) / e.length, n || "auto" != this.s.origin && !v || this.uo(e, i, s, u, c, h), v && (c = parseFloat(this.s.yAxis.end), u = parseFloat(this.s.yAxis.start)), b = this.Ho(u, c), d = b[0], f = b[1], p = d ? g / d : d, v || "auto" != this.s.origin && w || (x = 10, p = d ? (g - x) / d : x), !n && "auto" != this.s.origin && !v && this.s.origin > u && this.wo(t, e, i, s, h, s.y - p * (this.s.origin - u)), a = parseInt(this.s.barWidth, 10);
			var m = 0,
				y = 0;
			for (o = 0; o < this.go.length; o++) o == n && (y = m), "bar" == this.go[o].type && m++;
			this.go && a * m + 4 > h && (a = parseInt(h / m - 4, 10));
			var $ = (h - a * m) / 2,
				_ = "undefined" != typeof this.s.radius ? parseInt(this.s.radius, 10) : Math.round(a / 5),
				I = !1,
				C = this.s.gradient;
			for (C && "function" != typeof C ? (I = C, C = !1) : C && (C = t.createLinearGradient(0, s.y, 0, i.y), this.s.gradient(C)), w || this.zo(t, i.x, s.y + .5, s.x, s.y + .5, "#000000", 1), o = 0; o < e.length; o++) {
				var S = parseFloat(this.s.value(e[o]) || 0);
				if (this.Bo && (S = this.Do(S)), !isNaN(S)) {
					S > c && (S = c), S -= u, S *= f;
					var k = i.x + $ + o * h + (a + 1) * y,
						E = s.y;
					if (0 > S || this.s.yAxis && 0 === S && !("auto" != this.s.origin && this.s.origin > u)) this.canvases[n].renderTextAt(!0, !0, k + Math.floor(a / 2), E, this.s.label(e[o]));
					else {
						v || "auto" != this.s.origin && w || (S += x / p);
						var A = C || this.s.color.call(this, e[o]);
						t.globalAlpha = this.s.alpha.call(this, e[o]);
						var M = this.bp(t, i, k, E, a, u, _, p, S, A, C, I);
						I && this.cp(t, k, E, a, u, _, p, S, A, I), this.s.border && this.dp(t, k, E, a, u, _, p, S, A), t.globalAlpha = 1, M[0] != k ? this.canvases[n].renderTextAt(!1, !0, k + Math.floor(a / 2), M[1], this.s.label(e[o])) : this.canvases[n].renderTextAt(!0, !0, k + Math.floor(a / 2), M[3], this.s.label(e[o])), r.addRect(e[o].id, [k - i.x, M[3] - i.y, M[2] - i.x, M[1] - i.y], n)
					}
				}
			}
		},
		ep: function(t, e, i, s, n, r, a) {
			var h = this.s.xAxis,
				o = i;
			return h && "auto" != this.s.origin && this.s.origin > a && (i -= (this.s.origin - a) * n, o = i, s -= this.s.origin - a, 0 > s && (s *= -1, t.translate(e + r, i), t.rotate(Math.PI), e = 0, i = 0), i -= .5), {
				value: s,
				x0: e,
				y0: i,
				start: o
			}
		},
		bp: function(t, e, i, s, n, r, a, h, o, l, c, u) {
			t.save(), t.fillStyle = l;
			var d = this.ep(t, i, s, o, h, n, r),
				f = this.fp(t, d.x0, d.y0, n, a, h, d.value, this.s.border ? 1 : 0);
			c && !u && t.lineTo(d.x0 + (this.s.border ? 1 : 0), e.y), t.fill(), t.restore();
			var b = d.x0,
				x = d.x0 != i ? i + f[0] : f[0],
				p = d.x0 != i ? d.start - f[1] - d.y0 : d.y0,
				w = d.x0 != i ? d.start - d.y0 : f[1];
			return [b, p, x, w]
		},
		gp: function(t, e) {
			var i, s;
			s = webix.color.toRgb(e), i = webix.color.rgbToHsv(s[0], s[1], s[2]), i[2] /= 1.4, e = "rgb(" + webix.color.hsvToRgb(i[0], i[1], i[2]) + ")", t.strokeStyle = e, 1 == t.globalAlpha && (t.globalAlpha = .9)
		},
		dp: function(t, e, i, s, n, r, a, h, o) {
			var l;
			t.save(), l = this.ep(t, e, i, h, a, s, n), this.gp(t, o), this.fp(t, l.x0, l.y0, s, r, a, l.value, t.lineWidth / 2, 1), t.stroke(), t.restore()
		},
		cp: function(t, e, i, s, n, r, a, h, o, l) {
			t.save();
			var c = this.ep(t, e, i, h, a, s, n),
				u = this.Oo(t, c.x0, c.y0, c.x0 + s, c.y0 - a * c.value + 2, l, o, "y"),
				d = this.s.border ? 1 : 0;
			t.fillStyle = u.gradient, this.fp(t, c.x0 + u.offset, c.y0, s - 2 * u.offset, r, a, c.value, u.offset + d), t.fill(), t.restore()
		},
		fp: function(t, e, i, s, n, r, a, h, o) {
			t.beginPath();
			var l = 0;
			if (n > r * a) {
				var c = (n - r * a) / n;
				1 >= c && c >= -1 && (l = -Math.acos(c) + Math.PI / 2)
			}
			t.moveTo(e + h, i);
			var u = i - Math.floor(r * a) + n + (n ? 0 : h);
			r * a > n && t.lineTo(e + h, u);
			var d = e + n;
			n && n > 0 && t.arc(d, u, Math.max(n - h, 0), -Math.PI + l, -Math.PI / 2, !1);
			var f = e + s - n - h,
				b = u - n + (n ? h : 0);
			t.lineTo(f, b), n && n > 0 && t.arc(f + h, u, Math.max(n - h, 0), -Math.PI / 2, 0 - l, !1);
			var x = e + s - h;
			return t.lineTo(x, i), o || t.lineTo(e + h, i), [x, b]
		}
	}), webix.extend(webix.ui.chart, {
		$render_line: function(t, e, i, s, n, r) {
			var a, h, o, l, c, u, d, f, b, x, p, w;
			if (l = this.hp(t, e, i, s, n), a = this.s, e.length) {
				for (c = a.offset ? i.x + .5 * l.cellWidth : i.x, o = [], h = 0; h < e.length; h++)
					if (w = this.ip(e[h], i, s, l)) {
						if (d = h ? l.cellWidth * h - .5 + c : c, b = "object" == typeof w ? w.y0 : w, h && this.s.fixOverflow) {
							if (p = this.ip(e[h - 1], i, s, l), p.out && p.out == w.out) continue;
							u = l.cellWidth * (h - 1) - .5 + c, f = "object" == typeof p ? p.y0 : p, p.out && (x = "min" == p.out ? s.y : i.y, o.push({
								x: this.jp(u, d, f, b, x),
								y: x
							})), w.out && (x = "min" == w.out ? s.y : i.y, o.push({
								x: this.jp(u, d, f, b, x),
								y: x
							}))
						}
						w.out || o.push({
							x: d,
							y: w,
							index: h
						})
					}
				for (this.kp = i, h = 1; h <= o.length; h++) u = o[h - 1].x, f = o[h - 1].y, h < o.length && (d = o[h].x, b = o[h].y, this.zo(t, u, f, d, b, a.line.color.call(this, e[h - 1]), a.line.width), a.line && a.line.shadow && (t.globalAlpha = .3, this.zo(t, u + 2, f + a.line.width + 8, d + 2, b + a.line.width + 8, "#eeeeee", a.line.width + 3), t.globalAlpha = 1)), "undefined" != typeof o[h - 1].index && this.lp(t, u, f, e[o[h - 1].index], a.label(e[o[h - 1].index]), n, r, i)
			}
		},
		jp: function(t, e, i, s, n) {
			return t + (n - i) * (e - t) / (s - i)
		},
		lp: function(t, e, i, s, n, r, a) {
			var h = this.s.item,
				o = parseInt(h.radius.call(this, s), 10) || 0,
				l = this.kp;
			if (o) {
				if (t.save(), h.shadow) {
					t.lineWidth = 1, t.strokeStyle = "#bdbdbd", t.fillStyle = "#bdbdbd";
					for (var c = [.1, .2, .3], u = c.length - 1; u >= 0; u--) t.globalAlpha = c[u], t.strokeStyle = "#d0d0d0", t.beginPath(), this.Lo(t, e, i + 2 * o / 3, o + u + 1, h.type), t.stroke();
					t.beginPath(), t.globalAlpha = .3, t.fillStyle = "#bdbdbd", this.Lo(t, e, i + 2 * o / 3, o + 1, h.type), t.fill()
				}
				t.restore(), t.lineWidth = h.borderWidth, t.fillStyle = h.color.call(this, s), t.strokeStyle = h.borderColor.call(this, s), t.globalAlpha = h.alpha.call(this, s), t.beginPath(), this.Lo(t, e, i, o + 1, h.type), t.fill(), t.stroke(), t.globalAlpha = 1
			}
			if (n && this.canvases[r].renderTextAt(!1, !0, e, i - o - this.s.labelOffset, this.s.label.call(this, s)), a) {
				var d = this.s.eventRadius || o + 1;
				a.addRect(s.id, [e - d - l.x, i - d - l.y, e + d - l.x, i + d - l.y], r)
			}
		},
		Lo: function(t, e, i, s, n) {
			var r = [];
			if (!n || "square" != n && "s" != n)
				if (!n || "diamond" != n && "d" != n) r = !n || "triangle" != n && "t" != n ? [
					[e, i, s, 0, 2 * Math.PI, !0]
				] : [
					[e, i - s],
					[e + Math.sqrt(3) * s / 2, i + s / 2],
					[e - Math.sqrt(3) * s / 2, i + s / 2],
					[e, i - s]
				];
				else {
					var a = t.lineWidth > 1 ? t.lineWidth * Math.sqrt(2) / 4 : 0;
					r = [
						[e, i - s],
						[e + s, i],
						[e, i + s],
						[e - s, i],
						[e + a, i - s - a]
					]
				}
			else s *= Math.sqrt(2) / 2, r = [
				[e - s - t.lineWidth / 2, i - s],
				[e + s, i - s],
				[e + s, i + s],
				[e - s, i + s],
				[e - s, i - s]
			];
			this.Mo(t, r)
		},
		ip: function(t, e, i, s) {
			var n = s.minValue,
				r = s.maxValue,
				a = s.unit,
				h = s.valueFactor,
				o = this.s.value(t);
			this.Bo && (o = this.Do(o));
			var l = (parseFloat(o || 0) - n) * h;
			this.s.yAxis || (l += s.startValue / a);
			var c = i.y - a * l;
			return !this.s.fixOverflow || "line" != this.s.type && "area" != this.s.type ? (o > r && (c = e.y), (0 > l || n > o) && (c = i.y)) : o > r ? c = {
				y: e.y,
				y0: c,
				out: "max"
			} : (0 > l || n > o) && (c = {
				y: i.y,
				y0: c,
				out: "min"
			}), c
		},
		hp: function(t, e, i, s, n) {
			var r, a = {};
			a.totalHeight = s.y - i.y, a.cellWidth = (s.x - i.x) / (this.s.offset ? e.length : e.length - 1);
			var h = !!this.s.yAxis,
				o = -1 != this.s.type.indexOf("stacked") ? this.No(e) : this.Go();
			a.maxValue = o.max, a.minValue = o.min, n || this.uo(e, i, s, a.minValue, a.maxValue, a.cellWidth), h && (a.maxValue = parseFloat(this.s.yAxis.end), a.minValue = parseFloat(this.s.yAxis.start));
			var l = this.Ho(a.minValue, a.maxValue);
			return r = l[0], a.valueFactor = l[1], a.unit = r ? a.totalHeight / r : 10, a.startValue = 0, h || (a.startValue = 10, a.unit != a.totalHeight && (a.unit = r ? (a.totalHeight - a.startValue) / r : 10)), a
		}
	}), webix.extend(webix.ui.chart, {
		$render_barH: function(t, e, i, s, n, r) {
			var a, h, o, l, c, u, d, f, b, x, p, w, v, g, m, y, $, _, I, C, S;
			for (o = (s.y - i.y) / e.length, d = this.Go("h"), f = d.max, b = d.min, y = s.x - i.x, S = !!this.s.yAxis, n || this.mp(t, e, i, s, b, f, o), S && (f = parseFloat(this.s.xAxis.end), b = parseFloat(this.s.xAxis.start)), g = this.Ho(b, f), w = g[0], p = g[1], _ = w ? y / w : 10, S || (m = 10, _ = w ? (y - m) / w : 10), h = parseInt(this.s.barWidth, 10), h * this.go.length + 4 > o && (h = o / this.go.length - 4), a = Math.floor((o - h * this.go.length) / 2), v = "undefined" != typeof this.s.radius ? parseInt(this.s.radius, 10) : Math.round(h / 5), x = !1, c = this.s.gradient, c && "function" != typeof c ? (x = c, c = !1) : c && (c = t.createLinearGradient(i.x, i.y, s.x, i.y), this.s.gradient(c)), S || this.zo(t, i.x - .5, i.y, i.x - .5, s.y, "#000000", 1), u = 0; u < e.length; u++)
				if ($ = parseFloat(this.s.value(e[u] || 0)), this.Bo && ($ = this.Do($)), $ > f && ($ = f), $ -= b, $ *= p, I = i.x, C = i.y + a + u * o + (h + 1) * n, 0 > $ && "auto" == this.s.origin || this.s.xAxis && 0 === $ && !("auto" != this.s.origin && this.s.origin > b)) this.canvases[n].renderTextAt("middle", "right", I + 10, C + h / 2 + a, this.s.label(e[u]));
				else {
					0 > $ && "auto" != this.s.origin && this.s.origin > b && ($ = 0), S || ($ += m / _), l = c || this.s.color.call(this, e[u]), this.s.border && this.np(t, I, C, h, b, v, _, $, l), t.globalAlpha = this.s.alpha.call(this, e[u]);
					var k = this.op(t, s, I, C, h, b, v, _, $, l, c, x);
					x && this.pp(t, I, C, h, b, v, _, $, l, x), t.globalAlpha = 1, k[3] == C ? (this.canvases[n].renderTextAt("middle", "left", k[0] - 5, k[3] + Math.floor(h / 2), this.s.label(e[u])), r.addRect(e[u].id, [k[0] - i.x, k[3] - i.y, k[2] - i.x, k[3] + h - i.y], n)) : (this.canvases[n].renderTextAt("middle", !1, k[2] + 5, k[1] + Math.floor(h / 2), this.s.label(e[u])), r.addRect(e[u].id, [k[0] - i.x, C - i.y, k[2] - i.x, k[3] - i.y], n))
				}
		},
		qp: function(t, e, i, s, n, r, a, h, o) {
			var l = 0;
			if (n > r * a) {
				var c = (n - r * a) / n;
				l = -Math.asin(c) + Math.PI / 2
			}
			t.moveTo(e, i + h);
			var u = e + r * a - n - (n ? 0 : h);
			r * a > n && t.lineTo(u, i + h);
			var d = i + n;
			n && n > 0 && t.arc(u, d, n - h, -Math.PI / 2 + l, 0, !1);
			var f = i + s - n - (n ? 0 : h),
				b = u + n - (n ? h : 0);
			t.lineTo(b, f), n && n > 0 && t.arc(u, f, n - h, 0, Math.PI / 2 - l, !1);
			var x = i + s - h;
			return t.lineTo(e, x), o || t.lineTo(e, i + h), [b, x]
		},
		mp: function(t, e, i, s, n, r, a) {
			var h = 0;
			this.s.xAxis && (this.canvases.x || (this.canvases.x = this.lo("axis_x")), h = this.rp(this.canvases.x.getCanvas(), e, i, s, n, r)), this.s.yAxis && (this.canvases.y || (this.canvases.y = this.lo("axis_y")), this.sp(this.canvases.y.getCanvas(), e, i, s, a, h))
		},
		sp: function(t, e, i, s, n, r) {
			if (this.s.yAxis) {
				var a, h = parseInt(r ? r : i.x, 10) - .5,
					o = s.y + .5,
					l = i.y;
				this.zo(t, h, o, h, l, this.s.yAxis.color, 1);
				for (var c = 0; c < e.length; c++) {
					var u = "auto" != this.s.origin && "barH" == this.s.type && parseFloat(this.s.value(e[c])) < this.s.origin;
					a = l + n / 2 + c * n, this.canvases.y.renderTextAt("middle", u ? !1 : "left", u ? h + 5 : h - 5, a, this.s.yAxis.template(e[c]), "webix_axis_item_y", u ? 0 : h - 10), this.s.yAxis.lines.call(this, e[c]) && this.zo(t, i.x, a, s.x, a, this.s.yAxis.lineColor.call(this, e[c]), 1)
				}
				this.zo(t, i.x + .5, l + .5, s.x, l + .5, this.s.yAxis.lineColor.call(this, {}), 1), this.Co(i, s)
			}
		},
		rp: function(t, e, i, s, n, r) {
			var a, h = {},
				o = this.s.xAxis;
			if (o) {
				var l = s.y + .5,
					c = i.x - .5,
					u = s.x - .5,
					d = i.x;
				if (this.zo(t, c, l, u, l, o.color, 1), o.step && (a = parseFloat(o.step)), ("undefined" == typeof this.so.step || "undefined" == typeof this.so.start || "undefined" == typeof this.so.end) && (h = this.Ao(n, r), n = h.start, r = h.end, a = h.step, this.s.xAxis.end = r, this.s.xAxis.start = n, this.s.xAxis.step = a), 0 !== a) {
					for (var f = (u - c) * a / (r - n), b = 0, x = n; r >= x; x += a) {
						var p = this.Bo ? Math.pow(10, x) : x;
						h.fixNum && (p = parseFloat(p).toFixed(h.fixNum));
						var w = Math.floor(c + b * f) + .5;
						if (x == n && "auto" == this.s.origin || !o.lines.call(this, x) || this.zo(t, w, l, w, i.y, this.s.xAxis.lineColor.call(this, x), 1), x == this.s.origin && (d = w + 1), 1 > a && !this.Bo) {
							var v = Math.min(Math.floor(this.Do(a)), 0 >= n ? 0 : Math.floor(this.Do(n))),
								g = Math.pow(10, -v);
							p = Math.round(p * g) / g, x = p
						}
						this.canvases.x.renderTextAt(!1, !0, w, l + 2, o.template(p.toString()), "webix_axis_item_x"), b++
					}
					return this.canvases.x.renderTextAt(!0, !1, c, s.y + this.s.padding.bottom - 3, this.s.xAxis.title, "webix_axis_title_x", s.x - i.x), o.lines.call(this, {}) || this.zo(t, c, i.y - .5, u, i.y - .5, this.s.xAxis.color, .2), d
				}
			}
		},
		tp: function(t, e, i, s, n, r, a) {
			var h = this.s.yAxis,
				o = e;
			return h && "auto" != this.s.origin && this.s.origin > a && (e += (this.s.origin - a) * n, o = e, s -= this.s.origin - a, 0 > s && (s *= -1, t.translate(e, i + r), t.rotate(Math.PI), e = .5, i = 0), e += .5), {
				value: s,
				x0: e,
				y0: i,
				start: o
			}
		},
		op: function(t, e, i, s, n, r, a, h, o, l, c, u) {
			t.save();
			var d = this.tp(t, i, s, o, h, n, r);
			t.fillStyle = l, t.beginPath();
			var f = this.qp(t, d.x0, d.y0, n, a, h, d.value, this.s.border ? 1 : 0);
			c && !u && t.lineTo(e.x, d.y0 + (this.s.border ? 1 : 0)), t.fill(), t.restore();
			var b = d.y0,
				x = d.y0 != s ? s : f[1],
				p = d.y0 != s ? d.start - f[0] : d.start,
				w = d.y0 != s ? d.start : f[0];
			return [p, b, w, x]
		},
		np: function(t, e, i, s, n, r, a, h, o) {
			t.save();
			var l = this.tp(t, e, i, h, a, s, n);
			t.beginPath(), this.gp(t, o), t.globalAlpha = .9, this.qp(t, l.x0, l.y0, s, r, a, l.value, t.lineWidth / 2, 1), t.stroke(), t.restore()
		},
		pp: function(t, e, i, s, n, r, a, h, o, l) {
			t.save();
			var c = this.tp(t, e, i, h, a, s, n),
				u = this.Oo(t, c.x0, c.y0 + s, c.x0 + a * c.value, c.y0, l, o, "x");
			t.fillStyle = u.gradient, t.beginPath(), this.qp(t, c.x0, c.y0 + u.offset, s - 2 * u.offset, r, a, c.value, u.offset), t.fill(), t.globalAlpha = 1, t.restore()
		}
	}), webix.extend(webix.ui.chart, {
		$render_stackedBar: function(t, e, i, s, n, r) {
			var a, h, o, l, c, u, d, f = this.s,
				b = s.y - i.y,
				x = !!f.yAxis,
				p = !!f.xAxis,
				w = this.No(e),
				v = 0 === f.origin;
			a = w.max, h = w.min;
			var g = Math.floor((s.x - i.x) / e.length);
			n || (o = this.uo(e, i, s, h, a, g)), x && (a = parseFloat(f.yAxis.end), h = parseFloat(f.yAxis.start));
			var m = this.Ho(h, a);
			d = m[0], u = m[1];
			var y = d ? b / d : 10,
				$ = parseInt(f.barWidth, 10);
			$ + 4 > g && ($ = g - 4);
			var _ = Math.floor((g - $) / 2),
				I = f.gradient ? f.gradient : !1;
			p || this.zo(t, i.x, s.y + .5, s.x, s.y + .5, "#000000", 1);
			for (var C = 0; C < e.length; C++) {
				var S = parseFloat(f.value(e[C] || 0));
				this.Bo && (S = this.Do(S)), l = i.x + _ + C * g;
				var k = v && 0 > S;
				if (n ? c = k ? e[C].$startYN : e[C].$startY : (c = o - 1, e[C].$startY = c, v && (k && (c = o + 1), e[C].$startYN = o + 1)), S && (n || v || (S -= h), S *= u, !(c < i.y + 1)))
					if (f.yAxis && 0 === S) this.canvases.y.renderTextAt(!0, !0, l + Math.floor($ / 2), c, this.s.label(e[C]));
					else {
						var E = this.s.color.call(this, e[C]),
							A = Math.abs(c - (v ? s.y + h * y : s.y)) < 3;
						t.globalAlpha = f.alpha.call(this, e[C]), t.fillStyle = t.strokeStyle = f.color.call(this, e[C]), t.beginPath();
						var M = c - y * S + (A ? k ? -1 : 1 : 0),
							j = this.up(t, l - (f.border ? .5 : 0), c, $ + (f.border ? .5 : 0), M, 0, i.y);
						if (t.fill(), t.stroke(), I) {
							t.save();
							var N = this.Oo(t, l, c, l + $, j[1], I, E, "y");
							t.fillStyle = N.gradient, t.beginPath(), j = this.up(t, l + N.offset, c, $ - 2 * N.offset, M, f.border ? 1 : 0, i.y), t.fill(), t.restore()
						}
						f.border && (t.save(), "string" == typeof f.border ? t.strokeStyle = f.border : this.gp(t, E), t.beginPath(), this.up(t, l - .5, parseInt(c, 10) + .5, $ + 1, parseInt(M, 10) + .5, 0, i.y, A), t.stroke(), t.restore()), t.globalAlpha = 1, this.canvases[n].renderTextAt(!1, !0, l + Math.floor($ / 2), j[1] + (c - j[1]) / 2 - 7, this.s.label(e[C])), r.addRect(e[C].id, [l - i.x, j[1] - i.y, j[0] - i.x, e[C][k ? "$startYN" : "$startY"] - i.y], n), e[C][k ? "$startYN" : "$startY"] = j[1]
					}
			}
		},
		up: function(t, e, i, s, n, r, a, h) {
			t.moveTo(e, i), a > n && (n = a), t.lineTo(e, n);
			var o = e + s,
				l = n;
			t.lineTo(o, l);
			var c = e + s;
			return t.lineTo(c, i), h || t.lineTo(e, i), [c, l]
		}
	}), webix.extend(webix.ui.chart, {
		$render_stackedBarH: function(t, e, i, s, n, r) {
			var a, h, o, l, c = s.x - i.x,
				u = !!this.s.yAxis,
				d = this.No(e);
			a = d.max, h = d.min;
			var f = Math.floor((s.y - i.y) / e.length);
			n || this.mp(t, e, i, s, h, a, f), u && (a = parseFloat(this.s.xAxis.end), h = parseFloat(this.s.xAxis.start));
			var b = this.Ho(h, a);
			l = b[0], o = b[1];
			var x = l ? c / l : 10,
				p = 0;
			u || (p = 10, x = l ? (c - p) / l : 10);
			var w = parseInt(this.s.barWidth, 10);
			w + 4 > f && (w = f - 4);
			var v = (f - w) / 2,
				g = 0,
				m = !1,
				y = this.s.gradient;
			y && (m = !0), u || this.zo(t, i.x - .5, i.y, i.x - .5, s.y, "#000000", 1);
			var $ = 0,
				_ = 0;
			for (I = 0; I < this.go.length; I++) I == n && (_ = $), "stackedBarH" == this.go[I].type && $++;
			for (var I = 0; I < e.length; I++) {
				_ || (e[I].$startX = i.x);
				var C = parseFloat(this.s.value(e[I] || 0));
				C > a && (C = a), C -= h, C *= o;
				var S = i.x,
					k = i.y + v + I * f;
				if (_ ? S = e[I].$startX : e[I].$startX = S, 0 > C || this.s.yAxis && 0 === C) this.canvases.y.renderTextAt("middle", !0, S + 10, k + w / 2, this.s.label(e[I]));
				else {
					u || (C += p / x);
					var E = this.s.color.call(this, e[I]);
					t.globalAlpha = this.s.alpha.call(this, e[I]), t.fillStyle = this.s.color.call(this, e[I]), t.beginPath();
					var A = this.qp(t, S, k, w, g, x, C, 0);
					if (y && !m && t.lineTo(i.x + c, k + (this.s.border ? 1 : 0)), t.fill(), m) {
						var M = this.Oo(t, S, k + w, S, k, m, E, "x");
						t.fillStyle = M.gradient, t.beginPath(), A = this.qp(t, S, k, w, g, x, C, 0), t.fill()
					}
					this.s.border && this.np(t, S, k, w, h, g, x, C, E), t.globalAlpha = 1, this.canvases[n].renderTextAt("middle", !0, e[I].$startX + (A[0] - e[I].$startX) / 2 - 1, k + (A[1] - k) / 2, this.s.label(e[I])), r.addRect(e[I].id, [e[I].$startX - i.x, k - i.y, A[0] - i.x, A[1] - i.y], n), e[I].$startX = A[0]
				}
			}
		}
	}), webix.extend(webix.ui.chart, {
		$render_spline: function(t, e, i, s, n, r) {
			var a, h, o, l, c, u, d, f, b, x, p, w, v;
			if (c = this.hp(t, e, i, s, n), a = this.s, this.kp = i, o = [], e.length) {
				for (f = a.offset ? i.x + .5 * c.cellWidth : i.x, h = 0; h < e.length; h++) p = this.ip(e[h], i, s, c), p && (d = h ? c.cellWidth * h - .5 + f : f, o.push({
					x: d,
					y: p,
					index: h
				}));
				for (u = this.vp(o), h = 0; h < o.length; h++) {
					if (b = o[h].x, w = o[h].y, h < o.length - 1) {
						for (x = o[h + 1].x, v = o[h + 1].y, l = b; x > l; l++) {
							var g = this.wp(l, b, h, u.a, u.b, u.c, u.d);
							g < i.y && (g = i.y), g > s.y && (g = s.y);
							var m = this.wp(l + 1, b, h, u.a, u.b, u.c, u.d);
							m < i.y && (m = i.y), m > s.y && (m = s.y), this.zo(t, l, g, l + 1, m, a.line.color(e[h]), a.line.width)
						}
						this.zo(t, x - 1, this.wp(l, b, h, u.a, u.b, u.c, u.d), x, v, a.line.color(e[h]), a.line.width)
					}
					this.lp(t, b, w, e[o[h].index], a.label(e[o[h].index]), n, r)
				}
			}
		},
		vp: function(t) {
			var e, i, s, n, r, a, h, o, l = [],
				c = [],
				u = t.length;
			for (r = 0; u - 1 > r; r++) l[r] = t[r + 1].x - t[r].x, c[r] = (t[r + 1].y - t[r].y) / l[r];
			for (h = [], o = [], h[0] = 0, h[1] = 2 * (l[0] + l[1]), o[0] = 0, o[1] = 6 * (c[1] - c[0]), r = 2; u - 1 > r; r++) h[r] = 2 * (l[r - 1] + l[r]) - l[r - 1] * l[r - 1] / h[r - 1], o[r] = 6 * (c[r] - c[r - 1]) - l[r - 1] * o[r - 1] / h[r - 1];
			for (a = [], a[u - 1] = a[0] = 0, r = u - 2; r >= 1; r--) a[r] = (o[r] - l[r] * a[r + 1]) / h[r];
			for (e = [], i = [], s = [], n = [], r = 0; u - 1 > r; r++) e[r] = t[r].y, i[r] = -l[r] * a[r + 1] / 6 - l[r] * a[r] / 3 + (t[r + 1].y - t[r].y) / l[r], s[r] = a[r] / 2, n[r] = (a[r + 1] - a[r]) / (6 * l[r]);
			return {
				a: e,
				b: i,
				c: s,
				d: n
			}
		},
		wp: function(t, e, i, s, n, r, a) {
			return s[i] + (t - e) * (n[i] + (t - e) * (r[i] + (t - e) * a[i]))
		}
	}), webix.extend(webix.ui.chart, {
		$render_area: function(t, e, i, s, n, r) {
			var a, h, o, l, c, u, d, f, b, x, p, w, v, g, m;
			if (u = this.hp(t, e, i, s, n), h = this.s, l = h.eventRadius || Math.floor(u.cellWidth / 2), e.length) {
				for (d = [], x = h.offset ? i.x + .5 * u.cellWidth : i.x, o = 0; o < e.length; o++)
					if (c = e[o], b = this.ip(c, i, s, u), v = x + u.cellWidth * o, b) {
						if (g = "object" == typeof b ? b.y0 : b, o && this.s.fixOverflow) {
							if (f = this.ip(e[o - 1], i, s, u), f.out && f.out == b.out) continue;
							p = u.cellWidth * (o - 1) - .5 + x, w = "object" == typeof f ? f.y0 : f, f.out && (m = "min" == f.out ? s.y : i.y, d.push([this.jp(p, v, w, g, m), m])), b.out && (m = "min" == b.out ? s.y : i.y, d.push([this.jp(p, v, w, g, m), m]), o == e.length - 1 && m == i.y && d.push([v, i.y]))
						}
						b.out || (d.push([v, g]), r.addRect(c.id, [v - l - i.x, g - l - i.y, v + l - i.x, g + l - i.y], n)), h.yAxis || (a = h.offset || o != e.length - 1 ? "center" : "left", this.canvases[n].renderTextAt(!1, a, v, g - h.labelOffset, h.label(c)))
					}
				d.length && (d.push([v, s.y]), d.push([d[0][0], s.y])), t.globalAlpha = this.s.alpha.call(this, e[0]), t.fillStyle = this.s.color.call(this, e[0]), t.beginPath(), this.Mo(t, d), t.fill(), h.border && (t.lineWidth = h.borderWidth || 1, h.borderColor ? t.strokeStyle = h.borderColor.call(this, e[0]) : this.gp(t, t.fillStyle), t.beginPath(), this.Mo(t, d), t.stroke()), t.lineWidth = 1, t.globalAlpha = 1
			}
		},
		$render_stackedArea: function(t, e, i, s, n, r) {
			var a, h, o, l, c, u, d, f, b, x, p, w, v, g;
			if (x = this.hp(t, e, i, s, n), l = this.s, f = l.eventRadius || Math.floor(x.cellWidth / 2), e.length) {
				p = [], g = [], w = l.offset ? i.x + .5 * x.cellWidth : i.x;
				var m = function(t, i) {
						return n ? e[t].$startY ? i - s.y + e[t].$startY : 0 : i
					},
					y = function(t, e, i) {
						var s = (i.y - e.y) / (i.x - e.x);
						return s * t + e.y - s * e.x
					};
				for (c = 0; c < e.length; c++) b = e[c], c ? w += x.cellWidth : (v = m(c, s.y), p.push([w, v])), v = m(c, this.ip(b, i, s, x)), g.push(isNaN(v) && !c ? e[c].$startY || s.y : v), v && (p.push([w, v]), r.addRect(b.id, [w - f - i.x, v - f - i.y, w + f - i.x, v + f - i.y], n), l.yAxis || (o = !l.offset && d ? "left" : "center", this.canvases[n].renderTextAt(!1, o, w, v - l.labelOffset, l.label(b))));
				if (p.push([w, m(c - 1, s.y)]), n)
					for (c = e.length - 2; c > 0; c--) w -= x.cellWidth, v = e[c].$startY, v && p.push([w, v]);
				for (p.push([p[0][0], p[0][1]]), t.globalAlpha = this.s.alpha.call(this, e[0]), t.fillStyle = this.s.color.call(this, e[0]), t.beginPath(), this.Mo(t, p), t.fill(), c = 0; c < e.length; c++) {
					if (v = g[c], !v)
						for (c == e.length - 1 && (v = e[c].$startY), u = c + 1; u < e.length; u++)
							if (g[u]) {
								a = {
									x: i.x,
									y: g[0]
								}, h = {
									x: i.x + x.cellWidth * u,
									y: g[u]
								}, v = y(i.x + x.cellWidth * c, a, h);
								break
							}
					e[c].$startY = v
				}
			}
		}
	}), webix.extend(webix.ui.chart, {
		$render_radar: function(t, e, i, s, n, r) {
			this.xp(t, e, i, s, n, r)
		},
		xp: function(t, e, i, s, n, r) {
			if (e.length) {
				for (var a = this.To(i, s), h = this.s.radius ? this.s.radius : a.radius, o = this.s.x ? this.s.x : a.x, l = this.s.y ? this.s.y : a.y, c = [], u = 0; u < e.length; u++) c.push(1);
				var d = this.Wo(c, e.length);
				this.kp = i, n || this.yp(d, o, l, h, e), this.zp(t, d, o, l, h, e, n, r)
			}
		},
		zp: function(t, e, i, s, n, r, a, h) {
			var o, l, c, u, d, f, b, x, p, w, v, g, m, y, $, _, I, C, S;
			for (c = this.s, d = c.yAxis.start, f = c.yAxis.end, S = this.Ho(d, f), g = S[0], C = g ? n / g : n / 2, I = S[1], m = -Math.PI / 2, o = l = m, p = [], x = 0, u = 0; u < r.length; u++) _ ? $ = _ : (y = c.value(r[u]), this.Bo && (y = this.Do(y)), $ = (parseFloat(y || 0) - d) * I), w = Math.floor(C * $), y = c.value(u != r.length - 1 ? r[u + 1] : r[0]), this.Bo && (y = this.Do(y)), _ = (parseFloat(y || 0) - d) * I, v = Math.floor(C * _), o = l, l = u != r.length - 1 ? m + e[u] - 1e-4 : m, b = x || this.Qo(o, i, s, w), x = this.Qo(l, i, s, v), p.push(b);
			c.fill && this.Ap(t, p, r), !c.disableLines && r.length > 2 && this.Bp(t, p, r), (!c.disableItems || r.length < 3) && this.Cp(t, p, r, a, h), p = null
		},
		Cp: function(t, e, i, s, n) {
			for (var r = 0; r < e.length; r++) this.lp(t, e[r].x, e[r].y, i[r], this.s.label.call(this, i), s, n)
		},
		Ap: function(t, e, i) {
			var s, n;
			t.globalAlpha = this.s.alpha.call(this, {}), t.beginPath();
			for (var r = 0; r < e.length; r++) t.fillStyle = this.s.fill.call(this, i[r]), s = e[r], n = e[r + 1] || e[0], r || t.moveTo(s.x, s.y), t.lineTo(n.x, n.y);
			t.fill(), t.globalAlpha = 1
		},
		Bp: function(t, e, i) {
			for (var s, n, r = 0; r < e.length; r++) s = e[r], n = e[r + 1] || e[0], this.zo(t, s.x, s.y, n.x, n.y, this.s.line.color.call(this, i[r]), this.s.line.width)
		},
		yp: function(t, e, i, s, n) {
			var r = this.s.yAxis,
				a = this.s.xAxis,
				h = r.start,
				o = r.end,
				l = r.step,
				c = {},
				u = this.to;
			if ("undefined" == typeof u.step || "undefined" == typeof u.start || "undefined" == typeof u.end) {
				var d = this.Go();
				c = this.Ao(d.min, d.max), h = c.start, o = c.end, l = c.step, r.end = o, r.start = h
			}
			var f, b, x, p, w, v = [],
				g = 0,
				m = s * l / (o - h);
			1 > l && (p = Math.min(this.Do(l), 0 >= h ? 0 : this.Do(h)), w = Math.pow(10, -p));
			var y = [];
			this.canvases.scale || (this.canvases.scale = this.lo("radar_scale"));
			var $ = this.canvases.scale.getCanvas();
			for (f = o; f >= h; f -= l) {
				var _ = this.Bo ? Math.pow(10, f) : f;
				c.fixNum && (_ = parseFloat(f).toFixed(c.fixNum)), v.push(Math.floor(g * m) + .5), w && !this.Bo && (_ = Math.round(_ * w) / w, f = _);
				var I = i - s + v[v.length - 1];
				if (this.canvases.scale.renderTextAt("middle", "left", e, I, r.template(_.toString()), "webix_axis_item_y webix_radar"), t.length < 2) return void this.Dp($, "arc", e, i, s - v[v.length - 1], -Math.PI / 2, 3 * Math.PI / 2, f);
				var C, S = -Math.PI / 2,
					k = S;
				for (b = 0; b < t.length; b++) g || y.push(k), C = S + t[b] - 1e-4, this.Dp($, t.length > 2 ? u.lineShape || "line" : "arc", e, i, s - v[v.length - 1], k, C, f, b, n[f]), k = C;
				g++
			}
			for (f = 0; f < y.length; f++) x = this.Qo(y[f], e, i, s), a.lines.call(this, n[f], f) && this.zo($, e, i, x.x, x.y, a ? a.lineColor.call(this, n[f]) : "#cfcfcf", 1), this.Ep($, e, i, s, y[f], a ? a.template.call(this, n[f]) : "&nbsp;")
		},
		Dp: function(t, e, i, s, n, r, a, h, o) {
			var l, c;
			if (0 > n) return !1;
			l = this.Qo(r, i, s, n), c = this.Qo(a, i, s, n);
			var u = this.s.yAxis;
			u.bg && (t.beginPath(), t.moveTo(i, s), "arc" == e ? t.arc(i, s, n, r, a, !1) : (t.lineTo(l.x, l.y), t.lineTo(c.x, c.y)), t.fillStyle = u.bg(h, o), t.moveTo(i, s), t.fill(), t.closePath()), u.lines.call(this, h) && (t.lineWidth = 1, t.beginPath(), "arc" == e ? t.arc(i, s, n, r, a, !1) : (t.moveTo(l.x, l.y), t.lineTo(c.x, c.y)), t.strokeStyle = u.lineColor.call(this, h), t.stroke())
		},
		Ep: function(t, e, i, s, n, r) {
			var a = this.canvases.scale.renderText(0, 0, r, "webix_axis_radar_title", 1),
				h = a.scrollWidth,
				o = a.offsetHeight,
				l = .001,
				c = this.Qo(n, e, i, s + 5),
				u = 0,
				d = 0;
			(0 > n || n > Math.PI) && (d = -o), n > Math.PI / 2 && (u = -h), Math.abs(n + Math.PI / 2) < l || Math.abs(n - Math.PI / 2) < l ? u = -h / 2 : (Math.abs(n) < l || Math.abs(n - Math.PI) < l) && (d = -o / 2), a.style.top = c.y + d + "px", a.style.left = c.x + u + "px", a.style.width = h + "px", a.style.whiteSpace = "nowrap"
		}
	}), webix.extend(webix.ui.chart, {
		$render_scatter: function(t, e, i, s, n, r) {
			if (!this.s.xValue) return !1;
			var a = this.Go(),
				h = this.Go("h", "xValue");
			n || (this.canvases.x || (this.canvases.x = this.lo("axis_x")), this.canvases.y || (this.canvases.y = this.lo("axis_y")), this.vo(this.canvases.y.getCanvas(), e, i, s, a.min, a.max), this.rp(this.canvases.x.getCanvas(), e, i, s, h.min, h.max)), a = {
				min: this.s.yAxis.start,
				max: this.s.yAxis.end
			}, h = {
				min: this.s.xAxis.start,
				max: this.s.xAxis.end
			};
			var o = this.Fp(t, e, i, s, h, a);
			this.kp = i;
			for (var l = 0; l < e.length; l++) this.Gp(t, r, i, s, o, h, a, e[l], n)
		},
		Fp: function(t, e, i, s, n, r) {
			var a = {};
			return a.totalHeight = s.y - i.y, a.totalWidth = s.x - i.x, this.Hp(a, n.min, n.max, a.totalWidth, "X"), this.Hp(a, r.min, r.max, a.totalHeight, "Y"), a
		},
		Gp: function(t, e, i, s, n, r, a, h, o) {
			var l = this.Ip(n, s, i, r, h, "X"),
				c = this.Ip(n, i, s, a, h, "Y");
			this.lp(t, l, c, h, this.s.label.call(this, h), o, e)
		},
		Ip: function(t, e, i, s, n, r) {
			var a = this.s["X" == r ? "xValue" : "value"].call(this, n),
				h = t["valueFactor" + r],
				o = (parseFloat(a || 0) - s.min) * h,
				l = t["unit" + r],
				c = i[r.toLowerCase()] - ("X" == r ? -1 : 1) * Math.floor(l * o);
			return 0 > o && (c = i[r.toLowerCase()]), a > s.max && (c = e[r.toLowerCase()]), a < s.min && (c = i[r.toLowerCase()]), c
		},
		Hp: function(t, e, i, s, n) {
			var r = this.Ho(e, i);
			n = n || "", t["relValue" + n] = r[0], t["valueFactor" + n] = r[1], t["unit" + n] = t["relValue" + n] ? s / t["relValue" + n] : 10
		}
	}), webix.extend(webix.ui.chart, {
		presets: {
			simple: {
				item: {
					borderColor: "#ffffff",
					color: "#2b7100",
					shadow: !1,
					borderWidth: 2
				},
				line: {
					color: "#8ecf03",
					width: 2
				}
			},
			plot: {
				color: "#1293f8",
				item: {
					borderColor: "#636363",
					borderWidth: 1,
					color: "#ffffff",
					type: "r",
					shadow: !1
				},
				line: {
					color: "#1293f8",
					width: 2
				}
			},
			diamond: {
				color: "#b64040",
				item: {
					borderColor: "#b64040",
					color: "#b64040",
					type: "d",
					radius: 3,
					shadow: !0
				},
				line: {
					color: "#ff9000",
					width: 2
				}
			},
			point: {
				color: "#fe5916",
				disableLines: !0,
				fill: !1,
				disableItems: !1,
				item: {
					color: "#feb916",
					borderColor: "#fe5916",
					radius: 2,
					borderWidth: 1,
					type: "r"
				},
				alpha: 1
			},
			line: {
				line: {
					color: "#3399ff",
					width: 2
				},
				item: {
					color: "#ffffff",
					borderColor: "#3399ff",
					radius: 2,
					borderWidth: 2,
					type: "d"
				},
				fill: !1,
				disableItems: !1,
				disableLines: !1,
				alpha: 1
			},
			area: {
				fill: "#3399ff",
				line: {
					color: "#3399ff",
					width: 1
				},
				disableItems: !0,
				alpha: .2,
				disableLines: !1
			},
			round: {
				item: {
					radius: 3,
					borderColor: "#3f83ff",
					borderWidth: 1,
					color: "#3f83ff",
					type: "r",
					shadow: !1,
					alpha: .6
				}
			},
			square: {
				item: {
					radius: 3,
					borderColor: "#447900",
					borderWidth: 2,
					color: "#69ba00",
					type: "s",
					shadow: !1,
					alpha: 1
				}
			},
			column: {
				color: "RAINBOW",
				gradient: !1,
				barWidth: 45,
				radius: 0,
				alpha: 1,
				border: !0
			},
			stick: {
				barWidth: 5,
				gradient: !1,
				color: "#67b5c9",
				radius: 2,
				alpha: 1,
				border: !1
			},
			alpha: {
				color: "#b9a8f9",
				barWidth: 70,
				gradient: "falling",
				radius: 0,
				alpha: .5,
				border: !0
			}
		}
	}), webix.protoUI({
		name: "calendar",
		defaults: {
			date: new Date,
			select: !1,
			navigation: !0,
			monthSelect: !0,
			weekHeader: !0,
			weekNumber: !1,
			skipEmptyWeeks: !1,
			calendarHeader: "%F %Y",
			calendarWeekHeader: "W#",
			events: webix.Date.isHoliday,
			minuteStep: 5,
			icons: !1,
			timepickerHeight: 30,
			headerHeight: 70,
			dayTemplate: function(t) {
				return t.getDate()
			},
			width: 260,
			height: 250
		},
		dayTemplate_setter: webix.template,
		calendarHeader_setter: webix.Date.dateToStr,
		calendarWeekHeader_setter: webix.Date.dateToStr,
		calendarTime_setter: function(t) {
			return this._w = t, webix.Date.dateToStr(t)
		},
		date_setter: function(t) {
			return this.Jp(t)
		},
		maxDate_setter: function(t) {
			return this.Jp(t)
		},
		minDate_setter: function(t) {
			return this.Jp(t)
		},
		minTime_setter: function(t) {
			return "string" == typeof t && (t = webix.i18n.parseTimeFormatDate(t), t = [t.getHours(), t.getMinutes()]), t
		},
		maxTime_setter: function(t) {
			return "string" == typeof t && (t = webix.i18n.parseTimeFormatDate(t), t = [t.getHours(), t.getMinutes()]), t
		},
		$init: function() {
			this.x.className += " webix_calendar", this.Kp = {}, this.Lp = this.Mp = null, this.Np = 0
		},
		type_setter: function(t) {
			return "time" == t && (this.jq = !0, this.Np = -1), t
		},
		$setSize: function(t, e) {
			webix.ui.view.prototype.$setSize.call(this, t, e) && this.render()
		},
		$getSize: function(t, e) {
			if (this.s.cellHeight) {
				var i = this.Op(this.s.date);
				this.s.height = this.s.cellHeight * i.Sp + (webix.skin.$active.calendarHeight || 70)
			}
			return webix.ui.view.prototype.$getSize.call(this, t, e)
		},
		Op: function(t, e) {
			if (!this.Pp || e) {
				var i = t.getMonth(),
					s = t.getFullYear(),
					n = new Date(s, i + 1, 1),
					r = webix.Date.weekStart(new Date(s, i, 1)),
					a = Math.round((n.valueOf() - r.valueOf()) / 864e5),
					h = this.s.skipEmptyWeeks ? Math.ceil(a / 7) : 6;
				this.Pp = {
					Qp: i,
					Rp: r,
					zc: n,
					Sp: h
				}
			}
			return this.Pp
		},
		$skin: function() {
			webix.skin.$active.calendar && (webix.skin.$active.calendar.width && (this.defaults.width = webix.skin.$active.calendar.width), webix.skin.$active.calendar.height && (this.defaults.height = webix.skin.$active.calendar.height), webix.skin.$active.calendar.headerHeight && (this.defaults.headerHeight = webix.skin.$active.calendar.headerHeight), webix.skin.$active.calendar.timepickerHeight && (this.defaults.timepickerHeight = webix.skin.$active.calendar.timepickerHeight))
		},
		Tp: function(t) {
			for (var e = this.Op(t), i = this.s, s = [], n = [], r = this.bc - 36, a = this.dc - this.s.headerHeight - 10 - (this.s.timepicker || this.ax ? this.s.timepickerHeight : 0), h = i.weekNumber ? 8 : 7, o = 0; h > o; o++) n[o] = Math.ceil(r / (h - o)), r -= n[o];
			for (var l = e.Sp, c = 0; l > c; c++) s[c] = Math.ceil(a / (l - c)), a -= s[c];
			return [n, s]
		},
		icons_setter: function(t) {
			this.ax = t ? "object" == typeof t ? t : this.Sx : null
		},
		ax: [],
		Sx: [{
			template: function() {
				return "<span class='webix_cal_icon_today webix_cal_icon'>" + webix.i18n.calendar.today + "</span>"
			},
			on_click: {
				webix_cal_icon_today: function() {
					this.setValue(new Date), this.callEvent("onTodaySet", [this.getSelectedDate()])
				}
			}
		}, {
			template: function() {
				return "<span class='webix_cal_icon_clear webix_cal_icon'>" + webix.i18n.calendar.clear + "</span>"
			},
			on_click: {
				webix_cal_icon_clear: function() {
					this.setValue(""), this.callEvent("onDateClear", [this.getSelectedDate()])
				}
			}
		}],
		refresh: function() {
			this.render()
		},
		render: function() {
			this.Np = 0, this.Up = !1;
			var t = this.s;
			if (this.isVisible(t.id)) {
				this.Vp = webix.Date.datePart(new Date), this.callEvent("onBeforeRender", []);
				var e = this.s.date,
					i = this.Op(e, !0),
					s = this.Tp(e),
					n = s[0],
					r = s[1],
					a = "<div class='webix_cal_month'><span class='webix_cal_month_name" + (this.s.monthSelect ? "" : " webix_readonly") + "'>" + t.calendarHeader(e) + "</span>";
				if (t.navigation && (a += "<div class='webix_cal_prev_button'></div><div class='webix_cal_next_button'></div>"), a += "</div>", t.weekHeader && (a += "<div class='webix_cal_header'>" + this.Wp(n) + "</div>"), a += "<div class='webix_cal_body'>" + this.Xp(n, r, i) + "</div>", (this.s.timepicker || this.ax) && (a += "<div class='webix_cal_footer'>", this.s.timepicker && (a += this.Yp(e)), this.ax && (a += this.bx()), a += "</div>"), this.w.innerHTML = a, "time" == this.s.type) {
					var h = this.s.date;
					h && ("string" == typeof h ? e = webix.i18n.parseTimeFormatDate(h) : webix.isArray(h) && (e.setHours(h[0]), e.setMinutes(h[1]))), this.yt(-1, e)
				}
				this.callEvent("onAfterRender", [])
			}
		},
		bx: function(t) {
			for (var e = "<div class='webix_cal_icons'>", i = this.ax, s = 0; s < i.length; s++) {
				if (i[s].template) {
					var n = "function" == typeof i[s].template ? i[s].template : webix.template(i[s].template);
					e += n.call(this, t)
				}
				i[s].on_click && webix.extend(this.on_click, i[s].on_click)
			}
			return e += "</div>"
		},
		Yp: function(t) {
			var e = this.s.calendarTime || webix.i18n.timeFormatStr;
			return "<div class='webix_cal_time" + (this.ax ? " webix_cal_time_icons" : "") + "'><span class='webix_icon fa-clock-o'></span> " + e(t) + "</div>"
		},
		Wp: function(t) {
			var e = this.s,
				i = "",
				s = 0;
			e.weekNumber && (s = 1, i += "<div class='webix_cal_week_header' style='width: " + t[0] + "px;' >" + e.calendarWeekHeader() + "</div>");
			for (var n = webix.Date.startOnMonday ? 1 : 0, r = 0; 7 > r; r++) {
				var a = (n + r) % 7,
					h = webix.i18n.calendar.dayShort[a];
				i += "<div day='" + a + "' style='width: " + t[r + s] + "px;' >" + h + "</div>"
			}
			return i
		},
		blockDates_setter: function(t) {
			return webix.toFunctor(t, this.$scope)
		},
		Zp: function(t, e) {
			var i = "";
			return webix.Date.equal(t, this.Vp) && (i += " webix_cal_today"), this.sz(t) || (i += " webix_cal_day_disabled"), webix.Date.equal(t, this.Lp) && (i += " webix_cal_select"), t.getMonth() != e.Qp && (i += " webix_cal_outside"), this.s.events && (i += " " + this.s.events(t)), i += " webix_cal_day"
		},
		Xp: function(t, e, i) {
			for (var s = this.s, n = "", r = webix.Date.datePart(webix.Date.copy(i.Rp)), a = s.weekNumber ? 1 : 0, h = webix.Date.getISOWeek(webix.Date.add(r, 2, "day", !0)), o = (this.s.minDate || new Date(1, 1, 1), this.s.maxDate || new Date(9999, 1, 1), 0); o < e.length; o++) {
				n += "<div class='webix_cal_row' style='height:" + e[o] + "px;line-height:" + e[o] + "px'>", a && (!r.getMonth() && r.getDate() < 7 && (h = webix.Date.getISOWeek(webix.Date.add(r, 2, "day", !0))), n += "<div class='webix_cal_week_num' style='width:" + t[0] + "px'>" + h + "</div>");
				for (var l = a; l < t.length; l++) {
					var c = this.Zp(r, i),
						u = this.s.dayTemplate.call(this, r);
					n += "<div day='" + l + "' class='" + c + "' style='width:" + t[l] + "px'><span class='webix_cal_day_inner'>" + u + "</span></div>", r = webix.Date.add(r, 1, "day"), r.getHours() && (r = webix.Date.datePart(r))
				}
				n += "</div>", h++
			}
			return n
		},
		$p: function(t, e) {
			var i = this.s.date;
			e || (e = this.aq[this.Np]._p), this.Np || (i = webix.Date.copy(i), i.setDate(1));
			var s = webix.Date.add(i, t * e, "month", !0);
			this.bq(i, s)
		},
		bq: function(t, e) {
			this.callEvent("onBeforeMonthChange", [t, e]) && (this.Np ? this.cq(e) : this.showCalendar(e), this.callEvent("onAfterMonthChange", [e, t]))
		},
		aq: {
			"-2": {
				lz: function(t) {
					var e = this.s,
						i = e.date,
						s = !1,
						n = e.minTime ? e.minTime[0] : 0,
						r = e.maxTime ? e.maxTime[0] + (e.maxTime[1] ? 1 : 0) : 24,
						a = e.minTime && i.getHours() == n ? e.minTime[1] : 0,
						h = e.maxTime && e.maxTime[1] && i.getHours() == r - 1 ? e.maxTime[1] : 60;
					if (this.s.blockTime) {
						var o = webix.Date.copy(i);
						o.setMinutes(t), s = this.s.blockTime(o)
					}
					return a > t || t >= h || s
				},
				dq: function(t, e) {
					t.setMinutes(e)
				}
			},
			"-1": {
				lz: function(t) {
					var e = this.s,
						i = e.date,
						s = e.minTime ? e.minTime[0] : 0,
						n = e.maxTime ? e.maxTime[0] + (e.maxTime[1] ? 1 : 0) : 24;
					if (s > t || t >= n) return !0;
					if (e.blockTime) {
						var r = webix.Date.copy(i);
						r.setHours(t);
						for (var a = e.minTime && t == s ? e.minTime[1] : 0, h = e.maxTime && e.maxTime[1] && t == n - 1 ? e.maxTime[1] : 60, o = a; h > o; o += e.minuteStep)
							if (r.setMinutes(o), !e.blockTime(r)) return !1;
						return !0
					}
				},
				dq: function(t, e) {
					t.setHours(e)
				}
			},
			0: {
				_p: 1
			},
			1: {
				lz: function(t, e) {
					var i, s, n = !1,
						r = e.s.minDate || null,
						a = e.s.maxDate || null,
						h = e.s.date.getFullYear();
					return r && a && (i = r.getFullYear(), s = a.getFullYear(), (i > h || h == i && r.getMonth() > t || h > s || h == s && a.getMonth() < t) && (n = !0)), n
				},
				Jv: function(t, e) {
					return t < e.s.minDate ? t = webix.Date.copy(e.s.minDate) : t > e.s.maxDate && (t = webix.Date.copy(e.s.maxDate)), t
				},
				eq: function(t) {
					return t.getFullYear()
				},
				fq: function(t) {
					return webix.i18n.calendar.monthShort[t]
				},
				dq: function(t, e) {
					e != t.getMonth() && t.setDate(1), t.setMonth(e)
				},
				_p: 12
			},
			2: {
				lz: function(t, e) {
					t += this.gq;
					var i = !1,
						s = e.s.minDate,
						n = e.s.maxDate;
					return s && n && (s.getFullYear() > t || n.getFullYear() < t) && (i = !0), i
				},
				Jv: function(t, e) {
					return t < e.s.minDate ? t = webix.Date.copy(e.s.minDate) : t > e.s.maxDate && (t = webix.Date.copy(e.s.maxDate)), t
				},
				eq: function(t) {
					var e = t.getFullYear();
					return this.gq = e = e - e % 10 - 1, e + " - " + (e + 10)
				},
				fq: function(t) {
					return this.gq + t
				},
				dq: function(t, e) {
					t.setFullYear(this.gq + e)
				},
				_p: 120
			}
		},
		mz: function() {
			var t, e, i;
			if (e = this.aq[-1].lz.call(this, this.s.date.getHours()))
				for (t = 0; 24 > t; t++)
					if (!this.aq[-1].lz.call(this, t)) {
						this.s.date.setHours(t);
						break
					}
			if (i = this.aq[-2].lz.call(this, this.s.date.getMinutes()))
				for (t = 0; 60 > t; t += this.s.minuteStep)
					if (!this.aq[-2].lz.call(this, t)) {
						this.s.date.setMinutes(t);
						break
					}
		},
		cq: function(t) {
			var e, i, s, n, r, a = "",
				h = this.s.weekHeader ? 2 : 1,
				o = this.aq[this.Np],
				l = this.w.childNodes;
			if (t && (this.s.date = t), this.Up || (this.hq = this.w.offsetHeight - this.s.headerHeight - this.s.timepickerHeight, this.iq = l[h].offsetWidth, this.Up = 1), this.jq) {
				i = this.hq / 6;
				var c = 6,
					u = this._w || webix.i18n.timeFormat,
					d = u.match(/%([a,A])/);
				for (d && c++, r = parseInt((this.iq - 3) / c, 10), a += "<div class='webix_time_header'>" + this.kq(r, d) + "</div>", a += "<div  class='webix_cal_body' style='height:" + this.hq + "px'>", this.mz(), a += "<div class='webix_hours'>", n = this.s.date.getHours(), s = 0; 24 > s; s++) {
					if (e = "", d && s % 4 === 0) {
						var f = s ? 12 == s ? "pm" : "" : "am";
						a += "<div class='webix_cal_block_empty" + e + "' style='" + this.lq(r, i) + "clear:both;'>" + f + "</div>"
					}
					this.aq[-1].lz.call(this, s) ? e += " webix_cal_day_disabled" : n == s && (e += " webix_selected");
					var b = webix.Date.toFixed(d && s > 12 ? s - 12 : s);
					a += "<div class='webix_cal_block" + e + "' data-value='" + s + "' style='" + this.lq(r, i) + (s % 4 !== 0 || d ? "" : "clear:both;") + "'>" + b + "</div>"
				}
				for (a += "</div>", a += "<div class='webix_minutes'>", n = this.s.date.getMinutes(), s = 0; 60 > s; s += this.s.minuteStep) e = "", this.aq[-2].lz.call(this, s) ? e = " webix_cal_day_disabled" : n == s && (e = " webix_selected"), a += "<div class='webix_cal_block webix_cal_block_min" + e + "' data-value='" + s + "' style='" + this.lq(r, i) + (s % 2 === 0 ? "clear:both;" : "") + "'>" + webix.Date.toFixed(s) + "</div>";
				a += "</div>", a += "</div>", a += "<div  class='webix_time_footer'>" + this.mq() + "</div>", this.w.innerHTML = a
			} else {
				for (l[0].firstChild.innerHTML = o.eq(this.s.date), i = this.hq / 3, r = this.iq / 4, this.sz(this.s.date) && (n = 1 == this.Np ? this.s.date.getMonth() : this.s.date.getFullYear()), s = 0; 12 > s; s++) e = n == (1 == this.Np ? s : o.fq(s)) ? " webix_selected" : "", o.lz(s, this) && (e += " webix_cal_day_disabled"), a += "<div class='webix_cal_block" + e + "' data-value='" + s + "' style='" + this.lq(r, i) + "'>" + o.fq(s) + "</div>";
				h - 1 && (l[h - 1].style.display = "none"), l[h].innerHTML = a, l[h + 1] ? l[h + 1].innerHTML = this.mq() : this.w.innerHTML += "<div  class='webix_time_footer'>" + this.mq() + "</div>", l[h].style.height = this.hq + "px"
			}
		},
		lq: function(t, e) {
			return "width:" + t + "px; height:" + e + "px; line-height:" + e + "px;"
		},
		mq: function() {
			return "<input type='button' style='width:100%' class='webix_cal_done' value='" + webix.i18n.calendar.done + "'>"
		},
		kq: function(t, e) {
			var i = t * (e ? 5 : 4),
				s = 2 * t;
			return "<div class='webix_cal_hours' style='width:" + i + "px'>" + webix.i18n.calendar.hours + "</div><div class='webix_cal_minutes' style='width:" + s + "px'>" + webix.i18n.calendar.minutes + "</div>"
		},
		yt: function(t, e) {
			this.callEvent("onBeforeZoom", [t]) && (this.Np = t, t ? this.cq(e) : this.showCalendar(e), this.callEvent("onAfterZoom", [t]))
		},
		Jv: function(t) {
			return !this.sz(t) && this.aq[this.Np].Jv && (t = this.aq[this.Np].Jv(t, this)), t
		},
		nq: function(t) {
			var e = this.s.date,
				i = webix.Date.copy(e);
			this.aq[this.Np].dq(i, t);
			var s = this.Np - 1;
			i = this.Jv(i), this.sz(i) && this.yt(s, i)
		},
		zt: function(t) {
			this.callEvent("onBeforeDateSelect", [t]) && (this.selectDate(t, !0), this.callEvent("onDateSelect", [t]), this.callEvent("onAfterDateSelect", [t]))
		},
		on_click: {
			webix_cal_prev_button: function() {
				this.$p(-1)
			},
			webix_cal_next_button: function() {
				this.$p(1)
			},
			webix_cal_day_disabled: function() {
				return !1
			},
			webix_cal_outside: function() {
				return this.s.navigation ? void 0 : !1
			},
			webix_cal_day: function(t, e, i) {
				var s = webix.html.index(i) - (this.s.weekNumber ? 1 : 0),
					n = webix.html.index(i.parentNode),
					r = webix.Date.add(this.Op().Rp, s + 7 * n, "day", !0);
				this.s.timepicker && (r.setHours(this.s.date.getHours()), r.setMinutes(this.s.date.getMinutes())), this.zt(r)
			},
			webix_cal_time: function() {
				if (this.aq[this.Np - 1]) {
					this.jq = !0;
					var t = this.Np - 1;
					this.yt(t)
				}
			},
			webix_cal_done: function() {
				var t = webix.Date.copy(this.s.date);
				t = this.Jv(t), this.zt(t)
			},
			webix_cal_month_name: function() {
				if (this.jq = !1, 2 != this.Np && this.s.monthSelect) {
					var t = Math.max(this.Np, 0) + 1;
					this.yt(t)
				}
			},
			webix_cal_block: function(t, e, i) {
				if (this.jq) {
					if (-1 !== i.className.indexOf("webix_cal_day_disabled")) return !1;
					var s = -1 != i.className.indexOf("webix_cal_block_min") ? this.Np - 1 : this.Np,
						n = this.s.date,
						r = webix.Date.copy(n);
					this.aq[s].dq(r, 1 * i.getAttribute("data-value")), this.cq(r)
				} else -1 == i.className.indexOf("webix_cal_day_disabled") && this.nq(1 * i.getAttribute("data-value"))
			}
		},
		Jp: function(t, e) {
			return t ? ("string" == typeof t && (t = e ? webix.Date.strToDate(e)(t) : webix.i18n.parseFormatDate(t)), t) : webix.Date.datePart(new Date)
		},
		sz: function(t) {
			var e = this.s.blockDates && this.s.blockDates.call(this, t),
				i = this.s.minDate,
				s = this.s.maxDate,
				n = i > t || t > s;
			return !e && !n
		},
		showCalendar: function(t) {
			t = this.Jp(t), this.s.date = t, this.render(), this.resize()
		},
		getSelectedDate: function() {
			return this.Mp ? webix.Date.copy(this.Mp) : this.Mp
		},
		getVisibleDate: function() {
			return webix.Date.copy(this.s.date)
		},
		setValue: function(t) {
			this.selectDate(t, !0)
		},
		getValue: function(t) {
			var e = this.getSelectedDate();
			return t && (e = webix.Date.dateToStr(t)(e)), e
		},
		selectDate: function(t, e) {
			t ? (t = this.Jp(t), this.Mp = t, this.Lp = webix.Date.datePart(webix.Date.copy(t))) : (this.Mp = null, this.Lp = null, this.s.date && webix.Date.datePart(this.s.date)), e ? this.showCalendar(t) : this.render(), this.callEvent("onChange", [t])
		},
		locate: function() {
			return null
		}
	}, webix.MouseEvents, webix.ui.view, webix.EventSystem), webix.protoUI({
		name: "property",
		$init: function() {
			this.w.className += " webix_property", this.Ns = []
		},
		defaults: {
			nameWidth: 100,
			editable: !0
		},
		on_render: {
			checkbox: function(t) {
				return "<input type='checkbox' class='webix_property_check' " + (t ? "checked" : "") + ">"
			},
			color: function(t) {
				return '<div class="webix_property_col_val"><div class=\'webix_property_col_ind\' style="background-color:' + (t || "#FFFFFF") + ';"></div><span>' + t + "</span></div>"
			}
		},
		on_edit: {
			label: !1
		},
		ad: "webix_f_id",
		on_click: {
			webix_property_check: function(t) {
				var e = this.locate(t);
				return this.getItem(e).value = !this.getItem(e).value, this.callEvent("onCheck", [e, this.getItem(e).value]), !1
			}
		},
		on_dblclick: {},
		registerType: function(t, e) {
			if (e.template && (this.on_render[t] = e.template), e.editor && (this.on_edit[t] = e.editor), e.click)
				for (var i in e.click) this.on_click[i] = e.click[i]
		},
		elements_setter: function(t) {
			this.oq = {};
			for (var e = 0; e < t.length; e++) {
				var i = t[e];
				"multiselect" == i.type && (i.optionslist = !0), i.id = i.id || webix.uid(), i.label = i.label || "", i.value = i.value || "", this.oq[i.id] = e, this.template = this.Et(t[e])
			}
			return t
		},
		showItem: function(t) {
			webix.RenderStack.showItem.call(this, t)
		},
		locate: function() {
			return webix.html.locate(arguments[0], this.ad)
		},
		getItemNode: function(t) {
			return this.y.childNodes[this.oq[t]]
		},
		getItem: function(t) {
			return this.s.elements[this.oq[t]]
		},
		ii: function(t) {
			var e = this.getItem(t).type;
			if ("checkbox" == e) return "inline-checkbox";
			var i = this.on_edit[e];
			return i === !1 ? !1 : i || e
		},
		li: function(t) {
			return this.getItem(t)
		},
		ui: function(t, e, i) {
			var s = this.oq[t.id],
				n = this.s.elements;
			if (i) {
				for (var r = s + 1; r < n.length; r++)
					if (e.call(this, n[r].id)) return n[r].id
			} else
				for (var r = s - 1; r >= 0; r--)
					if (e.call(this, n[r].id)) return n[r].id; return null
		},
		updateItem: function() {
			this.refresh()
		},
		ug: function(t) {
			var e = this.getItemNode(t);
			return {
				left: e.offsetLeft + this.s.nameWidth,
				top: e.offsetTop,
				height: e.firstChild.offsetHeight,
				width: this.pq,
				parent: this.w
			}
		},
		setValues: function(t, e) {
			this.s.complexData && (t = webix.CodeParser.collapseNames(t)), e || this.qq();
			for (var i in t) {
				var s = this.getItem(i);
				s && (s.value = t[i])
			}
			this.rq = t, this.refresh()
		},
		qq: function() {
			for (var t = this.s.elements, e = 0; e < t.length; e++) t[e].value = ""
		},
		getValues: function() {
			for (var t = webix.clone(this.rq || {}), e = 0; e < this.s.elements.length; e++) {
				var i = this.s.elements[e];
				"label" != i.type && (t[i.id] = i.value)
			}
			return this.s.complexData && (t = webix.CodeParser.expandNames(t)), t
		},
		refresh: function() {
			this.render()
		},
		$setSize: function(t, e) {
			webix.ui.view.prototype.$setSize.call(this, t, e) && (this.pq = this.bc - this.s.nameWidth, this.render())
		},
		$getSize: function(t, e) {
			if (this.s.autoheight) {
				var i = this.s.elements.length;
				this.s.height = Math.max(this.type.height * i, this.s.minHeight || 0)
			}
			return webix.ui.view.prototype.$getSize.call(this, t, e)
		},
		jb: function() {
			var t = [],
				e = this.s.elements;
			if (e)
				for (var i = 0; i < e.length; i++) {
					var s = e[i];
					s.css && "object" == typeof s.css && (s.css = webix.html.createCss(s.css));
					var n = '<div webix_f_id="' + s.id + '" class="webix_property_line ' + (s.css || "") + '">';
					if ("label" == s.type) t[i] = n + "<div class='webix_property_label_line'>" + s.label + "</div></div>";
					else {
						var r, a = this.on_render[s.type],
							h = "<div class='webix_property_label' style='width:" + this.s.nameWidth + "px'>" + s.label + "</div><div class='webix_property_value' style='width:" + this.pq + "px'>";
						r = s.collection || s.options ? s.template(s, s.value) : s.format ? s.format(s.value) : s.value, a && (r = a.call(this, s.value, s)), t[i] = n + h + r + "</div></div>"
					}
				}
			return t.join("")
		},
		type: {
			height: 24,
			templateStart: webix.template(""),
			templateEnd: webix.template("</div>")
		},
		$skin: function() {
			this.type.height = webix.skin.$active.propertyItemHeight || 24
		}
	}, webix.AutoTooltip, webix.EditAbility, webix.MapCollection, webix.MouseEvents, webix.Scrollable, webix.SingleRender, webix.AtomDataLoader, webix.EventSystem, webix.ui.view), webix.protoUI({
		name: "colorboard",
		defaults: {
			template: '<div style="width:100%;height:100%;background-color:{obj.val}"></div>',
			palette: null,
			height: 220,
			width: 220,
			cols: 12,
			rows: 10,
			minLightness: .15,
			maxLightness: 1
		},
		$init: function() {
			webix.event(this.x, "click", webix.bind(function(t) {
				var e = webix.html.locate(t, "webix_val");
				this.setValue(e), this.callEvent("onSelect", [this.s.value, t])
			}, this))
		},
		sq: function(t) {
			var e = this.s.palette;
			t = t.toUpperCase();
			for (var i = 0, s = e.length; s > i; i++)
				for (var n = 0, r = e[i].length; r > n; n++)
					if (e[i][n].toUpperCase() == t) return {
						row: i,
						col: n
					};
			return null
		},
		$setSize: function(t, e) {
			webix.ui.view.prototype.$setSize.call(this, t, e) && this.render()
		},
		getValue: function() {
			return this.s.value
		},
		re: function() {
			return this.x.firstChild
		},
		setValue: function(t) {
			return t ? ("#" != t.charAt(0) && (t = "#" + t), this.s.value = t, this.$setValue(t), t) : void 0
		},
		uq: null,
		vq: function() {
			if (this.uq && this.uq.parentNode) return this.uq;
			var t = this.uq = document.createElement("div");
			return t.className = "webix_color_selector", this.x.lastChild.appendChild(t), t
		},
		$setValue: function(t) {
			if (this.isVisible(this.s.id)) {
				var e, i, s, n, r, a = 0,
					h = 0;
				if (s = this.sq(t), s && (e = this.x.lastChild.childNodes[s.row].childNodes[s.col]), !(e && e.parentNode && e.parentNode.parentNode)) return void(this.uq && (this.uq.style.left = "-100px"));
				n = e.parentNode, a = e.offsetLeft - n.offsetLeft, h = -(this.$height - (e.offsetTop - n.parentNode.offsetTop)), i = this.vq(), r = ["left:" + a + "px", "top:" + h + "px", "width:" + e.style.width, "height:" + e.style.height].join(";"), "undefined" != typeof i.style.cssText ? i.style.cssText = r : i.setAttribute("style", r)
			}
		},
		wq: function(t) {
			function e(t) {
				return webix.color.toHex(t, 2)
			}

			function i(t, i, s) {
				return "#" + e(Math.floor(t)) + e(Math.floor(i)) + e(Math.floor(s))
			}

			function s(t, e, i) {
				var s, r, a;
				if (e) {
					var h = .5 > i ? i * (1 + e) : i + e - i * e,
						o = 2 * i - h;
					s = n(o, h, t + 1 / 3), r = n(o, h, t), a = n(o, h, t - 1 / 3)
				} else s = r = a = i;
				return {
					r: 255 * s,
					g: 255 * r,
					b: 255 * a
				}
			}

			function n(t, e, i) {
				return 0 > i && (i += 1), i > 1 && (i -= 1), 1 / 6 > i ? t + 6 * (e - t) * i : .5 >= i ? e : 2 / 3 > i ? t + (e - t) * (2 / 3 - i) * 6 : t
			}

			function r(t) {
				for (var e = [], s = 255, n = s / t, r = 0; t > r; r++) s = Math.round(s > 0 ? s : 0), e.push(i(s, s, s)), s -= n;
				return e[e.length - 1] = "#000000", e
			}
			var a = [],
				h = t.rows - 1,
				o = 1 / t.cols,
				l = (t.maxLightness - t.minLightness) / h,
				c = null;
			a.push(r(t.cols));
			for (var u = 0, d = t.minLightness; h > u; u++) {
				c = [];
				for (var f = 0, b = 0; f < t.cols; f++) {
					var x = s(b, 1, d);
					c.push(i(x.r, x.g, x.b)), b += o
				}
				a.push(c), d += l
			}
			this.s.palette = a
		},
		render: function() {
			function t(t, e, i) {
				for (var r = '<div class="webix_color_row">', a = 0; a < t.length; a++) n.width = e[a], n.height = i, n.val = t[a], r += s(n);
				return r += "</div>"
			}
			if (this.isVisible(this.s.id)) {
				this.s.palette || this.wq(this.s);
				var e = this.s.palette;
				this.callEvent("onBeforeRender", []);
				for (var i = this.s, s = webix.template('<div style="width:{obj.width}px;height:{obj.height}px;" webix_val="{obj.val}">' + (i.template || "") + "</div>"), n = {
						width: 0,
						height: 0,
						val: 0
					}, r = this.$width, a = this.$height, h = [], o = '<div class="webix_color_palette">', l = "object" == typeof e[0] ? e[0] : e, c = 0; c < l.length; c++) h[c] = Math.floor(r / (l.length - c)), r -= h[c];
				if ("object" == typeof e[0])
					for (var u = 0; u < e.length; u++) {
						var d = Math.floor(a / (e.length - u));
						a -= d;
						var f = e[u];
						o += t(f, h, d)
					} else o += t(e, h, a);
				o += "</div>", this.x.innerHTML = o, this.uq = null, this.s.value && this.$setValue(this.s.value), this.callEvent("onAfterRender", [])
			}
		},
		refresh: function() {
			this.render()
		}
	}, webix.ui.view, webix.EventSystem), webix.protoUI({
		name: "resizer",
		defaults: {
			width: 7,
			height: 7
		},
		$init: function(t) {
			this.x.className += " webix_resizer";
			var e = this.getParentView().Cc;
			webix.event(this.x, webix.env.mouse.down, this.xq, {
				bind: this
			}), webix.event(document.body, webix.env.mouse.up, this.yq, {
				bind: this
			});
			var i = this.zq();
			this.Aq = !1, this.Bq = i, this.Cq = "x" == i ? "width" : "height", "x" == i ? t.height = 0 : t.width = 0, e > 0 ? (this.x.className += " webix_resizer_v" + i, this.x.style.marginRight = "-" + e + "px", "x" == i ? t.width = e : t.height = e, this.$nospace = !0) : this.x.className += " webix_resizer_" + i, this.x.innerHTML = "<div class='webix_resizer_content'></div>", "y" == i && e > 0 && (this.x.style.marginBottom = "-" + (t.height || this.defaults.height) + "px")
		},
		xq: function(t) {
			var e = this.Dq();
			e && !this.s.disabled && (t = t || event, this.Aq = !0, this.Pl = webix.html.pos(t), this.Eq = [], this.Fq(t, e[0]))
		},
		yq: function() {
			this.Aq = !1, this.Pl = !1
		},
		Fq: function(t, e) {
			var i, s, n, r, a;
			t = t || event, i = this.Bq, this.getParentView().x.style.position = "relative", n = webix.html.offset(this.x), r = webix.html.offset(this.getParentView().x), a = n[i] - r[i], s = webix.html.offset(e.$view)[i] - webix.html.offset(this.getParentView().$view)[i], this.Rl = [i, e, a, s], this.Gq = new webix.ui.resizearea({
				container: this.getParentView().x,
				dir: i,
				eventPos: this.Pl[i],
				start: a - 1,
				height: this.$height,
				width: this.$width,
				border: 1,
				margin: this.getParentView()["_padding" + i.toUpperCase()]
			}), this.Gq.attachEvent("onResizeEnd", webix.bind(this.Hq, this)), this.Gq.attachEvent("onResize", webix.bind(this.Iq, this)), webix.html.addCss(document.body, "webix_noselect", 1)
		},
		zq: function() {
			return this.getParentView().mc ? "y" : "x"
		},
		Iq: function() {
			var t, e, i, s, n, r, a, h, o, l;
			if (this.Rl)
				for (t = this.Dq(), n = this.Rl[0], s = this.Gq.Jl - this.Rl[2], o = this.Jq(t, n, s), l = t[0]["$" + this.Cq] + t[1]["$" + this.Cq], a = "y" == n ? ["minHeight", "maxHeight"] : ["minWidth", "maxWidth"], r = 0; 2 > r; r++) {
					e = t[r].s, i = r ? -s : s;
					var c = e[a[0]],
						u = e[a[1]];
					if (i > 0 && u && u <= o[r] || 0 > i && (c || 3) >= o[r]) return this.Eq[r] = i > 0 ? u : c || 3, h = this.Kq(t, n), void(this.Gq.Dl.style["y" == n ? "top" : "left"] = this.Rl[3] + h[0] + "px");
					o[r] < 3 ? this.Gq.Dl.style["y" == n ? "top" : "left"] = this.Rl[3] + r * l + 1 + "px" : this.Eq[r] = null
				}
		},
		Dq: function() {
			var t, e;
			for (t = this.getParentView().q, e = 0; e < t.length; e++)
				if (t[e] == this) return !t[e - 1] || t[e - 1].s.$noresize ? null : !t[e + 1] || t[e + 1].s.$noresize ? null : [t[e - 1], t[e + 1]]
		},
		Hq: function(t) {
			if ("undefined" != typeof t) {
				var e, i, s, n, r, a = this.getParentView().mc;
				if (this.Lq = null, this.Rl) {
					if (i = this.Rl[0], s = t - this.Rl[2], e = this.Dq(), e[0] && e[1]) {
						r = this.Mq(e, i, s);
						for (var n = 0; 2 > n; n++) {
							var h = e[n].$getSize(0, 0);
							if (a ? h[2] == h[3] : Math.abs(h[1] - h[0]) < 3) e[n].s[this.Cq] = r[n], e[n].tc && e[n].tc(this.Cq, r[n], a);
							else {
								var o = e[n].$view[a ? "offsetHeight" : "offsetWidth"];
								e[n].s.gravity = r[n] / o * e[n].s.gravity
							}
						}
						e[0].resize();
						for (var n = 0; 2 > n; n++) e[n].callEvent && e[n].callEvent("onViewResize", []);
						webix.callEvent("onLayoutResize", [e])
					}
					this.Rl = !1
				}
				this.Rl = !1, this.Aq = !1, this.Eq = null, webix.html.removeCss(document.body, "webix_noselect")
			}
		},
		Kq: function(t) {
			var e, i, s;
			return s = t[0]["$" + this.Cq] + t[1]["$" + this.Cq], this.Eq[0] ? (e = this.Eq[0], i = s - e) : this.Eq[1] && (i = this.Eq[1], e = s - i), [e, i]
		},
		Jq: function(t, e, i) {
			for (var s = [], n = "height" == this.Cq ? "offsetHeight" : "offsetWidth", r = 0; 2 > r; r++) s[r] = t[r].$view[n] + (r ? -1 : 1) * i;
			return s
		},
		Mq: function(t, e, i) {
			var s, n, r;
			if (this.Eq[0] || this.Eq[1]) n = this.Kq(t, e);
			else
				for (n = this.Jq(t, e, i), s = 0; 2 > s; s++) n[s] < 0 && (r = n[0] + n[1], n[s] = 1, n[1 - s] = r - 1);
			return n
		}
	}, webix.MouseEvents, webix.ui.view), webix.protoUI({
		name: "multiview",
		defaults: {
			animate: {}
		},
		setValue: function(t) {
			webix.$$(t).show()
		},
		getValue: function() {
			return this.getActiveId()
		},
		$init: function() {
			this.Mh = 0, this.mc = 1, this.x.style.position = "relative", this.x.className += " webix_multiview", this.Nq = []
		},
		Oq: function(t, e) {
			var i = webix.$$(t);
			i.Pq || (i.Qq = [], i.Pq = {}), i.Pq[e] || (i.Pq[e] = !0, i.Qq.push(e))
		},
		Rq: function(t) {
			var e = webix.$$(t);
			if (this.s.keepViews && (e.x.style.display = ""), this.Nq[this.Nq.length - 2] != t ? (10 == this.Nq.length && this.Nq.splice(0, 1), this.Nq.push(t)) : this.Nq.splice(this.Nq.length - 1, 1), e.Pq) {
				for (var i = 0; i < e.Qq.length; i++) webix.$$(e.Qq[i]).render();
				e.Qq = [], e.Pq = {}
			}
		},
		addView: function() {
			var t = webix.ui.baselayout.prototype.addView.apply(this, arguments);
			return webix.html.remove(webix.$$(t).$view), t
		},
		Vx: function(t) {
			if (t == this.Mh) {
				var e = Math.max(t - 1, 1);
				this.q[e] && this.fc(this.q[e], !1)
			}
			t < this.Mh && this.Mh--
		},
		Fb: function() {},
		kc: function(t) {
			t = t || this.nc;
			for (var e = 0; e < t.length; e++) t[e].Ob = this.s.borderless ? {
				top: 1,
				left: 1,
				right: 1,
				bottom: 1
			} : this.s.Ob || {};
			webix.ui.baselayout.prototype.kc.call(this, t);
			for (var e = 1; e < this.q.length; e++) this.s.keepViews ? this.q[e].x.style.display = "none" : webix.html.remove(this.q[e].x);
			for (var e = 0; e < t.length; e++) {
				var i = this.q[e];
				if (!i.q || i.Gc) {
					var s = i.s.Ob;
					s.top && (i.x.style.borderTopWidth = "0px"), s.left && (i.x.style.borderLeftWidth = "0px"), s.right && (i.x.style.borderRightWidth = "0px"), s.bottom && (i.x.style.borderBottomWidth = "0px")
				}
			}
			this.Rq(this.getActiveId())
		},
		cells_setter: function(t) {
			this.nc = t
		},
		Sq: function(t, e) {
			var i = (this.s.animate || {}).direction,
				s = "top" == i || "bottom" == i;
			return e > t ? s ? "bottom" : "right" : s ? "top" : "left"
		},
		fc: function(t, e) {
			var i = this.getParentView();
			if (i && i.getTabbar && i.getTabbar().setValue(t.s.$id || t.s.id), this.Wh) return webix.delay(this.fc, this, [t, e], 100);
			for (var s = -1, n = 0; n < this.q.length; n++)
				if (this.q[n] == t) {
					s = n;
					break
				}
			if (!(0 > s || s == this.Mh)) {
				{
					var r = this.q[this.Mh],
						a = this.q[s];
					r.$getSize(0, 0)
				}
				if ((e || "undefined" == typeof e) && webix.animate.isSupported() && this.s.animate) {
					var h = webix.extend({}, this.s.animate);
					this.s.keepViews && (h.keepViews = !0), h.direction = this.Sq(s, this.Mh), h = webix.Settings.E(e || {}, h);
					var o = webix.animate.formLine(a.x, r.x, h);
					a.$getSize(0, 0), a.$setSize(this.bc, this.dc);
					var l = h.callback;
					h.callback = function() {
						webix.animate.breakLine(o, this.s.keepViews), this.Wh = !1, l && l.call(this), l = h.master = h.callback = null, this.resize()
					}, h.master = this, this.Mh = s, this.Rq(this.getActiveId()), webix.animate(o, h), this.Wh = !0
				} else this.s.keepViews ? r.x.style.display = "none" : (webix.html.remove(r.x), this.x.appendChild(this.q[n].x)), this.Mh = s, r.resize(), this.Rq(this.getActiveId());
				a.callEvent && (a.callEvent("onViewShow", []), webix.ui.each(a, this.Lw)), this.callEvent("onViewChange", [r.s.id, a.s.id])
			}
		},
		$getSize: function(t, e) {
			var i = this.q[this.Mh].$getSize(0, 0);
			if (this.s.fitBiggest)
				for (var s = 0; s < this.q.length; s++)
					if (s != this.Mh)
						for (var n = this.q[s].$getSize(0, 0), r = 0; 4 > r; r++) i[r] = Math.max(i[r], n[r]);
			var a = webix.ui.baseview.prototype.$getSize.call(this, 0, 0);
			return a[1] >= 1e5 && (a[1] = 0), a[3] >= 1e5 && (a[3] = 0), a[0] = (a[0] || i[0]) + t, a[1] = (a[1] || i[1]) + t, a[2] = (a[2] || i[2]) + e, a[3] = (a[3] || i[3]) + e, a
		},
		$setSize: function(t, e) {
			this.lc = [t, e], webix.ui.baseview.prototype.$setSize.call(this, t, e), this.q[this.Mh].$setSize(t, e)
		},
		isVisible: function(t, e) {
			return e && e != this.getActiveId() ? (t && this.Oq(e, t), !1) : webix.ui.view.prototype.isVisible.call(this, t, this.s.id)
		},
		getActiveId: function() {
			return this.q.length ? this.q[this.Mh].s.id : null
		},
		back: function(t) {
			if (t = t || 1, this.callEvent("onBeforeBack", [this.getActiveId(), t])) {
				if (this.Nq.length > t) {
					var e = this.Nq[this.Nq.length - t - 1];
					return webix.$$(e).show(), e
				}
				return null
			}
			return null
		},
        first: function() {
            var e = this.Nq[0];
            return webix.$$(e).show(), e
        }
	}, webix.ui.baselayout), webix.protoUI({
		name: "form",
		defaults: {
			type: "form",
			autoheight: !0
		},
		Tq: -1,
		_f: "webix_form",
		ag: !0,
		$getSize: function(t, e) {
			this.cc && !this.s.width && (t += webix.ui.scrollSize);
			var i = webix.ui.layout.prototype.$getSize.call(this, t, e);
			return (this.s.scroll || !this.s.autoheight) && (i[2] = this.s.height || this.s.minHeight || 0, i[3] += 1e5), i
		}
	}, webix.ui.toolbar), webix.protoUI({
		name: "gridsuggest",
		defaults: {
			type: "datatable",
			fitMaster: !1,
			width: 0,
			body: {
				navigation: !0,
				autoheight: !0,
				autowidth: !0,
				select: !0
			},
			filter: function(t, e) {
				var i = this.config.template(t);
				return 0 === i.toString().toLowerCase().indexOf(e.toLowerCase()) ? !0 : !1
			}
		},
		$init: function(t) {
			t.body.columns || (t.body.autoConfig = !0), t.template || (t.template = webix.bind(this.bu, this))
		},
		bu: function(t) {
			var e = this.getBody(),
				i = this.config.textValue || e.config.columns[0].id;
			return e.getText(t.id, i)
		}
	}, webix.ui.suggest), webix.protoUI({
		name: "datasuggest",
		defaults: {
			type: "dataview",
			fitMaster: !1,
			width: 0,
			body: {
				xCount: 3,
				autoheight: !0,
				select: !0
			}
		}
	}, webix.ui.suggest), webix.protoUI({
		name: "multiselect",
		$cssName: "richselect",
		defaults: {
			separator: ","
		},
		Kt: function(t) {
			var e = !webix.isArray(t) && "object" == typeof t && !t.name,
				i = {
					view: "checksuggest",
					separator: this.config.separator,
					buttonText: this.config.buttonText,
					button: this.config.button
				};
			this.s.optionWidth ? i.width = this.s.optionWidth : i.fitMaster = !0, e && webix.extend(i, t, !0);
			var s = webix.ui(i),
				n = s.getList();
			return "string" == typeof t ? n.load(t) : e || n.parse(t), s.attachEvent("onShow", function() {
				s.setValue(webix.$$(s.s.master).config.value)
			}), s
		},
		$setValue: function(t) {
			if (this.se) {
				var e = this.getPopup(),
					i = "";
				e && (i = e.setValue(t), "object" == typeof i && (i = i.join(this.config.separator + " "))), this.getInputNode().innerHTML = i || this.Yx()
			}
		},
		getValue: function() {
			return this.s.value || ""
		}
	}, webix.ui.richselect), webix.editors.multiselect = webix.extend({
		popupType: "multiselect"
	}, webix.editors.richselect), webix.type(webix.ui.list, {
		name: "multilist",
		templateStart: webix.template('<div webix_l_id="#!id#" class="{common.classname()}" style="width:{common.widthSize()}; height:{common.heightSize()}; overflow:hidden;">')
	}, "default"), webix.type(webix.ui.list, {
		name: "checklist",
		templateStart: webix.template('<div webix_l_id="#!id#" class="{common.classname()}" style="width:{common.widthSize()}; height:{common.heightSize()}; overflow:hidden; white-space:nowrap;">{common.checkbox()}'),
		checkbox: function(t) {
			var e = t.$checked ? "fa-check-square" : "fa-square-o";
			return "<span class='webix_icon " + e + "'></span>"
		},
		template: webix.template("#value#")
	}, "default"), webix.protoUI({
		name: "multisuggest",
		defaults: {
			separator: ",",
			type: "layout",
			button: !0,
			width: 0,
			filter: function(t, e) {
				var i = this.getItemText(t.id);
				return i.toString().toLowerCase().indexOf(e.toLowerCase()) > -1
			},
			body: {
				rows: [{
					view: "list",
					type: "multilist",
					borderless: !0,
					autoheight: !0,
					yCount: 5,
					multiselect: "touch",
					select: !0,
					on: {
						onItemClick: function(t) {
							var e = this.getParentView().getParentView();
							webix.delay(function() {
								e._y(t)
							})
						}
					}
				}, {
					view: "button",
					click: function() {
						var t = this.getParentView().getParentView();
						t.setMasterValue({
							id: t.getValue()
						}), t.hide()
					}
				}]
			}
		},
		_y: function(t) {
			var e = this.getValue(),
				i = webix.toArray(e ? this.getValue().split(this.s.separator) : []);
			i.find(t) < 0 ? i.push(t) : i.remove(t);
			var s = webix.$$(this.s.master);
			s ? s.setValue(i.join(this.s.separator)) : this.setValue(i)
		},
		Jt: function(t) {
			return t.rows[0]
		},
		_d: function() {
			var t = this.getButton(),
				e = this.s.button ? this.s.buttonText || webix.i18n.controls.select : 0;
			t && (e ? (t.s.value = e, t.refresh()) : t.hide())
		},
		getButton: function() {
			return this.getBody().getChildViews()[1]
		},
		getList: function() {
			return this.getBody().getChildViews()[0]
		},
		setValue: function(t) {
			var e = [],
				i = this.getList();
			if (i.unselect(), t && ("string" == typeof t && (t = t.split(this.config.separator)), t[0]))
				for (var s = 0; s < t.length; s++) i.getItem(t[s]) && (i.exists(t[s]) && i.select(t[s], !0), e.push(this.getItemText(t[s])));
			return this.s.value = t ? t.join(this.config.separator) : "", e
		},
		getValue: function() {
			return this.s.value
		}
	}, webix.ui.suggest), webix.protoUI({
		name: "checksuggest",
		defaults: {
			button: !1,
			body: {
				rows: [{
					view: "list",
					css: "webix_multilist",
					borderless: !0,
					autoheight: !0,
					yCount: 5,
					select: !0,
					type: "checklist",
					on: {
						onItemClick: function(t) {
							var e = this.getItem(t);
							e.$checked = e.$checked ? 0 : 1, this.refresh(t);
							var i = this.getParentView().getParentView();
							i._y(t)
						}
					}
				}, {
					view: "button",
					click: function() {
						var t = this.getParentView().getParentView();
						t.setMasterValue({
							id: t.getValue()
						}), t.hide()
					}
				}]
			}
		},
		$init: function() {
			this.dB = {}, this.$ready.push(this.eB)
		},
		eB: function() {
			var t = this.getList();
			if (t.config.dataFeed) {
				var e = this;
				t.attachEvent("onAfterLoad", function() {
					e.setValue(e.s.value)
				}), t.getItem = function(t) {
					return this.data.pull[t] || e.dB[t]
				}
			}
		},
		ge: function(t, e) {
			if (e.count && e.count())
				if (t.isVisible()) {
					var i = e.getSelectedId(!1, !0);
					i && this._y(i), t.hide(!0)
				} else t.show(this.ae);
			else t.isVisible() && t.hide(!0)
		},
		ke: function() {
			var t = this.getList();
			t.select && t.unselect()
		},
		setValue: function(t) {
			var e, i = this.getList(),
				s = [],
				n = {},
				r = [];
			for (t = t || [], "string" == typeof t ? t = t.split(this.config.separator) : i.config.dataFeed && (t = this.fB(t)), e = 0; e < t.length; e++) n[t[e]] = 1, i.getItem(t[e]) && (this.dB && (this.dB[t[e]] = webix.copy(i.getItem(t[e]))), s.push(this.getItemText(t[e])));
			for (i.data.each(function(t) {
					t.$checked ? n[t.id] || (t.$checked = 0, r.push(t.id)) : n[t.id] && (t.$checked = 1, r.push(t.id))
				}, this, !0), e = 0; e < r.length; e++) i.refresh(r[e]);
			return this.s.value = t.length ? t.join(this.config.separator) : "", s
		},
		getValue: function() {
			return this.s.value
		},
		Rs: function() {},
		fB: function(t) {
			if (t && webix.isArray(t)) {
				for (var e = [], i = 0; i < t.length; i++) t[i].id ? (this.dB[t[i].id] = webix.copy(t[i]), e.push(t[i].id)) : e.push(t[i]);
				t = e
			}
			return t
		}
	}, webix.ui.multisuggest), webix.protoUI({
		name: "multicombo",
		$cssName: "text",
		defaults: {
			keepText: !0,
			separator: ",",
			icon: !1,
			iconWidth: 0,
			tagMode: !0,
			tagTemplate: function(t) {
				return t.length ? t.length + " item(s)" : ""
			},
			template: function(t, e) {
				return e.yy(t, e)
			}
		},
		$init: function() {
			this.$view.className += " webix_multicombo", this.attachEvent("onBlur", webix.bind(function() {
				var t = this.getInputNode().value;
				t && this.s.newValues && this.HA(t), this.xy = "", this.refresh()
			}, this)), this.attachEvent("onBeforeRender", function() {
				return this.zy || (this.zy = webix.skin.$active.inputHeight), !0
			}), this.attachEvent("onAfterRender", function() {
				this.ac = null
			}), this.IA = 0
		},
		on_click: {
			webix_multicombo_delete: function(t, e, i) {
				var s;
				return i && (s = i.parentNode.getAttribute("value")) && this.Ay(s), !1
			}
		},
		Ay: function(t) {
			var e = this.s.value;
			"string" == typeof e && (e = e.split(this.s.separator)), e = webix.toArray(webix.copy(e)), e.remove(t), this.setValue(e.join(this.s.separator))
		},
		az: function(t) {
			var e = webix.$$(this.config.suggest),
				i = e.getList(),
				s = i.getItem(t);
			if (s) {
				var n = e.getValue();
				n && "string" == typeof n && (n = n.split(e.config.separator)), n = webix.toArray(n || []), n.find(t) < 0 && (n.push(t), e.setValue(n), this.setValue(e.getValue()))
			}
		},
		HA: function(t) {
			var e = webix.$$(this.config.suggest),
				i = e.getList();
			!i.exists(t) && t.replace(/^\s+|\s+$/g, "") && i.add({
				id: t,
				value: t
			}), this.az(t)
		},
		Kt: function(t) {
			var e = !webix.isArray(t) && "object" == typeof t && !t.name,
				i = {
					view: "checksuggest",
					separator: this.config.separator,
					buttonText: this.config.buttonText,
					button: this.config.button
				},
				s = this;
			this.s.optionWidth && (i.width = this.s.optionWidth), e && webix.extend(i, t, !0);
			var n = webix.ui(i);
			this.s.optionWidth || (n.$customWidth = function() {
				this.config.width = s.Ee(s.s)
			}), n.attachEvent("onBeforeShow", function(t, e, i) {
				return this.s.master && (this.setValue(webix.$$(this.s.master).config.value), webix.$$(this.s.master).getInputNode().value ? (this.getList().refresh(), this.je = !0) : this.getList().filter(), t.tagName && "input" == t.tagName.toLowerCase()) ? (webix.ui.popup.prototype.show.apply(this, [t.parentNode, e, i]), !1) : void 0
			});
			var r = n.getList();
			return "string" == typeof t ? r.load(t) : e || r.parse(t), n
		},
		yy: function(t, e) {
			var i, s, n, r, a, h, o, l, c, u, d, f, b = "",
				x = "",
				p = "top" == this.s.labelPosition;
			return p = "top" == this.s.labelPosition, i = "x" + webix.uid(), f = e.Ee(t), n = t.inputAlign || "left", h = this.zy - 2 * webix.skin.$active.inputPadding - 2, r = this.xy || "", c = "<ul class='webix_multicombo_listbox' style='line-height:" + h + "px'></ul>", a = Math.min(f, e.By || 7), !t.placeholder || t.value || this.xy || (x = t.placeholder || "", a = f), s = "<input id='" + i + "' type='text' placeholder='" + x + "' class='webix_multicombo_input' style='width: " + a + "px;height:" + h + "px;max-width:" + (f - 20) + "px' value='" + r + "'/>", o = "<div class='webix_inp_static' tabindex='0' onclick='' style='line-height:" + h + "px;width: " + f + "px;  text-align: " + n + ";height:auto' >" + c + s + "</div>", l = e.$renderLabel(t, i), d = this.s.awidth - f - 2 * webix.skin.$active.inputPadding, u = (t.invalid ? t.invalidMessage : "") || t.bottomLabel, u && (b = "<div class='webix_inp_bottom_label' style='width:" + f + "px;margin-left:" + Math.max(d, webix.skin.$active.inputPadding) + "px;'>" + u + "</div>"), p ? l + "<div class='webix_el_box' style='width:" + this.s.awidth + "px; '>" + o + b + "</div>" : "<div class='webix_el_box' style='width:" + this.s.awidth + "px; min-height:" + this.s.aheight + "px;'>" + l + o + b + "</div>"
		},
		Cy: function() {
			return this.re().getElementsByTagName("UL")[0]
		},
		oe: function() {
			var t = this.getPopup();
			if (t) {
				var e = t ? t.setValue(this.s.value) : null;
				t.fB && (this.s.value = t.fB(this.s.value));
				var i = "",
					s = this.Cy(),
					n = e && e.length;
				if (n) {
					var r = this.zy - 2 * webix.skin.$active.inputPadding - 8,
						a = this.s.value;
					if ("string" == typeof a && (a = a.split(this.s.separator)), this.s.tagMode)
						for (var h = 0; h < e.length; h++) {
							var o = "<span>" + e[h] + "</span><span class='webix_multicombo_delete'>x</span>";
							i += "<li class='webix_multicombo_value' style='line-height:" + r + "px;' value='" + a[h] + "'>" + o + "</li>"
						} else i += "<li class='webix_multicombo_tag' style='line-height:" + r + "px;'>" + this.s.tagTemplate(a) + "</li>"
				}
				s.innerHTML = i, this.s.placeholder && n && (this.getInputNode().placeholder = "", !this.getInputNode().value && this.getInputNode().offsetWidth > 20 && (this.getInputNode().style.width = "20px"))
			}
			this.Dy()
		},
		Ey: function(t) {
			if (t = t || this.getInputNode())
				if (t.value.length) {
					if (t.createTextRange) {
						var e = t.createTextRange();
						e.moveStart("character", t.value.length), e.collapse(), e.select()
					} else if (t.selectionStart || "0" == t.selectionStart) {
						var i = t.value.length;
						t.selectionStart = i, t.selectionEnd = i, t.focus()
					}
				} else t.focus()
		},
		Dy: function() {
			var t = "top" == this.s.labelPosition,
				e = this.JA(),
				i = Math.max(e.offsetHeight + 2 * webix.skin.$active.inputPadding, this.zy);
			t && (i += this.le), i += this.s.bottomPadding || 0;
			var s = this.$getSize(0, 0);
			if (i != s[2]) {
				var n = e.offsetHeight + (t ? this.le : 0);
				if (n == this.Fy ? this.IA++ : this.IA = 0, this.IA > 10) return !1;
				this.Fy = n;
				var r = this.getTopParentView();
				clearTimeout(r.kg), r.kg = webix.delay(function() {
					this.config.height = this.Fy + 2 * webix.skin.$active.inputPadding, this.resize(), this.Hy && (this.Ey(this.getInputNode()), this.Hy = !1), this.bz && (this.s.keepText ? this.getInputNode().select() : this.getInputNode().value = "", this.bz = !1), (this.getPopup().isVisible() || this.Hy) && this.getPopup().show(this.JA())
				}, this)
			}
			this.bz && this.getInputNode().select()
		},
		JA: function() {
			for (var t = this.re(), e = t.childNodes, i = 0; i < e.length; i++)
				if (e[i].className && -1 != e[i].className.indexOf("webix_inp_static")) return e[i];
			return t
		},
		getInputNode: function() {
			return this.re().getElementsByTagName("INPUT")[0]
		},
		$setValue: function() {
			this.oe()
		},
		getValue: function() {
			var t = this.s.value;
			return t && "string" != typeof t ? t.join(this.s.separator) : t
		},
		$setSize: function(t, e) {
			var i = this.s;
			if (webix.ui.view.prototype.$setSize.call(this, t, e)) {
				if (!t || !e) return;
				"top" == i.labelPosition && (i.labelWidth = 0), this.render()
			}
		},
		Iy: function(t) {
			var e = document.createElement("span");
			e.className = "webix_multicombo_input", e.style.visibility = "visible", e.style.height = "0px", e.innerHTML = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), document.body.appendChild(e);
			var i = e.offsetWidth + 10;
			return document.body.removeChild(e), i
		},
		De: function() {
			webix.event(this.re(), "click", function() {
				this.getInputNode().focus()
			}, {
				bind: this,
				id: this.eC("click")
			}), webix.event(this.getInputNode(), "focus", function() {
				-1 == this.re().className.indexOf("webix_focused") && (this.re().className += " webix_focused")
			}, {
				bind: this,
				id: this.eC("focus")
			}), webix.event(this.getInputNode(), "blur", function() {
				this.re().className = this.re().className.replace(" webix_focused", "")
			}, {
				bind: this,
				id: this.eC("blur")
			}), webix.event(this.getInputNode(), "input", function() {
				!this.getInputNode().value && this.xy && (this.getInputNode().style.width = "20px", this.By = 20, this.xy = "", this.Hy = !0, this.getPopup().show(this.JA()), this.Dy())
			}, {
				bind: this,
				id: this.eC("input")
			}), webix.event(this.getInputNode(), "keyup", function(t) {
				var e, i = this.getInputNode();
				t = t || event, e = !this.s.placeholder || this.s.value || i.value ? this.Iy(i.value) + 10 : this.Ee(this.s), i.style.width = e + "px", e != this.By ? (this.xy = this.s.keepText || 13 != t.keyCode ? i.value : !1, this.Hy = !0, this.By && this.getPopup().show(this.JA()), this.By = e, this.Dy()) : this.vA != this.getPopup().$height && this.getPopup().show(this.JA())
			}, {
				bind: this,
				id: this.eC("keyup")
			}), webix.event(this.getInputNode(), "keydown", function(t) {
				if (this.bz = !1, this.isVisible()) {
					t = t || event;
					var e = this.Cy().lastChild;
					if (this.vA = this.getPopup().$height, 8 == t.keyCode && e && (!this.getInputNode().value && (new Date).valueOf() - (this.Jy || 0) > 800 ? (this.Hy = !0, this.Ay(e.getAttribute("value"))) : this.Jy = (new Date).valueOf()), 13 == t.keyCode || 9 == t.keyCode) {
						var i = this.getInputNode(),
							s = "",
							n = webix.$$(this.s.suggest),
							r = n.getList();
						r.getSelectedId() || (i.value && (s = n.getSuggestion()), this.s.newValues ? (13 == t.keyCode && (this.bz = !0), this.HA(i.value)) : s && (9 == t.keyCode ? (this.Hy = !1, this.xy = "", this.By = 10, i.value = "", this.az(s)) : (this.bz = !0, this.az(s), this.s.keepText ? this.xy = i.value : i.value = ""))), 13 == t.keyCode && (this.bz = !0, this.Hy = !0)
					}
				}
			}, {
				bind: this,
				id: this.eC("keydown")
			}), webix.$$(this.s.suggest).linkInput(this)
		}
	}, webix.ui.richselect), webix.protoUI({
		name: "menu",
		Oh: "webix_menu",
		$init: function(t) {
			t.autowidth && (this.KA = !0, delete t.autowidth), this.data.attachEvent("onStoreUpdated", webix.bind(function() {
				this.Uq()
			}, this)), this.attachEvent("onMouseMove", this.Vq), this.attachEvent("onMouseOut", function() {
				this.Wq() && "click" == this.s.openAction || this.Xq || this.Uq()
			}), this.attachEvent("onItemClick", function(t, e, i) {
				var s = this.getItem(t);
				if (s) {
					if (s.$template) return;
					var n = this.getTopMenu();
					if (!this.data.getMark(t, "webix_disabled")) {
						if (!n.callEvent("onMenuItemClick", [t, e, i])) return void(e.showpopup = !0);
						this != n && n.Le(t, e, i), s.submenu ? (this !== n && !webix.env.touch || "click" != n.s.openAction || this.Yq(t, i), e.showpopup = !0) : (n.Uq(!0), n.$q && n.hide())
					}
				}
			}), this.data.attachEvent("onClearAll", function() {
				this._q = []
			}), this.data._q = []
		},
		sizeToContent: function() {
			if ("y" == this.s.layout) {
				var t = [];
				this.data.each(function(e) {
					t.push(this.jb(e))
				}, this), this.config.width = webix.html.getTextSize(t, this.$view.className).width + 20, this.resize()
			}
		},
		getTopMenu: function() {
			for (var t = this; t.ar;) t = webix.$$(t.ar);
			return t
		},
		Rh: function(t) {
			this.s.autoheight && (t = this.count());
			for (var e = 0, i = 0; t > i; i++) {
				var s = this.data.pull[this.data.order[i]];
				e += s && "Separator" == s.$template ? 4 : this.type.height
			}
			return e
		},
		on_mouse_move: {},
		type: {
			css: "menu",
			width: "auto",
			templateStart: function(t, e, i) {
				if ("Separator" === t.$template || "Spacer" === t.$template) return '<div webix_l_id="#id#" class="webix_context_' + t.$template.toLowerCase() + '">';
				var s = (t.href ? " href='" + t.href + "' " : "") + (t.target ? " target='" + t.target + "' " : "");
				return webix.ui.list.prototype.type.templateStart(t, e, i).replace(/^<div/, "<a " + s) + (t.submenu && e.subsign ? "<div class='webix_submenu_icon'></div>" : "")
			},
			templateEnd: function(t) {
				return "Separator" === t.$template || "Spacer" === t.$template ? "</div>" : "</a>"
			},
			templateSeparator: webix.template("<div class='sep_line'></div>"),
			templateSpacer: webix.template("<div></div>")
		},
		getMenu: function(t) {
			if (this.data.pull[t]) return this;
			for (var e in this.data.pull) {
				var i = this.getItem(e);
				if (i.submenu) {
					var s = this.br(i).getMenu(t);
					if (s) return s
				}
			}
		},
		getSubMenu: function(t) {
			var e = this.getMenu(t),
				i = e.getItem(t);
			return i.submenu ? e.br(i) : null
		},
		getMenuItem: function(t) {
			return this.getMenu(t).getItem(t)
		},
		br: function(t) {
			var e = webix.$$(t.submenu);
			return e || (t.submenu = this.cr(t), e = webix.$$(t.submenu)), e
		},
		Vq: function(t, e, i) {
			this.Wq() && this.Yq(t, i)
		},
		Wq: function() {
			var t = this.getTopMenu();
			if ("click" == t.s.openAction) {
				if (webix.env.touch) return !1;
				var e = t.dr;
				return e && webix.$$(e).isVisible() ? !0 : !1
			}
			return !0
		},
		Yq: function(t, e) {
			var i = this.getItem(t);
			if (i && (this.Xq = null, this.dr && i.submenu != this.dr && this.Uq(!0), i.submenu && !this.config.hidden)) {
				var s = this.br(i);
				if (this.data.getMark(t, "webix_disabled")) return;
				this.getTopMenu().KA && s.sizeToContent && !s.isVisible() && s.sizeToContent(), s.show(e, {
					pos: this.s.subMenuPos
				}), s.ar = this.s.id, this.dr = i.submenu
			}
		},
		disableItem: function(t) {
			this.getMenu(t).addCss(t, "webix_disabled")
		},
		enableItem: function(t) {
			this.getMenu(t).removeCss(t, "webix_disabled")
		},
		er: function(t, e) {
			var i = this.data;
			i._q[t] != e && (i._q[t] = e, i.filter(function(t) {
				return !i._q[t.id]
			}), this.resize())
		},
		hideItem: function(t) {
			var e = this.getMenu(t);
			e && e.er(t, !0)
		},
		showItem: function(t) {
			var e = this.getMenu(t);
			return e ? (e.er(t, !1), webix.ui.list.prototype.showItem.call(e, t)) : void 0
		},
		Uq: function(t) {
			if (this.dr) {
				var e = webix.$$(this.dr);
				e.Uq && e.Uq(t), (t || !e.gr) && (e.hide(), this.dr = null)
			}
		},
		cr: function(t) {
			var e = {
					view: "submenu",
					data: t.submenu
				},
				i = this.getTopMenu().s.submenuConfig;
			i && webix.extend(e, i, !0);
			var s = this.getMenuItem(t.id);
			s && s.config && webix.extend(e, s.config, !0);
			var n = webix.ui(e);
			return n.ar = this, n.s.id
		},
		$skin: function() {
			webix.ui.list.prototype.$skin.call(this), this.type.height = webix.skin.$active.menuHeight
		},
		defaults: {
			scroll: "",
			layout: "x",
			mouseEventDelay: 100,
			subMenuPos: "bottom"
		}
	}, webix.ui.list), webix.protoUI({
		name: "submenu",
		$init: function() {
			this.gd = webix.clone(this.hr), this.gd.A = this, this.attachEvent("onMouseOut", function() {
				"click" != this.getTopMenu().s.openAction && (this.Xq || this.gr || this.hide())
			}), this.attachEvent("onMouseMoving", function() {
				this.ar && (webix.$$(this.ar).Xq = !0)
			})
		},
		$skin: function() {
			webix.ui.menu.prototype.$skin.call(this), webix.ui.popup.prototype.$skin.call(this), this.type.height = webix.skin.$active.menuHeight
		},
		hr: {
			$getSize: function(t, e) {
				var i = 1 * this.A.s.height,
					s = 1 * this.A.s.width,
					n = webix.ui.menu.prototype.$getSize.call(this.A, t, e);
				return this.A.s.height = i, this.A.s.width = s, n
			},
			$setSize: function(t, e) {
				this.A.s.scroll && (this.A.ed.style.height = e + "px")
			},
			destructor: function() {
				this.A = null
			}
		},
		body_setter: function() {},
		defaults: {
			width: 150,
			subMenuPos: "right",
			layout: "y",
			autoheight: !0
		},
		type: {
			height: webix.skin.menuHeight,
			subsign: !0
		}
	}, webix.ui.menu, webix.ui.popup), webix.ContextHelper = {
		defaults: {
			padding: "4",
			hidden: !0
		},
		body_setter: function(t) {
			return t = webix.ui.window.prototype.body_setter.call(this, t), this.gd.x.style.borderWidth = "0px", t
		},
		attachTo: function(t) {
			var e;
			e = t.on_context ? t.attachEvent("onAfterContextMenu", webix.bind(this.ir, this)) : webix.event(t, "contextmenu", this.jr, {
				bind: this
			}), this.attachEvent("onDestruct", function() {
				t.detachEvent ? t.detachEvent(e) : webix.eventRemove(e), t = null
			})
		},
		getContext: function() {
			return this.nh
		},
		setContext: function(t) {
			this.nh = t
		},
		jr: function(t) {
			return this.nh = webix.toNode(t || event), this.kr(t)
		},
		ir: function(t, e) {
			return this.nh = {
				obj: webix.$$(e),
				id: t
			}, this.kr(e)
		},
		kr: function(t) {
			var e = this.show(t, null, !0);
			return e === !1 ? e : (webix.callEvent("onClick", []), webix.html.preventEvent(t))
		},
		gr: !0,
		master_setter: function(t) {
			return this.attachTo(t), null
		}
	}, webix.protoUI({
		name: "context"
	}, webix.ContextHelper, webix.ui.popup), webix.protoUI({
		name: "contextmenu",
		$q: !0,
		$init: function(t) {
			t.submenuConfig && webix.extend(t, t.submenuConfig)
		}
	}, webix.ContextHelper, webix.ui.submenu), webix.protoUI({
		name: "tabbar",
		$skin: function() {
			var t = webix.skin.$active,
				e = this.defaults;
			e.topOffset = t.tabTopOffset || 0, e.tabOffset = "undefined" != typeof t.tabOffset ? t.tabOffset : 10, e.bottomOffset = t.tabBottomOffset || 0, e.height = t.tabbarHeight, e.tabMargin = t.tabMargin, e.inputPadding = t.inputPadding, e.tabMinWidth = t.tabMinWidth || 100, e.tabMoreWidth = t.tabMoreWidth || 40
		},
		ut: function() {
			var t, e = this.config,
				i = e.options.length,
				s = this.we - 2 * e.tabOffset,
				n = e.optionWidth || e.tabMinWidth;
			if (e.tabMinWidth && n > s / i) return {
				max: parseInt(s / n, 10) || 1
			};
			if (!e.optionWidth)
				for (t = 0; t < e.options.length; t++) e.options[t].width && (s -= e.options[t].width + (t || e.type ? 0 : e.tabMargin), i--);
			return {
				width: i ? s / i : e.tabMinWidth
			}
		},
		Je: function() {
			var t = this.s;
			if (!t.tabbarPopup) {
				var e = {
						view: "popup",
						width: t.popupWidth || 200,
						body: {
							view: "list",
							borderless: !0,
							select: !0,
							css: "webix_tab_list",
							autoheight: !0,
							yCount: t.yCount,
							type: {
								template: t.popupTemplate
							}
						}
					},
					i = webix.ui(e);
				i.getBody().attachEvent("onBeforeSelect", webix.bind(function(t) {
					return t && this.callEvent("onBeforeTabClick", [t]) ? (this.setValue(t), webix.$$(this.s.tabbarPopup).hide(), this.callEvent("onAfterTabClick", [t]), !0) : void 0
				}, this)), t.tabbarPopup = i.s.id, this.Ns.push(i)
			}
			this.Je = function() {}
		},
		getPopup: function() {
			return this.Je(), webix.$$(this.s.tabbarPopup)
		},
		moreTemplate_setter: webix.template,
		popupTemplate_setter: webix.template,
		defaults: {
			popupWidth: 200,
			popupTemplate: "#value#",
			yCount: 7,
			moreTemplate: '<span class="webix_icon fa-ellipsis-h"></span>',
			template: function(t, e) {
				var i, s, n, r, a, h, o, l, c, u = t.options;
				if (u.length) {
					e.Be(u), !t.value && u.length && (t.value = u[0].id), u = webix.copy(u), s = "", t.tabOffset && (s += "<div class='webix_tab_filler' style='width:" + t.tabOffset + "px;'>&nbsp;</div>"), i = e.we - 2 * t.tabOffset - (t.type ? 0 : t.tabMargin * (u.length - 1)), l = t.topOffset + t.bottomOffset;
					var d = e.ut();
					if (d.max && d.max < u.length) {
						var f = e.getPopup();
						f.hide();
						var b = f.getBody() || null;
						if (b)
							if (d.max) {
								var x = !1;
								for (n = 0; n < u.length && !x; n++)
									if (u[n].id == t.value && (x = !0, n + 1 > d.max)) {
										var p = u.splice(n, 1),
											w = u.splice(0, d.max - 1).concat(p);
										t.options = u = w.concat(u)
									}
								b.clearAll(), b.parse(u.slice(d.max))
							} else b.clearAll()
					} else e.s.tabbarPopup && webix.$$(e.s.tabbarPopup).hide();
					o = t.tabOffset;
					var v = !1;
					for (n = 0; n < u.length && !v; n++)
						if (d && d.max ? (d.max == n + 1 && (v = !0), i = e.we - 2 * t.tabOffset - (!t.type && d.max > 1 ? t.tabMargin * (d.max - 1) : 0), c = (i - t.tabMoreWidth) / d.max) : c = d.width, c = u[n].width || t.optionWidth || c, o += c + (n && !t.type ? t.tabMargin : 0), t.tabMargin > 0 && n && !t.type && (s += "<div class='webix_tab_filler' style='width:" + t.tabMargin + "px;'></div>"), s += e.vt(u[n], c), v) {
							{
								e.dc - (t.type ? 0 : l)
							}
							s += '<div class="webix_tab_more_icon" style="width:' + t.tabMoreWidth + 'px;">' + t.moreTemplate(t, e) + "</div>", o += t.tabMoreWidth
						}
					r = e.bc - o, r > 0 && !t.type && (s += "<div class='webix_tab_filler' style='width:" + r + "px;'>&nbsp;</div>")
				} else s = "<div class='webix_tab_filler' style='width:" + e.we + "px; border-right:0px;'></div>";
				return a = "", h = l && !t.type ? "height:" + (e.dc - l) + "px" : "", t.topOffset && !t.type && (a += "<div class='webix_before_all_tabs' style='width:100%;height:" + t.topOffset + "px'></div>"), a += "<div style='" + h + "' class='webix_all_tabs " + (t.type ? "webixtype_" + t.type : "") + "'>" + s + "</div>", t.bottomOffset && !t.type && (a += "<div class='webix_after_all_tabs' style='width:100%;height:" + t.bottomOffset + "px'></div>"), a
			}
		},
		vt: function(t, e) {
			var i, s = "",
				n = this.config;
			if (t.id == n.value && (s = " webix_selected"), t.css && (s += " " + t.css), e = t.width || e, i = '<div class="webix_item_tab' + s + '" button_id="' + t.id + '" style="width:' + e + 'px;">', this.lr) {
				var r = this.dc - 2 * n.inputPadding - 2,
					a = this.dc - 2,
					h = webix.extend({
						cheight: r,
						aheight: a
					}, t);
				i += this.lr(h)
			} else {
				var o = t.icon ? "<span class='webix_icon fa-" + t.icon + "'></span> " : "";
				i += o + t.value
			}
			return (t.close || n.close) && (i += "<span class='webix_tab_close webix_icon fa-times'></span>"), i += "</div>"
		},
		ne: {
			image: "<div class='webix_img_btn_top' style='height:#cheight#px;background-image:url(#image#);'><div class='webix_img_btn_text'>#value#</div></div>",
			icon: "<div class='webix_img_btn' style='line-height:#cheight#px;height:#cheight#px;'><span class='webix_icon_btn fa-#icon#' style='max-width:#cheight#px;max-height:#cheight#px;'></span>#value#</div>",
			iconTop: "<div class='webix_img_btn_top' style='height:#cheight#px;width:100%;top:0px;text-align:center;'><span class='webix_icon fa-#icon#'></span><div class='webix_img_btn_text'>#value#</div></div>"
		},
		type_setter: function(t) {
			return this.s.tabOffset = 0, this.ne[t] && (this.lr = webix.template(this.ne[t])), t
		}
	}, webix.ui.segmented), webix.protoUI({
		name: "tabview",
		defaults: {
			type: "clean"
		},
		setValue: function(t) {
			this.q[0].setValue(t)
		},
		getValue: function() {
			return this.q[0].getValue()
		},
		getTabbar: function() {
			return this.q[0]
		},
		getMultiview: function() {
			return this.q[1]
		},
		addView: function(t) {
			var e = t.body.id = t.body.id || webix.uid();
			this.getMultiview().addView(t.body), t.id = t.body.id, t.value = t.header, delete t.body, delete t.header;
			var i = this.getTabbar();
			return i.addOption(t), i.refresh(), e
		},
		removeView: function(t) {
			var e = this.getTabbar();
			e.removeOption(t), e.refresh()
		},
		$init: function(t) {
			this.$ready.push(this.Nv);
			for (var e = t.cells, i = [], s = e.length - 1; s >= 0; s--) {
				var n = e[s].body || e[s];
				n.id || (n.id = "view" + webix.uid()), i[s] = {
					value: e[s].header,
					id: n.id,
					close: e[s].close,
					width: e[s].width
				}, e[s] = n
			}
			var r = {
					view: "tabbar",
					multiview: !0
				},
				a = {
					view: "multiview",
					cells: e,
					animate: !!t.animate
				};
			t.value && (r.value = t.value), t.tabbar && webix.extend(r, t.tabbar, !0), t.multiview && webix.extend(a, t.multiview, !0), r.options = r.options || i, t.rows = [r, a], delete t.cells, delete t.tabs
		},
		Nv: function() {
			this.getTabbar().attachEvent("onOptionRemove", function(t) {
				var e = webix.$$(t);
				e && e.destructor()
			})
		}
	}, webix.ui.layout),
	function() {
		function t(t) {
			return t.tagName ? t.tagName.toLowerCase() : null
		}

		function e(t, e) {
			if (!t.getAttribute) return null;
			var i = t.getAttribute(e);
			return i ? i.toLowerCase() : null
		}

		function i() {
			var e = t(this);
			return n[e] ? n[e](this) : n.other(this)
		}

		function s(e) {
			var i = t(this);
			return r[i] ? r[i](this, e) : r.other(this, e)
		}
		var n = {
				radio: function(t) {
					for (var e = 0; e < t.length; e++)
						if (t[e].checked) return t[e].value;
					return ""
				},
				input: function(t) {
					var i = e(t, "type");
					return "checkbox" === i ? t.checked : t.value
				},
				textarea: function(t) {
					return t.value
				},
				select: function(t) {
					var e = t.selectedIndex;
					return t.options[e].value
				},
				other: function(t) {
					return t.innerHTML
				}
			},
			r = {
				radio: function(t, e) {
					for (var i = 0; i < t.length; i++) t[i].checked = t[i].value == e
				},
				input: function(t, i) {
					var s = e(t, "type");
					"checkbox" === s ? t.checked = i ? !0 : !1 : t.value = i
				},
				textarea: function(t, e) {
					t.value = e
				},
				select: function(t, e) {
					t.value = e ? e : t.firstElementChild.value || e
				},
				other: function(t, e) {
					t.innerHTML = e
				}
			};
		webix.protoUI({
			name: "htmlform",
			$init: function(t) {
				this.elements = {}, this.mr = !1, t.content && (t.container == t.content || !t.container && t.content == document.body) && (this.nr = !0)
			},
			content_setter: function(t) {
				if (t = webix.toNode(t), this.nr)
					for (; t.childNodes.length > 1;) this.x.childNodes[0].appendChild(t.childNodes[0]);
				else this.x.childNodes[0].appendChild(t);
				return this.pc(), !0
			},
			render: function() {
				webix.ui.template.prototype.render.apply(this, arguments), this.pc()
			},
			pc: function() {
				var n = this.x.querySelectorAll("[name]");
				this.elements = {};
				for (var r = 0; r < n.length; r++) {
					var a = n[r],
						h = e(a, "name");
					if (h) {
						var o = "button" === t(a),
							l = e(a, "type"),
							c = o || "button" === l || "submit" === l;
						if ("radio" === l) {
							var u = this.elements[h] || [];
							u.tagName = "radio", u.push(a), a = u
						}
						this.elements[h] = a, a.getValue = i, a.setValue = s, a.Ce = !c, a.s = {
							defaultValue: a.getValue()
						}
					}
				}
				return this.elements
			},
			Te: function(t, e) {
				this.Qe(t, e);
				var i = this.x.querySelector('[name="' + t + '"]');
				i && webix.html.addCss(i, "invalid")
			},
			Qe: function(t) {
				var e = this.x.querySelector('[name="' + t + '"]');
				e && webix.html.removeCss(e, "invalid")
			}
		}, webix.ui.template, webix.Values)
	}(), webix.dp = function(t, e) {
		if ("object" == typeof t && t.s && (t = t.s.id), webix.dp.ur[t] || e) return webix.dp.ur[t];
		("string" == typeof t || "number" == typeof t) && (t = {
			master: webix.$$(t)
		});
		var i = new webix.DataProcessor(t),
			s = i.s.master.s.id;
		return webix.dp.ur[s] = i, webix.$$(s).attachEvent("onDestruct", function() {
			webix.dp.ur[this.s.id] = null, delete webix.dp.ur[this.s.id]
		}), i
	}, webix.dp.ur = {}, webix.dp.$$ = function(t) {
		return webix.dp.ur[t]
	}, webix.DataProcessor = webix.proto({
		defaults: {
			autoupdate: !0,
			updateFromResponse: !1,
			mode: "post",
			operationName: "webix_operation",
			trackMove: !1
		},
		$init: function() {
			this.reset(), this.vr = !1, this.name = "DataProcessor", this.$ready.push(this.Mi)
		},
		reset: function() {
			this.zr = []
		},
		url_setter: function(t) {
			var e = "";
			if ("string" == typeof t) {
				var i = t.split("->");
				i.length > 1 && (t = i[1], e = i[0])
			} else t && t.mode && (e = t.mode, t = t.url);
			return e ? webix.proxy(e, t) : t
		},
		master_setter: function(t) {
			var e = t;
			return "DataStore" != t.name && (e = t.data), this.s.store = e, t
		},
		Mi: function() {
			this.s.store.attachEvent("onStoreUpdated", webix.bind(this.Ar, this)), this.s.store.attachEvent("onDataMove", webix.bind(this.Br, this))
		},
		ignore: function(t, e) {
			var i = this.vr;
			this.vr = !0, t.call(e || this), this.vr = i
		},
		off: function() {
			this.vr = !0
		},
		on: function() {
			this.vr = !1
		},
		Cr: function(t) {
			var e = {};
			for (var i in t) 0 !== i.indexOf("$") && (e[i] = t[i]);
			return e
		},
		save: function(t, e, i) {
			e = e || "update", this.Dr(t, i || this.s.store.getItem(t), e)
		},
		Dr: function(t, e, i) {
			if ("object" == typeof t && (t = t.toString()), !t || this.vr === !0 || !i || "paint" == i) return !0;
			var s = this.s.store;
			s && s.vf && (e = s.vf(e));
			var n = {
				id: t,
				data: this.Cr(e),
				operation: i
			};
			if (webix.isUndefined(e.$parent) || (n.data.parent = e.$parent), "delete" != n.operation) {
				var r = this.s.master;
				r && r.data && r.data.getMark && r.data.getMark(t, "webix_invalid") && (n.Er = !0), this.validate(null, n.data) || (n.Er = !0)
			}
			return this.Fr(n) && this.zr.push(n), this.s.autoupdate && this.send(), !0
		},
		Br: function(t, e, i, s) {
			if (this.s.trackMove) {
				{
					var n = webix.copy(this.s.store.getItem(t));
					this.s.store.order
				}
				n.webix_move_index = e, n.webix_move_id = s, n.webix_move_parent = i, this.Dr(t, n, "order")
			}
		},
		Ar: function(t, e, i) {
			switch (i) {
				case "save":
					i = "update";
					break;
				case "update":
					i = "update";
					break;
				case "add":
					i = "insert";
					break;
				case "delete":
					i = "delete";
					break;
				default:
					return !0
			}
			return this.Dr(t, e, i)
		},
		Fr: function(t) {
			for (var e = 0; e < this.zr.length; e++) {
				var i = this.zr[e];
				if (i.id == t.id) return "delete" == t.operation && ("insert" == i.operation ? this.zr.splice(e, 1) : i.operation = "delete"), i.data = t.data, i.Er = t.Er, !1
			}
			return !0
		},
		send: function() {
			this.Gr()
		},
		Gr: function() {
			if (this.s.url) {
				for (var t = this.zr, e = [], i = this.s.url, s = 0; s < t.length; s++) {
					var n = t[s];
					if (!n.Hr && !n.Er) {
						var r = n.id,
							a = n.operation,
							h = "object" != typeof i || i.$proxy ? i : i[a],
							o = h && (h.$proxy || "function" == typeof h);
						if (h && (this.s.store.uf && this.s.store.uf(n.data), this.callEvent("onBefore" + a, [r, n]))) {
							if (n.Hr = !0, !this.callEvent("onBeforeDataSend", [n])) return;
							n.data = this.Ir(n.data);
							var l = this.at({
								id: n.id,
								status: n.operation
							});
							h.$proxy ? h.save ? h.save(this.config.master, n, this, l) : e.push(n) : ("insert" == a && delete n.data.id, o ? h(n.id, n.operation, n.data).then(function(t) {
								t && "function" == typeof t.json && (t = t.json()), l.success("", t, -1)
							}, function(t) {
								l.error("", null, t)
							}) : (n.data[this.s.operationName] = a, this.G(h, n.data, this.s.mode, a, l))), this.callEvent("onAfterDataSend", [n])
						}
					}
				}
				i.$proxy && i.saveAll && e.length && i.saveAll(this.config.master, e, this, this.at({}))
			}
		},
		Ir: function(t) {
			var e = {};
			for (var i in t) 0 !== i.indexOf("$") && (e[i] = t[i]);
			return e
		},
		G: function(t, e, i, s, n) {
			return "function" == typeof t ? t(e, s, n) : void webix.ajax()[i](t, e, n)
		},
		at: function(t) {
			var e = this;
			return {
				success: function(i, s, n) {
					return e.xr(t, i, s, n)
				},
				error: function(i, s, n) {
					return e.yr(t, i, s, n)
				}
			}
		},
		attachProgress: function(t, e, i) {
			this.attachEvent("onBeforeDataSend", t), this.attachEvent("onAfterSync", e), this.attachEvent("onAfterSaveError", i), this.attachEvent("onLoadError", i)
		},
		yr: function(t, e, i, s) {
			t ? this.Jr(!0, t.id, !1, t.status, !1, {
				text: e,
				data: i,
				loader: s
			}) : (this.callEvent("onLoadError", arguments), webix.callEvent("onLoadError", [e, i, s, this]))
		},
		Jr: function(t, e, i, s, n, r) {
			var a = this.s.master,
				h = this.getItemState(e);
			if (h.Hr = !1, t) {
				if (this.callEvent("onBeforeSaveError", [e, s, n, r])) return h.Er = !0, this.s.undoOnError && a.s.undo && a.undo(e), void this.callEvent("onAfterSaveError", [e, s, n, r])
			} else this.setItemState(e, !1);
			i && e != i && this.s.store.changeId(e, i), n && "delete" != s && this.s.updateFromResponse && this.ignore(function() {
				this.s.store.updateItem(i || e, n)
			}), this.s.undoOnError && a.s.undo && a.removeUndo(i || e), this.callEvent("onAfterSave", [n, e, r]), this.callEvent("onAfter" + s, [n, e, r])
		},
		processResult: function(t, e, i) {
			var s = e && ("error" == e.status || "invalid" == e.status),
				n = e ? e.newid || e.id : !1;
			this.Jr(s, t.id, n, t.status, e, i)
		},
		xr: function(t, e, i, s) {
			if (this.callEvent("onBeforeSync", [t, e, i, s]), -1 === s) this.processResult(t, i, {});
			else {
				var n = this.s.url;
				if (n.$proxy && n.result) n.result(t, this.s.master, this, e, i, s);
				else {
					var r;
					e && (r = i.json(), e && "undefined" == typeof r && (r = {
						status: "error"
					})), this.processResult(t, r, {
						text: e,
						data: i,
						loader: s
					})
				}
			}
			this.callEvent("onAfterSync", [t, e, i, s])
		},
		escape: function(t) {
			return this.s.escape ? this.s.escape(t) : encodeURIComponent(t)
		},
		getState: function() {
			if (!this.zr.length) return !1;
			for (var t = this.zr.length - 1; t >= 0; t--)
				if (this.zr[t].Hr) return "saving";
			return !0
		},
		getItemState: function(t) {
			var e = this.bt(t);
			return this.zr[e] || null
		},
		setItemState: function(t, e) {
			if (e) this.save(t, e);
			else {
				var i = this.bt(t);
				i > -1 && this.zr.splice(i, 1)
			}
		},
		bt: function(t) {
			for (var e = -1, i = 0; i < this.zr.length; i++)
				if (this.zr[i].id == t) {
					e = i;
					break
				}
			return e
		}
	}, webix.Settings, webix.EventSystem, webix.ValidateData), webix.jsonp = function(t, e, i, s) {
		var n = "webix_jsonp_" + webix.uid(),
			r = document.createElement("script");
		r.id = n, r.type = "text/javascript";
		var a = document.getElementsByTagName("head")[0];
		"function" == typeof e && (s = i, i = e, e = {}), e || (e = {}), e.jsonp = "webix.jsonp." + n, webix.jsonp[n] = function() {
			i.apply(s || window, arguments), r.parentNode.removeChild(r), i = a = s = r = null, delete webix.jsonp[n]
		};
		var h = [];
		for (var o in e) h.push(o + "=" + encodeURIComponent(e[o]));
		t += (-1 == t.indexOf("?") ? "?" : "&") + h.join("&"), r.src = t, a.appendChild(r)
	}, webix.markup = {
		namespace: "x",
		attribute: "data-",
		dataTag: "li",
		Ys: /-([a-z])/g,
		Zs: function(t) {
			return t[1].toUpperCase()
		},
		Lr: {
			width: !0,
			height: !0,
			gravity: !0,
			margin: !0,
			padding: !0,
			paddingX: !0,
			paddingY: !0,
			minWidth: !0,
			maxWidth: !0,
			minHeight: !0,
			maxHeight: !0,
			headerRowHeight: !0
		},
		AA: {
			disabled: !0,
			hidden: !0
		},
		Mr: function(t, e) {
			return webix.ui.hasMethod(t, e)
		},
		init: function(t, e, i) {
			t = t || document.body;
			for (var s = [], n = this.Nr(t), r = n.html, a = null, h = n.length - 1; h >= 0; h--) s[h] = n[h];
			for (var h = 0; h < s.length; h++) {
				var o;
				o = this.Or(s[h], r), o.$scope = i, a = this.Pr(o, s[h], r, e)
			}
			return a
		},
		parse: function(t, e) {
			"string" == typeof t && (t = webix.DataDriver[e || "xml"].toObject(t, t));
			var i = this.Nr(t, e);
			return this.Or(i[0], i.html)
		},
		Pr: function(t, e, i, s) {
			return s ? t.container = s : (t.container = e.parentNode, webix.html.remove(e)), this.Mr(t.view, "setPosition") && delete t.container, webix.ui(t)
		},
		Nr: function(t) {
			this.Qr = this.namespace ? this.namespace + ":" : "", this.Rr = this.Qr + "ui";
			var e = t.getElementsByTagName(this.Rr);
			return !e.length && t.documentElement && t.documentElement.tagName == this.Rr && (e = [t.documentElement]), !e.length && this.namespace && (e = t.getElementsByTagName("ui"), !e.length && t.documentElement && "ui" == t.documentElement.tagName && (e = [t.documentElement])), e.length || (e = this.Sr(t), e.html = !0), e
		},
		Sr: function(t) {
			if (t.getAttribute && t.getAttribute(this.attribute + "view")) return [t];
			for (var e = t.querySelectorAll("[" + this.attribute + "view]"), i = [], s = 0; s < e.length; s++) e[s].parentNode.getAttribute(this.attribute + "view") || i.push(e[s]);
			return i
		},
		Or: function(t, e, i) {
			var s = !1;
			if (!i) {
				var n = this.Tr(t, e);
				if ("ui" == n)
					for (var r = t.childNodes, a = 0; a < r.length; a++)
						if (1 == r[a].nodeType) return this.Or(r[a], e);
				i = {
					view: n
				}, e && "table" == t.tagName.toLowerCase() && (i.data = t, i.datatype = "htmltable", s = !0)
			}
			for (var h = "cols" == i.view || "rows" == i.view || this.Mr(i.view, "addView"), o = [], l = 0, c = !(e || t.style), u = t.firstChild; u;) {
				if (1 == u.nodeType) {
					var n = this.Tr(u, e);
					if ("data" == n) {
						l = 1;
						var d = u;
						u = u.nextSibling, i.data = this.Ur(d, e);
						continue
					}
					if ("config" == n) {
						this.Vr(u, i, e);
						var f = u;
						u = u.nextSibling, webix.html.remove(f);
						continue
					}
					if ("column" == n) {
						l = 1;
						var b = this.Wr(u, e);
						b.header = b.header || b.value, b.width = 1 * b.width || "", i.columns = i.columns || [], i.columns.push(b)
					} else if (n || h && e) {
						var x = this.Or(u, e, {
							view: n
						});
						"head" == x.view ? i.head = x.rows ? x.rows[0] : x.template : "body" == x.view ? this.Mr(i.view, "addView") ? o.push({
							body: x.rows ? x.rows[0] : x.value,
							header: x.header || ""
						}) : i.body = x.rows ? 1 == x.rows.length ? x.rows[0] : {
							rows: x.rows
						} : x.value : o.push(x)
					} else if (c) {
						l = 1;
						var p = u.tagName;
						e && (p = p.toLowerCase().replace(this.Ys, this.Zs)), i[p] = webix.DataDriver.xml.tagToObject(u)
					}
				}
				u = u.nextSibling
			}
			if (this.Xr(t, i, e), o.length) i.stack ? i[i.stack] = o : this.Mr(i.view, "setValues") ? i.elements = o : "rows" == i.view ? (i.view = "layout", i.rows = o) : "cols" == i.view ? (i.view = "layout", i.cols = o) : this.Mr(i.view, "setValue") ? i.cells = o : this.Mr(i.view, "getBody") ? i.body = 1 == o.length ? o[0] : {
				rows: o
			} : i.rows = o;
			else if (!s && !l)
				if (!e || i.template || i.view && "template" != i.view) {
					var w = this.Yr(t, e);
					if (w) {
						var v = "template";
						this.Mr(i.view, "setValue") && (v = "value"), i[v] = i[v] || w
					}
				} else i.view = "template", i.content = t;
			return i
		},
		Zr: function(t) {
			var e = t.replace(/\s+/gm, "");
			return e.length > 0 ? !1 : !0
		},
		$r: {
			body: 1,
			head: 1,
			data: 1,
			rows: 1,
			cols: 1,
			cells: 1,
			elements: 1,
			ui: 1,
			column: 1,
			config: 1
		},
		Vr: function(t, e, i) {
			var s = this.Xr(t, {});
			s.name ? (e[s.name] = s, delete s.name) : s.stack ? e[s.stack] = [] : e = s;
			for (var n = t.childNodes, r = 0; r < n.length; r++) {
				var a = null;
				a = 1 == n[r].nodeType && "config" == n[r].tagName.toLowerCase() && n[r].attributes.length ? this.Vr(n[r], s, i) : n[r].innerHTML, s.stack && a && e[s.stack].push(a)
			}
			return e
		},
		Tr: function(t, e) {
			if (e) return t.getAttribute(this.attribute + "view") || ("config" == t.tagName.toLowerCase() ? "config" : null);
			var i = t.tagName.toLowerCase();
			if (this.namespace) {
				if (0 === i.indexOf(this.Qr) || t.scopeName == this.namespace) return i.replace(this.Qr, "")
			} else if (webix.ui[i] || this.$r[i]) return i;
			return 0
		},
		Ur: function(t, e) {
			for (var i = [], s = t.getElementsByTagName(webix.markup.dataTag), n = 0; n < s.length; n++) {
				var r = s[n];
				if (r.parentNode.parentNode.tagName != webix.markup.dataTag) {
					var a = this.Wr(r, e);
					r.className && (a.$css = r.className), i.push(a)
				}
			}
			return webix.html.remove(t), i
		},
		Yr: function(t) {
			return t.style ? t.innerHTML : t.firstChild ? t.firstChild.wholeText || t.firstChild.data || "" : ""
		},
		Wr: function(t, e) {
			if (!e) return webix.DataDriver.xml.tagToObject(t);
			var i = this.Xr(t, {}, e);
			return !i.value && t.childNodes.length && (i.value = this.Yr(t, e)), i
		},
		Xr: function(t, e, i) {
			for (var s = t.attributes, n = 0; n < s.length; n++) {
				var r = s[n].name;
				if (i) {
					if (0 !== r.indexOf(this.attribute)) continue;
					r = r.replace(this.attribute, "").replace(this.Ys, this.Zs)
				}
				var a = s[n].value; - 1 != a.indexOf("json://") && (a = JSON.parse(a.replace("json://", ""))), this.Lr[r] ? a = parseInt(a, 10) : this.AA[r] && (a = a && "false" !== a && "0" != a), e[r] = a
			}
			return e
		}
	},
	function() {
		function t(t, e) {
			var s = t.callback;
			i(!1), t.box.parentNode.removeChild(t.box), d = t.box = null, s && s(e, t.details)
		}

		function e(e) {
			if (d) {
				e = e || event;
				var i = e.which || event.keyCode;
				if (webix.message.keyboard) return (13 == i || 32 == i) && t(d, !0), 27 == i && t(d, !1), e.preventDefault && e.preventDefault(), !(e.cancelBubble = !0)
			}
		}

		function i(t) {
			i.cover && i.cover.parentNode || (i.cover = document.createElement("DIV"), i.cover.onkeydown = e, i.cover.className = "webix_modal_cover", document.body.appendChild(i.cover)), i.cover.style.display = t ? "inline-block" : "none"
		}

		function s(t, e, i) {
			return "<div class='webix_popup_button" + (i ? " " + i : "") + "' result='" + e + "' ><div>" + t + "</div></div>"
		}

		function n(t) {
			f.area || (f.area = document.createElement("DIV"), f.area.className = "webix_message_area", f.area.style[f.position] = "5px", document.body.appendChild(f.area)), f.hide(t.id);
			var e = document.createElement("DIV");
			return e.innerHTML = "<div>" + t.text + "</div>", e.className = "webix_info webix_" + t.type, e.onclick = function() {
				f.hide(t.id), t = null
			}, webix.$testmode && (e.className += " webix_no_transition"), "bottom" == f.position && f.area.firstChild ? f.area.insertBefore(e, f.area.firstChild) : f.area.appendChild(e), t.expire > 0 && (f.timers[t.id] = window.setTimeout(function() {
				f.hide(t.id)
			}, t.expire)), e.style.height = e.offsetHeight - 2 + "px", f.pull[t.id] = e, e = null, t.id
		}

		function r(e, i, n) {
			var r = document.createElement("DIV");
			r.className = " webix_modal_box webix_" + e.type, r.setAttribute("webixbox", 1);
			var a = "";
			if (e.width && (r.style.width = e.width + (webix.rules.isNumber(e.width) ? "px" : "")), e.height && (r.style.height = e.height + (webix.rules.isNumber(e.height) ? "px" : "")), e.title && (a += '<div class="webix_popup_title">' + e.title + "</div>"), a += '<div class="webix_popup_text"><span>' + (e.content ? "" : e.text) + '</span></div><div  class="webix_popup_controls">', (i || e.ok) && (a += s(e.ok || "OK", !0, "confirm")), (n || e.cancel) && (a += s(e.cancel || "Cancel", !1)), e.buttons)
				for (var h = 0; h < e.buttons.length; h++) a += s(e.buttons[h], h);
			if (a += "</div>", r.innerHTML = a, e.content) {
				var o = e.content;
				"string" == typeof o && (o = document.getElementById(o)), "none" == o.style.display && (o.style.display = ""), r.childNodes[e.title ? 1 : 0].appendChild(o)
			}
			return r.onclick = function(i) {
				i = i || event;
				var s = i.target || i.srcElement;
				if (s.className || (s = s.parentNode), -1 != s.className.indexOf("webix_popup_button")) {
					var n = s.getAttribute("result");
					n = "true" == n || ("false" == n ? !1 : n), t(e, n)
				}
				i.cancelBubble = !0
			}, e.box = r, (i || n || e.buttons) && (d = e), r
		}

		function a(t, s, n) {
			var a = t.tagName ? t : r(t, s, n);
			t.hidden || i(!0), document.body.appendChild(a);
			var h = t.left || Math.abs(Math.floor(((window.innerWidth || document.documentElement.offsetWidth) - a.offsetWidth) / 2)),
				o = t.top || Math.abs(Math.floor(((window.innerHeight || document.documentElement.offsetHeight) - a.offsetHeight) / 2));
			return a.style.top = "top" == t.position ? "-3px" : o + "px", a.style.left = h + "px", a.onkeydown = e, a.focus(), t.hidden && webix.modalbox.hide(a), a
		}

		function h(t) {
			return a(t, !0, !1)
		}

		function o(t) {
			return a(t, !0, !0)
		}

		function l(t) {
			return a(t)
		}

		function c(t, e, i) {
			return "object" != typeof t && ("function" == typeof e && (i = e, e = ""), t = {
				text: t,
				type: e,
				callback: i
			}), t
		}

		function u(t, e, i, s) {
			return "object" != typeof t && (t = {
				text: t,
				type: e,
				expire: i,
				id: s
			}), t.id = t.id || f.uid(), t.expire = t.expire || f.expire, t
		}
		var d = null;
		document.attachEvent ? document.attachEvent("onkeydown", e) : document.addEventListener("keydown", e, !0), webix.alert = function() {
			var t = c.apply(this, arguments);
			return t.type = t.type || "confirm", h(t)
		}, webix.confirm = function() {
			var t = c.apply(this, arguments);
			return t.type = t.type || "alert", o(t)
		}, webix.modalbox = function() {
			var t = c.apply(this, arguments);
			return t.type = t.type || "alert", l(t)
		}, webix.modalbox.hide = function(t) {
			if (t) {
				for (; t && t.getAttribute && !t.getAttribute("webixbox");) t = t.parentNode;
				t && t.parentNode.removeChild(t)
			}
			i(!1), d = null
		};
		var f = webix.message = function(t) {
			t = u.apply(this, arguments), t.type = t.type || "info";
			var e = t.type.split("-")[0];
			switch (e) {
				case "alert":
					return h(t);
				case "confirm":
					return o(t);
				case "modalbox":
					return l(t);
				default:
					return n(t)
			}
		};
		f.seed = (new Date).valueOf(), f.uid = function() {
			return f.seed++
		}, f.expire = 4e3, f.keyboard = !0, f.position = "top", f.pull = {}, f.timers = {}, f.hideAll = function() {
			for (var t in f.pull) f.hide(t)
		}, f.hide = function(t) {
			var e = f.pull[t];
			e && e.parentNode && (window.setTimeout(function() {
				e.parentNode.removeChild(e), e = null
			}, 2e3), e.style.height = 0, e.className += " hidden", f.timers[t] && window.clearTimeout(f.timers[t]), delete f.pull[t])
		}
	}(), webix.protoUI({
		name: "carousel",
		defaults: {
			scrollSpeed: "300ms",
			type: "clean",
			navigation: {}
		},
		$init: function() {
			this.x.className += " webix_carousel", this.Ft = null, this.y = null, this.Mh = 0, this.$ready.unshift(this.Gt), this.$ready.push(this.Mi)
		},
		Gt: function() {
			this.Ft && this.Ft.destructor && this.Ft.destructor();
			var t = "";
			this.config.cols ? (t = "cols", this.mc = 0) : (t = "rows", this.mc = 1);
			var e = {
				borderless: !0,
				type: "clean"
			};
			e[t] = webix.copy(this.s[t]);
			for (var i = ["type", "margin", "marginX", "marginY", "padding", "paddingX", "paddingY"], s = {}, n = 0; n < i.length; n++) this.s[i[n]] && (s[i[n]] = this.s[i[n]]);
			webix.extend(e, s, !0), this.Ft = webix.ui.A(e), this.Ft.Xb = this, this.x.appendChild(this.Ft.x), this.q = this.Ft.q, this.Ft.fc = webix.bind(webix.ui.carousel.prototype.fc, this), this.Ft.adjustScroll = webix.bind(webix.ui.carousel.prototype.adjustScroll, this), webix.attachEvent("onReconstruct", webix.bind(function(t) {
				t == this.Ft && this.Ht()
			}, this)), this.w = this.x.firstChild
		},
		getChildViews: function() {
			return [this.Ft]
		},
		getLayout: function() {
			return this.Ft
		},
		Mi: function() {
			this.w.setAttribute("touch_scroll", this.mc ? "y" : "x"), this.Ft.attachEvent("onAfterScroll", webix.bind(function() {
				this.callEvent("onShow", [this.getActiveId()])
			}, this))
		},
		adjustScroll: function(t) {
			var e, i = this.mc ? this.dc : this.bc;
			return this.mc ? (e = Math.round(t.f / i), t.f = e * i) : (e = Math.round(t.e / i), t.e = e * i), this.Mh = -e, this.s.navigation && this.Eh(), !0
		},
		fc: function(t) {
			var e, i, s, n, r, a;
			for (s = -1, i = this.Ft, e = 0; e < i.q.length; e++)
				if (i.q[e] == t) {
					s = e;
					break
				}
			0 > s || s == this.Mh || (this.Mh = s, n = i.mc ? this.dc : this.bc, r = -(i.mc ? 0 : s * n), a = -(i.mc ? s * n : 0), this.scrollTo(r, a), this.callEvent("onShow", [i.q[this.Mh].s.id]), this.s.navigation && this.Ch())
		},
		scrollTo: function(t, e) {
			webix.Touch && webix.animate.isSupported() ? webix.Touch.Nf(this.w, t, e, this.s.scrollSpeed || "100ms") : (this.w.style.marginLeft = t + "px", this.w.style.marginTop = e + "px")
		},
		navigation_setter: function(t) {
			return this.E(t, {
				type: "corner",
				buttons: !0,
				items: !0
			}), t
		},
		showNext: function() {
			this.Mh < this.Ft.q.length - 1 && this.setActiveIndex(this.Mh + 1)
		},
		showPrev: function() {
			this.Mh > 0 && this.setActiveIndex(this.Mh - 1)
		},
		setActiveIndex: function(t) {
			var e = this.Ft.q[t].s.id;
			webix.$$(e).show()
		},
		getActiveIndex: function() {
			return this.Mh
		},
		$getSize: function(t, e) {
			var i = this.Ft.$getSize(0, 0),
				s = webix.ui.view.prototype.$getSize.call(this, t, e);
			return this.Ft.mc ? (s[0] = Math.max(s[0], i[0]), s[1] = Math.min(s[1], i[1])) : (s[2] = Math.max(s[2], i[2]), s[3] = Math.min(s[3], i[3])), s
		},
		$setSize: function(t, e) {
			var i = this.Ft,
				s = i.q.length,
				n = webix.ui.view.prototype.$setSize.call(this, t, e),
				r = this.dc * (i.mc ? s : 1),
				a = this.bc * (i.mc ? 1 : s);
			n ? (this.w.style.height = r + "px", this.w.style.width = a + "px", i.$setSize(a, r), this.Ht()) : i.$setSize(a, r)
		},
		Ht: function() {
			var t = this.Ft,
				e = this.Mh || 0,
				i = t.mc ? this.dc : this.bc,
				s = -(t.mc ? 0 : e * i),
				n = -(t.mc ? e * i : 0);
			this.scrollTo(s, n), this.s.navigation && this.Ch()
		},
		getActiveId: function() {
			var t = this.Ft.q[this.Mh];
			return t ? t.s.id : null
		},
		setActive: function(t) {
			webix.$$(t).show()
		}
	}, webix.EventSystem, webix.NavigationButtons, webix.ui.view), webix.type(webix.ui.list, {
		name: "uploader",
		template: "#name#  {common.removeIcon()}{common.percent()}<div style='float:right'>#sizetext#</div>",
		percent: function(t) {
			return "transfer" == t.status ? "<div style='width:60px; text-align:center; float:right'>" + t.percent + "%</div>" : "<div class='webix_upload_" + t.status + "'><span class='" + ("error" == t.status ? "error_icon" : "fa-ok webix_icon") + "'></span></div>"
		},
		removeIcon: function() {
			return "<div class='webix_remove_upload'><span class='cancel_icon'></span></div>"
		},
		on_click: {
			webix_remove_upload: function(t, e) {
				webix.$$(this.config.uploader).files.remove(e)
			}
		}
	}), webix.UploadDriver = {
		flash: {
			$render: function() {
				window.swfobject || webix.require("legacy/swfobject.js", !0);
				var t = this.s;
				t.swfId = t.swfId || "webix_swf_" + webix.uid(), this.re().innerHTML += "<div class='webix_upload_flash'><div id='" + t.swfId + "'></div></div>", this._r = this.re().lastChild, swfobject.embedSWF(webix.codebase + "/legacy/uploader.swf", t.swfId, "100%", "100%", "9", null, {
					uploaderId: t.id,
					ID: t.swfId,
					enableLogs: t.enableLogs ? "1" : "",
					paramName: t.inputName,
					multiple: t.multiple ? "Y" : ""
				}, {
					wmode: "transparent"
				});
				swfobject.getFlashPlayerVersion();
				webix.event(this.x, "click", webix.bind(function() {
					var t = new Date;
					t - (this.ds || 0) > 250 && this.fileDialog()
				}, this)), this.files.attachEvent("onBeforeDelete", webix.bind(this.as, this))
			},
			$applyFlash: function(t, e) {
				return this[t].apply(this, e)
			},
			getSwfObject: function() {
				return swfobject.getObjectById(this.s.swfId)
			},
			fileDialog: function() {
				this.getSwfObject() && this.getSwfObject().showDialog()
			},
			send: function(t) {
				if ("function" == typeof t && (this.fs = t, t = 0), !t) {
					var e = this.files.data.order,
						i = !0;
					if (e.length)
						for (var s = 0; s < e.length; s++) i = this.send(e[s]) && i;
					return void(i && this.gs())
				}
				var n = this.files.getItem(t);
				return "client" !== n.status ? !1 : (n.status = "transfer", this.getSwfObject() && this.getSwfObject().upload(t, this.s.upload, this.s.formData || {}), !0)
			},
			$beforeAddFileToQueue: function(t, e, i) {
				var s = e.split(".").pop(),
					n = this.ks(i);
				return this.callEvent("onBeforeFileAdd", [{
					id: t,
					name: e,
					size: i,
					sizetext: n,
					type: s
				}])
			},
			$addFileToQueue: function(t, e, i) {
				if (this.files.exists(t)) return !1;
				this.s.multiple || this.files.clearAll();
				var s = e.split(".").pop(),
					n = this.ks(i),
					r = {
						name: e,
						id: t,
						size: i,
						sizetext: n,
						type: s,
						status: "client"
					};
				this.files.add(r), this.callEvent("onAfterFileAdd", [r]), t && this.s.autosend && this.send(t)
			},
			stopUpload: function(t) {
				this.as(t)
			},
			as: function(t) {
				var e = this.files.getItem(t);
				this.getSwfObject().uploadStop(t), e.status = "client"
			},
			$onUploadComplete: function() {
				this.s.autosend && this.gs()
			},
			$onUploadSuccess: function(t, e, i) {
				var s = this.files.getItem(t);
				s && (s.status = "server", s.progress = 100, i.text && "string" == typeof i.text && (webix.DataDriver.json.toObject(i.text), webix.extend(s, i, !0)), this.callEvent("onFileUpload", [s, i]), this.callEvent("onChange", []), this.files.updateItem(t))
			},
			$onUploadFail: function(t) {
				var e = this.files.getItem(t);
				e.status = "error", delete e.percent, this.files.updateItem(t), this.callEvent("onFileUploadError", [e, ""])
			}
		},
		html5: {
			$render: function() {
				if (this._r) return void this.w.appendChild(this._r);
				this.files.attachEvent("onBeforeDelete", this.as);
				var t = {
					type: "file",
					"class": "webix_hidden_upload",
					tabindex: -1
				};
				this.s.accept && (t.accept = this.s.accept), this.s.multiple && (t.multiple = "true");
				var e = webix.html.create("input", t);
				this._r = this.w.appendChild(e), webix.event(this.x, "drop", webix.bind(function(t) {
					this.bs(t), webix.html.preventEvent(t)
				}, this)), webix.event(e, "change", webix.bind(function() {
					if (this.cs(e.files), webix.env.isIE) {
						var t = document.createElement("form");
						t.appendChild(this._r), t.reset(), this.w.appendChild(e)
					} else e.value = ""
				}, this)), webix.event(this.x, "click", webix.bind(function() {
					var t = new Date;
					t - (this.ds || 0) > 250 && this.fileDialog()
				}, this)), webix.event(this.x, "dragenter", webix.html.preventEvent), webix.event(this.x, "dragexit", webix.html.preventEvent), webix.event(this.x, "dragover", webix.html.preventEvent)
			},
			bs: function(t) {
				var e = t.dataTransfer.files;
				this.callEvent("onBeforeFileDrop", [e, t]) && this.cs(e), this.callEvent("onAfterFileDrop", [e, t])
			},
			fileDialog: function(t) {
				this.ds = new Date, this.es = t;
				var e = this.x.getElementsByTagName("INPUT");
				e[e.length - 1].click()
			},
			send: function(t, e) {
				if ("function" == typeof t && (this.fs = t, t = 0), !t) {
					var i = this.files.data.order,
						s = !0;
					if (i.length)
						for (var n = 0; n < i.length; n++) s = !this.send(i[n], e) && s;
					return void(s && this.gs())
				}
				var r = this.files.getItem(t);
				if ("client" !== r.status) return !1;
				r.status = "transfer";
				var a = new FormData;
				a.append(this.config.inputName, r.file);
				var h = {};
				e = e || {};
				var o = new XMLHttpRequest;
				if (webix.callEvent("onBeforeAjax", ["POST", this.s.upload, e, o, h, a])) {
					for (var l in e) a.append(l, e[l]);
					r.xhr = o, o.upload.addEventListener("progress", webix.bind(function(e) {
						this.$updateProgress(t, e.loaded / e.total * 100)
					}, this), !1), o.onload = webix.bind(function() {
						o.aborted || this.is(t)
					}, this), o.open("POST", this.s.upload, !0);
					for (var l in h) o.setRequestHeader(l, h[l]);
					o.send(a)
				}
				return this.$updateProgress(t, 0), !0
			},
			is: function(t) {
				var e = this.files.getItem(t);
				if (e) {
					var i = null;
					200 == e.xhr.status && (i = webix.DataDriver[this.s.datatype || "json"].toObject(e.xhr.responseText)), i && "error" != i.status ? this.js(t, i) : (e.status = "error", delete e.percent, this.files.updateItem(t), this.callEvent("onFileUploadError", [e, i])), delete e.xhr
				}
			},
			stopUpload: function(t) {
				webix.bind(this.as, this.files)(t)
			},
			as: function(t) {
				var e = this.getItem(t);
				"undefined" != typeof e.xhr && (e.xhr.aborted = !0, e.xhr.abort()), delete e.xhr, e.status = "client"
			}
		}
	}, webix.protoUI({
		name: "uploader",
		defaults: {
			autosend: !0,
			multiple: !0,
			inputName: "upload"
		},
		$cssName: "button",
		Ce: !0,
		send: function() {},
		fileDialog: function() {},
		stopUpload: function() {},
		$init: function() {
			var t = webix.UploadDriver.html5;
			this.files = new webix.DataCollection, (webix.isUndefined(XMLHttpRequest) || webix.isUndefined((new XMLHttpRequest).upload)) && (t = webix.UploadDriver.flash), webix.extend(this, t, !0)
		},
		$setSize: function(t, e) {
			webix.ui.view.prototype.$setSize.call(this, t, e) && this.render()
		},
		apiOnly_setter: function(t) {
			return webix.delay(this.render, this), this.$apiOnly = t
		},
		cs: function(t) {
			for (var e = 0; e < t.length; e++) this.addFile(t[e])
		},
		link_setter: function(t) {
			return t && webix.delay(function() {
				var t = webix.$$(this.s.link);
				t.sync && t.filter ? t.sync(this.files) : t.setValues && this.files.data.attachEvent("onStoreUpdated", function() {
					t.setValues(this)
				}), t.s.uploader = this.s.id
			}, this), t
		},
		addFile: function(t, e, i) {
			var s = null;
			"object" == typeof t && (s = t, t = s.name, e = s.size);
			var n = this.ks(e);
			i = i || t.split(".").pop();
			var r = {
				file: s,
				name: t,
				id: webix.uid(),
				size: e,
				sizetext: n,
				type: i,
				context: this.es,
				status: "client"
			};
			if (this.callEvent("onBeforeFileAdd", [r])) {
				this.s.multiple || this.files.clearAll();
				var a = this.files.add(r);
				this.callEvent("onAfterFileAdd", [r]), a && this.s.autosend && this.send(a, this.s.formData)
			}
		},
		addDropZone: function(t, e) {
			var i = webix.toNode(t),
				s = "";
			e && (s = " " + webix.html.createCss({
				content: '"' + e + '"'
			}, ":before"));
			var n = "webix_drop_file" + s;
			webix.event(i, "dragover", webix.html.preventEvent), webix.event(i, "dragover", function() {
				webix.html.addCss(i, n, !0)
			}), webix.event(i, "dragleave", function() {
				webix.html.removeCss(i, n)
			}), webix.event(i, "drop", webix.bind(function(t) {
				webix.html.removeCss(i, n);
				var e = t.dataTransfer;
				if (e && e.files.length)
					for (var s = 0; s < e.files.length; s++) this.addFile(e.files[s]);
				return webix.html.preventEvent(t)
			}, this))
		},
		ks: function(t) {
			for (var e = 0; t > 1024;) e++, t /= 1024;
			return Math.round(100 * t) / 100 + " " + webix.i18n.fileSize[e]
		},
		js: function(t, e) {
			if ("error" != e.status) {
				var i = this.files.getItem(t);
				i.status = "server", i.progress = 100, webix.extend(i, e, !0), this.callEvent("onFileUpload", [i, e]), this.callEvent("onChange", []), this.files.updateItem(t)
			}
			this.isUploaded() && this.gs(e)
		},
		gs: function(t) {
			this.callEvent("onUploadComplete", [t]), this.fs && (this.fs.call(this, t), this.fs = 0)
		},
		isUploaded: function() {
			for (var t = this.files.data.order, e = 0; e < t.length; e++)
				if ("server" != this.files.getItem(t[e]).status) return !1;
			return !0
		},
		$onUploadComplete: function() {},
		$updateProgress: function(t, e) {
			var i = this.files.getItem(t);
			i.percent = Math.round(e), this.files.updateItem(t)
		},
		setValue: function(t) {
			"string" == typeof t && (t = {
				value: t,
				status: "server"
			}), this.files.clearAll(), t && this.files.parse(t), this.callEvent("onChange", [])
		},
		getValue: function() {
			var t = [];
			return this.files.data.each(function(e) {
				"server" == e.status && t.push(e.value || e.name)
			}), t.join(",")
		}
	}, webix.ui.button), webix.html.addMeta = function(t, e) {
		document.getElementsByTagName("head").item(0).appendChild(webix.html.create("meta", {
			name: t,
			content: e
		}))
	},
	function() {
		var t = function() {
			var t = !!(window.orientation % 180);
			webix.ui.orientation !== t && (webix.ui.orientation = t, webix.callEvent("onRotate", [t]))
		};
		webix.env.touch && (webix.ui.orientation = !!((webix.isUndefined(window.orientation) ? 90 : window.orientation) % 180), webix.event(window, "onorientationchange" in window ? "orientationchange" : "resize", t)), webix.env.isFF && window.matchMedia && (window.matchMedia("(orientation: portrait)").addListener(function() {
			webix.ui.orientation = !1
		}), window.matchMedia("(orientation: landscape)").addListener(function() {
			webix.ui.orientation = !0
		})), webix.ui.fullScreen = function() {
			if (webix.env.touch) {
				webix.html.addMeta("apple-mobile-web-app-capable", "yes"), webix.html.addMeta("viewport", "initial-scale=1, maximum-scale=1, user-scalable=no");
				var e = document.body.offsetHeight || document.body.scrollHeight,
					i = -1 != navigator.userAgent.indexOf("iPhone"),
					s = (-1 != navigator.userAgent.indexOf("iPad"), navigator.userAgent.match(/iPhone OS (\d+)/)),
					n = s && s[1] >= 7,
					r = i && (356 == e || 208 == e || 306 == e || 158 == e || 444 == e),
					a = 568 == window.screen.height,
					h = function() {
						var t = 0,
							e = 0;
						if (i && !n) webix.ui.orientation ? (t = a ? 568 : 480, e = r ? 268 : 300) : (t = 320, e = a ? r ? 504 : 548 : r ? 416 : 460);
						else if (webix.env.isAndroid) {
							if (!webix.env.isFF) {
								document.body.style.width = document.body.style.height = "1px", document.body.style.overflow = "hidden";
								var s = window.outerWidth / window.innerWidth;
								t = window.outerWidth / s, e = window.outerHeight / s
							}
						} else webix.env.isIEMobile || (t = window.innerWidth, e = window.innerHeight);
						e && (document.body.style.height = e + "px", document.body.style.width = t + "px"), webix.ui.$freeze = !1, webix.ui.resize()
					},
					o = function() {
						webix.ui.$freeze = !0, webix.env.isSafari ? h() : webix.delay(h, null, [], 500)
					};
				webix.attachEvent("onRotate", o), t(), webix.delay(o)
			}
		}
	}(),
	function() {
		if (window.jQuery) {
			var t = jQuery,
				e = [],
				i = function(t) {
					return t && t.getAttribute ? t.getAttribute("view_id") : void 0
				},
				s = function(s) {
					return function(n) {
						if ("string" != typeof n) {
							var r = [];
							return this.each(function() {
								var t, e, e = i(this) || i(this.firstChild);
								if (e && (t = webix.$$(e)), !t) {
									var a = n ? n.data : 0;
									a && (n.data = null);
									var h = webix.copy(n || {
										autoheight: !0,
										autowidth: !0
									});
									if (h.view = s, a && (n.data = h.data = a), "table" === this.tagName.toLowerCase()) {
										var o = webix.html.create("div", {
											id: this.getAttribute("id") || "",
											"class": this.getAttribute("class") || ""
										}, "");
										this.parentNode.insertBefore(o, this), h.container = o, t = webix.ui(h), t.parse(this, "htmltable")
									} else h.container = this, t = webix.ui(h)
								}
								r.push(t)
							}), 1 === r.length ? r[0] : r
						}
						return e[n] ? e[n].apply(this, []) : void t.error("Method " + n + " does not exist on jQuery.".name)
					}
				},
				n = function() {
					for (var e in webix.ui) {
						var i = "webix_" + e;
						t.fn[i] || (t.fn[i] = s(e))
					}
				};
			n(), t(n)
		}
	}(), webix.history = {
		track: function(t, e) {
			this.ls(t, e);
			var i = webix.$$(t),
				s = function() {
					webix.history.ms || i.getValue && webix.history.push(t, i.getValue())
				};
			i.getActiveId ? i.attachEvent("onViewChange", s) : i.attachEvent("onChange", s)
		},
		ns: function(t, e) {
			webix.history.ms = 1, t = webix.$$(t), t.callEvent("onBeforeHistoryNav", [e]) && t.setValue && t.setValue(e), webix.history.ms = 0
		},
		push: function(t, e, i) {
			t = webix.$$(t);
			var s = "";
			e && (s = "#!/" + e), webix.isUndefined(i) && (i = t.getValue ? t.getValue() : e), window.history.pushState({
				webix: !0,
				id: t.s.id,
				value: i
			}, "", s)
		},
		ls: function(t, e) {
			webix.event(window, "popstate", function(t) {
				t.state && t.state.webix && webix.history.ns(t.state.id, t.state.value)
			});
			var i = window.location.hash;
			webix.noanimate = !0, i && 0 === i.indexOf("#!/") ? webix.history.ns(t, i.replace("#!/", "")) : e && (webix.history.push(t, e), webix.history.ns(t, e)), webix.noanimate = !1, this.ls = function() {}
		}
	}, webix.protoUI({
		name: "fieldset",
		defaults: {
			borderless: !0
		},
		$init: function(t) {
			this.x.className += " webix_fieldset", this.x.innerHTML = "<fieldset><legend></legend><div></div></fieldset>"
		},
		label_setter: function(t) {
			return this.x.firstChild.childNodes[0].innerHTML = t, t
		},
		getChildViews: function() {
			return [this.os]
		},
		body_setter: function(t) {
			return this.os = webix.ui(t, this.x.firstChild.childNodes[1]), this.os.Xb = this, t
		},
		getBody: function() {
			return this.os
		},
		$getSize: function(t, e) {
			t += 18, e += 30;
			var i = this.ps = this.os.$getSize(t, e);
			return i
		},
		$setSize: function(t, e) {
			webix.ui.view.prototype.$setSize.call(this, t, e) && (e = Math.min(this.ps[3], e), t = Math.min(this.ps[1], t), this.os.$setSize(t - 18, e - 30))
		}
	}, webix.ui.view), webix.protoUI({
		name: "slider",
		$touchCapture: !0,
		defaults: {
			min: 0,
			max: 100,
			value: 50,
			step: 1,
			title: !1,
			template: function(t, e) {
				var i = e.qs = "x" + webix.uid(),
					s = "<div class='webix_slider_title'></div><div class='webix_slider_box'><div class='webix_slider_left'>&nbsp;</div><div class='webix_slider_right'></div><div class='webix_slider_handle' id='" + i + "'>&nbsp;</div></div>";
				return e.$renderInput(t, s, i)
			}
		},
		type_setter: function(t) {
			this.x.className += " webix_slider_" + t
		},
		title_setter: function(t) {
			return "string" == typeof t ? webix.template(t) : t
		},
		rs: function() {
			return this.$view.querySelector(".webix_slider_handle")
		},
		oe: function() {
			var t = this.rs(),
				e = this.s;
			if (t) {
				var i = this.Ee(e),
					s = e.value % e.step ? Math.round(e.value / e.step) * e.step : e.value;
				s = Math.max(Math.min(s, e.max), e.min);
				var n = e.max - e.min,
					r = Math.ceil((i - 20) * (s - e.min) / n),
					a = i - 20 - r;
				t.style.left = 10 + r - 8 + "px", t.parentNode.style.width = i + "px", a = Math.min(Math.max(a, 2), i - 22), r = Math.min(Math.max(r, 2), i - 22);
				var h = t.previousSibling;
				h.style.width = a + "px";
				var o = h.previousSibling;
				o.style.width = r + "px", this.s.title && (t.parentNode.previousSibling.innerHTML = this.s.title(this.s, this))
			}
		},
		refresh: function() {
			this.oe()
		},
		$setValue: function() {
			this.refresh()
		},
		$getValue: function() {
			return this.s.value
		},
		$init: function() {
			webix.env.touch ? this.attachEvent("onTouchStart", webix.bind(this.ss, this)) : webix.event(this.x, "mousedown", webix.bind(this.ss, this))
		},
		ss: function(t) {
			var e = t.target || t.srcElement;
			this.Ky && this.Ky(t);
			var i = this.s.value;
			return webix.isArray(i) && (i = webix.copy(i)), -1 != e.className.indexOf("webix_slider_handle") ? (this.$x = i, this.ts.apply(this, arguments)) : void(-1 != e.className.indexOf("webix_slider") && (this.$x = i, this.s.value = this.us.apply(this, arguments), this.ts(t)))
		},
		ts: function() {
			this.vs = webix.env.touch ? [this.attachEvent("onTouchMove", webix.bind(this.ws, this)), this.attachEvent("onTouchEnd", webix.bind(this.xs, this))] : [webix.event(document.body, "mousemove", webix.bind(this.ws, this)), webix.event(window, "mouseup", webix.bind(this.xs, this))], webix.html.addCss(document.body, "webix_noselect")
		},
		xs: function() {
			this.vs && (webix.env.touch ? (webix.detachEvent(this.vs[0]), webix.detachEvent(this.vs[1])) : (webix.eventRemove(this.vs[0]), webix.eventRemove(this.vs[1])), this.vs = []), webix.html.removeCss(document.body, "webix_noselect");
			var t = this.s.value;
			webix.isArray(t) && (t = webix.copy(t)), this.s.value = this.$x, this.setValue(t)
		},
		ws: function() {
			this.s.value = this.us.apply(this, arguments), this.refresh(), this.callEvent("onSliderDrag", [])
		},
		us: function(t, e) {
			var i = 0;
			return i = webix.env.touch ? e ? e.x : t.x : webix.html.pos(t).x, this.ys(i)
		},
		ys: function(t) {
			var e = this.s,
				i = e.max - e.min,
				s = webix.html.offset(this.rs().parentNode).x + 10,
				n = this.Ee(e) - 20,
				r = n ? (t - s) * i / n : 0;
			return r = Math.round((r + e.min) / e.step) * e.step, Math.max(Math.min(r, e.max), e.min)
		},
		De: function() {}
	}, webix.ui.text), webix.protoUI({
		name: "rangeslider",
		$cssName: "slider webix_rangeslider",
		defaults: {
			separator: ",",
			value: "20,80",
			template: function(t, e) {
				var i = "x" + webix.uid();
				e.qs = [i + "_0", i + "_1"];
				var s = "<div class='webix_slider_handle webix_slider_handle_0' id='" + e.qs[0] + "'>&nbsp;</div>";
				s += "<div class='webix_slider_handle webix_slider_handle_1' id='" + e.qs[1] + "'>&nbsp;</div>";
				var n = "<div class='webix_slider_title'></div><div class='webix_slider_box'><div class='webix_slider_right'>&nbsp;</div><div class='webix_slider_left'></div>" + s + "</div>";
				return e.$renderInput(t, n, i)
			}
		},
		value_setter: function(t) {
			return webix.isArray(t) || (t = t.toString().split(this.s.separator)), t.length < 2 && (t[1] = t[0]), t[0] = parseFloat(t[0]), t[1] = parseFloat(t[1]), t
		},
		rs: function(t) {
			return this.$view.querySelector(".webix_slider_handle_" + (t || 0))
		},
		Ly: function(t, e) {
			var i, s, n;
			return i = this.s, s = i.max - i.min, n = i.value[e] % i.step ? Math.round(i.value[e] / i.step) * i.step : i.value[e], n = Math.max(Math.min(n, i.max), i.min), Math.ceil((t - 20) * (n - i.min) / s)
		},
		oe: function() {
			var t, e, i, s, n, r, a;
			e = this.rs(0), i = this.rs(1), t = this.s, webix.isArray(t.value) || this.define("value", t.value), e && (a = this.Ee(t), r = e.parentNode, r.style.width = a + "px", s = this.Ly(a, 0), n = this.Ly(a, 1), e.style.left = 10 + s - 8 + "px", i.style.left = 10 + n - 8 + "px", r.firstChild.style.width = a - 22 + "px", r.childNodes[1].style.width = n - s + "px", r.childNodes[1].style.left = s + 12 + "px", this.s.title && (e.parentNode.previousSibling.innerHTML = this.s.title(this.s, this)))
		},
		Ky: function(t) {
			var e = t.target || t.srcElement,
				i = /webix_slider_handle_(\d)/.exec(e.className);
			this.My = i ? parseInt(i[1], 10) : -1, i && this.Ny(this.My)
		},
		setValue: function(t) {
			var e = this.s.value,
				i = "object" == typeof t ? t.join(this.s.separator) : t;
			return e.join(this.s.separator) == i ? !1 : (this.s.value = t, this.se && this.$setValue(t), void this.callEvent("onChange", [t, e]))
		},
		$getValue: function() {
			var t = this.s.value;
			return this.s.stringResult ? t.join(this.s.separator) : t
		},
		Ny: function(t) {
			var e = this.rs(t),
				i = this.rs(1 - t); - 1 == e.className.indexOf("webix_slider_active") && (e.className += " webix_slider_active"), i.className = i.className.replace(" webix_slider_active", "")
		},
		ys: function(t) {
			var e = this.s,
				i = e.value,
				s = e.max - e.min,
				n = webix.html.offset(this.rs().parentNode).x,
				r = Math.ceil((t - n) * s / this.Ee(e));
			r = Math.round((r + e.min) / e.step) * e.step;
			var a = null,
				h = webix.html.offset(this.rs(0)).x,
				o = webix.html.offset(this.rs(1)).x;
			if (h != o || e.value[0] != e.min && e.value[0] != e.max)
				if (this.My >= 0) a = this.My;
				else if (h == o) a = h > t ? 0 : 1;
			else {
				var l = Math.abs(h - t),
					c = Math.abs(o - t);
				a = c > l ? 0 : 1
			} else a = e.value[0] == e.min ? 1 : 0, this.Ny(a);
			return i[a] = a ? Math.max(Math.min(r, e.max), i[0]) : Math.max(Math.min(r, i[1]), e.min), i
		}
	}, webix.ui.slider), webix.proxy.offline = {
		$proxy: !0,
		storage: webix.storage.local,
		cache: !1,
		data: "",
		zs: function() {
			this.cache || webix.env.offline || (webix.call("onOfflineMode", []), webix.env.offline = !0)
		},
		As: function() {
			!this.cache && webix.env.offline && (webix.env.offline = !1, webix.call("onOnlineMode", []))
		},
		load: function(t, e) {
			var i = {
				error: function() {
					var i = this.getCache() || this.data,
						s = {
							responseText: i
						},
						n = webix.ajax.prototype.J(s);
					this.zs(), webix.ajax.$callback(t, e, i, n, s)
				},
				success: function(i, s, n) {
					this.As(), webix.ajax.$callback(t, e, i, s, n), this.setCache(i)
				}
			};
			this.cache && this.getCache() ? i.error.call(this) : this.source.$proxy ? this.source.load(this, i) : webix.ajax(this.source, i, this)
		},
		getCache: function() {
			return this.storage.get(this.Bs())
		},
		clearCache: function() {
			this.storage.remove(this.Bs())
		},
		setCache: function(t) {
			this.storage.put(this.Bs(), t)
		},
		Bs: function() {
			return this.source.$proxy ? this.source.source + "_$proxy$_data" : this.source + "_$proxy$_data"
		},
		saveAll: function(t, e, i, s) {
			this.setCache(t.serialize()), webix.ajax.$callback(t, s, "", e)
		},
		result: function(t, e, i, s, n) {
			for (var r = 0; r < n.length; r++) i.processResult({
				id: n[r].id,
				status: n[r].operation
			}, {}, {})
		}
	}, webix.proxy.cache = {
		init: function() {
			webix.extend(this, webix.proxy.offline)
		},
		cache: !0
	}, webix.proxy.local = {
		init: function() {
			webix.extend(this, webix.proxy.offline)
		},
		cache: !0,
		data: []
	}, window.angular && function() {
		function t(t) {
			var e = t.attr("id");
			return e || (e = webix.uid(), t.attr("id", e)), e
		}

		function e(t, i, s, n) {
			if (!(n > 10)) {
				var r = t[0].firstChild;
				r && 1 == r.nodeType && (i = r.getAttribute("view_id") || i);
				var a = webix.$$(i);
				a ? a.options_setter ? (a.define("options", s), a.refresh()) : (a.clearAll && a.clearAll(), a.parse(s)) : webix.delay(e, this, [t, i, s], 100, n + 1)
			}
		}
		angular.module("webix", []).directive("webixUi", ["$parse", function(e) {
			return {
				restrict: "A",
				scope: !1,
				link: function(i, s, n) {
					{
						var r = n.webixUi,
							a = n.webixReady,
							h = n.webixWatch,
							o = null;
						t(s)
					}
					s.ready(function() {
						if (!o) {
							if (a && (a = e(a)), s.bind("$destroy", function() {
									o && o.destructor()
								}), r) {
								var t = function() {
									if (o && o.destructor(), i[r]) {
										var t = webix.copy(i[r]);
										t.$scope = i, s[0].innerHTML = "", o = webix.ui(t, s[0]), a && a(i, {
											root: o
										})
									}
								};
								"false" !== h && i.$watch(r, t), t()
							} else {
								n.view || s.attr("view", "rows");
								var l = webix.markup,
									c = l.attribute;
								l.attribute = "", o = "undefined" != typeof n.webixRefresh ? l.init(s[0], s[0], i) : l.init(s[0], null, i), l.attribute = c, a && a(i, {
									root: o
								})
							}
							i.$watch(function() {
								return s[0].offsetWidth + "." + s[0].offsetHeight
							}, function() {
								o && o.adjust()
							})
						}
					})
				}
			}
		}]).directive("webixShow", ["$parse", function(e) {
			return {
				restrict: "A",
				scope: !1,
				link: function(i, s, n) {
					var r = e(n.webixShow),
						a = t(s);
					r(i) || s.attr("hidden", "true"), i.$watch(n.webixShow, function() {
						var t = webix.$$(a);
						t && (r(i) ? (webix.$$(a).show(), s[0].removeAttribute("hidden")) : webix.$$(a).hide())
					})
				}
			}
		}]).directive("webixEvent", ["$parse", function(e) {
			var i = function(t, i, s) {
				var n = s.split("="),
					r = e(n[1]),
					a = n[0].trim();
				i.attachEvent(a, function() {
					return r(t, {
						id: arguments[0],
						details: arguments
					})
				})
			};
			return {
				restrict: "A",
				scope: !1,
				link: function(e, s, n) {
					var r = n.webixEvent.split(";"),
						a = t(s);
					setTimeout(function() {
						var t = s[0].firstChild;
						t && 1 == t.nodeType && (a = t.getAttribute("view_id") || a);
						for (var n = webix.$$(a), h = 0; h < r.length; h++) i(e, n, r[h])
					})
				}
			}
		}]).directive("webixElements", ["$parse", function() {
			return {
				restrict: "A",
				scope: !1,
				link: function(e, i, s) {
					var n = s.webixElements,
						r = t(i);
					e.$watchCollection && e.$watchCollection(n, function(t) {
						setTimeout(function() {
							var e = webix.$$(r);
							e && (e.define("elements", t), e.refresh())
						}, 1)
					})
				}
			}
		}]).directive("webixData", ["$parse", function() {
			return {
				restrict: "A",
				scope: !1,
				link: function(i, s, n) {
					var r = n.webixData,
						a = t(s);
					i.$watchCollection && i.$watchCollection(r, function(t) {
						t && setTimeout(function() {
							e(s, a, t, 0)
						}, 1)
					})
				}
			}
		}])
	}(), window.Backbone && function() {
		function t(t) {
			t.Cs = !0, t.callEvent("onBeforeLoad", []), t.blockEvent()
		}

		function e(t) {
			t.unblockEvent(), t.Cs = !1, t.refresh()
		}
		var i = {
			use_id: !1
		};
		webix.attachEvent("onUnSyncUnknown", function(t, e) {
			for (var i = t.ab, s = t.It, n = 0; n < i.length; n++) t.detachEvent(i[n]);
			for (var n = 0; n < s.length; n++) e.off.apply(e, s[n])
		}), webix.attachEvent("onSyncUnknown", function(s, n, r) {
			function a(t) {
				if (i.use_id) return t;
				var e = {};
				for (var s in t) "id" != s && (e[s] = t[s]);
				return e
			}

			function h(t) {
				return i.use_id ? t.id : t.cid
			}

			function o(t, e) {
				for (var i = [], s = 0; s < e.models.length; s++) {
					var n = e.models[s],
						r = h(n),
						a = l(n);
					a.id = r, i.push(a)
				}
				t.clearAll(), t.df(i)
			}

			function l(t) {
				if (i.get) {
					for (var e = {}, s = 0; s < i.get.length; s++) {
						var n = i.get[s];
						e[n] = t.get(n)
					}
					return e
				}
				return t.toJSON()
			}
			r && (i = r), i.get && "string" == typeof i.get && (i.get = i.get.split(","));
			for (var c = [
					["change", function(t) {
						var e = h(t),
							i = s.pull[e] = l(t);
						i.id = e, s.pf && s.pf(i), s.refresh(i.id)
					}],
					["remove", function(t) {
						var e = h(t);
						s.pull[e] && s.remove(e)
					}],
					["add", function(t) {
						var e = h(t);
						if (!s.pull[e]) {
							var i = l(t);
							i.id = e, s.qf && s.qf(i), s.add(i)
						}
					}],
					["reset", function() {
						o(s, n)
					}],
					["request", function(e) {
						e instanceof Backbone.Collection && t(s)
					}],
					["sync", function(t) {
						t instanceof Backbone.Collection && e(s)
					}],
					["error", function(t) {
						t instanceof Backbone.Collection && e(s)
					}]
				], u = 0; u < c.length; u++) n.bind.apply(n, c[u]);
			var d = [s.attachEvent("onAfterAdd", function(t) {
				if (!n.get(t)) {
					var e = a(s.getItem(t)),
						i = new n.model(e),
						r = h(i);
					r != t && this.changeId(t, r), n.add(i), n.trigger("webix:add", i)
				}
				return !0
			}), s.attachEvent("onDataUpdate", function(t) {
				var e = n.get(t),
					i = a(s.getItem(t));
				return e.set(i), n.trigger("webix:change", e), !0
			}), s.attachEvent("onAfterDelete", function(t) {
				var e = n.get(t);
				return e && (n.trigger("webix:remove", e), n.remove(t)), !0
			})];
			s.Ts = n, s.ab = d, s.It = c, (n.length || s.count()) && o(s, n)
		}), window.WebixView = Backbone.View.extend({
			initialize: function(t) {
				this.options = t || {}
			},
			render: function() {
				this.beforeRender && this.beforeRender.apply(this, arguments);
				var t, e = this.config || this.options.config;
				e.view && webix.ui.hasMethod(e.view, "setPosition") || (t = window.$ ? $(this.el)[0] : this.el, t && !t.config && (t.innerHTML = ""));
				var i = webix.copy(e);
				return i.$scope = this, this.root = webix.ui(i, t), this.afterRender && this.afterRender.apply(this, arguments), this
			},
			destroy: function() {
				this.root && this.root.destructor()
			},
			getRoot: function() {
				return this.root
			},
			getChild: function(t) {
				return this.root.$$(t)
			}
		})
	}(), webix.ActiveContent = {
		$init: function(t) {
			if (t.activeContent) {
				this.$ready.push(this.Ds), this.Es = {}, this.Fs = {}, this.Gs = {}, this.Hs = {};
				for (var e in t.activeContent)
					if (this[e] = this.Is(e), t.activeContent[e].earlyInit) {
						var i = webix.Xb;
						webix.Xb = null, this[e].call(this, {}, this, t.activeContent), webix.Xb = i
					}
			}
		},
		Ds: function() {
			if (webix.event(this.$view, "blur", function(t) {
					var e = t.target || t.srcElement;
					if ("BUTTON" != e.tagName) {
						var i = webix.$$(t);
						if (i !== this && i.getValue && i.setValue) {
							i.getNode(t);
							var s = i.getValue();
							s != i.s.value && i.setValue(s)
						}
					}
				}, {
					bind: this,
					capture: !0
				}), this.filter) {
				for (var t in this.s.activeContent) this.type[t] = this[t], this[t] = this.Js(t);
				this.attachEvent("onBeforeRender", function() {
					this.type.masterUI = this
				}), this.type.masterUI = this
			}
		},
		Js: function(t) {
			return function(e) {
				for (var i = this.Hs[t], s = i.s.id, n = this.getItemNode(e).getElementsByTagName("DIV"), r = 0; r < n.length; r++)
					if (n[r].getAttribute("view_id") == s) {
						i.x = i.y = n[r];
						break
					}
				return i
			}
		},
		Ks: function(t, e, i) {
			return function(s) {
				if (s)
					for (var n = s.target || s.srcElement; n;) {
						if (n.getAttribute && n.getAttribute("view_id")) {
							if (t.y = t.x = t.$view = n, i.locate) {
								var r = i.locate(n.parentNode),
									a = i.Gs[e][r];
								t.s.value = a, t.s.$masterId = r
							}
							return n
						}
						n = n.parentNode
					}
				return t.x
			}
		},
		Ls: function(t, e) {
			return function(i) {
				var s = e.data;
				if (e.filter) {
					var n = e.locate(this.x.parentNode);
					s = e.getItem(n), this.refresh(), e.Fs[t][n] = this.x.outerHTML || (new XMLSerializer).serializeToString(this.x), e.Gs[t][n] = i
				}
				s[t] = i
			}
		},
		Is: function(t) {
			return function(e, i, s) {
				var n = i.Es ? i : i.masterUI;
				if (!n.Es[t]) {
					var r = document.createElement("DIV");
					s = s || n.s.activeContent;
					var a = webix.ui(s[t], r);
					r.firstChild.setAttribute("onclick", "event.processed = true; if (webix.env.isIE8) event.srcElement.w_view = '" + a.s.id + "';"), a.getNode = n.Ks(a, t, n), a.attachEvent("onChange", n.Ls(t, n)), n.Hs[t] = a, n.Es[t] = r.innerHTML, n.Fs[t] = {}, n.Gs[t] = {}
				}
				if (n.filter && e[t] != n.Gs[t] && !webix.isUndefined(e[t])) {
					var a = n.Hs[t];
					a.blockEvent(), a.$view.firstChild || a.refresh(), a.setValue(e[t]), a.refresh(), a.unblockEvent(), n.Gs[t][e.id] = e[t], n.Fs[t][e.id] = a.x.outerHTML || (new XMLSerializer).serializeToString(a.x)
				}
				return n.Fs[t][e.id] || n.Es[t]
			}
		}
	}, webix.ProgressBar = {
		$init: function() {
			webix.isUndefined(this.cu) && this.attachEvent && (this.attachEvent("onBeforeLoad", this.showProgress), this.attachEvent("onAfterLoad", this.hideProgress), this.cu = null)
		},
		showProgress: function(t) {
			if (!this.cu) {
				t = webix.extend({
					position: 0,
					delay: 2e3,
					type: "icon",
					icon: "refresh",
					hide: !1
				}, t || {}, !0);
				var e = "icon" == t.type ? "fa-" + t.icon + " fa-spin" : "";
				if (this.cu = webix.html.create("DIV", {
						"class": "webix_progress_" + t.type
					}, "<div class='webix_progress_state " + e + "'></div>"), this.setPosition || (this.x.style.position = "relative"), webix.html.insertBefore(this.cu, this.x.firstChild, this.x), !webix.Touch.$active && this.getScrollState) {
					var i = this.getScrollState();
					this.x.scrollWidth != this.$width && (this.cu.style.left = i.x + "px"), this.x.scrollHeight != this.$height && (this.cu.style.top = "bottom" != t.type ? i.y + "px" : i.y + this.$height - this.cu.offsetHeight + "px")
				}
				this.du = 1
			}
			t && "icon" != t.type && webix.delay(function() {
				if (this.cu) {
					var e = t.position || 1;
					if (this.cu.style[webix.env.transitionDuration] === webix.undefined && t.delay) {
						var i = 0,
							s = 0,
							n = e / t.delay * 30,
							r = this;
						this.Oy && (window.clearInterval(this.Oy), s = this.cu.firstChild.offsetWidth / this.cu.offsetWidth * 100), this.Oy = window.setInterval(function() {
							30 * i == t.delay ? window.clearInterval(r.Oy) : (r.cu && r.cu.firstChild && (r.cu.firstChild.style.width = s + i * n * e * 100 + "%"), i++)
						}, 30)
					} else this.cu.firstChild.style.width = 100 * e + "%", t.delay && (this.cu.firstChild.style[webix.env.transitionDuration] = t.delay + "ms");
					t.hide && webix.delay(this.hideProgress, this, [1], t.delay)
				}
				this.du = 0
			}, this)
		},
		hideProgress: function(t) {
			this.du && (t = !0), this.cu && (t ? (this.Oy && window.clearInterval(this.Oy), webix.html.remove(this.cu), this.cu = null) : this.showProgress({
				position: 1.1,
				delay: 300,
				hide: !0
			}))
		}
	}, webix.protoUI({
		name: "multitext",
		$cssName: "text",
		defaults: {
			icon: "plus-circle",
			iconWidth: 25,
			separator: ", "
		},
		getValueHere: function() {
			return webix.ui.text.prototype.getValue.call(this)
		},
		setValueHere: function(t) {
			return webix.ui.text.prototype.$setValue.call(this, t)
		},
		getValue: function() {
			if ("extra" == this.config.mode) return this.getValueHere();
			for (var t = [this.getValueHere(this)], e = 0; e < this.eu.length; e++) {
				var i = webix.$$(this.eu[e]).getValueHere();
				i && t.push(i)
			}
			return t.join(this.config.separator)
		},
		$setValue: function(t) {
			if (t = t || "", this.fu != t) {
				if (this.fu = t, "extra" == this.config.mode) return this.setValueHere(t);
				this.removeSection();
				var e = t.split(this.config.separator);
				this.setValueHere.call(this, e[0]);
				for (var i = 1; i < e.length; i++) {
					var s = this.addSection();
					webix.$$(s).setValueHere(e[i])
				}
			}
		},
		yB: function() {
			var t = this.config.master ? webix.$$(this.config.master) : this,
				e = t.getValue(),
				i = t.s.value;
			e !== i && (t.s.value = e, t.callEvent("onChange", [e, i]))
		},
		addSection: function() {
			var t = this.getParentView().addView({
				labelWidth: this.config.labelWidth,
				inputWidth: this.config.inputWidth,
				width: this.config.width,
				label: this.config.label ? "&nbsp;" : "",
				view: "multitext",
				mode: "extra",
				value: "",
				icon: "minus-circle",
				suggest: this.config.suggest || null,
				master: this.config.id,
				on: {
					onChange: this.yB
				}
			});
			return this.eu.push(t), t
		},
		removeSection: function(t) {
			for (var e = this.config.master ? webix.$$(this.config.master) : this, i = e.eu.length - 1; i >= 0; i--) {
				var s = e.eu[i];
				t && s != t || (e.eu.removeAt(i), this.getParentView().removeView(s))
			}
		},
		on_click: {
			webix_input_icon: function() {
				if ("extra" == this.config.mode) {
					this.removeSection(this.config.id);
					var t = this.getParentView().getChildViews();
					t[t.length - 1].focus(), this.yB()
				} else webix.$$(this.addSection()).focus();
				return !1
			}
		},
		$init: function() {
			this.eu = webix.toArray([])
		},
		$render: function(t) {
			this.$setValue(t.value)
		}
	}, webix.ui.text), webix.protoUI({
		name: "organogram",
		defaults: {
			scroll: "auto"
		},
		$init: function() {
			this.x.className += " webix_organogram", this.v = document.createElement("DIV"), this.$ready.push(this.Av), webix.extend(this.data, webix.TreeStore, !0), this.data.provideApi(this, !0)
		},
		ad: "webix_dg_id",
		on_click: {
			webix_organogram_item: function(t, e) {
				this.s.select && ("multiselect" == this.s.select || this.s.multiselect ? this.select(e, !1, t.ctrlKey || t.metaKey || "touch" == this.s.multiselect, t.shiftKey) : this.select(e), this.Qh = !1)
			}
		},
		on_context: {},
		on_dblclick: {},
		Av: function() {
			this.y.style.position = "relative", this.data.attachEvent("onStoreUpdated", webix.bind(this.render, this))
		},
		pg: function(t) {
			var e = this.data.Me[t.id];
			return this.callEvent("onItemRender", [t]), this.type.templateStart.call(this, t, this.type, e) + (t.$template ? this.type["template" + t.$template].call(this, t, this.type, e) : this.type.template.call(this, t, this.type, e)) + this.type.templateEnd.call(this)
		},
		jb: function(t) {
			var e = this.pg(t);
			return this.data.branch[t.id] && (e += this._x(t.id)), e
		},
		LA: function() {
			return this.type.listMarginX || this.type.listMarginY
		},
		_x: function(t) {
			var e, i, s, n, r = "",
				a = this.data.branch[t],
				h = this.data.Me[t],
				o = this.getItem(t),
				l = o ? o.$type : !1;
			if (t || (this.ay = [], this.$xy = {}, n = this.$width - 2 * this.type.padding, this.$xy[0] = {
					totalWidth: n,
					start: this.type.padding,
					width: 0,
					height: 0,
					left: n / 2,
					top: this.type.padding || 0
				}), a) {
				s = this.$xy[t], "list" != l || this.LA() || (r += this.type.templateListStart.call(this, o, this.type, h));
				var c = 0;
				for (e = 0; e < a.length; e++) {
					i = a[e], n = this.by[i];
					var u = this.getItem(i);
					u.open == webix.undefined && (u.open = !0), "list" == l && this.data.addMark(i, "list_item", "", 1, !0);
					var d = this.cy(i);
					if ("list" == l) {
						var f = "list" == l && this.LA() ? this.type.listMarginX : 0,
							b = 0;
						this.LA() ? b = this.type.listMarginY : e || (b = this.type.marginY), this.$xy[i] = {
							totalWidth: n,
							start: s.start,
							width: this.type.width,
							height: d,
							left: s.start + n / 2 - this.type.width / 2 + f,
							top: e ? this.$xy[a[e - 1]].top + this.$xy[a[e - 1]].height + b : s.top + s.height + b
						}
					} else this.$xy[i] = {
						totalWidth: n,
						start: s.start + c,
						width: this.type.width,
						height: d,
						left: s.start + c + n / 2 - this.type.width / 2,
						top: s.top + s.height + (t ? this.type.marginY : 0)
					};
					r += this.pg(u), c += n
				}
				for (!t && c && (this.y.style.width = c + 2 * this.type.padding + "px"), e = 0; e < a.length; e++) i = a[e], this.data.branch[i] && this.getItem(i).open ? r += this._x(i) : o && ("list" != o.$type ? this.ay.push(this.$xy[i].top + this.$xy[i].height) : e == a.length - 1 && this.ay.push(this.$xy[i].top + this.$xy[i].height));
				"list" != l || this.LA() || (r += this.type.templateListEnd(o, this.type, h))
			}
			return r
		},
		cy: function(t) {
			var e = this.getItem(t),
				i = this.type.height;
			return "function" == typeof i && (i = i.call(e, this.type, this.data.Me[t])), this.dy || (this.dy = webix.html.create("div"), this.y.appendChild(this.dy)), this.dy.className = this.type.classname(e, this.type, this.data.Me[t]), this.dy.style.cssText = "width:" + this.type.width + "px;height:" + i + ("auto" == i ? "" : "px") + ";", this.dy.innerHTML = this.type.template.call(this, e, this.type, this.data.Me[t]), this.dy.scrollHeight
		},
		ey: function() {
			var t = {},
				e = this.type.width,
				i = this.type.marginX;
			return this.data.each(function(s) {
				t[s.id] = e + i;
				var n = this.getParentId(s.id);
				if (n && "list" != this.getItem(n).$type)
					for (; n;) {
						var r = this.branch[n];
						t[n] = 0;
						for (var a = 0; a < r.length; a++) t[n] += t[r[a]] || 0;
						n = this.getParentId(n)
					}
			}), this.by = t, t
		},
		getItemNode: function(t) {
			if (this.t) return this.t[t];
			this.t = {};
			for (var e = this.y.childNodes, i = 0; i < e.length; i++) {
				var s = e[i].getAttribute(this.ad);
				if (s && (this.t[s] = e[i]), -1 != e[i].className.indexOf("webix_organogram_list") && !this.LA())
					for (var n = e[i].childNodes, r = 0; r < n.length; r++) s = n[r].getAttribute(this.ad), s && (this.t[s] = n[r])
			}
			return this.getItemNode(t)
		},
		Ne: function(t) {
			return this.v.innerHTML = this.pg(t), this.v.firstChild
		},
		render: function(t, e, i) {
			if (this.isVisible(this.s.id) && !this.$blockRender) {
				if ("update" == i) {
					var s = this.getItemNode(t),
						n = this.t[t] = this.Ne(e);
					return webix.html.insertBefore(n, s), webix.html.remove(s), !0
				}
				return this.callEvent("onBeforeRender", [this.data]) && (this.ey(), this.t = null, this.y.innerHTML = this._x(0), this.dy = null, this.y.style.height = Math.max.apply(Math, this.ay) + this.type.padding + "px", this.fy(), this.resize(), this.callEvent("onAfterRender", [])), !0
			}
		},
		fy: function() {
			this.canvas && this.canvas.clearCanvas(!0), this.canvas = new webix.Canvas({
				container: this.y,
				name: "lines",
				width: this.y.offsetWidth,
				height: this.y.offsetHeight
			}), this.gy(0)
		},
		zo: function(t, e, i, s, n, r, a) {
			t.strokeStyle = r, t.lineWidth = a, t.beginPath(), t.moveTo(e, i), t.lineTo(s, n), t.stroke(), t.lineWidth = 1
		},
		gy: function(t, e) {
			{
				var i, s, n, r, a, h, o, l, c, u;
				this.config.layout
			}
			if (e || (e = this.canvas.getCanvas()), this.$xy && (t = t || 0, n = this.data.branch[t], s = this.getItem(t), n && n.length)) {
				if (r = this.$xy[t], t)
					if (h = parseInt(r.left + r.width / 2, 10) + .5, o = parseInt(r.top + r.height, 10), l = parseInt(r.top + r.height + this.type.marginY / 2, 10), "list" == s.$type) {
						if (!this.LA()) return l = parseInt(r.top + r.height + this.type.marginY, 10), void this.zo(e, h, o, h, l, this.type.lineColor)
					} else this.zo(e, h, o, h, l, this.type.lineColor);
				for (o = parseInt(r.top + r.height + this.type.marginY / 2, 10) + .5, i = 0; i < n.length; i++) t && (a = this.$xy[n[i]], "list" == s.$type && this.LA() ? (h = parseInt(r.left + this.type.listMarginX / 2, 10) + .5, i ? i == n.length - 1 && (u = h) : c = h, l = parseInt(a.top + a.height / 2, 10), this.zo(e, h, o - this.type.marginY / 2, h, l, this.type.lineColor), this.zo(e, h, l, h + this.type.listMarginX / 2, l, this.type.lineColor)) : (h = parseInt(a.left + a.width / 2, 10) + .5, i ? i == n.length - 1 && (u = h) : c = h, l = parseInt(a.top, 10), this.zo(e, h, o, h, l, this.type.lineColor))), this.getItem(n[i]).open && this.gy(n[i], e);
				t && this.zo(e, c, o, u, o, this.type.lineColor)
			}
		},
		$getSize: function(t, e) {
			var i = this.s.autowidth,
				s = this.s.autoheight;
			return i && (t = this.y.offsetWidth + (this.y.offsetHeight > e && !s ? webix.ui.scrollSize : 0)), s && (e = this.y.offsetHeight + (this.y.offsetWidth > t && !i ? webix.ui.scrollSize : 0)), webix.ui.view.prototype.$getSize.call(this, t, e)
		},
		$setSize: function(t, e) {
			webix.ui.view.prototype.$setSize.call(this, t, e) && (this.y.style.width = this.$width + "px", this.y.style.height = this.$height + "px", this.render())
		},
		type: {
			width: 120,
			height: "auto",
			padding: 20,
			marginX: 20,
			marginY: 20,
			listMarginX: 0,
			listMarginY: 0,
			lineColor: "#90caf9",
			classname: function(t, e, i) {
				var s = "webix_organogram_item ";
				return t.$css && ("object" == typeof t.$css && (t.$css = webix.html.createCss(t.$css)), s += " " + t.$css), i && i.list_item && (s += " webix_organogram_list_item "), i && i.$css && (s += i.$css), s += " webix_organogram_level_" + t.$level
			},
			listClassName: function(t) {
				var e = "webix_organogram_list webix_organogram_list_" + t.$level;
				return t.$listCss && ("object" == typeof t.$listCss && (t.$listCss = webix.html.createCss(t.$listCss)), e += " " + t.$listCss), e
			},
			template: webix.template("#value#"),
			templateStart: function(t, e, i) {
				var s = "";
				if ((!i || !i.list_item || e.listMarginX || e.listMarginY) && this.$xy) {
					var n = this.$xy[t.id];
					s += "width: " + n.width + "px; height: " + n.height + "px;", s += "top: " + n.top + "px; left: " + n.left + "px;"
				}
				return '<div webix_dg_id="' + t.id + '" class="' + e.classname.call(this, t, e, i) + '"' + (s ? 'style="' + s + '"' : "") + '">'
			},
			templateEnd: webix.template("</div>"),
			templateListStart: function(t, e, i) {
				var s = "";
				if (this.$xy) {
					var n = this.$xy[t.id];
					s += "width: " + n.width + "px;", s += "top: " + (n.top + n.height + e.marginY) + "px; left: " + n.left + "px;"
				}
				return '<div class="' + e.listClassName.call(this, t, e, i) + '"' + (s ? 'style="' + s + '"' : "") + '">'
			},
			templateListEnd: webix.template("</div>")
		}
	}, webix.AutoTooltip, webix.Group, webix.TreeAPI, webix.DataMarks, webix.SelectionModel, webix.MouseEvents, webix.Scrollable, webix.RenderStack, webix.TreeDataLoader, webix.DataLoader, webix.ui.view, webix.EventSystem), webix.protoUI({
		name: "barcode",
		defaults: {
			type: "ean13",
			height: 160,
			width: 220,
			paddingY: 10,
			paddingX: 20,
			textHeight: 20,
			color: "#000"
		},
		$init: function() {
			this.$view.className += " webix_barcode", this.types || (this.types = {
				"default": this.type
			}, this.type.name = "default")
		},
		type: {},
		render: function() {
			this.isVisible(this.s.id) && (this.canvas && this.canvas.clearCanvas(!0), this.$view.innerHTML = "", this.fy())
		},
		fy: function() {
			this.canvas = new webix.Canvas({
				container: this.$view,
				name: "bars",
				width: this.$width,
				height: this.$height
			}), this.hy()
		},
		hy: function() {
			var t, e, i, s, n = this.s.value,
				r = this.s.type;
			if (!r || !this.types[r] || !n) return !1;
			if (t = this.type.encode(n), s = t.length, e = this.canvas.getCanvas(), s) {
				var a = (this.$width - 2 * this.config.paddingX) / s,
					h = 0;
				for (i = 0; s > i; i++) {
					var o = parseInt(t.charAt(i), 10);
					o ? (h++, i == s - 1 && this.bp(e, i + 1, a, h, s)) : h && (this.bp(e, i, a, h, s), h = 0)
				}
				this.iy(n, a)
			}
		},
		bp: function(t, e, i, s, n) {
			var r, a, h, o;
			a = parseInt(e * i + this.config.paddingX, 10), r = parseInt(a - s * i, 10), h = this.config.paddingY, o = this.$height - this.config.paddingY - this.config.textHeight, this.jy() && (4 > e || e > n - 4 || n / 2 + 2 > e && e > n / 2 - 2) && (o += this.config.textHeight / 2), t.fillStyle = this.config.color, t.beginPath(), t.moveTo(r, h), t.lineTo(a, h), t.lineTo(a, o), t.lineTo(r, o), t.lineTo(r, h), t.fill()
		},
		iy: function(t, e) {
			var i, s, n;
			if (this.type.template && (t = this.type.template(t)), this.jy()) {
				if (this.type.firstDigit && (this.canvas.renderTextAt(!0, "left", this.config.paddingX, this.$height - this.config.paddingY, t.charAt(0)), t = t.slice(1)), s = t.length, this.type.lastDigit && s--, s) {
					var r = (this.$width - 2 * this.config.paddingX - 11 * e) / s;
					for (i = 0; s > i; i++) n = this.config.paddingX + i * r + (s / 2 > i ? 3 : 8) * e + r / 2, this.canvas.renderTextAt(!0, !0, n, this.$height - this.config.paddingY, t.charAt(i));
					this.type.lastDigit && (n = this.config.paddingX + s * r + 11 * e, this.canvas.renderTextAt(!0, !1, n, this.$height - this.config.paddingY, t.charAt(s)))
				}
			} else this.canvas.renderTextAt(!0, !0, this.$width / 2, this.$height - this.config.paddingY, t)
		},
		setValue: function(t) {
			return this.s.value = t, this.render(), t
		},
		getValue: function() {
			var t = this.s.value;
			return this.type.template ? this.type.template(t) : t
		},
		type_setter: function(t) {
			return this.types[t] ? (this.type = webix.clone(this.types[t]), this.type.css && (this.w.className += " " + this.type.css)) : this.customize(t), t
		},
		jy: function() {
			var t = this.config.type;
			return 0 === t.indexOf("ean") || -1 != t.indexOf("upcA")
		},
		$setSize: function(t, e) {
			webix.ui.view.prototype.$setSize.call(this, t, e) && this.render()
		}
	}, webix.ui.view), webix.type(webix.ui.barcode, {
		name: "ean8",
		encodings: [
			["0001101", "1110010"],
			["0011001", "1100110"],
			["0010011", "1101100"],
			["0111101", "1000010"],
			["0100011", "1011100"],
			["0110001", "1001110"],
			["0101111", "1010000"],
			["0111011", "1000100"],
			["0110111", "1001000"],
			["0001011", "1110100"]
		],
		encode: function(t) {
			var e, i;
			if (t = t.replace(/[^0-9]/g, "").substring(0, 7), 7 != t.length) return "";
			for (t += this.checksum(t), e = "101", i = 0; 4 > i; i++) e += this.encodings[parseInt(t.charAt(i), 10)][0];
			for (e += "01010", i = 4; 8 > i; i++) e += this.encodings[parseInt(t.charAt(i), 10)][1];
			return e += "101"
		},
		template: function(t) {
			return t.replace(/[^0-9]/g, "").substring(0, 7) + this.checksum(t)
		},
		checksum: function(t) {
			t = t.substring(0, 7);
			var e, i = !0,
				s = 0;
			for (e = 0; 7 > e; e++) s += (i ? 3 : 1) * parseInt(t.charAt(e), 10), i = !i;
			return ((10 - s % 10) % 10).toString()
		}
	}), webix.type(webix.ui.barcode, {
		name: "ean13",
		firstDigit: !0,
		encodings: [
			["0001101", "0100111", "1110010", "000000"],
			["0011001", "0110011", "1100110", "001011"],
			["0010011", "0011011", "1101100", "001101"],
			["0111101", "0100001", "1000010", "001110"],
			["0100011", "0011101", "1011100", "010011"],
			["0110001", "0111001", "1001110", "011001"],
			["0101111", "0000101", "1010000", "011100"],
			["0111011", "0010001", "1000100", "010101"],
			["0110111", "0001001", "1001000", "010110"],
			["0001011", "0010111", "1110100", "011010"]
		],
		encode: function(t) {
			var e, i, s;
			if (t = t.replace(/[^0-9]/g, "").substring(0, 12), 12 != t.length) return "";
			for (t += this.checksum(t), e = "101", i = this.encodings[parseInt(t.charAt(0), 10)][3], s = 1; 7 > s; s++) e += this.encodings[parseInt(t.charAt(s), 10)][parseInt(i.charAt(s - 1), 10)];
			for (e += "01010", s = 7; 13 > s; s++) e += this.encodings[parseInt(t.charAt(s), 10)][2];
			return e += "101"
		},
		template: function(t) {
			return t.replace(/[^0-9]/g, "").substring(0, 12) + this.checksum(t)
		},
		checksum: function(t) {
			var e, i = !1,
				s = 0;
			for (t = t.substring(0, 12), e = 0; 12 > e; e++) s += (i ? 3 : 1) * parseInt(t.charAt(e), 10), i = !i;
			return ((10 - s % 10) % 10).toString()
		}
	}), webix.type(webix.ui.barcode, {
		name: "upcA",
		firstDigit: !0,
		lastDigit: !0,
		encode: function(t) {
			return t.length < 12 && (t = "0" + t), webix.ui.barcode.prototype.types.ean13.encode(t)
		},
		template: function(t) {
			return t.replace(/[^0-9]/g, "").substring(0, 11) + this.checksum(t)
		},
		checksum: function(t) {
			return t.length < 12 && (t = "0" + t), webix.ui.barcode.prototype.types.ean13.checksum(t)
		}
	}), webix.protoUI({
		name: "abslayout",
		$init: function() {
			this.$view.className += " webix_abslayout", delete this.rows_setter, delete this.cols_setter
		},
		cells_setter: function(t) {
			this.nc = t
		},
		kc: function() {
			webix.ui.baselayout.prototype.kc.call(this, this.nc)
		},
		$getSize: function() {
			return webix.ui.baseview.prototype.$getSize.call(this, 0, 0)
		},
		$setSize: function(t, e) {
			this.lc = [t, e], webix.ui.baseview.prototype.$setSize.call(this, t, e), this.rc(t, e)
		},
		rc: function() {
			for (var t = 0; t < this.q.length; t++) {
				var e = this.q[t],
					i = e.$getSize(0, 0);
				e.$setSize(i[0], i[2]);
				var s = e.$view;
				s.style.left = e.s.left + "px", s.style.top = e.s.top + "px"
			}
		}
	}, webix.ui.baselayout), webix.protoUI({
		name: "datalayout",
		$init: function() {
			this.data.provideApi(this, !0), this.data.attachEvent("onStoreUpdated", webix.bind(this.render, this))
		},
		kc: function() {
			return this.cC || (this.cC = this.nc, this.nc = [{}]), webix.ui.layout.prototype.kc.call(this, this.nc)
		},
		sC: function(t, e) {
			var i, s = t.s.name;
			if (s) i = "$value" == s ? e : e[s], t.setValues ? t.setValues(i) : t.setValue ? t.setValue(i) : t.parse && t.parse(i);
			else {
				var n = t.q;
				if (n)
					for (var r = 0; r < n.length; r++) this.sC(n[r], e)
			}
		},
		render: function() {
			for (var t = this.nc = [], e = this.data.order, i = this.cC.length, s = 0; s < e.length; s++)
				if (i)
					for (var n = 0; i > n; n++) t.push(webix.copy(this.cC[n]));
				else t.push(this.getItem(e[s]));
			if (t.length || t.push({}), this.reconstruct(), i)
				for (var s = 0; s < e.length; s++)
					for (var r = this.getItem(e[s]), n = 0; i > n; n++) {
						var a = this.q[s * i + n];
						this.sC(a, r)
					}
		}
	}, webix.DataLoader, webix.ui.layout), webix.protoUI({
		name: "video",
		$init: function(t) {
			t.id || (t.id = webix.uid()), this.$ready.push(this.Ms)
		},
		Ms: function() {
			var t = this.s;
			if (this.w = webix.html.create("video", {
					"class": "webix_view_video",
					style: "width:100%;height:100%;",
					autobuffer: "autobuffer"
				}, ""), t.poster && (this.w.poster = t.poster), t.src) {
				"object" != typeof t.src && (t.src = [t.src]);
				for (var e = 0; e < t.src.length; e++) this.w.innerHTML += ' <source src="' + t.src[e] + '">'
			}
			t.controls && (this.w.controls = !0), t.autoplay && (this.w.autoplay = !0), this.x.appendChild(this.w)
		},
		getVideo: function() {
			return this.w
		},
		defaults: {
			src: "",
			controls: !0
		}
	}, webix.ui.view), webix.protoUI({
		name: "sidemenu",
		defaults: {
			padding: 0,
			animate: !0,
			position: "left",
			width: 200,
			borderless: !0
		},
		$init: function() {
			this.$view.className += " webix_sidemenu"
		},
		position_setter: function(t) {
			var e = this.s.position;
			return e && webix.html.removeCss(this.$view, " webix_sidemenu_" + e), webix.html.addCss(this.$view, " webix_sidemenu_" + t), t
		},
		$getSize: function() {
			var t = webix.ui.window.prototype.$getSize.apply(this, arguments);
			return this.MA = t, t
		},
		$setSize: function(t, e) {
			webix.ui.view.prototype.$setSize.call(this, t, e), t = this.bc - 2 * this.s.padding, e = this.dc - 2 * this.s.padding, this.w.style.padding = this.s.padding + "px", this.bd.style.display = "none", this.ed.style.height = e + "px", this.gd.$setSize(t, e)
		},
		show: function() {
			return this.callEvent("onBeforeShow", arguments) ? (this.s.hidden = !1, this.x.style.zIndex = this.s.zIndex || webix.ui.zIndex(), (this.s.modal || this.my) && (this.Md(!0), this.my = null), this.x.style.display = "block", this.Qd(), this.s.position && this.Td(), this.Ww = 1, webix.delay(function() {
				this.Ww = 0
			}, this, [], webix.env.touch ? 400 : 100), this.config.autofocus && (this.Vd = webix.UIManager.getFocus(), webix.UIManager.setFocus(this)), -1 == webix.ui.et.find(this) && webix.ui.et.push(this), void this.callEvent("onShow", [])) : !1
		},
		Td: function(t) {
			var e, i, s, n, r, a = 0,
				h = 0,
				o = {};
			this.$view.style.position = "fixed", s = window.innerWidth || document.documentElement.offsetWidth, n = window.innerHeight || document.documentElement.offsetHeight, e = this.MA[0] || s, i = this.MA[2] || n, r = this.s.position, "top" == r ? e = s : "right" == r ? (i = n, a = s - e) : "bottom" == r ? (e = s, h = n - i) : i = n, o = {
				left: a,
				top: h,
				width: e,
				height: i,
				maxWidth: s,
				maxHeight: n
			}, "function" == typeof this.s.state && this.s.state.call(this, o), this.NA = o, this.$setSize(o.width, o.height), "undefined" == typeof t && this.OA() ? (webix.html.removeCss(this.$view, "webix_animate", !0), this.Qf[this.s.position].beforeShow.call(this, o), webix.delay(function() {
				webix.html.addCss(this.$view, "webix_animate", !0)
			}, this, null, 1), webix.delay(function() {
				this.Qf[this.s.position].show.call(this, o)
			}, this, null, 10)) : this.setPosition(o.left, o.top)
		},
		OA: function() {
			return webix.animate.isSupported() && this.s.animate && !(webix.env.isIE && -1 != navigator.appVersion.indexOf("MSIE 9"))
		},
		hidden_setter: function(t) {
			return t ? this.hide(!0) : this.show(), !!t
		},
		Qf: {
			left: {
				beforeShow: function(t) {
					this.$view.style.left = -t.width + "px", this.$view.style.top = t.top + "px"
				},
				show: function() {
					this.$view.style.left = "0px"
				},
				hide: function(t) {
					this.$view.style.left = -t.width + "px"
				}
			},
			right: {
				beforeShow: function(t) {
					this.$view.style.left = "auto", this.$view.style.right = -t.width + "px", this.$view.style.top = t.top + "px"
				},
				show: function() {
					this.$view.style.right = "0px"
				},
				hide: function(t) {
					this.$view.style.right = -t.width + "px"
				}
			},
			top: {
				beforeShow: function(t) {
					this.setPosition(t.left, t.top), this.$view.style.height = "0px", this.ed.style.height = "0px"
				},
				show: function(t) {
					this.$view.style.height = t.height + "px", this.ed.style.height = t.height + "px"
				},
				hide: function() {
					this.$view.style.height = "0px", this.ed.style.height = "0px"
				}
			},
			bottom: {
				beforeShow: function(t) {
					this.$view.style.left = t.left + "px", this.$view.style.top = "auto";
					var e = t.bottom != webix.undefined ? t.bottom : t.maxHeight - t.top - t.height;
					this.$view.style.bottom = e + "px", this.$view.style.height = "0px"
				},
				show: function(t) {
					this.$view.style.height = t.height + "px"
				},
				hide: function() {
					this.$view.style.height = "0px"
				}
			}
		},
		hide: function(t) {
			if (!this.$destructed) {
				this.s.modal && this.Md(!1);
				var e = window.innerWidth || document.documentElement.offsetWidth,
					i = window.innerHeight || document.documentElement.offsetHeight;
				if (!t && this.OA() && e == this.NA.maxWidth && i == this.NA.maxHeight) {
					this.Qf[this.s.position].hide.call(this, this.NA);
					var s = webix.event(this.$view, webix.env.transitionEnd, webix.bind(function() {
						this.Wd(), webix.eventRemove(s)
					}, this))
				} else this.Wd();
				if (this.s.autofocus) {
					var n = document.activeElement;
					n && this.x && this.x.contains(n) && (webix.UIManager.setFocus(this.Vd), this.Vd = null)
				}
				this.ny()
			}
		}
	}, webix.ui.popup),
	function() {
		var t = webix.CustomScroll = {
			scrollStep: 40,
			init: function() {
				this.ze(), webix.env.$customScroll = !0, webix.ui.scrollSize = 0, webix.destructors.push({
					destructor: function() {
						this.gu = null
					}
				}), webix.attachEvent("onReconstruct", t.hu), webix.attachEvent("onResize", t.hu), webix.attachEvent("onClick", t.hu)
			},
			resize: function() {
				this.hu()
			},
			mk: function(e) {
				e.Vf.iu = e.s.id, e.attachEvent("onAfterRender", function() {
					var e = t.ju(this),
						i = Math.max(e.dy - e.py, 0),
						s = Math.max(e.dx - e.px, 0);
					this.Wj && this.jk > i ? this.Wj.scrollTo(i) : this.Zj && this.bk > s && this.Zj.scrollTo(s), t.gu == this.Vf && t.hu()
				}), webix.event(e.Vf, "mouseover", t.ku), webix.event(e.Vf, "mouseout", t.lu)
			},
			enable: function(e, i) {
				if (t.ze(), e.mapCells) return this.mk(e);
				var s = e;
				e.y && (s = e.y.parentNode), s.mu = i || "xy", webix.event(s, "mouseover", t.ku), webix.event(s, "mouseout", t.lu), webix.event(s, "mousewheel", t.nu), webix.event(s, "DOMMouseScroll", t.nu)
			},
			hu: function() {
				var e = t.gu;
				e && e.ou && (t.pu.call(e), t.ku.call(e))
			},
			ze: function() {
				webix.event(document.body, "mousemove", function(e) {
					t.qu && t.ru(t.qu, t.qu.su, webix.html.pos(e))
				}), t.ze = function() {}
			},
			ku: function() {
				if (t.gu = this, clearTimeout(this.tu), !this.ou && !t.qu) {
					var e;
					if (this.iu) {
						var i = webix.$$(this.iu);
						if (!i) return;
						e = t.ju(i)
					} else e = {
						dx: this.scrollWidth,
						dy: this.scrollHeight,
						px: this.clientWidth,
						py: this.clientHeight
					}, e.ec = e.dx > e.px && -1 != this.mu.indexOf("x"), e.cc = e.dy > e.py && -1 != this.mu.indexOf("y");
					this.ou = e, e.ec && (e.uu = t.Om(this, "x", e.dx, e.px, "width", "height"), e.vu = e.px - e.uu.offsetWidth - 4, e.wu = e.dx - e.px, t.trackBar && (e.wA = t.xA(this, "x"))), e.cc && (e.xu = t.Om(this, "y", e.dy, e.py, "height", "width"), e.yu = e.py - e.xu.offsetHeight - 4, e.zu = e.dy - e.py, t.trackBar && (e.yA = t.xA(this, "y"))), t.sk(this)
				}
			},
			xA: function(t, e) {
				var i = webix.html.create("DIV", {
					webixignore: "1",
					"class": "webix_c_scroll_bar_" + e
				}, "");
				return t.appendChild(i), i
			},
			ru: function(e, i, s) {
				var n = e.ou,
					r = e.iu;
				if (r && (r = webix.$$(r)), n.uu == e.Au) {
					var a = (s.x - i.x) * n.wu / n.vu;
					r ? r.Zj.scrollTo(r.bk + a) : t.Bu(e, "scrollLeft", a)
				}
				if (n.xu == e.Au) {
					var a = (s.y - i.y) * n.zu / n.yu;
					r ? r.Wj.scrollTo(r.jk + a) : t.Bu(e, "scrollTop", a)
				}
				e.su = s, t.sk(e)
			},
			ju: function(t) {
				var e = {};
				return t.Zj && t.s.scrollX && (e.dx = t.Zj.s.scrollWidth, e.px = t.Zj.Si || 1, e.ec = e.dx - e.px > 1), t.Wj && t.s.scrollY && (e.dy = t.Wj.s.scrollHeight, e.py = t.Wj.Si || 1, e.cc = e.dy - e.py > 1), e
			},
			lu: function() {
				clearTimeout(this.tu), this.tu = webix.delay(t.pu, this, [], 200)
			},
			Cu: function(t) {
				t && (webix.html.remove(t), t.Du && (webix.eventRemove(t.Du), webix.eventRemove(t.Eu)))
			},
			pu: function() {
				if (this.ou) {
					if (this.Au) return void(this.Fu = !0);
					var e = this.ou;
					t.Cu(e.uu), t.Cu(e.xu), webix.html.removeCss(document.body, "webix_noselect"), e.wA && webix.html.remove(e.wA), e.yA && webix.html.remove(e.yA), this.ou = null
				}
			},
			nu: function(e) {
				var i = this.ou,
					s = e.wheelDelta / -40,
					n = !0;
				if (!s && e.detail && webix.isUndefined(e.wheelDelta) && (s = e.detail), i)
					if (i.uu && (e.wheelDeltaX || s && !i.xu)) {
						var r = e.wheelDeltaX / -40 || s;
						n = t.Bu(this, "scrollLeft", r * t.scrollStep)
					} else s && i.xu && (n = t.Bu(this, "scrollTop", s * t.scrollStep));
				return t.sk(this), n !== !1 ? webix.html.preventEvent(e) : void 0
			},
			Bu: function(e, i, s) {
				var n = e.ou,
					r = "scrollLeft" == i ? n.dx - n.px : n.dy - n.py,
					a = e[i];
				return a + s > r && (s = r - a), !s || 0 > a + s && 0 === a ? !1 : (webix.env.isIE ? (t.sk(e, i, s + a), e[i] += s) : e[i] += s, !0)
			},
			Om: function(e, i, s, n, r) {
				var a = webix.html.create("DIV", {
					webixignore: "1",
					"class": "webix_c_scroll_" + i
				}, "<div></div>");
				return a.style[r] = Math.max(n * n / s - 7, 40) + "px", e.style.position = "relative", e.appendChild(a), e.Du = webix.event(a, "mousedown", t.Gu(e)), e.Eu = webix.event(document.body, "mouseup", webix.bind(t.Hu, e)), a
			},
			Gu: function(e) {
				return function(i) {
					webix.html.addCss(document.body, "webix_noselect", 1), this.className += " webix_scroll_active", t.qu = e, e.Au = this, e.su = webix.html.pos(i)
				}
			},
			Hu: function() {
				this.Au && (webix.html.removeCss(document.body, "webix_noselect"), this.Au.className = this.Au.className.toString().replace(" webix_scroll_active", ""), this.Au = !1, t.qu = 0, this.Fu && (t.pu.call(this), this.Fu = !1))
			},
			sk: function(t, e, i) {
				var s = t.ou;
				if (s && (s.uu || s.xu)) {
					var n = t.iu,
						r = "scrollLeft" == e ? i : t.scrollLeft,
						a = n ? webix.$$(n).bk : r,
						h = n ? 0 : a,
						o = "scrollTop" == e ? i : t.scrollTop,
						l = n ? webix.$$(n).jk : o,
						c = n ? 0 : l;
					s.uu && (s.uu.style.bottom = 1 - c + "px", s.uu.style.left = Math.round(s.vu * a / (s.dx - s.px)) + h + 1 + "px", s.wA && (s.wA.style.bottom = 1 - c + "px", s.wA.style.left = h + "px")), s.xu && (s.xu.style.right = 0 - h + "px", s.xu.style.top = Math.round(s.yu * l / (s.dy - s.py)) + c + 1 + "px", s.yA && (s.yA.style.right = 0 - h + "px", s.yA.style.top = c + "px"))
				}
			}
		}
	}(), webix.protoUI({
		name: "portlet",
		defaults: {
			layoutType: "wide"
		},
		$init: function(t) {
			this.x.style.position = "relative", t.header && t.body && (t.body = [{
				template: t.header,
				type: "header"
			}, t.body]), this.$ready.push(this.Py), webix.attachEvent("onAfterPortletMove", this.xC)
		},
		xC: function(t) {
			webix.ui.each(t, function(t) {
				t.Ow && t.Ow()
			})
		},
		Py: function() {
			var t = this.getChildViews();
			if (t.length > 1) webix.DragControl.addDrag(t[0].$view, this);
			else {
				var e = webix.html.create("div", {
					"class": "portlet_drag"
				}, "<span class='webix_icon fa-bars'></span>");
				this.x.appendChild(e), webix.DragControl.addDrag(e, this)
			}
		},
		body_setter: function(t) {
			return this.rows_setter(webix.isArray(t) ? t : [t])
		},
		markDropArea: function(t, e) {
			return t ? (t = webix.$$(t), this.Qy || (this.Qy = webix.html.create("div", null, "&nbsp;")), t.$view.appendChild(this.Qy), void(this.Qy.className = "portlet_marker" + e)) : webix.html.remove(this.Qy)
		},
		movePortlet: function(t, e) {
			var i = t.getParentView(),
				s = this.getParentView(),
				n = i.index(t),
				r = s.index(this);
			if (webix.callEvent("onBeforePortletMove", [s, i, this, t, e])) {
				webix.ui.$freeze = !0;
				var a = s != i ? 1 : 0,
					h = i.mc;
				"top" == e || "bottom" == e ? (1 !== h && (i = webix.ui({
					type: t.s.layoutType,
					rows: []
				}, i, n + a), webix.ui(t, i, 0), n = 0, a = 1), "bottom" == e && (a += 1)) : ("left" == e || "right" == e) && (0 !== h && (i = webix.ui({
					type: t.s.layoutType,
					cols: []
				}, i, n + a), webix.ui(t, i, 0), n = 0, a = 1), "right" == e && (a += 1)), n > r && (a -= 1), webix.ui(this, i, n + a), "replace" == e && webix.ui(t, s, r), this.Ry(s), webix.ui.$freeze = !1;
				var o = s.getTopParentView(),
					l = t.getTopParentView();
				l.resize(), o != l && o.resize(), webix.callEvent("onAfterPortletMove", [s, i, this, t, e])
			}
		},
		Ry: function(t) {
			for (var e, i = 0; t.getChildViews().length <= i;) e = t, t = t.getParentView(), i = 1;
			i && t.removeView(e)
		},
		$drag: function(t) {
			return webix.html.addCss(this.x, "portlet_in_drag"), webix.DragControl.Gd = {
				source: t,
				from: t
			}, this.x.innerHTML
		},
		$dragDestroy: function(t, e) {
			webix.html.removeCss(this.x, "portlet_in_drag"), webix.html.remove(e), this.Sy && (this.movePortlet(this.Sy, this.Ty), this.markDropArea(), this.Sy = null)
		},
		WB: function() {
			return webix.html.offset(this.$view)
		},
		$dragPos: function(t, e, i) {
			i.style.left = "-10000px";
			var s = webix.env.mouse.context(e),
				n = document.elementFromPoint(s.x, s.y),
				r = null;
			n && (r = webix.$$(n)), this.Sy = this.Uy(r), this.Ty = this.Vy(this.Sy, e), t.x = t.x - this.bc + 10, t.y = t.y - 20, webix.DragControl.Ed = !0
		},
		Vy: function(t, e) {
			var i = "",
				s = "";
			if (e && t) {
				var n = webix.html.offset(t.$view),
					r = webix.html.pos(e),
					a = r.x - n.x - n.width / 2,
					h = r.y - n.y - n.height / 2;
				s = t.s.mode, s || (s = Math.abs(a) * (n.height / n.width) > Math.abs(h) ? "cols" : "rows"), "cols" == s ? i = a >= 0 ? "right" : "left" : "rows" == s && (i = h >= 0 ? "bottom" : "top"), this.markDropArea(t, i)
			}
			return this.markDropArea(t, i), i || s
		},
		Uy: function(t) {
			for (; t;) {
				if (t.movePortlet) return t;
				t = t.getParentView()
			}
		}
	}, webix.ui.layout), webix.UIManager.getState = function(t, e) {
		e = e || !1, t = webix.$$(t);
		var i = {
			id: t.config.id,
			width: t.config.width,
			height: t.config.height,
			gravity: t.config.gravity
		};
		if (webix.isUndefined(t.config.collapsed) || (i.collapsed = t.config.collapsed), ("tabs" === t.name || "tabbar" === t.name) && (i.activeCell = t.getValue()), e && (i = [i], t.q))
			for (var s = 0; s < t.q.length; s++) i = i.concat(this.getState(t.q[s], e));
		return i
	}, webix.UIManager.setState = function(t) {
		webix.isArray(t) || (t = [t]);
		for (var e = 0; e < t.length; e++) {
			var i = t[e],
				s = webix.$$(i.id);
			s && (webix.isUndefined(i.collapsed) || s.define("collapsed", i.collapsed), webix.isUndefined(i.activeCell) || s.setValue(i.activeCell), s.define("width", i.width), s.define("height", i.height), s.define("gravity", i.gravity))
		}
		var n = webix.$$(t[0].id);
		n && n.resize()
	},
	function() {
		function t(t, e) {
			var i = [],
				s = t.getColumnConfig,
				n = e.columns,
				r = !!e.rawValues;
			if (!n)
				if (s) n = t.Aj;
				else {
					n = webix.copy(t.data.pull[t.data.order[0]]);
					for (var a in n) n[a] = !0;
					delete n.id
				}
			e.id && i.push({
				id: "id",
				width: 50,
				header: " ",
				template: function(t) {
					return t.id
				}
			});
			for (var a in n) {
				var h = n[a];
				if (!h.noExport) {
					s && t.Aj[a] && (h = webix.extend(webix.extend({}, h), t.Aj[a]));
					var o = {
						id: h.id,
						template: (r ? null : h.template) || function(t) {
							return function(e) {
								return e[t]
							}
						}(a),
						width: (h.width || 200) * ("excel" === e.gB ? 8.43 / 70 : 1),
						header: h.header !== !1 ? h.header || a : ""
					};
					o.header = "string" == typeof o.header ? [{
						text: o.header
					}] : webix.copy(o.header);
					for (var l = 0; l < o.header.length; l++) o.header[l] = o.header[l] ? o.header[l].contentId ? "" : o.header[l].text : "";
					if (t.s.footer) {
						var c = h.footer || "";
						c = "string" == typeof c ? [{
							text: c
						}] : webix.copy(c);
						for (var l = 0; l < c.length; l++) c[l] = c[l] ? c[l].contentId ? t.getHeaderContent(c[l].contentId).getValue() : c[l].text : "";
						o.footer = c
					}
					i.push(o)
				}
			}
			return i
		}

		function e(t, e, i) {
			var s, n, r = !!e.filterHTML,
				a = /<[^>]*>/gi,
				h = [];
			if (e.header !== !1 && i.length && "excel" === e.gB)
				for (var o = 0; o < i[0].header.length; o++) {
					n = [];
					for (var l = 0; l < i.length; l++) s = "", i[l].header[o] && (s = i[l].header[o]), r && (s = s.replace(a, "")), n.push(s);
					h.push(n)
				}
			var c = "TreeStore" == t.data.name;
			if (t.data.each(function(e) {
					for (var s = [], n = 0; n < i.length; n++) {
						var o = i[n],
							l = o.template(e, t.type, e[o.id], o, n);
						l || 0 === l || (l = ""), r && "string" == typeof l && (c && (l = l.replace(/<div class=.webix_tree_none.><\/div>/, " - ")), l = l.replace(a, "")), s.push(l)
					}
					h.push(s)
				}, t), e.footer !== !1)
				for (var u = i[0].footer ? i[0].footer.length : 0, d = 0; u > d; d++) {
					for (var f = [], l = 0; l < i.length; l++) {
						var b = i[l].footer[d];
						r && (b = b.replace(a, "")), f.push(b)
					}
					"excel" === e.gB && h.push(f)
				}
			return h
		}

		function i(t) {
			for (var e = [], i = 0; i < t.length; i++) e.push({
				wch: t[i].width
			});
			return e
		}

		function s(t) {
			return Math.round(25569 + t / 864e5)
		}

		function n(t, e) {
			var i = t.Rt,
				s = [];
			if (i) {
				var n = e.xCorrection || 0,
					r = e.yCorrection || 0;
				for (var a in i) {
					var h = i[a];
					for (var o in h) {
						var l = t.getColumnIndex(o) - n,
							c = t.getIndexById(a) - r,
							u = l + h[o][0] - 1,
							d = c + (h[o][1] - 1);
						s.push({
							s: {
								c: l,
								r: c + 1
							},
							e: {
								c: u,
								r: d + 1
							}
						})
					}
				}
			}
			return s
		}

		function r(t, e, n) {
			for (var r = {}, a = {
					s: {
						c: 1e7,
						r: 1e7
					},
					e: {
						c: 0,
						r: 0
					}
				}, h = 0; h != t.length; ++h)
				for (var o = 0; o != t[h].length; ++o) {
					a.s.r > h && (a.s.r = h), a.s.c > o && (a.s.c = o), a.e.r < h && (a.e.r = h), a.e.c < o && (a.e.c = o);
					var c = {
						v: t[h][o]
					};
					if (null !== c.v) {
						var u = XLSX.utils.encode_cell({
							c: o,
							r: h
						});
						"number" == typeof c.v ? c.t = "n" : "boolean" == typeof c.v ? c.t = "b" : c.v instanceof Date ? (c.t = "n", c.z = XLSX.SSF[l][14], c.v = s(c.v)) : c.t = "s", r[u] = c
					}
				}
			return a.s.c < 1e7 && (r["!ref"] = XLSX.utils.encode_range(a)), r["!cols"] = i(e), n.length && (r["!merges"] = n), r
		}

		function a(t) {
			for (var e = new ArrayBuffer(t.length), i = new Uint8Array(e), s = 0; s != t.length; ++s) i[s] = 255 & t.charCodeAt(s);
			return e
		}

		function h(t, e, i, s) {
			i.header = webix.isUndefined(i.header) || i.header === !0 ? {} : i.header, i.footer = webix.isUndefined(i.footer) || i.footer === !0 ? {} : i.footer, i.table = i.table || {};
			var n = i.width || 595.296,
				r = i.height || 841.896;
			if (i.orientation && "landscape" === i.orientation && (r = [n, n = r][0]), i.autowidth) {
				n = 80;
				for (var a = 0; a < t.length; a++) n += t[a].width
			}
			for (var h = new pdfjs.Document({
					padding: 40,
					font: i.hB,
					threshold: 256,
					width: n,
					height: r
				}), o = i.header === !1 ? 0 : t[0].header.length, l = i.footer !== !1 && t[0].footer ? t[0].footer.length : 0, c = [], a = 0; a < t.length; a++) c[a] = t[a].width;
			var u = webix.extend(i.table, {
					borderWidth: 1,
					height: 20,
					lineHeight: 1.1,
					borderColor: 15658734,
					backgroundColor: 16777215,
					color: 6710886,
					textAlign: "left",
					paddingRight: 10,
					paddingLeft: 10,
					headerRows: o,
					widths: c.length ? c : ["100%"]
				}),
				d = h.table(u);
			if (o)
				for (var f = webix.extend(i.header, {
						borderRightColor: 11587299,
						borderBottomColor: 11587299,
						color: 4868682,
						backgroundColor: 13820911,
						height: 27,
						lineHeight: 1.2
					}), a = 0; o > a; a++)
					for (var b = d.tr(f), x = 0; x < t.length; x++) b.td(t[x].header[a].toString());
			for (var p = 0; p < e.length; p++)
				for (var w = d.tr({}), v = 0; v < e[p].length; v++) w.td(e[p][v]);
			if (l)
				for (var g = webix.extend(i.footer, {
						borderRightColor: 15658734,
						borderBottomColor: 15658734,
						backgroundColor: 16448250,
						color: 6710886,
						height: 27,
						lineHeight: 1.2
					}), a = 0; l > a; a++)
					for (var m = d.tr(g), x = 0; x < t.length; x++) m.td(t[x].footer[a].toString());
			if (i.docFooter !== !1) {
				var y = h.footer();
				y.text({
					color: 6710886,
					textAlign: "center"
				}).append(webix.i18n.dataExport.page || "Page").pageNumber().append("  " + (webix.i18n.dataExport.of || "of") + "  ").pageCount()
			}
			if (i.docHeader) {
				"string" == typeof i.docHeader && (i.docHeader = {
					text: i.docHeader
				});
				var $ = webix.extend(i.docHeader, {
						color: 6710886,
						textAlign: "right"
					}),
					_ = h.header({
						paddingBottom: 10
					});
				_.text($.text, $)
			}
			if (i.docHeaderImage) {
				"string" == typeof i.docHeaderImage && (i.docHeaderImage = {
					url: i.docHeaderImage
				});
				var _ = h.header({
						paddingBottom: 10
					}),
					I = webix.extend(i.docHeaderImage, {
						align: "right"
					});
				pdfjs.load(i.docHeaderImage.url, function(t, e) {
					if (!t) {
						var n = new pdfjs.Image(e);
						_.image(n, I)
					}
					var r = h.render();
					s(r, i)
				})
			} else {
				var C = h.render();
				s(C, i)
			}
		}
		webix.toPNG = function(t, e) {
			var i = webix.promise.defer();
			return webix.require(webix.cdn + "/extras/html2canvas.min.js", function() {
				var s = webix.$$(t);
				s && s.$exportView && (s = s.$exportView({}));
				var n = s ? s.$view : webix.toNode(t),
					r = (e || "data") + ".png";
				window.html2canvas(n).then(function(t) {
					var e = t.msToBlob ? t.msToBlob() : t.toDataURL("image/png");
					webix.html.download(e, r), t.remove(), i.resolve()
				})
			}), i
		}, webix.toExcel = function(i, s) {
			var h = webix.promise.defer(),
				o = webix.$$(i);
			return s = s || {}, o.$exportView && (o = o.$exportView(s)), webix.require(webix.cdn + "/extras/xlsx.core.min.js", function() {
				s.gB = "excel";
				var i = t(o, s),
					l = e(o, s, i),
					c = s.spans ? n(o, s) : [],
					u = r(l, i, c),
					d = {
						SheetNames: [],
						Sheets: []
					},
					f = s.name || "Data";
				f = f.replace(/[\*\?\:\[\]\\\/]/g, "").substring(0, 31), d.SheetNames.push(f), d.Sheets[f] = u;
				var b = XLSX.write(d, {
						bookType: "xlsx",
						bookSST: !1,
						type: "binary"
					}),
					x = (s.filename || f) + ".xlsx",
					p = new Blob([a(b)], {
						type: "application/xlsx"
					});
				webix.html.download(p, x), h.resolve()
			}), h
		};
		var o;
		webix.toPDF = function(i, s) {
			var n = webix.promise.defer();
			return webix.require(webix.cdn + "/extras/pdfjs.js", function() {
				var r = webix.$$(i);
				s = s || {}, r.$exportView && (r = r.$exportView(s)), s.gB = "pdf", s.hB = o;
				var a = t(r, s),
					l = e(r, s, a),
					c = function(t, e) {
						var i = (e.filename || "data") + ".pdf",
							s = new Blob([t.toString()], {
								type: "application/pdf"
							});
						webix.html.download(s, i), n.resolve()
					};
				s.hB ? h(a, l, s, c) : pdfjs.load(webix.cdn + "/extras/pt-sans.regular.ttf", function(t, e) {
					if (t) throw t;
					o = s.hB = new pdfjs.TTFFont(e), h(a, l, s, c)
				})
			}), n
		};
		var l = "_table"
	}(), webix.protoUI({
		name: "pdfviewer",
		$init: function(t) {
			this.$view.className += " webix_pdf";
			var e = document.createElement("DIV");
			e.className = "canvas_wrapper";
			var i = document.createElement("canvas");
			this.uz = this.$view, this.gt = this.$view.appendChild(e), this.Zn = this.gt.appendChild(i), this.$pdfDoc = null, this.$pageNum = 1, this.$numPages = 0, this.vz = !1, this.wz = null, this.xz = this.Zn.getContext("2d"), this.yz = t.scale || "auto", this.zz = .1, this.Az = t.scaleDelta || 1.1, this.Bz = t.minScale || .25, this.Cz = t.maxScale || 10, this.Dz = 1.25, this.Ez = 40, this.Fz = 10, window.PDFJS ? this.$ready.push(function() {
				this.load()
			}) : webix.require([webix.cdn + "/extras/pdfjs/compatibility.min.js", webix.cdn + "/extras/pdfjs/pdf.min.js"], function() {
				PDFJS.workerSrc = webix.cdn + "/extras/pdfjs/pdf.worker.min.js", this.load()
			}, this), this.$ready.push(this.Hz)
		},
		toolbar_setter: function(t) {
			if ("string" == typeof t) {
				var e = webix.$$(t);
				return e && (e.$master = this, e.refresh()), this.attachEvent("onAfterLoad", function() {
					e ? (e.setPage(this.$pageNum), e.setValues(this.$numPages, this.yz)) : this.toolbar_setter(t)
				}), t
			}
		},
		Hz: function() {
			this.attachEvent("onScaleChange", function(t, e) {
				e && this.s.toolbar && webix.$$(this.s.toolbar).setScale && webix.$$(this.s.toolbar).setScale(t)
			});
			var t = webix.env.isFF ? "DOMMouseScroll" : "mousewheel";
			webix.event(window, t, function(t) {
				var e = "DOMMouseScroll" === t.type ? -t.detail : t.wheelDelta,
					i = 0 > e ? "out" : "in";
				t.ctrlKey && (t.preventDefault(), "in" == i ? this.zoomIn(Math.abs(e)) : this.zoomOut(Math.abs(e)))
			}, {
				bind: this
			})
		},
		parse: function(t) {
			if (t.name) {
				var e = new FileReader;
				e.onload = webix.bind(function(t) {
					this.load({
						data: t.target.result
					})
				}, this), e.readAsArrayBuffer(t)
			} else this.load({
				data: t
			})
		},
		load: function(t) {
			t = t || this.s.url, t && ("string" == typeof t || t.data || t.range) && (this.callEvent("onBeforeLoad"), window.PDFJS ? PDFJS.getDocument(t).then(webix.bind(function(t) {
				this.$pdfDoc = t, this.$numPages = this.$pdfDoc.numPages;
				var e = isNaN(parseFloat(this.yz)) ? this.zz : this.yz;
				this.Jz(this.$pageNum, e), this.callEvent("onAfterLoad")
			}, this)) : this.s.url = t)
		},
		Kz: function(t, e) {
			var i = t.getViewport(e);
			return this.Zn.height = i.height, this.Zn.width = i.width, this.gt.style.width = i.width + "px", this.gt.style.height = i.height + "px", i
		},
		Jz: function(t, e) {
			var i = this;
			i.vz = !0, this.$pdfDoc.getPage(t).then(function(t) {
				var s = e || i.yz,
					n = i.Kz(t, s);
				e && e !== i.yz && (s = i.Lz(i.yz), n = i.Kz(t, s), i.yz = s);
				var r = {
					canvasContext: i.xz,
					viewport: n
				};
				t.render(r).promise.then(function() {
					i.vz = !1, null !== i.wz && (i.Jz(i.wz), i.wz = null)
				})
			}), this.callEvent("onPageRender", [this.$pageNum])
		},
		Mz: function(t) {
			this.vz ? this.wz = t : this.Jz(t)
		},
		renderPage: function(t) {
			0 > t || t > this.$numPages || (this.$pageNum = t, this.Mz(this.$pageNum))
		},
		prevPage: function() {
			this.$pageNum <= 1 || (this.$pageNum--, this.Mz(this.$pageNum))
		},
		nextPage: function() {
			this.$pageNum >= this.$numPages || (this.$pageNum++, this.Mz(this.$pageNum))
		},
		zoomIn: function() {
			var t = this.yz;
			t = (t * this.Az).toFixed(2), t = Math.ceil(10 * t) / 10, t = Math.min(this.Cz, t), this.setScale(t, !0)
		},
		zoomOut: function() {
			var t = this.yz;
			t = (t / this.Az).toFixed(2), t = Math.floor(10 * t) / 10, t = Math.max(this.Bz, t), this.setScale(t, !0)
		},
		Lz: function(t) {
			if (!isNaN(parseFloat(t))) return t;
			isNaN(parseFloat(this.yz)) && (this.yz = this.zz);
			var e = 1,
				i = ((this.uz.clientWidth - this.Ez) * this.yz / this.Zn.clientWidth).toFixed(2),
				s = ((this.uz.clientHeight - this.Fz) * this.yz / this.Zn.clientHeight).toFixed(2);
			switch (t) {
				case "page-actual":
					e = 1;
					break;
				case "page-width":
					e = i;
					break;
				case "page-height":
					e = s;
					break;
				case "page-fit":
					e = Math.min(i, s);
					break;
				case "auto":
					var n = this.uz.clientWidth > this.uz.clientHeight,
						r = n ? Math.min(s, i) : i;
					e = Math.min(this.Dz, r)
			}
			return e
		},
		setScale: function(t, e) {
			if (isNaN(parseFloat(t))) {
				var i = this.Lz(t);
				this.Nz(i, e)
			} else this.Nz(t, e)
		},
		Nz: function(t, e) {
			this.yz = t, this.renderPage(this.$pageNum), this.callEvent("onScaleChange", [t, e])
		},
		download: function() {
			if (this.$pdfDoc) {
				var t = (this.s.downloadName || "document") + ".pdf";
				this.$pdfDoc.getData().then(function(e) {
					var i = PDFJS.createBlob(e, "application/pdf");
					webix.html.download(i, t)
				})
			}
		}
	}, webix.EventSystem, webix.ui.view), webix.protoUI({
		name: "pdfbar",
		$init: function(t) {
			this.$view.className += " pdf_bar", t.cols = [{
				view: "button",
				type: "icon",
				icon: "arrow-left",
				width: 35,
				click: function() {
					this.getParentView().he("prev")
				}
			}, {
				view: "text",
				width: 70,
				on: {
					onBlur: function() {
						this.getParentView().he(this.getValue())
					},
					onKeyPress: function(t) {
						13 === t && this.getParentView().he(this.getValue())
					}
				}
			}, {
				template: "of #limit#",
				width: 70,
				data: {
					limit: 0
				},
				borderless: !0
			}, {
				view: "button",
				type: "icon",
				icon: "arrow-right",
				width: 35,
				click: function() {
					this.getParentView().he("next")
				}
			}, {}, {
				view: "button",
				type: "icon",
				icon: "minus",
				width: 35,
				click: function() {
					this.getParentView().zoom("out")
				}
			}, {
				view: "richselect",
				options: [],
				maxWidth: 150,
				suggest: {
					padding: 0,
					css: "pdf_opt_list",
					borderless: !0,
					body: {
						type: {
							height: 25
						},
						scroll: !1,
						yCount: 13
					}
				},
				on: {
					onChange: function() {
						this.getParentView().setMasterScale(this.getValue())
					}
				}
			}, {
				view: "button",
				type: "icon",
				icon: "plus",
				width: 35,
				click: function() {
					this.getParentView().zoom("in")
				}
			}, {
				view: "button",
				type: "icon",
				icon: "download",
				width: 35,
				click: function() {
					this.getParentView().download()
				}
			}], this.$ready.push(this.Oz)
		},
		Oz: function() {
			var t = this.getChildViews()[6].getPopup().getBody();
			t.clearAll(), t.parse([{
				id: "auto",
				value: "Automatic Zoom"
			}, {
				id: "page-actual",
				value: "Actual Size"
			}, {
				id: "page-fit",
				value: "Page Fit"
			}, {
				id: "page-width",
				value: "Page Width"
			}, {
				id: "page-height",
				value: "Page Height"
			}, {
				id: "0.5",
				value: "50%"
			}, {
				id: "0.75",
				value: "75%"
			}, {
				id: "1",
				value: "100%"
			}, {
				id: "1.25",
				value: "125%"
			}, {
				id: "1.5",
				value: "150%"
			}, {
				id: "2",
				value: "200%"
			}, {
				id: "3",
				value: "300%"
			}, {
				id: "4",
				value: "400%"
			}])
		},
		he: function(t) {
			this.setMasterPage(t), this.setPage(this.$master.$pageNum)
		},
		setScale: function(t) {
			var e = this.getChildViews()[6];
			e.blockEvent(), e.getPopup().getList().exists(t) ? e.setValue(t) : (e.setValue(""), e.getInputNode().innerHTML = (100 * t).toFixed(0) + "%"), e.unblockEvent()
		},
		setMasterScale: function(t) {
			this.$master && this.$master.setScale(t)
		},
		setMasterPage: function(t) {
			this.$master && ("prev" === t ? this.$master.prevPage() : "next" === t ? this.$master.nextPage() : isNaN(parseInt(t)) || this.$master.renderPage(parseInt(t)))
		},
		zoom: function(t) {
			this.$master && ("out" === t ? this.$master.zoomOut() : "in" === t && this.$master.zoomIn())
		},
		setPage: function(t) {
			this.getChildViews()[1].setValue(t)
		},
		setValues: function(t, e) {
			this.getChildViews()[2].data.limit = t, this.getChildViews()[2].refresh(), this.setScale(e)
		},
		download: function() {
			this.$master && this.$master.download()
		}
	}, webix.ui.toolbar), webix.protoUI({
		name: "excelbar",
		defaults: {
			padding: 0,
			type: "line"
		},
		$init: function(t) {
			t.cols = [{
				view: "tabbar",
				options: [""],
				optionWidth: 200,
				on: {
					onaftertabclick: function() {
						this.getParentView().callEvent("onExcelSheetSelect", [this.getValue()])
					}
				}
			}]
		},
		getValue: function() {
			return this.getInput().getValue()
		},
		setValue: function(t) {
			return this.getInput().setValue(t)
		},
		getInput: function() {
			return this.getChildViews()[0]
		},
		setSheets: function(t) {
			var e = this.getInput();
			e.config.options = t, e.refresh()
		}
	}, webix.ui.toolbar), webix.protoUI({
		name: "excelviewer",
		$init: function() {
			this.$ready.push(function() {
				this.s.toolbar && webix.$$(this.s.toolbar).attachEvent("onExcelSheetSelect", webix.bind(this.showSheet, this))
			})
		},
		defaults: {
			datatype: "excel"
		},
		$onLoad: function(t) {
			if (t.sheets) {
				this.zA = t, this.s.toolbar && webix.$$(this.s.toolbar).setSheets(t.names);
				var e = t.names[0];
				return this.showSheet(e.id || e), !0
			}
			return !1
		},
		showSheet: function(t) {
			this.clearAll();
			var e = this.data.driver.sheetToArray(this.zA.sheets[t], {
					spans: this.s.spans
				}),
				i = this.s.excelHeader,
				s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			if (i)
				if (i === !0) {
					i = e.data.splice(0, 1)[0];
					for (var n = 0; n < i.length; n++) i[n] = {
						header: i[n],
						id: "data" + n,
						adjust: !0,
						editor: "text",
						sort: "string"
					}
				} else i = webix.copy(i);
			else {
				i = webix.copy(e.data[0]);
				for (var n = 0; n < i.length; n++) i[n] = {
					header: s[n],
					id: "data" + n,
					adjust: !0,
					editor: "text",
					sort: "string"
				}
			}
			this.config.columns = i, this.refreshColumns(), this.parse(e.data, this.s.datatype)
		}
	}, webix.ui.datatable), webix.DataDriver.excel = webix.extend({
		toObject: function(t) {
			if (!t.length) {
				var e = t.options || {};
				e.dataurl && webix.extend(e, this.zB(e.dataurl)), t = t.data || t;
				var i = webix.promise.defer();
				if (t.name) {
					e.ext = t.name.split(".").pop();
					var s = new FileReader;
					s.onload = webix.bind(function(t) {
						i.resolve(this.parseData(t.target.result, e))
					}, this), s.readAsArrayBuffer(t)
				} else i.resolve(this.parseData(t, e));
				return i
			}
			return t
		},
		parseData: function(t, e) {
			t = new Uint8Array(t);
			for (var i = [], s = 0; s != t.length; ++s) i[s] = String.fromCharCode(t[s]);
			var n = (e.ext || e).toLowerCase();
			return "xls" != n && (n = "xlsx"), webix.require(webix.cdn + "/extras/" + n + ".core.min.js").then(webix.bind(function() {
				var t = "xls" == n ? XLS.read(i.join(""), {
						type: "binary"
					}) : XLSX.read(i.join(""), {
						type: "binary"
					}),
					s = {
						sheets: t.Sheets,
						names: t.SheetNames,
						options: e
					};
				return webix.extend(this.getSheet(s, e), s)
			}, this))
		},
		getSheet: function(t, e) {
			var i = e.name || t.names[0];
			return t = this.sheetToArray(t.sheets[i], e), e.rows && e.rows.length && (t.data = t.data.splice(e.rows[0], Math.min(e.rows[1], t.data.length) - e.rows[0])), t
		},
		sheetToArray: function(t, e) {
			var i = [],
				s = [];
			if (t["!ref"]) {
				var n, r, a, h, o = XLS.utils.decode_range(t["!ref"]);
				for (n = o.s.r; n <= o.e.r; n++) {
					var l = [];
					for (r = o.s.c; r <= o.e.c; r++) a = XLS.utils.encode_cell({
						r: n,
						c: r
					}), h = t[a], l.push(h ? e.math && h.f ? "=" == h.f.charAt(0) ? h.f : "=" + h.f : h.v : "");
					i.push(l)
				}
			}
			if (t["!merges"])
				for (var c = t["!merges"], u = 0; u < c.length; u++) {
					var d = c[u].s,
						f = c[u].e,
						b = e.rows ? e.rows[0] : 0;
					s.push([d.r + b, d.c, f.c - d.c + 1, f.r - d.r + 1])
				}
			return {
				data: i,
				spans: s,
				excel: !0
			}
		},
		zB: function(t) {
			var e = t.split("["),
				i = {};
			if (i.name = e[0], e[1]) {
				var s = e[1].split(/[^0-9]+/g);
				s[0] = 1 * s[0] || 0, s[1] = s[1] || 9999999, i.rows = s
			}
			return i
		}
	}, webix.DataDriver.jsarray), webix.protoUI({
		name: "treemap",
		defaults: {
			activeItem: !1,
			subRender: !0,
			header: !0,
			headerHeight: 35,
			value: webix.template("#value#"),
			headerTemplate: ""
		},
		value_setter: webix.template,
		headerTemplate_setter: webix.template,
		header_setter: function(t) {
			return t && t !== !0 && (this.type.header = t), t
		},
		$init: function() {
			this.$view.className += " webix_treemap", this.PA = document.createElement("DIV"), webix.extend(this.data, webix.TreeStore, !0), this.data.provideApi(this, !0), this.data.attachEvent("onClearAll", webix.bind(function() {
				this.v = "", this.$values = {}, this.$xy = {}
			}, this))
		},
		pg: function(t) {
			var e = this.data.Me[t.id];
			this.callEvent("onItemRender", [t]);
			var i = t.$template ? this.type["template" + t.$template].call(this, t, this.type, e) : this.type.template.call(this, t, this.type, e);
			return this.type.templateStart.call(this, t, this.type, e) + i + this.type.templateEnd.call(this)
		},
		QA: function(t) {
			var e = this.getItem(t),
				i = this.s.headerHeight,
				s = "<div class='webix_treemap_header' style='height:" + i + "px;line-height:" + i + "px;'>";
			return s += this.type.header.call(this, e, this.type), s += "</div>"
		},
		_x: function(t) {
			var e, i, s, n, r, a = [];
			if (!this.$width || !this.count()) return this.v = "", !1;
			if (t || (t = this.config.branch || 0, this.v = "", this.$values = {}, this.$xy = {}, this.$xy[t] = {
					width: this.$width,
					height: this.$height,
					top: 0,
					left: 0
				}, t && this.s.header && (this.$xy[t].height -= this.s.headerHeight, this.$xy[t].top = this.s.headerHeight, this.v += this.QA(t)), r = 0, this.data.each(function(t) {
					var e = this.getParentId(t.id);
					if (!this.data.branch[t.id] && (n = 1 * this.config.value.call(this, t), !isNaN(n) && n))
						for (this.$values[t.id] = n, r += n; e;) this.$values[e] || (this.$values[e] = 0), this.$values[e] += n, e = this.getParentId(e)
				}, this, !1, t)), this.data.eachChild(t, function(t) {
					this.$values[t.id] && a.push(webix.copy(t))
				}, this), r = r || this.$values[t], a.length && r) {
				i = this.$xy[t], s = {
					top: i.top,
					left: i.left,
					dx: i.width,
					dy: i.height,
					set: [],
					sum: 0
				}, s.dim = Math.min(s.dx, s.dy);
				var h = s.dx * s.dy / r;
				for (e = 0; e < a.length; e++) a[e].$value = this.$values[a[e].id] * h;
				a.sort(function(t, e) {
					return t.$value > e.$value ? -1 : 1
				});
				for (var o = 1 / 0, e = 0; a[e];) {
					var l = this.RA(s, a[e]);
					if (o > l) s.sum += a[e].$value, s.set.push(a[e]), o = l, e++;
					else {
						this.SA(s);
						var c = {
								top: s.top,
								left: s.left,
								dx: s.dx,
								dy: s.dy,
								set: [],
								sum: 0
							},
							h = s.sum / s.dim;
						s.dx > s.dy ? (c.left += h, c.dx -= h) : (c.top += h, c.dy -= h), s = c, s.dim = Math.min(s.dx, s.dy), o = 1 / 0
					}
				}
			}
			s && this.SA(s)
		},
		SA: function(t) {
			var e, i, s, n, r = t.top,
				a = t.left;
			for (t.mode = t.dy < t.dx, t.contra = t.sum / t.dim, e = 0; e < t.set.length; e++) i = t.set[e].id, t.mode ? (s = t.contra, n = t.set[e].$value / t.contra) : (s = t.set[e].$value / t.contra, n = t.contra), this.$xy[i] = {}, this.$xy[i].top = r, this.$xy[i].left = a, t.mode ? r += n : a += s, this.$xy[i].width = s, this.$xy[i].height = n, this.v += this.pg(this.getItem(i)), this.s.subRender && this.data.branch[i] && this._x(i)
		},
		RA: function(t, e) {
			var i = t.sum + e.$value,
				s = i * i / (t.dim * t.dim * e.$value);
			return t.set.length && (s = Math.max(t.dim * t.dim * t.set[0].$value / (i * i), s)), s > 1 ? s : 1 / s
		},
		Ne: function(t) {
			return this.PA.innerHTML = this.pg(t), this.PA.firstChild
		},
		showBranch: function(t) {
			this.s.branch = t, this.refresh()
		},
		render: function(t, e, i) {
			if (this.isVisible(this.s.id) && !this.$blockRender) {
				if ("update" == i) {
					var s = this.getItemNode(t);
					if (s) {
						var n = this.t[t] = this.Ne(e);
						webix.html.insertBefore(n, s), webix.html.remove(s)
					}
				} else !this.data.branch || this.s.branch && !this.data.branch[this.s.branch] || (this.t = null, this.callEvent("onBeforeRender", []), this._x(), this.y.innerHTML = this.v, this.callEvent("onAfterRender", []));
				return !0
			}
		},
		ad: "webix_dm_id",
		on_click: {
			webix_treemap_item: function(t, e) {
				this.s.select && ("multiselect" == this.s.select || this.s.multiselect ? this.select(e, !1, t.ctrlKey || t.metaKey || "touch" == this.s.multiselect, t.shiftKey) : this.select(e)), this.s.activeItem && this.isBranch(e) && this.showBranch(e)
			},
			webix_treemap_header_item: function(t) {
				var e = webix.html.locate(t, "webix_dm_header_id");
				this.define("branch", e), this.refresh()
			},
			webix_treemap_reset: function() {
				this.define("branch", 0), this.refresh()
			}
		},
		on_dblclick: {},
		on_mouse_move: {},
		TA: function(t) {
			var e = "";
			for (var i in t) e += i + ":" + t[i] + ";";
			return e
		},
		type: {
			template: webix.template("#value#"),
			header: function(t, e) {
				for (var i = t.id, s = "<div class='webix_treemap_reset'></div>", n = []; i;) t = this.getItem(i), n.push(e.headerItem.call(this, t, e)), i = this.getParentId(i);
				return n.reverse(), s + n.join("<span class='webix_icon fa-angle-right webix_treemap_path_icon'></span>")
			},
			headerItem: function(t) {
				var e = '<a webix_dm_header_id="' + t.id + '" class="webix_treemap_header_item">';
				return e += this.config.headerTemplate(t), e += "</a>"
			},
			classname: function(t, e, i) {
				var s = "webix_treemap_item";
				e.css && (s += e.css + " "), t.$css && ("object" == typeof t.$css && (t.$css = webix.html.createCss(t.$css)), s += " " + t.$css);
				var n = this.$xy[t.id];
				i && i.$css && (s += " " + i.$css), s += " webix_treemap_level_" + this.getItem(t.id).$level;
				var r = this.getParentId(t.id);
				if (r && r != this.s.branch || (s += " webix_treemap_level_top"), this.$height - n.top - n.height < 1 && (s += " webix_treemap_item_bottom"), this.$width - n.left - n.width < 1 && (s += " webix_treemap_item_right"), e.cssClass) {
					var a = e.cssClass.call(this, t, e, i);
					a && (s += "object" == typeof a ? " " + webix.html.createCss(a) : " " + a)
				}
				return s
			},
			templateStart: function(t, e, i) {
				var s = "";
				if (this.$xy) {
					var n = this.$xy[t.id];
					s += "width: " + n.width + "px; height: " + n.height + "px;", s += "top: " + n.top + "px; left: " + n.left + "px;"
				}
				return '<div webix_dm_id="' + t.id + '" class="' + e.classname.call(this, t, e, i) + '" style="' + s + '">'
			},
			templateEnd: webix.template("</div>")
		}
	}, webix.AutoTooltip, webix.Group, webix.TreeAPI, webix.SelectionModel, webix.KeysNavigation, webix.MouseEvents, webix.Scrollable, webix.TreeDataLoader, webix.ui.proto, webix.TreeRenderStack, webix.CopyPaste, webix.EventSystem), webix.extend(webix.ui.datatable, {
		iB: function() {
			this.jB = !0, this.kB = {}, this.define("select", "area"), this.attachEvent("onAfterScroll", function() {
				this.lB()
			}), this.attachEvent("onAfterRender", function() {
				this.lB()
			}), this.attachEvent("onBeforeColumnHide", function(t) {
				this.tC = this.getColumnIndex(t)
			}), this.attachEvent("onAfterColumnHide", function() {
				this.uC(this.tC)
			}), this.wB = function(t, e, i, s) {
				if (t.row && e.row) {
					if (i) return this.addSelectArea(t, e, !0), this.jB = !0, !1;
					if (!this.callEvent("onAreaDrag", [t, e, s])) return !1;
					this.mB ? this.nB(this.mB) : !this.jB || this.s.multiselect && s && s.ctrlKey || (this.removeSelectArea(), this.jB = !1)
				}
			}, this.attachEvent("onBeforeAreaAdd", this.oB), webix.event(this.Vf, "mousedown", this.pB, {
				bind: this
			})
		},
		ql: !0,
		uC: function(t) {
			var e = this.kB;
			for (var i in e) {
				var s = e[i];
				if (this.getColumnIndex(s.start.column) < 0)
					if (s.start.column == s.end.column) this.removeSelectArea(s.name);
					else {
						var n = this.columnId(t + 1);
						n && this.vC(s.name, {
							row: s.start.row,
							column: n
						}, null)
					}
				else if (this.getColumnIndex(s.end.column) < 0) {
					var n = this.columnId(t - 1);
					n && this.vC(s.name, null, {
						row: s.end.row,
						column: n
					})
				}
			}
		},
		gC: function(t, e) {
			var i, s, n, r, a, h;
			e && (i = this.getColumnIndex(e.start.column), s = this.getColumnIndex(e.end.column), n = this.getIndexById(e.start.row), r = this.getIndexById(e.end.row), a = this.getColumnIndex(t.column), h = this.getIndexById(t.row), i > a ? i = a : a > s && (s = a), n > h ? n = h : h > r && (r = h), this.vC(e.name, {
				row: this.getIdByIndex(n),
				column: this.columnId(i)
			}, {
				row: this.getIdByIndex(r),
				column: this.columnId(s)
			}))
		},
		vC: function(t, e, i) {
			var s = this.kB[t];
			return s ? (webix.extend(s, {
				start: e || s.start,
				end: i || s.end
			}, !0), void this.lB()) : !1
		},
		areaselect_setter: function(t) {
			return t && (this.iB(), this.iB = function() {}), this.define("blockselect", t), t
		},
		addSelectArea: function(t, e, i, s, n, r) {
			var a, h, o, l, c;
			if (a = this.getIndexById(t.row), h = this.getIndexById(e.row), o = this.getColumnIndex(t.column), l = this.getColumnIndex(e.column), a > h && (c = a, a = h, h = c), o > l && (c = o, o = l, l = c), l < this.s.leftSplit || o >= this.Fj) return !1;
			o = Math.max(this.s.leftSplit, o), l = Math.min(this.Fj - 1, l), s = s || this.mB, s || (s = this.qB = webix.uid()), this.mB = null;
			var u = {
				start: {
					row: this.getIdByIndex(a),
					column: this.columnId(o)
				},
				end: {
					row: this.getIdByIndex(h),
					column: this.columnId(l)
				}
			};
			return n && (u.css = n), (r || r === !1) && (u.handle = r), this.kB[s] ? this.vC(s, u.start, u.end) : (u.handle = !0, i || this.removeSelectArea(), u.name = s, void(this.callEvent("onBeforeAreaAdd", [u]) && (this.kB[u.name] = u, this.el.push(u), this.lB(), this.callEvent("onAfterAreaAdd", [u]), this.callEvent("onSelectChange", []))))
		},
		lB: function() {
			var t, e, i, s, n, r, a, h, o = this.s.prerender;
			if (this.wk) {
				t = this.Xj(o), e = this.Sj(o === !0), this.rB || (this.rB = webix.html.create("DIV"), this.rB.className = "webix_area_selection_layer", this.rB.style.top = this.ck + "px", this.Vf.childNodes[1].appendChild(this.rB)), this.rB.innerHTML = "";
				for (i in this.kB) s = this.kB[i], n = Math.max(e[0], this.getIndexById(s.start.row)), r = Math.min(e[1], this.getIndexById(s.end.row)), a = Math.max(t[0], this.getColumnIndex(s.start.column)), h = Math.min(t[1], this.getColumnIndex(s.end.column)), r >= n && h >= a && this.sB(n, a, r, h, i, s.css, s.handle)
			}
		},
		sB: function(t, e, i, s, n, r, a) {
			var h, o, l, c, u, d, f, b, x = {
				top: 1,
				right: 1,
				bottom: 1,
				left: 1
			};
			o = this.ug(this.getIdByIndex(t), this.columnId(e)), l = this.ug(this.getIdByIndex(i), this.columnId(s)), c = l.top - o.top + l.height - 1, u = l.left - o.left + l.width;
			for (h in x) {
				d = o.top, "bottom" == h && (d = l.top + l.height), f = o.left, "right" == h && (f = l.left + l.width), b = "top" == h || "bottom" == h, this.rB.appendChild(webix.html.create("DIV", {
					"class": "webix_area_selection webix_area_selection_" + h + (r ? " " + r : ""),
					style: "left:" + f + "px;top:" + d + "px;" + (b ? "width:" + u + "px;" : "height:" + c + "px;"),
					webix_area_name: n
				}, ""));
				var p = this.rB.lastChild;
				"right" == h && (p.style.left = f - p.offsetWidth + "px"), "bottom" == h && (p.style.top = d - p.offsetHeight + "px")
			}
			a && this.rB.appendChild(webix.html.create("DIV", {
				"class": "webix_area_selection_handle" + (r ? " " + r : ""),
				style: "left:" + (l.left + l.width) + "px;top:" + (l.top + l.height) + "px;",
				webix_area_name: n
			}, ""))
		},
		nB: function(t) {
			if (t)
				for (var e = this.rB.childNodes, i = e.length - 1; i >= 0; i--) e[i].getAttribute("webix_area_name") == t && this.rB.removeChild(e[i])
		},
		removeSelectArea: function(t) {
			if (t) {
				if (this.callEvent("onBeforeAreaRemove", [t])) {
					delete this.kB[t], this.nB(t), this.el = [];
					for (var e in this.kB) this.el.push(this.kB[e]);
					this.callEvent("onAfterAreaRemove", [t])
				}
			} else
				for (var i in this.kB) this.removeSelectArea(i)
		},
		pB: function(t) {
			var e = t.target || t.srcElement;
			if (e.className && -1 != e.className.indexOf("webix_area_selection_handle")) {
				var i = e.getAttribute("webix_area_name");
				this.mB = i;
				var s = this.kB[i],
					n = this.ug(s.start.row, s.start.column),
					r = this.ug(s.end.row, s.end.column),
					a = this.s.prerender;
				return this.ul = [n.left + 1 + this.dk - this.bk, n.top + 1 - (a ? this.jk : 0)], this.Al(t), this.vl = [r.left + 1 + this.dk - this.bk, r.top + 1 - (a ? this.jk : 0)], this.jz(!1, !1), webix.html.preventEvent(t)
			}
		},
		getSelectArea: function(t) {
			return this.kB[t || this.qB]
		},
		getAllSelectAreas: function() {
			return this.kB
		},
		oB: function(t) {
			if (!this.config.spans) return !0;
			var e, i, s, n, r, a, h, o, l, c, u, d, f, b = !1,
				x = t.start,
				p = t.end;
			for (c = r = this.getIndexById(x.row), u = s = this.getColumnIndex(x.column), d = a = this.getIndexById(p.row), f = n = this.getColumnIndex(p.column), e = r; a >= e; e++)
				for (i = s; n >= i; i++) h = this.getSpan(this.getIdByIndex(e), this.columnId(i)), h && (o = this.getIndexById(h[0]), l = this.getColumnIndex(h[1]), c > o && (c = o, b = !0), u > l && (b = !0, u = l), o + h[3] - 1 > d && (b = !0, d = o + h[3] - 1), l + h[2] - 1 > f && (b = !0, f = l + h[2] - 1));
			b && (t.start = {
				row: this.getIdByIndex(c),
				column: this.columnId(u)
			}, t.end = {
				row: this.getIdByIndex(d),
				column: this.columnId(f)
			}, this.oB(t))
		}
	}), webix.protoUI({
		name: "rangechart",
		$init: function() {
			this.attachEvent("onAfterRender", this.AB), this.BB()
		},
		AB: function() {
			if (this.eo.sA.length && !this.CB) {
				var t = this.no(this.bc, this.dc);
				this.kp = t.start, this.DB = t.end, this.EB = (this.eo.sA[0].points[2] - this.eo.sA[0].points[0]) / 2, this.FB = webix.html.create("div", {
					"class": "webix_chart_resizer right"
				}), this.GB = webix.html.create("div", {
					"class": "webix_chart_resizer left"
				}), this.CB = webix.html.create("div", {
					"class": "webix_chart_frame"
				}), this.x.appendChild(this.GB), this.x.appendChild(this.CB), this.x.appendChild(this.FB), this.HB = this.FB.clientWidth / 2, webix.event(this.FB, webix.env.mouse.down, this.IB, {
					bind: this
				}), webix.event(this.GB, webix.env.mouse.down, this.IB, {
					bind: this
				}), webix.event(this.CB, webix.env.mouse.down, this.IB, {
					bind: this
				}), this.JB && (this.s.range = this.BB(this.JB)), this.KB(), this.callEvent("onAfterRangeChange", [this.JB]), this.data.attachEvent("onStoreUpdated", webix.bind(this.KB, this))
			}
		},
		removeAllSeries: function() {
			this.CB = this.FB = this.GB = null, webix.ui.chart.prototype.removeAllSeries.apply(this, arguments)
		},
		IB: function(t) {
			if (-1 !== t.target.className.indexOf("webix_chart_resizer")) this.LB = t.target;
			else if (this.eo.sA.length) {
				var e = this.eo.sA[this.JB.sindex].points[2] - this.EB,
					i = this.eo.sA[this.JB.eindex].points[2];
				this.MB = {
					ex: webix.html.pos(t).x,
					fx: e + this.kp.x,
					fw: i - e
				}
			}
			webix.html.addCss(this.x, "webix_noselect webix_wresize_cursor"), this.NB = webix.event(document.body, webix.env.mouse.move, this.OB, {
				bind: this
			}), this.PB = webix.event(document.body, webix.env.mouse.up, this.QB, {
				bind: this
			})
		},
		OB: function(t) {
			if (this.LB) {
				var e = webix.html.pos(t).x - webix.html.offset(this.$view).x;
				e >= this.kp.x && e <= this.DB.x && (-1 !== this.LB.className.indexOf("left") ? e < this.FB.offsetLeft && (this.LB.style.left = e - this.HB + "px", this.CB.style.left = e + "px", this.CB.style.width = this.FB.offsetLeft - this.GB.offsetLeft - 1 + "px") : e > this.GB.offsetLeft + this.HB && (this.LB.style.left = e - this.HB + "px", this.CB.style.width = this.FB.offsetLeft - this.GB.offsetLeft - 1 + "px"))
			} else if (this.MB) {
				var i = webix.html.pos(t).x - this.MB.ex,
					s = this.MB.fx + i,
					n = s + this.MB.fw;
				this.kp.x <= s && this.DB.x >= n && (webix.extend(this.MB, {
					lx: s,
					rx: n
				}, !0), this.GB.style.left = s - this.HB + "px", this.FB.style.left = n - this.HB + "px", this.CB.style.left = s + "px")
			}
		},
		QB: function(t) {
			if (webix.eventRemove(this.NB), webix.eventRemove(this.PB), webix.html.removeCss(this.x, "webix_noselect"), webix.html.removeCss(this.x, "webix_wresize_cursor"), this.count()) {
				if (this.LB) {
					var e = webix.env.touch ? t.changedTouches[0].pageX : webix.html.pos(t).x;
					e -= webix.html.offset(this.$view).x + this.kp.x;
					var i = this.RB(e),
						s = this.SB(i);
					this.LB === this.GB ? (i >= this.JB.eindex && (i = this.JB.eindex, s = this.SB(i)), this.JB.start = s, this.JB.sindex = i) : (i <= this.JB.sindex && (i = this.JB.sindex, s = this.SB(i)), this.JB.end = s, this.JB.eindex = i), this.LB = null
				} else if (this.MB && this.MB.lx) {
					var n = this.JB.sindex = this.RB(this.MB.lx - this.kp.x),
						r = this.JB.eindex = this.RB(this.MB.rx - this.kp.x);
					this.JB.start = this.SB(n), this.JB.end = this.SB(r), this.MB = null
				}
				this.KB(), this.callEvent("onAfterRangeChange", [this.JB.start, this.JB.end])
			}
		},
		SB: function(t) {
			return t >= this.data.order.length && (t = this.data.order.length - 1), this.getItem(this.data.order[t])[this.s.frameId || "id"]
		},
		RB: function(t) {
			for (var e = this.eo.sA, i = 0; i < e.length; i++)
				if (t <= e[i].points[2] - this.EB) return i;
			return e.length - 1
		},
		TB: function(t) {
			for (var e = this.s.frameId || "id", i = 0; i < this.data.order.length; i++)
				if (this.getItem(this.data.order[i])[e] == t) return i;
			return -1
		},
		BB: function(t) {
			t ? (t.start && (t.sindex = this.TB(t.start)), t.end && (t.eindex = this.TB(t.end)), t.start = t.start || this.SB(t.sindex), t.end = t.end || this.SB(t.eindex)) : t = {
				start: 0,
				end: 0,
				sindex: 0,
				eindex: 0
			}, this.JB = t
		},
		range_setter: function(t) {
			return this.BB(t), this.JB
		},
		getFrameData: function() {
			for (var t = [], e = this.JB.sindex; e <= this.JB.eindex; e++) {
				var i = this.getItem(this.data.order[e]);
				i && t.push(i)
			}
			return t
		},
		setFrameRange: function(t) {
			this.BB(t), this.KB(), this.callEvent("onAfterRangeChange", [t])
		},
		KB: function() {
			var t = this.eo.sA;
			if (t.length) {
				var e = t[this.JB.sindex].points[0] + this.kp.x + this.EB - 1,
					i = t[this.JB.eindex].points[0] + this.kp.x + this.EB - 1;
				this.GB.style.left = e - this.HB + "px", this.FB.style.left = i - this.HB + "px", this.CB.style.left = e + "px", this.CB.style.width = i - e + "px", this.s.range = this.JB
			}
		},
		getFrameRange: function() {
			return this.s.range
		}
	}, webix.ui.chart);
