TEST('MOVE_FILE', function(check) {
	'use strict';

	MOVE_FILE({
		from : 'UPPERCASE-CORE/test2.txt',
		to : 'UPPERCASE-CORE/testFolder/test2.txt',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		}
	});

	check(READ_FILE({
		path : 'UPPERCASE-CORE/testFolder/test2.txt',
		isSync : true
	}).toString() === 'this is test file.');

	MOVE_FILE({
		from : 'UPPERCASE-CORE/test3.txt',
		to : 'UPPERCASE-CORE/testFolder/test3.txt',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function() {
			check(READ_FILE({
				path : 'UPPERCASE-CORE/testFolder/test3.txt',
				isSync : true
			}).toString() === 'this is test file.');
		}
	});
});
