OVERRIDE(REFRESH, function(origin) {
	'use strict';

	/**
	 * refresh view. (fix)
	 */
	global.REFRESH = METHOD(function(m) {
	
		var
		// refreshing uri
		refreshingURI = '__REFRESHING',
		
		// get refreshing uri.
		getRefreshingURI;
		
		m.getRefreshingURI = getRefreshingURI = function() {
			return refreshingURI;
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
					location.href = savedHash === '' ? '#!/' : savedHash;
				});
		
				location.href = '#!/' + refreshingURI;
			}
		};
	});
});
