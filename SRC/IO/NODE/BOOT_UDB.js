/**
 * boot UDB.
 */
global.BOOT_UDB = METHOD({

	run : function(UPPERCASE_IO_PATH) {
		'use strict';
		//REQUIRED: UPPERCASE_IO_PATH

		var
		// model map
		modelMap = {},
		
		// model name map
		modelNameMap = {},
		
		// uri matcher
		uriMatcher = URI_MATCHER('__/{boxName}/{modelName}/{method}'),
		
		// UDB server
		udbServer;
		
		UDB_CONFIG.init(function(box, model) {
			
			var
			// models
			models = modelMap[box.boxName],
			
			// name
			name = model.getName();
			
			if (models === undefined) {
				models = modelMap[box.boxName] = {};
				modelNameMap[box.boxName] = [];
			}
			
			models[name] = model;
			modelNameMap[box.boxName].push(name);
		});
		
		udbServer = RESOURCE_SERVER({

			port : UDB_CONFIG.port,
			
			rootPath : UPPERCASE_IO_PATH + '/UDB',

			version : CONFIG.version
		}, {

			requestListener : function(requestInfo, response, onDisconnected, replaceRootPath, next) {
				
				var
				// uri
				uri = requestInfo.uri,
				
				// match info
				matchInfo,
				
				// uri params
				uriParams,
				
				// models
				models,
				
				// model
				model;
				
				// serve web server port.
				if (uri.indexOf('__WEB_SERVER_PORT') === 0) {
					
					response(CONFIG.webServerPort);
					
					return false;
				}
				
				// serve model naem map.
				if (uri.indexOf('__MODEL_NAME_MAP') === 0) {
					
					response(STRINGIFY(modelNameMap));
					
					return false;
				}
				
				// serve UPPERCASE.IO-BROWSER-PACK.
				if (uri.indexOf('UPPERCASE.IO-BROWSER-PACK/') === 0) {
					replaceRootPath(UPPERCASE_IO_PATH);
				}
				
				matchInfo = uriMatcher.check(uri);
				
				// serve model funcs.
				if (matchInfo.checkIsMatched() === true) {
					
					uriParams = matchInfo.getURIParams();
					
					models = modelMap[uriParams.boxName];
					
					if (models !== undefined) {
						
						model = models[uriParams.modelName];
						
						if (model !== undefined && model[uriParams.method] !== undefined) {
							
							model[uriParams.method](PARSE_STR(requestInfo.params.data), function(result) {
								response(STRINGIFY(result));
							});
							
							return false;
						}
					}
				}
			},
			
			notExistsResource : function(resourcePath, requestInfo, response) {
				
				READ_FILE(UPPERCASE_IO_PATH + '/UDB/index.html', function(content) {
					response(content.toString());
				});
				
				return false;
			}
		});
		
		console.log('[UPPERCASE.IO] UDB Tool BOOTed! => http://localhost:' + UDB_CONFIG.port);
	}
});
