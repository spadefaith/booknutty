const urlParser = {
	parse:function(){
		let hash, query;
		let loc = location.hash;
		let hasQuery = [...loc].includes('/');
		if (hasQuery){
			hash = loc.slice(1, loc.indexOf('/'));
			query = loc.slice(loc.indexOf('/')+1, loc.length)
				.split(',')
				.map((item)=>{
					let rec = ()=>{
						if (item.includes("%20")){
							item = item.replace("%20", " ");
							rec();
						}
					};rec();
					return item.trim();
				})
				.reduce((accu, iter)=>{
					if (iter){
						iter = iter.split('=');
						iter[0] = (isNaN(iter[0]))?iter[0].trim():iter[0];
						accu[iter[0]] = iter[1].trim();
					}
					return accu;
				}, {})
		} else {
			hash = loc.slice(1);
			query = {};
		}
		return {hash, query};
	},
	get:function(prop){
		let value;
		switch (prop){
			case 'hash':
				value = this.parse().hash;
			break;
			case 'query':
				value = this.parse().query;
			break;
		}
		return value;
	},
	replace:function(hashObj){
		let hash = this.util().toQueryString(hashObj);
		location.replace(hash);
		return true;
	},
	util:function(){
		return {
			toQueryString:(hashObj)=>{
				return hashObj.tools().reduce((accu,key,value)=>{
					if (key == 'hash'){
						accu += `#${value}/`;
					} else {
						accu += `${key}=${value},`
					}
					return accu;
				}, "")
			},
		}
	},
	query:function(){
		return {
			add:(obj)=>{
				let queryStr = this.get('query');
				queryStr = Object.assign(queryStr, obj);
				location.hash = `${this.util().toQueryString({hash:this.get('hash'),...queryStr})}`;
				return true;
			},
			update:(obj)=>{
				let queryStr = this.get('query');
				for (let key in queryStr){
					queryStr[key] = obj[key];
				}
				location.hash = `${this.get('hash')}${this.util().toQueryString(queryStr)}`;
				return hash
			},
			get:(...args)=>{
				return Array.from(args).reduce((accu, iter)=>{
					accu[iter] = (isNaN(this.get('query')[iter]))?this.get('query')[iter]:+this.get('query')[iter];
					return accu
				}, {});
			},
			pull:(state)=>{
				return JSON.parse(this.query().get(state)[state]);
			},
		}
	},
}