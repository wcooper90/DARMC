

define(["dojo/ready", "dojo/json", "dojo/i18n!esri/nls/jsapi", "dojo/_base/array", "dojo/_base/Color", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/kernel", "dojo/dom", "dojo/dom-geometry", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-style", "dojo/on", "dojo/Deferred", "dojo/promise/all", "dojo/query", "dijit/registry", "dijit/focus", "dijit/a11y", "application/toolbar", "application/has-config", "application/MapUrlParams", "esri/arcgis/utils", "esri/lang", "esri/urlUtils", "esri/layers/FeatureLayer", "esri/tasks/query", "esri/dijit/HomeButton", "esri/dijit/LocateButton", "esri/dijit/Legend", "esri/dijit/BasemapGallery", "esri/dijit/Measurement", "esri/dijit/OverviewMap", "esri/dijit/LayerList"], function (e, t, i, o, a, n, r, s, l, c, h, d, p, u, f, g, m, b, v, y, w, k, L, _, T, C, S, x, I) {
	return n(null, {
		config: {},
		color: null,
		theme: null,
		map: null,
		mapExt: null,
		editorDiv: null,
		editor: null,
		editableLayers: null,
		focusHandle: null,
		blurHandle: null,
		extentHandle: null,
		shareDialog: null,
		once: !0,
		timeFormats: ["shortDateShortTime", "shortDateLEShortTime", "shortDateShortTime24", "shortDateLEShortTime24", "shortDateLongTime", "shortDateLELongTime", "shortDateLongTime24", "shortDateLELongTime24"],
		startup: function (t) {
			if (document.documentElement.lang = s.locale, t) {
				if (this.config = t, this.config.sharedThemeConfig && this.config.sharedThemeConfig.attributes && this.config.sharedThemeConfig.attributes.theme) {
					var i = this.config.sharedThemeConfig.attributes;
					this.config.logo = i.layout.header.component.settings.logoUrl || i.theme.logo.small || null, this.config.color = i.theme.text.color, this.config.theme = i.theme.body.bg
				}
				this.color = this._setColor(this.config.color), this.theme = this._setColor(this.config.theme), this.iconColor = this._setColor(this.config.iconColor), this.panelBackground = this._setColor(this.config.panelBackground), this.panelColor = this._setColor(this.config.panelColor);
				var o = document.createElement("link");
				if (o.setAttribute("rel", "stylesheet"), o.setAttribute("type", "text/css"), o.setAttribute("href", "css/theme/" + this.config.customLayout + ".css"), document.head.appendChild(o), this.config.customstyle) {
					var a = document.createElement("style");
					a.appendChild(document.createTextNode(this.config.customstyle)), document.head.appendChild(a)
				}
				e(r.hitch(this, function () {
					var e = this.config.itemInfo || this.config.webmap;
					new _({
						center: this.config.center || null,
						extent: this.config.extent || null,
						level: this.config.level || null,
						marker: this.config.marker || null,
						mapSpatialReference: e.itemData.spatialReference,
						defaultMarkerSymbol: this.config.markerSymbol,
						defaultMarkerSymbolWidth: this.config.markerSymbolWidth,
						defaultMarkerSymbolHeight: this.config.markerSymbolHeight,
						geometryService: this.config.helperServices.geometry.url
					}).processUrlParams().then(r.hitch(this, function (t) {
						this.config.showSlider || (t.mapOptions.slider = !1), this._createWebMap(e, t)
					}), r.hitch(this, function (e) {
						this.reportError(e)
					}))
				}))
			} else {
				var n = new Error("Main:: Config is not defined");
				this.reportError(n)
			}
		},
		reportError: function (e) {
			d.remove(document.body, "app-loading"), d.add(document.body, "app-error");
			var t = l.byId("loading_message");
			t && (this.config && this.config.i18n ? t.innerHTML = this.config.i18n.map.error + ": " + e.message : t.innerHTML = "Unable to create map: " + e.message)
		},
		_mapLoaded: function () {
			b(".esriSimpleSlider").style("backgroundColor", this.theme.toString()), d.remove(document.body, "app-loading"), this.config.popupPanel || (f(window, "orientationchange", r.hitch(this, this._adjustPopupSize)), this._adjustPopupSize())
		},
		_createUI: function () {
			u.set("panelPages", "visibility", "hidden");
			var e = new k(this.config);
			e.startup().then(r.hitch(this, function () {
				e.map = this.map, this.config.popupPanel && require(["application/PopupPanel"], r.hitch(this, function (t) {
					this.map.infoWindow.set("popupWindow", !1), new t({
						popup: this.map.infoWindow,
						srcNode: "popupContainer",
						toolbar: e
					}).initPopup()
				}));
				for (var t = [], i = 0; i < this.config.tools.length; i++) switch (this.config.tools[i].name) {
					case "legend":
						t.push(this._addLegend(this.config.tools[i], e, "medium"));
						break;
					case "bookmarks":
						t.push(this._addBookmarks(this.config.tools[i], e, "medium"));
						break;
					case "layers":
						t.push(this._addLayers(this.config.tools[i], e, "medium"));
						break;
					case "basemap":
						t.push(this._addBasemapGallery(this.config.tools[i], e, "large"));
						break;
					case "overview":
						t.push(this._addOverviewMap(this.config.tools[i], e, "medium"));
						break;
					case "measure":
						t.push(this._addMeasure(this.config.tools[i], e, "small"));
						break;
					case "edit":
						t.push(this._addEditor(this.config.tools[i], e, "medium"));
						break;
					case "print":
						t.push(this._addPrint(this.config.tools[i], e, "small"));
						break;
					case "details":
						t.push(this._addDetails(this.config.tools[i], e, "medium"));
						break;
					case "share":
						t.push(this._addShare(this.config.tools[i], e, "medium"))
				}
				m(t).then(r.hitch(this, function (t) {
					if (this._showSplashScreen(e), !o.some(t, function (e) {
							return e
						})) return d.add(document.body, "notools"), p.destroy("panelTools"), u.set("panelContent", "display", "none"), u.set("panelTitle", "border-bottom", "none"), u.set("panelTop", "height", "75px"), void u.set("panelTitle", "margin-top", "12px");
					if (f(e, "updateTool", r.hitch(this, this._updateTool)), u.set("panelPages", "visibility", "visible"), "sidebartools" === this.config.customLayout && e.pTools.children.length && e.pTools.children.length > 0) {
						var i = 30 * e.pTools.children.length;
						u.set("panelTools", "height", i + "px")
					}
					this.updateAriaInfo(), e.updatePageNavigation()
				}))
			}))
		},
		_updateTool: function (e) {
			if ("measure" === e) this._destroyEditor(), this.map.setInfoWindowOnClick(!1);
			else if ("edit" === e) {
				this._destroyEditor(), this.map.setInfoWindowOnClick(!1), this.map.infoWindow.clearFeatures(), this._createEditor();
				var t = l.byId("page_edit");
				t && d.remove(t, "hide")
			} else this._destroyEditor(), this.map.setInfoWindowOnClick(!0);
			if ("share" === e ? this.shareDialog && (this.shareDialog.updateUrl(), this.extentHandle ? this.extentHandle.resume() : this.extentHandle = f.pausable(this.map, "extent-change", r.hitch(this, function () {
					this.shareDialog.useExtent && this.shareDialog.updateUrl()
				}))) : this.extentHandle && this.extentHandle.pause(), L("measure") && "measure" !== e && b(".esriMeasurement").forEach(r.hitch(this, function (e) {
					var t = v.byId(e.id);
					t && (t.clearResult(), t.setTool("location", !1), t.setTool("area", !1), t.setTool("distance", !1))
				})), ("default" === this.config.customLayout || "rounded" === this.config.customLayout) && this.once) {
				this.once = !1;
				var i = l.byId("panelContent"),
					o = c.getContentBox(l.byId("panelTop")),
					a = c.getContentBox(l.byId("mapDiv"));
				if (a.w && o.w) {
					a.w - o.w < 350 ? u.set(i, "top", "90px") : u.set(i, "top", "10px")
				}
			}
		},
		_setActiveTool: function (e) {
			if (this.config.activeTool && "" !== this.config.activeTool) this.config.activeTool && (b(".pressed").forEach(function (e) {
				y.focus(e)
			}), e.activateTool(this.config.activeTool), this._updateTool(this.config.activeTool));
			else if (e.pTools && e.pTools.children && e.pTools.children.length && e.pTools.children.length > 0) {
				var t = l.byId(e.pTools.children[0].id);
				h.set(t, "tabindex", "0"), this.config.activeTool = t.name || ""
			}
		},
		_showSplashScreen: function (e) {
			if (this.config.splashModal) {
				d.add(document.body, "noscroll"), d.remove("modal", "hide"), h.set("modal", "aria-label", this.config.splashTitle || "Splash Screen");
				var t = l.byId("modal"),
					i = l.byId("closeOverlay");
				y.focus(t);
				var o = this.config.splashTitle || "",
					a = this.config.splashContent || "";
				l.byId("modalTitle").innerHTML = o, l.byId("modalContent").innerHTML = a, i.value = this.config.splashButtonText || this.config.i18n.nav.close, f(i, "click", r.hitch(this, function () {
					this._setActiveTool(e), d.remove(document.body, "noscroll"), d.add("modal", "hide")
				}))
			} else this._setActiveTool(e)
		},
		_addBasemapGallery: function (e, t, i) {
			var o = new g;
			return L("basemap") ? require(["esri/dijit/BasemapGallery"], r.hitch(this, function (a) {
				var n = t.createTool(e, i);
				new a({
					id: "basemapGallery",
					bingMapsKey: this.config.orgInfo.bingKey || "",
					map: this.map,
					showArcGISBasemaps: !0,
					portalUrl: this.config.sharinghost,
					basemapsGroup: this._getBasemapGroup()
				}, p.create("div", {}, n)).startup(), o.resolve(!0)
			})) : o.resolve(!1), o.promise
		},
		_addBookmarks: function (e, t, i) {
			var o = new g;
			return this.config.response.itemInfo.itemData.bookmarks ? require(["application/has-config!bookmarks?esri/dijit/Bookmarks"], r.hitch(this, function (a) {
				if (!a) return void o.resolve(!1);
				var n = t.createTool(e, i);
				new a({
					map: this.map,
					bookmarks: this.config.response.itemInfo.itemData.bookmarks
				}, p.create("div", {}, n)).startup(), o.resolve(!0)
			})) : o.resolve(!1), o.promise
		},
		_addDetails: function (e, t, i) {
			var o = new g;
			if (L("details")) {
				var a = this.config.description || this.config.response.itemInfo.item.description || this.config.response.itemInfo.item.snippet;
				if (a) {
					var n = a.length;
					i = n < 200 ? "small" : n < 400 ? "medium" : "large";
					var r = C.stripTags(a),
						s = t.createTool(e, i);
					h.set(s, "aria-label", r), s.innerHTML = "<div class='desc' tabindex='0'>" + a + "</div>"
				}
				o.resolve(!0)
			} else o.resolve(!1);
			return o.promise
		},
		_addEditor: function (e, t, i) {
			var o = new g;
			return this.editableLayers = this._getEditableLayers(this.config.response.itemInfo.itemData.operationalLayers), L("edit") && this.editableLayers.length > 0 && this.editableLayers.length > 0 ? (this.editorDiv = t.createTool(e, i), this._setupEditablePopup(), o.resolve(!0)) : o.resolve(!1), o.promise
		},
		_setupEditablePopup: function () {
			function e(e) {
				if (e) return "polygon" === e.type ? e.getCentroid() : "extent" === e.type ? e.getCenter() : "point" === e.type ? e : "polyline" === e.type ? e.getPoint(0, 0) : "multipoint" === e.type ? e.getPoint(0) : void 0
			}
			var t = p.create("a", {
				class: "action edit",
				id: "editLink",
				innerHTML: this.config.i18n.tooltips.edit,
				href: "javascript: void(0);"
			}, b(".actionList", this.map.infoWindow.domNode)[0]);
			f(t, "click", r.hitch(this, function () {
				var i = this.map.infoWindow.getSelectedFeature();
				this.map.infoWindow.hide(), this._createEditor().then(r.hitch(this, function () {
					if (l.byId("panelTool_edit").click(), i && i._layer) {
						u.set(t, "visibility", "hidden");
						var o = i.attributes[i._layer.objectIdField],
							a = new I;
						a.objectIds = [o], i._layer.selectFeatures(a).then(r.hitch(this, function (t) {
							this.editor._currentGraphic = i, this.editor._activateEditToolbar(i), this.editor.attributeInspector.showFeature(i, i._layer);
							var o = e(i.geometry);
							this.map.infoWindow.show(o)
						}))
					}
				}))
			})), f(this.map.infoWindow, "show", r.hitch(this, function () {})), f(this.map.infoWindow, "selection-change", r.hitch(this, function () {
				this._updateLink(t)
			}))
		},
		_updateLink: function (e) {
			var t = this.map.infoWindow.getSelectedFeature(),
				i = !1;
			b(".esriAttributeInspector").forEach(function (e) {
				i = !0
			}), t && t._layer && "function" == typeof t._layer.isEditable && t._layer.isEditable() && !i ? u.set(e, "visibility", "visible") : u.set(e, "visibility", "hidden")
		},
		_createEditor: function () {
			var e = new g;
			return require(["application/has-config!edit?esri/dijit/editing/Editor"], r.hitch(this, function (t) {
				if (!t) return void e.resolve(!1);
				this._destroyEditor();
				var i = [];
				o.forEach(this.editableLayers, r.hitch(this, function (e) {
					if (e.featureLayer && e.featureLayer.infoTemplate && e.featureLayer.infoTemplate.info && e.featureLayer.infoTemplate.info.fieldInfos && e.featureLayer.visible) {
						i.push(e);
						var t = e.featureLayer.infoTemplate.info.fieldInfos,
							a = [];
						o.forEach(t, r.hitch(this, function (e) {
							e.format && e.format.dateFormat && o.indexOf(this.timeFormats, e.format.dateFormat) > -1 && (e.format = {
								time: !0
							}), e.visible && a.push(e)
						})), e.fieldInfos = a
					}
				}));
				var a = {
					map: this.map,
					layerInfos: i,
					toolbarVisible: L("edit-toolbar")
				};
				this.map.enableSnapping();
				var n = l.byId("page_edit");
				n && d.remove(n, "hide"), null === this.editor ? (this.editor = new t({
					settings: a
				}, p.create("div", {}, this.editorDiv)), this.editor.on("load", r.hitch(this, function () {
					L("edit-toolbar") && b(".templatePicker").addClass("templatePicker-toolbar")
				}), function (t) {
					n && d.add(n, "hide"), e.resolve(!0)
				}), this.editor.startup(), e.resolve(!0)) : e.resolve(!0)
			})), e.promise
		},
		_destroyEditor: function () {
			this.editor && (this.editor.destroy(), this.editor = null)
		},
		_addLayers: function (e, t, i) {
			var o = new g,
				a = this.config.response.itemInfo.itemData.operationalLayers;
			return 0 === a.length ? o.resolve(!1) : L("layers") ? require(["esri/dijit/LayerList"], r.hitch(this, function (n) {
				i = a.length < 5 ? "small" : a.length < 15 ? "medium" : "large";
				var s = t.createTool(e, i),
					l = new n({
						map: this.map,
						showSubLayers: L("layers-sublayers"),
						subLayers: L("layers-sublayers"),
						showLegend: L("layers-legend"),
						showOpacitySlider: L("layers-opacity"),
						layers: T.getLayerList(this.config.response)
					}, p.create("div", {}, s));
				l.startup(), l.on("toggle", r.hitch(this, function () {
					var e = v.byId("mapLegend");
					e && e.refresh()
				})), o.resolve(!0)
			})) : o.resolve(!1), o.promise
		},
		_addLegend: function (e, t, i) {
			var o = new g,
				a = T.getLegendLayers(this.config.response);
			return 0 === a.length ? o.resolve(!1) : L("legend") ? require(["esri/dijit/Legend"], r.hitch(this, function (n) {
				var r = t.createTool(e, i);
				h.set(r, "tabindex", 0);
				var s = new n({
					map: this.map,
					id: "mapLegend",
					layerInfos: a
				}, p.create("div", {}, r));
				d.add(s.domNode, "legend"), s.startup(), o.resolve(!0)
			})) : o.resolve(!1), o.promise
		},
		_addMeasure: function (e, t, i) {
			var o = new g;
			return L("measure") ? require(["esri/dijit/Measurement"], r.hitch(this, function (a) {
				var n = t.createTool(e, i);
				h.set(n, "tabindex", "0");
				var r = "metric" === this.config.units ? "esriSquareKilometers" : "esriSquareMiles",
					s = "metric" === this.config.units ? "esriKilometers" : "esriMiles";
				new a({
					map: this.map,
					defaultAreaUnit: r,
					defaultLengthUnit: s
				}, p.create("div", {}, n)).startup(), b(".esriMeasurement .dijitButtonNode").forEach(function (e) {
					h.set(e, "tabindex", "0"), h.set(e, "role", "button")
				}), b(".esriMeasurement .dijitButtonNode .dijitButtonContents").forEach(function (e) {
					h.set(e, "tabindex", "-1")
				}), o.resolve(!0)
			})) : o.resolve(!1), o.promise
		},
		_addOverviewMap: function (e, t, i) {
			var o = new g;
			return L("overview") ? require(["esri/dijit/OverviewMap"], r.hitch(this, function (a) {
				var n = t.createTool(e, i);
				u.set(n, {
					height: "100%",
					width: "100%"
				}), h.set("pageBody_overview", "tabindex", "-1"), f.once(l.byId("panelTool_overview"), "focus", r.hitch(this, function () {
					new a({
						id: "overviewMap",
						map: this.map,
						height: "auto"
					}, p.create("div", {}, n)).startup(), b(".ovwHighlight").forEach(function (e) {
						h.set(e, "tabindex", "0"), h.set(e, "aria-label", this.config.i18n.map.overviewDetails)
					})
				})), f(this.map, "layer-add", r.hitch(this, function (e) {
					if (e.layer.hasOwnProperty("_basemapGalleryLayerType") && "basemap" === e.layer._basemapGalleryLayerType) {
						var t = v.byId("overviewMap");
						t && t.destroy(), f.once(l.byId("panelTool_overview"), "focus", r.hitch(this, function () {
							new a({
								id: "overviewMap",
								map: this.map,
								visible: !1
							}, p.create("div", {}, n)).startup()
						}))
					}
				})), o.resolve(!0)
			})) : o.resolve(!1), o.promise
		},
		_addPrint: function (e, t, a) {
			var n = new g;
			return require(["application/has-config!print?application/PrintConfig", "application/has-config!print?esri/dijit/Print"], r.hitch(this, function (s, c) {
				if (!s || !c) return void n.resolve(!1);
				var h = t.createTool(e, a),
					d = null;
				o.forEach(this.config.tools, function (e) {
					"print" === e.name && (d = e.format)
				}), this.config.hasOwnProperty("tool_print_format") && (d = this.config.tool_print_format);
				var g = {
						titleText: this.config.title,
						scalebarUnit: this.config.units,
						legendLayers: []
					},
					m = {
						legendLayers: this.config.response,
						layouts: L("print-layouts"),
						format: d.toLowerCase() || null,
						printTaskUrl: this.config.helperServices.printTask.url,
						printi18n: this.config.i18n.tools.print,
						layoutOptions: g
					};
				this.config.helperServices.printTask && this.config.helperServices.printTask.templates && (m.templates = this.config.helperServices.printTask.templates), new s(m).createPrintOptions().then(r.hitch(this, function (e) {
					var t = e.templates,
						a = e.legendLayers,
						n = p.create("input", {
							id: "print_title",
							className: "printTitle",
							tabindex: "0",
							role: "textbox",
							type: "text",
							"aria-label": this.config.i18n.tools.print.titlePrompt,
							placeholder: this.config.i18n.tools.print.titlePrompt
						}, p.create("div"));
					if (p.place(n, h), L("print-legend")) {
						var s = p.create("input", {
								id: "legend_ck",
								role: "checkbox",
								tabindex: "0",
								className: "checkbox",
								type: "checkbox",
								checked: !1
							}, p.create("div", {
								class: "checkbox"
							})),
							d = p.create("label", {
								for: "legend_ck",
								className: "checkbox",
								innerHTML: "  " + this.config.i18n.tools.print.legend
							}, p.create("div"));
						p.place(s, h), p.place(d, h), f(s, "change", r.hitch(this, function (e) {
							s.checked && a.length > 0 ? g.legendLayers = a : g.legendLayers = [], o.forEach(this.print.templates, r.hitch(this, function (e) {
								e.layoutOptions = g
							}))
						}))
					} else u.set("pageBody_print", "height", "90px");
					var m = {
						map: this.map,
						id: "printButton",
						url: this.config.helperServices.printTask.url
					};
					t && (m.templates = t), i.widgets.print.NLS_printing = i.widgets.print.NLS_printing + "<img class='loadPrint' src='./images/loading-small.png'/> ", this.print = new c(m, p.create("div")), p.place(this.print.printDomNode, h, "last"), this.print.on("print-start", r.hitch(this, function () {
						var e = l.byId("print_title");
						e.value && o.forEach(this.print.templates, r.hitch(this, function (t) {
							t.layoutOptions.titleText = e.value
						}))
					})), this.print.startup()
				})), n.resolve(!0)
			})), n.promise
		},
		_addShare: function (e, t, i) {
			var o = new g;
			return L("share") ? require(["application/ShareDialog"], r.hitch(this, function (a) {
				var n = t.createTool(e, i);
				this.shareDialog = new a({
					bitlyLogin: this.config.bitlyLogin,
					bitlyKey: this.config.bitlyKey,
					map: this.map,
					embedVisible: L("share-embed"),
					image: this.config.sharinghost + "/sharing/rest/content/items/" + this.config.response.itemInfo.item.id + "/info/" + this.config.response.itemInfo.thumbnail,
					title: this.config.title,
					summary: this.config.response.itemInfo.item.snippet || ""
				}, n), d.add(this.shareDialog.domNode, "pageBody"), this.shareDialog.startup(), o.resolve(!0)
			})) : o.resolve(!1), o.promise
		},
		_getEditableLayers: function (e) {
			var t = [];
			return o.forEach(e, r.hitch(this, function (e) {
				if (e && e.layerObject) {
					var i = e.layerObject;
					i instanceof x && i.isEditable() && t.push({
						featureLayer: i
					})
				}
			})), t
		},
		_getBasemapGroup: function () {
			var e = null;
			return this.config.basemapgroup && this.config.basemapgroup.title && this.config.basemapgroup.owner ? e = {
				owner: this.config.basemapgroup.owner,
				title: this.config.basemapgroup.title
			} : this.config.basemapgroup && this.config.basemapgroup.id && (e = {
				id: this.config.basemapgroup.id
			}), e
		},
		_createMapUI: function () {
			this.config.showSlider ? require(["esri/dijit/HomeButton"], r.hitch(this, function (e) {
				new e({
					map: this.map
				}, p.create("div", {}, b(".esriSimpleSliderIncrementButton")[0], "after")).startup(), b(".home span").forEach(function (e) {
					h.set(e, {
						"aria-hidden": "true",
						role: "presentation"
					}), p.create("span", {
						className: "icon-home",
						"aria-label": i.widgets.homeButton.home.title || "Default map view"
					}, e, "after")
				}), b(".esriSimpleSlider").addClass("homeEnabled")
			})) : d.add(document.body, "noslider"), require(["application/has-config!scalebar?esri/dijit/Scalebar"], r.hitch(this, function (e) {
				if (e) {
					new e({
						map: this.map,
						scalebarUnit: this.config.units
					})
				}
			})), L("locate") && require(["esri/dijit/LocateButton"], r.hitch(this, function (e) {
				var t = new e({
					map: this.map,
					useTracking: this.config.locate_track
				}, "locateDiv");
				this.config.locate_scale && (t.scale = this.config.locate_scale), t.startup(), b(".LocateButton .zoomLocateButton").addClass("bg"), b(".LocateButton .zoomLocateButton").addClass("fc"), b(".zoomLocateButton span").forEach(function (e) {
					h.set(e, {
						"aria-hidden": "true",
						role: "presentation"
					}), p.create("span", {
						className: "icon-locate",
						"aria-label": i.widgets.locateButton.locate.title || "Find my location"
					}, e, "after")
				}), d.add(document.body, "haslocate")
			})), require(["application/has-config!search?esri/dijit/Search", "application/has-config!search?esri/tasks/locator", "application/has-config!search?application/SearchSources"], r.hitch(this, function (e, i, o) {
				if (!e && !i) return d.add(document.body, "no-search"), void d.add("panelTop", "no-search");
				var a = {
					map: this.map,
					useMapExtent: this.config.searchExtent,
					itemData: this.config.response.itemInfo.itemData
				};
				if (this.config.searchConfig) a.applicationConfiguredSources = this.config.searchConfig.sources || [];
				else {
					var n = this.config.searchLayers instanceof Array ? this.config.searchLayers : t.parse(this.config.searchLayers);
					a.configuredSearchLayers = n, a.geocoders = this.config.locationSearch ? this.config.helperServices.geocode : []
				}
				var s = new o(a),
					c = s.createOptions();
				if (null !== this.config.searchConfig && void 0 !== this.config.searchConfig && (null !== this.config.searchConfig.activeSourceIndex && void 0 !== this.config.searchConfig.activeSourceIndex && (c.activeSourceIndex = this.config.searchConfig.activeSourceIndex), c.enableSearchingAll = !1, this.config.searchConfig && this.config.searchConfig.enableSearchingAll && !0 === this.config.searchConfig.enableSearchingAll && (c.enableSearchingAll = !0)), s && s.sources && s.sources.length && s.sources.length > 0) {
					var h = new e(c, p.create("div", {
						id: "search"
					}, "mapDiv"));
					f(b(".arcgisSearch .searchBtn"), "click", function () {
						h.value || h.focus()
					}), this.map.width && this.map.width < 600 && this._enableButtonMode(h), f(this.map, "resize", r.hitch(this, function (e) {
						e && e.width && (e.width < 600 ? this._enableButtonMode(h) : this._disableButtonMode(h))
					})), h.on("select-result", r.hitch(this, function () {
						f.once(this.map.infoWindow, "hide", r.hitch(this, function () {
							h.clear(), this.editor && (this._destroyEditor(), this._createEditor())
						}))
					})), h.startup(), h && h.domNode && p.place(h.domNode, "panelGeocoder"), "black" === this.config.icons && (b(".arcgisSearch .searchIcon").style("color", "#000"), d.add(l.byId("search_input"), "dark"))
				} else console.log("No search sources are configured - Disable search")
			})), (this.config.find || null !== this.config.customUrlLayer.id && this.config.customUrlLayer.fields.length > 0 && null !== this.config.customUrlParam) && require(["esri/dijit/Search"], r.hitch(this, function (e) {
				var t = null,
					i = null,
					o = null,
					a = S.urlToObject(document.location.href);
				a.query = a.query || {}, a.query = C.stripTags(a.query);
				var n = null;
				for (var s in a.query) a.query.hasOwnProperty(s) && this.config.customUrlParam && s.toUpperCase() === this.config.customUrlParam.toUpperCase() && (n = s);
				if (this.config.find) i = decodeURIComponent(this.config.find);
				else if (n && (i = a.query[n], o = this.map.getLayer(this.config.customUrlLayer.id))) {
					var l = this.config.customUrlLayer.fields[0].fields;
					t = {
						exactMatch: !0,
						outFields: ["*"],
						featureLayer: o,
						displayField: l[0],
						searchFields: l
					}
				}
				var c = new e({
					map: this.map
				});
				t && c.set("sources", [t]), c.on("load", r.hitch(this, function () {
					c.search(i).then(r.hitch(this, function () {
						f.once(this.map.infoWindow, "hide", r.hitch(this, function () {
							c.destroy(), this.editor && (this._destroyEditor(), this._createEditor())
						}))
					}))
				})), c.startup()
			})), this._createUI()
		},
		_enableButtonMode: function (e) {
			e.set("enableButtonMode", !0), e.set("expanded", !1);
			var t = l.byId("panelText");
			this.blurHandle ? this.blurHandle.resume() : this.blurHandle = f.pausable(e, "blur", function () {
				d.remove(t, "hide")
			}), this.focusHandle ? this.focusHandle.resume() : this.focusHandle = f.pausable(e, "focus", function () {
				d.add(t, "hide")
			})
		},
		_disableButtonMode: function (e) {
			e.set("enableButtonMode", !1), this.blurHandle && this.blurHandle.pause(), this.focusHandle && this.focusHandle.pause()
		},
		_setColor: function (e) {
			var t, i = null;
			return e ? (t = a.fromHex(e).toRgb(), 8 == L("ie") ? i = e : (t.push(.9), i = a.fromArray(t))) : i = new a("transparent"), i
		},
		_updateTheme: function () {
			var e = {
					iconColor: this.iconColor.toString(),
					backgroundColor: this.theme.toString(),
					color: this.color.toString(),
					panelColor: this.panelColor.toString(),
					panelBackground: this.panelBackground.toString()
				},
				t = C.substitute(e, ".esriSimpleSlider{color:${iconColor};} .icon-color{color:${iconColor};}  .LocateButton .zoomLocateButton{color:${iconColor};background-color:${backgroundColor};} .searchIcon{color:${iconColor};} .pageNav{color:${iconColor};} .bg{background-color:${backgroundColor};} .esriPopup .pointer{background-color:${backgroundColor};} .esriPopup.light .titlePane, .esriPopup.dark .titlePane{ background-color:${backgroundColor}; color:${color};}  .esriPopup.light .titleButton, .esriPopup.dark .titleButton{color:${color};} .fc{color:${color};} .pageContent{background-color:${panelBackground};} .pageBody{ background: ${panelBackground}; color:${panelColor};}  .dijitTabPaneWrapper{background:${panelBackground};} .esriLayerList .esriTitle{background-color:${panelBackground};} .esriLayer{background-color:${panelBackground};}.esriLayerList .esriContainer{background-color:${panelBackground};} .esriLayerList .esriContainer{background-color:${panelBackground};} .esriLayerList .esriList{background-color:${panelBackground}; color:${panelColor};} #modal .copy{background-color:${panelBackground}; color:${panelColor};}   .templatePicker .grid .dojoxGridCell, .dojoxGridRow, .dojoxGridCelll, .templatePicker .grid .dojoxGridRowOdd, .templatePicker .grid .dojoxGridRowEven, .dojoxGridView, .templatePicker .dojoxGrid{ background-color:${panelBackground} !important; border:transparent;} "),
				i = document.createElement("style");
			i.appendChild(document.createTextNode(t)), document.head.appendChild(i)
		},
		_adjustPopupSize: function () {
			if (this.map) {
				var e = c.getContentBox(this.map.container),
					t = 270,
					i = 300,
					o = Math.round(.5 * e.w),
					a = Math.round(.35 * e.h);
				o < t && (t = o), a < i && (i = a), this.map.infoWindow.resize(t, i), f(this.map.infoWindow, "show", r.hitch(this, function () {
					d.add(document.body, "noscroll")
				})), f(this.map.infoWindow, "hide", r.hitch(this, function () {
					d.remove(document.body, "noscroll")
				}))
			}
		},
		_createWebMap: function (e, t) {
			window.config = this.config;
			var i = {
				mapOptions: t.mapOptions || {},
				editable: L("edit"),
				usePopupManager: !0,
				layerMixins: this.config.layerMixins,
				bingMapsKey: this.config.orgInfo.bingKey || ""
			};
			this.config.orgInfo && this.config.orgInfo.user && this.config.orgInfo.user.privileges && (i.privileges = this.config.orgInfo.user.privileges), T.createMap(e, "mapDiv", i).then(r.hitch(this, function (e) {
				if (this.map = e.map, d.add(this.map.infoWindow.domNode, "light"), "default" === this.config.customLayout || "rounded" === this.config.customLayout) {
					var i = l.byId("panelContent");
					f(window, "resize", r.hitch(this, function () {
						var e = c.getContentBox(l.byId("panelTop")),
							t = c.getContentBox(l.byId("mapDiv"));
						if (t.w && e.w) {
							t.w - e.w < 350 ? u.set(i, "top", "90px") : u.set(i, "top", "10px")
						}
					}))
				}
				if (this._updateTheme(), t.markerGraphic && require(["esri/layers/GraphicsLayer"], r.hitch(this, function (e) {
						var i = new e;
						this.map.addLayer(i), i.add(t.markerGraphic), t.markerGraphic.infoTemplate && (this.map.infoWindow.setFeatures([t.markerGraphic]), this.map.infoWindow.show(t.markerGraphic.geometry))
					})), this.config.logo) {
					var o;
					o = this.config.logolink ? "<a target='_blank' href='" + this.config.logolink + "'><img id='logo' role='presentation' src=" + this.config.logo + "></a>" : "<img id='logo' role='presentation' src=" + this.config.logo + ">", p.create("div", {
						id: "panelLogo",
						innerHTML: o
					}, l.byId("panelTitle"), "first"), d.add("panelTop", "largerTitle")
				}
				this.map = e.map;
				var a;
				a = null === this.config.title || "" === this.config.title ? e.itemInfo.item.title : this.config.title;
				var n = e.itemInfo.item.snippet || e.itemInfo.item.title;
				h.set(this.map.container, "aria-label", this.config.altMapText || C.stripTags(n)), h.set(this.map.container, "tabindex", "0");
				var s = l.byId("title");
				if (this.config.title = a, document.title = C.stripTags(a), s.innerHTML = a, s["aria-label"] = a, this.config.subtitle) {
					var g = l.byId("subtitle");
					g.innerHTML = this.config.subtitle, g["aria-label"] = this.config.subtitle
				} else u.set("subtitle", "display", "none"), d.add("title", "nosubtitle");
				this.config.response = e, this._createMapUI(), this.map.loaded ? this._mapLoaded() : f.once(this.map, "load", r.hitch(this, function () {
					this._mapLoaded()
				}))
			}), this.reportError)
		},
		updateAriaInfo: function () {
			b(".titleButton").forEach(function (e) {
				h.set(e, "role", "button"), h.set(e, "tabindex", "0")
			}), b(".titlePane div.title").forEach(function (e) {
				h.set(e, "tabindex", "0")
			})
		}
	})
});
