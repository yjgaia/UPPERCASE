module.exports = CLASS((cls) => {
	
	const BOX_SITE_URL = 'https://box.uppercase.io';
	
	let JSZip = require('jszip');
	let Request = require('request');
	
	let Path = require('path');
	let Esprima = require('esprima');
	
	let scanFolder = (path, folderPath, func, isToAll) => {
		//REQUIRED: path
		//REQUIRED: folderPath
		//REQUIRED: func
		//OPTIONAL: isToAll
	
		if (CHECK_FILE_EXISTS({
			path : path,
			isSync : true
		}) === true) {
			
			let folderNames = [];

			FIND_FOLDER_NAMES({
				path : path,
				isSync : true
			}, {

				notExists : () => {
					// ignore.
				},

				success : (_folderNames) => {
					folderNames = _folderNames;
				}
			});
			
			if (CHECK_IS_IN({
				array : folderNames,
				value : 'LIB'
			}) === true) {
				scanFolder(path + '/LIB', folderPath + '/LIB', func, isToAll);
			}
	
			FIND_FILE_NAMES({
				path : path,
				isSync : true
			}, {
	
				error : () => {
					// ignore.
				},
	
				success : (fileNames) => {
					EACH(fileNames, (fileName) => {
						func(path + '/' + fileName, folderPath + '/' + fileName);
					});
				}
			});
	
			EACH(folderNames, (folderName) => {
				if (folderName !== 'LIB' && (isToAll === true || CHECK_IS_ALLOWED_FOLDER_NAME(folderName) === true)) {
					scanFolder(path + '/' + folderName, folderPath + '/' + folderName, func, isToAll);
				}
			});
		}
	};
	
	return {
		
		init : (inner, self) => {
			
			let installBox = self.installBox = (username, boxName, callback) => {
				
				GET({
					url : BOX_SITE_URL + '/_/info',
					data : {
						username : username,
						boxName : boxName
					}
				}, (result) => {
					result = PARSE_STR(result);
					
					if (result.validErrors !== undefined) {
						
						let validErrors = result.validErrors;
						
						if (validErrors.username !== undefined) {
							if (validErrors.username.type === 'notExists') {
								SHOW_ERROR('ubm', '존재하지 않는 유저입니다.', {
									username : username,
									boxName : boxName
								});
							}
						}
						
						else if (validErrors.boxName !== undefined) {
							if (validErrors.boxName.type === 'notExists') {
								SHOW_ERROR('ubm', '존재하지 않는 BOX입니다.', {
									username : username,
									boxName : boxName
								});
							}
						}
						
						else {
							SHOW_ERROR('ubm', '알 수 없는 오류가 발생했습니다.', {
								username : username,
								boxName : boxName
							});
						}
					}
					
					else if (result.boxData !== undefined) {
						
						let boxData = result.boxData;
						
						NEXT([
						(next) => {
							
							READ_FILE({
								path : 'BOX/' + boxName + '/VERSION',
								isSync : true
							}, {
								
								notExists : () => {
									next();
								},
								
								success : (versionContent) => {
									
									if (boxData.version !== versionContent.toString()) {
										next();
									}
									
									else {
										
										READ_FILE({
											path : 'BOX/' + boxName + '/DEPENDENCY',
											isSync : true
										}, {
											
											notExists : () => {
												callback();
											},
											
											success : (content) => {
												installDependency(content, callback);
											}
										});
									}
								}
							});
						},
						
						() => {
							return () => {
								
								REMOVE_FOLDER({
									path : 'BOX/' + boxName,
									isSync : true
								}, {
									notExists : () => {
										// ignore.
									}
								});
								
								DOWNLOAD({
									url : BOX_SITE_URL + '/__RF/BoxSite/' + boxData.fileId,
									path : 'BOX/__' + boxName + '.zip'
								}, () => {
									
									READ_FILE('BOX/__' + boxName + '.zip', (content) => {
										
										JSZip.loadAsync(content).then((zip) => {
											
											let fileInfos = [];
											
											zip.forEach((path, file) => {
												if (path[path.length - 1] !== '/') {
													fileInfos.push({
														path : path,
														file : file
													});
												}
											});
											
											NEXT(fileInfos, [
											(fileInfo, next) => {
												
												fileInfo.file.async('nodebuffer').then((content) => {
													
													WRITE_FILE({
														path : 'BOX/' + boxName + fileInfo.path,
														content : content,
														isSync : true
													});
													
													if (fileInfo.path === '/DEPENDENCY') {
														installDependency(content, next);
													}
													
													else {
														next();
													}
												});
											},
											
											() => {
												return () => {
													
													REMOVE_FILE('BOX/__' + boxName + '.zip');
													
													console.log(CONSOLE_BLUE('[' + boxName + '] BOX가 새로 설치되었습니다.'));
													
													callback();
												};
											}]);
										}); 
									});
								});
							};
						}]);
					}
				});
			};
			
			let installDependency = (content, callback) => {
				
				NEXT(content.toString().split('\n'), [
				(box, next) => {
					
					box = box.trim();
					
					if (box !== '' && box.indexOf('/') !== -1) {
						installBox(box.substring(0, box.indexOf('/')), box.substring(box.indexOf('/') + 1), next);
					} else {
						next();
					}
				},
				
				() => {
					return callback;
				}]);
			};
			
			// 설치하기
			let install = self.install = () => {
				
				READ_FILE('DEPENDENCY', {
					
					notExists : () => {
						SHOW_ERROR('ubm', 'DEPENDENCY 파일이 존재하지 않습니다.');
					},
					
					success : (content) => {
						installDependency(content, () => {
							console.log(CONSOLE_GREEN('모든 BOX를 설치하였습니다.'));
						});
					}
				});
			}
			
			// 패킹하기
			let pack = self.pack = (boxName) => {
				
				let commonScript = '';
				let browserScript = '';
				let nodeScript = '';
			
				let copyFolder = (from, to) => {
			
					FIND_FILE_NAMES({
						path : from,
						isSync : true
					}, (fileNames) => {
						EACH(fileNames, (fileName) => {
							COPY_FILE({
								from : from + '/' + fileName,
								to : to + '/' + fileName,
								isSync : true
							});
						});
					});
			
					FIND_FOLDER_NAMES({
						path : from,
						isSync : true
					}, (folderNames) => {
						EACH(folderNames, (folderName) => {
							copyFolder(from + '/' + folderName, to + '/' + folderName);
						});
					});
				};
				
				let scanBoxFolder = (fileFunc, folderFunc) => {
					//REQUIRED: fileFunc
					//REQUIRED: folderFunc
			
					FIND_FILE_NAMES({
						path : boxName,
						isSync : true
					}, (fileNames) => {
						EACH(fileNames, (fileName) => {
							fileFunc(boxName + '/' + fileName);
						});
					});
			
					FIND_FOLDER_NAMES({
						path : boxName,
						isSync : true
					}, (folderNames) => {
						EACH(folderNames, (folderName) => {
							if (folderName !== 'BROWSER' && folderName !== 'COMMON' && folderName !== 'NODE') {
								folderFunc(boxName + '/' + folderName);
							}
						});
					});
				};
				
				let loadForCommon = (relativePath) => {
					//REQUIRED: relativePath
			
					if (Path.extname(relativePath) === '.js') {
			
						// add to common script.
						commonScript += READ_FILE({
							path : relativePath,
							isSync : true
						}) + '\n';
					}
				};
				
				let loadForBrowser = (relativePath) => {
					//REQUIRED: relativePath
			
					if (Path.extname(relativePath) === '.js') {
			
						// add to browser script.
						browserScript += READ_FILE({
							path : relativePath,
							isSync : true
						}) + '\n';
					}
				};
				
				let loadForNode = (relativePath) => {
					//REQUIRED: relativePath
			
					if (Path.extname(relativePath) === '.js') {
			
						// add to node script.
						nodeScript += READ_FILE({
							path : relativePath,
							isSync : true
						}) + '\n';
					}
				};
			
				// pack box.
				console.log(CONSOLE_BLUE('[' + boxName + '] BOX를 패킹합니다.'));
			
				// for common scripts.
				console.log('공용 스크립트를 로딩합니다.');
				scanFolder(boxName + '/COMMON', '', loadForCommon);
				commonScript = MINIFY_JS(commonScript);
				
				if (commonScript !== '') {
					
					console.log('공용 스크립트를 저장합니다.');
			
					WRITE_FILE({
						path : '__PACK/' + boxName + '/COMMON.js',
						content : commonScript,
						isSync : true
					});
				}
				
				else {
					console.log(CONSOLE_YELLOW('공용 스크립트가 없습니다.'));
				}
				
				// for browser scripts.
				console.log('웹 브라우저 환경 스크립트를 로딩합니다.');
				scanFolder(boxName + '/BROWSER', '', loadForBrowser);
				browserScript = MINIFY_JS(browserScript);
				
				if (commonScript !== '' || browserScript !== '') {
					
					console.log('웹 브라우저 환경 스크립트를 저장합니다.');
			
					WRITE_FILE({
						path : '__PACK/' + boxName + '/BROWSER.js',
						content : commonScript + browserScript,
						isSync : true
					});
				}
				
				else {
					console.log(CONSOLE_YELLOW('웹 브라우저 환경 스크립트가 없습니다.'));
				}
				
				// for node sciprt.
				console.log('Node.js 환경 스크립트를 로딩합니다.');
				scanFolder(boxName + '/NODE', '', loadForNode);
				nodeScript = MINIFY_JS(nodeScript);
				
				if (commonScript !== '' || nodeScript !== '') {
					
					console.log('Node.js 환경 스크립트를 저장합니다.');
			
					WRITE_FILE({
						path : '__PACK/' + boxName + '/NODE.js',
						content : commonScript + nodeScript,
						isSync : true
					});
				}
				
				else {
					console.log(CONSOLE_YELLOW('Node.js 환경 스크립트가 없습니다.'));
				}
			
				// save node module.
				if (CHECK_FILE_EXISTS({
					path : boxName + '/NODE/node_modules',
					isSync : true
				}) === true) {
					console.log('Node.js 모듈을 저장합니다.');
					copyFolder(boxName + '/NODE/node_modules', '__PACK/' + boxName + '/node_modules');
				}
				
				console.log('기타 포함되어 있는 파일들을 저장합니다.');
				
				// copy all files.
				scanBoxFolder((path) => {
					COPY_FILE({
						from : path,
						to : '__PACK/' + boxName + '/' + path.substring(boxName.length + 1),
						isSync : true
					});
				}, (path) => {
					copyFolder(path, '__PACK/' + boxName + '/' + path.substring(boxName.length + 1));
				});
				
				// copy readme file.
				COPY_FILE({
					from : 'README.md',
					to : '__PACK/' + boxName + '/README.md',
					isSync : true
				});
				
				// copy version file.
				COPY_FILE({
					from : 'VERSION',
					to : '__PACK/' + boxName + '/VERSION',
					isSync : true
				});
				
				// copy dependency file.
				COPY_FILE({
					from : 'DEPENDENCY',
					to : '__PACK/' + boxName + '/DEPENDENCY',
					isSync : true
				}, {
					notExists : () => {
						// ignore.
					}
				});
			
				// done!
				console.log(CONSOLE_GREEN('[' + boxName + '] BOX를 성공적으로 패킹하였습니다.'));
			};
			
			// API 문서 생성하기
			let api = self.api = (boxName) => {
				
				console.log(CONSOLE_BLUE('[' + boxName + '] BOX의 API 문서를 생성합니다.'));
				
				require('uppercase-api-generator')(boxName, 'API');
				
				console.log(CONSOLE_GREEN('[' + boxName + '] BOX의 API 문서를 성공적으로 생성하였습니다.'));
			};
			
			// 출시하기
			let publish = self.publish = (boxName, username, password) => {
			
				let readme = READ_FILE({
					path : '__PACK/' + boxName + '/README.md',
					isSync : true
				}, {
					notExists : () => {
						// ignore.
					}
				});
				
				if (readme !== undefined) {
					readme = readme.toString();
				}
				
				let dependency = READ_FILE({
					path : '__PACK/' + boxName + '/DEPENDENCY',
					isSync : true
				}, {
					notExists : () => {
						// ignore.
					}
				});
				
				if (dependency !== undefined) {
					dependency = dependency.toString();
					dependency = dependency.split('\n');
				}
				
				READ_FILE('__PACK/' + boxName + '/VERSION', {
					
					notExists : () => {
						SHOW_ERROR('ubm', 'VERSION 파일이 존재하지 않습니다.');
					},
					
					success : (versionContent) => {
						
						let zip = JSZip();
						
						scanFolder('__PACK/' + boxName, '', (fromPath, toPath) => {
							
							zip.file(toPath, READ_FILE({
								path : fromPath,
								isSync : true
							}));
						}, true);
						
						zip.generateAsync({
							type : 'nodebuffer'
						}).then((content) => {
							
							let req = Request.post({
								rejectUnauthorized : false,
								url : BOX_SITE_URL + '/__UPLOAD?boxName=BoxSite'
							}, (err, res, result) => {
								if (err !== TO_DELETE) {
									SHOW_ERROR('ubm', '저장소에 접속할 수 없습니다.', err);
								} else {
									
									POST({
										url : BOX_SITE_URL + '/_/publish',
										data : {
											username : username,
											password : password,
											
											boxName : boxName,
											fileId : JSON.parse(result)[0].id,
											version : versionContent.toString(),
											readme : readme,
											dependency : dependency
										}
									}, (result) => {
										result = PARSE_STR(result);
										
										if (result === undefined) {
											
											console.log(CONSOLE_GREEN('성공적으로 출시되었습니다.'));
											
										} else {
											
											let validErrors = result.validErrors;
											
											if (validErrors.password !== undefined) {
												if (validErrors.password.type === 'wrong') {
													SHOW_ERROR('ubm', '아이디와 비밀번호를 확인해주시기 바랍니다.');
												}
											}
											
											else if (validErrors.version !== undefined) {
												if (validErrors.version.type === 'existed') {
													SHOW_ERROR('ubm', '이미 존재하는 버전입니다.');
												}
											}
											
											else if (validErrors.dependency !== undefined) {
												SHOW_ERROR('ubm', 'DEPENDENCY 파일을 확인해주시기 바랍니다.');
											}
											
											else if (validErrors.readme !== undefined) {
												if (validErrors.version.type === 'size') {
													SHOW_ERROR('ubm', 'README 파일이 너무 깁니다.');
												}
											}
											
											else {
												SHOW_ERROR('ubm', '알 수 없는 오류가 발생했습니다.');
											}
										}
									});
								}
							});
							
							req.form().append('file', content, {
								filename : 'project.zip',
								contentType : 'application/zip'
							});
						});
					}
				});
			};
			
			// 프로젝트 폴더 초기화
			let init = self.init = (boxName) => {
				
				let cal = CALENDAR();
				
				let port = '8' + cal.getMonth(true).substring(1) + cal.getDate(true);
				
				WRITE_FILE({
					path : boxName + '.js',
					content : 'require(process.env.UPPERCASE_PATH + \'/LOAD.js\');\n\nBOOT({\n\tCONFIG : {\n\t\tdefaultBoxName : \'' + boxName + '\',\n\t\t\n\t\tisDevMode : true,\n\t\t\n\t\twebServerPort : ' + port + '\n\t},\n\t\n\tBROWSER_CONFIG : {\n\t\t\n\t},\n\t\n\tNODE_CONFIG : {\n\t\t// 테스트 목적이기 때문에 CPU 클러스터링 기능을 사용하지 않습니다.\n\t\tisNotUsingCPUClustering : true\n\t}\n});\n',
					isSync : true
				});
				
				WRITE_FILE({
					path : 'VERSION',
					content : '0.0.1',
					isSync : true
				});
				
				WRITE_FILE({
					path : 'DEPENDENCY',
					content : '',
					isSync : true
				});
				
				WRITE_FILE({
					path : boxName + '/BROWSER/MAIN.js',
					content : boxName + '.MAIN = METHOD({\n\t\n\trun : () => {\n\t\t\n\t\t\n\t}\n});\n',
					isSync : true
				});
				
				CREATE_FOLDER({
					path : boxName + '/COMMON',
					isSync : true
				});
				
				WRITE_FILE({
					path : boxName + '/NODE/MAIN.js',
					content : boxName + '.MAIN = METHOD({\n\t\n\trun : (addRequestHandler) => {\n\t\t\n\t\t\n\t}\n});\n',
					isSync : true
				});
				
				WRITE_FILE({
					path : '.gitignore',
					content : '__RF/\n',
					isSync : true
				});
				
				// done!
				console.log(CONSOLE_GREEN('[' + boxName + '] 프로젝트 폴더를 초기화하였습니다.'));
			};
			
			// 하이브리드 앱을 위한 풀 패키징
			let fullpack = self.fullpack = (params) => {
				
				let bootCodePath = params.bootCodePath;
				let path = params.path;
				let extname = params.extname;
				let importResourceFilenames = params.importResourceFilenames;
				
				let bootCode = READ_FILE({
					path : bootCodePath,
					isSync : true
				}).toString();
				
				let configs = eval('(()=>{let config;let BOOT=(_config)=>{config = _config;};\n' + bootCode + '\nreturn config;})()');
				
				let browserScript = '';
				
				// load all UPPERCASE modules for browser.
				EACH(['CORE', 'ROOM', 'MODEL', 'BOOT'], (name, i) => {
					browserScript += READ_FILE({
						path : __dirname + '/node_modules/uppercase-' + name.toLowerCase() + '/BROWSER.MIN.js',
						isSync : true
					}).toString() + '\n';
				});
				
				// configuration
				let version = 'V' + Date.now();
				
				let _CONFIG;
				let _NODE_CONFIG;
				let _BROWSER_CONFIG;
		
				let stringifyJSONWithFunction = (data) => {
		
					return JSON.stringify(data, (key, value) => {
						if (typeof value === 'function') {
							return '__FUNCTION_START__' + value.toString() + '__FUNCTION_END__';
						}
						return value;
					}, '\t').replace(/("__FUNCTION_START__(.*)__FUNCTION_END__")/g, (match, content) => {
						return eval('(' + eval('"' + content.substring('"__FUNCTION_START__'.length, content.length - '__FUNCTION_END__"'.length) + '"') + ')').toString();
					});
				};
				
				if (configs !== undefined) {
					_CONFIG = configs.CONFIG;
					_BROWSER_CONFIG = configs.BROWSER_CONFIG;
				}
		
				// override CONFIG.
				if (_CONFIG !== undefined) {
					_CONFIG.isDevMode = false;
					// add CONFIG to browser script.
					browserScript += 'EXTEND({ origin : CONFIG, extend : ' + stringifyJSONWithFunction(_CONFIG) + ' });\n\n';
				}
				
				READ_FILE({
					path : 'VERSION',
					isSync : true
				}, {
					notExists : () => {
						// ignore.
					},
					success : (buffer) => {
						version = buffer.toString();
					}
				});
				
				browserScript += 'CONFIG.version = \'' + version + '\';\n\n';
				
				if (_CONFIG.isUsingProxy === true) {
					browserScript += 'CONFIG.webServerPort = BROWSER_CONFIG.port;\n\n';
				}
		
				// override BROWSER_CONFIG.
				if (_BROWSER_CONFIG !== undefined) {
		
					// add BROWSER_CONFIG to browser script.
					browserScript += 'EXTEND({ origin : BROWSER_CONFIG, extend : ' + stringifyJSONWithFunction(_BROWSER_CONFIG) + ' });\n\n';
				}
				
				// create UPPERCASE box.
				BOX('UPPERCASE');
				
				browserScript += 'BOX(\'UPPERCASE\');\n\n';
				
				// create box.
				BOX(_CONFIG.defaultBoxName);

				browserScript += 'BOX(\'' + _CONFIG.defaultBoxName + '\');\n\n';
				
				if (CHECK_FILE_EXISTS({
					path : Path.resolve('.') + '/BOX',
					isSync : true
				}) === true) {
		
					// init boxes is BOX folder.
					FIND_FOLDER_NAMES({
						path : Path.resolve('.') + '/BOX',
						isSync : true
					}, (folderNames) => {
		
						EACH(folderNames, (folderName) => {
		
							if (CHECK_IS_ALLOWED_FOLDER_NAME(folderName) === true) {
		
								// create box.
								BOX(folderName);
		
								browserScript += 'BOX(\'' + folderName + '\');\n\n';
								
								// save box name.
								INIT_BOXES.getBoxNamesInBOXFolder().push(folderName);
							}
						});
					});
				}
				
				LOAD_ALL_SCRIPTS({
					rootPath : Path.resolve('.'),
					env : 'BROWSER'
				}, (path, boxName) => {
					
					browserScript += READ_FILE({
						path : path,
						isSync : true
					}).toString() + '\n';
				});
				
				// save all resources as data urls.
				let resourceDataURLs = [];
				
				FOR_BOX((box) => {
					
					let boxRootPath = CHECK_IS_IN({
						array : INIT_BOXES.getBoxNamesInBOXFolder(),
						value : box.boxName
					}) === true ? Path.resolve('.') + '/BOX' : Path.resolve('.');
					
					let scan = (folderPath, relativePath) => {
						
						if (CHECK_FILE_EXISTS({
							path : folderPath,
							isSync : true
						}) === true) {
							
							FIND_FILE_NAMES({
								path : folderPath,
								isSync : true
							}, EACH((fileName) => {
								
								let ext = Path.extname(fileName).substring(1);
								
								if (
								// mp3 파일을 포함하려면 ogg 파일은 포함되면 안됨
								(ext !== 'mp3' || extname !== 'ogg') &&
								
								// wav 파일을 포함하려면 ogg 파일은 포함되면 안됨
								(ext !== 'wav' || extname !== 'ogg') &&
								
								// ogg 파일을 포함하려면 mp3 파일은 포함되면 안됨
								(ext !== 'ogg' || extname !== 'mp3')) {
									
									if (CHECK_IS_IN({
										array : importResourceFilenames,
										value : fileName
									}) === true || CHECK_IS_IN({
										array : importResourceFilenames,
										value : '*.' + ext
									}) === true) {
										
										resourceDataURLs.push({
											path : relativePath + '/' + fileName,
											dataURL : 'data:' + WEB_SERVER.getContentTypeFromExtension(ext) + ';charset=utf-8,' + encodeURIComponent(READ_FILE({
												path : folderPath + '/' + fileName,
												isSync : true
											}).toString()).replace(/\'/g, '\\\'')
										});
									}
									
									else {
										
										COPY_FILE({
											from : boxRootPath + '/' + relativePath + '/' + fileName,
											to : path + '/' + relativePath + '/' + fileName,
											isSync : true
										});
									}
								}
							}));
							
							FIND_FOLDER_NAMES({
								path : folderPath,
								isSync : true
							}, EACH((folderName) => {
								scan(folderPath + '/' + folderName, relativePath + '/' + folderName);
							}));
						}
					};
					
					scan(boxRootPath + '/' + box.boxName + '/R', box.boxName + '/R');
				});
				
				browserScript += 'FOR_BOX(o=>{o.R=METHOD(e=>{let i;e.setBasePath=(o=>{i=o});return{run:(e,r)=>{let t=o.boxName+"/R/"+e,a=__R[t];return void 0!==a?t=a:(void 0!==CONFIG.version&&(t+="?version="+CONFIG.version),void 0!==i&&(t=i+"/"+t),"file:"===location.protocol?o.boxName!==CONFIG.defaultBoxName&&(t="BOX/"+t):t="/"+t),void 0!==r&&GET(t,r),t}}})});';
				
				// browser script.
				WRITE_FILE({
					path : path + '/__SCRIPT',
					content : MINIFY_JS(browserScript)
				});
				
				// resource script.
				let resourceScript = 'global.__R={';
				EACH(resourceDataURLs, (info, i) => {
					if (i > 0) {
						resourceScript += ',';
					}
					resourceScript += '\'' + info.path + '\':\'' + info.dataURL + '\'';
				});
				resourceScript += '};'
				
				WRITE_FILE({
					path : path + '/__R',
					content : resourceScript
				});
				
				// base style css.
				COPY_FILE({
					from : __dirname + '/node_modules/uppercase-boot/R/BASE_STYLE.MIN.css',
					to : path + '/__CSS.css',
					isSync : true
				});
				
				// done!
				console.log(CONSOLE_GREEN('[' + _CONFIG.defaultBoxName + '] 프로젝트를 성공적으로 패키징하였습니다.'));
			};
		}
	};
});
