const PORT = 8810;

const IS_TO_CREATE_SERVER = true;
//const IS_TO_CREATE_SERVER = false;

// 모듈 로드
require('uppercase');

RUN(() => {
	
	// 리소스 캐싱을 수행하지 않습니다.
	CONFIG.isDevMode = true;
	
	BOX('UPPERCASE');
	BOX('TestBox');
	
	INIT_OBJECTS();
	
	// Node.js 환경에서의 테스트 실행
	//require('./UPPERCASE-CORE/__TEST_NODE.js');
	//require('./UPPERCASE-ROOM/__TEST_NODE.js');
	//require('./UPPERCASE-DB/__TEST_NODE.js');
	//require('./UPPERCASE-MODEL/__TEST_NODE.js');
	
	if (IS_TO_CREATE_SERVER === true) {
		
		/*WEB_SERVER_HTTP2({
			securedPort : PORT,
			securedKeyFilePath : './UPPERCASE-CORE/localhost.key',
			securedCertFilePath : './UPPERCASE-CORE/localhost.crt',
			rootPath : __dirname
		}, (requestInfo, response, replaceRootPath, next) => {*/
		WEB_SERVER({
			port : PORT,
			rootPath : __dirname
		}, (requestInfo, response, replaceRootPath, next) => {
			
			let uri = requestInfo.uri;
			let method = requestInfo.method;
			let params = requestInfo.params;
			
			if (uri.substring(0, 10) === 'UPPERCASE/') {
				requestInfo.uri = uri.substring(10);
				replaceRootPath(__dirname + '/..');
			}
			
			if (uri === 'request_test') {
		
				console.log(method, params);
				
				response({
					content : 'Request DONE!',
					headers : {
						'Access-Control-Allow-Origin' : '*'
					}
				});
			
			} else if (uri === 'request_test_json') {
		
				console.log(method, params);
		
				response({
					content : '{ "thisis" : "JSON" }',
					headers : {
						'Access-Control-Allow-Origin' : '*'
					}
				});
			}
		});
		
		console.log(CONSOLE_GREEN('UPPERCASE 테스트 콘솔을 실행하였습니다. 웹 브라우저에서 [http://localhost:' + PORT + ']로 접속해주시기 바랍니다.'));
	}
});