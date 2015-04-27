FOR_BOX(function(box) {
	'use strict';

	/**
	 * get final resource's real path.
	 */
	box.RF = METHOD({

		run : function(path) {
			//REQUIRED: path
			
			return (BROWSER_CONFIG.isSecure === true ? 'https:' : 'http:') + '//' + BROWSER_CONFIG.host + ':' + BROWSER_CONFIG.port + '/__RF/' + box.boxName + '/' + path;
		}
	});
});
