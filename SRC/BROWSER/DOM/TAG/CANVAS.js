/*
 * HTML canvas 태그와 대응되는 클래스
 */
global.CANVAS = CLASS({

	preset: () => {
		return DOM;
	},

	params: () => {
		return {
			tag: 'canvas'
		};
	},

	init: (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.width
		//OPTIONAL: params.height
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let width;
		let height;

		// init params.
		if (params !== undefined) {
			width = params.width;
			height = params.height;
		}

		let getContext = self.getContext = (contextType) => {
			//REQUIRED: contextType

			return self.getEl().getContext(contextType);
		};

		let setSize = self.setSize = (size) => {
			//REQUIRED: size
			//OPTIONAL: size.width
			//OPTIONAL: size.height

			let el = self.getEl();

			if (size.width !== undefined) {
				width = size.width;
			}

			if (size.height !== undefined) {
				height = size.height;
			}

			if (width !== undefined) {
				el.width = width;
			}

			if (height !== undefined) {
				el.height = height;
			}
		};

		setSize({
			width: width,
			height: height
		});

		let getWidth = self.getWidth = () => {
			return width;
		};

		let getHeight = self.getHeight = () => {
			return height;
		};

		let getDataURL = self.getDataURL = () => {
			return self.getEl().toDataURL();
		};
	}
});
