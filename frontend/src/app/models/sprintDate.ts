import {Serializable} from './serializable';
import {isUndefined} from 'util';

export class SprintDate implements Serializable<SprintDate> {
  private date: number;
  private isWeekend: boolean;

  constructor() {
  }

  public getSprintDate(): number {
    return this.date;
  }

  public getIsWeekend(): boolean {
    return this.isWeekend;
  }

  deserialize(input): SprintDate {
    this.date = input.date;
    this.isWeekend = input.isWeekend;

    if (isUndefined(this.date)) {
      throw SyntaxError('SprintDate deserialization, property "date" is undefined');
    }
    if (isUndefined(this.isWeekend)) {
      throw SyntaxError('SprintDate deserialization, property "isWeekend" is undefined');
    }
    return this;
  }
}
