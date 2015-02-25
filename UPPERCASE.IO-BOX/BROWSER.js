FOR_BOX(function(box) {
	'use strict';

	/**
	 * go another view.
	 */
	box.GO = METHOD({

		run : function(uri) {
			//REQUIRED: uri

			GO((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});

FOR_BOX(function(box) {
	'use strict';

	/**
	 * go another view on new window.
	 */
	box.GO_NEW_WIN = METHOD({

		run : function(uri) {
			//REQUIRED: uri

			GO_NEW_WIN((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});

FOR_BOX(function(box) {
	'use strict';

	/**
	 * get href.
	 */
	box.HREF = METHOD({

		run : function(uri) {
			//OPTIONAL: uri

			return HREF((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});

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

FOR_BOX(function(box) {
	'use strict';

	/**
	 * refresh view.
	 */
	box.REFRESH = METHOD({

		run : function(uri) {
			//OPTIONAL: uri
			
			REFRESH((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});
