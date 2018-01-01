/*
 * clear : 'both' 스타일이 지정된 div를 생성합니다.
 */
global.CLEAR_BOTH = CLASS({

	preset : () => {
		return DIV;
	},

	params : () => {
		return {
			style : {
				clear : 'both'
			}
		};
	}
});
