/**
 * HTTP GET 요청을 보냅니다.
 */
global.GET = METHOD(function(m) {
	'use strict';
	
	var
	//IMPORT: URL
	URL = require('url');
	
	return {

		run : function(urlOrParams, responseListenerOrListeners) {
			//REQUIRED: urlOrParams
			//REQUIRED: urlOrParams.host
			//OPTIONAL: urlOrParams.port
			//OPTIONAL: urlOrParams.isSecure	https인지 여부
			//REQUIRED: urlOrParams.uri
			//OPTIONAL: urlOrParams.paramStr
			//OPTIONAL: urlOrParams.data		요청 대상이 UPPERCASE기반 서버인 경우 데이터를 전송할 수 있습니다.
			//OPTIONAL: urlOrParams.headers
			//REQUIRED: responseListenerOrListeners
			
			var
			// url data
			urlData,
			
			// params
			params;
			
			if (CHECK_IS_DATA(urlOrParams) !== true) {
				
				urlData = URL.parse(urlOrParams);
				
				params = {
					host : urlData.hostname === TO_DELETE ? undefined : urlData.hostname,
					port : urlData.port === TO_DELETE ? undefined : INTEGER(urlData.port),
					isSecure : urlData.protocol === 'https:',
					uri : urlData.pathname === TO_DELETE ? undefined : urlData.pathname.substring(1),
					paramStr : urlData.query === TO_DELETE ? undefined : urlData.query
				};
					
			} else {
				params = urlOrParams;
			}
	
			REQUEST(COMBINE([params, {
				method : 'GET'
			}]), responseListenerOrListeners);
		}
		};
	});
