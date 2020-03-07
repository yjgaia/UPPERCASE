TEST('REMOVE_FOLDER', (check) => {

	REMOVE_FOLDER({
		path : 'UPPERCASE-CORE/testFolder',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		success : () => {
			console.log('good!');
		}
	});

	REMOVE_FOLDER('UPPERCASE-CORE/test', {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		success : () => {
			console.log('good!');
		}
	});

	REMOVE_FOLDER('UPPERCASE-CORE/test2', {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		success : () => {
			console.log('good!');
		}
	});
});
