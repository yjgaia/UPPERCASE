TEST('DISK_USAGE', (check) => {
	
	DISK_USAGE((usage) => {
		console.log(usage);
	});
	
	DISK_USAGE('c:', (usage) => {
		console.log(usage);
	});
	
	DISK_USAGE('/', {
		error : () => {
			console.log('리눅스나 유닉스 기반의 운영체제가 아닙니다.');
		},
		success : (usage) => {
			console.log(usage);
		}
	});
});
