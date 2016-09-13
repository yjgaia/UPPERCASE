// load UJS
require('../../../UJS-NODE.js');

TEST('REMOVE_FILE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	REMOVE_FILE({
		path : 'testFolder/test2.txt',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});

	REMOVE_FILE('testFolder/test3.txt', {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});
});
