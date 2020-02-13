import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Exercise} from '../models/exercise';
import {ExerciseList} from "../models/exercise-list";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) {
  }

  getExcercisesForCurrentSprint(): ExerciseList[] {
    // TODO: change to HTTP REst call to backend
    const excercises = this.createSprintExercises();
    return this.createExerciseListSortedByDate(excercises);
  }

  private createExerciseListSortedByDate(excercises) {
    const sortedExList = this.sortExerciseListByDate(excercises);
    const resultList: ExerciseList[] = [];

    let currentDate = new Date(0);
    let exercisesForDate: Exercise[] = [];

    for (const exercise of sortedExList) {
      exercisesForDate.push(exercise);

      if (exercise.date !== currentDate) {
        resultList.push(new ExerciseList(exercise.date, Object.assign([], exercisesForDate)));
        currentDate = exercise.date;
        exercisesForDate = [];
      }
    }
    return resultList;
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

  private sortExerciseListByDate(list: Exercise[]) {
    list.sort((a: Exercise, b: Exercise) => {
      return this.getTime(a.date) - this.getTime(b.date);
    });
    return list;
  }

  private createSprintExercises() {
    const excercises = [];

    excercises.push(this.createNewDummiExcercise('PUSH-UPS', 'Push-ups', 150, 20, '2020-02-01'));
    excercises.push(this.createNewDummiExcercise('PULL-UPS', 'Pull-ups', 6523, 5222, '2020-02-01'));
    excercises.push(this.createNewDummiExcercise('BARS', 'Bars', 2000, 1000, '2020-02-01'));

    excercises.push(this.createNewDummiExcercise('BICEPS', 'Biceps', 100, 1000, '2020-02-04'));
    excercises.push(this.createNewDummiExcercise('TRICEPS', 'Triceps', 100, 1000, '2020-02-04'));
    excercises.push(this.createNewDummiExcercise('ABS', 'Abs', 100, 1000, '2020-02-04'));

    excercises.push(this.createNewDummiExcercise('ABS', 'Abs', 100, 1000, '2020-02-06'));
    excercises.push(this.createNewDummiExcercise('SHOULDERS', 'Shoulders', 100, 1000, '2020-02-06'));
    excercises.push(this.createNewDummiExcercise('PLANKA', 'Planka', 100, 1000, '2020-02-06'));

    excercises.push(this.createNewDummiExcercise('PLANKA', 'Planka', 100, 1000, '2020-02-10'));
    excercises.push(this.createNewDummiExcercise('PUSH-UPS', 'Push-ups', 150, 20, '2020-02-10'));
    excercises.push(this.createNewDummiExcercise('PULL-UPS', 'Pull-ups', 6523, 5222, '2020-02-10'));
    excercises.push(this.createNewDummiExcercise('SQUATS', 'Squats', 6523, 5222, '2020-02-10'));

    excercises.push(this.createNewDummiExcercise('PLANKA', 'Planka', 100, 1000, '2020-02-16'));
    excercises.push(this.createNewDummiExcercise('PUSH-UPS', 'Push-ups', 150, 20, '2020-02-16'));
    excercises.push(this.createNewDummiExcercise('PULL-UPS', 'Pull-ups', 6523, 5222, '2020-02-16'));
    excercises.push(this.createNewDummiExcercise('SQUATS', 'Squats', 6523, 5222, '2020-02-16'));

    excercises.push(this.createNewDummiExcercise('PLANKA', 'Planka', 100, 1000, '2020-02-20'));
    excercises.push(this.createNewDummiExcercise('PUSH-UPS', 'Push-ups', 150, 20, '2020-02-20'));
    excercises.push(this.createNewDummiExcercise('PULL-UPS', 'Pull-ups', 6523, 5222, '2020-02-20'));
    excercises.push(this.createNewDummiExcercise('SQUATS', 'Squats', 6523, 5222, '2020-02-20'));

    return excercises;
  }

  /* Dummi method, delete! */
  private createNewDummiExcercise(id, name, rawPoints, totalPoints, date) {
    const excersise = new Exercise();
    excersise.id = id;
    excersise.name = name;
    excersise.rawPoints = rawPoints;
    excersise.totalPoints = totalPoints;
    excersise.date = date;
    return excersise;
  }
}
