[UPPERCASE.IO](http://UPPERCASE.IO)
=========
동적인 웹 사이트 및 모바일 애플리케이션 개발을 위한 쉽고, 명확하면서도 강력한 풀스택 (server-to-client) MVC 미들웨어

Version
-------
1.4.1

Install
-------
MAC
```
open -e .profile
export UPPERCASE_IO_PATH="{{UPPERCASE.IO PATH}}"
```

Project.js
```
require(process.env['UPPERCASE_IO_PATH'] + '/BOOT.js');

BOOT({
	...
});
```

Based On
--------
- JavaScript 1.5 (ECMA-262, 3rd edition)
- CommonJS Modules/1.0

Browser-side:
- IE 5.5를 포함한 거의 모든 브라우저

Server-side:
- [Node.js](http://nodejs.org)
- [MongoDB](http://www.mongodb.org)
- [ImageMagick](http://www.imagemagick.org)

License
-------
MIT License

Contact
-------
- Official Web Site: http://UPPERCASE.IO

Author: Young Jae Sim (http://hanul.me)
