class TransactionsWidget {

  constructor( element ) {
    this.element = element,
    this.registerEvents()
  }
 
  registerEvents() {
    this.element.onclick = (event) => {
      event.target.classList.contains('create-income-button') ? App.getModal('newIncome').open() : App.getModal('newExpense').open()
    }  
  }
}


