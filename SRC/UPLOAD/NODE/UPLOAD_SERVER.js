/*
 * create upload server.
 */
global.UPLOAD_SERVER = UPLOAD_SERVER = METHOD(function(m) {'use strict';

	var
	//IMPORT: http
	http = require('http'),

	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: querystring
	querystring = require('querystring'),

	//IMPORT: IncomingForm
	IncomingForm = require('formidable').IncomingForm;

	return {

		run : function(params, handlerMap) {'use strict';
			//REQUIRED: params
			//OPTIONAL: params.port
			//OPTIONAL: params.securedPort
			//OPTIONAL: params.securedKeyFilePath
			//OPTIONAL: params.securedCertFilePath
			//REQUIRED: params.uploadPath
			//REQUIRED: handlerMap
			//REQUIRED: handlerMap.upload
			//REQUIRED: handlerMap.upload.success
			//OPTIONAL: handlerMap.upload.error
			//OPTIONAL: handlerMap.upload.overFileSize
			//OPTIONAL: handlerMap.serve
			//OPTIONAL: handlerMap.serve.requestListener
			//OPTIONAL: handlerMap.serve.error
			//OPTIONAL: handlerMap.serve.notExistsResource

			var
			// port
			port = params.port,

			// secured port
			securedPort = params.securedPort,

			// secured key file path
			securedKeyFilePath = params.securedKeyFilePath,

			// secured cert file path
			securedCertFilePath = params.securedCertFilePath,

			// origin upload path
			originUploadPath = params.uploadPath,

			// upload handlers
			uploadHandlers,

			// upload success handler
			uploadSuccessHandler,

			// upload error handler
			uploadErrorHandler,

			// upload over file size handler
			uploadOverFileSizeHandler,

			// serve handlers
			serveHandlers,

			// serve request listener
			serveRequestListener,

			// serve error handler
			serveErrorHandler,

			// serve not exists resource handler
			serveNotExistsResourceHandler,

			// serve.
			serve;

			if (CHECK_IS_DATA(handlerMap) !== true) {
				uploadSuccessHandler = handlerMap;
			} else {

				uploadHandlers = handlerMap.upload;

				if (CHECK_IS_DATA(uploadHandlers) !== true) {
					uploadSuccessHandler = uploadHandlers;
				} else {
					uploadSuccessHandler = uploadHandlers.success;
					uploadErrorHandler = uploadHandlers.error;
					uploadOverFileSizeHandler = uploadHandlers.overFileSize;
				}

				serveHandlers = handlerMap.serve;

				if (CHECK_IS_DATA(serveHandlers) !== true) {
					serveRequestListener = serveHandlers;
				} else {
					serveRequestListener = uploadHandlers.requestListener;
					serveErrorHandler = uploadHandlers.error;
					serveNotExistsResourceHandler = uploadHandlers.notExistsResource;
				}
			}

			fs.exists(originUploadPath, function(isExists) {

				if (isExists === false) {
					console.log(CONSOLE_RED('[UPPERCASE.IO-UPLOAD_REQUEST] NOT EXISTS FOLDER!: ' + originUploadPath));
				} else {

					serve = function(nativeReq, nativeRes) {

						var
						// upload path
						uploadPath = originUploadPath,

						// is going on
						isGoingOn,

						// headers
						headers = nativeReq.headers,

						// uri
						uri = nativeReq.url,

						// method
						method = nativeReq.method.toUpperCase(),

						// ip
						ip = headers['X-Forwarded-For'],

						// param str
						paramStr,

						// form
						form,

						// file data set
						fileDataSet,

						// field data
						fieldData,

						// request info
						requestInfo,

						// response.
						response,

						// response not found.
						responseNotFound,

						// response error.
						responseError;

						if (ip === undefined) {
							ip = nativeReq.connection.remoteAddress;
						}

						if (uri.indexOf('?') != -1) {
							paramStr = uri.substring(uri.indexOf('?') + 1);
							uri = uri.substring(0, uri.indexOf('?'));
						}

						uri = uri.substring(1);

						requestInfo = {

							headers : headers,

							uri : uri,

							method : method,

							params : querystring.parse(paramStr),

							ip : ip,

							cookies : PARSE_COOKIE_STR(headers.cookie),

							nativeReq : nativeReq
						};

						response = function(params) {
							//REQUIRED: params
							//OPTIONAL: params.statusCode
							//OPTIONAL: params.headers
							//OPTIONAL: params.contentType
							//REQUIRED: params.content
							//OPTIONAL: params.encoding
							//OPTIONAL: params.cacheTime

							var
							// status code
							statusCode,

							// headers
							headers,

							// content type
							contentType,

							// content
							content,

							// encoding
							encoding,

							// cache time
							cacheTime;

							if (params !== undefined) {

								statusCode = params.statusCode;
								headers = params.headers;
								contentType = params.contentType;
								content = params.content;
								encoding = params.encoding;
								cacheTime = params.cacheTime;
							}

							if (statusCode === undefined) {
								statusCode = 200;
							}

							if (headers === undefined) {
								headers = {};
							}

							if (contentType !== undefined) {
								headers['Content-Type'] = contentType;

								if (encoding === undefined) {
									encoding = WEB_SERVER.getEncodingFromContentType(contentType);
								}
							}

							if (cacheTime !== undefined) {
								headers['ETag'] = cacheTime;
								headers['Last-Modified'] = new Date(cacheTime).toUTCString();
							}

							nativeRes.writeHead(statusCode, headers);
							nativeRes.end(content, encoding);
						};

						// serve upload.
						if (method === 'POST') {

							form = new IncomingForm();
							fileDataSet = [];
							fieldData = {};

							form.uploadDir = uploadPath;

							form.on('field', function(fieldName, value) {

								fieldData[fieldName] = value;

							}).on('file', function(fieldName, file) {

								fileDataSet.push({
									tempPath : file.path,
									size : file.size,
									name : file.name,
									type : file.type,
									lastModifiedTime : file.lastModifiedDate
								});

							}).on('end', function() {

								NEXT(fileDataSet, [
								function(fileData, next) {

									var
									// temp path
									tempPath = fileData.tempPath,

									// file size
									fileSize = fileData.size;

									// delete temp path.
									delete fileData.tempPath;

									fileData.ip = ip;

									if (fileSize > NODE_CONFIG.maxUploadFileMB * 1024 * 1024) {

										if (uploadOverFileSizeHandler !== undefined) {
											uploadOverFileSizeHandler(tempPath, fileSize);
										} else {
											console.log(CONSOLE_YELLOW('[UPPERCASE.IO-UPLOAD_REQUEST] FILE SIZE IS TOO BIG!(' + fileSize + '):' + tempPath));
										}

										return false;
									}

									EACH(fieldData, function(value, name) {
										if (value.trim() !== '') {
											fileData[name] = value;
										}
									});

									var
									// file type
									fileType = fileData.type;

									if (fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/gif') {

										IMAGEMAGICK_EXPORT_METADATA(tempPath, {
											error : function() {
												next(fileData);
											},
											success : function(metadata) {

												if (metadata.exif !== undefined) {

													fileData.exif = metadata.exif;

													IMAGEMAGICK_CONVERT([tempPath, '-auto-orient', tempPath], {
														error : errorHandler,
														success : next
													});

												} else {
													next();
												}
											}
										});

									} else {
										next();
									}
								},

								function() {
									return function() {
										uploadSuccessHandler(fileDataSet, requestInfo, response);
									};
								}]);

							}).on('error', function(error) {

								var
								// error msg
								errorMsg = error.toString();

								console.log('[UPPERCASE.IO-UPLOAD_REQUEST] ERROR: ' + errorMsg);

								if (uploadErrorHandler !== undefined) {
									uploadErrorHandler(errorMsg);
								}
							});

							form.parse(nativeReq);
						}

						// serve uploaded resource.
						else if (method === 'GET') {

							if (serveRequestListener !== undefined) {

								isGoingOn = serveRequestListener(requestInfo, response, onDisconnected, function(newUploadPath) {
									uploadPath = newUploadPath;
								});

								// init properties again.
								uri = requestInfo.uri;
								method = requestInfo.method;
								params = requestInfo.params;
								headers = requestInfo.headers;
							}

							responseNotFound = function(resourcePath) {

								if (serveNotExistsResourceHandler !== undefined) {
									serveNotExistsResourceHandler(resourcePath, requestInfo, response);
								}

								if (requestInfo.isResponsed !== true) {

									response({
										statusCode : 404
									});
								}
							};

							responseError = function(errorMsg) {

								console.log(CONSOLE_RED('[UPPERCASE.JS-RESOURCE_SERVER] ERROR: ' + errorMsg));

								if (serveErrorHandler !== undefined) {
									serveErrorHandler(errorMsg, requestInfo, response);
								}

								if (requestInfo.isResponsed !== true) {

									response({
										statusCode : 500
									});
								}
							};

							// serve file.
							READ_FILE(uploadPath + '/' + uri, {

								notExists : responseNotFound,
								error : responseError,

								success : function(content) {

									response({
										content : content,
										headers : {
											//'ETag' : version
										}
									});
								}
							});
						}
					};

					// init sever.
					if (port !== undefined) {
						http.createServer(serve).listen(port);
					}

					// init secured sever.
					if (securedPort !== undefined) {

						https.createServer({
							key : fs.readFileSync(securedKeyFilePath),
							cert : fs.readFileSync(securedCertFilePath)
						}, serve).listen(securedPort);
					}

					console.log('[UPPERCASE.IO-UPLOAD_SERVER] RUNNING UPLOAD SERVER...' + (port === undefined ? '' : (' (PORT:' + port + ')')) + (securedPort === undefined ? '' : (' (SECURED PORT:' + securedPort + ')')));
				}
			});
		}
	};
});
