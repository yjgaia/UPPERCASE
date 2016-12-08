TEST('REMOVE_FOLDER', function(check) {
	'use strict';

	REMOVE_FOLDER({
		path : 'UPPERCASE-CORE/testFolder',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});

	REMOVE_FOLDER('UPPERCASE-CORE/test', {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});

	REMOVE_FOLDER('UPPERCASE-CORE/test2', {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});
});
