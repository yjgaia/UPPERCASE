# UPPERCASE-UTIL
node.js 모듈이 필요하여, 의존성이 없는 [UPPERCASE.JS](https://github.com/Hanul/UPPERCASE.JS)가 제공하지 않는 유틸리티 기능들을 추가로 제공하는 모듈입니다.

*※ UPPERCASE 기반 프로젝트는 이 모듈이 자동으로 포함됩니다. 이하 내용들은 이 모듈을 따로 사용할 때 필요한 내용입니다.*

## 파일 구성
아래 파일들을 다운로드 받아 아래 사용 방법 항목을 참고하여 사용합니다.
* UPPERCASE-UTIL 폴더
* UPPERCASE.JS-COMMON.js
* UPPERCASE.JS-NODE.js

## 사용 방법
`UPPERCASE-UTIL`는 `UPPERCASE.JS`에 의존성이 있습니다.

```javascript
// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE-UTIL.
require('../../../../UPPERCASE-UTIL/NODE.js');

IMAGEMAGICK_CONVERT(['sample.png', '-resize', '100x100\!', 'sample-square.png']);
...
```

## API
* `MINIFY_CSS(code)` CSS 코드를 압축합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UTIL/NODE/MINIFY/MINIFY_CSS.js)
* `MINIFY_JS(code)` JS 코드를 압축합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UTIL/NODE/MINIFY/MINIFY_JS.js)
* `IMAGEMAGICK_CONVERT(params)` `IMAGEMAGICK_CONVERT(params, function() {...})` `IMAGEMAGICK_CONVERT(params, {error: function() {...}, success : function() {...}})`  ImageMagick® convert. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_CONVERT.js)
* `IMAGEMAGICK_IDENTIFY(path, function() {...})` `IMAGEMAGICK_IDENTIFY(path, {error: function() {...}, success : function() {...}})` ImageMagick® identify. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_IDENTIFY.js)
* `IMAGEMAGICK_READ_METADATA(path, function() {...})` `IMAGEMAGICK_READ_METADATA(path, {error: function() {...}, success : function() {...}})` ImageMagick® read metadata. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_READ_METADATA.js)
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, function() {...})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, {error: function() {...}, success : function() {...}})` ImageMagick® resize. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/.js)
