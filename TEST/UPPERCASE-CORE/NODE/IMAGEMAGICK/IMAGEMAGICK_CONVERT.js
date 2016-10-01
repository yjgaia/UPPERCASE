TEST('IMAGEMAGICK_CONVERT', function(ok) {
	'use strict';

	IMAGEMAGICK_CONVERT(['NODE/IMAGEMAGICK/sample.png', '-resize', '100x100\!', 'NODE/IMAGEMAGICK/sample-square.png']);

	IMAGEMAGICK_CONVERT(['NODE/IMAGEMAGICK/sample.png', '-resize', '200x200\!', 'NODE/IMAGEMAGICK/sample-square.png'], function() {
		console.log('DONE.');
	});

	IMAGEMAGICK_CONVERT(['NODE/IMAGEMAGICK/sample.png', '-resize', '300x300\!', 'NODE/IMAGEMAGICK/sample-square.png'], {
		error : function() {
			console.log('ERROR!');
		},
		success : function() {
			console.log('DONE.');
		}
	});
});
