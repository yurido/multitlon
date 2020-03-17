import {Exercise} from './exercise';
import {SprintDate} from './sprintDate';
import {Serializable} from './serializable';

export class SprintExercises implements Serializable<SprintExercises> {
  private sprintDate: SprintDate;
  private exercises: Exercise[] = [];

  constructor() {
  }

  public getSprintDate(): SprintDate {
    return this.sprintDate;
  }

  public getExercises(): Exercise[] {
    return this.exercises;
  }

  deserialize(input): SprintExercises {
    this.sprintDate = new SprintDate().deserialize(input.sprintDate);
    for (const ex in input.exercises) {
      this.exercises.push(new Exercise().deserialize(ex));
    }
    return this;
  }
}
