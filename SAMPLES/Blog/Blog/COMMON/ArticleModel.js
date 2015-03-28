Blog.ArticleModel = OBJECT({

	preset : function() {
		'use strict';

		return Blog.MODEL;
	},

	params : function() {
		'use strict';

		var
		// valid data set
		validDataSet = {
			
			title : {
				notEmpty : true,
				size : {
					max : 255
				}
			},
			
			content : {
				notEmpty : true,
				size : {
					max : 10000
				}
			}
		};

		return {
			name : 'Article',
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				},
				update : {
					valid : VALID(validDataSet)
				}
			}
		};
	}
});
