TEST('FIND_FILE_NAMES', (check) => {

	check(CHECK_ARE_SAME([FIND_FILE_NAMES({
		path : 'UPPERCASE-CORE/testFolder/subFolder1/subFolder1',
		isSync : true
	}, {
		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		notExists : () => {
			console.log('NOT EXISTS!');
		}
	}), ['test1']]));

	FIND_FILE_NAMES({
		path : 'UPPERCASE-CORE/testFolder/subFolder2/subFolder2',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		notExists : () => {
			console.log('NOT EXISTS!');
		},

		success : (fileNames) => {
			check(CHECK_ARE_SAME([fileNames, ['test2']]));
		}
	});
});
