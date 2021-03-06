

define(["dojo/has", "esri/lang", "dojo/_base/array"], function (o, n, r) {
	var e = function (o, n) {
		for (var r = !1, e = 0; e < n.tools.length; e++)
			if (n.tools[e].name === o) {
				r = n.tools[e].enabled;
				break
			}
		return r
	};
	return o.add("search", function (o) {
		var n = o.config.search || !1;
		return o.config.hasOwnProperty("tool_search") && (n = o.config.tool_search), n
	}), o.add("basemap", function (o) {
		var n = e("basemap", o.config);
		return o.config.hasOwnProperty("tool_basemap") && (n = o.config.tool_basemap), n
	}), o.add("bookmarks", function (o) {
		var n = e("bookmarks", o.config);
		return o.config.hasOwnProperty("tool_bookmarks") && (n = o.config.tool_bookmarks), n
	}), o.add("details", function (o) {
		var n = e("details", o.config);
		return o.config.hasOwnProperty("tool_details") && (n = o.config.tool_details), n
	}), o.add("edit", function (o) {
		var t = e("edit", o.config);
		return o.config.hasOwnProperty("tool_edit") && (t = o.config.tool_edit), n.isDefined(o.config.userPrivileges) && -1 === r.indexOf(o.config.userPrivileges, "features:user:edit") && (t = !1), t
	}), o.add("edit-toolbar", function (o) {
		for (var n = !1, r = 0; r < o.config.tools.length; r++)
			if ("edit" === o.config.tools[r].name) {
				n = o.config.tools[r].toolbar;
				break
			}
		return o.config.hasOwnProperty("tool_edit_toolbar") && (n = o.config.tool_edit_toolbar), n
	}), o.add("scalebar", function (o) {
		var n = o.config.scalebar || !1;
		return o.config.hasOwnProperty("scalebar") && (n = o.config.scalebar), n
	}), o.add("home", function (o) {
		var n = o.config.home || !1;
		return o.config.hasOwnProperty("tool_home") && (n = o.config.tool_home), n
	}), o.add("layers", function (o) {
		var n = e("layers", o.config);
		return o.config.hasOwnProperty("tool_layers") && (n = o.config.tool_layers), n
	}), o.add("layers-sublayers", function (o) {
		for (var n = !1, r = 0; r < o.config.tools.length; r++)
			if ("layers" === o.config.tools[r].name) {
				n = o.config.tools[r].sublayers;
				break
			}
		return o.config.hasOwnProperty("tool_sublayers") && (n = o.config.tool_sublayers), n
	}), o.add("layers-legend", function (o) {
		for (var n = !1, r = 0; r < o.config.tools.length; r++)
			if ("layers" === o.config.tools[r].name) {
				n = o.config.tools[r].legend;
				break
			}
		return o.config.hasOwnProperty("tool_layerlegend") && (n = o.config.tool_layerlegend), n
	}), o.add("layers-opacity", function (o) {
		for (var n = !1, r = 0; r < o.config.tools.length; r++)
			if ("layers" === o.config.tools[r].name) {
				n = o.config.tools[r].opacityslider;
				break
			}
		return o.config.hasOwnProperty("tool_opacity") && (n = o.config.tool_opacity), n
	}), o.add("legend", function (o) {
		var n = e("legend", o.config);
		return o.config.hasOwnProperty("tool_legend") && (n = o.config.tool_legend), n
	}), o.add("locate", function (n) {
		var r = o("native-gelocation");
		return r && (r = n.config.locate || !1, n.config.hasOwnProperty("tool_locate") && (r = n.config.tool_locate)), r
	}), o.add("measure", function (o) {
		var n = e("measure", o.config);
		return o.config.hasOwnProperty("tool_measure") && (n = o.config.tool_measure), n
	}), o.add("overview", function (o) {
		var n = e("overview", o.config);
		return o.config.hasOwnProperty("tool_overview") && (n = o.config.tool_overview), n
	}), o.add("print", function (o) {
		var n = e("print", o.config);
		return o.config.hasOwnProperty("tool_print") && (n = o.config.tool_print), n && null === o.config.helperServices.printTask.url && (n = !1), n
	}), o.add("print-legend", function (o) {
		for (var n = !1, r = 0; r < o.config.tools.length; r++)
			if ("print" === o.config.tools[r].name) {
				n = o.config.tools[r].legend;
				break
			}
		return o.config.hasOwnProperty("tool_print_legend") && (n = o.config.tool_print_legend), n
	}), o.add("print-layouts", function (o) {
		for (var n = !1, r = 0; r < o.config.tools.length; r++)
			if ("print" === o.config.tools[r].name) {
				n = o.config.tools[r].layouts;
				break
			}
		return o.config.hasOwnProperty("tool_print_layouts") && (n = o.config.tool_print_layouts), n
	}), o.add("share", function (o) {
		var n = e("share", o.config);
		return o.config.hasOwnProperty("tool_share") && (n = o.config.tool_share), n
	}), o.add("share-embed", function (o) {
		for (var n = !1, r = 0; r < o.config.tools.length; r++)
			if ("share" === o.config.tools[r].name) {
				n = o.config.tools[r].embed;
				break
			}
		return o.config.hasOwnProperty("tool_share_embed") && (n = o.config.tool_share_embed), n
	}), o.add("native-gelocation", function (n) {
		return o("native-navigator") && "geolocation" in n.navigator
	}), o.add("native-navigator", function (o) {
		return "navigator" in o
	}), o
});
