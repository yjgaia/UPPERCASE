/*
 * 웹 워커 클래스
 */
global.WORKER = CLASS({

	init: (inner, self, src) => {
		//REQUIRED: src

		let methodMap = {};
		let sendKey = 0;

		let worker = new Worker(src);

		let runMethods = (methodName, data, sendKey) => {

			let methods = methodMap[methodName];

			if (methods !== undefined) {

				EACH(methods, (method) => {

					// run method.
					method(data, (retData) => {

						if (send !== undefined && sendKey !== undefined) {

							send({
								methodName: '__CALLBACK_' + sendKey,
								data: retData
							});
						}
					});
				});
			}
		};

		let on = self.on = (methodName, method) => {
			//REQUIRED: methodName
			//REQUIRED: method

			let methods = methodMap[methodName];

			if (methods === undefined) {
				methods = methodMap[methodName] = [];
			}

			methods.push(method);
		};

		worker.onmessage = (e) => {
			runMethods(e.data.methodName, e.data.data, e.data.sendKey);
		};

		let off = self.off = (methodName, method) => {
			//REQUIRED: methodName
			//OPTIONAL: method

			let methods = methodMap[methodName];

			if (methods !== undefined) {

				if (method !== undefined) {

					REMOVE({
						array: methods,
						value: method
					});

				} else {
					delete methodMap[methodName];
				}
			}
		};

		let send = self.send = (methodNameOrParams, callback) => {
			//REQUIRED: methodNameOrParams
			//REQUIRED: methodNameOrParams.methodName
			//OPTIONAL: methodNameOrParams.data
			//OPTIONAL: callback

			let methodName;
			let data;

			if (CHECK_IS_DATA(methodNameOrParams) !== true) {
				methodName = methodNameOrParams;
			} else {
				methodName = methodNameOrParams.methodName;
				data = methodNameOrParams.data;
			}

			worker.postMessage({
				methodName: methodName,
				data: data,
				sendKey: sendKey
			});

			if (callback !== undefined) {

				let callbackName = '__CALLBACK_' + sendKey;

				// on callback.
				on(callbackName, (data) => {

					// run callback.
					callback(data);

					// off callback.
					off(callbackName);
				});
			}

			sendKey += 1;
		};

		let remove = self.remove = () => {
			worker.terminate();
			worker = undefined;
		};
	}
});