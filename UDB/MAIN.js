UDB.MAIN = METHOD({

	run : function() {
		'use strict';
		
		GET('__MODEL_NAME_MAP', function(json) {
			
			UDB.MODEL_NAME_MAP = PARSE_STR(json);
			
			UDB.MATCH_VIEW({
				uri : ['**'],
				target : UDB.Layout
			});
			
			UDB.MATCH_VIEW({
				uri : [''],
				target : UDB.Home
			});
			
			UDB.MATCH_VIEW({
				uri : ['{boxName}/{modelName}'],
				target : UDB.List
			});
			
			UDB.MATCH_VIEW({
				uri : ['{boxName}/{modelName}/{id}'],
				target : UDB.Detail
			});
		});
	}
});
