OVERRIDE(MATCH_VIEW, function(origin) {
	'use strict';

	/**
	 * match view.
	 */
	global.MATCH_VIEW = METHOD(function(m) {
		
		var
		// change uri handlers
		changeURIHandlers = [],
		
		// check all.
		checkAll;
		
		m.checkAll = checkAll = function() {
			EACH(changeURIHandlers, function(changeURIHandler) {
				changeURIHandler();
			});
		};
		
		return {
	
			run : function(params) {
				//REQUIRED: params
				//REQUIRED: params.uri
				//OPTIONAL: params.excludeURI
				//REQUIRED: params.target
		
				var
				// uri
				uri = params.uri,
				
				// exclude uri
				excludeURI = params.excludeURI,
		
				// target
				target = params.target,
		
				// uri matcher
				uriMatcher = URI_MATCHER(uri),
				
				// exclude uri matcher
				excludeURIMatcher = excludeURI === undefined ? undefined : URI_MATCHER(excludeURI),
		
				// view
				view,
		
				// pre params
				preParams,
				
				// change uri handler.
				changeURIHandler = RAR(function() {
		
					var
					// hash
					hash = location.hash,
		
					// result
					result,
		
					// uri parmas
					uriParams;
		
					// when view founded
					if (hash !== '#!/' + REFRESH.getRefreshingURI() && ( result = uriMatcher.check(hash.substring(3))).checkIsMatched() === true && (excludeURI === undefined || excludeURIMatcher.check(hash.substring(3)).checkIsMatched() !== true)) {
		
						uriParams = result.getURIParams();
		
						// when before view not exists, create view.
						if (view === undefined) {
		
							view = target();
							view.changeParams(uriParams);
							target.lastView = view;
		
							preParams = uriParams;
						}
		
						// when before view exists, change params.
						else if (CHECK_ARE_SAME([preParams, uriParams]) !== true) {
		
							view.changeParams(uriParams);
							preParams = uriParams;
						}
						
						view.runURIChangeHandlers(hash.substring(3));
					}
		
					// when view not founded, close before view
					else if (view !== undefined) {
		
						view.close();
		
						view = undefined;
						target.lastView = undefined;
					}
				});
		
				changeURIHandlers.push(changeURIHandler);
	
				EVENT({
					name : 'hashchange'
				}, changeURIHandler);
			}
		};
	});
});
