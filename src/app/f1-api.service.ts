import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { Driver, DriverRootObject } from './models/driver';
import { Race, RaceRootObject } from './models/race';
import { PagingResult } from './models/page';

@Injectable({
  providedIn: 'root',
})
export class F1ApiService {
  constructor(private http: HttpClient) {}

  public GetDriversForSeason(
    year: string,
    offset: number = 0,
    limit: number = 10
  ): Observable<PagingResult<Driver>> {
    return this.http
      .get<DriverRootObject>(
        `http://ergast.com/api/f1/${year}/drivers.json?limit=${limit}&offset=${offset}`
      )
      .pipe(
        map((root) => {
          return {
            data: root.MRData.DriverTable.Drivers,
            totalElements: parseInt(root.MRData.total),
          } as PagingResult<Driver>;
        }),
        shareReplay(),
        catchError(this.handleError)
      );
  }

  public GetRacesForSeason(
    year: string,
    offset: number = 0,
    limit: number = 10
  ): Observable<PagingResult<Race>> {
    return this.http
      .get<RaceRootObject>(
        `http://ergast.com/api/f1/${year}.json?limit=${limit}&offset=${offset}`
      )
      .pipe(
        map((root) => {
          return {
            data: root.MRData.RaceTable.Races,
            totalElements: parseInt(root.MRData.total),
          } as PagingResult<Race>;
        }),
        shareReplay(),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
