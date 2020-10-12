/*
 * HTML span 태그와 대응되는 클래스
 */
global.SPAN = CLASS({

	preset: () => {
		return DOM;
	},

	params: () => {
		return {
			tag: 'span'
		};
	}
});
