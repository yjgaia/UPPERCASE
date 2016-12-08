TEST('COPY_FILE', function(check) {
	'use strict';

	COPY_FILE({
		from : 'UPPERCASE-CORE/test.txt',
		to : 'UPPERCASE-CORE/test2.txt',
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
		path : 'UPPERCASE-CORE/test2.txt',
		isSync : true
	}).toString() === 'this is test file.');

	COPY_FILE({
		from : 'UPPERCASE-CORE/test.txt',
		to : 'UPPERCASE-CORE/test3.txt',
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
				path : 'UPPERCASE-CORE/test3.txt',
				isSync : true
			}).toString() === 'this is test file.');
		}
	});
});
