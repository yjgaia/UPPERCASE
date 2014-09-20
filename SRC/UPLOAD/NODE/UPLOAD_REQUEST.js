/*
 * create upload request handler.
 */
global.UPLOAD_REQUEST = UPLOAD_REQUEST = METHOD(function(m) {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: IncomingForm
	IncomingForm = require('formidable').IncomingForm;

	return {

		run : function(params, callbackOrHandlers) {
			'use strict';
			//REQUIRED: params
			//OPTIONAL: params.requestInfo
			//REQUIRED: params.uploadPath
			//REQUIRED: callbackOrHandlers
			//REQUIRED: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.overFileSize

			var
			// request info
			requestInfo = params.requestInfo,

			// upload path
			uploadPath = params.uploadPath,

			// callback
			callback,

			// error handler
			errorHandler,

			// over file size handler
			overFileSizeHandler;

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				callback = callbackOrHandlers.success;
				errorHandler = callbackOrHandlers.error;
				overFileSizeHandler = callbackOrHandlers.overFileSize;
			}

			CREATE_FOLDER(uploadPath, function() {

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

								NEXT(fileDataSet, [
								function(fileData, next) {
									REMOVE_FILE(fileData.path, next);
								},

								function() {
									return function() {
										if (overFileSizeHandler !== undefined) {
											overFileSizeHandler();
										}
									};
								}]);

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
								callback(fileDataSet);
							};
						}]);

					}).on('error', function(error) {

						var
						// error msg
						errorMsg = error.toString();

						if (errorHandler !== undefined) {
							errorHandler(errorMsg);
						} else {
							console.log('[UPPERCASE.IO-UPLOAD_REQUEST] ERROR: ' + errorMsg);
						}
					});

					form.parse(nativeReq);
				}
			});
		}
	};
});
