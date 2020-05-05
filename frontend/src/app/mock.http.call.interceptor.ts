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

const CURRENT_SPRINT_URL = 'rest/currentSprint';
const EXERCISE_URL = 'rest/exercise';

@Injectable()
export class MockHttpCalIInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request: ' + request.url + ', method ' + request.method);
    if (request.url === CURRENT_SPRINT_URL) {
      //    this.throwError(request.headers, request.url);
      // return of(new HttpResponse({status: 400, body: {}}));

      return of(new HttpResponse({status: 200, body: ((sprintData) as any).default}))
        .pipe(
          delay(1000)
        );

    } else if (request.url === EXERCISE_URL && request.method === 'PUT') {
      const exercise = new Exercise().deserialize(request.body);
      console.log('raw = ', exercise.getRawPoints());
      console.log('reps = ', exercise.getReps());

      if (exercise.getReps().length > 0) {
        exercise.setRawPoints(exercise.getRawPoints() + 1500);
      }
      exercise.setTotalPoints(exercise.getTotalPoints() + 800);
      exercise.setProgress(exercise.getProgress() + 10);
      exercise.setQuota(exercise.getQuota() + 5);
      return of(new HttpResponse({status: 201, body: exercise}))
        .pipe(
          delay(1000)
        );
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
