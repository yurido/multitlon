import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Exercise} from '../models/exercise';
import {ExerciseList} from '../models/exercise-list';

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
    const excercises = this.createDummiSprintExercises();
    return this.createExerciseListSortedByDate(excercises);
  }

  private createExerciseListSortedByDate(excercises) {
    const sortedExList = this.sortExerciseListByDate(excercises);
    const resultList: ExerciseList[] = [];

    let currentDate = new Date('1970-01-01');
    let exercisesForDate: Exercise[] = [];

    for (const exercise of sortedExList) {
      exercisesForDate.push(exercise);

      if (currentDate === new Date('1970-01-01')) {
        currentDate = exercise.getDate;
      }

      if (exercise.getDate !== currentDate) {
        resultList.push(new ExerciseList(exercise.getDate, Object.assign([], exercisesForDate)));
        currentDate = exercise.getDate;
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
      return this.getTime(a.getDate) - this.getTime(b.getDate);
    });
    return list;
  }

  private createDummiSprintExercises() {
    const excercises: Exercise[] = [];

    excercises.push(new Exercise('PUSH-UPS', 'Push-ups', new Date('2020-02-10'), 150, 20, 650, 500));
    excercises.push(new Exercise('PULL-UPS', 'Pull-ups', new Date('2020-02-10'), 150, 80, 650, 500));
    excercises.push(new Exercise('BARS', 'Bars', new Date('2020-02-10'), 150, 20, 650, 500));

    excercises.push(new Exercise('BICEPS', 'Biceps', new Date('2020-02-04'), 150, 20, 650, 500));
    excercises.push(new Exercise('TRICEPS', 'Triceps', new Date('2020-02-04'), 150, 20, 650, 500));
    excercises.push(new Exercise('ABS', 'Abs', new Date('2020-02-04'), 150, 0, 650, 500));

    excercises.push(new Exercise('ABS', 'Abs', new Date('2020-02-01'), 150, 0, 650, 500));
    excercises.push(new Exercise('SHOULDERS', 'Shoulders', new Date('2020-02-01'), 150, 5, 650, 500));
    excercises.push(new Exercise('PLANKA', 'Planka', new Date('2020-02-01'), 1, 0, 650, 500));

    excercises.push(new Exercise('PLANKA', 'Planka', new Date('2020-02-20'), 1, 0, 650, 500));
    excercises.push(new Exercise('PUSH-UPS', 'Push-ups', new Date('2020-02-20'), 1, 0, 650, 500));
    excercises.push(new Exercise('PULL-UPS', 'Pull-ups', new Date('2020-02-20'), 1, 80, 650, 500));
    excercises.push(new Exercise('SQUATS', 'Squats', new Date('2020-02-20'), 10, 130, 6500, 5000));

    return excercises;
  }
}
