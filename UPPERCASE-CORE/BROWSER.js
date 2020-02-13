'use strict';

/*

Welcome to UPPERCASE-CORE! (http://uppercase.io)

*/

// 웹 브라우저 환경에서는 window가 global 객체 입니다.
let global = window;

/*
 * 기본 설정
 */
global.CONFIG = {
	
	// 개발 모드 설정
	isDevMode : false
};

global.LANG_NAMES = {
	ach : 'Lwo',
	ady : 'Адыгэбзэ',
	af : 'Afrikaans',
	ak : 'Tɕɥi',
	ar : 'العربية',
	az : 'Azərbaycan dili',
	bg : 'Български',
	bn : 'বাংলা',
	ca : 'Català',
	cak : 'Maya Kaqchikel',
	cs : 'Čeština',
	cy : 'Cymraeg',
	da : 'Dansk',
	de : 'Deutsch',
	dsb : 'Dolnoserbšćina',
	el : 'Ελληνικά',
	en : 'English',
	eo : 'Esperanto',
	es : 'Español',
	et : 'eesti keel',
	eu : 'Euskara',
	fa : 'فارسی',
	ff : 'Fulah',
	fi : 'Suomi',
	fr : 'Français',
	ga : 'Gaeilge',
	gl : 'Galego',
	he : 'עברית‏',
	hi : 'हिन्दी',
	hr : 'Hrvatski',
	hsb : 'Hornjoserbšćina',
	ht : 'Kreyòl',
	hu : 'Magyar',
	id : 'Bahasa Indonesia',
	is : 'Íslenska',
	it : 'Italiano',
	ja : '日本語',
	km : 'ភាសាខ្មែរ',
	kab : 'Taqbaylit',
	kn : 'ಕನ್ನಡ',
	ko : '한국어',
	la : 'Latin',
	lb : 'Lëtzebuergesch',
	lt : 'Lietuvių',
	lv : 'Latviešu',
	mai : 'मैथिली, মৈথিলী',
	mk : 'Македонски',
	ml : 'മലയാളം',
	mr : 'मराठी',
	ms : 'Bahasa Melayu',
	mt : 'Malti',
	my : 'ဗမာစကာ',
	no : 'Norsk',
	nb : 'Norsk (bokmål)',
	ne : 'नेपाली',
	nl : 'Nederlands',
	oc : 'Occitan',
	pa : 'ਪੰਜਾਬੀ',
	pl : 'Polski',
	pt : 'Português',
	ro : 'Română',
	ru : 'Русский',
	sk : 'Slovenčina',
	sl : 'Slovenščina',
	sq : 'Shqip',
	sr : 'Српски',
	su : 'Basa Sunda',
	sv : 'Svenska',
	sw : 'Kiswahili',
	ta : 'தமிழ்',
	te : 'తెలుగు',
	tg : 'забо́ни тоҷикӣ́',
	th : 'ภาษาไทย',
	tl : 'Filipino',
	tlh : 'tlhIngan-Hol',
	tr : 'Türkçe',
	uk : 'Українська',
	ur : 'اردو',
	uz : 'O\'zbek',
	vi : 'Tiếng Việt',
	yi : 'ייִדיש',
	'zh-CN' : '中文（中国）',
	'zh-TW' : '中文（台灣）'
};

/*
 * 메소드를 생성합니다.
 */
global.METHOD = (define) => {
	//REQUIRED: define		메소드 정의 구문
	//REQUIRED: define.run	메소드 실행 구문

	let funcs;
	let run;

	let m = (params, funcs) => {
		//OPTIONAL: params
		//OPTIONAL: funcs

		if (run !== undefined) {
			return run(params, funcs);
		}
	};
	
	m.type = METHOD;
	
	if (typeof define === 'function') {
		funcs = define(m);
	}

	// when define is function set
	else {
		funcs = define;
	}

	// init funcs.
	if (funcs !== undefined) {
		run = funcs.run;
	}

	return m;
};

/*
 * BROWSER, NODE 에서 확장해서 사용해야 합니다.
 */
global.MSG = METHOD((m) => {
	
	let msgData = {};
	
	let addData = m.addData = (data) => {
		EXTEND({
			origin : msgData,
			extend : data
		});
	};
	
	return {
		
		run : (keyOrMsgs) => {
			//REQUIRED: keyOrMsgs
			
			let key;
			let msgs;
			
			if (CHECK_IS_DATA(keyOrMsgs) !== true) {
				key = keyOrMsgs;
			} else {
				msgs = keyOrMsgs;
			}
			
			if (key !== undefined) {
				msgs = msgData[key];
			}
			
			let msg;
			
			// get first msg.
			EACH(msgs, (_msg) => {
				msg = _msg;
				return false;
			});
			
			if (msg !== undefined && CHECK_IS_DATA(msg) === true) {
				
				// get first msg.
				EACH(msg, (_msg) => {
					msg = _msg;
					return false;
				});
			}
	
			return msg;
		}
	}
});

/*
 * DB의 update 기능을 사용할 때, 데이터의 특정 값에 TO_DELETE를 지정하게 되면 해당 값이 삭제됩니다.
 * 자세한 것은 DB의 update 예제를 살펴보시기 바랍니다.
 *
 * 참고로 UPPERCASE 기반 프로젝트에서 이 TO_DELETE만이 null이 될 수 있는 유일한 변수입니다.
 * 다른 변수에서는 null을 사용하지 않고 undefined를 사용해 주시기 바랍니다.
 */
global.TO_DELETE = null;

/*
 * _는 undefined의 축약형입니다.
 */
global._ = undefined;

/*
 * BOX를 생성합니다.
 */
global.BOX = METHOD((m) => {

	let boxes = {};
	
	let getAllBoxes = m.getAllBoxes = () => {
		return boxes;
	};

	return {

		run : (boxName) => {
			//REQUIRED: boxName

			let box = (packName) => {
				//REQUIRED: packName

				let packNameSps = packName.split('.');
				
				let pack;

				EACH(packNameSps, (packNameSp) => {

					if (pack === undefined) {

						if (box[packNameSp] === undefined) {
							box[packNameSp] = {};
						}
						
						pack = box[packNameSp];
					}
					
					else {

						if (pack[packNameSp] === undefined) {
							pack[packNameSp] = {};
						}
						
						pack = pack[packNameSp];
					}
				});

				return pack;
			};

			box.type = BOX;
			box.boxName = boxName;

			global[boxName] = boxes[boxName] = box;
			
			if (CONFIG[boxName] === undefined) {
				CONFIG[boxName] = {};
			}

			FOR_BOX.inject(box);

			return box;
		}
	};
});

/*
 * 모든 박스를 대상으로 하는 메소드와 클래스, 싱글톤 객체를 선언할 때 사용합니다.
 */
global.FOR_BOX = METHOD((m) => {

	let funcs = [];
	
	let inject = m.inject = (box) => {
		EACH(funcs, (func) => {
			func(box);
		});
	};

	return {

		run : (func) => {
			//REQUIRED: func

			EACH(BOX.getAllBoxes(), (box) => {
				func(box);
			});

			funcs.push(func);
		}
	};
});

/*
 * 콘솔에 오류 메시지를 출력합니다.
 */
global.SHOW_ERROR = (tag, errorMsg, params) => {
	//REQUIRED: tag
	//REQUIRED: errorMsg
	//OPTIONAL: params
	
	let cal = CALENDAR();
		
	console.error(cal.getYear() + '-' + cal.getMonth(true) + '-' + cal.getDate(true) + ' ' + cal.getHour(true) + ':' + cal.getMinute(true) + ':' + cal.getSecond(true) + ' [' + tag + '] 오류가 발생했습니다. 오류 메시지: ' + errorMsg);
	
	if (params !== undefined) {
		console.error('다음은 오류를 발생시킨 파라미터입니다.');
		console.error(JSON.stringify(params, TO_DELETE, 4));
	}
};
/*
 * 콘솔에 경고 메시지를 출력합니다.
 */
global.SHOW_WARNING = (tag, warningMsg, params) => {
	//REQUIRED: tag
	//REQUIRED: warningMsg
	//OPTIONAL: params
	
	let cal = CALENDAR();
	
	console.warn(cal.getYear() + '-' + cal.getMonth(true) + '-' + cal.getDate(true) + ' ' + cal.getHour(true) + ':' + cal.getMinute(true) + ':' + cal.getSecond(true) + ' [' + tag + '] 경고가 발생했습니다. 경고 메시지: ' + warningMsg);
	
	if (params !== undefined) {
		console.warn('다음은 경고를 발생시킨 파라미터입니다.');
		console.warn(JSON.stringify(params, TO_DELETE, 4));
	}
};
/*@license
	Papa Parse
	v4.5.0
	https://github.com/mholt/PapaParse
	License: MIT
*/
(function(factory)
{
	global.__PAPA = factory();
}(function()
{
	'use strict';

	var IS_WORKER = !global.document && !!global.postMessage,
		IS_PAPA_WORKER = IS_WORKER && /(\?|&)papaworker(=|&|$)/.test(global.location.search),
		LOADED_SYNC = false, AUTO_SCRIPT_PATH;
	var workers = {}, workerIdCounter = 0;

	var Papa = {};

	Papa.parse = CsvToJson;
	Papa.unparse = JsonToCsv;

	Papa.RECORD_SEP = String.fromCharCode(30);
	Papa.UNIT_SEP = String.fromCharCode(31);
	Papa.BYTE_ORDER_MARK = '\ufeff';
	Papa.BAD_DELIMITERS = ['\r', '\n', '"', Papa.BYTE_ORDER_MARK];
	Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
	Papa.SCRIPT_PATH = null;	// Must be set by your code if you use workers and this lib is loaded asynchronously
	Papa.NODE_STREAM_INPUT = 1;

	// Configurable chunk sizes for local and remote files, respectively
	Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
	Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
	Papa.DefaultDelimiter = ',';			// Used if not specified and detection fails

	// Exposed for testing and development only
	Papa.Parser = Parser;
	Papa.ParserHandle = ParserHandle;
	Papa.NetworkStreamer = NetworkStreamer;
	Papa.FileStreamer = FileStreamer;
	Papa.StringStreamer = StringStreamer;
	Papa.ReadableStreamStreamer = ReadableStreamStreamer;
	Papa.DuplexStreamStreamer = DuplexStreamStreamer;

	if (global.jQuery)
	{
		var $ = global.jQuery;
		$.fn.parse = function(options)
		{
			var config = options.config || {};
			var queue = [];

			this.each(function(idx)
			{
				var supported = $(this).prop('tagName').toUpperCase() === 'INPUT'
								&& $(this).attr('type').toLowerCase() === 'file'
								&& global.FileReader;

				if (!supported || !this.files || this.files.length === 0)
					return true;	// continue to next input element

				for (var i = 0; i < this.files.length; i++)
				{
					queue.push({
						file: this.files[i],
						inputElem: this,
						instanceConfig: $.extend({}, config)
					});
				}
			});

			parseNextFile();	// begin parsing
			return this;		// maintains chainability


			function parseNextFile()
			{
				if (queue.length === 0)
				{
					if (isFunction(options.complete))
						options.complete();
					return;
				}

				var f = queue[0];

				if (isFunction(options.before))
				{
					var returned = options.before(f.file, f.inputElem);

					if (typeof returned === 'object')
					{
						if (returned.action === 'abort')
						{
							error('AbortError', f.file, f.inputElem, returned.reason);
							return;	// Aborts all queued files immediately
						}
						else if (returned.action === 'skip')
						{
							fileComplete();	// parse the next file in the queue, if any
							return;
						}
						else if (typeof returned.config === 'object')
							f.instanceConfig = $.extend(f.instanceConfig, returned.config);
					}
					else if (returned === 'skip')
					{
						fileComplete();	// parse the next file in the queue, if any
						return;
					}
				}

				// Wrap up the user's complete callback, if any, so that ours also gets executed
				var userCompleteFunc = f.instanceConfig.complete;
				f.instanceConfig.complete = function(results)
				{
					if (isFunction(userCompleteFunc))
						userCompleteFunc(results, f.file, f.inputElem);
					fileComplete();
				};

				Papa.parse(f.file, f.instanceConfig);
			}

			function error(name, file, elem, reason)
			{
				if (isFunction(options.error))
					options.error({name: name}, file, elem, reason);
			}

			function fileComplete()
			{
				queue.splice(0, 1);
				parseNextFile();
			}
		};
	}


	if (IS_PAPA_WORKER)
	{
		global.onmessage = workerThreadReceivedMessage;
	}
	else if (Papa.WORKERS_SUPPORTED)
	{
		AUTO_SCRIPT_PATH = getScriptPath();

		// Check if the script was loaded synchronously
		if (!document.body)
		{
			// Body doesn't exist yet, must be synchronous
			LOADED_SYNC = true;
		}
		else
		{
			document.addEventListener('DOMContentLoaded', function() {
				LOADED_SYNC = true;
			}, true);
		}
	}




	function CsvToJson(_input, _config)
	{
		_config = _config || {};
		var dynamicTyping = _config.dynamicTyping || false;
		if (isFunction(dynamicTyping)) {
			_config.dynamicTypingFunction = dynamicTyping;
			// Will be filled on first row call
			dynamicTyping = {};
		}
		_config.dynamicTyping = dynamicTyping;

		_config.transform = isFunction(_config.transform) ? _config.transform : false;

		if (_config.worker && Papa.WORKERS_SUPPORTED)
		{
			var w = newWorker();

			w.userStep = _config.step;
			w.userChunk = _config.chunk;
			w.userComplete = _config.complete;
			w.userError = _config.error;

			_config.step = isFunction(_config.step);
			_config.chunk = isFunction(_config.chunk);
			_config.complete = isFunction(_config.complete);
			_config.error = isFunction(_config.error);
			delete _config.worker;	// prevent infinite loop

			w.postMessage({
				input: _input,
				config: _config,
				workerId: w.id
			});

			return;
		}

		var streamer = null;
		if (_input === Papa.NODE_STREAM_INPUT)
		{
			// create a node Duplex stream for use
			// with .pipe
			streamer = new DuplexStreamStreamer(_config);
			return streamer.getStream();
		}
		else if (typeof _input === 'string')
		{
			if (_config.download)
				streamer = new NetworkStreamer(_config);
			else
				streamer = new StringStreamer(_config);
		}
		else if (_input.readable === true && isFunction(_input.read) && isFunction(_input.on))
		{
			streamer = new ReadableStreamStreamer(_config);
		}
		else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
			streamer = new FileStreamer(_config);

		return streamer.stream(_input);
	}






	function JsonToCsv(_input, _config)
	{
		// Default configuration

		/** whether to surround every datum with quotes */
		var _quotes = false;

		/** whether to write headers */
		var _writeHeader = true;

		/** delimiting character */
		var _delimiter = ',';

		/** newline character(s) */
		var _newline = '\r\n';

		/** quote character */
		var _quoteChar = '"';

		unpackConfig();

		var quoteCharRegex = new RegExp(_quoteChar, 'g');

		if (typeof _input === 'string')
			_input = JSON.parse(_input);

		if (_input instanceof Array)
		{
			if (!_input.length || _input[0] instanceof Array)
				return serialize(null, _input);
			else if (typeof _input[0] === 'object')
				return serialize(objectKeys(_input[0]), _input);
		}
		else if (typeof _input === 'object')
		{
			if (typeof _input.data === 'string')
				_input.data = JSON.parse(_input.data);

			if (_input.data instanceof Array)
			{
				if (!_input.fields)
					_input.fields =  _input.meta && _input.meta.fields;

				if (!_input.fields)
					_input.fields =  _input.data[0] instanceof Array
						? _input.fields
						: objectKeys(_input.data[0]);

				if (!(_input.data[0] instanceof Array) && typeof _input.data[0] !== 'object')
					_input.data = [_input.data];	// handles input like [1,2,3] or ['asdf']
			}

			return serialize(_input.fields || [], _input.data || []);
		}

		// Default (any valid paths should return before this)
		throw 'exception: Unable to serialize unrecognized input';


		function unpackConfig()
		{
			if (typeof _config !== 'object')
				return;

			if (typeof _config.delimiter === 'string'
				&& _config.delimiter.length === 1
				&& Papa.BAD_DELIMITERS.indexOf(_config.delimiter) === -1)
			{
				_delimiter = _config.delimiter;
			}

			if (typeof _config.quotes === 'boolean'
				|| _config.quotes instanceof Array)
				_quotes = _config.quotes;

			if (typeof _config.newline === 'string')
				_newline = _config.newline;

			if (typeof _config.quoteChar === 'string')
				_quoteChar = _config.quoteChar;

			if (typeof _config.header === 'boolean')
				_writeHeader = _config.header;
		}


		/** Turns an object's keys into an array */
		function objectKeys(obj)
		{
			if (typeof obj !== 'object')
				return [];
			var keys = [];
			for (var key in obj)
				keys.push(key);
			return keys;
		}

		/** The double for loop that iterates the data and writes out a CSV string including header row */
		function serialize(fields, data)
		{
			var csv = '';

			if (typeof fields === 'string')
				fields = JSON.parse(fields);
			if (typeof data === 'string')
				data = JSON.parse(data);

			var hasHeader = fields instanceof Array && fields.length > 0;
			var dataKeyedByField = !(data[0] instanceof Array);

			// If there a header row, write it first
			if (hasHeader && _writeHeader)
			{
				for (var i = 0; i < fields.length; i++)
				{
					if (i > 0)
						csv += _delimiter;
					csv += safe(fields[i], i);
				}
				if (data.length > 0)
					csv += _newline;
			}

			// Then write out the data
			for (var row = 0; row < data.length; row++)
			{
				var maxCol = hasHeader ? fields.length : data[row].length;

				for (var col = 0; col < maxCol; col++)
				{
					if (col > 0)
						csv += _delimiter;
					var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
					csv += safe(data[row][colIdx], col);
				}

				if (row < data.length - 1)
					csv += _newline;
			}

			return csv;
		}

		/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
		function safe(str, col)
		{
			if (typeof str === 'undefined' || str === null)
				return '';

			if (str.constructor === Date)
				return JSON.stringify(str).slice(1, 25);

			str = str.toString().replace(quoteCharRegex, _quoteChar + _quoteChar);

			var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
							|| (_quotes instanceof Array && _quotes[col])
							|| hasAny(str, Papa.BAD_DELIMITERS)
							|| str.indexOf(_delimiter) > -1
							|| str.charAt(0) === ' '
							|| str.charAt(str.length - 1) === ' ';

			return needsQuotes ? _quoteChar + str + _quoteChar : str;
		}

		function hasAny(str, substrings)
		{
			for (var i = 0; i < substrings.length; i++)
				if (str.indexOf(substrings[i]) > -1)
					return true;
			return false;
		}
	}

	/** ChunkStreamer is the base prototype for various streamer implementations. */
	function ChunkStreamer(config)
	{
		this._handle = null;
		this._finished = false;
		this._completed = false;
		this._input = null;
		this._baseIndex = 0;
		this._partialLine = '';
		this._rowCount = 0;
		this._start = 0;
		this._nextChunk = null;
		this.isFirstChunk = true;
		this._completeResults = {
			data: [],
			errors: [],
			meta: {}
		};
		replaceConfig.call(this, config);

		this.parseChunk = function(chunk, isFakeChunk)
		{
			// First chunk pre-processing
			if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
			{
				var modifiedChunk = this._config.beforeFirstChunk(chunk);
				if (modifiedChunk !== undefined)
					chunk = modifiedChunk;
			}
			this.isFirstChunk = false;

			// Rejoin the line we likely just split in two by chunking the file
			var aggregate = this._partialLine + chunk;
			this._partialLine = '';

			var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);

			if (this._handle.paused() || this._handle.aborted())
				return;

			var lastIndex = results.meta.cursor;

			if (!this._finished)
			{
				this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
				this._baseIndex = lastIndex;
			}

			if (results && results.data)
				this._rowCount += results.data.length;

			var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

			if (IS_PAPA_WORKER)
			{
				global.postMessage({
					results: results,
					workerId: Papa.WORKER_ID,
					finished: finishedIncludingPreview
				});
			}
			else if (isFunction(this._config.chunk) && !isFakeChunk)
			{
				this._config.chunk(results, this._handle);
				if (this._handle.paused() || this._handle.aborted())
					return;
				results = undefined;
				this._completeResults = undefined;
			}

			if (!this._config.step && !this._config.chunk) {
				this._completeResults.data = this._completeResults.data.concat(results.data);
				this._completeResults.errors = this._completeResults.errors.concat(results.errors);
				this._completeResults.meta = results.meta;
			}

			if (!this._completed && finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted)) {
				this._config.complete(this._completeResults, this._input);
				this._completed = true;
			}

			if (!finishedIncludingPreview && (!results || !results.meta.paused))
				this._nextChunk();

			return results;
		};

		this._sendError = function(error)
		{
			if (isFunction(this._config.error))
				this._config.error(error);
			else if (IS_PAPA_WORKER && this._config.error)
			{
				global.postMessage({
					workerId: Papa.WORKER_ID,
					error: error,
					finished: false
				});
			}
		};

		function replaceConfig(config)
		{
			// Deep-copy the config so we can edit it
			var configCopy = copy(config);
			configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
			if (!config.step && !config.chunk)
				configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
			this._handle = new ParserHandle(configCopy);
			this._handle.streamer = this;
			this._config = configCopy;	// persist the copy to the caller
		}
	}


	function NetworkStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.RemoteChunkSize;
		ChunkStreamer.call(this, config);

		var xhr;

		if (IS_WORKER)
		{
			this._nextChunk = function()
			{
				this._readChunk();
				this._chunkLoaded();
			};
		}
		else
		{
			this._nextChunk = function()
			{
				this._readChunk();
			};
		}

		this.stream = function(url)
		{
			this._input = url;
			this._nextChunk();	// Starts streaming
		};

		this._readChunk = function()
		{
			if (this._finished)
			{
				this._chunkLoaded();
				return;
			}

			xhr = new XMLHttpRequest();

			if (this._config.withCredentials)
			{
				xhr.withCredentials = this._config.withCredentials;
			}

			if (!IS_WORKER)
			{
				xhr.onload = bindFunction(this._chunkLoaded, this);
				xhr.onerror = bindFunction(this._chunkError, this);
			}

			xhr.open('GET', this._input, !IS_WORKER);
			// Headers can only be set when once the request state is OPENED
			if (this._config.downloadRequestHeaders)
			{
				var headers = this._config.downloadRequestHeaders;

				for (var headerName in headers)
				{
					xhr.setRequestHeader(headerName, headers[headerName]);
				}
			}

			if (this._config.chunkSize)
			{
				var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
				xhr.setRequestHeader('Range', 'bytes=' + this._start + '-' + end);
				xhr.setRequestHeader('If-None-Match', 'webkit-no-cache'); // https://bugs.webkit.org/show_bug.cgi?id=82672
			}

			try {
				xhr.send();
			}
			catch (err) {
				this._chunkError(err.message);
			}

			if (IS_WORKER && xhr.status === 0)
				this._chunkError();
			else
				this._start += this._config.chunkSize;
		};

		this._chunkLoaded = function()
		{
			if (xhr.readyState !== 4)
				return;

			if (xhr.status < 200 || xhr.status >= 400)
			{
				this._chunkError();
				return;
			}

			this._finished = !this._config.chunkSize || this._start > getFileSize(xhr);
			this.parseChunk(xhr.responseText);
		};

		this._chunkError = function(errorMessage)
		{
			var errorText = xhr.statusText || errorMessage;
			this._sendError(new Error(errorText));
		};

		function getFileSize(xhr)
		{
			var contentRange = xhr.getResponseHeader('Content-Range');
			if (contentRange === null) { // no content range, then finish!
				return -1;
			}
			return parseInt(contentRange.substr(contentRange.lastIndexOf('/') + 1));
		}
	}
	NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
	NetworkStreamer.prototype.constructor = NetworkStreamer;


	function FileStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.LocalChunkSize;
		ChunkStreamer.call(this, config);

		var reader, slice;

		// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
		// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
		var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105

		this.stream = function(file)
		{
			this._input = file;
			slice = file.slice || file.webkitSlice || file.mozSlice;

			if (usingAsyncReader)
			{
				reader = new FileReader();		// Preferred method of reading files, even in workers
				reader.onload = bindFunction(this._chunkLoaded, this);
				reader.onerror = bindFunction(this._chunkError, this);
			}
			else
				reader = new FileReaderSync();	// Hack for running in a web worker in Firefox

			this._nextChunk();	// Starts streaming
		};

		this._nextChunk = function()
		{
			if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
				this._readChunk();
		};

		this._readChunk = function()
		{
			var input = this._input;
			if (this._config.chunkSize)
			{
				var end = Math.min(this._start + this._config.chunkSize, this._input.size);
				input = slice.call(input, this._start, end);
			}
			var txt = reader.readAsText(input, this._config.encoding);
			if (!usingAsyncReader)
				this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
		};

		this._chunkLoaded = function(event)
		{
			// Very important to increment start each time before handling results
			this._start += this._config.chunkSize;
			this._finished = !this._config.chunkSize || this._start >= this._input.size;
			this.parseChunk(event.target.result);
		};

		this._chunkError = function()
		{
			this._sendError(reader.error);
		};

	}
	FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
	FileStreamer.prototype.constructor = FileStreamer;


	function StringStreamer(config)
	{
		config = config || {};
		ChunkStreamer.call(this, config);

		var remaining;
		this.stream = function(s)
		{
			remaining = s;
			return this._nextChunk();
		};
		this._nextChunk = function()
		{
			if (this._finished) return;
			var size = this._config.chunkSize;
			var chunk = size ? remaining.substr(0, size) : remaining;
			remaining = size ? remaining.substr(size) : '';
			this._finished = !remaining;
			return this.parseChunk(chunk);
		};
	}
	StringStreamer.prototype = Object.create(StringStreamer.prototype);
	StringStreamer.prototype.constructor = StringStreamer;


	function ReadableStreamStreamer(config)
	{
		config = config || {};

		ChunkStreamer.call(this, config);

		var queue = [];
		var parseOnData = true;
		var streamHasEnded = false;

		this.pause = function()
		{
			ChunkStreamer.prototype.pause.apply(this, arguments);
			this._input.pause();
		};

		this.resume = function()
		{
			ChunkStreamer.prototype.resume.apply(this, arguments);
			this._input.resume();
		};

		this.stream = function(stream)
		{
			this._input = stream;

			this._input.on('data', this._streamData);
			this._input.on('end', this._streamEnd);
			this._input.on('error', this._streamError);
		};

		this._checkIsFinished = function()
		{
			if (streamHasEnded && queue.length === 1) {
				this._finished = true;
			}
		};

		this._nextChunk = function()
		{
			this._checkIsFinished();
			if (queue.length)
			{
				this.parseChunk(queue.shift());
			}
			else
			{
				parseOnData = true;
			}
		};

		this._streamData = bindFunction(function(chunk)
		{
			try
			{
				queue.push(typeof chunk === 'string' ? chunk : chunk.toString(this._config.encoding));

				if (parseOnData)
				{
					parseOnData = false;
					this._checkIsFinished();
					this.parseChunk(queue.shift());
				}
			}
			catch (error)
			{
				this._streamError(error);
			}
		}, this);

		this._streamError = bindFunction(function(error)
		{
			this._streamCleanUp();
			this._sendError(error);
		}, this);

		this._streamEnd = bindFunction(function()
		{
			this._streamCleanUp();
			streamHasEnded = true;
			this._streamData('');
		}, this);

		this._streamCleanUp = bindFunction(function()
		{
			this._input.removeListener('data', this._streamData);
			this._input.removeListener('end', this._streamEnd);
			this._input.removeListener('error', this._streamError);
		}, this);
	}
	ReadableStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
	ReadableStreamStreamer.prototype.constructor = ReadableStreamStreamer;


	function DuplexStreamStreamer(_config) {
		var Duplex = require('stream').Duplex;
		var config = copy(_config);
		var parseOnWrite = true;
		var writeStreamHasFinished = false;
		var parseCallbackQueue = [];
		var stream = null;

		this._onCsvData = function(results)
		{
			var data = results.data;
			for (var i = 0; i < data.length; i++) {
				if (!stream.push(data[i]) && !this._handle.paused()) {
					// the writeable consumer buffer has filled up
					// so we need to pause until more items
					// can be processed
					this._handle.pause();
				}
			}
		};

		this._onCsvComplete = function()
		{
			// node will finish the read stream when
			// null is pushed
			stream.push(null);
		};

		config.step = bindFunction(this._onCsvData, this);
		config.complete = bindFunction(this._onCsvComplete, this);
		ChunkStreamer.call(this, config);

		this._nextChunk = function()
		{
			if (writeStreamHasFinished && parseCallbackQueue.length === 1) {
				this._finished = true;
			}
			if (parseCallbackQueue.length) {
				parseCallbackQueue.shift()();
			} else {
				parseOnWrite = true;
			}
		};

		this._addToParseQueue = function(chunk, callback)
		{
			// add to queue so that we can indicate
			// completion via callback
			// node will automatically pause the incoming stream
			// when too many items have been added without their
			// callback being invoked
			parseCallbackQueue.push(bindFunction(function() {
				this.parseChunk(typeof chunk === 'string' ? chunk : chunk.toString(config.encoding));
				if (isFunction(callback)) {
					return callback();
				}
			}, this));
			if (parseOnWrite) {
				parseOnWrite = false;
				this._nextChunk();
			}
		};

		this._onRead = function()
		{
			if (this._handle.paused()) {
				// the writeable consumer can handle more data
				// so resume the chunk parsing
				this._handle.resume();
			}
		};

		this._onWrite = function(chunk, encoding, callback)
		{
			this._addToParseQueue(chunk, callback);
		};

		this._onWriteComplete = function()
		{
			writeStreamHasFinished = true;
			// have to write empty string
			// so parser knows its done
			this._addToParseQueue('');
		};

		this.getStream = function()
		{
			return stream;
		};
		stream = new Duplex({
			readableObjectMode: true,
			decodeStrings: false,
			read: bindFunction(this._onRead, this),
			write: bindFunction(this._onWrite, this)
		});
		stream.once('finish', bindFunction(this._onWriteComplete, this));
	}
	DuplexStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
	DuplexStreamStreamer.prototype.constructor = DuplexStreamStreamer;


	// Use one ParserHandle per entire CSV file or string
	function ParserHandle(_config)
	{
		// One goal is to minimize the use of regular expressions...
		var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
		var ISO_DATE = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

		var self = this;
		var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
		var _rowCounter = 0;	// Number of rows that have been parsed so far
		var _input;				// The input being parsed
		var _parser;			// The core parser being used
		var _paused = false;	// Whether we are paused or not
		var _aborted = false;	// Whether the parser has aborted or not
		var _delimiterError;	// Temporary state between delimiter detection and processing results
		var _fields = [];		// Fields are from the header row of the input, if there is one
		var _results = {		// The last results returned from the parser
			data: [],
			errors: [],
			meta: {}
		};

		if (isFunction(_config.step))
		{
			var userStep = _config.step;
			_config.step = function(results)
			{
				_results = results;

				if (needsHeaderRow())
					processResults();
				else	// only call user's step function after header row
				{
					processResults();

					// It's possbile that this line was empty and there's no row here after all
					if (_results.data.length === 0)
						return;

					_stepCounter += results.data.length;
					if (_config.preview && _stepCounter > _config.preview)
						_parser.abort();
					else
						userStep(_results, self);
				}
			};
		}

		/**
		 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
		 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
		 * when an input comes in multiple chunks, like from a file.
		 */
		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			if (!_config.newline)
				_config.newline = guessLineEndings(input);

			_delimiterError = false;
			if (!_config.delimiter)
			{
				var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines, _config.comments);
				if (delimGuess.successful)
					_config.delimiter = delimGuess.bestDelimiter;
				else
				{
					_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
					_config.delimiter = Papa.DefaultDelimiter;
				}
				_results.meta.delimiter = _config.delimiter;
			}
			else if(isFunction(_config.delimiter))
			{
				_config.delimiter = _config.delimiter(input);
				_results.meta.delimiter = _config.delimiter;
			}

			var parserConfig = copy(_config);
			if (_config.preview && _config.header)
				parserConfig.preview++;	// to compensate for header row

			_input = input;
			_parser = new Parser(parserConfig);
			_results = _parser.parse(_input, baseIndex, ignoreLastRow);
			processResults();
			return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
		};

		this.paused = function()
		{
			return _paused;
		};

		this.pause = function()
		{
			_paused = true;
			_parser.abort();
			_input = _input.substr(_parser.getCharIndex());
		};

		this.resume = function()
		{
			_paused = false;
			self.streamer.parseChunk(_input, true);
		};

		this.aborted = function()
		{
			return _aborted;
		};

		this.abort = function()
		{
			_aborted = true;
			_parser.abort();
			_results.meta.aborted = true;
			if (isFunction(_config.complete))
				_config.complete(_results);
			_input = '';
		};

		function processResults()
		{
			if (_results && _delimiterError)
			{
				addError('Delimiter', 'UndetectableDelimiter', 'Unable to auto-detect delimiting character; defaulted to \'' + Papa.DefaultDelimiter + '\'');
				_delimiterError = false;
			}

			if (_config.skipEmptyLines)
			{
				for (var i = 0; i < _results.data.length; i++)
					if (_results.data[i].length === 1 && _results.data[i][0] === '')
						_results.data.splice(i--, 1);
			}

			if (needsHeaderRow())
				fillHeaderFields();

			return applyHeaderAndDynamicTypingAndTransformation();
		}

		function needsHeaderRow()
		{
			return _config.header && _fields.length === 0;
		}

		function fillHeaderFields()
		{
			if (!_results)
				return;
			for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
				for (var j = 0; j < _results.data[i].length; j++)
				{
					var header = _results.data[i][j];

					if (_config.trimHeaders) {
						header = header.trim();
					}

					_fields.push(header);
				}
			_results.data.splice(0, 1);
		}

		function shouldApplyDynamicTyping(field) {
			// Cache function values to avoid calling it for each row
			if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === undefined) {
				_config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
			}
			return (_config.dynamicTyping[field] || _config.dynamicTyping) === true;
		}

		function parseDynamic(field, value)
		{
			if (shouldApplyDynamicTyping(field))
			{
				if (value === 'true' || value === 'TRUE')
					return true;
				else if (value === 'false' || value === 'FALSE')
					return false;
				else if (FLOAT.test(value))
					return parseFloat(value);
				else if (ISO_DATE.test(value))
					return new Date(value);
				else
					return (value === '' ? null : value);
			}
			return value;
		}

		function applyHeaderAndDynamicTypingAndTransformation()
		{
			if (!_results || (!_config.header && !_config.dynamicTyping && !_config.transform))
				return _results;

			for (var i = 0; i < _results.data.length; i++)
			{
				var row = _config.header ? {} : [];

				var j;
				for (j = 0; j < _results.data[i].length; j++)
				{
					var field = j;
					var value = _results.data[i][j];

					if (_config.header)
						field = j >= _fields.length ? '__parsed_extra' : _fields[j];

					if (_config.transform)
						value = _config.transform(value,field);

					value = parseDynamic(field, value);

					if (field === '__parsed_extra')
					{
						row[field] = row[field] || [];
						row[field].push(value);
					}
					else
						row[field] = value;
				}

				_results.data[i] = row;

				if (_config.header)
				{
					if (j > _fields.length)
						addError('FieldMismatch', 'TooManyFields', 'Too many fields: expected ' + _fields.length + ' fields but parsed ' + j, _rowCounter + i);
					else if (j < _fields.length)
						addError('FieldMismatch', 'TooFewFields', 'Too few fields: expected ' + _fields.length + ' fields but parsed ' + j, _rowCounter + i);
				}
			}

			if (_config.header && _results.meta)
				_results.meta.fields = _fields;

			_rowCounter += _results.data.length;
			return _results;
		}

		function guessDelimiter(input, newline, skipEmptyLines, comments)
		{
			var delimChoices = [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];
			var bestDelim, bestDelta, fieldCountPrevRow;

			for (var i = 0; i < delimChoices.length; i++)
			{
				var delim = delimChoices[i];
				var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
				fieldCountPrevRow = undefined;

				var preview = new Parser({
					comments: comments,
					delimiter: delim,
					newline: newline,
					preview: 10
				}).parse(input);

				for (var j = 0; j < preview.data.length; j++)
				{
					if (skipEmptyLines && preview.data[j].length === 1 && preview.data[j][0].length === 0) {
						emptyLinesCount++;
						continue;
					}
					var fieldCount = preview.data[j].length;
					avgFieldCount += fieldCount;

					if (typeof fieldCountPrevRow === 'undefined')
					{
						fieldCountPrevRow = fieldCount;
						continue;
					}
					else if (fieldCount > 1)
					{
						delta += Math.abs(fieldCount - fieldCountPrevRow);
						fieldCountPrevRow = fieldCount;
					}
				}

				if (preview.data.length > 0)
					avgFieldCount /= (preview.data.length - emptyLinesCount);

				if ((typeof bestDelta === 'undefined' || delta < bestDelta)
					&& avgFieldCount > 1.99)
				{
					bestDelta = delta;
					bestDelim = delim;
				}
			}

			_config.delimiter = bestDelim;

			return {
				successful: !!bestDelim,
				bestDelimiter: bestDelim
			};
		}

		function guessLineEndings(input)
		{
			input = input.substr(0, 1024 * 1024);	// max length 1 MB

			var r = input.split('\r');

			var n = input.split('\n');

			var nAppearsFirst = (n.length > 1 && n[0].length < r[0].length);

			if (r.length === 1 || nAppearsFirst)
				return '\n';

			var numWithN = 0;
			for (var i = 0; i < r.length; i++)
			{
				if (r[i][0] === '\n')
					numWithN++;
			}

			return numWithN >= r.length / 2 ? '\r\n' : '\r';
		}

		function addError(type, code, msg, row)
		{
			_results.errors.push({
				type: type,
				code: code,
				message: msg,
				row: row
			});
		}
	}





	/** The core parser implements speedy and correct CSV parsing */
	function Parser(config)
	{
		// Unpack the config object
		config = config || {};
		var delim = config.delimiter;
		var newline = config.newline;
		var comments = config.comments;
		var step = config.step;
		var preview = config.preview;
		var fastMode = config.fastMode;
		var quoteChar;
		/** Allows for no quoteChar by setting quoteChar to undefined in config */
		if (config.quoteChar === undefined) {
			quoteChar = '"';
		} else {
			quoteChar = config.quoteChar;
		}
		var escapeChar = quoteChar;
		if (config.escapeChar !== undefined) {
			escapeChar = config.escapeChar;
		}

		// Delimiter must be valid
		if (typeof delim !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
			delim = ',';

		// Comment character must be valid
		if (comments === delim)
			throw 'Comment character same as delimiter';
		else if (comments === true)
			comments = '#';
		else if (typeof comments !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
			comments = false;

		// Newline must be valid: \r, \n, or \r\n
		if (newline !== '\n' && newline !== '\r' && newline !== '\r\n')
			newline = '\n';

		// We're gonna need these at the Parser scope
		var cursor = 0;
		var aborted = false;

		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			// For some reason, in Chrome, this speeds things up (!?)
			if (typeof input !== 'string')
				throw 'Input must be a string';

			// We don't need to compute some of these every time parse() is called,
			// but having them in a more local scope seems to perform better
			var inputLen = input.length,
				delimLen = delim.length,
				newlineLen = newline.length,
				commentsLen = comments.length;
			var stepIsFunction = isFunction(step);

			// Establish starting state
			cursor = 0;
			var data = [], errors = [], row = [], lastCursor = 0;

			if (!input)
				return returnable();

			if (fastMode || (fastMode !== false && input.indexOf(quoteChar) === -1))
			{
				var rows = input.split(newline);
				for (var i = 0; i < rows.length; i++)
				{
					row = rows[i];
					cursor += row.length;
					if (i !== rows.length - 1)
						cursor += newline.length;
					else if (ignoreLastRow)
						return returnable();
					if (comments && row.substr(0, commentsLen) === comments)
						continue;
					if (stepIsFunction)
					{
						data = [];
						pushRow(row.split(delim));
						doStep();
						if (aborted)
							return returnable();
					}
					else
						pushRow(row.split(delim));
					if (preview && i >= preview)
					{
						data = data.slice(0, preview);
						return returnable(true);
					}
				}
				return returnable();
			}

			var nextDelim = input.indexOf(delim, cursor);
			var nextNewline = input.indexOf(newline, cursor);
			var quoteCharRegex = new RegExp(escapeChar.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&') + quoteChar, 'g');
			var quoteSearch;

			// Parser loop
			for (;;)
			{
				// Field has opening quote
				if (input[cursor] === quoteChar)
				{
					// Start our search for the closing quote where the cursor is
					quoteSearch = cursor;

					// Skip the opening quote
					cursor++;

					for (;;)
					{
						// Find closing quote
						quoteSearch = input.indexOf(quoteChar, quoteSearch + 1);

						//No other quotes are found - no other delimiters
						if (quoteSearch === -1)
						{
							if (!ignoreLastRow) {
								// No closing quote... what a pity
								errors.push({
									type: 'Quotes',
									code: 'MissingQuotes',
									message: 'Quoted field unterminated',
									row: data.length,	// row has yet to be inserted
									index: cursor
								});
							}
							return finish();
						}

						// Closing quote at EOF
						if (quoteSearch === inputLen - 1)
						{
							var value = input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar);
							return finish(value);
						}

						// If this quote is escaped, it's part of the data; skip it
						// If the quote character is the escape character, then check if the next character is the escape character
						if (quoteChar === escapeChar &&  input[quoteSearch + 1] === escapeChar)
						{
							quoteSearch++;
							continue;
						}

						// If the quote character is not the escape character, then check if the previous character was the escape character
						if (quoteChar !== escapeChar && quoteSearch !== 0 && input[quoteSearch - 1] === escapeChar)
						{
							continue;
						}

						var spacesBetweenQuoteAndDelimiter = extraSpaces(nextDelim);

						// Closing quote followed by delimiter or 'unnecessary steps + delimiter'
						if (input[quoteSearch + 1 + spacesBetweenQuoteAndDelimiter] === delim)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							cursor = quoteSearch + 1 + spacesBetweenQuoteAndDelimiter + delimLen;
							nextDelim = input.indexOf(delim, cursor);
							nextNewline = input.indexOf(newline, cursor);
							break;
						}

						var spacesBetweenQuoteAndNewLine = extraSpaces(nextNewline);

						// Closing quote followed by newline or 'unnecessary spaces + newLine'
						if (input.substr(quoteSearch + 1 + spacesBetweenQuoteAndNewLine, newlineLen) === newline)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							saveRow(quoteSearch + 1 + spacesBetweenQuoteAndNewLine + newlineLen);
							nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field

							if (stepIsFunction)
							{
								doStep();
								if (aborted)
									return returnable();
							}

							if (preview && data.length >= preview)
								return returnable(true);

							break;
						}


						// Checks for valid closing quotes are complete (escaped quotes or quote followed by EOF/delimiter/newline) -- assume these quotes are part of an invalid text string
						errors.push({
							type: 'Quotes',
							code: 'InvalidQuotes',
							message: 'Trailing quote on quoted field is malformed',
							row: data.length,	// row has yet to be inserted
							index: cursor
						});

						quoteSearch++;
						continue;

					}

					continue;
				}

				// Comment found at start of new line
				if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments)
				{
					if (nextNewline === -1)	// Comment ends at EOF
						return returnable();
					cursor = nextNewline + newlineLen;
					nextNewline = input.indexOf(newline, cursor);
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// Next delimiter comes before next newline, so we've reached end of field
				if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
				{
					row.push(input.substring(cursor, nextDelim));
					cursor = nextDelim + delimLen;
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// End of row
				if (nextNewline !== -1)
				{
					row.push(input.substring(cursor, nextNewline));
					saveRow(nextNewline + newlineLen);

					if (stepIsFunction)
					{
						doStep();
						if (aborted)
							return returnable();
					}

					if (preview && data.length >= preview)
						return returnable(true);

					continue;
				}

				break;
			}


			return finish();


			function pushRow(row)
			{
				data.push(row);
				lastCursor = cursor;
			}

			/**
             * checks if there are extra spaces after closing quote and given index without any text
             * if Yes, returns the number of spaces
             */
			function extraSpaces(index) {
				var spaceLength = 0;
				if (index !== -1) {
					var textBetweenClosingQuoteAndIndex = input.substring(quoteSearch + 1, index);
					if (textBetweenClosingQuoteAndIndex && textBetweenClosingQuoteAndIndex.trim() === '') {
						spaceLength = textBetweenClosingQuoteAndIndex.length;
					}
				}
				return spaceLength;
			}

			/**
			 * Appends the remaining input from cursor to the end into
			 * row, saves the row, calls step, and returns the results.
			 */
			function finish(value)
			{
				if (ignoreLastRow)
					return returnable();
				if (typeof value === 'undefined')
					value = input.substr(cursor);
				row.push(value);
				cursor = inputLen;	// important in case parsing is paused
				pushRow(row);
				if (stepIsFunction)
					doStep();
				return returnable();
			}

			/**
			 * Appends the current row to the results. It sets the cursor
			 * to newCursor and finds the nextNewline. The caller should
			 * take care to execute user's step function and check for
			 * preview and end parsing if necessary.
			 */
			function saveRow(newCursor)
			{
				cursor = newCursor;
				pushRow(row);
				row = [];
				nextNewline = input.indexOf(newline, cursor);
			}

			/** Returns an object with the results, errors, and meta. */
			function returnable(stopped)
			{
				return {
					data: data,
					errors: errors,
					meta: {
						delimiter: delim,
						linebreak: newline,
						aborted: aborted,
						truncated: !!stopped,
						cursor: lastCursor + (baseIndex || 0)
					}
				};
			}

			/** Executes the user's step function and resets data & errors. */
			function doStep()
			{
				step(returnable());
				data = [];
				errors = [];
			}
		};

		/** Sets the abort flag */
		this.abort = function()
		{
			aborted = true;
		};

		/** Gets the cursor position */
		this.getCharIndex = function()
		{
			return cursor;
		};
	}


	// If you need to load Papa Parse asynchronously and you also need worker threads, hard-code
	// the script path here. See: https://github.com/mholt/PapaParse/issues/87#issuecomment-57885358
	function getScriptPath()
	{
		var scripts = document.getElementsByTagName('script');
		return scripts.length ? scripts[scripts.length - 1].src : '';
	}

	function newWorker()
	{
		if (!Papa.WORKERS_SUPPORTED)
			return false;
		if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
			throw new Error(
				'Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
				'You need to set Papa.SCRIPT_PATH manually.'
			);
		var workerUrl = Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH;
		// Append 'papaworker' to the search string to tell papaparse that this is our worker.
		workerUrl += (workerUrl.indexOf('?') !== -1 ? '&' : '?') + 'papaworker';
		var w = new global.Worker(workerUrl);
		w.onmessage = mainThreadReceivedMessage;
		w.id = workerIdCounter++;
		workers[w.id] = w;
		return w;
	}

	/** Callback when main thread receives a message */
	function mainThreadReceivedMessage(e)
	{
		var msg = e.data;
		var worker = workers[msg.workerId];
		var aborted = false;

		if (msg.error)
			worker.userError(msg.error, msg.file);
		else if (msg.results && msg.results.data)
		{
			var abort = function() {
				aborted = true;
				completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
			};

			var handle = {
				abort: abort,
				pause: notImplemented,
				resume: notImplemented
			};

			if (isFunction(worker.userStep))
			{
				for (var i = 0; i < msg.results.data.length; i++)
				{
					worker.userStep({
						data: [msg.results.data[i]],
						errors: msg.results.errors,
						meta: msg.results.meta
					}, handle);
					if (aborted)
						break;
				}
				delete msg.results;	// free memory ASAP
			}
			else if (isFunction(worker.userChunk))
			{
				worker.userChunk(msg.results, handle, msg.file);
				delete msg.results;
			}
		}

		if (msg.finished && !aborted)
			completeWorker(msg.workerId, msg.results);
	}

	function completeWorker(workerId, results) {
		var worker = workers[workerId];
		if (isFunction(worker.userComplete))
			worker.userComplete(results);
		worker.terminate();
		delete workers[workerId];
	}

	function notImplemented() {
		throw 'Not implemented.';
	}

	/** Callback when worker thread receives a message */
	function workerThreadReceivedMessage(e)
	{
		var msg = e.data;

		if (typeof Papa.WORKER_ID === 'undefined' && msg)
			Papa.WORKER_ID = msg.workerId;

		if (typeof msg.input === 'string')
		{
			global.postMessage({
				workerId: Papa.WORKER_ID,
				results: Papa.parse(msg.input, msg.config),
				finished: true
			});
		}
		else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
		{
			var results = Papa.parse(msg.input, msg.config);
			if (results)
				global.postMessage({
					workerId: Papa.WORKER_ID,
					results: results,
					finished: true
				});
		}
	}

	/** Makes a deep copy of an array or object (mostly) */
	function copy(obj)
	{
		if (typeof obj !== 'object' || obj === null)
			return obj;
		var cpy = obj instanceof Array ? [] : {};
		for (var key in obj)
			cpy[key] = copy(obj[key]);
		return cpy;
	}

	function bindFunction(f, self)
	{
		return function() { f.apply(self, arguments); };
	}

	function isFunction(func)
	{
		return typeof func === 'function';
	}

	return Papa;
}));

