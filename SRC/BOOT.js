global.BOOT = BOOT = function(params) {
	'use strict';
	//OPTIONAL: params
	//OPTIONAL: params.CONFIG
	//OPTIONAL: params.NODE_CONFIG
	//OPTIONAL: params.BROWSER_CONFIG

	var
	//IMPORT: path
	path = require('path'),

	//IMPORT: cluster
	cluster = require('cluster'),

	// version
	version,

	// root path
	rootPath = process.cwd(),

	// browser script
	browserScript = 'global = window;\n',

	// index page content
	indexPageContent = '',

	// box names in BOX folder
	boxNamesInBOXFolder = [],

	// load js for node.
	loadJSForNode = function(path) {
		require(path);
	},

	// load js for browser.
	loadJSForBrowser = function(path) {
		browserScript += READ_FILE({
			path : path,
			isSync : true
		}).toString() + '\n';
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
		RUN_COFFEE(READ_FILE({
			path : path,
			isSync : true
		}).toString());
	},

	// load coffeescript for browser.
	loadCoffeeForBrowser = function(path) {
		browserScript += COMPILE_COFFEE_TO_JS(READ_FILE({
			path : path,
			isSync : true
		}).toString()) + '\n';
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
		RUN_LITCOFFEE(READ_FILE({
			path : path,
			isSync : true
		}).toString());
	},

	// load literate coffeescript for browser.
	loadLiterateCoffeeForBrowser = function(path) {
		browserScript += COMPILE_LITCOFFEE_TO_JS(READ_FILE({
			path : path,
			isSync : true
		}).toString()) + '\n';
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

			// BOX folder
			name !== 'BOX' &&

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

	// configuration.
	configuration,

	// init boxes.
	initBoxes,

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

		// load for node.
		loadJSForNode(__dirname + '/UPPERCASE.JS-COMMON.js');
		loadJSForNode(__dirname + '/UPPERCASE.JS-NODE.js');

		// load for browser.
		loadJSForBrowser(__dirname + '/UPPERCASE.JS-COMMON.js');
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

		// when master and dev mode, write version file.
		if (CONFIG.isDevMode === true && cluster.isMaster === true) {

			version = 'V' + Date.now();

			WRITE_FILE({
				path : rootPath + '/V',
				content : version,
				isSync : true
			});
		}

		READ_FILE({
			path : rootPath + '/V',
			isSync : true
		}, {

			notExists : function() {
				console.log(CONSOLE_RED('[UPPERCASE.IO] NOT EXISTS `V` VERSION FILE!'));
				version = 'V__NOT_EXISTS';
			},

			success : function(buffer) {
				version = buffer.toString();
			}
		});

		// set version.
		CONFIG.version = version;
		browserScript += 'CONFIG.version = \'' + version + '\'\n';

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

		// set fix scripts folder path.
		browserScript += 'BROWSER_CONFIG.fixScriptsFolderPath = \'/UPPERCASE.JS-BROWSER-FIX\'\n';
		browserScript += 'BROWSER_CONFIG.fixTransportScriptsFolderPath = \'/UPPERCASE.IO-TRANSPORT\'\n';
	};

	initBoxes = function(next) {

		// load UPPERCASE.IO-BOX/CORE.
		loadJSForCommon(__dirname + '/UPPERCASE.IO-BOX/CORE.js');

		// init boxes in root folder.
		FIND_FOLDER_NAMES({
			path : rootPath,
			isSync : true
		}, function(folderNames) {

			EACH(folderNames, function(folderName) {

				if (checkIsAllowedFolderName(folderName) === true) {

					// create box.
					BOX(folderName);

					// add to browser script.
					browserScript += 'BOX(\'' + folderName + '\');\n';
				}
			});
		});

		if (CHECK_IS_EXISTS_FILE({
			path : rootPath + '/BOX',
			isSync : true
		}) === true) {

			// init boxes is BOX folder.
			FIND_FOLDER_NAMES({
				path : rootPath + '/BOX',
				isSync : true
			}, function(folderNames) {

				EACH(folderNames, function(folderName) {

					if (checkIsAllowedFolderName(folderName) === true) {

						// create box.
						BOX(folderName);

						// add to browser script.
						browserScript += 'BOX(\'' + folderName + '\');\n';

						// save box name.
						boxNamesInBOXFolder.push(folderName);
					}
				});
			});
		}

		// load UPPERCASE.IO-BOX/BROWSER.
		loadJSForBrowser(__dirname + '/UPPERCASE.IO-BOX/CLIENT.js');
		loadJSForBrowser(__dirname + '/UPPERCASE.IO-BOX/BROWSER.js');
	};

	clustering = function(work) {

		CPU_CLUSTERING(function() {

			if (NODE_CONFIG.clusteringServers !== undefined && NODE_CONFIG.thisServerName !== undefined && NODE_CONFIG.clusteringPort !== undefined) {

				SERVER_CLUSTERING({
					servers : NODE_CONFIG.clusteringServers,
					thisServerName : NODE_CONFIG.thisServerName,
					port : NODE_CONFIG.clusteringPort
				}, work);

			} else {
				work();
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

				FIND_FILE_NAMES({
					path : folderPath,
					isSync : true
				}, {

					error : function() {
						// ignore.
					},

					success : function(fileNames) {

						EACH(fileNames, function(fileName) {

							var
							// full path
							fullPath = folderPath + '/' + fileName,

							// extname
							extname = path.extname(fileName).toLowerCase();

							if (extname === '.js') {
								funcForJS(fullPath);
							} else if (extname === '.coffee') {
								funcForCoffee(fullPath);
							} else if (extname === '.litcoffee') {
								funcForLiterateCoffee(fullPath);
							}
						});
					}
				});

				FIND_FOLDER_NAMES({
					path : folderPath,
					isSync : true
				}, {

					error : function() {
						// ignore.
					},

					success : function(folderNames) {

						EACH(folderNames, function(folderName) {
							if (checkIsAllowedFolderName(folderName) === true) {
								scanFolder(folderPath + '/' + folderName);
							}
						});
					}
				});
			};

			FOR_BOX(function(box) {

				var
				// box root path
				boxRootPath = CHECK_IS_IN({
					array : boxNamesInBOXFolder,
					value : box.boxName
				}) === true ? rootPath + '/BOX' : rootPath;

				scanFolder(boxRootPath + '/' + box.boxName + '/' + folderName);

				FIND_FILE_NAMES({
					path : boxRootPath + '/' + box.boxName,
					isSync : true
				}, {

					error : function() {
						// ignore.
					},

					success : function(fileNames) {

						EACH(fileNames, function(fileName) {

							var
							// full path
							fullPath = boxRootPath + '/' + box.boxName + '/' + fileName,

							// extname
							extname = path.extname(fileName).toLowerCase();

							if (fileName === folderName + extname) {
								if (extname === '.js') {
									funcForJS(fullPath);
								} else if (extname === '.coffee') {
									funcForCoffee(fullPath);
								} else if (extname === '.litcoffee') {
									funcForLiterateCoffee(fullPath);
								}
							}
						});
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
		indexPageContent += '<title>' + CONFIG.title + '</title>';

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

	run = function() {

		var
		// upload server hosts
		uploadServerHosts,

		// socket server hosts
		socketServerHosts,

		// web socket server hosts
		webSocketServerHosts,

		// next upload server host index
		nextUploadServerHostIndex,

		// next socket server host index
		nextSocketServerHostIndex,

		// next web socket server host index
		nextWebSocketServerHostIndex,

		// web server
		webServer,

		// web socket fix reqeust.
		webSocketFixRequest,

		// cal
		cal = CALENDAR();

		if (NODE_CONFIG.uploadServers !== undefined) {

			uploadServerHosts = [];
			nextUploadServerHostIndex = 0;

			EACH(NODE_CONFIG.uploadServers, function(host) {
				uploadServerHosts.push(host);
			});
		}

		if (NODE_CONFIG.socketServers !== undefined) {

			socketServerHosts = [];
			nextSocketServerHostIndex = 0;

			EACH(NODE_CONFIG.socketServers, function(host) {
				socketServerHosts.push(host);
			});
		}

		if (NODE_CONFIG.webSocketServers !== undefined) {

			webSocketServerHosts = [];
			nextWebSocketServerHostIndex = 0;

			EACH(NODE_CONFIG.webSocketServers, function(host) {
				webSocketServerHosts.push(host);
			});
		}

		// init objects.
		INIT_OBJECTS();

		// run all MAINs.
		FOR_BOX(function(box) {
			if (box.MAIN !== undefined) {
				box.MAIN();
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

				noParsingNativeReqURIs : ['__UPLOAD'],

				rootPath : rootPath,

				version : version
			}, {

				requestListener : function(requestInfo, response, onDisconnected, replaceRootPath, next) {

					var
					// uri
					uri = requestInfo.uri,

					// method
					method = requestInfo.method,

					// headers
					headers = requestInfo.headers,

					// params
					params = requestInfo.params,

					// box name
					boxName,

					// upload file database
					uploadFileDB,

					// index
					i,

					// wrap callback.
					wrapCallback = function(str) {
						return params.callback !== undefined ? params.callback + '(\'' + str + '\')' : str;
					};

					// serve browser script.
					if (uri === '__SCRIPT') {

						// check ETag.
						if (CONFIG.isDevMode !== true &&

						// check version.
						headers['if-none-match'] === version) {

							// response cached.
							response({
								statusCode : 304
							});
						}

						// redirect correct version uri.
						else if (CONFIG.isDevMode !== true && params.version !== version) {

							response({
								statusCode : 302,
								headers : {
									'Location' : '/__SCRIPT?version=' + version
								}
							});
						}

						// response browser script.
						else {

							response({
								contentType : 'text/javascript',
								content : browserScript,
								version : version
							});
						}

						return false;
					}

					// serve base style css.
					else if (uri === '__CSS') {
						replaceRootPath(__dirname);
						requestInfo.uri = 'INIT_STYLE.css';
					}

					// serve upload server host.
					else if (uri === '__UPLOAD_SERVER_HOST') {

						if (uploadServerHosts === undefined) {

							response({
								content : wrapCallback(params.defaultHost)
							});

						} else {

							response({
								content : wrapCallback(uploadServerHosts[nextUploadServerHostIndex])
							});

							nextUploadServerHostIndex += 1;

							if (nextUploadServerHostIndex === uploadServerHosts.length) {
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

										fileData.serverName = NODE_CONFIG.thisServerName;
										fileData.downloadCount = 0;

										uploadFileDB.create(fileData, function(savedData) {

											MOVE_FILE({
												from : tempPath,
												to : rootPath + '/__RF/' + boxName + '/' + savedData.id
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

							uploadFileDB = BOX.getBoxes()[boxName].DB('__UPLOAD_FILE');

							uploadFileDB.get(uri.lastIndexOf('/') === -1 ? uri : uri.substring(uri.lastIndexOf('/') + 1), {

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

									if (savedData.serverName === NODE_CONFIG.thisServerName) {

										next({
											contentType : savedData.type,
											headers : {
												'Content-Disposition' : 'attachment; filename="' + savedData.name + '"',
												'Access-Control-Allow-Origin' : '*'
											},
											isFinal : true
										});

										uploadFileDB.update({
											id : savedData.id,
											$inc : {
												downloadCount : 1
											}
										});

									} else {

										response({
											statusCode : 302,
											headers : {
												'Location' : 'http://' + NODE_CONFIG.uploadServers[savedData.serverName] + ':' + CONFIG.webServerPort + '/__RF/' + boxName + '/' + uri
											}
										});
									}
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

						if (socketServerHosts === undefined) {

							response({
								content : wrapCallback(params.defaultHost)
							});

						} else {

							response({
								content : wrapCallback(socketServerHosts[nextSocketServerHostIndex])
							});

							nextSocketServerHostIndex += 1;

							if (nextSocketServerHostIndex === socketServerHosts.length) {
								nextSocketServerHostIndex = 0;
							}
						}

						return false;
					}

					// serve web socket server host.
					else if (uri === '__WEB_SOCKET_SERVER_HOST') {

						if (webSocketServerHosts === undefined) {

							response({
								content : wrapCallback(params.defaultHost)
							});

						} else {

							response({
								content : wrapCallback(webSocketServerHosts[nextWebSocketServerHostIndex])
							});

							nextWebSocketServerHostIndex += 1;

							if (nextWebSocketServerHostIndex === webSocketServerHosts.length) {
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

							if (BOX.getBoxes()[boxName] !== undefined || boxName === 'UPPERCASE.IO-TRANSPORT' || boxName === 'UPPERCASE.JS-BROWSER-FIX') {
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

							if (CHECK_IS_IN({
								array : boxNamesInBOXFolder,
								value : boxName
							}) === true) {
								requestInfo.uri = 'BOX/' + boxName + '/R' + (uri === '' ? '' : ('/' + uri));
							} else {
								requestInfo.uri = boxName + '/R' + (uri === '' ? '' : ('/' + uri));
							}
						}
					}
				},

				notExistsResource : function(resourcePath, requestInfo, response) {

					if (requestInfo.uri === CONFIG.defaultBoxName + '/R' || requestInfo.uri === 'BOX/' + CONFIG.defaultBoxName + '/R') {

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

		console.log('[UPPERCASE.IO] <' + cal.getYear() + '-' + cal.getMonth() + '-' + cal.getDate() + ' ' + cal.getHour() + ':' + cal.getMinute() + ':' + cal.getSecond() + '> `' + CONFIG.title + '` WORKER #' + CPU_CLUSTERING.getWorkerId() + ' BOOTed!' + (CONFIG.webServerPort === undefined ? '' : (' => http://localhost:' + CONFIG.webServerPort)) + (CONFIG.securedWebServerPort === undefined ? '' : (' => https://localhost:' + CONFIG.securedWebServerPort)));
	};

	// load UPPERCASE.JS.
	loadUJS();

	// configuration.
	configuration();

	// init boxes.
	initBoxes();

	// load UPPERCASE.IO-BOOT.
	loadJSForCommon(__dirname + '/UPPERCASE.IO-BOOT/COMMON.js');
	loadJSForClient(__dirname + '/UPPERCASE.IO-BOOT/CLIENT.js');
	loadJSForClient(__dirname + '/UPPERCASE.IO-BOOT/BROWSER.js');

	// load UPPERCASE.IO-UTIL.
	loadJSForNode(__dirname + '/UPPERCASE.IO-UTIL/NODE.js');

	// clustering cpus and servers.
	clustering(function() {

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
		run();
	});
};
