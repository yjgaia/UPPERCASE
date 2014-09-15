FOR_BOX(function(box) {
	'use strict';

	/**
	 * ajax POST request.
	 */
	box.POST = METHOD({

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: uriOrParams
			//OPTIONAL: uriOrParams.host
			//OPTIONAL: uriOrParams.port
			//OPTIONAL: uriOrParams.isSecure
			//REQUIRED: uriOrParams.uri
			//OPTIONAL: uriOrParams.paramStr
			//OPTIONAL: uriOrParams.data
			//OPTIONAL: uriOrParams.isNotUsingLoadingBar
			//REQUIRED: responseListenerOrListeners

			box.REQUEST(COMBINE([params, {
				method : 'POST'
			}]), responseListenerOrListeners);
		}
	});
});
