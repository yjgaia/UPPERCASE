/*
 * 콘솔에 경고 메시지를 출력합니다.
 */
global.SHOW_WARNING = function(tag, warningMsg, params) {
	//REQUIRED: tag
	//REQUIRED: warningMsg
	//OPTIONAL: params
	
	console.error(CONSOLE_YELLOW('[' + tag + '] 경고가 발생했습니다. 경고 메시지: ' + warningMsg));
	
	if (params !== undefined) {
		console.error(CONSOLE_YELLOW('다음은 경고를 발생시킨 파라미터입니다.'));
		console.error(CONSOLE_YELLOW(JSON.stringify(params, TO_DELETE, 4)));
	}
};

FOR_BOX(function(box) {

	box.SHOW_WARNING = METHOD({

		run : function(tag, warningMsg, params) {
			//REQUIRED: tag
			//REQUIRED: warningMsg
			//OPTIONAL: params

			SHOW_WARNING(box.boxName + '.' + tag, warningMsg, params);
		}
	});
});