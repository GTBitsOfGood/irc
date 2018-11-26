import { observable } from 'mobx';

import api from '../../assets/js/api';

export default class AuthModel {
  @observable user;
  @observable state;

  login(username, password) {
    this.state = 'pending';
    api.post('/api/login', { email: username, password})
      .then((res) => {
        this.user = res.setCookies.token;
        this.state = 'success'
      });
      .catch(() => this.state = 'error');
  }
}
