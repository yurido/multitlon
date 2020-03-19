import {SprintExercises} from './sprintExercises';
import {Serializable} from './serializable';
import {Serializator} from './serializator';

export class SprintCalendar extends Serializator implements Serializable<SprintCalendar> {
  private sprintExercises: SprintExercises[] = [];

  constructor() {
    super(SprintCalendar.name);
  }

  public getSprintExercises(): SprintExercises[] {
    return this.sprintExercises;
  }

  public deserialize(input): SprintCalendar {
    const sprintExercises = super.getObjectProperty(input, 'sprintExercises');

    for (const i in sprintExercises) {
      this.sprintExercises.push(new SprintExercises().deserialize(sprintExercises[i]));
    }
    return this;
  }
}
