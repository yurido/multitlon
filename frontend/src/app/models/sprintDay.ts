import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class SprintDay implements Serializable<SprintDay> {
  private date: number;
  private isWeekend: boolean;
  private total: number

  constructor() {
  }

  public getSprintDate(): number {
    return this.date;
  }

  public getIsWeekend(): boolean {
    return this.isWeekend;
  }

  public getTotal(): number {
    return this.total;
  }

  deserialize(input): SprintDay {
    const serializator = new Serializator(SprintDay.name);
    this.date = serializator.getObjectProperty(input, 'date');
    this.isWeekend = serializator.getObjectProperty(input, 'isWeekend');
    this.total = serializator.getObjectProperty(input, 'total');
    return this;
  }
}
