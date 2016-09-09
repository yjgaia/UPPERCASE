OVERRIDE(EVENT_LOW, function(origin) {
	'use strict';

	/**
	 * Low event class (fix for IE)
	 */
	global.EVENT_LOW = CLASS({

		preset : function(nameOrParams) {
			//REQUIRED: nameOrParams
			//OPTIONAL: nameOrParams.node
			//OPTIONAL: nameOrParams.lowNode
			//REQUIRED: nameOrParams.name

			var
			// node
			node,

			// low node
			lowNode,

			// name
			name,

			// el
			el;

			// init params.
			if (CHECK_IS_DATA(nameOrParams) !== true) {
				name = nameOrParams;
			} else {
				node = nameOrParams.node;
				lowNode = nameOrParams.lowNode;
				name = nameOrParams.name;

				if (lowNode === undefined) {
					lowNode = node;
				}
			}

			if (lowNode !== undefined) {
				el = lowNode.getWrapperEl();
			} else if (global['on' + name] === undefined) {
				el = document;
			} else {
				el = global;
			}

			// if is not exists addEventListener, link to attachEvent.
			if (el.addEventListener === undefined) {
				el.addEventListener = function(name, eventHandler, b) {
					el.attachEvent('on' + name, eventHandler);
				};
			}
			
			// if is not exists removeEventListener, link detachEvent.
			if (el.removeEventListener === undefined) {
				el.removeEventListener = function(name, eventHandler, b) {
					el.detachEvent('on' + name, eventHandler);
				};
			}

			return origin;
		},

		init : function(inner, self, nameOrParams, eventHandler) {
			//REQUIRED: nameOrParams
			//OPTIONAL: nameOrParams.node
			//OPTIONAL: nameOrParams.lowNode
			//REQUIRED: nameOrParams.name
			//REQUIRED: eventHandler

			var
			// node
			node,

			// low node
			lowNode,

			// name
			name,

			// el
			el,

			// hash
			hash,

			// hashchange interval
			hashchangeInterval,

			// inner handler.
			innerHandler = inner.innerHandler,

			// remove.
			remove;

			// init params.
			if (CHECK_IS_DATA(nameOrParams) !== true) {
				name = nameOrParams;
			} else {
				node = nameOrParams.node;
				lowNode = nameOrParams.lowNode;
				name = nameOrParams.name;

				if (lowNode === undefined) {
					lowNode = node;
				}
			}

			if (lowNode !== undefined) {
				el = lowNode.getWrapperEl();
			} else if (global['on' + name] === undefined) {
				el = document;
			} else {
				el = global;
			}

			// if image is cached image, not fire load event. (IE <= 8 bug)
			if (IE.version <= 8 && name === 'load' && el.complete !== undefined) {

				RUN(function() {

					var
					// interval
					interval;

					interval = setInterval(RAR(function() {
						if (el.complete === true) {

							clearInterval(interval);

							try {
								innerHandler();
							} catch(e) {
								// ignore.
							}
						}
					}), 100);
				});
			}

			// when ms pointer enabled
			if (navigator.msPointerEnabled === true) {

				// touchstart link to MSPointerDown
				if (name === 'touchstart') {

					el.addEventListener('MSPointerDown', innerHandler);

					OVERRIDE(self.remove, function(origin) {

						self.remove = remove = function() {
							origin();
							el.removeEventListener('MSPointerDown', innerHandler);
						};
					});
				}

				// touchmove link to MSPointerMove
				else if (name === 'touchmove') {

					el.addEventListener('MSPointerMove', innerHandler);

					OVERRIDE(self.remove, function(origin) {

						self.remove = remove = function() {
							origin();
							el.removeEventListener('MSPointerMove', innerHandler);
						};
					});
				}

				// touchend link to MSPointerUp
				else if (name === 'touchend') {

					el.addEventListener('MSPointerUp', innerHandler);

					OVERRIDE(self.remove, function(origin) {

						self.remove = remove = function() {
							origin();
							el.removeEventListener('MSPointerUp', innerHandler);
						};
					});
				}
			}

			// simulate hashchange event. (IE <= 7)
			if (name === 'hashchange' && IE.version <= 7) {

				hash = location.hash;
				hashchangeInterval = setInterval(function() {
					if (location.hash !== hash) {
						hash = location.hash;
						eventHandler();
					}
				}, 100);

				OVERRIDE(self.remove, function(origin) {

					self.remove = remove = function() {
						origin();
						clearInterval(hashchangeInterval);
					};
				});
			}
		}
	});
});
