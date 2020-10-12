RUN(() => {
	
	let require = (path) => {
		let script = document.createElement('script');
		script.src = 'UPPERCASE-CORE/' + path;
		document.body.appendChild(script);
	};
	
	/*
	// COMMON 테스트
	require('./COMMON/TO_DELETE.js');
	require('./COMMON/METHOD.js');
	
	// 객체지향 관련 기능
	require('./COMMON/OOP/CLASS.js');
	require('./COMMON/OOP/OBJECT.js');
	
	// BOX 관련 기능
	require('./COMMON/BOX/BOX.js');
	
	// 숫자 관련 기능
	require('./COMMON/UTIL/NUMBER/INTEGER.js');
	require('./COMMON/UTIL/NUMBER/REAL.js');
	require('./COMMON/UTIL/NUMBER/RANDOM.js');
	
	// 날짜 관련 기능
	require('./COMMON/UTIL/DATE/CALENDAR.js');
	require('./COMMON/UTIL/DATE/CREATE_DATE.js');
	
	// 데이터({...}) 및 배열([...]) 관련 기능
	require('./COMMON/UTIL/DATA/CHECK_IS_DATA.js');
	require('./COMMON/UTIL/ARRAY/CHECK_IS_ARRAY.js');
	require('./COMMON/UTIL/DATA/CHECK_IS_EMPTY_DATA.js');
	require('./COMMON/UTIL/DATA_AND_ARRAY/CHECK_IS_IN.js');
	require('./COMMON/UTIL/ARRAY/CHECK_ARE_SAME.js');
	require('./COMMON/UTIL/DATA/COUNT_PROPERTIES.js');
	require('./COMMON/UTIL/DATA_AND_ARRAY/FIND.js');
	require('./COMMON/UTIL/DATA_AND_ARRAY/REMOVE.js');
	require('./COMMON/UTIL/DATA_AND_ARRAY/COPY.js');
	require('./COMMON/UTIL/DATA_AND_ARRAY/EXTEND.js');
	require('./COMMON/UTIL/DATA_AND_ARRAY/COMBINE.js');
	require('./COMMON/UTIL/DATA/PACK_DATA.js');
	require('./COMMON/UTIL/DATA/UNPACK_DATA.js');
	require('./COMMON/UTIL/STRINGIFY.js');
	require('./COMMON/UTIL/PARSE_STR.js');
	require('./COMMON/UTIL/VALID.js');
	
	// 반복 관련 기능
	require('./COMMON/UTIL/REPEAT/REPEAT.js');
	require('./COMMON/UTIL/REPEAT/EACH.js');
	require('./COMMON/UTIL/REPEAT/REVERSE_EACH.js');
	
	// 시간 지연 관련 기능
	require('./COMMON/UTIL/DELAY/DELAY.js');
	require('./COMMON/UTIL/DELAY/INTERVAL.js');
	require('./COMMON/UTIL/DELAY/LOOP.js');
	
	// 즉시 실행 함수 기능
	require('./COMMON/UTIL/FUNCTION/RUN.js');
	require('./COMMON/UTIL/FUNCTION/RAR.js');
	
	// Callback Hell 보완 기능
	require('./COMMON/UTIL/NEXT.js');
	require('./COMMON/UTIL/PARALLEL.js');*/
	
	// 문자열 암호화 기능
	//require('./COMMON/UTIL/ENCRYPTION/SHA256.js');
	//require('./COMMON/UTIL/ENCRYPTION/SHA512.js');
	
	// 기타 기능
	/*require('./COMMON/UTIL/OVERRIDE.js');
	require('./COMMON/UTIL/RANDOM_STR.js');
	require('./COMMON/UTIL/URI_MATCHER.js');*/
	
	// BROWSER 테스트
	// INFO
	require('./BROWSER/INFO.js');
	
	/*
	// 창 관련 기능
	require('./BROWSER/WINDOW/TITLE.js');
	require('./BROWSER/WINDOW/WIN_WIDTH.js');
	require('./BROWSER/WINDOW/WIN_HEIGHT.js');
	require('./BROWSER/WINDOW/SCROLL_LEFT.js');
	require('./BROWSER/WINDOW/SCROLL_TOP.js');
	
	// DOM 객체 생성
	require('./BROWSER/DOM/NODE.js');
	require('./BROWSER/DOM/DOM.js');
	require('./BROWSER/DOM/TAG/DIV.js');
	require('./BROWSER/DOM/TAG/P.js');
	require('./BROWSER/DOM/TAG/SPAN.js');
	require('./BROWSER/DOM/TAG/BR.js');
	require('./BROWSER/DOM/TAG/H1.js');
	require('./BROWSER/DOM/TAG/A.js');
	require('./BROWSER/DOM/TAG/IMG.js');
	require('./BROWSER/DOM/TAG/UL.js');
	require('./BROWSER/DOM/TAG/TABLE.js');
	require('./BROWSER/DOM/TAG/FORM.js');
	require('./BROWSER/DOM/TAG/CANVAS.js');
	require('./BROWSER/DOM/TAG/AUDIO.js');
	require('./BROWSER/DOM/TAG/VIDEO.js');
	require('./BROWSER/DOM/TAG/IFRAME.js');
	require('./BROWSER/DOM/CLEAR_BOTH.js');
	
	// 노드에 이벤트 등록
	require('./BROWSER/DOM/EVENT/EVENT.js');
	require('./BROWSER/DOM/EVENT/E.js');
	require('./BROWSER/DOM/EVENT/EVENT.fireAll.js');
	require('./BROWSER/DOM/EVENT/EVENT_ONCE.js');
	
	// 노드에 스타일 지정
	require('./BROWSER/DOM/ADD_STYLE.js');
	
	// 노드에 애니메이션 지정
	require('./BROWSER/DOM/ANIMATE.js');*/
	
	// 뷰 기능
	/*require('./BROWSER/VIEW/VIEW.js');
	require('./BROWSER/VIEW/URI.js');
	require('./BROWSER/VIEW/HREF.js');
	require('./BROWSER/VIEW/GO.js');
	require('./BROWSER/VIEW/GO_NEW_WIN.js');
	require('./BROWSER/VIEW/REFRESH.js');*/
	
	/*
	// HTTP 요청 기능
	require('./BROWSER/REQUEST/REQUEST.js');
	require('./BROWSER/REQUEST/GET.js');
	require('./BROWSER/REQUEST/POST.js');
	require('./BROWSER/REQUEST/PUT.js');
	require('./BROWSER/REQUEST/DELETE.js');
	
	// CONNECT_TO_WEB_SOCKET_SERVER
	//require('./BROWSER/CONNECT_TO_WEB_SOCKET_SERVER.js');
	
	// STORE
	require('./BROWSER/STORE.js');*/
	
	// MSG
	//require('./BROWSER/MSG.js');
	
	/*// 콘솔 로그 관련 기능
	require('./BROWSER/CONSOLE/SHOW_ERROR.js');
	require('./BROWSER/CONSOLE/SHOW_WARNING.js');*/
	
	// SOUND
	//require('./BROWSER/SOUND.js');
	
	// OTHERS
	//require('./BROWSER/ADD_FONT.js');
	//require('./BROWSER/WORKER.js');
});