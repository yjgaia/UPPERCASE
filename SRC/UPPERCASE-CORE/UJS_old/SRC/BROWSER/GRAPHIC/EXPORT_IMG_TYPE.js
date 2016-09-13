/**
 * export img type.
 */
global.EXPORT_IMG_TYPE = METHOD(function(m) {
	'use strict';

	var
	// loaded img types
	loadedImgTypes = {},

	// loading callback map
	loadingCallbackMap = {};

	return {

		run : function(img, callback) {
			//REQUIRED: img
			//REQUIRED: callback

			var
			// uri
			uri = img.getSrc(),

			// loaded img type
			loadedImgType = loadedImgTypes[uri],

			// loading callbacks
			loadingCallbacks = loadingCallbackMap[uri],

			// load event
			loadEvent;

			// if aleady loaded.
			if (loadedImgType !== undefined) {
				callback(loadedImgType);
			}

			// is processed uri.
			else if (loadingCallbacks !== undefined) {
				loadingCallbacks.push(callback);
			}

			// load img type.
			else {

				loadingCallbacks = loadingCallbackMap[uri] = [callback];

				new ImageInfo(uri, function(imageInfo) {

					var
					// img type
					imgType = imageInfo.getAllFields(uri).format.toLowerCase();

					// cache.
					loadedImgTypes[uri] = imgType;

					// run callbacks.
					EACH(loadingCallbacks, function(callback) {
						callback(imgType);
					});

					// clear loading callbacks.
					delete loadingCallbackMap[uri];
					
				}).readFileData();
			}
		}
	};
});
