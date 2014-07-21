INIT_OBJECTS();

FOR_BOX(function(box) {
	if (box.MAIN !== undefined) {
		box.MAIN();
	}
});

CONNECT_TO_ROOM_SERVER({
	port : CONFIG.webSocketServerPort,
	fixServerPort : CONFIG.webSocketFixServerPort
});
