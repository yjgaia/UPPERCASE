// load UPPERCASE.
require('./node.index.js');
INIT_OBJECTS();

/*
 * pack UPPERCASE.
 */
RUN(() => {

	const TITLE = 'UPPERCASE';
	const BASE_CONTENT = '\'use strict\';\n\n/*\n * Welcome to ' + TITLE + '! (http://uppercase.io)\n */\n\n';

	let log = (msg) => {
		console.log(TITLE + ' PACK: ' + msg);
	};

	let collect = (path, pre) => {
		//REQUIRED: path
		//OPTIONAL: path

		let scripts = pre === undefined ? [] : pre;

		FIND_FILE_NAMES({
			path: './SRC/' + path,
			isSync: true
		}, {

			notExists: () => {
				// ignore.
			},

			success: (fileNames) => {
				EACH(fileNames, (fileName) => {
					if (scripts.includes(path + '/' + fileName) !== true) {
						scripts.push(path + '/' + fileName);
					}
				});
			}
		});

		FIND_FOLDER_NAMES({
			path: './SRC/' + path,
			isSync: true
		}, {

			notExists: () => {
				// ignore.
			},

			success: (folderNames) => {
				EACH(folderNames, (folderName) => {
					scripts = scripts.concat(collect(path + '/' + folderName, pre));
				});
			}
		});

		return scripts;
	};

	log('START.');

	let commonScriptPaths = collect('COMMON',

		// FOR_BOX를 위한 사전 로드
		[
			'COMMON/TO_DELETE.js',
			'COMMON/METHOD.js',
			'COMMON/UTIL/DATA/CHECK_IS_DATA.js',
			'COMMON/UTIL/ARRAY/CHECK_IS_ARRAY.js',
			'COMMON/UTIL/REPEAT/EACH.js',
			'COMMON/BOX/BOX.js',
			'COMMON/BOX/FOR_BOX.js'
		]
	);

	let browserScriptPaths = commonScriptPaths.concat(collect('BROWSER'));
	let nodeScriptPaths = commonScriptPaths.concat(collect('NODE'));

	let browserScript = BASE_CONTENT;
	browserScript += '// 웹 브라우저 환경에서는 window가 global 객체 입니다.\n';
	browserScript += 'let global = window;\n\n';

	EACH(browserScriptPaths, (path) => {
		browserScript += READ_FILE({
			path: './SRC/' + path,
			isSync: true
		}).toString() + '\n';
	});

	let nodeIndexScript = BASE_CONTENT;
	EACH(nodeScriptPaths, (path) => {
		nodeIndexScript += 'require(\'./SRC/' + path + '\');\n';
	});
	nodeIndexScript += '\nmodule.exports = (value) => {\n';
	nodeIndexScript += '	return String(value).toUpperCase();\n';
	nodeIndexScript += '};\n';

	WRITE_FILE({
		path: './UPPERCASE.js',
		content: browserScript,
		isSync: true
	});

	WRITE_FILE({
		path: './node.index.js',
		content: nodeIndexScript,
		isSync: true
	});

	log('DONE.');
});
