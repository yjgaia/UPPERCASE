OVERRIDE(EXPORT_IMG_DATA, function(origin) {
	'use strict';

	/**
	 * export img data. (fix for IE)
	 */
	global.EXPORT_IMG_DATA = METHOD(function(m) {

		var
		// temp wrapper
		tempWrapper,

		// exported img data set.
		exportedImgDataSet = {};

		// exporting callback map
		exportingCallbackMap = {};

		return {

			run : function(img, callback) {
				//REQUIRED: img
				//REQUIRED: callback

				var
				// uri
				uri = img.getSrc(),

				// exported img data
				exportedImgData = exportedImgDataSet[uri],

				// exporting callbacks
				exportingCallbacks = exportingCallbackMap[uri],

				// img
				img;

				if (tempWrapper === undefined) {
					tempWrapper = DIV({
						style : {
							position : 'absolute',
							left : -999999,
							top : -999999
						}
					}).appendTo(BODY);
				}

				// if aleady exported.
				if (exportedImgData !== undefined) {
					callback(exportedImgData);
				}

				// is processed uri.
				else if (exportingCallbacks !== undefined) {
					exportingCallbacks.push(callback);
				}

				// export img data.
				else {

					exportingCallbacks = exportingCallbackMap[uri] = [callback];

					EVENT_ONCE({
						node : IMG({
							src : uri
						}),
						name : 'load'
					}, function(e, img) {

						var
						// width
						width = img.getWidth(),

						// height
						height = img.getHeight(),

						// canvas
						canvas = CANVAS({
							width : width,
							height : height
						}).appendTo(tempWrapper),

						// context
						context,

						// img data
						imgData;

						context = canvas.getContext();

						// draw img.
						context.drawImg({
							img : img
						});

						// wait draw img.
						DELAY(0.5, function() {

							if (BROWSER_CONFIG.isUsingFlashCanvasPro !== true) {
								console.log('[UPPERCASE.JS-EXPORT_IMG_DATA] ERROR: You can use this method if you use FlashCanvas Pro.');
							} else {

								// get img data.
								imgData = context.getImgData();

								// cache.
								exportedImgDataSet[uri] = imgData;

								// run callbacks.
								EACH(exportingCallbacks, function(callback) {
									callback(imgData);
								});

								// clear cache for memory.
								delete exportingCallbackMap[uri];
							}
						});
					});
				}
			}
		};
	});
});

