OVERRIDE(NODE_CONFIG, (origin) => {
	
	/*
	 * Node.js 환경에서의 기본 설정
	 */
	global.NODE_CONFIG = COMBINE([{

		// 데이터가 갱신될 때 콘솔 로그를 출력할 지 여부
		isDBLogMode : false,

		// find 함수를 수행할 때 최대로 가져올 데이터의 개수
		maxDataCount : 1000
		
	}, origin]);
});
