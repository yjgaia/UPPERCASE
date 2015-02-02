/**
 * boot UDB.
 */
global.BOOT_UDB = METHOD({

	run : function(UPPERCASE_IO_PATH) {
		'use strict';
		//REQUIRED: UPPERCASE_IO_PATH

		var
		// models
		models = {},
		
		// model names
		modelNames = [],
		
		// UDB server
		udbServer;
		
		UDB_CONFIG.init(function(model) {
			
			var
			// name
			name = model.getName();
			
			models[name] = model;
			
			modelNames.push(name);
		});
		
		udbServer = RESOURCE_SERVER({

			port : UDB_CONFIG.port,
			
			rootPath : UPPERCASE_IO_PATH + '/UDB',

			version : CONFIG.version
		}, {

			requestListener : function(requestInfo, response, onDisconnected, replaceRootPath, next) {
				
				var
				// uri
				uri = requestInfo.uri;
				
				// serve web server port.
				if (uri.indexOf('__WEB_SERVER_PORT') === 0) {
					
					response(CONFIG.webServerPort);
					
					return false;
				}
				
				// serve model naems.
				if (uri.indexOf('__MODEL_NAMES') === 0) {
					
					response(STRINGIFY(modelNames));
					
					return false;
				}
				
				// serve UPPERCASE.IO-BROWSER-PACK.
				if (uri.indexOf('UPPERCASE.IO-BROWSER-PACK/') === 0) {
					replaceRootPath(UPPERCASE_IO_PATH);
				}
			},
			
			notExistsResource : function(resourcePath, requestInfo, response) {
				
				READ_FILE(UPPERCASE_IO_PATH + '/UDB/index.html', function(content) {
					response(content.toString());
				});
				
				return false;
			}
		});
		
		console.log('[UPPERCASE.IO] UDB Tool BOOTed! => http://localhost:' + CONFIG.udbPort);
	}
});
