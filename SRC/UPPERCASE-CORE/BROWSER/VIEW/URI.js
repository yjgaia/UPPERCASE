/**
 * 현재 브라우저의 URI를 가져옵니다.
 */
global.URI = METHOD({

	run : function() {
		'use strict';
		
		return decodeURIComponent(location.pathname.substring(1));
	}
});
