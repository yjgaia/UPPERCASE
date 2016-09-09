/**
 * 매일 정해진 시간마다 정해진 터미널 명령어들을 실행합니다.
 */
global.RUN_SCHEDULE_DAEMON = METHOD(function(m) {
	'use strict';
	
	var
	//IMPORT: exec
	exec = require('child_process').exec;
	
	return {
		
		run : function(schedules) {
			//REQUIRED: schedules
			
			INTERVAL(60, RAR(function() {
				
				var
				// now cal
				nowCal = CALENDAR();
				
				EACH(schedules, function(schedule) {
					
					if (nowCal.getHour() === schedule.hour && nowCal.getMinute() === (schedule.minute === undefined ? 0 : schedule.minute)) {
						
						EACH(schedule.commands, function(command) {
							
							exec(command, function(error) {
								if (error !== TO_DELETE) {
									SHOW_ERROR('[NODE] RUN_SCHEDULE_DAEMON ERROR: ' + error.toString());
								}
							});
						});
					}
				});
			}));
		}
	};
});
