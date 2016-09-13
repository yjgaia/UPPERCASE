// load UJS.
require('../../../../UJS-NODE.js');

// load UPPERCASE-UTIL.
require('../../../../UPPERCASE-UTIL/NODE.js');

TEST('IMAGEMAGICK_RESIZE', function(ok) {
	'use strict';

	IMAGEMAGICK_RESIZE({
		srcPath : 'sample.png',
		distPath : 'sample-width-100.png',
		width : 100
	});

	IMAGEMAGICK_RESIZE({
		srcPath : 'sample.png',
		distPath : 'sample-height-100.png',
		height : 100
	}, function() {
		console.log('DONE.');
	});

	IMAGEMAGICK_RESIZE({
		srcPath : 'sample.png',
		distPath : 'sample-square.png',
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
