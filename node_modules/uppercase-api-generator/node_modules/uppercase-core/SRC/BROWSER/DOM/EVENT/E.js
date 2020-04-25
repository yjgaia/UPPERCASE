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
		
		let isBubblingStoped;

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
			isBubblingStoped = true;
		};
		
		let checkIsBubblingStoped = self.checkIsBubblingStoped = () => {
			return isBubblingStoped;
		};

		let stop = self.stop = () => {
			stopDefault();
			stopBubbling();
		};

		let getLeft = self.getLeft = () => {
			
			if (
			INFO.checkIsTouchDevice() === true &&
			e.changedTouches !== undefined &&
			e.changedTouches[0] !== undefined) {
				
				let touchPageX;

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

			return e.pageX;
		};

		let getTop = self.getTop = () => {

			if (
			INFO.checkIsTouchDevice() === true &&
			e.changedTouches !== undefined &&
			e.changedTouches[0] !== undefined) {
				
				let touchPageY;

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

			return e.pageY;
		};
		
		let getPositions = self.getPositions = () => {
			
			if (
			INFO.checkIsTouchDevice() === true &&
			e.changedTouches !== undefined &&
			e.changedTouches[0] !== undefined) {
				
				let positions = [];
				
				EACH(e.changedTouches, (touch) => {
					positions.push({
						left : touch.pageX,
						top : touch.pageY
					});
				});
				
				return positions;
			}
			
			return [{
				left : e.pageX,
				top : e.pageY
			}];
		};

		let getKey = self.getKey = () => {
			return e.key;
		};

		let getButtonIndex = self.getButtonIndex = () => {
			return e.button;
		};
		
		let getWheelDelta = self.getWheelDelta = () => {
			return e.deltaY * (INFO.getBrowserName() === 'Firefox' ? 33 : 1);
		};
		
		let getGamePadData = self.getGamePadData = () => {
			return e.gamepad;
		};
		
		let getFiles = self.getFiles = () => {
			return e.dataTransfer.files;
		};
		
		let getClipboardItems = self.getClipboardItems = () => {
			return e.clipboardData === undefined || e.clipboardData.items === undefined ? [] : e.clipboardData.items;
		};
	}
});
