import {Exercise} from './exercise';
import {SprintDate} from './SprintDate';
import {SprintExercisesI} from './SprintExercisesI';

export class SprintExercises implements SprintExercisesI {
  private sprintDate: SprintDate;
  private exercises: Exercise[] = [];

  constructor(sprintDate: SprintDate, exercises: Exercise[]) {
    this.sprintDate = sprintDate;
    this.exercises = exercises;
  }

  public getSprintDate(): SprintDate {
    return this.sprintDate;
  }

  public getExercises(): Exercise[] {
    return this.exercises;
  }
}
