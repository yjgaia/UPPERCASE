TEST('MOVE_FILE', (check) => {

	MOVE_FILE({
		from : 'UPPERCASE-CORE/test2.txt',
		to : 'UPPERCASE-CORE/testFolder/test2.txt',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		notExists : () => {
			console.log('NOT EXISTS!');
		}
	});

	check(READ_FILE({
		path : 'UPPERCASE-CORE/testFolder/test2.txt',
		isSync : true
	}).toString() === 'this is test file.');

	MOVE_FILE({
		from : 'UPPERCASE-CORE/test3.txt',
		to : 'UPPERCASE-CORE/testFolder/test3.txt',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		notExists : () => {
			console.log('NOT EXISTS!');
		},

		success : () => {
			check(READ_FILE({
				path : 'UPPERCASE-CORE/testFolder/test3.txt',
				isSync : true
			}).toString() === 'this is test file.');
		}
	});
});
