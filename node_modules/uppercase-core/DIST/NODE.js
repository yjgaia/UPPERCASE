'use strict';

/*

Welcome to UPPERCASE-CORE! (http://uppercase.io)

*/

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

OVERRIDE(BOX, (origin) => {
	
	/*
	 * BOX를 생성합니다.
	 */
	global.BOX = METHOD((m) => {
		
		m.getAllBoxes = origin.getAllBoxes;
		
		return {
			
			run : (boxName) => {
				//REQUIRED: boxName
				
				if (NODE_CONFIG[boxName] === undefined) {
					NODE_CONFIG[boxName] = {};
				}
				
				return origin(boxName);
			}
		};
	});
});

/*
 * 운영체제의 언어 설정 코드에 해당하는 문자열을 반환합니다.
 * 
 * 만약 알 수 없는 언어 설정 코드라면, 첫 문자열을 반환합니다.
 */
OVERRIDE(MSG, (origin) => {
	
	global.MSG = METHOD((m) => {
		
		const OSLocale = require('os-locale');
		
		let osLang;
		
		OSLocale().then((_osLang) => {
			osLang = _osLang;
		});
		
		let msgData = {};
		
		let addData = m.addData = (data) => {
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
								if (j > 0) {
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
		
				let msg;
				
				if (osLang !== undefined) {
					msg = msgs[osLang];
					
					if (msg === undefined) {
						
						let lang;
						let locale;
						
						if (osLang.length == 2) {
							lang = osLang.toLowerCase();
						} else {
							lang = osLang.substring(0, 2).toLowerCase();
							locale = osLang.substring(3).toLowerCase();
						}
						
						msg = msgs[lang];
						
						if (msg !== undefined) {
							
							if (CHECK_IS_DATA(msg) === true) {
								if (msg[locale] !== undefined) {
									msg = msg[locale];
								} else {
									// get first msg.
									EACH(msg, (_msg) => {
										msg = _msg;
										return false;
									});
								}
							}
						}
					}
				}
				
				if (msg === undefined) {
					
					// get first msg.
					EACH(msgs, (_msg) => {
						msg = _msg;
						return false;
					});
				}
				
				if (msg !== undefined && CHECK_IS_DATA(msg) === true) {
					
					// get first msg.
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
 * Node.js 환경에서의 기본 설정
 */
global.NODE_CONFIG = {};

/*
 * CPU 코어 간 클러스터링을 수행합니다.
 */
global.CPU_CLUSTERING = METHOD((m) => {
	
	const CPU_COUNT = require('os').cpus().length;

	let Cluster = require('cluster');
	
	// 클러스터링을 수행하지 않을 경우 기본적으로 1개
	let workerCount = 1;
	
	// 클러스터링을 수행하지 않을 경우 기본적으로 1
	let thisWorkerId = 1;
	
	Cluster.schedulingPolicy = Cluster.SCHED_RR;
	
	let getWorkerCount = m.getWorkerCount = () => {
		return workerCount;
	};

	let getWorkerId = m.getWorkerId = () => {
		return thisWorkerId;
	};

	let checkIsMaster = m.checkIsMaster = () => {
		return Cluster.isMaster;
	};

	return {

		run : (work) => {
			//REQUIRED: work
			
			if (CPU_COUNT <= 1) {
				work();
			}
			
			else {
				
				let methodMap = {};
				let sendKey = 0;
				
				let innerSend;
	
				let runMethods = (methodName, data, sendKey, fromWorkerId) => {
					
					try {
						
						let methods = methodMap[methodName];
	
						if (methods !== undefined) {
		
							EACH(methods, (method) => {
		
								// run method.
								method(data,
		
								// ret.
								(retData) => {
		
									if (sendKey !== undefined) {
		
										send({
											workerId : fromWorkerId,
											methodName : '__CALLBACK_' + sendKey,
											data : retData
										});
									}
								});
							});
						}
					}
					
					// if catch error
					catch(error) {
						
						SHOW_ERROR('CPU_CLUSTERING', error.toString(), {
							methodName : methodName,
							data : data
						});
					}
				};
				
				// 워커 개수 (CPU 코어 개수보다 하나 적음, 하나는 마스터에게 배분)
				workerCount = CPU_COUNT - 1;
				
				// CPU 개수가 2개일 땐 워커 개수도 2개
				if (CPU_COUNT === 2) {
					workerCount = 2;
				}
				
				// 최소한 한개의 워커는 필요
				if (workerCount < 1) {
					workerCount = 1;
				}
				
				let on = m.on = (methodName, method) => {
	
					let methods = methodMap[methodName];
	
					if (methods === undefined) {
						methods = methodMap[methodName] = [];
					}
	
					methods.push(method);
				};
				
				let off = m.off = (methodName) => {
					delete methodMap[methodName];
				};
	
				let send = m.send = (params, callback) => {
					//REQUIRED: params
					//REQUIRED: params.workerId
					//REQUIRED: params.methodName
					//REQUIRED: params.data
					//OPTIONAL: callback
					
					let workerId = params.workerId;
					let methodName = params.methodName;
					let data = params.data;
					
					if (callback === undefined) {
						
						if (workerId === thisWorkerId) {
							runMethods(methodName, data);
						} else {
							innerSend({
								workerId : workerId,
								methodName : methodName,
								data : data
							});
						}
					}
					
					else {
						
						let callbackName = '__CALLBACK_' + sendKey;
						
						// on callback.
						on(callbackName, (data) => {
	
							// run callback.
							callback(data);
	
							// off callback.
							off(callbackName);
						});
						
						sendKey += 1;
						
						if (workerId === thisWorkerId) {
							runMethods(methodName, data, sendKey - 1, thisWorkerId);
						} else {
							innerSend({
								workerId : workerId,
								methodName : methodName,
								data : data,
								sendKey : sendKey - 1,
								fromWorkerId : thisWorkerId
							});
						}
					}
				};
				
				let broadcast = m.broadcast = (params) => {
					//REQUIRED: params
					//REQUIRED: params.methodName
					//REQUIRED: params.data
	
					innerSend({
						methodName : params.methodName,
						data : params.data
					});
				};
	
				// when master
				if (Cluster.isMaster === true) {
					
					// 마스터용 아이디
					thisWorkerId = '~';
					
					innerSend = (params) => {
						//REQUIRED: params
						//OPTIONAL: params.workerId
						//REQUIRED: params.methodName
						//REQUIRED: params.data
						//OPTIONAL: params.sendKey
						//OPTIONAL: params.fromWorkerId
						
						// send.
						if (params.workerId !== undefined) {
							
							let worker = Cluster.workers[params.workerId];
							
							if (worker !== undefined) {
								worker.send(PACK_DATA(params));
							}
						}
						
						// broadcast.
						else {
							
							// send params to all workers except new worker.
							EACH(Cluster.workers, (worker) => {
								worker.send(PACK_DATA(params));
							});
						}
					};
					
					// save shared data.
					on('__SHARED_STORE_SAVE', SHARED_STORE.save);
					
					// update shared data.
					on('__SHARED_STORE_UPDATE', SHARED_STORE.update);
	
					// get shared data.
					on('__SHARED_STORE_GET', SHARED_STORE.get);
	
					// remove shared data.
					on('__SHARED_STORE_REMOVE', SHARED_STORE.remove);
					
					// get all shared data.
					on('__SHARED_STORE_ALL', SHARED_STORE.all);
					
					// count shared data.
					on('__SHARED_STORE_COUNT', SHARED_STORE.count);
					
					// check exists shared data.
					on('__SHARED_STORE_CHECK_EXISTS', SHARED_STORE.checkExists);
	
					// clear shared store.
					on('__SHARED_STORE_CLEAR', SHARED_STORE.clear);
					
					// 워커 생성
					REPEAT(workerCount, () => {
						
						let newWorker = Cluster.fork();
						
						// receive params from new worker.
						newWorker.on('message', (params) => {
							
							// send.
							if (params.workerId !== undefined) {
								
								// for master
								if (params.workerId === '~') {
									
									params = UNPACK_DATA(params);
									
									runMethods(params.methodName, params.data, params.sendKey, params.fromWorkerId);
								}
								
								else {
									
									let worker = Cluster.workers[params.workerId];
									
									if (worker !== undefined) {
										worker.send(params);
									}
								}
							}
							
							// broadcast.
							else {
								
								// send params to all workers except new worker.
								EACH(Cluster.workers, (worker) => {
									if (worker !== newWorker) {
										worker.send(params);
									}
								});
							}
						});
					});
	
					Cluster.on('exit', (worker, code, signal) => {
						
						SHOW_ERROR('CPU_CLUSTERING', MSG({
							ko : '워커 ID:' + worker.id + '가 작동을 중지하였습니다. (코드:' + (signal !== undefined ? signal : code) + ')'
						}));
					});
				}
	
				// when worker
				else {
					
					thisWorkerId = Cluster.worker.id;
					
					innerSend = (params) => {
						//REQUIRED: params
						//OPTIONAL: params.workerId
						//REQUIRED: params.methodName
						//REQUIRED: params.data
						//OPTIONAL: params.sendKey
						//OPTIONAL: params.fromWorkerId
						
						process.send(PACK_DATA(params));
					};
					
					// receive data.
					process.on('message', (params) => {
						
						params = UNPACK_DATA(params);
						
						runMethods(params.methodName, params.data, params.sendKey, params.fromWorkerId);
					});
					
					work();
	
					console.log('[CPU_CLUSTERING] ' + MSG({
						ko : '클러스터링 워커가 실행중입니다. (PID: ' + process.pid + ' / 워커 ID:' + thisWorkerId + ')'
					}));
				}
			}
		}
	};
});

/*
 * 복잡도 파라미터(complexity)를 기준으로, 클러스터링 된 서버들 및 CPU 코어들에게 작업을 고르게 분배합니다.
 * 
 * complexity를 입력하지 않으면 기본적으로 1로 인식합니다.
 */
global.DISTRIBUTE_PROCESS = METHOD((m) => {
	
	let complexityMap = {};

	return {

		run : (paramsOrComplexity, work) => {
			//OPTIONAL: paramsOrComplexity
			//OPTIONAL: paramsOrComplexity.tag
			//OPTIONAL: paramsOrComplexity.complexity
			//REQUIRED: work
			
			let tag;
			let complexity;
			
			if (work === undefined) {
				work = paramsOrComplexity;
				paramsOrComplexity = undefined;
			}
			
			if (CHECK_IS_DATA(paramsOrComplexity) !== true) {
				complexity = paramsOrComplexity;
			} else {
				tag = paramsOrComplexity.tag;
				complexity = paramsOrComplexity.complexity;
			}
			
			if (complexity === undefined) {
				complexity = 1;
			}
			
			let selectedServerName;
			
			// 복잡도가 가장 낮은 서버를 찾습니다.
			if (SERVER_CLUSTERING.getHosts !== undefined) {
				
				let minComplexity = Infinity;
				EACH(SERVER_CLUSTERING.getHosts(), (host, serverName) => {
					if (complexityMap['__SERVER_' + serverName] === undefined) {
						complexityMap['__SERVER_' + serverName] = 0;
					}
					if (complexityMap['__SERVER_' + serverName] < minComplexity) {
						minComplexity = complexityMap['__SERVER_' + serverName];
						selectedServerName = serverName; 
					}
				});
				
				complexityMap['__SERVER_' + selectedServerName] += complexity;
			}
			
			if (
			// 서버 클러스터링을 하지 않는 경우
			SERVER_CLUSTERING.getThisServerName === undefined ||
			// 복잡도가 가장 낮은 서버가 현재 서버인 경우
			selectedServerName === SERVER_CLUSTERING.getThisServerName()) {
				
				let selectedWorkerId;
				
				// 복잡도가 가장 낮은 CPU를 찾습니다.
				let minComplexity = Infinity;
				REPEAT(CPU_CLUSTERING.getWorkerCount(), (i) => {
					let workerId = i + 1;
					if (complexityMap['__CPU_' + workerId] === undefined) {
						complexityMap['__CPU_' + workerId] = 0;
					}
					if (complexityMap['__CPU_' + workerId] < minComplexity) {
						minComplexity = complexityMap['__CPU_' + workerId];
						selectedWorkerId = workerId; 
					}
				});
				
				complexityMap['__CPU_' + selectedWorkerId] += complexity;
				
				// 최종적으로 선택된 CPU에서 작업 수행
				if (CPU_CLUSTERING.getWorkerId() === selectedWorkerId) {
					console.log('[DISTRIBUTE_PROCESS] ' + (tag === undefined ? '' : '[' + tag + '] ') + MSG({
						ko : '프로세스를 분산합니다. (PID: ' + process.pid + ')'
					}));
					work();
				}
			}
		}
	};
});

/*
 * 서버 간 클러스터링을 수행합니다.
 */
global.SERVER_CLUSTERING = METHOD((m) => {

	return {

		run : (params, work) => {
			//REQUIRED: params
			//REQUIRED: params.hosts
			//REQUIRED: params.thisServerName
			//REQUIRED: params.port
			//OPTIONAL: work

			let hosts = params.hosts;
			let thisServerName = params.thisServerName;
			let port = params.port;
			
			let methodMap = {};
			let isConnectings = {};
			let waitingSendInfoMap = {};
			let serverSends = {};
			let socketServeOns = [];
			
			let runMethods = (methodName, data, callback) => {

				try {
					
					let methods = methodMap[methodName];

					if (methods !== undefined) {
	
						EACH(methods, (method) => {
	
							// run method.
							method(data,
	
							// ret.
							callback);
						});
					}
				}
				
				// if catch error
				catch(error) {
					
					SHOW_ERROR('SERVER_CLUSTERING', error.toString(), {
						methodName : methodName,
						data : data
					});
				}
			};

			let connectToClusteringServer = (serverName) => {

				if (isConnectings[serverName] !== true) {
					isConnectings[serverName] = true;
					
					if (waitingSendInfoMap[serverName] === undefined) {
						waitingSendInfoMap[serverName] = [];
					}

					CONNECT_TO_SOCKET_SERVER({
						host : hosts[serverName],
						port : port
					}, {
						error : () => {
							delete isConnectings[serverName];
						},

						success : (on, off, send) => {

							send({
								methodName : '__BOOTED',
								data : thisServerName
							});

							serverSends[serverName] = (params, callback) => {
								//REQUIRED: params
								//REQUIRED: params.methodName
								//REQUIRED: params.data

								let methodName = params.methodName;
								let data = params.data;
								
								send({
									methodName : 'SERVER_CLUSTERING.' + methodName,
									data : data
								}, callback);
							};

							on('__DISCONNECTED', () => {
								delete serverSends[serverName];
								delete isConnectings[serverName];
								
								SHOW_ERROR('SERVER_CLUSTERING', MSG({
									ko : '클러스터링 서버와의 연결이 끊어졌습니다. (끊어진 서버 이름:' + serverName + ')'
								}));
							});

							console.log('[SERVER_CLUSTERING] ' + MSG({
								ko : '클러스터링 서버와 연결되었습니다. (연결된 서버 이름:' + serverName + ')'
							}));

							if (CPU_CLUSTERING.broadcast !== undefined) {

								CPU_CLUSTERING.broadcast({
									methodName : '__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER',
									data : serverName
								});
							}
							
							EACH(waitingSendInfoMap[serverName], (info) => {
								serverSends[serverName]({
									methodName : info.methodName,
									data : info.data
								}, info.callback);
							});
							
							delete waitingSendInfoMap[serverName];
						}
					});
				}
			};

			if (CPU_CLUSTERING.on !== undefined) {
				CPU_CLUSTERING.on('__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER', connectToClusteringServer);
			}

			// try connect to all clustering hosts.
			EACH(hosts, (host, serverName) => {
				if (serverName !== thisServerName) {
					connectToClusteringServer(serverName);
				}
			});

			SOCKET_SERVER(port, (clientInfo, socketServeOn) => {
				
				let serverName;

				socketServeOns.push(socketServeOn);

				socketServeOn('__BOOTED', (_serverName) => {
					
					serverName = _serverName;
					
					connectToClusteringServer(serverName);
				});

				EACH(methodMap, (methods, methodName) => {
					EACH(methods, (method) => {
						socketServeOn('SERVER_CLUSTERING.' + methodName, method);
					});
				});

				socketServeOn('__DISCONNECTED', () => {
					
					REMOVE({
						array : socketServeOns,
						value : socketServeOn
					});
					
					SHOW_ERROR('SERVER_CLUSTERING', MSG({
						ko : '클러스터링 서버와의 연결이 끊어졌습니다. (끊어진 서버 이름:' + serverName + ')'
					}));
				});
			});

			let getHosts = m.getHosts = () => {
				return hosts;
			};
			
			let getThisServerName = m.getThisServerName = () => {
				return thisServerName;
			};
			
			let on = m.on = (methodName, method) => {

				let methods = methodMap[methodName];

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);

				EACH(socketServeOns, (socketServeOn) => {
					socketServeOn('SERVER_CLUSTERING.' + methodName, method);
				});
			};

			// save shared data.
			on('__SHARED_STORE_SAVE', (params, ret) => {
				
				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_SAVE',
						data : params
					}, ret);
				}
				
				else {
					SHARED_STORE.save(params, ret);
				}
			});
			
			// update shared data.
			on('__SHARED_STORE_UPDATE', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_UPDATE',
						data : params
					}, ret);
				}
				
				else {
					SHARED_STORE.update(params, ret);
				}
			});
			
			// get shared data.
			on('__SHARED_STORE_GET', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_GET',
						data : params
					}, ret);
				}
				
				else {
					SHARED_STORE.get(params, ret);
				}
			});

			// remove shared data.
			on('__SHARED_STORE_REMOVE', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_REMOVE',
						data : params
					}, ret);
				}
				
				else {
					SHARED_STORE.remove(params, ret);
				}
			});

			// get all shared data.
			on('__SHARED_STORE_ALL', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_ALL',
						data : params
					}, ret);
				}
				
				else {
					SHARED_STORE.all(params, ret);
				}
			});

			// count shared data.
			on('__SHARED_STORE_COUNT', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_COUNT',
						data : params
					}, ret);
				}
				
				else {
					SHARED_STORE.count(params, ret);
				}
			});

			// check exists shared data.
			on('__SHARED_STORE_CHECK_EXISTS', (params, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_CHECK_EXISTS',
						data : params
					}, ret);
				}
				
				else {
					SHARED_STORE.checkExists(params, ret);
				}
			});

			// clear shared store.
			on('__SHARED_STORE_CLEAR', (storeName, ret) => {

				if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_CLEAR',
						data : storeName
					}, ret);
				}
				
				else {
					SHARED_STORE.clear(storeName, ret);
				}
			});

			let off = m.off = (methodName) => {
				delete methodMap[methodName];
			};

			let send = m.send = (params, callback) => {
				//REQUIRED: params
				//REQUIRED: params.serverName
				//REQUIRED: params.methodName
				//REQUIRED: params.data
				//OPTIONAL: callback
				
				let serverName = params.serverName;
				let methodName = params.methodName;
				let data = params.data;
				
				if (callback === undefined) {
					
					if (serverName === thisServerName) {
						runMethods(methodName, data);
					}
					
					else if (serverSends[serverName] === undefined) {
						if (waitingSendInfoMap[serverName] !== undefined) {
							waitingSendInfoMap[serverName].push({
								methodName : methodName,
								data : data
							});
						} else {
							SHOW_ERROR('SERVER_CLUSTERING', MSG({
								ko : '[' + serverName + ']라는 서버는 존재하지 않습니다.'
							}));
						}
					}
					
					else {
						serverSends[serverName]({
							methodName : methodName,
							data : data
						});
					}
				}
				
				else {
					
					if (serverName === thisServerName) {
						runMethods(methodName, data, callback);
					}
					
					else if (serverSends[serverName] === undefined) {
						if (waitingSendInfoMap[serverName] !== undefined) {
							waitingSendInfoMap[serverName].push({
								methodName : methodName,
								data : data,
								callback : callback
							});
						} else {
							SHOW_ERROR('SERVER_CLUSTERING', MSG({
								ko : '[' + serverName + ']라는 서버는 존재하지 않습니다.'
							}));
						}
					}
					
					else {
						serverSends[serverName]({
							methodName : methodName,
							data : data
						}, callback);
					}
				}
			};

			let broadcast = m.broadcast = (params) => {
				//REQUIRED: params
				//REQUIRED: params.methodName
				//REQUIRED: params.data

				EACH(serverSends, (serverSend) => {
					serverSend(params);
				});
			};

			if (work !== undefined) {
				work();
			}

			console.log(CONSOLE_BLUE('[SERVER_CLUSTERING] ' + MSG({
				ko : '클러스터링 서버가 실행중입니다. (현재 서버 이름:' + thisServerName + ', 포트:' + port + ')'
			})));
		}
	};
});

