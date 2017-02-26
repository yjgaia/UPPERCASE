/*
 * HTML li 태그와 대응되는 클래스
 */
global.LI = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'li'
		};
	}
});
