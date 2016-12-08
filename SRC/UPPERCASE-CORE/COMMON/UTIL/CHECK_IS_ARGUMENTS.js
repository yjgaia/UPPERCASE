/**
 * target이 JavaScript arguments인지 확인합니다.
 */
global.CHECK_IS_ARGUMENTS = METHOD({

	run : function(target) {'use strict';
		//OPTIONAL: target

		if (
		target !== undefined &&
		target !== TO_DELETE &&
		typeof target === 'object' &&
		(
			Object.prototype.toString.call(target) === '[object Arguments]' ||
			(
				target.callee !== undefined &&
				typeof target.callee === 'function'
			)
		)) {
			return true;
		}

		return false;
	}
});
