// global
global = {};

// load UPPERCASE.JS.
require('./UPPERCASE.JS-COMMON');
require('./UPPERCASE.JS-TITANIUM');

if (Ti.Platform.name === 'mobileweb') {
	require('./UPPERCASE.JS-BROWSER');
}

// load UPPERCASE.IO-BOX.
require('./UPPERCASE.IO-BOX/CORE');
require('./UPPERCASE.IO-BOX/CLIENT');

if (Ti.Platform.name === 'mobileweb') {
	require('./UPPERCASE.IO-TRANSPORT/BROWSER');
}

// load UPPERCASE.IO-ROOM.
require('./UPPERCASE.IO-ROOM/TITANIUM');
require('./UPPERCASE.IO-ROOM/CLIENT');

// load UPPERCASE.IO-MODEL.
require('./UPPERCASE.IO-MODEL/COMMON');
require('./UPPERCASE.IO-MODEL/CLIENT');

// load UPPERCASE.IO-IO.
require('./UPPERCASE.IO-IO/TITANIUM');
require('./UPPERCASE.IO-IO/CLIENT');