/*
 * 클러스터링 공유 저장소를 생성하는 클래스
 */
global.SHARED_STORE = CLASS((cls) => {
	
	let Sift = require('sift').default;

	let storages = {};
	let removeDelayMap = {};
	
	let getStorages = cls.getStorages = () => {
		return storages;
	};

	let save = cls.save = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//REQUIRED: params.data
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: callback

		let storeName = params.storeName;
		let id = params.id;
		let data = params.data;
		let removeAfterSeconds = params.removeAfterSeconds;
		
		let storage = storages[storeName];
		let removeDelays = removeDelayMap[storeName];
		
		if (storage === undefined) {
			storage = storages[storeName] = {};
		}

		storage[id] = data;
		
		if (removeDelays === undefined) {
			removeDelays = removeDelayMap[storeName] = {};
		}

		if (removeDelays[id] !== undefined) {
			removeDelays[id].remove();
			delete removeDelays[id];
		}

		if (removeAfterSeconds !== undefined) {
			removeDelays[id] = DELAY(removeAfterSeconds, () => {
				remove({
					storeName : storeName,
					id : id
				});
			});
		}
		
		if (callback !== undefined) {
			callback(data);
		}
	};
	
	let update = cls.update = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//REQUIRED: params.data
		//OPTIONAL: params.data.$inc
		//OPTIONAL: params.data.$push
		//OPTIONAL: params.data.$addToSet
		//OPTIONAL: params.data.$pull
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: callback

		let storeName = params.storeName;
		let id = params.id;
		let data = COPY(params.data);
		let $inc = data.$inc;
		let $push = data.$push;
		let $addToSet = data.$addToSet;
		let $pull = data.$pull;
		let removeAfterSeconds = params.removeAfterSeconds;
		
		let storage = storages[storeName];
		let removeDelays = removeDelayMap[storeName];
		let savedData;
		
		if (storage === undefined) {
			storage = storages[storeName] = {};
		}
		
		delete data.$inc;
		delete data.$push;
		delete data.$addToSet;
		delete data.$pull;
		
		savedData = storage[id];
		
		if (savedData !== undefined) {
			
			EXTEND({
				origin : savedData,
				extend : data
			});
			
			EACH(data, (value, name) => {
				if (value === TO_DELETE) {
					delete savedData[name];
				}
			});
			
			if ($inc !== undefined) {
				EACH($inc, (value, name) => {
					savedData[name] += value;
				});
			}
			
			if ($push !== undefined) {
				
				EACH($push, (value, name) => {
					
					if (CHECK_IS_ARRAY(savedData[name]) === true) {
						
						if (CHECK_IS_DATA(value) === true) {
							
							if (value.$each !== undefined) {
								
								EACH(value.$each, (v, i) => {
									if (value.$position !== undefined) {
										savedData[name].splice(value.$position + i, 0, v);
									} else {
										savedData[name].push(v);
									}
								});
								
							} else {
								savedData[name].push(value);
							}
							
						} else {
							savedData[name].push(value);
						}
					}
				});
			}
			
			if ($addToSet !== undefined) {
				
				EACH($addToSet, (value, name) => {
					
					if (CHECK_IS_ARRAY(savedData[name]) === true) {
						
						if (CHECK_IS_DATA(value) === true) {
							
							if (value.$each !== undefined) {
								
								EACH(value.$each, (value) => {
									if (CHECK_IS_IN({
										array : savedData[name],
										value : value
									}) !== true) {
										savedData[name].push(value);
									}
								});
								
							} else if (CHECK_IS_IN({
								array : savedData[name],
								value : value
							}) !== true) {
								savedData[name].push(value);
							}
							
						} else if (CHECK_IS_IN({
							array : savedData[name],
							value : value
						}) !== true) {
							savedData[name].push(value);
						}
					}
				});
			}
			
			if ($pull !== undefined) {
				
				EACH($pull, (value, name) => {
					
					if (CHECK_IS_ARRAY(savedData[name]) === true) {
						
						REMOVE({
							array : savedData[name],
							value : value
						});
					}
				});
			}
			
			if (removeDelays === undefined) {
				removeDelays = removeDelayMap[storeName] = {};
			}
	
			if (removeDelays[id] !== undefined) {
				removeDelays[id].remove();
				delete removeDelays[id];
			}
	
			if (removeAfterSeconds !== undefined) {
				removeDelays[id] = DELAY(removeAfterSeconds, () => {
					remove({
						storeName : storeName,
						id : id
					});
				});
			}
		}
		
		if (callback !== undefined) {
			callback(savedData);
		}
	};

	let get = cls.get = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//REQUIRED: callback
		
		let storeName = params.storeName;
		let id = params.id;
		let storage = storages[storeName];
		
		let savedData;
		
		if (storage !== undefined) {
			savedData = storage[id];
		}
		
		callback(savedData);
	};

	let remove = cls.remove = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.id
		//OPTIONAL: callback
		
		let storeName = params.storeName;
		let id = params.id;
		
		let storage = storages[storeName];
		let removeDelays = removeDelayMap[storeName];
		
		let originData;
		
		if (storage !== undefined) {
			originData = storage[id];
			
			delete storage[id];
		}

		if (removeDelays !== undefined && removeDelays[id] !== undefined) {
			removeDelays[id].remove();
			delete removeDelays[id];
		}
		
		if (callback !== undefined) {
			callback(originData);
		}
	};
	
	let all = cls.all = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//OPTIONAL: params.filter
		//REQUIRED: callback
		
		let storeName = params.storeName;
		let filter = params.filter;
		
		let storage = storages[storeName];
		
		if (storage === undefined) {
			callback({});
		}
		
		else if (filter === undefined) {
			callback(storage);
		}
		
		else {
			
			let result = {};
			
			EACH(storage, (data, id) => {
				if (Sift(filter)(data) === true) {
					result[id] = data;
				}
			});
			
			callback(result);
		}
	};
	
	let count = cls.count = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//OPTIONAL: params.filter
		//REQUIRED: callback
		
		all(params, (dataSet) => {
			callback(COUNT_PROPERTIES(dataSet));
		});
	};

	let checkExists = cls.checkExists = (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//OPTIONAL: params.id
		//OPTIONAL: params.filter
		//REQUIRED: callback
		
		let storeName = params.storeName;
		let id = params.id;
		let filter = params.filter;
		
		let storage = storages[storeName];
		
		if (storage === undefined) {
			callback(false);
		}
		
		else if (id !== undefined) {
			callback(storage[id] !== undefined);
		}
		
		else if (filter !== undefined) {
			
			// 중간에 멈추면, 해당하는 값이 존재한다.
			callback(EACH(storage, (data) => {
				if (Sift(filter)(data) === true) {
					return false;
				}
			}) !== true);
		}
		
		else {
			callback(false);
		}
	};
	
	let clear = cls.clear = (storeName, callback) => {
		//REQUIRED: storeName
		//OPTIONAL: callback
		
		delete storages[storeName];
		
		if (callback !== undefined) {
			callback();
		}
	};

	return {

		init : (inner, self, storeName) => {
			//REQUIRED: storeName
			
			let serverName;
			
			let a = 0;
			
			REPEAT(storeName.length, (i) => {
				a += storeName.charCodeAt(i);
			});
			
			if (SERVER_CLUSTERING.getHosts !== undefined) {
				
				let serverNames = [];
				
				EACH(SERVER_CLUSTERING.getHosts(), (host, serverName) => {
					serverNames.push(serverName);
				});
				
				serverName = serverNames[a % serverNames.length];
			}

			let save = self.save = (params, callback) => {
				//REQUIRED: params
				//REQUIRED: params.id
				//REQUIRED: params.data
				//OPTIONAL: params.removeAfterSeconds
				//OPTIONAL: callback

				let id = params.id;
				let data = params.data;
				let removeAfterSeconds = params.removeAfterSeconds;
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_SAVE',
						data : {
							storeName : storeName,
							id : id,
							data : data,
							removeAfterSeconds : removeAfterSeconds
						}
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_SAVE',
						data : {
							storeName : storeName,
							id : id,
							data : data,
							removeAfterSeconds : removeAfterSeconds
						}
					}, callback);
				}
				
				else {
					
					cls.save({
						storeName : storeName,
						id : id,
						data : data,
						removeAfterSeconds : removeAfterSeconds
					}, callback);
				}
			};
			
			let update = self.update = (params, callbackOrHandlers) => {
				//REQUIRED: params
				//REQUIRED: params.id
				//REQUIRED: params.data
				//OPTIONAL: params.data.$inc
				//OPTIONAL: params.data.$push
				//OPTIONAL: params.data.$addToSet
				//OPTIONAL: params.data.$pull
				//OPTIONAL: params.removeAfterSeconds
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.success

				let id = params.id;
				let data = params.data;
				let removeAfterSeconds = params.removeAfterSeconds;
				
				let notExistsHandler;
				let callback;
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						notExistsHandler = callbackOrHandlers.notExists;
						callback = callbackOrHandlers.success;
					}
				}
				
				let innerCallback = (savedData) => {
					if (savedData === undefined) {
						if (notExistsHandler !== undefined) {
							notExistsHandler();
						} else {
							SHOW_WARNING('SHARED_STORE (' + storeName + ')', MSG({
								ko : '수정할 데이터가 존재하지 않습니다.'
							}), params);
						}
					} else if (callback !== undefined) {
						callback(savedData);
					}
				};
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_UPDATE',
						data : {
							storeName : storeName,
							id : id,
							data : data,
							removeAfterSeconds : removeAfterSeconds
						}
					}, innerCallback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_UPDATE',
						data : {
							storeName : storeName,
							id : id,
							data : data,
							removeAfterSeconds : removeAfterSeconds
						}
					}, innerCallback);
				}
				
				else {
					
					cls.update({
						storeName : storeName,
						id : id,
						data : data,
						removeAfterSeconds : removeAfterSeconds
					}, innerCallback);
				}
			};

			let get = self.get = (id, callbackOrHandlers) => {
				//REQUIRED: id
				//REQUIRED: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.success
				
				let notExistsHandler;
				let callback;
				
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notExistsHandler = callbackOrHandlers.notExists;
					callback = callbackOrHandlers.success;
				}
				
				let innerCallback = (savedData) => {
					if (savedData === undefined) {
						if (notExistsHandler !== undefined) {
							notExistsHandler();
						} else {
							SHOW_WARNING('SHARED_STORE (' + storeName + ')', MSG({
								ko : '가져올 데이터가 존재하지 않습니다.'
							}), id);
						}
					} else if (callback !== undefined) {
						callback(savedData);
					}
				};
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_GET',
						data : {
							storeName : storeName,
							id : id
						}
					}, innerCallback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_GET',
						data : {
							storeName : storeName,
							id : id
						}
					}, innerCallback);
				}
				
				else {
					
					cls.get({
						storeName : storeName,
						id : id
					}, innerCallback);
				}
			};

			let remove = self.remove = (id, callbackOrHandlers) => {
				//REQUIRED: id
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.success
				
				let notExistsHandler;
				let callback;
				
				if (callbackOrHandlers !== undefined) {
					if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
						callback = callbackOrHandlers;
					} else {
						notExistsHandler = callbackOrHandlers.notExists;
						callback = callbackOrHandlers.success;
					}
				}
				
				let innerCallback = (originData) => {
					if (originData === undefined) {
						if (notExistsHandler !== undefined) {
							notExistsHandler();
						} else {
							SHOW_WARNING('SHARED_STORE (' + storeName + ')', MSG({
								ko : '삭제할 데이터가 존재하지 않습니다.'
							}), id);
						}
					} else if (callback !== undefined) {
						callback(originData);
					}
				};

				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_REMOVE',
						data : {
							storeName : storeName,
							id : id
						}
					}, innerCallback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_REMOVE',
						data : {
							storeName : storeName,
							id : id
						}
					}, innerCallback);
				}
				
				else {
					
					cls.remove({
						storeName : storeName,
						id : id
					}, innerCallback);
				}
			};
			
			let all = self.all = (filter, callback) => {
				//OPTIONAL: filter
				//REQUIRED: callback
				
				if (callback === undefined) {
					callback = filter;
					filter = undefined;
				}
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_ALL',
						data : {
							storeName : storeName,
							filter : filter
						}
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_ALL',
						data : {
							storeName : storeName,
							filter : filter
						}
					}, callback);
				}
				
				else {
					cls.all({
						storeName : storeName,
						filter : filter
					}, callback);
				}
			};
			
			let count = self.count = (filter, callback) => {
				//OPTIONAL: filter
				//REQUIRED: callback
				
				if (callback === undefined) {
					callback = filter;
					filter = undefined;
				}
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_COUNT',
						data : {
							storeName : storeName,
							filter : filter
						}
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_COUNT',
						data : {
							storeName : storeName,
							filter : filter
						}
					}, callback);
				}
				
				else {
					cls.count({
						storeName : storeName,
						filter : filter
					}, callback);
				}
			};
			
			let checkExists = self.checkExists = (idOrFilter, callback) => {
				//REQUIRED: idOrFilter
				//REQUIRED: callback
				
				let id;
				let filter;
				
				if (CHECK_IS_DATA(idOrFilter) !== true) {
					id = idOrFilter;
				} else {
					filter = idOrFilter;
				}
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_CHECK_EXISTS',
						data : {
							storeName : storeName,
							id : id,
							filter : filter
						}
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_CHECK_EXISTS',
						data : {
							storeName : storeName,
							id : id,
							filter : filter
						}
					}, callback);
				}
				
				else {
					cls.checkExists({
						storeName : storeName,
						id : id,
						filter : filter
					}, callback);
				}
			};
			
			let clear = self.clear = (callback) => {
				//OPTIONAL: callback
				
				if (SERVER_CLUSTERING.send !== undefined) {

					SERVER_CLUSTERING.send({
						serverName : serverName,
						methodName : '__SHARED_STORE_CLEAR',
						data : storeName
					}, callback);
				}

				else if (CPU_CLUSTERING.send !== undefined) {

					CPU_CLUSTERING.send({
						workerId : '~',
						methodName : '__SHARED_STORE_CLEAR',
						data : storeName
					}, callback);
				}
				
				else {
					cls.clear(storeName, callback);
				}
			};
		}
	};
});

