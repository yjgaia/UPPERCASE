OVERRIDE(LOOP, (origin) => {
	
	/*
	 * 아주 짧은 시간동안 반복해서 실행하는 로직을 작성할때 사용하는 LOOP 클래스
	 */
	global.LOOP = CLASS((cls) => {
		
		let beforeTime;
		let animationInterval;
		
		let loopInfos = [];
		let runs = [];
		
		let fire = () => {
			
			if (animationInterval === undefined) {
				
				let step;
	
				beforeTime = performance.now() / 1000;
				
				animationInterval = requestAnimationFrame(step = (now) => {
					
					let time = now / 1000;
					let deltaTime = time - beforeTime;
					
					if (deltaTime > 0) {
						
						for (let i = 0; i < loopInfos.length; i += 1) {
							
							let loopInfo = loopInfos[i];
							
							if (loopInfo.fps !== undefined && loopInfo.fps > 0) {
	
								if (loopInfo.timeSigma === undefined) {
									loopInfo.timeSigma = 0;
									loopInfo.countSigma = 0;
								}
	
								// calculate count.
								let count = parseInt(loopInfo.fps * deltaTime * (loopInfo.timeSigma / deltaTime + 1), 10) - loopInfo.countSigma;
	
								// start.
								if (loopInfo.start !== undefined) {
									loopInfo.start();
								}
	
								// run interval.
								let interval = loopInfo.interval;
								
								for (let j = 0; j < count; j += 1) {
									interval(loopInfo.fps);
								}
	
								// end.
								if (loopInfo.end !== undefined) {
									loopInfo.end(deltaTime);
								}
	
								loopInfo.countSigma += count;
	
								loopInfo.timeSigma += deltaTime;
								if (loopInfo.timeSigma > 1000) {
									loopInfo.timeSigma = undefined;
								}
							}
						}
	
						// run runs.
						for (let i = 0; i < runs.length; i += 1) {
							runs[i](deltaTime);
						}
	
						beforeTime = time;
					}
					
					animationInterval = requestAnimationFrame(step);
				});
			}
		};
		
		let stop = () => {
			
			if (loopInfos.length <= 0 && runs.length <= 0) {
	
				cancelAnimationFrame(animationInterval);
				animationInterval = undefined;
			}
		};
	
		return {
			
			init : (inner, self, fpsOrRun, intervalOrFuncs) => {
				//OPTIONAL: fpsOrRun
				//OPTIONAL: intervalOrFuncs
				//OPTIONAL: intervalOrFuncs.start
				//REQUIRED: intervalOrFuncs.interval
				//OPTIONAL: intervalOrFuncs.end
				
				let resume;
				let pause;
				let changeFPS;
				let remove;
	
				if (intervalOrFuncs !== undefined) {
					
					let start;
					let interval;
					let end;
					let info;
					
					// init intervalOrFuncs.
					if (CHECK_IS_DATA(intervalOrFuncs) !== true) {
						interval = intervalOrFuncs;
					} else {
						start = intervalOrFuncs.start;
						interval = intervalOrFuncs.interval;
						end = intervalOrFuncs.end;
					}
				
					resume = self.resume = RAR(() => {
						
						loopInfos.push(info = {
							fps : fpsOrRun,
							start : start,
							interval : interval,
							end : end
						});
						
						fire();
					});
	
					pause = self.pause = () => {
	
						REMOVE({
							array : loopInfos,
							value : info
						});
	
						stop();
					};
	
					changeFPS = self.changeFPS = (fps) => {
						//REQUIRED: fps
	
						info.fps = fps;
					};
	
					remove = self.remove = () => {
						pause();
					};
				}
	
				// when fpsOrRun is run
				else {
					
					let run;
					
					resume = self.resume = RAR(() => {
						
						runs.push(run = fpsOrRun);
						
						fire();
					});
	
					pause = self.pause = () => {
	
						REMOVE({
							array : runs,
							value : run
						});
	
						stop();
					};
	
					remove = self.remove = () => {
						pause();
					};
				}
			}
		};
	});
});
