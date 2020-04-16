/*
 * 비밀번호를 주어진 키를 이용하여 HMAC SHA512 알고리즘으로 암호화합니다.
 */
global.SHA512 = METHOD({

	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.password
		//REQUIRED: params.key

		let password = String(params.password);
		let key = String(params.key);
		
		let hash = __SHA512_LIB.hmac.create(key);
		hash.update(password);

		return hash.hex();
	}
});
