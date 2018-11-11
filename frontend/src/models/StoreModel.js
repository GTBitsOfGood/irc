import { observable, computed, action } from "mobx";

import ItemModel from "./ItemModel";

export default class StoreModel {
  @observable items = [{name: 'Item1'}];

  @computed
  get unfinishedTodoCount() {
    return this.items.filter(todo => !todo.finished).length;
  }

  @action
  addTodo(title) {
    this.items.push(new ItemModel(title));
  }
}
