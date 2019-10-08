define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","esri/config","esri/lang","esri/geometry/Extent","esri/geometry/Point","esri/SpatialReference","esri/tasks/ProjectParameters","esri/tasks/GeometryService","dojo/promise/all","dojo/Deferred"],function(e,t,r,i,a,n,s,l,o,c,h,p){return e([],{constructor:function(e){r.mixin(this,e),!i.defaults.geometryService&&this.geometryService&&(i.defaults.geometryService=new c(this.geometryService)),this.mapSpatialReference?this.mapSpatialReference=new l(this.mapSpatialReference):this.mapSpatialReference=new l({wkid:102100})},center:null,extent:null,level:null,defaultMarkerSymbol:null,defaultMarkerSymbolWidth:null,defaultMarkerSymbolHeight:null,mapSpatialReference:null,processUrlParams:function(){var e=new p,i=[];return this.center&&i.push(this._createCenter()),this.level&&i.push(this._createLevel()),this.extent&&i.push(this._createExtent()),this.marker&&i.push(this._createMarker()),h(i).then(r.hitch(this,function(r){var i={mapOptions:{}};t.forEach(r,function(e){e&&e.center&&(i.mapOptions.center=e.center),e&&e.zoom&&(i.mapOptions.zoom=e.zoom),e&&e.extent&&(i.mapOptions.extent=e.extent),e&&e.markerGraphic&&(i.markerGraphic=e.markerGraphic)}),e.resolve(i)}),function(t){e.reject(t)}),e.promise},_createExtent:function(){var e=new p,t=this._splitArray(this.extent);if(4===t.length||5===t.length){var i=parseFloat(t[0]),a=parseFloat(t[1]),s=parseFloat(t[2]),o=parseFloat(t[3]);if(isNaN(i)||isNaN(a)||isNaN(s)||isNaN(o))e.reject();else{var c=4326;5!==t.length||isNaN(t[4])||(c=parseInt(t[4],10));var h=new n(i,a,s,o,new l({wkid:c}));this._project(h).then(r.hitch(this,function(t){var r=t?{extent:t}:null;e.resolve(r)}),function(t){e.reject(t)})}}else e.reject();return e.promise},_createCenter:function(){var e=new p,t=this._splitArray(this.center);if(2===t.length||3===t.length){var i=parseFloat(t[0]),a=parseFloat(t[1]);if((isNaN(i)||isNaN(a))&&(i=parseFloat(t[0]),a=parseFloat(t[1])),isNaN(i)||isNaN(a))e.reject();else{var n=4326;3!==t.length||isNaN(t[2])||(n=parseInt(t[2],10));var o=new s(i,a,new l(n));this._project(o).then(r.hitch(this,function(t){var r=t?{center:t}:null;e.resolve(r)}),e.reject)}}else e.reject();return e.promise},_createLevel:function(){var e=new p,t=this.level;return t?e.resolve({zoom:parseInt(t)}):e.reject(),e.promise},_createMarker:function(){var e=new p;return require(["esri/symbols/PictureMarkerSymbol","esri/graphic","esri/dijit/PopupTemplate"],r.hitch(this,function(t,i,a){var n=this._splitArray(this.marker);if(n.length>=2&&!isNaN(n[0])&&!isNaN(n[1])){var l=parseFloat(n[0]),o=parseFloat(n[1]),c=n[2]||null,h=n[3]||null,p=n[4]||this.defaultMarkerSymbol||null,u=n[5]||null,f=new t(p,this.defaultMarkerSymbolWidth||26,this.defaultMarkerSymbolHeight||26),m=new s({x:l,y:o,spatialReference:{wkid:c||4326}}),d=null;(h||u)&&(d=new a({title:u||null,description:h||null})),this._project(m).then(r.hitch(this,function(t){var r=new i(t,f,null,d),a=t?{markerGraphic:r,center:t}:null;e.resolve(a)}),e.reject)}else e.reject()})),e.promise},_splitArray:function(e){var t=e.split(";");return 1===t.length&&(t=e.split(",")),t},_project:function(e){var t=new p;return this._sameSpatialReference(e.spatialReference,this.mapSpatialReference)?t.resolve(e):i.defaults.geometryService.project([e],this.mapSpatialReference).then(r.hitch(this,function(e){e&&e.length&&e.length>0?t.resolve(e[0]):t.reject()}),function(e){t.reject(e)}),t.promise},_sameSpatialReference:function(e,r){var i=!1,n=[102113,102100,3857];return e&&r&&e.wkt===r.wkt&&(e.wkid===r.wkid||a.isDefined(e.latestWkid)&&e.latestWkid===r.wkid||a.isDefined(r.latestWkid)&&e.wkid===r.latestWkid||a.isDefined(e.latestWkid)&&e.latestWkid===r.latestWkid)?i=!0:e&&r&&e.wkid&&r.wkid&&-1!=t.indexOf(n,e.wkid)&&-1!=t.indexOf(n,r.wkid)&&(i=!0),i}})});
