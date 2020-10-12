/*
 * 뷰를 새로 불러옵니다.
 */
global.REFRESH = METHOD((m) => {

	const REFRESHING_URI = '__REFRESHING';

	let getRefreshingURI = m.getRefreshingURI = () => {
		return REFRESHING_URI;
	};

	return {

		run: (uri) => {
			//OPTIONAL: uri

			// when protocol is 'file:' or extension, use hashbang.
			if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {

				let savedHash = uri !== undefined ? '#!/' + uri : location.hash;

				EVENT_ONCE({
					name: 'hashchange'
				}, () => {
					location.replace(savedHash === '' ? '#!/' : savedHash);

					if (savedHash !== '#!/' + uri) {
						history.back();
					}
				});

				location.href = '#!/' + getRefreshingURI();
			}

			else {

				let savedURI = uri !== undefined ? uri : location.pathname.substring(1);

				history.pushState(undefined, undefined, '/' + REFRESHING_URI);
				MATCH_VIEW.checkAll();

				history.replaceState(undefined, undefined, '/' + savedURI);
				MATCH_VIEW.checkAll();

				if (savedURI !== uri) {
					history.back();
				}
			}
		}
	};
});

FOR_BOX((box) => {

	box.REFRESH = METHOD({

		run: (uri) => {
			//OPTIONAL: uri

			REFRESH((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});
