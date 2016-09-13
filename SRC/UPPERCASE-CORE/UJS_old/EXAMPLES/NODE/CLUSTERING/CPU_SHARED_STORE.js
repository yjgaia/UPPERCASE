// load UJS.
require('../../../UJS-NODE.js');

TEST('CPU_SHARED_STORE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CPU_CLUSTERING(function() {

		var
		// shared store
		sharedStore = CPU_SHARED_STORE('test');

		if (CPU_CLUSTERING.getWorkerId() === 1) {

			sharedStore.save({
				name : 'msg',
				value : 'Hello World!'
			});
		}

		DELAY(1, function() {
			
			ok(sharedStore.get('msg') === 'Hello World!');
			
			ok(CHECK_ARE_SAME([sharedStore.list(), {
				msg : 'Hello World!'
			}]));
		});
	});
});
