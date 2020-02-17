import {Exercise} from './exercise';

export class SprintExercises {
  date: Date;
  exercises: Exercise[] = [];

  constructor(date: Date, exercises: Exercise[]) {
    this.date = date;
    this.exercises = exercises;
  }
}
