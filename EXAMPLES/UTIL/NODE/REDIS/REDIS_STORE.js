// load UJS.
require('../../../../UJS-NODE.js');

// load UPPERCASE-UTIL.
require('../../../../UPPERCASE-UTIL/NODE.js');

TEST('REDIS_STORE', function(ok) {
	'use strict';

	INIT_OBJECTS();
	
	var
	// redis store
	redisStore = REDIS_STORE('test');

	redisStore.save({
		name : 'msg',
		value : 'Hello World!'
	});
	
	DELAY(1, function() {
		
		redisStore.get('msg', function(value) {
			
			ok(value === 'Hello World!');
		});
		
		redisStore.list(function(values) {
			
			ok(CHECK_ARE_SAME([values, {
				msg : 'Hello World!'
			}]));
		});
	});
});
