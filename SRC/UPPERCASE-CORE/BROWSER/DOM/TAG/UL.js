/*
 * HTML ul 태그와 대응되는 클래스
 */
global.UL = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'ul'
		};
	}
});
