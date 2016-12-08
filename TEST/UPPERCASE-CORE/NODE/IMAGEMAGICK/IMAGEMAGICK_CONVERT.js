TEST('IMAGEMAGICK_CONVERT', function(check) {
	'use strict';

	IMAGEMAGICK_CONVERT(['UPPERCASE-CORE/sample.png', '-resize', '100x100\!', 'UPPERCASE-CORE/sample-square.png']);

	IMAGEMAGICK_CONVERT(['UPPERCASE-CORE/sample.png', '-resize', '200x200\!', 'UPPERCASE-CORE/sample-square.png'], function() {
		console.log('DONE.');
	});

	IMAGEMAGICK_CONVERT(['UPPERCASE-CORE/sample.png', '-resize', '300x300\!', 'UPPERCASE-CORE/sample-square.png'], {
		error : function() {
			console.log('ERROR!');
		},
		success : function() {
			console.log('DONE.');
		}
	});
});
