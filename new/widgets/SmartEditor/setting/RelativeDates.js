// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/SmartEditor/setting/RelativeDates.html":'\x3cdiv\x3e\r\n    \x3cdiv\x3e\r\n        \x3cdiv class\x3d"esriCTLabel"\x3e${nls.relativeDates.dateTypeLabel}\x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTRadioButtonContainer"\x3e\r\n            \x3cdiv class\x3d"esriCTRadioBtn"\x3e\r\n                \x3cinput data-dojo-type\x3d"jimu/dijit/RadioBtn" data-dojo-props\x3d"group: \'g1\'" type\x3d"radio" name\x3d"jimuradiobtn" id\x3d"fixedRadioButton" checked\r\n                    data-dojo-attach-point\x3d"fixedRadioButton" tabindex\x3d"0" role\x3d"button" aria-label\x3d"${nls.relativeDates.dateTypeLabel}${nls.relativeDates.fixed}"\x3e\r\n                \x3clabel class\x3d"esriCTRadioLabel" for\x3d"fixedRadioButton"\x3e\r\n                    ${nls.relativeDates.fixed}\r\n                \x3c/label\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTRadioBtn"\x3e\r\n                \x3cinput data-dojo-type\x3d"jimu/dijit/RadioBtn" data-dojo-props\x3d"group: \'g1\'" type\x3d"radio" name\x3d"jimuradiobtn" id\x3d"currentRadioButton"  data-dojo-attach-point\x3d"currentRadioButton" tabindex\x3d"0" role\x3d"button" aria-label\x3d"${nls.relativeDates.dateTypeLabel}${nls.relativeDates.current}"\x3e\r\n                \x3clabel class\x3d"esriCTRadioLabel" for\x3d"currentRadioButton"\x3e\r\n                    ${nls.relativeDates.current}\r\n                \x3c/label\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTRadioBtn"\x3e\r\n                \x3cinput data-dojo-type\x3d"jimu/dijit/RadioBtn" data-dojo-props\x3d"group: \'g1\'" type\x3d"radio" name\x3d"jimuradiobtn" id\x3d"PastRadioButton"  data-dojo-attach-point\x3d"PastRadioButton" tabindex\x3d"0" role\x3d"button" aria-label\x3d"${nls.relativeDates.dateTypeLabel}${nls.relativeDates.past}"\x3e\r\n                \x3clabel class\x3d"esriCTRadioLabel" for\x3d"PastRadioButton"\x3e\r\n                    ${nls.relativeDates.past}\r\n                \x3c/label\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTRadioBtn"\x3e\r\n                \x3cinput data-dojo-type\x3d"jimu/dijit/RadioBtn" data-dojo-props\x3d"group: \'g1\'" type\x3d"radio" name\x3d"jimuradiobtn" id\x3d"futureRadioButton"  data-dojo-attach-point\x3d"futureRadioButton" tabindex\x3d"0" role\x3d"button" aria-label\x3d"${nls.relativeDates.dateTypeLabel}${nls.relativeDates.future}"\x3e\r\n                \x3clabel class\x3d"esriCTRadioLabel" for\x3d"futureRadioButton"\x3e\r\n                    ${nls.relativeDates.future}\r\n                \x3c/label\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTRelativeDatesHint" data-dojo-attach-point\x3d"hintForDateType"\x3e${nls.relativeDates.hintForFixedDateType}\x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTLabel" style\x3d"margin-top:10px;" data-dojo-attach-point\x3d"valueLabel"\x3e${nls.relativeDates.valueLabel}\x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTFixedDateContent" data-dojo-attach-point\x3d"fixedDateContent"\x3e\r\n        \x3cdiv class\x3d"esriCTFixedContentWrappper"\x3e\r\n            \x3cdiv class\x3d"esriCTFixedContentLabel"\x3e${nls.date}\x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTFixedContentDijit"\x3e\r\n                \x3cdiv style\x3d"width:85%" data-dojo-type\x3d"dijit/form/DateTextBox" required\x3d"false" data-dojo-attach-point\x3d"dateTextBox" tabindex\x3d"0" aria-label\x3d"${nls.date}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTFixedContentWrappper"\x3e\r\n            \x3cdiv class\x3d"esriCTFixedContentLabel"\x3e${nls.time}\x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTFixedContentDijit"\x3e\r\n                \x3cdiv style\x3d"width:85%" data-dojo-type\x3d"dijit/form/TimeTextBox" required\x3d"false" data-dojo-attach-point\x3d"timeTextBox" tabindex\x3d"0" aria-label\x3d"${nls.time}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTHidden" style\x3d"width:100%" data-dojo-attach-point\x3d"currentDateContent"\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTHidden esriCTPastOrFutureDateContent" data-dojo-attach-point\x3d"pastOrFutureDateContent"\x3e\r\n        \x3cdiv class\x3d"esriCTMarginForLabel"\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTMarginForLabel"\x3e\r\n            \x3cdiv class\x3d"esriCTFloatLeft"\x3e\r\n                \x3cdiv class\x3d"esriCTValueLabel"\x3e${nls.years}\x3c/div\x3e\r\n                \x3cdiv style\x3d"width:112px" data-dojo-type\x3d"dijit/form/NumberSpinner" required\x3d"true" value\x3d"0"\r\n                    data-dojo-props\x3d"constraints:{min:0,places:0},intermediateChanges:true" data-dojo-attach-point\x3d"yearsTextBox" tabindex\x3d"0"\r\n                    aria-label\x3d"${nls.years}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTFloatLeft"\x3e\r\n                \x3cdiv class\x3d"esriCTValueLabel"\x3e${nls.months}\x3c/div\x3e\r\n                \x3cdiv style\x3d"width:112px" data-dojo-type\x3d"dijit/form/NumberSpinner" required\x3d"true" value\x3d"0"\r\n                    data-dojo-props\x3d"constraints:{min:0,places:0},intermediateChanges:true" data-dojo-attach-point\x3d"monthsTextBox" tabindex\x3d"0"\r\n                    aria-label\x3d"${nls.months}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTFloatLeft"\x3e\r\n                \x3cdiv class\x3d"esriCTValueLabel"\x3e${nls.days}\x3c/div\x3e\r\n                \x3cdiv style\x3d"width:112px" data-dojo-type\x3d"dijit/form/NumberSpinner" required\x3d"true" value\x3d"0"\r\n                    data-dojo-props\x3d"constraints:{min:0,places:0},intermediateChanges:true" data-dojo-attach-point\x3d"daysTextBox" tabindex\x3d"0"\r\n                    aria-label\x3d"${nls.days}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTMarginForLabel" style\x3d"margin-top: 5px;"\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTMarginForLabel"\x3e\r\n            \x3cdiv class\x3d"esriCTFloatLeft"\x3e\r\n                \x3cdiv class\x3d"esriCTValueLabel"\x3e${nls.hours}\x3c/div\x3e\r\n                \x3cdiv style\x3d"width:112px" data-dojo-type\x3d"dijit/form/NumberSpinner" required\x3d"true" value\x3d"0"\r\n                    data-dojo-props\x3d"constraints:{min:0,places:0},intermediateChanges:true" data-dojo-attach-point\x3d"hoursTextBox" tabindex\x3d"0"\r\n                    aria-label\x3d"${nls.hours}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTFloatLeft"\x3e\r\n                \x3cdiv class\x3d"esriCTValueLabel"\x3e${nls.minutes}\x3c/div\x3e\r\n                \x3cdiv style\x3d"width:112px" data-dojo-type\x3d"dijit/form/NumberSpinner" required\x3d"true" value\x3d"0"\r\n                    data-dojo-props\x3d"constraints:{min:0,places:0},intermediateChanges:true" data-dojo-attach-point\x3d"minutesTextBox" tabindex\x3d"0"\r\n                    aria-label\x3d"${nls.minutes}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTFloatLeft"\x3e\r\n                \x3cdiv class\x3d"esriCTValueLabel"\x3e${nls.seconds}\x3c/div\x3e\r\n                \x3cdiv style\x3d"width:112px" data-dojo-type\x3d"dijit/form/NumberSpinner" required\x3d"true" value\x3d"0"\r\n                    data-dojo-props\x3d"constraints:{min:0,places:0},intermediateChanges:true" data-dojo-attach-point\x3d"secondsTextBox" tabindex\x3d"0"\r\n                    aria-label\x3d"${nls.seconds}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTHidden esriCTDatesWarningContainer" data-dojo-attach-point\x3d"relativeDateWarningContainer"\x3e${nls.relativeDates.relativeDateWarning}\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/Evented dojo/_base/lang dojo/on dojo/text!./RelativeDates.html dijit/_WidgetsInTemplateMixin jimu/BaseWidgetSetting jimu/dijit/Popup dojo/dom-class jimu/utils dojo/query dijit/focus ../presetUtils dijit/form/DateTextBox dijit/form/TimeTextBox dijit/form/NumberTextBox jimu/dijit/RadioBtn".split(" "),function(f,g,b,d,h,k,l,m,a,e,n,p,q){return f([l,g,k],{baseClass:"jimu-widget-smartEditor-setting-relativeDates",templateString:h,selectValuePopup:null,postCreate:function(){this._eventListener();
this._createSelectValuePopUp();this._support508ForSelectValuePopUp();d(window,"resize",b.hitch(this,function(){setTimeout(b.hitch(this,function(){this._setFieldPopupDimensions()}),1E3)}))},_eventListener:function(){this.fixedRadioButton.onStateChange=b.hitch(this,function(){this.dateTypeChanged()});this.currentRadioButton.onStateChange=b.hitch(this,function(){this.dateTypeChanged()});this.PastRadioButton.onStateChange=b.hitch(this,function(){this.dateTypeChanged()});this.futureRadioButton.onStateChange=
b.hitch(this,function(){this.dateTypeChanged()});this.own(d(this.yearsTextBox,"change",b.hitch(this,function(){this._showOrHideWarningContainer()})));this.own(d(this.monthsTextBox,"change",b.hitch(this,function(){this._showOrHideWarningContainer()})));this.own(d(this.daysTextBox,"change",b.hitch(this,function(){this._showOrHideWarningContainer()})));this.own(d(this.minutesTextBox,"change",b.hitch(this,function(){this._showOrHideWarningContainer()})));this.own(d(this.hoursTextBox,"change",b.hitch(this,
function(){this._showOrHideWarningContainer()})));this.own(d(this.secondsTextBox,"change",b.hitch(this,function(){this._showOrHideWarningContainer()})))},dateTypeChanged:function(){a.add(this.fixedDateContent,"esriCTHidden");a.add(this.currentDateContent,"esriCTHidden");a.add(this.pastOrFutureDateContent,"esriCTHidden");a.remove(this.valueLabel,"esriCTHidden");a.add(this.relativeDateWarningContainer,"esriCTHidden");this.fixedRadioButton.checked?(a.remove(this.fixedDateContent,"esriCTHidden"),this.hintForDateType.innerHTML=
this.nls.relativeDates.hintForFixedDateType):this.currentRadioButton.checked?(a.add(this.valueLabel,"esriCTHidden"),a.remove(this.currentDateContent,"esriCTHidden"),this.hintForDateType.innerHTML=this.nls.relativeDates.hintForCurrentDateType):this.PastRadioButton.checked?(a.remove(this.pastOrFutureDateContent,"esriCTHidden"),this.hintForDateType.innerHTML=this.nls.relativeDates.hintForPastDateType):this.futureRadioButton.checked&&(a.remove(this.pastOrFutureDateContent,"esriCTHidden"),this.hintForDateType.innerHTML=
this.nls.relativeDates.hintForFutureDateType)},_createSelectValuePopUp:function(){this.selectValuePopup=new m({titleLabel:this.nls.relativeDates.popupTitle,width:500,maxHeight:450,autoHeight:!0,"class":this.baseClass,content:this,buttons:[{label:this.nls.ok,onClick:b.hitch(this,function(){var c=this._getValues();c&&(!a.contains(this.pastOrFutureDateContent,"esriCTHidden")&&this._checkTextboxesWithZeroValue()?a.remove(this.relativeDateWarningContainer,"esriCTHidden"):(a.add(this.relativeDateWarningContainer,
"esriCTHidden"),this.emit("updatePresetValue",c),this.selectValuePopup.close()))})},{label:this.nls.cancel,classNames:["jimu-btn-vacation"],onClick:b.hitch(this,function(){this.selectValuePopup.close()})}]});this.relativeDates&&this._setValue();this._setFieldPopupDimensions()},_setFieldPopupDimensions:function(){this.selectValuePopup&&(window.appInfo.isRunInMobile&&600>window.innerWidth?this.selectValuePopup.set("width",window.innerWidth-100):this.selectValuePopup.set("width",500))},_validateFixedDate:function(){return this.dateTextBox.isValid()?
this.timeTextBox.isValid()?!0:(this.timeTextBox.focus(),!1):(this.dateTextBox.focus(),!1)},_validatePastOrFutureDate:function(){return this.yearsTextBox.isValid()?this.monthsTextBox.isValid()?this.daysTextBox.isValid()?this.hoursTextBox.isValid()?this.minutesTextBox.isValid()?this.secondsTextBox.isValid()?!0:(this.secondsTextBox.focus(),!1):(this.minutesTextBox.focus(),!1):(this.hoursTextBox.focus(),!1):(this.daysTextBox.focus(),!1):(this.monthsTextBox.focus(),!1):(this.yearsTextBox.focus(),!1)},
_getValues:function(){var c=!0,a={value:{}};if(this.fixedRadioButton.checked){if(c=this._validateFixedDate())a.dateType="fixed",a.dateTime=q.getDateFieldValue({type:"esriFieldTypeDate"},[this.dateTextBox,this.timeTextBox])}else if(this.currentRadioButton.checked)a.dateType="current";else if(this.PastRadioButton.checked){if(c=this._validatePastOrFutureDate())a=this._getValuesOfPastOrFutureDijits(),a.dateType="past"}else this.futureRadioButton.checked&&(c=this._validatePastOrFutureDate())&&(a=this._getValuesOfPastOrFutureDijits(),
a.dateType="future");return c?a:c},_support508ForSelectValuePopUp:function(){var a=n(".jimu-btn-vacation",this.selectValuePopup.domNode)[0];e.initFirstFocusNode(this.selectValuePopup.domNode,this.selectValuePopup.closeBtnNode);p.focus(this.selectValuePopup.closeBtnNode);e.initLastFocusNode(this.selectValuePopup.domNode,a)},_setValue:function(){var a;"fixed"===this.relativeDates.dateType&&(this.fixedRadioButton.domNode.click(),a=new Date(parseInt(this.relativeDates.dateTime,10)),this.dateTextBox.set("value",
a),this.timeTextBox.set("value",a));"current"===this.relativeDates.dateType&&this.currentRadioButton.domNode.click();"past"===this.relativeDates.dateType&&(this.PastRadioButton.domNode.click(),this._setValuesOfPastOrFutureDijits());"future"===this.relativeDates.dateType&&(this.futureRadioButton.domNode.click(),this._setValuesOfPastOrFutureDijits())},_setValuesOfPastOrFutureDijits:function(){this.yearsTextBox.set("value",this.relativeDates.year);this.monthsTextBox.set("value",this.relativeDates.month);
this.daysTextBox.set("value",this.relativeDates.day);this.hoursTextBox.set("value",this.relativeDates.hour);this.minutesTextBox.set("value",this.relativeDates.minute);this.secondsTextBox.set("value",this.relativeDates.second)},_getValuesOfPastOrFutureDijits:function(){var a={};a.year=this.yearsTextBox.value;a.month=this.monthsTextBox.value;a.day=this.daysTextBox.value;a.hour=this.hoursTextBox.value;a.minute=this.minutesTextBox.value;a.second=this.secondsTextBox.value;return a},_checkTextboxesWithZeroValue:function(){return 0!==
this.yearsTextBox.value||0!==this.monthsTextBox.value||0!==this.daysTextBox.value||0!==this.hoursTextBox.value||0!==this.minutesTextBox.value||0!==this.secondsTextBox.value?!1:!0},_showOrHideWarningContainer:function(){this._checkTextboxesWithZeroValue()?a.remove(this.relativeDateWarningContainer,"esriCTHidden"):a.add(this.relativeDateWarningContainer,"esriCTHidden")}})});