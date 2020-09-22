# UTIL API
* [NEXT.md](NEXT.md) 주어진 비동기 함수들을 순서대로 실행합니다.
* [OVERRIDE.md](OVERRIDE.md) 오버라이딩을 수행합니다.
* [PARALLEL.md](PARALLEL.md) 주어진 비동기 함수들을 병렬로 실행합니다.
* [PARSE_STR.md](PARSE_STR.md) JSON 문자열을 원래 데이터나 배열, 값으로 변환합니다.
* [RANDOM_STR.md](RANDOM_STR.md) 알파벳 대, 소문자와 숫자로 이루어진 임의의 문자열을 생성합니다.
* [STRINGIFY.md](STRINGIFY.md) 데이터나 배열, 값을 JSON 문자열로 변환합니다.
* [TEMPLATE.md](TEMPLATE.md) 메시지의 특정 부분들을 바꿀 수 있는 템플릿 클래스
* [TEST.md](TEST.md) 테스트용 메소드입니다.  테스트에 성공하거나 실패하면 콘솔에 메시지를 출력합니다.
* [URI_MATCHER.md](URI_MATCHER.md) URI가 주어진 포맷에 맞는지 확인하는 URI_MATCHER 클래스  포맷에 파라미터 구간을 지정할 수 있어 URI로부터 파라미터 값을 가져올 수 있습니다.
* [UUID.md](UUID.md) 범용 고유 식별자를 생성합니다.
* [VALID.md](VALID.md) 데이터를 검증하고, 어떤 부분이 잘못되었는지 오류를 확인할 수 있는 VALID 클래스

## [ARRAY](ARRAY/README.md)
* [ARRAY/CHECK_ARE_SAME.md](ARRAY/CHECK_ARE_SAME.md) 배열 안의 모든 요소들이 동일한지 확인합니다.
* [ARRAY/CHECK_IS_ARRAY.md](ARRAY/CHECK_IS_ARRAY.md) target이 배열인지 확인합니다.

## [DATA](DATA/README.md)
* [DATA/CHECK_IS_DATA.md](DATA/CHECK_IS_DATA.md) target이 데이터인지 확인합니다.
* [DATA/CHECK_IS_EMPTY_DATA.md](DATA/CHECK_IS_EMPTY_DATA.md) 데이터가 아무런 값이 없는 빈 데이터({})인지 확인합니다.
* [DATA/COUNT_PROPERTIES.md](DATA/COUNT_PROPERTIES.md) 데이터 내 값들의 개수를 반환합니다.
* [DATA/PACK_DATA.md](DATA/PACK_DATA.md) 주어진 데이터의 값들 중 Date형은 정수형태로, RegExp형은 문자열 형태로 변환한 데이터를 반환합니다.
* [DATA/UNPACK_DATA.md](DATA/UNPACK_DATA.md) PACK_DATA가 적용된 데이터의 값들 중 정수형태로 변환된 Date형과 문자열 형태로 변환된 RegExp형을 원래대로 되돌린 데이터를 반환합니다.

## [DATA_AND_ARRAY](DATA_AND_ARRAY/README.md)
* [DATA_AND_ARRAY/CHECK_IS_IN.md](DATA_AND_ARRAY/CHECK_IS_IN.md) 특정 값이 데이터나 배열에 존재하는지 확인합니다.
* [DATA_AND_ARRAY/COMBINE.md](DATA_AND_ARRAY/COMBINE.md) 데이터들이나 배열들을 하나의 데이터나 배열로 합칩니다.
* [DATA_AND_ARRAY/COPY.md](DATA_AND_ARRAY/COPY.md) 데이터나 배열을 복제합니다.
* [DATA_AND_ARRAY/EXTEND.md](DATA_AND_ARRAY/EXTEND.md) 데이터나 배열을 덧붙혀 확장합니다.
* [DATA_AND_ARRAY/FIND.md](DATA_AND_ARRAY/FIND.md) 데이터나 배열의 특정 값을 찾아, 데이터인 경우 그 값에 해당하는 이름을, 배열인 경우 그 값에 해당하는 키(index)를 반환합니다.
* [DATA_AND_ARRAY/REMOVE.md](DATA_AND_ARRAY/REMOVE.md) 데이터나 배열의 특정 값을 삭제합니다.

## [DATE](DATE/README.md)
* [DATE/CALENDAR.md](DATE/CALENDAR.md) 날짜를 처리할 때 Date형을 좀 더 쓰기 편하도록 개선한 CALENDAR 클래스
* [DATE/CREATE_DATE.md](DATE/CREATE_DATE.md) Date형 값을 생성합니다.

## [DELAY](DELAY/README.md)
* [DELAY/DELAY.md](DELAY/DELAY.md) 주어진 초가 흐른 뒤에 함수를 실행하는 DELAY 클래스
* [DELAY/INTERVAL.md](DELAY/INTERVAL.md) 주어진 초 마다 함수를 반복해서 실행하는 INTERVAL 클래스
* [DELAY/LOOP.md](DELAY/LOOP.md) 아주 짧은 시간동안 반복해서 실행하는 로직을 작성할때 사용하는 LOOP 클래스

## [ENCRYPTION](ENCRYPTION/README.md)
* [ENCRYPTION/ENCRYPT.md](ENCRYPTION/ENCRYPT.md) 비밀번호를 주어진 키를 암호화합니다. 같은 키로 한번 더 수행하면, 복호화됩니다.
* [ENCRYPTION/SHA256.md](ENCRYPTION/SHA256.md) 비밀번호를 주어진 키를 이용하여 HMAC SHA256 알고리즘으로 암호화합니다.
* [ENCRYPTION/SHA512.md](ENCRYPTION/SHA512.md) 비밀번호를 주어진 키를 이용하여 HMAC SHA512 알고리즘으로 암호화합니다.

## [FUNCTION](FUNCTION/README.md)
* [FUNCTION/RAR.md](FUNCTION/RAR.md) 주어진 함수를 즉시 실행하고, 함수를 반환합니다.  선언과 동시에 실행되어야 하는 함수를 선언할 때 유용합니다.
* [FUNCTION/RUN.md](FUNCTION/RUN.md) 주어진 함수를 즉시 실행합니다.

## [NUMBER](NUMBER/README.md)
* [NUMBER/INTEGER.md](NUMBER/INTEGER.md) 정수 문자열을 정수 값으로 변환합니다.
* [NUMBER/RANDOM.md](NUMBER/RANDOM.md) 임의의 정수를 생성합니다.
* [NUMBER/REAL.md](NUMBER/REAL.md) 실수 문자열을 실수 값으로 변환합니다.

## [REPEAT](REPEAT/README.md)
* [REPEAT/EACH.md](REPEAT/EACH.md) 데이터나 배열, 문자열의 각 요소를 순서대로 대입하여 주어진 함수를 실행합니다.
* [REPEAT/REPEAT.md](REPEAT/REPEAT.md) 주어진 함수를 주어진 횟수만큼 반복해서 실행합니다.
* [REPEAT/REVERSE_EACH.md](REPEAT/REVERSE_EACH.md) 데이터나 배열, 문자열의 각 요소를 역순으로 대입하여 주어진 함수를 실행합니다.
