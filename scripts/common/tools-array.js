Array.prototype.tools = function(){
	return {
		toOptions: ()=>{
			return this.map(item=>{
				if (item.xvalue){
					return `<option data-xvalue='${item.xvalue}'>${item.display}</option>`					
				} else {
					return `<option data-value='${item.value}'>${item.display}</option>`					
				}
			}).join("")
		},
		total: (field)=>{
			return this.reduce((accu, iter)=>{
				if (field){
					accu += Number(iter[field]) || 0;					
				} else {
					accu += Number(iter) || 0;
				}
				return accu;
			}, 0)
		},
		mapped:(arrayOfObjectProperties, values=false)=>{
			if (values && arrayOfObjectProperties.length > 1){
				values = false;
			}
			return this.map(item=>{
				if (values){
					return item[arrayOfObjectProperties[0]];
				} else {
					return arrayOfObjectProperties.reduce((accu,prop)=>{
						accu[prop] = item[prop];
						return accu;
					}, {})
				}
			})
		},
		toCSV:(fileName)=>{
			if (!this.length) {return null;}
			let csv = this.reduce((accu,iter, index)=>{
				if (index == 0){
					accu += Object.keys(iter).join(',');
					accu += '\n';
				}
				accu += Object.values(iter).join(',');
				accu += '\n';
				return accu;
			}, "");
			fileName = fileName || 'export.csv';
			if (!csv.match(/^data:text\/csv/i)) {
				csv = 'data:text/csv;charset=utf-8,' + csv;
			}
			let data = encodeURI(csv);
			let link = document.createElement('a');
			link.setAttribute('href', data);
			link.setAttribute('download', fileName);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
		unique:(targetField, fn)=>{
			return this.reduce((accu, iter)=>{
				let has = JSON.parse(JSON.stringify(accu)).some(item=>{
					console.log(item)
					console.log(iter[targetField], item[targetField],iter[targetField] == item[targetField])
					return iter[targetField] == item[targetField]
				});
				if (!has){
					let trap = fn(iter);
					accu.push(trap);
				}
				return accu;
			}, []);
		},
	}
	
}