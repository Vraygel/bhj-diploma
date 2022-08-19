class TransactionsPage {

  constructor( element ) {
    if (!element) {
      throw new Error('пустой элемент');
    }
    this.element = element;
    this.registerEvents();
  }

  update() {
    if(this.lastOptions){
      this.render(this.lastOptions)
    }
    return
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if(event.target.closest('.transaction__remove')){
        this.removeTransaction(event.target.closest('.transaction__remove').dataset.id);
        return;
      }
      if(event.target.closest('.remove-account')){
        this.removeAccount();
        return;
      } 
    });  
  }

  removeAccount() {
    if (!this.lastOptions) {
      return;
    }
    if(confirm('Вы действительно хотите удалить счёт?')){
      Account.remove({ id: this.lastOptions.account_id }, (err, response) => {
        if (response && response.success) {
          App.updateWidgets();
          App.updateForms();
          this.clear();
        }
      });  
    }
  }

  removeTransaction(id) {
    if(confirm('Вы действительно хотите удалить эту транзакцию?')){
      Transaction.remove({ id }, (err, response) => {
        if (response && response.success) {
          App.update();
        }
      });
    }
  }

  render(options){
    if(!options){
      return
    }
    this.lastOptions = options;
    Account.get(options.account_id, (err, response) => {
      if (response && response.success) {
        this.renderTitle(response.data.name);
      }
    });
    Transaction.list(options, (err, response) => {
      this.renderTransactions(response.data);
        
    });
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  renderTitle(name){
    this.element.querySelector('.content-title').textContent = name;
  }

  formatDate(date){
    let nowDate = new Date(date);
    let day = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    let time = {
      hour: 'numeric',
      minute: 'numeric',
    };
    return `${nowDate.toLocaleString("ru", day)}  в ${nowDate.toLocaleString("ru", time)}`
  }

  getTransactionHTML(item){
    let created_at = this.formatDate(item.created_at);
    let id = item.id;
    let name = item.name;
    let sum = item.sum;
    let type = item.type; 

    return `
    <div class="transaction transaction_${type} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${name}</h4>
          
          <div class="transaction__date">${created_at}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      
          ${sum} <span class="currency">₽</span>
      </div>
    </div>
      <div class="col-md-2 transaction__controls">
        
        <button class="btn btn-danger transaction__remove" data-id="${id}">
            <i class="fa fa-trash"></i>  
        </button>
      </div>
    </div>`
  }

  renderTransactions(data){
    const CONTENT = this.element.querySelector('.content');
    CONTENT.innerHTML = '';
    for (let item of data) {
      CONTENT.innerHTML += this.getTransactionHTML(item);
    }
  }
}