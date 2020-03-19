import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class Exercise implements Serializable<Exercise> {
  private id: string;
  private name: string;
  private date: number;
  private reps: number;
  private weight: number;
  private rawPoints: number;
  private totalPoints: number;
  private distance: number;
  private time: number;

  constructor() {
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDate(): number {
    return this.date;
  }

  public getReps(): number {
    return this.reps;
  }

  public getWeight(): number {
    return this.weight;
  }

  public getRawPoints(): number {
    return this.rawPoints;
  }

  public getTotalPoints(): number {
    return this.totalPoints;
  }

  public getTime(): number {
    return this.time;
  }

  public getDistance(): number {
    return this.distance;
  }

  deserialize(input): Exercise {
    const serializator = new Serializator(Exercise.name);
    this.id = serializator.getObjectProperty(input, 'id');
    this.name = serializator.getObjectProperty(input, 'name');
    this.date = serializator.getObjectProperty(input, 'date');
    this.reps = serializator.getObjectProperty(input, 'reps');
    this.rawPoints = serializator.getObjectProperty(input, 'rawPoints');
    this.totalPoints = serializator.getObjectProperty(input, 'totalPoints');
    this.weight = serializator.getObjectProperty(input, 'weight');
    this.distance = serializator.getObjectProperty(input, 'distance');
    this.time = serializator.getObjectProperty(input, 'time');
    return this;
  }
}
