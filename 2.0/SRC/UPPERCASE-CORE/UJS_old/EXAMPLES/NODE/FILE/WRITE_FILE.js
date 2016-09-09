// load UJS
require('../../../UJS-NODE.js');

TEST('WRITE_FILE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	WRITE_FILE({
		path : 'test.txt',
		content : 'this is test file.',
		isSync : true
	}, {
		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		}
	});

	ok(READ_FILE({
		path : 'test.txt',
		isSync : true
	}).toString() === 'this is test file.');

	WRITE_FILE({
		path : 'testFolder/subFolder1/subFolder1/test1',
		content : 'test!!!',
		isSync : true
	}, {
		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		}
	});

	ok(READ_FILE({
		path : 'testFolder/subFolder1/subFolder1/test1',
		isSync : true
	}).toString() === 'test!!!');

	WRITE_FILE({
		path : 'testFolder/subFolder2/subFolder2/test2',
		content : 'test!!!'
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			READ_FILE('testFolder/subFolder2/subFolder2/test2', function(buffer) {
				ok(buffer.toString() === 'test!!!');
			});
		}
	});
});
