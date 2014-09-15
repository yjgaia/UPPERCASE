FOR_BOX(function(box) {
	'use strict';

	/**
	 * match view.
	 */
	box.MATCH_VIEW = METHOD({

		run : function(params) {
			//REQUIRED: params
			//REQUIRED: params.uri
			//REQUIRED: params.target

			var
			// uri
			uri = params.uri,

			// target
			target = params.target,

			// new uris
			newURIs = [],

			// push.
			push = function(uri) {

				if (box.boxName === CONFIG.defaultBoxName) {
					newURIs.push(uri);
				}

				newURIs.push(box.boxName + '/' + uri);
			};

			if (CHECK_IS_ARRAY(uri) === true) {
				EACH(uri, push);
			} else {
				push(uri);
			}

			MATCH_VIEW({
				uri : newURIs,
				target : target
			});
		}
	});
});
