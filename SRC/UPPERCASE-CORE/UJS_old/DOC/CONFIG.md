# Configuration
아래 설정들로, UJS 기반 애플리케이션의 작동 방식을 설정할 수 있습니다. 설정은 다음과 같이, UJS를 불러온 이후에 작성하면 됩니다.

```html
<!-- UJS-BROWSER.js를 불러옵니다. -->
<script src="/UJS-BROWSER.js"></script>
<!-- 구버젼 브라우저에 대한 지원과, 각종 브라우저들이 갖고있는 버그를 고쳐주는 BROWSER-FIX를 불러옵니다. -->
<script>
	// UJS-BROWSER-FIX 폴더 지정
    BROWSER_CONFIG.fixScriptsFolderPath = '/UJS-BROWSER-FIX';
    // FIX.js를 불러옵니다.
    LOAD('/UJS-BROWSER-FIX/FIX.js');
</script>
<!-- UJS의 작동방식을 설정합니다. -->
<script>
// 개발 모드
CONFIG.isDevMode = true;

// 기본 포트를 변경합니다.
BROWSER_CONFIG.port = 8010;
</script>
```

```javascript
// UJS-NODE.js를 불러옵니다.
require('./UJS-NODE.js');

// 개발 모드
CONFIG.isDevMode = true;

// 이런 방식으로 설정하면 됩니다.
NODE_CONFIG.something = 'sample';
```

## CONFIG
웹 브라우저 환경과 Node.js 환경 및 다양한 환경에서 공통으로 사용될 수 있는 설정들 입니다.

* `CONFIG.isDevMode` 이것을 `true`로 설정하면, UJS 기반 프로젝트가 개발 모드로 실행됩니다. Node.js 환경에서 `WEB_SERVER`와 `RESOURCE_SERVER` 기능을 사용할 경우 개발 모드일때 캐싱을 하지 않습니다.

## BROWSER_CONFIG
웹 브라우저 환경에서 사용될 수 있는 설정들 입니다.

* `BROWSER_CONFIG.fixScriptsFolderPath` UJS-BROWSER-FIX 스크립트들이 저장되어 있는 폴더의 경로를 지정합니다.
* `BROWSER_CONFIG.host` 이 설정의 기본값은 현재 웹 브라우저에서 접속한 호스트와 같습니다. 그러나 하이브리드 앱 등을 만들 경우 변경될 수 있습니다.
* `BROWSER_CONFIG.port` 이 설정의 기본값은 현재 웹 브라우저에서 접속한 포트와 같습니다. 그러나 하이브리드 앱 등을 만들 경우 변경될 수 있습니다.
* `BROWSER_CONFIG.isSupportingX2` 도트 아트를 사용하는 프로젝트의 경우, 레티나 디스플레이와 같은 고사양 화면에서는 픽셀을 강제로 늘이기 때문에 이미지가 흐릿하게 보입니다. 이를 대응하기 위해서, HTML5 Cavnas 기능을 사용하여 이미지 픽셀을 2배씩 늘려주어 흐릿하게 보이지 않도록 하는 기능이 UJS에 포함되어 있습니다. 이  설정을 사용할 경우 `true`로 지정합니다. 자세한 내용은 [도트 아트를 사용하는 프로젝트 만들기](DOT_ART.md) 문서를 참고하시기 바랍니다.
* `BROWSER_CONFIG.isUsingFlashCanvasPro` HTML5 Canvas를 지원하지 않는 구형 브라우저에서 `CANVAS` 기능을 사용하는 경우 UJS-BROWSER-FIX가 내부적으로 [FlashCanvas](http://flashcanvas.net)를 사용합니다. 기본적으로는 Free edition을 사용하나, Pro 버전을 사용하여 성능을 향상시킬 수 있습니다. 상업용 프로젝트에서 Pro 버전을 사용하기 위해서는 FlashCanvas Pro의 라이센스를 구매해야 하므로, 필요한 경우 이하 경로에서 라이센스를 구매한 후 이 설정을 `true`로 지정합니다.
    * http://flashcanvas.net/purchase

# NODE_CONFIG
Node.js 환경에서 사용될 수 있는 설정들 입니다.
* UJS에서 사용되는 설정은 없습니다. 그러나 개발자가 필요에 의해 추가할 수 있습니다.

이제 다 보았습니다! UJS를 업데이트 하실때는 [이 문서](UPDATE.md)를 참고하시면 됩니다. 더 많은 내용은 [INDEX 문서](INDEX.md)의 `한걸음 더` 항목이나, `튜토리얼` 항목을 참고해 주시기 바랍니다.