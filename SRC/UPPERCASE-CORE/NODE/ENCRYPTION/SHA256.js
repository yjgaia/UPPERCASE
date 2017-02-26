/*
 * 비밀번호를 주어진 키를 이용하여 HMAC SHA256 알고리즘으로 암호화 합니다.
 */
global.SHA256 = METHOD({

	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.password
		//REQUIRED: params.key

		let password = params.password;
		let key = params.key;
		
		let crypto = require('crypto');

		return crypto.createHmac('sha256', key).update(password).digest('hex');
	}
});
