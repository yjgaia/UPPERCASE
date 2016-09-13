TEST('CLASS', function(ok) {
	'use strict';

	// test with classes.
	RUN(function() {

		var
		// Animal
		Animal,

		// Horse
		Horse,

		// Snake
		Snake,

		// Singleton
		Singleton,

		// sam
		sam,

		// tom
		tom;

		Animal = CLASS(function(cls) {

			var
			// static property
			staticText = 'Creature',

			// get static text.
			getStaticText;

			cls.getStaticText = getStaticText = function() {
				return staticText;
			};

			return {

				init : function(inner, self, params) {
					//REQUIRED: params
					//REQUIRED: params.name
					//REQUIRED: params.color

					var
					// name
					name = params.name,

					// color
					color = params.color,

					// move. (public method)
					move,

					// eat. (protected method)
					eat;

					self.move = move = function(meters) {
						console.log(name + ' moved ' + meters + 'm.');
					};

					inner.eat = eat = function() {
						console.log('delicious.');
					};
				},

				afterInit : function(inner) {
					inner.eat();
				}
			};
		});

		Snake = CLASS({

			preset : function() {
				return Animal;
			},

			init : function(inner, self, params) {
				//REQUIRED: params
				//REQUIRED: params.name
				//REQUIRED: params.color

				var
				// name
				name = params.name,

				// color
				color = params.color,

				// move.
				move;

				OVERRIDE(self.move, function(origin) {

					self.move = move = function(meters) {
						console.log('Slithering...');
						origin(5);
					};
				});

				// run protected method.
				inner.eat();
			}
		});

		Horse = CLASS({

			preset : function(params) {

				// preset parameters.
				params.color = 'brown';

				return Animal;
			},

			init : function(inner, self, params) {
				//REQUIRED: params
				//REQUIRED: params.name
				//REQUIRED: params.color

				var
				// name
				name = params.name,

				// color
				color = params.color,

				// move.
				move,

				// run. (private method)
				run;

				OVERRIDE(self.move, function(origin) {

					self.move = move = function(meters) {
						console.log('Galloping...');
						origin(45);
					};
				});

				run = function() {
					console.log('CLOP! CLOP!');
				};
			}
		});

		sam = Snake({
			name : 'Sammy the Python',
			color : 'red'
		});

		tom = Horse({
			name : 'Tommy the Palomino'
		});

		sam.move();
		tom.move();

		// protected method, private method -> undefined, undefined
		ok(sam.eat === undefined);
		ok(tom.run === undefined);

		// static text
		ok(Animal.getStaticText() === 'Creature');
		ok(Horse.mom.getStaticText() === 'Creature');

		// check is instance of
		ok(sam.type === Snake);
		ok(sam.type !== Animal);
		ok(sam.checkIsInstanceOf(Snake) === true);
		ok(sam.checkIsInstanceOf(Animal) === true);

		// singleton class
		Singleton = CLASS(function(cls) {

			var
			// singleton class
			singleton;

			cls.getInstance = function() {
				if (singleton === undefined) {
					singleton = Singleton();
				}
				return singleton;
			};

			return {

				init : function(inner, self) {

					var
					// num
					num = 0,

					// get num.
					getNum;

					self.getNum = getNum = function() {

						num += 1;

						return num;
					};
				}
			};
		});

		ok(Singleton.getInstance().getNum() === 1);
		ok(Singleton.getInstance().getNum() === 2);
		ok(Singleton.getInstance().getNum() === 3);
	});
});
