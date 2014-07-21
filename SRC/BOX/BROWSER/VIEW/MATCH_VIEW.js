FOR_BOX(function(box) {'use strict';

	/**
	 * Match view.
	 */
	box.MATCH_VIEW = METHOD({

		run : function(params) {
			//REQUIRED: params
			//REQUIRED: params.uris
			//REQUIRED: params.target

			var
			// uris
			uris = params.uris,

			// target
			target = params.target,

			// view
			view,

			// pre params
			preParams;

			EVENT({
				name : 'hashchange'
			}, RAR(function() {

				var
				// hash uri parts
				hashURIParts,

				// is not found
				isNotFound;

				hashURIParts = location.hash.substring(1).split('/');

				if (location.hash === '#__REFRESING') {
					isNotFound = true;
				} else {

					isNotFound = EACH(uris, function(uri, i) {

						var
						// uri parts
						uriParts = uri.split('/'),

						// params
						params = {},

						// is matched
						isMatched,

						// f.
						f;

						f = function() {

							var
							// b
							b = EACH(hashURIParts, function(hashURIPart, i) {

								var
								// uri part
								uriPart = uriParts[i];

								// when other box view.
								if (i === 0 && box.boxName !== hashURIPart && BOX.getBoxes()[hashURIPart] !== undefined) {
									isMatched = false;
									return false;
								}

								if (uriPart === '**') {
									isMatched = true;
									return false;
								}

								if (uriPart === undefined) {
									return false;
								}

								if (uriPart.charAt(0) === '{' && uriPart.charAt(uriPart.length - 1) === '}') {
									params[uriPart.substring(1, uriPart.length - 1)] = hashURIPart;
								} else if (uriParts[i] !== hashURIPart && uriPart !== '*') {
									return false;
								}

								if (hashURIParts.length - 1 === i && uriParts.length - 1 > i && uriParts[uriParts.length - 1] !== '') {
									return false;
								}
							});

							if (isMatched === undefined) {
								isMatched = b;
							}
						};

						if (box.boxName === CONFIG.defaultBoxName) {
							f();
						}

						if (isMatched !== true) {
							uriParts.unshift(box.boxName);
							f();
						}

						if (isMatched === true) {

							DELAY(function() {

								if (view === undefined) {

									view = target();
									view.onChangeParams(params);
									target.lastView = view;

									preParams = params;

								} else if (CHECK_ARE_SAME_DATA_SET({
									data1 : preParams,
									data2 : params
								}) !== true) {

									view.onChangeParams(params);
									preParams = params;
								}
							});

							return false;
						}
					});
				}

				if (isNotFound === true && view !== undefined) {
					view.close();
					view = undefined;
					target.lastView = undefined;
				}
			}));
		}
	});
});
