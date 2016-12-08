TEST('REMOVE_FILE', function(check) {
	'use strict';

	REMOVE_FILE({
		path : 'UPPERCASE-CORE/testFolder/test2.txt',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});

	REMOVE_FILE({
		path : 'UPPERCASE-CORE/testFolder/test3.txt',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});
	
	REMOVE_FILE('UPPERCASE-CORE/test.txt', {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});
});
