/*
 * Node.js 환경에서의 기본 설정
 */
global.NODE_CONFIG = {

	isSingleCoreMode: false,

	// DB에서 find를 수행할 때 최대로 가져올 데이터의 개수
	maxDataCount: 1000,

	// 룸 서버를 사용하지 않을지 여부 설정
	isNotUsingRoomServer: false

	// maxUploadFileMB
	// isNotToModelInitialize
};
