/*
 * HTML img 태그와 대응되는 클래스
 */
global.IMG = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'img'
		};
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.width
		//OPTIONAL: params.height
		//REQUIRED: params.src		이미지 경로
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		let src = params.src;
		let width = params.width;
		let height = params.height;

		let el = self.getEl();
		
		// CORS 이슈 해결
		el.crossOrigin = 'anonymous';
		
		//OVERRIDE: self.getWidth
		let getWidth = self.getWidth = () => {
			return el.width;
		};

		//OVERRIDE: self.getHeight
		let getHeight = self.getHeight = () => {
			return el.height;
		};

		let setSize = self.setSize = (size) => {
			//REQUIRED: size
			//OPTIONAL: size.width
			//OPTIONAL: size.height

			let width = size.width;
			let height = size.height;

			if (width !== undefined) {
				el.width = width;
			}

			if (height !== undefined) {
				el.height = height;
			}
		};

		setSize({
			width : width,
			height : height
		});

		let getSrc = self.getSrc = () => {
			return src;
		};

		let setSrc = self.setSrc = (_src) => {
			//REQUIRED: _src

			src = _src;

			inner.setAttr({
				name : 'src',
				value : src
			});
		};

		if (src !== undefined) {
			setSrc(src);
		}
	}
});
