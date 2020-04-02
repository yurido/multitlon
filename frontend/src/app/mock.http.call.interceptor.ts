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

const SPRINT_URL = 'rest/currentSprint';

@Injectable()
export class MockHttpCalIInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted request: ' + request.url);
    if (request.url === SPRINT_URL) {
  //    this.throwError(request.headers, request.url);
      // return of(new HttpResponse({status: 400, body: {}}));

       return of(new HttpResponse({status: 200, body: ((sprintData) as any).default}))
        .pipe(
          delay(4000)
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
