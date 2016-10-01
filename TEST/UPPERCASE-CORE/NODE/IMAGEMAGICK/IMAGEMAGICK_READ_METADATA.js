TEST('IMAGEMAGICK_READ_METADATA', function(ok) {
	'use strict';

	IMAGEMAGICK_READ_METADATA('NODE/IMAGEMAGICK/sample.png', function(metadata) {
		console.log(metadata);
	});

	IMAGEMAGICK_READ_METADATA('NODE/IMAGEMAGICK/sample.png', {
		error : function() {
			console.log('ERROR!');
		},
		success : function(metadata) {
			console.log(metadata);
		}
	});
});
