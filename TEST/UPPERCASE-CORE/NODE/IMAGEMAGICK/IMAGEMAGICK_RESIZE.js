TEST('IMAGEMAGICK_RESIZE', function(check) {
	'use strict';

	IMAGEMAGICK_RESIZE({
		srcPath : 'UPPERCASE-CORE/sample.png',
		distPath : 'UPPERCASE-CORE/sample-width-100.png',
		width : 100
	});

	IMAGEMAGICK_RESIZE({
		srcPath : 'UPPERCASE-CORE/sample.png',
		distPath : 'UPPERCASE-CORE/sample-height-100.png',
		height : 100
	}, function() {
		console.log('DONE.');
	});

	IMAGEMAGICK_RESIZE({
		srcPath : 'UPPERCASE-CORE/sample.png',
		distPath : 'UPPERCASE-CORE/sample-square.png',
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
