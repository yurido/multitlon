import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SprintExercises} from '../models/sprintExercises';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

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

  /*  TODO: saved for backend!
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

  public sortSprintExercisesByDate(list: SprintExercises[]): SprintExercises[] {
    list.sort((a: SprintExercises, b: SprintExercises) => {
      return (a.getSprintDate().getSprintDate() - b.getSprintDate().getSprintDate());
    });
    return list;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error('error: ', error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCurrentSprint(): Observable<SprintExercises[]> {
    return this.http.get<SprintExercises[]>(this.CURRENT_SPRINT_URL, httpOptions)
      .pipe(
        tap(sprint => console.log('got currentSprint from backend: ', sprint))
        // catchError(this.handleError('getCurrentSprint', undefined))
      );
  }
}
