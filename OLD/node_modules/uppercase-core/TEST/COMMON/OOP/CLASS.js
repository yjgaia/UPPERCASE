TEST('CLASS', (check) => {

	let Animal = CLASS((cls) => {

		let staticText = 'Creature';
		
		let getStaticText = cls.getStaticText = () => {
			return staticText;
		};

		return {

			init : (inner, self, params) => {
				//REQUIRED: params
				//REQUIRED: params.name
				//REQUIRED: params.color

				let name = params.name;
				let color = params.color;

				// public method
				let move = self.move = (meters) => {
					console.log(name + ' moved ' + meters + 'm.');
				};

				// protected method
				let eat = inner.eat = () => {
					console.log('delicious.');
				};
			},

			afterInit : (inner) => {
				inner.eat();
			}
		};
	});

	let Snake = CLASS({

		preset : () => {
			return Animal;
		},

		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.color

			let name = params.name;
			let color = params.color;
			
			let move;

			OVERRIDE(self.move, (origin) => {

				move = self.move = (meters) => {
					console.log('Slithering...');
					origin(5);
				};
			});

			// run protected method.
			inner.eat();
		}
	});

	let Horse = CLASS({

		preset : (params) => {

			// preset parameters.
			params.color = 'brown';

			return Animal;
		},

		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.color

			let name = params.name;
			let color = params.color;
			
			let move;

			OVERRIDE(self.move, (origin) => {

				move = self.move = (meters) => {
					console.log('Galloping...');
					origin(45);
				};
			});

			// private method
			let run = () => {
				console.log('CLOP! CLOP!');
			};
		}
	});

	let sam = Snake({
		name : 'Sammy the Python',
		color : 'red'
	});

	let tom = Horse({
		name : 'Tommy the Palomino'
	});

	sam.move();
	tom.move();

	// protected method, private method -> undefined, undefined
	check(sam.eat === undefined);
	check(tom.run === undefined);

	// static text
	check(Animal.getStaticText() === 'Creature');
	check(Horse.mom.getStaticText() === 'Creature');

	// check is instance of
	check(sam.type === Snake);
	check(sam.type !== Animal);
	check(sam.checkIsInstanceOf(Snake) === true);
	check(sam.checkIsInstanceOf(Animal) === true);

	// singleton class
	let Singleton = CLASS((cls) => {

		let singleton;

		let getInstance = cls.getInstance = () => {
			if (singleton === undefined) {
				singleton = Singleton();
			}
			return singleton;
		};

		return {

			init : (inner, self) => {

				let num = 0;

				let getNum = self.getNum = () => {

					num += 1;

					return num;
				};
			}
		};
	});

	check(Singleton.getInstance().getNum() === 1);
	check(Singleton.getInstance().getNum() === 2);
	check(Singleton.getInstance().getNum() === 3);
});
