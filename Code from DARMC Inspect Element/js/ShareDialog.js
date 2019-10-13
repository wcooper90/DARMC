

define(["dojo/Evented", "dojo/_base/declare", "dojo/_base/lang", "dojo/has", "esri/kernel", "esri/config", "dijit/_WidgetBase", "dijit/a11yclick", "dijit/_TemplatedMixin", "dojo/on", "dojo/dom", "dojo/query", "dojo/mouse", "dojo/Deferred", "dojo/text!application/dijit/templates/ShareDialog.html", "dojo/i18n!application/nls/ShareDialog", "dojo/dom-class", "dojo/dom-style", "dojo/dom-attr", "dojo/dom-construct", "dijit/Tooltip", "esri/request", "esri/geometry/webMercatorUtils", "esri/SpatialReference", "esri/tasks/ProjectParameters", "esri/urlUtils", "dijit/Dialog", "dojo/number", "dojo/_base/event", "dojo/domReady!"], function (e, t, i, s, o, h, n, a, r, l, d, c, u, m, g, p, b, _, x, w, f, y, U, v, S, j, k, E, z) {
	var C = t("esri.dijit.ShareDialog", [n, r, e], {
		templateString: g,
		options: {
			theme: "ShareDialog",
			dialog: null,
			useExtent: !0,
			embedVisible: !1,
			map: null,
			url: window.location.href,
			image: "",
			summary: "",
			hashtags: "",
			mailURL: "mailto:%20?subject={title}&body={summary}%20{url}",
			facebookURL: "https://www.facebook.com/sharer/sharer.php?u={url}",
			twitterURL: "https://twitter.com/intent/tweet?url={url}&text={title}&hashtags={hashtags}",
			bitlyAPI: "https://arcg.is/prod/shorten",
			embedSizes: [{
				width: "100%",
				height: "640px"
			}, {
				width: "100%",
				height: "480px"
			}, {
				width: "100%",
				height: "320px"
			}, {
				width: "800px",
				height: "600px"
			}, {
				width: "640px",
				height: "480px"
			}, {
				width: "480px",
				height: "320px"
			}]
		},
		constructor: function (e, t) {
			var s = i.mixin({}, this.options, e);
			this.domNode = t, this._i18n = p, this.set("theme", s.theme), this.set("url", s.url), this.set("visible", s.visible), this.set("dialog", s.dialog), this.set("embedSizes", s.embedSizes), this.set("embedHeight", s.embedHeight), this.set("embedWidth", s.embedWidth), this.set("mailURL", s.mailURL), this.set("facebookURL", s.facebookURL), this.set("twitterURL", s.twitterURL), this.set("bitlyAPI", s.bitlyAPI), this.set("image", s.image), this.set("title", s.title), this.set("summary", s.summary), this.set("hashtags", s.hashtags), this.set("useExtent", s.useExtent), this.watch("theme", this._updateThemeWatch), this.watch("url", this._updateUrl), this.watch("visible", this._visible), this.watch("embedSizes", this._setSizeOptions), this.watch("embed", this._updateEmbed), this.watch("bitlyUrl", this._updateBitlyUrl), this.watch("useExtent", this._useExtentChanged);
			var o = "embed-page";
			s.embedVisible || (o = "embed-page hide"), this.css = {
				container: "button-container",
				embed: o,
				button: "toggle-grey",
				buttonSelected: "toggle-grey-on",
				icon: "icon-share",
				linkIcon: "icon-link share-dialog-icon",
				facebookIcon: "icon-facebook-squared share-dialog-icon",
				twitterIcon: "icon-twitter share-dialog-icon",
				emailIcon: "icon-mail-alt share-dialog-icon",
				mapSizeLabel: "map-size-label",
				shareMapURL: "share-map-url",
				iconContainer: "icon-container",
				embedMapSizeDropDown: "embed-map-size-dropdown",
				shareDialogContent: "dialog-content",
				shareDialogSubHeader: "share-dialog-subheader",
				shareDialogTextarea: "share-dialog-textarea",
				shareDialogExtent: "share-dialog-extent",
				shareDialogExtentChk: "share-dialog-checkbox",
				mapSizeContainer: "map-size-container",
				embedMapSizeClear: "embed-map-size-clear",
				iconClear: "icon-clear"
			}
		},
		postCreate: function () {
			this.inherited(arguments), this._setExtentChecked(), this.own(l(this._extentInput, a, i.hitch(this, this._useExtentUpdate))), x.set("pageBody_share_extent_checkbox", "checked", !0), this._setupCopyHTML()
		},
		startup: function () {
			this._init()
		},
		destroy: function () {
			this.inherited(arguments)
		},
		_setExtentChecked: function () {
			x.set(this._extentInput, "checked", this.get("useExtent"))
		},
		_useExtentUpdate: function () {
			var e = x.get(this._extentInput, "checked");
			this.useExtent = e
		},
		useExtentChanged: function () {
			this.updateUrl()
		},
		_setSizeOptions: function () {
			if (this._comboBoxNode.innerHTML = "", this.get("embedSizes") && this.get("embedSizes").length)
				for (var e = 0; e < this.get("embedSizes").length; e++) {
					0 === e && (this.set("embedWidth", this.get("embedSizes")[e].width), this.set("embedHeight", this.get("embedSizes")[e].height));
					var t = w.create("option", {
						value: e,
						innerHTML: this.get("embedSizes")[e].width + " x " + this.get("embedSizes")[e].height
					});
					w.place(t, this._comboBoxNode, "last")
				}
		},
		updateUrl: function () {
			this._shortened = null, this.set("bitlyUrl", null);
			var e, t = this.get("map"),
				s = this.get("url"),
				o = j.urlToObject(window.location.href);
			o.query = o.query || {}, o.query.locale && delete o.query.locale, this._getProjectedExtent(t).then(i.hitch(this, function (t) {
				o.query.extent = t ? t.xmin.toFixed(4) + "," + t.ymin.toFixed(4) + "," + t.xmax.toFixed(4) + "," + t.ymax.toFixed(4) : null, s = window.location.protocol + "//" + window.location.host + window.location.pathname;
				for (var h in o.query) o.query[h] && (e ? s += "&" : (s += "?", e = !0), s += h + "=" + o.query[h]);
				this.url = s, this._setEmbedCode(), this._shareLink().then(i.hitch(this, function () {
					x.set(this._shareMapUrlText, "value", this.bitlyUrl)
				}))
			}))
		},
		_getProjectedExtent: function (e) {
			var t = new m;
			if (this.useExtent && e)
				if (e.geographicExtent) t.resolve(e.geographicExtent);
				else {
					var i = new v(4326);
					if (U.canProject(e.extent, i)) t.resolve(U.project(e.extent, i));
					else {
						var s = new S;
						s.geometries = [e.extent], s.outSR = i, h.defaults.geometryService.project(s).then(function (e) {
							e && e.length && e.length > 0 ? t.resolve(e[0]) : t.resolve()
						})
					}
				}
			else t.resolve();
			return t.promise
		},
		_init: function () {
			this._setSizeOptions();
			var e = new k({
				title: p.widgets.ShareDialog.title,
				draggable: !1
			}, w.create("div"));
			this.set("dialog", e), this.own(l(this._comboBoxNode, "change", i.hitch(this, function (e) {
				this.set("embedWidth", this.get("embedSizes")[parseInt(e.currentTarget.value, 10)].width), this.set("embedHeight", this.get("embedSizes")[parseInt(e.currentTarget.value, 10)].height), this._setEmbedCode()
			}))), this.own(l(this._facebookButton, a, i.hitch(this, function () {
				this._configureShareLink(this.get("facebookURL"))
			}))), this.own(l(this._twitterButton, a, i.hitch(this, function () {
				this._configureShareLink(this.get("twitterURL"))
			}))), this.own(l(this._emailButton, a, i.hitch(this, function () {
				this._configureShareLink(this.get("mailURL"), !0)
			}))), this.own(l(this._shareMapUrlText, a, i.hitch(this, function () {
				this._shareMapUrlText.setSelectionRange(0, 9999)
			}))), this.own(l(this._shareMapUrlText, "mouseup", function (e) {
				z.stop(e)
			})), this.own(l(this._embedNode, a, i.hitch(this, function () {
				this._embedNode.setSelectionRange(0, 9999)
			}))), this.own(l(this._embedNode, "mouseup", function (e) {
				z.stop(e)
			})), this.set("loaded", !0), this.emit("load", {})
		},
		_updateEmbed: function () {
			x.set(this._embedNode, "value", this.get("embed"))
		},
		_setEmbedCode: function () {
			var e = "<iframe width='" + this.get("embedWidth") + "' height='" + this.get("embedHeight") + "' src='" + this.get("url") + "' frameborder='0' scrolling='no'></iframe>";
			this.set("embed", e)
		},
		_updateBitlyUrl: function () {
			var e = this.get("bitlyUrl");
			e && x.set(this._shareMapUrlText, "value", e)
		},
		_shareLink: function () {
			var e = new m,
				t = this.get("url");
			return this._shortened = t, y({
				url: this.get("bitlyAPI"),
				callbackParamName: "callback",
				content: {
					longUrl: t,
					f: "json"
				},
				load: i.hitch(this, function (t) {
					t && t.data && t.data.url ? (this.set("bitlyUrl", t.data.url), this._shareMapUrlText.select(), e.resolve()) : e.resolve(null)
				}),
				error: function (t) {
					e.resolve(null), console.log(t)
				}
			}), e.promise
		},
		_configureShareLink: function (e, t) {
			var s = i.replace(e, {
				url: encodeURIComponent(this.get("bitlyUrl") ? this.get("bitlyUrl") : this.get("url")),
				image: encodeURIComponent(this.get("image")),
				title: encodeURIComponent(this.get("title")),
				summary: encodeURIComponent(this.get("summary")),
				hashtags: encodeURIComponent(this.get("hashtags"))
			});
			if (t) window.location.href = s;
			else {
				var o = screen.width / 2 - 325,
					h = screen.height / 2 - 200;
				window.open(s, "share", "width=650,height=400,top=" + h + ",left=" + o, !0)
			}
		},
		_setupCopyHTML: function () {
			document.queryCommandSupported("copy") || x(this._shareButton, "disabled", !0), this.own(l(this._shareButton, a, i.hitch(this, function () {
				try {
					this._shareMapUrlText.select(), document.execCommand("copy"), f.show(this._i18n.widgets.ShareDialog.copied, this._shareButton)
				} catch (e) {
					console.log("Copy to clipboard not supported")
				}
				l.once(this._shareButton, u.leave, i.hitch(this, function () {
					this._shareMapUrlText.blur(), f.hide(this._shareButton)
				}))
			})))
		}
	});
	return s("extend-esri") && i.setObject("dijit.ShareDialog", C, o), C
});
