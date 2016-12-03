/*

Welcome to UPPERCASE-BOOT! (http://uppercase.io)

*/

/**
 * Configuration
 */
OVERRIDE(CONFIG, function(origin) {
	'use strict';

	global.CONFIG = COMBINE([{
		
		defaultBoxName : 'UPPERCASE',
		
		title : 'UPPERCASE PROJECT',
		
		baseBackgroundColor : '#000',
		baseColor : '#fff',
		
		// maxThumbWidth
		// or
		// maxThumbHeight
		
		isMobileFullScreen : false,
		isUsingHTMLSnapshot : false
		
	}, origin]);
});

/**
 * UPPERCASE를 실행합니다.
 */
global.BOOT = function(params) {
	'use strict';
	//OPTIONAL: params
	//OPTIONAL: params.CONFIG
	//OPTIONAL: params.NODE_CONFIG
	//OPTIONAL: params.BROWSER_CONFIG
	//OPTIONAL: params.UADMIN_CONFIG

	var
	// UPPERCASE_PATH
	UPPERCASE_PATH = __dirname + '/..',
	
	//IMPORT: path
	path = require('path'),

	//IMPORT: cluster
	cluster = require('cluster'),

	// version
	version = 'V' + Date.now(),

	// root path
	rootPath = process.cwd(),

	// browser script contents
	browserScriptContents = [],

	// browser script
	browserScript = '',
	
	// box browser scripts
	boxBrowserScripts = {},
	
	// 404 page content
	_404PageContent,

	// index page content
	indexPageContent,
	
	// box names in BOX folder
	boxNamesInBOXFolder = [],

	// load for node.
	loadForNode = function(path) {
		require(path);
	},

	// add content to browser script.
	addContentToBrowserScript = function(content) {
		browserScript += content;
		browserScriptContents.push(content);
	},

	// load for browser.
	loadForBrowser = function(path, boxName) {
		
		var
		// content
		content = READ_FILE({
			path : path,
			isSync : true
		}).toString();
		
		if (boxName === undefined) {
			addContentToBrowserScript(content);
		} else {

			browserScript += content;
			
			if (boxBrowserScripts[boxName] === undefined) {
				boxBrowserScripts[boxName] = '';
			}
			
			boxBrowserScripts[boxName] += content;
		}
		
		return content;
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
	
	// scan all box folders.
	scanAllBoxFolders = function(folderName, funcForJS) {

		var
		// scan folder
		scanFolder = function(folderPath, boxName) {

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
							funcForJS(fullPath, boxName);
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
							scanFolder(folderPath + '/' + folderName, boxName);
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

			scanFolder(boxRootPath + '/' + box.boxName + '/' + folderName, box.boxName);
		});
	},
	
	// scan all box js.
	scanAllBoxJS = function(folderName, funcForJS) {

		FOR_BOX(function(box) {
			
			var
			// box root path
			boxRootPath = CHECK_IS_IN({
				array : boxNamesInBOXFolder,
				value : box.boxName
			}) === true ? rootPath + '/BOX' : rootPath;
			
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
								funcForJS(fullPath, box.boxName);
							}
						}
					});
				}
			});
		});
	},

	// reload browser script.
	reloadBrowserScript = function() {

		browserScript = '';
		boxBrowserScripts = {};

		EACH(browserScriptContents, function(browserScriptContent) {
			browserScript += browserScriptContent;
		});
		
		scanAllBoxFolders('COMMON', loadForBrowser);
		scanAllBoxFolders('BROWSER', loadForBrowser);
		
		scanAllBoxJS('BROWSER', loadForBrowser);
	},
	
	// configuration.
	configuration,

	// init boxes.
	initBoxes,

	// clustering cpus and servers.
	clustering,

	// connect to database.
	connectToDatabase,
	
	// generate 404 page.
	generate404Page,

	// generate index page.
	generateIndexPage,

	// run.
	run;
	
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
					return '__FUNCTION_START__' + value.toString() + '__FUNCTION_END__';
				}
				return value;
			}, '\t').replace(/("__FUNCTION_START__(.*)__FUNCTION_END__")/g, function(match, content) {
				return eval('(' + eval('"' + content.substring('"__FUNCTION_START__'.length, content.length - '__FUNCTION_END__"'.length) + '"') + ')').toString();
			});
		};

		// set root path.
		NODE_CONFIG.rootPath = rootPath;

		if (params !== undefined) {
			
			_CONFIG = params.CONFIG;
			_NODE_CONFIG = params.NODE_CONFIG;
			_BROWSER_CONFIG = params.BROWSER_CONFIG;
			
			global.UADMIN_CONFIG = params.UADMIN_CONFIG;
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
		
		if (CONFIG.isDevMode !== true) {
			
			READ_FILE({
				path : rootPath + '/VERSION',
				isSync : true
			}, {
				
				notExists : function() {
					SHOW_ERROR('BOOT', 'VERSION 파일이 존재하지 않습니다.');
				},
				
				success : function(buffer) {
					version = buffer.toString();
				}
			});
		}

		// set version.
		CONFIG.version = version;
		addContentToBrowserScript('CONFIG.version = \'' + version + '\'\n');
		
		if (CONFIG.isUsingProxy === true) {
			addContentToBrowserScript('CONFIG.webServerPort = BROWSER_CONFIG.port\n');
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

			// add BROWSER_CONFIG to browser script.
			addContentToBrowserScript('EXTEND({ origin : BROWSER_CONFIG, extend : ' + stringifyJSONWithFunction(_BROWSER_CONFIG) + ' });\n');
		}
	};

	initBoxes = function(next) {

		// create UPPERCASE box.
		BOX('UPPERCASE');

		// add UPPERCASE box to browser script.
		addContentToBrowserScript('BOX(\'UPPERCASE\');\n');

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

		if (CHECK_IS_FILE_EXISTS({
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
	};

	clustering = function(work) {

		(NODE_CONFIG.isNotUsingCPUClustering !== true ? CPU_CLUSTERING : RUN)(function() {

			if (NODE_CONFIG.clusteringServerHosts !== undefined && NODE_CONFIG.thisServerName !== undefined && NODE_CONFIG.clusteringPort !== undefined) {

				SERVER_CLUSTERING({
					hosts : NODE_CONFIG.clusteringServerHosts,
					thisServerName : NODE_CONFIG.thisServerName,
					port : NODE_CONFIG.clusteringPort
				}, work);

			} else {
				work();
			}
		});
	};

	connectToDatabase = function() {
		
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
	
	generate404Page = function() {
		
		var
		// custom 404 path
		custom404Path = rootPath + '/' + CHECK_IS_IN({
			array : boxNamesInBOXFolder,
			value : CONFIG.defaultBoxName
		}) === true ? 'BOX/' + CONFIG.defaultBoxName + '/404.html' : CONFIG.defaultBoxName + '/404.html';
		
		if (CHECK_IS_FILE_EXISTS({
			path : custom404Path,
			isSync : true
		}) === true) {
			
			_404PageContent = READ_FILE({
				path : custom404Path,
				isSync : true
			}).toString();
			
		} else {

			_404PageContent = '<!DOCTYPE html>';
			_404PageContent += '<html>';
			_404PageContent += '<head>';
			_404PageContent += '<meta charset="utf-8">';
			_404PageContent += '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' + (CONFIG.isMobileFullScreen === true ? ', minimal-ui' : '') + '">';
			
			_404PageContent += '<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">';
			
			// icons
			_404PageContent += '<link rel="shortcut icon" href="/R/favicon.ico?version=' + CONFIG.version + '" />';
			_404PageContent += '<link rel="apple-touch-icon-precomposed" href="/R/apple-touch-icon.png?version=' + CONFIG.version + '" />';
			
			_404PageContent += '<title>Page not found</title>';
	
			// load css.
			_404PageContent += '<link rel="stylesheet" type="text/css" href="/__CSS?version=' + CONFIG.version + '" />';
			
			// set base color.
			_404PageContent += '<style>';
			_404PageContent += 'html, body {';
			_404PageContent += 'background-color : ' + CONFIG.baseBackgroundColor + ';';
			_404PageContent += 'color : ' + CONFIG.baseColor + ';';
			_404PageContent += '}';
			_404PageContent += '</style>';
			
			_404PageContent += '</head>';
			_404PageContent += '<body>';
			
			// show please enable JavaScript msg.
			_404PageContent += '<noscript>';
			_404PageContent += '<p style="padding:15px;">';
			_404PageContent += 'JavaScript is disabled. Please enable JavaScript in your browser.';
			_404PageContent += '</p>';
			_404PageContent += '</noscript>';
			
			// load script.
			_404PageContent += '<script type="text/javascript">global=window;</script>';
			_404PageContent += '<script type="text/javascript" src="/__UJS?version=' + CONFIG.version + '"></script>';
			_404PageContent += '<script>' + READ_FILE({
				path : UPPERCASE_PATH + '/UPPERCASE-BOOT/404.js',
				isSync : true
			}).toString() + '</script>';
			_404PageContent += '</body>';
			_404PageContent += '</html>';
		}
	};

	generateIndexPage = function() {
		
		var
		// custom index path
		customIndexPath = rootPath + '/' + CHECK_IS_IN({
			array : boxNamesInBOXFolder,
			value : CONFIG.defaultBoxName
		}) === true ? 'BOX/' + CONFIG.defaultBoxName + '/index.html' : CONFIG.defaultBoxName + '/index.html';
		
		if (CHECK_IS_FILE_EXISTS({
			path : customIndexPath,
			isSync : true
		}) === true) {
			
			indexPageContent = READ_FILE({
				path : customIndexPath,
				isSync : true
			}).toString();
			
		} else {

			indexPageContent = '<!DOCTYPE html>';
			indexPageContent += '<html>';
			indexPageContent += '<head>';
			indexPageContent += '<meta charset="utf-8">';
			indexPageContent += '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' + (CONFIG.isMobileFullScreen === true ? ', minimal-ui' : '') + '">';
			
			if (NODE_CONFIG.isUsingHTMLSnapshot === true) {
				indexPageContent += '<meta name="fragment" content="!">';
			}
			
			if (CONFIG.description !== undefined) {
				indexPageContent += '<meta name="description" content="' + CONFIG.description + '">';
			}
			
			indexPageContent += '<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">';
			
			// icons
			indexPageContent += '<link rel="shortcut icon" href="/R/favicon.ico?version=' + CONFIG.version + '" />';
			indexPageContent += '<link rel="apple-touch-icon-precomposed" href="/R/apple-touch-icon.png?version=' + CONFIG.version + '" />';
			
			indexPageContent += '<title>' + CONFIG.title + '</title>';
	
			// load css.
			indexPageContent += '<link rel="stylesheet" type="text/css" href="/__CSS?version=' + CONFIG.version + '" />';
			
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
			indexPageContent += '<script type="text/javascript" src="/__SCRIPT?version=' + CONFIG.version + '"></script>';
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
		
		// box preprocessors
		boxPreprocessors = {},

		// is going on
		isGoingOn,

		// web server
		webServer,

		// cal
		cal = CALENDAR();

		if (NODE_CONFIG.uploadServerHosts !== undefined) {

			uploadServerHosts = [];
			nextUploadServerHostIndex = 0;

			EACH(NODE_CONFIG.uploadServerHosts, function(host) {
				uploadServerHosts.push(host);
			});
		}

		if (NODE_CONFIG.socketServerHosts !== undefined) {

			socketServerHosts = [];
			nextSocketServerHostIndex = 0;

			EACH(NODE_CONFIG.socketServerHosts, function(host) {
				socketServerHosts.push(host);
			});
		}

		if (NODE_CONFIG.webSocketServerHosts !== undefined) {

			webSocketServerHosts = [];
			nextWebSocketServerHostIndex = 0;

			EACH(NODE_CONFIG.webSocketServerHosts, function(host) {
				webSocketServerHosts.push(host);
			});
		}
		
		FOR_BOX(function(box) {
			if (box.OVERRIDE !== undefined) {
				box.OVERRIDE();
			}
		});

		// init objects.
		INIT_OBJECTS();

		if (CONFIG.webServerPort !== undefined || CONFIG.securedWebServerPort !== undefined) {
			
			webServer = WEB_SERVER({

				port : CONFIG.webServerPort,

				securedPort : CONFIG.securedWebServerPort,
				securedKeyFilePath : rootPath + '/' + NODE_CONFIG.securedKeyFilePath,
				securedCertFilePath : rootPath + '/' + NODE_CONFIG.securedCertFilePath,

				noParsingParamsURI : '__UPLOAD',

				rootPath : rootPath,

				version : version
			}, {
				
				notExistsResource : function(resourcePath, requestInfo, response) {
					
					// when dev mode, re-generate 404 page.
					if (CONFIG.isDevMode === true) {
						generate404Page();
					}
					
					response({
						statusCode : 404,
						content : _404PageContent
					});
				},

				requestListener : function(requestInfo, response, replaceRootPath, next) {

					var
					// is secure
					isSecure = requestInfo.isSecure,
					
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
					
					// box
					box,

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
					
					// serve version.
					else if (uri === '__VERSION') {

						response({
							content : CONFIG.version,
							headers : {
								'Access-Control-Allow-Origin' : '*'
							}
						});

						return false;
					}

					// serve browser script.
					else if (uri === '__SCRIPT') {
						
						boxName = params.boxName;

						if (CONFIG.isDevMode === true) {

							reloadBrowserScript();
							
							response({
								contentType : 'text/javascript',
								content : boxName === undefined ? browserScript : boxBrowserScripts[boxName]
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
										'Location' : '/__SCRIPT?version=' + version + (boxName === undefined ? '' : '&boxName=' + boxName)
									}
								});
							}

							// response browser script.
							else {

								response({
									contentType : 'text/javascript',
									content : boxName === undefined ? browserScript : boxBrowserScripts[boxName],
									version : version
								});
							}
						}

						return false;
					}

					// serve base style css.
					else if (uri === '__CSS') {
						replaceRootPath(UPPERCASE_PATH);
						requestInfo.uri = 'UPPERCASE-BOOT/R/BASE_STYLE.css';
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
						
						boxName = params.boxName;
						box = BOX.getAllBoxes()[boxName === undefined ? CONFIG.defaultBoxName : boxName];

						UPLOAD_REQUEST({
							requestInfo : requestInfo,
							uploadPath : rootPath + '/__RF/__TEMP'
						}, {
							
							overFileSize : function() {

								response({
									statusCode : 302,
									headers : {
										'Location' : params.callbackURL + '?maxUploadFileMB=' + encodeURIComponent(NODE_CONFIG.maxUploadFileMB)
									}
								});
							},
							
							progress : function(bytesRecieved, bytesExpected) {
								
								// broadcast.
								if (params.uploadKey !== undefined) {
									
									box.BROADCAST({
										roomName : 'uploadProgressRoom/' + params.uploadKey,
										methodName : 'progress',
										data : {
											bytesRecieved : bytesRecieved,
											bytesExpected : bytesExpected
										}
									});
								}
							},
							
							success : function(fileDataSet) {

								var
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
											
											var
											// to path
											toPath = rootPath + '/__RF/' + boxName + '/' + savedData.id;

											MOVE_FILE({
												from : tempPath,
												to : toPath
											}, function() {
												
												var
												// dist path
												distPath;
												
												// create thumbnail.
												if (
												// check is image
												savedData.type !== undefined && savedData.type.substring(0, 6) === 'image/' &&
												// check config exists
												(CONFIG.maxThumbWidth !== undefined || CONFIG.maxThumbHeight !== undefined)) {
													
													distPath = rootPath + '/__RF/' + boxName + '/THUMB/' + savedData.id;
													
													IMAGEMAGICK_IDENTIFY(toPath, {
														
														// when error, just copy.
														error : function() {
															COPY_FILE({
																from : toPath,
																to : distPath
															}, next);
														},
														
														success : function(features) {
								
															var
															// frs
															frs;
															
															if (CONFIG.maxThumbWidth !== undefined && features.width !== undefined && features.width > CONFIG.maxThumbWidth) {
								
																IMAGEMAGICK_RESIZE({
																	srcPath : toPath,
																	distPath : distPath,
																	width : CONFIG.maxThumbWidth
																}, next);
								
															} else if (CONFIG.maxThumbHeight !== undefined && features.height !== undefined && features.height > CONFIG.maxThumbHeight) {
								
																IMAGEMAGICK_RESIZE({
																	srcPath : toPath,
																	distPath : distPath,
																	height : CONFIG.maxThumbHeight
																}, next);
								
															} else {
								
																COPY_FILE({
																	from : toPath,
																	to : distPath
																}, next);
															}
														}
													});
													
												} else {
													next();
												}
											});
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

							if (boxName === 'UPPERCASE' || BOX.getAllBoxes()[boxName] !== undefined) {
								uri = uri.substring(i + 1);
							} else {
								boxName = CONFIG.defaultBoxName;
							}

							uploadFileDB = BOX.getAllBoxes()[boxName].DB('__UPLOAD_FILE');

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
												'Content-Disposition' : 'filename="' + encodeURIComponent(savedData.name) + '"',
												'Access-Control-Allow-Origin' : '*'
											},
											isFinal : true
										});

										uploadFileDB.updateNoHistory({
											id : savedData.id,
											$inc : {
												downloadCount : 1
											}
										});

									} else if (NODE_CONFIG.uploadServerHosts !== undefined) {

										response({
											statusCode : 302,
											headers : {
												'Location' : isSecure === true ?
													'https://' + NODE_CONFIG.uploadServerHosts[savedData.serverName] + ':' + CONFIG.securedWebServerPort + '/__RF/' + boxName + '/' + uri :
													'http://' + NODE_CONFIG.uploadServerHosts[savedData.serverName] + ':' + CONFIG.webServerPort + '/__RF/' + boxName + '/' + uri
											}
										});
									}
								}
							});
						}

						return false;
					}

					// serve cors callback.
					else if (uri === '__CORS_CALLBACK') {
						replaceRootPath(UPPERCASE_PATH + '/UPPERCASE-BOOT/R');
						requestInfo.uri = 'CORS_CALLBACK.html';
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
					
					// serve favicon.ico.
					else if (uri === 'favicon.ico') {
						
						requestInfo.uri = CHECK_IS_IN({
							array : boxNamesInBOXFolder,
							value : CONFIG.defaultBoxName
						}) === true ? 'BOX/' + CONFIG.defaultBoxName + '/R/favicon.ico' : CONFIG.defaultBoxName + '/R/favicon.ico';
					}
					
					// serve HTML snapshot.
					else if (NODE_CONFIG.isUsingHTMLSnapshot === true && params._escaped_fragment_ !== undefined) {
						
						RUN(function() {
							
							var
							// content
							content = '',
							
							// phantom
						    phantom = require('child_process').spawn('phantomjs', [__dirname + '/PRINT_HTML_SNAPSHOT.js', (CONFIG.webServerPort === undefined ? CONFIG.securedWebServerPort : CONFIG.webServerPort), uri === '' ? params._escaped_fragment_ : decodeURIComponent(uri)]);
						    
						    phantom.stdout.setEncoding('utf8');
						    
						    phantom.stdout.on('data', function(data) {
						        content += data.toString();
						    });
						    
						    phantom.on('exit', function(code) {
								response(content);
						    });
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

							if (BOX.getAllBoxes()[boxName] !== undefined || boxName === 'UPPERCASE-TRANSPORT') {
								uri = uri.substring(i + 1);
							} else {
								boxName = CONFIG.defaultBoxName;
							}
						}
						
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
								isGoingOn = boxRequestListeners[boxName](requestInfo, response, replaceRootPath, next);
							}
							
							if (isGoingOn !== false) {
								
								// when dev mode, re-generate index page.
								if (CONFIG.isDevMode === true) {
									generateIndexPage();
								}
								
								response({
									contentType : 'text/html',
									content : indexPageContent
								});
							}
							
							return false;
						}
					}
				}
			});
		}

		LAUNCH_ROOM_SERVER({
			socketServerPort : CONFIG.socketServerPort,
			webServer : webServer
		});
		
		// run all MAINs.
		FOR_BOX(function(box) {
			if (box.MAIN !== undefined) {
				box.MAIN(function(requestListener) {
					boxRequestListeners[box.boxName] = requestListener;
				}, function(params) {
					if (webServer !== undefined) {
						webServer.addPreprocessor(params);
					}
				});
			}
		});

		console.log(CONSOLE_GREEN('[BOOT] <' + cal.getYear() + '-' + cal.getMonth() + '-' + cal.getDate() + ' ' + cal.getHour() + ':' + cal.getMinute() + ':' + cal.getSecond() + '> [' + CONFIG.title + '] 부팅 완료' + (NODE_CONFIG.isNotUsingCPUClustering !== true ? ' (워커 ID:' + CPU_CLUSTERING.getWorkerId() + ')' : '') + (CONFIG.webServerPort === undefined ? '' : (' => http://localhost:' + CONFIG.webServerPort)) + (CONFIG.securedWebServerPort === undefined ? '' : (' => https://localhost:' + CONFIG.securedWebServerPort))));
	};
	
	// load all UPPERCASE modules for browser.
	EACH(['CORE', 'ROOM', 'MODEL', 'BOOT'], function(name) {
		loadForBrowser(UPPERCASE_PATH + '/UPPERCASE-' + name + '/BROWSER' + (CONFIG.isDevMode === true ? '.MIN' : '') + '.js');
	});
	
	// configuration.
	configuration();

	// init boxes.
	initBoxes();

	// clustering cpus and servers.
	clustering(function() {
		
		console.log('[BOOT] 부팅중...' + (NODE_CONFIG.isNotUsingCPUClustering !== true ? ' (워커 ID:' + CPU_CLUSTERING.getWorkerId() + ')' : ''));

		// connect to database.
		connectToDatabase();

		// load all scripts.
		scanAllBoxFolders('COMMON', loadForNode);
		scanAllBoxFolders('COMMON', loadForBrowser);
		
		scanAllBoxFolders('NODE', loadForNode);
		
		scanAllBoxFolders('BROWSER', loadForBrowser);
		
		scanAllBoxJS('NODE', loadForNode);
		scanAllBoxJS('BROWSER', loadForBrowser);
		
		// load BROWSER_INIT.
		loadForBrowser(UPPERCASE_PATH + '/UPPERCASE-BOOT/BROWSER_INIT' + (CONFIG.isDevMode === true ? '.MIN' : '') + '.js');
		
		// generate 404 page.
		generate404Page();
		
		// generate index page.
		generateIndexPage();

		// run.
		run();
		
		// run UADMIN.
		if (UADMIN_CONFIG !== undefined) {
			BOOT_UADMIN(UPPERCASE_PATH);
		}
	});
};