/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_SHA256_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD = typeof define === 'function' && define.amd;
  var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [-2147483648, 8388608, 32768, 128];
  var SHIFT = [24, 16, 8, 0];
  var K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'];

  var blocks = [];

  if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function (outputType, is224) {
    return function (message) {
      return new Sha256(is224, true).update(message)[outputType]();
    };
  };

  var createMethod = function (is224) {
    var method = createOutputMethod('hex', is224);
    if (NODE_JS) {
      method = nodeWrap(method, is224);
    }
    method.create = function () {
      return new Sha256(is224);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type, is224);
    }
    return method;
  };

  var nodeWrap = function (method, is224) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var algorithm = is224 ? 'sha224' : 'sha256';
    var nodeMethod = function (message) {
      if (typeof message === 'string') {
        return crypto.createHash(algorithm).update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw new Error(ERROR);
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) ||
        message.constructor === Buffer) {
        return crypto.createHash(algorithm).update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };

  var createHmacOutputMethod = function (outputType, is224) {
    return function (key, message) {
      return new HmacSha256(key, is224, true).update(message)[outputType]();
    };
  };

  var createHmacMethod = function (is224) {
    var method = createHmacOutputMethod('hex', is224);
    method.create = function (key) {
      return new HmacSha256(key, is224);
    };
    method.update = function (key, message) {
      return method.create(key).update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createHmacOutputMethod(type, is224);
    }
    return method;
  };

  function Sha256(is224, sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
    } else {
      this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    if (is224) {
      this.h0 = 0xc1059ed8;
      this.h1 = 0x367cd507;
      this.h2 = 0x3070dd17;
      this.h3 = 0xf70e5939;
      this.h4 = 0xffc00b31;
      this.h5 = 0x68581511;
      this.h6 = 0x64f98fa7;
      this.h7 = 0xbefa4fa4;
    } else { // 256
      this.h0 = 0x6a09e667;
      this.h1 = 0xbb67ae85;
      this.h2 = 0x3c6ef372;
      this.h3 = 0xa54ff53a;
      this.h4 = 0x510e527f;
      this.h5 = 0x9b05688c;
      this.h6 = 0x1f83d9ab;
      this.h7 = 0x5be0cd19;
    }

    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
    this.is224 = is224;
  }

  Sha256.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }
    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw new Error(ERROR);
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw new Error(ERROR);
          }
        }
      } else {
        throw new Error(ERROR);
      }
      notString = true;
    }
    var code, index = 0, i, length = message.length, blocks = this.blocks;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = this.block;
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
          blocks[4] = blocks[5] = blocks[6] = blocks[7] =
          blocks[8] = blocks[9] = blocks[10] = blocks[11] =
          blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        for (i = this.start; index < length && i < 64; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < 64; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }

      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.block = blocks[16];
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Sha256.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[16] = this.block;
    blocks[i >> 2] |= EXTRA[i & 3];
    this.block = blocks[16];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = this.block;
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
    blocks[15] = this.bytes << 3;
    this.hash();
  };

  Sha256.prototype.hash = function () {
    var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6,
      h = this.h7, blocks = this.blocks, j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;

    for (j = 16; j < 64; ++j) {
      // rightrotate
      t1 = blocks[j - 15];
      s0 = ((t1 >>> 7) | (t1 << 25)) ^ ((t1 >>> 18) | (t1 << 14)) ^ (t1 >>> 3);
      t1 = blocks[j - 2];
      s1 = ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
      blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
    }

    bc = b & c;
    for (j = 0; j < 64; j += 4) {
      if (this.first) {
        if (this.is224) {
          ab = 300032;
          t1 = blocks[0] - 1413257819;
          h = t1 - 150054599 << 0;
          d = t1 + 24177077 << 0;
        } else {
          ab = 704751109;
          t1 = blocks[0] - 210244248;
          h = t1 - 1521486534 << 0;
          d = t1 + 143694565 << 0;
        }
        this.first = false;
      } else {
        s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
        s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
        ab = a & b;
        maj = ab ^ (a & c) ^ bc;
        ch = (e & f) ^ (~e & g);
        t1 = h + s1 + ch + K[j] + blocks[j];
        t2 = s0 + maj;
        h = d + t1 << 0;
        d = t1 + t2 << 0;
      }
      s0 = ((d >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10));
      s1 = ((h >>> 6) | (h << 26)) ^ ((h >>> 11) | (h << 21)) ^ ((h >>> 25) | (h << 7));
      da = d & a;
      maj = da ^ (d & b) ^ ab;
      ch = (h & e) ^ (~h & f);
      t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
      t2 = s0 + maj;
      g = c + t1 << 0;
      c = t1 + t2 << 0;
      s0 = ((c >>> 2) | (c << 30)) ^ ((c >>> 13) | (c << 19)) ^ ((c >>> 22) | (c << 10));
      s1 = ((g >>> 6) | (g << 26)) ^ ((g >>> 11) | (g << 21)) ^ ((g >>> 25) | (g << 7));
      cd = c & d;
      maj = cd ^ (c & a) ^ da;
      ch = (g & h) ^ (~g & e);
      t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
      t2 = s0 + maj;
      f = b + t1 << 0;
      b = t1 + t2 << 0;
      s0 = ((b >>> 2) | (b << 30)) ^ ((b >>> 13) | (b << 19)) ^ ((b >>> 22) | (b << 10));
      s1 = ((f >>> 6) | (f << 26)) ^ ((f >>> 11) | (f << 21)) ^ ((f >>> 25) | (f << 7));
      bc = b & c;
      maj = bc ^ (b & d) ^ cd;
      ch = (f & g) ^ (~f & h);
      t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
      t2 = s0 + maj;
      e = a + t1 << 0;
      a = t1 + t2 << 0;
    }

    this.h0 = this.h0 + a << 0;
    this.h1 = this.h1 + b << 0;
    this.h2 = this.h2 + c << 0;
    this.h3 = this.h3 + d << 0;
    this.h4 = this.h4 + e << 0;
    this.h5 = this.h5 + f << 0;
    this.h6 = this.h6 + g << 0;
    this.h7 = this.h7 + h << 0;
  };

  Sha256.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5,
      h6 = this.h6, h7 = this.h7;

    var hex = HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
      HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
      HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
      HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
      HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
      HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
      HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
      HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
      HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
      HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
      HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
      HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
      HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] +
      HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
      HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
      HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
      HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] +
      HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] +
      HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] +
      HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F] +
      HEX_CHARS[(h5 >> 28) & 0x0F] + HEX_CHARS[(h5 >> 24) & 0x0F] +
      HEX_CHARS[(h5 >> 20) & 0x0F] + HEX_CHARS[(h5 >> 16) & 0x0F] +
      HEX_CHARS[(h5 >> 12) & 0x0F] + HEX_CHARS[(h5 >> 8) & 0x0F] +
      HEX_CHARS[(h5 >> 4) & 0x0F] + HEX_CHARS[h5 & 0x0F] +
      HEX_CHARS[(h6 >> 28) & 0x0F] + HEX_CHARS[(h6 >> 24) & 0x0F] +
      HEX_CHARS[(h6 >> 20) & 0x0F] + HEX_CHARS[(h6 >> 16) & 0x0F] +
      HEX_CHARS[(h6 >> 12) & 0x0F] + HEX_CHARS[(h6 >> 8) & 0x0F] +
      HEX_CHARS[(h6 >> 4) & 0x0F] + HEX_CHARS[h6 & 0x0F];
    if (!this.is224) {
      hex += HEX_CHARS[(h7 >> 28) & 0x0F] + HEX_CHARS[(h7 >> 24) & 0x0F] +
        HEX_CHARS[(h7 >> 20) & 0x0F] + HEX_CHARS[(h7 >> 16) & 0x0F] +
        HEX_CHARS[(h7 >> 12) & 0x0F] + HEX_CHARS[(h7 >> 8) & 0x0F] +
        HEX_CHARS[(h7 >> 4) & 0x0F] + HEX_CHARS[h7 & 0x0F];
    }
    return hex;
  };

  Sha256.prototype.toString = Sha256.prototype.hex;

  Sha256.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5,
      h6 = this.h6, h7 = this.h7;

    var arr = [
      (h0 >> 24) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 8) & 0xFF, h0 & 0xFF,
      (h1 >> 24) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 8) & 0xFF, h1 & 0xFF,
      (h2 >> 24) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 8) & 0xFF, h2 & 0xFF,
      (h3 >> 24) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 8) & 0xFF, h3 & 0xFF,
      (h4 >> 24) & 0xFF, (h4 >> 16) & 0xFF, (h4 >> 8) & 0xFF, h4 & 0xFF,
      (h5 >> 24) & 0xFF, (h5 >> 16) & 0xFF, (h5 >> 8) & 0xFF, h5 & 0xFF,
      (h6 >> 24) & 0xFF, (h6 >> 16) & 0xFF, (h6 >> 8) & 0xFF, h6 & 0xFF
    ];
    if (!this.is224) {
      arr.push((h7 >> 24) & 0xFF, (h7 >> 16) & 0xFF, (h7 >> 8) & 0xFF, h7 & 0xFF);
    }
    return arr;
  };

  Sha256.prototype.array = Sha256.prototype.digest;

  Sha256.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
    var dataView = new DataView(buffer);
    dataView.setUint32(0, this.h0);
    dataView.setUint32(4, this.h1);
    dataView.setUint32(8, this.h2);
    dataView.setUint32(12, this.h3);
    dataView.setUint32(16, this.h4);
    dataView.setUint32(20, this.h5);
    dataView.setUint32(24, this.h6);
    if (!this.is224) {
      dataView.setUint32(28, this.h7);
    }
    return buffer;
  };

  function HmacSha256(key, is224, sharedMemory) {
    var i, type = typeof key;
    if (type === 'string') {
      var bytes = [], length = key.length, index = 0, code;
      for (i = 0; i < length; ++i) {
        code = key.charCodeAt(i);
        if (code < 0x80) {
          bytes[index++] = code;
        } else if (code < 0x800) {
          bytes[index++] = (0xc0 | (code >> 6));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes[index++] = (0xe0 | (code >> 12));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (key.charCodeAt(++i) & 0x3ff));
          bytes[index++] = (0xf0 | (code >> 18));
          bytes[index++] = (0x80 | ((code >> 12) & 0x3f));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        }
      }
      key = bytes;
    } else {
      if (type === 'object') {
        if (key === null) {
          throw new Error(ERROR);
        } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
          key = new Uint8Array(key);
        } else if (!Array.isArray(key)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
            throw new Error(ERROR);
          }
        }
      } else {
        throw new Error(ERROR);
      }
    }

    if (key.length > 64) {
      key = (new Sha256(is224, true)).update(key).array();
    }

    var oKeyPad = [], iKeyPad = [];
    for (i = 0; i < 64; ++i) {
      var b = key[i] || 0;
      oKeyPad[i] = 0x5c ^ b;
      iKeyPad[i] = 0x36 ^ b;
    }

    Sha256.call(this, is224, sharedMemory);

    this.update(iKeyPad);
    this.oKeyPad = oKeyPad;
    this.inner = true;
    this.sharedMemory = sharedMemory;
  }
  HmacSha256.prototype = new Sha256();

  HmacSha256.prototype.finalize = function () {
    Sha256.prototype.finalize.call(this);
    if (this.inner) {
      this.inner = false;
      var innerHash = this.array();
      Sha256.call(this, this.is224, this.sharedMemory);
      this.update(this.oKeyPad);
      this.update(innerHash);
      Sha256.prototype.finalize.call(this);
    }
  };

  var exports = createMethod();
  exports.sha256 = exports;
  exports.sha224 = createMethod(true);
  exports.sha256.hmac = createHmacMethod();
  exports.sha224.hmac = createHmacMethod(true);

  /*if (COMMON_JS) {
    module.exports = exports;
  } else {
    root.sha256 = exports.sha256;
    root.sha224 = exports.sha224;
    if (AMD) {
      define(function () {
        return exports;
      });
    }
  }*/
  global.__SHA256_LIB = exports.sha256;
})();

