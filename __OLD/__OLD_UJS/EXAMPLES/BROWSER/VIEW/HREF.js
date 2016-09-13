TEST('HREF', function(ok) {
	'use strict';
	
	if (history.pushState !== undefined) {
		
		// get test href.
		ok(HREF('Test') === '/Test');
		
	} else {
		
		// get test href.
		ok(HREF('Test') === '#!/Test');
	}
});
