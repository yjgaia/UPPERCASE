/*
 * 비밀번호를 주어진 키를 암호화합니다. 같은 키로 한번 더 수행하면, 복호화됩니다.
 */
global.ENCRYPT = METHOD({

	run: (params) => {
		//REQUIRED: params
		//REQUIRED: params.password
		//REQUIRED: params.key

		let password = String(params.password);
		let key = String(params.key);

		let result = '';

		let keyLength = key.length;
		let keyCount = 0;
		for (let i = 0; i < password.length; i += 1) {
			result += String.fromCharCode(password.charCodeAt(i) ^ key.charCodeAt(keyCount));
			keyCount += 1;
			if (keyCount === keyLength) {
				keyCount = 0;
			}
		}

		return result;
	}
});
