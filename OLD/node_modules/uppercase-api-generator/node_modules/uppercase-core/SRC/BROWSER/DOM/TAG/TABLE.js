/*
 * HTML table 태그와 대응되는 클래스
 */
global.TABLE = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'table'
		};
	}
});
