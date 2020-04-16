TEST('LAUNCH_ROOM_SERVER', (check) => {
	
	LAUNCH_ROOM_SERVER({
		socketServerPort : 9126,
		webServer : WEB_SERVER(9127)
	});
});
