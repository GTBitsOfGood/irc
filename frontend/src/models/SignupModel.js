import { observable } from 'mobx';

import api from '../../assets/js/api';

export default class SignupModel {
  @observable user;
  @observable state;
  @observable onSignup = false;

  signup(username, password) {
    this.state = 'pending';
    api.post('/api/signup', { email: username, password})
      .then((res) => {
        if (res && res.setCookies && res.setCookies.token) {
          this.user = res.setCookies.token;
          console.log("user", this.user);
        }
        this.state = 'success'
      })
      .catch(() => this.state = 'error');
  }

  changeToSignup(){
      this.onSignup = true;
  }

}
