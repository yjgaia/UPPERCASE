TEST('CREATE_FOLDER', function(check) {
	'use strict';

	CREATE_FOLDER({
		path : 'UPPERCASE-CORE/test',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});

	CREATE_FOLDER({
		path : 'UPPERCASE-CORE/test2',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			console.log('good!');
		}
	});
});
