module.exports = CLASS((cls) => {
	
	const BOX_SITE_URL = 'https://box.uppercase.io';
	
	let JSZip = require('jszip');
	let Request = require('request');
	
	let Path = require('path');
	let Esprima = require('esprima');
	
	let checkIsAllowedFolderName = (name) => {
		//REQUIRED: name
	
		return (
			// hide folder
			name[0] !== '.' &&
			
			// node.js module
			name !== 'node_modules' &&
	
			// not load
			name !== '__NOT_LOAD' &&
	
			// deprecated
			name !== '__OLD'
		);
	};
	
	let scanFolder = (path, folderPath, func, isToAll) => {
		//REQUIRED: path
		//REQUIRED: folderPath
		//REQUIRED: func
		//OPTIONAL: isToAll
	
		if (CHECK_FILE_EXISTS({
			path : path,
			isSync : true
		}) === true) {
	
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
	
			FIND_FOLDER_NAMES({
				path : path,
				isSync : true
			}, {
	
				error : () => {
					// ignore.
				},
	
				success : (folderNames) => {
					EACH(folderNames, (folderName) => {
						if (isToAll === true || checkIsAllowedFolderName(folderName) === true) {
							scanFolder(path + '/' + folderName, folderPath + '/' + folderName, func, isToAll);
						}
					});
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
		}
	};
});
