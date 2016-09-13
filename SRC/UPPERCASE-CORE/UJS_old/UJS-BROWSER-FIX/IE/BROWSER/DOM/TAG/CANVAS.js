OVERRIDE(CANVAS, function(origin) {
	'use strict';

	/**
	 * Canvas class (fix for IE)
	 */
	global.CANVAS = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self) {

			// init flash canvas.
			FlashCanvas.initElement(self.getEl());
		}
	});
});
