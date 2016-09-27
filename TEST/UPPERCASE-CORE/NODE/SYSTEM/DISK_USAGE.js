TEST('DISK_USAGE', function(check) {
	'use strict';
	
	DISK_USAGE(function(usage) {
		console.log(usage);
	});
	
	DISK_USAGE('c:', function(usage) {
		console.log(usage);
	});
	
	DISK_USAGE('/', {
		error : function() {
			console.log('리눅스나 유닉스 기반의 운영체제가 아닙니다.');
		},
		success : function(usage) {
			console.log(usage);
		}
	});
});
