/*
 * 주어진 비동기 함수들을 순서대로 실행합니다.
 */
global.NEXT = METHOD({

	run: (dataOrArrayOrCount, funcOrFuncs) => {
		//OPTIONAL: dataOrArrayOrCount
		//REQUIRED: funcOrFuncs

		let data;
		let dataKeys;
		let array;
		let count;

		let f;

		if (funcOrFuncs === undefined) {
			funcOrFuncs = dataOrArrayOrCount;
			dataOrArrayOrCount = undefined;
		}

		if (dataOrArrayOrCount !== undefined) {
			if (CHECK_IS_DATA(dataOrArrayOrCount) === true) {
				data = dataOrArrayOrCount;
			} else if (CHECK_IS_ARRAY(dataOrArrayOrCount) === true) {
				array = dataOrArrayOrCount;
			} else {
				count = dataOrArrayOrCount;
			}
		}

		if (data !== undefined) {
			dataKeys = [];

			EACH(data, (value, key) => {
				dataKeys.push(key);
			});
		}

		let funcs;
		if (CHECK_IS_ARRAY(funcOrFuncs) !== true) {
			funcs = [funcOrFuncs];
		} else {
			funcs = funcOrFuncs;
		}

		REPEAT({
			start: funcs.length - 1,
			end: 0
		}, (i) => {

			let next;

			// get last function.
			if (i !== 0 && f === undefined) {
				f = funcs[i]();
			}

			// pass next function.
			else if (i > 0) {

				next = f;

				f = funcs[i](next);

				f.next = next;
			}

			// run first function.
			else {

				next = f;

				// when next not exists, next is empty function.
				if (next === undefined) {
					next = () => {
						// ignore.
					};
				}

				f = funcs[i];

				if (count !== undefined) {

					let i = -1;

					RUN((self) => {

						i += 1;

						if (i + 1 < count) {
							f(i, self);
						} else {
							f(i, next);
						}
					});
				}

				else if (array !== undefined) {

					let length = array.length;

					if (length === 0) {
						next();
					}

					else {

						let i = -1;

						RUN((self) => {

							i += 1;

							if (i + 1 < length) {

								// if shrink
								if (array.length === length - 1) {
									i -= 1;
									length -= 1;
								}

								f(array[i], self, i);

							} else {
								f(array[i], next, i);
							}
						});
					}
				}

				else if (data !== undefined) {

					let length = dataKeys.length;

					if (length === 0) {
						next();
					}

					else {

						let i = -1;

						RUN((self) => {

							i += 1;

							if (i + 1 < length) {

								// if shrink
								if (dataKeys.length === length - 1) {
									i -= 1;
									length -= 1;
								}

								let key = dataKeys[i];

								f(data[key], self, key);

							} else {

								let key = dataKeys[i];

								f(data[key], next, key);
							}
						});
					}
				}

				else {
					f(next);
				}
			}
		});
	}
});
