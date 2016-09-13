/**
 * HTTP PUT 요청을 보냅니다.
 */
global.PUT = METHOD({

	run : function(params, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.host
		//OPTIONAL: params.port
		//OPTIONAL: params.isSecure	https인지 여부
		//OPTIONAL: params.uri
		//OPTIONAL: params.paramStr
		//OPTIONAL: params.data		요청 대상이 UPPERCASE기반 서버인 경우 데이터를 전송할 수 있습니다.
		//OPTIONAL: params.headers
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE([params, {
			method : 'PUT'
		}]), responseListenerOrListeners);
	}
});
