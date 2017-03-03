TEST('GET_FILE_INFO', (check) => {

	let info = GET_FILE_INFO({
		path : 'UPPERCASE-CORE/test.txt',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		notExists : () => {
			console.log('NOT EXISTS!');
		},

		success : (info) => {
			check(info.size === 18);
		}
	});

	check(info.size === 18);

	GET_FILE_INFO({
		path : 'UPPERCASE-CORE/test.txt',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		notExists : () => {
			console.log('NOT EXISTS!');
		},

		success : (info) => {
			check(info.size === 18);
		}
	});
});
