/*
@license
webix UI v.2.2.3
This software is can be used only as part of webix.com site
You are not allowed to copy this file and use in any other project
*/
webix.protoUI({
	name: "kanban",
	$init: function() {
		this.data.provideApi(this, !0), this.zx(), this.$ready.push(function() {
			this.Ax = this.Bx(this, {})
		})
	},
	zx: function() {
		this.data.attachEvent("onStoreUpdated", function(t) {
			var e = {};
			this.each(function(t) {
				t.status && (e[t.status] || (e[t.status] = []), e[t.status].push(t))
			});
			for (var i in e) {
				var s = e[i];
				s.sort(function(e, i) {
					var s = e.$index,
						n = i.$index;
					return s == n ? e.id == t ? -1 : i.id == t ? 1 : 0 : s > n ? 1 : n > s ? -1 : 0
				});
				for (var n = 0; n < s.length; n++) s[n].$index = n
			}
		})
	},
	Bx: function(t, e) {
		for (var i = t.getChildViews(), s = 0; s < i.length; s++) {
			var n = i[s];
			if (n.$kanban) {
				var a = n.config.status;
				e[a] = n, this.config.icons && (n.type.icons = this.config.icons), n.config.master = this.config.id, n.sync(this.data, this.Cx(a))
			} else n.getChildViews && this.Bx(n, e)
		}
		return e
	},
	Cx: function(t) {
		return function() {
			this.filter(function(e) {
				return e.status == t
			}), this.sort(function(t, e) {
				return t = t.$index, e = e.$index, t > e ? 1 : e > t ? -1 : 0
			})
		}
	},
	getSelectedId: function() {
		var t = null;
		return this.eachList(function(e) {
			t = e.getSelectedId() || t
		}), t
	},
	select: function(t) {
		this.getOwnerList(t).select(t)
	},
	getOwnerList: function(t) {
		var e = null;
		return this.eachList(function(i) {
			i.data.order.find(t) > -1 && (e = i)
		}), e
	},
	eachList: function(t) {
		for (var e in this.Ax) t.call(this, webix.$$(this.Ax[e]), e)
	},
	Dx: function() {
		if (this.Ex) {
			var t = webix.$$(this.Ex);
			webix.html.removeCss(t.$view, "webix_drag_over")
		}
	},
	Fx: function(t) {
		this.Dx(), t.$view.className.indexOf("webix_drag_over") < 0 && (webix.html.addCss(t.$view, "webix_drag_over"), this.Ex = t.config.id)
	}
}, webix.DataLoader, webix.EventSystem, webix.ui.headerlayout), webix.protoUI({
	name: "kanbanlist",
	$init: function() {
		this.$view.className += " webix_kanban_list", this.attachEvent("onAfterSelect", function() {
			this.eachOtherList(function(t) {
				t.unselect()
			})
		}), this.$ready.push(webix.bind(this.Qw, this))
	},
	$kanban: !0,
	on_context: {},
	$dragDestroy: function() {
		webix.$$(this.config.master).Dx(), webix.html.remove(webix.DragControl.v)
	},
	Qw: function() {
		this.on_click.webix_kanban_user_avatar = function(t, e, i) {
			return webix.$$(this.config.master).callEvent("onAvatarClick", [e, t, i, this])
		}, this.attachEvent("onBeforeSelect", function(t, e) {
			return webix.$$(this.config.master).callEvent("onListBeforeSelect", [t, e, this])
		}), this.attachEvent("onAfterSelect", function(t) {
			webix.$$(this.config.master).callEvent("onListAfterSelect", [t, this])
		}), this.attachEvent("onItemClick", function(t, e, i) {
			for (var s = e.target || e.srcElement, n = null; !n && s != i;) n = s.getAttribute("webix_icon_id"), s = s.parentNode;
			var a = !0;
			n && (a = a && webix.$$(this.config.master).callEvent("onListIconClick", [n, t, e, i, this])), a && webix.$$(this.config.master).callEvent("onListItemClick", [t, e, i, this])
		}), this.attachEvent("onItemDblClick", function(t, e, i) {
			webix.$$(this.config.master).callEvent("onListItemDblClick", [t, e, i, this])
		}), this.attachEvent("onBeforeContextMenu", function(t, e, i) {
			return webix.$$(this.config.master).callEvent("onListBeforeContextMenu", [t, e, i, this])
		}), this.attachEvent("onAfterContextMenu", function(t, e, i) {
			webix.$$(this.config.master).callEvent("onListAfterContextMenu", [t, e, i, this])
		}), this.attachEvent("onBeforeDrag", function(t, e) {
			return webix.$$(this.config.master).callEvent("onListBeforeDrag", [t, e, this])
		}), this.attachEvent("onBeforeDragIn", function(t, e) {
			var i = webix.$$(this.config.master),
				s = i.callEvent("onListBeforeDragIn", [t, e, this]);
			return i.Dx(), s && (t.target || i.Fx(this)), s
		}), this.attachEvent("onDragOut", function(t, e) {
			webix.$$(this.config.master).callEvent("onListDragOut", [t, e, this])
		}), this.dropHandler = this.attachEvent("onBeforeDrop", function(t, e) {
			var i = webix.$$(this.config.master);
			if (i.Dx(), i.callEvent("onListBeforeDrop", [t, e, this])) {
				var s = t.start,
					n = i.getItem(s);
				return n.$index = t.index, t.from != t.to ? (i.callEvent("onBeforeStatusChange", [s, this.config.status, this, t, e]) && (n.status = this.config.status, i.updateItem(s), i.callEvent("onAfterStatusChange", [s, this.config.status, this, t, e]), i.callEvent("onListAfterDrop", [t, e, this])), !1) : (i.refresh(s), i.callEvent("onListAfterDrop", [t, e, this]), !0)
			}
			return !1
		})
	},
	$dragCreate: function(t, e) {
		var i = webix.DragControl.$drag(t, e);
		if (!i) return !1;
		var s = document.createElement("DIV");
		return s.innerHTML = i, s.className = "webix_drag_zone webix_kanban_drag_zone", document.body.appendChild(s), s
	},
	$dragPos: function(t) {
		t.x = t.x - 4, t.y = t.y - 4
	},
	eachOtherList: function(t) {
		var e = this.config.id,
			i = webix.$$(this.config.master);
		i.eachList(function(i) {
			i.config.id != e && t.call(webix.$$(e), i)
		})
	},
	type_setter: function() {
		var t = 0,
			e = null,
			i = webix.ui.dataview.prototype.type_setter.apply(this, arguments);
		if (this.type.icons)
			for (t = 0; t < this.type.icons.length; t++) e = this.type.icons[t], e.click && (this.on_click["fa-" + e.icon] = e.click);
		return i
	},
	defaults: {
		drag: !0,
		prerender: !0,
		select: !0,
		xCount: 1
	},
	type: {
		height: "auto",
		width: "auto",
		icons: [{
			icon: "pencil"
		}],
		tagDemiliter: ",",
		templateTags: function(t, e) {
			var i = [];
			if (t.tags)
				for (var s = t.tags.split(e.tagDemiliter), n = 0; n < s.length; n++) i.push('<span class="webix_kanban_tag">' + s[n] + "</span>");
			return '<div  class="webix_kanban_tags">' + (i.length ? i.join(" ") : "&nbsp;") + "</div>"
		},
		templateIcons: function(t, e) {
			for (var i = [], s = null, n = "", a = 0; a < e.icons.length; a++)
				if (s = e.icons[a], !s.show || s.show(t)) {
					var n = '<span webix_icon_id="' + (s.id || s.icon) + '" class="webix_kanban_icon" title="' + (s.tooltip || "") + '">';
					n += '<span class="fa-' + s.icon + ' webix_icon"></span>', s.template && (n += '<span class="webix_kanban_icon_text">' + webix.template(s.template)(t) + "</span>"), n += "</span>", i.push(n)
				}
			return '<div  class="webix_kanban_icons">' + i.join(" ") + "</div>"
		},
		templateNoAvatar: webix.template("<span class='webix_icon fa-user'></span>"),
		templateAvatar: webix.template(""),
		templateBody: webix.template("#text#"),
		templateFooter: function(t, e) {
			var i = e.templateTags(t, e);
			return (i ? i : "&nbsp;") + e.templateIcons(t, e)
		},
		templateStart: webix.template('<div webix_f_id="#id#" class="{common.classname()} webix_kanban_list_item" style="width:{common.width}px; height:{common.height}px;   overflow:hidden;float:left;">'),
		template: function(t, e) {
			var i = e.templateAvatar(t, e),
				s = '<div class="webix_kanban_user_avatar">' + (i ? i : e.templateNoAvatar(t, e)) + "</div>",
				n = '<div class="webix_kanban_body">' + e.templateBody(t, e) + "</div>",
				a = '<div class="webix_kanban_footer">' + e.templateFooter.call(this, t, e) + "</div>",
				r = "border-left-color:" + t.color;
			return s + '<div class="webix_kanban_list_content" style="' + r + '">' + n + a + "</div>"
		}
	}
}, webix.ui.dataview);