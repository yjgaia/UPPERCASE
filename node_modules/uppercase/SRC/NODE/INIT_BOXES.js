global.INIT_BOXES = METHOD((m) => {

	let boxNamesInBOXFolder = [];

	let getBoxNamesInBOXFolder = m.getBoxNamesInBOXFolder = () => {
		return boxNamesInBOXFolder;
	};

	return {

		run: (rootPath, addContent) => {
			//REQUIRED: rootPath
			//OPTIONAL: addContent

			// create UPPERCASE box.
			BOX('UPPERCASE');

			if (addContent !== undefined) {
				addContent('BOX(\'UPPERCASE\');\n');
			}

			// init boxes in root folder.
			FIND_FOLDER_NAMES({
				path: rootPath,
				isSync: true
			}, (folderNames) => {

				EACH(folderNames, (folderName) => {

					if (CHECK_IS_ALLOWED_FOLDER_NAME(folderName) === true) {

						// create box.
						BOX(folderName);

						if (addContent !== undefined) {
							addContent('BOX(\'' + folderName + '\');\n');
						}
					}
				});
			});

			if (CHECK_FILE_EXISTS({
				path: rootPath + '/BOX',
				isSync: true
			}) === true) {

				// init boxes is BOX folder.
				FIND_FOLDER_NAMES({
					path: rootPath + '/BOX',
					isSync: true
				}, (folderNames) => {

					EACH(folderNames, (folderName) => {

						if (CHECK_IS_ALLOWED_FOLDER_NAME(folderName) === true) {

							// create box.
							BOX(folderName);

							if (addContent !== undefined) {
								addContent('BOX(\'' + folderName + '\');\n');
							}

							// save box name.
							boxNamesInBOXFolder.push(folderName);
						}
					});
				});
			}
		}
	};
});
