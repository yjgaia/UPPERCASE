OVERRIDE(INFO, function(origin) {
	'use strict';

	/**
	 * Browser information object (fix for iOS)
	 */
	global.INFO = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self) {

			var
			// check is exists tap delay.
			checkIsExistsTapDelay;
			
			// iOS exists tap delay.
			self.checkIsExistsTapDelay = checkIsExistsTapDelay = function() {
				return true;
			};
		}
	});
});
