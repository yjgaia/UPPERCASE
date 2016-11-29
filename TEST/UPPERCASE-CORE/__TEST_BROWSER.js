RUN(function() {
	'use strict';
	
	var
	// require.
	require = function(path) {
		var script = document.createElement('script');
		script.src = 'UPPERCASE-CORE/' + path;
		document.body.appendChild(script);
	};
	
	require('./COMMON/TO_DELETE.js');
});