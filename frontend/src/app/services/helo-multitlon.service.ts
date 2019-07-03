import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Saying} from '../api/saying';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class HeloMultitlonService {
  private sayingUrl = 'rest/saying';

  constructor(private http: HttpClient) {
  }

  getSayings(): Observable<Saying[]> {
    return this.http.get<Saying[]>(this.sayingUrl)
      .pipe(
        tap(sayings => console.log('got saying object from backend: ', sayings)),
        catchError(this.handleError('getSayings', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
