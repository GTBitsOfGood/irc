import StoreModel from './StoreModel';
import ItemModel from './ItemModel';
import ShoppingCartModel from './ShoppingCartModel';
import AuthModel from './AuthModel';

import RegisterModel from './RegisterModel';

export default class RootStore {
  constructor() {
    this.StoreModel = new StoreModel();
    this.ShoppingCartModel = new ShoppingCartModel();
    this.RegisterModel = new RegisterModel();
    this.AuthModel = new AuthModel();
  }
}
