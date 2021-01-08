class PageHeader extends Component{
  constructor(template){
    super();
    this.template = template;
    this.isConnected = this.connected;
  }
  connected(){
    // console.log(this.elements)
    this._menuDropdown();
  }
  _brand(handler){
    this.elements.brand.addEventListener('click', handler);
  }
  _burger(handler){
    this.elements.burger.addEventListener('click', (e)=>{
      this.elements.burger.classList.toggle('is-active');
      this.elements.burger.lookBack().byClass('header-content').classList.toggle('is-active');
      handler();
    });
  }
  _menuDropdown(handler){
    this.elements.menu_dropdown.forEach(item=>{
      item.addEventListener('click', (e)=>{
        let target = e.target;
        let menus = document.querySelectorAll('.menu-dropdown.is-active');
        if (menus){
          menus.forEach(menu=>{
            if (menu != target.parentElement){
              menu.classList.toggle('is-active');
            }
          })
        }
        let dropdown = target.nextSibling;
        target.parentElement.classList.toggle('is-active');
      })
    })
  }
  _menu(handler){
    this.elements.menu.forEach(menu => {
      menu.addEventListener('click', (e)=>{
        handler({
          menu: e.target.dataset.menu,
        })
      })
    });
  }
}