/**
 * boot UADMIN.
 */
global.BOOT_UADMIN = METHOD({

	run : function(UPPERCASE_PATH) {
		'use strict';
		//REQUIRED: UPPERCASE_PATH

		var
		// session store
		sessionStore = SHARED_STORE('sessionStore'),
		
		// model map
		modelMap = {},
		
		// model name map
		modelNameMap = {},
		
		// uri matcher
		uriMatcher = URI_MATCHER('__/{boxName}/{modelName}/{method}'),
		
		// UADMIN server
		uadminServer;
		
		UADMIN_CONFIG.init(function(model) {
			
			var
			// box name
			boxName = model.getBoxName(),
			
			// models
			models = modelMap[boxName],
			
			// name
			name = model.getName();
			
			if (models === undefined) {
				models = modelMap[boxName] = {};
				modelNameMap[boxName] = [];
			}
			
			models[name] = model;
			modelNameMap[boxName].push(name);
		});
		
		uadminServer = WEB_SERVER({

			port : UADMIN_CONFIG.port,
			
			rootPath : UPPERCASE_PATH + '/UADMIN',

			version : CONFIG.version
		}, {

			requestListener : function(requestInfo, nativeResponse, replaceRootPath, next) {
				
				var
				// uri
				uri = requestInfo.uri,
				
				// session key
				sessionKey = requestInfo.cookies.__SESSION_KEY,
	
				// session
				session,
				
				// password
				password,
				
				// match info
				matchInfo,
				
				// uri params
				uriParams,
				
				// models
				models,
				
				// model
				model,
				
				// response.
				response = function(content) {
					nativeResponse({
						content : content,
						headers : sessionKey !== undefined ? undefined : {
							'Set-Cookie' : CREATE_COOKIE_STR_ARRAY({
								__SESSION_KEY : RANDOM_STR(40)
							})
						}
					});
				};
				
				if (uri === '__LOGIN') {
					
					if (sessionKey !== undefined && requestInfo.data.password === UADMIN_CONFIG.password) {
						sessionStore.save({
							id : sessionKey,
							data : {
								password : requestInfo.data.password
							},
							removeAfterSeconds : 30 * 60 // 30 minutes
						});
						response('true');
					} else {
						response('false');
					}
					
					return false;
				}
				
				if (uri === '__LOGOUT') {
					
					if (sessionKey !== undefined) {
						sessionStore.remove(sessionKey);
					}
					
					response('true');
					
					return false;
				}
				
				// serve web server port.
				if (uri === '__WEB_SERVER_PORT') {
					
					response(CONFIG.webServerPort);
					
					return false;
				}
				
				// serve UPPERCASE-BROWSER-PACK.
				if (uri.indexOf('UPPERCASE-BROWSER-PACK/') === 0) {
					replaceRootPath(UPPERCASE_PATH);
				}
				
				if (sessionKey !== undefined) {
					session = sessionStore.get(sessionKey);
					if (session !== undefined) {
						password = session.password;
					}
				}
				
				if (password !== UADMIN_CONFIG.password) {
					
					// serve login page.
					if (uri === '') {
						
						READ_FILE(UPPERCASE_PATH + '/UADMIN/login.html', function(content) {
							response(content.toString());
						});
						
						return false;
					}
					
				} else {
					
					// serve system info.
					if (uri === '__SYSTEM_INFO') {
						
						response(STRINGIFY({
							cpus : CPU_USAGES(),
							memory : MEMORY_USAGE(),
							workerId : CPU_CLUSTERING.getWorkerId(),
							pid : process.pid
						}));
						
						return false;
					}
					
					// serve store storages.
					if (uri === '__SHARED_STORE_STORAGES') {
						
						nativeResponse({
							contentType : 'application/json',
							content : STRINGIFY(SHARED_STORE.getStorages())
						});
						
						return false;
					}
					
					// serve db storages.
					if (uri === '__SHARED_STORE_STORAGES') {
						
						nativeResponse({
							contentType : 'application/json',
							content : STRINGIFY(SHARED_STORE.getStorages())
						});
						
						return false;
					}
					
					// serve model naem map.
					else if (uri === '__MODEL_NAME_MAP') {
						
						response(STRINGIFY(modelNameMap));
						
						return false;
					}
					
					matchInfo = uriMatcher.check(uri);
					
					// serve model funcs.
					if (matchInfo.checkIsMatched() === true) {
						
						uriParams = matchInfo.getURIParams();
						
						models = modelMap[uriParams.boxName];
						
						if (models !== undefined) {
							
							model = models[uriParams.modelName];
							
							if (model !== undefined) {
								
								if (uriParams.method === '__GET_CREATE_VALID_DATA_SET') {
									
									if (model.getCreateValid() === undefined) {
										
										response('');
										
									} else {
										
										response(STRINGIFY(model.getCreateValid().getValidDataSet()));
									}
								}
								
								else if (uriParams.method === '__GET_UPDATE_VALID_DATA_SET') {
									
									if (model.getUpdateValid() === undefined) {
										
										response('');
										
									} else {
										
										response(STRINGIFY(model.getUpdateValid().getValidDataSet()));
									}
								}
								
								else if (uriParams.method === '__GET_VALID_DATA_SET') {
									
									if (model.getCreateValid() === undefined && model.getUpdateValid() === undefined) {
										
										response('');
										
									} else if (model.getCreateValid() === undefined) {
										
										response(STRINGIFY(model.getUpdateValid().getValidDataSet()));
										
									} else if (model.getUpdateValid() === undefined) {
										
										response(STRINGIFY(model.getCreateValid().getValidDataSet()));
									
									} else {
										response(STRINGIFY(COMBINE([model.getUpdateValid().getValidDataSet(), model.getCreateValid().getValidDataSet()])));
									}
								}
								
								else if (uriParams.method === 'create' && model.create !== undefined) {
								
									model.create(requestInfo.data, {
										error : function(errorMsg) {
											response(STRINGIFY({
												errorMsg : errorMsg
											}));
										},
										notValid : function(validErrors) {
											response(STRINGIFY({
												validErrors : validErrors
											}));
										},
										success : function(savedData) {
											response(STRINGIFY({
												savedData : savedData
											}));
										}
									});
									
									return false;
								}
								
								else if (uriParams.method === 'get' && model.get !== undefined) {
								
									model.get(requestInfo.data, {
										error : function(errorMsg) {
											response(STRINGIFY({
												errorMsg : errorMsg
											}));
										},
										success : function(savedData) {
											response(STRINGIFY({
												savedData : savedData
											}));
										}
									});
									
									return false;
								}
								
								else if (uriParams.method === 'update' && model.update !== undefined) {
								
									model.update(requestInfo.data, {
										error : function(errorMsg) {
											response(STRINGIFY({
												errorMsg : errorMsg
											}));
										},
										notValid : function(validErrors) {
											response(STRINGIFY({
												validErrors : validErrors
											}));
										},
										success : function(savedData, originData) {
											response(STRINGIFY({
												savedData : savedData,
												originData: originData
											}));
										}
									});
									
									return false;
								}
								
								else if (uriParams.method === 'remove' && model.remove !== undefined) {
								
									model.remove(requestInfo.data, {
										error : function(errorMsg) {
											response(STRINGIFY({
												errorMsg : errorMsg
											}));
										},
										success : function(originData) {
											response(STRINGIFY({
												originData: originData
											}));
										}
									});
									
									return false;
								}
								
								else if (uriParams.method === 'find' && model.find !== undefined) {
									
									if (requestInfo.data !== undefined && requestInfo.data.filter !== undefined) {
										
										EACH(requestInfo.data.filter, function(value, name) {
											
											var
											// type
											type;
											
											if (value === '' || value === false) {
												delete requestInfo.data.filter[name];
											}
											
											else if (name === 'id' || value === true || VALID.real(value) === true) {
												
												if (name.indexOf('$') !== -1) {
													
													delete requestInfo.data.filter[name];
													type = name.substring(name.indexOf('$') + 1);
													name = name.substring(0, name.indexOf('$'));
													
													if (requestInfo.data.filter[name] === undefined) {
														requestInfo.data.filter[name] = {};
													}
													
													if (type === 'start') {
														requestInfo.data.filter[name].$gte = REAL(value);
													} else if (type === 'end') {
														requestInfo.data.filter[name].$lte = REAL(value);
													}
												}
												
												else {
													requestInfo.data.filter[name] = value;
												}
											}
											
											else if (value !== false) {
												
												if (name.indexOf('$') !== -1) {
													
													delete requestInfo.data.filter[name];
													type = name.substring(name.indexOf('$') + 1);
													name = name.substring(0, name.indexOf('$'));
													
													if (requestInfo.data.filter[name] === undefined) {
														requestInfo.data.filter[name] = {};
													}
													
													if (type === 'start') {
														requestInfo.data.filter[name].$gte = new Date(value);
													} else if (type === 'end') {
														requestInfo.data.filter[name].$lte = new Date(value);
													}
												}
												
												else {
													requestInfo.data.filter[name] = new RegExp(value, 'g');
												}
											}
										});
									}
									
									model.find(requestInfo.data, {
										error : function(errorMsg) {
											response(STRINGIFY({
												errorMsg : errorMsg
											}));
										},
										success : function(savedDataSet) {
											response(STRINGIFY({
												savedDataSet : savedDataSet
											}));
										}
									});
									
									return false;
								}
								
								else if (uriParams.method === 'count' && model.count !== undefined) {
								
									model.count(requestInfo.data, {
										error : function(errorMsg) {
											response(STRINGIFY({
												errorMsg : errorMsg
											}));
										},
										success : function(count) {
											response(STRINGIFY({
												count : count
											}));
										}
									});
									
									return false;
								}
							}
						}
					}
				}
			},
			
			notExistsResource : function(resourcePath, requestInfo, response) {
				
				var
				// session key
				sessionKey = requestInfo.cookies.__SESSION_KEY,
				
				// session
				session,
				
				// password
				password;
				
				if (sessionKey !== undefined) {
					session = sessionStore.get(sessionKey);
					if (session !== undefined) {
						password = session.password;
					}
				}
				
				if (password !== UADMIN_CONFIG.password) {
					
					READ_FILE(UPPERCASE_PATH + '/UADMIN/login.html', function(content) {
						response(content.toString());
					});
					
				} else {
				
					READ_FILE(UPPERCASE_PATH + '/UADMIN/index.html', function(content) {
						response(content.toString());
					});
				}
				
				return false;
			}
		});
		
		console.log('[UPPERCASE] UADMIN Tool BOOTed! => http://localhost:' + UADMIN_CONFIG.port);
	}
});

/**
 * Check still alive object
 */
global.CHECK_STILL_ALIVE = OBJECT({

	init : function() {
		'use strict';

		UPPERCASE.ROOM('checkStillAliveRoom', function(clientInfo, on, off, send) {
			
			// I'm still alive!!
			on('check', function(notUsing, ret) {
				ret('__ALIVE');
			});
			
			// I'm still alive!! (string mode)
			on('checkStr', function(notUsing, ret) {
				send({
					str : '__ALIVE'
				});
			});
		});
	}
});

/**
 * Node-side Configuration
 */
OVERRIDE(NODE_CONFIG, function(origin) {

	global.NODE_CONFIG = COMBINE([{
		isUsingHTMLSnapshot : false,
		isNotUsingCPUClustering : false
	}, origin]);
});

/**
 * Sync time object (Server-side)
 */
global.SYNC_TIME = OBJECT({

	init : function() {
		'use strict';

		UPPERCASE.ROOM('timeSyncRoom', function(clientInfo, on) {

			// return diff. (diff: client time - server time)
			on('sync', function(clientNow, ret) {
				ret(clientNow - new Date());
			});
		});
	}
});
