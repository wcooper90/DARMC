

define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/kernel", "dojo/_base/lang", "dojo/Evented", "dojo/Deferred", "dojo/string", "dojo/dom-class", "dojo/promise/all", "esri/config", "esri/IdentityManager", "esri/lang", "esri/request", "esri/urlUtils", "esri/arcgis/Portal", "esri/arcgis/OAuthInfo", "esri/arcgis/utils", "esri/tasks/GeometryService", "config/defaults"], function (e, t, i, r, o, n, s, a, h, c, u, l, p, f, g, m, d, v, y) {
	return t([o], {
		config: {},
		orgConfig: {},
		appConfig: {},
		urlConfig: {},
		i18nConfig: {},
		groupItemConfig: {},
		groupInfoConfig: {},
		itemConfig: {},
		customUrlConfig: {},
		sharedThemeConfig: {},
		commonUrlItems: ["webmap", "appid", "group", "oauthappid"],
		constructor: function (e) {
			var t = {
				queryForWebmap: !0
			};
			this.templateConfig = r.mixin(t, e), this.config = y, this.urlObject = this._createUrlParamsObject()
		},
		startup: function () {
			var e = this._init();
			return e.then(r.hitch(this, function (e) {
				this.emit("ready", e)
			}), r.hitch(this, function (e) {
				this.emit("error", e)
			})), e
		},
		_init: function () {
			var e;
			return e = new n, this.urlConfig = this._getUrlParamValues(this.commonUrlItems), this.customUrlConfig = this._getUrlParamValues(this.templateConfig.urlItems), this._mixinAll(), this._initializeApplication(), this._checkSignIn().always(r.hitch(this, function (t) {
				h({
					i18n: this._queryLocalization(),
					app: this.queryApplication(),
					portal: this._createPortal(),
					org: this.queryOrganization()
				}).then(r.hitch(this, function () {
					this._mixinAll(), h({
						item: this.queryItem(),
						groupInfo: this.queryGroupInfo(),
						groupItems: this.queryGroupItems(),
						sharedTheme: this.querySharedTheme()
					}).then(r.hitch(this, function () {
						if (this._mixinAll(), this.config.appResponse && "public" !== this.config.appResponse.item.access && t && t.code && "IdentityManagerBase.1" === t.code) {
							var i = "<h1>" + this.i18nConfig.i18n.map.licenseError.title + "</h1><p>" + this.i18nConfig.i18n.map.licenseError.message + "</p>";
							e.reject(new Error(i))
						}
						this._completeApplication(), e.resolve(this.config)
					}), e.reject)
				}), e.reject)
			})), e.promise
		},
		_completeApplication: function () {
			this.config.appid && this.config.application_extent && this.config.application_extent.length > 0 && this.config.itemInfo && this.config.itemInfo.item && this.config.itemInfo.item.extent && (this.config.itemInfo.item.extent = [
				[parseFloat(this.config.application_extent[0][0]), parseFloat(this.config.application_extent[0][1])],
				[parseFloat(this.config.application_extent[1][0]), parseFloat(this.config.application_extent[1][1])]
			]), this.config.helperServices && this.config.helperServices.geometry && this.config.helperServices.geometry.url && (c.defaults.geometryService = new v(this.config.helperServices.geometry.url))
		},
		_mixinAll: function () {
			r.mixin(this.config, this.i18nConfig, this.orgConfig, this.appConfig, this.groupInfoConfig, this.groupItemConfig, this.itemConfig, this.customUrlConfig, this.urlConfig)
		},
		_createPortal: function () {
			var e = new n;
			return this.templateConfig.queryForGroupInfo || this.templateConfig.queryForGroupItems ? (this.portal = new g.Portal(this.config.sharinghost), this.portal.on("load", function () {
				e.resolve()
			})) : e.resolve(), e.promise
		},
		_getUrlParamValues: function (e) {
			var t = this.urlObject,
				i = {};
			if (t && t.query && e && e.length)
				for (var r = 0; r < e.length; r++) {
					var o = t.query[e[r]];
					if (o)
						if ("string" == typeof o) switch (o.toLowerCase()) {
							case "true":
								i[e[r]] = !0;
								break;
							case "false":
								i[e[r]] = !1;
								break;
							default:
								i[e[r]] = o
						} else i[e[r]] = o
				}
			return i
		},
		_createUrlParamsObject: function () {
			var e, t;
			return t = document.location.href, e = f.urlToObject(t), e.query = e.query || {}, e.query = l.stripTags(e.query), e
		},
		_initializeApplication: function () {
			var e = this.config.overwritesharing || !1;
			if (this.templateConfig.esriEnvironment && !e) {
				var t, i;
				t = location.pathname.indexOf("/apps/"), -1 === t && (t = location.pathname.indexOf("/home/")), -1 !== t && (i = location.pathname.substr(0, t), this.config.sharinghost = location.protocol + "//" + location.host + i, this.config.proxyurl = location.protocol + "//" + location.host + i + "/sharing/proxy")
			} else this.config.sharinghost = location.protocol + "//" + this.config.sharinghost;
			d.arcgisUrl = this.config.sharinghost + "/sharing/rest/content/items", this.config.proxyurl && (c.defaults.io.proxyUrl = this.config.proxyurl, c.defaults.io.alwaysUseProxy = !1)
		},
		_checkSignIn: function () {
			var e, t, i;
			return e = new n, this.config.oauthappid && (i = new m({
				appId: this.config.oauthappid,
				portalUrl: this.config.sharinghost,
				popup: !0
			}), u.registerOAuthInfos([i])), this.config.oauthappid && this.templateConfig.esriEnvironment ? (t = u.checkAppAccess(this.config.sharinghost + "/sharing", this.config.oauthappid), t.always(function (t) {
				e.resolve(t)
			})) : (t = u.checkSignInStatus(this.config.sharinghost + "/sharing"), t.promise.always(function (t) {
				e.resolve(t)
			})), e.promise
		},
		_queryLocalization: function () {
			var t, o, s, h;
			return t = new n, this.templateConfig.queryForLocale ? require(["dojo/i18n!application/nls/resources"], r.hitch(this, function (n) {
				var c = {};
				c.i18n = n || {}, c.i18n.direction = "ltr", e.some(["ar", "he"], r.hitch(this, function (e) {
					return -1 !== i.locale.indexOf(e) && (c.i18n.direction = "rtl", !0)
				})), o = document.getElementsByTagName("html")[0], s = o.className + " ", "rtl" === c.i18n.direction ? (o.setAttribute("dir", "rtl"), h = " esriRTL dj_rtl dijitRtl " + s.replace(/ /g, "-rtl "), o.className = r.trim(s + h)) : (o.setAttribute("dir", "ltr"), a.add(o, "esriLTR")), this.i18nConfig = c, t.resolve(c)
			})) : t.resolve(), t.promise
		},
		queryGroupItems: function (e) {
			var t, i, o, a = new n;
			return this.templateConfig.queryForGroupItems ? this.config.group ? (i = {
				q: 'group:"${groupid}" AND -type:"Code Attachment"',
				sortField: "modified",
				sortOrder: "desc",
				num: 9,
				start: 0,
				f: "json"
			}, o = r.mixin(i, this.templateConfig.groupParams, e), o.q && (o.q = s.substitute(o.q, {
				groupid: this.config.group
			})), this.portal.queryItems(o).then(r.hitch(this, function (e) {
				var t = {};
				t.groupItems = e, this.groupItemConfig = t, a.resolve(t)
			}), function (e) {
				a.reject(e)
			})) : (t = new Error("Group undefined."), a.reject(t)) : a.resolve(), a.promise
		},
		queryGroupInfo: function () {
			var e, t, i = new n;
			return this.templateConfig.queryForGroupInfo ? this.config.group ? (t = {
				q: 'id:"' + this.config.group + '"',
				f: "json"
			}, this.portal.queryGroups(t).then(r.hitch(this, function (e) {
				var t = {};
				t.groupInfo = e, this.groupInfoConfig = t, i.resolve(t)
			}), function (e) {
				i.reject(e)
			})) : (e = new Error("Group undefined."), i.reject(e)) : i.resolve(), i.promise
		},
		queryItem: function () {
			var e, t = {};
			if (e = new n, this.templateConfig.queryForWebmap)
				if (this.templateConfig.useLocalWebmap) require([this.templateConfig.localWebmapFile], r.hitch(this, function (i) {
					t.itemInfo = i, this.itemConfig = t, e.resolve(t)
				}));
				else if (!this.config.webmap && this.config.orgInfo) {
				var i = {
					item: {
						title: "Default Webmap",
						type: "Web Map",
						description: "A webmap with the default basemap and extent.",
						snippet: "A webmap with the default basemap and extent.",
						extent: this.config.orgInfo.defaultExtent
					},
					itemData: {
						operationalLayers: [],
						baseMap: this.config.orgInfo.defaultBasemap
					}
				};
				t.itemInfo = i, this.itemConfig = t, e.resolve(t)
			} else d.getItem(this.config.webmap).then(r.hitch(this, function (i) {
				t.itemInfo = i, this.itemConfig = t, e.resolve(t)
			}), function (t) {
				t || (t = new Error("Error retrieving display item.")), e.reject(t)
			});
			else e.resolve();
			return e.promise
		},
		queryApplication: function () {
			var t = new n;
			return this.config.appid ? d.getItem(this.config.appid).then(r.hitch(this, function (i) {
				var r = {};
				if (i.item && i.itemData && i.itemData.values && (r = i.itemData.values, r.appResponse = i), i.item && i.item.extent && (r.application_extent = i.item.extent), i.item && i.item.appProxies) {
					var o = e.map(i.item.appProxies, function (e) {
						return {
							url: e.sourceUrl,
							mixin: {
								url: e.proxyUrl
							}
						}
					});
					r.layerMixins = o
				}
				this.appConfig = r, t.resolve(r)
			}), function (e) {
				e || (e = new Error("Error retrieving application configuration.")), t.reject(e)
			}) : t.resolve(), t.promise
		},
		queryOrganization: function () {
			var e = new n;
			return this.templateConfig.queryForOrg ? p({
				url: this.config.sharinghost + "/sharing/rest/portals/self",
				content: {
					f: "json"
				},
				callbackParamName: "callback"
			}).then(r.hitch(this, function (t) {
				var r;
				if (t.authorizedCrossOriginDomains && t.authorizedCrossOriginDomains.length)
					for (var o = 0; o < t.authorizedCrossOriginDomains.length; o++) r = t.authorizedCrossOriginDomains[o], l.isDefined(r) && r.length > 0 && c.defaults.io.corsEnabledServers.push({
						host: t.authorizedCrossOriginDomains[o],
						withCredentials: !0
					});
				var n = {};
				n.orgInfo = t, n.units = "metric", t.user && t.user.units ? n.units = t.user.units : t.units ? n.units = t.units : (t.user && t.user.region && "US" === t.user.region || t.user && !t.user.region && "US" === t.region || t.user && !t.user.region && !t.region || !t.user && "US" === t.ipCntryCode || !t.user && !t.ipCntryCode && "en-us" === i.locale) && (n.units = "english");
				var s = t.basemapGalleryGroupQuery;
				t.hasOwnProperty("useVectorBasemaps") && !0 === t.useVectorBasemaps && t.vectorBasemapGalleryGroupQuery && (s = t.vectorBasemapGalleryGroupQuery);
				var a = this._parseQuery(s);
				n.basemapgroup = {
					id: null,
					title: null,
					owner: null
				}, a.id ? n.basemapgroup.id = a.id : a.title && a.owner && (n.basemapgroup.title = a.title, n.basemapgroup.owner = a.owner), n.helperServices = t.helperServices, this.orgConfig = n, e.resolve(n)
			}), function (t) {
				t || (t = new Error("Error retrieving organization information.")), e.reject(t)
			}) : e.resolve(), e.promise
		},
		_parseQuery: function (e) {
			for (var t, i, r = /(AND|OR)?\W*([a-z]+):/gi, o = {}, n = r.exec(e); n;) t = n && n[2], i = n ? n.index + n[0].length : -1, n = r.exec(e), o[t] = e.substring(i, n ? n.index : e.length).replace(/^\s+|\s+$/g, "").replace(/\"/g, "");
			return o
		},
		querySharedTheme: function () {
			var e = new n;
			if (this.config && this.config.sharedTheme) {
				c.defaults.io.corsEnabledServers.push("opendata.arcgis.com");
				var t = this._getSharedThemeStatus(this.config.sharedTheme);
				this._getSharedThemeObject(t).then(function (t) {
					e.resolve(t)
				}, function () {
					var t = new Error("Unable to get theme");
					e.reject(t)
				})
			} else this.config && this.config.sharedThemeItem ? d.getItem(this.config.sharedThemeItem).then(r.hitch(this, function (t) {
				t && t.itemData && t.itemData.data && (this.config.sharedThemeConfig = t.itemData.data), e.resolve()
			}), function (t) {
				e.reject(t)
			}) : e.resolve();
			return e.promise
		},
		_getSharedThemeStatus: function (e) {
			var t = {};
			return /\d+/.test(e) ? (t.status = "siteId", t.output = e) : "current" === e && (t.status = "domain", t.output = window.location.href), t
		},
		_getSharedThemeObject: function (e) {
			var t = new n,
				i = this._generateRequestUrl(e);
			if ("siteId" === e.status || "domain" === e.status) {
				p({
					url: i,
					handleAs: "json"
				}).then(r.hitch(this, function (i) {
					"domain" === e.status && i && i.data && i.data.length && i.data.length > 0 ? this.config.sharedThemeConfig = i.data[0] : i && i.data && (this.config.sharedThemeConfig = i.data), t.resolve()
				}), function (e) {
					t.reject(e)
				})
			} else t.resolve();
			return t.promise
		},
		_generateRequestUrl: function (e) {
			var t;
			switch (e.status) {
				case "siteId":
					t = "https://opendata.arcgis.com/api/v2/sites/" + e.output;
					break;
				case "domain":
					t = e.output, t = "https://opendata.arcgis.com/api/v2/sites?filter%5Burl%5D=" + e.output
			}
			return t
		}
	})
});
