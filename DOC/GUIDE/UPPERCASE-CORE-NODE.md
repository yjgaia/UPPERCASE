# UPPERCASE-CORE-NODE
UPPERCASE-CORE-NODE는 Node.js 환경에서 사용할 수 있는 모듈입니다. [UPPERCASE-COMMON-CORE](UPPERCASE-COMMON-CORE.md)를 포함하고 있습니다.

## 목차
* [손쉬운 서버 생성](#손쉬운-서버-생성)
* 손쉬운 클러스터링
* 이미지 처리 기능
* 파일 처리 기능
* HTTP 요청 기능
* 시스템 관련 기능
* 콘솔 로그 관련 기능
* 암호화 관련 기능
* [코드 압축 기능](#코드-압축-기능)

## 손쉬운 서버 생성
TODO:

### 웹 서버 생성
TODO:

### 웹소켓 서버 생성
TODO:

### 소켓(TCP) 서버 생성
TODO:

### 웹소켓 + 소켓 통합 서버 생성
TODO:

### UDP 서버 생성
TODO:

## 손쉬운 클러스터링
TODO:

### CPU 클러스터링
TODO:

### 서버 간 클러스터링
TODO:

## 이미지 처리 기능
TODO:

## 파일 처리 기능
파일을 다루는 다양한 기능들을 소개합니다. 파일 처리 기능들은 공통적으로 `isSync` 파라미터를 설정할 수 있습니다. `isSync`를 `true`로 설정하게 되면, 기능을 수행하는 동안 프로그램이 일시정지하여 성능이 떨어지게 됩니다. 따라서 특수한 경우가 아니라면 `isSync` 파라미터를 사용하지 않으시기 바랍니다.

### `WRITE_FILE`
파일을 작성합니다. 파일이 없으면 파일을 생성하고, 파일이 이미 있으면 내용을 덮어씁니다.

사용 가능한 형태들은 다음과 같습니다.
* `WRITE_FILE({path:, content:}, function() {})`
* `WRITE_FILE({path:, content:}, {success:, error:})`
* `WRITE_FILE({path:, buffer:}, function() {})`
* `WRITE_FILE({path:, buffer:}, {success:, error:})`
* `WRITE_FILE({path:, content: isSync: true})`
* `WRITE_FILE({path:, buffer: isSync: true})`


### `READ_FILE`
파일의 내용을 불러옵니다. 내용을 `Buffer`형으로 불러오기 때문에, 내용을 문자열로 불러오려면 `toString` 함수를 이용하시기 바랍니다.

### `GET_FILE_INFO`
파일의 정보를 불러옵니다. 파일의 크기(`size`), 생성 시간(`createTime`), 최종 수정 시간(`lastUpdateTime`)을 불러옵니다.

### `COPY_FILE`
파일을 복사합니다.

### `MOVE_FILE`
파일의 위치를 이동시킵니다.

### `REMOVE_FILE`
파일을 삭제합니다.

### `CHECK_IS_EXISTS_FILE`
지정된 경로에 파일이 존재하는지 확인합니다.

### `CREATE_FOLDER`
폴더를 생성합니다.

### `REMOVE_FOLDER`
폴더를 삭제합니다. 폴더 내의 모든 파일 및 폴더를 삭제하므로, 주의해서 사용해야 합니다.

### `CHECK_IS_FOLDER`
지정된 경로가 (파일이 아닌) 폴더인지 확인합니다.

### `FIND_FILE_NAMES`
지정된 경로에 위치한 파일들의 이름 목록을 불러옵니다. (폴더는 제외합니다.)

### `FIND_FOLDER_NAMES`
지정된 경로에 위치한 폴더들의 이름 목록을 불러옵니다. (파일은 제외합니다.)

## HTTP 요청 기능
TODO:

## 시스템 관련 기능
TODO:

## 콘솔 로그 관련 기능
TODO:

## 암호화 관련 기능
TODO:

## 코드 압축 기능
### `MINIFY_JS(code)`
JavaScript 코드를 압축합니다.

### `MINIFY_CSS(code)`
CSS 코드를 압축합니다.