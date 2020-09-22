/*
 * 주어진 초가 흐른 뒤에 함수를 실행하는 DELAY 클래스
 */
global.DELAY = CLASS({

	init: (inner, self, seconds, func) => {
		//REQUIRED: seconds
		//OPTIONAL: func

		if (func === undefined) {
			func = seconds;
			seconds = 0;
		}

		let milliseconds;

		let startTime = Date.now();

		let remaining = milliseconds = seconds * 1000;

		let timeout;

		let resume = self.resume = RAR(() => {

			if (timeout === undefined) {

				timeout = setTimeout(() => {
					func();
					remove();
				}, remaining);
			}
		});

		let pause = self.pause = () => {

			remaining = milliseconds - (Date.now() - startTime);

			clearTimeout(timeout);
			timeout = undefined;
		};

		let remove = self.remove = () => {
			pause();
		};
	}
});
