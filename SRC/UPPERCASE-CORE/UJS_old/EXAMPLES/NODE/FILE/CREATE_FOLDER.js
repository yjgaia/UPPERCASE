// load UJS
require('../../../UJS-NODE.js');

TEST('CREATE_FOLDER', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CREATE_FOLDER({
		path : 'test',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});

	CREATE_FOLDER('test2', {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});
});
