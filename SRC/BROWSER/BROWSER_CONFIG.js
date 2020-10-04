/*
 * 웹 브라우저 환경에서의 기본 설정
 */
global.BROWSER_CONFIG = {

	isSecure: location.protocol === 'https:',
	host: location.hostname,
	port: location.port === '' ? (location.protocol === 'https:' ? 443 : 80) : INTEGER(location.port)

	// 자동으로 UPPERCASE 서버에 접속하는 것을 원치 않은 경우 true로 설정
	// isNotToConnectToServer
};
