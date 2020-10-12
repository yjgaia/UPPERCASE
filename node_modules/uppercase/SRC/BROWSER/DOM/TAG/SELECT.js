/*
 * HTML select 태그와 대응되는 클래스
 */
global.SELECT = CLASS({

	preset: () => {
		return DOM;
	},

	params: () => {
		return {
			tag: 'select'
		};
	},

	init: (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.name
		//OPTIONAL: params.placeholder
		//OPTIONAL: params.value
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let name;

		let isCtrlDown = false;

		// init params.
		if (params !== undefined) {
			name = params.name;
		}

		if (name !== undefined) {
			inner.setAttr({
				name: 'name',
				value: name
			});
		}

		let getName = self.getName = () => {
			return name;
		};

		let getValue = self.getValue = () => {
			return self.getEl().value;
		};

		let setValue = self.setValue = (value) => {
			//REQUIRED: value

			if (self.getEl().value !== value) {

				self.getEl().value = value;

				EVENT.fireAll({
					node: self,
					name: 'change'
				});

			} else {
				self.getEl().value = value;
			}
		};

		let select = self.select = () => {
			self.getEl().select();
		};

		let focus = self.focus = () => {
			self.getEl().focus();
		};

		let blur = self.blur = () => {
			self.getEl().blur();
		};

		EVENT({
			node: self,
			name: 'keydown'
		}, (e) => {

			if (e.getKey() === 'Control') {
				isCtrlDown = true;
			} else if (isCtrlDown !== true) {
				e.stopBubbling();
			}
		});

		EVENT({
			node: self,
			name: 'keyup'
		}, (e) => {

			if (e.getKey() === 'Control') {
				isCtrlDown = false;
			}
		});

		EVENT({
			node: self,
			name: 'focus'
		}, () => {
			INPUT.getFocusingInputIds().push(self.id);
		});

		EVENT({
			node: self,
			name: 'blur'
		}, () => {

			REMOVE({
				array: INPUT.getFocusingInputIds(),
				value: self.id
			});
		});

		self.on('remove', () => {

			REMOVE({
				array: INPUT.getFocusingInputIds(),
				value: self.id
			});
		});
	},

	afterInit: (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일을 지정합니다.
		//OPTIONAL: params.name
		//OPTIONAL: params.placeholder
		//OPTIONAL: params.value
		//OPTIONAL: params.c		자식 노드를 지정합니다. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트를 지정합니다.

		let value;

		// init params.
		if (params !== undefined) {
			value = params.value;
		}

		if (value !== undefined) {

			if (self.getEl().value !== value) {
				self.getEl().value = value;
			} else {
				self.getEl().value = value;
			}
		}
	}
});
