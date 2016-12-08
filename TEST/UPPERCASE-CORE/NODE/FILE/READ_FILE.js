TEST('READ_FILE', function(check) {
	'use strict';

	var buffer = READ_FILE({
		path : 'UPPERCASE-CORE/test.txt',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function(buffer) {
			check(buffer.toString() === 'this is test file.');
		}
	});

	check(buffer.toString() === 'this is test file.');

	READ_FILE({
		path : 'UPPERCASE-CORE/test.txt',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function(buffer) {
			check(buffer.toString() === 'this is test file.');
		}
	});
});
