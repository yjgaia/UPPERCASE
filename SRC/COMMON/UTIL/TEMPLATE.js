/*
 * 메시지의 특정 부분들을 바꿀 수 있는 템플릿 클래스
 */
global.TEMPLATE = CLASS({

	init: (inner, self, originMessage) => {

		let messages = [originMessage];

		let replace = self.replace = (key, message) => {

			EACH(messages, (m, i) => {

				if (typeof m === 'string') {

					let keyIndex = m.indexOf(key);
					if (keyIndex !== -1) {

						let start = m.substring(0, keyIndex);
						let end = m.substring(keyIndex + key.length);

						messages.splice(i, 1, end);
						messages.splice(i, 0, message);
						messages.splice(i, 0, start);
					}
				}
			});
		};

		let getMessages = self.getMessages = () => {
			return messages;
		};
	}
});
