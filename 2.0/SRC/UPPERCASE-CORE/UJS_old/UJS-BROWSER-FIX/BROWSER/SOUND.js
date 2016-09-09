OVERRIDE(SOUND, function(origin) {
	'use strict';

	/**
	 * SOUND class (destroy)
	 */
	global.SOUND = CLASS({

		init : function(inner, self) {
			// destroy.

			var
			// play.
			play,

			// stop.
			stop;

			self.play = play = function() {
				return self;
			};

			self.stop = stop = function() {
				// ignore.
			};
		}
	});
});
