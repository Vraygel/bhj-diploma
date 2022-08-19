class Sidebar {

  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const BUTTON = document.querySelector('.sidebar-toggle');
    const BODY = document.querySelector('.skin-blue');
    
    BUTTON.addEventListener('click', () =>{
      if(BODY.classList.contains('sidebar-open') && BODY.classList.contains('sidebar-collapse')){
      BODY.classList.remove('sidebar-open')
      BODY.classList.remove('sidebar-collapse')
      return
      }
      BODY.classList.add('sidebar-open')
      BODY.classList.add('sidebar-collapse')
    })
  }

  static initAuthLinks() {
    document.querySelector('.menu-item_login > a').onclick = event => {
      event.preventDefault();
      App.getModal('login').open();
    };
    document.querySelector('.menu-item_register > a').onclick = event => {
      event.preventDefault();
      App.getModal('register').open();
    };
    document.querySelector('.menu-item_logout > a').onclick = event => {
      event.preventDefault();
      User.logout((err, response) => {
        if (response && response.success) App.setState('init');
      });
    };
  }
}

