import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SprintExercise} from '../models/sprint.exercise';
import {EMPTY, Observable, of} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {Exercise} from '../models/exercise';
import {ExerciseStatistic} from '../models/exercise.statistic';
import {SprintExerciseList} from '../models/sprint.exercise.list';
import {SprintExerciseStatisticCalendar} from '../models/sprint.exercise.statistic.calendar';
import {ExerciseMetadataList} from '../models/exercise.metadata.list'; // TODO: rename class!

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
  private SPRINT_EXERCISES_CACHE: Observable<SprintExerciseList> = EMPTY;
  private EXERCISE_STATISTIC_CACHE: Observable<SprintExerciseStatisticCalendar> = EMPTY;
  private EXERCISE_CONFIG_CACHE: Observable<ExerciseMetadataList> = EMPTY;

  constructor(private http: HttpClient) {
  }

  getExercisMetadataURL(): string {
    return this.EXERCISE_METADATA_URL;
  }

  getExerciseStatisticsCurrentSprintURL(): string {
    return this.STATISTICS_EXERCISES_SPRINT_URL;
  }

  getSprintExercisesURL(): string {
    return this.SPRINT_EXERCISES_URL;
  }

  /**
   *  ************ REST ***************
   */
  /**
   * method returns user sprint exercises for current sprint from server or cache
   * @param user - user
   * @param forceCallServer - force to read from server
   */
  getExercisesForCurrentSprint(user: string, forceCallServer: boolean): Observable<SprintExerciseList> {
    // tslint:disable-next-line:max-line-length
    if ((this.SPRINT_EXERCISES_CACHE !== undefined && this.SPRINT_EXERCISES_CACHE !== null) && this.SPRINT_EXERCISES_CACHE !== EMPTY && !forceCallServer) {
      console.log('got exercises from cache');
      return this.SPRINT_EXERCISES_CACHE;
    }
    console.log('getting exercises from server');
    this.SPRINT_EXERCISES_CACHE = this.http.get<SprintExerciseList>(this.SPRINT_EXERCISES_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params
        .set('date', new Date().getTime().toString())
        .set('user', user)
    })
      .pipe(
        shareReplay(1)
      );
    return this.SPRINT_EXERCISES_CACHE;
  }

  /**
   * method returns user sprint exercise statistics for current sprint from server or cache
   * @param user - user
   * @param forceCallServer - force to read from server
   */
  getExerciseStatisticsForCurrentSprint(user: string, forceCallServer: boolean): Observable<SprintExerciseStatisticCalendar> {
    // tslint:disable-next-line:max-line-length
    if ((this.EXERCISE_STATISTIC_CACHE !== undefined && this.EXERCISE_STATISTIC_CACHE !== null) && this.EXERCISE_STATISTIC_CACHE !== EMPTY && !forceCallServer) {
      console.log('got statistic from cache');
      return this.EXERCISE_STATISTIC_CACHE;
    }
    console.log('getting statistic from server');
    this.EXERCISE_STATISTIC_CACHE = this.http.get<SprintExerciseStatisticCalendar>(this.STATISTICS_EXERCISES_SPRINT_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params
        .set('date', new Date().getTime().toString())
        .set('user', user)
    })
      .pipe(
        shareReplay(1)
      );
    return this.EXERCISE_STATISTIC_CACHE;
  }

  /**
   * method updates sprint exercise on server and return updated object
   * @param exercise - exercise to be updated
   */
  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(this.SPRINT_EXERCISES_URL, exercise, {headers: httpOptions.headers})
      .pipe(
        tap(ex => console.log('exercise ' + exercise.getSid() + ' updated'))
      );
  }

  /**
   * method returns sprint statistic for sprint exercise sid
   * @param sid exercise
   * @param user user
   */
  getExerciseStatisticForCurrentSprint(sid: string, user: string): Observable<ExerciseStatistic> {
    return this.http.get<ExerciseStatistic>(this.STATISTICS_EXERCISES_SPRINT_URL + '/' + sid, {
      headers: httpOptions.headers,
      params: httpOptions.params
        .set('date', new Date().getTime().toString())
        .set('user', user)
    })
      .pipe(
        tap(ex => console.log('got statistic for exercise ' + sid))
      );
  }

  /**
   * method returns exercise global metadata from server or cache
   */
  getExerciseMetadata(): Observable<ExerciseMetadataList> {
    if ((this.EXERCISE_CONFIG_CACHE !== undefined && this.EXERCISE_CONFIG_CACHE !== null) && this.EXERCISE_CONFIG_CACHE !== EMPTY) {
      console.log('got metadata from cache');
      return this.EXERCISE_CONFIG_CACHE;
    }
    console.log('getting metadata from server');
    this.EXERCISE_CONFIG_CACHE = this.http.get<ExerciseMetadataList>(this.EXERCISE_METADATA_URL, {headers: httpOptions.headers})
      .pipe(
        shareReplay(1)
      );
    return this.EXERCISE_CONFIG_CACHE;
  }

  deleteSprintExercise(id: number, user: string): Observable<any> {
    return this.http.delete(this.SPRINT_EXERCISES_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params
        .set('user', user)
    })
      .pipe(
        tap(ex => console.log('exercise ' + id + ' deleted permanently'))
      );
  }

  /**
   *  ************ SACOND-HAND METHODS ***************
   */
  sortSprintExercisesByDate(list: SprintExercise[]): SprintExercise[] {
    list.sort((a: SprintExercise, b: SprintExercise) => {
      return (a.getSprintDay().getSprintDate() - b.getSprintDay().getSprintDate());
    }).reverse();
    return list;
  }

  /**
   * method updates spint exercise in cache
   * @param exercise - sprint exercise
   */
  updateSprintExerciseInCache(user: string, exercise: Exercise): Observable<SprintExerciseList> {
    if (this.SPRINT_EXERCISES_CACHE === EMPTY) {
      console.log('SPRINT_EXERCISES_CACHE is empty, getting it from the server');
      return this.getExercisesForCurrentSprint(user, true);
    }
    return this.modifiedSprintExerciseInCache(exercise, false);
  }

  /**
   * method deletes spint exercise from cache
   * @param exercise - sprint exercise
   */
  deleteSprintExerciseInCache(user: string, exercise: Exercise): Observable<SprintExerciseList> {
    if (this.SPRINT_EXERCISES_CACHE === EMPTY) {
      console.log('SPRINT_EXERCISES_CACHE is empty, getting it from the server');
      return this.getExercisesForCurrentSprint(user, true);
    }
    return this.modifiedSprintExerciseInCache(exercise, true);
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
  /**
   * method modifieds current sprint
   * @param exercise - exercise to be modified/removed
   * @param isDeleted - true if removed, false if modified
   */
  private modifiedSprintExerciseInCache(exercise: Exercise, isDeleted: boolean): Observable<SprintExerciseList> {
    let updatedSprint: Observable<SprintExerciseList> = EMPTY;
    this.SPRINT_EXERCISES_CACHE.subscribe(
      data => {
        const sprintCalendar = new SprintExerciseList().deserialize(data);
        let isSprintModified = false;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < sprintCalendar.getSprintExercises().length; i++) {
          // filter by date
          // tslint:disable-next-line:max-line-length
          if (new Date(sprintCalendar.getSprintExercises()[i].getSprintDay().getSprintDate()).getDate() === new Date(exercise.getDate()).getDate()) {
            for (let j = 0; j < sprintCalendar.getSprintExercises()[i].getExercises().length; j++) {
              if (sprintCalendar.getSprintExercises()[i].getExercises()[j].getId() === exercise.getId()) {
                if (isDeleted) {
                  sprintCalendar.getSprintExercises()[i].getExercises().splice(j, 1); // delete exercise
                } else {
                  sprintCalendar.getSprintExercises()[i].getExercises().splice(j, 1, exercise); // replace exercise
                }
                // now we need to recalc days total points
                let total = 0;
                for (const index in sprintCalendar.getSprintExercises()[i].getExercises()) {
                  total = total + sprintCalendar.getSprintExercises()[i].getExercises()[index].getTotalPoints();
                }
                sprintCalendar.getSprintExercises()[i].getSprintDay().setTotal(total); // update days total points
                isSprintModified = true;
                let logText = '';
                if (isDeleted) {
                  logText = 'deleted from';
                } else {
                  logText = 'updated in';
                }
                console.log(`exercise ${exercise.getSid()} ${logText} cache`);
                break;
              }
            }
            if (isSprintModified) {
              break;
            }
          }
        }
        updatedSprint = of(sprintCalendar);
      }
    );
    this.SPRINT_EXERCISES_CACHE = updatedSprint;
    return this.SPRINT_EXERCISES_CACHE;
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
