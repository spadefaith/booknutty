Object.prototype.tools = function(){
	return {
		forEach:(fn)=>{
			for (let i = 0; i < Object.entries(this).length; i++){
				let [key, value] = Object.entries(this)[i];
				let func = fn(key, value);
				if (func == 'break'){
					func(key, value);
					break;
				}
			}
		},
		map:(fn)=>{
			let mapped = new Object;
			this.tools().forEach((key, value)=>{
				[key, value] = fn(key, value);
				mapped[key] = value;
			})
			return mapped;
		},
		reduce:(fn, initial)=>{
			this.tools().forEach((key, value)=>{
				initial = fn(initial, key, value);
			});
			return initial;
		},
		filter:(fn)=>{
			let filtered = new Object;
			this.tools().forEach((key, value)=>{
				let test = fn(key, value);
				if (test){
					filtered[key] = value;
				}
			});
			return filtered;
		},
		find:(fn)=>{
			let found = false;
			this.tools().forEach((key, value)=>{
				let test = fn(key, value);
				if (test){
					fn('break');
					found = {[key]: value};
				}
			});
			return found;
		},
		some:(fn)=>{
			let found = false;
			this.tools().forEach((key, value)=>{
				let test = fn(key, value);
				if (test){
					fn('break');
					found = test;
				}
			});
			return found;
		},
		length:()=>{
			let counter = 0;
			this.tools().forEach((key, value)=>{
				counter += 1;
			});
			return counter;
		},
		test:(criteria)=>{
			/*
				target = {date: July 5, qty: 12, description: a, id: 1}
				compare = {
					lower:{qty: 13}, //return row with value lower than this
					greater: {qty: 10}, //return row with value greater than this
					equal:{date: July 5, description: a}, //return row with value equal to this
					contain: {id: 1}, //return row with value containing this
					notContain: {qty: 1}, //return row with value not containing this
				}
			*/
			let target = this;
			let valid = Object.keys(criteria).every(item=>{
				return ['lower', 'greater', 'equal', 'contain', 'notContain'].includes(item);
			})
			if (!valid){
				return false;
			}
			let test = {true: 0, false: 0};
			criteria.tools().forEach((criteria, criterias)=>{
				switch (criteria){
					case 'equal':
						criterias.tools().forEach((key, value)=>{
							test[(target[key] == value)] += 1;
						});
					break;
					case 'lower':
						criterias.tools().forEach((key, value)=>{
							test[(target[key] < value)] += 1;
						});
					break;
					case 'greater':
						criterias.tools().forEach((key, value)=>{
							test[(target[key] < value)] += 1;
						});
					break;
					case 'contain':
						criterias.tools().forEach((key, value)=>{
							test[(target[key].includes(value))] += 1;
						});
					break;
					case 'notContain':
						criterias.tools().forEach((key, value)=>{
							test[!(target[key].includes(value))] += 1;
						});
					break;
				}
			});
			return !test.false
		},
		controlRange:(type = 'solid')=>{
			let obj = this;
			
			obj.max = obj.max - 1 || 0;
			obj.min = obj.min || 0;
			obj.current = Number(obj.current);
			
			if (obj.current > obj.max){
				obj.current = (type == 'transparent')?obj.min:obj.max;
			}
			if (obj.current < obj.min){
				obj.current = (type == 'transparent')?obj.max:obj.min;
			}
			return obj.current;
		},
		push:(obj)=>{
			return Object.assign(JSON.parse(JSON.stringify(this)), obj);
		}
	}
}