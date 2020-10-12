/*
 * 매일 정해진 시간마다 주어진 터미널 명령어들을 실행하는 데몬을 구동합니다.
 */
global.RUN_SCHEDULE_DAEMON = METHOD((m) => {

	let exec = require('child_process').exec;

	return {

		run: (schedules) => {
			//REQUIRED: schedules

			let lastMinute;

			INTERVAL(30, RAR(() => {

				let nowCal = CALENDAR();

				if (lastMinute !== nowCal.getMinute()) {

					EACH(schedules, (schedule) => {

						if (nowCal.getHour() === schedule.hour && nowCal.getMinute() === (schedule.minute === undefined ? 0 : schedule.minute)) {

							EACH(schedule.commands, (command) => {

								exec(command, {
									cwd: schedule.folderPath
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
