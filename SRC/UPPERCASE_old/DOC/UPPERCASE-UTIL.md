# UPPERCASE-UTIL
`npm` 모듈이 필요하여, 모듈 의존성이 없는 [UJS](https://github.com/Hanul/UJS)가 제공하지 않는 기능들을 추가로 제공하는 모듈입니다.

## API
* `MINIFY_CSS(code)` CSS 코드를 압축합니다. [예제보기](../EXAMPLES/UTIL/NODE/MINIFY/MINIFY_CSS.js)
* `MINIFY_JS(code)` JS 코드를 압축합니다. [예제보기](../EXAMPLES/UTIL/NODE/MINIFY/MINIFY_JS.js)
* `IMAGEMAGICK_CONVERT(params)` `IMAGEMAGICK_CONVERT(params, function() {...})` `IMAGEMAGICK_CONVERT(params, {error: function() {...}, success : function() {...}})`  ImageMagick® convert. [예제보기](../EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_CONVERT.js)
* `IMAGEMAGICK_IDENTIFY(path, function() {...})` `IMAGEMAGICK_IDENTIFY(path, {error: function() {...}, success : function() {...}})` ImageMagick® identify. [예제보기](../EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_IDENTIFY.js)
* `IMAGEMAGICK_READ_METADATA(path, function() {...})` `IMAGEMAGICK_READ_METADATA(path, {error: function() {...}, success : function() {...}})` ImageMagick® read metadata. [예제보기](../EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_READ_METADATA.js)
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, function() {...})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, {error: function() {...}, success : function() {...}})` ImageMagick® resize. [예제보기](../EXAMPLES/UTIL/NODE/IMAGEMAGICK.js)
* `DISK_USAGE({function() {...}})` `DISK_USAGE({drive:, function() {...}})` `DISK_USAGE({drive:, {error: function() {...}, success : function() {...}})` get disk usage. [예제보기](../EXAMPLES/UTIL/NODE/DISK_USAGE.js)
* `REDIS_STORE(name)` Redis를 이용해 [UJS의 SHARED_STORE](https://github.com/Hanul/UJS/blob/master/DOC/UJS-NODE.md#클러스터링-관련-기능)와 같은 기능을 하는 저장소를 생성합니다. 그러나 REDIS_STORE는 **Callback 방식으로 값을 받아온다**는 점에 주의하시기 바랍니다. 데이터의 동기화가 중요한 프로젝트에서는 `SHARED_STORE`를 사용하지 말고 `REDIS_STORE`를 사용하시기 바랍니다. [예제보기](../EXAMPLES/UTIL/NODE/REDIS_STORE.js)
	* `save({name:, value:})` `save({name:, value:}, callbackOrHandlers)` 특정 `name`에 `value`를 저장합니다.
	* `get(name, callbackOrHandlers)` `name`의 값을 가져옵니다. 값이 없는 경우 `undefined`가 반환됩니다.
	* `remove(name)` `remove(name, callbackOrHandlers)` `name`의 값을 지웁니다.
	* `list(callbackOrHandlers)` 저장소의 모든 값을 가져옵니다.
	* `count(callbackOrHandlers)` 저장소의 값들의 개수를 가져옵니다.
	* `clear()` `clear(callbackOrHandlers)` 저장소의 모든 값을 삭제합니다.

## UPPERCASE-UTIL 단독 사용
`UPPERCASE-UTIL`은 `UPPERCASE`에 포함되어 있으나, 단독으로 사용할 수도 있습니다.

### 의존 모듈
`UPPERCASE-UTIL`은 아래 모듈들에 의존성을 가지므로, 단독으로 사용할 경우 `UPPERCASE-UTIL` 폴더와 함께 아래 모듈들을 복사해서 사용하시기 바랍니다.
* UJS-NODE.js

## 사용 방법
```javascript
// load UJS.
require('../../../../UJS-NODE.js');

// load UPPERCASE-UTIL.
require('../../../../UPPERCASE-UTIL/NODE.js');

IMAGEMAGICK_CONVERT(['sample.png', '-resize', '100x100\!', 'sample-square.png']);
...
```
