TEST('WRITE_FILE', (check) => {
	
	WRITE_FILE({
		path : 'UPPERCASE-CORE/test.txt',
		content : 'this is test file.',
		isSync : true
	}, {
		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		}
	});

	check(READ_FILE({
		path : 'UPPERCASE-CORE/test.txt',
		isSync : true
	}).toString() === 'this is test file.');

	WRITE_FILE({
		path : 'UPPERCASE-CORE/testFolder/subFolder1/subFolder1/test1',
		content : 'test!!!',
		isSync : true
	}, {
		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		}
	});

	check(READ_FILE({
		path : 'UPPERCASE-CORE/testFolder/subFolder1/subFolder1/test1',
		isSync : true
	}).toString() === 'test!!!');

	WRITE_FILE({
		path : 'UPPERCASE-CORE/testFolder/subFolder2/subFolder2/test2',
		isSync : true,
		content : 'test!!!'
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		success : () => {
			READ_FILE({
				path : 'UPPERCASE-CORE/testFolder/subFolder2/subFolder2/test2',
				isSync : true
			}, (buffer) => {
				check(buffer.toString() === 'test!!!');
			});
		}
	});
});
