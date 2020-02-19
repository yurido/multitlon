import {Exercise} from './exercise';

export class SprintExercises {
  private date: Date;
  private exercises: Exercise[] = [];

  constructor(date: Date, exercises: Exercise[]) {
    this.date = date;
    this.exercises = exercises;
  }

  public getSprintDay(): Date {
    return this.date;
  }

  public getExercises(): Exercise[] {
    return this.exercises;
  }
}
