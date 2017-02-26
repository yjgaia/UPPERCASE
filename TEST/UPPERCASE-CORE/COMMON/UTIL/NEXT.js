TEST('NEXT', (check) => {

	NEXT([
	(next) => {

		DELAY(1, () => {
			next(1);
		});

		NEXT(5, [
		(i, next) => {

			console.log('5 times, ' + i);

			DELAY(0.1, () => {
				next(i + 1);
			});
		},

		() => {
			return (i) => {
				check(i === 5);
			};
		}]);
	},

	(next) => {
		return (i) => {

			DELAY(1, () => {
				next(i + 1);
			});

			NEXT(['a', 'b', 'c', 'd', 'e'], [
			(alphabet, next) => {

				console.log('5 alphabets, ' + alphabet);

				DELAY(0.1, () => {
					next(alphabet);
				});
			},

			() => {
				return (alphabet) => {
					check(alphabet === 'e');
				};
			}]);
		};
	},

	() => {
		return (i) => {

			NEXT([
			(next) => {

				DELAY(1, () => {

					// to sixth.
					next.next(i + 1);
				});
			},

			(next) => {
				return (i) => {

					DELAY(1, () => {
						next(i + 1);
					});
				};
			},

			() => {
				return (i) => {
					check(i === 3);
				};
			}]);
		};
	}]);
});
