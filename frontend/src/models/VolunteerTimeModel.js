import { observable, computed, action } from "mobx";

import VolunteerModel from "./VolunteerModel";

export default class VolunteerTimeModel {
  @observable volunteers = [
    {name: 'Person 1', hours: 0},
    {name: 'Person 2', hours: 0},
    {name: 'Person 3', hours: 0}
  ];

  @action
  addTime(name, hours) {
    this.volunteers.forEach((volunteer) => {
      if (volunteer.name === name) {
        volunteer.hours = parseInt(volunteer.hours) + parseInt(hours);
      }
    });
  }

  @action
  addVolunteer(name) {
    this.volunteers.push(new VolunteerModel(name, 0));
  }
}
