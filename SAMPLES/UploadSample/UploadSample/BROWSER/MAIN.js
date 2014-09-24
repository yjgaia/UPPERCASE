UploadSample.MAIN = METHOD({

	run : function() {
		'use strict';

		var
		// preview
		preview,

		// wrapper
		wrapper = DIV({
			c : preview = DIV()
		}).appendTo(BODY),

		// iframe
		iframe = IFRAME({
			name : '__UPLOAD_FORM'
		}).appendTo(wrapper);

		GET('__UPLOAD_SERVER_HOST?defaultHost=' + global.location.hostname, function(host) {

			var
			// callback url
			callbackURL = global.location.protocol + '//' + global.location.host + '/__UPLOAD_CALLBACK',

			// form
			form,

			// input
			input;

			iframe.after( form = FORM({
				action : 'http://' + host + ':' + CONFIG.webServerPort + '/__UPLOAD?boxName=UploadSample&callbackURL=' + callbackURL,
				target : '__UPLOAD_FORM',
				method : 'POST',
				enctype : 'multipart/form-data',
				c : [ input = INPUT({
					type : 'file',
					name : 'file',
					isMultiple : true
				})]
			}));

			EVENT({
				node : input,
				name : 'change'
			}, function(e) {
				if (form !== undefined) {
					form.submit(true);
				}
			});

			EVENT({
				node : iframe,
				name : 'load'
			}, function(e) {

				var
				// frame
				frame = global['__UPLOAD_FORM'],

				// file data set str
				fileDataSetStr = frame !== undefined ? frame.fileDataSetStr : undefined,

				// file data set
				fileDataSet,

				// max upload file MB
				maxUploadFileMB = frame !== undefined ? frame.maxUploadFileMB : undefined;

				if (maxUploadFileMB !== undefined) {

					console.log('over size:' + maxUploadFileMB);

				} else if (fileDataSetStr !== undefined) {

					fileDataSet = PARSE_STR(decodeURIComponent(fileDataSetStr));

					preview.empty();

					EACH(fileDataSet, function(fileData, i) {

						fileDataSet[i] = UNPACK_DATA(fileData);

						preview.append(IMG({
							src : UploadSample.RF(fileData.id)
						}));
					});

					console.log(fileDataSet);
				}
			});
		});
	}
});
