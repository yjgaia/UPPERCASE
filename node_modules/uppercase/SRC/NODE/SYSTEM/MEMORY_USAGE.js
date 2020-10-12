/*
 * 메모리 사용률을 반환합니다.
 */
global.MEMORY_USAGE = METHOD((m) => {

	const os = require('os');
	const spawn = require('child_process').spawn;

	return {

		run: (callbackOrHandlers) => {
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//REQUIRED: callbackOrHandlers.success

			let errorHandler;
			let callback;

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}

			if (process.platform === 'linux') {

				let proc = spawn('free', []);
				proc.stdout.setEncoding('utf8');
				proc.stdout.on('data', (data) => {
					let split = data.toString().split(/\n/g)[1].split(/\s+/);

					// available / total
					callback((1 - INTEGER(split[6]) / INTEGER(split[1])) * 100);
				});

				if (errorHandler !== undefined) {
					proc.on('error', (error) => {
						errorHandler(error.toString());
					});
				}
			}

			else {
				callback((1 - os.freemem() / os.totalmem()) * 100);
			}
		}
	};
});
