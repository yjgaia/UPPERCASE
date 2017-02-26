/*
 * CPU 각 코어 당 사용률을 반환합니다.
 */
global.CPU_USAGES = METHOD((m) => {
	
	let os = require('os');
	
	return {
		
		run : () => {
			
			let cpuInfos = os.cpus();
			let usages = [];
			
			EACH(cpuInfos, (cpuInfo) => {
				
				let total = 0;
				
				let idleTime;
				
				EACH(cpuInfo.times, (time, type) => {
					total += time;
					if (type === 'idle') {
						idleTime = time;
					}
				});
				
				usages.push((1 - idleTime / total) * 100);
			});
			
			return usages;
		}
	};
});
