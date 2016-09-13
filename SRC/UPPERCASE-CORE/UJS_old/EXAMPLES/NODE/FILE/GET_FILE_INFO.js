// load UJS
require('../../../UJS-NODE.js');

TEST('GET_FILE_INFO', function(ok) {
	'use strict';

	INIT_OBJECTS();

	var info = GET_FILE_INFO({
		path : 'test.txt',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function(info) {
			ok(info.size === 18);
		}
	});

	ok(info.size === 18);

	GET_FILE_INFO('test.txt', {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function(info) {
			ok(info.size === 18);
		}
	});
});
