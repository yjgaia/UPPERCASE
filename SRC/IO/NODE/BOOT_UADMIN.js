/**
 * boot UADMIN.
 */
global.BOOT_UADMIN = METHOD({

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
		
		// UADMIN server
		uadminServer;
		
		UADMIN_CONFIG.init(function(box, model) {
			
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
		
		uadminServer = RESOURCE_SERVER({

			port : UADMIN_CONFIG.port,
			
			rootPath : UPPERCASE_IO_PATH + '/UADMIN',

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
				model,
				
				// valid data set
				validDataSet;
				
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
						
						if (model !== undefined) {
							
							if (uriParams.method === '__GET_CREATE_VALID_DATA_SET') {
								
								validDataSet = model.getCreateValid().getValidDataSet();
								
								EACH(model.getInitData(), function(notUsing, name) {
									delete validDataSet[name];
								});
								
								response(STRINGIFY(validDataSet));
							}
							
							else if (uriParams.method === 'create' && model.create !== undefined) {
							
								model.create(requestInfo.data, {
									error : function(errorMsg) {
										response(STRINGIFY({
											errorMsg : errorMsg
										}));
									},
									notValid : function(validErrors) {
										response(STRINGIFY({
											validErrors : validErrors
										}));
									},
									success : function(savedData) {
										response(STRINGIFY({
											savedData : savedData
										}));
									}
								});
								
								return false;
							}
							
							else if (uriParams.method === 'get' && model.get !== undefined) {
							
								model.get(requestInfo.data, {
									error : function(errorMsg) {
										response(STRINGIFY({
											errorMsg : errorMsg
										}));
									},
									success : function(savedData) {
										response(STRINGIFY({
											savedData : savedData
										}));
									}
								});
								
								return false;
							}
							
							else if (uriParams.method === 'find' && model.find !== undefined) {
							
								model.find(requestInfo.data, {
									error : function(errorMsg) {
										response(STRINGIFY({
											errorMsg : errorMsg
										}));
									},
									success : function(savedDataSet) {
										response(STRINGIFY({
											savedDataSet : savedDataSet
										}));
									}
								});
								
								return false;
							}
						}
					}
				}
			},
			
			notExistsResource : function(resourcePath, requestInfo, response) {
				
				READ_FILE(UPPERCASE_IO_PATH + '/UADMIN/index.html', function(content) {
					response(content.toString());
				});
				
				return false;
			}
		});
		
		console.log('[UPPERCASE.IO] UADMIN Tool BOOTed! => http://localhost:' + UADMIN_CONFIG.port);
	}
});
