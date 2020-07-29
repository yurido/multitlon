import {SprintExercise} from './sprint.exercise';
import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class SprintExerciseList implements Serializable<SprintExerciseList> {
  private sprintExercises: SprintExercise[] = [];

  constructor() {
  }

  public getSprintExercises(): SprintExercise[] {
    return this.sprintExercises;
  }

  public deserialize(input: object): SprintExerciseList {
    const serializator = new Serializator(SprintExerciseList.name);
    const sprintExercises = serializator.getObjectProperty(input, 'sprintExercises');

    for (const i in sprintExercises) {
      this.sprintExercises.push(new SprintExercise().deserialize(sprintExercises[i]));
    }
    return this;
  }
}
