class AsyncForm {

  constructor(element) {
    if (!element) {
      throw new Error('пустой элемент');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.onsubmit = event => {
    event.preventDefault();
    this.submit();
    }
  }

  getData() {
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries())
  }

  onSubmit(options){
  }

  submit() {
    this.onSubmit(this.getData());
  }
}
