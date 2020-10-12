#!/usr/bin/env node

require('uppercase');

INIT_OBJECTS();

RUN(() => {
	
	let Co = require('co');
	let Prompt = require('hanul-co-prompt');
	let Program = require('commander');
	
	let ubm = require('./index.js')();
	
	let packageInfo = PARSE_STR(READ_FILE({
		path : __dirname + '/package.json',
		isSync : true
	}).toString());
	
	Program
		.version(packageInfo.version)
		.arguments('<cmd> [box] [path] [extname] [importResourceFilenames...]')
		.action((cmd, box, path, extname, importResourceFilenames) => {
			
			let username;
			let boxName;
			
			if (box !== undefined && box.indexOf('/') !== -1) {
				username = box.substring(0, box.indexOf('/'));
				boxName = box.substring(box.indexOf('/') + 1);
			}
			
			// 설치하기
			if (cmd === 'install') {
				ubm.install();
			}
			
			// 패킹하기
			else if (cmd === 'pack' && box !== undefined) {
				ubm.pack(box);
			}
			
			// API 문서 생성하기
			else if (cmd === 'api' && box !== undefined) {
				ubm.api(box);
			}
			
			// 출시하기
			else if (cmd === 'publish' && boxName !== undefined) {
				Co(function *() {
					let password = yield Prompt.password('비밀번호: ');
					ubm.publish(boxName, username, password);
				});
			}
			
			// 프로젝트 폴더 초기화
			else if (cmd === 'init' && box !== undefined) {
				ubm.init(box);
			}
			
			// 하이브리드 앱을 위한 프로젝트 풀 패키징
			else if (cmd === 'fullpack' && box !== undefined && path !== undefined) {
				ubm.fullpack({
					bootCodePath : box,
					path : path,
					extname : extname,
					importResourceFilenames : importResourceFilenames
				});
			}
			
			// Web Extension을 위한 프로젝트 풀 패키징
			else if (cmd === 'wefullpack' && box !== undefined && path !== undefined) {
				ubm.fullpackForWebExtension({
					bootCodePath : box,
					path : path,
					extname : extname,
					importResourceFilenames : importResourceFilenames
				});
			}
			
			else {
				SHOW_ERROR('ubm', '알 수 없는 명령입니다.', cmd);
			}
		});
	
	Program.parse(process.argv);
});

