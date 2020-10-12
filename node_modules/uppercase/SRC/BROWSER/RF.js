FOR_BOX((box) => {

	/*
	 * 업로드한 파일의 경로를 가져옵니다.
	 */
	box.RF = METHOD({

		run: (path) => {
			//REQUIRED: path

			if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {
				return (BROWSER_CONFIG.isSecure === true ? 'https://' : 'http://') + BROWSER_CONFIG.host + ':' + BROWSER_CONFIG.port + '/__RF/' + box.boxName + '/' + path;
			} else {
				return '/__RF/' + box.boxName + '/' + path;
			}
		}
	});
});