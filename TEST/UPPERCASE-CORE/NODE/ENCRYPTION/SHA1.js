TEST('SHA1', function(check) {
	'use strict';

	// generate SHA-1 hash.
	check(SHA1({
		password : '1234',
		key : 'test'
	}) === '16dd1fdd7c595eab4586cebba6b34eaff41acc53');
});
