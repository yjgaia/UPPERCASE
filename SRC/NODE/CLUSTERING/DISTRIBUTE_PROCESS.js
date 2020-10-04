/*
 * 복잡도 파라미터(complexity)를 기준으로, 클러스터링 된 서버들 및 CPU 코어들에게 작업을 고르게 분배합니다.
 * 
 * complexity를 입력하지 않으면 기본적으로 1로 인식합니다.
 */
global.DISTRIBUTE_PROCESS = METHOD((m) => {

	let complexityMap = {};

	return {

		run: (paramsOrComplexity, work) => {
			//OPTIONAL: paramsOrComplexity
			//OPTIONAL: paramsOrComplexity.tag
			//OPTIONAL: paramsOrComplexity.complexity
			//REQUIRED: work

			let tag;
			let complexity;

			if (work === undefined) {
				work = paramsOrComplexity;
				paramsOrComplexity = undefined;
			}

			if (CHECK_IS_DATA(paramsOrComplexity) !== true) {
				complexity = paramsOrComplexity;
			} else {
				tag = paramsOrComplexity.tag;
				complexity = paramsOrComplexity.complexity;
			}

			if (complexity === undefined) {
				complexity = 1;
			}

			let selectedServerName;

			// 복잡도가 가장 낮은 서버를 찾습니다.
			if (SERVER_CLUSTERING.getHosts !== undefined) {

				let minComplexity = Infinity;
				EACH(SERVER_CLUSTERING.getHosts(), (host, serverName) => {
					if (complexityMap['__SERVER_' + serverName] === undefined) {
						complexityMap['__SERVER_' + serverName] = 0;
					}
					if (complexityMap['__SERVER_' + serverName] < minComplexity) {
						minComplexity = complexityMap['__SERVER_' + serverName];
						selectedServerName = serverName;
					}
				});

				complexityMap['__SERVER_' + selectedServerName] += complexity;
			}

			if (
				// 서버 클러스터링을 하지 않는 경우
				SERVER_CLUSTERING.getThisServerName === undefined ||
				// 복잡도가 가장 낮은 서버가 현재 서버인 경우
				selectedServerName === SERVER_CLUSTERING.getThisServerName()) {

				let selectedWorkerId;

				// 복잡도가 가장 낮은 CPU를 찾습니다.
				let minComplexity = Infinity;
				REPEAT(CPU_CLUSTERING.getWorkerCount(), (i) => {
					let workerId = i + 1;
					if (complexityMap['__CPU_' + workerId] === undefined) {
						complexityMap['__CPU_' + workerId] = 0;
					}
					if (complexityMap['__CPU_' + workerId] < minComplexity) {
						minComplexity = complexityMap['__CPU_' + workerId];
						selectedWorkerId = workerId;
					}
				});

				complexityMap['__CPU_' + selectedWorkerId] += complexity;

				// 최종적으로 선택된 CPU에서 작업 수행
				if (CPU_CLUSTERING.getWorkerId() === selectedWorkerId) {
					console.log('[DISTRIBUTE_PROCESS] ' + (tag === undefined ? '' : '[' + tag + '] ') + MSG({
						ko: '프로세스를 분산합니다. (PID: ' + process.pid + ')'
					}));
					work();
				}
			}
		}
	};
});
