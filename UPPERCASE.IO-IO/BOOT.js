global.BOOT = function(params) {
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

	// UPPERCASE_IO_PATH
	UPPERCASE_IO_PATH = __dirname + '/..',

	// root path
	rootPath = process.cwd(),

	// browser script content infos
	browserScriptContentInfos = [],

	// browser script
	browserScript = '',

	// index page content
	indexPageContent = '',

	// box names in BOX folder
	boxNamesInBOXFolder = [],

	// load for node.
	loadForNode = function(path) {
		require(path);
	},

	// add content to browser script.
	addContentToBrowserScript = function(content) {
		browserScript += content;
		browserScriptContentInfos.push({
			type : 'content',
			content : content
		});
	},

	// load for browser.
	loadForBrowser = function(path, isNotToSavePath) {

		browserScript += READ_FILE({
			path : path,
			isSync : true
		}).toString() + '\n';

		if (isNotToSavePath !== true) {
			browserScriptContentInfos.push({
				type : 'js',
				path : path
			});
		}
	},

	// load for client.
	loadForClient = function(path) {
		loadForBrowser(path);
	},

	// load for common.
	loadForCommon = function(path) {
		loadForNode(path);
		loadForBrowser(path);
	},

	// reload browser script.
	reloadBrowserScript = function() {

		browserScript = '';

		EACH(browserScriptContentInfos, function(browserScriptContentInfo) {

			// content
			if (browserScriptContentInfo.type === 'content') {
				browserScript += browserScriptContentInfo.content;
			}

			// js
			else if (browserScriptContentInfo.type === 'js') {
				loadForBrowser(browserScriptContentInfo.path, true);
			}
		});
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

	addContentToBrowserScript('global = window;\n');

	loadUJS = function() {

		// load for node.
		loadForNode(UPPERCASE_IO_PATH + '/UPPERCASE.JS-COMMON.js');
		loadForNode(UPPERCASE_IO_PATH + '/UPPERCASE.JS-NODE.js');

		// load for browser.
		loadForBrowser(UPPERCASE_IO_PATH + '/UPPERCASE.JS-COMMON.js');
		loadForBrowser(UPPERCASE_IO_PATH + '/UPPERCASE.JS-BROWSER.js');
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

			// add CONFIG to browser script.
			addContentToBrowserScript('EXTEND({ origin : CONFIG, extend : ' + stringifyJSONWithFunction(_CONFIG) + ' });\n');
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
		addContentToBrowserScript('CONFIG.version = \'' + version + '\'\n');

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

			// add BROWSER_CONFIG to browser script.
			addContentToBrowserScript('EXTEND({ origin : BROWSER_CONFIG, extend : ' + stringifyJSONWithFunction(_BROWSER_CONFIG) + ' });\n');
		}

		// set fix scripts folder path.
		addContentToBrowserScript('BROWSER_CONFIG.fixScriptsFolderPath = \'/UPPERCASE.JS-BROWSER-FIX\';\n');
		addContentToBrowserScript('BROWSER_CONFIG.fixTransportScriptsFolderPath = \'/UPPERCASE.IO-TRANSPORT\';\n');

		// add ignore attr $inc to VALID.
		VALID.addIgnoreAttr('$inc');
		addContentToBrowserScript('VALID.addIgnoreAttr(\'$inc\');\n');
	};

	initBoxes = function(next) {

		// load UPPERCASE.IO-BOX/CORE.
		loadForCommon(UPPERCASE_IO_PATH + '/UPPERCASE.IO-BOX/CORE.js');

		// create UPPERCASE.IO box.
		BOX('UPPERCASE.IO');

		// add UPPERCASE.IO box to browser script.
		addContentToBrowserScript('BOX(\'UPPERCASE.IO\');\n');

		// init boxes in root folder.
		FIND_FOLDER_NAMES({
			path : rootPath,
			isSync : true
		}, function(folderNames) {

			EACH(folderNames, function(folderName) {

				if (checkIsAllowedFolderName(folderName) === true) {

					// create box.
					BOX(folderName);

					// add box to browser script.
					addContentToBrowserScript('BOX(\'' + folderName + '\');\n');
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

						// add box to browser script.
						addContentToBrowserScript('BOX(\'' + folderName + '\');\n');

						// save box name.
						boxNamesInBOXFolder.push(folderName);
					}
				});
			});
		}

		// load UPPERCASE.IO-BOX/BROWSER.
		loadForBrowser(UPPERCASE_IO_PATH + '/UPPERCASE.IO-BOX/CLIENT.js');
		loadForBrowser(UPPERCASE_IO_PATH + '/UPPERCASE.IO-BOX/BROWSER.js');
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
		loadForNode(UPPERCASE_IO_PATH + '/UPPERCASE.IO-DB/NODE.js');

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
		loadForNode(UPPERCASE_IO_PATH + '/UPPERCASE.IO-TRANSPORT/NODE.js');
		loadForBrowser(UPPERCASE_IO_PATH + '/UPPERCASE.IO-TRANSPORT/BROWSER.js');

		// load UPPERCASE.IO-ROOM.
		loadForNode(UPPERCASE_IO_PATH + '/UPPERCASE.IO-ROOM/NODE.js');
		loadForClient(UPPERCASE_IO_PATH + '/UPPERCASE.IO-ROOM/CLIENT.js');
		loadForBrowser(UPPERCASE_IO_PATH + '/UPPERCASE.IO-ROOM/BROWSER.js');

		// load UPPERCASE.IO-MODEL.
		loadForCommon(UPPERCASE_IO_PATH + '/UPPERCASE.IO-MODEL/COMMON.js');
		loadForNode(UPPERCASE_IO_PATH + '/UPPERCASE.IO-MODEL/NODE.js');
		loadForClient(UPPERCASE_IO_PATH + '/UPPERCASE.IO-MODEL/CLIENT.js');
	};

	loadAllScripts = function() {

		var
		// scan all box folders.
		scanAllBoxFolders = function(folderName, funcForJS) {

			var
			// scan folder
			scanFolder = function(folderPath) {

				FIND_FILE_NAMES({
					path : folderPath,
					isSync : true
				}, {

					notExists : function() {
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
							}
						});
					}
				});

				FIND_FOLDER_NAMES({
					path : folderPath,
					isSync : true
				}, {

					notExists : function() {
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

					notExists : function() {
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
								}
							}
						});
					}
				});
			});
		};

		scanAllBoxFolders('COMMON', loadForCommon);
		scanAllBoxFolders('NODE', loadForNode);
		scanAllBoxFolders('BROWSER', loadForBrowser);
		scanAllBoxFolders('CLIENT', loadForClient);
	};

	generateIndexPage = function() {
		
		var
		// custom index path
		customIndexPath = rootPath + '/' + CHECK_IS_IN({
			array : boxNamesInBOXFolder,
			value : CONFIG.defaultBoxName
		}) === true ? 'BOX/' + CONFIG.defaultBoxName + '/index.html' : CONFIG.defaultBoxName + '/index.html';
		
		if (CHECK_IS_EXISTS_FILE({
			path : customIndexPath,
			isSync : true
		}) === true) {
			
			indexPageContent = READ_FILE({
				path : customIndexPath,
				isSync : true
			}).toString();
			
		} else {

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
			
			// set base color.
			indexPageContent += '<style>';
			indexPageContent += 'html, body {';
			indexPageContent += 'background-color : ' + CONFIG.baseBackgroundColor + ';';
			indexPageContent += 'color : ' + CONFIG.baseColor + ';';
			indexPageContent += '}';
			indexPageContent += '</style>';
			
			indexPageContent += '</head>';
			indexPageContent += '<body>';
	
			// show please enable JavaScript msg.
			indexPageContent += '<noscript>';
			indexPageContent += '<p style="padding:15px;">';
			indexPageContent += 'JavaScript is disabled. Please enable JavaScript in your browser.';
			indexPageContent += '</p>';
			indexPageContent += '</noscript>';
	
			// load script.
			indexPageContent += '<script type="text/javascript" src="/__SCRIPT?' + CONFIG.version + '"></script>';
			indexPageContent += '</body>';
			indexPageContent += '</html>';
		}
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

		// box request listeners
		boxRequestListeners = {},

		// is going on
		isGoingOn,

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
				box.MAIN(function(requestListener) {
					boxRequestListeners[box.boxName] = requestListener;
				});
			}
		});

		if (CONFIG.webServerPort !== undefined || CONFIG.sercuredWebServerPort !== undefined) {

			// load UPPERCASE.IO-UPLOAD.
			loadForNode(UPPERCASE_IO_PATH + '/UPPERCASE.IO-UPLOAD/NODE.js');

			webServer = RESOURCE_SERVER({

				port : CONFIG.webServerPort,

				securedPort : CONFIG.sercuredWebServerPort,
				securedKeyFilePath : rootPath + '/' + NODE_CONFIG.securedKeyFilePath,
				securedCertFilePath : rootPath + '/' + NODE_CONFIG.securedCertFilePath,

				noParsingParamsURI : '__UPLOAD',

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

					if (uri === '__CHECK_ALIVE') {

						response({
							content : '',
							headers : {
								'Access-Control-Allow-Origin' : '*'
							}
						});

						return false;
					}

					// serve browser script.
					else if (uri === '__SCRIPT') {

						if (CONFIG.isDevMode === true) {

							reloadBrowserScript();

							response({
								contentType : 'text/javascript',
								content : browserScript
							});

						} else {

							// check ETag.
							if (headers['if-none-match'] === version) {

								// response cached.
								response({
									statusCode : 304
								});
							}

							// redirect correct version uri.
							else if (params.version !== version) {

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
						}

						return false;
					}

					// serve base style css.
					else if (uri === '__CSS') {
						replaceRootPath(UPPERCASE_IO_PATH);
						requestInfo.uri = 'UPPERCASE.IO-IO/R/BASE_STYLE.css';
					}

					// serve upload server host.
					else if (uri === '__UPLOAD_SERVER_HOST') {

						if (uploadServerHosts === undefined) {

							response({
								content : wrapCallback(params.defaultHost),
								headers : {
									'Access-Control-Allow-Origin' : '*'
								}
							});

						} else {

							response({
								content : wrapCallback(uploadServerHosts[nextUploadServerHostIndex]),
								headers : {
									'Access-Control-Allow-Origin' : '*'
								}
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

											var
											// file data set str
											fileDataSetStr = STRINGIFY(fileDataSet);

											response(params.callbackURL === undefined ? fileDataSetStr : {
												statusCode : 302,
												headers : {
													'Location' : params.callbackURL + '?fileDataSetStr=' + encodeURIComponent(fileDataSetStr)
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
						replaceRootPath(UPPERCASE_IO_PATH + '/UPPERCASE.IO-UPLOAD/R');
						requestInfo.uri = 'UPLOAD_CALLBACK.html';
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
								content : wrapCallback(params.defaultHost),
								headers : {
									'Access-Control-Allow-Origin' : '*'
								}
							});

						} else {

							response({
								content : wrapCallback(webSocketServerHosts[nextWebSocketServerHostIndex]),
								headers : {
									'Access-Control-Allow-Origin' : '*'
								}
							});

							nextWebSocketServerHostIndex += 1;

							if (nextWebSocketServerHostIndex === webSocketServerHosts.length) {
								nextWebSocketServerHostIndex = 0;
							}
						}

						return false;
					}

					// serve web socket fix request.
					else if (uri === '__WEB_SOCKET_FIX') {

						webSocketFixRequest(requestInfo, {
							response : response,
							onDisconnected : onDisconnected
						});

						return false;
					}
					
					// serve favicon.ico.
					else if (uri === 'favicon.ico') {
						
						requestInfo.uri = CHECK_IS_IN({
							array : boxNamesInBOXFolder,
							value : CONFIG.defaultBoxName
						}) === true ? 'BOX/' + CONFIG.defaultBoxName + '/R/favicon.ico' : CONFIG.defaultBoxName + '/R/favicon.ico';
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

						// serve UPPERCASE.IO-TRANSPORT-FIX.
						if (boxName === 'UPPERCASE.IO-TRANSPORT') {
							replaceRootPath(UPPERCASE_IO_PATH + '/UPPERCASE.IO-TRANSPORT/R');
							requestInfo.uri = uri;
						}
						
						// serve UPPERCASE.IO-BROWSER-FIX.
						else if (boxName === 'UPPERCASE.JS-BROWSER-FIX') {
							replaceRootPath(UPPERCASE_IO_PATH + '/UPPERCASE.JS-BROWSER-FIX');
							requestInfo.uri = uri;
						}
						
						// serve other.
						else {
						
							// serve resource.
							if (uri.substring(0, 2) === 'R/') {
								
								requestInfo.uri = CHECK_IS_IN({
									array : boxNamesInBOXFolder,
									value : boxName
								}) === true ? 'BOX/' + boxName + '/' + uri : boxName + '/' + uri;
							}
							
							// response index page.
							else {
	
								if (boxRequestListeners[boxName] !== undefined) {
									isGoingOn = boxRequestListeners[boxName](requestInfo, response, onDisconnected, replaceRootPath, next);
								}
								
								if (isGoingOn !== false) {
									
									// for SEO
									if (params._escaped_fragment_ !== undefined) {
										
										response({
											statusCode : 302,
											headers : {
												'Location' : params._escaped_fragment_
											}
										});
										
									} else {
									
										// when dev mode, re-generate index page.
										if (CONFIG.isDevMode === true) {
											generateIndexPage();
										}
										
										response({
											contentType : 'text/html',
											content : indexPageContent
										});
									}
								}
								
								return false;
							}
						}
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

	// load UPPERCASE.IO-UTIL.
	loadForNode(UPPERCASE_IO_PATH + '/UPPERCASE.IO-UTIL/NODE.js');

	// load UPPERCASE.IO-IO.
	loadForCommon(UPPERCASE_IO_PATH + '/UPPERCASE.IO-IO/COMMON.js');
	loadForClient(UPPERCASE_IO_PATH + '/UPPERCASE.IO-IO/CLIENT.js');
	loadForClient(UPPERCASE_IO_PATH + '/UPPERCASE.IO-IO/BROWSER.js');
	loadForClient(UPPERCASE_IO_PATH + '/UPPERCASE.IO-IO/BROWSER_INIT.js');
	loadForNode(UPPERCASE_IO_PATH + '/UPPERCASE.IO-IO/NODE.js');

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
