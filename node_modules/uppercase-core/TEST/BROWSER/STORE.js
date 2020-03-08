TEST('STORE', (check) => {

	let store = TestBox.STORE('TestStore');

	check(store.get('msg') === undefined);

	store.save({
		name : 'msg',
		value : 'This is test message!'
	});

	check(store.get('msg') === 'This is test message!');

	store.remove('msg');

	check(store.get('msg') === undefined);
});
