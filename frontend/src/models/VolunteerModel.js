import { observable } from 'mobx';

export default class VolunteerModel {
  id = Math.random();
  @observable name;
  @observable hours;

  constructor(name, hours) {
    this.name = name;
    this.hours = hours;
  }
}
