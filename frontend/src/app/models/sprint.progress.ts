import {Serializable} from './serializable';
import {ExerciseProgress} from './exercise.progress';
import {Serializator} from './serializator';

export class SprintProgress implements Serializable<SprintProgress> {
  private sprintProgress: ExerciseProgress[] = [];

  constructor() {}

  public getSprintProgress(): ExerciseProgress[] {
    return this.sprintProgress;
  }

  deserialize(input: object): SprintProgress {
    const serializator = new Serializator(SprintProgress.name);
    const data = serializator.getObjectProperty(input, 'sprintProgress');

    for (const i in data) {
      this.sprintProgress.push(new ExerciseProgress().deserialize(data[i]));
    }
    return this;
  }
}
