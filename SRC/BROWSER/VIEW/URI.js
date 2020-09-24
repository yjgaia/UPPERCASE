/*
 * 현재 브라우저의 URI를 가져옵니다.
 */
global.URI = METHOD({

	run: () => {

		// when protocol is 'file:' or extension, use hashbang.
		if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {
			return location.hash.substring(3);
		} else {
			return decodeURIComponent(location.pathname.substring(1));
		}
	}
});
