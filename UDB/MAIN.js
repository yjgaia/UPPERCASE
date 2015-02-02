UDB.MAIN = METHOD({

	run : function() {
		'use strict';
		
		GET('__MODEL_NAMES', function(modelNamesStr) {
			
			UDB.MODEL_NAMES = PARSE_STR(modelNamesStr);
			
			UDB.MATCH_VIEW({
				uri : ['**'],
				target : UDB.Layout
			});
			
			UDB.MATCH_VIEW({
				uri : [''],
				target : UDB.Home
			});
			
			UDB.MATCH_VIEW({
				uri : ['{modelName}'],
				target : UDB.Detail
			});
		});
	}
});
