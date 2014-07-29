/*
 * create upload server.
 */
global.UPLOAD_SERVER = UPLOAD_SERVER = METHOD(function(m) {'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

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

			// upload path
			uploadPath = params.uploadPath,

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
			serveNotExistsResourceHandler;

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
					serveRequestListener = serveHandlers.requestListener;
					serveErrorHandler = serveHandlers.error;
					serveNotExistsResourceHandler = serveHandlers.notExistsResource;
				}
			}

			CREATE_FOLDER(uploadPath, function() {

				RESOURCE_SERVER({
					port : port,
					securedPort : securedPort,
					securedKeyFilePath : securedKeyFilePath,
					securedCertFilePath : securedCertFilePath,
					rootPath : uploadPath,
					isFinalResource : true,
					isNotParsingNativeReq : true
				}, {
					errorHandler : serveErrorHandler,
					notExistsResource : serveNotExistsResourceHandler,
					requestListener : function(requestInfo, response, onDisconnected, changeRootPath, setDefaultContentType, addHeader) {

						var
						// method
						method = requestInfo.method,

						// ip
						ip = requestInfo.ip,

						// native req
						nativeReq = requestInfo.nativeReq,

						// form
						form,

						// file data set
						fileDataSet,

						// field data
						fieldData;

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
									path : file.path,
									size : file.size,
									name : file.name,
									type : file.type,
									lastModifiedTime : file.lastModifiedDate
								});

							}).on('end', function() {

								NEXT(fileDataSet, [
								function(fileData, next) {

									var
									// path
									path = fileData.path,

									// file size
									fileSize = fileData.size;

									fileData.ip = ip;

									if (fileSize > NODE_CONFIG.maxUploadFileMB * 1024 * 1024) {

										if (uploadOverFileSizeHandler !== undefined) {

											NEXT(fileDataSet, [
											function(fileData, next) {
												REMOVE_FILE(fileData.path, next);
											},

											function() {
												return function() {
													uploadOverFileSizeHandler(requestInfo, response);
												};
											}]);

										} else {
											console.log(CONSOLE_YELLOW('[UPPERCASE.IO-UPLOAD_REQUEST] FILE SIZE IS TOO BIG!(' + fileSize + '):' + path));
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

										IMAGEMAGICK_READ_METADATA(path, {
											error : function() {
												next(fileData);
											},
											success : function(metadata) {

												if (metadata.exif !== undefined) {

													fileData.exif = metadata.exif;

													IMAGEMAGICK_CONVERT([path, '-auto-orient', path], {
														error : uploadErrorHandler,
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

							return false;

						} else if (serveRequestListener !== undefined) {
							return serveRequestListener(requestInfo, response, onDisconnected, changeRootPath, setDefaultContentType, addHeader);
						}
					}
				});

				console.log('[UPPERCASE.IO-UPLOAD_SERVER] RUNNING UPLOAD SERVER...' + (port === undefined ? '' : (' (PORT:' + port + ')')) + (securedPort === undefined ? '' : (' (SECURED PORT:' + securedPort + ')')));
			});
		}
	};
});
