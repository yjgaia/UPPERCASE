FOR_BOX(function(box) {'use strict';

	/**
	 * ajax POST request.
	 */
	box.POST = METHOD({

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: params
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//OPTIONAL: params.isSecure
			//REQUIRED: params.uri
			//OPTIONAL: params.paramStr
			//OPTIONAL: params.data
			//REQUIRED: responseListenerOrListeners

			box.REQUEST(COMBINE_DATA({
				origin : params,
				extend : {
					method : 'POST'
				}
			}), responseListenerOrListeners);
		}
	});
});
