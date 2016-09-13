/**
 * 메모리 사용률을 반환합니다.
 */
global.MEMORY_USAGE = METHOD(function(m) {
	'use strict';
	
	var
	//IMPORT: os
	os = require('os'),
	
	// total memory
	totalMemory = os.totalmem();
	
	return {
		
		run : function() {
			
			var
			// free memory
			freeMemory = os.freemem();
			
			return (1 - freeMemory / totalMemory) * 100;
		}
	};
});
