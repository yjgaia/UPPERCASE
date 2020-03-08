TEST('REMOVE_FILE', (check) => {

	REMOVE_FILE({
		path : 'UPPERCASE-CORE/testFolder/test2.txt',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		success : () => {
			console.log('good!');
		}
	});

	REMOVE_FILE({
		path : 'UPPERCASE-CORE/testFolder/test3.txt',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		success : () => {
			console.log('good!');
		}
	});
	
	REMOVE_FILE('UPPERCASE-CORE/test.txt', {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		success : () => {
			console.log('good!');
		}
	});
});
