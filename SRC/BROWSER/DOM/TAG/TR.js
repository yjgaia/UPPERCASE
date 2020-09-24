/*
 * HTML tr 태그와 대응되는 클래스
 */
global.TR = CLASS({

	preset: () => {
		return DOM;
	},

	params: () => {
		return {
			tag: 'tr'
		};
	}
});
