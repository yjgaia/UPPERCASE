/*
 * HTML input 태그와 대응되는 클래스
 */
global.INPUT = CLASS((cls) => {

	let focusingInputIds = [];

	let getFocusingInputIds = cls.getFocusingInputIds = (id) => {
		return focusingInputIds;
	};

	return {

		preset : () => {
			return DOM;
		},

		params : () => {
			return {
				tag : 'input'
			};
		},

		init : (inner, self, params) => {
			//OPTIONAL: params
			//OPTIONAL: params.id		id 속성
			//OPTIONAL: params.cls		class 속성
			//OPTIONAL: params.style	스타일
			//OPTIONAL: params.name
			//OPTIONAL: params.type
			//OPTIONAL: params.placeholder
			//OPTIONAL: params.value
			//OPTIONAL: params.min
			//OPTIONAL: params.max
			//OPTIONAL: params.step
			//OPTIONAL: params.accept
			//OPTIONAL: params.isMultiple
			//OPTIONAL: params.isOffAutocomplete
			//OPTIONAL: params.isOffAutocapitalize
			//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
			//OPTIONAL: params.on		이벤트
			
			let name;
			let type;
			let placeholder;
			let min;
			let max;
			let step;
			let accept;
			let isMultiple;
			let isOffAutocomplete;
			let isOffAutocapitalize;

			let getName;
			let getValue;
			let getFiles;
			let setValue;
			let select;
			let focus;
			let blur;
			let setPlaceholder;
			
			let toggleCheck;
			let checkIsChecked;

			// init params.
			if (params !== undefined) {
				name = params.name;
				type = params.type;
				placeholder = params.placeholder;
				min = params.min;
				max = params.max;
				step = params.step;
				accept = params.accept;
				isMultiple = params.isMultiple;
				isOffAutocomplete = params.isOffAutocomplete;
				isOffAutocapitalize = params.isOffAutocapitalize;
			}

			if (type !== undefined) {
				inner.setAttr({
					name : 'type',
					value : type
				});
			}

			if (type !== 'submit' && type !== 'reset') {

				if (name !== undefined) {
					inner.setAttr({
						name : 'name',
						value : name
					});
				}

				if (placeholder !== undefined) {
					inner.setAttr({
						name : 'placeholder',
						value : placeholder
					});
				}
				
				if (accept !== undefined) {
					inner.setAttr({
						name : 'accept',
						value : accept
					});
				}

				if (isMultiple === true) {
					inner.setAttr({
						name : 'multiple',
						value : isMultiple
					});
				}

				if (isOffAutocomplete === true) {
					inner.setAttr({
						name : 'autocomplete',
						value : 'off'
					});
				}
				
				if (isOffAutocapitalize === true) {
					inner.setAttr({
						name : 'autocapitalize',
						value : 'off'
					});
				}
				
				getName = self.getName = () => {
					return name;
				};

				getValue = self.getValue = () => {
					if (type === 'checkbox' || type === 'radio') {
						return self.getEl().checked;
					}
					return self.getEl().value;
				};

				getFiles = self.getFiles = () => {
					return self.getEl().files;
				};

				select = self.select = () => {
					if (type === 'file') {
						self.getEl().click();
					} else {
						self.getEl().select();
					}
				};

				focus = self.focus = () => {
					self.getEl().focus();
				};

				blur = self.blur = () => {
					self.getEl().blur();
				};

				if (type === 'checkbox' || type === 'radio') {

					toggleCheck = self.toggleCheck = (e) => {

						if (self.getEl().checked === true) {
							self.getEl().checked = false;
						} else {
							self.getEl().checked = true;
						}

						EVENT.fireAll({
							node : self,
							name : 'change'
						});

						return self.getEl().checked;
					};

					checkIsChecked = self.checkIsChecked = () => {
						return self.getEl().checked;
					};

					EVENT({
						node : self,
						name : 'keyup'
					}, (e) => {
						
						if (e !== undefined && e.getKey() === 'Enter') {
							
							DELAY(() => {
								
								EVENT.fireAll({
									node : self,
									name : 'change'
								});
							});
						}
					});
				}
				
				else {
					
					setPlaceholder = self.setPlaceholder = (_placeholder) => {
						//REQUIRED: placeholder
						
						placeholder = _placeholder;
						
						inner.setAttr({
							name : 'placeholder',
							value : placeholder
						});
					};
				}
			}
			
			if (type === 'range') {
				
				if (min !== undefined) {
					inner.setAttr({
						name : 'min',
						value : min
					});
				}
				
				if (max !== undefined) {
					inner.setAttr({
						name : 'max',
						value : max
					});
				}
				
				if (step !== undefined) {
					inner.setAttr({
						name : 'step',
						value : step
					});
				}
			}

			self.setValue = setValue = (value) => {
				//REQUIRED: value

				if (type === 'checkbox' || type === 'radio') {

					if (value === true) {

						if (self.getEl().checked !== true) {

							self.getEl().checked = true;

							EVENT.fireAll({
								node : self,
								name : 'change'
							});

						} else {
							self.getEl().checked = true;
						}

					} else {

						if (self.getEl().checked === true) {

							self.getEl().checked = false;

							EVENT.fireAll({
								node : self,
								name : 'change'
							});

						} else {
							self.getEl().checked = false;
						}
					}

				} else {

					if (self.getEl().value !== value) {

						self.getEl().value = value;

						EVENT.fireAll({
							node : self,
							name : 'change'
						});

					} else {
						self.getEl().value = value;
					}
				}
			};

			EVENT({
				node : self,
				name : 'focus'
			}, () => {
				getFocusingInputIds().push(self.id);
			});

			EVENT({
				node : self,
				name : 'blur'
			}, () => {

				REMOVE({
					array : getFocusingInputIds(),
					value : self.id
				});
			});

			self.on('remove', () => {

				REMOVE({
					array : getFocusingInputIds(),
					value : self.id
				});
			});
			
			// can radio be false
			if (type === 'radio') {
				
				EVENT({
					node : self,
					name : 'touchstart'
				}, () => {
					
					if (checkIsChecked() === true) {
						
						EVENT_ONCE({
							node : self,
							name : 'touchend'
						}, () => {
							DELAY(() => {
								setValue(false);
							});
						});
					}
				});
			}
		},

		afterInit : (inner, self, params) => {
			//OPTIONAL: params
			//OPTIONAL: params.id		id 속성
			//OPTIONAL: params.cls		class 속성
			//OPTIONAL: params.style	스타일
			//OPTIONAL: params.name
			//OPTIONAL: params.type
			//OPTIONAL: params.placeholder
			//OPTIONAL: params.value
			//OPTIONAL: params.accept
			//OPTIONAL: params.isMultiple
			//OPTIONAL: params.isOffAutocomplete
			//OPTIONAL: params.isOffAutocapitalize
			//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
			//OPTIONAL: params.on		이벤트
			
			let type;
			let value;

			// init params.
			if (params !== undefined) {
				type = params.type;
				value = params.value;
			}

			if (value !== undefined) {

				if (type === 'checkbox' || type === 'radio') {

					if (value === true) {

						if (self.getEl().checked !== true) {
							self.getEl().checked = true;
						} else {
							self.getEl().checked = true;
						}

					} else {

						if (self.getEl().checked === true) {
							self.getEl().checked = false;
						} else {
							self.getEl().checked = false;
						}
					}

				} else {

					if (self.getEl().value !== value) {
						self.getEl().value = value;
					} else {
						self.getEl().value = value;
					}
				}
			}
		}
	};
});
