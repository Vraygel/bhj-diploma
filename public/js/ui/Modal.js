class Modal {

  constructor(element){
    if (!element) {
      throw new Error('пустой элемент');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.querySelectorAll('[data-dismiss="modal"]').forEach(
      item => item.addEventListener('click', (event) => {
        event.preventDefault()
        this.onClose(event);
      })
    );  
  }
  
  onClose(event) {
    event.preventDefault()
    this.close();
  }

  open() {
    this.element.style.display = 'block';
  }

  close(){
    this.element.style.display = 'none';
  }
}

