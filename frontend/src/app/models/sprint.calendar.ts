import {SprintExercises} from './sprint.exercises';
import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class SprintCalendar implements Serializable<SprintCalendar> {
  private sprintExercises: SprintExercises[] = [];

  constructor() {
  }

  public getSprintExercises(): SprintExercises[] {
    return this.sprintExercises;
  }

  public deserialize(input): SprintCalendar {
    const serializator = new Serializator(SprintCalendar.name);
    const sprintExercises = serializator.getObjectProperty(input, 'sprintExercises');

    for (const i in sprintExercises) {
      this.sprintExercises.push(new SprintExercises().deserialize(sprintExercises[i]));
    }
    return this;
  }
}
