class CreateTransactionForm extends AsyncForm {

  constructor(element) {
    super(element)
    this.renderAccountsList()
  }

  renderAccountsList() {
    const ACCOUNTS_LIST = this.element.querySelector('.accounts-select');
    Account.list(User.current(), (err, response) => {
      if (response && response.data) {
        ACCOUNTS_LIST.innerHTML = '';
        response.data.forEach(item =>{
          ACCOUNTS_LIST.innerHTML += `<option value="${item.id}">${item.name}</option>`;
        })
      }
    })
  }

  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      if (response && response.success) {
        this.element.reset();  
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        App.update();  
      }
    });
  }
}