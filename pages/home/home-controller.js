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
    
    console.log(obj, this.searchCache);
    
    let combined = obj.concat(this.searchCache);
    
    combined = combined.reduce((accu, iter)=>{
      let [key, value] = iter;
      accu[key] = value;
      return accu;
    }, {})
    
    console.log(combined);

    // Create a test FormData object
    var formData = new FormData();
    
    
    for (let key in combined){
      formData.append(key, combined[key]);
    }
    for(var pair of formData.entries()) {
       console.log(pair[0]+ ', '+ pair[1]);
    }
    // Display the key/value pairs
    /*

    

    let scriptURL = 'https://script.google.com/macros/s/AKfycbx35_aNAbNP1gwQdSn4M0UALg2MUHAQ8v8n451KYrWeucchPqG2/exec';
    fetch(scriptURL, { method: 'POST', body: formData})
      .then(response => {
        console.log(response)
        swal({
          title: 'Successful',
          text: 'Your order is successfully booked!',
          icon: 'success',
        })
        this.formSearch.elements.form.reset();
        this.formBook.elements.form.reset();
        this.searchCache = {};
      })
      .catch(error => {
        console.log(swal);
        swal({
          title: 'Something went wrong!',
          text: 'Check your internet connection and try again!',
          icon: 'error',
        })
        console.log(error);
     })
     */
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
