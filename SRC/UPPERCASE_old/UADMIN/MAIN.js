UADMIN.MAIN = METHOD({

	run : function() {
		'use strict';
		
		var
		// loading panel
		loadingPanel = UADMIN.LoadingPanel();
		
		GET('__MODEL_NAME_MAP', function(json) {
			
			UADMIN.MODEL_NAME_MAP = PARSE_STR(json);
			
			UADMIN.MATCH_VIEW({
				uri : '**',
				target : UADMIN.Layout
			});
			
			UADMIN.MATCH_VIEW({
				uri : '',
				target : UADMIN.Home
			});
			
			UADMIN.MATCH_VIEW({
				uri : ['{boxName}/{modelName}', '{boxName}/{modelName}/p/{page}', '{boxName}/{modelName}/p/{page}/{filter}'],
				target : UADMIN.List
			});
			
			UADMIN.MATCH_VIEW({
				uri : '{boxName}/{modelName}/{id}',
				target : UADMIN.Detail
			});
			
			UADMIN.MATCH_VIEW({
				uri : ['{boxName}/{modelName}/f/new', '{boxName}/{modelName}/{id}/f/update'],
				target : UADMIN.Form
			});
			
			loadingPanel.remove();
		});
	}
});
