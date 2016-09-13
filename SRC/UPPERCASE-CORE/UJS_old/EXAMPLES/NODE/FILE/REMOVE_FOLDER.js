// load UJS
require('../../../UJS-NODE.js');

TEST('REMOVE_FOLDER', function(ok) {
	'use strict';

	INIT_OBJECTS();

	REMOVE_FOLDER({
		path : 'testFolder',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});

	REMOVE_FOLDER('testFolder2', {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});
});