FOR_BOX((box) => {

	box.SHARED_STORE = CLASS({

		init : (inner, self, name) => {
			//REQUIRED: name

			let sharedStore = SHARED_STORE(box.boxName + '.' + name);

			let save = self.save = sharedStore.save;
			
			let update = self.update = sharedStore.update;
			
			let get = self.get = sharedStore.get;
			
			let remove = self.remove = sharedStore.remove;
			
			let all = self.all = sharedStore.all;
			
			let count = self.count = sharedStore.count;
			
			let checkExists = self.checkExists = sharedStore.checkExists;
			
			let clear = self.clear = sharedStore.clear;
		}
	});
});

/*
 * 콘솔에 표시할 텍스트를 파란색으로 설정합니다.
 */
global.CONSOLE_BLUE = METHOD({

	run : (text) => {
		//REQUIRED: text

		return '[36m' + text + '[0m';
	}
});

/*
 * 콘솔에 표시할 텍스트를 초록색으로 설정합니다.
 */
global.CONSOLE_GREEN = METHOD({

	run : (text) => {
		//REQUIRED: text

		return '[32m' + text + '[0m';
	}
});

/*
 * 콘솔에 표시할 텍스트를 빨간색으로 설정합니다.
 */
global.CONSOLE_RED = METHOD({

	run : (text) => {
		//REQUIRED: text

		return '[31m' + text + '[0m';
	}
});

/*
 * 콘솔에 표시할 텍스트를 노란색으로 설정합니다.
 */
global.CONSOLE_YELLOW = METHOD({

	run : (text) => {
		//REQUIRED: text

		return '[33m' + text + '[0m';
	}
});

/*
 * 콘솔에 오류 메시지를 출력합니다.
 */
global.SHOW_ERROR = (tag, errorMsg, params) => {
	//REQUIRED: tag
	//REQUIRED: errorMsg
	//OPTIONAL: params
	
	let cal = CALENDAR();
	
	console.error(CONSOLE_RED(cal.getYear() + '-' + cal.getMonth(true) + '-' + cal.getDate(true) + ' ' + cal.getHour(true) + ':' + cal.getMinute(true) + ':' + cal.getSecond(true) + ' [' + tag + '] 오류가 발생했습니다. 오류 메시지: ' + errorMsg));
	
	if (params !== undefined) {
		console.error(CONSOLE_RED('다음은 오류를 발생시킨 파라미터입니다.'));
		console.error(CONSOLE_RED(JSON.stringify(params, TO_DELETE, 4)));
	}
};

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
/*
 * 콘솔에 경고 메시지를 출력합니다.
 */
global.SHOW_WARNING = (tag, warningMsg, params) => {
	//REQUIRED: tag
	//REQUIRED: warningMsg
	//OPTIONAL: params
	
	let cal = CALENDAR();
	
	console.error(CONSOLE_YELLOW(cal.getYear() + '-' + cal.getMonth(true) + '-' + cal.getDate(true) + ' ' + cal.getHour(true) + ':' + cal.getMinute(true) + ':' + cal.getSecond(true) + ' [' + tag + '] 경고가 발생했습니다. 경고 메시지: ' + warningMsg));
	
	if (params !== undefined) {
		console.error(CONSOLE_YELLOW('다음은 경고를 발생시킨 파라미터입니다.'));
		console.error(CONSOLE_YELLOW(JSON.stringify(params, TO_DELETE, 4)));
	}
};

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
		
		if (CHECK_IS_DATA(urlOrParams) !== true) {
			urlOrParams = {
				url : urlOrParams
			};
		}
		
		ENCRYPTION_REQUEST(COMBINE([{
			method : 'DELETE'
		}, urlOrParams]), responseListenerOrListeners);
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
		
		if (CHECK_IS_DATA(urlOrParams) !== true) {
			urlOrParams = {
				url : urlOrParams
			};
		}
		
		ENCRYPTION_REQUEST(COMBINE([{
			method : 'GET'
		}, urlOrParams]), responseListenerOrListeners);
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
		
		if (CHECK_IS_DATA(urlOrParams) !== true) {
			urlOrParams = {
				url : urlOrParams
			};
		}
		
		ENCRYPTION_REQUEST(COMBINE([{
			method : 'POST'
		}, urlOrParams]), responseListenerOrListeners);
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
		
		if (CHECK_IS_DATA(urlOrParams) !== true) {
			urlOrParams = {
				url : urlOrParams
			};
		}
		
		ENCRYPTION_REQUEST(COMBINE([{
			method : 'PUT'
		}, urlOrParams]), responseListenerOrListeners);
	}
});

/*
 * 암호화된 HTTP 요청을 보냅니다.
 */
global.ENCRYPTION_REQUEST = METHOD((m) => {

	let HTTP = require('http');
	let HTTPS = require('https');
	let URL = require('url');
	let Querystring = require('querystring');

	return {

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
			let isSecure = params.isSecure;
			let host = params.host;
			let port = params.port;
			let uri = params.uri;
			let url = params.url;
			let paramStr = params.paramStr;
			let _params = params.params;
			let data = params.data;
			let headers = params.headers;
			
			let errorListener;
			let responseListener;
			
			let urlData;
			let req;

			method = method.toUpperCase();
			
			if (url !== undefined) {
				urlData = URL.parse(url);
				
				host = urlData.hostname === TO_DELETE ? undefined : urlData.hostname;
				port = urlData.port === TO_DELETE ? undefined : INTEGER(urlData.port);
				isSecure = urlData.protocol === 'https:';
				uri = urlData.pathname === TO_DELETE ? undefined : urlData.pathname.substring(1);
				
				let urlParamStr = urlData.query === TO_DELETE ? undefined : urlData.query;
				
				if (urlParamStr !== undefined) {
					if (paramStr === undefined) {
						paramStr = urlParamStr;
					} else {
						paramStr = urlParamStr + '&' + paramStr;
					}
				}
			}
			
			if (port === undefined) {
				port = isSecure !== true ? 80 : 443;
			}

			if (uri !== undefined && uri.indexOf('?') !== -1) {
				paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				uri = uri.substring(0, uri.indexOf('?'));
			}
			
			if (_params !== undefined) {
				paramStr = (paramStr === undefined ? '' : paramStr + '&') + Querystring.stringify(_params).trim();
			}

			if (data !== undefined) {
				paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(data));
			}
			
			if (paramStr === undefined) {
				paramStr = '';
			}
			
			// 시드 값 삽입
			paramStr = (paramStr === '' ? paramStr : paramStr + '&') + '__SEED=' + UUID();
			
			// 파라미터 문자열 암호화
			paramStr = '__ENCRYPT=' + encodeURIComponent(ENCRYPT({
				password : paramStr,
				key : CONFIG.requestEncryptionKey
			}));
			
			if (responseListenerOrListeners !== undefined) {
				if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
					responseListener = responseListenerOrListeners;
				} else {
					errorListener = responseListenerOrListeners.error;
					responseListener = responseListenerOrListeners.success;
				}
			}

			// GET request.
			if (method === 'GET') {

				req = (isSecure !== true ? HTTP : HTTPS).get({
					rejectUnauthorized : false,
					hostname : host,
					port : port,
					path : '/' + (uri === undefined ? '' : uri) + '?' + paramStr,
					headers : headers
				}, (httpResponse) => {
					
					// redirect.
					if (httpResponse.statusCode === 301 || httpResponse.statusCode === 302) {
						
						GET(httpResponse.headers.location, {
							error : errorListener,
							success : responseListener
						});
						
						httpResponse.destroy();
					}
					
					else if (httpResponse.statusCode === 200) {
						
						let content = '';

						httpResponse.setEncoding('utf-8');
						httpResponse.on('data', (str) => {
							content += str;
						});
						httpResponse.on('end', () => {
							if (responseListener !== undefined) {
								responseListener(content, httpResponse.headers);
							}
						});
					}
					
					else {
						let errorMsg = 'HTTP RESPONSE STATUS CODE: ' + httpResponse.statusCode;
		
						if (errorListener !== undefined) {
							errorListener(errorMsg, httpResponse.statusCode);
						} else {
							SHOW_ERROR('ENCRYPTION_REQUEST', errorMsg, params);
						}
					}
				});
			}

			// other request.
			else {

				req = (isSecure !== true ? HTTP : HTTPS).request({
					rejectUnauthorized : false,
					hostname : host,
					port : port,
					path : '/' + (uri === undefined ? '' : uri) + (method === 'DELETE' ? '?' + paramStr : ''),
					method : method,
					headers : headers
				}, (httpResponse) => {
					
					if (httpResponse.statusCode === 200) {
						
						let content = '';
	
						httpResponse.setEncoding('utf-8');
						httpResponse.on('data', (str) => {
							content += str;
						});
						httpResponse.on('end', () => {
							if (responseListener !== undefined) {
								responseListener(content, httpResponse.headers);
							}
						});
					}
					
					else {
						let errorMsg = 'HTTP RESPONSE STATUS CODE: ' + httpResponse.statusCode;
		
						if (errorListener !== undefined) {
							errorListener(errorMsg, httpResponse.statusCode);
						} else {
							SHOW_ERROR('ENCRYPTION_REQUEST', errorMsg, params);
						}
					}
				});

				if (method !== 'DELETE') {
					req.write(paramStr);
				}
				req.end();
			}

			req.on('error', (error) => {

				let errorMsg = error.toString();

				if (errorListener !== undefined) {
					errorListener(errorMsg);
				} else {
					SHOW_ERROR('ENCRYPTION_REQUEST', errorMsg, params);
				}
			});
		}
	};
});

/*
 * 지정된 경로에 파일이나 폴더가 존재하는지 확인합니다.
 */
global.CHECK_FILE_EXISTS = METHOD(() => {

	let FS = require('fs');
	let Path = require('path');

	return {

		run : (pathOrParams, callback) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	확인할 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callback

			let path;
			let isSync;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			// when normal mode
			if (isSync !== true) {
				
				if (path === './') {
					callback(true);
				}
				
				else {
					
					FS.access(path, (error) => {
						
						if (error !== TO_DELETE) {
							callback(false);
						}
						
						else {
							
							FS.readdir(Path.dirname(path), (error, names) => {
	
								if (error !== TO_DELETE) {
									callback(false);
								}
								
								else {
	
									callback(CHECK_IS_IN({
										array : names,
										value : Path.basename(path)
									}));
								}
							});
						}
					});
				}
			}

			// when sync mode
			else {
				
				if (path === './') {
					
					if (callback !== undefined) {
						callback(true);
					}
					
					return true;
				}
				
				else {
					
					try {
	
						FS.accessSync(path);
						
						let result = CHECK_IS_IN({
							array : FS.readdirSync(Path.dirname(path)),
							value : Path.basename(path)
						});
						
						if (callback !== undefined) {
							callback(result);
						}
						
						return result;
	
					} catch(error) {
						
						if (callback !== undefined) {
							callback(false);
						}
						
						return false;
					}
				}
			}
		}
	};
});

/*
 * 지정된 경로가 (파일이 아닌) 폴더인지 확인합니다.
 */
global.CHECK_IS_FOLDER = METHOD(() => {

	let FS = require('fs');

	return {

		run : (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	확인할 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path;
			let isSync;
			
			let errorHandler;
			let callback;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}
			
			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			// when normal mode
			if (isSync !== true) {
				
				FS.stat(path, (error, stat) => {
					
					if (error !== TO_DELETE) {

						let errorMsg = error.toString();

						if (errorHandler !== undefined) {
							errorHandler(errorMsg, pathOrParams);
						} else {
							SHOW_ERROR('CHECK_IS_FOLDER', errorMsg, pathOrParams);
						}

					} else if (callback !== undefined) {
						callback(stat.isDirectory());
					}
				});
			}

			// when sync mode
			else {
				return FS.statSync(path).isDirectory();
			}
		}
	};
});

/*
 * 파일을 복사합니다.
 */
global.COPY_FILE = METHOD(() => {

	let FS = require('fs');
	let Path = require('path');

	return {

		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//REQUIRED: params.from		복사할 파일의 위치
			//REQUIRED: params.to		파일을 복사할 위치
			//OPTIONAL: params.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExistsHandler
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let from = params.from;
			let to = params.to;
			let isSync = params.isSync;
			
			let notExistsHandler;
			let errorHandler;
			let callback;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}
			
			if (from === to) {
				if (callback !== undefined) {
					callback();
				}
			}
			
			else {
				
				CREATE_FOLDER({
					path : Path.dirname(to),
					isSync : isSync
				}, {
	
					error : errorHandler,
	
					success : () => {
	
						// when normal mode
						if (isSync !== true) {
	
							CHECK_FILE_EXISTS(from, (exists) => {
	
								if (exists === true) {
	
									let reader = FS.createReadStream(from);
	
									reader.pipe(FS.createWriteStream(to));
	
									reader.on('error', (error) => {
	
										let errorMsg = error.toString();
	
										if (errorHandler !== undefined) {
											errorHandler(errorMsg, params);
										} else {
											SHOW_ERROR('COPY_FILE', errorMsg, params);
										}
									});
	
									reader.on('end', () => {
										if (callback !== undefined) {
											callback();
										}
									});
	
								} else {
	
									if (notExistsHandler !== undefined) {
										notExistsHandler(from);
									} else {
										SHOW_WARNING('COPY_FILE', MSG({
											ko : '파일이 존재하지 않습니다.'
										}), {
											from : from
										});
									}
								}
							});
						}
	
						// when sync mode
						else {
	
							RUN(() => {
	
								try {
	
									if (CHECK_FILE_EXISTS({
										path : from,
										isSync : true
									}) === true) {
	
										FS.writeFileSync(to, FS.readFileSync(from));
	
									} else {
	
										if (notExistsHandler !== undefined) {
											notExistsHandler(from);
										} else {
											SHOW_WARNING('COPY_FILE', MSG({
												ko : '파일이 존재하지 않습니다.'
											}), {
												from : from
											});
										}
	
										// do not run callback.
										return;
									}
	
								} catch(error) {
	
									if (error !== TO_DELETE) {
	
										let errorMsg = error.toString();
	
										if (errorHandler !== undefined) {
											errorHandler(errorMsg, params);
										} else {
											SHOW_ERROR('COPY_FILE', errorMsg, params);
										}
									}
								}
	
								if (callback !== undefined) {
									callback();
								}
							});
						}
					}
				});
			}
		}
	};
});

/*
 * 폴더를 복사합니다.
 */
