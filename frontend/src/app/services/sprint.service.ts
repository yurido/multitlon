import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SprintExercise} from '../models/sprint.exercise';
import {EMPTY, Observable, of} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {Exercise} from '../models/exercise';
import {ExerciseStatistic} from '../models/exercise.statistic';
import {SprintExerciseList} from '../models/sprint.exercise.list';
import {SprintExerciseStatisticCalendar} from '../models/sprint.exercise.statistic.calendar';
import {ExerciseMetadataList} from '../models/exercise.metadata.list';
import {DaysOffList} from '../models/days.off.list';
import {ExerciseList} from '../models/exercise.list';
import {SprintDay} from '../models/sprint.day';

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
  private SPRINT_EXERCISE_LIST_CACHE: Observable<SprintExercise[]> = EMPTY;
  private EXERCISE_STATISTIC_CACHE: Observable<SprintExerciseStatisticCalendar> = EMPTY;
  private EXERCISE_CONFIG_CACHE: Observable<ExerciseMetadataList> = EMPTY;
  private DAYS_OFF_URL = 'rest/daysoff';

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

  getDaysOffURL(): string {
    return this.DAYS_OFF_URL;
  }

  /**
   *  ************ REST ***************
   */
  /**
   * method returns sprint exercise list object for current sprint. Only from cache
   */
  getSprintExerciseListObjectForCurrentSprint(): Observable<SprintExercise[]> {
    // tslint:disable-next-line:max-line-length
    if ((this.SPRINT_EXERCISE_LIST_CACHE !== undefined && this.SPRINT_EXERCISE_LIST_CACHE !== null) && this.SPRINT_EXERCISE_LIST_CACHE !== EMPTY) {
      console.log('got exercise list object from cache');
      return this.SPRINT_EXERCISE_LIST_CACHE;
    }

    this.getExerciseListForCurrentSprint().subscribe(
      data => {
        const exerciseList = new ExerciseList().deserialize(data);
        this.getDaysOffForCurrentSprint().subscribe(
          dataDaysOff => {
            const daysOff = new DaysOffList().deserialize(dataDaysOff);
            this.SPRINT_EXERCISE_LIST_CACHE = of(this.buildSprintExerciseList(exerciseList.getExercises(), daysOff.getDaysOff()));
          },
          error => {
            // TODO: implement
          }
        );
      },
      error => {
        // TODO: implement
      }
    );
    return this.SPRINT_EXERCISE_LIST_CACHE;
  }

  public getExerciseListForCurrentSprint(): Observable<ExerciseList> {
    console.log('getting exercises from server');
    return this.http.get<ExerciseList>(this.SPRINT_EXERCISES_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params
        .set('date', new Date().getTime().toString())
    });
  }

  /**
   * method returns user sprint exercise statistics for current sprint from server or cache
   * @param forceCallServer - force to read from server
   */
  getExerciseStatisticsForCurrentSprint(forceCallServer: boolean): Observable<SprintExerciseStatisticCalendar> {
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
   */
  getExerciseStatisticForCurrentSprint(sid: string): Observable<ExerciseStatistic> {
    return this.http.get<ExerciseStatistic>(this.STATISTICS_EXERCISES_SPRINT_URL + '/' + sid, {
      headers: httpOptions.headers,
      params: httpOptions.params
        .set('date', new Date().getTime().toString())
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

  deleteSprintExercise(id: number): Observable<any> {
    return this.http.delete(this.SPRINT_EXERCISES_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params
    })
      .pipe(
        tap(ex => console.log('exercise ' + id + ' deleted permanently'))
      );
  }

  /**
   * method returns days-off for user for sprint from server
   */
  getDaysOffForCurrentSprint(): Observable<DaysOffList> {
    console.log('getting days-off from server');
    return this.http.get<DaysOffList>(this.DAYS_OFF_URL, {
      headers: httpOptions.headers,
      params: httpOptions.params
        .set('date', new Date().getTime().toString())
    });
  }

  /**
   *  ************ SACOND-HAND METHODS ***************
   */
  /**
   * method updates spint exercise in cache
   * @param exercise - sprint exercise
   */
  updateSprintExerciseInCache(exercise: Exercise): Observable<SprintExercise[]> {
    if (this.SPRINT_EXERCISE_LIST_CACHE === EMPTY) {
      console.log('SPRINT_EXERCISES_CACHE is empty, getting it from the server');
      return this.getSprintExerciseListObjectForCurrentSprint();
    }
    return this.modifySprintExerciseListInCache(exercise, false);
  }

  /**
   * method deletes spint exercise from cache
   * @param exercise - sprint exercise
   */
  deleteSprintExerciseInCache(exercise: Exercise): Observable<SprintExercise[]> {
    if (this.SPRINT_EXERCISE_LIST_CACHE === EMPTY) {
      console.log('SPRINT_EXERCISES_CACHE is empty, getting it from the server');
      return this.getSprintExerciseListObjectForCurrentSprint();
    }
    return this.modifySprintExerciseListInCache(exercise, true);
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
   * method modifies SprintExerciseList object
   * @param exercise - exercise to be modified/removed
   * @param toDelete - true to delete exercise, false to modify
   */
  private modifySprintExerciseListInCache(exercise: Exercise, toDelete: boolean): Observable<SprintExercise[]> {
    this.SPRINT_EXERCISE_LIST_CACHE.subscribe(
      data => {
        /*        const sprintExerciseList = new SprintExerciseList().deserialize(data);
                let isSprintModified = false;

                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < sprintExerciseList.getSprintExercises().length; i++) {
                  // filter by date
                  // tslint:disable-next-line:max-line-length
                  // tslint:disable-next-line:max-line-length
                  if (new Date(sprintExerciseList.getSprintExercises()[i].getSprintDay().getSDate()).getDate() === new Date(exercise.getDate()).getDate()) {
                    for (let j = 0; j < sprintExerciseList.getSprintExercises()[i].getExercises().length; j++) {
                      if (sprintExerciseList.getSprintExercises()[i].getExercises()[j].getId() === exercise.getId()) {
                        if (toDelete) {
                          sprintExerciseList.getSprintExercises()[i].getExercises().splice(j, 1); // delete exercise
                        } else {
                          sprintExerciseList.getSprintExercises()[i].getExercises().splice(j, 1, exercise); // replace exercise
                        }
                        // now we need to recalc days total points
                        let total = 0;
                        for (const index in sprintExerciseList.getSprintExercises()[i].getExercises()) {
                          total = total + sprintExerciseList.getSprintExercises()[i].getExercises()[index].getTotalPoints();
                        }
                        sprintExerciseList.getSprintExercises()[i].getSprintDay().setTotal(total); // update days total points
                        isSprintModified = true;
                        let logText = '';
                        if (toDelete) {
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
                this.SPRINT_EXERCISE_LIST_CACHE = of(sprintExerciseList); */
      }
    );
    return this.SPRINT_EXERCISE_LIST_CACHE;
  }

  private sortSprintExercisesByDateReverse(list: SprintExercise[]): SprintExercise[] {
    return list.sort((a: SprintExercise, b: SprintExercise) => {
      return (a.getSprintDay().getSDate() - b.getSprintDay().getSDate());
    }).reverse();
  }

  private sortExerciseByDateReverse(list: Exercise[]): Exercise[] {
    return list.sort((a: Exercise, b: Exercise) => {
      return (a.getDate() - b.getDate());
    }).reverse();
  }

  private buildSprintExerciseList(exercises: Exercise[], daysOff: number[]): SprintExercise[] {
    const sprintExercises: SprintExercise[] = [];
    const sortedExercises = this.sortExerciseByDateReverse(exercises);

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
      sprintExercises[lastExIndex].getExercises().push(exercise);
    }

    // add days-off to the final list
    for (const dayOff of daysOff) {
      sprintExercises.push(new SprintExercise(new SprintDay(dayOff, true, 0)));
    }
    console.log('sprintExercises=', this.sortSprintExercisesByDateReverse(sprintExercises));
    return this.sortSprintExercisesByDateReverse(sprintExercises);
  }

}
