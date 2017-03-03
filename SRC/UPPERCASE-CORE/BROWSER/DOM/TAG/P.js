/*
 * HTML p 태그와 대응되는 클래스
 */
global.P = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'p'
		};
	}
});
