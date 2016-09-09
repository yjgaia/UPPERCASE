// load UJS.
require('../../../UJS-NODE.js');

TEST('SHARED_STORE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CPU_CLUSTERING(function() {

		SERVER_CLUSTERING({
			hosts : {
				serverA : '127.0.0.1',
				serverB : '127.0.0.1'
			},
			thisServerName : 'serverA',
			port : 8125
		}, function() {

			var
			// shared store
			sharedStore = SHARED_STORE('test');

			if (CPU_CLUSTERING.getWorkerId() === 1) {

				sharedStore.save({
					name : 'msg',
					value : 'Hello World!',
					removeAfterSeconds : 2
				});
			}

			DELAY(1, function() {
				
				ok(sharedStore.get('msg') === 'Hello World!');
				
				ok(CHECK_ARE_SAME([sharedStore.list(), {
					msg : 'Hello World!'
				}]));
			});

			DELAY(3, function() {
				ok(sharedStore.get('msg') === undefined);
			});
		});
	});
});
