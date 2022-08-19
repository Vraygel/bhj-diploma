class AccountsWidget {

  constructor( element ) {
    if (!element) {
      throw new Error('пустой элемент');
    }
      this.element = element;
      this.registerEvents();
      this.update();
    }

  registerEvents() {
      this.element.addEventListener('click', event => {
        event.preventDefault();
        event.target.classList.contains('create-account') ? App.getModal('createAccount').open() : this.onSelectAccount(event.target.closest('.account'));
      });
  }

  update() {
    if (!User.current()) {
      return;
    }
    Account.list(User.current(), (err, response) => {
        if (response && response.data) {
            this.clear();
            for (let elem of response.data) {
                this.renderItem(elem);
            }
        }
    });
  }

  clear() {
    this.element.querySelectorAll('.account').forEach(item => item.remove());
  }
  onSelectAccount(element) {
    this.element.querySelector('.active') ? this.element.querySelector('.active').classList.remove('active') : ''
    element.closest('.account').classList.add('active')
    App.showPage('transactions', { account_id: element.dataset.id} );
  }

  getAccountHTML(item) {
    return `<li class='account' data-id='${item.id}'>
              <a href='#'>
                <span>${item.name}</span> /
                <span>${item.sum}</span>
              </a>
            </li>`;
  }

  renderItem(data){
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data));
  }
}