/*
 * UPPERCASE의 모든 모듈들을 불러옵니다.
 */
require('uppercase-boot');

module.exports = (value) => {
	return String(value).toUpperCase();
};
