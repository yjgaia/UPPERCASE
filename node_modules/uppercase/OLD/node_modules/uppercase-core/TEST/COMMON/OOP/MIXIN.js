TEST('MIXIN', (check) => {
	
	let Movable = CLASS({
		
		init : (inner, self, name) => {
			//REQUIRED: name
			
			let move = self.move = (meters) => {
				console.log(name + ' moved ' + meters + 'm.');
			};
		}
	});
	
	let Talkable = CLASS({
		
		init : (inner, self, name) => {
			//REQUIRED: name
			
			let talk = self.talk = (meters) => {
				console.log(name + ': Hi!');
			};
		}
	});

	let Human = CLASS({
		
		init : (inner, self, name) => {
			//REQUIRED: name
			
			Movable.innerInit(inner, self, name);
			Talkable.innerInit(inner, self, name);
		}
	});

	let jake = Human('Jake');
	
	jake.move(3);
	
	jake.talk();
});