global.COPY_FOLDER = METHOD(() => {

	let FS = require('fs');

	return {

		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//REQUIRED: params.from		복사할 폴더의 위치
			//REQUIRED: params.to		폴더를 복사할 위치
			//OPTIONAL: params.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let from = params.from;
			let to = params.to;
			let isSync = params.isSync;
			
			let notExistsHandler;
			let errorHandler;
			let callback;
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				notExistsHandler = callbackOrHandlers.notExists;
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}
			
			if (from === to) {
				if (callback !== undefined) {
					callback();
				}
			}
			
			else {
				
				// when normal mode
				if (isSync !== true) {
	
					CHECK_FILE_EXISTS(from, (exists) => {
	
						if (exists === true) {
							
							NEXT([
							(next) => {
								
								FIND_FILE_NAMES(from, (fileNames) => {
									
									NEXT(fileNames, [
									(fileName, next) => {
										COPY_FILE({
											from : from + '/' + fileName,
											to : to + '/' + fileName
										}, next);
									},
									
									() => {
										next(fileNames.length);
									}]);
								});
							},
							
							(next) => {
								return (count) => {
									
									FIND_FOLDER_NAMES(from, (folderNames) => {
										
										PARALLEL(folderNames, [
										(folderName, done) => {
											COPY_FOLDER({
												from : from + '/' + folderName,
												to : to + '/' + folderName
											}, done);
										},
										
										() => {
											next(count + folderNames.length);
										}]);
									});
								};
							},
							
							() => {
								return (count) => {
									
									// 빈 폴더면 폴더 생성
									if (count === 0) {
										CREATE_FOLDER(to, () => {
											if (callback !== undefined) {
												callback();
											}
										});
									}
									
									else if (callback !== undefined) {
										callback();
									}
								};
							}]);
	
						} else {
	
							if (notExistsHandler !== undefined) {
								notExistsHandler(from);
							} else {
								SHOW_WARNING('COPY_FOLDER', MSG({
									ko : '폴더가 존재하지 않습니다.'
								}), {
									from : from
								});
							}
						}
					});
				}
	
				// when sync mode
				else {
	
					RUN(() => {
	
						try {
	
							if (CHECK_FILE_EXISTS({
								path : from,
								isSync : true
							}) === true) {
								
								let count = 0;
								
								FIND_FILE_NAMES({
									path : from,
									isSync : true
								}, EACH((fileName) => {
									
									COPY_FILE({
										from : from + '/' + fileName,
										to : to + '/' + fileName,
										isSync : true
									});
									
									count += 1;
								}));
								
								FIND_FOLDER_NAMES({
									path : from,
									isSync : true
								}, EACH((folderName) => {
									
									COPY_FOLDER({
										from : from + '/' + folderName,
										to : to + '/' + folderName,
										isSync : true
									});
									
									count += 1;
								}));
								
								// 빈 폴더면 폴더 생성
								if (count === 0) {
									CREATE_FOLDER({
										path : to,
										isSync : true
									});
								}
								
							} else {
	
								if (notExistsHandler !== undefined) {
									notExistsHandler(from);
								} else {
									SHOW_WARNING('COPY_FOLDER', MSG({
										ko : '폴더가 존재하지 않습니다.'
									}), {
										from : from
									});
								}
	
								// do not run callback.
								return;
							}
	
						} catch(error) {
							
							if (error !== TO_DELETE) {
								
								let errorMsg = error.toString();
		
								if (errorHandler !== undefined) {
									errorHandler(errorMsg, params);
								} else {
									SHOW_ERROR('COPY_FOLDER', errorMsg, params);
								}
							}
						}
	
						if (callback !== undefined) {
							callback();
						}
					});
				}
			}
		}
	};
});

/*
 * 폴더를 생성합니다.
 */
global.CREATE_FOLDER = METHOD(() => {

	let FS = require('fs');
	let Path = require('path');

	return {

		run : (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	폴더를 생성할 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path;
			let isSync;
			
			let errorHandler;
			let callback;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			// when normal mode
			if (isSync !== true) {

				CHECK_FILE_EXISTS(path, (exists) => {

					if (exists === true) {

						if (callback !== undefined) {
							callback();
						}

					} else {

						let folderPath = Path.dirname(path);
						
						if (folderPath === path || folderPath + '/' === path) {
							
							if (callback !== undefined) {
								callback();
							}
						}
						
						else {
							
							CHECK_FILE_EXISTS(folderPath, (exists) => {
	
								if (folderPath === '.' || exists === true) {
	
									FS.mkdir(path, (error) => {
	
										if (error !== TO_DELETE) {
	
											let errorMsg = error.toString();
	
											if (errorHandler !== undefined) {
												errorHandler(errorMsg, pathOrParams);
											} else {
												SHOW_ERROR('CREATE_FOLDER', errorMsg, pathOrParams);
											}
										}
										
										else if (callback !== undefined) {
											callback();
										}
									});
	
								} else {
	
									CREATE_FOLDER(folderPath, () => {
	
										// retry.
										CREATE_FOLDER(path, callback);
									});
								}
							});
						}
					}
				});
			}

			// when sync mode
			else {

				try {

					if (CHECK_FILE_EXISTS({
						path : path,
						isSync : true
					}) !== true) {

						let folderPath = Path.dirname(path);
						
						if (folderPath === path || folderPath + '/' === path) {
							// ignore.
						}
						
						else {

							if (folderPath === '.' || CHECK_FILE_EXISTS({
								path : folderPath,
								isSync : true
							}) === true) {
								FS.mkdirSync(path);
							} else {
	
								CREATE_FOLDER({
									path : folderPath,
									isSync : true
								});
	
								// retry.
								CREATE_FOLDER({
									path : path,
									isSync : true
								});
							}
						}
					}

				} catch(error) {

					if (error !== TO_DELETE) {

						let errorMsg = error.toString();

						if (errorHandler !== undefined) {
							errorHandler(errorMsg, pathOrParams);
						} else {
							SHOW_ERROR('CREATE_FOLDER', errorMsg, pathOrParams);
						}
					}
				}

				if (callback !== undefined) {
					callback();
				}
			}
		}
	};
});

/*
 * 지정된 경로에 위치한 파일들의 이름 목록을 불러옵니다.
 */
global.FIND_FILE_NAMES = METHOD(() => {

	let FS = require('fs');
	
	return {

		run : (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	파일들이 위치한 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExistsHandler
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path;
			let isSync;
			
			let notExistsHandler
			let errorHandler;
			let callback;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}
			
			let fileNames = [];

			// when normal mode
			if (isSync !== true) {

				CHECK_FILE_EXISTS(path, (exists) => {

					if (exists === true) {

						FS.readdir(path, (error, names) => {

							if (error !== TO_DELETE) {

								let errorMsg = error.toString();

								if (errorHandler !== undefined) {
									errorHandler(errorMsg, pathOrParams);
								} else {
									SHOW_ERROR('FIND_FILE_NAMES', errorMsg, pathOrParams);
								}

							} else if (callback !== undefined) {

								PARALLEL(names, [
								(name, done) => {

									if (name[0] !== '.') {

										FS.stat(path + '/' + name, (error, stats) => {

											if (error !== TO_DELETE) {

												let errorMsg = error.toString();

												if (errorHandler !== undefined) {
													errorHandler(errorMsg, pathOrParams);
												} else {
													SHOW_ERROR('FIND_FILE_NAMES', errorMsg, pathOrParams);
												}

											} else {

												if (stats.isDirectory() !== true) {
													fileNames.push(name);
												}

												done();
											}
										});

									} else {
										done();
									}
								},

								() => {
									if (callback !== undefined) {
										callback(fileNames);
									}
								}]);
							}
						});

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							SHOW_WARNING('FIND_FOLDER_NAMES', MSG({
								ko : '폴더가 존재하지 않습니다.'
							}), {
								path : path
							});
						}
					}
				});
			}

			// when sync mode
			else {

				return RUN(() => {

					try {

						if (CHECK_FILE_EXISTS({
							path : path,
							isSync : true
						}) === true) {

							let names = FS.readdirSync(path);

							EACH(names, (name) => {
								if (name[0] !== '.' && FS.statSync(path + '/' + name).isDirectory() !== true) {
									fileNames.push(name);
								}
							});

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('FIND_FILE_NAMES', MSG({
									ko : '폴더가 존재하지 않습니다.'
								}), {
									path : path
								});
							}

							// return undefined.
							return;
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, pathOrParams);
							} else {
								SHOW_ERROR('FIND_FILE_NAMES', errorMsg, pathOrParams);
							}
						}
					}

					if (callback !== undefined) {
						callback(fileNames);
					}

					return fileNames;
				});
			}
		}
	};
});

/*
 * 지정된 경로에 위치한 폴더들의 이름 목록을 불러옵니다.
 */
global.FIND_FOLDER_NAMES = METHOD(() => {

	let FS = require('fs');
	
	return {

		run : (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	폴더들이 위치한 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExistsHandler
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path;
			let isSync;
			
			let notExistsHandler;
			let errorHandler;
			let callback;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			let folderNames = [];

			// when normal mode
			if (isSync !== true) {

				CHECK_FILE_EXISTS(path, (exists) => {

					if (exists === true) {

						FS.readdir(path, (error, names) => {

							if (error !== TO_DELETE) {

								let errorMsg = error.toString();

								if (errorHandler !== undefined) {
									errorHandler(errorMsg, pathOrParams);
								} else {
									SHOW_ERROR('FIND_FOLDER_NAMES', errorMsg, pathOrParams);
								}

							} else if (callback !== undefined) {

								PARALLEL(names, [
								(name, done) => {

									if (name[0] !== '.') {

										FS.stat(path + '/' + name, (error, stats) => {

											if (error !== TO_DELETE) {

												let errorMsg = error.toString();

												if (errorHandler !== undefined) {
													errorHandler(errorMsg, pathOrParams);
												} else {
													SHOW_ERROR('FIND_FOLDER_NAMES', errorMsg, pathOrParams);
												}

											} else {

												if (stats.isDirectory() === true) {
													folderNames.push(name);
												}

												done();
											}
										});

									} else {
										done();
									}
								},

								() => {
									if (callback !== undefined) {
										callback(folderNames);
									}
								}]);
							}
						});

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							SHOW_WARNING('FIND_FOLDER_NAMES', MSG({
								ko : '폴더가 존재하지 않습니다.'
							}), {
								path : path
							});
						}
					}
				});
			}

			// when sync mode
			else {

				return RUN(() => {
					
					try {

						if (CHECK_FILE_EXISTS({
							path : path,
							isSync : true
						}) === true) {

							let names = FS.readdirSync(path);

							EACH(names, (name) => {
								if (name[0] !== '.' && FS.statSync(path + '/' + name).isDirectory() === true) {
									folderNames.push(name);
								}
							});

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('FIND_FOLDER_NAMES', MSG({
									ko : '폴더가 존재하지 않습니다.'
								}), {
									path : path
								});
							}

							// return undefined.
							return;
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, pathOrParams);
							} else {
								SHOW_ERROR('FIND_FOLDER_NAMES', errorMsg, pathOrParams);
							}
						}
					}

					if (callback !== undefined) {
						callback(folderNames);
					}

					return folderNames;
				});
			}
		}
	};
});

/*
 * 파일의 정보를 불러옵니다.
 * 
 * 파일의 크기(size), 생성 시간(createTime), 최종 수정 시간(lastUpdateTime)을 불러옵니다.
 */
global.GET_FILE_INFO = METHOD(() => {
	
	let FS = require('fs');

	return {

		run : (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	불러올 파일의 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path;
			let isSync;
			
			let notExistsHandler;
			let errorHandler;
			let callback;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			// when normal mode
			if (isSync !== true) {

				CHECK_FILE_EXISTS(path, (exists) => {

					if (exists === true) {

						FS.stat(path, (error, stat) => {

							if (error !== TO_DELETE) {

								let errorMsg = error.toString();

								if (errorHandler !== undefined) {
									errorHandler(errorMsg, pathOrParams);
								} else {
									SHOW_ERROR('GET_FILE_INFO', errorMsg, pathOrParams);
								}

							} else if (callback !== undefined) {
								callback({
									size : stat.isDirectory() === true ? undefined : stat.size,
									createTime : stat.birthtime,
									lastUpdateTime : stat.mtime
								});
							}
						});

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							SHOW_WARNING('GET_FILE_INFO', MSG({
								ko : '파일이 존재하지 않습니다.'
							}), {
								path : path
							});
						}
					}
				});
			}

			// when sync mode
			else {

				return RUN(() => {

					try {

						if (CHECK_FILE_EXISTS({
							path : path,
							isSync : true
						}) === true) {
							
							let stat = FS.statSync(path);

							if (callback !== undefined) {
								callback({
									size : stat.isDirectory() === true ? undefined : stat.size,
									createTime : stat.birthtime,
									lastUpdateTime : stat.mtime
								});
							}
							
							return {
								size : stat.isDirectory() === true ? undefined : stat.size,
								createTime : stat.birthtime,
								lastUpdateTime : stat.mtime
							};

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('GET_FILE_INFO', MSG({
									ko : '파일이 존재하지 않습니다.'
								}), {
									path : path
								});
							}
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, pathOrParams);
							} else {
								SHOW_ERROR('GET_FILE_INFO', errorMsg, pathOrParams);
							}
						}
					}

					// return undefined.
					return;
				});
			}
		}
	};
});

/*
 * 파일이나 폴더의 위치를 이동시킵니다.
 */
global.MOVE_FILE = METHOD(() => {

	let FS = require('fs');
	let Path = require('path');
	
	return {
		
		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//REQUIRED: params.from		파일의 원래 위치
			//REQUIRED: params.to		파일을 옮길 위치
			//OPTIONAL: params.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExistsHandler
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success
	
			let from = params.from;
			let to = params.to;
			let isSync = params.isSync;
			
			let notExistsHandler;
			let errorHandler;
			let callback;
	
			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}
			
			if (from === to) {
				if (callback !== undefined) {
					callback();
				}
			}
			
			else {
				
				CREATE_FOLDER({
					path : Path.dirname(to),
					isSync : isSync
				}, {
	
					error : errorHandler,
	
					success : () => {
	
						// when normal mode
						if (isSync !== true) {
	
							CHECK_FILE_EXISTS(from, (exists) => {
	
								if (exists === true) {
	
									FS.rename(from, to, (error) => {
										
										if (error !== TO_DELETE) {
	
											let errorMsg = error.toString();
	
											if (errorHandler !== undefined) {
												errorHandler(errorMsg, params);
											} else {
												SHOW_ERROR('MOVE_FILE', errorMsg, params);
											}
	
										} else if (callback !== undefined) {
											callback();
										}
									});
	
								} else {
	
									if (notExistsHandler !== undefined) {
										notExistsHandler(from);
									} else {
										SHOW_WARNING('MOVE_FILE', MSG({
											ko : '파일이 존재하지 않습니다.'
										}), {
											from : from
										});
									}
								}
							});
						}
	
						// when sync mode
						else {
	
							RUN(() => {
	
								try {
	
									if (CHECK_FILE_EXISTS({
										path : from,
										isSync : true
									}) === true) {
	
										FS.renameSync(from, to);
	
									} else {
	
										if (notExistsHandler !== undefined) {
											notExistsHandler(from);
										} else {
											SHOW_WARNING('MOVE_FILE', MSG({
												ko : '파일이 존재하지 않습니다.'
											}), {
												from : from
											});
										}
	
										// do not run callback.
										return;
									}
	
								} catch(error) {
	
									if (error !== TO_DELETE) {
	
										let errorMsg = error.toString();
	
										if (errorHandler !== undefined) {
											errorHandler(errorMsg, params);
										} else {
											SHOW_ERROR('MOVE_FILE', errorMsg, params);
										}
									}
								}
	
								if (callback !== undefined) {
									callback();
								}
							});
						}
					}
				});
			}
		}
	}
});

/*
 * 파일의 내용을 불러옵니다.
 * 
 * 내용을 Buffer형으로 불러오기 때문에, 내용을 문자열로 불러오려면 toString 메소드를 이용하시기 바랍니다.
 */
global.READ_FILE = METHOD(() => {
	
	let FS = require('fs');

	return {

		run : (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	불러올 파일의 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path;
			let isSync;
			
			let notExistsHandler;
			let errorHandler;
			let callback;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			// when normal mode
			if (isSync !== true) {

				CHECK_FILE_EXISTS(path, (exists) => {

					if (exists === true) {

						FS.stat(path, (error, stat) => {
							
							if (error !== TO_DELETE) {

								let errorMsg = error.toString();

								if (errorHandler !== undefined) {
									errorHandler(errorMsg, pathOrParams);
								} else {
									SHOW_ERROR('READ_FILE', errorMsg, pathOrParams);
								}

							} else if (stat.isDirectory() === true) {

								if (notExistsHandler !== undefined) {
									notExistsHandler(path);
								} else {
									SHOW_WARNING('READ_FILE', MSG({
										ko : '파일이 존재하지 않습니다.'
									}), {
										path : path
									});
								}

							} else {

								FS.readFile(path, (error, buffer) => {

									if (error !== TO_DELETE) {

										let errorMsg = error.toString();

										if (errorHandler !== undefined) {
											errorHandler(errorMsg, pathOrParams);
										} else {
											SHOW_ERROR('READ_FILE', errorMsg, pathOrParams);
										}

									} else if (callback !== undefined) {
										callback(buffer);
									}
								});
							}
						});

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							SHOW_WARNING('READ_FILE', MSG({
								ko : '파일이 존재하지 않습니다.'
							}), {
								path : path
							});
						}
					}
				});
			}

			// when sync mode
			else {

				return RUN(() => {

					try {

						if (CHECK_FILE_EXISTS({
							path : path,
							isSync : true
						}) === true) {

							if (FS.statSync(path).isDirectory() === true) {

								if (notExistsHandler !== undefined) {
									notExistsHandler(path);
								} else {
									SHOW_WARNING('READ_FILE', MSG({
										ko : '파일이 존재하지 않습니다.'
									}), {
										path : path
									});
								}
								
							} else {
								
								let buffer = FS.readFileSync(path);
			
								if (callback !== undefined) {
									callback(buffer);
								}
			
								return buffer;
							}

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('READ_FILE', MSG({
									ko : '파일이 존재하지 않습니다.'
								}), {
									path : path
								});
							}
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, pathOrParams);
							} else {
								SHOW_ERROR('READ_FILE', errorMsg, pathOrParams);
							}
						}
					}

					// return undefined.
					return;
				});
			}
		}
	};
});

