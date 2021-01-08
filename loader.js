class LibraryLoader{
	constructor(){
		this.storage = new Array;
		this.inserted = new Array;
		this.counter = -1;
		this.insertCounter = -1;
		this.serial = 0;
	}
	register(name, location, insertObj){
		let storage, parent;
		if (insertObj){
			storage = this.inserted;
			parent = insertObj.parent;
		} else {
			storage = this.storage;
		}
		
		let splitted = JSON.parse(JSON.stringify(location)).trim().split('.');
		let type = splitted.pop();
		let result;
		if (['js', 'css'].includes(type)){
			let element = this.factory(type, location, new Date().getTime()+'C'+this.serial, name);
			result = (!!parent)?{name, element, type, parent}:{name, element, type};
			storage.push(result);				
		} else {
			console.error(`theres a problem registering (${name}), do check the location!`);
		}
		this.serial += 1;
		return result;
	}
	_createElement(type, location, id, name){
		let element;
		if (type == 'js'){
			element = document.createElement('script');
			element.src = location;
			element.id = id;
			element.dataset.parent = name
			// element.async=true;
			return element;
		} else if (type == 'css'){
			element = document.createElement('link');
			element.href = location;
			element.dataset.parent = name
			element.rel = 'stylesheet';
			element.id = id;
			return element;
		}
	}
	factory(type, location, id, name){
		switch (type){
			case 'js':
			return this._createElement(type, location,id, name);
			case 'css':
			return this._createElement(type, location, id, name);
		}
	}
	insert(parent, filename, location){
		let {element, type} = this.register(filename, location,{parent, inserted:true});
	}
	loadInsert(callback){
		this.insertCounter = -1;
		let scripts = this.inserted.filter(item=>{
			if (item.type == 'css'){
				document.head.appendChild(item.element);
			}
			return item.type == 'js';
		});
		const loadInsert = ()=>{
			this.insertCounter += 1;
			if (this.insertCounter < scripts.length){
				let {type, element, name, id, parent} = scripts[this.insertCounter];
				let loader = document.querySelector(`[data-parent=${parent}]`);
				
				document.body.insertBefore(element, loader.nextSibling);
				
				element.onload = function(e){
					loadInsert();
				};
				element.onerror = function(e){
					loadInsert();
				};
			} else {
				this.inserted = new Array;
				console.log(`all ${this.counter} module is loaded`);
				// spinner.remove();
				callback && callback();
			}
		}; loadInsert();
	}
	load(array, callback){
		this.counter = -1;
		// spinner.render();
		array = [...new Set(array)].reduce((accu, iter)=>{
			let locate = this.storage.filter(item=>{
				return item.name == iter;
			});
			accu = accu.concat(locate);
			return accu;
		}, [])
		const loadTag = ()=>{
			this.counter += 1;
			if (this.counter < array.length){
				let {type, element, name} = array[this.counter];
				let id = element.id;
				if (document.getElementById(id)){
					loadTag();
				} else {
					((type == 'js')?document.body:document.head).appendChild(element);
					
					element.onload = function(e){
						loadTag()
					};
					element.onerror = function(e){
						loadTag()
					};
				}
			} else {
				if (this.inserted.length){
					this.loadInsert(callback)					
				} else {
					callback && callback();
					spinner.remove();
				}
			}
		}; loadTag();
	}
}