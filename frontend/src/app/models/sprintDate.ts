import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class SprintDate extends Serializator implements Serializable<SprintDate> {
  private date: number;
  private isWeekend: boolean;

  constructor() {
    super(SprintDate.name);
  }

  public getSprintDate(): number {
    return this.date;
  }

  public getIsWeekend(): boolean {
    return this.isWeekend;
  }

  deserialize(input): SprintDate {
    this.date = super.getObjectProperty(input, 'date');
    this.isWeekend = super.getObjectProperty(input, 'isWeekend');
    return this;
  }
}
