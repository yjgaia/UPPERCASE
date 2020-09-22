TEST('COPY_FILE', (check) => {

	COPY_FILE({
		from : 'UPPERCASE-CORE/test.txt',
		to : 'UPPERCASE-CORE/test2.txt',
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
		path : 'UPPERCASE-CORE/test2.txt',
		isSync : true
	}).toString() === 'this is test file.');

	COPY_FILE({
		from : 'UPPERCASE-CORE/test.txt',
		to : 'UPPERCASE-CORE/test3.txt',
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
				path : 'UPPERCASE-CORE/test3.txt',
				isSync : true
			}).toString() === 'this is test file.');
		}
	});
});
