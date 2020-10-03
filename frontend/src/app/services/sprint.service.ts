import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SprintExercise} from '../models/sprint.exercise';
import {EMPTY, Observable, of} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';
import {Exercise} from '../models/exercise';
import {ExerciseStatistic} from '../models/exercise.statistic';
import {ExerciseStatisticList} from '../models/exercise.statistic.list';
import {ExerciseMetadataList} from '../models/exercise.metadata.list';
import {DaysOffList} from '../models/days.off.list';
import {ExerciseList} from '../models/exercise.list';
import {SprintDay} from '../models/sprint.day';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {AvailableExerciseList} from '../models/available.exercise.list';
import {MatDialog} from '@angular/material/dialog';
import {AlertComponent} from '../alert/alert.component';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  params: new HttpParams()
};

enum ActionEnum {
  DELETE,
  INSERT,
  UPDATE
}

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private SPRINT_EXERCISES_URL = 'rest/sprint/sprintExercises';
  private SPRINT_AVAILABLE_EXERCISES_URL = 'rest/sprint/availableExercises';
  private EXERCISE_METADATA_URL = 'rest/exercises/metadata';
  private STATISTICS_EXERCISES_SPRINT_URL = 'rest/statistics/sprintExercises';
  private DAYS_OFF_URL = 'rest/daysoff';
  private SPRINT_EXERCISE_LIST_CACHE: Observable<SprintExercise[]> = EMPTY;
  private EXERCISE_STATISTIC_CACHE: Observable<ExerciseStatistic[]> = EMPTY;
  private EXERCISE_METADATA_CACHE: Observable<ExerciseMetadata[]> = EMPTY;
  private SPRINT_AVAILABLE_EXERCISES_CACHE: Observable<string[]> = EMPTY;
  private EXERCISE: Exercise | undefined;
  private IS_SPRINT_MODIFIED: boolean;

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  getContainerHeightForActionButton(): number {
    return window.innerHeight - 120;
  }

  getContainerHeightForActionButtonWithFooter(): number {
    return window.innerHeight - 140;
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

  getDaysOffURL(): string {
    return this.DAYS_OFF_URL;
  }

  getSprintAvailableExercisesURL(): string {
    return this.SPRINT_AVAILABLE_EXERCISES_URL;
  }

  /**
   *  ************ REST ***************
   */
  getSprintAvailableExercises(): Observable<string[]> {
    // tslint:disable-next-line:max-line-length
    if (this.SPRINT_AVAILABLE_EXERCISES_CACHE !== undefined && this.SPRINT_AVAILABLE_EXERCISES_CACHE !== null && this.SPRINT_AVAILABLE_EXERCISES_CACHE !== EMPTY) {
      console.log('getting sprint available exercises from cache');
      return this.SPRINT_AVAILABLE_EXERCISES_CACHE;
    }
    console.log('getting sprint available exercises from server');
    this.SPRINT_AVAILABLE_EXERCISES_CACHE = this.http.get<AvailableExerciseList>(this.SPRINT_AVAILABLE_EXERCISES_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params
        .set('date', new Date().getTime().toString())
    }).pipe(
      shareReplay(1),
      map(data => new AvailableExerciseList().deserialize(data).getExercises())
    );
    return this.SPRINT_AVAILABLE_EXERCISES_CACHE;
  }

  /**
   * method returns sprint exercise list for current sprint from cache only
   */
  getExerciseListForCurrentSprintFromCache(): Observable<SprintExercise[]> {
    // tslint:disable-next-line:max-line-length
    if (this.SPRINT_EXERCISE_LIST_CACHE !== undefined && this.SPRINT_EXERCISE_LIST_CACHE !== null && this.SPRINT_EXERCISE_LIST_CACHE !== EMPTY) {
      console.log('got exercise list from cache');
      return this.SPRINT_EXERCISE_LIST_CACHE;
    }
    return of([]);
  }

  getExerciseListForCurrentSprint(): Observable<Exercise[]> {
    console.log('getting exercises from server');
    return this.http.get<ExerciseList>(this.SPRINT_EXERCISES_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params
        .set('date', new Date().getTime().toString())
    }).pipe(
      map(data => new ExerciseList().deserialize(data).getExercises())
    );
  }

  /**
   * method returns user sprint exercise statistics for current sprint from server or cache
   * @param forceCallServer - force to read from server
   */
  getExerciseStatisticsForCurrentSprint(forceCallServer: boolean): Observable<ExerciseStatistic[]> {
    // tslint:disable-next-line:max-line-length
    if ((this.EXERCISE_STATISTIC_CACHE !== undefined && this.EXERCISE_STATISTIC_CACHE !== null && this.EXERCISE_STATISTIC_CACHE !== EMPTY) && !forceCallServer) {
      console.log('got statistic from cache');
      return this.EXERCISE_STATISTIC_CACHE;
    }
    console.log('getting statistic from server');
    this.EXERCISE_STATISTIC_CACHE = this.http.get<ExerciseStatisticList>(this.STATISTICS_EXERCISES_SPRINT_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params
        .set('date', new Date().getTime().toString())
    })
      .pipe(
        shareReplay(1),
        map(data => new ExerciseStatisticList().deserialize(data).getExerciseStatistic())
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
        tap(ex => console.log(`exercise ${exercise.getSid()} updated on server`)),
        map(data => new Exercise().deserialize(data))
      );
  }

  /**
   * method returns sprint statistic for sprint exercise sid
   * @param sid exercise
   */
  getExerciseStatisticForCurrentSprint(sid: string): Observable<ExerciseStatistic> {
    return this.http.get<ExerciseStatistic>(this.STATISTICS_EXERCISES_SPRINT_URL + '/' + sid, {
      headers: httpOptions.headers,
      params: httpOptions.params
        .set('date', new Date().getTime().toString())
    })
      .pipe(
        map(data => new ExerciseStatistic().deserialize(data))
      );
  }

  /**
   * method returns exercise global metadata from server or cache
   */
  getExerciseMetadata(): Observable<ExerciseMetadata[]> {
    if (this.EXERCISE_METADATA_CACHE !== undefined && this.EXERCISE_METADATA_CACHE !== null && this.EXERCISE_METADATA_CACHE !== EMPTY) {
      console.log('got metadata from cache');
      return this.EXERCISE_METADATA_CACHE;
    }
    console.log('getting metadata from server');
    this.EXERCISE_METADATA_CACHE = this.http.get<ExerciseMetadata[]>(this.EXERCISE_METADATA_URL, {headers: httpOptions.headers})
      .pipe(
        shareReplay(1),
        map(data => new ExerciseMetadataList().deserialize(data).getExerciseMetadata())
      );
    return this.EXERCISE_METADATA_CACHE;
  }

  /**
   * method returns days-off for user for sprint from server
   */
  getDaysOffForCurrentSprint(): Observable<number[]> {
    console.log('getting days-off from server');
    return this.http.get<DaysOffList>(this.DAYS_OFF_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params
        .set('date', new Date().getTime().toString())
    }).pipe(
      map(data => new DaysOffList().deserialize(data).getDaysOff())
    );
  }

  /**
  *  ************ SACOND-HAND METHODS ***************
  */
  setSprintModified(value: boolean): void {
    this.IS_SPRINT_MODIFIED = value;
  }

  isSprintModified(): boolean {
    const retVal = this.IS_SPRINT_MODIFIED;
    this.IS_SPRINT_MODIFIED = false;
    return retVal;
  }

  /**
  * Method caches the exercise
  */
  cacheExercise(exercise: Exercise): void {
     const ex = Object.assign({}, exercise);
     this.EXERCISE = new Exercise().deserialize(ex);
     console.log('exercise ',this.EXERCISE,' cached');
   }

   /*
   * Method returns cached exercise and cleans the cache
   */
   getExerciseFromCache(): Exercise | undefined {
     if(this.EXERCISE === undefined ) {
       return this.EXERCISE;
     }
     const ex = Object.assign({}, this.EXERCISE);
     this.EXERCISE = undefined;
     return new Exercise().deserialize(ex);
   }

  /**
   * method updates spint exercise in cache
   * @param exercise - sprint exercise
   */
  updateSprintExerciseInCache(exercise: Exercise): Observable<SprintExercise[]> {
    if (this.SPRINT_EXERCISE_LIST_CACHE === EMPTY) {
      console.log('SPRINT_EXERCISE_LIST_CACHE is empty, getting it from the server');
      return this.getExerciseListForCurrentSprintFromCache();
    }
    return this.modifySprintExerciseListInCache(exercise, ActionEnum.UPDATE);
  }

  /**
   * method adds spint exercise to cache
   * @param exercise - sprint exercise
   */
  addSprintExerciseToCache(exercise: Exercise): Observable<SprintExercise[]> {
    if (this.SPRINT_EXERCISE_LIST_CACHE === EMPTY) {
      console.log('SPRINT_EXERCISE_LIST_CACHE is empty, getting it from the server');
      return this.getExerciseListForCurrentSprintFromCache();
    }
    return this.modifySprintExerciseListInCache(exercise, ActionEnum.INSERT);
  }

  /**
   * method deletes spint exercise from cache
   * @param exercise - sprint exercise
   */
  deleteSprintExerciseInCache(exercise: Exercise): Observable<SprintExercise[]> {
    if (this.SPRINT_EXERCISE_LIST_CACHE === EMPTY
    ) {
      console.log('SPRINT_EXERCISES_CACHE is empty, getting it from the server');
      return this.getExerciseListForCurrentSprintFromCache();
    }
    return this.modifySprintExerciseListInCache(exercise, ActionEnum.DELETE);
  }

  addExerciseToSprint(ex: Exercise): Observable<Exercise> {
    return this.http.post(this.SPRINT_EXERCISES_URL, ex, {
      headers: httpOptions.headers,
      params: httpOptions.params
    })
      .pipe(
        tap(data => console.log(`new exercise ${ex.getSid()} added to sprint`)),
        map(data => new Exercise().deserialize(data))
      );
  }

  buildSprintExerciseList(exercises: Exercise[], daysOff: number[]): SprintExercise[] {
    const sprintExercises: SprintExercise[] = [];
    const sortedExercises = this.sortExerciseByDate(exercises);

    // add exercises to the final list
    for (const exercise of sortedExercises) {
      const lastExIndex = sprintExercises.length - 1;

      if (sprintExercises.length === 0) {
        sprintExercises.push(new SprintExercise(new SprintDay(exercise.getDate(), false, exercise.getTotalPoints())));
        sprintExercises[0].getExercises().push(exercise);
        continue;
      }
      // if exercise has same day as last day in the list, add it to the list
      const exDay = new Date(exercise.getDate()).getDate();
      const lastSprintDay = new Date(sprintExercises[lastExIndex].getSprintDay().getSDate()).getDate();
      if (exDay === lastSprintDay) {
        sprintExercises[lastExIndex].getExercises().push(exercise);
        // update total points for the day
        const newTotal = sprintExercises[lastExIndex].getSprintDay().getTotal() + exercise.getTotalPoints();
        sprintExercises[lastExIndex].getSprintDay().setTotal(newTotal);
        continue;
      }
      // create new object
      sprintExercises.push(new SprintExercise(new SprintDay(exercise.getDate(), false, exercise.getTotalPoints())));
      sprintExercises[sprintExercises.length - 1].getExercises().push(exercise);
    }

    // add days-off to the final list
    for (const dayOff of daysOff) {
      sprintExercises.push(new SprintExercise(new SprintDay(dayOff, true, 0)));
    }

    const retVal = this.sortSprintExercisesByDateReverse(sprintExercises);
    this.SPRINT_EXERCISE_LIST_CACHE = of(retVal);
    return retVal;
  }

  isEmptyReps(exercise: Exercise): boolean {
    if(exercise === undefined || exercise.getReps() === undefined) {
      return true;
    }
    const index = exercise.getReps().findIndex(
      element => element.getWeight() === undefined || element.getReps() === undefined ||
      element.getWeight() === 0 || element.getReps() === 0);
    return index > -1;
  }

  deleteSprintExercise(id: number): Observable<any> {
    return this.http.delete(this.SPRINT_EXERCISES_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params
    })
      .pipe(
        tap(ex => console.log(`exercise ${id} deleted permanently`))
      );
  }

  /**
  *  ************ MODAL ***************
  */
  getModalDialogConfig(): any {
    return {width: '400px', data: {text: '', cancelButtonText: 'no', acceptButtonText: 'yes'}};
  }
  getConfirmationModalDialogConfig(): any {
    return {width: '120px', height: '120px'};
  }
  getAlertDialogConfig(): any {
    return {width: '400px', data: {error: ''}};
  }
  handleError(error: any): void {
    const errorDialogConfig = this.getAlertDialogConfig();
    errorDialogConfig.data.error = error;
    const dialogRef = this.dialog.open(AlertComponent, errorDialogConfig);
  }

  /**
   *  ************ UTILS ***************
   */
  getFloatFromString(str: string): number {
    const numberValue = str.match(/\d+(\.\d+)?/);
    return (numberValue !== null ? +(numberValue[0]) : 0);
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
   * method modifies SPRINT_EXERCISE_LIST_CACHE object
   * @param exercise - exercise to be modified/removed
   * @param action - update/insert or delete exercise
   */
  private modifySprintExerciseListInCache(exercise: Exercise, action: ActionEnum): Observable<SprintExercise[]> {
    console.log(`will ${ActionEnum[action]} exercise (sid=${exercise.getSid()}, id=${exercise.getId()}) in cache`);
    this.SPRINT_EXERCISE_LIST_CACHE.subscribe(
      data => {
        let isSprintModified = false;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
          // filter by date
          const sDay = new Date(data[i].getSprintDay().getSDate()).getDate();
          const exDay = new Date(exercise.getDate()).getDate();

          if (sDay === exDay && !data[i].getSprintDay().getIsDayOff()) {
            if (action === ActionEnum.INSERT) {
              data[i].getExercises().push(exercise);
              data[i].getSprintDay().setTotal(data[i].getSprintDay().getTotal() + exercise.getTotalPoints());
              console.log(`exercise ${exercise.getSid()}, id=${exercise.getId()}, day=${sDay} added to sprint cache`);
              isSprintModified = true;
              break;
            }

            for (let j = 0; j < data[i].getExercises().length; j++) {
              if (data[i].getExercises()[j].getSid() === exercise.getSid()) {
                if (action === ActionEnum.DELETE) {
                  // DELETE exercise
                  data[i].getExercises().splice(j, 1);
                  if (data[i].getExercises().length === 0) {
                    data.splice(i, 1); // delete the whole day!
                    console.log(`exercise ${exercise.getSid()} deleted from cache`);
                    break;
                  }
                } else {
                   // REPLACE exercise
                  data[i].getExercises().splice(j, 1, exercise);
                }
                // now we need to recalc days total points
                let total = 0;
                for (const ex of data[i].getExercises()) {
                  total = total + ex.getTotalPoints();
                }
                data[i].getSprintDay().setTotal(total); // update days total points
                isSprintModified = true;
                let logText = '';
                if (action === ActionEnum.DELETE) {
                  logText = 'deleted from';
                } else {
                  logText = 'updated in';
                }
                console.log(`exercise ${exercise.getSid()}, ${exercise.getId()} ${logText} cache`);
                break;
              }
            }
            if (isSprintModified) {
              break;
            }
          }
        }
        if (!isSprintModified && action === ActionEnum.INSERT) {
          const sprintD = new SprintDay(exercise.getDate(), false, exercise.getTotalPoints());
          const sprintEx = new SprintExercise(sprintD);
          sprintEx.getExercises().push(exercise);
          data.push(sprintEx);
          console.log(`exercise ${exercise.getSid()} added to sprint cache`);
          isSprintModified = true;
        }
        if (action === ActionEnum.INSERT) {
          data = this.sortSprintExercisesByDateReverse(data);
        }
        this.SPRINT_EXERCISE_LIST_CACHE = of(data);
      }
    );
    return this.SPRINT_EXERCISE_LIST_CACHE;
  }

  private sortSprintExercisesByDateReverse(list: SprintExercise[]): SprintExercise[] {
    return list.sort((a: SprintExercise, b: SprintExercise) => {
      return (a.getSprintDay().getSDate() - b.getSprintDay().getSDate());
    }).reverse();
  }

  private sortExerciseByDate(list: Exercise[]): Exercise[] {
    return list.sort((a: Exercise, b: Exercise) => {
      return (a.getDate() - b.getDate());
    });
  }

}
