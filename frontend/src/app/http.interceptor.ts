import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import * as sayings from './mock-data/saying.json';
import * as sprintData from './mock-data/sprint.json';

const SAYING_URL = 'rest/saying';
const SPRINT_URL = 'rest/activities';

@Injectable()
export class MockHttpCalIInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted request: ' + request.url);
    if (request.url === SAYING_URL) {
      return of(new HttpResponse({status: 200, body: ((sayings) as any).default}));
    }
    if(request.url === SPRINT_URL) {
      return of(new HttpResponse({status: 200, body: ((sprintData) as any).default}));
    }
    return next.handle(request);
  }
}
