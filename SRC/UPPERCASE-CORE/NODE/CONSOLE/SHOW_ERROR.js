/*
 * 콘솔에 에러 메시지를 붉은색으로 출력합니다.
 */
global.SHOW_ERROR = function(tag, errorMsg, params) {
	//REQUIRED: tag
	//REQUIRED: errorMsg
	//OPTIONAL: params
	
	console.log(CONSOLE_RED('[' + tag + '] 오류가 발생했습니다. 오류 메시지: ' + errorMsg));
	
	if (params !== undefined) {
		console.log(CONSOLE_RED('다음은 오류를 발생시킨 파라미터입니다.'));
		console.log(CONSOLE_RED(JSON.stringify(params, TO_DELETE, 4)));
	}
};