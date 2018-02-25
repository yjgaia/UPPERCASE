// load UPPERCASE-CORE.
require('../../UPPERCASE-CORE/NODE.js');

/*
 * distribute UPPERCASE.
 */
RUN(() => {
	
	const TITLE = 'UPPERCASE-CORE';	
	const BASE_CONTENT = '\'use strict\';\n\n/*\n\nWelcome to ' + TITLE + '! (http://uppercase.io)\n\n*/\n\n';
	
	let log = (msg) => {
		console.log(TITLE + ' BUILD: ' + msg);
	};

	let scanFolder = (scripts, path) => {
		//REQUIRED: scripts
		//REQUIRED: path

		FIND_FILE_NAMES({
			path : path,
			isSync : true
		}, {

			notExists : () => {
				// ignore.
			},

			success : (fileNames) => {
				EACH(fileNames, (fileName) => {
					scripts.push(path + '/' + fileName);
				});
			}
		});

		FIND_FOLDER_NAMES({
			path : path,
			isSync : true
		}, {

			notExists : () => {
				// ignore.
			},

			success : (folderNames) => {
				EACH(folderNames, (folderName) => {
					scanFolder(scripts, path + '/' + folderName);
				});
			}
		});
	};

	let save = (scriptPaths, path, isToSaveMin) => {
		
		let content;
		
		EACH(scriptPaths, (scriptPath) => {
			
			if (content === undefined) {
				content = BASE_CONTENT;
				
				if (path === 'BROWSER') {
					content += '// 웹 브라우저 환경에서는 window가 global 객체 입니다.\n';
					content += 'let global = window;\n\n';
				}
				
			} else {
				content += '\n';
			}
			
			content += READ_FILE({
				path : scriptPath,
				isSync : true
			}).toString();
		});
		
		WRITE_FILE({
			path : '../../' + TITLE + '/' + path + '.js',
			content : content,
			isSync : true
		});
		
		if (path === 'COMMON') {
			WRITE_FILE({
				path : '../../' + TITLE + '-COMMON/' + path + '.js',
				content : content,
				isSync : true
			});
		}
		
		if (isToSaveMin === true) {
			
			content = '';
			
			if (path === 'BROWSER') {
				content += 'let global=window;';
			}
		
			EACH(scriptPaths, (scriptPath) => {
				content += MINIFY_JS(READ_FILE({
					path : scriptPath,
					isSync : true
				}));
			});
	
			WRITE_FILE({
				path : '../../' + TITLE + '/' + path + '.MIN.js',
				content : content,
				isSync : true
			});
			
			if (path === 'COMMON') {
				WRITE_FILE({
					path : '../../' + TITLE + '-COMMON/' + path + '.MIN.js',
					content : content,
					isSync : true
				});
			}
		}
		
		return content;
	};

	let copyFolder = (from, to) => {

		let realTo = '../../' + TITLE + '/' + to;

		FIND_FILE_NAMES({
			path : from,
			isSync : true
		}, {

			notExists : () => {
				// ignore.
			},

			success : (fileNames) => {
				EACH(fileNames, (fileName) => {
					
					if (fileName.substring(fileName.lastIndexOf('.')) === '.css') {
						
						let content = READ_FILE({
							path : from + '/' + fileName,
							isSync : true
						});
						
						WRITE_FILE({
							path : realTo + '/' + fileName.substring(0, fileName.lastIndexOf('.')) + '.css',
							content : content,
							isSync : true
						});
						
						WRITE_FILE({
							path : realTo + '/' + fileName.substring(0, fileName.lastIndexOf('.')) + '.MIN.css',
							content : MINIFY_CSS(content),
							isSync : true
						});
					}
					
					else {
						
						COPY_FILE({
							from : from + '/' + fileName,
							to : realTo + '/' + fileName,
							isSync : true
						});
					}
				});
			}
		});

		FIND_FOLDER_NAMES({
			path : from,
			isSync : true
		}, {

			notExists : () => {
				// ignore.
			},

			success : (folderNames) => {
				EACH(folderNames, (folderName) => {
					copyFolder(from + '/' + folderName, to + '/' + folderName);
				});
			}
		});
	};
	
	let distFolder = (preScripts, name, isToSaveMin) => {

		let scripts = [];

		scanFolder(scripts, name);

		if (preScripts.length > 0 || scripts.length > 0) {
			save(scripts = COMBINE([preScripts, scripts]), name, isToSaveMin);
		}
		
		return scripts;
	};
	
	let distModule = () => {
		
		log('START.');

		let commonScripts = distFolder([], 'COMMON', true);
		distFolder(commonScripts, 'BROWSER', true);
		distFolder(commonScripts, 'NODE');
		copyFolder('R', 'R');
	};

	INIT_OBJECTS();

	distModule();

	log('DONE.');
});