/*
 * [js-sha512]{@link https://github.com/emn178/js-sha512}
 *
 * @version 0.7.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_SHA512_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA512_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_SHA512_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD = typeof define === 'function' && define.amd;
  var ARRAY_BUFFER = !root.JS_SHA512_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [-2147483648, 8388608, 32768, 128];
  var SHIFT = [24, 16, 8, 0];
  var K = [
    0x428A2F98, 0xD728AE22, 0x71374491, 0x23EF65CD,
    0xB5C0FBCF, 0xEC4D3B2F, 0xE9B5DBA5, 0x8189DBBC,
    0x3956C25B, 0xF348B538, 0x59F111F1, 0xB605D019,
    0x923F82A4, 0xAF194F9B, 0xAB1C5ED5, 0xDA6D8118,
    0xD807AA98, 0xA3030242, 0x12835B01, 0x45706FBE,
    0x243185BE, 0x4EE4B28C, 0x550C7DC3, 0xD5FFB4E2,
    0x72BE5D74, 0xF27B896F, 0x80DEB1FE, 0x3B1696B1,
    0x9BDC06A7, 0x25C71235, 0xC19BF174, 0xCF692694,
    0xE49B69C1, 0x9EF14AD2, 0xEFBE4786, 0x384F25E3,
    0x0FC19DC6, 0x8B8CD5B5, 0x240CA1CC, 0x77AC9C65,
    0x2DE92C6F, 0x592B0275, 0x4A7484AA, 0x6EA6E483,
    0x5CB0A9DC, 0xBD41FBD4, 0x76F988DA, 0x831153B5,
    0x983E5152, 0xEE66DFAB, 0xA831C66D, 0x2DB43210,
    0xB00327C8, 0x98FB213F, 0xBF597FC7, 0xBEEF0EE4,
    0xC6E00BF3, 0x3DA88FC2, 0xD5A79147, 0x930AA725,
    0x06CA6351, 0xE003826F, 0x14292967, 0x0A0E6E70,
    0x27B70A85, 0x46D22FFC, 0x2E1B2138, 0x5C26C926,
    0x4D2C6DFC, 0x5AC42AED, 0x53380D13, 0x9D95B3DF,
    0x650A7354, 0x8BAF63DE, 0x766A0ABB, 0x3C77B2A8,
    0x81C2C92E, 0x47EDAEE6, 0x92722C85, 0x1482353B,
    0xA2BFE8A1, 0x4CF10364, 0xA81A664B, 0xBC423001,
    0xC24B8B70, 0xD0F89791, 0xC76C51A3, 0x0654BE30,
    0xD192E819, 0xD6EF5218, 0xD6990624, 0x5565A910,
    0xF40E3585, 0x5771202A, 0x106AA070, 0x32BBD1B8,
    0x19A4C116, 0xB8D2D0C8, 0x1E376C08, 0x5141AB53,
    0x2748774C, 0xDF8EEB99, 0x34B0BCB5, 0xE19B48A8,
    0x391C0CB3, 0xC5C95A63, 0x4ED8AA4A, 0xE3418ACB,
    0x5B9CCA4F, 0x7763E373, 0x682E6FF3, 0xD6B2B8A3,
    0x748F82EE, 0x5DEFB2FC, 0x78A5636F, 0x43172F60,
    0x84C87814, 0xA1F0AB72, 0x8CC70208, 0x1A6439EC,
    0x90BEFFFA, 0x23631E28, 0xA4506CEB, 0xDE82BDE9,
    0xBEF9A3F7, 0xB2C67915, 0xC67178F2, 0xE372532B,
    0xCA273ECE, 0xEA26619C, 0xD186B8C7, 0x21C0C207,
    0xEADA7DD6, 0xCDE0EB1E, 0xF57D4F7F, 0xEE6ED178,
    0x06F067AA, 0x72176FBA, 0x0A637DC5, 0xA2C898A6,
    0x113F9804, 0xBEF90DAE, 0x1B710B35, 0x131C471B,
    0x28DB77F5, 0x23047D84, 0x32CAAB7B, 0x40C72493,
    0x3C9EBE0A, 0x15C9BEBC, 0x431D67C4, 0x9C100D4C,
    0x4CC5D4BE, 0xCB3E42B6, 0x597F299C, 0xFC657E2A,
    0x5FCB6FAB, 0x3AD6FAEC, 0x6C44198C, 0x4A475817
  ];

  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'];

  var blocks = [];

  if (root.JS_SHA512_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function (outputType, bits) {
    return function (message) {
      return new Sha512(bits, true).update(message)[outputType]();
    };
  };

  var createMethod = function (bits) {
    var method = createOutputMethod('hex', bits);
    method.create = function () {
      return new Sha512(bits);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type, bits);
    }
    return method;
  };

  var createHmacOutputMethod = function (outputType, bits) {
    return function (key, message) {
      return new HmacSha512(key, bits, true).update(message)[outputType]();
    };
  };

  var createHmacMethod = function (bits) {
    var method = createHmacOutputMethod('hex', bits);
    method.create = function (key) {
      return new HmacSha512(key, bits);
    };
    method.update = function (key, message) {
      return method.create(key).update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createHmacOutputMethod(type, bits);
    }
    return method;
  };

  function Sha512(bits, sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[1] = blocks[2] = blocks[3] = blocks[4] =
      blocks[5] = blocks[6] = blocks[7] = blocks[8] =
      blocks[9] = blocks[10] = blocks[11] = blocks[12] =
      blocks[13] = blocks[14] = blocks[15] = blocks[16] =
      blocks[17] = blocks[18] = blocks[19] = blocks[20] =
      blocks[21] = blocks[22] = blocks[23] = blocks[24] =
      blocks[25] = blocks[26] = blocks[27] = blocks[28] =
      blocks[29] = blocks[30] = blocks[31] = blocks[32] = 0;
      this.blocks = blocks;
    } else {
      this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    if (bits == 384) {
      this.h0h = 0xCBBB9D5D;
      this.h0l = 0xC1059ED8;
      this.h1h = 0x629A292A;
      this.h1l = 0x367CD507;
      this.h2h = 0x9159015A;
      this.h2l = 0x3070DD17;
      this.h3h = 0x152FECD8;
      this.h3l = 0xF70E5939;
      this.h4h = 0x67332667;
      this.h4l = 0xFFC00B31;
      this.h5h = 0x8EB44A87;
      this.h5l = 0x68581511;
      this.h6h = 0xDB0C2E0D;
      this.h6l = 0x64F98FA7;
      this.h7h = 0x47B5481D;
      this.h7l = 0xBEFA4FA4;
    } else if (bits == 256) {
      this.h0h = 0x22312194;
      this.h0l = 0xFC2BF72C;
      this.h1h = 0x9F555FA3;
      this.h1l = 0xC84C64C2;
      this.h2h = 0x2393B86B;
      this.h2l = 0x6F53B151;
      this.h3h = 0x96387719;
      this.h3l = 0x5940EABD;
      this.h4h = 0x96283EE2;
      this.h4l = 0xA88EFFE3;
      this.h5h = 0xBE5E1E25;
      this.h5l = 0x53863992;
      this.h6h = 0x2B0199FC;
      this.h6l = 0x2C85B8AA;
      this.h7h = 0x0EB72DDC;
      this.h7l = 0x81C52CA2;
    } else if (bits == 224) {
      this.h0h = 0x8C3D37C8;
      this.h0l = 0x19544DA2;
      this.h1h = 0x73E19966;
      this.h1l = 0x89DCD4D6;
      this.h2h = 0x1DFAB7AE;
      this.h2l = 0x32FF9C82;
      this.h3h = 0x679DD514;
      this.h3l = 0x582F9FCF;
      this.h4h = 0x0F6D2B69;
      this.h4l = 0x7BD44DA8;
      this.h5h = 0x77E36F73;
      this.h5l = 0x04C48942;
      this.h6h = 0x3F9D85A8;
      this.h6l = 0x6A1D36C8;
      this.h7h = 0x1112E6AD;
      this.h7l = 0x91D692A1;
    } else { // 512
      this.h0h = 0x6A09E667;
      this.h0l = 0xF3BCC908;
      this.h1h = 0xBB67AE85;
      this.h1l = 0x84CAA73B;
      this.h2h = 0x3C6EF372;
      this.h2l = 0xFE94F82B;
      this.h3h = 0xA54FF53A;
      this.h3l = 0x5F1D36F1;
      this.h4h = 0x510E527F;
      this.h4l = 0xADE682D1;
      this.h5h = 0x9B05688C;
      this.h5l = 0x2B3E6C1F;
      this.h6h = 0x1F83D9AB;
      this.h6l = 0xFB41BD6B;
      this.h7h = 0x5BE0CD19;
      this.h7l = 0x137E2179;
    }
    this.bits = bits;

    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
  }

  Sha512.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }
    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var code, index = 0, i, length = message.length, blocks = this.blocks;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = this.block;
        blocks[1] = blocks[2] = blocks[3] = blocks[4] =
        blocks[5] = blocks[6] = blocks[7] = blocks[8] =
        blocks[9] = blocks[10] = blocks[11] = blocks[12] =
        blocks[13] = blocks[14] = blocks[15] = blocks[16] =
        blocks[17] = blocks[18] = blocks[19] = blocks[20] =
        blocks[21] = blocks[22] = blocks[23] = blocks[24] =
        blocks[25] = blocks[26] = blocks[27] = blocks[28] =
        blocks[29] = blocks[30] = blocks[31] = blocks[32] = 0;
      }

      if(notString) {
        for (i = this.start; index < length && i < 128; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < 128; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }

      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 128) {
        this.block = blocks[32];
        this.start = i - 128;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Sha512.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[32] = this.block;
    blocks[i >> 2] |= EXTRA[i & 3];
    this.block = blocks[32];
    if (i >= 112) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = this.block;
      blocks[1] = blocks[2] = blocks[3] = blocks[4] =
      blocks[5] = blocks[6] = blocks[7] = blocks[8] =
      blocks[9] = blocks[10] = blocks[11] = blocks[12] =
      blocks[13] = blocks[14] = blocks[15] = blocks[16] =
      blocks[17] = blocks[18] = blocks[19] = blocks[20] =
      blocks[21] = blocks[22] = blocks[23] = blocks[24] =
      blocks[25] = blocks[26] = blocks[27] = blocks[28] =
      blocks[29] = blocks[30] = blocks[31] = blocks[32] = 0;
    }
    blocks[30] = this.hBytes << 3 | this.bytes >>> 29;
    blocks[31] = this.bytes << 3;
    this.hash();
  };

  Sha512.prototype.hash = function () {
    var h0h = this.h0h, h0l = this.h0l, h1h = this.h1h, h1l = this.h1l,
      h2h = this.h2h, h2l = this.h2l, h3h = this.h3h, h3l = this.h3l,
      h4h = this.h4h, h4l = this.h4l, h5h = this.h5h, h5l = this.h5l,
      h6h = this.h6h, h6l = this.h6l, h7h = this.h7h, h7l = this.h7l,
      blocks = this.blocks, j, s0h, s0l, s1h, s1l, c1, c2, c3, c4,
      abh, abl, dah, dal, cdh, cdl, bch, bcl,
      majh, majl, t1h, t1l, t2h, t2l, chh, chl;

    for (j = 32; j < 160; j += 2) {
      t1h = blocks[j - 30];
      t1l = blocks[j - 29];
      s0h = ((t1h >>> 1) | (t1l << 31)) ^ ((t1h >>> 8) | (t1l << 24)) ^ (t1h >>> 7);
      s0l = ((t1l >>> 1) | (t1h << 31)) ^ ((t1l >>> 8) | (t1h << 24)) ^ ((t1l >>> 7) | t1h << 25);

      t1h = blocks[j - 4];
      t1l = blocks[j - 3];
      s1h = ((t1h >>> 19) | (t1l << 13)) ^ ((t1l >>> 29) | (t1h << 3)) ^ (t1h >>> 6);
      s1l = ((t1l >>> 19) | (t1h << 13)) ^ ((t1h >>> 29) | (t1l << 3)) ^ ((t1l >>> 6) | t1h << 26);

      t1h = blocks[j - 32];
      t1l = blocks[j - 31];
      t2h = blocks[j - 14];
      t2l = blocks[j - 13];

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (s0l & 0xFFFF) + (s1l & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (s0l >>> 16) + (s1l >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (s0h & 0xFFFF) + (s1h & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (s0h >>> 16) + (s1h >>> 16) + (c3 >>> 16);

      blocks[j] = (c4 << 16) | (c3 & 0xFFFF);
      blocks[j + 1] = (c2 << 16) | (c1 & 0xFFFF);
    }

    var ah = h0h, al = h0l, bh = h1h, bl = h1l, ch = h2h, cl = h2l, dh = h3h, dl = h3l, eh = h4h, el = h4l, fh = h5h, fl = h5l, gh = h6h, gl = h6l, hh = h7h, hl = h7l;
    bch = bh & ch;
    bcl = bl & cl;
    for (j = 0; j < 160; j += 8) {
      s0h = ((ah >>> 28) | (al << 4)) ^ ((al >>> 2) | (ah << 30)) ^ ((al >>> 7) | (ah << 25));
      s0l = ((al >>> 28) | (ah << 4)) ^ ((ah >>> 2) | (al << 30)) ^ ((ah >>> 7) | (al << 25));

      s1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((el >>> 9) | (eh << 23));
      s1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((eh >>> 9) | (el << 23));

      abh = ah & bh;
      abl = al & bl;
      majh = abh ^ (ah & ch) ^ bch;
      majl = abl ^ (al & cl) ^ bcl;

      chh = (eh & fh) ^ (~eh & gh);
      chl = (el & fl) ^ (~el & gl);

      t1h = blocks[j];
      t1l = blocks[j + 1];
      t2h = K[j];
      t2l = K[j + 1];

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (hl & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (hl >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (hh & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (hh >>> 16) + (c3 >>> 16);

      t1h = (c4 << 16) | (c3 & 0xFFFF);
      t1l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
      c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
      c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
      c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

      t2h = (c4 << 16) | (c3 & 0xFFFF);
      t2l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (dl & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (dl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (dh & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (dh >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      hh = (c4 << 16) | (c3 & 0xFFFF);
      hl = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      dh = (c4 << 16) | (c3 & 0xFFFF);
      dl = (c2 << 16) | (c1 & 0xFFFF);

      s0h = ((dh >>> 28) | (dl << 4)) ^ ((dl >>> 2) | (dh << 30)) ^ ((dl >>> 7) | (dh << 25));
      s0l = ((dl >>> 28) | (dh << 4)) ^ ((dh >>> 2) | (dl << 30)) ^ ((dh >>> 7) | (dl << 25));

      s1h = ((hh >>> 14) | (hl << 18)) ^ ((hh >>> 18) | (hl << 14)) ^ ((hl >>> 9) | (hh << 23));
      s1l = ((hl >>> 14) | (hh << 18)) ^ ((hl >>> 18) | (hh << 14)) ^ ((hh >>> 9) | (hl << 23));

      dah = dh & ah;
      dal = dl & al;
      majh = dah ^ (dh & bh) ^ abh;
      majl = dal ^ (dl & bl) ^ abl;

      chh = (hh & eh) ^ (~hh & fh);
      chl = (hl & el) ^ (~hl & fl);

      t1h = blocks[j + 2];
      t1l = blocks[j + 3];
      t2h = K[j + 2];
      t2l = K[j + 3];

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (gl & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (gl >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (gh & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (gh >>> 16) + (c3 >>> 16);

      t1h = (c4 << 16) | (c3 & 0xFFFF);
      t1l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
      c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
      c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
      c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

      t2h = (c4 << 16) | (c3 & 0xFFFF);
      t2l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (cl & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (cl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (ch & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (ch >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      gh = (c4 << 16) | (c3 & 0xFFFF);
      gl = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      ch = (c4 << 16) | (c3 & 0xFFFF);
      cl = (c2 << 16) | (c1 & 0xFFFF);

      s0h = ((ch >>> 28) | (cl << 4)) ^ ((cl >>> 2) | (ch << 30)) ^ ((cl >>> 7) | (ch << 25));
      s0l = ((cl >>> 28) | (ch << 4)) ^ ((ch >>> 2) | (cl << 30)) ^ ((ch >>> 7) | (cl << 25));

      s1h = ((gh >>> 14) | (gl << 18)) ^ ((gh >>> 18) | (gl << 14)) ^ ((gl >>> 9) | (gh << 23));
      s1l = ((gl >>> 14) | (gh << 18)) ^ ((gl >>> 18) | (gh << 14)) ^ ((gh >>> 9) | (gl << 23));

      cdh = ch & dh;
      cdl = cl & dl;
      majh = cdh ^ (ch & ah) ^ dah;
      majl = cdl ^ (cl & al) ^ dal;

      chh = (gh & hh) ^ (~gh & eh);
      chl = (gl & hl) ^ (~gl & el);

      t1h = blocks[j + 4];
      t1l = blocks[j + 5];
      t2h = K[j + 4];
      t2l = K[j + 5];

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (fl & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (fl >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (fh & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (fh >>> 16) + (c3 >>> 16);

      t1h = (c4 << 16) | (c3 & 0xFFFF);
      t1l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
      c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
      c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
      c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

      t2h = (c4 << 16) | (c3 & 0xFFFF);
      t2l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (bl & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (bl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (bh & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (bh >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      fh = (c4 << 16) | (c3 & 0xFFFF);
      fl = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      bh = (c4 << 16) | (c3 & 0xFFFF);
      bl = (c2 << 16) | (c1 & 0xFFFF);

      s0h = ((bh >>> 28) | (bl << 4)) ^ ((bl >>> 2) | (bh << 30)) ^ ((bl >>> 7) | (bh << 25));
      s0l = ((bl >>> 28) | (bh << 4)) ^ ((bh >>> 2) | (bl << 30)) ^ ((bh >>> 7) | (bl << 25));

      s1h = ((fh >>> 14) | (fl << 18)) ^ ((fh >>> 18) | (fl << 14)) ^ ((fl >>> 9) | (fh << 23));
      s1l = ((fl >>> 14) | (fh << 18)) ^ ((fl >>> 18) | (fh << 14)) ^ ((fh >>> 9) | (fl << 23));

      bch = bh & ch;
      bcl = bl & cl;
      majh = bch ^ (bh & dh) ^ cdh;
      majl = bcl ^ (bl & dl) ^ cdl;

      chh = (fh & gh) ^ (~fh & hh);
      chl = (fl & gl) ^ (~fl & hl);

      t1h = blocks[j + 6];
      t1l = blocks[j + 7];
      t2h = K[j + 6];
      t2l = K[j + 7];

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF) + (chl & 0xFFFF) + (s1l & 0xFFFF) + (el & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (el >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (chh & 0xFFFF) + (s1h & 0xFFFF) + (eh & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (eh >>> 16) + (c3 >>> 16);

      t1h = (c4 << 16) | (c3 & 0xFFFF);
      t1l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (majl & 0xFFFF) + (s0l & 0xFFFF);
      c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
      c3 = (majh & 0xFFFF) + (s0h & 0xFFFF) + (c2 >>> 16);
      c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

      t2h = (c4 << 16) | (c3 & 0xFFFF);
      t2l = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (al & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (al >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (ah & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (ah >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      eh = (c4 << 16) | (c3 & 0xFFFF);
      el = (c2 << 16) | (c1 & 0xFFFF);

      c1 = (t2l & 0xFFFF) + (t1l & 0xFFFF);
      c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
      c3 = (t2h & 0xFFFF) + (t1h & 0xFFFF) + (c2 >>> 16);
      c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

      ah = (c4 << 16) | (c3 & 0xFFFF);
      al = (c2 << 16) | (c1 & 0xFFFF);
    }

    c1 = (h0l & 0xFFFF) + (al & 0xFFFF);
    c2 = (h0l >>> 16) + (al >>> 16) + (c1 >>> 16);
    c3 = (h0h & 0xFFFF) + (ah & 0xFFFF) + (c2 >>> 16);
    c4 = (h0h >>> 16) + (ah >>> 16) + (c3 >>> 16);

    this.h0h = (c4 << 16) | (c3 & 0xFFFF);
    this.h0l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h1l & 0xFFFF) + (bl & 0xFFFF);
    c2 = (h1l >>> 16) + (bl >>> 16) + (c1 >>> 16);
    c3 = (h1h & 0xFFFF) + (bh & 0xFFFF) + (c2 >>> 16);
    c4 = (h1h >>> 16) + (bh >>> 16) + (c3 >>> 16);

    this.h1h = (c4 << 16) | (c3 & 0xFFFF);
    this.h1l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h2l & 0xFFFF) + (cl & 0xFFFF);
    c2 = (h2l >>> 16) + (cl >>> 16) + (c1 >>> 16);
    c3 = (h2h & 0xFFFF) + (ch & 0xFFFF) + (c2 >>> 16);
    c4 = (h2h >>> 16) + (ch >>> 16) + (c3 >>> 16);

    this.h2h = (c4 << 16) | (c3 & 0xFFFF);
    this.h2l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h3l & 0xFFFF) + (dl & 0xFFFF);
    c2 = (h3l >>> 16) + (dl >>> 16) + (c1 >>> 16);
    c3 = (h3h & 0xFFFF) + (dh & 0xFFFF) + (c2 >>> 16);
    c4 = (h3h >>> 16) + (dh >>> 16) + (c3 >>> 16);

    this.h3h = (c4 << 16) | (c3 & 0xFFFF);
    this.h3l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h4l & 0xFFFF) + (el & 0xFFFF);
    c2 = (h4l >>> 16) + (el >>> 16) + (c1 >>> 16);
    c3 = (h4h & 0xFFFF) + (eh & 0xFFFF) + (c2 >>> 16);
    c4 = (h4h >>> 16) + (eh >>> 16) + (c3 >>> 16);

    this.h4h = (c4 << 16) | (c3 & 0xFFFF);
    this.h4l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h5l & 0xFFFF) + (fl & 0xFFFF);
    c2 = (h5l >>> 16) + (fl >>> 16) + (c1 >>> 16);
    c3 = (h5h & 0xFFFF) + (fh & 0xFFFF) + (c2 >>> 16);
    c4 = (h5h >>> 16) + (fh >>> 16) + (c3 >>> 16);

    this.h5h = (c4 << 16) | (c3 & 0xFFFF);
    this.h5l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h6l & 0xFFFF) + (gl & 0xFFFF);
    c2 = (h6l >>> 16) + (gl >>> 16) + (c1 >>> 16);
    c3 = (h6h & 0xFFFF) + (gh & 0xFFFF) + (c2 >>> 16);
    c4 = (h6h >>> 16) + (gh >>> 16) + (c3 >>> 16);

    this.h6h = (c4 << 16) | (c3 & 0xFFFF);
    this.h6l = (c2 << 16) | (c1 & 0xFFFF);

    c1 = (h7l & 0xFFFF) + (hl & 0xFFFF);
    c2 = (h7l >>> 16) + (hl >>> 16) + (c1 >>> 16);
    c3 = (h7h & 0xFFFF) + (hh & 0xFFFF) + (c2 >>> 16);
    c4 = (h7h >>> 16) + (hh >>> 16) + (c3 >>> 16);

    this.h7h = (c4 << 16) | (c3 & 0xFFFF);
    this.h7l = (c2 << 16) | (c1 & 0xFFFF);
  };

  Sha512.prototype.hex = function () {
    this.finalize();

    var h0h = this.h0h, h0l = this.h0l, h1h = this.h1h, h1l = this.h1l,
      h2h = this.h2h, h2l = this.h2l, h3h = this.h3h, h3l = this.h3l,
      h4h = this.h4h, h4l = this.h4l, h5h = this.h5h, h5l = this.h5l,
      h6h = this.h6h, h6l = this.h6l, h7h = this.h7h, h7l = this.h7l,
      bits = this.bits;

    var hex = HEX_CHARS[(h0h >> 28) & 0x0F] + HEX_CHARS[(h0h >> 24) & 0x0F] +
      HEX_CHARS[(h0h >> 20) & 0x0F] + HEX_CHARS[(h0h >> 16) & 0x0F] +
      HEX_CHARS[(h0h >> 12) & 0x0F] + HEX_CHARS[(h0h >> 8) & 0x0F] +
      HEX_CHARS[(h0h >> 4) & 0x0F] + HEX_CHARS[h0h & 0x0F] +
      HEX_CHARS[(h0l >> 28) & 0x0F] + HEX_CHARS[(h0l >> 24) & 0x0F] +
      HEX_CHARS[(h0l >> 20) & 0x0F] + HEX_CHARS[(h0l >> 16) & 0x0F] +
      HEX_CHARS[(h0l >> 12) & 0x0F] + HEX_CHARS[(h0l >> 8) & 0x0F] +
      HEX_CHARS[(h0l >> 4) & 0x0F] + HEX_CHARS[h0l & 0x0F] +
      HEX_CHARS[(h1h >> 28) & 0x0F] + HEX_CHARS[(h1h >> 24) & 0x0F] +
      HEX_CHARS[(h1h >> 20) & 0x0F] + HEX_CHARS[(h1h >> 16) & 0x0F] +
      HEX_CHARS[(h1h >> 12) & 0x0F] + HEX_CHARS[(h1h >> 8) & 0x0F] +
      HEX_CHARS[(h1h >> 4) & 0x0F] + HEX_CHARS[h1h & 0x0F] +
      HEX_CHARS[(h1l >> 28) & 0x0F] + HEX_CHARS[(h1l >> 24) & 0x0F] +
      HEX_CHARS[(h1l >> 20) & 0x0F] + HEX_CHARS[(h1l >> 16) & 0x0F] +
      HEX_CHARS[(h1l >> 12) & 0x0F] + HEX_CHARS[(h1l >> 8) & 0x0F] +
      HEX_CHARS[(h1l >> 4) & 0x0F] + HEX_CHARS[h1l & 0x0F] +
      HEX_CHARS[(h2h >> 28) & 0x0F] + HEX_CHARS[(h2h >> 24) & 0x0F] +
      HEX_CHARS[(h2h >> 20) & 0x0F] + HEX_CHARS[(h2h >> 16) & 0x0F] +
      HEX_CHARS[(h2h >> 12) & 0x0F] + HEX_CHARS[(h2h >> 8) & 0x0F] +
      HEX_CHARS[(h2h >> 4) & 0x0F] + HEX_CHARS[h2h & 0x0F] +
      HEX_CHARS[(h2l >> 28) & 0x0F] + HEX_CHARS[(h2l >> 24) & 0x0F] +
      HEX_CHARS[(h2l >> 20) & 0x0F] + HEX_CHARS[(h2l >> 16) & 0x0F] +
      HEX_CHARS[(h2l >> 12) & 0x0F] + HEX_CHARS[(h2l >> 8) & 0x0F] +
      HEX_CHARS[(h2l >> 4) & 0x0F] + HEX_CHARS[h2l & 0x0F] +
      HEX_CHARS[(h3h >> 28) & 0x0F] + HEX_CHARS[(h3h >> 24) & 0x0F] +
      HEX_CHARS[(h3h >> 20) & 0x0F] + HEX_CHARS[(h3h >> 16) & 0x0F] +
      HEX_CHARS[(h3h >> 12) & 0x0F] + HEX_CHARS[(h3h >> 8) & 0x0F] +
      HEX_CHARS[(h3h >> 4) & 0x0F] + HEX_CHARS[h3h & 0x0F];
    if (bits >= 256) {
      hex += HEX_CHARS[(h3l >> 28) & 0x0F] + HEX_CHARS[(h3l >> 24) & 0x0F] +
        HEX_CHARS[(h3l >> 20) & 0x0F] + HEX_CHARS[(h3l >> 16) & 0x0F] +
        HEX_CHARS[(h3l >> 12) & 0x0F] + HEX_CHARS[(h3l >> 8) & 0x0F] +
        HEX_CHARS[(h3l >> 4) & 0x0F] + HEX_CHARS[h3l & 0x0F];
    }
    if (bits >= 384) {
      hex += HEX_CHARS[(h4h >> 28) & 0x0F] + HEX_CHARS[(h4h >> 24) & 0x0F] +
        HEX_CHARS[(h4h >> 20) & 0x0F] + HEX_CHARS[(h4h >> 16) & 0x0F] +
        HEX_CHARS[(h4h >> 12) & 0x0F] + HEX_CHARS[(h4h >> 8) & 0x0F] +
        HEX_CHARS[(h4h >> 4) & 0x0F] + HEX_CHARS[h4h & 0x0F] +
        HEX_CHARS[(h4l >> 28) & 0x0F] + HEX_CHARS[(h4l >> 24) & 0x0F] +
        HEX_CHARS[(h4l >> 20) & 0x0F] + HEX_CHARS[(h4l >> 16) & 0x0F] +
        HEX_CHARS[(h4l >> 12) & 0x0F] + HEX_CHARS[(h4l >> 8) & 0x0F] +
        HEX_CHARS[(h4l >> 4) & 0x0F] + HEX_CHARS[h4l & 0x0F] +
        HEX_CHARS[(h5h >> 28) & 0x0F] + HEX_CHARS[(h5h >> 24) & 0x0F] +
        HEX_CHARS[(h5h >> 20) & 0x0F] + HEX_CHARS[(h5h >> 16) & 0x0F] +
        HEX_CHARS[(h5h >> 12) & 0x0F] + HEX_CHARS[(h5h >> 8) & 0x0F] +
        HEX_CHARS[(h5h >> 4) & 0x0F] + HEX_CHARS[h5h & 0x0F] +
        HEX_CHARS[(h5l >> 28) & 0x0F] + HEX_CHARS[(h5l >> 24) & 0x0F] +
        HEX_CHARS[(h5l >> 20) & 0x0F] + HEX_CHARS[(h5l >> 16) & 0x0F] +
        HEX_CHARS[(h5l >> 12) & 0x0F] + HEX_CHARS[(h5l >> 8) & 0x0F] +
        HEX_CHARS[(h5l >> 4) & 0x0F] + HEX_CHARS[h5l & 0x0F];
    }
    if (bits == 512) {
      hex += HEX_CHARS[(h6h >> 28) & 0x0F] + HEX_CHARS[(h6h >> 24) & 0x0F] +
        HEX_CHARS[(h6h >> 20) & 0x0F] + HEX_CHARS[(h6h >> 16) & 0x0F] +
        HEX_CHARS[(h6h >> 12) & 0x0F] + HEX_CHARS[(h6h >> 8) & 0x0F] +
        HEX_CHARS[(h6h >> 4) & 0x0F] + HEX_CHARS[h6h & 0x0F] +
        HEX_CHARS[(h6l >> 28) & 0x0F] + HEX_CHARS[(h6l >> 24) & 0x0F] +
        HEX_CHARS[(h6l >> 20) & 0x0F] + HEX_CHARS[(h6l >> 16) & 0x0F] +
        HEX_CHARS[(h6l >> 12) & 0x0F] + HEX_CHARS[(h6l >> 8) & 0x0F] +
        HEX_CHARS[(h6l >> 4) & 0x0F] + HEX_CHARS[h6l & 0x0F] +
        HEX_CHARS[(h7h >> 28) & 0x0F] + HEX_CHARS[(h7h >> 24) & 0x0F] +
        HEX_CHARS[(h7h >> 20) & 0x0F] + HEX_CHARS[(h7h >> 16) & 0x0F] +
        HEX_CHARS[(h7h >> 12) & 0x0F] + HEX_CHARS[(h7h >> 8) & 0x0F] +
        HEX_CHARS[(h7h >> 4) & 0x0F] + HEX_CHARS[h7h & 0x0F] +
        HEX_CHARS[(h7l >> 28) & 0x0F] + HEX_CHARS[(h7l >> 24) & 0x0F] +
        HEX_CHARS[(h7l >> 20) & 0x0F] + HEX_CHARS[(h7l >> 16) & 0x0F] +
        HEX_CHARS[(h7l >> 12) & 0x0F] + HEX_CHARS[(h7l >> 8) & 0x0F] +
        HEX_CHARS[(h7l >> 4) & 0x0F] + HEX_CHARS[h7l & 0x0F];
    }
    return hex;
  };

  Sha512.prototype.toString = Sha512.prototype.hex;

  Sha512.prototype.digest = function () {
    this.finalize();

    var h0h = this.h0h, h0l = this.h0l, h1h = this.h1h, h1l = this.h1l,
      h2h = this.h2h, h2l = this.h2l, h3h = this.h3h, h3l = this.h3l,
      h4h = this.h4h, h4l = this.h4l, h5h = this.h5h, h5l = this.h5l,
      h6h = this.h6h, h6l = this.h6l, h7h = this.h7h, h7l = this.h7l,
      bits = this.bits;

    var arr = [
      (h0h >> 24) & 0xFF, (h0h >> 16) & 0xFF, (h0h >> 8) & 0xFF, h0h & 0xFF,
      (h0l >> 24) & 0xFF, (h0l >> 16) & 0xFF, (h0l >> 8) & 0xFF, h0l & 0xFF,
      (h1h >> 24) & 0xFF, (h1h >> 16) & 0xFF, (h1h >> 8) & 0xFF, h1h & 0xFF,
      (h1l >> 24) & 0xFF, (h1l >> 16) & 0xFF, (h1l >> 8) & 0xFF, h1l & 0xFF,
      (h2h >> 24) & 0xFF, (h2h >> 16) & 0xFF, (h2h >> 8) & 0xFF, h2h & 0xFF,
      (h2l >> 24) & 0xFF, (h2l >> 16) & 0xFF, (h2l >> 8) & 0xFF, h2l & 0xFF,
      (h3h >> 24) & 0xFF, (h3h >> 16) & 0xFF, (h3h >> 8) & 0xFF, h3h & 0xFF
    ];

    if (bits >= 256) {
      arr.push((h3l >> 24) & 0xFF, (h3l >> 16) & 0xFF, (h3l >> 8) & 0xFF, h3l & 0xFF);
    }
    if (bits >= 384) {
      arr.push(
        (h4h >> 24) & 0xFF, (h4h >> 16) & 0xFF, (h4h >> 8) & 0xFF, h4h & 0xFF,
        (h4l >> 24) & 0xFF, (h4l >> 16) & 0xFF, (h4l >> 8) & 0xFF, h4l & 0xFF,
        (h5h >> 24) & 0xFF, (h5h >> 16) & 0xFF, (h5h >> 8) & 0xFF, h5h & 0xFF,
        (h5l >> 24) & 0xFF, (h5l >> 16) & 0xFF, (h5l >> 8) & 0xFF, h5l & 0xFF
      );
    }
    if (bits == 512) {
      arr.push(
        (h6h >> 24) & 0xFF, (h6h >> 16) & 0xFF, (h6h >> 8) & 0xFF, h6h & 0xFF,
        (h6l >> 24) & 0xFF, (h6l >> 16) & 0xFF, (h6l >> 8) & 0xFF, h6l & 0xFF,
        (h7h >> 24) & 0xFF, (h7h >> 16) & 0xFF, (h7h >> 8) & 0xFF, h7h & 0xFF,
        (h7l >> 24) & 0xFF, (h7l >> 16) & 0xFF, (h7l >> 8) & 0xFF, h7l & 0xFF
      );
    }
    return arr;
  };

  Sha512.prototype.array = Sha512.prototype.digest;

  Sha512.prototype.arrayBuffer = function () {
    this.finalize();

    var bits = this.bits;
    var buffer = new ArrayBuffer(bits / 8);
    var dataView = new DataView(buffer);
    dataView.setUint32(0, this.h0h);
    dataView.setUint32(4, this.h0l);
    dataView.setUint32(8, this.h1h);
    dataView.setUint32(12, this.h1l);
    dataView.setUint32(16, this.h2h);
    dataView.setUint32(20, this.h2l);
    dataView.setUint32(24, this.h3h);

    if (bits >= 256) {
      dataView.setUint32(28, this.h3l);
    }
    if (bits >= 384) {
      dataView.setUint32(32, this.h4h);
      dataView.setUint32(36, this.h4l);
      dataView.setUint32(40, this.h5h);
      dataView.setUint32(44, this.h5l);
    }
    if (bits == 512) {
      dataView.setUint32(48, this.h6h);
      dataView.setUint32(52, this.h6l);
      dataView.setUint32(56, this.h7h);
      dataView.setUint32(60, this.h7l);
    }
    return buffer;
  };

  function HmacSha512(key, bits, sharedMemory) {
    var notString, type = typeof key;
    if (type !== 'string') {
      if (type === 'object') {
        if (key === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
          key = new Uint8Array(key);
        } else if (!Array.isArray(key)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var length = key.length;
    if (!notString) {
      var bytes = [], length = key.length, index = 0, code;
      for (var i = 0; i < length; ++i) {
        code = key.charCodeAt(i);
        if (code < 0x80) {
          bytes[index++] = code;
        } else if (code < 0x800) {
          bytes[index++] = (0xc0 | (code >> 6));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes[index++] = (0xe0 | (code >> 12));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (key.charCodeAt(++i) & 0x3ff));
          bytes[index++] = (0xf0 | (code >> 18));
          bytes[index++] = (0x80 | ((code >> 12) & 0x3f));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        }
      }
      key = bytes;
    }

    if (key.length > 128) {
      key = (new Sha512(bits, true)).update(key).array();
    }

    var oKeyPad = [], iKeyPad = [];
    for (var i = 0; i < 128; ++i) {
      var b = key[i] || 0;
      oKeyPad[i] = 0x5c ^ b;
      iKeyPad[i] = 0x36 ^ b;
    }

    Sha512.call(this, bits, sharedMemory);

    this.update(iKeyPad);
    this.oKeyPad = oKeyPad;
    this.inner = true;
    this.sharedMemory = sharedMemory;
  }
  HmacSha512.prototype = new Sha512();

  HmacSha512.prototype.finalize = function () {
    Sha512.prototype.finalize.call(this);
    if (this.inner) {
      this.inner = false;
      var innerHash = this.array();
      Sha512.call(this, this.bits, this.sharedMemory);
      this.update(this.oKeyPad);
      this.update(innerHash);
      Sha512.prototype.finalize.call(this);
    }
  };

  var exports = createMethod(512);
  exports.sha512 = exports;
  exports.sha384 = createMethod(384);
  exports.sha512_256 = createMethod(256);
  exports.sha512_224 = createMethod(224);
  exports.sha512.hmac = createHmacMethod(512);
  exports.sha384.hmac = createHmacMethod(384);
  exports.sha512_256.hmac = createHmacMethod(256);
  exports.sha512_224.hmac = createHmacMethod(224);

  /*if (COMMON_JS) {
    module.exports = exports;
  } else {
    root.sha512 = exports.sha512;
    root.sha384 = exports.sha384;
    root.sha512_256 = exports.sha512_256;
    root.sha512_224 = exports.sha512_224;
    if (AMD) {
      define(function () {
        return exports;
      });
    }
  }*/
  global.__SHA512_LIB = exports.sha512;
})();

/*
 * 클래스를 생성합니다.
 */
global.CLASS = METHOD((m) => {

	let instanceCount = 0;

	let getNextInstanceId = m.getNextInstanceId = () => {

		instanceCount += 1;

		return instanceCount - 1;
	};

	return {

		run : (define) => {
			//REQUIRED: define	클래스 정의 구문

			let funcs;
			
			let preset;
			let init;
			let _params;
			let afterInit;
			
			let cls = (params, funcs) => {
				//OPTIONAL: params
				//OPTIONAL: funcs

				// inner (protected)
				let inner = {};

				// self (public)
				let self = {
					
					type : cls,
					
					id : getNextInstanceId(),
					
					checkIsInstanceOf : (checkCls) => {
	
						let targetCls = cls;
	
						// check moms.
						while (targetCls !== undefined) {
	
							if (targetCls === checkCls) {
								return true;
							}
	
							targetCls = targetCls.mom;
						}
	
						return false;
					}
				};
				
				params = innerInit(inner, self, params, funcs);

				innerAfterInit(inner, self, params, funcs);

				return self;
			};
			
			if ( typeof define === 'function') {
				funcs = define(cls);
			} else {
				funcs = define;
			}

			if (funcs !== undefined) {
				preset = funcs.preset;
				init = funcs.init;
				_params = funcs.params;
				afterInit = funcs.afterInit;
			}

			cls.type = CLASS;
			cls.id = getNextInstanceId();

			let innerInit = cls.innerInit = (inner, self, params, funcs) => {
				//REQUIRED: inner
				//REQUIRED: self
				//OPTIONAL: params
				//OPTIONAL: funcs
				
				// mom (parent class)
				let mom;
				
				let paramValue;

				let extend = (params, tempParams) => {

					EACH(tempParams, (value, name) => {

						if (params[name] === undefined) {
							params[name] = value;
						} else if (CHECK_IS_DATA(params[name]) === true && CHECK_IS_DATA(value) === true) {
							extend(params[name], value);
						}
					});
				};

				// init params.
				if (_params !== undefined) {

					if (params === undefined) {
						params = _params(cls);
					}
					
					else if (CHECK_IS_DATA(params) === true) {

						let tempParams = _params(cls);

						if (tempParams !== undefined) {
							extend(params, tempParams);
						}
					}
					
					else {
						paramValue = params;
						params = _params(cls);
					}
				}

				if (preset !== undefined) {

					mom = preset(params, funcs);

					if (mom !== undefined) {

						cls.mom = mom;

						// when mom's type is CLASS
						if (mom.type === CLASS) {
							mom.innerInit(inner, self, params, funcs);
						}

						// when mom's type is OBJECT
						else {
							mom.type.innerInit(inner, self, params, funcs);
						}
					}
				}

				if (init !== undefined) {
					init(inner, self, paramValue === undefined ? params : paramValue, funcs);
				}

				return params;
			};

			let innerAfterInit = cls.innerAfterInit = (inner, self, params, funcs) => {
				//REQUIRED: inner
				//REQUIRED: self
				//OPTIONAL: params
				//OPTIONAL: funcs

				let mom = cls.mom;

				// when mom exists, run mom's after init.
				if (mom !== undefined) {

					// when mom's type is CLASS
					if (mom.type === CLASS) {
						mom.innerAfterInit(inner, self, params, funcs);
					}

					// when mon's type is OBJECT
					else {
						mom.type.innerAfterInit(inner, self, params, funcs);
					}
				}

				if (afterInit !== undefined) {
					afterInit(inner, self, params, funcs);
				}
			};

			return cls;
		}
	};
});

/*
 * 모든 정의된 싱글톤 객체의 초기화를 수행합니다.
 */
global.INIT_OBJECTS = METHOD({

	run : () => {

		OBJECT.initObjects();
	}
});

/*
 * 싱글톤 객체를 생성합니다.
 */
global.OBJECT = METHOD((m) => {

	let readyObjects = [];
	let isInited = false;

	let initObject = (object) => {
		//REQUIRED: object	초기화 할 싱글톤 객체

		let cls = object.type;
		let inner = {};
		let params = {};

		// set id.
		object.id = CLASS.getNextInstanceId();

		cls.innerInit(inner, object, params);
		cls.innerAfterInit(inner, object, params);
	};

	let addReadyObject = (object) => {
		//REQUIRED: object	초기화를 대기시킬 싱글톤 객체

		if (isInited === true) {
			initObject(object);
		} else {
			readyObjects.push(object);
		}
	};

	let removeReadyObject = m.removeReadyObject = (object) => {
		//REQUIRED: object	대기열에서 삭제할 싱글톤 객체
		
		REMOVE({
			array : readyObjects,
			value : object
		});
	};

	let initObjects = m.initObjects = () => {

		// init all objects.
		EACH(readyObjects, (object) => {
			initObject(object);
		});

		isInited = true;
	};

	return {

		run : (define) => {
			//REQUIRED: define	클래스 정의 구문

			let cls = CLASS(define);

			let self = {
				
				type : cls,
				
				checkIsInstanceOf : (checkCls) => {

					let targetCls = cls;
	
					// check moms.
					while (targetCls !== undefined) {
	
						if (targetCls === checkCls) {
							return true;
						}
	
						targetCls = targetCls.mom;
					}
	
					return false;
				}
			};
			
			addReadyObject(self);

			return self;
		}
	};
});

/*
 * 주어진 비동기 함수들을 순서대로 실행합니다.
 */
