OVERRIDE(STORE, function(origin) {
	'use strict';

	/**
	 * Browser Store class (fix)
	 */
	global.STORE = COOKIE_STORE;
});
