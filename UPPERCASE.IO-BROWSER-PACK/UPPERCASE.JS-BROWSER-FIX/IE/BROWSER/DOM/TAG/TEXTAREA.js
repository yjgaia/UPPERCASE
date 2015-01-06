OVERRIDE(TEXTAREA, function(origin) {
	'use strict';

	/**
	 * Textarea class (fix for IE 5.5)
	 */
	global.TEXTAREA = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self) {

			var
			// set value.
			setValue;

			self.setValue = setValue = function(value) {
				//REQUIRED: value

				self.empty();
				self.append(value);
			};
		}
	});
});
