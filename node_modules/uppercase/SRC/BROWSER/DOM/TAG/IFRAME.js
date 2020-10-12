/*
 * HTML iframe 태그와 대응되는 클래스
 */
global.IFRAME = CLASS({

	preset: () => {
		return DOM;
	},

	params: () => {

		return {
			tag: 'iframe',
			style: {
				border: 'none'
			}
		};
	},

	init: (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.name
		//OPTIONAL: params.src
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let name;
		let src;

		// init params.
		if (params !== undefined) {
			name = params.name;
			src = params.src;
		}

		if (name !== undefined) {
			inner.setAttr({
				name: 'name',
				value: name
			});
		}

		let setSrc = self.setSrc = (_src) => {
			//REQUIRED: _src

			src = _src;

			inner.setAttr({
				name: 'src',
				value: src
			});
		};

		if (src !== undefined) {
			setSrc(src);
		}

		let getSrc = self.getSrc = () => {
			return src;
		};
	}
});
