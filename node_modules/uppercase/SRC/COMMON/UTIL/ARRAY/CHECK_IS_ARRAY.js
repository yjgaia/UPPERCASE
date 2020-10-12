/*
 * target이 배열인지 확인합니다.
 */
global.CHECK_IS_ARRAY = METHOD({

	run: (target) => {
		//OPTIONAL: target

		if (
			target !== undefined &&
			target !== TO_DELETE &&
			typeof target === 'object' &&
			Object.prototype.toString.call(target) === '[object Array]'
		) {
			return true;
		}

		return false;
	}
});
