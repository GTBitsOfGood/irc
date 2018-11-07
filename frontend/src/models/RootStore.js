import StoreModel from './StoreModel';
import ItemModel from './ItemModel';
import ShoppingCartModel from './ShoppingCartModel';

export default class RootStore {
  constructor() {
    this.StoreModel = new StoreModel();
    this.ShoppingCartModel = new ShoppingCartModel();
  }
}
