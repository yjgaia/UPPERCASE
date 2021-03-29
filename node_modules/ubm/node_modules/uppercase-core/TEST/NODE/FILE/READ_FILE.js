TEST('READ_FILE', (check) => {

	let buffer = READ_FILE({
		path : 'UPPERCASE-CORE/test.txt',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		notExists : () => {
			console.log('NOT EXISTS!');
		},

		success : (buffer) => {
			check(buffer.toString() === 'this is test file.');
		}
	});
	
	if (buffer !== undefined) {
		check(buffer.toString() === 'this is test file.');
	}
	
	READ_FILE({
		path : 'UPPERCASE-CORE/test.txt',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		notExists : () => {
			console.log('NOT EXISTS!');
		},

		success : (buffer) => {
			check(buffer.toString() === 'this is test file.');
		}
	});
});
