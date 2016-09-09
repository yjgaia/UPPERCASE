OVERRIDE(TEXTAREA, function(origin) {
	'use strict';

	/**
	 * Textarea class (fix for iOS)
	 */
	global.TEXTAREA = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self) {

			inner.setAttr({
				name : 'autocapitalize',
				value : 'none'
			});
			
			inner.setAttr({
				name : 'autocorrect',
				value : 'off'
			});
		}
	});
});
