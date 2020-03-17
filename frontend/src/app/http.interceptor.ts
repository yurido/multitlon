import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import * as sprintData from './mock-data/sprint.json';

const SPRINT_URL = 'rest/currentSprint';

@Injectable()
export class MockHttpCalIInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted request: ' + request.url);
    if(request.url === SPRINT_URL) {
      return of(new HttpResponse({status: 200, body: ((sprintData) as any).default}));
    }
    return next.handle(request);
  }
}
