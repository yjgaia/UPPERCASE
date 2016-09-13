OVERRIDE(REFRESH, function(origin) {
	'use strict';

	/**
	 * refresh view. (fix for IE)
	 */
	global.REFRESH = METHOD(function(m) {
		
		var
		// get refreshing uri.
		getRefreshingURI;
		
		m.getRefreshingURI = getRefreshingURI = function() {
			return origin.getRefreshingURI();
		};
		
		return {
	
			run : function(uri) {
				//OPTIONAL: uri

				var
				// saved hash
				savedHash = uri !== undefined ? '#!/' + uri : location.hash;
	
				EVENT_ONCE({
					name : 'hashchange'
				}, function() {
					DELAY(function() {
						location.replace(savedHash === '' ? '#!/' : savedHash);
					});
				});
	
				location.href = '#!/' + getRefreshingURI();
			}
		};
	});
});
