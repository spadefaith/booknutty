class Spinner extends Component{
	constructor(){
		super();
		this.isConnected = this.connected;
		this.template = `
		      <div class='loader-container'>
			<div class='loader-content'>
			  <div class='loader is-loading'></div>
			</div>
		      </div>
		    `
		this.active = new Array;
	}
	connected(){}
	render(increment){
		increment = increment == undefined;
		if (increment){
			this.active.length += 1;
		}
		!document.querySelector('.loader-container') && this.toElement(this.template).appendTo(document.body, false);
	}
	remove(){
		if (this.active.length){
			this.active.length = this.active.length -1;
		}
		//check the active if there is remaining
		let container = this.elements.container;
		if (container){
			container.classList.toggle('is-active');
			setTimeout((e)=>{
				container.remove();
				this.elements = {};
				this.active.length && this.render(1,false);
			}, 500)			
		}
	}
}
const spinner = new Spinner;
