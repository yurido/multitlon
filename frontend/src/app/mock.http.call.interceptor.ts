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
import * as sprintData from './mock-data/sprint.json';
import {delay} from 'rxjs/operators';
import {Exercise} from './models/exercise';
import * as exerciseStatistic from './mock-data/sprint-statistic.json';
import {ExerciseStatistic} from './models/exercise.statistic';
import * as exerciseMetadata from './mock-data/exercise-metadata.json';
import {SprintService} from './services/sprint.service';

@Injectable()
export class MockHttpCalIInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private sprintService: SprintService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request: ' + request.url + ', method ' + request.method);
    if (request.url === this.sprintService.getSprintExercisesURL() && request.method === 'GET') {
      //    this.throwError(request.headers, request.url);
      // return of(new HttpResponse({status: 400, body: {}}));
      return of(new HttpResponse({status: 200, body: ((sprintData) as any).default}))
        .pipe(
          delay(1000)
        );

    } else if (request.url === this.sprintService.getSprintExercisesURL() && request.method === 'PUT') {
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
      // this.throwError(request.headers, request.url);
    } else if (request.url === (this.sprintService.getExerciseStatisticsCurrentSprintURL())) {
      return of(new HttpResponse({status: 200, body: ((exerciseStatistic) as any).default}))
        .pipe(
          delay(1000)
        );
    } else if (request.url.indexOf(this.sprintService.getExerciseStatisticsCurrentSprintURL() + '/') >= 0) {
      const sidPos = request.url.indexOf(this.sprintService.getExerciseStatisticsCurrentSprintURL() + '/') + (this.sprintService.getExerciseStatisticsCurrentSprintURL() + '/').length;
      const sid = request.url.substr(sidPos, request.url.length - sidPos);
      const json = JSON.parse('{"sid": "' + sid + '", "progress": 44, "totalRaw": 123, "totalPoints": 1500, "averagePoints": 45, "maxPonts": 500, "quota": 16}');
      const statistic = new ExerciseStatistic().deserialize(json);

      return of(new HttpResponse({status: 200, body: statistic}))
        .pipe(
          delay(1000)
        );
      // this.throwError(request.headers, request.url);

    } else if (request.url === this.sprintService.getExercisMetadataURL()) {
      return of(new HttpResponse({status: 200, body: ((exerciseMetadata) as any).default}))
        .pipe(
          delay(1000)
        );
      // this.throwError(request.headers, request.url);
    }
    return next.handle(request);
  }

  private throwError(headers, url) {
    throw new HttpErrorResponse({
      error: 'your error',
      headers: headers,
      status: 500,
      statusText: 'Error',
      url: url
    });
  }
}
