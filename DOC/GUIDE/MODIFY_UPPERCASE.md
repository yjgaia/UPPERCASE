작성중

# UPPERCASE를 수정하여 사용하기

`SRC` 폴더의 내용을 수정

# UPPERCASE 빌드
SRC 폴더에 있는 `__BUILD.js` 스크립트를 실행하여 UPPERCASE를 빌드합니다.

```
cd SRC
node __BUILD.js
```


# UPPERCASE 테스트

## 웹 브라우저 환경에서 테스트
TEST 폴더에 있는 `TEST_SERVER.js` 스크립트를 실행하여, 웹 브라우저에서 http://localhost:8810 으로 접속하여 UPPERCASE-CORE-COMMON 및 UPPERCASE-CORE-BROWSER를 테스트합니다.

```
cd TEST
node TEST_SERVER.js
```

## Node.js 환경에서 테스트
TEST 폴더에 있는 `TEST_FOR_NODE.js` 스크립트를 실행하여 UPPERCASE-CORE-COMMON 및 UPPERCASE-CORE-NODE를 테스트합니다.

```
cd TEST
node TEST_FOR_NODE.js
```
