import { observable } from 'mobx';

import api from '../../assets/js/api';

export default class AuthModel {
  @observable user;
  @observable state;

  login(username, password) {
    this.state = 'pending';
    api.post('/api/login', { email: username, password})
      .then((res) => {
        if (res && res.setCookies && res.setCookies.token) {
          this.user = res.setCookies.token;
          console.log("user", this.user);
        }
        this.state = 'success'
      })
      .catch(() => this.state = 'error');
  }
}
