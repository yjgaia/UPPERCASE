// load UJS.
require('../../../../UJS-NODE.js');

// load UPPERCASE-UTIL.
require('../../../../UPPERCASE-UTIL/NODE.js');

TEST('IMAGEMAGICK_IDENTIFY', function(ok) {
	'use strict';

	IMAGEMAGICK_IDENTIFY('sample.png', function(metadata) {
		console.log(metadata);
	});

	IMAGEMAGICK_IDENTIFY('sample.png', {
		error : function() {
			console.log('ERROR!');
		},
		success : function(metadata) {
			console.log(metadata);
		}
	});
});
