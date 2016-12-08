TEST('IMAGEMAGICK_IDENTIFY', function(check) {
	'use strict';

	IMAGEMAGICK_IDENTIFY('UPPERCASE-CORE/sample.png', function(features) {
		console.log(features);
	});

	IMAGEMAGICK_IDENTIFY('UPPERCASE-CORE/sample.png', {
		error : function() {
			console.log('ERROR!');
		},
		success : function(features) {
			console.log(features);
		}
	});
});
