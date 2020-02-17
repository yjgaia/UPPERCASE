/*
 * UPPERCASE의 모든 모듈들을 불러옵니다.
 */
require('./UPPERCASE-CORE/NODE.js');
require('./UPPERCASE-ROOM/NODE.js');
require('./UPPERCASE-DB/NODE.js');
require('./UPPERCASE-MODEL/NODE.js');
require('./UPPERCASE-BOOT/NODE.js');

module.exports = (value) => {
	return String(value).toUpperCase();
};
