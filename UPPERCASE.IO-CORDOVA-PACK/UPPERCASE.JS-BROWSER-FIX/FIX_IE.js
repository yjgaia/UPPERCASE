RUN(function(){"use strict";var E=function(E){LOAD(BROWSER_CONFIG.fixScriptsFolderPath+"/IE/"+E+".js")};global.IE={},"Microsoft Internet Explorer"===navigator.appName?(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent),IE.version=INTEGER(RegExp.$1)):"Netscape"===navigator.appName&&(/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent),IE.version=INTEGER(RegExp.$1)),void 0===global.getSelection&&(global.getSelection=function(){return{removeAllRanges:function(){document.selection.empty()}}}),IE.version<=8&&(E("COMMON/UTIL/DATA/PACK_DATA"),E("COMMON/UTIL/DATA/UNPACK_DATA"),E("COMMON/UTIL/DATA_AND_ARRAY/COPY")),E("BROWSER/INFO"),void 0===global.innerWidth&&E("BROWSER/WINDOW/WIN_WIDTH"),void 0===global.innerHeight&&E("BROWSER/WINDOW/WIN_HEIGHT"),IE.version<=6&&E("BROWSER/LIB/iepngfix/iepngfix_tilebg"),E("BROWSER/DOM/STYLE/ADD_STYLE"),IE.version<=9&&(E("BROWSER/DOM/ANIMATION/ANIMATE"),E("BROWSER/DOM/ANIMATION/KEYFRAME")),E("BROWSER/DOM/EVENT/E"),E("BROWSER/DOM/EVENT/EVENT_LOW"),IE.version<=10&&E("BROWSER/DOM/TAG/IMG"),IE.version<=7&&E("BROWSER/DOM/TAG/TABLE"),IE.version<=8&&E("BROWSER/DOM/TAG/TD"),IE.version<=5.5&&E("BROWSER/DOM/TAG/TEXTAREA"),IE.version<=7&&E("BROWSER/DOM/TAG/IFRAME"),IE.version<=7&&E("BROWSER/DOM/TAG/FORM"),IE.version<=9&&E("BROWSER/REQUEST/REQUEST"),RUN(function(){var E=document.createElement("canvas");return void 0===E.getContext||void 0===E.getContext("2d")})===!0&&(global.FlashCanvasOptions={swfPath:BROWSER_CONFIG.fixScriptsFolderPath+"/IE/BROWSER/LIB/"+(BROWSER_CONFIG.isUsingFlashCanvasPro===!0?"flashcanvaspro":"flashcanvas")+"/"},E("BROWSER/LIB/"+(BROWSER_CONFIG.isUsingFlashCanvasPro===!0?"flashcanvaspro":"flashcanvas")+"/flashcanvas"),E("BROWSER/DOM/TAG/CANVAS"),E("BROWSER/GRAPHIC/EXPORT_IMG_DATA")),IE.version<=7&&E("BROWSER/DOM/CLEAR_BOTH"),IE.version<=10&&E("BROWSER/GRAPHIC/EXPORT_IMG_TYPE"),IE.version<=8&&E("BROWSER/VIEW/REFRESH")});