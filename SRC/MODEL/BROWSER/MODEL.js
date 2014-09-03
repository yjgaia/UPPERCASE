FOR_BOX(function(box) {
	'use strict';

	OVERRIDE(box.MODEL, function(origin) {

		/**
		 * Model(include CRUD functions) class
		 */
		box.MODEL = CLASS({

			preset : function() {
				return origin;
			},

			init : function(inner, self) {

				var
				// create.
				create,

				// get.
				get,

				// update.
				update,

				// remove.
				remove,

				// find.
				find,

				// count.
				count,

				// check is exists.
				checkIsExists;

				OVERRIDE(self.create, function(origin) {

					self.create = create = function(data, callbackOrHandlers) {

						var
						// loading bar
						loadingBar = LOADING_BAR(),

						// callback.
						callback,

						// not valid handler.
						notValidHandler,

						// not valid handler.
						notAuthedHandler,

						// error handler.
						errorHandler;

						if (callbackOrHandlers !== undefined) {
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								notValidHandler = callbackOrHandlers.notValid;
								notAuthedHandler = callbackOrHandlers.notAuthed;
								errorHandler = callbackOrHandlers.error;
							}
						}

						origin(data, {
							success : function(savedData) {

								if (callback !== undefined) {
									callback(savedData);
								}

								loadingBar.done();
							},
							notValid : notValidHandler,
							notAuthed : notAuthedHandler,
							error : errorHandler
						});
					};
				});

				OVERRIDE(self.get, function(origin) {

					self.get = get = function(idOrParams, callbackOrHandlers) {

						var
						// loading bar
						loadingBar = LOADING_BAR(),

						// callback.
						callback,

						// not exists handler
						notExistsHandler,

						// not valid handler.
						notAuthedHandler,

						// error handler.
						errorHandler;

						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notExistsHandler = callbackOrHandlers.notExists;
							notAuthedHandler = callbackOrHandlers.notAuthed;
							errorHandler = callbackOrHandlers.error;
						}

						origin(idOrParams, {
							success : function(savedData) {
								callback(savedData);
								loadingBar.done();
							},
							notExists : notExistsHandler,
							notAuthed : notAuthedHandler,
							error : errorHandler
						});
					};
				});

				OVERRIDE(self.update, function(origin) {

					self.update = update = function(data, callbackOrHandlers) {

						var
						// loading bar
						loadingBar = LOADING_BAR(),

						// callback.
						callback,

						// not valid handler.
						notValidHandler,

						// not exists handler
						notExistsHandler,

						// not valid handler.
						notAuthedHandler,

						// error handler.
						errorHandler;

						if (callbackOrHandlers !== undefined) {
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								notValidHandler = callbackOrHandlers.notValid;
								notExistsHandler = callbackOrHandlers.notExists;
								notAuthedHandler = callbackOrHandlers.notAuthed;
								errorHandler = callbackOrHandlers.error;
							}
						}

						origin(data, {
							success : function(savedData) {

								if (callback !== undefined) {
									callback(savedData);
								}

								loadingBar.done();
							},
							notValid : notValidHandler,
							notExists : notExistsHandler,
							notAuthed : notAuthedHandler,
							error : errorHandler
						});
					};
				});

				OVERRIDE(self.remove, function(origin) {

					self.remove = remove = function(id, callbackOrHandlers) {

						var
						// loading bar
						loadingBar = LOADING_BAR(),

						// callback
						callback,

						// not exists handler
						notExistsHandler,

						// not valid handler.
						notAuthedHandler,

						// error handler
						errorHandler;

						if (callbackOrHandlers !== undefined) {
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								notExistsHandler = callbackOrHandlers.notExists;
								notAuthedHandler = callbackOrHandlers.notAuthed;
								errorHandler = callbackOrHandlers.error;
							}
						}

						origin(id, {
							success : function(savedData) {

								if (callback !== undefined) {
									callback(savedData);
								}

								loadingBar.done();
							},
							notExists : notExistsHandler,
							notAuthed : notAuthedHandler,
							error : errorHandler
						});
					};
				});

				OVERRIDE(self.find, function(origin) {

					self.find = find = function(params, callbackOrHandlers) {

						var
						// loading bar
						loadingBar = LOADING_BAR(),

						// callback
						callback,

						// not valid handler.
						notAuthedHandler,

						// error handler
						errorHandler;

						// init params.
						if (callbackOrHandlers === undefined) {
							callbackOrHandlers = params;
							params = undefined;
						}

						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notAuthedHandler = callbackOrHandlers.notAuthed;
							errorHandler = callbackOrHandlers.error;
						}

						origin(params, {
							success : function(savedData) {
								callback(savedData);
								loadingBar.done();
							},
							notAuthed : notAuthedHandler,
							error : errorHandler
						});
					};
				});

				OVERRIDE(self.count, function(origin) {

					self.count = count = function(params, callbackOrHandlers) {

						var
						// loading bar
						loadingBar = LOADING_BAR(),

						// callback
						callback,

						// not valid handler.
						notAuthedHandler,

						// error handler
						errorHandler;

						// init params.
						if (callbackOrHandlers === undefined) {
							callbackOrHandlers = params;
							params = undefined;
						}

						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notAuthedHandler = callbackOrHandlers.notAuthed;
							errorHandler = callbackOrHandlers.error;
						}

						origin(params, {
							success : function(savedData) {
								callback(savedData);
								loadingBar.done();
							},
							notAuthed : notAuthedHandler,
							error : errorHandler
						});
					};
				});

				OVERRIDE(self.checkIsExists, function(origin) {

					self.checkIsExists = checkIsExists = function(params, callbackOrHandlers) {

						var
						// loading bar
						loadingBar = LOADING_BAR(),

						// callback
						callback,

						// not valid handler.
						notAuthedHandler,

						// error handler
						errorHandler;

						// init params.
						if (callbackOrHandlers === undefined) {
							callbackOrHandlers = params;
							params = undefined;
						}

						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notAuthedHandler = callbackOrHandlers.notAuthed;
							errorHandler = callbackOrHandlers.error;
						}

						origin(params, {
							success : function(savedData) {
								callback(savedData);
								loadingBar.done();
							},
							notAuthed : notAuthedHandler,
							error : errorHandler
						});
					};
				});
			}
		});
	});
});
