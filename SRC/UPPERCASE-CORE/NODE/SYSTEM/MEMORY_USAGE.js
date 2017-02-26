/*
 * 메모리 사용률을 반환합니다.
 */
global.MEMORY_USAGE = METHOD((m) => {
	
	let os = require('os');
	
	let totalMemory = os.totalmem();
	
	return {
		
		run : () => {
			
			let freeMemory = os.freemem();
			
			return (1 - freeMemory / totalMemory) * 100;
		}
	};
});