/*
 * 파일을 삭제합니다.
 */
global.REMOVE_FILE = METHOD(() => {

	let FS = require('fs');

	return {

		run : (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	삭제할 파일의 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path;
			let isSync;
			
			let notExistsHandler;
			let errorHandler;
			let callback;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				notExistsHandler = callbackOrHandlers.notExists;
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}

			// when normal mode
			if (isSync !== true) {

				CHECK_FILE_EXISTS(path, (exists) => {

					if (exists === true) {

						FS.unlink(path, (error) => {

							if (error !== TO_DELETE) {

								let errorMsg = error.toString();

								if (errorHandler !== undefined) {
									errorHandler(errorMsg, pathOrParams);
								} else {
									SHOW_ERROR('REMOVE_FILE', errorMsg, pathOrParams);
								}

							} else {

								if (callback !== undefined) {
									callback();
								}
							}
						});

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							SHOW_WARNING('REMOVE_FILE', MSG({
								ko : '파일이 존재하지 않습니다.'
							}), {
								path : path
							});
						}
					}
				});
			}

			// when sync mode
			else {

				RUN(() => {

					try {

						if (CHECK_FILE_EXISTS({
							path : path,
							isSync : true
						}) === true) {

							FS.unlinkSync(path);

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('REMOVE_FILE', MSG({
									ko : '파일이 존재하지 않습니다.'
								}), {
									path : path
								});
							}

							// do not run callback.
							return;
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, pathOrParams);
							} else {
								SHOW_ERROR('REMOVE_FILE', errorMsg, pathOrParams);
							}
						}
					}

					if (callback !== undefined) {
						callback();
					}
				});
			}
		}
	};
});

/*
 * 폴더를 삭제합니다.
 * 
 * 폴더 내의 모든 파일 및 폴더를 삭제하므로, 주의해서 사용해야 합니다.
 */
global.REMOVE_FOLDER = METHOD(() => {

	let FS = require('fs');

	return {

		run : (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	삭제할 폴더의 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path;
			let isSync;
			
			let notExistsHandler;
			let errorHandler;
			let callback;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				notExistsHandler = callbackOrHandlers.notExists;
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}

			// when normal mode
			if (isSync !== true) {

				CHECK_FILE_EXISTS(path, (exists) => {

					if (exists === true) {
						
						NEXT([
						(next) => {
							
							FIND_FILE_NAMES(path, (fileNames) => {
								
								PARALLEL(fileNames, [
								(fileName, done) => {
									REMOVE_FILE(path + '/' + fileName, done);
								},
								
								() => {
									next();
								}]);
							});
						},
						
						(next) => {
							return () => {
								
								FIND_FOLDER_NAMES(path, (folderNames) => {
									
									PARALLEL(folderNames, [
									(folderName, done) => {
										REMOVE_FOLDER(path + '/' + folderName, done);
									},
									
									() => {
										next();
									}]);
								});
							};
						},
						
						() => {
							return () => {
								
								FS.rmdir(path, (error) => {
									
									if (error !== TO_DELETE) {
										
										let errorMsg = error.toString();
										
										if (errorHandler !== undefined) {
											errorHandler(errorMsg, pathOrParams);
										} else {
											SHOW_ERROR('REMOVE_FOLDER', errorMsg, pathOrParams);
										}
		
									} else {
		
										if (callback !== undefined) {
											callback();
										}
									}
								});
							};
						}]);

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							SHOW_WARNING('REMOVE_FOLDER', MSG({
								ko : '폴더가 존재하지 않습니다.'
							}), {
								path : path
							});
						}
					}
				});
			}

			// when sync mode
			else {

				RUN(() => {

					try {

						if (CHECK_FILE_EXISTS({
							path : path,
							isSync : true
						}) === true) {
							
							FIND_FILE_NAMES({
								path : path,
								isSync : true
							}, EACH((fileName) => {
								
								REMOVE_FILE({
									path : path + '/' + fileName,
									isSync : true
								});
							}));
							
							FIND_FOLDER_NAMES({
								path : path,
								isSync : true
							}, EACH((folderName) => {
								
								REMOVE_FOLDER({
									path : path + '/' + folderName,
									isSync : true
								});
							}));
							
							FS.rmdirSync(path);

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('REMOVE_FOLDER', MSG({
									ko : '폴더가 존재하지 않습니다.'
								}), {
									path : path
								});
							}

							// do not run callback.
							return;
						}

					} catch(error) {
						
						if (error !== TO_DELETE) {
							
							let errorMsg = error.toString();
	
							if (errorHandler !== undefined) {
								errorHandler(errorMsg, pathOrParams);
							} else {
								SHOW_ERROR('REMOVE_FOLDER', errorMsg, pathOrParams);
							}
						}
					}

					if (callback !== undefined) {
						callback();
					}
				});
			}
		}
	};
});

/*
 * 파일을 작성합니다.
 * 
 * 파일이 없으면 파일을 생성하고, 파일이 이미 있으면 내용을 덮어씁니다.
 */
global.WRITE_FILE = METHOD(() => {

	let FS = require('fs');
	let Path = require('path');

	return {

		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//REQUIRED: params.path		작성할 파일의 경로
			//OPTIONAL: params.content	파일에 작성할 내용 (문자열)
			//OPTIONAL: params.buffer	파일에 작성할 내용 (Buffer)
			//OPTIONAL: params.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path = params.path;
			let content = params.content;
			let buffer = params.buffer;
			let isSync = params.isSync;
			
			let errorHandler;
			let callback;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			CREATE_FOLDER({
				path : Path.dirname(path),
				isSync : isSync
			}, () => {

				// when normal mode
				if (isSync !== true) {

					FS.writeFile(path, buffer !== undefined ? buffer : content, (error) => {
						
						if (error !== TO_DELETE) {
							
							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, params);
							} else {
								SHOW_ERROR('WRITE_FILE', errorMsg, params);
							}

						} else if (callback !== undefined) {
							callback();
						}
					});
				}

				// when sync mode
				else {
					
					try {

						FS.writeFileSync(path, buffer !== undefined ? buffer : content);

					} catch(error) {
						
						if (error !== TO_DELETE) {
							
							let errorMsg = error.toString();
								
							if (errorHandler !== undefined) {
								errorHandler(errorMsg, params);
							} else {
								SHOW_ERROR('WRITE_FILE', errorMsg, params);
							}
						}
					}

					if (callback !== undefined) {
						callback();
					}
				}
			});
		}
	};
});

/*
 * GraphicsMagick의 convert 기능을 사용합니다.
 */
global.GRAPHICSMAGICK_CONVERT = METHOD(() => {

	let GraphicsMagick = require('hanul-graphicsmagick');

	return {

		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//OPTIONAL: callbackOrHandlers

			let callback;
			let errorHandler;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					errorHandler = callbackOrHandlers.error;
				}
			}
			
			GraphicsMagick.convert(params, (error) => {

				if (error !== TO_DELETE) {

					let errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
						errorHandler = undefined;
					} else {
						SHOW_ERROR('GRAPHICSMAGICK_CONVERT', errorMsg);
					}

				} else {

					if (callback !== undefined) {
						callback();
					}
				}
			});
		}
	};
});

/*
 * GraphicsMagick의 identify 기능을 사용합니다.
 */
global.GRAPHICSMAGICK_IDENTIFY = METHOD(() => {

	let GraphicsMagick = require('hanul-graphicsmagick');

	return {

		run : (path, callbackOrHandlers) => {
			//REQUIRED: path
			//REQUIRED: callbackOrHandlers

			let callback;
			let errorHandler;

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				callback = callbackOrHandlers.success;
				errorHandler = callbackOrHandlers.error;
			}
			
			GraphicsMagick.identify(path, (error, features) => {

				if (error !== TO_DELETE) {

					let errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
						errorHandler = undefined;
					} else {
						SHOW_ERROR('GRAPHICSMAGICK_IDENTIFY', errorMsg);
					}

				} else {
					callback(features);
				}
			});
		}
	};
});

/*
 * GraphicsMagick을 이용해 이미지의 메타데이터를 반한홥니다.
 */
global.GRAPHICSMAGICK_READ_METADATA = METHOD(() => {

	let GraphicsMagick = require('hanul-graphicsmagick');

	return {

		run : (path, callbackOrHandlers) => {
			//REQUIRED: path
			//REQUIRED: callbackOrHandlers

			let callback;
			let errorHandler;

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				callback = callbackOrHandlers.success;
				errorHandler = callbackOrHandlers.error;
			}
			
			GraphicsMagick.readMetadata(path, (error, metadata) => {
				
				if (error !== TO_DELETE) {

					let errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
						errorHandler = undefined;
					} else {
						SHOW_ERROR('GRAPHICSMAGICK_READ_METADATA', errorMsg);
					}

				} else {
					callback(metadata);
				}
			});
		}
	};
});

/*
 * GraphicsMagick을 사용해 이미지의 크기를 조절하여 새 파일로 저장합니다.
 */
global.GRAPHICSMAGICK_RESIZE = METHOD(() => {

	let Path = require('path');

	return {

		run : (params, callbackOrHandlers) => {
			//REQUIRED: params.srcPath
			//REQUIRED: params.distPath
			//OPTIONAL: params.width
			//OPTIONAL: params.height
			//OPTIONAL: callbackOrHandlers

			let srcPath = params.srcPath;
			let distPath = params.distPath;
			let width = params.width;
			let height = params.height;
			
			let callback;
			let errorHandler;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					errorHandler = callbackOrHandlers.error;
				}
			}

			CREATE_FOLDER(Path.dirname(distPath), {
				error : errorHandler,
				success : () => {

					GRAPHICSMAGICK_IDENTIFY(srcPath, {
						error : errorHandler,
						success : (features) => {

							if (width === undefined) {
								width = height / features.height * features.width;
							}

							if (height === undefined) {
								height = width / features.width * features.height;
							}

							GRAPHICSMAGICK_CONVERT([srcPath, '-resize', width + 'x' + height + '\!', distPath], callbackOrHandlers);
						}
					});
				}
			});
		}
	};
});

/*
 * CSS 코드를 압축합니다.
 */
global.MINIFY_CSS = METHOD(() => {

	let Sqwish = require('sqwish');

	return {

		run : (code) => {
			//REQUIRED: code

			return Sqwish.minify(code.toString());
		}
	};
});

/*
 * JavaScript 코드를 압축합니다.
 */
global.MINIFY_JS = METHOD(() => {

	let UglifyJS = require('hanul-uglify-js');

	return {

		run : (code) => {
			//REQUIRED: code
			
			code = code.toString();
			
			try {

				return UglifyJS.minify(code, {
					fromString : true,
					mangle : true
				}).code;
			
			} catch(error) {
				
				SHOW_ERROR('MINIFY_JS', error.message, {
					code : (error.pos - 50 > 0 ? '...' : '') + code.substring(error.pos - 50, error.pos + 50) + (error.pos + 50 < code.length ? '...' : ''),
					line : error.line,
					column : error.col
				});
			}
		}
	};
});

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
		
		if (CHECK_IS_DATA(urlOrParams) !== true) {
			urlOrParams = {
				url : urlOrParams
			};
		}
		
		REQUEST(COMBINE([{
			method : 'DELETE'
		}, urlOrParams]), responseListenerOrListeners);
	}
});

/*
 * HTTP 리소스를 다운로드합니다.
 */
global.DOWNLOAD = METHOD(() => {

	let HTTP = require('http');
	let HTTPS = require('https');
	let URL = require('url');
	let Querystring = require('querystring');

	return {

		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//REQUIRED: params.method
			//OPTIONAL: params.isSecure	HTTPS 프로토콜인지 여부
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//OPTIONAL: params.uri
			//OPTIONAL: params.url		요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
			//OPTIONAL: params.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
			//OPTIONAL: params.params	데이터 형태({...})로 표현한 파라미터 목록
			//OPTIONAL: params.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
			//OPTIONAL: params.headers	요청 헤더
			//REQUIRED: params.path		리소스를 다운로드하여 저장할 경로
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.error

			let method = params.method;
			let isSecure = params.isSecure;
			let host = params.host;
			let port = params.port;
			let uri = params.uri;
			let url = params.url;
			let paramStr = params.paramStr;
			let _params = params.params;
			let data = params.data;
			let headers = params.headers;
			let path = params.path;
			
			let errorHandler;
			let callback;
			
			let urlData;
			let req;
			
			if (url !== undefined) {
				urlData = URL.parse(url);
				
				host = urlData.hostname === TO_DELETE ? undefined : urlData.hostname,
				port = urlData.port === TO_DELETE ? undefined : INTEGER(urlData.port),
				isSecure = urlData.protocol === 'https:',
				uri = urlData.pathname === TO_DELETE ? undefined : urlData.pathname.substring(1),
				paramStr = urlData.query === TO_DELETE ? undefined : urlData.query
			}
			
			if (port === undefined) {
				port = isSecure !== true ? 80 : 443;
			}

			if (uri !== undefined && uri.indexOf('?') !== -1) {
				paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				uri = uri.substring(0, uri.indexOf('?'));
			}
			
			if (_params !== undefined) {
				paramStr = (paramStr === undefined ? '' : paramStr + '&') + Querystring.stringify(_params).trim();
			}

			if (data !== undefined) {
				paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(data));
			}
			
			paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			req = (isSecure !== true ? HTTP : HTTPS).get({
				rejectUnauthorized : false,
				hostname : host,
				port : port,
				path : '/' + (uri === undefined ? '' : uri) + '?' + paramStr,
				headers : headers
			}, (httpResponse) => {
				
				// redirect.
				if (httpResponse.statusCode === 301 || httpResponse.statusCode === 302) {
					
					DOWNLOAD({
						url : httpResponse.headers.location,
						path : path
					}, {
						error : errorHandler,
						success : callback
					});
					
					httpResponse.destroy();
					
				} else {
				
					let data = [];
	
					httpResponse.on('data', (chunk) => {
						data.push(chunk);
					});
					httpResponse.on('end', () => {
						
						WRITE_FILE({
							path : path,
							buffer : Buffer.concat(data)
						}, {
							error : errorHandler,
							success : callback
						});
					});
				}
			});

			req.on('error', (error) => {

				let errorMsg = error.toString();

				if (errorHandler !== undefined) {
					errorHandler(errorMsg);
				} else {
					SHOW_ERROR('DOWNLOAD', errorMsg, params);
				}
			});
		}
	};
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
		
		if (CHECK_IS_DATA(urlOrParams) !== true) {
			urlOrParams = {
				url : urlOrParams
			};
		}
		
		REQUEST(COMBINE([{
			method : 'GET'
		}, urlOrParams]), responseListenerOrListeners);
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
		
		if (CHECK_IS_DATA(urlOrParams) !== true) {
			urlOrParams = {
				url : urlOrParams
			};
		}
		
		REQUEST(COMBINE([{
			method : 'POST'
		}, urlOrParams]), responseListenerOrListeners);
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
		
		if (CHECK_IS_DATA(urlOrParams) !== true) {
			urlOrParams = {
				url : urlOrParams
			};
		}
		
		REQUEST(COMBINE([{
			method : 'PUT'
		}, urlOrParams]), responseListenerOrListeners);
	}
});

/*
 * HTTP 요청을 보냅니다.
 */
