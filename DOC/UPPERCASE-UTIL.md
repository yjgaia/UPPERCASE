# UPPERCASE-UTIL
`npm` 모듈이 필요하여, 모듈 의존성이 없는 [UJS](https://github.com/Hanul/UJS)가 제공하지 않는 기능들을 추가로 제공하는 모듈입니다.

## API
* `MINIFY_CSS(code)` CSS 코드를 압축합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UTIL/NODE/MINIFY/MINIFY_CSS.js)
* `MINIFY_JS(code)` JS 코드를 압축합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UTIL/NODE/MINIFY/MINIFY_JS.js)
* `IMAGEMAGICK_CONVERT(params)` `IMAGEMAGICK_CONVERT(params, function() {...})` `IMAGEMAGICK_CONVERT(params, {error: function() {...}, success : function() {...}})`  ImageMagick® convert. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_CONVERT.js)
* `IMAGEMAGICK_IDENTIFY(path, function() {...})` `IMAGEMAGICK_IDENTIFY(path, {error: function() {...}, success : function() {...}})` ImageMagick® identify. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_IDENTIFY.js)
* `IMAGEMAGICK_READ_METADATA(path, function() {...})` `IMAGEMAGICK_READ_METADATA(path, {error: function() {...}, success : function() {...}})` ImageMagick® read metadata. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_READ_METADATA.js)
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, function() {...})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, {error: function() {...}, success : function() {...}})` ImageMagick® resize. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/.js)

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
