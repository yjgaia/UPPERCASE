TEST('IMAGEMAGICK_RESIZE', function(ok) {
	'use strict';

	IMAGEMAGICK_RESIZE({
		srcPath : 'NODE/IMAGEMAGICK/sample.png',
		distPath : 'NODE/IMAGEMAGICK/sample-width-100.png',
		width : 100
	});

	IMAGEMAGICK_RESIZE({
		srcPath : 'NODE/IMAGEMAGICK/sample.png',
		distPath : 'NODE/IMAGEMAGICK/sample-height-100.png',
		height : 100
	}, function() {
		console.log('DONE.');
	});

	IMAGEMAGICK_RESIZE({
		srcPath : 'NODE/IMAGEMAGICK/sample.png',
		distPath : 'NODE/IMAGEMAGICK/sample-square.png',
		width : 100,
		height : 100
	}, {
		error : function() {
			console.log('ERROR!');
		},
		success : function() {
			console.log('DONE.');
		}
	});
});
