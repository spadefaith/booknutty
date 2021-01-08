﻿HTMLElement.prototype.getElementByName = function(selector){
	let found = Array.from(this.querySelectorAll('*')).reduce((accu,iter)=>{
		let name = iter.getAttribute('name');
		if (name){
			if (name == selector){
				accu.push(iter);
			}
		}
		return accu;
	}, [])
	return (found.length == 1) ? found[0]: found; 
}

HTMLElement.prototype.storage = function(){
	let stateName = 'xstate';
	return {
		has:()=>{
			return !!this.getAttribute(stateName);
		},
		_open:()=>{
			let state = this.getAttribute(stateName);
			if (!state){
				this.setAttribute(stateName, JSON.stringify(new Object));
				state = this.getAttribute(stateName);
			}
			return JSON.parse(state);
		},
		_close:(states)=>{
			states = JSON.stringify(states);
			this.setAttribute(stateName, states);
		},
		get:(attr)=>{
			let state = this.storage()._open();
			if (!(attr in state)){
				console.error(`there is no "${attr} state" in the storage!`);
			}
			return state[attr];
		},
		set:(key, value)=>{
			let states= this.storage()._open();
			states[key] = value;
			this.storage()._close(states);
			return this.storage();
		},
		trash: (name)=>{
			let states= this.storage()._open();
			states = states.tools().filter((key, value)=>{
				return key != name;
			});
			this.storage()._close(states);
		},
	}
}
NodeList.prototype.tools = function(){
	return {
		indexOf: (el)=>{
			return Array.from(this).indexOf(el);
		},
		forEach: (fn)=>{
			return Array.from(this).forEach(item=>{
				fn(item);
			});
		},
	}
}
HTMLCollection.prototype.tools = function(){
	return {
		indexOf: (el)=>{
			return Array.from(this).indexOf(el);
		},
		forEach: (fn)=>{
			return Array.from(this).forEach(item=>{
				fn(item);
			});
		},
	}
}
HTMLElement.prototype.toggler = function(obj){
	//this is the active element on focus || clicked;
	
	let {parent, siblings, show, hide} = obj;
	let activeChild = this;
	siblings.tools().forEach(item=>{
		if (item.classList.contains(show)){
			item.classList.toggle(show);
		}
	});
	
	let hasShow = activeChild.classList.contains(show);
	let hasHide = activeChild.classList.contains(hide);
	let already = hasShow || hasHide;
	
	let index = siblings.tools().indexOf(activeChild);

	parent.storage()
		.set('activeIndex', index)
		.set('toggling', true);
	
	if (already){
		//toggle hide and show;
		activeChild.classList.toggle(show);
		activeChild.classList.toggle(hide);
	} else {
		activeChild.classList.add(show);
	}
}
HTMLElement.prototype.lookBack = function(){
	return {
		_walk:(obj, base)=>{
			let type = Object.keys(obj)[0];
			let selector = obj[type];
			let parse = ()=>{
				let not = false;
				switch (type){
					case 'class':
						not = !base.classList.contains(selector);
						break;
					case 'tag':
						not = base.tagName != selector.toUpperCase();
						break;
					case 'id':
						not = base.id != selector;
						break;
					case 'name':
						not = (base.getAttribute('name')) ? base.getAttribute('name') != selector : true;
				}
				if (not){
					if (base.tagName != 'HTML'){
						base = base.parentElement;
						parse();
					} else {
						return base;
					}
				} else {
					return base;
				}
			}; parse();
			return base;
		},
		byClass:(classname)=>{return this.lookBack()._walk({class: classname}, this);},
		byId:(id)=>{return this.lookBack()._walk({id}, this);},
		byName:(name)=>{return this.lookBack()._walk({name}, this);},
		byTag:(tag)=>{return this.lookBack()._walk({tag}, this);},
	}
}
HTMLElement.prototype.tools = function(){
	return {
		setAttribute:(obj)=>{
			if (obj instanceof Object){
				obj.tools().forEach((key, value)=>{
					if (key == 'class'){
						this.classList.add(value);
					} else {
						this.setAttribute(key, value);
					}
				});
			}
		}
	}
}
HTMLFormElement.prototype.getInputData = function(selector){
	let inputs = querySelectorAll(selector);
	return Array.from(inputs).reduce((accu, iter)=>{
		accu[iter.id] = iter.value;
		return accu;
	},{})
}
HTMLTableRowElement.prototype.getCellsData = function(){
	let row = this;
	let ref = Number(row.dataset.ref);
	let data = Array.from(row.cells).reduce((accu, iter)=>{
		let id = iter.dataset.id;
		let content = iter.textContent;
		accu[id] = content;
		return accu;
	}, {});
	data['ref'] = ref;
	return data;
}