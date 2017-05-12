/*
 * 빈 이벤트 정보를 제공하는 객체를 생성하는 EMPTY_E 클래스
 */
global.EMPTY_E = CLASS({

	init : (inner, self) => {

		let stopDefault = self.stopDefault = () => {
			// ignore.
		};

		let stopBubbling = self.stopBubbling = () => {
			// ignore.
		};

		let stop = self.stop = () => {
			// ignore.
		};

		let getLeft = self.getLeft = () => {
			return -Infinity;
		};

		let getTop = self.getTop = () => {
			return -Infinity;
		};

		let getKey = self.getKey = () => {
			return '';
		};
		
		let getWheelDelta = self.getWheelDelta = () => {
			return 0;
		};
	}
});
