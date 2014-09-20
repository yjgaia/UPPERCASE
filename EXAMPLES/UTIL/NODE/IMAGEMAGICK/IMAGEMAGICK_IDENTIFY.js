// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-UTIL.
require('../../../../UPPERCASE.IO-UTIL/NODE.js');

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
