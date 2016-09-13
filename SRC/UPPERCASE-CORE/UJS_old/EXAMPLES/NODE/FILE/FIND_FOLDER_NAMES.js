// load UJS
require('../../../UJS-NODE.js');

TEST('FIND_FOLDER_NAMES', function(ok) {
	'use strict';

	INIT_OBJECTS();

	ok(CHECK_ARE_SAME([FIND_FOLDER_NAMES({
		path : 'testFolder',
		isSync : true
	}, {
		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		}
	}), ['subFolder1', 'subFolder2']]));

	FIND_FOLDER_NAMES('testFolder', {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function(folderNames) {
			ok(CHECK_ARE_SAME([folderNames, ['subFolder1', 'subFolder2']]));
		}
	});
});
