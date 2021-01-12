class HomeController{
  constructor(){
    this.searchCache = null;
  }
  render(){
    this.pageHeader = new PageHeader(Templates.header);
    this.formSearch = new HomeForm(Templates.formSearch);
    this.formContainer = new HomeFormContainer(Templates.formContainer);
    this.pageFooter = new PageFooter(Templates.footer);

    this.pageHeader.appendTo(appMeta.container.header);
    this.formContainer.appendTo(appMeta.container.content)
    this.formSearch.appendTo(this.formContainer.elements.container, false);
    this.pageFooter.appendTo(appMeta.container.footer);

    this.activateEvents();
  }
  _searchHandler(obj){
    this.searchCache = obj;
    //open a modal for booking;
    this.formBook = new HomeForm(Templates.formBook);
    this.formBook.appendTo(this.formContainer.elements.container, false);
    if (this.formBook){
      this.formBook._submit(this._bookHandler.bind(this))
      this.formBook._close(this._bookCloseHandler.bind(this))
    }
  }
  _bookHandler(obj){
    
    obj._id = String(new Date().getTime());
    obj = Object.entries(obj);
    this.searchCache = Object.entries(this.searchCache);
    
    let combined = obj.concat(this.searchCache);
    
    combined = combined.reduce((accu, iter)=>{
      let [key, value] = iter;
      accu[key] = value || "";
      return accu;
    }, {})
    
    var url = new URL('https://script.google.com/macros/s/AKfycbz4wg0weFO7m8ByMP4lkNZaLpxv0IDxKaTMSIFtR2ozPamiIp8/exec'),
    params = combined;
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    fetch(url).then(response=>{
        console.log(response)
        swal({
          title: 'Successful',
          text: 'Your order is successfully booked!',
          icon: 'success',
        })
        this.formSearch.elements.form.reset();
        this.formBook.elements.form.reset();
        this.searchCache = {};
        this.formBook.elements.container.remove();
    }).catch((e)=>{
        console.log(swal);
        swal({
          title: 'Something went wrong!',
          text: 'Check your internet connection and try again!',
          icon: 'error',
        })
        console.log(e);
    })
     
  }
  _bookCloseHandler(){
    console.log('closed');
  }
  _burgerHandler(){
    let body = document.body;
    body.classList.toggle('is-active');
  }
  _headerHandler(){

  }
  activateEvents(){
    this.formSearch._submit(this._searchHandler.bind(this));

    this.pageHeader._burger(this._burgerHandler.bind(this));
  }
}
