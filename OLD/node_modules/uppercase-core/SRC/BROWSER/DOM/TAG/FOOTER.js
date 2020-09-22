/*
 * HTML footer 태그와 대응되는 클래스
 */
global.FOOTER = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'footer'
		};
	}
});
