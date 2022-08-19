class UserWidget {

  constructor(element){
    if (!element) throw new Error('Ошибка');
    this.element = element;
  }

  update(){
    let user = User.current();
    if(user) {
      document.querySelector('.user-name').textContent = user.name;
    }
  }
}

