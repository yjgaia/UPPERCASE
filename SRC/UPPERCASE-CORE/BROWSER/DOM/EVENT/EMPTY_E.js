/**
 * 빈 이벤트 정보를 제공하는 객체를 생성하는 EMPTY_E 클래스
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

		// get key.
		getKey,
		
		// get detail.
		getWheelDelta;

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

		self.getKey = function() {
			return '';
		};
		
		self.getWheelDelta = getWheelDelta = function() {
			return 0;
		};
	}
});
