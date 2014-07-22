// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-UTIL.
require('../../../../UPPERCASE.IO-UTIL/NODE.js');

INIT_OBJECTS();

var
// coffee code
coffeeCode = '# 가장 간단한 예제\n\n## 준비물\n\n * node : 알아서 설치\n * nodemon : npm install -g nodemon\n * UPPERCASE : 프로젝트 디렉토리에 복사\n * UPPERCASE_ONE : 프로젝트 디렉토리에 복사\n\n의외로 COFFEECASE는 필요없다.\n\n## 코드\n\n가장 먼저 필요한 것을 불러온다.\n\n    require \'./UPPERCASE_ONE/BOOT.js\'\n\n간단한 로직을 넣는다.\n\n    P ->\n        \'Hello World\'\n\n``` nodemon HelloWorld.litcoffee``` 을 명령창에서 실행한 다음,\n브라우저로 http://localhost:8888 을 연다.\n\n``` coffeecase drink HelloWorld``` 하면 require 쓰지 않아도 자동으로 붙여주고 litcoffee도 생략할 수 있고\n브라우저도 자동으로 열어주면 좋겠다.\n\n궁극적으로는 로직에만 집중할 수 있는 환경이 제공되면 제일 좋겠지만. coffeecase 패키지를 만드는\n것도 방법일듯. coffeecase roast Examples 하면 Examples 디렉토리를 만들고 그 안에\n필요한 박스들이 다 설치한다. 이렇게 하면 필요한 것은\n\n * node : 알아서\n * coffeecase : npm install -g coffeecase\n\n가 된다.\n';

console.log(COMPILE_LITCOFFEE_TO_JS(coffeeCode));
