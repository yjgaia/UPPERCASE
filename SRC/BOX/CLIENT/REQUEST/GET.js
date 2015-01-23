FOR_BOX(function(box) {
	'use strict';

	/**
	 * ajax GET request.
	 */
	box.GET = METHOD({

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: uriOrParams
			//OPTIONAL: uriOrParams.host
			//OPTIONAL: uriOrParams.port
			//OPTIONAL: uriOrParams.isSecure
			//REQUIRED: uriOrParams.uri
			//OPTIONAL: uriOrParams.paramStr
			//OPTIONAL: uriOrParams.data
			//REQUIRED: responseListenerOrListeners

			box.REQUEST(COMBINE([params, {
				method : 'GET'
			}]), responseListenerOrListeners);
		}
	});
});
