/*
 * Node-side Configuration
 */
OVERRIDE(NODE_CONFIG, (origin) => {

	global.NODE_CONFIG = COMBINE([{
		
		isSingleCoreMode : false,
		
		// maxUploadFileMB
		
		// isNotToModelInitialize
		
		// 룸 서버를 사용하지 않을지 여부 설정
		isNotUsingRoomServer : false
		
	}, origin]);
});
