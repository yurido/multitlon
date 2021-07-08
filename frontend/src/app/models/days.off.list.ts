import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class DaysOffList implements Serializable<DaysOffList> {
  private daysOff: number[] = [];

  constructor() {}

  public getDaysOff(): number[] {
    return this.daysOff;
  }

  public setDaysOff(daysOff: number[]) {
    this.daysOff = daysOff;
  }

  deserialize(input: object): DaysOffList {
    const serializator = new Serializator(DaysOffList.name);
    const list = serializator.getObjectProperty(input, 'daysOff');
    for (const obj of list) {
      this.daysOff.push(obj);
    }
    return this;
  }

}
