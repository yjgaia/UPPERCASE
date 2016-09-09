// load UJS.
require('../../../../UJS-NODE.js');

TEST('SHARED_STORE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CPU_CLUSTERING(function(workerData, on, off, broadcast) {

		SERVER_CLUSTERING({
			hosts : {
				serverA : '1.btncafe.com',
				serverB : '2.btncafe.com'
			},
			thisServerName : 'serverA',
			port : 9125
		}, function(on, off, broadcast) {

			var
			// shared store
			sharedStore = SHARED_STORE('test');

			INTERVAL(1, function() {
				console.log(sharedStore.get('msg'));
			});

			if (CPU_CLUSTERING.getWorkerId() === 1) {

				DELAY(5, function() {
					sharedStore.save({
						name : 'msg',
						value : 'Hello SERVER_CLUSTERING2!',
						removeAfterSeconds : 5
					});
				});
			}
		});
	});
});
