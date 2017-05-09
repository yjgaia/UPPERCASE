FOR_BOX((box) => {

	/*
	 * 업로드한 파일의 경로를 가져옵니다.
	 */
	box.RF = METHOD({

		run : (path) => {
			//REQUIRED: path
			
			return '/__RF/' + box.boxName + '/' + path;
		}
	});
});