global.NEXT = METHOD({

	run : (dataOrArrayOrCount, funcOrFuncs) => {
		//OPTIONAL: dataOrArrayOrCount
		//REQUIRED: funcOrFuncs

		let data;
		let dataKeys;
		let array;
		let count;
		
		let f;
		
		if (funcOrFuncs === undefined) {
			funcOrFuncs = dataOrArrayOrCount;
			dataOrArrayOrCount = undefined;
		}

		if (dataOrArrayOrCount !== undefined) {
			if (CHECK_IS_DATA(dataOrArrayOrCount) === true) {
				data = dataOrArrayOrCount;
			} else if (CHECK_IS_ARRAY(dataOrArrayOrCount) === true) {
				array = dataOrArrayOrCount;
			} else {
				count = dataOrArrayOrCount;
			}
		}
		
		if (data !== undefined) {
			dataKeys = [];
			
			EACH(data, (value, key) => {
				dataKeys.push(key);
			});
		}
		
		let funcs;
		if (CHECK_IS_ARRAY(funcOrFuncs) !== true) {
			funcs = [funcOrFuncs];
		} else {
			funcs = funcOrFuncs;
		}
		
		REPEAT({
			start : funcs.length - 1,
			end : 0
		}, (i) => {

			let next;

			// get last function.
			if (i !== 0 && f === undefined) {
				f = funcs[i]();
			}

			// pass next function.
			else if (i > 0) {

				next = f;

				f = funcs[i](next);

				f.next = next;
			}

			// run first function.
			else {

				next = f;

				// when next not exists, next is empty function.
				if (next === undefined) {
					next = () => {
						// ignore.
					};
				}

				f = funcs[i];

				if (count !== undefined) {
					
					let i = -1;

					RUN((self) => {

						i += 1;

						if (i + 1 < count) {
							f(i, self);
						} else {
							f(i, next);
						}
					});
				}
				
				else if (array !== undefined) {

					let length = array.length;

					if (length === 0) {
						next();
					}
					
					else {
						
						let i = -1;

						RUN((self) => {

							i += 1;

							if (i + 1 < length) {

								// if shrink
								if (array.length === length - 1) {
									i -= 1;
									length -= 1;
								}

								f(array[i], self, i);

							} else {
								f(array[i], next, i);
							}
						});
					}
				}
				
				else if (data !== undefined) {

					let length = dataKeys.length;

					if (length === 0) {
						next();
					}
					
					else {
						
						let i = -1;

						RUN((self) => {

							i += 1;

							if (i + 1 < length) {

								// if shrink
								if (dataKeys.length === length - 1) {
									i -= 1;
									length -= 1;
								}
								
								let key = dataKeys[i];

								f(data[key], self, key);

							} else {
								
								let key = dataKeys[i];
								
								f(data[key], next, key);
							}
						});
					}
				}
				
				else {
					f(next);
				}
			}
		});
	}
});

/*
 * 오버라이딩을 수행합니다.
 */
global.OVERRIDE = METHOD({

	run : (origin, func) => {
		//REQUIRED: origin	오버라이드 할 대상
		//REQUIRED: func

		// when origin is OBJECT.
		if (origin.type !== undefined && origin.type.type === CLASS) {

			// remove origin from init ready objects.
			OBJECT.removeReadyObject(origin);
		}

		func(origin);
	}
});

/*
 * 주어진 비동기 함수들을 병렬로 실행합니다.
 */
global.PARALLEL = METHOD({

	run : (dataOrArrayOrCount, funcs) => {
		//OPTIONAL: dataOrArrayOrCount
		//REQUIRED: funcs
		
		let doneCount = 0;

		// only funcs
		if (funcs === undefined) {
			funcs = dataOrArrayOrCount;
			
			let length = funcs.length - 1;

			EACH(funcs, (func, i) => {

				if (i < length) {

					func(() => {

						doneCount += 1;

						if (doneCount === length) {
							funcs[length]();
						}
					});
				}
			});
		}
		
		else if (dataOrArrayOrCount === undefined) {
			funcs[1]();
		}
		
		else if (CHECK_IS_DATA(dataOrArrayOrCount) === true) {
			
			let propertyCount = COUNT_PROPERTIES(dataOrArrayOrCount);

			if (propertyCount === 0) {
				funcs[1]();
			} else {

				EACH(dataOrArrayOrCount, (value, name) => {

					funcs[0](value, () => {

						doneCount += 1;

						if (doneCount === propertyCount) {
							funcs[1]();
						}
					}, name);
				});
			}
		}
		
		else if (CHECK_IS_ARRAY(dataOrArrayOrCount) === true) {
	
			if (dataOrArrayOrCount.length === 0) {
				funcs[1]();
			} else {

				EACH(dataOrArrayOrCount, (value, i) => {

					funcs[0](value, () => {

						doneCount += 1;

						if (doneCount === dataOrArrayOrCount.length) {
							funcs[1]();
						}
					}, i);
				});
			}
		}
		
		// when dataOrArrayOrCount is count
		else {
	
			if (dataOrArrayOrCount === 0) {
				funcs[1]();
			} else {

				REPEAT(dataOrArrayOrCount, (i) => {

					funcs[0](i, () => {

						doneCount += 1;

						if (doneCount === dataOrArrayOrCount) {
							funcs[1]();
						}
					});
				});
			}
		}
	}
});

/*
 * JSON 문자열을 원래 데이터나 배열, 값으로 변환합니다.
 */
global.PARSE_STR = METHOD({

	run : (dataStr) => {
		//REQUIRED: dataStr
		
		try {

			let data = JSON.parse(dataStr);
			
			if (CHECK_IS_DATA(data) === true) {
				return UNPACK_DATA(data);
			}
			
			else if (CHECK_IS_ARRAY(data) === true) {
				
				let array = [];
				
				EACH(data, (data) => {
					
					if (CHECK_IS_DATA(data) === true) {
						array.push(UNPACK_DATA(data));
					}
					
					else if (CHECK_IS_ARRAY(data) === true) {
						
						EACH(data, (v, i) => {
		
							if (CHECK_IS_DATA(v) === true) {
								data[i] = UNPACK_DATA(v);
							}
						});
						
						array.push(data);
					}
					
					else {
						array.push(data);
					}
				});
				
				return array;
			}
			
			else {
				return data;
			}

		} catch(e) {

			// when error, return undefined.
			return undefined;
		}
	}
});

/*
 * 알파벳 대, 소문자와 숫자로 이루어진 임의의 문자열을 생성합니다.
 */
global.RANDOM_STR = METHOD(() => {
	
	const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	
	return {
	
		run : (length) => {
			//REQUIRED: length
	
			let randomStr = '';
	
			REPEAT(length, () => {
	
				// add random character to random string.
				randomStr += CHARACTERS.charAt(RANDOM({
					limit : CHARACTERS.length
				}));
			});
	
			return randomStr;
		}
	};
});

/*
 * 데이터나 배열, 값을 JSON 문자열로 변환합니다.
 */
global.STRINGIFY = METHOD({

	run : (data) => {
		//REQUIRED: data
		
		if (CHECK_IS_DATA(data) === true) {
			return JSON.stringify(PACK_DATA(data));
		}
		
		else if (CHECK_IS_ARRAY(data) === true) {
			
			let f = (array) => {
				
				let newArray = [];
				
				EACH(array, (data) => {
					if (CHECK_IS_DATA(data) === true) {
						newArray.push(PACK_DATA(data));
					} else if (CHECK_IS_ARRAY(data) === true) {
						newArray.push(f(data));
					} else {
						newArray.push(data);
					}
				});
				
				return newArray;
			};
			
			return JSON.stringify(f(data));
		}
		
		else {
			return JSON.stringify(data);
		}
	}
});

/*
 * 메시지의 특정 부분들을 바꿀 수 있는 템플릿 클래스
 */
global.TEMPLATE = CLASS({

	init : (inner, self, originMessage) => {
		
		let messages = [originMessage];
		
		let replace = self.replace = (key, message) => {
			
			EACH(messages, (m, i) => {
				
				if (typeof m === 'string') {
					
					let keyIndex = m.indexOf(key);
					if (keyIndex !== -1) {
						
						let start = m.substring(0, keyIndex);
						let end = m.substring(keyIndex + key.length);
						
						messages.splice(i, 1, end);
						messages.splice(i, 0, message);
						messages.splice(i, 0, start);
					}
				}
			});
		};
		
		let getMessages = self.getMessages = () => {
			return messages;
		};
	}
});

/*
 * 테스트용 메소드입니다.
 * 
 * 테스트에 성공하거나 실패하면 콘솔에 메시지를 출력합니다.
 */
global.TEST = METHOD((m) => {

	let errorCount = 0;

	return {

		run : (name, test) => {
			//REQUIRED: name
			//REQUIRED: test

			test((bool) => {
				//REQUIRED: bool

				let temp = {};
				let line;
				
				if (bool === true) {
					console.log(MSG({
						ko : '[' + name + ' 테스트] 테스트를 통과하였습니다. 총 ' + errorCount + '개의 오류가 있습니다.'
					}));
				} else {

					temp.__THROW_ERROR_$$$ = () => {
						try {
							throw Error();
						} catch(error) {
							return error;
						}
					};

					line = temp.__THROW_ERROR_$$$().stack;

					if (line !== undefined) {
						line = line.substring(line.indexOf('__THROW_ERROR_$$$'));
						line = line.split('\n')[2];
						line = line.substring(line.indexOf('at '));
					}

					errorCount += 1;

					console.log(MSG({
						ko : '[' + name + ' 테스트] ' + line + '에서 오류가 발견되었습니다. 총 ' + errorCount + '개의 오류가 있습니다.'
					}));
				}
			});
		}
	};
});

/*
 * URI가 주어진 포맷에 맞는지 확인하는 URI_MATCHER 클래스
 * 
 * 포맷에 파라미터 구간을 지정할 수 있어 URI로부터 파라미터 값을 가져올 수 있습니다.
 */
global.URI_MATCHER = CLASS({

	init : (inner, self, format) => {
		//REQUIRED: format

		let Check = CLASS({

			init : (inner, self, uri) => {
				//REQUIRED: uri

				let uriParts = uri.split('/');
				
				let isMatched;
				let uriParams = {};

				let find = (format) => {

					let formatParts = format.split('/');

					return EACH(uriParts, (uriPart, i) => {

						let formatPart = formatParts[i];

						if (formatPart === '**') {
							isMatched = true;
							return false;
						}

						if (formatPart === undefined) {
							return false;
						}

						// find params.
						if (uriPart !== '' && formatPart.charAt(0) === '{' && formatPart.charAt(formatPart.length - 1) === '}') {
							uriParams[formatPart.substring(1, formatPart.length - 1)] = uriPart;
						} else if (formatPart !== '*' && formatPart !== uriPart) {
							return false;
						}

						if (i === uriParts.length - 1 && i < formatParts.length - 1 && formatParts[formatParts.length - 1] !== '') {
							return false;
						}

					}) === true || isMatched === true;
				};

				if (CHECK_IS_ARRAY(format) === true) {
					isMatched = EACH(format, (format) => {
						return find(format) !== true;
					}) !== true;
				} else {
					isMatched = find(format);
				}

				let checkIsMatched = self.checkIsMatched = () => {
					return isMatched;
				};

				let getURIParams = self.getURIParams = () => {
					return uriParams;
				};
			}
		});
		
		let check = self.check = (uri) => {
			return Check(uri);
		};
	}
});

/*
 * 범용 고유 식별자를 생성합니다.
 */
global.UUID = METHOD({

	run : () => {

		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
});

/*
 * 데이터를 검증하고, 어떤 부분이 잘못되었는지 오류를 확인할 수 있는 VALID 클래스
 */
global.VALID = CLASS((cls) => {
	
	let notEmpty = cls.notEmpty = (value) => {
		//REQUIRED: value

		let str = (value === undefined || value === TO_DELETE) ? '' : String(value);

		return CHECK_IS_ARRAY(value) === true || str.trim() !== '';
	};

	let regex = cls.regex = (params) => {
		//REQUIRED: params
		//REQUIRED: params.value
		//REQUIRED: params.pattern

		let str = String(params.value);
		let pattern = params.pattern;
		
		let result = str.match(pattern);

		return result !== TO_DELETE && str === result[0];
	};

	let size = cls.size = (params) => {
		//REQUIRED: params
		//REQUIRED: params.value
		//OPTIONAL: params.min
		//REQUIRED: params.max
		
		let value = params.value;
		
		if (CHECK_IS_DATA(value) === true) {
			return false;
		}
		
		let str = String(value);
		let min = params.min;
		let max = params.max;
		
		if (min === undefined) {
			min = 0;
		}

		return min <= str.trim().length && (max === undefined || str.length <= max);
	};

	let integer = cls.integer = (value) => {
		//REQUIRED: value

		let str = String(value);

		return notEmpty(str) === true && str.match(/^(?:-?(?:0|[1-9][0-9]*))$/) !== TO_DELETE;
	};

	let real = cls.real = (value) => {
		//REQUIRED: value
		
		let str = String(value);

		return notEmpty(str) === true && str.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/) !== TO_DELETE;
	};

	let bool = cls.bool = (value) => {
		//REQUIRED: value
		
		let str = String(value);

		return str === 'true' || str === 'false';
	};

	let date = cls.date = (value) => {
		//REQUIRED: value

		let str = String(value);
		let date = Date.parse(str);

		return isNaN(date) === false;
	};

	let min = cls.min = (params) => {
		//REQUIRED: params
		//REQUIRED: params.value
		//REQUIRED: params.min
		
		let value = params.value;
		let min = params.min;

		return real(value) === true && min <= value;
	};

	let max = cls.max = (params) => {
		//REQUIRED: params
		//REQUIRED: params.value
		//REQUIRED: params.max
		
		let value = params.value;
		let max = params.max;

		return real(value) === true && max >= value;
	};

	let email = cls.email = (value) => {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/) !== TO_DELETE;
	};

	let png = cls.png = (value) => {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/^data:image\/png;base64,/) !== TO_DELETE;
	};

	let url = cls.url = (value) => {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-a-z\u0080-\uffff\d{1-3}]+\.)+(?:[a-z\u0080-\uffff]+))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\u0000-\uffff~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\u0000-\uffff~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\u0000-\uffff~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\u0000-\uffff~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\u0000-\uffff~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\u0000-\uffff~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i) !== TO_DELETE && value.length <= 2083;
	};

	let username = cls.username = (value) => {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/^[_a-zA-Z0-9\-]+$/) !== TO_DELETE;
	};

	// check is mongo id.
	let mongoId = cls.mongoId = (value) => {
		//REQUIRED: value

		return typeof value === 'string' && notEmpty(value) === true && value.match(/[0-9a-f]{24}/) !== TO_DELETE && value.length === 24;
	};

	let one = cls.one = (params) => {
		//REQUIRED: params
		//REQUIRED: params.value
		//REQUIRED: params.array

		let value = params.value;
		let array = params.array;

		return EACH(array, (_value) => {
			if (value === _value) {
				return false;
			}
		}) === false;
	};

	let array = cls.array = (value) => {
		//REQUIRED: value

		return CHECK_IS_ARRAY(value) === true;
	};

	let data = cls.data = (value) => {
		//REQUIRED: value

		return CHECK_IS_DATA(value) === true;
	};

	let element = cls.element = (params) => {
		//REQUIRED: params
		//REQUIRED: params.array
		//REQUIRED: params.validData
		//OPTIONAL: params.isToWash
		
		let array = params.array;

		let valid = VALID({
			_ : params.validData
		});
		
		let isToWash = params.isToWash;
		
		return EACH(array, (value) => {
			if ((isToWash === true ? valid.checkAndWash : valid.check)({
				_ : value
			}).checkHasError() === true) {
				return false;
			}
		}) === true;
	};

	let property = cls.property = (params) => {
		//REQUIRED: params
		//REQUIRED: params.data
		//REQUIRED: params.validData
		//OPTIONAL: params.isToWash

		let data = params.data;

		let valid = VALID({
			_ : params.validData
		});
		
		let isToWash = params.isToWash;
		
		return EACH(data, (value) => {
			if ((isToWash === true ? valid.checkAndWash : valid.check)({
				_ : value
			}).checkHasError() === true) {
				return false;
			}
		}) === true;
	};

	let detail = cls.detail = (params) => {
		//REQUIRED: params
		//REQUIRED: params.data
		//REQUIRED: params.validDataSet
		//OPTIONAL: params.isToWash
		//OPTIONAL: params.errors
		
		let data = params.data;
		let valid = VALID(params.validDataSet);
		let isToWash = params.isToWash;
		let errors = params.errors;
		
		let result = (isToWash === true ? valid.checkAndWash : valid.check)(data);
		
		EXTEND({
			origin : errors,
			extend : result.getErrors()
		});
		
		return result.checkHasError() !== true;
	};

	let equal = cls.equal = (params) => {
		//REQUIRED: params
		//REQUIRED: params.value
		//REQUIRED: params.validValue

		let str = String(params.value);
		let validStr = String(params.validValue);

		return str === validStr;
	};

	return {

		init : (inner, self, validDataSet) => {
			//REQUIRED: validDataSet

			let Check = CLASS({

				init : (inner, self, params) => {
					//REQUIRED: params
					//REQUIRED: params.data
					//OPTIONAL: params.isToWash
					//OPTIONAL: params.isForUpdate

					let data = params.data;
					let isToWash = params.isToWash;
					let isForUpdate = params.isForUpdate;

					let hasError = false;
					let errors = {};

					EACH(validDataSet, (validData, attr) => {

						// when valid data is true, pass
						if (validData !== true) {

							EACH(validData, (validParams, name) => {

								let value = data[attr];
								
								if (isForUpdate === true && value === undefined) {

									// break.
									return false;
								}

								if (isToWash === true && name !== 'notEmpty' && notEmpty(value) !== true) {
									
									data[attr] = isForUpdate === true ? TO_DELETE : undefined;
									
									// continue.
									return true;
								}

								// one
								if (name === 'one') {

									if (one({
										array : validParams,
										value : value
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											array : validParams,
											value : value
										};

										// break.
										return false;
									}
								}

								// element
								else if (name === 'element') {

									if (element({
										validData : validParams,
										array : value,
										isToWash : isToWash
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validData : validParams,
											array : value
										};

										// break.
										return false;
									}
								}

								// property
								else if (name === 'property') {

									if (property({
										validData : validParams,
										data : value,
										isToWash : isToWash
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validData : validParams,
											data : value
										};

										// break.
										return false;
									}
								}

								// detail
								else if (name === 'detail') {
									
									let subErrors = {};

									if (detail({
										validDataSet : validParams,
										data : value,
										isToWash : isToWash,
										errors : subErrors
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validDataSet : validParams,
											data : value
										};
										
										EACH(subErrors, (subError, subAttr) => {
											errors[attr + '.' + subAttr] = subError;
										});

										// break.
										return false;
									}
								}

								// need params
								else if (name === 'size') {

									if (cls[name](CHECK_IS_DATA(validParams) === true ? COMBINE([validParams, {
										value : value
									}]) : COMBINE([{
										min : validParams,
										max : validParams
									}, {
										value : value
									}])) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validParams : validParams,
											value : value
										};

										// break.
										return false;
									}
								}

								// regex
								else if (name === 'regex') {

									if (cls[name]({
										pattern : validParams,
										value : value
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validParam : validParams,
											value : value
										};

										// break.
										return false;
									}
								}

								// min
								else if (name === 'min') {

									if (cls[name]({
										min : validParams,
										value : value
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validParam : validParams,
											value : value
										};

										// break.
										return false;
									}
								}

								// max
								else if (name === 'max') {

									if (cls[name]({
										max : validParams,
										value : value
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validParam : validParams,
											value : value
										};

										// break.
										return false;
									}
								}

								// equal
								else if (name === 'equal') {

									if (cls[name]({
										value : value,
										validValue : validParams
									}) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											validParam : validParams,
											value : value
										};

										// break.
										return false;
									}
								}

								// need value
								else if (validParams === true) {

									if (cls[name === 'id' ? 'mongoId' : name](value) === false) {

										hasError = true;
										errors[attr] = {
											type : name,
											value : value
										};

										// break.
										return false;
									}
								}

								if (typeof value === 'string') {
									
									value = value.trim();
									
									if (notEmpty(value) === true) {
										if (name === 'integer') {
											data[attr] = INTEGER(value);
										} else if (name === 'real') {
											data[attr] = REAL(value);
										} else if (name === 'bool') {
											data[attr] = value === 'true';
										} else if (name === 'date') {
											data[attr] = new Date(value);
										} else if (name === 'username') {
											data[attr] = value.toLowerCase();
										} else {
											data[attr] = value;
										}
									}
									
									else {
										data[attr] = value;
									}
								}
							});
						}
					});

					if (isToWash === true) {
						
						EACH(data, (value, attr) => {
							if (validDataSet[attr] === undefined) {
								delete data[attr];
							}
						});
					}

					let checkHasError = self.checkHasError = () => {
						return hasError;
					};

					let getErrors = self.getErrors = () => {
						return errors;
					};
				}
			});

			let check = self.check = (data) => {
				return Check({
					data : data
				});
			};

			let checkAndWash = self.checkAndWash = (data) => {
				return Check({
					data : data,
					isToWash : true
				});
			};

			let checkForUpdate = self.checkForUpdate = (data) => {
				return Check({
					data : data,
					isToWash : true,
					isForUpdate : true
				});
			};
			
			let getValidDataSet = self.getValidDataSet = () => {
				return validDataSet;
			};
		}
	};
});

/*
 * 배열 안의 모든 요소들이 동일한지 확인합니다.
 */
global.CHECK_ARE_SAME = METHOD({

	run : (array) => {
		//REQUIRED: array

		let areSame = false;

		let checkTwoSame = (a, b) => {
			
			if (a === b) {
				return true;
			}

			// when a, b are date
			if ( a instanceof Date === true && b instanceof Date === true) {
				return a.getTime() === b.getTime();
			}
			
			// when a, b are regex
			else if ( a instanceof RegExp === true && b instanceof RegExp === true) {
				return a.toString() === b.toString();
			}

			// when a, b are data (JS object)
			else if (CHECK_IS_DATA(a) === true && CHECK_IS_DATA(b) === true) {
				return EACH(a, (value, name) => {
					return checkTwoSame(value, b[name]);
				});
			}

			// when a, b are array
			else if (CHECK_IS_ARRAY(a) === true && CHECK_IS_ARRAY(b) === true) {
				return a.length === b.length && EACH(a, (value, i) => {
					return checkTwoSame(value, b[i]);
				});
			}

			return false;
		};

		if (array.length > 1) {

			areSame = REPEAT(array.length, (i) => {
				if (i < array.length - 1) {
					return checkTwoSame(array[i], array[i + 1]);
				} else {
					return checkTwoSame(array[i], array[0]);
				}
			});
		}

		return areSame;
	}
});

/*
 * target이 배열인지 확인합니다.
 */
global.CHECK_IS_ARRAY = METHOD({

	run : (target) => {
		//OPTIONAL: target

		if (
		target !== undefined &&
		target !== TO_DELETE &&
		typeof target === 'object' &&
		Object.prototype.toString.call(target) === '[object Array]') {
			return true;
		}

		return false;
	}
});

/*
 * target이 데이터인지 확인합니다.
 */
global.CHECK_IS_DATA = METHOD({

	run : (target) => {
		//OPTIONAL: target

		if (
		target !== undefined &&
		target !== TO_DELETE &&
		CHECK_IS_ARRAY(target) !== true &&
		target instanceof Date !== true &&
		target instanceof RegExp !== true &&
		typeof target === 'object') {
			return true;
		}

		return false;
	}
});

/*
 * 데이터가 아무런 값이 없는 빈 데이터({})인지 확인합니다.
 */
global.CHECK_IS_EMPTY_DATA = METHOD({

	run : (data) => {
		//REQUIRED: data

		return CHECK_ARE_SAME([data, {}]);
	}
});

/*
 * 데이터 내 값들의 개수를 반환합니다.
 */
global.COUNT_PROPERTIES = METHOD({

	run : (data) => {
		//OPTIONAL: data

		let count = 0;
		
		EACH(data, () => {
			count += 1;
		});
		
		return count;
	}
});

/*
 * 주어진 데이터의 값들 중 Date형은 정수형태로, RegExp형은 문자열 형태로 변환한 데이터를 반환합니다.
 */
global.PACK_DATA = METHOD({

	run : (data) => {
		//REQUIRED: data

		let result = COPY(data);
		let dateNames = [];
		let regexNames = [];

		EACH(result, (value, name) => {

			if (value instanceof Date === true) {

				// change to timestamp integer.
				result[name] = INTEGER(value.getTime());
				dateNames.push(name);
			}
			
			else if (value instanceof RegExp === true) {

				// change to string.
				result[name] = value.toString();
				regexNames.push(name);
			}

			else if (CHECK_IS_DATA(value) === true) {
				result[name] = PACK_DATA(value);
			}

			else if (CHECK_IS_ARRAY(value) === true) {

				EACH(value, (v, i) => {

					if (CHECK_IS_DATA(v) === true) {
						value[i] = PACK_DATA(v);
					}
				});
			}
		});

		result.__D = dateNames;
		result.__R = regexNames;

		return result;
	}
});

/*
 * PACK_DATA가 적용된 데이터의 값들 중 정수형태로 변환된 Date형과 문자열 형태로 변환된 RegExp형을 원래대로 되돌린 데이터를 반환합니다.
 */
global.UNPACK_DATA = METHOD({

	run : (packedData) => {
		//REQUIRED: packedData	PACK_DATA가 적용된 데이터

		let result = COPY(packedData);

		// when date property names exists
		if (result.__D !== undefined) {

			// change timestamp integer to Date type.
			EACH(result.__D, (dateName, i) => {
				result[dateName] = new Date(result[dateName]);
			});
			
			delete result.__D;
		}
		
		// when regex property names exists
		if (result.__R !== undefined) {

			// change string to RegExp type.
			EACH(result.__R, (regexName, i) => {
				
				let pattern = result[regexName];
				let flags;
				
				for (let j = pattern.length - 1; j >= 0; j -= 1) {
					if (pattern[j] === '/') {
						flags = pattern.substring(j + 1);
						pattern = pattern.substring(1, j);
						break;
					}
				}
				
				result[regexName] = new RegExp(pattern, flags);
			});
			
			delete result.__R;
		}

		EACH(result, (value, name) => {

			if (CHECK_IS_DATA(value) === true) {
				result[name] = UNPACK_DATA(value);
			}

			else if (CHECK_IS_ARRAY(value) === true) {

				EACH(value, (v, i) => {

					if (CHECK_IS_DATA(v) === true) {
						value[i] = UNPACK_DATA(v);
					}
				});
			}
		});

		return result;
	}
});

/*
 * 특정 값이 데이터나 배열에 존재하는지 확인합니다.
 */
global.CHECK_IS_IN = METHOD({

	run : (params) => {
		//REQUIRED: params
		//OPTIONAL: params.data
		//OPTIONAL: params.array
		//REQUIRED: params.value	존재하는지 확인 할 값

		let data = params.data;
		let array = params.array;
		let value = params.value;

		if (data !== undefined) {
			return EACH(data, (_value, name) => {
				if (CHECK_ARE_SAME([_value, value]) === true) {
					return false;
				}
			}) !== true;
		}

		if (array !== undefined) {
			return EACH(array, (_value, key) => {
				if (CHECK_ARE_SAME([_value, value]) === true) {
					return false;
				}
			}) !== true;
		}
	}
});

/*
 * 데이터들이나 배열들을 하나의 데이터나 배열로 합칩니다.
 */
global.COMBINE = METHOD({

	run : (dataSetOrArrays) => {
		//REQUIRED: dataSetOrArrays

		let result;

		if (dataSetOrArrays.length > 0) {

			let first = dataSetOrArrays[0];

			if (CHECK_IS_DATA(first) === true) {

				result = {};

				EACH(dataSetOrArrays, (data) => {
					EXTEND({
						origin : result,
						extend : data
					});
				});
			}

			else if (CHECK_IS_ARRAY(first) === true) {

				result = [];

				EACH(dataSetOrArrays, (array) => {
					EXTEND({
						origin : result,
						extend : array
					});
				});
			}
		}

		return result;
	}
});

/*
 * 데이터나 배열을 복제합니다.
 */
global.COPY = METHOD({

	run : (dataOrArray) => {
		//REQUIRED: dataOrArray
		
		let copy;
		
		if (CHECK_IS_DATA(dataOrArray) === true) {

			copy = {};

			EXTEND({
				origin : copy,
				extend : dataOrArray
			});
		}

		else if (CHECK_IS_ARRAY(dataOrArray) === true) {

			copy = [];

			EXTEND({
				origin : copy,
				extend : dataOrArray
			});
		}

		return copy;
	}
});

/*
 * 데이터나 배열을 덧붙혀 확장합니다.
 */
global.EXTEND = METHOD({

	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.origin	기존 데이터나 배열
		//REQUIRED: params.extend	덧붙힐 데이터나 배열

		let origin = params.origin;
		let extend = params.extend;

		if (CHECK_IS_DATA(origin) === true) {

			EACH(extend, (value, name) => {
				
				if ( value instanceof Date === true) {
					origin[name] = new Date(value.getTime());
				}
				
				else if ( value instanceof RegExp === true) {
					
					let pattern = value.toString();
					let flags;
					
					for (let i = pattern.length - 1; i >= 0; i -= 1) {
						if (pattern[i] === '/') {
							flags = pattern.substring(i + 1);
							pattern = pattern.substring(1, i);
							break;
						}
					}
					
					origin[name] = new RegExp(pattern, flags);
				}
				
				else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
					origin[name] = COPY(value);
				}
				
				else {
					origin[name] = value;
				}
			});
		}

		else if (CHECK_IS_ARRAY(origin) === true) {

			EACH(extend, (value) => {

				if ( value instanceof Date === true) {
					origin.push(new Date(value.getTime()));
				}
				
				else if ( value instanceof RegExp === true) {
					
					let pattern = value.toString();
					let flags;
					
					for (let i = pattern.length - 1; i >= 0; i -= 1) {
						if (pattern[i] === '/') {
							flags = pattern.substring(i + 1);
							pattern = pattern.substring(1, i);
							break;
						}
					}
					
					origin.push(new RegExp(pattern, flags));
				}
				
				else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
					origin.push(COPY(value));
				}
				
				else {
					origin.push(value);
				}
			});
		}

		return origin;
	}
});

/*
 * 데이터나 배열의 특정 값을 찾아, 데이터인 경우 그 값에 해당하는 이름을, 배열인 경우 그 값에 해당하는 키(index)를 반환합니다.
 */
global.FIND = METHOD({

	run : (dataOrArrayOrParams, filter) => {
		//REQUIRED: dataOrArrayOrParams
		//OPTIONAL: dataOrArrayOrParams.data
		//OPTIONAL: dataOrArrayOrParams.array
		//REQUIRED: dataOrArrayOrParams.value	찾을 값
		//OPTIONAL: filter

		let ret;

		if (filter !== undefined) {

			if (CHECK_IS_DATA(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, (value, name) => {

					// value passed filter.
					if (filter(value, name) === true) {
						ret = value;
						return false;
					}
				});
			}

			else if (CHECK_IS_ARRAY(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, (value, key) => {

					// value passed filter.
					if (filter(value, key) === true) {
						ret = value;
						return false;
					}
				});
			}
		}

		else {

			// init params.
			let data = dataOrArrayOrParams.data;
			let array = dataOrArrayOrParams.array;
			let value = dataOrArrayOrParams.value;

			if (data !== undefined) {

				EACH(data, (_value, name) => {
					if (_value === value) {
						ret = name;
						return false;
					}
				});
			}

			if (array !== undefined) {

				EACH(array, (_value, key) => {
					if (_value === value) {
						ret = key;
						return false;
					}
				});
			}
		}

		return ret;
	}
});

/*
 * 데이터나 배열의 특정 값을 삭제합니다.
 */
global.REMOVE = METHOD({

	run : (dataOrArrayOrParams, filter) => {
		//REQUIRED: dataOrArrayOrParams
		//OPTIONAL: dataOrArrayOrParams.data
		//OPTIONAL: dataOrArrayOrParams.array
		//OPTIONAL: dataOrArrayOrParams.name	데이터에서 삭제할 값의 이름
		//OPTIONAL: dataOrArrayOrParams.key		배열에서 삭제할 값의 키 (index)
		//OPTIONAL: dataOrArrayOrParams.value	삭제할 값, 이 값을 찾아 삭제합니다.
		//OPTIONAL: filter
		
		if (filter !== undefined) {

			if (CHECK_IS_DATA(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, (value, name) => {

					// remove value passed filter.
					if (filter(value, name) === true) {

						REMOVE({
							data : dataOrArrayOrParams,
							name : name
						});
					}
				});
			}

			else if (CHECK_IS_ARRAY(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, (value, key) => {

					// remove value passed filter.
					if (filter(value, key) === true) {

						REMOVE({
							array : dataOrArrayOrParams,
							key : key
						});
					}
				});
			}
		}

		else {

			// init params.
			let data = dataOrArrayOrParams.data;
			let array = dataOrArrayOrParams.array;
			let name = dataOrArrayOrParams.name;
			let key = dataOrArrayOrParams.key;
			let value = dataOrArrayOrParams.value;

			if (name !== undefined) {
				delete data[name];
			}

			if (key !== undefined) {
				array.splice(key, 1);
			}

			if (value !== undefined) {

				if (data !== undefined) {

					EACH(data, (_value, name) => {

						if (CHECK_ARE_SAME([_value, value]) === true) {

							REMOVE({
								data : data,
								name : name
							});
						}
					});
				}

				if (array !== undefined) {

					EACH(array, (_value, key) => {

						if (CHECK_ARE_SAME([_value, value]) === true) {

							REMOVE({
								array : array,
								key : key
							});
						}
					});
				}
			}
		}
	}
});

/*
 * 날짜를 처리할 때 Date형을 좀 더 쓰기 편하도록 개선한 CALENDAR 클래스
 */
global.CALENDAR = CLASS({

	init : (inner, self, date) => {
		//OPTIONAL: date	입력하지 않으면 현재 시각을 기준으로 생성합니다.

		if (date === undefined) {
			date = new Date();
		}

		let getYear = self.getYear = () => {
			return date.getFullYear();
		};

		let getMonth = self.getMonth = (isFormal) => {
			//OPTIONAL: isFormal	true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09
			
			let month = date.getMonth() + 1;
			
			if (isFormal === true) {
				return month < 10 ? '0' + month : '' + month;
			} else {
				return month;
			}
		};

		let getDate = self.getDate = (isFormal) => {
			//OPTIONAL: isFormal	true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09
			
			let d = date.getDate();
			
			if (isFormal === true) {
				return d < 10 ? '0' + d : '' + d;
			} else {
				return d;
			}
		};

		let getDay = self.getDay = () => {
			return date.getDay();
		};

		let getHour = self.getHour = (isFormal) => {
			//OPTIONAL: isFormal	true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09
			
			let hour = date.getHours();
			
			if (isFormal === true) {
				return hour < 10 ? '0' + hour : '' + hour;
			} else {
				return hour;
			}
		};

		let getMinute = self.getMinute = (isFormal) => {
			//OPTIONAL: isFormal	true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09
			
			let minute = date.getMinutes();
			
			if (isFormal === true) {
				return minute < 10 ? '0' + minute : '' + minute;
			} else {
				return minute;
			}
		};

		let getSecond = self.getSecond = (isFormal) => {
			//OPTIONAL: isFormal	true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09
			
			let second = date.getSeconds();
			
			if (isFormal === true) {
				return second < 10 ? '0' + second : '' + second;
			} else {
				return second;
			}
		};
	}
});

/*
 * Date형 값을 생성합니다.
 */
