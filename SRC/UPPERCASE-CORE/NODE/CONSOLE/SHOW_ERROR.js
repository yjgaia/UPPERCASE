/*
 * 콘솔에 에러 메시지를 붉은색으로 출력합니다.
 */
global.SHOW_ERROR = function() {
	
	var
	// args
	args = Array.prototype.slice.call(arguments);
	
	if (args[0] !== undefined) {
		args[0] = CONSOLE_RED(args[0]);
	}
	
	args.push(new Date());
	
	return console.log.apply(console, args);
};