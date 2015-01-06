OVERRIDE(FORM, function(origin) {
	'use strict';

	/**
	 * Form class. (fix for IE)
	 */
	global.FORM = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {
			//OPTIONAL: params
			//OPTIONAL: params.action
			//OPTIONAL: params.target
			//OPTIONAL: params.method
			//OPTIONAL: params.enctype

			var
			// action
			action,

			// target
			target,

			// method
			method,

			// enctype
			enctype,

			// get data.
			getData;

			// init params.
			if (params !== undefined) {
				action = params.action;
				target = params.target;
				method = params.method;
				enctype = params.enctype;
			}

			inner.setEl(document.createElement('<form action="' + action + '" target="' + target + '" method="' + method + '" enctype="' + enctype + '" />'));
		}
	});
});
