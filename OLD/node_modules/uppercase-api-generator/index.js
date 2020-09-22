module.exports = (sourcePath, apiPath, exceptFileNames) => {
	
	let UglifyJS = require('hanul-uglify-js');
	let Path = require('path');
	
	let checkIsAllowedFolderName = (name) => {
		//REQUIRED: name

		return (
			// hide folder
			name[0] !== '.' &&
			
			// node.js module
			name !== 'node_modules' &&
			
			// final resources
			name !== '__RF' &&
			
			// packed files
			name !== '__PACK' &&
			
			// not using files
			name !== '__NOT_USING' &&
			
			// deprecated files
			name !== '__OLD' &&
			
			name !== 'R' &&
			name !== 'LIB' &&
			name !== 'POLYFILL' &&
			
			// no except file name
			CHECK_IS_IN({
				array : exceptFileNames,
				value : name
			}) !== true
		);
	};
	
	let parse = (sourcePath, apiPath, fileName, parentPathPrefix) => {
		
		let readmeMarkdown = '';
		
		let source = READ_FILE({
			path : sourcePath + '/' + fileName,
			isSync : true
		}).toString();
		
		let result = UglifyJS.parse(source);
		
		let syntax = result.body[0].body;
		
		let originName;
		
		if (result.start.value === 'FOR_BOX') {
			result = result.body[0].body.args[0].body;
			result = result[result.length - 1];
			syntax = result.body;
		} else if (result.start.value === 'OVERRIDE') {
			
			originName = result.body[0].body.args[0].name;
			
			result = result.body[0].body.args[1].body;
			result = result[result.length - 1];
			syntax = result.body;
		}
		
		if (result.start.value === 'FOR_BOX') {
			result = result.body.args[0].body;
			result = result[result.length - 1];
			syntax = result.body;
		} else if (result.start.value === 'OVERRIDE') {
			
			originName = result.body.args[0].property;
			
			result = result.body.args[1].body;
			result = result[result.length - 1];
			syntax = result.body;
		}
		
		let description;
		
		EACH(result.start.comments_before, (comment, i) => {
			if (i === 0) {
				description = '';
			} else {
				description += '\n';
			}
			description += comment.value.trim();
		});
		
		if (description !== undefined) {
			if (description[0] === '*') {
				description = description.substring(1);
			}
			description = description.replace(/\n[\t]* \* /g, '\n').replace(/\n[\t]* \*/g, '\n').trim();
		}
		
		let left = syntax.left;
		let right = syntax.right;
		
		if (left !== undefined && right !== undefined) {
			
			readmeMarkdown += '* [' + (parentPathPrefix === undefined ? '' : parentPathPrefix + '/') + fileName.substring(0, fileName.length - Path.extname(fileName).length) + '.md](' + (parentPathPrefix === undefined ? '' : parentPathPrefix + '/') + fileName.substring(0, fileName.length - Path.extname(fileName).length) + '.md)' + (description === undefined ? '' : ' ' + description.replace(/\n/g, ' ').replace(/\r/g, '')) + '\n';
			
			if (parentPathPrefix === undefined) {
				
				let name = source.substring(left.start.pos, left.end.endpos);
				
				if (name.indexOf('global.') === 0) {
					name = name.substring(7);
				}
				
				let parseParams = (params, definition, _comments) => {
					
					let comments;
					
					if (definition.body.length === 0) {
						if (_comments !== undefined) {
							comments = _comments;
						} else if (definition.end !== undefined) {
							comments = definition.end.comments_before;
						}
					} else {
						comments = definition.body[0].start.comments_before;
					}
					
					if (comments !== undefined) {
						
						EACH(comments, (commentInfo) => {
							
							let comment = commentInfo.value;
							
							if (comment.substring(0, 9) === 'REQUIRED:' || comment.substring(0, 9) === 'OPTIONAL:') {
								
								let isRequired = comment.substring(0, 9) === 'REQUIRED:';
								
								comment = comment.substring(9).trim();
								
								let index = comment.indexOf(' ') !== -1 && comment.indexOf(' ') < comment.indexOf('\t') ? comment.indexOf(' ') : comment.indexOf('\t');
								
								params.push({
									name : index === -1 ? comment : comment.substring(0, index),
									isRequired : isRequired,
									description : index === -1 ? undefined : comment.substring(index).trim()
								});
							}
						});
					}
				};
				
				let type;
				let paramNames = [];
				let params = [];
				
				let staticMemberName;
				let staticBlock;
				
				let bodyBlock;
				
				let momName;
				
				if (right.start === undefined || right.start.value === '(' || right.start.value === 'function') {
				
					type = 'function';
					
					bodyBlock = right.value;
					
					if (right.argnames !== undefined) {
						
						EACH(right.argnames, (argname) => {
							
							if (argname.name[0] === '_') {
								argname.name = argname.name.substring(1);
							}
							
							paramNames.push(argname.name);
						});
						
						parseParams(params, right, syntax.end.comments_before);
					}
				}
				
				else if (right.start.type === 'punc') {
					type = 'DATA';
				}
				
				else if (right.start.type === 'atom') {
					type = 'var';
				}
				
				else {
					
					type = right.start.value;
					
					// make params.
					NEXT([
					(next) => {
						
						if (right.args === undefined) {
							next([]);
						}
						
						else {
							
							let arg = right.args[0];
							
							if (arg.properties !== undefined && arg.properties[0] !== undefined) {
								next(arg.properties);
							}
							
							// static
							else if (arg.body !== undefined) {
								
								if (arg.argnames[0] !== undefined) {
									staticMemberName = arg.argnames[0].name;
								}
								
								staticBlock = arg.body;
								
								next(staticBlock[staticBlock.length - 1].value.properties);
							}
						}
					},
					
					() => {
						return (properties) => {
							
							EACH(properties, (property) => {
								
								if ((type === 'METHOD' && property.key === 'run') || ((type === 'CLASS' || type === 'OBJECT') && property.key === 'init')) {
									
									bodyBlock = property.value.body;
									
									if (property.value.argnames !== undefined) {
										
										EACH(property.value.argnames, (argname) => {
											
											if (argname.name[0] === '_') {
												argname.name = argname.name.substring(1);
											}
											
											paramNames.push(argname.name);
										});
									
										parseParams(params, property.value);
									}
								}
								
								if ((type === 'CLASS' || type === 'OBJECT') && property.key === 'preset') {
									
									let body = property.value.body;
									
									body = body[body.length - 1];
									
									if (body !== undefined) {
										momName = source.substring(body.value.start.pos, body.value.end.endpos);
									}
								}
							});
						};
					}]);
				}
				
				let parseBlock = (memberName, block, funcInfos) => {
					
					EACH(block, (body) => {
						
						if (body.start.value === 'let') {
							
							let definition = body.definitions[0].value;
							
							if (definition !== TO_DELETE && definition.start !== undefined && memberName === definition.start.value) {
								
								if (definition.left !== undefined) {
									
									let name = definition.left.property;
									
									let description;
									
									if (body.start.comments_before.length > 0) {
										
										description = '';
										
										let beforeLines = 1;
										
										REVERSE_EACH(body.start.comments_before, (comment, i) => {
										
											if (body.start.line === comment.line + 1) {
												
												if (description !== '') {
													description += '\n';
												}
												
												description += comment.value.trim();
												
												beforeLines += 1;
											}
										});
									}
									
									let paramNames = [];
									let params = [];
									
									if (definition.right.argnames !== undefined) {
										
										EACH(definition.right.argnames, (argname) => {
											
											if (argname.name[0] === '_') {
												argname.name = argname.name.substring(1);
											}
											
											paramNames.push(argname.name);
										});
										
										parseParams(params, definition.right, definition.end.comments_before);
									}
									
									funcInfos.push({
										name : name,
										description : description,
										paramNames : paramNames,
										params : params
									});
								}
							}
						}
					});
				};
				
				let markdown = '';
				
				if (type === 'function' || type === 'METHOD' || type === 'CLASS' || type === 'OBJECT') {
					
					markdown += '# ' + (type !== 'function' ? '`' + type + '` ' : '') + name.replace(/\(\'/g, '').replace(/\'\)/g, '');
					
					if (type === 'function') {
						
						markdown += '('
						
						if (paramNames.length > 0) {
							EACH(paramNames, (paramName, i) => {
								if (i > 0) {
									markdown += ', ';
								}
								markdown += paramName;
							});
						}
						
						markdown += ')';
					}
					
					markdown += '\n';
				}
				
				else {
					markdown += '# `' + name + '`\n';
				}
				
				if (description !== undefined) {
					markdown += description + '\n';
				}
				
				let staticFuncInfos = [];
				let publicFuncInfos = [];
				
				if (type !== 'data') {
					
					parseBlock(staticMemberName, staticBlock, staticFuncInfos);
					
					if (type === 'CLASS' || type === 'OBJECT') {
						
						parseBlock('self', bodyBlock, publicFuncInfos);
						
						if (momName !== undefined) {
							markdown += '\n## Mom CLASS' + '\n';
							if (originName !== undefined) {
								markdown += '`' + originName + '`\n';
							} else {
								markdown += '`' + momName + '`\n';
							}
						}
					}
					
					if (params.length > 0) {
						
						markdown += '\n## Parameters' + '\n';
						
						EACH(params, (param) => {
							markdown += '* ' + (param.isRequired === true ? '`REQUIRED`' : '`OPTIONAL`') + ' *' + param.name + '*' + (param.description === undefined ? '' : ' ' + param.description) + '\n';
						});
					}
					
					if (staticFuncInfos.length > 0) {
						
						markdown += '\n## Static Members' + '\n';
						
						EACH(staticFuncInfos, (staticFuncInfo) => {
							
							markdown += '\n### `' + staticFuncInfo.name + '('
							
							if (staticFuncInfo.paramNames.length > 0) {
								EACH(staticFuncInfo.paramNames, (paramName, i) => {
									if (i > 0) {
										markdown += ', ';
									}
									markdown += paramName;
								});
							}
							
							markdown += ')`\n';
							
							if (staticFuncInfo.description !== undefined) {
								markdown += staticFuncInfo.description + '\n';
							}
							
							if (staticFuncInfo.params.length > 0) {
								
								markdown += '#### Parameters' + '\n';
								
								EACH(staticFuncInfo.params, (param) => {
									markdown += '* ' + (param.isRequired === true ? '`REQUIRED`' : '`OPTIONAL`') + ' *' + param.name + '*' + (param.description === undefined ? '' : ' ' + param.description) + '\n';
								});
							}
						});
					}
					
					if (type === 'CLASS' || type === 'OBJECT') {
						
						
						if (publicFuncInfos.length > 0) {
							
							markdown += '\n## Public Members' + '\n';
							
							EACH(publicFuncInfos, (publicFuncInfo) => {
								
								markdown += '\n### `' + publicFuncInfo.name + '('
								
								if (publicFuncInfo.paramNames.length > 0) {
									EACH(publicFuncInfo.paramNames, (paramName, i) => {
										if (i > 0) {
											markdown += ', ';
										}
										markdown += paramName;
									});
								}
								
								markdown += ')`\n';
								
								if (publicFuncInfo.description !== undefined) {
									markdown += publicFuncInfo.description + '\n';
								}
								
								if (publicFuncInfo.params.length > 0) {
									
									markdown += '#### Parameters' + '\n';
									
									EACH(publicFuncInfo.params, (param) => {
										markdown += '* ' + (param.isRequired === true ? '`REQUIRED`' : '`OPTIONAL`') + ' *' + param.name + '*' + (param.description === undefined ? '' : ' ' + param.description) + '\n';
									});
								}
							});
						}
					}
				}
				
				WRITE_FILE({
					path : apiPath + '/' + fileName.substring(0, fileName.length - Path.extname(fileName).length) + '.md',
					content : markdown,
					isSync : true
				});
			}
		}
		
		return readmeMarkdown;
	};
	
	let scanFolder = (sourcePath, apiPath, folderName, parentPathPrefix, readmeMarkdownHeaderLevel) => {
		
		if (folderName !== undefined) {
			sourcePath += '/' + folderName;
			apiPath += '/' + folderName;
		}
		
		if (CHECK_FILE_EXISTS({
			path : sourcePath,
			isSync : true
		}) === true) {
		
			let readmeMarkdown = '';
			
			let readmeMarkdownTop;
			let readmeMarkdownBottom = '';
			
			if (parentPathPrefix === undefined) {
				
				if (CHECK_FILE_EXISTS({
					path : sourcePath + '/API.md',
					isSync : true
				}) === true) {
				
					let originReadmeMarkdown = READ_FILE({
						path : sourcePath + '/API.md',
						isSync : true
					}).toString();
					
					if (originReadmeMarkdown.indexOf('## API') !== -1) {
						readmeMarkdownTop = originReadmeMarkdown.substring(0, originReadmeMarkdown.indexOf('## API') + 6) + '\n';
						for (let i = originReadmeMarkdown.indexOf('## API') + 6; i < originReadmeMarkdown.length; i += 1) {
							if (originReadmeMarkdown[i] === '#') {
								readmeMarkdownBottom = '\n' + originReadmeMarkdown.substring(i);
								break;
							}
						}
					}
					
					else {
						readmeMarkdownTop = originReadmeMarkdown.trim() + '\n\n## API\n'
					}
					
					readmeMarkdownHeaderLevel = 2;
				}
				
				else {
					readmeMarkdownTop = '# ' + (folderName === undefined ? '' : folderName + ' ') + 'API\n'
					readmeMarkdownHeaderLevel = 1;
				}
			}

			FIND_FILE_NAMES({
				path : sourcePath,
				isSync : true
			}, {

				error : () => {
					// ignore.
				},

				success : (fileNames) => {
					
					EACH(fileNames, (fileName) => {
						
						if (fileName[0] !== '_' && Path.extname(fileName) === '.js' && CHECK_IS_IN({
							array : exceptFileNames,
							value : fileName
						}) !== true) {
							
							readmeMarkdown += parse(sourcePath, apiPath, fileName, parentPathPrefix);
						}
					});
				}
			});
			
			FIND_FOLDER_NAMES({
				path : sourcePath,
				isSync : true
			}, {

				error : () => {
					// ignore.
				},

				success : (folderNames) => {
					
					EACH(folderNames, (folderName) => {
						
						if (checkIsAllowedFolderName(folderName) === true) {
							
							readmeMarkdown += '\n';
							REPEAT(readmeMarkdownHeaderLevel + 1, () => {
								readmeMarkdown += '#';
							});
							readmeMarkdown += ' [' + (parentPathPrefix === undefined ? '' : parentPathPrefix + '/') + folderName + '](' + (parentPathPrefix === undefined ? '' : parentPathPrefix + '/') + folderName + '/README.md)\n';
							
							if (parentPathPrefix === undefined) {
								scanFolder(sourcePath, apiPath, folderName);
							}
							
							readmeMarkdown += scanFolder(sourcePath, apiPath, folderName, (parentPathPrefix === undefined ? '' : parentPathPrefix + '/') + folderName, readmeMarkdownHeaderLevel + 1);
						}
					});
				}
			});
			
			if (parentPathPrefix === undefined) {
				
				WRITE_FILE({
					path : apiPath + '/README.md',
					content : readmeMarkdownTop + readmeMarkdown + readmeMarkdownBottom,
					isSync : true
				});
			}
			
			else {
				return readmeMarkdown;
			}
		}
		
		return '';
	};
	
	scanFolder(sourcePath, apiPath);
	
	console.log(CONSOLE_GREEN('API 문서를 성공적으로 생성하였습니다.'));
};