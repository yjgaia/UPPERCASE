// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE-UTIL.
require('../../../../UPPERCASE-UTIL/NODE.js');

TEST('IMAGEMAGICK_READ_METADATA', function(ok) {
	'use strict';

	IMAGEMAGICK_READ_METADATA('sample.png', function(metadata) {
		console.log(metadata);
	});

	IMAGEMAGICK_READ_METADATA('sample.png', {
		error : function() {
			console.log('ERROR!');
		},
		success : function(metadata) {
			console.log(metadata);
		}
	});
});
