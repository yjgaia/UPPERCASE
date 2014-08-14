global.BOOT = BOOT = function(params) {
	'use strict';
	//OPTIONAL: params
	//OPTIONAL: params.CONFIG
	//OPTIONAL: params.NODE_CONFIG
	//OPTIONAL: params.BROWSER_CONFIG

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	path = require('path'),

	// version
	version = 'V' + Date.now(),

	// root path
	rootPath = process.cwd(),

	// browser script
	browserScript = 'global = window;\n',

	// init style css
	initStyleCSS = fs.readFileSync(__dirname + '/INIT_STYLE.css').toString(),

	// index page content
	indexPageContent = '',

	// load js for node.
	loadJSForNode = function(path) {
		require(path);
	},

	// load js for browser.
	loadJSForBrowser = function(path) {
		browserScript += fs.readFileSync(path).toString() + '\n';
	},

	// load js for client.
	loadJSForClient = function(path) {
		loadJSForBrowser(path);
	},

	// load js for common.
	loadJSForCommon = function(path) {
		loadJSForNode(path);
		loadJSForBrowser(path);
	},

	// load coffeescript for node.
	loadCoffeeForNode = function(path) {
		RUN_COFFEE(fs.readFileSync(path).toString());
	},

	// load coffeescript for browser.
	loadCoffeeForBrowser = function(path) {
		browserScript += COMPILE_COFFEE_TO_JS(fs.readFileSync(path).toString()) + '\n';
	},

	// load coffeescript for client.
	loadCoffeeForClient = function(path) {
		loadCoffeeForBrowser(path);
	},

	// load coffeescript for common.
	loadCoffeeForCommon = function(path) {
		loadCoffeeForNode(path);
		loadCoffeeForBrowser(path);
	},

	// load literate coffeescript for node.
	loadLiterateCoffeeForNode = function(path) {
		RUN_LITCOFFEE(fs.readFileSync(path).toString());
	},

	// load literate coffeescript for browser.
	loadLiterateCoffeeForBrowser = function(path) {
		browserScript += COMPILE_LITCOFFEE_TO_JS(fs.readFileSync(path).toString()) + '\n';
	},

	// load literate coffeescript for client.
	loadLiterateCoffeeForClient = function(path) {
		loadLiterateCoffeeForBrowser(path);
	},

	// load literate coffeescript for common.
	loadLiterateCoffeeForCommon = function(path) {
		loadLiterateCoffeeForNode(path);
		loadLiterateCoffeeForBrowser(path);
	},

	// check is allowed folder name.
	checkIsAllowedFolderName = function(name) {

		return (

			// hide folder
			name[0] !== '.' &&

			// node.js module
			name !== 'node_modules' &&

			// not_load
			name !== 'not_load' &&

			// deprecated
			name !== 'deprecated' &&

			// _ folder
			name[0] !== '_'
		);
	},

	// load UPPERCASE.JS.
	loadUJS,

	// init boxes.
	initBoxes,

	// configuration.
	configuration,

	// clustering cpus and servers.
	clustering,

	// init database.
	initDatabase,

	// init model system.
	initModelSystem,

	// load all scripts.
	loadAllScripts,

	// generate index page.
	generateIndexPage,

	// run.
	run;

	loadUJS = function() {

		// load UPPERCASE.JS.
		loadJSForCommon(__dirname + '/UPPERCASE.JS-COMMON.js');
		loadJSForNode(__dirname + '/UPPERCASE.JS-NODE.js');
		loadJSForBrowser(__dirname + '/UPPERCASE.JS-BROWSER.js');
	};

	configuration = function() {

		var
		// _CONFIG
		_CONFIG,

		// _NODE_CONFIG
		_NODE_CONFIG,

		// _BROWSER_CONFIG
		_BROWSER_CONFIG,

		// stringify JSON with function.
		stringifyJSONWithFunction = function(data) {

			return JSON.stringify(data, function(key, value) {
				if ( typeof value === 'function') {
					return '__THIS_IS_FUNCTION_START__' + value.toString() + '__THIS_IS_FUNCTION_END__';
				}
				return value;
			}, '\t').replace(/("__THIS_IS_FUNCTION_START__(.*)__THIS_IS_FUNCTION_END__")/g, function(match, content) {
				return eval('(' + eval('"' + content.substring('"__THIS_IS_FUNCTION_START__'.length, content.length - '__THIS_IS_FUNCTION_END__"'.length) + '"') + ')').toString();
			});
		};

		// set version.
		CONFIG.version = version;
		browserScript += 'CONFIG.version = \'' + version + '\'\n';

		// set root path.
		NODE_CONFIG.rootPath = rootPath;

		if (params !== undefined) {
			_CONFIG = params.CONFIG;
			_NODE_CONFIG = params.NODE_CONFIG;
			_BROWSER_CONFIG = params.BROWSER_CONFIG;
		}

		// override CONFIG.
		if (_CONFIG !== undefined) {

			// extend CONFIG.
			EXTEND({
				origin : CONFIG,
				extend : _CONFIG
			});

			// add to browser script.
			browserScript += 'EXTEND({ origin : CONFIG, extend : ' + stringifyJSONWithFunction(_CONFIG) + ' });\n';
		}

		// override NODE_CONFIG.
		if (_NODE_CONFIG !== undefined) {

			// extend NODE_CONFIG.
			EXTEND({
				origin : NODE_CONFIG,
				extend : _NODE_CONFIG
			});
		}

		// override BROWSER_CONFIG.
		if (_BROWSER_CONFIG !== undefined) {

			// add to browser script.
			browserScript += 'EXTEND({ origin : BROWSER_CONFIG, extend : ' + stringifyJSONWithFunction(_BROWSER_CONFIG) + ' });\n';
		}
	};

	initBoxes = function(next) {

		// load UPPERCASE.IO-BOX/CORE.
		loadJSForCommon(__dirname + '/UPPERCASE.IO-BOX/CORE.js');

		fs.readdirSync(rootPath).forEach(function(folderName) {

			if (
			// is folder
			fs.statSync(rootPath + '/' + folderName).isDirectory() === true &&

			// is allowd folder name
			checkIsAllowedFolderName(folderName) === true) {

				// create box.
				BOX(folderName);

				// add to browser script.
				browserScript += 'BOX(\'' + folderName + '\');\n';
			}
		});

		// load UPPERCASE.IO-BOX/BROWSER.
		loadJSForBrowser(__dirname + '/UPPERCASE.IO-BOX/BROWSER.js');
	};

	clustering = function(work) {

		CPU_CLUSTERING(function(workerData, on, off, broadcast) {

			if (NODE_CONFIG.serverClusteringHosts !== undefined && NODE_CONFIG.serverClusteringPort !== undefined) {

				SERVER_CLUSTERING({
					hosts : NODE_CONFIG.serverClusteringHosts,
					port : NODE_CONFIG.serverClusteringPort
				}, function() {
					work(workerData);
				});

			} else {
				work(workerData);
			}
		});
	};

	initDatabase = function() {

		// load UPPERCASE.IO-DB.
		loadJSForNode(__dirname + '/UPPERCASE.IO-DB/NODE.js');

		if (NODE_CONFIG.dbName !== undefined) {

			CONNECT_TO_DB_SERVER({
				name : NODE_CONFIG.dbName,
				host : NODE_CONFIG.dbHost,
				port : NODE_CONFIG.dbPort,
				username : NODE_CONFIG.dbUsername,
				password : NODE_CONFIG.dbPassword
			});
		}
	};

	initModelSystem = function() {

		// load UPPERCASE.IO-TRANSPORT.
		loadJSForNode(__dirname + '/UPPERCASE.IO-TRANSPORT/NODE.js');
		loadJSForBrowser(__dirname + '/UPPERCASE.IO-TRANSPORT/BROWSER.js');

		// load UPPERCASE.IO-ROOM.
		loadJSForNode(__dirname + '/UPPERCASE.IO-ROOM/NODE.js');
		loadJSForClient(__dirname + '/UPPERCASE.IO-ROOM/CLIENT.js');
		loadJSForBrowser(__dirname + '/UPPERCASE.IO-ROOM/BROWSER.js');

		// load UPPERCASE.IO-MODEL.
		loadJSForCommon(__dirname + '/UPPERCASE.IO-MODEL/COMMON.js');
		loadJSForNode(__dirname + '/UPPERCASE.IO-MODEL/NODE.js');
		loadJSForClient(__dirname + '/UPPERCASE.IO-MODEL/CLIENT.js');
	};

	loadAllScripts = function() {

		var
		// scan all box folders.
		scanAllBoxFolders = function(folderName, funcForJS, funcForCoffee, funcForLiterateCoffee) {

			var
			// scan folder
			scanFolder = function(folderPath) {

				var
				// full paths
				fullPaths;

				if (fs.existsSync(folderPath) === true) {

					fullPaths = [];

					fs.readdirSync(folderPath).forEach(function(fileName) {

						var
						// full path
						fullPath = folderPath + '/' + fileName,

						// extname
						extname = path.extname(fileName).toLowerCase();

						if (fs.statSync(fullPath).isDirectory() === true) {
							if (checkIsAllowedFolderName(fileName) === true) {
								fullPaths.push(fullPath);
							}
						} else if (extname === '.js') {
							funcForJS(fullPath);
						} else if (extname === '.coffee') {
							funcForCoffee(fullPath);
						} else if (extname === '.litcoffee') {
							funcForLiterateCoffee(fullPath);
						}
					});

					EACH(fullPaths, function(fullPath) {
						scanFolder(fullPath);
					});
				}
			};

			FOR_BOX(function(box) {

				scanFolder(rootPath + '/' + box.boxName + '/' + folderName);

				fs.readdirSync(rootPath + '/' + box.boxName).forEach(function(fileName) {

					var
					// full path
					fullPath = rootPath + '/' + box.boxName + '/' + fileName,

					// extname
					extname = path.extname(fileName).toLowerCase();

					if (fileName === folderName + extname && fs.statSync(fullPath).isDirectory() !== true) {
						if (extname === '.js') {
							funcForJS(fullPath);
						} else if (extname === '.coffee') {
							funcForCoffee(fullPath);
						} else if (extname === '.litcoffee') {
							funcForLiterateCoffee(fullPath);
						}
					}
				});
			});
		};

		scanAllBoxFolders('COMMON', loadJSForCommon, loadCoffeeForCommon, loadLiterateCoffeeForCommon);
		scanAllBoxFolders('NODE', loadJSForNode, loadCoffeeForNode, loadLiterateCoffeeForNode);
		scanAllBoxFolders('BROWSER', loadJSForBrowser, loadCoffeeForBrowser, loadLiterateCoffeeForBrowser);
		scanAllBoxFolders('CLIENT', loadJSForClient, loadCoffeeForClient, loadLiterateCoffeeForClient);
	};

	generateIndexPage = function() {

		indexPageContent += '<!DOCTYPE html>';
		indexPageContent += '<html>';
		indexPageContent += '<head>';
		indexPageContent += '<meta charset="utf-8">';
		indexPageContent += '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' + (CONFIG.isMobileFullScreen === true ? ', minimal-ui' : '') + '">';
		indexPageContent += '<meta name="google" value="notranslate">';

		if (CONFIG.googleSiteVerificationKey !== undefined) {
			indexPageContent += '<meta name="google-site-verification" content="' + CONFIG.googleSiteVerificationKey + '" />';
		}

		indexPageContent += '<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">';

		if (CONFIG.description !== undefined) {
			indexPageContent += '<meta name="description" content="' + CONFIG.description + '">';
		}

		indexPageContent += '<link href="/favicon.ico" rel="shortcut icon">';
		indexPageContent += '<title>' + CONFIG.defaultTitle + '</title>';

		// load css.
		indexPageContent += '<link rel="stylesheet" type="text/css" href="/__CSS?' + CONFIG.version + '" />';
		indexPageContent += '</head>';
		indexPageContent += '<body>';

		// show please enable JavaScript msg.
		indexPageContent += '<noscript>';
		indexPageContent += '<p style="padding:15px;">';
		indexPageContent += 'JavaScript is disabled. Please enable JavaScript in your browser.';
		indexPageContent += '</p>';
		indexPageContent += '</noscript>';

		// load js.
		indexPageContent += '<script type="text/javascript" src="/__SCRIPT?' + CONFIG.version + '"></script>';
		indexPageContent += '</body>';
		indexPageContent += '</html>';
	};

	run = function(workerData) {

		var
		// next upload server host index
		nextUploadServerHostIndex = 0,

		// next socket server host index
		nextSocketServerHostIndex = 0,

		// next web socket server host index
		nextWebSocketServerHostIndex = 0,

		// web server
		webServer,

		// web socket fix reqeust.
		webSocketFixRequest,

		// cal
		cal = CALENDAR();

		// init objects.
		INIT_OBJECTS();

		// run all MAINs.
		FOR_BOX(function(box) {
			if (box.MAIN !== undefined) {
				box.MAIN(workerData);
			}
		});

		if (CONFIG.webServerPort !== undefined || CONFIG.sercuredWebServerPort !== undefined) {

			// load UPPERCASE.IO-UPLOAD.
			loadJSForNode(__dirname + '/UPPERCASE.IO-UPLOAD/NODE.js');

			webServer = RESOURCE_SERVER({

				port : CONFIG.webServerPort,

				securedPort : CONFIG.sercuredWebServerPort,
				securedKeyFilePath : rootPath + '/' + NODE_CONFIG.securedKeyFilePath,
				securedCertFilePath : rootPath + '/' + NODE_CONFIG.securedCertFilePath,

				notParsingNativeReqURIs : ['__UPLOAD'],

				rootPath : rootPath,

				version : version
			}, {

				requestListener : function(requestInfo, response, onDisconnected, replaceRootPath, next) {

					var
					// uri
					uri = requestInfo.uri,

					// params
					params = requestInfo.params,

					// box name
					boxName,

					// index
					i;

					// serve browser script.
					if (uri === '__SCRIPT') {

						response({
							contentType : 'text/javascript',
							content : browserScript,
							version : version
						});

						return false;
					}

					// serve base style css.
					else if (uri === '__CSS') {

						response({
							contentType : 'text/css',
							content : initStyleCSS,
							version : version
						});

						return false;
					}

					// serve upload server host.
					else if (uri === '__UPLOAD_SERVER_HOST') {

						if (CONFIG.uploadServerHosts === undefined) {

							response({
								content : params.defaultHost
							});

						} else {

							response({
								content : CONFIG.uploadServerHosts[nextUploadServerHostIndex]
							});

							nextUploadServerHostIndex += 1;

							if (nextUploadServerHostIndex === CONFIG.uploadServerHosts.length) {
								nextUploadServerHostIndex = 0;
							}
						}

						return false;
					}

					// serve upload request.
					else if (uri === '__UPLOAD') {

						UPLOAD_REQUEST({
							requestInfo : requestInfo,
							uploadPath : rootPath + '/__RF/__TEMP'
						}, {
							overFileSize : function() {

								response({
									statusCode : 302,
									headers : {
										'Location' : params.callbackURL + '?maxUploadFileMB=' + NODE_CONFIG.maxUploadFileMB
									}
								});
							},
							success : function(fileDataSet) {

								var
								// box name
								boxName = params.boxName,

								// box
								box = BOX.getBoxes()[boxName === undefined ? CONFIG.defaultBoxName : boxName],

								// upload file database
								uploadFileDB;

								if (box !== undefined) {

									uploadFileDB = box.DB('__UPLOAD_FILE');

									NEXT(fileDataSet, [
									function(fileData, next) {

										var
										// path
										tempPath = fileData.path;

										// delete temp path.
										delete fileData.path;

										fileData.serverId = 1;

										uploadFileDB.create(fileData, function(savedData) {

											MOVE_FILE({
												srcPath : tempPath,
												distPath : rootPath + '/__RF/' + boxName + '/' + savedData.id
											}, next);
										});
									},

									function() {
										return function() {

											response({
												statusCode : 302,
												headers : {
													'Location' : params.callbackURL + '?fileDataSetStr=' + encodeURIComponent(STRINGIFY(fileDataSet))
												}
											});
										};
									}]);
								}
							}
						});

						return false;
					}

					// serve uploaded final resource.
					else if (uri.substring(0, 5) === '__RF/') {

						uri = uri.substring(5);

						i = uri.indexOf('/');

						if (i !== -1) {

							boxName = uri.substring(0, i);

							if (boxName === 'UPPERCASE.IO' || BOX.getBoxes()[boxName] !== undefined) {
								uri = uri.substring(i + 1);
							} else {
								boxName = CONFIG.defaultBoxName;
							}

							BOX.getBoxes()[boxName].DB('__UPLOAD_FILE').get(uri.lastIndexOf('/') === -1 ? uri : uri.substring(uri.lastIndexOf('/') + 1), {

								error : function() {

									next({
										isFinal : true
									});
								},

								notExists : function() {

									next({
										isFinal : true
									});
								},

								success : function(savedData) {

									next({
										contentType : savedData.type,
										headers : {
											'Content-Disposition' : 'attachment; filename="' + savedData.name + '"'
										},
										isFinal : true
									});
								}
							});
						}

						return false;
					}

					// serve upload callback.
					else if (uri === '__UPLOAD_CALLBACK') {

						if (params.maxUploadFileMB !== undefined) {

							response({
								content : '<script>maxUploadFileMB=' + params.maxUploadFileMB + '</script>'
							});

						} else {

							response({
								content : '<script>fileDataSetStr=\'' + params.fileDataSetStr + '\'</script>'
							});
						}

						return false;
					}

					// serve socket server host.
					else if (uri === '__SOCKET_SERVER_HOST') {

						if (CONFIG.socketServerHosts === undefined) {

							response({
								content : params.defaultHost
							});

						} else {

							response({
								content : CONFIG.socketServerHosts[nextSocketServerHostIndex]
							});

							nextSocketServerHostIndex += 1;

							if (nextSocketServerHostIndex === CONFIG.socketServerHosts.length) {
								nextSocketServerHostIndex = 0;
							}
						}

						return false;
					}

					// serve web socket server host.
					else if (uri === '__WEB_SOCKET_SERVER_HOST') {

						if (CONFIG.webSocketServerHosts === undefined) {

							response({
								content : params.defaultHost
							});

						} else {

							response({
								content : CONFIG.webSocketServerHosts[nextWebSocketServerHostIndex]
							});

							nextWebSocketServerHostIndex += 1;

							if (nextWebSocketServerHostIndex === CONFIG.webSocketServerHosts.length) {
								nextWebSocketServerHostIndex = 0;
							}
						}

						return false;
					}

					// serve web socket fix request
					else if (uri === '__WEB_SOCKET_FIX') {

						webSocketFixRequest(requestInfo, {
							response : response,
							onDisconnected : onDisconnected
						});

						return false;
					}

					// serve others.
					else {

						i = uri.indexOf('/');

						if (i === -1) {
							boxName = CONFIG.defaultBoxName;
						} else {
							boxName = uri.substring(0, i);

							if (uri.substring(i + 1, i + 7) === 'FIX.js' && (boxName === 'UPPERCASE.IO-TRANSPORT' || boxName === 'UPPERCASE.JS-BROWSER-FIX' || BOX.getBoxes()[boxName] !== undefined)) {
								uri = uri.substring(i + 1);
							} else {
								boxName = CONFIG.defaultBoxName;
							}
						}

						if (boxName === 'UPPERCASE.IO-TRANSPORT') {
							replaceRootPath(__dirname + '/UPPERCASE.IO-TRANSPORT/R');
							requestInfo.uri = uri;
						} else if (boxName === 'UPPERCASE.JS-BROWSER-FIX') {
							replaceRootPath(__dirname + '/UPPERCASE.JS-BROWSER-FIX');
							requestInfo.uri = uri;
						} else {
							requestInfo.uri = boxName + '/R' + (uri === '' ? '' : ('/' + uri));
						}
					}
				},

				notExistsResource : function(resourcePath, requestInfo, response) {

					if (requestInfo.uri === CONFIG.defaultBoxName + '/R') {

						response({
							contentType : 'text/html',
							content : indexPageContent
						});
					}
				}
			});

			webSocketFixRequest = LAUNCH_ROOM_SERVER({
				socketServerPort : CONFIG.socketServerPort,
				webServer : webServer,
				isCreateWebSocketFixRequestManager : true
			}).getWebSocketFixRequest();
		}

		console.log('[UPPERCASE.IO] <' + cal.getYear() + '-' + cal.getMonth() + '-' + cal.getDate() + ' ' + cal.getHour() + ':' + cal.getMinute() + ':' + cal.getSecond() + '> `' + CONFIG.defaultTitle + '` WORKER #' + workerData.id + ' (PID:' + workerData.pid + ') BOOTed!' + (CONFIG.webServerPort === undefined ? '' : (' => http://localhost:' + CONFIG.webServerPort)) + (CONFIG.securedWebServerPort === undefined ? '' : (' => https://localhost:' + CONFIG.securedWebServerPort)));
	};

	// load UPPERCASE.JS.
	loadUJS();

	// init boxes.
	initBoxes();

	// load UPPERCASE.IO-BOOT.
	loadJSForCommon(__dirname + '/UPPERCASE.IO-BOOT/COMMON.js');
	loadJSForClient(__dirname + '/UPPERCASE.IO-BOOT/BROWSER.js');
	loadJSForClient(__dirname + '/UPPERCASE.IO-BOOT/CLIENT.js');

	// load UPPERCASE.IO-UTIL.
	loadJSForNode(__dirname + '/UPPERCASE.IO-UTIL/NODE.js');

	// configuration.
	configuration();

	// clustering cpus and servers.
	clustering(function(workerData) {

		// init database.
		initDatabase();

		// init model system.
		initModelSystem();

		// load all scripts.
		loadAllScripts();

		if (CONFIG.isDevMode !== true) {

			// minify browser script.
			browserScript = MINIFY_JS(browserScript);
		}

		// generate index page.
		generateIndexPage();

		// run.
		run(workerData);
	});
};
