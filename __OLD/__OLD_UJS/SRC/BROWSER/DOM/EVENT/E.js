/**
 * Dom event object wrapper class
 */
global.E = CLASS({

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.e
		//REQUIRED: params.el

		var
		// e
		e = params.e,

		// el
		el = params.el,

		// check is descendant.
		checkIsDescendant,

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

		// get key name.
		getKeyName,
		
		// get state.
		getState,
		
		// get detail.
		getDetail,
		
		// get wheel delta
		getWheelDelta;

		checkIsDescendant = function(parent, child) {

			var
			// node
			node = child.parentNode;

			while (node !== TO_DELETE) {

				if (node === parent) {
					return true;
				}

				node = node.parentNode;
			}

			return false;
		};

		self.stopDefault = stopDefault = function() {
			e.preventDefault();
		};

		self.stopBubbling = stopBubbling = function() {
			e.stopPropagation();
		};

		self.stop = stop = function() {
			stopDefault();
			stopBubbling();
		};

		self.getLeft = getLeft = function() {

			var
			// touch page x
			touchPageX;

			// if is touch mode
			if (INFO.checkIsTouchMode() === true) {

				if (e.touches !== undefined && e.touches[0] !== undefined) {

					// first touch position.

					EACH(e.touches, function(touch) {
						if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
							touchPageX = touch.pageX;
							return false;
						}
					});

					if (touchPageX === undefined) {
						touchPageX = e.touches[0].pageX;
					}

					if (touchPageX !== undefined) {
						return touchPageX;
					}
				}

				if (e.changedTouches !== undefined && e.changedTouches[0] !== undefined) {

					// first touch position.

					EACH(e.changedTouches, function(touch) {
						if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
							touchPageX = touch.pageX;
							return false;
						}
					});

					if (touchPageX === undefined) {
						touchPageX = e.changedTouches[0].pageX;
					}

					if (touchPageX !== undefined) {
						return touchPageX;
					}
				}
			}

			return e.pageX;
		};

		self.getTop = getTop = function() {

			var
			// touch page y
			touchPageY;

			// if is touch mode
			if (INFO.checkIsTouchMode() === true) {

				if (e.touches !== undefined && e.touches[0] !== undefined) {

					// first touch position.

					EACH(e.touches, function(touch) {
						if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
							touchPageY = touch.pageY;
							return false;
						}
					});

					if (touchPageY === undefined) {
						touchPageY = e.touches[0].pageY;
					}

					if (touchPageY !== undefined) {
						return touchPageY;
					}
				}

				if (e.changedTouches !== undefined && e.changedTouches[0] !== undefined) {

					// first touch position.

					EACH(e.changedTouches, function(touch) {
						if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
							touchPageY = touch.pageY;
							return false;
						}
					});

					if (touchPageY === undefined) {
						touchPageY = e.changedTouches[0].pageY;
					}

					if (touchPageY !== undefined) {
						return touchPageY;
					}
				}
			}

			return e.pageY;
		};

		self.getKeyCode = getKeyCode = function() {
			return e.keyCode;
		};

		self.getKeyName = getKeyName = function() {
			return e.keyName;
		};
		
		self.getState = getState = function() {
			return e.state;
		};
		
		self.getDetail = getDetail = function() {
			return e.detail;
		};
		
		self.getWheelDelta = getWheelDelta = function() {
			
			if (document.onmousewheel !== undefined) {
				return e.wheelDelta;
			}
			
			// FireFox
			else {
				return e.detail * -40;
			}
		};
	}
});
