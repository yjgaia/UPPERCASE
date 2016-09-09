/*
 * 리소스 서버를 생성하는 클래스
 */
global.RESOURCE_SERVER = CLASS(function(cls) {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),
	
	//IMPORT: path
	path = require('path'),

	//IMPORT: querystring
	querystring = require('querystring'),
	
	// preprocessors
	preprocessors = {},

	// get content type from extension.
	getContentTypeFromExtension,
	
	// add preprocessor.
	addPreprocessor;

	cls.getContentTypeFromExtension = getContentTypeFromExtension = function(extension) {
		//REQUIRED: ext
		
		// png image
		if (extension === 'png') {
			return 'image/png';
		}

		// jpeg image
		if (extension === 'jpeg' || extension === 'jpg') {
			return 'image/jpeg';
		}

		// gif image
		if (extension === 'gif') {
			return 'image/gif';
		}

		// svg
		if (extension === 'svg') {
			return 'image/svg+xml';
		}

		// javascript
		if (extension === 'js') {
			return 'application/javascript';
		}

		// json document
		if (extension === 'json') {
			return 'application/json';
		}

		// css
		if (extension === 'css') {
			return 'text/css';
		}

		// text
		if (extension === 'text' || extension === 'txt') {
			return 'text/plain';
		}

		// markdown
		if (extension === 'markdown' || extension === 'md') {
			return 'text/x-markdown';
		}

		// html document
		if (extension === 'html') {
			return 'text/html';
		}

		// swf
		if (extension === 'swf') {
			return 'application/x-shockwave-flash';
		}

		// mp3
		if (extension === 'mp3') {
			return 'audio/mpeg';
		}

		// ogg
		if (extension === 'ogg') {
			return 'audio/ogg';
		}

		// mp4
		if (extension === 'mp4') {
			return 'video/mp4';
		}

		return 'application/octet-stream';
	};
	
	cls.addPreprocessor = addPreprocessor = function(params) {
		//REQUIRED: params
		//REQUIRED: params.extension
		//REQUIRED: params.preprocessor
		
		var
		// extension
		extension = params.extension,
		
		// preprocessor
		preprocessor = params.preprocessor;
		
		preprocessors[extension] = preprocessor;
	};

	return {

		init : function(inner, self, portOrParams, requestListenerOrHandlers) {
			//REQUIRED: portOrParams
			//OPTIONAL: portOrParams.port
			//OPTIONAL: portOrParams.securedPort			https서버 포트
			//OPTIONAL: portOrParams.securedKeyFilePath		SSL인증 .key 파일 경로
			//OPTIONAL: portOrParams.securedCertFilePath	SSL인증 .cert 파일 경로
			//OPTIONAL: portOrParams.rootPath				리소스 루트 폴더
			//OPTIONAL: portOrParams.version				캐싱을 위한 버전
			//OPTIONAL: requestListenerOrHandlers
			//OPTIONAL: requestListenerOrHandlers.requestListener
			//OPTIONAL: requestListenerOrHandlers.error
			//OPTIONAL: requestListenerOrHandlers.notExistsResource
			//OPTIONAL: requestListenerOrHandlers.preprocessor

			var
			//IMPORT: path
			path = require('path'),

			// port
			port,

			// secured port
			securedPort,

			// origin root path
			originRootPath,

			// version
			version,

			// request listener.
			requestListener,

			// error handler.
			errorHandler,

			// not exists resource handler.
			notExistsResourceHandler,
			
			// preprocessor.
			preprocessor,

			// resource caches
			resourceCaches = {},

			// web server
			webServer,
			
			// get native http server.
			getNativeHTTPServer,
			
			// get native https server.
			getNativeHTTPSServer;

			// init params.
			if (CHECK_IS_DATA(portOrParams) !== true) {
				port = portOrParams;
			} else {
				port = portOrParams.port;
				securedPort = portOrParams.securedPort;
				originRootPath = portOrParams.rootPath;
				version = String(portOrParams.version);
			}

			if (requestListenerOrHandlers !== undefined) {
				if (CHECK_IS_DATA(requestListenerOrHandlers) !== true) {
					requestListener = requestListenerOrHandlers;
				} else {
					requestListener = requestListenerOrHandlers.requestListener;
					errorHandler = requestListenerOrHandlers.error;
					notExistsResourceHandler = requestListenerOrHandlers.notExistsResource;
					preprocessor = requestListenerOrHandlers.preprocessor;
				}
			}

			webServer = WEB_SERVER(portOrParams, function(requestInfo, response, onDisconnected) {

				var
				// root path
				rootPath = originRootPath,

				// is going on
				isGoingOn,

				// original uri
				originalURI = requestInfo.uri,

				// uri
				uri = requestInfo.uri,

				// method
				method = requestInfo.method,

				// params
				params = requestInfo.params,

				// headers
				headers = requestInfo.headers,

				// overriding response info
				overrideResponseInfo = {},

				// response not found.
				responseNotFound,

				// response error.
				responseError;

				NEXT([
				function(next) {

					if (requestListener !== undefined) {

						isGoingOn = requestListener(requestInfo, response, onDisconnected, function(newRootPath) {
							rootPath = newRootPath;
						}, function(_overrideResponseInfo) {

							if (_overrideResponseInfo !== undefined) {
								overrideResponseInfo = _overrideResponseInfo;
							}

							DELAY(next);
						});

						// init properties again.
						uri = requestInfo.uri;
						method = requestInfo.method;
						params = requestInfo.params;
						headers = requestInfo.headers;
					}

					if (isGoingOn !== false && requestInfo.isResponsed !== true) {
						next();
					}
				},

				function() {
					return function() {
						
						// stream video.
						if (headers.range !== undefined) {
							
							GET_FILE_INFO(rootPath + '/' + uri, function(fileInfo) {

								var
								// positions
								positions = headers.range.replace(/bytes=/, '').split('-'),
								
								// total size
								totalSize = fileInfo.size,
								
								// start position
								startPosition = INTEGER(positions[0]),
								
								// end position
								endPosition = positions[1] === undefined || positions[1] === '' ? totalSize - 1 : INTEGER(positions[1]),
								
								// stream
								stream = fs.createReadStream(rootPath + '/' + uri, {
									start : startPosition,
									end : endPosition
								}).on('open', function() {
									
									response(EXTEND({
										origin : {
											contentType : getContentTypeFromExtension(path.extname(uri).substring(1)),
											totalSize : totalSize,
											startPosition : startPosition,
											endPosition : endPosition,
											stream : stream
										},
										extend : overrideResponseInfo
									}));
									
								}).on('error', function(error) {
									
									response(EXTEND({
										origin : {
											contentType : getContentTypeFromExtension(path.extname(uri).substring(1)),
											totalSize : totalSize,
											startPosition : startPosition,
											endPosition : endPosition,
											content : error.toString()
										},
										extend : overrideResponseInfo
									}));
								});
							});
						}
						
						// check ETag.
						else if (CONFIG.isDevMode !== true && (overrideResponseInfo.isFinal !== true ?

						// check version.
						(version !== undefined && headers['if-none-match'] === version) :

						// check exists.
						headers['if-none-match'] !== undefined)) {

							// response cached.
							response(EXTEND({
								origin : {
									statusCode : 304
								},
								extend : overrideResponseInfo
							}));
						}

						// redirect correct version uri.
						else if (CONFIG.isDevMode !== true && overrideResponseInfo.isFinal !== true && version !== undefined && originalURI !== '' && params.version !== version) {

							response(EXTEND({
								origin : {
									statusCode : 302,
									headers : {
										'Location' : '/' + originalURI + '?' + querystring.stringify(COMBINE([params, {
											version : version
										}]))
									}
								},
								extend : overrideResponseInfo
							}));
						}

						// response resource file.
						else if (rootPath !== undefined && method === 'GET') {

							responseNotFound = function(resourcePath) {

								if (notExistsResourceHandler !== undefined) {
									isGoingOn = notExistsResourceHandler(resourcePath, requestInfo, response);
								}

								if (isGoingOn !== false && requestInfo.isResponsed !== true) {

									response(EXTEND({
										origin : {
											statusCode : 404
										},
										extend : overrideResponseInfo
									}));
								}
							};

							responseError = function(errorMsg) {

								if (errorHandler !== undefined) {
									isGoingOn = errorHandler(errorMsg, requestInfo, response);
								} else {
									SHOW_ERROR('[RESOURCE_SERVER] ERROR: ' + errorMsg);
								}

								if (isGoingOn !== false && requestInfo.isResponsed !== true) {

									response(EXTEND({
										origin : {
											statusCode : 500
										},
										extend : overrideResponseInfo
									}));
								}
							};

							NEXT([
							function(next) {

								var
								// resource cache
								resourceCache = resourceCaches[originalURI];

								if (resourceCache !== undefined) {
									next(resourceCache.buffer, resourceCache.contentType);
								} else {

									// serve file.
									READ_FILE(rootPath + '/' + uri, {

										notExists : function() {

											// not found file, so serve index.
											READ_FILE(rootPath + (uri === '' ? '' : ('/' + uri)) + '/index.html', {

												notExists : function() {
													responseNotFound(rootPath + '/' + uri);
												},
												error : responseError,

												success : function(buffer) {
													next(buffer, 'text/html');
												}
											});
										},

										error : responseError,
										success : next
									});
								}
							},

							function() {
								return function(buffer, contentType) {
									
									var
									// extension
									extension = path.extname(uri).substring(1);
									
									if (preprocessors[extension] !== undefined) {
										preprocessors[extension](buffer.toString(), response);
									} else {
										
										if (contentType === undefined) {
											contentType = getContentTypeFromExtension(extension);
										}
	
										if (CONFIG.isDevMode !== true && overrideResponseInfo.isFinal !== true && resourceCaches[originalURI] === undefined) {
											resourceCaches[originalURI] = {
												buffer : buffer,
												contentType : contentType
											};
										}
	
										response(EXTEND({
											origin : {
												buffer : buffer,
												contentType : contentType,
												version : version
											},
											extend : overrideResponseInfo
										}));
									}
								};
							}]);

						} else {
							response(EXTEND({
								origin : {
									statusCode : 404
								},
								extend : overrideResponseInfo
							}));
						}
					};
				}]);
			});

			console.log('[RESOURCE_SERVER] RUNNING RESOURCE SERVER...' + (port === undefined ? '' : (' (PORT:' + port + ')')) + (securedPort === undefined ? '' : (' (SECURED PORT:' + securedPort + ')')));

			self.getNativeHTTPServer = getNativeHTTPServer = function() {
				return webServer.getNativeHTTPServer();
			};
			
			self.getNativeHTTPSServer = getNativeHTTPSServer = function() {
				return webServer.getNativeHTTPSServer();
			};
		}
	};
});
