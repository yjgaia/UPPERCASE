/**
 * refresh view.
 */
global.REFRESH = METHOD(function(m) {
	'use strict';
	
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
			// saved uri
			savedURI = uri !== undefined ? uri : location.pathname.substring(1);
	
			history.pushState(undefined, undefined, '/' + refreshingURI);
			MATCH_VIEW.checkAll();
			
			history.replaceState(undefined, undefined, '/' + savedURI);
			MATCH_VIEW.checkAll();
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	box.REFRESH = METHOD({

		run : function(uri) {
			//OPTIONAL: uri
			
			REFRESH((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});