global.REQUEST = METHOD((m) => {

	let HTTP = require('http');
	let HTTPS = require('https');
	let URL = require('url');
	let Querystring = require('querystring');

	return {

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
			let isSecure = params.isSecure;
			let host = params.host;
			let port = params.port;
			let uri = params.uri;
			let url = params.url;
			let paramStr = params.paramStr;
			let _params = params.params;
			let data = params.data;
			let headers = params.headers;
			
			let errorListener;
			let responseListener;
			
			let urlData;
			let req;

			method = method.toUpperCase();
			
			if (url !== undefined) {
				urlData = URL.parse(url);
				
				host = urlData.hostname === TO_DELETE ? undefined : urlData.hostname;
				port = urlData.port === TO_DELETE ? undefined : INTEGER(urlData.port);
				isSecure = urlData.protocol === 'https:';
				uri = urlData.pathname === TO_DELETE ? undefined : urlData.pathname.substring(1);
				
				let urlParamStr = urlData.query === TO_DELETE ? undefined : urlData.query;
				
				if (urlParamStr !== undefined) {
					if (paramStr === undefined) {
						paramStr = urlParamStr;
					} else {
						paramStr = urlParamStr + '&' + paramStr;
					}
				}
			}
			
			if (port === undefined) {
				port = isSecure !== true ? 80 : 443;
			}

			if (uri !== undefined && uri.indexOf('?') !== -1) {
				paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				uri = uri.substring(0, uri.indexOf('?'));
			}
			
			if (_params !== undefined) {
				paramStr = (paramStr === undefined ? '' : paramStr + '&') + Querystring.stringify(_params).trim();
			}

			if (data !== undefined) {
				paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(data));
			}
			
			if (paramStr === undefined) {
				paramStr = '';
			}
			
			if (responseListenerOrListeners !== undefined) {
				if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
					responseListener = responseListenerOrListeners;
				} else {
					errorListener = responseListenerOrListeners.error;
					responseListener = responseListenerOrListeners.success;
				}
			}

			// GET request.
			if (method === 'GET') {

				req = (isSecure !== true ? HTTP : HTTPS).get({
					rejectUnauthorized : false,
					hostname : host,
					port : port,
					path : '/' + (uri === undefined ? '' : uri) + '?' + paramStr,
					headers : headers
				}, (httpResponse) => {
					
					// redirect.
					if (httpResponse.statusCode === 301 || httpResponse.statusCode === 302) {
						
						GET(httpResponse.headers.location, {
							error : errorListener,
							success : responseListener
						});
						
						httpResponse.destroy();
					}
					
					else if (httpResponse.statusCode === 200) {
						
						let content = '';

						httpResponse.setEncoding('utf-8');
						httpResponse.on('data', (str) => {
							content += str;
						});
						httpResponse.on('end', () => {
							if (responseListener !== undefined) {
								responseListener(content, httpResponse.headers);
							}
						});
					}
					
					else {
						let errorMsg = 'HTTP RESPONSE STATUS CODE: ' + httpResponse.statusCode;
		
						if (errorListener !== undefined) {
							errorListener(errorMsg, httpResponse.statusCode);
						} else {
							SHOW_ERROR('REQUEST', errorMsg, params);
						}
					}
				});
			}

			// other request.
			else {

				req = (isSecure !== true ? HTTP : HTTPS).request({
					rejectUnauthorized : false,
					hostname : host,
					port : port,
					path : '/' + (uri === undefined ? '' : uri) + (method === 'DELETE' ? '?' + paramStr : ''),
					method : method,
					headers : headers
				}, (httpResponse) => {
					
					if (httpResponse.statusCode === 200) {
						
						let content = '';
	
						httpResponse.setEncoding('utf-8');
						httpResponse.on('data', (str) => {
							content += str;
						});
						httpResponse.on('end', () => {
							if (responseListener !== undefined) {
								responseListener(content, httpResponse.headers);
							}
						});
					}
					
					else {
						let errorMsg = 'HTTP RESPONSE STATUS CODE: ' + httpResponse.statusCode;
		
						if (errorListener !== undefined) {
							errorListener(errorMsg, httpResponse.statusCode);
						} else {
							SHOW_ERROR('REQUEST', errorMsg, params);
						}
					}
				});

				if (method !== 'DELETE') {
					req.write(paramStr);
				}
				req.end();
			}

			req.on('error', (error) => {

				let errorMsg = error.toString();

				if (errorListener !== undefined) {
					errorListener(errorMsg);
				} else {
					SHOW_ERROR('REQUEST', errorMsg, params);
				}
			});
		}
	};
});

/*
 * SOCKET_SERVER로 생성한 TCP 소켓 서버에 연결합니다.
 */
global.CONNECT_TO_SOCKET_SERVER = METHOD({

	run : (params, connectionListenerOrListeners) => {
		//REQUIRED: params
		//REQUIRED: params.host
		//REQUIRED: params.port
		//REQUIRED: connectionListenerOrListeners
		//REQUIRED: connectionListenerOrListeners.success
		//OPTIONAL: connectionListenerOrListeners.error

		let host = params.host;
		let port = params.port;

		let connectionListener;
		let errorListener;

		let Net = require('net');
		
		let isConnected;
		
		let methodMap = {};
		let sendKey = 0;
		
		let receivedStr = '';

		let on;
		let off;
		let send;

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

		let conn = Net.connect({
			host : host,
			port : port
		}, () => {

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
				
				if (CHECK_IS_DATA(methodNameOrParams) !== true) {
					methodName = methodNameOrParams;
				} else {
					methodName = methodNameOrParams.methodName;
					data = methodNameOrParams.data;
				}
				
				if (conn !== undefined) {
					
					conn.write(STRINGIFY({
						methodName : methodName,
						data : data,
						sendKey : sendKey
					}) + '\r\n');
	
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
				}
			},

			// disconnect.
			() => {
				if (conn !== undefined) {
					conn.end();
					conn = undefined;
				}
			});
		});

		// when receive data
		conn.on('data', (content) => {

			let index;

			receivedStr += content.toString();

			while ((index = receivedStr.indexOf('\r\n')) !== -1) {
				
				let params = PARSE_STR(receivedStr.substring(0, index));

				if (params !== undefined) {
					runMethods(params.methodName, params.data, params.sendKey);
				}

				receivedStr = receivedStr.substring(index + 1);
			}
		});

		// when disconnected
		conn.on('close', () => {
			runMethods('__DISCONNECTED');
		});

		// when error
		conn.on('error', (error) => {

			let errorMsg = error.toString();

			if (isConnected !== true) {

				if (errorListener !== undefined) {
					errorListener(errorMsg);
				} else {
					SHOW_ERROR('CONNECT_TO_SOCKET_SERVER', errorMsg);
				}

			} else {
				runMethods('__ERROR', errorMsg);
			}
		});
	}
});

/*
 * WEB_SOCKET_SERVER로 생성한 웹소켓 서버에 연결합니다.
 */
global.CONNECT_TO_WEB_SOCKET_SERVER = METHOD({

	run : (params, connectionListenerOrListeners) => {
		//REQUIRED: params
		//OPTIONAL: params.isSecure
		//REQUIRED: params.host
		//REQUIRED: params.port
		//REQUIRED: connectionListenerOrListeners
		//REQUIRED: connectionListenerOrListeners.success
		//OPTIONAL: connectionListenerOrListeners.error

		let isSecure = params.isSecure;
		let host = params.host;
		let port = params.port;

		let connectionListener;
		let errorListener;
		
		let isConnected;

		let methodMap = {};
		let sendKey = 0;
		
		let on;
		let off;
		let send;

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
		
		let WebSocket = require('ws');

		let conn = new WebSocket((isSecure === true ? 'wss://': 'ws://') + host + ':' + port);

		conn.on('open', () => {

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
		});

		// receive data.
		conn.on('message', (data) => {

			let params = PARSE_STR(data);

			if (params !== undefined) {
				runMethods(params.methodName, params.data, params.sendKey);
			}
		});

		// when disconnected
		conn.on('close', () => {
			runMethods('__DISCONNECTED');
		});

		// when error
		conn.on('error', (error) => {

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
		});
	}
});

/*
 * TCP 소켓 및 웹소켓 서버를 통합하여 생성합니다.
 */
global.MULTI_PROTOCOL_SOCKET_SERVER = CLASS({

	init : (inner, self, params, connectionListener) => {
		//REQUIRED: params
		//OPTIONAL: params.socketServerPort
		//OPTIONAL: params.webServer
		//REQUIRED: connectionListener

		let socketServerPort = params.socketServerPort;
		let webServer = params.webServer;

		if (socketServerPort !== undefined) {

			// create socket server.
			SOCKET_SERVER(socketServerPort, connectionListener);
		}

		if (webServer !== undefined) {

			// create web socket server.
			WEB_SOCKET_SERVER(webServer, connectionListener);
		}
	}
});

/*
 * TCP 소켓 서버를 생성합니다.
 */
global.SOCKET_SERVER = METHOD({

	run : (port, connectionListener) => {
		//REQUIRED: port
		//REQUIRED: connectionListener

		let Net = require('net');
		
		let server = Net.createServer((conn) => {
			
			let methodMap = {};
			let sendKey = 0;
			
			let receivedStr = '';
			
			let clientInfo;

			let on;
			let off;
			let send;
			
			let runMethods = (methodName, data, sendKey) => {
				
				try {
					
					let methods = methodMap[methodName];

					if (methods !== undefined) {
	
						EACH(methods, (method) => {
	
							// run method.
							method(data,
	
							// ret.
							(retData) => {
	
								if (sendKey !== undefined) {
	
									send({
										methodName : '__CALLBACK_' + sendKey,
										data : retData
									});
								}
							});
						});
					}
				}
				
				// if catch error
				catch(error) {
					
					SHOW_ERROR('SOCKET_SERVER', error.toString(), {
						methodName : methodName,
						data : data
					});
				}
			};

			// when receive data
			conn.on('data', (content) => {

				let index;

				receivedStr += content.toString();

				while ((index = receivedStr.indexOf('\r\n')) !== -1) {
					
					let params = PARSE_STR(receivedStr.substring(0, index));

					if (params !== undefined) {
						runMethods(params.methodName, params.data, params.sendKey);
					}

					receivedStr = receivedStr.substring(index + 1);
				}
				
				clientInfo.lastRecieveTime = new Date();
			});

			// when disconnected
			conn.on('close', () => {
				
				runMethods('__DISCONNECTED');
				
				// free method map.
				methodMap = undefined;
			});

			// when error
			conn.on('error', (error) => {
				
				if (error.code !== 'ECONNRESET' && error.code !== 'EPIPE' && error.code !== 'ETIMEDOUT' && error.code !== 'ENETUNREACH' && error.code !== 'EHOSTUNREACH' && error.code !== 'ECONNREFUSED' && error.code !== 'EINVAL') {
					
					let errorMsg = error.toString();
					
					SHOW_ERROR('SOCKET_SERVER', errorMsg);
					
					runMethods('__ERROR', errorMsg);
				}
			});
			
			let ip = conn.remoteAddress;
			
			// IPv6 to IPv4
			if (ip !== undefined && ip.substring(0, 7) === '::ffff:') {
				ip = ip.substring(7);
			}

			connectionListener(

			// client info
			clientInfo = {
				
				ip : ip,
				
				connectTime : new Date()
			},

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

			// send to client.
			send = (methodNameOrParams, callback) => {
				//REQUIRED: methodNameOrParams
				//REQUIRED: methodNameOrParams.methodName	클라이언트에 on으로 설정된 메소드 이름
				//REQUIRED: methodNameOrParams.data			전송할 데이터
				//OPTIONAL: callback

				let methodName;
				let data;
				
				if (CHECK_IS_DATA(methodNameOrParams) !== true) {
					methodName = methodNameOrParams;
				} else {
					methodName = methodNameOrParams.methodName;
					data = methodNameOrParams.data;
				}
				
				if (conn !== undefined && conn.writable === true) {
					
					if (callback === undefined) {
						
						conn.write(STRINGIFY({
							methodName : methodName,
							data : data
						}) + '\r\n');
					}
					
					else {
						
						let callbackName = '__CALLBACK_' + sendKey;
	
						// on callback.
						on(callbackName, (data) => {
	
							// run callback.
							callback(data);
	
							// off callback.
							off(callbackName);
						});
						
						conn.write(STRINGIFY({
							methodName : methodName,
							data : data,
							sendKey : sendKey
						}) + '\r\n');
						
						sendKey += 1;
					}
					
					clientInfo.lastSendTime = new Date();
				}
			},

			// disconnect.
			() => {
				if (conn !== undefined) {
					conn.end();
					conn = undefined;
				}
			});
		});

		// listen.
		server.listen(port);

		console.log('[SOCKET_SERVER] ' + MSG({
			ko : 'TCP 소켓 서버가 실행중입니다. (포트:' + port + ')'
		}));
	}
});

/*
 * UDP 소켓 서버를 생성하는 CLASS
 */
global.UDP_SERVER = CLASS({

	init : (inner, self, port, requestListener) => {
		//REQUIRED: port
		//REQUIRED: requestListener

		let dgram = require('dgram');
		let server = dgram.createSocket('udp6');
		
		let send = self.send = (params) => {
			//REQUIRED: params
			//REQUIRED: params.ip
			//REQUIRED: params.port
			//REQUIRED: params.content
			
			let message = new Buffer(params.content);
			
			server.send(message, 0, message.length, params.port, params.ip);
		};
		
		server.on('message', (message, nativeRequestInfo) => {
			
			let ip = nativeRequestInfo.address;
			let port = nativeRequestInfo.port;
			
			// IPv6 to IPv4
			if (ip !== undefined && ip.substring(0, 7) === '::ffff:') {
				ip = ip.substring(7);
			}
			
			requestListener(
			
			// request info	
			{
				ip : ip,
				
				port : port
			},
			
			// content
			message.toString(),
			
			// response.
			(content) => {
				
				send({
					ip : ip,
					port : port,
					content : content
				});
			});
		});
		
		server.on('listening', () => {
			console.log('[UDP_SERVER] ' + MSG({
				ko : 'UDP 서버가 실행중입니다. (포트:' + port + ')'
			}));
		});
		
		server.bind(port);
	}
});

/*
 * 웹 서버를 생성하는 클래스
 */
