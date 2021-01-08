class Component{
	constructor(){
		this.template = null;
		this.isConnected = this.connected;
		this.elements = {};
	}
	connected(){/**the element is connected**/}
	_parse(markup){
		/*
		*returns an array of elements;
		*/
		let counter = {open: 0, close: 0};
		let cached = "";
		let splitted = markup.split(">");
		let trimmed = splitted.map((item)=>{
			item = item.trim();
			if (item){
				item += '>';
			}
			return item;
		});
		let grouped = trimmed.reduce((accu, iter, index)=>{
			let tag = iter.slice(iter.indexOf('<')+1, iter.indexOf(" "));
			if (iter.includes('</')){
				counter.close += 1;
				cached += iter;
			} else if (iter.includes('<')){
				//it saves the element without closing tag, like, input, br, hr, and so on.
				if (tag == 'input' || tag == 'hr' || tag == 'br' || tag == 'img'){
					counter.close += 1;
				}
				counter.open += 1;
				cached += iter;
			}
			if (counter.close == counter.open){
				if (cached){
					accu.push(cached);
				}
				cached = "";
			}
			return accu;
		}, []);
		let created = grouped.map((item)=>{
			let tag = item.slice(1, item.indexOf('>')).trim();
			if (tag.indexOf(" ") != -1){
				tag = tag.slice(0, tag.indexOf(" "));
			}
			let tempParent = this._tempParent(tag);
			tempParent.innerHTML = item;
			return tempParent.children[0];
		});
		return created;
	}
	_tempParent(tag){
		if (tag == 'tr'){
			return document.createElement('tbody');
		} else if (tag == 'tbody' || tag == 'thead' || tag == 'tfoot'){
			return document.createElement('table');
		} else if (tag == 'th' || tag == 'td'){
			return document.createElement('tr');
		}  else {
			return document.createElement('div');
		}
	}
	appendTo(root, cleanRoot = true){
		
		let elements = this.create(this.template);

		if (cleanRoot){
			root.innerHTML = "";
		}
		elements.forEach(element =>{
			if (root.contains(element)){
				element.remove();
			}
			root.appendChild(element);
			let interactives = Array.from(element.querySelectorAll('[data-name]'));
			if (element.dataset.name){
				interactives.push(element);
			}
			
			interactives.forEach(interactive=>{
				let name = interactive.dataset.name;
				if (name){
					let space = this.elements[name];
					if (space){
						let isArray = space instanceof Array;
						if (isArray){
							this.elements[name].push(interactive);
						} else {
							let content = this.elements[name];
							let store = new Array;
							store.push(content);
							store.push(interactive);
							
							this.elements[name] = store;
						}
					} else {
						this.elements[name] = interactive;
					}
				}
				
				

			});
		});
		this.isConnected();
		return Promise.resolve();
	}
	create(markup){
		return this._parse(markup);
	}
	toElement(markup){
		let arrayElement = this._parse(markup);
		return {
			appendTo:(root, cleanRoot = false)=>{
				if (cleanRoot){root.innerHTML = ""}
				arrayElement.forEach(element=>{
					root.appendChild(element);
					let elementArray = [...element.querySelectorAll('[data-name]')];
					element && element.dataset.name != undefined && elementArray.push(element);
					elementArray.forEach(item=>{
						let name = item.dataset.name;
						let space = this.elements[name];
						if (space){
							if (space instanceof Array){
								this.elements[name].push(item);
							} else {
								let arr = new Array;
								arr.push(space);
								arr.push(item);
								this.elements[name] = arr;
							}
						} else {
							this.elements[name] = item;
						}
					});
				})
				return (arrayElement.length == 1)? arrayElement[0]: true;
			},
		}
	}
}