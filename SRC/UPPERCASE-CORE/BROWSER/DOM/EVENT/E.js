/*
 * 이벤트 정보를 제공하는 객체를 생성하는 E 클래스
 */
global.E = CLASS({

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.e
		//REQUIRED: params.el
		
		let e = params.e;
		let el = params.el;

		let checkIsDescendant = (parent, child) => {

			let node = child.parentNode;

			while (node !== TO_DELETE) {

				if (node === parent) {
					return true;
				}

				node = node.parentNode;
			}

			return false;
		};

		let stopDefault = self.stopDefault = () => {
			e.preventDefault();
		};

		let stopBubbling = self.stopBubbling = () => {
			e.stopPropagation();
		};

		let stop = self.stop = () => {
			stopDefault();
			stopBubbling();
		};

		let getLeft = self.getLeft = () => {
			
			// if is touch mode
			if (INFO.checkIsTouchMode() === true) {
				
				let touchPageX;

				if (e.touches !== undefined && e.touches[0] !== undefined) {

					// first touch position.

					EACH(e.touches, (touch) => {
						if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
							touchPageX = touch.pageX;
							return false;
						}
					});

					if (touchPageX === undefined) {
						touchPageX = e.touches[0].pageX;
					}

					if (touchPageX !== undefined) {
						return touchPageX;
					}
				}

				if (e.changedTouches !== undefined && e.changedTouches[0] !== undefined) {

					// first touch position.

					EACH(e.changedTouches, (touch) => {
						if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
							touchPageX = touch.pageX;
							return false;
						}
					});

					if (touchPageX === undefined) {
						touchPageX = e.changedTouches[0].pageX;
					}

					if (touchPageX !== undefined) {
						return touchPageX;
					}
				}
			}

			return e.pageX;
		};

		let getTop = self.getTop = () => {

			// if is touch mode
			if (INFO.checkIsTouchMode() === true) {
				
				let touchPageY;

				if (e.touches !== undefined && e.touches[0] !== undefined) {

					// first touch position.

					EACH(e.touches, (touch) => {
						if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
							touchPageY = touch.pageY;
							return false;
						}
					});

					if (touchPageY === undefined) {
						touchPageY = e.touches[0].pageY;
					}

					if (touchPageY !== undefined) {
						return touchPageY;
					}
				}

				if (e.changedTouches !== undefined && e.changedTouches[0] !== undefined) {

					// first touch position.

					EACH(e.changedTouches, (touch) => {
						if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
							touchPageY = touch.pageY;
							return false;
						}
					});

					if (touchPageY === undefined) {
						touchPageY = e.changedTouches[0].pageY;
					}

					if (touchPageY !== undefined) {
						return touchPageY;
					}
				}
			}

			return e.pageY;
		};

		let getKey = self.getKey = () => {
			return e.key;
		};
		
		let getWheelDelta = self.getWheelDelta = () => {
			return e.deltaY;
		};
	}
});
