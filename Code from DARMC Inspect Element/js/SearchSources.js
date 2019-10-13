

define(["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/json", "dojo/dom-construct", "esri/lang", "esri/tasks/locator", "esri/layers/FeatureLayer", "esri/dijit/Search"], function (e, r, t, i, a, s, o, c, n) {
	return e(null, {
		constructor: function (e) {
			var t = {
				sources: [],
				map: null,
				useMapExtent: !1,
				geocoders: [],
				esriSource: null,
				itemData: null,
				configuredSearchLayers: []
			};
			r.mixin(this, t, e)
		},
		createOptions: function () {
			return {
				map: this.map,
				sources: this._createSources(),
				activeSourceIndex: this._getActiveSource()
			}
		},
		_createSources: function () {
			return this.applicationConfiguredSources ? this._createAppConfigSources() : (this._createHelperServiceSources(), this.itemData && this._createWebMapItemSources(), this.configuredSearchLayers.length > 0 && this._createConfiguredSources()), this.sources
		},
		_getActiveSource: function () {
			var e = 0;
			return this.sources && this.sources.length > 1 && (e = "all"), t.some(this.sources, function (r, t) {
				if (!r.hasEsri && r.featureLayer) return e = t, !0
			}), e
		},
		_createHelperServiceSources: function () {
			var e = r.clone(this.geocoders);
			t.forEach(e, r.hitch(this, function (e) {
				if (e.url.indexOf(".arcgis.com/arcgis/rest/services/World/GeocodeServer") > -1) {
					var r = new n,
						t = r.defaultSource;
					t.hasEsri = !0, e.name && (t.name = e.name), this.useMapExtent && (t.searchExtent = this.map.extent), this.sources.push(t), r.destroy()
				} else s.isDefined(e.singleLineFieldName) && (e.locator = new o(e.url), this.sources.push(e))
			}))
		},
		_createWebMapItemSources: function () {
			if (this.itemData && this.itemData.applicationProperties && this.itemData.applicationProperties.viewing && this.itemData.applicationProperties.viewing.search) {
				var e = this.itemData.applicationProperties.viewing.search;
				t.forEach(e.layers, r.hitch(this, function (r) {
					var i = this.itemData.operationalLayers,
						a = null;
					if (t.some(i, function (e) {
							if (e.id === r.id) return a = e, !0
						}), a && a.hasOwnProperty("url")) {
						var o = {},
							n = a.url,
							u = a.title || a.name;
						s.isDefined(r.subLayer) && (n = n + "/" + r.subLayer, t.some(a.layerObject.layerInfos, function (e) {
							if (e.id === r.subLayer) return u += " - " + a.layerObject.layerInfos[r.subLayer].name, !0
						}));
						var l = this.map.getLayer(a.id);
						!l || "Feature Layer" !== l.type && "FeatureLayer" !== l.type ? o.featureLayer = new c(n, {
							outFields: ["*"]
						}) : (o.featureLayer = l, l.infoTemplate && (o.infoTemplate = l.infoTemplate)), o.name = u, o.exactMatch = r.field.exactMatch, o.searchFields = [r.field.name], o.displayField = r.field.name, o.outFields = ["*"], o.placeholder = e.hintText, this.sources.push(o)
					}
				}))
			}
		},
		_createAppConfigSources: function () {
			var e = r.clone(this.applicationConfiguredSources);
			t.forEach(e, r.hitch(this, function (e) {
				if (e.locator) e.locator = new o(e.url);
				else {
					var r = null;
					e.flayerId && (r = this.map.getLayer(e.flayerId)) && "Feature Layer" !== r.type && (r = null), !r && e.url && (r = new c(e.url, {
						outFields: ["*"]
					})), e.searchFields && 0 === e.searchFields.length && r && r.displayField && (e.searchFields = [r.displayField]), e.featureLayer = r, e.featureLayer && e.featureLayer.infoTemplate && (e.infoTemplate = e.featureLayer.infoTemplate)
				}
				e.searchWithinMap && (e.searchExtent = this.map.extent), this.sources.push(e)
			}))
		},
		_createConfiguredSources: function () {
			t.forEach(this.configuredSearchLayers, r.hitch(this, function (e) {
				var r = this.map.getLayer(e.id);
				if (r) {
					var t = {};
					t.featureLayer = r, e.fields && e.fields.length && e.fields.length > 0 && (t.searchFields = e.fields, t.displayField = e.fields[0], t.outFields = ["*"], this.sources.push(t))
				}
			}))
		}
	})
});
