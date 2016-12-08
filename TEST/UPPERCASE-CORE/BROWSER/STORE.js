TEST('STORE', function(check) {
	'use strict';

	var
	// store
	store = STORE('TestStore');

	check(store.get('msg') === undefined);

	store.save({
		name : 'msg',
		value : 'This is test message!'
	});

	check(store.get('msg') === 'This is test message!');

	store.remove('msg');

	check(store.get('msg') === undefined);
});
