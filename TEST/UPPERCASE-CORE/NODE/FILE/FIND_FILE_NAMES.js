TEST('FIND_FILE_NAMES', function(check) {
	'use strict';

	check(CHECK_ARE_SAME([FIND_FILE_NAMES({
		path : 'UPPERCASE-CORE/testFolder/subFolder1/subFolder1',
		isSync : true
	}, {
		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		}
	}), ['test1']]));

	FIND_FILE_NAMES({
		path : 'UPPERCASE-CORE/testFolder/subFolder2/subFolder2',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function(fileNames) {
			check(CHECK_ARE_SAME([fileNames, ['test2']]));
		}
	});
});
