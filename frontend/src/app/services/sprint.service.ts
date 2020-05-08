import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SprintExercises} from '../models/sprint.exercises';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Exercise} from '../models/exercise';
import {ExerciseStatistic} from '../models/exercise.statistic';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  params: new HttpParams()
};

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private EXERCISES_URL = 'rest/exercises';
  private SPRINT_EXERCISES_URL = this.EXERCISES_URL + '/sprint';
  private STATISTICS_URL = 'rest/statistics';
  private STATISTICS_EXERCISES_SPRINT_URL = this.STATISTICS_URL + '/sprintExercises';
  private SPRINT_EXERCISES_CACHE: SprintExercises[];
  private EXERCISE_STATISTIC_CACHE: ExerciseStatistic[];

  constructor(private http: HttpClient) {
  }

  /**
   *  ************ REST ***************
   */
  getExercisesCurrentSprint(user: string): Observable<SprintExercises[]> {
    return this.http.get<SprintExercises[]>(this.SPRINT_EXERCISES_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params.set('date', new Date().getMilliseconds().toString()).set('user', user)
    })
      .pipe(
        tap(sprint => console.log('got exercises for current sprint from backend: ', sprint))
      );
  }

  getExerciseStatisticsForCurrentSprint(user: string): Observable<ExerciseStatistic[]> {
    return this.http.get<ExerciseStatistic[]>(this.STATISTICS_EXERCISES_SPRINT_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params.set('date', new Date().getMilliseconds().toString()).set('user', user)
    })
      .pipe(
        tap(exerciseStatistic => console.log('got exercise statistics for current sprint from backend: ', exerciseStatistic))
      );
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(this.SPRINT_EXERCISES_URL, exercise, {headers: httpOptions.headers})
      .pipe(
        tap(ex => console.log('exercise ' + exercise.getSid() + ' updated'))
      );
  }

  getExerciseStatisticForCurrentSprint(sid: string, user: string): Observable<ExerciseStatistic> {
    return this.http.get<ExerciseStatistic>(this.STATISTICS_EXERCISES_SPRINT_URL + '/' + sid, {
      headers: httpOptions.headers,
      params: httpOptions.params.set('date', new Date().getMilliseconds().toString()).set('user', user)
    })
      .pipe(
        tap(ex => console.log('got statistic for exercise ' + sid))
      );
  }

  /**
   *  ************ SACOND-HAND METHODS ***************
   */
  sortSprintExercisesByDate(list: SprintExercises[]): SprintExercises[] {
    list.sort((a: SprintExercises, b: SprintExercises) => {
      return (a.getSprintDay().getSprintDate() - b.getSprintDay().getSprintDate());
    });
    return list;
  }

  /**
   *  ************ UTILS ***************
   */
  getFloatFromString(str: string): number {
    const numberValue = str.match(/\d+(\.\d+)?/);
    return (numberValue !== null ? +numberValue[0] : 0);
  }

  isStringContainsNumbers(str: string): boolean {
    const numberValue = str.match(/^\d+(\.\d+)?$/);
    return numberValue === null ? false : true;
  }

  getNumberFromString(str: string): number {
    const numberValue = str.match(/\d+/);
    return (numberValue !== null ? +numberValue[0] : 0);
  }

  /**
   *  ************ CACHE ***************
   */
  getSprintCache(): SprintExercises[] {
    return this.SPRINT_EXERCISES_CACHE;
  }

  setSprintCache(data: SprintExercises[]) {
    this.SPRINT_EXERCISES_CACHE = data;
  }

  setSprintExerciseStatisticCache(exerciseStatistic: ExerciseStatistic[]): void {
    this.EXERCISE_STATISTIC_CACHE = exerciseStatistic;
  }

  getSprintExerciseStatisticCache(): ExerciseStatistic[] {
    return this.EXERCISE_STATISTIC_CACHE;
  }

  /**
   *  ************ PRIVATE ***************
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error('error: ', error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
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
}
