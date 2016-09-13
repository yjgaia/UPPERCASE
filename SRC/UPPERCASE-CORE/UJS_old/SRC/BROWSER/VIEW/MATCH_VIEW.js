/**
 * match view.
 */
global.MATCH_VIEW = METHOD(function(m) {
	'use strict';
	
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
			changeURIHandler = function() {
	
				var
				// uri
				uri = URI(),
	
				// result
				result,
	
				// uri parmas
				uriParams;
	
				// when view founded
				if (uri !== REFRESH.getRefreshingURI() && ( result = uriMatcher.check(uri)).checkIsMatched() === true && (excludeURI === undefined || excludeURIMatcher.check(uri).checkIsMatched() !== true)) {
	
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
					
					view.runURIChangeHandlers(uri);
				}
	
				// when view not founded, close before view
				else if (view !== undefined) {
	
					view.close();
	
					view = undefined;
					target.lastView = undefined;
				}
			};
			
			changeURIHandlers.push(changeURIHandler);
	
			EVENT('popstate', function() {
				changeURIHandler();
			});
			
			changeURIHandler();
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	box.MATCH_VIEW = METHOD({

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

			// new uris
			newURIs = [],
			
			// new exclude uris
			newExcludeURIs = [],

			// push uri.
			pushURI = function(uri) {

				if (box.boxName === CONFIG.defaultBoxName) {
					newURIs.push(uri);
				}

				newURIs.push(box.boxName + '/' + uri);
			},

			// push exclude uri.
			pushExcludeURI = function(uri) {

				if (box.boxName === CONFIG.defaultBoxName) {
					newExcludeURIs.push(uri);
				}

				newExcludeURIs.push(box.boxName + '/' + uri);
			};

			if (CHECK_IS_ARRAY(uri) === true) {
				EACH(uri, pushURI);
			} else {
				pushURI(uri);
			}
			
			if (excludeURI !== undefined) {
				if (CHECK_IS_ARRAY(excludeURI) === true) {
					EACH(excludeURI, pushExcludeURI);
				} else {
					pushExcludeURI(excludeURI);
				}
			}

			MATCH_VIEW({
				uri : newURIs,
				excludeURI : newExcludeURIs,
				target : target
			});
		}
	});
});
