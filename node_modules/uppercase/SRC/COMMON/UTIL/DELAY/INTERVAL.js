/*
 * 주어진 초 마다 함수를 반복해서 실행하는 INTERVAL 클래스
 */
global.INTERVAL = CLASS({

	init: (inner, self, seconds, func) => {
		//REQUIRED: seconds
		//OPTIONAL: func

		if (func === undefined) {
			func = seconds;
			seconds = 0;
		}

		let milliseconds;

		let startTime = Date.now();

		let remaining = milliseconds = seconds === 0 ? 1 : seconds * 1000;

		let interval;

		let count = 0;

		let resume = self.resume = RAR(() => {

			if (interval === undefined) {

				interval = setInterval(() => {

					count += 1;

					if (func(self, count) === false) {
						remove();
					}

					startTime = Date.now();

				}, remaining);
			}
		});

		let pause = self.pause = () => {

			remaining = milliseconds - (Date.now() - startTime);

			clearInterval(interval);
			interval = undefined;
		};

		let remove = self.remove = () => {
			pause();
		};
	}
});
