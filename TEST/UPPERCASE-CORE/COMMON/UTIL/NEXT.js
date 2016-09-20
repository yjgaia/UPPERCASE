TEST('NEXT', function(check) {
	'use strict';

	NEXT([
	function(next) {

		DELAY(1, function() {
			next(1);
		});

		NEXT(5, [
		function(i, next) {

			console.log('5 times, ' + i);

			DELAY(0.1, function() {
				next(i + 1);
			});
		},

		function() {
			return function(i) {
				check(i === 5);
			};
		}]);
	},

	function(next) {
		return function(i) {

			DELAY(1, function() {
				next(i + 1);
			});

			NEXT(['a', 'b', 'c', 'd', 'e'], [
			function(alphabet, next) {

				console.log('5 alphabets, ' + alphabet);

				DELAY(0.1, function() {
					next(alphabet);
				});
			},

			function() {
				return function(alphabet) {
					check(alphabet === 'e');
				};
			}]);
		};
	},

	function() {
		return function(i) {

			NEXT([
			function(next) {

				DELAY(1, function() {

					// to sixth.
					next.next(i + 1);
				});
			},

			function(next) {
				return function(i) {

					DELAY(1, function() {
						next(i + 1);
					});
				};
			},

			function() {
				return function(i) {
					check(i === 3);
				};
			}]);
		};
	}]);
});
