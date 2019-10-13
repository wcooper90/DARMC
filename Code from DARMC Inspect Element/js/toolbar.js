

define(["dojo/Evented", "dojo/_base/declare", "dojo/_base/window", "dojo/_base/fx", "dojo/_base/html", "dojo/_base/lang", "dojo/has", "dojo/dom", "dojo/dom-class", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dojo/dom-geometry", "dojo/on", "dojo/mouse", "dojo/query", "dijit/focus", "dijit/a11y", "dojo/keys", "dojo/Deferred"], function (o, e, t, a, i, s, n, l, c, r, d, h, g, p, u, f, v, b, m, _) {
	return e([o], {
		map: null,
		tools: [],
		toollist: [],
		snap: !0,
		curTool: 0,
		scrollTimer: null,
		config: {},
		pTools: null,
		pMenu: null,
		pPages: null,
		constructor: function (o) {
			this.config = o
		},
		startup: function () {
			var o = this._init();
			return o.then(s.hitch(this, function (o) {
				this.emit("ready", o)
			}), s.hitch(this, function (o) {
				this.emit("error", o)
			})), o
		},
		_init: function () {
			var o;
			return o = new _, this.pTools = l.byId("panelTools"), p(this.pTools, "keydown", s.hitch(this, function (o) {
				var e = o.target.name;
				if (e && (e = e.toLowerCase(), o.keyCode === m.ENTER)) {
					this.activateTool(e);
					var t = b.getFirstInTabbingOrder("pageBody_" + e);
					t && v.focus(t), o.preventDefault()
				}
			})), p(this.pTools, "keyup", s.hitch(this, function () {
				this.map.isKeyboardNavigation || this.map.enableKeyboardNavigation()
			})), this.pMenu = l.byId("panelMenu"), this.pPages = l.byId("panelPages"), h.empty(this.pPages), o.resolve(), o.promise
		},
		createTool: function (o, e) {
			var t, a = o.name,
				i = this.config.activeTool === a;
			t = this.config.toolbarLabels ? "<span aria-hidden=true class='icon-color toolbar-icons icon-" + a + "'><span class='btnText'>" + this.config.i18n.tooltips[a] + "<span></span>" : "<span aria-hidden=true class='icon-color toolbar-icons icon-" + a + "'></span>";
			var n = h.create("button", {
				className: "panelTool",
				role: "button",
				name: a,
				title: this.config.i18n.tooltips[a] || a,
				innerHTML: t,
				id: "panelTool_" + a
			}, this.pTools);
			this.config.toolbarLabels && (r.set(n, "width", "auto"), c.add(n, "labels"), c.add("panelTools", "labels")), f(".icon-color").style("color", this.config.iconColor), i && c.add(n, "pressed"), p(n, "click", s.hitch(this, this._toolClick, a)), this.tools.push(a);
			var d = h.create("div", {
				className: "page hide",
				id: "page_" + a
			}, this.pPages);
			p(d, "keydown", s.hitch(this, function (o) {
				o.keyCode === m.ESCAPE && l.byId("close_" + a).click()
			}));
			var g = h.create("div", {
				className: "pageContent shadow",
				id: "pageContent_" + a,
				tabindex: "-1",
				role: "dialog",
				"aria-label": a,
				"aria-live": "polite"
			}, d);
			c.add(g, e);
			var u = h.create("header", {
				id: "pageHeader_" + a,
				"aria-labelledby": "pagetitle_" + a,
				className: "pageHeader bg"
			}, g);
			return h.create("h3", {
				className: "pageTitle fc",
				innerHTML: this.config.i18n.tooltips[a] || a,
				"aria-label": a,
				id: "pagetitle_" + a
			}, u), h.create("div", {
				className: "pageHeaderImg",
				title: this.config.i18n.tooltips[a] || a,
				role: "presentation",
				innerHTML: "<span aria-hidden=true class='pageIcon icon-color icon-" + a + "'></span>"
			}, u), h.create("div", {
				className: "pageBody",
				tabindex: "0",
				title: this.config.i18n.tooltips[a] || a,
				id: "pageBody_" + a
			}, g)
		},
		updatePageNavigation: function () {
			for (var o = 0; o < this.tools.length; o++) {
				var e = this.tools[o],
					t = h.create("button", {
						className: "pageNav pageClose",
						role: "button",
						name: e,
						id: "close_" + e,
						"aria-label": this.config.i18n.nav.close + " " + e,
						title: this.config.i18n.nav.close + " " + e
					}, "pageHeader_" + e);
				"black" === this.config.icons && c.add(t, "icons-dark"), p(t, "click, keypress", s.hitch(this, this.closePage));
				var a = h.create("button", {
					className: "pageNav pageUp",
					role: "button",
					"aria-label": this.config.i18n.nav.previous,
					title: this.config.i18n.nav.previous
				}, "pageHeader_" + e);
				if ("black" === this.config.icons && c.add(a, "icons-dark"), p(a, "click, keypress", s.hitch(this, this._showPreviousPage, e)), e != this.tools[this.tools.length - 1]) {
					var i = h.create("button", {
						className: "pageNav pageDown",
						role: "button",
						"aria-label": this.config.i18n.nav.next,
						title: this.config.i18n.nav.next
					}, "pageHeader_" + e);
					"black" === this.config.icons && c.add(i, "icons-dark"), p(i, "click, keypress", s.hitch(this, this._showNextPage, e))
				}
			}
		},
		setContent: function (o, e) {
			h.place(e, "pageBody_" + o, "last")
		},
		activateTool: function (o) {
			var e = this._getPageNum(o);
			this._goToPage(e)
		},
		_toolClick: function (o) {
			this.activateTool(o)
		},
		_getPageNum: function (o) {
			for (var e = 0; e < this.tools.length; e++)
				if (this.tools[e] == o) return e;
			return 0
		},
		_goToPage: function (o) {
			f(".page").addClass("hide"), f("#page_" + this.tools[o]).removeClass("hide"), this._updateMap(), this.curTool = o, this._updateTool(o)
		},
		_showPreviousPage: function (o) {
			var e = this._getPageNum(o) - 1;
			this._goToPage(e)
		},
		_showNextPage: function (o) {
			var e = this._getPageNum(o) + 1;
			this._goToPage(e)
		},
		closePage: function (o) {
			if (this._goToPage(-1), o && o.target && o.target.name) {
				var e = l.byId("panelTool_" + o.target.name);
				e && v.focus(e)
			}
		},
		_updateTool: function (o) {
			f(".panelTool").forEach(function (o) {
				c.remove(o, "panelToolActive")
			});
			var e = this.tools[o];
			if (e) {
				var t = l.byId("panelTool_" + e);
				c.add(t, "panelToolActive"), v.focus(t)
			}
			this.emit("updateTool", e)
		},
		_updateMap: function () {
			this.map && (this.map.resize(), this.map.reposition())
		}
	})
});
