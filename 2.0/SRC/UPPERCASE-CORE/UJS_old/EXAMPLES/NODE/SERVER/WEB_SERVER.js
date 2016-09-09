// load UJS.
require('../../../UJS-NODE.js');

TEST('WEB_SERVER', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CPU_CLUSTERING(function(workerData, on, off, broadcast) {
		
		var
		// session store
		sessionStore = SHARED_STORE('sessionStore');

		WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {

			var
			// session key
			sessionKey = requestInfo.cookies.__SESSION_KEY,

			// session
			session;

			if (sessionKey !== undefined) {

				session = sessionStore.get(sessionKey);

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
});
