/*
 * 기기의 IP들을 반환합니다.
 */
global.GET_IPS = METHOD(() => {

	let OS = require('os');
	
	return {

		run : () => {
			
			let interfaces = OS.networkInterfaces();
			let ips = [];
			
			EACH(interfaces, (infos) => {
				EACH(infos, (info) => {
					ips.push(info.address);
				});
			});
			
			return ips;
		}
	};
});
