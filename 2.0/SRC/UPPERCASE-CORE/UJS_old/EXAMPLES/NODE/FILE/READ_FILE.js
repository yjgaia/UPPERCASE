// load UJS
require('../../../UJS-NODE.js');

TEST('READ_FILE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	var buffer = READ_FILE({
		path : 'test.txt',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function(buffer) {
			ok(buffer.toString() === 'this is test file.');
		}
	});

	ok(buffer.toString() === 'this is test file.');

	READ_FILE('test.txt', {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function(buffer) {
			ok(buffer.toString() === 'this is test file.');
		}
	});
});
