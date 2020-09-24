/*
 * Form class
 */
global.FORM = CLASS({

	preset: () => {
		return DOM;
	},

	params: () => {
		return {
			tag: 'form'
		};
	},

	init: (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.action	폼 정보를 전송할 경로
		//OPTIONAL: params.target	경로가 이동될 타겟. 지정하지 않으면 현재 창에서 이동됩니다.
		//OPTIONAL: params.method	요청 메소드. `GET`, `POST`를 설정할 수 있습니다.
		//OPTIONAL: params.enctype	폼을 전송할때 사용할 인코딩 방법. 업로드 기능 구현에 사용됩니다.
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let action;
		let target;
		let method;
		let enctype;

		let getData;
		let setData;

		// init params.
		if (params !== undefined) {
			action = params.action;
			target = params.target;
			method = params.method;
			enctype = params.enctype;
		}

		if (action !== undefined) {

			inner.setAttr({
				name: 'action',
				value: action
			});

		} else {

			EVENT({
				node: self,
				name: 'submit'
			}, (e) => {
				e.stop();
			});
		}

		if (target !== undefined) {
			inner.setAttr({
				name: 'target',
				value: target
			});
		}

		if (method !== undefined) {
			inner.setAttr({
				name: 'method',
				value: method
			});
		}

		if (enctype !== undefined) {
			inner.setAttr({
				name: 'enctype',
				value: enctype
			});
		}

		OVERRIDE(self.setData, (origin) => {

			getData = self.getData = () => {

				let data = origin();

				let f = (node) => {
					//REQUIRED: node

					EACH(node.getChildren(), (child) => {

						if (child.getValue !== undefined && child.getName !== undefined && child.getName() !== undefined) {

							let f2 = (data, name) => {

								if (name.indexOf('.') !== -1) {

									let subName = name.substring(name.indexOf('.') + 1);
									name = name.substring(0, name.indexOf('.'));

									if (data[name] === undefined) {
										data[name] = {};
									}

									f2(data[name], subName);
								}

								else {
									data[name] = child.getValue();
								}
							};

							f2(data, child.getName());
						}

						f(child);
					});
				};

				if (data === undefined) {
					data = {};
				}

				f(self);

				return data;
			};
		});

		OVERRIDE(self.setData, (origin) => {

			setData = self.setData = (data) => {
				//REQUIRED: data

				let f = (node) => {
					//REQUIRED: node

					EACH(node.getChildren(), (child) => {

						if (child.setValue !== undefined && child.getName !== undefined && child.getName() !== undefined) {

							let f2 = (data, name) => {

								if (name.indexOf('.') !== -1) {

									let subName = name.substring(name.indexOf('.') + 1);
									name = name.substring(0, name.indexOf('.'));

									if (data[name] === undefined) {
										data[name] = {};
									}

									f2(data[name], subName);
								}

								else {
									child.setValue(data[name] === undefined ? '' : data[name]);
								}
							};

							f2(data, child.getName());
						}

						f(child);
					});
				};

				f(self);

				origin(data);
			};
		});

		let submit = self.submit = () => {

			EVENT.fireAll({
				node: self,
				name: 'submit'
			});

			if (action !== undefined) {
				self.getEl().submit();
			}
		};
	}
});
