/*
 * A class
 */
global.A = CLASS({

	preset: () => {
		return DOM;
	},

	params: () => {
		return {
			tag: 'a'
		};
	},

	init: (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.href		이동할 경로
		//OPTIONAL: params.target	이동할 타겟
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let style;
		let href;
		let target;

		// init params.
		if (params !== undefined) {
			style = params.style;
			href = params.href;
			target = params.target;
		}

		let setHref = self.setHref = (href) => {
			inner.setAttr({
				name: 'href',
				value: href
			});
		};

		if (href !== undefined) {
			setHref(href);
		}

		if (target !== undefined) {
			inner.setAttr({
				name: 'target',
				value: target
			});
		}

		let tap = self.tap = () => {

			EVENT.fireAll({
				node: self,
				name: 'tap'
			});
		};

		let getHref = self.getHref = () => {
			return href;
		};
	},

	afterInit: (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.href		이동할 경로
		//OPTIONAL: params.target	이동할 타겟
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let children;
		let href;

		let isHrefContent = false;

		let append;
		let prepend;

		// init params.
		if (params !== undefined) {
			children = params.c;
			href = params.href;
		}

		// 아무런 내용이 없으면 이동할 경로를 그대로 표시합니다.
		if (children === undefined && href !== undefined) {

			self.append(href);

			isHrefContent = true;

			OVERRIDE(self.append, (origin) => {

				append = self.append = (node) => {
					//REQUIRED: node

					if (isHrefContent === true) {
						self.empty();
						isHrefContent = false;
					}

					origin(node);
				};
			});

			OVERRIDE(self.prepend, (origin) => {

				prepend = self.prepend = (node) => {
					//REQUIRED: node

					if (isHrefContent === true) {
						self.empty();
						isHrefContent = false;
					}

					origin(node);
				};
			});
		}
	}
});
