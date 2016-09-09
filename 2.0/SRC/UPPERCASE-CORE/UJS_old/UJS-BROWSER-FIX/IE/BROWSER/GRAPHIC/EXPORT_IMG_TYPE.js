OVERRIDE(EXPORT_IMG_TYPE, function(origin) {
	'use strict';

	/**
	 * export img type. (fix for IE)
	 */
	global.EXPORT_IMG_TYPE = METHOD({

		run : function(img, callback) {
			//REQUIRED: img
			//REQUIRED: callback

			var
			// image
			image = new Image();

			image.onload = function() {
				callback(image.mimeType.toLowerCase().split(' ')[0]);
			};

			image.src = img.getSrc();
		}
	});
});

