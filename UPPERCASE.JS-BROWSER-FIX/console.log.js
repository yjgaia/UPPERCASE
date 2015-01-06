/**
 * console object (fix)
 */
global.console = OBJECT({

	init : function(inner, self) {
		'use strict';

		var
		// log wrapper
		logWrapper,

		// log count
		logCount = 0,

		// log.
		log;

		self.log = log = function() {

			var
			// args
			args = arguments,

			// msg
			msg,

			// p
			p;

			msg = '';

			EACH(args, function(arg, i) {

				var
				// str
				str = JSON.stringify(arg);

				if ( typeof arg === 'string') {
					str = str.substring(1, str.length - 1);
				}

				msg += str;

				if (i < args.length - 1) {
					msg += ' ';
				}
			});

			if (logWrapper === undefined) {
				logWrapper = DIV({
					style : {
						position : 'fixed',
						left : 0,
						bottom : 0,
						backgroundColor : '#fff',
						width : '100%',
						zIndex : 999999,
						margin : 0
					}
				}).appendTo(BODY);
			}

			logWrapper.append( p = P({
				style : {
					padding : 2,
					margin : 0,
					borderTop : '1px solid #F0F0F0',
					fontWeight : 'bold',
					color : '#666'
				},
				c : msg
			}));

			logCount += 1;
			logWrapper.show();

			DELAY(5, function() {
				p.remove();

				logCount -= 1;

				if (logCount === 0) {
					logWrapper.remove();
					logWrapper = undefined;
				}
			});
		};
	}
});
