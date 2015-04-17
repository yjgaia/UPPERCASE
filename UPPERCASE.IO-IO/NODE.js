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
								
								if (model.getCreateValid() === undefined) {
									
									response('');
									
								} else {
									
									validDataSet = model.getCreateValid().getValidDataSet();
									
									EACH(model.getInitData(), function(notUsing, name) {
										delete validDataSet[name];
									});
									
									response(STRINGIFY(validDataSet));
								}
							}
							
							else if (uriParams.method === '__GET_UPDATE_VALID_DATA_SET') {
								
								if (model.getUpdateValid() === undefined) {
									
									response('');
									
								} else {
									
									validDataSet = model.getUpdateValid().getValidDataSet();
									
									EACH(model.getInitData(), function(notUsing, name) {
										delete validDataSet[name];
									});
									
									response(STRINGIFY(validDataSet));
								}
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
							
							else if (uriParams.method === 'update' && model.update !== undefined) {
							
								model.update(requestInfo.data, {
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
									success : function(savedData, originData) {
										response(STRINGIFY({
											savedData : savedData,
											originData: originData
										}));
									}
								});
								
								return false;
							}
							
							else if (uriParams.method === 'remove' && model.remove !== undefined) {
							
								model.remove(requestInfo.data, {
									error : function(errorMsg) {
										response(STRINGIFY({
											errorMsg : errorMsg
										}));
									},
									success : function(originData) {
										response(STRINGIFY({
											originData: originData
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

/**
 * Check still alive object
 */
global.CHECK_STILL_ALIVE = OBJECT({

	init : function() {
		'use strict';

		UPPERCASE.IO.ROOM('checkStillAliveRoom', function(clientInfo, on, off, send) {
			
			// I'm still alive!!
			on('check', function(notUsing, ret) {
				ret('ALIVE!');
			});
		});
	}
});

/**
 * Node-side Configuration
 */
OVERRIDE(NODE_CONFIG, function(origin) {

	global.NODE_CONFIG = COMBINE([{
		isUsingHTMLSnapshot : false
	}, origin]);
});

/**
 * Sync time object (Server-side)
 */
global.SYNC_TIME = OBJECT({

	init : function() {
		'use strict';

		UPPERCASE.IO.ROOM('timeSyncRoom', function(clientInfo, on) {

			// return diff. (diff: client time - server time)
			on('sync', function(clientNow, ret) {
				ret(clientNow - new Date());
			});
		});
	}
});
