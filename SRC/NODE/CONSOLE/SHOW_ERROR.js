/*
 * 콘솔에 오류 메시지를 출력합니다.
 */
global.SHOW_ERROR = (tag, errorMsg, params) => {
	//REQUIRED: tag
	//REQUIRED: errorMsg
	//OPTIONAL: params

	let cal = CALENDAR();

	console.error(CONSOLE_RED(cal.getYear() + '-' + cal.getMonth(true) + '-' + cal.getDate(true) + ' ' + cal.getHour(true) + ':' + cal.getMinute(true) + ':' + cal.getSecond(true) + ' [' + tag + '] 오류가 발생했습니다. 오류 메시지: ' + errorMsg));

	if (params !== undefined) {
		console.error(CONSOLE_RED('다음은 오류를 발생시킨 파라미터입니다.'));
		console.error(CONSOLE_RED(JSON.stringify(params, TO_DELETE, 4)));
	}
};

FOR_BOX((box) => {

	box.SHOW_ERROR = METHOD({

		run: (tag, errorMsg, params) => {
			//REQUIRED: tag
			//REQUIRED: errorMsg
			//OPTIONAL: params

			SHOW_ERROR(box.boxName + '.' + tag, errorMsg, params);
		}
	});
});