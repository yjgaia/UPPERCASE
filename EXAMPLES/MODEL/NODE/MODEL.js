// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-BOX.
require('../../../UPPERCASE.IO-BOX/CORE.js');

BOX('TestBox');

// load UPPERCASE.IO-DB.
require('../../../UPPERCASE.IO-DB/NODE.js');

CONNECT_TO_DB_SERVER({
	name : 'test'
});

// load UPPERCASE.IO-TRANSPORT.
require('../../../UPPERCASE.IO-TRANSPORT/NODE.js');

// load UPPERCASE.IO-ROOM.
require('../../../UPPERCASE.IO-ROOM/NODE.js');

LAUNCH_ROOM_SERVER({

	socketServerPort : 8127,

	webSocketServerPort : 8128,
	webSocketFixServerPort : 8129
});

// load UPPERCASE.IO-MODEL.
require('../../../UPPERCASE.IO-MODEL/COMMON.js');
require('../../../UPPERCASE.IO-MODEL/NODE.js');

// Example Model
TestBox.TestModel = OBJECT({

	preset : function() {
		'use strict';
		return TestBox.MODEL;
	},

	params : function() {
		'use strict';

		var
		// valid data set
		validDataSet;

		validDataSet = {
			name : {
				notEmpty : true,
				size : {
					min : 0,
					max : 255
				}
			},
			age : {
				notEmpty : true,
				integer : true
			},
			isMan : {
				bool : true
			}
		};

		return {
			name : 'Test',
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				},
				update : {
					valid : VALID(validDataSet)
				},
				remove : {
					role : 'Test'
				}
			}
		};
	}
});

INIT_OBJECTS();
