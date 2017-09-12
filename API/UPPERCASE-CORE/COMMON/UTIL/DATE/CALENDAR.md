# `CLASS` CALENDAR
날짜를 처리할 때 Date형을 좀 더 쓰기 편하도록 개선한 CALENDAR 클래스

## Parameters
* `OPTIONAL` *date* 입력하지 않으면 현재 시각을 기준으로 생성합니다.

## Public Members

### `getYear()`

### `getMonth(isFormal)`
#### Parameters
* `OPTIONAL` *isFormal* true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09

### `getDate(isFormal)`
#### Parameters
* `OPTIONAL` *isFormal* true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09

### `getDay()`

### `getHour(isFormal)`
#### Parameters
* `OPTIONAL` *isFormal* true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09

### `getMinute(isFormal)`
#### Parameters
* `OPTIONAL` *isFormal* true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09

### `getSecond(isFormal)`
#### Parameters
* `OPTIONAL` *isFormal* true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09
