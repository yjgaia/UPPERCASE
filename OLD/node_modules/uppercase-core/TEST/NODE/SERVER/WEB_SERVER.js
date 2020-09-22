TEST('WEB_SERVER', (check) => {
	
	// 리소스를 캐싱하지 않으려면 dev mode가 true여야함
	CONFIG.isDevMode = true;

	WEB_SERVER({
		port : 8123,
		rootPath : __dirname + '/R',
		uploadURI : ['__UPLOAD_1', '__UPLOAD_2'],
		uploadPath : __dirname + '/UPLOAD_FILES',
		maxUploadFileMB : 1
	}, {
		error : (errorMsg) => {
			console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
		},
		uploadProgress : (uriParams, bytesRecieved, bytesExpected, requestInfo) => {
			// uriParams		아직 폼 데이터의 전송이 끊나지 않은 상태이므로, URI 주소에 지정된 파라미터(예를들어 uri?name=yj&age=23 등)만 가져올 수 있습니다.
			// bytesRecieved	이미 업로드 된 용량 (바이트 단위)
			// bytesExpected	전체 업로드 될 용량 (바이트 단위)
			// requestInfo		요청 정보
			
			console.log('업로드 중... (' + bytesRecieved + '/' + bytesExpected + ')');
		},
		uploadOverFileSize : (params, maxUploadFileMB, requestInfo, response) => {
			// params			파라미터
			// maxUploadFileMB	최대 업로드 가능 용량 (메가바이트 단위)
			// requestInfo		요청 정보
			// response			응답 함수
			
			response({
				statusCode : 413,
				content : '업로드 가능한 용량은 최대 ' + maxUploadFileMB + 'MB 입니다.'
			});
		},
		uploadSuccess : (params, fileDataSet, requestInfo, response) => {
			// params		파라미터
			// fileDataSet	업로드 파일 데이터(path, size, name, type, lastModifiedTime) 목록
			// requestInfo	요청 정보
			// response		응답 함수
			
			response('업로드가 완료되었습니다. 파일 정보: ' + STRINGIFY(fileDataSet));
		}
	});
	
	/*

	CPU_CLUSTERING((workerData, on, off, broadcast) => {
		
		let sessionStore = SHARED_STORE('sessionStore');

		WEB_SERVER(8123, (requestInfo, response) => {

			let sessionKey = requestInfo.cookies.__SESSION_KEY;

			if (sessionKey !== undefined) {

				let session = sessionStore.get(sessionKey);

				if (session === undefined) {

					sessionStore.save({
						name : sessionKey,
						value : {
							data : 'This is session data.'
						},
						removeAfterSeconds : 30 * 60 // 30 minutes
					});

					console.log('create session.');

				} else {

					console.log(session.data + ' (WORKER #' + workerData.id + ')');
				}
			}

			response({
				content : 'Welcome to UJS web server! (WORKER #' + workerData.id + ')',

				headers : sessionKey !== undefined ? undefined : {

					'Set-Cookie' : CREATE_COOKIE_STR_ARRAY({
						__SESSION_KEY : RANDOM_STR(40)
					})
				}
			});
		});
	});
	*/
});