global.WEB_SERVER = CLASS((cls) => {

	const DEFAULT_MAX_UPLOAD_FILE_MB = 10;
	
	const HTTP = require('http');
	const HTTPS = require('https');
	const FS = require('fs');
	const Path = require('path');
	const Querystring = require('querystring');
	const ZLib = require('zlib');
	const IncomingForm = require('formidable').IncomingForm;

	let getContentTypeFromExtension = cls.getContentTypeFromExtension = (extension) => {
		
		// png image
		if (extension === 'png') {
			return 'image/png';
		}

		// jpeg image
		if (extension === 'jpeg' || extension === 'jpg') {
			return 'image/jpeg';
		}

		// gif image
		if (extension === 'gif') {
			return 'image/gif';
		}

		// svg
		if (extension === 'svg') {
			return 'image/svg+xml';
		}

		// javascript
		if (extension === 'js') {
			return 'application/javascript';
		}

		// json document
		if (extension === 'json') {
			return 'application/json';
		}

		// css
		if (extension === 'css') {
			return 'text/css';
		}

		// text
		if (extension === 'text' || extension === 'txt') {
			return 'text/plain';
		}

		// markdown
		if (extension === 'markdown' || extension === 'md') {
			return 'text/x-markdown';
		}

		// html document
		if (extension === 'html') {
			return 'text/html';
		}

		// swf
		if (extension === 'swf') {
			return 'application/x-shockwave-flash';
		}

		// mp3
		if (extension === 'mp3') {
			return 'audio/mpeg';
		}

		// ogg
		if (extension === 'ogg') {
			return 'audio/ogg';
		}

		// ogv
		if (extension === 'ogv') {
			return 'video/ogg';
		}

		// mp4
		if (extension === 'mp4') {
			return 'video/mp4';
		}

		// webm
		if (extension === 'webm') {
			return 'video/webm';
		}

		return 'application/octet-stream';
	};

	let getEncodingFromContentType = cls.getEncodingFromContentType = (contentType) => {

		if (contentType === 'application/javascript' || contentType === 'text/javascript') {
			return 'utf-8';
		}

		if (contentType === 'application/json') {
			return 'utf-8';
		}

		if (contentType === 'text/css') {
			return 'utf-8';
		}

		if (contentType === 'text/plain') {
			return 'utf-8';
		}
		
		if (contentType === 'text/x-markdown') {
			return 'utf-8';
		}

		if (contentType === 'text/html') {
			return 'utf-8';
		}

		if (contentType === 'image/png') {
			return 'binary';
		}

		if (contentType === 'image/jpeg') {
			return 'binary';
		}

		if (contentType === 'image/gif') {
			return 'binary';
		}

		if (contentType === 'image/svg+xml') {
			return 'utf-8';
		}

		if (contentType === 'audio/mpeg') {
			return 'binary';
		}

		if (contentType === 'audio/ogg') {
			return 'binary';
		}

		if (contentType === 'video/ogv') {
			return 'binary';
		}

		if (contentType === 'video/mp4') {
			return 'binary';
		}

		if (contentType === 'video/webm') {
			return 'binary';
		}

		return 'binary';
	};
	
	let createCookieStrArray = (data) => {
		
		let strs = [];

		EACH(data, (value, name) => {
			if (CHECK_IS_DATA(value) === true) {
				strs.push(name + '=' + encodeURIComponent(value.value)
					+ (value.expireSeconds === undefined ? '' : '; expires=' + new Date(Date.now() + value.expireSeconds * 1000).toGMTString())
					+ (value.path === undefined ? '' : '; path=' + value.path)
					+ (value.domain === undefined ? '' : '; domain=' + value.domain));
			} else {
				strs.push(name + '=' + encodeURIComponent(value));
			}
		});

		return strs;
	};
	
	let parseCookieStr = cls.parseCookieStr = (cookieStr) => {
		
		let data = {};

		if (cookieStr !== undefined) {

			let splits = cookieStr.split(';');

			EACH(splits, (cookie) => {

				let parts = cookie.split('=');

				data[parts[0].trim()] = decodeURIComponent(parts[1]);
			});
		}

		return data;
	};
	
	return {

		init : (inner, self, portOrParams, requestListenerOrHandlers) => {
			//REQUIRED: portOrParams
			//OPTIONAL: portOrParams.port						HTTP 서버 포트
			//OPTIONAL: portOrParams.securedPort				HTTPS 서버 포트
			//OPTIONAL: portOrParams.securedKeyFilePath			SSL인증 .key 파일 경로
			//OPTIONAL: portOrParams.securedCertFilePath		SSL인증 .cert 파일 경로
			//OPTIONAL: portOrParams.rootPath					리소스 루트 폴더
			//OPTIONAL: portOrParams.version					캐싱을 위한 버전. 입력하지 않으면 캐싱 기능이 작동하지 않습니다.
			//OPTIONAL: portOrParams.preprocessors				프리프로세서들. 뷰 템플릿 등과 같이, 특정 확장자의 리소스를 응답하기 전에 내용을 변경하는 경우 사용합니다.
			//OPTIONAL: portOrParams.uploadURI					업로드를 처리할 URI. URI 문자열 혹은 URI 문자열 배열로 입력합니다.
			//OPTIONAL: portOrParams.uploadPath					업로드한 파일을 저장할 경로
			//OPTIONAL: portOrParams.maxUploadFileMB			최대 업로드 파일 크기 (MB). 입력하지 않으면 10MB로 지정됩니다.
			//OPTIONAL: portOrParams.isToNotUseResourceCache	true로 설정하면 리소스 캐시를 사용하지 않습니다.
			//OPTIONAL: requestListenerOrHandlers
			//OPTIONAL: requestListenerOrHandlers.notExistsResource		리소스가 존재하지 않는 경우
			//OPTIONAL: requestListenerOrHandlers.error					오류가 발생한 경우
			//OPTIONAL: requestListenerOrHandlers.requestListener		요청 리스너
			//OPTIONAL: requestListenerOrHandlers.uploadProgress		업로드 진행중
			//OPTIONAL: requestListenerOrHandlers.uploadOverFileSize	업로드 하는 파일의 크기가 maxUploadFileMB보다 클 경우
			//OPTIONAL: requestListenerOrHandlers.uploadSuccess			업로드가 정상적으로 완료된 경우

			let port;
			let securedPort;
			let securedKeyFilePath;
			let securedCertFilePath;
			let originRootPath;
			let version;
			let preprocessors;
			let uploadURI;
			let uploadPath;
			let maxUploadFileMB;
			let isToNotUseResourceCache;
			
			let notExistsResourceHandler;
			let errorHandler;
			let requestListener;
			let uploadProgressHandler;
			let uploadOverFileSizeHandler;
			let uploadSuccessHandler;
			
			let resourceCaches = {};
			let nativeServer;

			// init params.
			if (CHECK_IS_DATA(portOrParams) !== true) {
				port = portOrParams;
			} else {
				port = portOrParams.port;
				securedPort = portOrParams.securedPort;
				securedKeyFilePath = portOrParams.securedKeyFilePath;
				securedCertFilePath = portOrParams.securedCertFilePath;
				
				originRootPath = portOrParams.rootPath;
				
				if (portOrParams.version !== undefined) {
					version = String(portOrParams.version).trim();
				}
				
				preprocessors = portOrParams.preprocessors;
				
				uploadURI = portOrParams.uploadURI;
				uploadPath = portOrParams.uploadPath;
				maxUploadFileMB = portOrParams.maxUploadFileMB;
				
				isToNotUseResourceCache = portOrParams.isToNotUseResourceCache;
			}
			
			if (CONFIG.isDevMode === true) {
				isToNotUseResourceCache = true;
			}
			
			if (maxUploadFileMB === undefined) {
				maxUploadFileMB = DEFAULT_MAX_UPLOAD_FILE_MB;
			}

			if (requestListenerOrHandlers !== undefined) {
				if (CHECK_IS_DATA(requestListenerOrHandlers) !== true) {
					requestListener = requestListenerOrHandlers;
				} else {
					notExistsResourceHandler = requestListenerOrHandlers.notExistsResource;
					errorHandler = requestListenerOrHandlers.error;
					requestListener = requestListenerOrHandlers.requestListener;
					
					uploadProgressHandler = requestListenerOrHandlers.uploadProgress;
					uploadOverFileSizeHandler = requestListenerOrHandlers.uploadOverFileSize;
					uploadSuccessHandler = requestListenerOrHandlers.uploadSuccess;
				}
			}

			let serve = (nativeReq, nativeRes, isSecure) => {

				let headers = nativeReq.headers;
				let uri = nativeReq.url;
				let method = nativeReq.method.toUpperCase();
				let ip = headers['x-forwarded-for'];
				let acceptEncoding = headers['accept-encoding'];
				
				let paramStr;
				let isUploadURI;
				
				if (ip === undefined) {
					ip = nativeReq.connection.remoteAddress;
				}
				
				// IPv6 to IPv4
				if (ip !== undefined && ip.substring(0, 7) === '::ffff:') {
					ip = ip.substring(7);
				}

				if (acceptEncoding === undefined) {
					acceptEncoding = '';
				}

				if (uri.indexOf('?') !== -1) {
					paramStr = uri.substring(uri.indexOf('?') + 1);
					uri = uri.substring(0, uri.indexOf('?'));
				}

				uri = uri.substring(1);
				
				isUploadURI = CHECK_IS_ARRAY(uploadURI) === true ? CHECK_IS_IN({
					array : uploadURI,
					value : uri
				}) === true : uploadURI === uri;

				NEXT([
				(next) => {
					
					if (method === 'GET' || isUploadURI === true) {
						next();
					} else {
						
						let isAppendedParamStr;
						
						nativeReq.on('data', (data) => {
							
							if (isAppendedParamStr !== true) {
								if (paramStr === undefined) {
									paramStr = '';
								} else {
									paramStr += '&';
								}
								isAppendedParamStr = true;
							}
							
							paramStr += data;
						});

						nativeReq.on('end', () => {
							next();
						});
					}
				},

				() => {
					return () => {
						
						let params = Querystring.parse(paramStr);
						let data;
						let requestInfo;
						let rootPath = originRootPath;
						let isGoingOn;
						let originalURI = uri;
						let overrideResponseInfo = {};
						let isEncrypted = false;
						
						// 암호화 되어 있는 경우 복호화
						if (params.__ENCRYPT !== undefined) {
							
							params = Querystring.parse(ENCRYPT({
								password : params.__ENCRYPT,
								key : CONFIG.requestEncryptionKey
							}));
							
							isEncrypted = true;
						}
						
						EACH(params, (param, name) => {
							if (CHECK_IS_ARRAY(param) === true) {
								params[name] = param[param.length - 1];
							}
						});
						
						data = params.__DATA;
						
						if (data !== undefined) {
							data = PARSE_STR(data);
							delete params.__DATA;
						}
						
						requestInfo = {
							headers : headers,
							cookies : parseCookieStr(headers.cookie),
							isSecure : isSecure,
							uri : uri,
							method : method,
							params : params,
							data : data,
							ip : ip,
							isEncrypted : isEncrypted
						};
						
						let response = (contentOrParams) => {
							//REQUIRED: contentOrParams
							//OPTIONAL: contentOrParams.statusCode		HTTP 응답 상태
							//OPTIONAL: contentOrParams.headers			응답 헤더
							//OPTIONAL: contentOrParams.cookies			클라이언트에 전달할 HTTP 쿠키
							//OPTIONAL: contentOrParams.contentType		응답하는 컨텐츠의 종류
							//OPTIONAL: contentOrParams.buffer			응답 내용을 Buffer형으로 전달
							//OPTIONAL: contentOrParams.content			응답 내용을 문자열로 전달
							//OPTIONAL: contentOrParams.stream			FS.createReadStream와 같은 메소드로 스트림을 생성한 경우, 스트림을 응답으로 전달할 수 있습니다.
							//OPTIONAL: contentOrParams.totalSize		stream으로 응답을 전달하는 경우 스트림의 전체 길이
							//OPTIONAL: contentOrParams.startPosition	stream으로 응답을 전달하는 경우 전달할 시작 위치
							//OPTIONAL: contentOrParams.endPosition		stream으로 응답을 전달하는 경우 전달할 끝 위치
							//OPTIONAL: contentOrParams.encoding		응답 인코딩
							//OPTIONAL: contentOrParams.version			지정된 버전으로 웹 브라우저에 리소스를 캐싱합니다.
							//OPTIONAL: contentOrParams.isFinal			리소스가 결코 변경되지 않는 경우 true로 지정합니다. 그러면 version과 상관 없이 캐싱을 수행합니다.
							
							let statusCode;
							let cookies;
							let headers;
							let contentType;
							let content;
							let buffer;
							let stream;
							let totalSize;
							let startPosition;
							let endPosition;
							let encoding;
							let version;
							let isFinal;
							
							// writeHead에서 오류 발생 여지 있음
							try {
							
								if (requestInfo.isResponsed !== true) {
									
									if (CHECK_IS_DATA(contentOrParams) !== true) {
										content = contentOrParams;
									} else {
										
										statusCode = contentOrParams.statusCode;
										cookies = contentOrParams.cookies;
										headers = contentOrParams.headers;
										contentType = contentOrParams.contentType;
										content = contentOrParams.content;
										buffer = contentOrParams.buffer;
										
										stream = contentOrParams.stream;
										totalSize = contentOrParams.totalSize;
										startPosition = contentOrParams.startPosition;
										endPosition = contentOrParams.endPosition;
										
										encoding = contentOrParams.encoding;
										version = contentOrParams.version;
										
										if (version !== undefined) {
											version = version.trim();
										}
										
										isFinal = contentOrParams.isFinal;
									}
	
									if (headers === undefined) {
										headers = {};
									}
									
									if (cookies !== undefined) {
										headers['Set-Cookie'] = createCookieStrArray(cookies);
									}
	
									if (contentType !== undefined) {
	
										if (encoding === undefined) {
											encoding = getEncodingFromContentType(contentType);
										}
	
										headers['Content-Type'] = contentType + '; charset=' + encoding;
									}
	
									if (stream !== undefined) {
										
										headers['Content-Range'] = 'bytes ' + startPosition + '-' + endPosition + '/' + totalSize;
										headers['Accept-Ranges'] = 'bytes';
										headers['Content-Length'] = endPosition - startPosition + 1;
										
										nativeRes.writeHead(206, headers);
										
										stream.pipe(nativeRes);
									}
									
									else {
										
										if (content === undefined) {
											content = '';
										}
										
										if (statusCode === undefined) {
											statusCode = 200;
										}
										
										if (isToNotUseResourceCache !== true) {
											if (isFinal === true) {
												headers['ETag'] = 'FINAL';
											} else if (version !== undefined) {
												headers['ETag'] = version;
											}
										}
										
										// when gzip encoding
										if (encoding === 'utf-8' && acceptEncoding.match(/\bgzip\b/) !== TO_DELETE) {
		
											headers['Content-Encoding'] = 'gzip';
	
											ZLib.gzip(buffer !== undefined ? buffer : String(content), (error, buffer) => {
												
												// writeHead에서 오류 발생 여지 있음
												try {
													
													// 줄바꿈 제거
													EACH(headers, (value, name) => {
														headers[name] = value.trim();
													});
													
													nativeRes.writeHead(statusCode, headers);
													nativeRes.end(buffer, encoding);
												} catch (error) {
													SHOW_ERROR('WEB_SERVER', error.toString());
												}
											});
										}
		
										// when not encoding
										else {
											
											// 줄바꿈 제거
											EACH(headers, (value, name) => {
												headers[name] = value.trim();
											});
											
											nativeRes.writeHead(statusCode, headers);
											nativeRes.end(buffer !== undefined ? buffer : String(content), encoding);
										}
									}
	
									requestInfo.isResponsed = true;
								}
								
							} catch (error) {
								SHOW_ERROR('WEB_SERVER', error.toString());
							}
						};
						
						let responseError = (errorMsg) => {
							
							if (errorHandler !== undefined) {
								isGoingOn = errorHandler(errorMsg, requestInfo, response);
							} else {
								SHOW_ERROR('WEB_SERVER', errorMsg);
							}

							if (isGoingOn !== false && requestInfo.isResponsed !== true) {

								response(EXTEND({
									origin : {
										statusCode : 500
									},
									extend : overrideResponseInfo
								}));
							}
						};
						
						// when OPTIONS request
						if (method === 'OPTIONS') {
							response({
								headers : {
									'Access-Control-Allow-Origin' : '*',
									'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS'
								}
							});
						}
						
						// when upload request
						else if (isUploadURI === true) {
							
							CREATE_FOLDER(uploadPath, () => {
								
								// serve upload.
								if (method === 'POST') {
				
									let form = new IncomingForm();
									
									let fileDataSet = [];
									
									form.uploadDir = uploadPath;
									
									form.on('progress', (bytesRecieved, bytesExpected) => {
										
										if (uploadProgressHandler !== undefined) {
											uploadProgressHandler(params, bytesRecieved, bytesExpected, requestInfo);
										}
										
									}).on('field', (name, value) => {
				
										params[name] = value;
				
									}).on('file', (name, fileInfo) => {
				
										fileDataSet.push({
											path : fileInfo.path,
											size : fileInfo.size,
											name : fileInfo.name,
											type : fileInfo.type,
											lastModifiedTime : fileInfo.lastModifiedDate
										});
				
									}).on('end', () => {
										
										let totalFileSize = 0;
										
										EACH(fileDataSet, (fileData) => {
											totalFileSize += fileData.size;
										});
										
										if (totalFileSize > maxUploadFileMB * 1024 * 1024) {
											
											NEXT(fileDataSet, [
											(fileData, next) => {
												REMOVE_FILE(fileData.path, next);
											},
											
											() => {
												return () => {
													if (uploadOverFileSizeHandler !== undefined) {
														uploadOverFileSizeHandler(params, maxUploadFileMB, requestInfo, response);
													}
												};
											}]);
											
											return false;
										}
										
										else {
											
											NEXT(fileDataSet, [
											(fileData, next) => {
												
												let path = fileData.path;
												let fileSize = fileData.size;
												let fileType = fileData.type;
												
												fileData.ip = ip;
												
												if (fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/gif') {
					
													GRAPHICSMAGICK_READ_METADATA(path, {
														error : () => {
															next();
														},
														success : (metadata) => {
					
															if (metadata.exif !== undefined) {
					
																fileData.exif = metadata.exif;
					
																GRAPHICSMAGICK_CONVERT([path, '-auto-orient', path], {
																	error : errorHandler,
																	success : next
																});
					
															} else {
																next();
															}
														}
													});
					
												} else {
													next();
												}
											},
					
											() => {
												return () => {
													uploadSuccessHandler(params, fileDataSet, requestInfo, response);
												};
											}]);
										}
										
									}).on('error', (error) => {
										responseError(error.toString());
									});
				
									form.parse(nativeReq);
								}
							});
						}
						
						// when non-upload request
						else {
							
							NEXT([
							(next) => {
			
								if (requestListener !== undefined) {
									
									isGoingOn = requestListener(requestInfo, response, (newRootPath) => {
										rootPath = newRootPath;
									}, (_overrideResponseInfo) => {
			
										if (_overrideResponseInfo !== undefined) {
											overrideResponseInfo = _overrideResponseInfo;
										}
			
										DELAY(next);
									});
			
									// init properties again.
									uri = requestInfo.uri;
									method = requestInfo.method;
									params = requestInfo.params;
									headers = requestInfo.headers;
								}
			
								if (isGoingOn !== false && requestInfo.isResponsed !== true) {
									next();
								}
							},
			
							() => {
								return () => {
									
									// stream audio or video.
									if (headers.range !== undefined) {
										
										GET_FILE_INFO(rootPath + '/' + uri, {
											
											notExists : () => {
											
												response(EXTEND({
													origin : {
														statusCode : 404
													},
													extend : overrideResponseInfo
												}));
											},
											
											success : (fileInfo) => {
												
												let positions = headers.range.replace(/bytes=/, '').split('-');
												let totalSize = fileInfo.size;
												let startPosition = INTEGER(positions[0]);
												let endPosition = positions[1] === undefined || positions[1] === '' ? totalSize - 1 : INTEGER(positions[1]);
												
												// "start" option must be <= "end" option
												if (startPosition <= endPosition) {
													
													let stream = FS.createReadStream(rootPath + '/' + uri, {
														start : startPosition,
														end : endPosition
													}).on('open', () => {
														
														response(EXTEND({
															origin : {
																contentType : getContentTypeFromExtension(Path.extname(uri).substring(1)),
																totalSize : totalSize,
																startPosition : startPosition,
																endPosition : endPosition,
																stream : stream
															},
															extend : overrideResponseInfo
														}));
														
													}).on('error', (error) => {
														
														response(EXTEND({
															origin : {
																contentType : getContentTypeFromExtension(Path.extname(uri).substring(1)),
																totalSize : totalSize,
																startPosition : startPosition,
																endPosition : endPosition,
																content : error.toString()
															},
															extend : overrideResponseInfo
														}));
													});
												}
											}
										});
									}
									
									// check ETag.
									else if (isToNotUseResourceCache !== true && (overrideResponseInfo.isFinal !== true ?
			
									// check version.
									(version !== undefined && headers['if-none-match'] === version) :
			
									// check exists.
									headers['if-none-match'] !== undefined)) {
			
										// response cached.
										response(EXTEND({
											origin : {
												statusCode : 304
											},
											extend : overrideResponseInfo
										}));
									}
			
									// redirect correct version uri.
									else if (isToNotUseResourceCache !== true && overrideResponseInfo.isFinal !== true && version !== undefined && originalURI !== '' && params.version !== version) {
			
										response(EXTEND({
											origin : {
												statusCode : 302,
												headers : {
													'Location' : '/' + originalURI + '?' + Querystring.stringify(COMBINE([params, {
														version : version
													}])).trim()
												}
											},
											extend : overrideResponseInfo
										}));
									}
			
									// response resource file.
									else if (rootPath !== undefined && method === 'GET') {
										
										NEXT([
										(next) => {
			
											let resourceCache = resourceCaches[originalURI];
			
											if (resourceCache !== undefined) {
												next(resourceCache.buffer, resourceCache.contentType);
											} else {
												
												// serve file.
												READ_FILE(rootPath + '/' + uri, {
													
													notExists : () => {
			
														// not found file, so serve index.
														READ_FILE(rootPath + (uri === '' ? '' : ('/' + uri)) + '/index.html', {
			
															notExists : () => {
																
																if (notExistsResourceHandler !== undefined) {
																	isGoingOn = notExistsResourceHandler(rootPath + '/' + uri, requestInfo, response);
																}
																
																if (isGoingOn !== false && requestInfo.isResponsed !== true) {
								
																	response(EXTEND({
																		origin : {
																			statusCode : 404
																		},
																		extend : overrideResponseInfo
																	}));
																}
															},
															
															error : responseError,
															success : (buffer) => {
																next(buffer, 'text/html');
															}
														});
													},
			
													error : responseError,
													success : next
												});
											}
										},
			
										() => {
											return (buffer, contentType) => {
												
												let extension = Path.extname(uri).substring(1);
												
												if (preprocessors !== undefined && preprocessors[extension] !== undefined) {
													preprocessors[extension](buffer.toString(), response);
												} else {
													
													if (contentType === undefined) {
														contentType = getContentTypeFromExtension(extension);
													}
				
													if (isToNotUseResourceCache !== true && overrideResponseInfo.isFinal !== true && resourceCaches[originalURI] === undefined) {
														resourceCaches[originalURI] = {
															buffer : buffer,
															contentType : contentType
														};
													}
				
													response(EXTEND({
														origin : {
															buffer : buffer,
															contentType : contentType,
															version : version
														},
														extend : overrideResponseInfo
													}));
												}
											};
										}]);
			
									} else {
										response(EXTEND({
											origin : {
												statusCode : 404
											},
											extend : overrideResponseInfo
										}));
									}
								};
							}]);
						}
					};
				}]);
			};

			// init sever.
			if (port !== undefined) {
				
				nativeServer = HTTP.createServer((nativeReq, nativeRes) => {
					
					// writeHead에서 오류 발생 여지 있음
					try {
						
						if (securedPort === undefined) {
							serve(nativeReq, nativeRes, false);
						}
						
						else {
							nativeRes.writeHead(302, {
								'Location' : 'https://' + nativeReq.headers.host + (securedPort === 443 ? '' : ':' + securedPort) + nativeReq.url
							});
							nativeRes.end();
						}
						
					} catch (error) {
						SHOW_ERROR('WEB_SERVER', error.toString());
					}
					
				}).listen(port);
			}

			// init secured sever.
			if (securedPort !== undefined) {
				nativeServer = HTTPS.createServer({
					key : FS.readFileSync(securedKeyFilePath),
					cert : FS.readFileSync(securedCertFilePath)
				}, (nativeReq, nativeRes) => {
					serve(nativeReq, nativeRes, true);
				}).listen(securedPort);
			}
			
			let getNativeServer = self.getNativeServer = () => {
				return nativeServer;
			};
			
			let addPreprocessor = self.addPreprocessor = (params) => {
				//REQUIRED: params
				//REQUIRED: params.extension
				//REQUIRED: params.preprocessor
				
				let extension = params.extension;
				let preprocessor = params.preprocessor;
				
				if (preprocessors === undefined) {
					preprocessors = {};
				}
				
				preprocessors[extension] = preprocessor;
			};
			
			console.log('[WEB_SERVER] ' + MSG({
				ko : '웹 서버가 실행중입니다.' + (port === undefined ? '' : (' (HTTP 서버 포트:' + port + ')')) + (securedPort === undefined ? '' : (' (HTTPS 서버 포트:' + securedPort + ')'))
			}));
		}
	};
});

