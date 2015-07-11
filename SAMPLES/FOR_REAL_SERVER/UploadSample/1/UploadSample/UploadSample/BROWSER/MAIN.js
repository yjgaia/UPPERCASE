UploadSample.MAIN = METHOD({

	run : function() {
		'use strict';

		var
		// iframe
		iframe = IFRAME({
			style : {
				display : 'none'
			},
			name : '__UPLOAD_FORM'
		}).appendTo(BODY);

		GET('__UPLOAD_SERVER_HOST?defaultHost=' + global.location.hostname, function(host) {

			var
			// callback url
			callbackURL = global.location.protocol + '//' + global.location.host + '/__CORS_CALLBACK',

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
				}), INPUT({
					type : 'submit'
				})]
			}));

			EVENT({
				node : input,
				name : 'change'
			}, function(e) {
				if (input.getValue() !== '') {
					if (form !== undefined) {
						form.submit(true);
					}
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

					input.setValue('');

				} else if (fileDataSetStr !== undefined) {

					fileDataSet = PARSE_STR(decodeURIComponent(fileDataSetStr));

					EACH(fileDataSet, function(fileData, i) {
						fileDataSet[i] = UNPACK_DATA(fileData);
					});

					console.log(fileDataSet);

					input.setValue('');
				}
			});
		});
	}
});
