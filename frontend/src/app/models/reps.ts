import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class Reps implements Serializable<Reps> {
  private weight: string;
  private reps: number;

  constructor() {
  }

  public getWeight(): string {
    return this.weight;
  }

  public getReps(): number {
    return this.reps;
  }

  public setReps(reps: number): void {
    this.reps = reps;
  }

  public setWeight(weight: string): void {
    this.weight = weight;
  }

  deserialize(input): Reps {
    const serializator = new Serializator(Reps.name);
    this.weight = serializator.getObjectProperty(input, 'weight');
    this.reps = serializator.getObjectProperty(input, 'reps');
    return this;
  }
}