global.WEB_SERVER_HTTP2 = CLASS((cls) => {
	
	const HTTP2 = require('http2');
	const FS = require('fs');
	
	return {

		init : (inner, self, portOrParams, requestListenerOrHandlers) => {
			
			let port;
			let securedPort;
			let securedKeyFilePath;
			let securedCertFilePath;
			let uploadURI;
			
			let nativeServer;
			
			// init params.
			if (CHECK_IS_DATA(portOrParams) !== true) {
				port = portOrParams;
			} else {
				port = portOrParams.port;
				securedPort = portOrParams.securedPort;
				securedKeyFilePath = portOrParams.securedKeyFilePath;
				securedCertFilePath = portOrParams.securedCertFilePath;
				
				uploadURI = portOrParams.uploadURI;
			}
			
			let serve = (stream, headers, isSecure) => {
				
				let uri = headers[':path'];
				let method = headers[':method'].toUpperCase();
				let ip = headers.forwarded;
				let acceptEncoding = headers['accept-encoding'];
				
				let paramStr;
				let isUploadURI;
				
				if (ip === undefined) {
					ip = stream.session.socket.remoteAddress;
				}
				
				// IPv6 to IPv4
				if (ip !== undefined && ip.substring(0, 7) === '::ffff:') {
					ip = ip.substring(7);
				}

				if (acceptEncoding === undefined) {
					acceptEncoding = '';
				}

				if (uri.indexOf('?') !== -1) {
					paramStr = uri.substring(uri.indexOf('?') + 1);
					uri = uri.substring(0, uri.indexOf('?'));
				}

				uri = uri.substring(1);
				
				isUploadURI = CHECK_IS_ARRAY(uploadURI) === true ? CHECK_IS_IN({
					array : uploadURI,
					value : uri
				}) === true : uploadURI === uri;
				
				console.log(uri);
				console.log(headers[':method']);
				console.log(headers.forwarded, stream.session.socket.remoteAddress);
				console.log(acceptEncoding);
				console.log(paramStr);
				console.log(isUploadURI);
				
			};

			// init sever.
			if (port !== undefined) {
				
				nativeServer = HTTP2.createServer();
				
				nativeServer.on('stream', (stream, headers) => {
					
					console.log(stream, headers);
					
					if (securedPort === undefined) {
						serve(stream, headers, false);
					}
					
					else {
						stream.respond({
							'location' : 'https://' + nativeReq.headers.host + (securedPort === 443 ? '' : ':' + securedPort) + nativeReq.url,
							':status': 302,
						});
						stream.end();
					}
				});
				
				nativeServer.on('error', (error) => {
					SHOW_ERROR('WEB_SERVER', error.toString());
				});
				
				nativeServer.listen(port);
			}

			// init secured sever.
			if (securedPort !== undefined) {
				
				nativeServer = HTTP2.createSecureServer({
					key : FS.readFileSync(securedKeyFilePath),
					cert : FS.readFileSync(securedCertFilePath)
				});
				
				nativeServer.on('stream', (stream, headers) => {
					serve(stream, headers, true);
				});
				
				nativeServer.listen(securedPort);
			}
		}
	}
});

/*
 * 웹소켓 서버를 생성합니다.
 */
global.WEB_SOCKET_SERVER = METHOD({

	run : (webServer, connectionListener) => {
		//REQUIRED: webServer
		//REQUIRED: connectionListener

		let WebSocket = require('ws');
		let WebSocketServer = WebSocket.Server;
		
		let parseCookieStr = WEB_SERVER.parseCookieStr;
		
		let nativeConnectionListener = (conn, req) => {

			let headers = req.headers;

			let methodMap = {};
			let sendKey = 0;
			
			let clientInfo;
			let ip;
			
			let on;
			let off;
			let send;

			let runMethods = (methodName, data, sendKey) => {
				
				try {
					
					let methods = methodMap[methodName];
	
					if (methods !== undefined) {
	
						EACH(methods, (method) => {
	
							// run method.
							method(data,
	
							// ret.
							(retData) => {
	
								if (sendKey !== undefined) {
	
									send({
										methodName : '__CALLBACK_' + sendKey,
										data : retData
									});
								}
							});
						});
					}
				}
				
				// if catch error
				catch(error) {
					SHOW_ERROR('WEB_SOCKET_SERVER', error.toString());
				}
			};

			// when receive data
			conn.on('message', (str) => {

				let params = PARSE_STR(str);

				if (params !== undefined) {
					runMethods(params.methodName, params.data, params.sendKey);
				}
				
				clientInfo.lastRecieveTime = new Date();
			});

			// when disconnected
			conn.on('close', () => {

				runMethods('__DISCONNECTED');

				// free method map.
				methodMap = undefined;
			});

			// when error
			conn.on('error', (error) => {

				let errorMsg = error.toString();

				SHOW_ERROR('WEB_SOCKET_SERVER', errorMsg);

				runMethods('__ERROR', errorMsg);
			});

			ip = headers['x-forwarded-for'];

			if (ip === undefined) {
				ip = req.connection.remoteAddress;
			}
			
			// IPv6 to IPv4
			if (ip !== undefined && ip.substring(0, 7) === '::ffff:') {
				ip = ip.substring(7);
			}

			connectionListener(

			// client info
			clientInfo = {
				
				ip : ip,
				
				headers : headers,
				
				cookies : parseCookieStr(headers.cookie),
				
				connectTime : new Date()
			},

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

			// send to client.
			send = (methodNameOrParams, callback) => {
				//REQUIRED: methodNameOrParams
				//OPTIONAL: methodNameOrParams.methodName
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
				
				if (conn !== undefined && conn.readyState === WebSocket.OPEN) {
					
					try {
						
						if (callback === undefined) {
							
							conn.send(STRINGIFY({
								methodName : methodName,
								data : data
							}));
						}
	
						else {
							
							let callbackName = '__CALLBACK_' + sendKey;
		
							// on callback.
							on(callbackName, (data) => {
		
								// run callback.
								callback(data);
		
								// off callback.
								off(callbackName);
							});
							
							conn.send(STRINGIFY({
								methodName : methodName,
								data : data,
								sendKey : sendKey
							}));

							sendKey += 1;
						}
						
					} catch(error) {
						SHOW_ERROR('WEB_SOCKET_SERVER', error.toString(), methodNameOrParams);
					}
					
					clientInfo.lastSendTime = new Date();
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
		
		new WebSocketServer({
			server : webServer.getNativeServer()
		}).on('connection', nativeConnectionListener);
		
		console.log('[WEB_SOCKET_SERVER] ' + MSG({
			ko : '웹소켓 서버가 실행중입니다.'
		}));
	}
});

/*
 * CPU 각 코어 당 사용률을 반환합니다.
 */
global.CPU_USAGES = METHOD((m) => {
	
	let os = require('os');
	
	return {
		
		run : () => {
			
			let cpuInfos = os.cpus();
			let usages = [];
			
			EACH(cpuInfos, (cpuInfo) => {
				
				let total = 0;
				
				let idleTime;
				
				EACH(cpuInfo.times, (time, type) => {
					total += time;
					if (type === 'idle') {
						idleTime = time;
					}
				});
				
				usages.push((1 - idleTime / total) * 100);
			});
			
			return usages;
		}
	};
});

/*
 * 디스크 사용률을 반환합니다.
 */
global.DISK_USAGE = METHOD(() => {

	let diskspace = require('diskspace');

	return {

		run : (drive, callbackOrHandlers) => {
			//OPTIONAL: drive	확인할 디스크 드라이브
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//REQUIRED: callbackOrHandlers.success
			
			let errorHandler;
			let callback;

			if (callbackOrHandlers === undefined) {
				callbackOrHandlers = drive;
				drive = undefined;
			}
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}
			
			if (drive === undefined) {
				if (process.platform === 'win32') {
					drive = 'C';
				} else {
					drive = '/';
				}
			}
			
			diskspace.check(drive, (error, result) => {
				
				if (error !== TO_DELETE) {
					if (errorHandler !== undefined) {
						errorHandler(error.toString());
					} else {
						SHOW_ERROR('DISK_USAGE', error.toString());
					}
				}
				
				else if (result.status === 'READY') {
					callback((1 - result.free / result.total) * 100);
				}
				
				else {
					if (errorHandler !== undefined) {
						errorHandler(status);
					} else {
						SHOW_ERROR('DISK_USAGE', status);
					}
				}
			});
		}
	};
});

/*
 * 기기의 IP들을 반환합니다.
 */
global.GET_IPS = METHOD(() => {

	let OS = require('os');
	
	return {

		run : () => {
			
			let interfaces = OS.networkInterfaces();
			let ips = [];
			
			EACH(interfaces, (infos) => {
				EACH(infos, (info) => {
					ips.push(info.address);
				});
			});
			
			return ips;
		}
	};
});

/*
 * 메모리 사용률을 반환합니다.
 */
global.MEMORY_USAGE = METHOD((m) => {
	
	const os = require('os');
	const spawn = require('child_process').spawn;
	
	return {
		
		run : (callbackOrHandlers) => {
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//REQUIRED: callbackOrHandlers.success
			
			let errorHandler;
			let callback;
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}
			
			if (process.platform === 'linux') {
				
				let proc = spawn('free', []);
				proc.stdout.setEncoding('utf8');
				proc.stdout.on('data', (data) => {
					let split = data.toString().split(/\n/g)[1].split(/\s+/);
					
					// available / total
					callback((1 - INTEGER(split[6]) / INTEGER(split[1])) * 100);
				});
				
				if (errorHandler !== undefined) {
					proc.on('error', (error) => {
						errorHandler(error.toString());
					});
				}
			}
			
			else {
				callback((1 - os.freemem() / os.totalmem()) * 100);
			}
		}
	};
});

/*
 * 매일 정해진 시간마다 주어진 터미널 명령어들을 실행하는 데몬을 구동합니다.
 */
global.RUN_SCHEDULE_DAEMON = METHOD((m) => {
	
	let exec = require('child_process').exec;
	
	return {
		
		run : (schedules) => {
			//REQUIRED: schedules
			
			let lastMinute;
			
			INTERVAL(30, RAR(() => {
				
				let nowCal = CALENDAR();
				
				if (lastMinute !== nowCal.getMinute()) {
					
					EACH(schedules, (schedule) => {
						
						if (nowCal.getHour() === schedule.hour && nowCal.getMinute() === (schedule.minute === undefined ? 0 : schedule.minute)) {
							
							EACH(schedule.commands, (command) => {
								
								exec(command, {
									cwd : schedule.folderPath
								}, (error) => {
									if (error !== TO_DELETE) {
										SHOW_ERROR('RUN_SCHEDULE_DAEMON', error.toString());
									}
								});
							});
						}
					});
				}
				
				lastMinute = nowCal.getMinute();
			}));
		}
	};
});
