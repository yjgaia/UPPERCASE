/*
 * 특정 URI와 뷰를 연결합니다.
 */
global.MATCH_VIEW = METHOD((m) => {
	
	let changeURIHandlers = [];
	
	let checkAll = m.checkAll = () => {
		EACH(changeURIHandlers, (changeURIHandler) => {
			changeURIHandler();
		});
	};
	
	return {

		run : (params) => {
			//REQUIRED: params
			//REQUIRED: params.uri
			//OPTIONAL: params.excludeURI
			//REQUIRED: params.target

			let uri = params.uri;
			let excludeURI = params.excludeURI;
			let target = params.target;
			
			let uriMatcher = URI_MATCHER(uri);
			let excludeURIMatcher = excludeURI === undefined ? undefined : URI_MATCHER(excludeURI);
	
			let view;
			let preParams;
			
			let changeURIHandler = () => {
	
				let uri = URI();
				let result;
	
				// when view founded
				if (
				uri !== REFRESH.getRefreshingURI() &&
				(result = uriMatcher.check(uri)).checkIsMatched() === true &&
				(excludeURI === undefined || excludeURIMatcher.check(uri).checkIsMatched() !== true)) {

					let uriParams = result.getURIParams();
	
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
			
			// when protocol is 'file:', use hashbang.
			if (location.protocol === 'file:') {
				EVENT('hashchange', () => {
					changeURIHandler();
				});
			}
			
			else {
				EVENT('popstate', () => {
					changeURIHandler();
				});
			}
			
			changeURIHandler();
		}
	};
});

FOR_BOX((box) => {

	box.MATCH_VIEW = METHOD({

		run : (params) => {
			//REQUIRED: params
			//REQUIRED: params.uri
			//OPTIONAL: params.excludeURI
			//REQUIRED: params.target

			let uri = params.uri;
			let excludeURI = params.excludeURI;
			let target = params.target;

			let newURIs = [];
			let newExcludeURIs = [];

			let pushURI = (uri) => {

				if (box.boxName === CONFIG.defaultBoxName) {
					newURIs.push(uri);
				}

				newURIs.push(box.boxName + '/' + uri);
			};

			let pushExcludeURI = (uri) => {

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
