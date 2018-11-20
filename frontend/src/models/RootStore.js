import StoreModel from './StoreModel';
import ItemModel from './ItemModel';
import ShoppingCartModel from './ShoppingCartModel';
import VolunteerTimeModel from './VolunteerTimeModel';

export default class RootStore {
  constructor() {
    this.StoreModel = new StoreModel();
    this.ShoppingCartModel = new ShoppingCartModel();
    this.VolunteerTimeModel = new VolunteerTimeModel();
  }
}
