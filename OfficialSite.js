// load UPPERCASE.JS.
require('./UPPERCASE.JS-COMMON.js');
require('./UPPERCASE.JS-NODE.js');

CONFIG.isDevMode = true;

INIT_OBJECTS();

RESOURCE_SERVER({
	port : 8810,
	rootPath : __dirname
});
