# UPPERCASE를 수정하여 사용하기
프로젝트를 개발하다 보면 UPPERCASE를 수정해야 하는 경우가 생길 수 있습니다. UPPERCASE에 버그가 발견되었을 때가 대표적입니다. (물론, 그런 경우 [GitHub Issue](https://github.com/Hanul/UPPERCASE/issues)에 문제점을 남겨주시면 며칠 내로 해결될 것입니다.) 그러나 급히 수정된 버전이 필요한 경우에는 아래의 순서에 따라 UPPERCASE를 수정하여 사용하면 됩니다.

혹은, UPPERCASE를 확장하여 나만의 프레임워크를 만들고 싶을 수 있습니다. 그런 경우에도 아래 순서에 따라 UPPERCASE를 수정하거나 확장할 수 있습니다.

## `SRC` 폴더의 내용을 수정
UPPERCASE의 모든 소스코드는 `SRC` 폴더에 수록되어 있습니다. 따라서 `SRC` 폴더의 코드들을 수정하면 됩니다. 모듈별로 폴더들이 정리되어 있으므로, 원하는 모듈을 수정하여 사용합니다.

## 빌드
소스코드를 수정한 후에는 `SRC` 폴더에 있는 `__BUILD_ALL.js`를 실행하여 UPPERCASE를 빌드합니다.

```
cd SRC
node __BUILD_ALL.js
```

`__BUILD_ALL.js`는 모든 모듈을 한번에 빌드하므로, 모듈 별로 빌드하고자 하는 경우에는 각 모듈 폴더에 있는 `__BUILD.js`를 실행하면 됩니다.

```
cd SRC/UPPERCASE-CORE
node __BUILD.js
```

## 테스트
빌드가 완료된 후에는 테스트를 진행합니다. UPPERCASE 프로젝트에는 구동 환경에 따라 테스트를 도와주는 도구가 마련되어 있습니다. `TEST` 폴더에 테스트 관련 코드들이 수록되어 있으므로, 필요에 따라 수정하여 사용하면 됩니다.

```
cd TEST
node __RUN_TEST.js
```

`__RUN_TEST.js`를 실행하면 Node.js 환경에서 테스트를 수행합니다.

### 웹 브라우저 환경에서 테스트
`__RUN_TEST.js` 코드 내 `IS_TO_CREATE_SERVER` 변수를 `true`로 설정하면, 웹 브라우저 환경에서의 테스트를 위한 서버가 구동됩니다. 이후 웹 브라우저에서 http://localhost:8810 으로 접속하면 웹 브라우저 환경에서 테스트를 수행할 수 있습니다.

*UPPERCASE에 버그가 발견되거나, 기능 추가를 제안하고 싶으시면 언제든 [GitHub Issue](https://github.com/Hanul/UPPERCASE/issues)에 남겨주세요.*