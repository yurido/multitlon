import {Injectable, Injector} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import * as sprintData from './mock-data/sprint-exercises.json';
import {delay} from 'rxjs/operators';
import {Exercise} from './models/exercise';
import * as exerciseStatistic from './mock-data/sprint-statistic.json';
import {ExerciseStatistic} from './models/exercise.statistic';
import * as exerciseMetadata from './mock-data/exercise-metadata.json';
import {SprintService} from './services/sprint.service';
import {DaysOffList} from './models/days.off.list';
import {ExerciseList} from './models/exercise.list';
import * as availableExerciseListData from './mock-data/available-exercises.json';
import {Serializable} from './models/serializable';
import {Serializator} from './models/serializator';
import {Reps} from './models/reps';

@Injectable({
  providedIn: 'root'
})
export class MockHttpCalIInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private sprintService: SprintService) {
  }

  private CURRENT_ID: number = 15;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request: ', request.url, ', method ', request.method, 'header: ', request.headers);
    if (request.url === this.sprintService.getSprintExercisesURL() && request.method === 'PUT') {
      // this.throwError(request.headers, request.url, 'You can not edit this exercise! DB is not available! Try later');

      const exercise = new Exercise().deserialize(request.body);
      /* console.log('raw = ', exercise.getRawPoints());
      console.log('reps = ', exercise.getReps()); */

      if (exercise.getReps().length > 0) {
        exercise.setRawPoints(exercise.getRawPoints() + 1500);
      }
      exercise.setTotalPoints(exercise.getTotalPoints() + 800);

      return of(new HttpResponse({status: 201, body: exercise}))
        .pipe(
          delay(2000)
        );
    } else if (request.url === (this.sprintService.getExerciseStatisticsCurrentSprintURL())) {
      // this.throwError(request.headers, request.url, 'statistics not loaded!');
      return of(new HttpResponse({status: 200, body: ((exerciseStatistic) as any).default}))
        .pipe(
          delay(1000)
        );
    } else if (request.url.indexOf(this.sprintService.getExerciseStatisticsCurrentSprintURL() + '/') >= 0) {
      // this.throwError(request.headers, request.url);
      // tslint:disable-next-line:max-line-length
      const sidPos = request.url.indexOf(this.sprintService.getExerciseStatisticsCurrentSprintURL() + '/') + (this.sprintService.getExerciseStatisticsCurrentSprintURL() + '/').length;
      const sid = request.url.substr(sidPos, request.url.length - sidPos);
      const json = JSON.parse(`{"sid": "${sid}", "progress": 44, "totalRaw": 123, "totalPoints": 1500, "averagePoints": 45, "maxPonts": 500, "quota": 16}`);
      const statistic = new ExerciseStatistic().deserialize(json);
      return of(new HttpResponse({status: 200, body: statistic}))
        .pipe(
          delay(1000)
        );
    } else if (request.url === this.sprintService.getExercisMetadataURL()) {
      // this.throwError(request.headers, request.url, 'Metadata not found!');
      return of(new HttpResponse({status: 200, body: ((exerciseMetadata) as any).default}))
        .pipe(
          delay(1000)
        );
    } else if (request.url === this.sprintService.getSprintExercisesURL() && request.method === 'DELETE') {
      // this.throwError(request.headers, request.url, 'DB is not available, retry later!');
      return of(new HttpResponse({status: 200}))
        .pipe(
          delay(2000)
        );
    } else if (request.url === this.sprintService.getDaysOffURL() && request.method === 'GET') {
      // this.throwError(request.headers, request.url, 'Exercises are broken!');
      const daysOff = new DaysOffList();
      daysOff.getDaysOff().push(new Date(new Date().getFullYear(), new Date().getMonth(), 2).getTime());
      daysOff.getDaysOff().push(new Date(new Date().getFullYear(), new Date().getMonth(), 3).getTime());
      daysOff.getDaysOff().push(new Date(new Date().getFullYear(), new Date().getMonth(), 8).getTime());
      daysOff.getDaysOff().push(new Date(new Date().getFullYear(), new Date().getMonth(), 12).getTime());
      daysOff.getDaysOff().push(new Date(new Date().getFullYear(), new Date().getMonth(), 22).getTime());
      daysOff.getDaysOff().push(new Date(new Date().getFullYear(), new Date().getMonth(), 23).getTime());
      return of(new HttpResponse({status: 200, body: daysOff}))
        .pipe(
          delay(1000)
        );
    } else if (request.url === this.sprintService.getSprintExercisesURL() && request.method === 'GET') {
      let exerciseList;
      try {
        exerciseList = new ExerciseList().deserialize(((sprintData) as any).default);
      } catch (error) {
        console.error(error);
      }
      // tslint:disable-next-line:prefer-for-of
      // @ts-ignore
      for (let i = 0; i < exerciseList.getExercises().length; i++) {
        // @ts-ignore
        const day = new Date(exerciseList.getExercises()[i].getDate()).getDate();
        const newDateNumber = new Date(new Date().getFullYear(), new Date().getMonth(), day).getTime();
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        // console.log('ex ', exerciseList.getExercises()[i].getSid(), 'id ',exerciseList.getExercises()[i].getId(), ':old date ', new Date(exerciseList.getExercises()[i].getDate()), ', new date ', new Date(newDateNumber));
        exerciseList.getExercises()[i].setDate(newDateNumber);
      }
      // console.log('will throw new error!');
      // console.log('new error thrown!');
      return of(new HttpResponse({status: 200, body: exerciseList}))
        .pipe(
          delay(1000)
        );
    } else if (request.url === this.sprintService.getSprintAvailableExercisesURL()) {
      // this.throwError(request.headers, request.url, 'Available exercise list is not available!');
      return of(new HttpResponse({status: 200, body: ((availableExerciseListData) as any).default}))
        .pipe(
          delay(1000)
        );
    } else if (request.url === this.sprintService.getSprintExercisesURL() && request.method === 'POST') {
      // this.throwError(request.headers, request.url, 'Database is not available!');

      const exercise = new CreateExercise().deserialize(request.body);
      this.CURRENT_ID ++;
      const newExString = `{"id": ${this.CURRENT_ID}, "sid": "${exercise.getSid()}", "date": ${exercise.getDate()}, "reps": [], "rawPoints": ${exercise.getRawPoints()}, "totalPoints": 1652, "time": 0}`;
      const newExJson = JSON.parse(newExString);
      const newExObj = new Exercise().deserialize(newExJson);
      newExObj.setReps(exercise.getReps());
      if (exercise.getRawPoints() === 0) {
        newExObj.setRawPoints(1566);
      }
      return of(new HttpResponse({status: 200, body: newExObj}))
        .pipe(
          delay(2000)
        );
    }
    return next.handle(request);
  }

  private throwError(headers: any, url: any, message: string) {
    throw new HttpErrorResponse({
      headers,
      status: 500,
      statusText: message,
      url
    });
  }
}

// --- This class is a part of backend!
export class CreateExercise implements Serializable<CreateExercise> {
  private sid: string;
  private date: number;
  private reps: Reps[] = [];
  private rawPoints: number;

  constructor() {
  }

  public getSid(): string {
    return this.sid;
  }

  public getDate(): number {
    return this.date;
  }

  public getReps(): Reps[] {
    return this.reps;
  }

  public getRawPoints(): number {
    return this.rawPoints;
  }

  deserialize(input: object): CreateExercise {
    const serializator = new Serializator(CreateExercise.name);

    this.sid = serializator.getObjectProperty(input, 'sid');
    this.date = serializator.getObjectProperty(input, 'date');
    const reps = serializator.getObjectProperty(input, 'reps');
    for (const i in reps) {
      this.reps.push(new Reps().deserialize(reps[i]));
    }
    this.rawPoints = serializator.getObjectProperty(input, 'rawPoints');
    return this;
  }
}
