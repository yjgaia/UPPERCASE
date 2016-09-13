// load UJS
require('../../../UJS-NODE.js');

TEST('SHA1', function(ok) {
	'use strict';

	INIT_OBJECTS();

	// generate SHA-1 hash.
	ok(SHA1({
		password : '1234',
		key : 'test'
	}) === '16dd1fdd7c595eab4586cebba6b34eaff41acc53');
});
