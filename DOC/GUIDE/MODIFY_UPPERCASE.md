작성중

# UPPERCASE를 수정하여 사용하기
종종 UPPERCASE 자체를 수정하여 사용할 일이 생길 수 있습니다.

UPPERCASE에 버그가 발견된 경우가 대표적이라 할 수 있습니다. 물론, 그런 경우 [GitHub Issue](https://github.com/Hanul/UPPERCASE/issues)에 남겨주시면 며칠내로 해당 문제는 해결될 것입니다.

그러나 급히 수정된 버전이 필요한 경우가 있을 수 있습니다. 그럴 때는 아래의 순서에 따라 UPPERCASE를 수정하여 사용하면 됩니다.

## `SRC` 폴더의 내용을 수정
`SRC` 폴더의 코드를 수정합니다.

모듈별로 폴더가 정리되어 있으므로 수정하고 싶은 모듈 폴더를 열어, 코드를 수정하면 됩니다.

## 빌드
SRC 폴더에 있는 `__BUILD_ALL.js` 스크립트를 실행하여 UPPERCASE 전체를 빌드합니다.

```
cd SRC
node __BUILD_ALL.js
```

모듈 별 빌드는 각 모듈 폴더에 있는 `__BUILD.js` 스크립트를 실행하면 됩니다.

## 테스트

### 웹 브라우저 환경에서 테스트
TEST 폴더에 있는 `TEST_SERVER.js` 스크립트를 실행하여, 웹 브라우저에서 http://localhost:8810 으로 접속하여 UPPERCASE-CORE-COMMON 및 UPPERCASE-CORE-BROWSER를 테스트합니다.

```
cd TEST
node TEST_SERVER.js
```

### Node.js 환경에서 테스트
TEST 폴더에 있는 `TEST_FOR_NODE.js` 스크립트를 실행하여 UPPERCASE-CORE-COMMON 및 UPPERCASE-CORE-NODE를 테스트합니다.

```
cd TEST
node TEST_FOR_NODE.js
```

*버그가 발견되거나, 기능 추가를 제안하고 싶으시면 언제든 [GitHub Issue](https://github.com/Hanul/UPPERCASE/issues)에 남겨주세요.*