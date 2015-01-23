FOR_BOX(function(box) {
	'use strict';

	/**
	 * Browser store class
	 */
	box.STORE = CLASS({

		init : function(inner, self, storeName) {
			//REQUIRED: storeName

			var
			// store
			store = STORE(box.boxName + '.' + storeName),

			// save.
			save,

			// get.
			get,

			// remove.
			remove;

			self.save = save = store.save;

			self.get = get = store.get;

			self.remove = remove = store.remove;
		}
	});
});

FOR_BOX(function(box) {
	'use strict';

	/**
	 * ajax DELETE request.
	 */
	box.DELETE = METHOD({

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
				method : 'DELETE'
			}]), responseListenerOrListeners);
		}
	});
});

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
			//REQUIRED: responseListenerOrListeners

			box.REQUEST(COMBINE([params, {
				method : 'POST'
			}]), responseListenerOrListeners);
		}
	});
});

FOR_BOX(function(box) {
	'use strict';

	/**
	 * ajax PUT request.
	 */
	box.PUT = METHOD({

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
				method : 'PUT'
			}]), responseListenerOrListeners);
		}
	});
});

FOR_BOX(function(box) {
	'use strict';

	/**
	 * ajax request.
	 */
	box.REQUEST = METHOD({

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: params
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//OPTIONAL: params.isSecure
			//REQUIRED: params.method
			//REQUIRED: params.uri
			//OPTIONAL: params.paramStr
			//OPTIONAL: params.data
			//REQUIRED: responseListenerOrListeners

			REQUEST(COMBINE([params, {
				uri : box.boxName + '/' + params.uri
			}]), responseListenerOrListeners);
		}
	});
});
