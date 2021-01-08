window.appMeta = {
	name: 'booking',
	version: '1.0',
	createdBy: 'Cedrick F. Campoto',
	createdOn: 'January 2021',
	container:{
		header: document.querySelector('.body-header'),
		content: document.querySelector('.body-content'),
		footer: document.querySelector('.body-footer'),
	},
}

const routes = {
	home: ()=>{
		return new HomeController();
	},
}
const router = ()=>{
	let hash = urlParser.get('hash') || urlParser.replace({hash:'home'}) && urlParser.get('hash');
	if (hash in routes){
		routes[hash]().render();
	} else {
		console.warn('hash is not found in routes');
	}
}; 
window.onhashchange = (e) =>{
	router();
}
window.onload = (e)=>{
	router();
}
