OVERRIDE(LOOP, (origin) => {

	/*
	 * 아주 짧은 시간동안 반복해서 실행하는 로직을 작성할때 사용하는 LOOP 클래스
	 */
	global.LOOP = CLASS((cls) => {

		let animationInterval;

		let infos = [];

		let fire = () => {

			if (animationInterval === undefined) {

				let beforeTime = performance.now() / 1000;

				let step;
				animationInterval = requestAnimationFrame(step = (now) => {

					let time = now / 1000;
					let deltaTime = time - beforeTime;

					if (deltaTime > 0) {

						for (let i = 0; i < infos.length; i += 1) {

							let info = infos[i];

							if (info.fps !== undefined && info.fps > 0) {

								if (info.timeSigma === undefined) {
									info.timeSigma = 0;
								}

								info.timeSigma += deltaTime;

								let frameSecond = 1 / info.fps;

								if (info.timeSigma >= frameSecond) {

									info.run(frameSecond);

									info.timeSigma -= frameSecond;
								}
							}

							else {
								info.run(deltaTime);
							}
						}

						beforeTime = time;
					}

					animationInterval = requestAnimationFrame(step);
				});
			}
		};

		let stop = () => {

			if (infos.length <= 0) {

				cancelAnimationFrame(animationInterval);
				animationInterval = undefined;
			}
		};

		return {

			init: (inner, self, fps, run) => {
				//OPTIONAL: fps
				//REQUIRED: run

				if (run === undefined) {
					run = fps;
					fps = undefined;
				}

				let info;

				let resume = self.resume = RAR(() => {

					infos.push(info = {
						fps: fps,
						run: run
					});

					fire();
				});

				let pause = self.pause = () => {

					REMOVE({
						array: infos,
						value: info
					});

					stop();
				};

				let changeFPS = self.changeFPS = (fps) => {
					//REQUIRED: fps

					info.fps = fps;
				};

				let clearFPS = self.clearFPS = () => {
					delete info.fps;
				};

				let getFPS = self.getFPS = () => {
					return info.fps;
				};

				let remove = self.remove = () => {
					pause();
				};
			}
		};
	});
});
