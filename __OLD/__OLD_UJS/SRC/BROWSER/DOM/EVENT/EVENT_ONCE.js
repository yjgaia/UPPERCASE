/**
 * Event once class
 */
global.EVENT_ONCE = CLASS({

	init : function(inner, self, nameOrParams, eventHandler) {
		'use strict';
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node
		//OPTIONAL: nameOrParams.lowNode
		//REQUIRED: nameOrParams.name
		//REQUIRED: eventHandler

		var
		// evt
		evt = EVENT(nameOrParams, function(e, node) {
			eventHandler(e, node);
			evt.remove();
		}),

		// remove.
		remove,

		// fire.
		fire;

		self.remove = remove = function() {
			evt.remove();
		};

		self.fire = fire = function() {
			evt.fire();
		};
	}
});
