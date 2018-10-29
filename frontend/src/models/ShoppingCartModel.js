import { observable, action } from 'mobx';

export default class ShoppingCartModel {
  @observable items = {};

  @action
  addItem(name, quantity) {
    if (this.items[name]) {
      this.items[name] = this.items[name] + quantity;
    } else {
      this.items[name] = quantity;
    }
  }
}
