import {Serializable} from './serializable';
import {Serializator} from './serializator';

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
    const serializator = new Serializator(SprintDate.name);
    this.date = serializator.getObjectProperty(input, 'date');
    this.isWeekend = serializator.getObjectProperty(input, 'isWeekend');
    return this;
  }
}
