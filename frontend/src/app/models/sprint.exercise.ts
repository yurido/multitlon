import {Exercise} from './exercise';
import {SprintDay} from './sprint.day';

export class SprintExercise {
  private sprintDay: SprintDay;
  private exercises: Exercise[] = [];

  constructor(sprintDay: SprintDay) {
    this.sprintDay = sprintDay;
  }

  public getSprintDay(): SprintDay {
    return this.sprintDay;
  }

  public getExercises(): Exercise[] {
    return this.exercises;
  }
}
