import {Serializable} from './serializable';

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
    this.id = input.id;
    this.name = input.name;
    this.date = input.date;
    this.reps = input.reps;
    this.weight = input.weight;
    this.rawPoints = input.rawPoints;
    this.totalPoints = input.total;
    this.distance = input.distance;
    this.time = input.time;
    return this;
  }
}