global.CREATE_DATE = METHOD({

	run : (params) => {
		//REQUIRED: params
		//OPTIONAL: params.year		년
		//OPTIONAL: params.month	월
		//OPTIONAL: params.date		일
		//OPTIONAL: params.hour		시
		//OPTIONAL: params.minute	분
		//OPTIONAL: params.second	초
		
		let year = params.year;
		let month = params.month;
		let date = params.date;
		let hour = params.hour;
		let minute = params.minute;
		let second = params.second;
		
		let nowCal = CALENDAR(new Date());
		
		if (year === undefined) {
			year = nowCal.getYear();
		}
		
		if (month === undefined) {
			month = date === undefined ? 0 : nowCal.getMonth();
		}
		
		if (date === undefined) {
			date = hour === undefined ? 0 : nowCal.getDate();
		}
		
		if (hour === undefined) {
			hour = minute === undefined ? 0 : nowCal.getHour();
		}
		
		if (minute === undefined) {
			minute = second === undefined ? 0 : nowCal.getMinute();
		}
		
		if (second === undefined) {
			second = 0;
		}

		return new Date(year, month - 1, date, hour, minute, second);
	}
});

/*
 * 주어진 초가 흐른 뒤에 함수를 실행하는 DELAY 클래스
 */
global.DELAY = CLASS({

	init : (inner, self, seconds, func) => {
		//REQUIRED: seconds
		//OPTIONAL: func

		if (func === undefined) {
			func = seconds;
			seconds = 0;
		}
		
		let milliseconds;
		
		let startTime = Date.now();
		
		let remaining = milliseconds = seconds * 1000;
		
		let timeout;
		
		let resume = self.resume = RAR(() => {
			
			if (timeout === undefined) {
				
				timeout = setTimeout(() => {
					func();
					remove();
				}, remaining);
			}
		});
		
		let pause = self.pause = () => {
			
			remaining = milliseconds - (Date.now() - startTime);
			
			clearTimeout(timeout);
			timeout = undefined;
		};
		
		let remove = self.remove = () => {
			pause();
		};
	}
});

/*
 * 주어진 초 마다 함수를 반복해서 실행하는 INTERVAL 클래스
 */
global.INTERVAL = CLASS({

	init : (inner, self, seconds, func) => {
		//REQUIRED: seconds
		//OPTIONAL: func

		if (func === undefined) {
			func = seconds;
			seconds = 0;
		}

		let milliseconds;
		
		let startTime = Date.now();
		
		let remaining = milliseconds = seconds === 0 ? 1 : seconds * 1000;
		
		let interval;
		
		let count = 0;
		
		let resume = self.resume = RAR(() => {
			
			if (interval === undefined) {
				
				interval = setInterval(() => {
					
					count += 1;
					
					if (func(self, count) === false) {
						remove();
					}
					
					startTime = Date.now();
					
				}, remaining);
			}
		});
		
		let pause = self.pause = () => {
			
			remaining = milliseconds - (Date.now() - startTime);
			
			clearInterval(interval);
			interval = undefined;
		};
		
		let remove = self.remove = () => {
			pause();
		};
	}
});

/*
 * 아주 짧은 시간동안 반복해서 실행하는 로직을 작성할때 사용하는 LOOP 클래스
 */
global.LOOP = CLASS((cls) => {
	
	let animationInterval;
	
	let infos = [];

	let fire = () => {

		if (animationInterval === undefined) {

			let beforeTime = Date.now() / 1000;

			animationInterval = INTERVAL(() => {

				let time = Date.now() / 1000;
				let deltaTime = time - beforeTime;
				
				if (deltaTime > 0) {

					for (let i = 0; i < infos.length; i += 1) {

						let info = infos[i];

						if (info.fps !== undefined && info.fps > 0) {

							if (info.timeSigma === undefined) {
								info.timeSigma = 0;
							}
							
							info.timeSigma += deltaTime;
							
							let frameSecond = 1 / info.fps;
							
							if (info.timeSigma >= frameSecond) {
								
								info.run(frameSecond);
								
								info.timeSigma -= frameSecond;
							}
						}
						
						else {
							info.run(deltaTime);
						}
					}

					beforeTime = time;
				}
			});
		}
	};
	
	let stop = () => {

		if (infos.length <= 0) {

			animationInterval.remove();
			animationInterval = undefined;
		}
	};

	return {
		
		init : (inner, self, fps, run) => {
			//OPTIONAL: fps
			//REQUIRED: run
			
			if (run === undefined) {
				run = fps;
				fps = undefined;
			}
			
			let info;
			
			let resume = self.resume = RAR(() => {
				
				infos.push(info = {
					fps : fps,
					run : run
				});
				
				fire();
			});
			
			let pause = self.pause = () => {
			
				REMOVE({
					array : infos,
					value : info
				});
				
				stop();
			};
			
			let changeFPS = self.changeFPS = (fps) => {
				//REQUIRED: fps
				
				info.fps = fps;
			};
			
			let clearFPS = self.clearFPS = () => {
				delete info.fps;
			};
			
			let getFPS = self.getFPS = () => {
				return info.fps;
			};
			
			let remove = self.remove = () => {
				pause();
			};
		}
	};
});

/*
 * 비밀번호를 주어진 키를 암호화합니다. 같은 키로 한번 더 수행하면, 복호화됩니다.
 */
global.ENCRYPT = METHOD({

	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.password
		//REQUIRED: params.key

		let password = String(params.password);
		let key = String(params.key);
		
		let result = '';
		
		let keyLength = key.length;
		let keyCount = 0;
		for (let i = 0; i < password.length; i += 1) {
			result += String.fromCharCode(password.charCodeAt(i) ^ key.charCodeAt(keyCount));
			keyCount += 1;
			if (keyCount === keyLength) {
				keyCount = 0;
			}
		}
		
		return result;
	}
});

/*
 * 비밀번호를 주어진 키를 이용하여 HMAC SHA256 알고리즘으로 암호화합니다.
 */
global.SHA256 = METHOD({

	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.password
		//REQUIRED: params.key

		let password = String(params.password);
		let key = String(params.key);
		
		let hash = __SHA256_LIB.hmac.create(key);
		hash.update(password);

		return hash.hex();
	}
});

/*
 * 비밀번호를 주어진 키를 이용하여 HMAC SHA512 알고리즘으로 암호화합니다.
 */
global.SHA512 = METHOD({

	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.password
		//REQUIRED: params.key

		let password = String(params.password);
		let key = String(params.key);
		
		let hash = __SHA512_LIB.hmac.create(key);
		hash.update(password);

		return hash.hex();
	}
});

/*
 * 주어진 함수를 즉시 실행하고, 함수를 반환합니다.
 * 
 * 선언과 동시에 실행되어야 하는 함수를 선언할 때 유용합니다.
 */
global.RAR = METHOD({

	run : (params, func) => {
		//OPTIONAL: params
		//REQUIRED: func

		// if func is undefined, func is params.
		if (func === undefined) {
			func = params;
			params = undefined;
		}

		func(params);

		return func;
	}
});

/*
 * 주어진 함수를 즉시 실행합니다.
 */
global.RUN = METHOD({

	run : (func) => {
		//REQUIRED: func
		
		let f = () => {
			return func(f);
		};

		return f();
	}
});

/*
 * 정수 문자열을 정수 값으로 변환합니다.
 */
global.INTEGER = METHOD({

	run : (integerString) => {
		//OPTIONAL: integerString

		return integerString === undefined ? undefined : parseInt(integerString, 10);
	}
});

/*
 * 임의의 정수를 생성합니다.
 */
global.RANDOM = METHOD({

	run : (limitOrParams) => {
		//REQUIRED: limitOrParams
		//OPTIONAL: limitOrParams.min	생성할 정수 범위 최소값, 이 값 이상인 값만 생성합니다.
		//OPTIONAL: limitOrParams.max	생성할 정수 범위 최대값, 이 값 이하인 값만 생성합니다.
		//OPTIONAL: limitOrParams.limit	생성할 정수 범위 제한값, 이 값 미만인 값만 생성합니다.

		let min;
		let max
		let limit;

		// init limitOrParams.
		if (CHECK_IS_DATA(limitOrParams) !== true) {
			limit = limitOrParams;
		} else {
			min = limitOrParams.min;
			max = limitOrParams.max;
			limit = limitOrParams.limit;
		}

		if (min === undefined) {
			min = 0;
		}

		if (limit !== undefined) {
			max = limit - 1;
		}

		return Math.floor(Math.random() * (max - min + 1) + min);
	}
});

/*
 * 실수 문자열을 실수 값으로 변환합니다.
 */
global.REAL = METHOD({

	run : (realNumberString) => {
		//OPTIONAL: realNumberString

		return realNumberString === undefined ? undefined : parseFloat(realNumberString);
	}
});

/*
 * 데이터나 배열, 문자열의 각 요소를 순서대로 대입하여 주어진 함수를 실행합니다.
 */
global.EACH = METHOD({

	run : (dataOrArrayOrString, func) => {
		//OPTIONAL: dataOrArrayOrString
		//REQUIRED: func
		
		if (dataOrArrayOrString === undefined) {
			return false;
		}

		// when dataOrArrayOrString is data
		else if (CHECK_IS_DATA(dataOrArrayOrString) === true) {

			for (let name in dataOrArrayOrString) {
				if (dataOrArrayOrString.hasOwnProperty === undefined || dataOrArrayOrString.hasOwnProperty(name) === true) {
					if (func(dataOrArrayOrString[name], name) === false) {
						return false;
					}
				}
			}
		}

		// when dataOrArrayOrString is func
		else if (func === undefined) {

			func = dataOrArrayOrString;
			dataOrArrayOrString = undefined;

			return (dataOrArrayOrString) => {
				return EACH(dataOrArrayOrString, func);
			};
		}

		// when dataOrArrayOrString is array or string
		else {

			let length = dataOrArrayOrString.length;

			for (let i = 0; i < length; i += 1) {

				if (func(dataOrArrayOrString[i], i) === false) {
					return false;
				}

				// when shrink
				if (dataOrArrayOrString.length < length) {
					i -= length - dataOrArrayOrString.length;
					length -= length - dataOrArrayOrString.length;
				}

				// when stretch
				else if (dataOrArrayOrString.length > length) {
					length += dataOrArrayOrString.length - length;
				}
			}
		}

		return true;
	}
});

/*
 * 주어진 함수를 주어진 횟수만큼 반복해서 실행합니다.
 */
global.REPEAT = METHOD({

	run : (countOrParams, func) => {
		//OPTIONAL: countOrParams
		//REQUIRED: countOrParams.start
		//OPTIONAL: countOrParams.end
		//OPTIONAL: countOrParams.limit
		//OPTIONAL: countOrParams.step
		//REQUIRED: func

		let count;
		let start;
		let end;
		let limit;
		let step;
		
		if (func === undefined) {
			func = countOrParams;
			countOrParams = undefined;
		}

		if (countOrParams !== undefined) {
			if (CHECK_IS_DATA(countOrParams) !== true) {
				count = countOrParams;
			} else {
				start = countOrParams.start;
				end = countOrParams.end;
				limit = countOrParams.limit;
				step = countOrParams.step;
			}
		}

		if (limit === undefined && end !== undefined) {
			limit = end + 1;
		}

		if (step === undefined) {
			step = 1;
		}

		// count mode
		if (count !== undefined) {

			for (let i = 0; i < parseInt(count, 10); i += 1) {
				if (func(i) === false) {
					return false;
				}
			}
		}

		// end mode
		else if (end !== undefined && start > end) {

			for (let i = start; i >= end; i -= step) {
				if (func(i) === false) {
					return false;
				}
			}

		}

		// limit mode
		else if (limit !== undefined) {

			for (let i = start; i < limit; i += step) {
				if (func(i) === false) {
					return false;
				}
			}
		}
		
		// func mode
		else {
			
			return (countOrParams) => {
				return REPEAT(countOrParams, func);
			};
		}

		return true;
	}
});

/*
 * 데이터나 배열, 문자열의 각 요소를 역순으로 대입하여 주어진 함수를 실행합니다.
 */
global.REVERSE_EACH = METHOD({

	run : (dataOrArrayOrString, func) => {
		//OPTIONAL: dataOrArrayOrString
		//REQUIRED: func
		
		if (dataOrArrayOrString === undefined) {
			return false;
		}

		// when dataOrArrayOrString is data
		else if (CHECK_IS_DATA(dataOrArrayOrString) === true) {
			
			let reverseNames = [];

			for (let name in dataOrArrayOrString) {
				reverseNames.push(name);
			}
			
			let length = reverseNames.length;

			for (let i = length - 1; i >= 0; i -= 1) {
				let name = reverseNames[i];
				
				if (dataOrArrayOrString.hasOwnProperty === undefined || dataOrArrayOrString.hasOwnProperty(name) === true) {
					if (func(dataOrArrayOrString[name], name) === false) {
						return false;
					}
				}
			}
		}

		// when dataOrArrayOrString is func
		else if (func === undefined) {

			func = dataOrArrayOrString;
			dataOrArrayOrString = undefined;

			return (dataOrArrayOrString) => {
				return REVERSE_EACH(dataOrArrayOrString, func);
			};
		}

		// when dataOrArrayOrString is array or string
		else {

			let length = dataOrArrayOrString.length;

			for (let i = length - 1; i >= 0; i -= 1) {

				if (func(dataOrArrayOrString[i], i) === false) {
					return false;
				}
				
				// when shrink
				if (dataOrArrayOrString.length < length) {
					i += length - dataOrArrayOrString.length;
				}
			}
		}

		return true;
	}
});

/*
 * 웹 폰트를 사용할 수 있도록 불러옵니다.
 */
global.ADD_FONT = METHOD({

	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.name
		//OPTIONAL: params.style
		//OPTIONAL: params.weight
		//OPTIONAL: params.woff2
		//OPTIONAL: params.woff
		//OPTIONAL: params.otf
		//OPTIONAL: params.ttf
		
		let name = params.name;
		let style = params.style;
		let weight = params.weight;
		let woff2 = params.woff2;
		let woff = params.woff;
		let otf = params.otf;
		let ttf = params.ttf;
		
		let src = '';
		if (woff2 !== undefined) {
			src += 'url(' + woff2 + ') format(\'woff2\'),';
		}
		if (woff !== undefined) {
			src += 'url(' + woff + ') format(\'woff\'),';
		}
		if (otf !== undefined) {
			src += 'url(' + otf + ') format(\'opentype\'),';
		}
		if (ttf !== undefined) {
			src += 'url(' + ttf + ') format(\'truetype\'),';
		}
		
		let content = '@font-face {';
		content += 'font-family:' + name + ';';
		
		if (style !== undefined) {
			content += 'font-style:' + style + ';';
		}
		if (weight !== undefined) {
			content += 'font-weight:' + weight + ';';
		}
		
		content += 'src:' + src.substring(0, src.length - 1) + ';';
		content += '}';
		
		// create font style element.
		let fontStyleEl = document.createElement('style');
		fontStyleEl.type = 'text/css';
		fontStyleEl.appendChild(document.createTextNode(content));
		document.getElementsByTagName('head')[0].appendChild(fontStyleEl);
	}
});

OVERRIDE(BOX, (origin) => {
	
	/*
	 * BOX를 생성합니다.
	 */
	global.BOX = METHOD((m) => {
		
		m.getAllBoxes = origin.getAllBoxes;
		
		return {
			
			run : (boxName) => {
				//REQUIRED: boxName
				
				if (BROWSER_CONFIG[boxName] === undefined) {
					BROWSER_CONFIG[boxName] = {};
				}
				
				return origin(boxName);
			}
		};
	});
});

/*
 * 웹 브라우저 환경에서의 기본 설정
 */
global.BROWSER_CONFIG = {
	
	isSecure : location.protocol === 'https:',
	
	host : location.hostname,
	
	port : location.port === '' ? (location.protocol === 'https:' ? 443 : 80) : INTEGER(location.port)
};

/*
 * WEB_SOCKET_SERVER로 생성한 웹소켓 서버에 연결합니다.
 */
global.CONNECT_TO_WEB_SOCKET_SERVER = METHOD({

	run : (portOrParams, connectionListenerOrListeners) => {
		//OPTIONAL: portOrParams
		//OPTIONAL: portOrParams.isSecure
		//OPTIONAL: portOrParams.host
		//OPTIONAL: portOrParams.port
		//REQUIRED: connectionListenerOrListeners
		//REQUIRED: connectionListenerOrListeners.success
		//OPTIONAL: connectionListenerOrListeners.error

		let isSecure;
		let host;
		let port;

		let connectionListener;
		let errorListener;
		
		let isConnected;

		let methodMap = {};
		let sendKey = 0;
		
		let on;
		let off;
		let send;
		
		if (connectionListenerOrListeners === undefined) {
			connectionListenerOrListeners = portOrParams;
			portOrParams = undefined;
		}

		if (CHECK_IS_DATA(portOrParams) !== true) {
			port = portOrParams;
		} else {
			isSecure = portOrParams.isSecure;
			host = portOrParams.host;
			port = portOrParams.port;
		}
		
		if (isSecure === undefined) {
			isSecure = BROWSER_CONFIG.isSecure;
		}
		
		if (host === undefined) {
			host = BROWSER_CONFIG.host;
		}
		
		if (port === undefined) {
			port = BROWSER_CONFIG.port;
		}

		if (CHECK_IS_DATA(connectionListenerOrListeners) !== true) {
			connectionListener = connectionListenerOrListeners;
		} else {
			connectionListener = connectionListenerOrListeners.success;
			errorListener = connectionListenerOrListeners.error;
		}

		let runMethods = (methodName, data, sendKey) => {

			let methods = methodMap[methodName];

			if (methods !== undefined) {

				EACH(methods, (method) => {

					// run method.
					method(data,

					// ret.
					(retData) => {

						if (send !== undefined && sendKey !== undefined) {

							send({
								methodName : '__CALLBACK_' + sendKey,
								data : retData
							});
						}
					});
				});
			}
		};

		let conn = new WebSocket((isSecure === true ? 'wss://': 'ws://') + host + ':' + port);

		conn.onopen = () => {

			isConnected = true;

			connectionListener(

			// on.
			on = (methodName, method) => {
				//REQUIRED: methodName
				//REQUIRED: method

				let methods = methodMap[methodName];

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);
			},

			// off.
			off = (methodName, method) => {
				//REQUIRED: methodName
				//OPTIONAL: method

				let methods = methodMap[methodName];

				if (methods !== undefined) {

					if (method !== undefined) {

						REMOVE({
							array : methods,
							value : method
						});

					} else {
						delete methodMap[methodName];
					}
				}
			},

			// send to server.
			send = (methodNameOrParams, callback) => {
				//REQUIRED: methodNameOrParams
				//REQUIRED: methodNameOrParams.methodName
				//OPTIONAL: methodNameOrParams.data
				//OPTIONAL: callback
				
				let methodName;
				let data;
				let callbackName;
				
				if (CHECK_IS_DATA(methodNameOrParams) !== true) {
					methodName = methodNameOrParams;
				} else {
					methodName = methodNameOrParams.methodName;
					data = methodNameOrParams.data;
				}
				
				if (conn !== undefined) {
					
					conn.send(STRINGIFY({
						methodName : methodName,
						data : data,
						sendKey : sendKey
					}));
	
					if (callback !== undefined) {
						
						callbackName = '__CALLBACK_' + sendKey;
	
						// on callback.
						on(callbackName, (data) => {
	
							// run callback.
							callback(data);
	
							// off callback.
							off(callbackName);
						});
					}
	
					sendKey += 1;
				}
			},

			// disconnect.
			() => {
				if (conn !== undefined) {
					conn.close();
					conn = undefined;
				}
			});
		};

		// receive data.
		conn.onmessage = (e) => {

			let params = PARSE_STR(e.data);

			if (params !== undefined) {
				runMethods(params.methodName, params.data, params.sendKey);
			}
		};

		// when disconnected
		conn.onclose = () => {
			runMethods('__DISCONNECTED');
		};

		// when error
		conn.onerror = (error) => {

			let errorMsg = error.toString();

			if (isConnected !== true) {

				if (errorListener !== undefined) {
					errorListener(errorMsg);
				} else {
					SHOW_ERROR('CONNECT_TO_WEB_SOCKET_SERVER', errorMsg);
				}

			} else {
				runMethods('__ERROR', errorMsg);
			}
		};
	}
});

/*
 * 쿠키 저장소 클래스
 * 
 * 쿠키에 데이터를 저장할 수 있는 클래스 입니다.
 * domain 파라미터를 통해 쿠키를 불러 올 수 있는 도메인 범위를 지정할 수 있습니다.
 * 웹 브라우저가 종료되어도 저장된 값들이 보존됩니다.
 */
global.COOKIE_STORE = CLASS({

	init : (inner, self, storeNameOrParams) => {
		//REQUIRED: storeNameOrParams
		//REQUIRED: storeNameOrParams.storeName
		//OPTIONAL: storeNameOrParams.domain

		let storeName;
		let domain;
		
		if (CHECK_IS_DATA(storeNameOrParams) !== true) {
			storeName = storeNameOrParams;
		} else {
			storeName = storeNameOrParams.storeName;
			domain = storeNameOrParams.domain;
		}

		let genFullName = inner.genFullName = (name) => {
			//REQUIRED: name

			return storeName + '.' + name;
		};

		let save = self.save = (params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value
			//OPTIONAL: params.isToSession
			//OPTIONAL: params.expireTime

			let name = params.name;
			let value = params.value;
			let isToSession = params.isToSession;
			let expireTime = params.expireTime;
			
			if (isToSession === true) {
				expireTime = 0;
			} else if (expireTime === undefined) {
				// set expire time 1 year
				expireTime = new Date();
				expireTime.setDate(expireTime.getDate() + 356);
			}

			document.cookie = genFullName(name) + '=' + encodeURIComponent(JSON.stringify(value)) + '; expires=' + (expireTime === 0 ? expireTime : expireTime.toGMTString()) + '; path=/;' + (domain === undefined ? '' : ' domain=' + domain + ';');
		};

		let get = self.get = (name) => {
			//REQUIRED: name

			name = genFullName(name) + '=';

			let cookie = document.cookie;
			let i = cookie.indexOf(name);

			let pop;
			if (cookie && i >= 0) {
				let temp = cookie.substring(i, cookie.length);
				let d = temp.indexOf(';');
				if (d > 0) {
					pop = temp.substring(name.length, d);
				} else {
					pop = temp.substring(name.length);
				}
			}
			
			return pop === undefined ? undefined : JSON.parse(decodeURIComponent(pop));
		};
		
		let remove = self.remove = (name) => {
			//REQUIRED: name

			let expireTime = new Date();
			expireTime.setDate(expireTime.getDate() - 1);
			
			document.cookie = genFullName(name) + '=; expires=' + expireTime.toGMTString() + '; path=/;' + (domain === undefined ? '' : ' domain=' + domain + ';');
		};
		
		let all = self.all = () => {
			
			let all = {};
			
			EACH(document.cookie.split(';'), (str) => {
				
				let index = str.indexOf('=');
				let fullName = str.substring(0, index);
				
				if (fullName.indexOf(storeName + '.') === 0) {
					
					all[fullName.substring(storeName.length + 1)] = str.substring(index + 1);
				}
			});
			
			return all;
		};

		let count = self.count = () => {
			
			let count = 0;
			
			EACH(document.cookie.split(';'), (str) => {
				
				let index = str.indexOf('=');
				let fullName = str.substring(0, index);
				
				if (fullName.indexOf(storeName + '.') === 0) {
					count += 1;
				}
			});
			
			return count;
		};

		let clear = self.clear = () => {
			
			EACH(document.cookie.split(';'), (str) => {
				
				let index = str.indexOf('=');
				let fullName = str.substring(0, index);
				
				if (fullName.indexOf(storeName + '.') === 0) {
					
					remove(fullName.substring(storeName.length + 1));
				}
			});
		};
	}
});

FOR_BOX((box) => {

	box.COOKIE_STORE = CLASS({

		init : (inner, self, storeNameOrParams) => {
			//REQUIRED: storeNameOrParams
			//REQUIRED: storeNameOrParams.storeName
			//OPTIONAL: storeNameOrParams.domain

			let storeName;
			let domain;
			
			if (CHECK_IS_DATA(storeNameOrParams) !== true) {
				storeName = storeNameOrParams;
			} else {
				storeName = storeNameOrParams.storeName;
				domain = storeNameOrParams.domain;
			}
			
			let store = COOKIE_STORE({
				storeName : box.boxName + '.' + storeName,
				domain : domain
			});

			let save = self.save = store.save;
			
			let get = self.get = store.get;
			
			let remove = self.remove = store.remove;
			
			let all = self.all = store.all;
			
			let count = self.count = store.count;
			
			let clear = self.clear = store.clear;
		}
	});
});
/*
 * 웹 브라우저 정보를 담고 있는 객체
 */
global.INFO = OBJECT({

	init : (inner, self) => {

		let isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		
		if (isTouchDevice === undefined) {
			isTouchDevice = false;
		}

		let getLang = self.getLang = () => {

			let lang = STORE('__INFO').get('lang');

			if (lang === undefined) {
				lang = navigator.language;
			}
			
			if (lang.indexOf('-') !== -1 && lang !== 'zh-TW' && lang !== 'zh-CN') {
				lang = lang.substring(0, lang.indexOf('-'));
			}

			return lang;
		};

		let setLang = self.setLang = (lang) => {
			//REQUIRED: lang

			STORE('__INFO').save({
				name : 'lang',
				value : lang
			});
		};

		let changeLang = self.changeLang = (lang) => {
			//REQUIRED: lang

			setLang(lang);

			REFRESH();
		};

		let checkIsTouchDevice = self.checkIsTouchDevice = () => {
			return isTouchDevice;
		};

		let getOSName = self.getOSName = () => {
			// using bowser. (https://github.com/ded/bowser)
			return bowser.osname;
		};

		let getBrowserName = self.getBrowserName = () => {
			// using bowser. (https://github.com/ded/bowser)
			return bowser.name;
		};

		let getBrowserVersion = self.getBrowserVersion = () => {
			// using bowser. (https://github.com/ded/bowser)
			return REAL(bowser.version);
		};
	}
});
OVERRIDE(LOOP, (origin) => {
	
	/*
	 * 아주 짧은 시간동안 반복해서 실행하는 로직을 작성할때 사용하는 LOOP 클래스
	 */
	global.LOOP = CLASS((cls) => {
		
		let animationInterval;
		
		let infos = [];
		
		let fire = () => {
			
			if (animationInterval === undefined) {
	
				let beforeTime = performance.now() / 1000;
				
				let step;
				animationInterval = requestAnimationFrame(step = (now) => {
					
					let time = now / 1000;
					let deltaTime = time - beforeTime;
					
					if (deltaTime > 0) {
	
						for (let i = 0; i < infos.length; i += 1) {
	
							let info = infos[i];
	
							if (info.fps !== undefined && info.fps > 0) {
	
								if (info.timeSigma === undefined) {
									info.timeSigma = 0;
								}
								
								info.timeSigma += deltaTime;
								
								let frameSecond = 1 / info.fps;
								
								if (info.timeSigma >= frameSecond) {
									
									info.run(frameSecond);
									
									info.timeSigma -= frameSecond;
								}
							}
							
							else {
								info.run(deltaTime);
							}
						}
	
						beforeTime = time;
					}
					
					animationInterval = requestAnimationFrame(step);
				});
			}
		};
		
		let stop = () => {
			
			if (infos.length <= 0) {
	
				cancelAnimationFrame(animationInterval);
				animationInterval = undefined;
			}
		};
	
		return {
			
			init : (inner, self, fps, run) => {
				//OPTIONAL: fps
				//REQUIRED: run
				
				if (run === undefined) {
					run = fps;
					fps = undefined;
				}
				
				let info;
				
				let resume = self.resume = RAR(() => {
					
					infos.push(info = {
						fps : fps,
						run : run
					});
					
					fire();
				});
				
				let pause = self.pause = () => {
				
					REMOVE({
						array : infos,
						value : info
					});
					
					stop();
				};
				
				let changeFPS = self.changeFPS = (fps) => {
					//REQUIRED: fps
					
					info.fps = fps;
				};
				
				let clearFPS = self.clearFPS = () => {
					delete info.fps;
				};
				
				let getFPS = self.getFPS = () => {
					return info.fps;
				};
				
				let remove = self.remove = () => {
					pause();
				};
			}
		};
	});
});

/*
 * INFO의 웹 애플리케이션 언어 설정 코드에 해당하는 문자열을 반환합니다.
 * 
 * 만약 알 수 없는 언어 설정 코드라면, 영어가 있는 경우에는 영어를, 아니라면 첫번째 문자열을 반환합니다.
 */
OVERRIDE(MSG, (origin) => {
	
	global.MSG = METHOD((m) => {
		
		let msgData = {};
		
		let addData = m.addData = (data) => {
			//REQUIRED: data
			
			EXTEND({
				origin : msgData,
				extend : data
			});
		};
		
		let loadCSV = m.loadCSV = (url, callback) => {
			//REQUIRED: url
			//REQUIRED: callback
			
			if (CHECK_IS_ARRAY(url) === true) {
				
				NEXT(url, [
				(url, next) => {
					loadCSV(url, next);
				},
				
				() => {
					return callback;
				}]);
			}
			
			else {
				
				GET(url, (content) => {
					
					let data = {};
					
					let langs;
					EACH(__PAPA.parse(content).data, (texts, i) => {
						
						// 첫번째 줄은 언어 설정
						if (i === 0) {
							langs = texts;
						}
						
						else {
							let subData = {};
							EACH(texts, (text, j) => {
								if (j > 0 && text !== '') {
									subData[langs[j]] = text.replace(/\\n/, '\n');
								}
							});
							data[texts[0]] = subData;
						}
					});
					
					addData(data);
					
					callback();
				});
			}
		};
		
		return {
			
			run : (keyOrMsgs) => {
				//REQUIRED: keyOrMsgs
				
				let key;
				let msgs;
				
				if (CHECK_IS_DATA(keyOrMsgs) !== true) {
					key = keyOrMsgs;
				} else {
					msgs = keyOrMsgs;
				}
				
				if (key !== undefined) {
					msgs = msgData[key];
				}
				
				if (msgs === undefined) {
					SHOW_ERROR('MSG', key + '에 해당하는 문자열을 찾을 수 없습니다.');
				}
				
				let msg = msgs[INFO.getLang()];
				
				if (msg === undefined) {
					
					let lang;
					let locale;
					
					if (INFO.getLang().length == 2) {
						lang = INFO.getLang().toLowerCase();
					} else {
						lang = INFO.getLang().substring(0, 2).toLowerCase();
						locale = INFO.getLang().substring(3).toLowerCase();
					}
					
					msg = msgs[lang];
					
					if (msg !== undefined) {
						
						if (CHECK_IS_DATA(msg) === true) {
							if (msg[locale] !== undefined) {
								msg = msg[locale];
							} else {
								
								// 못 찾은 경우 첫번째 문자열을 반환
								EACH(msg, (_msg) => {
									msg = _msg;
									return false;
								});
							}
						}
					}
				}
				
				if (msg === undefined) {
					
					// 영어가 있는 경우 영어를, 아닌 경우 첫번째 문자열을 반환
					if (msgs.en !== undefined) {
						msg = msgs.en;
					} else {
						EACH(msgs, (_msg) => {
							msg = _msg;
							return false;
						});
					}
				}
				
				if (msg !== undefined && CHECK_IS_DATA(msg) === true) {
					
					// 못 찾은 경우 첫번째 문자열을 반환
					EACH(msg, (_msg) => {
						msg = _msg;
						return false;
					});
				}
		
				return msg;
			}
		};
	});
});

/*
 * 세션 저장소 클래스
 * 
 * 웹 브라우저가 종료되면 저장된 값들이 삭제됩니다.
 */
global.SESSION_STORE = CLASS({

	init : (inner, self, storeName) => {
		//REQUIRED: storeName
		
		// gen full name.
		let genFullName = (name) => {
			//REQUIRED: name

			return storeName + '.' + name;
		};

		let save = self.save = (params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value

			let name = params.name;
			let value = params.value;

			sessionStorage.setItem(genFullName(name), STRINGIFY(value));
		};

		let get = self.get = (name) => {
			//REQUIRED: name

			let value = PARSE_STR(sessionStorage.getItem(genFullName(name)));

			if (value === TO_DELETE) {
				value = undefined;
			}

			return value;
		};

		let remove = self.remove = (name) => {
			//REQUIRED: name
			
			sessionStorage.removeItem(genFullName(name));
		};

		let all = self.all = () => {
			
			let all = {};
			
			EACH(sessionStorage, (value, fullName) => {
				
				if (fullName.indexOf(storeName + '.') === 0) {
					
					all[fullName.substring(storeName.length + 1)] = PARSE_STR(value);
				}
			});
			
			return all;
		};

		let count = self.count = () => {
			
			let count = 0;
			
			EACH(sessionStorage, (value, fullName) => {
				
				if (fullName.indexOf(storeName + '.') === 0) {
					count += 1;
				}
			});
			
			return count;
		};

		let clear = self.clear = () => {
			
			EACH(sessionStorage, (value, fullName) => {
				
				if (fullName.indexOf(storeName + '.') === 0) {
					
					remove(fullName.substring(storeName.length + 1));
				}
			});
		};
	}
});

FOR_BOX((box) => {

	box.SESSION_STORE = CLASS({

		init : (inner, self, storeName) => {
			//REQUIRED: storeName

			let store = SESSION_STORE(box.boxName + '.' + storeName);

			let save = self.save = store.save;
			
			let get = self.get = store.get;
			
			let remove = self.remove = store.remove;
			
			let all = self.all = store.all;
			
			let count = self.count = store.count;
			
			let clear = self.clear = store.clear;
		}
	});
});

/*
 * 사운드 파일을 재생하는 SOUND 클래스
 */
