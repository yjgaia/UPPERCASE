global.BOOT=BOOT=function(params){"use strict";var fs=require("fs"),path=require("path"),version="V"+Date.now(),rootPath=process.cwd(),browserScript="global = window;\n",initStyleCSS=fs.readFileSync(__dirname+"/INIT_STYLE.css").toString(),indexPageContent="",loadJSForNode=function(e){require(e)},loadJSForBrowser=function(e){browserScript+=fs.readFileSync(e).toString()+"\n"},loadJSForClient=function(e){loadJSForBrowser(e)},loadJSForCommon=function(e){loadJSForNode(e),loadJSForBrowser(e)},loadCoffeeForNode=function(e){RUN_COFFEE(fs.readFileSync(e).toString())},loadCoffeeForBrowser=function(e){browserScript+=COMPILE_COFFEE_TO_JS(fs.readFileSync(e).toString())+"\n"},loadCoffeeForClient=function(e){loadCoffeeForBrowser(e)},loadCoffeeForCommon=function(e){loadCoffeeForNode(e),loadCoffeeForBrowser(e)},loadLiterateCoffeeForNode=function(e){RUN_LITCOFFEE(fs.readFileSync(e).toString())},loadLiterateCoffeeForBrowser=function(e){browserScript+=COMPILE_LITCOFFEE_TO_JS(fs.readFileSync(e).toString())+"\n"},loadLiterateCoffeeForClient=function(e){loadLiterateCoffeeForBrowser(e)},loadLiterateCoffeeForCommon=function(e){loadLiterateCoffeeForNode(e),loadLiterateCoffeeForBrowser(e)},checkIsAllowedFolderName=function(e){return"."!==e[0]&&"node_modules"!==e&&"not_load"!==e&&"deprecated"!==e&&"_"!==e[0]},loadUJS,initBoxes,configuration,clustering,initDatabase,initModelSystem,loadAllScripts,generateIndexPage,run;loadUJS=function(){loadJSForCommon(__dirname+"/UPPERCASE.JS-COMMON.js"),loadJSForNode(__dirname+"/UPPERCASE.JS-NODE.js"),loadJSForBrowser(__dirname+"/UPPERCASE.JS-BROWSER.js")},configuration=function(){var _CONFIG,_NODE_CONFIG,_BROWSER_CONFIG,stringifyJSONWithFunction=function(data){return JSON.stringify(data,function(e,o){return"function"==typeof o?"__THIS_IS_FUNCTION_START__"+o.toString()+"__THIS_IS_FUNCTION_END__":o},"	").replace(/("__THIS_IS_FUNCTION_START__(.*)__THIS_IS_FUNCTION_END__")/g,function(match,content){return eval("("+eval('"'+content.substring('"__THIS_IS_FUNCTION_START__'.length,content.length-'__THIS_IS_FUNCTION_END__"'.length)+'"')+")").toString()})};CONFIG.version=version,browserScript+="CONFIG.version = '"+version+"'\n",NODE_CONFIG.rootPath=rootPath,void 0!==params&&(_CONFIG=params.CONFIG,_NODE_CONFIG=params.NODE_CONFIG,_BROWSER_CONFIG=params.BROWSER_CONFIG),void 0!==_CONFIG&&(EXTEND({origin:CONFIG,extend:_CONFIG}),browserScript+="EXTEND({ origin : CONFIG, extend : "+stringifyJSONWithFunction(_CONFIG)+" });\n"),void 0!==_NODE_CONFIG&&EXTEND({origin:NODE_CONFIG,extend:_NODE_CONFIG}),void 0!==_BROWSER_CONFIG&&(browserScript+="EXTEND({ origin : BROWSER_CONFIG, extend : "+stringifyJSONWithFunction(_BROWSER_CONFIG)+" });\n")},initBoxes=function(){loadJSForCommon(__dirname+"/UPPERCASE.IO-BOX/CORE.js"),fs.readdirSync(rootPath).forEach(function(e){fs.statSync(rootPath+"/"+e).isDirectory()===!0&&checkIsAllowedFolderName(e)===!0&&(BOX(e),browserScript+="BOX('"+e+"');\n")}),loadJSForBrowser(__dirname+"/UPPERCASE.IO-BOX/BROWSER.js")},clustering=function(e){CPU_CLUSTERING(function(o){void 0!==NODE_CONFIG.serverClusteringHosts&&void 0!==NODE_CONFIG.serverClusteringPort?SERVER_CLUSTERING({hosts:NODE_CONFIG.serverClusteringHosts,port:NODE_CONFIG.serverClusteringPort},function(){e(o)}):e(o)})},initDatabase=function(){loadJSForNode(__dirname+"/UPPERCASE.IO-DB/NODE.js"),void 0!==NODE_CONFIG.dbName&&CONNECT_TO_DB_SERVER({name:NODE_CONFIG.dbName,host:NODE_CONFIG.dbHost,port:NODE_CONFIG.dbPort,username:NODE_CONFIG.dbUsername,password:NODE_CONFIG.dbPassword})},initModelSystem=function(){loadJSForNode(__dirname+"/UPPERCASE.IO-TRANSPORT/NODE.js"),loadJSForBrowser(__dirname+"/UPPERCASE.IO-TRANSPORT/BROWSER.js"),loadJSForNode(__dirname+"/UPPERCASE.IO-ROOM/NODE.js"),loadJSForClient(__dirname+"/UPPERCASE.IO-ROOM/CLIENT.js"),loadJSForBrowser(__dirname+"/UPPERCASE.IO-ROOM/BROWSER.js"),loadJSForCommon(__dirname+"/UPPERCASE.IO-MODEL/COMMON.js"),loadJSForNode(__dirname+"/UPPERCASE.IO-MODEL/NODE.js"),loadJSForClient(__dirname+"/UPPERCASE.IO-MODEL/CLIENT.js")},loadAllScripts=function(){var e=function(e,o,t,n){var r=function(e){var i;fs.existsSync(e)===!0&&(i=[],fs.readdirSync(e).forEach(function(r){var a=e+"/"+r,s=path.extname(r).toLowerCase();fs.statSync(a).isDirectory()===!0?checkIsAllowedFolderName(r)===!0&&i.push(a):".js"===s?o(a):".coffee"===s?t(a):".litcoffee"===s&&n(a)}),EACH(i,function(e){r(e)}))};FOR_BOX(function(o){r(rootPath+"/"+o.boxName+"/"+e)})};e("COMMON",loadJSForCommon,loadCoffeeForCommon,loadLiterateCoffeeForCommon),e("NODE",loadJSForNode,loadCoffeeForNode,loadLiterateCoffeeForNode),e("BROWSER",loadJSForBrowser,loadCoffeeForBrowser,loadLiterateCoffeeForBrowser)},generateIndexPage=function(){indexPageContent+="<!DOCTYPE html>",indexPageContent+="<html>",indexPageContent+="<head>",indexPageContent+='<meta charset="utf-8">',indexPageContent+='<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'+(CONFIG.isMobileFullScreen===!0?", minimal-ui":"")+'">',indexPageContent+='<meta name="google" value="notranslate">',void 0!==CONFIG.googleSiteVerificationKey&&(indexPageContent+='<meta name="google-site-verification" content="'+CONFIG.googleSiteVerificationKey+'" />'),indexPageContent+='<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">',void 0!==CONFIG.description&&(indexPageContent+='<meta name="description" content="'+CONFIG.description+'">'),indexPageContent+='<link href="/favicon.ico" rel="shortcut icon">',indexPageContent+="<title>"+CONFIG.defaultTitle+"</title>",indexPageContent+='<link rel="stylesheet" type="text/css" href="/__CSS?'+CONFIG.version+'" />',indexPageContent+="</head>",indexPageContent+="<body>",indexPageContent+="<noscript>",indexPageContent+='<p style="padding:15px;">',indexPageContent+="JavaScript is disabled. Please enable JavaScript in your browser.",indexPageContent+="</p>",indexPageContent+="</noscript>",indexPageContent+='<script type="text/javascript" src="/__SCRIPT?'+CONFIG.version+'"></script>',indexPageContent+="</body>",indexPageContent+="</html>"},run=function(e){var o,t;INIT_OBJECTS(),FOR_BOX(function(o){void 0!==o.MAIN&&o.MAIN(e)}),(void 0!==CONFIG.webServerPort||void 0!==CONFIG.sercuredWebServerPort)&&(loadJSForNode(__dirname+"/UPPERCASE.IO-UPLOAD/NODE.js"),o=RESOURCE_SERVER({port:CONFIG.webServerPort,securedPort:CONFIG.sercuredWebServerPort,securedKeyFilePath:rootPath+"/"+NODE_CONFIG.securedKeyFilePath,securedCertFilePath:rootPath+"/"+NODE_CONFIG.securedCertFilePath,notParsingNativeReqURIs:["__UPLOAD"],rootPath:rootPath,version:version},{requestListener:function(e,o,n,r,i){var a,s,d=e.uri,O=e.params;return"__SCRIPT"===d?(o({contentType:"text/javascript",content:browserScript,version:version}),!1):"__CSS"===d?(o({contentType:"text/css",content:initStyleCSS,version:version}),!1):"__UPLOAD_SERVER_HOST"===d?(o({content:""}),!1):"__UPLOAD"===d?(UPLOAD_REQUEST({requestInfo:e,uploadPath:rootPath+"/__RF/__TEMP"},{overFileSize:function(){o({statusCode:302,headers:{Location:O.callbackURL+"?maxUploadFileMB="+NODE_CONFIG.maxUploadFileMB}})},success:function(e){var t,n=O.boxName,r=BOX.getBoxes()[void 0===n?CONFIG.defaultBoxName:n];void 0!==r&&(t=r.DB("__UPLOAD_FILE"),NEXT(e,[function(e,o){var r=e.path;delete e.path,e.serverId=1,t.create(e,function(e){MOVE_FILE({srcPath:r,distPath:rootPath+"/__RF/"+n+"/"+e.id},o)})},function(){return function(){o({statusCode:302,headers:{Location:O.callbackURL+"?fileDataSetStr="+encodeURIComponent(STRINGIFY(e))}})}}]))}}),!1):"__RF/"===d.substring(0,5)?(d=d.substring(5),s=d.indexOf("/"),-1!==s&&(a=d.substring(0,s),"UPPERCASE.IO"===a||void 0!==BOX.getBoxes()[a]?d=d.substring(s+1):a=CONFIG.defaultBoxName,BOX.getBoxes()[a].DB("__UPLOAD_FILE").get(d,function(e){i({contentType:e.type,headers:{"Content-Disposition":'attachment; filename="'+e.name+'"'},isFinal:!0})})),!1):"__UPLOAD_CALLBACK"===d?(o(void 0!==O.maxUploadFileMB?{content:"<script>maxUploadFileMB="+O.maxUploadFileMB+"</script>"}:{content:"<script>fileDataSetStr='"+O.fileDataSetStr+"'</script>"}),!1):"__SOCKET_SERVER_HOST"===d?(o({content:""}),!1):"__WEB_SOCKET_SERVER_HOST"===d?(o({content:""}),!1):"__WEB_SOCKET_FIX"===d?(t(e,{response:o,onDisconnected:n}),!1):(s=d.indexOf("/"),-1===s?a=CONFIG.defaultBoxName:(a=d.substring(0,s),"UPPERCASE.IO"===a||void 0!==BOX.getBoxes()[a]?d=d.substring(s+1):a=CONFIG.defaultBoxName),"UPPERCASE.IO"===a?(r(__dirname+"/UPPERCASE.IO-TRANSPORT/R"),e.uri=d):e.uri=a+"/R"+(""===d?"":"/"+d),void 0)},notExistsResource:function(e,o,t){o.uri===CONFIG.defaultBoxName+"/R"&&t({contentType:"text/html",content:indexPageContent})}}),t=LAUNCH_ROOM_SERVER({socketServerPort:CONFIG.socketServerPort,webServer:o,isCreateWebSocketFixRequestManager:!0}).getWebSocketFixRequest()),console.log("[UPPERCASE.IO] `"+CONFIG.defaultTitle+"` WORKER #"+e.id+" (PID:"+e.pid+") BOOTed!"+(void 0===CONFIG.webServerPort?"":" => http://localhost:"+CONFIG.webServerPort)+(void 0===CONFIG.securedWebServerPort?"":" => https://localhost:"+CONFIG.securedWebServerPort))},loadUJS(),initBoxes(),loadJSForCommon(__dirname+"/UPPERCASE.IO-BOOT/COMMON.js"),loadJSForClient(__dirname+"/UPPERCASE.IO-BOOT/BROWSER.js"),loadJSForClient(__dirname+"/UPPERCASE.IO-BOOT/CLIENT.js"),loadJSForNode(__dirname+"/UPPERCASE.IO-UTIL/NODE.js"),configuration(),clustering(function(e){initDatabase(),initModelSystem(),loadAllScripts(),CONFIG.isDevMode!==!0&&(browserScript=MINIFY_JS(browserScript)),generateIndexPage(),run(e)})};