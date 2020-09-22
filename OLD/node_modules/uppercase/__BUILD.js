// load UPPERCASE-CORE.
require('uppercase-core');

/*
 * distribute UPPERCASE.
 */
RUN(() => {
	
	const TITLE = 'UPPERCASE-BOOT';	
	const BASE_CONTENT = '\'use strict\';\n\n/*\n\nWelcome to ' + TITLE + '! (http://uppercase.io)\n\n*/\n\n';
	
	let log = (msg) => {
		console.log(TITLE + ' BUILD: ' + msg);
	};

	let scanFolder = (scripts, path) => {
		//REQUIRED: scripts
		//REQUIRED: path

		FIND_FILE_NAMES({
			path : './SRC/' + path,
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
			path : './SRC/' + path,
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
			} else {
				content += '\n';
			}
			
			content += READ_FILE({
				path : './SRC/' + scriptPath,
				isSync : true
			}).toString();
		});
		
		WRITE_FILE({
			path : './DIST/' + path + '.js',
			content : content,
			isSync : true
		});
		
		if (isToSaveMin === true) {
			
			content = '';
		
			EACH(scriptPaths, (scriptPath) => {
				content += MINIFY_JS(READ_FILE({
					path : './SRC/' + scriptPath,
					isSync : true
				}));
			});
	
			WRITE_FILE({
				path : './DIST/' + path + '.MIN.js',
				content : content,
				isSync : true
			});
		}
		
		return content;
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
		
		WRITE_FILE({
			path : './R/BASE_STYLE.MIN.css',
			content : MINIFY_CSS(READ_FILE({
				path : './R/BASE_STYLE.css',
				isSync : true
			})),
			isSync : true
		});
		
		save(['BROWSER_INIT.js'], 'BROWSER_INIT', true);
		save(['404.js'], '404', false);
	};

	INIT_OBJECTS();

	distModule();

	log('DONE.');
});
