/*
 * 내부적으로 이벤트를 처리하기 위해 사용되는 EVENT_LOW 클래스
 */
global.EVENT_LOW = CLASS({

	init: (inner, self, nameOrParams, eventHandler) => {
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node		이벤트를 등록 및 적용할 노드
		//OPTIONAL: nameOrParams.lowNode	이벤트 '등록'은 node 파라미터에 지정된 노드에 하지만, 실제 이벤트의 동작을 '적용'할 노드는 다른 경우 해당 노드
		//REQUIRED: nameOrParams.name		이벤트 이름
		//REQUIRED: eventHandler

		let node;
		let lowNode;
		let name;

		let el;

		let innerHandler;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			lowNode = nameOrParams.lowNode;
			name = nameOrParams.name;

			if (lowNode === undefined) {
				lowNode = node;
			}
		}

		if (lowNode !== undefined) {
			el = lowNode.getWrapperEl();
		} else if (
			global['on' + name] === undefined &&
			name !== 'gamepadconnected' &&
			name !== 'gamepaddisconnected'
		) {
			el = document;
		} else {
			el = global;
		}

		el.addEventListener(name, innerHandler = (e) => {

			let result = eventHandler(E({
				e: e,
				el: el
			}), node);

			if (name === 'beforeunload' && result !== undefined) {
				e.returnValue = result;
			}

			return result;

		}, false);

		let remove = self.remove = () => {
			el.removeEventListener(name, innerHandler, false);
		};
	}
});
