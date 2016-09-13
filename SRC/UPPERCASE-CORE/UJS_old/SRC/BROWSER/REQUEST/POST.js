/**
 * AJAX POST request.
 */
global.POST = METHOD({

	run : function(uriOrParams, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: uriOrParams
		//OPTIONAL: uriOrParams.host
		//OPTIONAL: uriOrParams.port
		//OPTIONAL: uriOrParams.isSecure
		//REQUIRED: uriOrParams.uri
		//OPTIONAL: uriOrParams.paramStr
		//OPTIONAL: uriOrParams.data
		//OPTIONAL: uriOrParams.headers
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE([CHECK_IS_DATA(uriOrParams) === true ? uriOrParams : {
			uri : uriOrParams
		}, {
			method : 'POST'
		}]), responseListenerOrListeners);
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.POST = METHOD({

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: uriOrParams
			//OPTIONAL: uriOrParams.host
			//OPTIONAL: uriOrParams.port
			//OPTIONAL: uriOrParams.isSecure
			//REQUIRED: uriOrParams.uri
			//OPTIONAL: uriOrParams.paramStr
			//OPTIONAL: uriOrParams.data
			//OPTIONAL: uriOrParams.headers
			//REQUIRED: responseListenerOrListeners

			box.REQUEST(COMBINE([params, {
				method : 'POST'
			}]), responseListenerOrListeners);
		}
	});
});
