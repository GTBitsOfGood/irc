import StoreModel from './StoreModel';
import ItemModel from './ItemModel';
import ShoppingCartModel from './ShoppingCartModel';
import VolunteerTimeModel from './VolunteerTimeModel';
import AuthModel from './AuthModel';
import SignupModel from './SignupModel';

import RegisterModel from './RegisterModel';

export default class RootStore {
  constructor() {
    this.StoreModel = new StoreModel();
    this.ShoppingCartModel = new ShoppingCartModel();
    this.RegisterModel = new RegisterModel();
    this.VolunteerTimeModel = new VolunteerTimeModel();
    this.AuthModel = new AuthModel();
    this.SignupModel = new SignupModel();
  }
}
