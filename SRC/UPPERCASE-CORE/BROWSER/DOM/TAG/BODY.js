/*
 * HTML body 태그와 대응되는 객체
 */
global.BODY = OBJECT({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'body'
		};
	}
});
