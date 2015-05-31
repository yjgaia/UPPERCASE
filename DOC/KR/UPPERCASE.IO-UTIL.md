# UPPERCASE.IO-UTIL
node.js 모듈이 필요하여, 의존성이 없는 [UPPERCASE.JS](https://github.com/Hanul/UPPERCASE.JS)가 제공하지 않는 유틸리티 기능들을 추가로 제공하는 모듈입니다.

## 사용 방법
`UPPERCASE.IO-UTIL`는 `UPPERCASE.JS`를 기반으로 합니다.

```javascript
// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-UTIL.
require('../../../../UPPERCASE.IO-UTIL/NODE.js');

IMAGEMAGICK_CONVERT(['sample.png', '-resize', '100x100\!', 'sample-square.png']);
...
```

## API
* `MINIFY_CSS(code)` CSS 코드를 압축합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/MINIFY/MINIFY_CSS.js)
* `MINIFY_JS(code)` JS 코드를 압축합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/MINIFY/MINIFY_JS.js)
* `IMAGEMAGICK_CONVERT(params)` `IMAGEMAGICK_CONVERT(params, function() {...})` `IMAGEMAGICK_CONVERT(params, {error: function() {...}, success : function() {...}})`  ImageMagick® convert. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_CONVERT.js)
* `IMAGEMAGICK_IDENTIFY(path, function() {...})` `IMAGEMAGICK_IDENTIFY(path, {error: function() {...}, success : function() {...}})` ImageMagick® identify. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_IDENTIFY.js)
* `IMAGEMAGICK_READ_METADATA(path, function() {...})` `IMAGEMAGICK_READ_METADATA(path, {error: function() {...}, success : function() {...}})` ImageMagick® read metadata. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/IMAGEMAGICK_READ_METADATA.js)
* `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, function() {...})` `IMAGEMAGICK_RESIZE({srcPath:, distPath:, width:, height:}, {error: function() {...}, success : function() {...}})` ImageMagick® resize. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/UTIL/NODE/IMAGEMAGICK/.js)
