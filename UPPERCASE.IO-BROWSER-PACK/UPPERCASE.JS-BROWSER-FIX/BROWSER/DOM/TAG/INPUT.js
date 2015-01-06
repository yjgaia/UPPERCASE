OVERRIDE(INPUT, function(origin) {
	'use strict';

	/**
	 * Input class (fix)
	 */
	global.INPUT = CLASS(function(cls) {

		var
		// get focusing input ids.
		getFocusingInputIds;

		cls.getFocusingInputIds = getFocusingInputIds = origin.getFocusingInputIds;

		return {

			preset : function() {
				return origin;
			},

			init : function(inner, self, params) {
				//OPTIONAL: params
				//OPTIONAL: params.placeholder

				var
				// placeholder
				placeholder;

				// init params.
				if (params !== undefined) {;
					placeholder = params.placeholder;
				}

				// simulate placeholder.
				if (placeholder !== undefined) {

					DELAY(function() {

						var
						// placeholder div
						placeholderDiv = DIV({
							style : {
								color : '#999',
								marginLeft : 4,
								marginTop : 2 - self.getHeight(),
								cursor : 'text'
							},
							c : placeholder
						}).insertAfter(self),

						// toggle placeholder.
						togglePlaceholder = function() {
							if (self.getValue() === '') {
								placeholderDiv.show();
							} else {
								placeholderDiv.hide();
							}
						};

						// when tap placeholder, then select input.
						EVENT({
							node : placeholderDiv,
							name : 'tap'
						}, function() {
							self.select();
						});

						// toggle placeholder when fire some events.

						EVENT({
							node : self,
							name : 'keydown'
						}, function() {
							DELAY(function() {
								togglePlaceholder();
							});
						});

						EVENT({
							node : self,
							name : 'keyup'
						}, function() {
							togglePlaceholder();
						});

						EVENT({
							node : self,
							name : 'change'
						}, function() {
							togglePlaceholder();
						});

						EVENT({
							node : self,
							name : 'blur'
						}, function() {
							togglePlaceholder();
						});
					});
				}
			}
		};
	});
});
