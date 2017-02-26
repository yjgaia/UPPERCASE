FOR_BOX((box) => {

	/*
	 * get final resource's real path.
	 */
	box.RF = METHOD({

		run : (path) => {
			//REQUIRED: path
			
			return '/__RF/' + box.boxName + '/' + path;
		}
	});
});
