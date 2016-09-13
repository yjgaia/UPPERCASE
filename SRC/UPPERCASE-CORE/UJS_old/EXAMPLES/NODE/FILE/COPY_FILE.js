// load UJS
require('../../../UJS-NODE.js');

TEST('COPY_FILE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	COPY_FILE({
		from : 'test.txt',
		to : 'test2.txt',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		}
	});

	ok(READ_FILE({
		path : 'test2.txt',
		isSync : true
	}).toString() === 'this is test file.');

	COPY_FILE({
		from : 'test.txt',
		to : 'test3.txt'
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function() {
			ok(READ_FILE({
				path : 'test3.txt',
				isSync : true
			}).toString() === 'this is test file.');
		}
	});
});
