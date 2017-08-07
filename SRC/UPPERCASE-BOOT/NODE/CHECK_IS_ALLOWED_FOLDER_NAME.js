global.CHECK_IS_ALLOWED_FOLDER_NAME = METHOD({
	
	run : (name) => {
		//REQUIRED: name
		
		return (

			// BOX folder
			name !== 'BOX' &&

			// node.js module
			name !== 'node_modules' &&

			// not load
			name !== '__NOT_LOAD' &&

			// deprecated
			name !== '__OLD'
		);
	}
});