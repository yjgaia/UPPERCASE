/*
 * HTML div 태그와 대응되는 클래스
 */
global.DIV = CLASS({

	preset: () => {
		return DOM;
	},

	params: () => {
		return {
			tag: 'div'
		};
	}
});
