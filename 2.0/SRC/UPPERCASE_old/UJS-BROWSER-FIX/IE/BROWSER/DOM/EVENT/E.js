OVERRIDE(E, function(origin) {
	'use strict';

	/**
	 * Dom event object wrapper class (fix for IE)
	 */
	global.E = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {
			//REQUIRED: params
			//REQUIRED: params.e
			//REQUIRED: params.el

			var
			// e
			e = params.e,

			// el
			el = params.el,

			// stop default.
			stopDefault,

			// stop bubbling.
			stopBubbling,

			// stop.
			stop,

			// get left.
			getLeft,

			// get top.
			getTop;

			if (e === undefined) {
				e = event;
			}

			if (e.preventDefault === undefined) {

				//OVERRIDE: self.stopDefault
				self.stopDefault = stopDefault = function() {
					e.returnValue = false;
				};

			} else {
				stopDefault = self.stopDefault;
			}

			// when ms pointer enabled
			if (navigator.msPointerEnabled === true) {

				//OVERRIDE: self.stopDefault
				self.stopDefault = function() {

					// remove ms touch action style.
					e.target.style['-ms-touch-action'] = 'none';
					stopDefault();
				};
			}

			if (e.stopPropagation === undefined) {

				//OVERRIDE: self.stopDefault
				self.stopBubbling = stopBubbling = function() {
					e.cancelBubble = true;
				};

			} else {
				stopBubbling = self.stopBubbling;
			}

			self.stop = stop = function() {
				stopDefault();
				stopBubbling();
			};

			if (e.pageX === undefined) {

				//OVERRIDE: self.getLeft
				self.getLeft = getLeft = function() {

					var
					// event document
					eventDocument;

					if (e.target === undefined || e.target === TO_DELETE) {
						e.target = e.srcElement || document;
					}

					if (e.target.nodeType === 3) {
						e.target = e.target.parentNode;
					}

					eventDocument = e.target.ownerDocument || document, doc = eventDocument.documentElement, body = eventDocument.body;

					return e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
				};
			}

			if (e.pageY === undefined) {

				//OVERRIDE: self.getTop
				self.getTop = getTop = function() {

					var
					// event document
					eventDocument;

					if (e.target === undefined || e.target === TO_DELETE) {
						e.target = e.srcElement || document;
					}

					if (e.target.nodeType === 3) {
						e.target = e.target.parentNode;
					}

					eventDocument = e.target.ownerDocument || document, doc = eventDocument.documentElement, body = eventDocument.body;

					return e.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
				};
			}
		}
	});
});
