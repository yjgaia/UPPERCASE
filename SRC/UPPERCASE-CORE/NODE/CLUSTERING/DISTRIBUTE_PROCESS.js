/*
 * 복잡도 파라미터를 기반으로, 클러스터링 된 서버들 및 CPU 코어들에 고르게 분산합니다.
 */
global.DISTRIBUTE_PROCESS = METHOD((m) => {

	return {

		run : (complexity, work) => {
			//REQUIRED: complexity
			//OPTIONAL: work
			
			//TODO: 개발중
		}
	};
});
