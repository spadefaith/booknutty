String.prototype.tools = function (){
	return {
		getTag: (str)=>{
			let trimmed = str.trim();
			let opening = trimmed.slice(1,trimmed.indexOf(">")+1);
			return (opening.indexOf(" ")) ? opening.slice(0, opening.indexOf(" ")): opening.slice(0,opening.length);
		},
		toProperCase:()=>{
			let spaceCache = null;
			return [...this].map((item, index)=>{
				item = item.toLowerCase();
				if ((spaceCache && spaceCache == " ") || index == 0){
					item = item.toUpperCase();
				}
				spaceCache = item;
				return item;
			}).join("");
		},
	}
}