global.SOUND = CLASS((cls) => {

	let audioContext;
	let isCanPlayOGG = new Audio().canPlayType('audio/ogg') !== '';
	
	let bufferCache = {};
	
	let loadBuffer = (src, callback) => {
		
		if (bufferCache[src] !== undefined) {
			callback(bufferCache[src]);
		}
		
		else {
			
			let request = new XMLHttpRequest();
			request.open('GET', src, true);
			request.responseType = 'arraybuffer';
			
			request.onload = () => {
				
				audioContext.decodeAudioData(request.response, (buffer) => {
					
					bufferCache[src] = buffer;
					
					callback(buffer);
				});
			};
			
			request.send();
		}
	};

	return {

		init : (inner, self, params, onEndHandler) => {
			//REQUIRED: params
			//OPTIONAL: params.ogg
			//OPTIONAL: params.mp3
			//OPTIONAL: params.wav
			//OPTIONAL: params.isLoop
			//OPTIONAL: params.volume
			//OPTIONAL: onEndHandler

			let ogg = params.ogg;
			let mp3 = params.mp3;
			let wav = params.wav;
			let isLoop = params.isLoop;
			let volume = params.volume;
			
			if (volume === undefined) {
				volume = 0.8;
			}
			
			let buffer;
			let source;
			let gainNode;
			
			let isLoaded = false;
			
			let startedAt = 0;
			let pausedAt = 0;
			
			let duration;
			let isPlaying = false;
			
			let delayed;
			
			let fadeInSeconds;
			
			let eventMap = {};
			
			// init audioContext.
			if (audioContext === undefined) {
				audioContext = new AudioContext();
			}
			
			let src;
			if (ogg !== undefined && isCanPlayOGG === true) {
				src = ogg;
			} else if (mp3 !== undefined) {
				src = mp3;
			} else {
				src = wav;
			}
			
			let ready = () => {
				
				loadBuffer(src, (_buffer) => {
					
					if (buffer === undefined) {
						
						gainNode = audioContext.createGain();
	
						buffer = _buffer;
						
						duration = buffer.duration;
						
						gainNode.connect(audioContext.destination);
						
						if (fadeInSeconds === undefined) {
							gainNode.gain.setValueAtTime(volume, 0);
						} else {
							gainNode.gain.setValueAtTime(0, 0);
							gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + fadeInSeconds);
							fadeInSeconds = undefined;
						}
	
						if (delayed !== undefined) {
							delayed();
						}
						
						fireEvent('load');
						off('load');
						
						isLoaded = true;
					}
				});
			};

			let play = self.play = (at) => {
				//OPTIONAL: at
				
				if (isPlaying !== true) {
					
					if (at !== undefined) {
						pausedAt = at;
					}
	
					delayed = () => {
						
						if (isPlaying !== true) {
							
							source = audioContext.createBufferSource();
							source.buffer = buffer;
							source.connect(gainNode);
							source.loop = isLoop;
							
							startedAt = Date.now() / 1000 - pausedAt;
							source.start(0, pausedAt % buffer.duration);
							
							delayed = undefined;
							
							if (isLoop !== true) {
								source.onended = () => {
									stop();
									if (onEndHandler !== undefined) {
										onEndHandler();
									}
								};
							}
							
							isPlaying = true;
						}
					};
	
					if (buffer === undefined) {
						ready();
					} else {
						delayed();
					}
				}

				return self;
			};
			
			let checkIsPlaying = self.checkIsPlaying = () => {
				return isPlaying;
			};
			
			let getStartAt = self.getStartAt = () => {
				return startedAt;
			};
			
			let pause = self.pause = () => {
				
				if (source !== undefined) {
					source.stop(0);
					source.disconnect();
					source = undefined;
					
					pausedAt = Date.now() / 1000 - startedAt;
				}
				
				delayed = undefined;
				
				isPlaying = false;
			};

			let stop = self.stop = () => {
				
				if (source !== undefined) {
					source.stop(0);
					source.disconnect();
					source = undefined;
					
					pausedAt = 0;
				}
				
				if (gainNode !== undefined) {
					gainNode.disconnect();
					gainNode = undefined;
				}
				
				buffer = undefined;
				delayed = undefined;
				
				isPlaying = false;
			};
			
			let setVolume = self.setVolume = (_volume) => {
				//REQUIRED: volume
				
				volume = _volume;
				
				if (gainNode !== undefined) {
					gainNode.gain.setValueAtTime(volume, 0);
				}
			};
			
			let getVolume = self.getVolume = () => {
				return volume;
			};
			
			let setPlaybackRate = self.setPlaybackRate = (playbackRate) => {
				//REQUIRED: playbackRate
				
				if (source !== undefined) {
					source.playbackRate.setValueAtTime(playbackRate, 0);
				}
			};
			
			let fadeIn = self.fadeIn = (seconds) => {
				//REQUIRED: seconds
				
				if (gainNode !== undefined) {
					gainNode.gain.setValueAtTime(0, 0);
					gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + seconds);
				}
				
				else {
					fadeInSeconds = seconds;
				}
				
				play();
			};
			
			let fadeOut = self.fadeOut = (seconds) => {
				//REQUIRED: seconds
				
				if (gainNode !== undefined) {
					gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + seconds);
				}
				
				DELAY(seconds, () => {
					stop();
				});
			};
			
			let getDuration = self.getDuration = () => {
				return duration;
			};
			
			let on = self.on = (eventName, eventHandler) => {
				//REQUIRED: eventName
				//REQUIRED: eventHandler
				
				if (eventMap[eventName] === undefined) {
					eventMap[eventName] = [];
				}
	
				eventMap[eventName].push(eventHandler);
				
				if (eventName === 'load' && isLoaded === true) {
					fireEvent('load');
					off('load');
				}
			};
			
			let checkIsEventExists = self.checkIsEventExists = (eventName) => {
				//REQUIRED: eventName
				
				return eventMap[eventName] !== undefined;
			};
	
			let off = self.off = (eventName, eventHandler) => {
				//REQUIRED: eventName
				//OPTIONAL: eventHandler
	
				if (eventMap[eventName] !== undefined) {
	
					if (eventHandler !== undefined) {
	
						REMOVE({
							array: eventMap[eventName],
							value: eventHandler
						});
					}
	
					if (eventHandler === undefined || eventMap[eventName].length === 0) {
						delete eventMap[eventName];
					}
				}
			};
	
			let fireEvent = self.fireEvent = (eventNameOrParams) => {
				//REQUIRED: eventNameOrParams
				//REQUIRED: eventNameOrParams.eventName
				//OPTIONAL: eventNameOrParams.e
				
				let eventName;
				let e;
				
				if (CHECK_IS_DATA(eventNameOrParams) !== true) {
					eventName = eventNameOrParams;
				} else {
					eventName = eventNameOrParams.eventName;
					e = eventNameOrParams.e;
				}
				
				let eventHandlers = eventMap[eventName];
	
				if (eventHandlers !== undefined) {
					
					for (let i = 0; i < eventHandlers.length; i += 1) {
						eventHandlers[i](e === undefined ? EMPTY_E() : e, self);
					}
				}
			};
			
			ready();
		}
	};
});

/*
 * 사운드 파일을 한번 재생하는 SOUND_ONCE 클래스
 */
global.SOUND_ONCE = CLASS({

	preset : () => {
		return SOUND;
	},

	init : (inner, self, params, onEndHandler) => {
		//REQUIRED: params
		//OPTIONAL: params.ogg
		//OPTIONAL: params.mp3
		//OPTIONAL: params.wav
		//OPTIONAL: params.isLoop
		//OPTIONAL: params.volume
		//OPTIONAL: onEndHandler

		self.play();
	}
});

/*
 * 저장소 클래스
 * 
 * 웹 브라우저가 종료되어도 저장된 값들이 보존됩니다.
 */
global.STORE = CLASS({

	init : (inner, self, storeName) => {
		//REQUIRED: storeName
		
		// gen full name.
		let genFullName = (name) => {
			//REQUIRED: name

			return storeName + '.' + name;
		};

		let save = self.save = (params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value

			let name = params.name;
			let value = params.value;

			localStorage.setItem(genFullName(name), STRINGIFY(value));
		};

		let get = self.get = (name) => {
			//REQUIRED: name

			let value = PARSE_STR(localStorage.getItem(genFullName(name)));

			if (value === TO_DELETE) {
				value = undefined;
			}

			return value;
		};

		let remove = self.remove = (name) => {
			//REQUIRED: name
			
			localStorage.removeItem(genFullName(name));
		};

		let all = self.all = () => {
			
			let all = {};
			
			EACH(localStorage, (value, fullName) => {
				
				if (fullName.indexOf(storeName + '.') === 0) {
					
					all[fullName.substring(storeName.length + 1)] = PARSE_STR(value);
				}
			});
			
			return all;
		};

		let count = self.count = () => {
			
			let count = 0;
			
			EACH(localStorage, (value, fullName) => {
				
				if (fullName.indexOf(storeName + '.') === 0) {
					count += 1;
				}
			});
			
			return count;
		};

		let clear = self.clear = () => {
			
			EACH(localStorage, (value, fullName) => {
				
				if (fullName.indexOf(storeName + '.') === 0) {
					
					remove(fullName.substring(storeName.length + 1));
				}
			});
		};
	}
});

FOR_BOX((box) => {

	box.STORE = CLASS({

		init : (inner, self, storeName) => {
			//REQUIRED: storeName

			let store = STORE(box.boxName + '.' + storeName);

			let save = self.save = store.save;
			
			let get = self.get = store.get;
			
			let remove = self.remove = store.remove;
			
			let all = self.all = store.all;
			
			let count = self.count = store.count;
			
			let clear = self.clear = store.clear;
		}
	});
});

/*
 * 웹 워커 클래스
 */
global.WORKER = CLASS({

	init : (inner, self, src) => {
		//REQUIRED: src
		
		let methodMap = {};
		let sendKey = 0;
		
		let worker = new Worker(src);
		
		let runMethods = (methodName, data, sendKey) => {

			let methods = methodMap[methodName];

			if (methods !== undefined) {

				EACH(methods, (method) => {

					// run method.
					method(data,

					// ret.
					(retData) => {

						if (send !== undefined && sendKey !== undefined) {

							send({
								methodName : '__CALLBACK_' + sendKey,
								data : retData
							});
						}
					});
				});
			}
		};
		
		let on = self.on = (methodName, method) => {
			//REQUIRED: methodName
			//REQUIRED: method
			
			let methods = methodMap[methodName];

			if (methods === undefined) {
				methods = methodMap[methodName] = [];
			}

			methods.push(method);
		};
		
		worker.onmessage = (e) => {
			runMethods(e.data.methodName, e.data.data, e.data.sendKey);
		};
		
		let off = self.off = (methodName, method) => {
			//REQUIRED: methodName
			//OPTIONAL: method
			
			let methods = methodMap[methodName];

			if (methods !== undefined) {

				if (method !== undefined) {

					REMOVE({
						array : methods,
						value : method
					});

				} else {
					delete methodMap[methodName];
				}
			}
		};
		
		let send = self.send = (methodNameOrParams, callback) => {
			//REQUIRED: methodNameOrParams
			//REQUIRED: methodNameOrParams.methodName
			//OPTIONAL: methodNameOrParams.data
			//OPTIONAL: callback
			
			let methodName;
			let data;
			
			if (CHECK_IS_DATA(methodNameOrParams) !== true) {
				methodName = methodNameOrParams;
			} else {
				methodName = methodNameOrParams.methodName;
				data = methodNameOrParams.data;
			}
			
			worker.postMessage({
				methodName : methodName,
				data : data,
				sendKey : sendKey
			});
			
			if (callback !== undefined) {
				
				let callbackName = '__CALLBACK_' + sendKey;

				// on callback.
				on(callbackName, (data) => {

					// run callback.
					callback(data);

					// off callback.
					off(callbackName);
				});
			}

			sendKey += 1;
		};
		
		let remove = self.remove = () => {
			worker.terminate();
			worker = undefined;
		};
	}
});
FOR_BOX((box) => {

	box.SHOW_ERROR = METHOD({

		run : (tag, errorMsg, params) => {
			//REQUIRED: tag
			//REQUIRED: errorMsg
			//OPTIONAL: params

			SHOW_ERROR(box.boxName + '.' + tag, errorMsg, params);
		}
	});
});
FOR_BOX((box) => {

	box.SHOW_WARNING = METHOD({

		run : (tag, warningMsg, params) => {
			//REQUIRED: tag
			//REQUIRED: warningMsg
			//OPTIONAL: params

			SHOW_WARNING(box.boxName + '.' + tag, warningMsg, params);
		}
	});
});
/*
 * 노드에 스타일을 지정합니다.
 */
global.ADD_STYLE = METHOD({
	
	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.node		스타일을 지정할 노드
		//REQUIRED: params.style	스타일 데이터

		let node = params.node;
		let style = params.style;
		
		if (CHECK_IS_ARRAY(style) === true) {
			
			EACH(style, (style) => {
				
				ADD_STYLE({
					node : node,
					style : style
				});
			});
		}
		
		else {
			
			let el = node.getWrapperEl();

			EACH(style, (value, name) => {
				
				if (value !== undefined) {
	
					// on display resize
					if (name === 'onDisplayResize') {
	
						let resizeEvent = EVENT({
							name : 'resize'
						}, RAR(() => {
	
							// when this, value is function.
							ADD_STYLE({
								node : node,
								style : value(WIN_WIDTH(), WIN_HEIGHT())
							});
							
							DELAY(() => {
								ADD_STYLE({
									node : node,
									style : value(WIN_WIDTH(), WIN_HEIGHT())
								});
							});
						}));
	
						// remove resize event when remove node.
						node.on('remove', () => {
							resizeEvent.remove();
						});
	
					} else if (el !== undefined) {
						
						// flt -> float
						if (name === 'flt') {
							el.style.cssFloat = value;
						}
	
						// assume number value is px value.
						else if (typeof value === 'number' && name !== 'zIndex' && name !== 'opacity') {
							el.style[name] = value + 'px';
						}
						
						// set background image. (not need url prefix.)
						else if (name === 'backgroundImage' && value !== 'none') {
							el.style[name] = 'url(' + value + ')';
						}
	
						// set normal style.
						else {
							el.style[name] = value;
						}
					}
				}
			});
		}
	}
});

/*
 * 노드에 애니메이션을 지정합니다.
 */
global.ANIMATE = METHOD((m) => {
	
	let keyframesCount = 0;
	
	return {
		
		run : (params, animationEndHandler) => {
			//REQUIRED: params
			//REQUIRED: params.node				애니메이션을 지정할 노드
			//REQUIRED: params.keyframes		애니메이션 키 프레임
			//OPTIONAL: params.duration			애니메이션 지속 시간 (입력하지 않으면 0.5)
			//OPTIONAL: params.timingFunction	애니메이션 작동 방식, 점점 빨라지거나, 점점 느려지거나, 점점 빨라졌다 끝에서 점점 느려지는 등의 처리 (입력하지 않으면 'ease', 'linear', 'ease', 'ease-in', 'ease-out' 사용 가능)
			//OPTIONAL: params.delay			애니메이션이 발동하기 전 지연 시간 (입력하지 않으면 0)
			//OPTIONAL: params.iterationCount	애니메이션을 몇번 발동시킬지 (입력하지 않으면 1, 계속 애니메이션이 발동되도록 하려면 'infinite' 지정)
			//OPTIONAL: params.direction		애니메이션의 방향 (입력하지 않으면 'normal', 'reverse', 'alternate', 'alternate-reverse' 사용 가능)
			//OPTIONAL: animationEndHandler		애니메이션이 끝날 때 호출될 핸들러
			
			let node = params.node;
			let keyframes = params.keyframes;
			let duration = params.duration === undefined ? 0.5 : params.duration;
			let timingFunction = params.timingFunction === undefined ? 'ease' : params.timingFunction;
			let delay = params.delay === undefined ? 0 : params.delay;
			let iterationCount = params.iterationCount === undefined ? 1 : params.iterationCount;
			let direction = params.direction === undefined ? 'normal' : params.direction;
			
			let keyframesName = '__KEYFRAMES_' + keyframesCount;
			let keyframesStr = '';
			
			let keyframesStartStyle;
			let keyframesFinalStyle;
			
			keyframesCount += 1;
			
			EACH(keyframes, (style, key) => {
				
				keyframesStr += key + '{';
	
				EACH(style, (value, name) => {
	
					if (typeof value === 'number' && name !== 'zIndex' && name !== 'opacity') {
						value = value + 'px';
					}
	
					keyframesStr += name.replace(/([A-Z])/g, '-$1').toLowerCase() + ':' + value + ';';
				});
	
				keyframesStr += '}';
	
				if (key === 'from' || key === '0%') {
					keyframesStartStyle = style;
				} else if (key === 'to' || key === '100%') {
					keyframesFinalStyle = style;
				}
			});
			
			// create keyframes style element.
			let keyframesStyleEl = document.createElement('style');
			keyframesStyleEl.type = 'text/css';
			keyframesStyleEl.appendChild(document.createTextNode('@keyframes ' + keyframesName + '{' + keyframesStr + '}'));
			document.getElementsByTagName('head')[0].appendChild(keyframesStyleEl);
			
			node.addStyle(keyframesStartStyle);
			
			node.addStyle({
				animation : keyframesName + ' ' + duration + 's ' + timingFunction + ' ' + delay + 's ' + iterationCount + ' ' + direction
			});
			
			node.addStyle(keyframesFinalStyle);
	
			if (animationEndHandler !== undefined && iterationCount === 1) {
				
				DELAY(duration, () => {
					if (node.checkIsRemoved() !== true) {
						animationEndHandler(node);
					}
				});
			}
		}
	};
});


/*
 * clear : 'both' 스타일이 지정된 div를 생성합니다.
 */
global.CLEAR_BOTH = CLASS({

	preset : () => {
		return DIV;
	},

	params : () => {
		return {
			style : {
				clear : 'both'
			}
		};
	}
});

/*
 * DOM 객체를 생성하고 다루는 클래스
 */
global.DOM = CLASS({

	preset : () => {
		return NODE;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.tag		생설할 DOM 객체에 해당하는 태그 지정
		//OPTIONAL: params.el		태그를 지정하지 않고 HTML element를 직접 지정
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		//OPTIONAL: params.__TEXT	UPPERCASE가 문자열 DOM 객체를 생성하기 위해 내부적으로 사용하는 파라미터

		let tag = params.tag;
		let el = params.el;
		let id = params.id;
		let cls = params.cls;
		let __TEXT = params.__TEXT;

		// when tag is not undefined
		if (tag !== undefined) {

			if (tag === 'body') {
				el = document.body;
			} else if (tag === '__STRING') {
				el = document.createTextNode(__TEXT);
			} else {
				el = document.createElement(tag);
			}
		}

		// when tag is undefined, el is not undefined
		else if (el !== document.body && el.parentNode !== TO_DELETE) {

			self.setParent(DOM({
				el : el.parentNode
			}));
		}

		let getEl = self.getEl = () => {
			return el;
		};

		let setEl = inner.setEl = (_el) => {
			//REQUIRED: _el

			el = _el;

			inner.setDom(self);
		};

		setEl(el);

		let setAttr = inner.setAttr = (params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value

			let name = params.name;
			let value = params.value;

			el.setAttribute(name, value);
		};
		
		if (id !== undefined) {
			setAttr({
				name : 'id',
				value : id
			});
		}
		
		if (cls !== undefined) {
			setAttr({
				name : 'class',
				value : cls
			});
		}
	}
});

/*
 * DOM 트리 구조를 정의하기 위한 NODE 클래스
 */
global.NODE = CLASS({

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let wrapperDom;
		let contentDom;
		
		let wrapperEl;
		let contentEl;
		
		let waitingAfterNodes;
		let waitingBeforeNodes;
		
		let parentNode;
		let childNodes = [];
		
		let originDisplay;
		let data;
		
		let isRemoved = false;

		let setWrapperDom = inner.setWrapperDom = (dom) => {
			//REQUIRED: dom

			wrapperDom = dom;
			wrapperEl = dom.getEl();

			on('show', () => {

				EACH(childNodes, (childNode) => {

					if (childNode.checkIsShowing() === true) {

						EVENT.fireAll({
							node : childNode,
							name : 'show'
						});

						EVENT.removeAll({
							node : childNode,
							name : 'show'
						});
					}
				});
			});
		};

		let setContentDom = inner.setContentDom = (dom) => {
			//REQUIRED: dom

			contentDom = dom;
			contentEl = dom.getEl();
		};

		let setDom = inner.setDom = (dom) => {
			//REQUIRED: dom

			setWrapperDom(dom);
			setContentDom(dom);
		};

		let getWrapperDom = self.getWrapperDom = () => {
			return wrapperDom;
		};

		let getContentDom = self.getContentDom = () => {
			return contentDom;
		};

		let getWrapperEl = self.getWrapperEl = () => {
			return wrapperEl;
		};

		let getContentEl = self.getContentEl = () => {
			return contentEl;
		};

		let attach = (node, index) => {
			//REQUIRED: node
			//OPTIOANL: index

			setParent(node);

			if (index === undefined) {
				parentNode.getChildren().push(self);
			} else {
				parentNode.getChildren().splice(index, 0, self);
			}
			
			fireEvent('attach');

			if (checkIsShowing() === true) {

				fireEvent('show');

				EVENT.removeAll({
					node : self,
					name : 'show'
				});
			}

			// run after wating after nodes.
			if (waitingAfterNodes !== undefined) {
				EACH(waitingAfterNodes, (node) => {
					after(node);
				});
			}

			// run before wating before nodes.
			if (waitingBeforeNodes !== undefined) {
				EACH(waitingBeforeNodes, (node) => {
					before(node);
				});
			}
			
			parentNode.fireEvent('append');
		};

		let append = self.append = (node) => {
			//REQUIRED: node
			
			// append child.
			if (CHECK_IS_DATA(node) === true) {
				node.appendTo(self);
			}

			// append textarea content.
			else if (self.type === TEXTAREA) {

				append(DOM({
					tag : '__STRING',
					__TEXT : String(node === undefined ? '' : node)
				}));
			}

			// append string.
			else {

				let splits = String(node === undefined ? '' : node).split('\n');

				EACH(splits, (text, i) => {

					append(DOM({
						tag : '__STRING',
						__TEXT : text
					}));

					if (i < splits.length - 1) {
						append(BR());
					}
				});
			}
		};

		let appendTo = self.appendTo = (node) => {
			//REQUIRED: node
			
			let parentEl = node.getContentEl();

			if (parentEl !== undefined) {
				
				parentEl.appendChild(wrapperEl);

				attach(node);
			}

			return self;
		};

		let prepend = self.prepend = (node) => {
			//REQUIRED: node

			// prepend child.
			if (CHECK_IS_DATA(node) === true) {
				node.prependTo(self);
			}

			// prepend textarea content.
			else if (self.type === TEXTAREA) {

				prepend(DOM({
					tag : '__STRING',
					__TEXT : String(node === undefined ? '' : node)
				}));
			}

			// prepend string.
			else {

				let splits = String(node === undefined ? '' : node).split('\n');

				REPEAT({
					start : splits.length - 1,
					end : 0
				}, (i) => {

					prepend(DOM({
						tag : '__STRING',
						__TEXT : splits[i]
					}));

					if (i < splits.length - 1) {
						prepend(BR());
					}
				});
			}
		};

		let prependTo = self.prependTo = (node) => {
			//REQUIRED: node

			let parentEl = node.getContentEl();

			if (parentEl !== undefined) {
				
				if (parentEl.childNodes[0] === undefined) {
					parentEl.appendChild(wrapperEl);
				} else {
					parentEl.insertBefore(wrapperEl, parentEl.childNodes[0]);
				}

				attach(node, 0);
			}

			return self;
		};

		let after = self.after = (node) => {
			//REQUIRED: node

			if (wrapperEl !== undefined) {
	
				// wait after node.
				if (wrapperEl.parentNode === TO_DELETE) {
	
					if (waitingAfterNodes === undefined) {
						waitingAfterNodes = [];
					}
	
					waitingAfterNodes.push(node);
				}
	
				// after node.
				else {
	
					// after child.
					if (CHECK_IS_DATA(node) === true) {
						node.insertAfter(self);
					}
	
					// after string.
					else {
	
						let splits = String(node === undefined ? '' : node).split('\n');
	
						REPEAT({
							start : splits.length - 1,
							end : 0
						}, (i) => {
	
							after(DOM({
								tag : '__STRING',
								__TEXT : splits[i]
							}));
	
							if (i < splits.length - 1) {
								after(BR());
							}
						});
					}
				}
			}
		};

		let insertAfter = self.insertAfter = (node) => {
			//REQUIRED: node

			let beforeEl = node.getWrapperEl();
			
			if (beforeEl !== undefined) {
				
				beforeEl.parentNode.insertBefore(wrapperEl, beforeEl.nextSibling);
				
				let nowIndex = FIND({
					array : node.getParent().getChildren(),
					value : self
				});
				
				let toIndex = FIND({
					array : node.getParent().getChildren(),
					value : node
				}) + 1;

				attach(node.getParent(), nowIndex < toIndex ? toIndex - 1 : toIndex);
			}

			return self;
		};

		let before = self.before = (node) => {
			//REQUIRED: node
			
			if (wrapperEl !== undefined) {
	
				// wait before node.
				if (wrapperEl.parentNode === TO_DELETE) {
	
					if (waitingBeforeNodes === undefined) {
						waitingBeforeNodes = [];
					}
	
					waitingBeforeNodes.push(node);
				}
	
				// before node.
				else {
	
					// before child.
					if (CHECK_IS_DATA(node) === true) {
						node.insertBefore(self);
					}
	
					// before string.
					else {
	
						let splits = String(node === undefined ? '' : node).split('\n');
	
						EACH(splits, (text, i) => {
	
							before(DOM({
								tag : '__STRING',
								__TEXT : text
							}));
	
							if (i < splits.length - 1) {
								before(BR());
							}
						});
					}
				}
			}
		};

		let insertBefore = self.insertBefore = (node) => {
			//REQUIRED: node

			let afterEl = node.getWrapperEl();

			if (afterEl !== undefined) {
				
				afterEl.parentNode.insertBefore(wrapperEl, afterEl);

				attach(node.getParent(), FIND({
					array : node.getParent().getChildren(),
					value : node
				}));
			}

			return self;
		};

		let getChildren = self.getChildren = () => {
			return childNodes;
		};

		let setParent = self.setParent = (node) => {
			//OPTIONAL: node
			
			if (parentNode !== undefined) {
				REMOVE({
					array : parentNode.getChildren(),
					value : self
				});
			}

			parentNode = node;
		};
		
		let getParent = self.getParent = () => {
			return parentNode;
		};

		let empty = self.empty = () => {
			EACH(childNodes, (child) => {
				child.remove();
			});
		};

		let remove = self.remove = () => {

			if (wrapperEl !== undefined && wrapperEl.parentNode !== TO_DELETE) {

				fireEvent('beforeRemove');

				// empty children.
				empty();
				
				wrapperDom.empty();

				// remove from parent node.
				wrapperEl.parentNode.removeChild(wrapperEl);

				setParent(undefined);

				fireEvent('remove');
			}
			
			if (wrapperEl !== undefined) {
				wrapperEl.remove();
			}
			if (contentEl !== undefined) {
				contentEl.remove();
			}

			// free memory.
			wrapperEl = undefined;
			contentEl = undefined;

			EVENT.removeAll({
				node : self
			});

			EVENT.removeAll({
				node : wrapperDom
			});
			
			// free memory.
			data = undefined;
			
			isRemoved = true;
		};
		
		let checkIsRemoved = self.checkIsRemoved = () => {
			return isRemoved;
		};

		let on = self.on = (eventName, eventHandler) => {
			//REQUIRED: eventName
			//REQUIRED: eventHandler
			
			EVENT({
				node : self,
				name : eventName
			}, eventHandler);
		};

		let off = self.off = (eventName, eventHandler) => {
			//REQUIRED: eventName
			//OPTIONAL: eventHandler

			if (eventHandler !== undefined) {

				EVENT.remove({
					node : self,
					name : eventName
				}, eventHandler);

			} else {

				EVENT.removeAll({
					node : self,
					name : eventName
				});
			}
		};
		
		let fireEvent = self.fireEvent = (nameOrParams) => {
			//REQUIRED: nameOrParams
			//REQUIRED: nameOrParams.name	이벤트 이름
			//OPTIONAL: nameOrParams.e
			
			let name;
			let e;
			
			// init params.
			if (CHECK_IS_DATA(nameOrParams) !== true) {
				name = nameOrParams;
			} else {
				name = nameOrParams.name;
				e = nameOrParams.e;
			}
			
			return EVENT.fireAll({
				node : self,
				name : name,
				e : e
			});
		};

		let addStyle = self.addStyle = (style) => {
			//REQUIRED: style

			ADD_STYLE({
				node : self,
				style : style
			});
		};

		let getStyle = self.getStyle = (name) => {
			//REQUIRED: name
			
			if (wrapperEl !== undefined) {

				let styles = wrapperEl.style;

				if (styles !== undefined) {

					let style = styles[name];

					return style === '' ? undefined : (style.substring(style.length - 2) === 'px' ? REAL(style) : style);
				}
			}
		};

		let getWidth = self.getWidth = () => {
			return wrapperEl === undefined ? 0 : wrapperEl.offsetWidth;
		};

		let getInnerWidth = self.getInnerWidth = () => {
			return wrapperEl === undefined ? 0 : wrapperEl.clientWidth;
		};

		let getHeight = self.getHeight = () => {
			return wrapperEl === undefined ? 0 : wrapperEl.offsetHeight;
		};

		let getInnerHeight = self.getInnerHeight = () => {
			return wrapperEl === undefined ? 0 : wrapperEl.clientHeight;
		};

		let getLeft = self.getLeft = () => {

			let left = 0;
			
			let parentEl = wrapperEl;

			do {
				left += parentEl.offsetLeft - (parentEl === document.body ? 0 : parentEl.scrollLeft);
				parentEl = parentEl.offsetParent;
			} while (parentEl !== TO_DELETE);

			return left;
		};

		let getTop = self.getTop = () => {

			let top = 0;
			
			let parentEl = wrapperEl;

			do {
				top += parentEl.offsetTop - (parentEl === document.body ? 0 : parentEl.scrollTop);
				parentEl = parentEl.offsetParent;
			} while (parentEl !== TO_DELETE);

			return top;
		};

		let hide = self.hide = () => {
			
			originDisplay = getStyle('display');
			
			if (originDisplay === 'none') {
				originDisplay = undefined;
			}

			addStyle({
				display : 'none'
			});
		};

		let show = self.show = () => {

			addStyle({
				display : originDisplay === undefined ? '' : originDisplay
			});

			if (checkIsShowing() === true) {

				EVENT.fireAll({
					node : self,
					name : 'show'
				});

				EVENT.removeAll({
					node : self,
					name : 'show'
				});
			}
		};

		let checkIsHiding = self.checkIsHiding = () => {
			return checkIsShowing() !== true;
		};

		let checkIsShowing = self.checkIsShowing = () => {

			if (wrapperEl === document.body) {
				return true;
			} else {
				return getStyle('display') !== 'none' && getWidth() > 0;
			}
		};
		
		let scrollTo = self.scrollTo = (params) => {
			//REQUIRED: params
			//OPTIONAL: params.left
			//OPTIONAL: params.top
			
			let left = params.left;
			let top = params.top;
			
			if (contentEl !== undefined) {
			
				if (left !== undefined) {
					contentEl.scrollLeft = left;
				}
				
				if (top !== undefined) {
					contentEl.scrollTop = top;
				}
			}
		};
		
		let getScrollLeft = self.getScrollLeft = () => {
			if (contentEl !== undefined) {
				return contentEl.scrollLeft;
			} else {
				return 0;
			}
		};
		
		let getScrollTop = self.getScrollTop = () => {
			if (contentEl !== undefined) {
				return contentEl.scrollTop;
			} else {
				return 0;
			}
		};
		
		let getScrollWidth = self.getScrollWidth = () => {
			if (contentEl !== undefined) {
				return contentEl.scrollWidth;
			} else {
				return 0;
			}
		};
		
		let getScrollHeight = self.getScrollHeight = () => {
			if (contentEl !== undefined) {
				return contentEl.scrollHeight;
			} else {
				return 0;
			}
		};
		
		let setData = self.setData = (_data) => {
			//REQUIRED: _data
			
			data = _data;
		};
		
		let getData = self.getData = () => {
			return data;
		};
	},

	afterInit : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let style;
		let children;
		let on;

		// init params.
		if (params !== undefined) {
			style = params.style;
			children = params.c === undefined || CHECK_IS_ARRAY(params.c) === true ? params.c : [params.c];
			on = params.on;
		}

		if (style !== undefined) {
			self.addStyle(style);
		}

		if (on !== undefined) {
			EACH(on, (handler, name) => {
				if (handler !== undefined) {
					self.on(name, handler);
				}
			});
		}

		if (children !== undefined) {
			EACH(children, (child, i) => {
				self.append(child);
			});
		}
	}
});

/*
 * 이벤트 정보를 제공하는 객체를 생성하는 E 클래스
 */
global.E = CLASS({

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.e
		//REQUIRED: params.el
		
		let e = params.e;
		let el = params.el;
		
		let isBubblingStoped;

		let checkIsDescendant = (parent, child) => {

			let node = child.parentNode;

			while (node !== TO_DELETE) {

				if (node === parent) {
					return true;
				}

				node = node.parentNode;
			}

			return false;
		};

		let stopDefault = self.stopDefault = () => {
			e.preventDefault();
		};

		let stopBubbling = self.stopBubbling = () => {
			e.stopPropagation();
			isBubblingStoped = true;
		};
		
		let checkIsBubblingStoped = self.checkIsBubblingStoped = () => {
			return isBubblingStoped;
		};

		let stop = self.stop = () => {
			stopDefault();
			stopBubbling();
		};

		let getLeft = self.getLeft = () => {
			
			if (
			INFO.checkIsTouchDevice() === true &&
			e.changedTouches !== undefined &&
			e.changedTouches[0] !== undefined) {
				
				let touchPageX;

				EACH(e.changedTouches, (touch) => {
					if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
						touchPageX = touch.pageX;
						return false;
					}
				});

				if (touchPageX === undefined) {
					touchPageX = e.changedTouches[0].pageX;
				}

				if (touchPageX !== undefined) {
					return touchPageX;
				}
			}

			return e.pageX;
		};

		let getTop = self.getTop = () => {

			if (
			INFO.checkIsTouchDevice() === true &&
			e.changedTouches !== undefined &&
			e.changedTouches[0] !== undefined) {
				
				let touchPageY;

				EACH(e.changedTouches, (touch) => {
					if (touch.target !== undefined && checkIsDescendant(el, touch.target) === true) {
						touchPageY = touch.pageY;
						return false;
					}
				});

				if (touchPageY === undefined) {
					touchPageY = e.changedTouches[0].pageY;
				}

				if (touchPageY !== undefined) {
					return touchPageY;
				}
			}

			return e.pageY;
		};
		
		let getPositions = self.getPositions = () => {
			
			if (
			INFO.checkIsTouchDevice() === true &&
			e.changedTouches !== undefined &&
			e.changedTouches[0] !== undefined) {
				
				let positions = [];
				
				EACH(e.changedTouches, (touch) => {
					positions.push({
						left : touch.pageX,
						top : touch.pageY
					});
				});
				
				return positions;
			}
			
			return [{
				left : e.pageX,
				top : e.pageY
			}];
		};

		let getKey = self.getKey = () => {
			return e.key;
		};

		let getButtonIndex = self.getButtonIndex = () => {
			return e.button;
		};
		
		let getWheelDelta = self.getWheelDelta = () => {
			return e.deltaY * (INFO.getBrowserName() === 'Firefox' ? 33 : 1);
		};
		
		let getGamePadData = self.getGamePadData = () => {
			return e.gamepad;
		};
		
		let getFiles = self.getFiles = () => {
			return e.dataTransfer.files;
		};
		
		let getClipboardItems = self.getClipboardItems = () => {
			return e.clipboardData === undefined || e.clipboardData.items === undefined ? [] : e.clipboardData.items;
		};
	}
});

/*
 * 빈 이벤트 정보를 제공하는 객체를 생성하는 EMPTY_E 클래스
 */
global.EMPTY_E = CLASS({

	init : (inner, self) => {

		let stopDefault = self.stopDefault = () => {
			// ignore.
		};

		let stopBubbling = self.stopBubbling = () => {
			// ignore.
		};

		let stop = self.stop = () => {
			// ignore.
		};

		let getLeft = self.getLeft = () => {
			return -Infinity;
		};

		let getTop = self.getTop = () => {
			return -Infinity;
		};
		
		let getPositions = self.getPositions = () => {
			return [];
		};

		let getKey = self.getKey = () => {
			return '';
		};
		
		let getWheelDelta = self.getWheelDelta = () => {
			return 0;
		};
		
		let getClipboardItems = self.getClipboardItems = () => {
			return [];
		};
	}
});

/*
 * 노드의 이벤트 처리를 담당하는 EVENT 클래스
 */
