import { action } from 'mobx';

export default class RegisterModel {
  @action
  register(username, password, type) {
    console.log("new user with ", username, ", ", password, ", ", type);
  }
}
