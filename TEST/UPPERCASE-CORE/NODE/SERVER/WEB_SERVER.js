TEST('WEB_SERVER', (check) => {
	
	// 리소스를 캐싱하지 않으려면 dev mode가 true여야함
	CONFIG.isDevMode = true;

	WEB_SERVER({
		port : 8123,
		rootPath : __dirname + '/R'
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
