import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class AvailableExerciseList implements Serializable<AvailableExerciseList> {
  private exercises: string[] = [];

  constructor() {
  }

  public getExercises(): string[] {
    return this.exercises;
  }

  deserialize(input: object): AvailableExerciseList {
    const serializator = new Serializator(AvailableExerciseList.name);
    const list = serializator.getObjectProperty(input, 'exercises');
    for (const obj of list) {
      this.exercises.push(obj);
    }
    return this;
  }
}
