

define(["dojo/_base/declare", "dojo/Deferred", "dojo/promise/all", "dojo/_base/lang", "dojo/_base/array", "esri/arcgis/utils", "esri/lang", "esri/tasks/PrintTemplate", "esri/request"], function (t, i, e, n, r, a, o, s, l) {
	return t(null, {
		constructor: function (t) {
			n.mixin(this.printConfig, t)
		},
		printConfig: {
			templates: null,
			layouts: !1,
			legendLayers: [],
			printi18n: null,
			format: "pdf",
			printTaskUrl: null,
			layoutOptions: {
				titleText: null,
				scalebarUnit: null,
				legendLayers: []
			}
		},
		templates: [],
		legendLayers: [],
		createPrintOptions: function () {
			var t = new i;
			return e([this._buildPrintLayouts(), this._createPrintLegend()]).then(n.hitch(this, function (i) {
				t.resolve({
					templates: this.templates,
					legendLayers: this.legendLayers
				})
			})), t.promise
		},
		_createPrintLegend: function () {
			var t = new i,
				e = a.getLegendLayers(this.printConfig.legendLayers);
			return this.legendLayers = r.map(e, function (t) {
				return {
					layerId: t.layer.id
				}
			}), t.resolve(!0), t.promise
		},
		_buildPrintLayouts: function () {
			var t = new i;
			if (this.printConfig.templates) this.templates = this.printConfig.templates, r.forEach(this.templates, n.hitch(this, function (t) {
				"MAP_ONLY" === t.layout && (t.exportOptions = {
					width: 670,
					height: 500,
					dpi: 96
				}), t.layoutOptions = this.printConfig.layoutOptions
			})), t.resolve(!0);
			else if (this.printConfig.layouts) l({
				url: this.printConfig.printTaskUrl,
				content: {
					f: "json"
				},
				callbackParamName: "callback"
			}).then(n.hitch(this, function (i) {
				var e, a, o;
				if (e = r.filter(i.parameters, function (t, i) {
						return "Layout_Template" === t.name
					}), 0 === e.length) return void console.log('print service parameters name for templates must be "Layout_Template"');
				if (a = e[0].choiceList, (o = r.indexOf(a, "MAP_ONLY")) > -1) {
					var l = a.splice(o, o + 1)[0];
					a.push(l)
				}
				this.templates = r.map(a, n.hitch(this, function (t) {
					var i = new s;
					return i.layout = i.label = t, i.format = this.printConfig.format, i.layoutOptions = this.printConfig.layoutOptions, i
				})), t.resolve(!0)
			}));
			else {
				var e = new s;
				e.layout = "Letter ANSI A Landscape", e.layoutOptions = this.printConfig.layoutOptions, e.format = this.printConfig.format, e.label = this.printConfig.printi18n.layouts.label1 + " ( " + this.printConfig.format + " )";
				var a = new s;
				a.layout = "Letter ANSI A Portrait", a.layoutOptions = this.printConfig.layoutOptions, a.format = this.printConfig.format, a.label = this.printConfig.printi18n.layouts.label2 + " ( " + this.printConfig.format + " )";
				var o = new s;
				o.layout = "Letter ANSI A Landscape", o.layoutOptions = this.printConfig.layoutOptions, o.format = "png32", o.label = this.printConfig.printi18n.layouts.label3 + " ( image )";
				var p = new s;
				p.layout = "Letter ANSI A Portrait", p.layoutOptions = this.printConfig.layoutOptions, p.format = "png32", p.label = this.printConfig.printi18n.layouts.label4 + " ( image )", this.templates = [e, a, o, p], t.resolve(!0)
			}
			return t.promise
		}
	})
});
