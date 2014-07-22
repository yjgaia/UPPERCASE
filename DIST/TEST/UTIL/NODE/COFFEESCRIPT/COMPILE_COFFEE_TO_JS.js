// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-UTIL.
require('../../../../UPPERCASE.IO-UTIL/NODE.js');

INIT_OBJECTS();

var
// coffee code
coffeeCode = '# Assignment:\nnumber   = 42\nopposite = true\n\n# Conditions:\nnumber = -42 if opposite\n\n# Functions:\nsquare = (x) -> x * x\n\n# Arrays:\nlist = [1, 2, 3, 4, 5]\n\n# Objects:\nmath =\n  root:   Math.sqrt\n  square: square\n  cube:   (x) -> x * square x\n\n# Splats:\nrace = (winner, runners...) ->\n  print winner, runners\n\n# Existence:\nalert "I knew it!" if elvis?\n\n# Array comprehensions:\ncubes = (math.cube num for num in list)';

console.log(COMPILE_COFFEE_TO_JS(coffeeCode));
