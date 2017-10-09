global.CHECK_IS_ALLOWED_FOLDER_NAME = METHOD({
	
	run : (name) => {
		//REQUIRED: name
		
		return (
			name !== 'BOX' &&
			name !== 'node_modules' &&
			name !== '__NOT_LOAD' &&
			name !== '__RF' &&
			name !== '__PACK' &&
			name !== '__OLD'
		);
	}
});