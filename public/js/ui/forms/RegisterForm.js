class RegisterForm extends AsyncForm {

   onSubmit(data) {
    User.register(data, (err, response) => {
        if (response && response.success) {
            this.element.reset();
            App.setState('user-logged');
            App.getModal('register').close();
        } else {
            alert(JSON.stringify(response.error));
            this.element.reset();
            this.element.querySelector('.form-group input').focus();
        }
    });
  }
}
