/*
 * create web server.
 */
global.WEB_SERVER = METHOD({

	run : function(port, requestListener) {'use strict';
		//REQUIRED: port
		//REQUIRED: requestListener

		var
		//IMPORT: webserver
		webserver = require('webserver');

		webserver.create().listen(port, function(nativeReq, nativeRes) {

			requestListener(

			// request info
			{
			},

			// response.
			function(params) {

				var
				// status code
				statusCode = params.statusCode === undefined ? 200 : params.statusCode,

				// headers
				headers = params.headers === undefined ? {} : params.headers,

				// content type
				contentType = params.contentType,

				// content
				content = params.content,

				// encoding
				encoding = params.encoding === undefined ? 'utf-8' : encoding,

				// cache time
				cacheTime = params.cacheTime;

				if (contentType !== undefined) {
					headers['Content-Type'] = contentTypes;
				}

				if (cacheTime !== undefined) {
					headers['ETag'] = cacheTime;
					headers['Last-Modified'] = new Date(cacheTime).toUTCString();
				}

				nativeRes.statusCode = statusCode;
				nativeRes.headers = headers;
				nativeRes.write(content);
				nativeRes.close();
			});
		});

		console.log('[UPPERCASE.JS-WEB_SERVER] RUNNING WEB SERVER... (PORT:' + port + ')');
	}
});
