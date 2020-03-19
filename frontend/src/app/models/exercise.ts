import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class Exercise extends Serializator implements Serializable<Exercise> {
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
    super(Exercise.name);
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
    this.id = super.getObjectProperty(input, 'id');
    this.name = super.getObjectProperty(input, 'name');
    this.date = super.getObjectProperty(input, 'date');
    this.reps = super.getObjectProperty(input, 'reps');
    this.rawPoints = super.getObjectProperty(input, 'rawPoints');
    this.totalPoints = super.getObjectProperty(input, 'totalPoints');
    this.weight = super.getObjectProperty(input, 'weight');
    this.distance = super.getObjectProperty(input, 'distance');
    this.time = super.getObjectProperty(input, 'time');
    return this;
  }
}
