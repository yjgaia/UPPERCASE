TEST('SHA256', (check) => {

	// generate SHA-256 hash.
	check(SHA256({
		password : '1234',
		key : 'test'
	}) === '5471d39e681ffc00128c11b573f4a3356ceba766956bb928d562d2c7c0c2db6a');
});
