import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SprintExercises} from '../models/sprint.exercises';
import {EMPTY, Observable, of} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {Exercise} from '../models/exercise';
import {ExerciseStatistic} from '../models/exercise.statistic';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {isDefined} from '@angular/compiler/src/util';
import {SprintCalendar} from '../models/sprint.calendar'; // TODO: rename class!

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
  private EXERCISE_METADATA_URL = this.EXERCISES_URL + '/metadata';
  private STATISTICS_URL = 'rest/statistics';
  private STATISTICS_EXERCISES_SPRINT_URL = this.STATISTICS_URL + '/sprintExercises';
  private SPRINT_EXERCISES_CACHE: Observable<SprintCalendar> = EMPTY;
  private EXERCISE_STATISTIC_CACHE: Observable<ExerciseStatistic[]> = EMPTY; // TODO: change to Calendar
  private EXERCISE_CONFIG_CACHE: Observable<ExerciseMetadata[]> = EMPTY; // TODO: change to ExerciseMetadataList

  constructor(private http: HttpClient) {
  }

  /**
   *  ************ REST ***************
   */
  /**
   * Get user exercises for current sprint from server or cache
   * @param user - user
   * @param forceCallServer - force to read from server
   */
  getExercisesCurrentSprint(user: string, forceCallServer: boolean): Observable<SprintCalendar> {
    if (isDefined(this.SPRINT_EXERCISES_CACHE) && this.SPRINT_EXERCISES_CACHE !== EMPTY && !forceCallServer) {
      console.log('got sprint exercises from cache');
      return this.SPRINT_EXERCISES_CACHE;
    }
    console.log('getting sprint exercises from server');
    this.SPRINT_EXERCISES_CACHE = this.http.get<SprintCalendar>(this.SPRINT_EXERCISES_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params.set('date', new Date().getMilliseconds().toString()).set('user', user)
    })
      .pipe(
        shareReplay(1)
      );
    return this.SPRINT_EXERCISES_CACHE;
  }

  /**
   * Get user exercise results and progress for current sprint from server or cache
   * @param user - user
   * @param forceCallServer - force to read from server
   */
  getExerciseStatisticsForCurrentSprint(user: string, forceCallServer: boolean): Observable<ExerciseStatistic[]> {
    if (isDefined(this.EXERCISE_STATISTIC_CACHE) && this.EXERCISE_STATISTIC_CACHE !== EMPTY && !forceCallServer) {
      console.log('got exercise statistic from cache');
      return this.EXERCISE_STATISTIC_CACHE;
    }
    console.log('getting exercise statistic from server');
    this.EXERCISE_STATISTIC_CACHE = this.http.get<ExerciseStatistic[]>(this.STATISTICS_EXERCISES_SPRINT_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params.set('date', new Date().getMilliseconds().toString()).set('user', user)
    })
      .pipe(
        shareReplay(1)
      );
    return this.EXERCISE_STATISTIC_CACHE;
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
   * Get exercise metadata from server or cache
   */
  getExerciseMetadata(): Observable<ExerciseMetadata[]> {
    if (isDefined(this.EXERCISE_CONFIG_CACHE) && this.EXERCISE_CONFIG_CACHE !== EMPTY) {
      console.log('got exercise metadata from cache');
      return this.EXERCISE_CONFIG_CACHE;
    }
    console.log('getting exercise metadata from server');
    this.EXERCISE_CONFIG_CACHE = this.http.get<ExerciseMetadata[]>(this.EXERCISE_METADATA_URL, {headers: httpOptions.headers})
      .pipe(
        shareReplay(1)
      );
    return this.EXERCISE_CONFIG_CACHE;
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

  updateExerciseInCache(exercise: Exercise): Observable<SprintCalendar> {
    let updatedSprint: Observable<SprintCalendar> = EMPTY;
    this.SPRINT_EXERCISES_CACHE.subscribe(
      data => {
        const sprintCalendar = new SprintCalendar().deserialize(data);
        const sprintExercises = sprintCalendar.getSprintExercises();
        // TODO: update exercise
        console.log('exercis ' + exercise + ' updated in cache');
        updatedSprint = of(sprintCalendar);
      }
    );
    this.SPRINT_EXERCISES_CACHE = updatedSprint;
    return updatedSprint;
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
