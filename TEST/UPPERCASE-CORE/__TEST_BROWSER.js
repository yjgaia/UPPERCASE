RUN(function() {
	'use strict';
	
	var
	// require.
	require = function(path) {
		var script = document.createElement('script');
		script.src = 'UPPERCASE-CORE/' + path;
		document.body.appendChild(script);
	};
	
	// COMMON 테스트
	require('./COMMON/TO_DELETE.js');
	require('./COMMON/METHOD.js');
	
	// 객체지향 관련 기능
	require('./COMMON/OOP/CLASS.js');
	require('./COMMON/OOP/OBJECT.js');
	
	// 숫자 관련 기능
	require('./COMMON/UTIL/NUMBER/INTEGER.js');
	require('./COMMON/UTIL/NUMBER/REAL.js');
	require('./COMMON/UTIL/NUMBER/RANDOM.js');
	
	// 날짜 관련 기능
	require('./COMMON/UTIL/DATE/CALENDAR.js');
	require('./COMMON/UTIL/DATE/CREATE_DATE.js');
	
	// BROWSER 테스트
});