import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Exercise} from '../models/exercise';
import {SprintExercises} from '../models/sprint-exercises';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private CURRENT_SPRINT_URL = 'rest/currentSprint';

  constructor(private http: HttpClient) {
  }
/*
  private createExerciseListSortedByDate(excercises) {
    const sortedExList = this.sortExerciseListByDate(excercises);
    const sprintExercises: SprintExercises[] = [];

    const firstDate = new Date('1970-01-01');
    let currentDate = firstDate;
    let exercisesForDate: Exercise[] = [];

    for (let i = 0; i < sortedExList.length; i++) {
      const exercise = sortedExList[i];
      if (currentDate.getTime() === firstDate.getTime()) {
        currentDate = exercise.getDate;
      }

      if (exercise.getDate.getTime() !== currentDate.getTime()) {
        sprintExercises.push(new SprintExercises(exercisesForDate[0].getDate, Object.assign([], exercisesForDate)));
        currentDate = exercise.getDate;
        exercisesForDate = [];
      }

      exercisesForDate.push(exercise);

      if (i === sortedExList.length - 1) {
        sprintExercises.push(new SprintExercises(exercisesForDate[0].getDate, Object.assign([], exercisesForDate)));
      }
    }
    return sprintExercises;
  }
*/
  private getTime(date?: number) {
    return date != null ? date : 0;
  }

  public sortSprintExercisesByDate(list: SprintExercises[]) {
    console.info('list ', list[0].getSprintDate());
    list.sort((a: SprintExercises, b: SprintExercises) => {
      return (a.getSprintDate().getSprintDate() - b.getSprintDate().getSprintDate());
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCurrentSprint(): Observable<SprintExercises[]> {
    return this.http.get<SprintExercises[]>(this.CURRENT_SPRINT_URL, httpOptions)
      .pipe(
        tap(sprint => console.log('got sprint from backend: ', sprint)),
        catchError(this.handleError('getSprint', []))
      );
  }
}
