/*
 * Configuration
 */
OVERRIDE(CONFIG, (origin) => {

	global.CONFIG = COMBINE([{
		
		defaultBoxName : 'UPPERCASE',
		
		title : 'UPPERCASE PROJECT',
		
		baseBackgroundColor : '#000',
		baseColor : '#fff'
		
		// maxThumbWidth
		// or
		// maxThumbHeight
		
	}, origin]);
});
