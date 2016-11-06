OVERRIDE(LOOP, function(origin) {
	
	/**
	 * 아주 짧은 시간동안 반복해서 실행하는 로직을 작성할때 사용하는 LOOP 클래스
	 */
	global.LOOP = CLASS(function(cls) {
		'use strict';
		
		var
		// before time
		beforeTime,
		
		// animation interval
		animationInterval,
		
		// loop infos
		loopInfos = [],
		
		// runs
		runs = [],
		
		// fire.
		fire = function() {
	
			if (animationInterval === undefined) {
	
				beforeTime = Date.now();
	
				animationInterval = requestAnimationFrame(function() {
	
					var
					// time
					time = Date.now(),
	
					// times
					times = time - beforeTime,
	
					// loop info
					loopInfo,
	
					// count
					count,
	
					// interval
					interval,
	
					// i, j
					i, j;
	
					if (times > 0) {
	
						for (i = 0; i < loopInfos.length; i += 1) {
	
							loopInfo = loopInfos[i];
	
							if (loopInfo.fps !== undefined && loopInfo.fps > 0) {
	
								if (loopInfo.timeSigma === undefined) {
									loopInfo.timeSigma = 0;
									loopInfo.countSigma = 0;
								}
	
								// calculate count.
								count = parseInt(loopInfo.fps / (1000 / times) * (loopInfo.timeSigma / times + 1), 10) - loopInfo.countSigma;
	
								// start.
								if (loopInfo.start !== undefined) {
									loopInfo.start();
								}
	
								// run interval.
								interval = loopInfo.interval;
								for (j = 0; j < count; j += 1) {
									interval(loopInfo.fps);
								}
	
								// end.
								if (loopInfo.end !== undefined) {
									loopInfo.end(times);
								}
	
								loopInfo.countSigma += count;
	
								loopInfo.timeSigma += times;
								if (loopInfo.timeSigma > 1000) {
									loopInfo.timeSigma = undefined;
								}
							}
						}
	
						// run runs.
						for (i = 0; i < runs.length; i += 1) {
							runs[i](times);
						}
	
						beforeTime = time;
					}
				});
			}
		},
	
		// stop.
		stop = function() {
	
			if (loopInfos.length <= 0 && runs.length <= 0) {
	
				cancelAnimationFrame(animationInterval);
				animationInterval = undefined;
			}
		};
	
		return {
	
			init : function(inner, self, fpsOrRun, intervalOrFuncs) {
				//OPTIONAL: fpsOrRun
				//OPTIONAL: intervalOrFuncs
				//OPTIONAL: intervalOrFuncs.start
				//REQUIRED: intervalOrFuncs.interval
				//OPTIONAL: intervalOrFuncs.end
	
				var
				// run.
				run,
	
				// start.
				start,
	
				// interval.
				interval,
	
				// end.
				end,
	
				// info
				info,
				
				// resume.
				resume,
				
				// pause.
				pause,
	
				// change fps.
				changeFPS,
	
				// remove.
				remove;
	
				if (intervalOrFuncs !== undefined) {
	
					// init intervalOrFuncs.
					if (CHECK_IS_DATA(intervalOrFuncs) !== true) {
						interval = intervalOrFuncs;
					} else {
						start = intervalOrFuncs.start;
						interval = intervalOrFuncs.interval;
						end = intervalOrFuncs.end;
					}
				
					self.resume = resume = RAR(function() {
						
						loopInfos.push( info = {
							fps : fpsOrRun,
							start : start,
							interval : interval,
							end : end
						});
						
						fire();
					});
	
					self.pause = pause = function() {
	
						REMOVE({
							array : loopInfos,
							value : info
						});
	
						stop();
					};
	
					self.changeFPS = changeFPS = function(fps) {
						//REQUIRED: fps
	
						info.fps = fps;
					};
	
					self.remove = remove = function() {
						pause();
					};
				}
	
				// when fpsOrRun is run
				else {
					
					self.resume = resume = RAR(function() {
						
						runs.push(run = fpsOrRun);
						
						fire();
					});
	
					self.pause = pause = function() {
	
						REMOVE({
							array : runs,
							value : run
						});
	
						stop();
					};
	
					self.remove = remove = function() {
						pause();
					};
				}
			}
		};
	});
});
