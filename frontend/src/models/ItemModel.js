import { observable } from 'mobx';

export default class ItemModel {
  id = Math.random();
  @observable name;

  constructor(name) {
    this.name = name;
  }
}
