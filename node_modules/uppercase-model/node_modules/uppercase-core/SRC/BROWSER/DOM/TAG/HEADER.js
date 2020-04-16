/*
 * HTML header 태그와 대응되는 클래스
 */
global.HEADER = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'header'
		};
	}
});
