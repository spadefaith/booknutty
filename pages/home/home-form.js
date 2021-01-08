class HomeForm extends Component{
  constructor(template){
    super();
    this.template = template;
  }
  _submit(handler){
    this.elements.form.addEventListener('submit', (e)=>{
      e.preventDefault();
      let formData = new FormData(this.elements.form);
      let obj = {};
      for (let entry of formData.entries()){
        let [key, value] = entry;
        obj[key] = value;
      }
      handler(obj);
    })
  }
  _close(handler){
    let close = this.elements.close;
    if (close){
      close.addEventListener('click', (e)=>{
        this.elements.container.classList.remove('is-active');
        handler();
        setTimeout(()=>{
          this.elements.container.remove();
        }, 100);
      })
    }
  }
}