TEST('FIND_FOLDER_NAMES', (check) => {

	check(CHECK_ARE_SAME([FIND_FOLDER_NAMES({
		path : 'UPPERCASE-CORE/testFolder',
		isSync : true
	}, {
		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		notExists : () => {
			console.log('NOT EXISTS!');
		}
	}), ['subFolder1', 'subFolder2']]));

	FIND_FOLDER_NAMES({
		path : 'UPPERCASE-CORE/testFolder',
		isSync : true
	}, {

		error : (errorMsg) => {
			console.log('ERROR!', errorMsg);
		},

		notExists : () => {
			console.log('NOT EXISTS!');
		},

		success : (folderNames) => {
			check(CHECK_ARE_SAME([folderNames, ['subFolder1', 'subFolder2']]));
		}
	});
});
