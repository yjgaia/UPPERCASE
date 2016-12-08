TEST('IMAGEMAGICK_READ_METADATA', function(check) {
	'use strict';

	IMAGEMAGICK_READ_METADATA('UPPERCASE-CORE/sample.png', function(metadata) {
		console.log(metadata);
	});

	IMAGEMAGICK_READ_METADATA('UPPERCASE-CORE/sample.png', {
		error : function() {
			console.log('ERROR!');
		},
		success : function(metadata) {
			console.log(metadata);
		}
	});
});
