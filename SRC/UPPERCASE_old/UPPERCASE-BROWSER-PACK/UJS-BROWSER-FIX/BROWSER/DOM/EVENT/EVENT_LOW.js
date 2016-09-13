OVERRIDE(EVENT_LOW, function(origin) {
	'use strict';

	/**
	 * Low event class (fix)
	 */
	global.EVENT_LOW = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self, nameOrParams, eventHandler) {
			//REQUIRED: nameOrParams
			//OPTIONAL: nameOrParams.node
			//OPTIONAL: nameOrParams.lowNode
			//REQUIRED: nameOrParams.name
			//REQUIRED: eventHandler

			var
			// name
			name,

			// hash
			hash,

			// hashchange interval
			hashchangeInterval,

			// remove.
			remove;

			// init params.
			if (CHECK_IS_DATA(nameOrParams) !== true) {
				name = nameOrParams;
			} else {
				name = nameOrParams.name;
			}

			// fix hashchange.
			if (name === 'hashchange' && global.onhashchange === undefined) {

				hash = location.hash;
				hashchangeInterval = setInterval(function() {
					if (location.hash !== hash) {
						hash = location.hash;
						eventHandler(EMPTY_E());
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
