/**
 * Dom epmty event object class
 */
global.EMPTY_E = CLASS({

	init : function(inner, self) {
		'use strict';

		var
		// stop default.
		stopDefault,

		// stop bubbling.
		stopBubbling,

		// stop default and bubbling.
		stop,

		// get left.
		getLeft,

		// get top.
		getTop,

		// get key code.
		getKeyCode,
		
		// get state.
		getState;

		self.stopDefault = stopDefault = function() {
			// ignore.
		};

		self.stopBubbling = stopBubbling = function() {
			// ignore.
		};

		self.stop = stop = function() {
			// ignore.
		};

		self.getLeft = getLeft = function() {

			// on heaven!
			return -999999;
		};

		self.getTop = getTop = function() {

			// on heaven!
			return -999999;
		};

		self.getKeyCode = getKeyCode = function() {

			// on heaven!
			return -999999;
		};
		
		self.getState = getState = function() {
			// ignore.
		};
	}
});
