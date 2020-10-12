/*
 * 알파벳 대, 소문자와 숫자로 이루어진 임의의 문자열을 생성합니다.
 */
global.RANDOM_STR = METHOD(() => {

	const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	return {

		run: (length) => {
			//REQUIRED: length

			let randomStr = '';

			REPEAT(length, () => {

				// add random character to random string.
				randomStr += CHARACTERS.charAt(RANDOM({
					limit: CHARACTERS.length
				}));
			});

			return randomStr;
		}
	};
});