global.EVENT = CLASS((cls) => {

	let eventMaps = {};
	
	let fireAll = cls.fireAll = (nameOrParams) => {
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node	이벤트가 등록된 노드
		//REQUIRED: nameOrParams.name	이벤트 이름
		//OPTIONAL: nameOrParams.e

		let node;
		let name;
		let e;
		
		let nodeId;
		
		let eventMap;

		let ret;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			name = nameOrParams.name;
			e = nameOrParams.e;
		}

		if (node === undefined) {
			nodeId = 'body';
		} else {
			nodeId = node.id;
		}

		eventMap = eventMaps[nodeId];

		if (eventMap !== undefined) {

			let events = eventMap[name];

			if (events !== undefined) {

				EACH(events, (evt) => {

					if (evt.fire(e) === false) {
						
						ret = false;
					}
				});
			}
		}

		return ret;
	};

	let removeAll = cls.removeAll = (nameOrParams) => {
		//OPTIONAL: nameOrParams
		//OPTIONAL: nameOrParams.node	이벤트가 등록된 노드
		//OPTIONAL: nameOrParams.name	이벤트 이름
		
		let node;
		let name;
		
		let nodeId;
		
		let eventMap;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			name = nameOrParams.name;
		}

		if (node === undefined) {
			nodeId = 'body';
		} else {
			nodeId = node.id;
		}

		eventMap = eventMaps[nodeId];

		if (eventMap !== undefined) {

			if (name !== undefined) {

				let events = eventMap[name];

				if (events !== undefined) {

					EACH(events, (evt) => {
						evt.remove();
					});
				}

			} else {

				EACH(eventMap, (events) => {
					EACH(events, (evt) => {
						evt.remove();
					});
				});
			}
		}
	};

	let remove = cls.remove = (nameOrParams, eventHandler) => {
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node	이벤트가 등록된 노드
		//REQUIRED: nameOrParams.name	이벤트 이름
		//REQUIRED: eventHandler
		
		let node;
		let name;

		let nodeId;
		
		let eventMap;
		
		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			name = nameOrParams.name;
		}

		if (node === undefined) {
			nodeId = 'body';
		} else {
			nodeId = node.id;
		}

		eventMap = eventMaps[nodeId];

		if (eventMap !== undefined) {

			let events = eventMap[name];

			if (events !== undefined) {

				EACH(events, (evt) => {
					if (evt.getEventHandler() === eventHandler) {
						evt.remove();
					}
				});
			}
		}
	};

	return {

		init : (inner, self, nameOrParams, eventHandler) => {
			//REQUIRED: nameOrParams
			//OPTIONAL: nameOrParams.node		이벤트를 등록 및 적용할 노드
			//OPTIONAL: nameOrParams.lowNode	이벤트 '등록'은 node 파라미터에 지정된 노드에 하지만, 실제 이벤트의 동작을 '적용'할 노드는 다른 경우 해당 노드
			//REQUIRED: nameOrParams.name		이벤트 이름
			//REQUIRED: eventHandler
			
			let node;
			let lowNode;
			let name;
			
			let nodeId;
			
			let eventLows = [];
			
			let subEvent;
			
			let lastTapTime;

			// init params.
			if (CHECK_IS_DATA(nameOrParams) !== true) {
				name = nameOrParams;
			} else {
				node = nameOrParams.node;
				lowNode = nameOrParams.lowNode;
				name = nameOrParams.name;

				if (lowNode === undefined) {
					lowNode = node;
				}
			}

			if (node === undefined) {
				nodeId = 'body';
			} else {
				nodeId = node.id;
			}
			
			// push event to map.

			if (eventMaps[nodeId] === undefined) {
				eventMaps[nodeId] = {};
			}

			if (eventMaps[nodeId][name] === undefined) {
				eventMaps[nodeId][name] = [];
			}

			eventMaps[nodeId][name].push(self);

			let removeFromMap = () => {
				
				let events = eventMaps[nodeId][name];
				
				if (events !== undefined) {
					
					REMOVE({
						array : events,
						value : self
					});
	
					if (events.length <= 0) {
						delete eventMaps[nodeId][name];
					}
				}

				if (CHECK_IS_EMPTY_DATA(eventMaps[nodeId]) === true) {
					delete eventMaps[nodeId];
				}
			};

			// tap event (simulate click event.)
			if (name === 'tap') {
				
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'click'
				}, eventHandler));
			}
			
			// when is not touch mode, simulate
			else if (name === 'doubletap') {
				
				if (INFO.checkIsTouchDevice() === true) {
					
					subEvent = EVENT({
						node : node,
						name : 'tap'
					}, (e) => {
	
						if (lastTapTime !== undefined && Date.now() - lastTapTime < 600) {
							
							eventHandler(e, node);
							
							// clear text selections.
							getSelection().removeAllRanges();
							
							lastTapTime = undefined;
						}
						
						else {
							lastTapTime = Date.now();
						}
					});
				}
				
				else {
					eventLows.push(EVENT_LOW({
						node : node,
						lowNode : lowNode,
						name : 'dblclick'
					}, eventHandler));
				}
			}

			// when is not touch mode, touchmove link to mousedown event
			else if (name === 'touchstart') {
				
				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchstart'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() === true) {
						eventHandler(e, node);
					}
				}));
				
				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mousedown'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() !== true) {
						eventHandler(e, node);
					}
				}));
			}

			// when is not touch mode, touchmove link to mousemove event
			else if (name === 'touchmove') {

				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchmove'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() === true) {
						eventHandler(e, node);
					}
				}));
				
				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mousemove'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() !== true) {
						eventHandler(e, node);
					}
				}));
			}

			// when is not touch mode, touchend link to mouseup event
			else if (name === 'touchend') {

				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchend'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() === true) {
						eventHandler(e, node);
					}
				}));
				
				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseup'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() !== true) {
						eventHandler(e, node);
					}
				}));
			}

			// mouseover event (when is touch mode, link to touchstart event.)
			else if (name === 'mouseover') {

				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchstart'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() === true) {
						eventHandler(e, node);
					}
				}));

				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseover'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() !== true) {
						eventHandler(e, node);
					}
				}));
			}
			
			// mouseout event (when is touch mode, link to touchend event.)
			else if (name === 'mouseout') {

				// by touch
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchend'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() === true) {
						eventHandler(e, node);
					}
				}));

				// by mouse
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseout'
				}, (e, node) => {
					if (INFO.checkIsTouchDevice() !== true) {
						eventHandler(e, node);
					}
				}));
			}
			
			else if (name === 'keydown') {
				
				let lastKey;
				
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'keydown'
				}, (e, node) => {
					if (lastKey !== e.getKey()) {
						eventHandler(e, node);
						lastKey = e.getKey();
					}
				}));
				
				eventLows.push(EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'keyup'
				}, (e, node) => {
					lastKey = undefined;
				}));
			}

			// other events
			else if (name !== 'attach' && name !== 'show' && name !== 'remove') {
				eventLows.push(EVENT_LOW(nameOrParams, eventHandler));
			}
			
			let remove = self.remove = () => {

				EACH(eventLows, (eventLow) => {
					eventLow.remove();
				});
					
				if (subEvent !== undefined) {
					subEvent.remove();
				}

				removeFromMap();
			};

			let fire = self.fire = (e) => {
				//OPTIONAL: e

				// pass empty e object.
				return eventHandler(e !== undefined ? e : EMPTY_E(), node);
			};

			let getEventHandler = self.getEventHandler = () => {
				return eventHandler;
			};
		}
	};
});
/*
 * 내부적으로 이벤트를 처리하기 위해 사용되는 EVENT_LOW 클래스
 */
global.EVENT_LOW = CLASS({

	init : (inner, self, nameOrParams, eventHandler) => {
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node		이벤트를 등록 및 적용할 노드
		//OPTIONAL: nameOrParams.lowNode	이벤트 '등록'은 node 파라미터에 지정된 노드에 하지만, 실제 이벤트의 동작을 '적용'할 노드는 다른 경우 해당 노드
		//REQUIRED: nameOrParams.name		이벤트 이름
		//REQUIRED: eventHandler
		
		let node;
		let lowNode;
		let name;
		
		let el;
		
		let innerHandler;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			lowNode = nameOrParams.lowNode;
			name = nameOrParams.name;

			if (lowNode === undefined) {
				lowNode = node;
			}
		}
		
		if (lowNode !== undefined) {
			el = lowNode.getWrapperEl();
		} else if (
			global['on' + name] === undefined &&
			name !== 'gamepadconnected' &&
			name !== 'gamepaddisconnected'
		) {
			el = document;
		} else {
			el = global;
		}
		
		el.addEventListener(name, innerHandler = (e) => {
			
			let result = eventHandler(E({
				e : e,
				el : el
			}), node);
			
			if (name === 'beforeunload' && result !== undefined) {
				e.returnValue = result;
			}

			return result;
			
		}, false);

		let remove = self.remove = () => {
			el.removeEventListener(name, innerHandler, false);
		};
	}
});

/*
 * 이벤트가 한번 발생하면 자동으로 제거되는 EVENT_ONCE 클래스
 */
global.EVENT_ONCE = CLASS({

	init : (inner, self, nameOrParams, eventHandler) => {
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node		이벤트를 등록 및 적용할 노드
		//OPTIONAL: nameOrParams.lowNode	이벤트 '등록'은 node 파라미터에 지정된 노드에 하지만, 실제 이벤트의 동작을 '적용'할 노드는 다른 경우 해당 노드
		//REQUIRED: nameOrParams.name		이벤트 이름
		//REQUIRED: eventHandler

		let evt = EVENT(nameOrParams, (e, node) => {
			eventHandler(e, node);
			evt.remove();
		});

		let remove = self.remove = () => {
			evt.remove();
		};

		let fire = self.fire = () => {
			evt.fire();
		};
	}
});

/*
 * A class
 */
global.A = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'a'
		};
	},

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.href		이동할 경로
		//OPTIONAL: params.target	이동할 타겟
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		let style;
		let href;
		let target;
		
		// init params.
		if (params !== undefined) {
			style = params.style;
			href = params.href;
			target = params.target;
		}

		let setHref = self.setHref = (href) => {
			inner.setAttr({
				name : 'href',
				value : href
			});
		};

		if (href !== undefined) {
			setHref(href);
		}

		if (target !== undefined) {
			inner.setAttr({
				name : 'target',
				value : target
			});
		}
		
		let tap = self.tap = () => {
			
			EVENT.fireAll({
				node : self,
				name : 'tap'
			});
		};
		
		let getHref = self.getHref = () => {
			return href;
		};
	},

	afterInit : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.href		이동할 경로
		//OPTIONAL: params.target	이동할 타겟
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let children;
		let href;
		
		let isHrefContent = false;
		
		let append;
		let prepend;
		
		// init params.
		if (params !== undefined) {
			children = params.c;
			href = params.href;
		}

		// 아무런 내용이 없으면 이동할 경로를 그대로 표시합니다.
		if (children === undefined && href !== undefined) {
			
			self.append(href);
			
			isHrefContent = true;
			
			OVERRIDE(self.append, (origin) => {
				
				append = self.append = (node) => {
					//REQUIRED: node
					
					if (isHrefContent === true) {
						self.empty();
						isHrefContent = false;
					}
					
					origin(node);
				};
			});
			
			OVERRIDE(self.prepend, (origin) => {
				
				prepend = self.prepend = (node) => {
					//REQUIRED: node
					
					if (isHrefContent === true) {
						self.empty();
						isHrefContent = false;
					}
					
					origin(node);
				};
			});
		}
	}
});

/*
 * HTML audio 태그와 대응되는 클래스
 */
global.AUDIO = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'audio'
		};
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.ogg		OGG 사운드 파일 경로
		//OPTIONAL: params.mp3		MP3 사운드 파일 경로
		//OPTIONAL: params.isLoop	반복 재생할지 여부
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let mp3 = params.mp3;
		let ogg = params.ogg;
		let isLoop = params.isLoop;
		
		if (ogg !== undefined && self.getEl().canPlayType('audio/ogg') !== '') {
			self.getEl().src = ogg;
		} else if (mp3 !== undefined) {
			self.getEl().src = mp3;
		}
		
		inner.setAttr({
			name : 'controls',
			value : 'controls'
		});
		
		if (isLoop === true) {
			inner.setAttr({
				name : 'loop',
				value : 'loop'
			});
		}
		
		let play = self.play = () => {
			self.getEl().play();
		};
		
		let pause = self.pause = () => {
			self.getEl().pause();
		};
		
		let stop = self.stop = () => {
			pause();
			self.getEl().currentTime = 0;
		};
	}
});

/*
 * HTML body 태그와 대응되는 객체
 */
global.BODY = OBJECT({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'body'
		};
	}
});

/*
 * HTML br 태그와 대응되는 클래스
 */
global.BR = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'br'
		};
	}
});

/*
 * HTML canvas 태그와 대응되는 클래스
 */
global.CANVAS = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'canvas'
		};
	},

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.width
		//OPTIONAL: params.height
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		let width;
		let height;

		// init params.
		if (params !== undefined) {
			width = params.width;
			height = params.height;
		}

		let getContext = self.getContext = (contextType) => {
			//REQUIRED: contextType
			
			return self.getEl().getContext(contextType);
		};

		let setSize = self.setSize = (size) => {
			//REQUIRED: size
			//OPTIONAL: size.width
			//OPTIONAL: size.height

			let el = self.getEl();

			if (size.width !== undefined) {
				width = size.width;
			}

			if (size.height !== undefined) {
				height = size.height;
			}

			if (width !== undefined) {
				el.width = width;
			}

			if (height !== undefined) {
				el.height = height;
			}
		};

		setSize({
			width : width,
			height : height
		});

		let getWidth = self.getWidth = () => {
			return width;
		};

		let getHeight = self.getHeight = () => {
			return height;
		};

		let getDataURL = self.getDataURL = () => {
			return self.getEl().toDataURL();
		};
	}
});

/*
 * HTML div 태그와 대응되는 클래스
 */
global.DIV = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'div'
		};
	}
});

/*
 * HTML footer 태그와 대응되는 클래스
 */
global.FOOTER = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'footer'
		};
	}
});

/*
 * Form class
 */
global.FORM = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'form'
		};
	},

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.action	폼 정보를 전송할 경로
		//OPTIONAL: params.target	경로가 이동될 타겟. 지정하지 않으면 현재 창에서 이동됩니다.
		//OPTIONAL: params.method	요청 메소드. `GET`, `POST`를 설정할 수 있습니다.
		//OPTIONAL: params.enctype	폼을 전송할때 사용할 인코딩 방법. 업로드 기능 구현에 사용됩니다.
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		let action;
		let target;
		let method;
		let enctype;

		let getData;
		let setData;

		// init params.
		if (params !== undefined) {
			action = params.action;
			target = params.target;
			method = params.method;
			enctype = params.enctype;
		}

		if (action !== undefined) {
			
			inner.setAttr({
				name : 'action',
				value : action
			});
			
		} else {
			
			EVENT({
				node : self,
				name : 'submit'
			}, (e) => {
				e.stop();
			});
		}

		if (target !== undefined) {
			inner.setAttr({
				name : 'target',
				value : target
			});
		}

		if (method !== undefined) {
			inner.setAttr({
				name : 'method',
				value : method
			});
		}

		if (enctype !== undefined) {
			inner.setAttr({
				name : 'enctype',
				value : enctype
			});
		}

		OVERRIDE(self.setData, (origin) => {
			
			getData = self.getData = () => {
	
				let data = origin();
	
				let f = (node) => {
					//REQUIRED: node
	
					EACH(node.getChildren(), (child) => {
	
						if (child.getValue !== undefined && child.getName !== undefined && child.getName() !== undefined) {
							
							let f2 = (data, name) => {
								
								if (name.indexOf('.') !== -1) {
									
									let subName = name.substring(name.indexOf('.') + 1);
									name = name.substring(0, name.indexOf('.'));
									
									if (data[name] === undefined) {
										data[name] = {};
									}
									
									f2(data[name], subName);
								}
								
								else {
									data[name] = child.getValue();
								}
							};
							
							f2(data, child.getName());
						}
	
						f(child);
					});
				};
				
				if (data === undefined) {
					data = {};
				}
	
				f(self);
	
				return data;
			};
		});

		OVERRIDE(self.setData, (origin) => {
			
			setData = self.setData = (data) => {
				//REQUIRED: data
				
				let f = (node) => {
					//REQUIRED: node
	
					EACH(node.getChildren(), (child) => {
						
						if (child.setValue !== undefined && child.getName !== undefined && child.getName() !== undefined) {
							
							let f2 = (data, name) => {
								
								if (name.indexOf('.') !== -1) {
									
									let subName = name.substring(name.indexOf('.') + 1);
									name = name.substring(0, name.indexOf('.'));
									
									if (data[name] === undefined) {
										data[name] = {};
									}
									
									f2(data[name], subName);
								}
								
								else {
									child.setValue(data[name] === undefined ? '' : data[name]);
								}
							};
							
							f2(data, child.getName());
						}
	
						f(child);
					});
				};
	
				f(self);
				
				origin(data);
			};
		});

		let submit = self.submit = () => {
			
			EVENT.fireAll({
				node : self,
				name : 'submit'
			});
			
			if (action !== undefined) {
				self.getEl().submit();
			}
		};
	}
});

/*
 * HTML h1 태그와 대응되는 클래스
 */
global.H1 = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'h1'
		};
	}
});

/*
 * HTML h2 태그와 대응되는 클래스
 */
global.H2 = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'h2'
		};
	}
});

/*
 * HTML h3 태그와 대응되는 클래스
 */
global.H3 = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'h3'
		};
	}
});

/*
 * HTML h4 태그와 대응되는 클래스
 */
global.H4 = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'h4'
		};
	}
});

/*
 * HTML h5 태그와 대응되는 클래스
 */
global.H5 = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'h5'
		};
	}
});

/*
 * HTML h6 태그와 대응되는 클래스
 */
global.H6 = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'h6'
		};
	}
});

/*
 * HTML header 태그와 대응되는 클래스
 */
global.HEADER = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'header'
		};
	}
});

/*
 * HTML iframe 태그와 대응되는 클래스
 */
global.IFRAME = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		
		return {
			tag : 'iframe',
			style : {
				border : 'none'
			}
		};
	},

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.name
		//OPTIONAL: params.src
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		let name;
		let src;

		// init params.
		if (params !== undefined) {
			name = params.name;
			src = params.src;
		}

		if (name !== undefined) {
			inner.setAttr({
				name : 'name',
				value : name
			});
		}

		let setSrc = self.setSrc = (_src) => {
			//REQUIRED: _src

			src = _src;

			inner.setAttr({
				name : 'src',
				value : src
			});
		};

		if (src !== undefined) {
			setSrc(src);
		}

		let getSrc = self.getSrc = () => {
			return src;
		};
	}
});

/*
 * HTML img 태그와 대응되는 클래스
 */
global.IMG = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'img'
		};
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.width
		//OPTIONAL: params.height
		//REQUIRED: params.src		이미지 경로
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		let src = params.src;
		let width = params.width;
		let height = params.height;

		let el = self.getEl();
		
		// CORS 이슈 해결
		el.crossOrigin = 'anonymous';
		
		//OVERRIDE: self.getWidth
		let getWidth = self.getWidth = () => {
			return el.width;
		};

		//OVERRIDE: self.getHeight
		let getHeight = self.getHeight = () => {
			return el.height;
		};

		let setSize = self.setSize = (size) => {
			//REQUIRED: size
			//OPTIONAL: size.width
			//OPTIONAL: size.height

			let width = size.width;
			let height = size.height;

			if (width !== undefined) {
				el.width = width;
			}

			if (height !== undefined) {
				el.height = height;
			}
		};

		setSize({
			width : width,
			height : height
		});

		let getSrc = self.getSrc = () => {
			return src;
		};

		let setSrc = self.setSrc = (_src) => {
			//REQUIRED: _src

			src = _src;

			inner.setAttr({
				name : 'src',
				value : src
			});
		};

		if (src !== undefined) {
			setSrc(src);
		}
	}
});

/*
 * HTML input 태그와 대응되는 클래스
 */
global.INPUT = CLASS((cls) => {

	let focusingInputIds = [];

	let getFocusingInputIds = cls.getFocusingInputIds = (id) => {
		return focusingInputIds;
	};

	return {

		preset : () => {
			return DOM;
		},

		params : () => {
			return {
				tag : 'input'
			};
		},

		init : (inner, self, params) => {
			//OPTIONAL: params
			//OPTIONAL: params.id		id 속성
			//OPTIONAL: params.cls		class 속성
			//OPTIONAL: params.style	스타일
			//OPTIONAL: params.name
			//OPTIONAL: params.type
			//OPTIONAL: params.placeholder
			//OPTIONAL: params.value
			//OPTIONAL: params.min
			//OPTIONAL: params.max
			//OPTIONAL: params.step
			//OPTIONAL: params.accept
			//OPTIONAL: params.isMultiple
			//OPTIONAL: params.isOffAutocomplete
			//OPTIONAL: params.isOffAutocapitalize
			//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
			//OPTIONAL: params.on		이벤트
			
			let name;
			let type;
			let placeholder;
			let min;
			let max;
			let step;
			let accept;
			let isMultiple;
			let isOffAutocomplete;
			let isOffAutocapitalize;

			let getName;
			let getValue;
			let getFiles;
			let setValue;
			let select;
			let focus;
			let blur;
			let setPlaceholder;
			
			let toggleCheck;
			let checkIsChecked;

			// init params.
			if (params !== undefined) {
				name = params.name;
				type = params.type;
				placeholder = params.placeholder;
				min = params.min;
				max = params.max;
				step = params.step;
				accept = params.accept;
				isMultiple = params.isMultiple;
				isOffAutocomplete = params.isOffAutocomplete;
				isOffAutocapitalize = params.isOffAutocapitalize;
			}

			if (type !== undefined) {
				inner.setAttr({
					name : 'type',
					value : type
				});
			}

			if (type !== 'submit' && type !== 'reset') {

				if (name !== undefined) {
					inner.setAttr({
						name : 'name',
						value : name
					});
				}

				if (placeholder !== undefined) {
					inner.setAttr({
						name : 'placeholder',
						value : placeholder
					});
				}
				
				if (accept !== undefined) {
					inner.setAttr({
						name : 'accept',
						value : accept
					});
				}

				if (isMultiple === true) {
					inner.setAttr({
						name : 'multiple',
						value : isMultiple
					});
				}

				if (isOffAutocomplete === true) {
					inner.setAttr({
						name : 'autocomplete',
						value : 'off'
					});
				}
				
				if (isOffAutocapitalize === true) {
					inner.setAttr({
						name : 'autocapitalize',
						value : 'off'
					});
				}
				
				getName = self.getName = () => {
					return name;
				};

				getValue = self.getValue = () => {
					if (type === 'checkbox' || type === 'radio') {
						return self.getEl().checked;
					}
					return self.getEl().value;
				};

				getFiles = self.getFiles = () => {
					return self.getEl().files;
				};

				select = self.select = () => {
					if (type === 'file') {
						self.getEl().click();
					} else {
						self.getEl().select();
					}
				};

				focus = self.focus = () => {
					self.getEl().focus();
				};

				blur = self.blur = () => {
					self.getEl().blur();
				};

				if (type === 'checkbox' || type === 'radio') {

					toggleCheck = self.toggleCheck = (e) => {

						if (self.getEl().checked === true) {
							self.getEl().checked = false;
						} else {
							self.getEl().checked = true;
						}

						EVENT.fireAll({
							node : self,
							name : 'change'
						});

						return self.getEl().checked;
					};

					checkIsChecked = self.checkIsChecked = () => {
						return self.getEl().checked;
					};

					EVENT({
						node : self,
						name : 'keyup'
					}, (e) => {
						
						if (e !== undefined && e.getKey() === 'Enter') {
							
							DELAY(() => {
								
								EVENT.fireAll({
									node : self,
									name : 'change'
								});
							});
						}
					});
				}
				
				else {
					
					setPlaceholder = self.setPlaceholder = (_placeholder) => {
						//REQUIRED: placeholder
						
						placeholder = _placeholder;
						
						inner.setAttr({
							name : 'placeholder',
							value : placeholder
						});
					};
				}
			}
			
			if (type === 'range') {
				
				if (min !== undefined) {
					inner.setAttr({
						name : 'min',
						value : min
					});
				}
				
				if (max !== undefined) {
					inner.setAttr({
						name : 'max',
						value : max
					});
				}
				
				if (step !== undefined) {
					inner.setAttr({
						name : 'step',
						value : step
					});
				}
			}

			self.setValue = setValue = (value) => {
				//REQUIRED: value

				if (type === 'checkbox' || type === 'radio') {

					if (value === true) {

						if (self.getEl().checked !== true) {

							self.getEl().checked = true;

							EVENT.fireAll({
								node : self,
								name : 'change'
							});

						} else {
							self.getEl().checked = true;
						}

					} else {

						if (self.getEl().checked === true) {

							self.getEl().checked = false;

							EVENT.fireAll({
								node : self,
								name : 'change'
							});

						} else {
							self.getEl().checked = false;
						}
					}

				} else {

					if (self.getEl().value !== value) {

						self.getEl().value = value;

						EVENT.fireAll({
							node : self,
							name : 'change'
						});

					} else {
						self.getEl().value = value;
					}
				}
			};

			EVENT({
				node : self,
				name : 'focus'
			}, () => {
				getFocusingInputIds().push(self.id);
			});

			EVENT({
				node : self,
				name : 'blur'
			}, () => {

				REMOVE({
					array : getFocusingInputIds(),
					value : self.id
				});
			});

			self.on('remove', () => {

				REMOVE({
					array : getFocusingInputIds(),
					value : self.id
				});
			});
			
			// can radio be false
			if (type === 'radio') {
				
				EVENT({
					node : self,
					name : 'touchstart'
				}, () => {
					
					if (checkIsChecked() === true) {
						
						EVENT_ONCE({
							node : self,
							name : 'touchend'
						}, () => {
							DELAY(() => {
								setValue(false);
							});
						});
					}
				});
			}
		},

		afterInit : (inner, self, params) => {
			//OPTIONAL: params
			//OPTIONAL: params.id		id 속성
			//OPTIONAL: params.cls		class 속성
			//OPTIONAL: params.style	스타일
			//OPTIONAL: params.name
			//OPTIONAL: params.type
			//OPTIONAL: params.placeholder
			//OPTIONAL: params.value
			//OPTIONAL: params.accept
			//OPTIONAL: params.isMultiple
			//OPTIONAL: params.isOffAutocomplete
			//OPTIONAL: params.isOffAutocapitalize
			//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
			//OPTIONAL: params.on		이벤트
			
			let type;
			let value;

			// init params.
			if (params !== undefined) {
				type = params.type;
				value = params.value;
			}

			if (value !== undefined) {

				if (type === 'checkbox' || type === 'radio') {

					if (value === true) {

						if (self.getEl().checked !== true) {
							self.getEl().checked = true;
						} else {
							self.getEl().checked = true;
						}

					} else {

						if (self.getEl().checked === true) {
							self.getEl().checked = false;
						} else {
							self.getEl().checked = false;
						}
					}

				} else {

					if (self.getEl().value !== value) {
						self.getEl().value = value;
					} else {
						self.getEl().value = value;
					}
				}
			}
		}
	};
});

/*
 * HTML li 태그와 대응되는 클래스
 */
global.LI = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'li'
		};
	}
});

/*
 * HTML optgroup 태그와 대응되는 클래스
 */
global.OPTGROUP = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'optgroup'
		};
	},

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.label
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let label = params.label;

		inner.setAttr({
			name : 'label',
			value : label
		});
	}
});

/*
 * HTML option 태그와 대응되는 클래스
 */
global.OPTION = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'option'
		};
	},

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.value
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		let getValue = self.getValue = () => {
			return self.getEl().value;
		};

		let setValue = self.setValue = (value) => {
			//REQUIRED: value

			self.getEl().value = value;
		};
	},

	afterInit : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.value
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		let value;
		let children;

		// init params.
		if (params !== undefined) {
			value = params.value;
			children = params.c;
		}

		if (value === undefined) {
			self.setValue('');
		} else {
			self.setValue(value);
			
			if (children === undefined) {
				self.append(value);
			}
		}
	}
});

/*
 * HTML p 태그와 대응되는 클래스
 */
global.P = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'p'
		};
	}
});

/*
 * HTML select 태그와 대응되는 클래스
 */
global.SELECT = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'select'
		};
	},

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.name
		//OPTIONAL: params.placeholder
		//OPTIONAL: params.value
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		let name;
		
		let isCtrlDown = false;

		// init params.
		if (params !== undefined) {
			name = params.name;
		}

		if (name !== undefined) {
			inner.setAttr({
				name : 'name',
				value : name
			});
		}

		let getName = self.getName = () => {
			return name;
		};

		let getValue = self.getValue = () => {
			return self.getEl().value;
		};

		let setValue = self.setValue = (value) => {
			//REQUIRED: value

			if (self.getEl().value !== value) {

				self.getEl().value = value;

				EVENT.fireAll({
					node : self,
					name : 'change'
				});

			} else {
				self.getEl().value = value;
			}
		};

		let select = self.select = () => {
			self.getEl().select();
		};

		let focus = self.focus = () => {
			self.getEl().focus();
		};

		let blur = self.blur = () => {
			self.getEl().blur();
		};

		EVENT({
			node : self,
			name : 'keydown'
		}, (e) => {
			
			if (e.getKey() === 'Control') {
				isCtrlDown = true;
			} else if (isCtrlDown !== true) {
				e.stopBubbling();
			}
		});

		EVENT({
			node : self,
			name : 'keyup'
		}, (e) => {

			if (e.getKey() === 'Control') {
				isCtrlDown = false;
			}
		});

		EVENT({
			node : self,
			name : 'focus'
		}, () => {
			INPUT.getFocusingInputIds().push(self.id);
		});

		EVENT({
			node : self,
			name : 'blur'
		}, () => {

			REMOVE({
				array : INPUT.getFocusingInputIds(),
				value : self.id
			});
		});

		self.on('remove', () => {

			REMOVE({
				array : INPUT.getFocusingInputIds(),
				value : self.id
			});
		});
	},

	afterInit : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일을 지정합니다.
		//OPTIONAL: params.name
		//OPTIONAL: params.placeholder
		//OPTIONAL: params.value
		//OPTIONAL: params.c		자식 노드를 지정합니다. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트를 지정합니다.

		let value;

		// init params.
		if (params !== undefined) {
			value = params.value;
		}

		if (value !== undefined) {
			
			if (self.getEl().value !== value) {
				self.getEl().value = value;
			} else {
				self.getEl().value = value;
			}
		}
	}
});

/*
 * HTML span 태그와 대응되는 클래스
 */
global.SPAN = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'span'
		};
	}
});

/*
 * HTML table 태그와 대응되는 클래스
 */
global.TABLE = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'table'
		};
	}
});

/*
 * HTML td 태그와 대응되는 클래스
 */
global.TD = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'td'
		};
	},

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.rowspan
		//OPTIONAL: params.colspan
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		let rowspan;
		let colspan;

		// init params.
		if (params !== undefined) {
			rowspan = params.rowspan;
			colspan = params.colspan;
		}

		if (rowspan !== undefined) {
			inner.setAttr({
				name : 'rowspan',
				value : rowspan
			});
		}

		if (colspan !== undefined) {
			inner.setAttr({
				name : 'colspan',
				value : colspan
			});
		}
	}
});

/*
 * Textarea class
 */
global.TEXTAREA = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'textarea'
		};
	},

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id			id 속성
		//OPTIONAL: params.cls			class 속성
		//OPTIONAL: params.style		스타일
		//OPTIONAL: params.name
		//OPTIONAL: params.placeholder	값이 없는 경우 표시되는 짧은 설명
		//OPTIONAL: params.value
		//OPTIONAL: params.c			자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on			이벤트

		let name;
		let placeholder;
		
		let isCtrlDown = false;

		// init params.
		if (params !== undefined) {
			name = params.name;
			placeholder = params.placeholder;
		}

		if (name !== undefined) {
			inner.setAttr({
				name : 'name',
				value : name
			});
		}

		if (placeholder !== undefined) {
			inner.setAttr({
				name : 'placeholder',
				value : placeholder
			});
		}

		let getName = self.getName = () => {
			return name;
		};

		let getValue = self.getValue = () => {
			return self.getEl().value;
		};

		let setValue = self.setValue = (value) => {
			//REQUIRED: value

			if (self.getEl().value !== value) {

				self.getEl().value = value;

				EVENT.fireAll({
					node : self,
					name : 'change'
				});

			} else {
				self.getEl().value = value;
			}
		};

		let select = self.select = () => {
			self.getEl().select();
		};

		let focus = self.focus = () => {
			self.getEl().focus();
		};

		let blur = self.blur = () => {
			self.getEl().blur();
		};
		
		let setPlaceholder = self.setPlaceholder = (_placeholder) => {
			//REQUIRED: placeholder
			
			placeholder = _placeholder;
			
			inner.setAttr({
				name : 'placeholder',
				value : placeholder
			});
		};

		EVENT({
			node : self,
			name : 'keydown'
		}, (e) => {

			if (e.getKey() === 'Control') {
				isCtrlDown = true;
			} else if (isCtrlDown !== true) {
				e.stopBubbling();
			}
		});

		EVENT({
			node : self,
			name : 'keyup'
		}, (e) => {

			if (e.getKey() === 'Control') {
				isCtrlDown = false;
			}
		});

		EVENT({
			node : self,
			name : 'focus'
		}, () => {
			INPUT.getFocusingInputIds().push(self.id);
		});

		EVENT({
			node : self,
			name : 'blur'
		}, () => {

			REMOVE({
				array : INPUT.getFocusingInputIds(),
				value : self.id
			});
		});

		self.on('remove', () => {

			REMOVE({
				array : INPUT.getFocusingInputIds(),
				value : self.id
			});
		});
	},

	afterInit : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id			id 속성
		//OPTIONAL: params.cls			class 속성
		//OPTIONAL: params.style		스타일
		//OPTIONAL: params.name
		//OPTIONAL: params.placeholder	값이 없는 경우 표시되는 짧은 설명
		//OPTIONAL: params.value
		//OPTIONAL: params.c			자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on			이벤트

		let value;

		// init params.
		if (params !== undefined) {
			value = params.value;
		}

		if (value !== undefined) {
			self.setValue(value);
		}
	}
});

/*
 * HTML th 태그와 대응되는 클래스
 */
global.TH = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'th'
		};
	},

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.rowspan
		//OPTIONAL: params.colspan
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let rowspan;
		let colspan;

		// init params.
		if (params !== undefined) {
			rowspan = params.rowspan;
			colspan = params.colspan;
		}

		if (rowspan !== undefined) {
			inner.setAttr({
				name : 'rowspan',
				value : rowspan
			});
		}

		if (colspan !== undefined) {
			inner.setAttr({
				name : 'colspan',
				value : colspan
			});
		}
	}
});

/*
 * HTML tr 태그와 대응되는 클래스
 */
global.TR = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'tr'
		};
	}
});

/*
 * HTML ul 태그와 대응되는 클래스
 */
global.UL = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'ul'
		};
	}
});

/*
 * HTML video 태그와 대응되는 클래스
 */
