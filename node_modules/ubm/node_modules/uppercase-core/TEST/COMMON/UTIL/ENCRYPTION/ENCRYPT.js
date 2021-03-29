TEST('ENCRYPT', (check) => {
	
	check(ENCRYPT({
		password : '1234',
		key : 'test'
	}) === 'EW@@');
	
	check(ENCRYPT({
		password : ENCRYPT({
			password : '1234',
			key : 'test'
		}),
		key : 'test'
	}) === '1234');
});
