TEST('GET_FILE_INFO', function(check) {
	'use strict';

	var info = GET_FILE_INFO({
		path : 'UPPERCASE-CORE/test.txt',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function(info) {
			check(info.size === 18);
		}
	});

	check(info.size === 18);

	GET_FILE_INFO({
		path : 'UPPERCASE-CORE/test.txt',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function(info) {
			check(info.size === 18);
		}
	});
});
