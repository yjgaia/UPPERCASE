TEST('IMAGEMAGICK_IDENTIFY', function(ok) {
	'use strict';

	IMAGEMAGICK_IDENTIFY('NODE/IMAGEMAGICK/sample.png', function(features) {
		console.log(features);
	});

	IMAGEMAGICK_IDENTIFY('NODE/IMAGEMAGICK/sample.png', {
		error : function() {
			console.log('ERROR!');
		},
		success : function(features) {
			console.log(features);
		}
	});
});
