OVERRIDE(INPUT, function(origin) {
	'use strict';

	/**
	 * Input class (fix for iOS)
	 */
	global.INPUT = CLASS({

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
