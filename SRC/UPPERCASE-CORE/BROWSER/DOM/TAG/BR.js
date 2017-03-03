/*
 * HTML br 태그와 대응되는 클래스
 */
global.BR = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'br'
		};
	}
});
