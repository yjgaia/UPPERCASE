TEST('HREF', function(check) {
	'use strict';
	
	if (history.pushState !== undefined) {
		
		// get test href.
		check(HREF('Test') === '/Test');
		
	} else {
		
		// get test href.
		check(HREF('Test') === '#!/Test');
	}
});
