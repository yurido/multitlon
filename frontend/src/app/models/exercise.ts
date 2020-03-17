import {Serializable} from './serializable';

export class Exercise implements Serializable<Exercise> {
  private id: string;
  private name: string;
  private date: number;
  private reps: number;
  private weight: number;
  private rawPoints: number;
  private totalPoints: number;

  constructor() {
  }

  get getId(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getDate(): number {
    return this.date;
  }

  get getReps(): number {
    return this.reps;
  }

  get getWeight(): number {
    return this.weight;
  }

  get getRawPoints(): number {
    return this.rawPoints;
  }

  get getTotalPoints(): number {
    return this.totalPoints;
  }

  deserialize(input): Exercise {
    this.id = input.id;
    this.name = input.name;
    this.date = input.date;
    this.reps = input.reps;
    this.weight = input.weight;
    this.rawPoints = input.rawPoints;
    this.totalPoints = input.total;
    return this;
  }
}
