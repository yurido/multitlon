import {SprintExercises} from './sprintExercises';
import {Serializable} from './serializable';

export class SprintCalendar implements Serializable<SprintCalendar> {
  private sprintExercises: SprintExercises[] = [];

  constructor() {
  }

  public getSprintExercises(): SprintExercises[] {
    return this.sprintExercises;
  }

  public deserialize(input): SprintCalendar {
    for (const sex in input.sprintExercises) {
      this.sprintExercises.push(new SprintExercises().deserialize(sex));
    }
    return this;
  }
}
