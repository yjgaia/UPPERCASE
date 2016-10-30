TEST('STORE', function(ok) {
	'use strict';

	var
	// store
	store = STORE('TestStore');

	ok(store.get('msg') === undefined);

	store.save({
		name : 'msg',
		value : 'This is test message!'
	});

	ok(store.get('msg') === 'This is test message!');

	store.remove('msg');

	ok(store.get('msg') === undefined);
});
