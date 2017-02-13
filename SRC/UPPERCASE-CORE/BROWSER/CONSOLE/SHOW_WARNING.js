FOR_BOX(function(box) {

	box.SHOW_WARNING = METHOD({

		run : function(tag, warningMsg, params) {
			//REQUIRED: tag
			//REQUIRED: warningMsg
			//OPTIONAL: params

			SHOW_WARNING(box.boxName + '.' + tag, warningMsg, params);
		}
	});
});