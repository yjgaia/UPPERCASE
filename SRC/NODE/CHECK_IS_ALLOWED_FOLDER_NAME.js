global.CHECK_IS_ALLOWED_FOLDER_NAME = METHOD({

	run: (name) => {
		//REQUIRED: name

		return (
			// hide folder
			name[0] !== '.' &&

			// node.js module
			name !== 'node_modules' &&

			// BOX folder
			name !== 'BOX' &&

			// final resources
			name !== '__RF' &&

			// packed files
			name !== '__PACK' &&

			// not using files
			name !== '__NOT_USING' &&

			// deprecated files
			name !== '__OLD'
		);
	}
});