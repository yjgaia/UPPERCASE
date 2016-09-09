/**
 * Low event class
 */
global.EVENT_LOW = CLASS({

	init : function(inner, self, nameOrParams, eventHandler) {
		'use strict';
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

		// inner handler.
		innerHandler,

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

		inner.innerHandler = innerHandler = function(e) {
			//REQUIRED: e
			
			var
			// result
			result = eventHandler(E({
				e : e,
				el : el
			}), node);
			
			if (name === 'beforeunload' && result !== undefined) {
				e.returnValue = result;
			}

			return result;
		};

		el.addEventListener(name, innerHandler, false);

		self.remove = remove = function() {
			el.removeEventListener(name, innerHandler, false);
		};
	}
});
