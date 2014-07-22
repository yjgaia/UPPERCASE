// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-UTIL.
require('../../../../UPPERCASE.IO-UTIL/NODE.js');

INIT_OBJECTS();

var
// coffee code
coffeeCode = 'TEST\n\n    number = 32';

RUN_LITCOFFEE(coffeeCode);

console.log(number);
