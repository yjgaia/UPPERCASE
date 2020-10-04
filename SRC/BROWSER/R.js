FOR_BOX((box) => {

	/*
	 * 프로젝트 폴더 내 R 폴더에 저장되어 있는 리소스의 경로를 가져오거나, callback을 지정하여 리소스의 내용을 가져옵니다.
	 */
	box.R = METHOD((m) => {

		let basePath;

		let setBasePath = m.setBasePath = (_basePath) => {
			basePath = _basePath;
		};

		return {

			run: (path, callback) => {
				//REQUIRED: path
				//OPTIONAL: callback

				let uri = box.boxName + '/R/' + path;

				if (CONFIG.version !== undefined) {
					uri += '?version=' + CONFIG.version;
				}

				if (basePath !== undefined) {
					uri = basePath + '/' + uri;
				}

				if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {
					if (box.boxName !== CONFIG.defaultBoxName) {
						uri = 'BOX/' + uri;
					}
				} else {
					uri = '/' + uri;
				}

				if (callback !== undefined) {
					GET(uri, callback);
				}

				return uri;
			}
		};
	});
});
