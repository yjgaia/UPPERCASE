TEST('CREATE_FOLDER', (check) => {

	CREATE_FOLDER({
		path : 'UPPERCASE-CORE/test',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		success : () => {
			console.log('good!');
		}
	});

	CREATE_FOLDER({
		path : 'UPPERCASE-CORE/test2',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		success : () => {
			console.log('good!');
		}
	});
});
