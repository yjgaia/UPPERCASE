/**
 * 웹 브라우저 환경에서의 기본 설정
 */
global.BROWSER_CONFIG = {
	
	host : location.hostname,
	
	port : location.port === '' ? (location.protocol === 'https:' ? 443 : 80) : INTEGER(location.port),
	
	isSecure : location.protocol === 'https:'
};
