class Spinner extends Component{
	constructor(){
		super();
		this.isConnected = this.connected;
		this.template = (type)=>{
			return `<div data-name='container' class='modal spinner-modal is-active'>
			<div class='modal-background spinner-background'></div>
			<div class='loader${type}'></div>
		</div>`
		}
		this.active = new Array;
	}
	connected(){}
	render(type=1,increment){
		increment = increment == undefined;
		if (increment){
			this.active.length += 1;
		}
		!document.querySelector('.spinner-modal') && this.toElement(this.template(type)).appendTo(document.body, false);
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