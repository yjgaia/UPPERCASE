// load UJS
require('../../../UJS-NODE.js');

TEST('FIND_FILE_NAMES', function(ok) {
	'use strict';

	INIT_OBJECTS();

	ok(CHECK_ARE_SAME([FIND_FILE_NAMES({
		path : 'testFolder/subFolder1/subFolder1',
		isSync : true
	}, {
		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		}
	}), ['test1']]));

	FIND_FILE_NAMES('testFolder/subFolder2/subFolder2', {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function(fileNames) {
			ok(CHECK_ARE_SAME([fileNames, ['test2']]));
		}
	});
});
