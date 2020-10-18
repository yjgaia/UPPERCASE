/*
 * V8 힙의 덤프를 작성합니다.
 */
global.HEAPDUMP = METHOD(() => {

    let heapdump = require('heapdump');

    return {

        run: () => {

            let cal = CALENDAR();
            let filename = cal.getYear() + '-' + cal.getMonth(true) + '-' + cal.getDate(true) + ' ' + cal.getHour(true) + '-' + cal.getMinute(true) + '-' + cal.getSecond(true) + '.heapsnapshot';

            console.log('[HEAPDUMP] 덤프 파일 ' + filename + '을 생성중입니다.');

            CREATE_FOLDER('__HEAP', () => {

                heapdump.writeSnapshot('__HEAP/' + filename, (error) => {
                    if (error !== TO_DELETE) {
                        SHOW_ERROR('HEAPDUMP', error.toString());
                    } else {
                        console.log(CONSOLE_GREEN('[HEAPDUMP] 덤프 파일 ' + filename + '을 생성했습니다.'));
                    }
                });
            });
        }
    };
});
