/*
 * HTML h4 태그와 대응되는 클래스
 */
global.H4 = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'h4'
		};
	}
});
