# test
test* [COMMON/CONFIG.md](COMMON/CONFIG.md) 기본 설정
* [COMMON/METHOD.md](COMMON/METHOD.md) 메소드를 생성합니다.
* [COMMON/TO_DELETE.md](COMMON/TO_DELETE.md) DB의 update 기능을 사용할 때, 데이터의 특정 값에 TO_DELETE를 지정하게 되면 해당 값이 삭제됩니다. 자세한 것은 DB의 update 예제를 살펴보시기 바랍니다.  참고로 UPPERCASE 기반 프로젝트에서 이 TO_DELETE만이 null이 될 수 있는 유일한 변수입니다. 다른 변수에서는 null을 사용하지 않고 undefined를 사용해 주시기 바랍니다.
* [COMMON/BOX/BOX.md](COMMON/BOX/BOX.md) BOX를 생성합니다.
* [COMMON/BOX/FOR_BOX.md](COMMON/BOX/FOR_BOX.md) 모든 박스를 대상으로 하는 메소드와 클래스, 싱글톤 객체를 선언할 때 사용합니다.
* [COMMON/OOP/CLASS.md](COMMON/OOP/CLASS.md) 클래스를 생성합니다.
* [COMMON/OOP/INIT_OBJECTS.md](COMMON/OOP/INIT_OBJECTS.md) 모든 정의된 싱글톤 객체의 초기화를 수행합니다.
* [COMMON/OOP/OBJECT.md](COMMON/OOP/OBJECT.md) 실글톤 객체를 생성합니다.
* [COMMON/UTIL/NEXT.md](COMMON/UTIL/NEXT.md) 주어진 비동기 함수들을 순서대로 실행합니다.
* [COMMON/UTIL/OVERRIDE.md](COMMON/UTIL/OVERRIDE.md) 오버라이드를 수행합니다.
* [COMMON/UTIL/PARALLEL.md](COMMON/UTIL/PARALLEL.md) 주어진 비동기 함수들을 병렬로 실행합니다.
* [COMMON/UTIL/PARSE_STR.md](COMMON/UTIL/PARSE_STR.md) JSON 문자열을 원래 데이터나 배열, 값으로 변환합니다.
* [COMMON/UTIL/RANDOM_STR.md](COMMON/UTIL/RANDOM_STR.md) 임의의 문자열을 생성합니다.
* [COMMON/UTIL/STRINGIFY.md](COMMON/UTIL/STRINGIFY.md) 데이터나 배열, 값을 JSON 문자열로 변환합니다.
* [COMMON/UTIL/TEST.md](COMMON/UTIL/TEST.md) 테스트용 메소드입니다.
* [COMMON/UTIL/URI_MATCHER.md](COMMON/UTIL/URI_MATCHER.md) URI가 주어진 포맷에 맞는지 확인하는 URI_MATCHER 클래스  포맷에 파라미터 구간을 지정할 수 있어, URI로부터 파라미터 값을 가져올 수 있습니다.
* [COMMON/UTIL/VALID.md](COMMON/UTIL/VALID.md) 데이터를 검증하고, 어떤 부분이 잘못되었는지 오류를 확인할 수 있는 VALID 클래스
* [COMMON/UTIL/ARGUMENTS/CHECK_IS_ARGUMENTS.md](COMMON/UTIL/ARGUMENTS/CHECK_IS_ARGUMENTS.md) target이 arguments인지 확인합니다.
* [COMMON/UTIL/ARRAY/CHECK_ARE_SAME.md](COMMON/UTIL/ARRAY/CHECK_ARE_SAME.md) 배열 안의 모든 요소들이 동일한지 확인합니다.
* [COMMON/UTIL/ARRAY/CHECK_IS_ARRAY.md](COMMON/UTIL/ARRAY/CHECK_IS_ARRAY.md) target이 배열인지 확인합니다.
* [COMMON/UTIL/DATA/CHECK_IS_DATA.md](COMMON/UTIL/DATA/CHECK_IS_DATA.md) target이 데이터인지 확인합니다.
* [COMMON/UTIL/DATA/CHECK_IS_EMPTY_DATA.md](COMMON/UTIL/DATA/CHECK_IS_EMPTY_DATA.md) 데이터가 아무런 값이 없는 빈 데이터({})인지 확인합니다.
* [COMMON/UTIL/DATA/COUNT_PROPERTIES.md](COMMON/UTIL/DATA/COUNT_PROPERTIES.md) 데이터 내 값들의 개수를 반환합니다.
* [COMMON/UTIL/DATA/PACK_DATA.md](COMMON/UTIL/DATA/PACK_DATA.md) 주어진 데이터의 값들 중 Date형은 정수형태로, RegExp형은 문자열 형태로 변환한 데이터를 반환합니다.
* [COMMON/UTIL/DATA/UNPACK_DATA.md](COMMON/UTIL/DATA/UNPACK_DATA.md) PACK_DATA가 적용된 데이터의 값들 중 정수형태로 변환된 Date형과 문자열 형태로 변환된 RegExp형을 원래대로 되돌린 데이터를 반환합니다.
* [COMMON/UTIL/DATA_AND_ARRAY/CHECK_IS_IN.md](COMMON/UTIL/DATA_AND_ARRAY/CHECK_IS_IN.md) 특정 값이 데이터나 배열에 존재하는지 확인합니다.
* [COMMON/UTIL/DATA_AND_ARRAY/COMBINE.md](COMMON/UTIL/DATA_AND_ARRAY/COMBINE.md) 데이터들이나 배열들을 하나의 데이터나 배열로 합칩니다.
* [COMMON/UTIL/DATA_AND_ARRAY/COPY.md](COMMON/UTIL/DATA_AND_ARRAY/COPY.md) 데이터나 배열을 복제합니다.
* [COMMON/UTIL/DATA_AND_ARRAY/EXTEND.md](COMMON/UTIL/DATA_AND_ARRAY/EXTEND.md) 데이터나 배열을 덧붙혀 확장합니다.
* [COMMON/UTIL/DATA_AND_ARRAY/FIND.md](COMMON/UTIL/DATA_AND_ARRAY/FIND.md) 데이터나 배열의 특정 값을 찾아, 데이터인 경우 그 값에 해당하는 이름을, 배열인 경우 그 값에 해당하는 키(index)를 반환합니다.
* [COMMON/UTIL/DATA_AND_ARRAY/REMOVE.md](COMMON/UTIL/DATA_AND_ARRAY/REMOVE.md) 데이터나 배열의 특정 값을 삭제합니다.
* [COMMON/UTIL/DATE/CALENDAR.md](COMMON/UTIL/DATE/CALENDAR.md) 날짜를 처리할 때 Date형을 좀 더 쓰기 편하도록 개선한 CALENDAR 클래스
* [COMMON/UTIL/DATE/CREATE_DATE.md](COMMON/UTIL/DATE/CREATE_DATE.md) Date형 값을 생성합니다.
* [COMMON/UTIL/DELAY/DELAY.md](COMMON/UTIL/DELAY/DELAY.md) 주어진 초가 흐른 뒤에 함수를 실행하는 DELAY 클래스
* [COMMON/UTIL/DELAY/INTERVAL.md](COMMON/UTIL/DELAY/INTERVAL.md) 주어진 초 마다 함수를 반복해서 수행하는 INTERVAL 클래스
* [COMMON/UTIL/DELAY/LOOP.md](COMMON/UTIL/DELAY/LOOP.md) 아주 짧은 시간동안 반복해서 수행하는 로직을 작성할때 사용하는 LOOP 클래스 (게임 개발 등에 사용됩니다.)
* [COMMON/UTIL/FUNCTION/RAR.md](COMMON/UTIL/FUNCTION/RAR.md) 주어진 함수를 즉시 실행하고, 결과 값을 반환합니다.
* [COMMON/UTIL/FUNCTION/RUN.md](COMMON/UTIL/FUNCTION/RUN.md) 주어진 함수를 실행합니다.  새로운 코드 블록이 필요할 때 사용합니다.
* [COMMON/UTIL/NUMBER/INTEGER.md](COMMON/UTIL/NUMBER/INTEGER.md) 정수 문자열을 정수 값으로 변환합니다.
* [COMMON/UTIL/NUMBER/RANDOM.md](COMMON/UTIL/NUMBER/RANDOM.md) 임의의 정수를 생성합니다.
* [COMMON/UTIL/NUMBER/REAL.md](COMMON/UTIL/NUMBER/REAL.md) 실수 문자열을 실수 값으로 변환합니다.
* [COMMON/UTIL/REPEAT/EACH.md](COMMON/UTIL/REPEAT/EACH.md) 데이터나 배열, 문자열의 각 요소를 순서대로 대입하여 주어진 함수를 실행합니다.
* [COMMON/UTIL/REPEAT/REPEAT.md](COMMON/UTIL/REPEAT/REPEAT.md) 주어진 함수를 주어진 횟수만큼 반복해서 실행합니다.
* [COMMON/UTIL/REPEAT/REVERSE_EACH.md](COMMON/UTIL/REPEAT/REVERSE_EACH.md) 데이터나 배열, 문자열의 각 요소를 역순으로 대입하여 주어진 함수를 실행합니다.
