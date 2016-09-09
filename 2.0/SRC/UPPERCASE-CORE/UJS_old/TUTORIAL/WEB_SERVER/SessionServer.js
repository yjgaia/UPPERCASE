// load UJS.
require('../../UJS-NODE.js');

var
// sessions
sessions = {};

WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {

    var
    // session key
    sessionKey = requestInfo.cookies.__SESSION_KEY,

    // session
    session;

    if (sessionKey !== undefined) {
        session = sessions[sessionKey];
        
        // 세션이 없으면 세션 생성
        if (session === undefined) {
            sessions[sessionKey] = {
                // 세션 내용
                data : 'This is session data.',
                // 30 분 이후에 자동 삭제
                removeAfterSeconds : 30 * 60
            };
            console.log('create session.');
        }
        
        // 세션이 있으면 내용 출력
        else {
        	console.log(session.data);
        }
    }

    response({
        content : 'Welcome to UJS web server!',
		// 세션키가 없으면 세션 키 생성
        headers : sessionKey !== undefined ? undefined : {
            'Set-Cookie' : CREATE_COOKIE_STR_ARRAY({
                __SESSION_KEY : RANDOM_STR(40)
            })
        }
    });
});
