OVERRIDE(NODE_CONFIG, (origin) => {
	
	/*
	 * Node.js 환경에서의 기본 설정
	 */
	global.NODE_CONFIG = COMBINE([{
		
		// find를 수행할 때 최대로 가져올 데이터의 개수
		maxDataCount : 1000
		
	}, origin]);
});
