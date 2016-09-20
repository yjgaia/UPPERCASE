/**
 * 날짜를 처리할 때 Date형을 좀 더 쓰기 편하도록 개선한 CALENDAR 클래스
 */
global.CALENDAR = CLASS({

	init : function(inner, self, date) {
		'use strict';
		//OPTIONAL: date	입력하지 않으면 현재 시각을 기준으로 생성합니다.

		var
		// get year.
		getYear,

		// get month.
		getMonth,

		// get date.
		getDate,

		// get day.
		getDay,

		// get hour.
		getHour,

		// get minute
		getMinute,

		// get second.
		getSecond;

		if (date === undefined) {
			date = new Date();
		}

		self.getYear = getYear = function() {
			return date.getFullYear();
		};

		self.getMonth = getMonth = function(isFormal) {
			//OPTIONAL: isFormal	true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09
			
			var
			// month
			month = date.getMonth() + 1;
			
			if (isFormal === true) {
				if (month < 10) {
					return '0' + month;
				} else {
					return '' + month;
				}
			} else {
				return month;
			}
		};

		self.getDate = getDate = function(isFormal) {
			//OPTIONAL: isFormal	true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09
			
			var
			// date
			d = date.getDate();
			
			if (isFormal === true) {
				if (d < 10) {
					return '0' + d;
				} else {
					return '' + d;
				}
			} else {
				return d;
			}
		};

		self.getDay = getDay = function() {
			return date.getDay();
		};

		self.getHour = getHour = function(isFormal) {
			//OPTIONAL: isFormal	true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09
			
			var
			// hour
			hour = date.getHours();
			
			if (isFormal === true) {
				if (hour < 10) {
					return '0' + hour;
				} else {
					return '' + hour;
				}
			} else {
				return hour;
			}
		};

		self.getMinute = getMinute = function(isFormal) {
			//OPTIONAL: isFormal	true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09
			
			var
			// minute
			minute = date.getMinutes();
			
			if (isFormal === true) {
				if (minute < 10) {
					return '0' + minute;
				} else {
					return '' + minute;
				}
			} else {
				return minute;
			}
		};

		self.getSecond = getSecond = function(isFormal) {
			//OPTIONAL: isFormal	true로 설정하면 10보다 작은 수일 경우 앞에 0을 붙힌 문자열을 반환합니다. ex) 01, 04, 09
			
			var
			// second
			second = date.getSeconds();
			
			if (isFormal === true) {
				if (second < 10) {
					return '0' + second;
				} else {
					return '' + second;
				}
			} else {
				return second;
			}
		};
	}
});
