UADMIN.MAIN = METHOD({

	run : function() {
		'use strict';
		
		GET('__MODEL_NAME_MAP', function(json) {
			
			UADMIN.MODEL_NAME_MAP = PARSE_STR(json);
			
			UADMIN.MATCH_VIEW({
				uri : ['**'],
				target : UADMIN.Layout
			});
			
			UADMIN.MATCH_VIEW({
				uri : [''],
				target : UADMIN.Home
			});
			
			UADMIN.MATCH_VIEW({
				uri : ['{boxName}/{modelName}'],
				target : UADMIN.List
			});
			
			UADMIN.MATCH_VIEW({
				uri : ['{boxName}/{modelName}/{id}'],
				target : UADMIN.Detail
			});
			
			UADMIN.MATCH_VIEW({
				uri : ['{boxName}/{modelName}/f/new'],
				target : UADMIN.Form
			});
			
			UADMIN.MATCH_VIEW({
				uri : ['{boxName}/{modelName}/{id}/f/update'],
				target : UADMIN.Form
			});
		});
	}
});
