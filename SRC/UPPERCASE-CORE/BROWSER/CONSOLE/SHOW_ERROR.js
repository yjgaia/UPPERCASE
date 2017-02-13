FOR_BOX(function(box) {

	box.SHOW_ERROR = METHOD({

		run : function(tag, errorMsg, params) {
			//REQUIRED: tag
			//REQUIRED: errorMsg
			//OPTIONAL: params

			SHOW_ERROR(box.boxName + '.' + tag, errorMsg, params);
		}
	});
});