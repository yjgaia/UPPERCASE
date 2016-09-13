/**
 * Node.js 환경에서 테스트
 */

// load UPPERCASE-CORE-NODE
require('../../UPPERCASE-CORE/NODE.js');

RUN(function() {
	'use strict';

	var
	// test.
	test = function(path) {
		require('./' + path + '.js');
	};
	
	// UPPERCASE-CORE-COMMON
	test('COMMON/TO_DELETE');
	test('COMMON/METHOD');
	test('COMMON/OOP/CLASS');
	test('COMMON/OOP/OBJECT');
	
	// UPPERCASE-CORE-NODE
}); 