global.VIDEO = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'video'
		};
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.id			id 속성
		//OPTIONAL: params.cls			class 속성
		//OPTIONAL: params.style		스타일
		//OPTIONAL: params.webm			WebM 동영상 파일 경로
		//OPTIONAL: params.ogg			OGG 동영상 파일 경로
		//OPTIONAL: params.mp4			MP4 동영상 파일 경로
		//OPTIONAL: params.poster		동영상이 로딩 중일 때 표시할 이미지 파일 경로
		//OPTIONAL: params.isNoControls	조작 메뉴를 숨길지 여부
		//OPTIONAL: params.isLoop		반복 재생할지 여부
		//OPTIONAL: params.isMuted		음소거로 재생할지 여부
		//OPTIONAL: params.c			자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on			이벤트

		let webm = params.webm;
		let ogg = params.ogg;
		let mp4 = params.mp4;
		let poster = params.poster;
		let isNoControls = params.isNoControls;
		let isLoop = params.isLoop;
		let isMuted = params.isMuted;
		
		if (webm !== undefined && self.getEl().canPlayType('video/webm') !== '') {
			self.getEl().src = webm;
		} else if (ogg !== undefined && self.getEl().canPlayType('video/ogg') !== '') {
			self.getEl().src = ogg;
		} else if (mp4 !== undefined) {
			self.getEl().src = mp4;
		}
		
		if (isNoControls !== true) {
			inner.setAttr({
				name : 'controls',
				value : 'controls'
			});
		}
		
		if (isLoop === true) {
			inner.setAttr({
				name : 'loop',
				value : 'loop'
			});
		}
		
		if (isMuted === true) {
			inner.setAttr({
				name : 'muted',
				value : 'muted'
			});
		}
		
		let play = self.play = () => {
			self.getEl().play();
		};
		
		let pause = self.pause = () => {
			self.getEl().pause();
		};
		
		let stop = self.stop = () => {
			self.getEl().pause();
			self.getEl().currentTime = 0;
		};
	}
});

/*
 * 암호화된 HTTP DELETE 요청을 보냅니다.
 */
global.ENCRYPTION_DELETE = METHOD({

	run : (urlOrParams, responseListenerOrListeners) => {
		//REQUIRED: urlOrParams
		//OPTIONAL: urlOrParams.isSecure	HTTPS 프로토콜인지 여부
		//OPTIONAL: urlOrParams.host
		//OPTIONAL: urlOrParams.port
		//OPTIONAL: urlOrParams.uri
		//OPTIONAL: urlOrParams.url			요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
		//OPTIONAL: urlOrParams.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
		//OPTIONAL: urlOrParams.params		데이터 형태({...})로 표현한 파라미터 목록
		//OPTIONAL: urlOrParams.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
		//OPTIONAL: urlOrParams.headers		요청 헤더
		//OPTIONAL: responseListenerOrListeners
		//OPTIONAL: responseListenerOrListeners.error
		//OPTIONAL: responseListenerOrListeners.success

		ENCRYPTION_REQUEST(COMBINE([CHECK_IS_DATA(urlOrParams) === true ? urlOrParams : {
			url : urlOrParams
		}, {
			method : 'DELETE'
		}]), responseListenerOrListeners);
	}
});
/*
 * 암호화된 HTTP GET 요청을 보냅니다.
 */
global.ENCRYPTION_GET = METHOD({

	run : (urlOrParams, responseListenerOrListeners) => {
		//REQUIRED: urlOrParams
		//OPTIONAL: urlOrParams.isSecure	HTTPS 프로토콜인지 여부
		//OPTIONAL: urlOrParams.host
		//OPTIONAL: urlOrParams.port
		//OPTIONAL: urlOrParams.uri
		//OPTIONAL: urlOrParams.url			요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
		//OPTIONAL: urlOrParams.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
		//OPTIONAL: urlOrParams.params		데이터 형태({...})로 표현한 파라미터 목록
		//OPTIONAL: urlOrParams.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
		//OPTIONAL: urlOrParams.headers		요청 헤더
		//OPTIONAL: responseListenerOrListeners
		//OPTIONAL: responseListenerOrListeners.error
		//OPTIONAL: responseListenerOrListeners.success

		ENCRYPTION_REQUEST(COMBINE([CHECK_IS_DATA(urlOrParams) === true ? urlOrParams : {
			url : urlOrParams
		}, {
			method : 'GET'
		}]), responseListenerOrListeners);
	}
});
/*
 * 암호화된 HTTP POST 요청을 보냅니다.
 */
global.ENCRYPTION_POST = METHOD({

	run : (urlOrParams, responseListenerOrListeners) => {
		//REQUIRED: urlOrParams
		//OPTIONAL: urlOrParams.isSecure	HTTPS 프로토콜인지 여부
		//OPTIONAL: urlOrParams.host
		//OPTIONAL: urlOrParams.port
		//OPTIONAL: urlOrParams.uri
		//OPTIONAL: urlOrParams.url			요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
		//OPTIONAL: urlOrParams.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
		//OPTIONAL: urlOrParams.params		데이터 형태({...})로 표현한 파라미터 목록
		//OPTIONAL: urlOrParams.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
		//OPTIONAL: urlOrParams.headers		요청 헤더
		//OPTIONAL: responseListenerOrListeners
		//OPTIONAL: responseListenerOrListeners.error
		//OPTIONAL: responseListenerOrListeners.success

		ENCRYPTION_REQUEST(COMBINE([CHECK_IS_DATA(urlOrParams) === true ? urlOrParams : {
			url : urlOrParams
		}, {
			method : 'POST'
		}]), responseListenerOrListeners);
	}
});
/*
 * 암호화된 HTTP PUT 요청을 보냅니다.
 */
global.ENCRYPTION_PUT = METHOD({

	run : (urlOrParams, responseListenerOrListeners) => {
		//REQUIRED: urlOrParams
		//OPTIONAL: urlOrParams.isSecure	HTTPS 프로토콜인지 여부
		//OPTIONAL: urlOrParams.host
		//OPTIONAL: urlOrParams.port
		//OPTIONAL: urlOrParams.uri
		//OPTIONAL: urlOrParams.url			요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
		//OPTIONAL: urlOrParams.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
		//OPTIONAL: urlOrParams.params		데이터 형태({...})로 표현한 파라미터 목록
		//OPTIONAL: urlOrParams.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
		//OPTIONAL: urlOrParams.headers		요청 헤더
		//OPTIONAL: responseListenerOrListeners
		//OPTIONAL: responseListenerOrListeners.error
		//OPTIONAL: responseListenerOrListeners.success

		ENCRYPTION_REQUEST(COMBINE([CHECK_IS_DATA(urlOrParams) === true ? urlOrParams : {
			url : urlOrParams
		}, {
			method : 'PUT'
		}]), responseListenerOrListeners);
	}
});
/*
 * 암호화된 HTTP 요청을 보냅니다.
 */
global.ENCRYPTION_REQUEST = METHOD({

	run : (params, responseListenerOrListeners) => {
		//REQUIRED: params
		//REQUIRED: params.method	요청 메소드. GET, POST, PUT, DELETE를 설정할 수 있습니다.
		//OPTIONAL: params.isSecure	HTTPS 프로토콜인지 여부
		//OPTIONAL: params.host
		//OPTIONAL: params.port
		//OPTIONAL: params.uri
		//OPTIONAL: params.url		요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
		//OPTIONAL: params.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
		//OPTIONAL: params.params	데이터 형태({...})로 표현한 파라미터 목록
		//OPTIONAL: params.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
		//OPTIONAL: params.headers	요청 헤더
		//OPTIONAL: responseListenerOrListeners
		//OPTIONAL: responseListenerOrListeners.error
		//OPTIONAL: responseListenerOrListeners.success

		let method = params.method;
		let isSecure = params.isSecure === undefined ? BROWSER_CONFIG.isSecure : params.isSecure;
		let host = params.host === undefined ? BROWSER_CONFIG.host : params.host;
		let port = params.port === undefined ? (params.host === undefined ? BROWSER_CONFIG.port : (isSecure !== true ? 80 : 443)) : params.port;
		let uri = params.uri;
		let url = params.url;
		let paramStr = params.paramStr;
		let _params = params.params;
		let data = params.data;
		let headers = params.headers;
		
		let responseListener;
		let errorListener;

		method = method.toUpperCase();
		
		if (url !== undefined) {
			
			if (url.indexOf('?') !== -1) {
				paramStr = url.substring(url.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				url = url.substring(0, url.indexOf('?'));
			}
			
			isSecure = undefined;
			host = undefined;
			port = undefined;
			
		} else {
			
			if (uri !== undefined && uri.indexOf('?') !== -1) {
				paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				uri = uri.substring(0, uri.indexOf('?'));
			}
		}
		
		if (_params !== undefined) {
			
			EACH(_params, (value, name) => {
				
				if (paramStr === undefined) {
					paramStr = '';
				} else {
					paramStr += '&';
				}
				
				paramStr += encodeURIComponent(name) + '=' + encodeURIComponent(value);
			});
		}
		
		if (data !== undefined) {
			paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(data));
		}

		paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();
		
		// 시드 값 삽입
		paramStr += '&__SEED=' + UUID();
		
		// 파라미터 문자열 암호화
		paramStr = '__ENCRYPT=' + encodeURIComponent(ENCRYPT({
			password : paramStr,
			key : CONFIG.requestEncryptionKey
		}));
		
		if (url === undefined) {
			url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + (uri === undefined ? '' : (uri[0] === '/' ? uri.substring(1) : uri));
		}
		
		if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
			responseListener = responseListenerOrListeners;
		} else {
			responseListener = responseListenerOrListeners.success;
			errorListener = responseListenerOrListeners.error;
		}
		
		(method === 'GET' || method === 'DELETE' ? fetch(url + '?' + paramStr, {
			method : method,
			credentials : location.protocol !== 'file:' && location.protocol.indexOf('-extension:') === -1 && host === BROWSER_CONFIG.host && port === BROWSER_CONFIG.port ? 'include' : undefined,
			headers : new Headers(headers === undefined ? {} : headers)
		}) : fetch(url, {
			method : method,
			body : paramStr,
			credentials : location.protocol !== 'file:' && location.protocol.indexOf('-extension:') === -1 && host === BROWSER_CONFIG.host && port === BROWSER_CONFIG.port ? 'include' : undefined,
			headers : new Headers(headers === undefined ? {} : headers)
		}))
		.then((response) => {
			if (response.status === 200) {
				return response.text();
			} else {
				let errorMsg = 'HTTP RESPONSE STATUS CODE: ' + response.status;

				if (errorListener !== undefined) {
					errorListener(errorMsg);
				} else {
					SHOW_ERROR('ENCRYPTION_REQUEST', errorMsg, params);
				}
			}
		}, (error) => {
			
			let errorMsg = error.toString();

			if (errorListener !== undefined) {
				errorListener(errorMsg);
			} else {
				SHOW_ERROR('ENCRYPTION_REQUEST', errorMsg, params);
			}
			
			responseListener = undefined;
		})
		.then((responseText) => {
			if (responseText !== undefined && responseListener !== undefined) {
				responseListener(responseText);
			}
		});
	}
});
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  /*if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else */root[name] = definition()
}(global, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)(o|0)s/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getSecondMatch(/edg([ea]|ios)\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr\/|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/Whale/i.test(ua)) {
      result = {
        name: 'NAVER Whale browser'
        , whale: t
        , version: getFirstMatch(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/MZBrowser/i.test(ua)) {
      result = {
        name: 'MZ Browser'
        , mzbrowser: t
        , version: getFirstMatch(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/focus/i.test(ua)) {
      result = {
        name: 'Focus'
        , focus: t
        , version: getFirstMatch(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , osname: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , osname: 'Chrome OS'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/edg([ea]|ios)/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , osname: 'Sailfish OS'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
        result.osname = 'Firefox OS'
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , osname: 'BlackBerry OS'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , osname: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , osname: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , osname: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && (android || result.silk)) {
      result.android = t
      result.osname = 'Android'
    } else if (!result.windowsphone && iosdevice) {
      result[iosdevice] = t
      result.ios = t
      result.osname = 'iOS'
    } else if (mac) {
      result.mac = t
      result.osname = 'macOS'
    } else if (xbox) {
      result.xbox = t
      result.osname = 'Xbox'
    } else if (windows) {
      result.windows = t
      result.osname = 'Windows'
    } else if (linux) {
      result.linux = t
      result.osname = 'Linux'
    }

    function getWindowsVersion (s) {
      switch (s) {
        case 'NT': return 'NT'
        case 'XP': return 'XP'
        case 'NT 5.0': return '2000'
        case 'NT 5.1': return 'XP'
        case 'NT 5.2': return '2003'
        case 'NT 6.0': return 'Vista'
        case 'NT 6.1': return '7'
        case 'NT 6.2': return '8'
        case 'NT 6.3': return '8.1'
        case 'NT 10.0': return '10'
        default: return undefined
      }
    }

    // OS version extraction
    var osVersion = '';
    if (result.windows) {
      osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i))
    } else if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (result.mac) {
      osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = !result.windows && osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.whale && compareVersions([result.version, '1.0']) === 1) ||
        (result.mzbrowser && compareVersions([result.version, '6.0']) === 1) ||
        (result.focus && compareVersions([result.version, '1.0']) === 1) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  /*
   * Set our detect public method to the main bowser object
   * This is needed to implement bowser in server side
   */
  bowser.detect = detect;
  return bowser
});

/*!
audiocontext-polyfill.js v0.1.2
(c) 2013 - 2014 Shinnosuke Watanabe
Licensed under the MIT license
*/
'use strict';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

if (window.AudioContext !== undefined) {

	window.OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;

	let Proto = AudioContext.prototype;

	let tmpctx = new AudioContext();

	// Support alternate names
	// start (noteOn), stop (noteOff), createGain (createGainNode), etc.
	let isStillOld = (normative, old) => {
		return normative === undefined && old !== undefined;
	};

	let bufProto = tmpctx.createBufferSource().constructor.prototype;

	if (isStillOld(bufProto.start, bufProto.noteOn) || isStillOld(bufProto.stop, bufProto.noteOff)) {
		
		let nativeCreateBufferSource = Proto.createBufferSource;

		Proto.createBufferSource = function() {
			let returnNode = nativeCreateBufferSource.call(this);
			returnNode.start = returnNode.start || returnNode.noteOn;
			returnNode.stop = returnNode.stop || returnNode.noteOff;

			return returnNode;
		};
	}

	// Firefox 24 doesn't support OscilatorNode
	if (typeof tmpctx.createOscillator === 'function') {
		let oscProto = tmpctx.createOscillator().constructor.prototype;

		if (isStillOld(oscProto.start, oscProto.noteOn) ||
			isStillOld(oscProto.stop, oscProto.noteOff)) {
			let nativeCreateOscillator = Proto.createOscillator;

			Proto.createOscillator = function() {
				let returnNode = nativeCreateOscillator.call(this);
				returnNode.start = returnNode.start || returnNode.noteOn;
				returnNode.stop = returnNode.stop || returnNode.noteOff;

				return returnNode;
			};
		}
	}

	if (Proto.createGain === undefined && Proto.createGainNode !== undefined) {
		Proto.createGain = Proto.createGainNode;
	}

	if (Proto.createDelay === undefined && Proto.createDelayNode !== undefined) {
		Proto.createDelay = Proto.createGainNode;
	}

	if (Proto.createScriptProcessor === undefined &&
		Proto.createJavaScriptNode !== undefined) {
		Proto.createScriptProcessor = Proto.createJavaScriptNode;
	}

	// Black magic for iOS
	if (navigator.userAgent.indexOf('like Mac OS X') !== -1) {
		
		let OriginalAudioContext = AudioContext;
		
		window.AudioContext = function() {
			let iOSCtx = new OriginalAudioContext();

			let body = document.body;
			let tmpBuf = iOSCtx.createBufferSource();
			let tmpProc = iOSCtx.createScriptProcessor(256, 1, 1);
			
			let instantProcess = () => {
				tmpBuf.start(0);
				tmpBuf.connect(tmpProc);
				tmpProc.connect(iOSCtx.destination);
			};

			body.addEventListener('touchstart', instantProcess, false);

			// This function will be called once and for all.
			tmpProc.onaudioprocess = () => {
				tmpBuf.disconnect();
				tmpProc.disconnect();
				body.removeEventListener('touchstart', instantProcess, false);
				tmpProc.onaudioprocess = null;
			};

			return iOSCtx;
		};
	}
}
/*
 * HTTP DELETE 요청을 보냅니다.
 */
global.DELETE = METHOD({

	run : (urlOrParams, responseListenerOrListeners) => {
		//REQUIRED: urlOrParams
		//OPTIONAL: urlOrParams.isSecure	HTTPS 프로토콜인지 여부
		//OPTIONAL: urlOrParams.host
		//OPTIONAL: urlOrParams.port
		//OPTIONAL: urlOrParams.uri
		//OPTIONAL: urlOrParams.url			요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
		//OPTIONAL: urlOrParams.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
		//OPTIONAL: urlOrParams.params		데이터 형태({...})로 표현한 파라미터 목록
		//OPTIONAL: urlOrParams.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
		//OPTIONAL: urlOrParams.headers		요청 헤더
		//OPTIONAL: responseListenerOrListeners
		//OPTIONAL: responseListenerOrListeners.error
		//OPTIONAL: responseListenerOrListeners.success

		REQUEST(COMBINE([CHECK_IS_DATA(urlOrParams) === true ? urlOrParams : {
			url : urlOrParams
		}, {
			method : 'DELETE'
		}]), responseListenerOrListeners);
	}
});
/*
 * HTTP GET 요청을 보냅니다.
 */
global.GET = METHOD({

	run : (urlOrParams, responseListenerOrListeners) => {
		//REQUIRED: urlOrParams
		//OPTIONAL: urlOrParams.isSecure	HTTPS 프로토콜인지 여부
		//OPTIONAL: urlOrParams.host
		//OPTIONAL: urlOrParams.port
		//OPTIONAL: urlOrParams.uri
		//OPTIONAL: urlOrParams.url			요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
		//OPTIONAL: urlOrParams.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
		//OPTIONAL: urlOrParams.params		데이터 형태({...})로 표현한 파라미터 목록
		//OPTIONAL: urlOrParams.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
		//OPTIONAL: urlOrParams.headers		요청 헤더
		//OPTIONAL: responseListenerOrListeners
		//OPTIONAL: responseListenerOrListeners.error
		//OPTIONAL: responseListenerOrListeners.success

		REQUEST(COMBINE([CHECK_IS_DATA(urlOrParams) === true ? urlOrParams : {
			url : urlOrParams
		}, {
			method : 'GET'
		}]), responseListenerOrListeners);
	}
});
/*
 * HTTP POST 요청을 보냅니다.
 */
global.POST = METHOD({

	run : (urlOrParams, responseListenerOrListeners) => {
		//REQUIRED: urlOrParams
		//OPTIONAL: urlOrParams.isSecure	HTTPS 프로토콜인지 여부
		//OPTIONAL: urlOrParams.host
		//OPTIONAL: urlOrParams.port
		//OPTIONAL: urlOrParams.uri
		//OPTIONAL: urlOrParams.url			요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
		//OPTIONAL: urlOrParams.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
		//OPTIONAL: urlOrParams.params		데이터 형태({...})로 표현한 파라미터 목록
		//OPTIONAL: urlOrParams.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
		//OPTIONAL: urlOrParams.headers		요청 헤더
		//OPTIONAL: responseListenerOrListeners
		//OPTIONAL: responseListenerOrListeners.error
		//OPTIONAL: responseListenerOrListeners.success

		REQUEST(COMBINE([CHECK_IS_DATA(urlOrParams) === true ? urlOrParams : {
			url : urlOrParams
		}, {
			method : 'POST'
		}]), responseListenerOrListeners);
	}
});
/*
 * HTTP PUT 요청을 보냅니다.
 */
global.PUT = METHOD({

	run : (urlOrParams, responseListenerOrListeners) => {
		//REQUIRED: urlOrParams
		//OPTIONAL: urlOrParams.isSecure	HTTPS 프로토콜인지 여부
		//OPTIONAL: urlOrParams.host
		//OPTIONAL: urlOrParams.port
		//OPTIONAL: urlOrParams.uri
		//OPTIONAL: urlOrParams.url			요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
		//OPTIONAL: urlOrParams.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
		//OPTIONAL: urlOrParams.params		데이터 형태({...})로 표현한 파라미터 목록
		//OPTIONAL: urlOrParams.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
		//OPTIONAL: urlOrParams.headers		요청 헤더
		//OPTIONAL: responseListenerOrListeners
		//OPTIONAL: responseListenerOrListeners.error
		//OPTIONAL: responseListenerOrListeners.success

		REQUEST(COMBINE([CHECK_IS_DATA(urlOrParams) === true ? urlOrParams : {
			url : urlOrParams
		}, {
			method : 'PUT'
		}]), responseListenerOrListeners);
	}
});
/*
 * HTTP 요청을 보냅니다.
 */
global.REQUEST = METHOD({

	run : (params, responseListenerOrListeners) => {
		//REQUIRED: params
		//REQUIRED: params.method	요청 메소드. GET, POST, PUT, DELETE를 설정할 수 있습니다.
		//OPTIONAL: params.isSecure	HTTPS 프로토콜인지 여부
		//OPTIONAL: params.host
		//OPTIONAL: params.port
		//OPTIONAL: params.uri
		//OPTIONAL: params.url		요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
		//OPTIONAL: params.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
		//OPTIONAL: params.params	데이터 형태({...})로 표현한 파라미터 목록
		//OPTIONAL: params.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
		//OPTIONAL: params.headers	요청 헤더
		//OPTIONAL: responseListenerOrListeners
		//OPTIONAL: responseListenerOrListeners.error
		//OPTIONAL: responseListenerOrListeners.success

		let method = params.method;
		let isSecure = params.isSecure === undefined ? BROWSER_CONFIG.isSecure : params.isSecure;
		let host = params.host === undefined ? BROWSER_CONFIG.host : params.host;
		let port = params.port === undefined ? (params.host === undefined ? BROWSER_CONFIG.port : (isSecure !== true ? 80 : 443)) : params.port;
		let uri = params.uri;
		let url = params.url;
		let paramStr = params.paramStr;
		let _params = params.params;
		let data = params.data;
		let headers = params.headers;
		
		let responseListener;
		let errorListener;

		method = method.toUpperCase();
		
		if (url !== undefined) {
			
			if (url.indexOf('?') !== -1) {
				paramStr = url.substring(url.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				url = url.substring(0, url.indexOf('?'));
			}
			
			isSecure = undefined;
			host = undefined;
			port = undefined;
			
		} else {
			
			if (uri !== undefined && uri.indexOf('?') !== -1) {
				paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				uri = uri.substring(0, uri.indexOf('?'));
			}
		}
		
		if (_params !== undefined) {
			
			EACH(_params, (value, name) => {
				
				if (paramStr === undefined) {
					paramStr = '';
				} else {
					paramStr += '&';
				}
				
				paramStr += encodeURIComponent(name) + '=' + encodeURIComponent(value);
			});
		}
		
		if (data !== undefined) {
			paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(data));
		}

		paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();
		
		if (url === undefined) {
			url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + (uri === undefined ? '' : (uri[0] === '/' ? uri.substring(1) : uri));
		}
		
		if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
			responseListener = responseListenerOrListeners;
		} else {
			responseListener = responseListenerOrListeners.success;
			errorListener = responseListenerOrListeners.error;
		}
		
		(method === 'GET' || method === 'DELETE' ? fetch(url.substring(0, 5) === 'data:' ? url : url + '?' + paramStr, {
			method : method,
			credentials : location.protocol !== 'file:' && location.protocol.indexOf('-extension:') === -1 && host === BROWSER_CONFIG.host && port === BROWSER_CONFIG.port ? 'include' : undefined,
			headers : new Headers(headers === undefined ? {} : headers)
		}) : fetch(url, {
			method : method,
			body : paramStr,
			credentials : location.protocol !== 'file:' && location.protocol.indexOf('-extension:') === -1 && host === BROWSER_CONFIG.host && port === BROWSER_CONFIG.port ? 'include' : undefined,
			headers : new Headers(headers === undefined ? {} : headers)
		}))
		.then((response) => {
			if (response.status === 200) {
				return response.text();
			} else {
				let errorMsg = 'HTTP RESPONSE STATUS CODE: ' + response.status;

				if (errorListener !== undefined) {
					errorListener(errorMsg, response.status);
				} else {
					SHOW_ERROR('REQUEST', errorMsg, params);
				}
			}
		}, (error) => {
			
			let errorMsg = error.toString();

			if (errorListener !== undefined) {
				errorListener(errorMsg);
			} else {
				SHOW_ERROR('REQUEST', errorMsg, params);
			}
			
			responseListener = undefined;
		})
		.then((responseText) => {
			if (responseText !== undefined && responseListener !== undefined) {
				responseListener(responseText);
			}
		});
	}
});
/*
 * URI를 변경하여 다른 뷰로 이동합니다.
 */
global.GO = METHOD((m) => {
	
	let isCTRLKeyDown;

	return {
		
		run : (uriOrParams) => {
			//REQUIRED: uriOrParams
			//REQUIRED: uriOrParams.uri
			//OPTIONAL: uriOrParams.data
			
			let uri;
			let data;
			
			if (CHECK_IS_DATA(uriOrParams) !== true) {
				uri = uriOrParams;
			} else {
				uri = uriOrParams.uri;
				data = uriOrParams.data;
			}
			
			if (isCTRLKeyDown === undefined) {
				isCTRLKeyDown = false;
				
				EVENT('keydown', (e) => {
					if (e.getKey() === 'Control') {
						isCTRLKeyDown = true;
					}
				});
				
				EVENT('keyup', (e) => {
					if (e.getKey() === 'Control') {
						isCTRLKeyDown = false;
					}
				});
			}
			
			if (isCTRLKeyDown === true) {
				
				GO_NEW_WIN(uri);
				
				isCTRLKeyDown = false;
			}
			
			else {
				
				MATCH_VIEW.setURIData(data);
				
				// when protocol is 'file:' or extension, use hashbang.
				if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {
					location.href = HREF(uri);
				} else {
					history.pushState(undefined, undefined, HREF(uri));
				}
				
				MATCH_VIEW.checkAll();
			}
		}
	};
});

FOR_BOX((box) => {

	box.GO = METHOD({

		run : (uriOrParams) => {
			//REQUIRED: uriOrParams
			//REQUIRED: uriOrParams.uri
			//OPTIONAL: uriOrParams.data
			
			let uri;
			let data;
			
			if (CHECK_IS_DATA(uriOrParams) !== true) {
				uri = uriOrParams;
			} else {
				uri = uriOrParams.uri;
				data = uriOrParams.data;
			}

			GO({
				uri : (box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri,
				data : data
			});
		}
	});
});

/*
 * 새 창에서 URI에 해당하는 뷰를 띄웁니다.
 */
global.GO_NEW_WIN = METHOD({

	run : (uri) => {
		//REQUIRED: uri

		global.open(HREF(uri));
	}
});

FOR_BOX((box) => {

	box.GO_NEW_WIN = METHOD({

		run : (uri) => {
			//REQUIRED: uri

			GO_NEW_WIN((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});

/*
 * URI로부터 주소를 생성하여 반환합니다.
 */
global.HREF = METHOD({

	run : (uri) => {
		//REQUIRED: uri

		// when protocol is 'file:' or extension, use hashbang.
		if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {
			return '#!/' + uri;
		} else {
			return '/' + uri;
		}
	}
});

FOR_BOX((box) => {

	box.HREF = METHOD({

		run : (uri) => {
			//OPTIONAL: uri

			return HREF((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});

/*
 * 특정 URI와 뷰를 연결합니다.
 */
global.MATCH_VIEW = METHOD((m) => {
	
	let changeURIHandlers = [];
	let uriData;
	
	let checkAll = m.checkAll = () => {
		EACH(changeURIHandlers, (changeURIHandler) => {
			changeURIHandler();
		});
	};
	
	let setURIData = m.setURIData = (_uriData) => {
		uriData = _uriData;
	};
	
	return {

		run : (params) => {
			//REQUIRED: params
			//REQUIRED: params.uri
			//OPTIONAL: params.excludeURI
			//REQUIRED: params.target

			let uri = params.uri;
			let excludeURI = params.excludeURI;
			let target = params.target;
			
			let uriMatcher = URI_MATCHER(uri);
			let excludeURIMatcher = excludeURI === undefined ? undefined : URI_MATCHER(excludeURI);
	
			let view;
			let preParams;
			
			let changeURIHandler = () => {
	
				let uri = URI();
				let result;
	
				// when view founded
				if (
				uri !== REFRESH.getRefreshingURI() &&
				(result = uriMatcher.check(uri)).checkIsMatched() === true &&
				(excludeURI === undefined || excludeURIMatcher.check(uri).checkIsMatched() !== true)) {

					let uriParams = result.getURIParams();
	
					// when before view not exists, create view.
					if (view === undefined) {
	
						view = target(uriData);
						view.changeParams(uriParams);
						target.lastView = view;
	
						preParams = uriParams;
					}
	
					// when before view exists, change params.
					else if (CHECK_ARE_SAME([preParams, uriParams]) !== true) {
	
						view.changeParams(uriParams);
						preParams = uriParams;
					}
					
					view.runURIChangeHandlers(uri);
					
					DELAY(() => {
						uriData = undefined;
					});
				}
	
				// when view not founded, close before view
				else if (view !== undefined) {
	
					view.close();
	
					view = undefined;
					target.lastView = undefined;
				}
			};
			
			changeURIHandlers.push(changeURIHandler);
			
			// when protocol is 'file:' or extension, use hashbang.
			if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {
				EVENT('hashchange', () => {
					changeURIHandler();
				});
			}
			
			else {
				EVENT('popstate', () => {
					changeURIHandler();
				});
			}
			
			changeURIHandler();
		}
	};
});

FOR_BOX((box) => {

	box.MATCH_VIEW = METHOD({

		run : (params) => {
			//REQUIRED: params
			//REQUIRED: params.uri
			//OPTIONAL: params.excludeURI
			//REQUIRED: params.target

			let uri = params.uri;
			let excludeURI = params.excludeURI;
			let target = params.target;

			let newURIs = [];
			let newExcludeURIs = [];

			let pushURI = (uri) => {

				if (box.boxName === CONFIG.defaultBoxName) {
					newURIs.push(uri);
				}

				newURIs.push(box.boxName + '/' + uri);
				newURIs.push(box.boxName.toLowerCase() + '/' + uri);
			};

			let pushExcludeURI = (uri) => {

				if (box.boxName === CONFIG.defaultBoxName) {
					newExcludeURIs.push(uri);
				}

				newExcludeURIs.push(box.boxName + '/' + uri);
				newExcludeURIs.push(box.boxName.toLowerCase() + '/' + uri);
			};

			if (CHECK_IS_ARRAY(uri) === true) {
				EACH(uri, pushURI);
			} else {
				pushURI(uri);
			}
			
			if (excludeURI !== undefined) {
				if (CHECK_IS_ARRAY(excludeURI) === true) {
					EACH(excludeURI, pushExcludeURI);
				} else {
					pushExcludeURI(excludeURI);
				}
			}

			MATCH_VIEW({
				uri : newURIs,
				excludeURI : newExcludeURIs,
				target : target
			});
		}
	});
});

/*
 * 뷰를 새로 불러옵니다.
 */
global.REFRESH = METHOD((m) => {
	
	const REFRESHING_URI = '__REFRESHING';
	
	let getRefreshingURI = m.getRefreshingURI = () => {
		return REFRESHING_URI;
	};
	
	return {

		run : (uri) => {
			//OPTIONAL: uri
			
			// when protocol is 'file:' or extension, use hashbang.
			if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {
				
				let savedHash = uri !== undefined ? '#!/' + uri : location.hash;
		
				EVENT_ONCE({
					name : 'hashchange'
				}, () => {
					location.replace(savedHash === '' ? '#!/' : savedHash);
					
					if (savedHash !== '#!/' + uri) {
						history.back();
					}
				});
		
				location.href = '#!/' + getRefreshingURI();
			}
			
			else {
				
				let savedURI = uri !== undefined ? uri : location.pathname.substring(1);
		
				history.pushState(undefined, undefined, '/' + REFRESHING_URI);
				MATCH_VIEW.checkAll();
				
				history.replaceState(undefined, undefined, '/' + savedURI);
				MATCH_VIEW.checkAll();
				
				if (savedURI !== uri) {
					history.back();
				}
			}
		}
	};
});

FOR_BOX((box) => {

	box.REFRESH = METHOD({

		run : (uri) => {
			//OPTIONAL: uri
			
			REFRESH((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});

/*
 * 현재 브라우저의 URI를 가져옵니다.
 */
global.URI = METHOD({

	run : () => {
		
		// when protocol is 'file:' or extension, use hashbang.
		if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {
			return location.hash.substring(3);
		} else {
			return decodeURIComponent(location.pathname.substring(1));
		}
	}
});

/*
 * 뷰를 정의하기 위한 VIEW 클래스
 */
global.VIEW = CLASS({

	init : (inner, self) => {

		let isClosed = false;
		let paramsChangeHandlers = [];
		let uriChangeHandlers = [];
		let closeHandlers = [];
		
		let nowParams;
		let nowURI;

		let on = inner.on = (eventName, eventHandler) => {
			//REQUIRED: eventName
			//REQUIRED: eventHandler

			// when change params
			if (eventName === 'paramsChange') {
				paramsChangeHandlers.push(eventHandler);
				if (nowParams !== undefined) {
					eventHandler(nowParams);
				}
			}
			
			// when change uri
			if (eventName === 'uriChange') {
				uriChangeHandlers.push(eventHandler);
				if (nowURI !== undefined) {
					eventHandler(nowURI);
				}
			}

			// when close
			else if (eventName === 'close') {
				closeHandlers.push(eventHandler);
			}
		};

		let changeParams = self.changeParams = (params) => {
			
			nowParams = params;

			EACH(paramsChangeHandlers, (handler) => {
				handler(params);
			});
		};
		
		let runURIChangeHandlers = self.runURIChangeHandlers = (uri) => {
			
			nowURI = uri;
			
			EACH(uriChangeHandlers, (handler) => {
				handler(uri);
			});
		};

		let close = self.close = () => {

			EACH(closeHandlers, (handler) => {
				handler();
			});

			isClosed = true;
		};

		let checkIsClosed = inner.checkIsClosed = () => {
			return isClosed;
		};
		
		scrollTo(0, 0);
	}
});

/*
 * 가로 스크롤의 현재 위치를 픽셀 단위로 가져옵니다.
 */
global.SCROLL_LEFT = METHOD({

	run : () => {
		
		return global.pageXOffset;
	}
});

/*
 * 세로 스크롤의 현재 위치를 픽셀 단위로 가져옵니다.
 */
global.SCROLL_TOP = METHOD({

	run : () => {

		return global.pageYOffset;
	}
});

/*
 * 브라우저 창에 표시되는 문서의 제목을 가져오거나 변경합니다.
 */
global.TITLE = METHOD({

	run : (title) => {
		//OPTIONAL: title

		if (title === undefined) {
			return document.title;
		} else {
			document.title = title;
		}
	}
});

/*
 * 브라우저 창의 세로 길이를 픽셀 단위로 반환합니다.
 */
global.WIN_HEIGHT = METHOD({

	run : () => {

		return window.innerHeight;
	}
});

/*
 * 브라우저 창의 가로 길이를 픽셀 단위로 반환합니다.
 */
global.WIN_WIDTH = METHOD({

	run : () => {

		return document.documentElement.clientWidth;
	}
});
