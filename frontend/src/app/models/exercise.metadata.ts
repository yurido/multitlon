import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class ExerciseMetadata implements Serializable<ExerciseMetadata> {
  private sid: string;
  private name: string;
  private item: string;
  private withReps: boolean;

  constructor() {
  }

  public getSid(): string {
    return this.sid;
  }

  public getName(): string {
    return this.name;
  }

  public getItem(): string {
    return this.item;
  }

  public isWithReps(): boolean {
    return this.withReps;
  }

  deserialize(input: object): ExerciseMetadata {
    const serializator = new Serializator(ExerciseMetadata.name);
    this.sid = serializator.getObjectProperty(input, 'sid');
    this.name = serializator.getObjectProperty(input, 'name');
    this.item = serializator.getObjectProperty(input, 'item');
    this.withReps = serializator.getObjectProperty(input, 'withReps');
    return this;
  }
}
