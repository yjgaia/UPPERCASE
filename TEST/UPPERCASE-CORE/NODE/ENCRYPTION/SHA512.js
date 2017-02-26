TEST('SHA512', (check) => {

	// generate SHA-512 hash.
	check(SHA512({
		password : '1234',
		key : 'test'
	}) === 'ae451e84ce797ab519f454e9e3c9220550a5119c1063f75837281e4157c91cf27ec3d7a38df3254cdbc4c108189ed4b8d904baf2320a23d5268b1e81c110343b');
});
