// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/CostAnalysis/setting/StatisticsSettings.html":'\x3cdiv class\x3d"esriCTTabNode"\x3e\r\n    \x3cdiv class\x3d"esriCTTabContainer row"\x3e\r\n        \x3cdiv\x3e\r\n            \x3c!--Add New Statistics button--\x3e\r\n            \x3cdiv class\x3d"esriCTStatisticsContainer" data-dojo-attach-point\x3d"btnAddStatisticsNodeWrapper"\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"btnAddStatisticsNode" class\x3d"esriCTBtnStatisticsAddSection"\x3e\r\n                    \x3cspan class\x3d"esriCTBtnAddStatisticsIcon"\x3e\x3c/span\x3e\r\n                    \x3cspan class\x3d"esriCTBtnStatisticsAddLabel"\x3e ${nls.statisticsSettings.addStatisticsLabel}\x3c/span\x3e\r\n                \x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTAddLayerTableNode" data-dojo-attach-point\x3d"statisticsLayerTableNode"\x3e\x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTHidden esriCTNoEditableLayersAvailable" data-dojo-attach-point\x3d"noEditableLayersAvailable"\x3e\r\n                ${nls.costingInfo.noEditableLayersAvailable}\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"additionalProjectCostWrapper"\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3c!--Add/delete/reorder buttons--\x3e\r\n    \x3cdiv class\x3d"esriCTStatisticsButtonParentDiv"\x3e\r\n        \x3cdiv class\x3d"esriCTAddStatisticsIcon esriCTStatisticsButtons" data-dojo-attach-point\x3d"btnAddNode"\r\n            title\x3d"${nls.statisticsSettings.addNewStatisticsText}" tabindex\x3d"0" role\x3d"button"\r\n            aria-label\x3d"${nls.statisticsSettings.addNewStatisticsText}"\x3e\x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTDeleteStatisticsIcon esriCTStatisticsButtons" data-dojo-attach-point\x3d"btnCrossNode"\r\n            title\x3d"${nls.statisticsSettings.deleteStatisticsText}" tabindex\x3d"-1" role\x3d"button"\r\n            aria-label\x3d"${nls.statisticsSettings.deleteStatisticsText}"\x3e\x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTStatisticsUpIcon esriCTStatisticsButtons" data-dojo-attach-point\x3d"btnUpNode"\r\n            title\x3d"${nls.statisticsSettings.moveStatisticsUpText}" tabindex\x3d"-1" role\x3d"button"\r\n            aria-label\x3d"${nls.statisticsSettings.moveStatisticsUpText}"\x3e\x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTStatisticsDownIcon esriCTStatisticsButtons" data-dojo-attach-point\x3d"btnDownNode"\r\n            title\x3d"${nls.statisticsSettings.moveStatisticsDownText}" tabindex\x3d"-1" role\x3d"button"\r\n            aria-label\x3d"${nls.statisticsSettings.moveStatisticsDownText}"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare jimu/BaseWidget jimu/dijit/SimpleTable dojo/on dojo/_base/array dojo/query dojo/dom-construct jimu/dijit/formSelect dijit/form/ValidationTextBox dijit/_WidgetsInTemplateMixin dojo/text!./StatisticsSettings.html dojo/_base/lang dojo/store/Memory dojo/dom-class dijit/registry dojo/_base/html dojo/dom-style ./ProjectCost dojo/keys dojo/dom-attr dijit/focus jimu/utils dojo/_base/event".split(" "),function(y,z,A,f,k,g,r,u,B,C,D,e,t,d,p,v,q,E,l,m,w,x,n){return y([z,C],{templateString:D,
baseClass:"jimu-widget-cost-analysis-statistics-settings",_layerNameStore:null,_commonStatisticsStoreOption:null,_polygonStatisticsStoreOption:null,_polylineStatisticsStoreOption:null,_pointLayerStatisticsStore:null,_polygonLayerStatisticsStore:null,_polylineLayerStatisticsStore:null,_layerFieldStore:{},_shapeFields:"shape_length shape_area shape__length shape__area shape.len shape.area".split(" "),_editableConfiguredLayers:[],constructor:function(a){e.mixin(this,a)},postMixInProperties:function(){this.nls.common=
{};e.mixin(this.nls.common,window.jimuNls.common)},postCreate:function(){this._polylineLayerStatisticsStore=this._polygonLayerStatisticsStore=this._pointLayerStatisticsStore=this._polylineStatisticsStoreOption=this._polygonStatisticsStoreOption=this._commonStatisticsStoreOption=this._layerNameStore=null;this._layerFieldStore={};this._editableConfiguredLayers=[];this.inherited(arguments);this._init();this._handleClickEvent();this.showActionButtonsInColumn&&this._createProjectCostTable()},_createProjectCostTable:function(){this.additionalProjectCostObj=
new E({nls:this.nls,map:this.map,config:this.config},r.create("div",{},this.additionalProjectCostWrapper));this.additionalProjectCostObj.startup()},_handleClickEvent:function(){this._addButtonClick();this._crossButtonClick();this._upButtonClick();this._downButtonClick()},_init:function(){for(var a in this.config.layerSettings)this.config.layerSettings[a].editable&&this._editableConfiguredLayers.push(this.config.layerSettings[a].id);this._createStatisticsStoreOptions();this._createStatisticsTable();
this._layerNameStore||this._createLayerNameStore();this._attachNodeEvents();this._setConfig();this._displayAddStatisticsButtonOrLabel();this._handleActionButtonVisibility();0===this._editableConfiguredLayers.length&&(d.remove(this.noEditableLayersAvailable,"esriCTHidden"),d.add(this.btnAddStatisticsNodeWrapper,"esriCTHidden"),d.add(this.statisticsLayerTableNode,"esriCTHidden"),d.add(this.additionalProjectCostWrapper,"esriCTHidden"))},_displayAddStatisticsButtonOrLabel:function(){this.showActionButtonsInColumn?
d.remove(this.btnAddStatisticsNodeWrapper,"esriCTHidden"):d.add(this.btnAddStatisticsNodeWrapper,"esriCTHidden")},_setConfig:function(){this.config&&this.config.statisticsSettings&&0<this.config.statisticsSettings.length&&k.forEach(this.config.statisticsSettings,e.hitch(this,function(a){this._addLayerRow(a)}))},getConfig:function(){var a,b;a=this._statisticsLayerTable.getRows();b=[];k.forEach(a,e.hitch(this,function(a){b.push({id:a.layerNameDropDown.getValue(),type:a.statisticsTypeDropdown.getValue(),
field:a.layerFieldDropdown.getValue(),label:a.statisticsLabelTextBox.getValue()})}));this.additionalProjectCostObj&&this.additionalProjectCostObj.getConfig();return b},_createStatisticsStoreOptions:function(){this._commonStatisticsStoreOption=[{name:this.nls.statisticsType.averageLabel,value:"avg"},{name:this.nls.statisticsType.countLabel,value:"count"},{name:this.nls.statisticsType.maxLabel,value:"max"},{name:this.nls.statisticsType.minLabel,value:"min"},{name:this.nls.statisticsType.summationLabel,
value:"sum"}];this._polygonStatisticsStoreOption=[{name:this.nls.statisticsType.areaLabel,value:"area"}];this._polylineStatisticsStoreOption=[{name:this.nls.statisticsType.lengthLabel,value:"length"}]},_attachNodeEvents:function(){0===this._layerNameStore.data.length?(d.remove(this.noEditableLayersAvailable,"esriCTHidden"),d.add(this.btnAddStatisticsNodeWrapper,"esriCTHidden"),d.add(this.statisticsLayerTableNode,"esriCTHidden")):(d.add(this.noEditableLayersAvailable,"esriCTHidden"),d.remove(this.btnAddStatisticsNodeWrapper,
"esriCTHidden"),d.remove(this.statisticsLayerTableNode,"esriCTHidden"));this.own(f(this.btnAddStatisticsNode,"click",e.hitch(this,function(){this._layerNameStore.data.length&&(this._addStatisticsBtnClicked(),this.resetAddNewStatisticsDropdown())})));this.own(f(this.btnAddStatisticsNode,"keydown",e.hitch(this,function(a){if(a.keyCode===l.ENTER||a.keyCode===l.SPACE)n.stop(a),this._layerNameStore.data.length&&(this._addStatisticsBtnClicked(),this.resetAddNewStatisticsDropdown())})))},_createStatisticsTable:function(){var a,
b;this._statisticsLayerTable=new A({fields:[{name:"editable",title:this.nls.statisticsSettings.selectDeselectAllTitle,type:"checkbox",editable:!1,width:this.showActionButtonsInRow?"16px":"0%",hidden:!this.showActionButtonsInRow},{name:"field",title:this.nls.common.layer,type:"empty",editable:!1,width:"30%"},{name:"field",title:this.nls.common.type,type:"empty",editable:!0,width:this.showActionButtonsInRow?"19%":"18%"},{name:"field",title:this.nls.statisticsSettings.fieldNameTitle,type:"empty",editable:!1,
width:"22%"},{name:"field",title:this.nls.statisticsSettings.statisticsTitle,type:"empty",editable:!1,width:this.showActionButtonsInRow?"55px":"20%"},{name:"actions",title:this.nls.common.actions,width:"10%",type:"actions",actions:["up","down","delete"],hidden:!this.showActionButtonsInColumn}],selectable:!1});this._statisticsLayerTable.placeAt(this.statisticsLayerTableNode);this._statisticsLayerTable.startup();a=g(".esriCTAddLayerTableNode th .label")[0];b=g(".esriCTAddLayerTableNode th .jimu-checkbox")[0];
g(".esriCTAddLayerTableNode tr .jimu-checkbox");b&&d.add(b,"esriCTStatisticsHeaderCheckBox");a&&d.add(a,"esriCTHidden")},_addButtonClick:function(){!0===this.showActionButtonsInRow?(d.remove(this.btnAddNode,"esriCTHidden"),this.own(f(this.btnAddNode,"click",e.hitch(this,function(){this._addStatisticsButtonClickEvent()}))),this.own(f(this.btnAddNode,"keydown",e.hitch(this,function(a){if(a.keyCode===l.ENTER||a.keyCode===l.SPACE)n.stop(a),this._addStatisticsButtonClickEvent()})))):d.add(this.btnAddNode,
"esriCTHidden")},_addStatisticsButtonClickEvent:function(){if(this._layerNameStore.data.length&&(this._addStatisticsBtnClicked(),this._handleActionButtonVisibility(),this.resetAddNewStatisticsDropdown(),this.widgetDomNode)){var a=this._statisticsLayerTable.getRows();0<=a.length&&(a=g(".jimu-checkbox",a[a.length-1])[0],w.focus(a))}},_crossButtonClick:function(){d.remove(this.btnCrossNode,"esriCTHidden");this.own(f(this.btnCrossNode,"click",e.hitch(this,this._deleteLayerRow)));this.own(f(this.btnCrossNode,
"keydown",e.hitch(this,function(a){if(a.keyCode===l.ENTER||a.keyCode===l.SPACE)n.stop(a),this._deleteLayerRow()})))},_upButtonClick:function(){d.remove(this.btnUpNode,"esriCTHidden");this.own(f(this.btnUpNode,"click",e.hitch(this,function(){this._upButtonClickEvent()})));this.own(f(this.btnUpNode,"keydown",e.hitch(this,function(a){if(a.keyCode===l.ENTER||a.keyCode===l.SPACE)n.stop(a),this._upButtonClickEvent()})))},_upButtonClickEvent:function(){var a,b;if(!d.contains(this.btnUpNode,"esriCTStatisticsUpIconDisable")){b=
this._statisticsLayerTable.getRows();var c=this._statisticsLayerTable.getData();k.forEach(c,e.hitch(this,function(c,d){c.editable&&(a=b[d])}));this._statisticsLayerTable.onBeforeRowUp(a)&&(c=k.indexOf(b,a),0<c&&(c=b[c-1]))&&(v.place(a,c,"before"),this._statisticsLayerTable.updateUI(),this._statisticsLayerTable.emit("row-up",a))}},_downButtonClick:function(){d.remove(this.btnDownNode,"esriCTHidden");this.own(f(this.btnDownNode,"click",e.hitch(this,function(){this._downButtonClickEvent()})));this.own(f(this.btnDownNode,
"keydown",e.hitch(this,function(a){if(a.keyCode===l.ENTER||a.keyCode===l.SPACE)n.stop(a),this._downButtonClickEvent()})))},_downButtonClickEvent:function(){var a,b;if(!d.contains(this.btnDownNode,"esriCTStatisticsDownIconDisable")){b=this._statisticsLayerTable.getRows();var c=this._statisticsLayerTable.getData();k.forEach(c,e.hitch(this,function(c,d){c.editable&&(a=b[d])}));this._statisticsLayerTable.onBeforeRowDown(a)&&(c=k.indexOf(b,a),c<b.length-1&&(c=b[c+1]))&&(v.place(a,c,"after"),this._statisticsLayerTable.updateUI(),
this._statisticsLayerTable.emit("row-down",a))}},_deleteLayerRow:function(){var a=this._statisticsLayerTable.getRows(),b=this._statisticsLayerTable.getData();k.forEach(b,e.hitch(this,function(b,h){b.editable&&this._statisticsLayerTable.deleteRow(a[h])}));0===this._statisticsLayerTable.getRows().length&&(b=g("th .checkbox")[0],d.contains(b,"checked")&&d.remove(b,"checked"));this._handleActionButtonVisibility()},_checkEditCapabilities:function(a){var b;return(b=a&&a.capabilities?a.capabilities:null)&&
-1!==b.indexOf("Delete")&&-1!==b.indexOf("Create")&&-1!==b.indexOf("Update")&&a.globalIdField?!0:!1},_addStatisticsBtnClicked:function(){var a;this._addLayerRow();a=g(".simple-table-title .jimu-checkbox",this.domNode)[0];f(p.byNode(a),"change",e.hitch(this,function(){setTimeout(e.hitch(this,function(){this._handleActionButtonVisibility()}),0)}))},_handleActionButtonVisibility:function(){var a,b,c=0,h;a=this._statisticsLayerTable.getRows();h=g(".simple-table-title .jimu-checkbox",this.domNode)[0];
h=p.byNode(h);k.some(this._statisticsLayerTable.getRows(),e.hitch(this,function(a){b=g(".jimu-checkbox",a)[0];p.byNode(b).checked&&c++}));0===c?(d.replace(this.btnCrossNode,"esriCTDeleteStatisticsIconDisable","esriCTDeleteStatisticsIcon"),m.set(this.btnCrossNode,"tabindex","-1")):(d.replace(this.btnCrossNode,"esriCTDeleteStatisticsIcon","esriCTDeleteStatisticsIconDisable"),m.set(this.btnCrossNode,"tabindex","0"));a&&1===c?(d.replace(this.btnUpNode,"esriCTStatisticsUpIcon","esriCTStatisticsUpIconDisable"),
d.replace(this.btnDownNode,"esriCTStatisticsDownIcon","esriCTStatisticsDownIconDisable"),m.set(this.btnUpNode,"tabindex","0"),m.set(this.btnDownNode,"tabindex","0")):(d.replace(this.btnUpNode,"esriCTStatisticsUpIconDisable","esriCTStatisticsUpIcon"),d.replace(this.btnDownNode,"esriCTStatisticsDownIconDisable","esriCTStatisticsDownIcon"),m.set(this.btnUpNode,"tabindex","-1"),m.set(this.btnDownNode,"tabindex","-1"));0===a.length?(h.set("status",!1),d.add(h.domNode,"jimu-state-disabled"),m.set(h.domNode,
"tabindex","-1"),this.widgetDomNode&&(w.focus(this.btnAddNode),x.initFirstFocusNode(this.widgetDomNode,this.btnAddNode))):(h.set("status",!0),d.remove(h.domNode,"jimu-state-disabled"),m.set(h.domNode,"tabindex","0"),this.widgetDomNode&&x.initFirstFocusNode(this.widgetDomNode,h.domNode))},_addLayerRow:function(a){var b,c,h;b=this._statisticsLayerTable.addRow({});c=g(".simple-table-cell",b.tr);h=g(".simple-table-cell .jimu-checkbox",b.tr)[0];m.set(h,"aria-label",this.nls.statisticsSettings.layerCheckbox);
c&&(h&&f(p.byNode(h),"change",e.hitch(this,function(){this._handleActionButtonVisibility()})),b=b.tr,this._addLayerNameDropdown(c[1],b,a),this._addStatisticsDropdown(c[2],b,a),this._addLayerFieldDropdown(c[3],b,a),this._addStatisticsLabelTextBox(c[4],b,a))},_onLayerNameChange:function(a,b,c){var h;this._layerNameStore.data.length&&(h=this._layerNameStore.data[this._layerNameStore.index[a]].geometryType,h=this._getStatisticsTypeStore(h),b.statisticsTypeDropdown.setStore(h),c&&c.type&&b.statisticsTypeDropdown.set("value",
c.type),c=b.statisticsTypeDropdown.getValue(),a=this._layerNameStore.data[this._layerNameStore.index[a]].value,this._layerFieldStore[a]||this._createFieldStore(a),b.layerFieldDropdown.setStore(this._layerFieldStore[a]),b.layerFieldDropdown.reset(),this._onStatisticsTypeChange(c,b))},_onStatisticsTypeChange:function(a,b,c){"count"===a||"length"===a||"area"===a?d.add(b.layerFieldDropdown.domNode,"esriCTHidden"):(d.remove(b.layerFieldDropdown.domNode,"esriCTHidden"),c&&c.field&&b.layerFieldDropdown.set("value",
c.field));this._resetStatisticsTypeWidth(b)},_addLayerNameDropdown:function(a,b,c){a=r.create("div",{"class":"esriCTDropDownContainer"},a);b.layerNameDropDown=new u({name:"layerSelect",store:this._layerNameStore,labelAttr:"name","class":"esriCTLayerNameDropdown"},a);c&&c.id&&b.layerNameDropDown.set("value",c.id);this.own(f(b.layerNameDropDown,"click",e.hitch(this,function(){this._resetLayerNameWidth(b)})));this.own(f(b.layerNameDropDown,"keydown",e.hitch(this,function(a){if(a.keyCode===l.ENTER||a.keyCode===
l.SPACE)n.stop(a),this._resetLayerNameWidth(b)})));this.own(f(b.layerNameDropDown,"change",e.hitch(this,function(a){m.set(b.layerNameDropDown,"aria-label",this.nls.common.layer+" "+b.layerNameDropDown._getSelectedOptionsAttr().label);this._resetLayerNameWidth(b);this._onLayerNameChange(a,b,c)})));b.layerNameDropDown.startup();m.set(b.layerNameDropDown,"aria-label",this.nls.common.layer+" "+b.layerNameDropDown._getSelectedOptionsAttr().label)},_createLayerNameStore:function(){var a,b,c=[];a=[];c=[this.config.projectSettings.costingGeometryLayer||
"",this.config.projectSettings.projectLayer||"",this.config.projectSettings.pointLayerCentroid||""];this.config.layerSettings.length&&this._editableConfiguredLayers.length&&(b=this.config.layerSettings,k.forEach(b,e.hitch(this,function(b){c.push(b.id);var d=this._getFeatureLayerGeometryType(b.id);b.editable&&d&&a.push({name:b.title,value:b.id,geometryType:d})})));this._layerNameStore=new t({idProperty:"value",data:a});a.length&&this._updateLayerNameOptions()},_updateLayerNameOptions:function(){var a,
b;a=g(".esriCTLayerNameDropdown",this.domNode);k.forEach(a,e.hitch(this,function(a){b=p.byNode(a).get("value");p.byNode(a).set("store",this._layerNameStore);p.byNode(a).set("value",b)}));0===this._editableConfiguredLayers.length?(d.remove(this.noEditableLayersAvailable,"esriCTHidden"),d.add(this.btnAddStatisticsNodeWrapper,"esriCTHidden"),d.add(this.statisticsLayerTableNode,"esriCTHidden"),d.add(this.additionalProjectCostWrapper,"esriCTHidden")):(d.add(this.noEditableLayersAvailable,"esriCTHidden"),
d.remove(this.btnAddStatisticsNodeWrapper,"esriCTHidden"),d.remove(this.statisticsLayerTableNode,"esriCTHidden"),d.remove(this.additionalProjectCostWrapper,"esriCTHidden"))},_getFeatureLayerGeometryType:function(a){var b=k.filter(this.map.webMapResponse.itemInfo.itemData.operationalLayers,e.hitch(this,function(b){return a===b.id}));return b.length&&b[0].layerObject?b[0].layerObject.geometryType:null},_createStatisticsTypeStore:function(){this._pointLayerStatisticsStore||this._polygonLayerStatisticsStore||
this._polylineLayerStatisticsStore||(this._createPointGeometryStatisticsStore(),this._createPolygonGeometryStatisticsStore(),this._createPolylineGeometryStatisticsStore())},_getStatisticsTypeStore:function(a){switch(a){case "esriGeometryPolygon":return this._polygonLayerStatisticsStore;case "esriGeometryPolyline":return this._polylineLayerStatisticsStore;case "esriGeometryPoint":return this._pointLayerStatisticsStore}},_addStatisticsDropdown:function(a,b,c){var d;a=r.create("div",{"class":"esriCTDropDownContainer"},
a);this._createStatisticsTypeStore();d=b.layerNameDropDown._getSelectedOptionsAttr().item.geometryType;d=this._getStatisticsTypeStore(d);b.statisticsTypeDropdown=new u({name:"statisticsTypeSelect",store:d,labelAttr:"name","class":"esriCTStatisticsTypeDropdown"},a);this.own(f(b.statisticsTypeDropdown,"click",e.hitch(this,function(){this._resetStatisticsTypeWidth(b)})));this.own(f(b.statisticsTypeDropdown,"keydown",e.hitch(this,function(a){if(a.keyCode===l.ENTER||a.keyCode===l.SPACE)n.stop(a),this._resetStatisticsTypeWidth(b)})));
this.own(f(b.statisticsTypeDropdown,"change",e.hitch(this,function(a){this._resetStatisticsTypeWidth(b);this._onStatisticsTypeChange(a,b,c);m.set(b.statisticsTypeDropdown,"aria-label","type "+b.statisticsTypeDropdown._getSelectedOptionsAttr().label)})));m.set(b.statisticsTypeDropdown,"aria-label","Type "+b.statisticsTypeDropdown._getSelectedOptionsAttr().label);b.statisticsTypeDropdown.startup()},_createPointGeometryStatisticsStore:function(){this._pointLayerStatisticsStore=new t({idProperty:"value",
data:this._commonStatisticsStoreOption})},_createPolygonGeometryStatisticsStore:function(){this._polygonLayerStatisticsStore=new t({idProperty:"value",data:this._commonStatisticsStoreOption.concat(this._polygonStatisticsStoreOption)})},_createPolylineGeometryStatisticsStore:function(){this._polylineLayerStatisticsStore=new t({idProperty:"value",data:this._commonStatisticsStoreOption.concat(this._polylineStatisticsStoreOption)})},_createFieldStore:function(a){var b,c;b=[];c=["esriFieldTypeDouble",
"esriFieldTypeInteger","esriFieldTypeSmallInteger","esriFieldTypeSmallFloat"];this._layerFieldStore[a]||(k.forEach(this.map._layers[a].fields,e.hitch(this,function(a){-1<c.indexOf(a.type)&&-1===this._shapeFields.indexOf(a.name.toLowerCase())&&b.push({name:a.alias||a.name,value:a.name})})),0===b.length&&b.push({name:"\x26nbsp",value:null}),this._layerFieldStore[a]=new t({idProperty:"value",data:b}))},_addLayerFieldDropdown:function(a,b){var c;a=r.create("div",{"class":"esriCTDropDownContainer"},a);
c=b.layerNameDropDown._getSelectedOptionsAttr().value;this._createFieldStore(c);b.layerFieldDropdown=new u({name:"layerFieldDropdown",store:this._layerFieldStore[c],labelAttr:"name","class":"esriCTStatisticsFieldDropdown"},a);this.own(f(b.layerFieldDropdown,"click",e.hitch(this,function(){this._resetLayerFieldWidth(b)})));this.own(f(b.layerFieldDropdown,"keydown",e.hitch(this,function(a){if(a.keyCode===l.ENTER||a.keyCode===l.SPACE)n.stop(a),this._resetLayerFieldWidth(b)})));this.own(f(b.layerFieldDropdown,
"change",e.hitch(this,function(){this._resetLayerFieldWidth(b);m.set(b.layerFieldDropdown,"aria-label",this.nls.statisticsSettings.fieldNameTitle+" "+b.layerFieldDropdown.value)})));b.layerFieldDropdown.startup();a=b.statisticsTypeDropdown.getValue();this._onStatisticsTypeChange(a,b);m.set(b.layerFieldDropdown,"aria-label",this.nls.statisticsSettings.fieldNameTitle+" "+b.layerFieldDropdown.value)},_addStatisticsLabelTextBox:function(a,b,c){a=r.create("div",{"class":"esriCTTextBoxContainer"},a);b.statisticsLabelTextBox=
new B({"class":"esriCTLayerLabelTextBox"},a);c&&c.label&&b.statisticsLabelTextBox.set("value",c.label);b.statisticsLabelTextBox.startup();m.set(b.statisticsLabelTextBox,"aria-label",this.nls.statisticsSettings.statisticsTitle+" "+b.statisticsLabelTextBox.get("value"))},_updateStatisticsTable:function(a){var b,c;a.layerId&&(a.editable?b=a.layerId:c=a.layerId);c&&(a=this._statisticsLayerTable.getRows(),k.forEach(a,e.hitch(this,function(a){a.layerNameDropDown&&a.layerNameDropDown.get("value")===c&&this._statisticsLayerTable.deleteRow(a)})),
this._layerNameStore.remove(c),a=this._editableConfiguredLayers.indexOf(c),-1!==a&&this._editableConfiguredLayers.splice(a,1));b&&""!==b&&(a=this.layerInfosObj.getLayerInfoById(b))&&a.layerObject&&(a=a.layerObject,this._layerNameStore.put({name:a.name,value:b,geometryType:a.geometryType}),this._editableConfiguredLayers.push(b));this._updateLayerNameOptions()},resetAddNewStatisticsDropdown:function(){var a,b,c,d,f;if(a=g(".simple-table-field.field",this._statisticsLayerTable.domNode))a[0]&&(b=q.getComputedStyle(a[0])),
a[1]&&(c=q.getComputedStyle(a[1])),a[2]&&(d=q.getComputedStyle(a[2]));a=g(".esriCTLayerNameDropdown",this._statisticsLayerTable.domNode);k.forEach(a,e.hitch(this,function(a){(a=g(".dijitReset.dijitInline.dijitSelectLabel.dijitValidationTextBoxLabel",a))&&a[0]&&(f=this.showActionButtonsInColumn?59:30,a[0].style.width=parseInt(b.width,10)-f+"px")}));a=g(".esriCTStatisticsTypeDropdown",this._statisticsLayerTable.domNode);k.forEach(a,e.hitch(this,function(a){(a=g(".dijitReset.dijitInline.dijitSelectLabel.dijitValidationTextBoxLabel",
a))&&a[0]&&(f=this.showActionButtonsInColumn?59:30,a[0].style.width=parseInt(c.width,10)-f+"px")}));a=g(".esriCTStatisticsFieldDropdown",this._statisticsLayerTable.domNode);k.forEach(a,e.hitch(this,function(a){(a=g(".dijitReset.dijitInline.dijitSelectLabel.dijitValidationTextBoxLabel",a))&&a[0]&&(f=this.showActionButtonsInColumn?59:30,a[0].style.width=parseInt(d.width,10)-f+"px")}))},_resetLayerNameWidth:function(a){var b,c;(b=g(".simple-table-field.field",this._statisticsLayerTable.domNode))&&b[0]&&
(c=q.getComputedStyle(b[0]));a=g(".dijitReset.dijitInline.dijitSelectLabel.dijitValidationTextBoxLabel",a.layerNameDropDown.domNode);b=this.showActionButtonsInColumn?59:30;a&&a[0]&&(a[0].style.width=parseInt(c.width,10)-b+"px")},_resetStatisticsTypeWidth:function(a){var b,c;(c=g(".simple-table-field.field",this._statisticsLayerTable.domNode))&&c[1]&&(b=q.getComputedStyle(c[1]));a=g(".dijitReset.dijitInline.dijitSelectLabel.dijitValidationTextBoxLabel",a.statisticsTypeDropdown.domNode);c=this.showActionButtonsInColumn?
59:30;a&&a[0]&&(a[0].style.width=parseInt(b.width,10)-c+"px")},_resetLayerFieldWidth:function(a){var b,c;(b=g(".simple-table-field.field",this._statisticsLayerTable.domNode))&&b[2]&&(c=q.getComputedStyle(b[2]));a=g(".dijitReset.dijitInline.dijitSelectLabel.dijitValidationTextBoxLabel",a.layerFieldDropdown.domNode);b=this.showActionButtonsInColumn?59:30;a&&a[0]&&(a[0].style.width=parseInt(c.width,10)-b+"px")}})});