global.LOAD_ALL_SCRIPTS = METHOD((m) => {

	let Path = require('path');

	return {

		run: (params, load) => {
			//REQUIRED: params
			//REQUIRED: params.rootPath
			//REQUIRED: params.env
			//REQUIRED: load

			let rootPath = params.rootPath;
			let env = params.env;

			let scanFolder = (folderPath, boxName) => {

				let folderNames = [];

				FIND_FOLDER_NAMES({
					path: folderPath,
					isSync: true
				}, {

					notExists: () => {
						// ignore.
					},

					success: (_folderNames) => {
						folderNames = _folderNames;
					}
				});

				if (CHECK_IS_IN({
					array: folderNames,
					value: 'LIB'
				}) === true) {
					scanFolder(folderPath + '/LIB', boxName);
				}

				FIND_FILE_NAMES({
					path: folderPath,
					isSync: true
				}, {

					notExists: () => {
						// ignore.
					},

					success: (fileNames) => {

						EACH(fileNames, (fileName) => {

							let fullPath = folderPath + '/' + fileName;

							let extname = Path.extname(fileName).toLowerCase();

							if (extname === '.js') {
								load(fullPath, boxName);
							}
						});
					}
				});

				EACH(folderNames, (folderName) => {
					if (folderName !== 'LIB' && CHECK_IS_ALLOWED_FOLDER_NAME(folderName) === true) {
						scanFolder(folderPath + '/' + folderName, boxName);
					}
				});
			};

			FOR_BOX((box) => {

				let boxRootPath = CHECK_IS_IN({
					array: INIT_BOXES.getBoxNamesInBOXFolder(),
					value: box.boxName
				}) === true ? rootPath + '/BOX' : rootPath;

				scanFolder(boxRootPath + '/' + box.boxName + '/COMMON', box.boxName);
				scanFolder(boxRootPath + '/' + box.boxName + '/' + env, box.boxName);
			});

			FOR_BOX((box) => {

				let boxRootPath = CHECK_IS_IN({
					array: INIT_BOXES.getBoxNamesInBOXFolder(),
					value: box.boxName
				}) === true ? rootPath + '/BOX' : rootPath;

				FIND_FILE_NAMES({
					path: boxRootPath + '/' + box.boxName,
					isSync: true
				}, {

					notExists: () => {
						// ignore.
					},

					success: (fileNames) => {

						EACH(fileNames, (fileName) => {

							let fullPath = boxRootPath + '/' + box.boxName + '/' + fileName;

							let extname = Path.extname(fileName).toLowerCase();

							if (fileName === env + extname) {
								if (extname === '.js') {
									load(fullPath, box.boxName);
								}
							}
						});
					}
				});
			});
		}
	};
});
