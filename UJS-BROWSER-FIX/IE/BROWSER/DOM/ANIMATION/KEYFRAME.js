OVERRIDE(KEYFRAMES, function(origin) {
	'use strict';

	/**
	 * Animation keyframes class. (destory for IE)
	 */
	global.KEYFRAMES = CLASS({

		init : function(inner, self, keyframes) {
			//REQUIRED: keyframes

			var
			// name
			name = '__KEYFRAMES_' + self.id,

			// start style
			startStyle,

			// final style
			finalStyle,

			// get name.
			getName,

			// get start style.
			getStartStyle,

			// get final style.
			getFinalStyle;

			EACH(keyframes, function(style, key) {
				if (key === 'from' || key === '0%') {
					startStyle = style;
				} else if (key === 'to' || key === '100%') {
					finalStyle = style;
				}
			});

			self.getName = getName = function() {
				return name;
			};

			self.getStartStyle = getStartStyle = function() {
				return startStyle;
			};

			self.getFinalStyle = getFinalStyle = function() {
				return finalStyle;
			};
		}
	});
});
