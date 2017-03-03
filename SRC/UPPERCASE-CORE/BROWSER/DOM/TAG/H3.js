/*
 * HTML h3 태그와 대응되는 클래스
 */
global.H3 = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'h3'
		};
	}
});
