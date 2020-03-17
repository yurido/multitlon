import {Serializable} from './serializable';

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
    return this;
  }
}
