UADMIN.LoadingPanel = CLASS({

	preset : function() {
		'use strict';

		return UUI.LOADING;
	},

	params : function() {
		'use strict';
		
		return {
			style : {
				backgroundColor : '#000',
				padding : '10px 20px',
				border : '1px solid #666',
				borderRadius : 10,
				fontWeight : 'bold'
			},
			msg : 'LOADING...'
		};
	}
});
